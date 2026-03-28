'use client'

import { useState } from 'react'
import { Database, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { seedInitialContent } from '@/components/DynamicContent'

export default function SeedContentPage() {
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  const handleSeedContent = async () => {
    try {
      setLoading(true)
      setCompleted(false)
      
      toast.loading('Инициализация контента...', { id: 'seed-content' })
      
      await seedInitialContent()
      
      toast.success('Контент успешно инициализирован!', { id: 'seed-content' })
      setCompleted(true)
    } catch (error) {
      console.error('Content seeding error:', error)
      toast.error('Ошибка при инициализации контента', { id: 'seed-content' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <Database className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Инициализация контента
            </h1>
            <p className="text-gray-600 text-lg">
              Заполнение базы данных начальным контентом для главной страницы
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">
                ��то будет создано:
              </h2>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                  Контент для героя главной страницы
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                  Статистические данные
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                  Заголовки разделов программ и преимуществ
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                  Описания преимуществ (6 пунктов)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                  Призыв к действию
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                  Контактная информация
                </li>
              </ul>
            </div>

            {completed && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">
                      Контент успешно инициализирован!
                    </h3>
                    <p className="text-green-700">
                      Все необходимые записи контента созданы в базе данных.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                    Важно:
                  </h3>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• Если контент уже существует, он не будет перезаписан</li>
                    <li>• Процесс может занять несколько секунд</li>
                    <li>• Убедитесь, что база данных доступна</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleSeedContent}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-3 animate-spin" />
                    Инициализация...
                  </>
                ) : (
                  <>
                    <Database className="h-5 w-5 mr-3" />
                    Запустить инициализацию
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 text-center">
              <a
                href="/admin"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Вернуться в админ-панель
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
