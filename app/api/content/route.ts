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

// GET /api/content - Get all content or filter by page
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const key = searchParams.get('key')
    
    if (key) {
      // Get single content item by key
      const content = await prisma.content.findUnique({
        where: { key }
      })
      
      if (!content) {
        return NextResponse.json(
          { error: 'Контент не найден' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(content)
    }
    
    const where = page ? { page } : {}
    
    const contents = await prisma.content.findMany({
      where,
      orderBy: [
        { page: 'asc' },
        { section: 'asc' },
        { title: 'asc' }
      ]
    })

    const response = NextResponse.json({ content: contents })
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

// POST /api/content - Create new content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = contentSchema.parse(body)
    
    // Check if key is unique
    const existingContent = await prisma.content.findUnique({
      where: { key: validatedData.key }
    })
    
    if (existingContent) {
      return NextResponse.json(
        { error: 'Контент с таким ключом уже существует' },
        { status: 400 }
      )
    }

    const content = await prisma.content.create({
      data: validatedData
    })

    return NextResponse.json(content, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ошибка валидации', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error creating content:', error)
    return NextResponse.json(
      { error: 'Ошибка при создании контента' },
      { status: 500 }
    )
  }
}

// PUT /api/content - Update content
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID обязателен для обновления' },
        { status: 400 }
      )
    }
    
    // Validate input (excluding key from required fields for updates)
    const updateSchema = contentSchema.partial().extend({
      id: z.number()
    })
    
    const validatedData = updateSchema.parse(body)
    const { id: validatedId, ...dataToUpdate } = validatedData

    const content = await prisma.content.update({
      where: { id: validatedId },
      data: dataToUpdate
    })

    return NextResponse.json(content)
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

// DELETE /api/content - Delete content
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID обязателен для удаления' },
        { status: 400 }
      )
    }

    await prisma.content.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json(
      { error: 'Ошибка при удалении контента' },
      { status: 500 }
    )
  }
}
