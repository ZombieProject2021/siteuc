import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const safetyCourses = [
  {
    title: 'Безопасные методы и приемы выполнения работ повышенной опасности',
    slug: 'bezopasnye-metody-rabot-povyshennoy-opasnosti',
    description: 'Программа обучения безопасным методам и приемам выполнения работ повышенной опасности, к которым предъявляются дополнительные требования в соответствии с нормативными правовыми актами, содержащими государственные нормативные требования охраны труда.',
    category: 'Охрана труда',
    duration: '40 ак.ч.',
    price: 15000,
    status: 'ACTIVE' as const,
    maxStudents: 20,
    currentStudents: 8,
    schedule: 'Еженедельно: Пн, Ср с 18:00 до 21:00',
    level: 'Специалисты',
    format: 'Очно-заочное'
  },
  {
    title: 'Программа «В». Безопасные методы и приемы выполнения работ при воздействии вредных факторов',
    slug: 'programma-v-bezopasnye-metody-vrednye-faktory',
    description: 'Безопасные методы и приемы выполнения работ при воздействии вредных и (или) опасных производственных факторов, источников опасности, идентифицированных в рамках СОУТ и оценки профрисков. Программа «В»',
    category: 'Охрана труда',
    duration: '16 ак.ч.',
    price: 8000,
    status: 'ACTIVE' as const,
    maxStudents: 25,
    currentStudents: 12,
    schedule: 'Интенсив: 2 дня по 8 часов',
    level: 'Все категории',
    format: 'Очное'
  },
  {
    title: 'Программа «Б». Безопасные методы и приемы выполнения работ',
    slug: 'programma-b-bezopasnye-metody',
    description: 'Программа «Б» - безопасные методы и приемы выполнения работ в соответствии с требованиями охраны труда.',
    category: 'Охрана труда',
    duration: '16 ак.ч.',
    price: 7500,
    status: 'ACTIVE' as const,
    maxStudents: 25,
    currentStudents: 18,
    schedule: 'Выходные: Сб-Вс с 9:00 до 17:00',
    level: 'Базовый',
    format: 'Очное'
  },
  {
    title: 'Внеплановое обучение и проверка знаний требований охраны труда',
    slug: 'vneplanovoe-obuchenie-ohrana-truda',
    description: 'Внеплановое обучение и проверка знаний требований охраны труда в связи с изменениями в законодательстве или происшедшими инцидентами.',
    category: 'Охрана труда',
    duration: '8 ак.ч.',
    price: 5000,
    status: 'ACTIVE' as const,
    maxStudents: 30,
    currentStudents: 5,
    schedule: 'По мере необходимости',
    level: 'Все категории',
    format: 'Очное/дистанционное'
  },
  {
    title: 'Инструктор по охране труда (ГОСТ 12.0.004-2015)',
    slug: 'instruktor-po-ohrane-truda',
    description: 'Подготовка инструкторов по охране труда в соответствии с требованиями ГОСТ 12.0.004-2015. Программа включает методики проведения инструктажей и обучения персонала.',
    category: 'Охрана труда',
    duration: '72 ак.ч.',
    price: 25000,
    status: 'ACTIVE' as const,
    maxStudents: 15,
    currentStudents: 9,
    schedule: 'Будни: Пн-Пт с 9:00 до 18:00',
    level: 'Специалисты ОТ',
    format: 'Очное'
  },
  {
    title: 'Корпоративный тренинг «Осознанная безопасность»',
    slug: 'korporativnyy-trening-osoznannaya-bezopasnost',
    description: 'Корпоративный тренинг «Осознанная безопасность» для групп от 10 до 30 человек. Формирование культуры безопасности на рабочих местах.',
    category: 'Охрана труда',
    duration: '16 ак.ч.',
    price: 12000,
    status: 'ACTIVE' as const,
    maxStudents: 30,
    currentStudents: 0,
    schedule: 'Корпоративный формат по согласованию',
    level: 'Корпоративный',
    format: 'Выездное'
  },
  {
    title: 'Лидерство в охране труда и культура безопасности',
    slug: 'liderstvo-v-ohrane-truda',
    description: 'Программа развития лидерских качеств в области охраны труда. Формирование культуры безопасности на предприятии.',
    category: 'Охрана труда',
    duration: '24 ак.ч.',
    price: 18000,
    status: 'ACTIVE' as const,
    maxStudents: 20,
    currentStudents: 7,
    schedule: 'Модульное обучение: 3 дня по 8 часов',
    level: 'Руководители',
    format: 'Интерактивное'
  },
  {
    title: 'Обучение по использованию средств индивидуальной защиты',
    slug: 'obuchenie-ispolzovaniyu-siz',
    description: 'Обучение по использованию (применению) средств индивидуальной защиты. Правила выбора, применения и ухода за СИЗ.',
    category: 'Охрана труда',
    duration: '8 ак.ч.',
    price: 4000,
    status: 'ACTIVE' as const,
    maxStudents: 25,
    currentStudents: 20,
    schedule: 'Ежемесячно в первый понедельник',
    level: 'Все работники',
    format: 'Практическое'
  },
  {
    title: 'Программа В. Водолазные работы',
    slug: 'programma-v-vodolaznyye-raboty',
    description: 'Обучение безопасным методам выполнения водолазных работ. Специальная программа для работников, выполняющих подводные работы.',
    category: 'Охрана труда',
    duration: '40 ак.ч.',
    price: 35000,
    status: 'ACTIVE' as const,
    maxStudents: 10,
    currentStudents: 3,
    schedule: 'Специализированные группы по заявкам',
    level: 'Водолазы',
    format: 'Теория и практика'
  },
  {
    title: 'Программа В. Газоопасные работы',
    slug: 'programma-v-gazoopasnyye-raboty',
    description: 'Обучение б��зопасным методам выполнения газоопасных работ. Программа включает изучение требований безопасности при работах в газоопасных средах.',
    category: 'Охрана труда',
    duration: '32 ак.ч.',
    price: 20000,
    status: 'ACTIVE' as const,
    maxStudents: 15,
    currentStudents: 11,
    schedule: 'Еженедельно: Вт, Чт с 14:00 до 18:00',
    level: 'Газоопасные работы',
    format: 'Очное'
  },
  {
    title: 'Программа В. Земляные работы',
    slug: 'programma-v-zemlyanyye-raboty',
    description: 'Обучение безопасным методам выполнения земляных работ. Требования безопасности при производстве земляных работ в различных условиях.',
    category: 'Охрана труда',
    duration: '16 ак.ч.',
    price: 12000,
    status: 'ACTIVE' as const,
    maxStudents: 20,
    currentStudents: 14,
    schedule: 'Выходные: Сб с 9:00 до 18:00',
    level: 'Земляные работы',
    format: 'Очное'
  },
  {
    title: 'Программа В. Огневые работы',
    slug: 'programma-v-ognevyye-raboty',
    description: 'Обучение безопасным методам выполнения огневых работ. Требования пожарной безопасности при проведении сварочных и других огневых работ.',
    category: 'Охрана труда',
    duration: '24 ак.ч.',
    price: 15000,
    status: 'ACTIVE' as const,
    maxStudents: 20,
    currentStudents: 16,
    schedule: 'Будни: Пн, Ср, Пт с 15:00 до 19:00',
    level: 'Сварщики',
    format: 'Теория и практика'
  },
  {
    title: 'Программа В. Работы в электроустановках',
    slug: 'programma-v-raboty-v-elektroustanovkah',
    description: 'Обучение безопасным методам выполнения работ в электроустановках. Электробезопасность и требования при работах с электрооборудованием.',
    category: 'Охрана труда',
    duration: '40 ак.ч.',
    price: 22000,
    status: 'ACTIVE' as const,
    maxStudents: 15,
    currentStudents: 12,
    schedule: 'Вечерние занятия: Вт, Чт с 18:00 до 22:00',
    level: 'Электротехники',
    format: 'Очное'
  },
  {
    title: 'Программа В. Работы на высоте',
    slug: 'programma-v-raboty-na-vysote',
    description: 'Обучение безопасным методам выполнения работ на высоте. Применение систем обеспечения безопасности работ на высоте.',
    category: 'Охрана труда',
    duration: '32 ак.ч.',
    price: 18000,
    status: 'ACTIVE' as const,
    maxStudents: 12,
    currentStudents: 8,
    schedule: 'Интенсив: 4 дня по 8 часов',
    level: 'Высотные работы',
    format: 'Практика'
  },
  {
    title: 'Программа В. Работы с подъемными сооружениями',
    slug: 'programma-v-raboty-s-podyemnymi-sooruzheniyami',
    description: 'Обучение безопасным методам работ, связанных с эксплуатацией подъемных сооружений. Требования безопасности при работе с кранами и подъемниками.',
    category: 'Охрана труда',
    duration: '40 ак.ч.',
    price: 25000,
    status: 'ACTIVE' as const,
    maxStudents: 15,
    currentStudents: 6,
    schedule: 'Будни: Пн-Пт с 9:00 до 14:00',
    level: 'Операторы кранов',
    format: 'Теория и практика'
  },
  {
    title: 'Программа В. Строительные работы',
    slug: 'programma-v-stroitelnyye-raboty',
    description: 'Обучение безопасным методам выполнения строительных работ, включая окрасочные, электросварочные и газосварочные работы.',
    category: 'Охрана труда',
    duration: '40 ак.ч.',
    price: 20000,
    status: 'ACTIVE' as const,
    maxStudents: 25,
    currentStudents: 19,
    schedule: 'Выходные: Сб-Вс с 9:00 до 18:00',
    level: 'Строители',
    format: 'Очное с выездом'
  },
  {
    title: 'Общие вопросы охраны труда и функционирования СУОТ',
    slug: 'obshchiye-voprosy-ohrany-truda-suot',
    description: 'Общие вопросы охраны труда и функционирования системы управления охраной труда (ПП № 2464 от 24.12.2021, п. 46, подпункт «а»). Программа «А»',
    category: 'Охрана труда',
    duration: '16 ак.ч.',
    price: 8000,
    status: 'ACTIVE' as const,
    maxStudents: 30,
    currentStudents: 25,
    schedule: 'Еженедельно по вторникам с 9:00 до 18:00',
    level: 'Базовый',
    format: 'Очно-заочное'
  },
  {
    title: 'Организация процессов обеспечения работников СИЗ',
    slug: 'organizatsiya-protsessov-obespecheniya-siz',
    description: 'Организация процессов в области обеспечения работников специальной одеждой, специальной обувью и другими средствами индивидуальной защиты.',
    category: 'Охрана труда',
    duration: '24 ак.ч.',
    price: 15000,
    status: 'ACTIVE' as const,
    maxStudents: 20,
    currentStudents: 8,
    schedule: 'Модульное обучение: 3 дня по 8 часов',
    level: 'Специалисты ОТ',
    format: 'Практика с кейсами'
  },
  {
    title: 'Охрана труда на английском языке',
    slug: 'ohrana-truda-na-angliyskom',
    description: 'Охрана труда для руководителей и специалистов на английском языке (Occupational safety and health training course for chiefs and specialists of the organizations)',
    category: 'Охрана труда',
    duration: '40 ак.ч.',
    price: 45000,
    status: 'UPCOMING' as const,
    maxStudents: 15,
    currentStudents: 3,
    schedule: 'Начало группы: 1 марта 2024',
    level: 'Международный',
    format: 'На английском'
  },
  {
    title: 'Оценка профессиональных рисков',
    slug: 'otsenka-professionalnykh-riskov',
    description: 'Оценка профессиональных рисков. Обучение по профстандарту методикам выявления, оценки и управления профессиональными рисками.',
    category: 'Охрана труда',
    duration: '72 ак.ч.',
    price: 30000,
    status: 'ACTIVE' as const,
    maxStudents: 20,
    currentStudents: 15,
    schedule: 'Будни: Пн-Пт с 14:00 до 19:00',
    level: 'Специалисты ОТ',
    format: 'Практика с кейсами'
  },
  {
    title: 'Профессиональная переподготовка специалиста по охране труда',
    slug: 'profperepodgotovka-spetsialist-po-ohrane-truda',
    description: 'Профессиональная переподготовка специалиста по охране труда. Полный курс подготовки с изучением всех аспектов охраны труда и получением диплома.',
    category: 'Охрана труда',
    duration: '256 ак.ч.',
    price: 65000,
    oldPrice: 75000,
    status: 'ACTIVE' as const,
    maxStudents: 25,
    currentStudents: 18,
    schedule: 'Вечерние занятия: Пн, Ср, Пт с 18:00 до 22:00',
    level: 'Переподготовка',
    format: 'Очно-заочное'
  },
  {
    title: 'Система управления охраной труда (повышение квалификации)',
    slug: 'sistema-upravleniya-ohranoy-truda-pk',
    description: 'Система управления охраной труда и обеспечение безопасных условий труда (повышение квалификации). Современные подходы к управлению охраной труда.',
    category: 'Охрана труда',
    duration: '72 ак.ч.',
    price: 28000,
    status: 'ACTIVE' as const,
    maxStudents: 20,
    currentStudents: 12,
    schedule: 'Выходные: Сб-Вс с 9:00 до 18:00',
    level: 'Повышение квал.',
    format: 'Очное'
  }
]

export async function POST() {
  try {
    console.log('Starting safety courses seeding...')
    
    // Check if safety courses already exist
    console.log('Checking existing safety courses...')
    const existingSafetyCourses = await prisma.course.count({
      where: {
        category: 'Охрана труда'
      }
    })
    
    console.log('Existing safety courses count:', existingSafetyCourses)
    
    if (existingSafetyCourses > 0) {
      return NextResponse.json({
        message: 'Курсы по охране труда уже существуют в базе данных',
        count: existingSafetyCourses
      })
    }

    // Create safety courses
    console.log('Creating safety courses...')
    const createdCourses = await Promise.all(
      safetyCourses.map(async (course, index) => {
        console.log(`Creating course ${index + 1}/${safetyCourses.length}: ${course.title}`)
        return await prisma.course.create({
          data: course
        })
      })
    )
    
    console.log('Successfully created', createdCourses.length, 'safety courses')

    return NextResponse.json({
      message: `Успешно создано ${createdCourses.length} курсов по охране труда`,
      courses: createdCourses.map(course => ({
        id: course.id,
        title: course.title,
        slug: course.slug,
        category: course.category
      }))
    })

  } catch (error) {
    console.error('Error seeding safety courses:', error)
    console.error('Error details:', error instanceof Error ? error.message : String(error))
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    return NextResponse.json(
      { 
        error: 'Ошибка при создании курсов по охране труда',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
