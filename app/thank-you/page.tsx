'use client'

import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, Mail, Clock } from 'lucide-react'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-2xl w-full mx-auto text-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Спасибо за обращение!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Ваша заявка успешно отправлена. Наш специалист свяжется с вами в ближайшее время.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Что дальше?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold">
                  1
                </div>
                <p className="text-blue-800">
                  Обработка заявки<br />
                  <span className="text-blue-600">в течение 30 минут</span>
                </p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold">
                  2
                </div>
                <p className="text-blue-800">
                  Звонок специалиста<br />
                  <span className="text-blue-600">в рабочее время</span>
                </p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold">
                  3
                </div>
                <p className="text-blue-800">
                  Консультация<br />
                  <span className="text-blue-600">и выбор программы</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Время ответа</h4>
              <p className="text-sm text-gray-600">
                Рабочие дни: в течение 30 минут<br />
                Выходные: в первый рабочий день
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Способ связи</h4>
              <p className="text-sm text-gray-600">
                Телефонный звонок или<br />
                выбранный вами способ
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/courses"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              Посмотреть курсы
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            
            <Link
              href="/"
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              Вернуться на главную
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">
              Нужна срочная консультация?
            </h4>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <a
                href="tel:+74951234567"
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Phone className="h-4 w-4 mr-1" />
                +7 (495) 123-45-67
              </a>
              <a
                href="mailto:info@uchebnycentr.ru"
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Mail className="h-4 w-4 mr-1" />
                info@uchebnycentr.ru
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Режим работы: Пн-Пт 09:00-18:00, Сб 10:00-16:00
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Спасибо за обращение - ООО Учебный Центр',
  description: 'Ваша заявка принята. Мы свяжемся с вами в ближайшее время.',
  robots: 'noindex, nofollow',
}
