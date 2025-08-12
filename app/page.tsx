import Link from 'next/link'
import { BookOpen, Users, FileText, Shield, Settings, Phone } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <a href="#main-content" className="skip-link">
        Перейти к основному содержанию
      </a>
      
      <div id="main-content">
        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-edu-blue to-edu-light-blue text-white rounded-lg mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            CMS UC
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Система управления контентом для учебных центров
          </p>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Полное соответствие требованиям российского законодательства 
            для образовательных организаций
          </p>
        </section>

        {/* Quick Navigation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-edu-navy mb-6">
            Быстрая навигация
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link 
              href="/info" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <FileText className="h-12 w-12 text-edu-blue mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Сведения об организации
              </h3>
              <p className="text-gray-600">
                Обязательная информация согласно законодательству РФ
              </p>
            </Link>

            <Link 
              href="/education" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <BookOpen className="h-12 w-12 text-edu-blue mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Образовательные программы
              </h3>
              <p className="text-gray-600">
                Информация о курсах и образовательных услугах
              </p>
            </Link>

            <Link 
              href="/documents" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <Shield className="h-12 w-12 text-edu-blue mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Документы
              </h3>
              <p className="text-gray-600">
                Нормативные документы и положения
              </p>
            </Link>

            <Link 
              href="/staff" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <Users className="h-12 w-12 text-edu-blue mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Педагогический состав
              </h3>
              <p className="text-gray-600">
                Информация о преподава��елях и сотрудниках
              </p>
            </Link>

            <Link 
              href="/admin" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <Settings className="h-12 w-12 text-edu-blue mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Управление
              </h3>
              <p className="text-gray-600">
                Административная панель
              </p>
            </Link>

            <Link 
              href="/contacts" 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <Phone className="h-12 w-12 text-edu-blue mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Контакты
              </h3>
              <p className="text-gray-600">
                Контактная информация и адреса
              </p>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="bg-edu-light-gray p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-edu-navy mb-6">
            Особенности CMS UC
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-edu-blue text-white p-2 rounded-full">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Соответствие законодательству РФ</h3>
                <p className="text-gray-600">
                  Все обязательные разделы и документы согласно требованиям
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-edu-blue text-white p-2 rounded-full">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Версия для слабовидящих</h3>
                <p className="text-gray-600">
                  Полная поддержка доступности и адаптивности
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-edu-blue text-white p-2 rounded-full">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Управление документами</h3>
                <p className="text-gray-600">
                  Загрузка PDF с ЭЦП и автоматическая организация
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-edu-blue text-white p-2 rounded-full">
                <Settings className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Удобная админ-панель</h3>
                <p className="text-gray-600">
                  Интуитивное управление всем контентом сайта
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
