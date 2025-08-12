import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const courseUpdateSchema = z.object({
  title: z.string().min(1, 'Название обязательно').optional(),
  slug: z.string().min(1, 'Slug обязателен').optional(),
  description: z.string().min(1, 'Описание обязательно').optional(),
  fullDescription: z.string().optional(),
  category: z.string().min(1, 'Категория обязательна').optional(),
  duration: z.string().min(1, 'Длительность обязательна').optional(),
  price: z.number().min(0, 'Цена должна быть положительной').optional(),
  oldPrice: z.number().optional(),
  schedule: z.string().min(1, 'Расписание обязательно').optional(),
  level: z.string().min(1, 'Уровень обязателен').optional(),
  format: z.string().min(1, 'Формат обязателен').optional(),
  status: z.enum(['ACTIVE', 'UPCOMING', 'ARCHIVED', 'DRAFT']).optional(),
  maxStudents: z.number().min(1, 'Максимальное количество студентов обязательно').optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  features: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  outcomes: z.array(z.string()).optional(),
  targetAudience: z.array(z.string()).optional(),
  learningFormat: z.string().optional(),
  documentTypes: z.array(z.object({
    name: z.string(),
    file: z.string().optional()
  })).optional(),
  imageSrc: z.string().optional(),
  certificate: z.boolean().optional()
})

// GET /api/courses/[id] - Get single course
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = parseInt(params.id)
    
    if (isNaN(courseId)) {
      return NextResponse.json(
        { error: 'Неверный ID курса' },
        { status: 400 }
      )
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        lessons: {
          orderBy: { order: 'asc' }
        },
        reviews: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            enrollments: true
          }
        }
      }
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Курс не найден' },
        { status: 404 }
      )
    }

    // Calculate average rating
    const avgRating = course.reviews.length > 0 
      ? course.reviews.reduce((sum, review) => sum + review.rating, 0) / course.reviews.length
      : 0

    return NextResponse.json({
      ...course,
      avgRating: Number(avgRating.toFixed(1)),
      enrollmentsCount: course._count.enrollments,
      _count: undefined
    })
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении курса' },
      { status: 500 }
    )
  }
}

// PUT /api/courses/[id] - Update course
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = parseInt(params.id)
    
    if (isNaN(courseId)) {
      return NextResponse.json(
        { error: 'Неверный ID курса' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const validatedData = courseUpdateSchema.parse(body)
    
    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id: courseId }
    })
    
    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Курс не найден' },
        { status: 404 }
      )
    }

    // Check if slug is unique (if being updated)
    if (validatedData.slug && validatedData.slug !== existingCourse.slug) {
      const slugExists = await prisma.course.findUnique({
        where: { slug: validatedData.slug }
      })
      
      if (slugExists) {
        return NextResponse.json(
          { error: 'Курс с таким slug уже существует' },
          { status: 400 }
        )
      }
    }

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        ...validatedData,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : undefined,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : undefined
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ошибка валидации', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error updating course:', error)
    return NextResponse.json(
      { error: 'Ошибка при обновлении курса' },
      { status: 500 }
    )
  }
}

// DELETE /api/courses/[id] - Delete course
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = parseInt(params.id)
    
    if (isNaN(courseId)) {
      return NextResponse.json(
        { error: 'Неверный ID курса' },
        { status: 400 }
      )
    }

    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id: courseId }
    })
    
    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Курс не найден' },
        { status: 404 }
      )
    }

    await prisma.course.delete({
      where: { id: courseId }
    })

    return NextResponse.json({ message: 'Курс успешно удален' })
  } catch (error) {
    console.error('Error deleting course:', error)
    return NextResponse.json(
      { error: 'Ошибка при удалении курса' },
      { status: 500 }
    )
  }
}
