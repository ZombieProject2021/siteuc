import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const settingSchema = z.object({
  key: z.string().min(1, 'Ключ обязателен'),
  value: z.string()
})

// GET /api/settings - Get all settings
export async function GET() {
  try {
    const settings = await prisma.setting.findMany({
      orderBy: { key: 'asc' }
    })

    // Convert to key-value object for easier frontend consumption
    const settingsObject = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json(settingsObject)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении настроек' },
      { status: 500 }
    )
  }
}

// POST /api/settings - Create or update setting
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = settingSchema.parse(body)

    const setting = await prisma.setting.upsert({
      where: { key: validatedData.key },
      update: { value: validatedData.value },
      create: validatedData
    })

    return NextResponse.json(setting)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ошибка валидации', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error creating/updating setting:', error)
    return NextResponse.json(
      { error: 'Ошибка при обновлении настройки' },
      { status: 500 }
    )
  }
}

// PUT /api/settings - Bulk update settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Неверный формат данных' },
        { status: 400 }
      )
    }

    // Update all settings in a transaction
    const updatePromises = Object.entries(body).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) }
      })
    )

    await Promise.all(updatePromises)

    return NextResponse.json({ message: '��астройки успешно обновлены' })
  } catch (error) {
    console.error('Error bulk updating settings:', error)
    return NextResponse.json(
      { error: 'Ошибка при обновлении настроек' },
      { status: 500 }
    )
  }
}
