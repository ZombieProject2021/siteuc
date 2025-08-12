'use client'

import { useState } from 'react'
import { Database, RefreshCw, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

export default function SeedAllPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{[key: string]: 'success' | 'error' | 'pending'}>({})

  const seedOperations = [
    {
      id: 'content',
      name: 'Базовый контент',
      description: 'Инициализация контента для главной страницы',
      url: '/admin/seed-content'
    },
    {
      id: 'courses',
      name: 'Примеры курсов',
      description: 'Создание демонстрационных курсов',
      endpoint: '/api/courses/seed'
    },
    {
      id: 'safety-courses',
      name: 'Курсы охраны труда',
      description: 'Создание полного каталога курсов по охране труда',
      endpoint: '/api/courses/seed-safety',
      url: '/admin/safety-courses'
    }
  ]

  const handleSeedAll = async () => {
    setLoading(true)
    setResults({})
    
    for (const operation of seedOperations) {
      try {
        setResults(prev => ({ ...prev, [operation.id]: 'pending' }))
        
        if (operation.id === 'content') {
          // Import and run content seeding
          const { seedInitialContent } = await import('@/components/DynamicContent')
          await seedInitialContent()
        } else if (operation.endpoint) {
          const response = await fetch(operation.endpoint, { method: 'POST' })
          if (!response.ok) {
            const errorText = await response.text().catch(() => 'Unknown error')
            throw new Error(`Failed to seed ${operation.name}: ${errorText}`)
          }
        }
        
        setResults(prev => ({ ...prev, [operation.id]: 'success' }))
        toast.success(`${operation.name} - выполнено`)
      } catch (error) {
        console.error(`Error seeding ${operation.name}:`, error)
        setResults(prev => ({ ...prev, [operation.id]: 'error' }))
        toast.error(`${operation.name} - ошибка`)
      }
    }
    
    setLoading(false)
    toast.success('Инициализация завершена!')
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
                Полная инициализация системы
              </h1>
              <p className="text-gray-600 mt-2">
                Заполнение всех необходимых данных для полноценной работы сайта
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {seedOperations.map((operation) => (
              <div key={operation.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {operation.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {operation.description}
                    </p>
                  </div>
                  
                  <div className="ml-4">
                    {results[operation.id] === 'pending' && (
                      <RefreshCw className="h-6 w-6 text-blue-600 animate-spin" />
                    )}
                    {results[operation.id] === 'success' && (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    )}
                    {results[operation.id] === 'error' && (
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                </div>
                
                {operation.url && (
                  <div className="mt-4">
                    <Link
                      href={operation.url}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Индивидуальная настройка →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Запустить полную инициализацию
                </h3>
                <p className="text-gray-600">
                  Автоматически выполнить все операции инициализации
                </p>
              </div>
              
              <button
                onClick={handleSeedAll}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Выполнение...
                  </>
                ) : (
                  <>
                    <Database className="h-5 w-5 mr-2" />
                    Запустить всё
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
              <div className="text-yellow-800">
                <h4 className="font-medium mb-1">Предупреждение</h4>
                <p className="text-sm">
                  Эта операция создаст тестовые данные в базе. Используйте только на новых или тестовых системах.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
