import { ReactNode } from 'react'
import Link from 'next/link'
import { FileText, Building, Users, BookOpen, Award, DollarSign, MapPin, Heart, Globe } from 'lucide-react'

interface InfoLayoutProps {
  children: ReactNode
}

const infoSections = [
  { 
    href: '/info/basic', 
    label: 'Основные сведения', 
    icon: Building,
    description: 'Основная информация об организации'
  },
  { 
    href: '/info/structure', 
    label: 'Структура и органы управления', 
    icon: Users,
    description: 'Структура образовательной организации'
  },
  { 
    href: '/info/documents', 
    label: 'Документы', 
    icon: FileText,
    description: 'Нормативные документы и локальные акты'
  },
  { 
    href: '/info/education', 
    label: 'Образование', 
    icon: BookOpen,
    description: 'Информация о реализуемых программах'
  },
  { 
    href: '/info/standards', 
    label: 'Образовательные стандарты', 
    icon: Award,
    description: 'Стандарты и требования'
  },
  { 
    href: '/info/leadership', 
    label: 'Руководство', 
    icon: Users,
    description: 'Руководство образовательной организации'
  },
  { 
    href: '/info/staff', 
    label: 'Педагогический состав', 
    icon: Users,
    description: 'Информация о педагогических работниках'
  },
  { 
    href: '/info/facilities', 
    label: 'Материально-техническое обеспечение', 
    icon: Building,
    description: 'Оснащённость образовательного процесса'
  },
  { 
    href: '/info/scholarships', 
    label: 'Стипендии и поддержка', 
    icon: DollarSign,
    description: 'Меры поддержки обучающихся'
  },
  { 
    href: '/info/paid-services', 
    label: 'Пла��ные услуги', 
    icon: DollarSign,
    description: 'Платные образовательные услуги'
  },
  { 
    href: '/info/financial', 
    label: 'Финансово-хозяйственная деятельность', 
    icon: DollarSign,
    description: 'Финансовая отчётность'
  },
  { 
    href: '/info/vacancies', 
    label: 'Вакантные места', 
    icon: MapPin,
    description: 'Места для приёма обучающихся'
  },
  { 
    href: '/info/international', 
    label: 'Международное сотрудничество', 
    icon: Globe,
    description: 'Международная деятельность'
  },
  { 
    href: '/info/catering', 
    label: 'Организация питания', 
    icon: Heart,
    description: 'Питание в образовательной организации'
  }
]

export default function InfoLayout({ children }: InfoLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-4">
          Сведения об образовательной организации
        </h1>
        <p className="text-gray-600 mb-6">
          Инф��рмация размещена в соответствии с требованиями статьи 29 Федерального закона 
          от 29.12.2012 № 273-ФЗ «Об образовании в Российской Федерации»
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-edu-navy">
              Разделы
            </h2>
            <nav className="space-y-2">
              {infoSections.map((section) => {
                const IconComponent = section.icon
                return (
                  <Link
                    key={section.href}
                    href={section.href}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-edu-light-gray transition-colors group"
                  >
                    <IconComponent className="h-5 w-5 text-edu-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-edu-blue">
                        {section.label}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {section.description}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Важное уведомление
            </h3>
            <p className="text-sm text-yellow-700">
              Все документы представлены в формате PDF и подписаны электронной цифровой подписью (ЭЦП) 
              в соответствии с требованиями законодательства.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
