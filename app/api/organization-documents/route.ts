import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const createDocumentSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  category: z.string().min(1, 'Категория обязательна'),
  filename: z.string().min(1, 'Имя файла обязательно'),
  fileUrl: z.string().min(1, 'URL файла обязателен')
})

// GET /api/organization-documents - Get all documents
export async function GET() {
  try {
    // Return empty array until database table is created
    const documents: any[] = []
    return NextResponse.json({ documents })
  } catch (error) {
    console.error('Error fetching organization documents:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении документов' },
      { status: 500 }
    )
  }
}

// POST /api/organization-documents - Create new document
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createDocumentSchema.parse(body)

    // Temporary mock response until database table is created
    const document = {
      id: Date.now(),
      ...validatedData,
      uploadDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ошибка валидации', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating organization document:', error)
    return NextResponse.json(
      { error: 'Ошибка при создании документа' },
      { status: 500 }
    )
  }
}
