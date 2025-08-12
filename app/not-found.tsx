import Link from 'next/link'
import { Home, Search, ArrowLeft, BookOpen } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto text-center px-4">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Search className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Страница не найдена
          </h2>
          <p className="text-gray-600 mb-8">
            К сожалению, запрашиваемая вами страница не существует или была перемещена.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Вернуться на главную
          </Link>
          
          <Link
            href="/courses"
            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Посмотреть курсы
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full text-gray-500 hover:text-gray-700 py-3 px-6 font-medium transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Вернуться назад
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Если вы считаете, что это ошибка, свяжитесь с нами:
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <a
              href="tel:+74951234567"
              className="text-blue-600 hover:text-blue-700"
            >
              +7 (495) 123-45-67
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="mailto:info@uchebnycentr.ru"
              className="text-blue-600 hover:text-blue-700"
            >
              info@uchebnycentr.ru
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
