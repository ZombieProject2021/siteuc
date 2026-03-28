import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const updateLeadSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'])
})

// PUT /api/leads/[id] - Update lead status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = parseInt(params.id)
    
    if (isNaN(leadId)) {
      return NextResponse.json(
        { error: 'Неверный ID заявки' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const validatedData = updateLeadSchema.parse(body)

    // Check if lead exists
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId }
    })

    if (!existingLead) {
      return NextResponse.json(
        { error: 'Заявка не найдена' },
        { status: 404 }
      )
    }

    // Update lead status
    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: { status: validatedData.status },
      include: {
        course: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    return NextResponse.json(updatedLead)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ошибка валидации', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error updating lead:', error)
    return NextResponse.json(
      { error: 'Ошибка при обновлении заявки' },
      { status: 500 }
    )
  }
}

// GET /api/leads/[id] - Get single lead
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = parseInt(params.id)
    
    if (isNaN(leadId)) {
      return NextResponse.json(
        { error: 'Неверный ID заявки' },
        { status: 400 }
      )
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        course: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    if (!lead) {
      return NextResponse.json(
        { error: 'Заявка не найдена' },
        { status: 404 }
      )
    }

    return NextResponse.json(lead)
  } catch (error) {
    console.error('Error fetching lead:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении заявки' },
      { status: 500 }
    )
  }
}
