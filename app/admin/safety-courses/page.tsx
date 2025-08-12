'use client'

import { useState } from 'react'
import { Shield, RefreshCw, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

export default function SafetyCoursesPage() {
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleCreateSafetyCourses = async () => {
    try {
      setLoading(true)
      setCompleted(false)
      
      toast.loading('Создание курсов по охране труда...', { id: 'safety-courses' })
      
      const response = await fetch('/api/courses/seed-safety', {
        method: 'POST'
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при создании курсов')
      }
      
      setResults(data)
      toast.success('Курсы по охране труда успешно созданы!', { id: 'safety-courses' })
      setCompleted(true)
    } catch (error: any) {
      console.error('Safety courses creation error:', error)
      toast.error(error.message || 'Ошибка при создании курсов', { id: 'safety-courses' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <Link 
              href="/admin"
              className="mr-4 p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Курсы по охране труда
              </h1>
              <p className="text-gray-600 mt-2">
                Добавление специализированных программ обучения по охране труда
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Программы обучения по охране труда
            </h2>
            <p className="text-gray-600 text-lg">
              Полный набор курсов по охране труда в соответствии с действующим законодательством
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Будет создано 22 курса:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Программа «А» - Общие вопросы охраны труда
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Программа «Б» - Безопасные методы работ
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Программа «В» - Работы повышенной опасности
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Инструктор по охране труда
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Корпоративные тренинги
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Обучение по использованию СИЗ
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Водолазные работы
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Газоопасные работы
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Земляные работы
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Огневые работы
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Работы в электроустановках
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Работы на высоте
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Подъемные сооружения
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Строительные работы
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Лидерство в охране труда
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Оценка профессиональных рисков
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Профпереподготовка специалистов
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Система управления охраной труда
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Организация обеспечения СИЗ
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Охрана труда на английском языке
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Внеплановое обучение
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    И другие специализированные программы
                  </div>
                </div>
              </div>
            </div>

            {completed && results && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">
                      Курсы успешно созданы!
                    </h3>
                    <p className="text-green-700">
                      {results.message}
                    </p>
                  </div>
                </div>
                
                {results.courses && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-green-900 mb-2">
                      Созданные курсы:
                    </h4>
                    <div className="max-h-40 overflow-y-auto">
                      <ul className="text-sm text-green-800 space-y-1">
                        {results.courses.slice(0, 10).map((course: any, index: number) => (
                          <li key={course.id} className="flex items-center">
                            <span className="w-6 text-right mr-2">{index + 1}.</span>
                            {course.title}
                          </li>
                        ))}
                        {results.courses.length > 10 && (
                          <li className="text-green-600 italic">
                            ... и ещё {results.courses.length - 10} курсов
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                    Важная информация:
                  </h3>
                  <ul className="text-yellow-800 space-y-1 text-sm">
                    <li>• Курсы создаются в соответствии с действующим законодательством РФ</li>
                    <li>• Все программы соответствуют требованиям Минтруда России</li>
                    <li>• Если курсы уже существуют, новые создаваться не будут</li>
                    <li>• Длительность создания может составить несколько секунд</li>
                    <li>• После создания курсы будут доступны в разделе "Курсы" админ-панели</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleCreateSafetyCourses}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-3 animate-spin" />
                    Создание курсов...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-3" />
                    Создать курсы по охране труда
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/admin"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Вернуться в админ-панель
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
