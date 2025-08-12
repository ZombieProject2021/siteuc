import { Suspense } from 'react'
import Link from 'next/link'
import { BookOpen, Clock, Users, Star, ArrowRight, Filter, Search } from 'lucide-react'

// Simulated data - will be replaced with actual database queries
const coursesData = [
  {
    id: 1,
    title: 'Управление персоналом',
    slug: 'upravlenie-personalom',
    description: 'Полный курс по управлению персоналом для HR-специалистов и руководителей',
    category: 'Профессиональная переподготовка',
    duration: '520 ак.ч.',
    price: 45000,
    oldPrice: 55000,
    level: 'Средний',
    format: 'Дистанционно',
    status: 'ACTIVE',
    maxStudents: 25,
    currentStudents: 18,
    rating: 4.8,
    reviewsCount: 127,
    startDate: '2024-02-15',
    imageSrc: '/images/courses/hr-management.jpg',
    features: [
      'Диплом государственного образца',
      'Практические кейсы от ведущих компаний',
      'Поддержка куратора',
      'Помощь в трудоустройстве'
    ]
  },
  {
    id: 2,
    title: 'Бухгалтерский учет и налогообложение',
    slug: 'buhgalterskiy-uchet',
    description: 'Комплексная программа подготовки бухгалтеров с изучением 1С:Бухгалтерия',
    category: 'Профессиональная переподготовка',
    duration: '256 ак.ч.',
    price: 32000,
    oldPrice: 38000,
    level: 'Начальный',
    format: 'Очно-заочно',
    status: 'ACTIVE',
    maxStudents: 20,
    currentStudents: 15,
    rating: 4.9,
    reviewsCount: 89,
    startDate: '2024-03-01',
    imageSrc: '/images/courses/accounting.jpg',
    features: [
      'Диплом государственного образца',
      'Изучение 1С:Бухгалтерия 8.3',
      'Реальная отчетность',
      'Стажировка в компаниях-партнерах'
    ]
  },
  {
    id: 3,
    title: 'Проектное управление',
    slug: 'proektnoe-upravlenie',
    description: 'Современные методы управления проектами по международным стандартам',
    category: 'Повышение квалификации',
    duration: '144 ак.ч.',
    price: 25000,
    level: 'Продвинутый',
    format: 'Онлайн',
    status: 'ACTIVE',
    maxStudents: 30,
    currentStudents: 22,
    rating: 4.7,
    reviewsCount: 67,
    startDate: '2024-02-20',
    imageSrc: '/images/courses/project-management.jpg',
    features: [
      'Удостоверение о повышении квалификации',
      'Международные стандарты PMI',
      'Сертификат партнера Microsoft',
      'Практика на реальных проектах'
    ]
  },
  {
    id: 4,
    title: 'Цифровой маркетинг',
    slug: 'cifrovoy-marketing',
    description: 'Полный курс по digital-маркетингу: от SEO до социальных сетей',
    category: 'Профессиональная переподготовка',
    duration: '350 ак.ч.',
    price: 38000,
    oldPrice: 45000,
    level: 'Средний',
    format: 'Смешанный',
    status: 'UPCOMING',
    maxStudents: 25,
    currentStudents: 0,
    rating: 4.6,
    reviewsCount: 43,
    startDate: '2024-04-01',
    imageSrc: '/images/courses/digital-marketing.jpg',
    features: [
      'Диплом государственного образца',
      'Google и Яндекс сертификации',
      'Реальные рекламные кампании',
      'Портфолио проектов'
    ]
  }
]

const categories = [
  'Все курсы',
  'Профессиональная переподготовка',
  'Повышение квалификации',
  'Корпоративное обучение'
]

const formats = [
  'Все форматы',
  'Дистанционно',
  'Очно-заочно',
  'Онлайн',
  'Смешанный'
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Курсы дополнительного образования
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              П��лучите новую профессию или повысьте квалификацию с документами государственного образца
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск курсов по названию или области..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-medium transition-colors">
                  Найти
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Фильтры
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Категория</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        defaultChecked={category === 'Все курсы'}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Format Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Формат обучения</h4>
                <div className="space-y-2">
                  {formats.map((format) => (
                    <label key={format} className="flex items-center">
                      <input
                        type="radio"
                        name="format"
                        value={format}
                        defaultChecked={format === 'Все форматы'}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Стоимость</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">До 30 000 ₽</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">30 000 - 50 000 ₽</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">Свыше 50 000 ₽</span>
                  </label>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                Применить фильтры
              </button>
            </div>
          </aside>

          {/* Courses Grid */}
          <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Найдено курсов: {coursesData.length}
              </h2>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Сортировать по популярности</option>
                <option>Сортировать по цене (по возрастанию)</option>
                <option>Сортировать по цене (по убыванию)</option>
                <option>Сортировать по рейтингу</option>
                <option>Сортировать по дате</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coursesData.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-white opacity-50" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        course.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                        course.status === 'UPCOMING' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {course.status === 'ACTIVE' ? 'Идёт набор' :
                         course.status === 'UPCOMING' ? 'Скоро' : 'Завершен'}
                      </span>
                    </div>
                    {course.oldPrice && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        Скидка {Math.round((1 - course.price / course.oldPrice) * 100)}%
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-600 font-medium">{course.category}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
                        <span className="ml-1 text-sm text-gray-400">({course.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {course.currentStudents}/{course.maxStudents} мест
                      </div>
                      <div>Формат: {course.format}</div>
                      <div>Уровень: {course.level}</div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-gray-900">
                              {course.price.toLocaleString('ru-RU')} ₽
                            </span>
                            {course.oldPrice && (
                              <span className="ml-2 text-lg text-gray-500 line-through">
                                {course.oldPrice.toLocaleString('ru-RU')} ₽
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">или в рассрочку от {Math.round(course.price / 12).toLocaleString('ru-RU')} ₽/мес</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Link 
                          href={`/courses/${course.slug}`}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium text-center transition-colors"
                        >
                          Подробнее
                        </Link>
                        <button 
                          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                            course.status === 'ACTIVE' 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={course.status !== 'ACTIVE'}
                        >
                          {course.status === 'ACTIVE' ? 'Записаться' : 'Набор закрыт'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center">
                Показать ещё курсы
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
