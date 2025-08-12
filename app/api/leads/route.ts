import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const leadSchema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  email: z.string().email('Неверный формат email'),
  phone: z.string().optional(),
  courseId: z.number().optional(),
  message: z.string().optional(),
  source: z.string().default('website'),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional()
})

// GET /api/leads - Get all leads
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const courseId = searchParams.get('courseId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const where = {
      ...(status && { status: status as any }),
      ...(courseId && { courseId: parseInt(courseId) })
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          course: {
            select: {
              id: true,
              title: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      }),
      prisma.lead.count({ where })
    ])

    return NextResponse.json({
      leads,
      total,
      page,
      pages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении заявок' },
      { status: 500 }
    )
  }
}

// POST /api/leads - Create new lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = leadSchema.parse(body)

    const lead = await prisma.lead.create({
      data: validatedData,
      include: {
        course: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ошибка валидации', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Ошибка при создании заявки' },
      { status: 500 }
    )
  }
}
