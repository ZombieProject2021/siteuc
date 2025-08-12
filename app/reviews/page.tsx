'use client'

import { useState, useEffect } from 'react'
import { Star, Users, Quote, BookOpen, Calendar, Filter } from 'lucide-react'

interface Review {
  id: number
  studentName: string
  courseTitle: string
  rating: number
  comment: string
  createdAt: string
  courseDuration: string
  studentPhoto?: string
}

// Simulated reviews data - in real app this would come from API
const reviewsData: Review[] = [
  {
    id: 1,
    studentName: 'Анна Петрова',
    courseTitle: 'Управление персоналом',
    rating: 5,
    comment: 'Отличный курс! Получила много практических знаний, которые сразу применила на работе. Преподаватели - настоящие профессионалы своего дела. Особенно понравились реальные кейсы от ведущих компаний. Рекомендую всем, кто хочет развиваться в HR-сфере.',
    createdAt: '2024-01-15',
    courseDuration: '520 ак.ч.'
  },
  {
    id: 2,
    studentName: 'Михаил Сидоров',
    courseTitle: 'Управление персоналом',
    rating: 5,
    comment: 'Курс помог мне получить повышение! Теоретические знания отлично дополнены практическими занятиями. Куратор всегда был на связи и помогал разобраться с трудными вопросами.',
    createdAt: '2024-01-10',
    courseDuration: '520 ак.ч.'
  },
  {
    id: 3,
    studentName: 'Елена Козлова',
    courseTitle: 'Бух��алтерский учет и налогообложение',
    rating: 5,
    comment: 'Очень довольна обучением! Теперь уверенно работаю в 1С и веду полный цикл бухгалтерского учета. Программа курса составлена очень грамотно - от простого к сложному.',
    createdAt: '2024-01-08',
    courseDuration: '256 ак.ч.'
  },
  {
    id: 4,
    studentName: 'Дмитрий Волков',
    courseTitle: 'Проектное управление',
    rating: 4,
    comment: 'Хороший курс по проектному управлению. Узнал много нового об Agile и Scrum методологиях. Единственный минус - хотелось бы больше практических упражнений.',
    createdAt: '2024-01-05',
    courseDuration: '144 ак.ч.'
  },
  {
    id: 5,
    studentName: 'Светлана Морозова',
    courseTitle: 'Цифровой маркетинг',
    rating: 5,
    comment: 'Превосходный курс! Изучили все актуальные инструменты digital-маркетинга. Преподаватель делился реальным опытом рабо��ы с крупными клиентами. Получила сертификаты Google и Яндекс.',
    createdAt: '2024-01-02',
    courseDuration: '350 ак.ч.'
  },
  {
    id: 6,
    studentName: 'Александр Новиков',
    courseTitle: 'Управление персоналом',
    rating: 5,
    comment: 'Отличная организация учебного процесса. Все материалы структурированы и легко усваиваются. Дистанционный формат очень удобен для работающих людей.',
    createdAt: '2023-12-28',
    courseDuration: '520 ак.ч.'
  },
  {
    id: 7,
    studentName: 'Ольга Смирнова',
    courseTitle: 'Бухгалтерский учет и налогообложение',
    rating: 4,
    comment: 'Качественное обучение с хорошей практической частью. Преподаватели отвечают на все вопросы. Немного не хватало времени на изучение некоторых тем.',
    createdAt: '2023-12-25',
    courseDuration: '256 ак.ч.'
  },
  {
    id: 8,
    studentName: 'Игорь Федоров',
    courseTitle: 'Проектное управление',
    rating: 5,
    comment: 'Курс полностью оправдал ожидания! Получил удостоверение государственного образца и сразу применил знания в работе. Коллеги заметили улучшения в управлении проектами.',
    createdAt: '2023-12-20',
    courseDuration: '144 ак.ч.'
  }
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(reviewsData)
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(reviewsData)
  const [selectedCourse, setSelectedCourse] = useState<string>('all')
  const [selectedRating, setSelectedRating] = useState<number>(0)

  const courses = Array.from(new Set(reviews.map(review => review.courseTitle)))
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  useEffect(() => {
    let filtered = reviews

    if (selectedCourse !== 'all') {
      filtered = filtered.filter(review => review.courseTitle === selectedCourse)
    }

    if (selectedRating > 0) {
      filtered = filtered.filter(review => review.rating >= selectedRating)
    }

    setFilteredReviews(filtered)
  }, [selectedCourse, selectedRating, reviews])

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const sizeClass = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Отзывы наших клиентов
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Узнайте, что говорят о нас выпускники наших программ
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{reviews.length}</div>
                <div className="text-blue-200">Отзывов</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold mr-2">{averageRating.toFixed(1)}</span>
                  {renderStars(Math.round(averageRating), 'lg')}
                </div>
                <div className="text-blue-200">Средняя оценка</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100)}%
                </div>
                <div className="text-blue-200">Довольных студентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 mr-2 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Фильтры</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Курс
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Все курсы</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Минимальная оценка
              </label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>Любая оценка</option>
                <option value={5}>5 звезд</option>
                <option value={4}>4+ звезд</option>
                <option value={3}>3+ звезд</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.studentName}</h3>
                    <p className="text-sm text-gray-600">{review.courseTitle}</p>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>

              <div className="mb-4">
                <Quote className="h-8 w-8 text-blue-200 mb-2" />
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {review.courseDuration}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Star className="h-12 w-12 mx-auto mb-2" />
              Отзывов по выбранным критериям не найдено
            </div>
            <button
              onClick={() => {
                setSelectedCourse('all')
                setSelectedRating(0)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Хотите стать следующим довольным студентом?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Присоединяйтесь к тысячам выпускников, которые уже достигли своих целей
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Выбрать курс
            </a>
            <a
              href="/consultation"
              className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Получить консультацию
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
