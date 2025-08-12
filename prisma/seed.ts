import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create initial settings
  await prisma.setting.upsert({
    where: { key: 'site_name' },
    update: {},
    create: {
      key: 'site_name',
      value: 'ООО Учебный Центр'
    }
  })

  await prisma.setting.upsert({
    where: { key: 'site_description' },
    update: {},
    create: {
      key: 'site_description',
      value: 'Дополнительное профессиональное образование с документами государственного образца'
    }
  })

  await prisma.setting.upsert({
    where: { key: 'contact_phone' },
    update: {},
    create: {
      key: 'contact_phone',
      value: '+7 (495) 123-45-67'
    }
  })

  await prisma.setting.upsert({
    where: { key: 'contact_email' },
    update: {},
    create: {
      key: 'contact_email',
      value: 'info@uchebnycentr.ru'
    }
  })

  await prisma.setting.upsert({
    where: { key: 'contact_address' },
    update: {},
    create: {
      key: 'contact_address',
      value: '123456, г. Москва, ул. Примерная, д. 1, оф. 10'
    }
  })

  // Create sample courses
  const course1 = await prisma.course.upsert({
    where: { slug: 'upravlenie-personalom' },
    update: {},
    create: {
      title: 'Управление персоналом',
      slug: 'upravlenie-personalom',
      description: 'Полный курс по управлению персоналом для HR-специалистов и руководителей',
      fullDescription: `
        <h3>О программе</h3>
        <p>Комплексная программа профессиональной переподготовки, которая даст вам все необходимые знания и навыки для работы в сфере управления персоналом.</p>
        
        <h3>Что вы изучите:</h3>
        <ul>
          <li>Основы управления персоналом</li>
          <li>Подбор и адаптация сотрудников</li>
          <li>Мотивация и развитие персонала</li>
          <li>Трудовое законодательство</li>
          <li>HR-аналитика</li>
          <li>Управление конфликтами</li>
        </ul>
      `,
      category: 'Профессиональная переподготовка',
      duration: '520 ак.ч.',
      price: 45000,
      oldPrice: 55000,
      schedule: 'Вечерние занятия 3 раза в неделю',
      level: 'Средний',
      format: 'Дистанционно',
      status: 'ACTIVE',
      maxStudents: 25,
      currentStudents: 18,
      startDate: new Date('2024-02-15'),
      endDate: new Date('2024-08-15'),
      features: [
        'Диплом государственного образца',
        'Практические кейсы от ведущих компаний',
        'Поддержка куратора',
        'Помощь в трудоустройстве'
      ],
      requirements: [
        'Высшее или среднее профессиональное образование',
        'Опыт работы приветствуется, но не обязателен'
      ],
      outcomes: [
        'Получите диплом о профессиональной переподготовке',
        'Освоите современные HR-технологии',
        'Сможете работать HR-специалистом или руководителем',
        'Получите портфолио выполненных проектов'
      ],
      certificate: true
    }
  })

  const course2 = await prisma.course.upsert({
    where: { slug: 'buhgalterskiy-uchet' },
    update: {},
    create: {
      title: 'Бухгалтерский учет и налогообложение',
      slug: 'buhgalterskiy-uchet',
      description: 'Комплексная программа подготовки бухгалтеров с изучением 1С:Бухгалтерия',
      fullDescription: `
        <h3>О программе</h3>
        <p>Программа для тех, кто хочет получить профессию бухгалтера или повысить свою квалификацию в области учета и налогообложения.</p>
        
        <h3>Что вы изучите:</h3>
        <ul>
          <li>Основы бухгалтерского у��ета</li>
          <li>Налоговый учет и отчетность</li>
          <li>Работа в 1С:Бухгалтерия 8.3</li>
          <li>Документооборот организации</li>
          <li>Анализ финансовой отчетности</li>
          <li>Кадровый учет</li>
        </ul>
      `,
      category: 'Профессиональная переподготовка',
      duration: '256 ак.ч.',
      price: 32000,
      oldPrice: 38000,
      schedule: 'Дневные занятия по субботам',
      level: 'Начальный',
      format: 'Очно-заочно',
      status: 'ACTIVE',
      maxStudents: 20,
      currentStudents: 15,
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-07-01'),
      features: [
        'Диплом государственного образца',
        'Изучение 1С:Бухгалтерия 8.3',
        'Реальная отчетность',
        'Стажировка в компаниях-партнерах'
      ],
      requirements: [
        'Среднее образование',
        'Базовые компьютерные навыки'
      ],
      outcomes: [
        'Получите диплом о профес��иональной переподготовке',
        'Освоите программу 1С:Бухгалтерия',
        'Сможете вести полный цикл бухгалтерского учета',
        'Получите опыт работы с реальной отчетностью'
      ],
      certificate: true
    }
  })

  const course3 = await prisma.course.upsert({
    where: { slug: 'proektnoe-upravlenie' },
    update: {},
    create: {
      title: 'Проектное управление',
      slug: 'proektnoe-upravlenie',
      description: 'Современные методы управления проектами по международным стандартам',
      fullDescription: `
        <h3>О программе</h3>
        <p>Курс для руководителей и специалистов, которые хотят освоить современные методы управления проектами.</p>
        
        <h3>Что вы изучите:</h3>
        <ul>
          <li>Основы проектного управления</li>
          <li>Планирование и контроль проектов</li>
          <li>Управление командой проекта</li>
          <li>Риск-менед��мент</li>
          <li>Agile и Scrum методологии</li>
          <li>Инструменты управления проектами</li>
        </ul>
      `,
      category: 'Повышение квалификации',
      duration: '144 ак.ч.',
      price: 25000,
      schedule: 'Онлайн в удобное время',
      level: 'Продвинутый',
      format: 'Онлайн',
      status: 'ACTIVE',
      maxStudents: 30,
      currentStudents: 22,
      startDate: new Date('2024-02-20'),
      endDate: new Date('2024-05-20'),
      features: [
        'Удостоверение о повышении квалификации',
        'Международные стандарты PMI',
        'Сертификат партнера Microsoft',
        'Практика на реальных проектах'
      ],
      requirements: [
        'Высшее образование',
        'Опыт руководящей работы от 1 года'
      ],
      outcomes: [
        'Получите удостоверение о повышении квалификации',
        'Освоите международные стандарты PMI',
        'Сможете управлять проектами любой сложности',
        'Получите инструменты для эффективного управления'
      ],
      certificate: true
    }
  })

  // Create lessons for courses
  await prisma.lesson.createMany({
    data: [
      {
        courseId: course1.id,
        title: 'Введение в управление персоналом',
        description: 'Основные понятия и принципы HR-менеджмента',
        duration: 120,
        order: 1,
        isPublic: true
      },
      {
        courseId: course1.id,
        title: 'Подбор и отбор персонала',
        description: 'Современные методы поиска и отбора кандидатов',
        duration: 180,
        order: 2,
        isPublic: false
      },
      {
        courseId: course2.id,
        title: 'Основы бухгалтерского учета',
        description: 'Базовые принципы ведения учета',
        duration: 150,
        order: 1,
        isPublic: true
      }
    ]
  })

  // Create sample reviews
  await prisma.review.createMany({
    data: [
      {
        courseId: course1.id,
        studentName: 'Анна Петрова',
        rating: 5,
        comment: 'Отличный курс! ��олучила много практических знаний, которые сразу применила на работе.',
        isApproved: true
      },
      {
        courseId: course1.id,
        studentName: 'Михаил Сидоров',
        rating: 5,
        comment: 'Преподаватели - настоящие профессионалы. Курс помог мне получить повышение.',
        isApproved: true
      },
      {
        courseId: course2.id,
        studentName: 'Елена Козлова',
        rating: 5,
        comment: 'Очень довольна обучением. Теперь уверенно работаю в 1С и веду учет.',
        isApproved: true
      }
    ]
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
