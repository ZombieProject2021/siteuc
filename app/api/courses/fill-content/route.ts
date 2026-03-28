import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

// Content templates based on course categories
const contentTemplates = {
  'Профессиональная переподготовка': {
    targetAudience: [
      'Специалистам, желающим сменить профессиональную сферу деятельности',
      'Работникам предприятий, стремящимся к карьерному росту',
      'Лицам с высшим или средним профессиональным образованием',
      'Руководителям и специалистам различных отраслей'
    ],
    learningFormat: 'Обучение проводится в дистанционном формате с применением современных образовательных технологий. Слушатели получают доступ к электронной образовательной платформе с лекционными материалами, практическими заданиями и тестами. Предусмотрены онлайн-консультации с преподавателями и итоговая аттестация.',
    documentTypes: [
      { name: 'Диплом о профессиональной переподготовке установленного образца' },
      { name: 'Приложение к диплому с перечнем изученных дисциплин' },
      { name: 'Справка об обучении (при необходимости)' }
    ]
  },
  'Повышение квалификации': {
    targetAudience: [
      'Действующим специалистам для повышения профессиональной компетенции',
      'Работникам, требующим периодической аттестации',
      'Руководителям для развития управленческих навыков',
      'Специалистам, внедряющим новые технологии в работе'
    ],
    learningFormat: 'Краткосрочное обучение в удобном дистанционном формате. Программа включает изучение актуальных изменений в законодательстве, новых методов работы и практических навыков. Онлайн-лекции, интерактивные семинары и практические занятия.',
    documentTypes: [
      { name: 'Удостоверение о повышении квалификации установленного образца' },
      { name: 'Справка об обучении с указанием количества часов' },
      { name: 'Сертификат участника (при необходимости)' }
    ]
  },
  'Корпоративное обучение': {
    targetAudience: [
      'Сотрудникам компаний для повышения корпоративных компетенций',
      'Командам проектов для синхронизации знаний',
      'Руководителям подразделений и их заместителям',
      'Новым сотрудникам в рамках адаптационных программ'
    ],
    learningFormat: 'Индивидуально разработанная программа под потребности конкретной организации. Возможны различные форматы: очные тренинги, дистанционное обучение, смешанный формат. Программа адаптируется под специфику деятельности компании.',
    documentTypes: [
      { name: 'Корпоративный сертификат о прохождении обучения' },
      { name: 'Свидетельство о повышении квалификации' },
      { name: 'Справка о прохождении корпоративного обучения' }
    ]
  }
}

// Specialized content for safety courses
const safetyContent = {
  targetAudience: [
    'Руководителям организаций и их заместителям',
    'Специалистам по охране труда',
    'Работникам рабочих профессий',
    'Ответственным за безопасность на производстве'
  ],
  learningFormat: 'Обучение проводится с применением современных дистанционных технологий. Программа включает изучение требований охраны труда, промышленной безопасности, практические навыки оценки рисков. Предусмотрено итоговое тестирование и проверка знаний.',
  documentTypes: [
    { name: 'Удостоверение о проверке знаний требований охраны труда' },
    { name: 'Протокол проверки знаний' },
    { name: 'Справка о прохождении обучения' }
  ]
}

export async function POST(request: NextRequest) {
  try {
    console.log('Начинаем заполнение контента курсов...')
    
    // Get all courses
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        targetAudience: true,
        learningFormat: true,
        documentTypes: true
      }
    })

    console.log(`Найдено ${courses.length} курсов для обновления`)

    let updatedCount = 0
    const results = []

    for (const course of courses) {
      let needsUpdate = false
      const updateData: any = {}

      // Auto-generate slug if missing or needs improvement
      const generatedSlug = generateSlug(course.title)
      if (!course.slug || course.slug !== generatedSlug) {
        // Check if generated slug is unique
        const existingSlugCourse = await prisma.course.findFirst({
          where: {
            slug: generatedSlug,
            id: { not: course.id }
          }
        })

        if (!existingSlugCourse) {
          updateData.slug = generatedSlug
          needsUpdate = true
          results.push(`Обновляем slug для "${course.title}": ${course.slug} -> ${generatedSlug}`)
        }
      }

      // Determine content template
      let template = contentTemplates[course.category as keyof typeof contentTemplates] || contentTemplates['Профессиональная переподготовка']
      
      // Use safety content for safety-related courses
      if (course.title.toLowerCase().includes('охран') || 
          course.title.toLowerCase().includes('безопасн') ||
          course.title.toLowerCase().includes('труд')) {
        template = safetyContent
      }

      // Fill targetAudience if empty
      if (!course.targetAudience || course.targetAudience.length === 0) {
        updateData.targetAudience = template.targetAudience
        needsUpdate = true
        results.push(`Добавляем целевую аудиторию для "${course.title}"`)
      }

      // Fill learningFormat if empty
      if (!course.learningFormat || course.learningFormat.trim() === '') {
        updateData.learningFormat = template.learningFormat
        needsUpdate = true
        results.push(`Добавляем формат обучения для "${course.title}"`)
      }

      // Fill documentTypes if empty
      if (!course.documentTypes || course.documentTypes.length === 0) {
        updateData.documentTypes = template.documentTypes
        needsUpdate = true
        results.push(`Добавляем типы документов для "${course.title}"`)
      }

      // Update course if needed
      if (needsUpdate) {
        await prisma.course.update({
          where: { id: course.id },
          data: updateData
        })
        updatedCount++
        results.push(`✓ Обновлен курс: "${course.title}"`)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Завершено! Обновлено ${updatedCount} из ${courses.length} курсов`,
      updatedCount,
      totalCourses: courses.length,
      details: results
    })
    
  } catch (error) {
    console.error('Ошибка при заполнении контента:', error)
    return NextResponse.json(
      { error: 'Ошибка при заполнении контента курсов', details: error },
      { status: 500 }
    )
  }
}
