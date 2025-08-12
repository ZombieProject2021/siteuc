import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const courseId = formData.get('courseId') as string || 'general'
    const folder = formData.get('folder') as string || 'images'
    
    if (!file) {
      return NextResponse.json(
        { error: 'Файл не найден' },
        { status: 400 }
      )
    }

    // Validate file type based on folder
    const allowedTypes = folder === 'documents' || folder === 'organization-docs'
      ? ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
      : ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

    if (!allowedTypes.includes(file.type)) {
      const allowedFormats = folder === 'documents' || folder === 'organization-docs'
        ? 'PDF, DOC, DOCX, XLS, XLSX, JPEG, PNG'
        : 'JPEG, PNG, WebP'
      return NextResponse.json(
        { error: `Недопустимый тип файла. Разрешены: ${allowedFormats}` },
        { status: 400 }
      )
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Размер файла превышает 5 МБ' },
        { status: 400 }
      )
    }

    // Create upload directory structure
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'courses', courseId, folder)
    
    // Ensure directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}_${originalName}`
    const filePath = join(uploadDir, fileName)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Return the public URL
    const publicUrl = `/uploads/courses/${courseId}/${folder}/${fileName}`
    
    return NextResponse.json({
      url: publicUrl,
      fileName,
      size: file.size,
      type: file.type
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Ошибка при загрузке файла' },
      { status: 500 }
    )
  }
}
