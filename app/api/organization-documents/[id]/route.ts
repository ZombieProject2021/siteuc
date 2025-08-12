import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// DELETE /api/organization-documents/[id] - Delete document
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const documentId = parseInt(params.id)

    if (isNaN(documentId)) {
      return NextResponse.json(
        { error: 'Неверный ID документа' },
        { status: 400 }
      )
    }

    // Temporary mock response until database table is created
    return NextResponse.json({ message: 'Документ успешно удален' })
  } catch (error) {
    console.error('Error deleting organization document:', error)
    return NextResponse.json(
      { error: 'Ошибка при удалении документа' },
      { status: 500 }
    )
  }
}
