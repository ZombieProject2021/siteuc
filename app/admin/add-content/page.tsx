'use client'

import { useState } from 'react'
import { Plus, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AddContentPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    createdCount?: number
  } | null>(null)

  const handleAddContent = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/content/seed-additional', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          message: data.message,
          createdCount: data.createdCount
        })
      } else {
        setResult({
          success: false,
          message: data.error || 'Произошла ошибка при добавлении контента'
        })
      }
    } catch (error) {
      console.error('Error adding content:', error)
      setResult({
        success: false,
        message: `Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/admin" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Назад к панели администратора
            </Link>
            
            <div className="flex items-center space-x-3 mb-4">
              <Plus className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Добавление дополнительного контента
              </h1>
            </div>
            
            <p className="text-gray-600 text-lg">
              Расширение главной страницы новыми секциями и контентом
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Что будет добавлено:
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Секция новостей</h3>
                      <p className="text-gray-600 text-sm">Актуальные новости и обновления в законодательстве</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Дополнительные отзывы</h3>
                      <p className="text-gray-600 text-sm">Больше отзывов от студентов и корпоративных клиентов</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Секция партнеров</h3>
                      <p className="text-gray-600 text-sm">Информация о партнерах и статистике</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Контактная информация</h3>
                      <p className="text-gray-600 text-sm">Расширенные контакты и режим работы</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">История компании</h3>
                      <p className="text-gray-600 text-sm">Подробная информация о развитии учебного центра</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Дополнительные преимущества</h3>
                      <p className="text-gray-600 text-sm">Больше информации о форматах и возможностях обучения</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <h3 className="font-medium text-blue-900 mb-2">Элементы контента:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Новости о изменениях в законодательстве на 2024 год</li>
                  <li>• Информация об открытии нового учебного класса</li>
                  <li>• Отзывы от инженеров, HR-директоров и руководителей</li>
                  <li>• Статистика по партнерам и обученным сотрудникам</li>
                  <li>• Дополнительные телефоны отделов</li>
                  <li>• Режим работы учебного центра</li>
                  <li>• История развития компании с ключевыми этапами</li>
                </ul>
              </div>

              <div className="flex flex-col space-y-4">
                <button
                  onClick={handleAddContent}
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Добавление контента...</span>
                    </div>
                  ) : (
                    'Добавить дополнительный контент'
                  )}
                </button>

                {/* Result Display */}
                {result && (
                  <div className={`mt-6 p-4 rounded-lg ${
                    result.success 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {result.success ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <h3 className={`font-medium ${
                          result.success ? 'text-green-900' : 'text-red-900'
                        }`}>
                          {result.success ? 'Успешно!' : 'Ошибка'}
                        </h3>
                        <p className={`text-sm ${
                          result.success ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {result.message}
                        </p>
                        {result.success && result.createdCount && (
                          <p className="text-sm text-green-600 mt-2">
                            Добавлено элементов контента: {result.createdCount}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href="/admin"
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Вернуться в админ-панель
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Посмотреть главную страницу
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
