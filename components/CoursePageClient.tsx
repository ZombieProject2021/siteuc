'use client'

import { useState } from 'react'
import { Star, Clock, Users, Calendar, CheckCircle, Award, BookOpen, ArrowRight, Phone, Mail } from 'lucide-react'
import EnrollmentModal from './EnrollmentModal'

interface Course {
  id: number
  title: string
  slug: string
  description: string
  fullDescription?: string
  category: string
  duration: string
  price: number
  oldPrice?: number
  schedule: string
  level: string
  format: string
  status: string
  maxStudents: number
  currentStudents: number
  startDate?: string
  endDate?: string
  features?: string[]
  requirements?: string[]
  outcomes?: string[]
  imageSrc?: string
  certificate: boolean
  avgRating: number
  enrollmentsCount: number
  reviewsCount: number
  lessons: Array<{
    id: number
    title: string
    description?: string
    duration: number
    order: number
  }>
  reviews: Array<{
    id: number
    studentName: string
    rating: number
    comment: string
    createdAt: string
  }>
}

interface CoursePageClientProps {
  course: Course
}

export default function CoursePageClient({ course }: CoursePageClientProps) {
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'UPCOMING':
        return 'bg-blue-100 text-blue-800'
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800'
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'Идёт набор'
      case 'UPCOMING':
        return 'Скоро'
      case 'ARCHIVED':
        return 'Завершен'
      case 'DRAFT':
        return 'Черновик'
      default:
        return 'Неизвестно'
    }
  }

  const handleEnrollment = async (data: any) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          courseId: course.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Ошибка при отправке заявки')
      }

      // Success is handled by the modal
    } catch (error) {
      console.error('Enrollment error:', error)
      throw error
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(course.status)}`}>
                  {getStatusText(course.status)}
                </span>
                <span className="text-blue-200">{course.category}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 max-w-3xl">
                {course.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-sm text-blue-200">Длительность</div>
                  <div className="font-semibold">{course.duration}</div>
                </div>
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-sm text-blue-200">Студентов</div>
                  <div className="font-semibold">{course.currentStudents}/{course.maxStudents}</div>
                </div>
                <div className="text-center">
                  <Star className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-sm text-blue-200">Рейтинг</div>
                  <div className="font-semibold">{course.avgRating}</div>
                </div>
                <div className="text-center">
                  <Award className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-sm text-blue-200">Сертификат</div>
                  <div className="font-semibold">{course.certificate ? 'Да' : 'Нет'}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setEnrollmentModalOpen(true)}
                  className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
                    course.status === 'ACTIVE' 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                      : 'bg-gray-500 text-white cursor-not-allowed'
                  }`}
                  disabled={course.status !== 'ACTIVE'}
                >
                  {course.status === 'ACTIVE' ? 'Записаться на курс' : 'Набор закрыт'}
                </button>
                <a
                  href="/consultation"
                  className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center"
                >
                  Консультация
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Course Description */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">О курсе</h2>
                <div 
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: course.fullDescription || course.description }}
                />
              </div>

              {/* Features */}
              {course.features && course.features.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Что включено</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {course.requirements && course.requirements.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Требования</h2>
                  <ul className="space-y-3">
                    {course.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learning Outcomes */}
              {course.outcomes && course.outcomes.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Результаты обучения</h2>
                  <ul className="space-y-3">
                    {course.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Lessons Preview */}
              {course.lessons && course.lessons.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Программа курса</h2>
                  <div className="space-y-4">
                    {course.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                              {lesson.description && (
                                <p className="text-gray-600 text-sm mt-1">{lesson.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {lesson.duration} мин
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {course.reviews && course.reviews.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Отзывы студентов ({course.reviewsCount})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {course.reviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{review.studentName}</h4>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                        <div className="text-xs text-gray-500 mt-2">
                          {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                        </div>
                      </div>
                    ))}
                  </div>
                  {course.reviewsCount > 6 && (
                    <div className="text-center mt-6">
                      <a
                        href="/reviews"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Показать все отзывы
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Price Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {course.price.toLocaleString('ru-RU')} ₽
                    </span>
                    {course.oldPrice && course.oldPrice > course.price && (
                      <span className="ml-2 text-lg text-gray-500 line-through">
                        {course.oldPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    или в рассрочку от {Math.round(course.price / 12).toLocaleString('ru-RU')} ₽/мес
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <button 
                    onClick={() => setEnrollmentModalOpen(true)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                      course.status === 'ACTIVE' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={course.status !== 'ACTIVE'}
                  >
                    {course.status === 'ACTIVE' ? 'Записаться на курс' : 'Набор закрыт'}
                  </button>
                  <a
                    href="/consultation"
                    className="w-full border border-gray-300 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-colors text-center block"
                  >
                    Получить консультацию
                  </a>
                </div>

                <div className="border-t pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Формат:</span>
                    <span className="font-medium">{course.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Уровень:</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  {course.startDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Начало:</span>
                      <span className="font-medium">
                        {new Date(course.startDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Мест осталось:</span>
                    <span className="font-medium">{course.maxStudents - course.currentStudents}</span>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Есть вопросы?</h3>
                <p className="text-blue-100 mb-4 text-sm">
                  Свяжитесь с нами для получения подробной информации о курсе
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+74951234567"
                    className="flex items-center space-x-2 text-sm hover:text-yellow-200 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>+7 (495) 123-45-67</span>
                  </a>
                  <a
                    href="mailto:info@uchebnycentr.ru"
                    className="flex items-center space-x-2 text-sm hover:text-yellow-200 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>info@uchebnycentr.ru</span>
                  </a>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-3">
                  Важная информация
                </h3>
                <ul className="text-sm text-amber-800 space-y-2">
                  <li>• {course.certificate ? 'Диплом государственного образца' : 'Сертификат об окончании'}</li>
                  <li>• Доступ к материалам на 6 месяцев</li>
                  <li>• Поддержка преподавателя</li>
                  <li>• Практические задания</li>
                  <li>• Помощь в трудоустройстве</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        courseId={course.id}
        courseTitle={course.title}
        coursePrice={course.price}
        onSubmit={handleEnrollment}
      />
    </>
  )
}
