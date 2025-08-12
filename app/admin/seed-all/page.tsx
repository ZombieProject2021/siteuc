'use client'

import { useState } from 'react'
import { ArrowLeft, Database, CheckCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { seedInitialContent } from '@/components/DynamicContent'

export default function SeedAllPage() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<string[]>([])
  const [completed, setCompleted] = useState(false)

  const addProgress = (message: string) => {
    setProgress(prev => [...prev, message])
  }

  const handleSeedAll = async () => {
    setLoading(true)
    setProgress([])
    setCompleted(false)

    try {
      addProgress('🚀 Начинаем инициализацию...')

      // 1. Create sample courses if none exist
      addProgress('📚 Проверяем курсы...')
      const coursesResponse = await fetch('/api/courses')
      const coursesData = await coursesResponse.json()
      
      if (!coursesData.courses || coursesData.courses.length === 0) {
        addProgress('➕ Создаем примеры курсов...')
        
        const sampleCourses = [
          {
            title: 'Профессиональная переподготовка "Педагог дополнительного образования"',
            slug: 'pedagog-dopolnitelnogo-obrazovaniya',
            description: 'Комплексная программа переподготовки для работы в системе дополнительного образования детей и взрослых.',
            fullDescription: 'Программа предназначена для специалистов, планирующих работать в системе дополнительного образования.',
            category: 'Профессиональная переподготовка',
            duration: '520 ак.ч.',
            price: 15000,
            oldPrice: 18000,
            schedule: 'Пн-Пт 18:00-21:00',
            level: 'Средний',
            format: 'Дистанцио��но',
            status: 'ACTIVE',
            maxStudents: 25,
            features: ['Документ государственного образца', 'Индивидуальный график'],
            requirements: ['Высшее или среднее профессиональное образование'],
            outcomes: ['Получение права ведения педагогической деятельности'],
            certificate: true
          },
          {
            title: 'Повышение квалификации "Современные образовательные технологии"',
            slug: 'sovremennye-obrazovatelnye-tehnologii',
            description: 'Курс повышения квалификации для педагогов по изучению и внедрению современных образовательных технологий.',
            category: 'Повышение квалификации',
            duration: '72 ак.ч.',
            price: 8000,
            schedule: 'Вт, Чт 19:00-22:00',
            level: 'Продвинутый',
            format: 'Очно',
            status: 'UPCOMING',
            maxStudents: 20,
            features: ['Удостоверение о повышени�� квалификации'],
            requirements: ['Педагогическое образование'],
            outcomes: ['Владение современными технологиями'],
            certificate: true
          },
          {
            title: 'Управление персоналом',
            slug: 'upravlenie-personalom',
            description: 'Профессиональная переподготовка в области управления человеческими ресурсами.',
            category: 'Профессиональная переподготовка',
            duration: '256 ак.ч.',
            price: 25000,
            schedule: 'Сб-Вс 10:00-16:00',
            level: 'Профессиональный',
            format: 'Смешанный',
            status: 'ACTIVE',
            maxStudents: 15,
            features: ['Диплом', 'Практические кейсы'],
            requirements: ['Высшее образование'],
            outcomes: ['Навыки управления персоналом'],
            certificate: true
          }
        ]

        for (const course of sampleCourses) {
          const response = await fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
          })
          
          if (response.ok) {
            addProgress(`✅ Создан курс: ${course.title}`)
          } else {
            addProgress(`❌ Ошибка создания курса: ${course.title}`)
          }
        }
      } else {
        addProgress(`✅ Найдено ${coursesData.courses.length} курсов`)
      }

      // 2. Seed content
      addProgress('📝 Создаем контент для редактирования...')
      await seedInitialContent()
      addProgress('✅ Контент инициализирован')

      // 3. Check content was created
      addProgress('🔍 Проверяем созданный контент...')
      const contentResponse = await fetch('/api/content')
      const contentData = await contentResponse.json()
      
      if (contentData.contents && contentData.contents.length > 0) {
        addProgress(`✅ Создано ${contentData.contents.length} блоков для редактирования`)
      } else {
        addProgress('⚠️ Контент не найден, возможно требуется ручная настройка')
      }

      addProgress('🎉 Инициализация завершена успешно!')
      setCompleted(true)

    } catch (error) {
      console.error('Error seeding:', error)
      addProgress(`❌ Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
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
          <div className="text-center mb-8">
            <Database className="h-16 w-16 mx-auto mb-4 text-edu-blue" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Полная инициализация системы
            </h1>
            <p className="text-gray-600">
              Создать курсы и все редактируемые блоки контента для сайта.
            </p>
          </div>

          {!completed && !loading && (
            <div className="text-center mb-8">
              <button
                onClick={handleSeedAll}
                className="bg-edu-blue hover:bg-edu-navy text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Запустить инициализацию
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center text-edu-blue">
                <RefreshCw className="animate-spin mr-2 h-5 w-5" />
                Выполняется инициализация...
              </div>
            </div>
          )}

          {progress.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Прогресс выполнения:</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {progress.map((message, index) => (
                  <div key={index} className="text-sm font-mono">
                    {message}
                  </div>
                ))}
              </div>
            </div>
          )}

          {completed && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-xl font-semibold text-green-900 mb-4">
                Инициализация завершена!
              </h2>
              <p className="text-green-700 mb-6">
                Система готова к работе. Теперь вы можете редактировать контент и управлять курсами.
              </p>
              <div className="flex gap-4 justify-center">
                <Link 
                  href="/admin"
                  className="bg-edu-blue hover:bg-edu-navy text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Перейти в админ-панель
                </Link>
                <Link 
                  href="/"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Посмотреть сайт
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              Что будет создано:
            </h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• 3 примера курсов с полными данными</li>
              <li>• Более 15 редактируемых блоков контента</li>
              <li>• Заголовки и описания всех секций</li>
              <li>• Статистические показатели</li>
              <li>• Преимущества и особенности</li>
              <li>• Контактная информация</li>
              <li>• Настройки CMS для редактирования</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
