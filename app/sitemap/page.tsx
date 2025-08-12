'use client'

import Link from 'next/link'
import { FileText, ChevronRight } from 'lucide-react'

export default function SitemapPage() {
  const siteStructure = [
    {
      title: 'Основные страницы',
      pages: [
        { name: 'Главная', href: '/', description: 'Главная страница сайта' },
        { name: 'О нас', href: '/about', description: 'Информация о нашем учебном центре' },
        { name: 'Курсы', href: '/courses', description: 'Каталог образовательных программ' },
        { name: 'Отзывы', href: '/reviews', description: 'Отзывы студентов о наших курсах' },
        { name: 'Контакты', href: '/contacts', description: 'Контактная информация и обратная связь' },
        { name: 'Консультация', href: '/consultation', description: 'Бесплатная консультация по выбору курса' },
      ]
    },
    {
      title: 'Сведения об образовательной организации',
      pages: [
        { name: 'Сведения об организации', href: '/info', description: 'Обязательная информация согласно 273-ФЗ' },
        { name: 'Основные сведения', href: '/info/basic', description: 'Основная информация об организации' },
        { name: 'Документы', href: '/info/documents', description: 'Нормативные документы и локальные акты' },
        { name: 'Структура и упра��ление', href: '/info/structure', description: 'Организационная структура' },
        { name: 'Образование', href: '/info/education', description: 'Информация о реализуемых программах' },
        { name: 'Образовательные стандарты', href: '/info/standards', description: 'Стандарты и требования' },
        { name: 'Руководство', href: '/info/leadership', description: 'Руководство организации' },
        { name: 'Педагогический состав', href: '/info/staff', description: 'Информация о преподавателях' },
        { name: 'Материально-техническое обеспечение', href: '/info/facilities', description: 'Оснащенность образовательного процесса' },
        { name: 'Стипендии и поддержка', href: '/info/scholarships', description: 'Меры поддержки обучающихся' },
        { name: 'Платные услуги', href: '/info/paid-services', description: 'Платные образовательные услуги' },
        { name: 'Финансовая деятельность', href: '/info/financial', description: 'Финансов��-хозяйственная деятельность' },
        { name: 'Вакантные места', href: '/info/vacancies', description: 'Места для приема обучающихся' },
        { name: 'Доступная среда', href: '/info/accessibility', description: 'Условия для людей с ограниченными возможностями' },
        { name: 'Международное сотрудничество', href: '/info/international', description: 'Международная деятельность' },
        { name: 'Организация питания', href: '/info/catering', description: 'Питание в образовательной организации' },
      ]
    },
    {
      title: 'Курсы и программы',
      pages: [
        { name: 'Управление персоналом', href: '/courses/upravlenie-personalom', description: 'Профессиональная переподготовка, 520 ак.ч.' },
        { name: 'Бухгалтерский учет', href: '/courses/buhgalterskiy-uchet', description: 'Профессиональная переподготовка, 256 ак.ч.' },
        { name: 'Проектное управление', href: '/courses/proektnoe-upravlenie', description: 'Повышение ��валификации, 144 ак.ч.' },
      ]
    },
    {
      title: 'Правовая информация',
      pages: [
        { name: 'Политика конфиденциальности', href: '/privacy', description: 'Политика обработки персональных данных' },
        { name: 'Согласие на обработку ПД', href: '/personal-data', description: 'Согласие на обработку персональных данных' },
      ]
    },
    {
      title: 'Административная панель',
      pages: [
        { name: 'Админ-панель', href: '/admin', description: 'Система управления контентом (для администраторов)' },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Карта сайта
            </h1>
            <p className="text-lg text-gray-600">
              Полная структура сайта ООО «Учебный Центр» для удобной навигации
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {siteStructure.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
                {section.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.pages.map((page, pageIndex) => (
                  <Link
                    key={pageIndex}
                    href={page.href}
                    className="group bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {page.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          {page.description}
                        </p>
                        <div className="text-xs text-blue-600 mt-2 font-mono">
                          {page.href}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors ml-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Footer Info */}
          <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Информация о сайте
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Соответствие законодательству</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Федеральный закон № 273-ФЗ «Об образовании в РФ»</li>
                  <li>• Постановление Правительства РФ № 1802</li>
                  <li>• Приказ Рособрнадзора № 831</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Доступность</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Версия для слабовидящих</li>
                  <li>• Семантическая верстка</li>
                  <li>• Клавиатурная навигация</li>
                  <li>• ARIA-атрибуты</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Последнее обновление карты сайта: {new Date().toLocaleDateString('ru-RU')}
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Карта сайта - ООО Учебный Центр',
  description: 'Полная структура сайта образовательной организации для удобной навигации по всем разделам и страницам',
}
