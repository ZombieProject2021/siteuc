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
    const documents = await prisma.organizationDocument.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    const response = NextResponse.json({ documents })
    response.headers.set('Content-Type', 'application/json; charset=utf-8')
    return response
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

    const document = await prisma.organizationDocument.create({
      data: {
        title: validatedData.title,
        category: validatedData.category,
        filename: validatedData.filename,
        fileUrl: validatedData.fileUrl,
        uploadDate: new Date()
      }
    })

    const response = NextResponse.json(document, { status: 201 })
    response.headers.set('Content-Type', 'application/json; charset=utf-8')
    return response
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
