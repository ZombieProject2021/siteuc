import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const additionalContent = [
  // News and updates
  {
    key: 'news-section-title',
    title: 'Новости и обновления',
    content: 'Следите за новостями образовательного центра и изменениями в законодательстве',
    type: 'TEXT' as const,
    page: 'homepage',
    section: 'news'
  },
  {
    key: 'news-item-1',
    title: 'Новые требования к обучению по охране труда 2024',
    content: `
      <div>
        <p class="text-gray-600 mb-4">15 января 2024</p>
        <p>С 1 марта 2024 года вступают в силу новые требования к обучению работников по охране труда. Изменения коснутся периодичности обучения и программ для различных категорий персонала.</p>
        <p class="mt-3">Основные изменения:</p>
        <ul class="list-disc list-inside mt-2 space-y-1">
          <li>Увеличена периодичность обучения для руководителей</li>
          <li>Введены новые программы для работ повышенной опасности</li>
          <li>Обновлены требования к учебным центрам</li>
        </ul>
      </div>
    `,
    type: 'HTML' as const,
    page: 'homepage',
    section: 'news'
  },
  {
    key: 'news-item-2',
    title: 'Открытие нового учебного класса',
    content: `
      <div>
        <p class="text-gray-600 mb-4">28 декабря 2023</p>
        <p>Мы рады сообщить об открытии нового современного учебного класса, оснащенного интерактивным оборудованием �� тренажерами для практических занятий по охране труда.</p>
        <p class="mt-3">Новые возможности:</p>
        <ul class="list-disc list-inside mt-2 space-y-1">
          <li>Интерактивные доски и мультимедийное оборудование</li>
          <li>Тренажеры для отработки навыков первой помощи</li>
          <li>Современные стенды по технике безопасности</li>
        </ul>
      </div>
    `,
    type: 'HTML' as const,
    page: 'homepage',
    section: 'news'
  },
  
  // Additional testimonials
  {
    key: 'testimonial-extra-1',
    title: 'Отзыв Михаила Соколова',
    content: `
      <div>
        <p class="mb-3">"Прошел переподготовку по специальности 'Специалист по охране труда'. Очень доволен качеством обучения. Преподаватели - настоящие профессионалы, материал подается доступно и интересно."</p>
        <div class="flex items-center justify-between">
          <div>
            <p class="font-semibold">Михаил Соколо��</p>
            <p class="text-sm text-gray-600">Инженер по промышленной безопасности</p>
          </div>
          <div class="flex text-yellow-400">
            <span>★★★★★</span>
          </div>
        </div>
      </div>
    `,
    type: 'HTML' as const,
    page: 'homepage',
    section: 'testimonials'
  },
  {
    key: 'testimonial-extra-2',
    title: 'Отзыв Светланы Никитиной',
    content: `
      <div>
        <p class="mb-3">"Отличная организация корпоративного обучения для нашей компании. 30 сотрудников прошли обучение по программе 'Осознанная безопасность'. Результат превзошел ожидания!"</p>
        <div class="flex items-center justify-between">
          <div>
            <p class="font-semibold">Светлана Никитина</p>
            <p class="text-sm text-gray-600">HR-директор ООО "ТехСервис"</p>
          </div>
          <div class="flex text-yellow-400">
            <span>★★★★★</span>
          </div>
        </div>
      </div>
    `,
    type: 'HTML' as const,
    page: 'homepage',
    section: 'testimonials'
  },
  {
    key: 'testimonial-extra-3',
    title: 'Отзыв Дмитрия Власова',
    content: `
      <div>
        <p class="mb-3">"Быстро и качественно прошел внеплановое обучение после изменений в законодательстве. Удобное расписание, профессиональный подход. Рекомендую!"</p>
        <div class="flex items-center justify-between">
          <div>
            <p class="font-semibold">Дмитрий Власов</p>
            <p class="text-sm text-gray-600">Главный инженер</p>
          </div>
          <div class="flex text-yellow-400">
            <span>★★★★★</span>
          </div>
        </div>
      </div>
    `,
    type: 'HTML' as const,
    page: 'homepage',
    section: 'testimonials'
  },

  // Partners section
  {
    key: 'partners-section-title',
    title: 'Наши партнеры',
    content: 'Мы сотрудничаем с ведущими предприятиями и организациями',
    type: 'TEXT' as const,
    page: 'homepage',
    section: 'partners'
  },
  {
    key: 'partners-description',
    title: 'Партнерские отношения',
    content: `
      <div>
        <p class="mb-4">Наш учебный центр является надежным партнером для более чем 200 предприятий и организаций различных отраслей промышленности.</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">200+</div>
            <div class="text-sm text-gray-600">Партнеров</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">5000+</div>
            <div class="text-sm text-gray-600">Обученных сотрудников</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">15</div>
            <div class="text-sm text-gray-600">Лет опыта</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">98%</div>
            <div class="text-sm text-gray-600">Довольных клиентов</div>
          </div>
        </div>
      </div>
    `,
    type: 'HTML' as const,
    page: 'homepage',
    section: 'partners'
  },

  // Additional benefits
  {
    key: 'benefit-extra-1',
    title: 'Гибкие форматы обучения',
    content: 'Очное, заочное и дистанционное обучение. Выездные программы на территории заказчика',
    type: 'TEXT' as const,
    page: 'homepage',
    section: 'benefits'
  },
  {
    key: 'benefit-extra-2',
    title: 'Поддержка после обучения',
    content: 'Консультации экспертов, обновления материалов, помощь в применении знаний на практике',
    type: 'TEXT' as const,
    page: 'homepage',
    section: 'benefits'
  },
  {
    key: 'benefit-extra-3',
    title: 'Современное оборудование',
    content: 'Интерактивные тренажеры, мультимедийные классы, демонстрационные стенды',
    type: 'TEXT' as const,
    page: 'homepage',
    section: 'benefits'
  },

  // Contact information
  {
    key: 'contact-working-hours',
    title: 'Режим работы',
    content: `
      <div class="space-y-2">
        <div class="flex justify-between">
          <span>Пн-Пт:</span>
          <span>9:00 - 18:00</span>
        </div>
        <div class="flex justify-between">
          <span>Сб:</span>
          <span>10:00 - 16:00</span>
        </div>
        <div class="flex justify-between">
          <span>Вс:</span>
          <span>Выходной</span>
        </div>
      </div>
    `,
    type: 'HTML' as const,
    page: 'contacts',
    section: 'info'
  },
  {
    key: 'contact-additional-phones',
    title: 'Дополнительные контакты',
    content: `
      <div class="space-y-3">
        <div>
          <p class="font-medium">Отдел по работе с корпоративными клиентами:</p>
          <p class="text-blue-600">+7 (495) 123-45-68</p>
        </div>
        <div>
          <p class="font-medium">Бухгалтерия:</p>
          <p class="text-blue-600">+7 (495) 123-45-69</p>
        </div>
        <div>
          <p class="font-medium">Техническая поддержка:</p>
          <p class="text-blue-600">+7 (495) 123-45-70</p>
        </div>
      </div>
    `,
    type: 'HTML' as const,
    page: 'contacts',
    section: 'phones'
  },

  // About us content
  {
    key: 'about-history',
    title: 'История компании',
    content: `
      <div>
        <p class="mb-4">ООО "Учебный Центр" основан в 2009 году группой экспертов в области охраны труда и промышленной безопасности. За 15 лет работы мы обучили более 5000 специалистов и стали одним из ведущих учебных центров в регионе.</p>
        
        <h3 class="text-xl font-semibold mb-3 mt-6">Основные этапы развития:</h3>
        <div class="space-y-4">
          <div class="border-l-4 border-blue-500 pl-4">
            <p class="font-semibold">2009 год</p>
            <p>Основание учебного центра, получение первых лицензий</p>
          </div>
          <div class="border-l-4 border-blue-500 pl-4">
            <p class="font-semibold">2012 год</p>
            <p>Расширение программ, открытие корпоративного направления</p>
          </div>
          <div class="border-l-4 border-blue-500 pl-4">
            <p class="font-semibold">2015 год</p>
            <p>Внедрение дистанционных технологий обучения</p>
          </div>
          <div class="border-l-4 border-blue-500 pl-4">
            <p class="font-semibold">2020 год</p>
            <p>Открытие нового учебного комплекса с современным оборудованием</p>
          </div>
          <div class="border-l-4 border-blue-500 pl-4">
            <p class="font-semibold">2024 год</p>
            <p>Внедрение новых программ в соответствии с современными требованиями</p>
          </div>
        </div>
      </div>
    `,
    type: 'HTML' as const,
    page: 'about',
    section: 'history'
  }
]

export async function POST() {
  try {
    console.log('Starting additional content seeding...')
    
    let createdCount = 0
    
    for (const content of additionalContent) {
      console.log(`Creating content: ${content.key}`)
      
      try {
        await prisma.content.upsert({
          where: { key: content.key },
          update: {
            title: content.title,
            content: content.content,
            type: content.type,
            page: content.page,
            section: content.section
          },
          create: content
        })
        
        createdCount++
        console.log(`Successfully created/updated: ${content.key}`)
      } catch (error) {
        console.error(`Error with content ${content.key}:`, error)
      }
    }
    
    console.log(`Additional content seeding completed. Created/updated ${createdCount} items.`)

    return NextResponse.json({
      message: `Успешно добавлено ${createdCount} элементов дополнительного контента`,
      createdCount
    })

  } catch (error) {
    console.error('Error seeding additional content:', error)
    console.error('Error details:', error instanceof Error ? error.message : String(error))
    
    return NextResponse.json(
      { 
        error: 'Ошибка при добавлении дополнительного контента',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
