'use client'

import { useState } from 'react'
import { seedInitialContent } from '@/components/DynamicContent'
import { ArrowLeft, Database, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SeedContentPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSeedContent = async () => {
    setLoading(true)
    try {
      await seedInitialContent()
      setSuccess(true)
    } catch (error) {
      console.error('Error seeding content:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Link 
            href="/admin"
            className="inline-flex items-center text-edu-blue hover:text-edu-navy"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад в админ-панель
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <Database className="h-16 w-16 mx-auto mb-4 text-edu-blue" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Инициализация контента
            </h1>
            <p className="text-gray-600 mb-8">
              Создать начальный набор редактируемых текстов для сайта. 
              Это позволит вам управлять всеми текстами через админ-панель.
            </p>

            {success ? (
              <div className="text-center">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h2 className="text-xl font-semibold text-green-900 mb-4">
                  Контент успешно создан!
                </h2>
                <p className="text-green-700 mb-6">
                  Начальный ��абор контента добавлен в базу данных. 
                  Теперь вы можете редактировать тексты в разделе "Контент".
                </p>
                <Link 
                  href="/admin"
                  className="bg-edu-blue hover:bg-edu-navy text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Перейти к редактированию
                </Link>
              </div>
            ) : (
              <button
                onClick={handleSeedContent}
                disabled={loading}
                className="bg-edu-blue hover:bg-edu-navy text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Создание контента...' : 'Создать начальный контент'}
              </button>
            )}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              Что будет создано:
            </h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Заголовки и опи��ания главной страницы</li>
              <li>• Статистические показатели</li>
              <li>• Тексты страницы "О нас"</li>
              <li>• Контактная информация</li>
              <li>• Информация в футере сайта</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
