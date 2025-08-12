import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const courseSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  slug: z.string().min(1, 'Slug обязателен'),
  description: z.string().min(1, 'Описание обязательно'),
  fullDescription: z.string().optional(),
  category: z.string().min(1, 'Категория обязательна'),
  duration: z.string().min(1, 'Длительность обязательна'),
  price: z.number().min(0, 'Цена должна быть положител��ной'),
  oldPrice: z.number().optional(),
  schedule: z.string().min(1, 'Расписание обязательно'),
  level: z.string().min(1, 'Уровень обязателен'),
  format: z.string().min(1, 'Формат обязателен'),
  status: z.enum(['ACTIVE', 'UPCOMING', 'ARCHIVED', 'DRAFT']),
  maxStudents: z.number().min(1, 'Максимальное количество студентов обязательно'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  features: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  outcomes: z.array(z.string()).optional(),
  imageSrc: z.string().optional(),
  certificate: z.boolean().optional()
})

// GET /api/courses - Get all courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const format = searchParams.get('format')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const priceRanges = searchParams.get('priceRanges')
    const sortBy = searchParams.get('sortBy') || 'popularity'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    const where = {
      ...(category && category !== 'Все курсы' && { category }),
      ...(format && format !== 'Все форматы' && { format }),
      ...(status && { status: status as any }),
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { category: { contains: search } }
        ]
      })
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          _count: {
            select: {
              reviews: true,
              enrollments: true
            }
          },
          reviews: {
            where: { isApproved: true },
            select: { rating: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      }),
      prisma.course.count({ where })
    ])

    // Calculate average rating for each course
    const coursesWithRating = courses.map(course => {
      const avgRating = course.reviews.length > 0 
        ? course.reviews.reduce((sum, review) => sum + review.rating, 0) / course.reviews.length
        : 0

      return {
        ...course,
        avgRating: Number(avgRating.toFixed(1)),
        reviewsCount: course._count.reviews,
        enrollmentsCount: course._count.enrollments,
        reviews: undefined,
        _count: undefined
      }
    })

    return NextResponse.json({
      courses: coursesWithRating,
      total,
      page,
      pages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении курсов' },
      { status: 500 }
    )
  }
}

// POST /api/courses - Create new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = courseSchema.parse(body)
    
    // Check if slug is unique
    const existingCourse = await prisma.course.findUnique({
      where: { slug: validatedData.slug }
    })
    
    if (existingCourse) {
      return NextResponse.json(
        { error: 'Курс с таким slug уже существует' },
        { status: 400 }
      )
    }

    const course = await prisma.course.create({
      data: {
        ...validatedData,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        currentStudents: 0
      }
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ошибка валидации', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Ошибка при создании курса' },
      { status: 500 }
    )
  }
}
