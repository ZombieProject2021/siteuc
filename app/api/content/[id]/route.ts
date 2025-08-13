import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const contentSchema = z.object({
  key: z.string().min(1, 'Ключ обязателен'),
  title: z.string().min(1, 'Заголовок обязателен'),
  content: z.string().min(1, 'Содержимое обязательно'),
  type: z.enum(['TEXT', 'HTML', 'MARKDOWN']).default('TEXT'),
  page: z.string().min(1, 'Страница обязательна'),
  section: z.string().optional(),
  isActive: z.boolean().default(true)
})

// GET /api/content/[id] - Get single content item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contentId = parseInt(params.id)

    if (isNaN(contentId)) {
      return NextResponse.json(
        { error: 'Неверный ID контента' },
        { status: 400 }
      )
    }

    const content = await prisma.content.findUnique({
      where: { id: contentId }
    })

    if (!content) {
      return NextResponse.json(
        { error: 'Контент не найден' },
        { status: 404 }
      )
    }

    const response = NextResponse.json(content)
    response.headers.set('Content-Type', 'application/json; charset=utf-8')
    return response
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении контента' },
      { status: 500 }
    )
  }
}

// PUT /api/content/[id] - Update content
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contentId = parseInt(params.id)

    if (isNaN(contentId)) {
      return NextResponse.json(
        { error: 'Неверный ID контента' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validatedData = contentSchema.partial().parse(body)

    const content = await prisma.content.update({
      where: { id: contentId },
      data: validatedData
    })

    const response = NextResponse.json(content)
    response.headers.set('Content-Type', 'application/json; charset=utf-8')
    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ошибка валидации', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error updating content:', error)
    return NextResponse.json(
      { error: 'Ошибка при обновлении контента' },
      { status: 500 }
    )
  }
}

// DELETE /api/content/[id] - Delete content
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contentId = parseInt(params.id)

    if (isNaN(contentId)) {
      return NextResponse.json(
        { error: 'Неверный ID контента' },
        { status: 400 }
      )
    }

    await prisma.content.delete({
      where: { id: contentId }
    })

    const response = NextResponse.json({ success: true })
    response.headers.set('Content-Type', 'application/json; charset=utf-8')
    return response
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json(
      { error: 'Ошибка при удалении контента' },
      { status: 500 }
    )
  }
}
