'use client'

import { useState } from 'react'
import { ArrowLeft, Database, CheckCircle, Wrench } from 'lucide-react'
import Link from 'next/link'

export default function FixCoursesPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleFixCourses = async () => {
    setLoading(true)
    setError('')
    try {
      // First, create some sample courses if none exist
      const coursesResponse = await fetch('/api/courses')
      const coursesData = await coursesResponse.json()
      
      if (coursesData.courses?.length === 0) {
        // Create sample courses
        const sampleCourses = [
          {
            title: 'Профессиональная переподготовка "Педагог дополнительного образования"',
            slug: 'pedagog-dopolnitelnogo-obrazovaniya',
            description: 'Комплексная программа переподготовки для работы в системе дополнительного образования детей и взрослых.',
            fullDescription: 'Программа предназначена для специалистов, планирующих работать в системе дополнительного образования. Включает изучение современных педагогических технологий, методов обучения и воспитания.',
            category: 'Профессиональная переподготовка',
            duration: '520 ак.ч.',
            price: 15000,
            oldPrice: 18000,
            schedule: 'Пн-Пт 18:00-21:00',
            level: 'Средний',
            format: 'Дистанционно',
            status: 'ACTIVE',
            maxStudents: 25,
            startDate: '2024-02-01',
            endDate: '2024-06-30',
            features: ['Документ государственного образца', 'Индивидуаль��ый график', 'Поддержка куратора'],
            requirements: ['Высшее или среднее профессиональное образование', 'Опыт работы желателен'],
            outcomes: ['Получение права ведения педагогической деятельности', 'Современные методики обучения', 'Практические навыки'],
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
            startDate: '2024-03-15',
            endDate: '2024-05-15',
            features: ['Удостоверение о повышении квалификации', 'Практические занятия', 'Сертификат'],
            requirements: ['Педагогическое образование', 'Опыт работы от 1 года'],
            outcomes: ['Владение современными технологиями', 'Повышение эффективности обучения'],
            certificate: true
          },
          {
            title: 'Корпоративное обучение "Управление образовательными проектами"',
            slug: 'upravlenie-obrazovatelnymi-proektami',
            description: 'Специализированная программа для руководителей образовательных учреждений по управлению проектами.',
            category: 'Корпоративное обучение',
            duration: '40 ак.ч.',
            price: 12000,
            schedule: 'Сб-Вс 10:00-18:00',
            level: 'Профессиональный',
            format: 'Смешанный',
            status: 'DRAFT',
            maxStudents: 15,
            features: ['Сертификат', 'Практическ��е кейсы', 'Наставничество'],
            requirements: ['Управленческий опыт', 'Образование в сфере управления'],
            outcomes: ['Навыки проектного управления', 'Повышение эффективности'],
            certificate: true
          }
        ]

        for (const course of sampleCourses) {
          await fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
          })
        }
      }

      // Now seed content
      const contentResponse = await fetch('/api/content')
      const contentData = await contentResponse.json()
      
      if (contentData.contents?.length === 0 || !contentData.contents) {
        // Seed initial content
        const { seedInitialContent } = await import('@/components/DynamicContent')
        await seedInitialContent()
      }

      setSuccess('База данных успешно инициализирована! Созданы курсы и начальный контент.')
    } catch (err) {
      console.error('Error fixing courses:', err)
      setError('Ошибка при инициализации данных')
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
            <Wrench className="h-16 w-16 mx-auto mb-4 text-edu-blue" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Инициализация базы данных
            </h1>
            <p className="text-gray-600 mb-8">
              Создать начальные курсы и контент, если база данных пустая.
              Это исправит ошибки 400 и 404 в системе.
            </p>

            {success ? (
              <div className="text-center">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h2 className="text-xl font-semibold text-green-900 mb-4">
                  Готов��!
                </h2>
                <p className="text-green-700 mb-6">
                  {success}
                </p>
                <Link 
                  href="/admin"
                  className="bg-edu-blue hover:bg-edu-navy text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Вернуться в админ-панель
                </Link>
              </div>
            ) : (
              <>
                <button
                  onClick={handleFixCourses}
                  disabled={loading}
                  className="bg-edu-blue hover:bg-edu-navy text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Инициализация...' : 'Инициализировать данные'}
                </button>
                
                {error && (
                  <div className="mt-4 text-red-600 font-medium">
                    {error}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              Что будет создано:
            </h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Три примера курсов с полными данными</li>
              <li>• Начальный контент для всех страниц</li>
              <li>• Исправление отсутствующих полей в курсах</li>
              <li>• Настройка базовой структуры CMS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
