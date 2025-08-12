import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const sampleCourses = [
  {
    title: 'Управление персоналом',
    slug: 'upravlenie-personalom',
    description: 'Комплексная программа профессиональной переподготовки для специалистов HR-сферы. Изучите современные методы управления персоналом, мотивации сотрудников и развития команды.',
    category: 'HR и управление',
    duration: '520 ак.ч.',
    price: 45000,
    oldPrice: 55000,
    status: 'ACTIVE' as const,
    maxStudents: 25,
    currentStudents: 18,
    avgRating: 4.8,
    reviewsCount: 32,
    schedule: 'Вечерние занятия: Пн, Ср, Пт с 19:00 до 22:00',
    level: 'Для специалистов с опытом работы от 1 года',
    format: 'Очно-заочное обучение с онлайн-поддержкой'
  },
  {
    title: 'Бухгалтерский учет и налогообложение',
    slug: 'buhgalterskiy-uchet',
    description: 'Профессиональная переподготовка для бухгалтеров. Изучите современное налоговое законодательство, работу в 1С:Бухгалтерия, составление отчетности.',
    category: 'Финансы и учет',
    duration: '256 ак.ч.',
    price: 32000,
    oldPrice: 38000,
    status: 'ACTIVE' as const,
    maxStudents: 20,
    currentStudents: 15,
    avgRating: 4.9,
    reviewsCount: 28,
    schedule: 'Выходные дни: Сб с 10:00 до 17:00',
    level: 'Для начинающих и практикующих специалистов',
    format: 'Очное обучение с практическими занятиями'
  },
  {
    title: 'Проектное управление',
    slug: 'proektnoe-upravlenie',
    description: 'Курс повышения квалификации по современным методам управления проектами. Изучите Agile, Scrum, классическое проектное управление по стандартам PMI.',
    category: 'Менеджмент',
    duration: '144 ак.ч.',
    price: 25000,
    status: 'ACTIVE' as const,
    maxStudents: 30,
    currentStudents: 22,
    avgRating: 4.7,
    reviewsCount: 19,
    schedule: 'Онлайн-занятия: Вт, Чт с 19:00 до 21:30',
    level: 'Для руководителей и специалистов',
    format: 'Дистанционное обучение'
  },
  {
    title: 'Логистика и цепи поставок',
    slug: 'logistika-i-tsepi-postavok',
    description: 'Современные подходы к управлению логистикой. Оптимизация складских процессов, управление поставщиками, международная логистика.',
    category: 'Логистика',
    duration: '180 ак.ч.',
    price: 35000,
    oldPrice: 42000,
    status: 'UPCOMING' as const,
    maxStudents: 25,
    currentStudents: 8,
    avgRating: 4.6,
    reviewsCount: 12,
    schedule: 'Начало ��руппы: 15 февраля 2024',
    level: 'Для специалистов логистических отделов',
    format: 'Смешанное обучение (очно + онлайн)'
  },
  {
    title: 'Цифровой маркетинг',
    slug: 'tsifrovoy-marketing',
    description: 'Практический курс по интернет-маркетингу. SEO, контекстная реклама, социальные сети, email-маркетинг, аналитика.',
    category: 'Маркетинг',
    duration: '120 ак.ч.',
    price: 28000,
    status: 'ACTIVE' as const,
    maxStudents: 35,
    currentStudents: 31,
    avgRating: 4.8,
    reviewsCount: 45,
    schedule: 'Интенсив: Пн-Пт с 10:00 до 14:00',
    level: 'Для маркетологов и предпринимателей',
    format: 'Очное обучение с практическими кейсами'
  },
  {
    title: 'Охрана труда и промышленная безопасность',
    slug: 'ohrana-truda',
    description: 'Обязательное обучение для специалистов по охране труда. Изучение требований законодательства, проведение инструктажей, расследование несчастных случаев.',
    category: 'Охрана труда',
    duration: '72 ак.ч.',
    price: 18000,
    status: 'ACTIVE' as const,
    maxStudents: 40,
    currentStudents: 35,
    avgRating: 4.5,
    reviewsCount: 67,
    schedule: 'Ускоренный курс: 2 недели',
    level: 'Обязательная программа',
    format: 'Очно-заочное с итоговой аттестацией'
  }
]

export async function POST() {
  try {
    // Check if courses already exist
    const existingCourses = await prisma.course.count()
    
    if (existingCourses > 0) {
      return NextResponse.json({
        message: 'Курсы уже существуют в базе данных',
        count: existingCourses
      })
    }

    // Create sample courses
    const createdCourses = await Promise.all(
      sampleCourses.map(course => 
        prisma.course.create({
          data: course
        })
      )
    )

    return NextResponse.json({
      message: `Успешно создано ${createdCourses.length} курсов`,
      courses: createdCourses.map(course => ({
        id: course.id,
        title: course.title,
        slug: course.slug
      }))
    })

  } catch (error) {
    console.error('Error seeding courses:', error)
    return NextResponse.json(
      { error: 'Ошибка при создании курсов' },
      { status: 500 }
    )
  }
}
