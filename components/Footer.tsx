import Link from 'next/link'
import { Phone, Mail, MapPin, FileText } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-edu-navy text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ООО Учебный Центр</h3>
            <p className="text-gray-300 text-sm mb-4">
              Дополнительное профессиональное образование с выдачей документов
              государственного образца. Лицензированные программы с 2008 года.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses" className="text-gray-300 hover:text-white transition-colors">
                  Курсы обучения
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">
                  Отзывы студентов
                </Link>
              </li>
              <li>
                <Link href="/info" className="text-gray-300 hover:text-white transition-colors">
                  Сведения об организации
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Правовая информация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/personal-data" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  Согласие на обработку ПД
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-300 hover:text-white transition-colors">
                  Карта сайта
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+7 (xxx) xxx-xx-xx</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@example.ru</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span>г. Москва, ул. Примерная, д. 1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <p>© {currentYear} ООО «Учебный Центр». Все права защищены.</p>
            <p className="mt-2 md:mt-0">
              Лицензия на образовательную деятельность. Соответствует требованиям 273-ФЗ.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
