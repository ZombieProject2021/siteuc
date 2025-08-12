'use client'

import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Clock, Users, Star, ArrowRight, Filter, Search } from 'lucide-react'

interface Course {
  id: number
  title: string
  slug: string
  description: string
  category: string
  duration: string
  price: number
  oldPrice?: number
  level: string
  format: string
  status: 'ACTIVE' | 'UPCOMING' | 'ARCHIVED' | 'DRAFT'
  maxStudents: number
  currentStudents: number
  avgRating: number
  reviewsCount: number
  startDate?: string
  imageSrc?: string
  features?: string[]
}

interface CoursesResponse {
  courses: Course[]
  total: number
  page: number
  pages: number
}

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
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    category: 'Все курсы',
    format: 'Все форматы',
    search: '',
    status: 'ACTIVE',
    priceRanges: [] as string[]
  })
  const [sortBy, setSortBy] = useState('popularity')
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    pages: 0
  })

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: '12',
        ...(filters.category !== 'Все курсы' && { category: filters.category }),
        ...(filters.format !== 'Все форматы' && { format: filters.format }),
        ...(filters.search && { search: filters.search }),
        ...(filters.priceRanges.length > 0 && { priceRanges: filters.priceRanges.join(',') }),
        status: filters.status,
        sortBy
      })

      const response = await fetch(`/api/courses?${params}`)
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки курсов')
      }

      const data: CoursesResponse = await response.json()
      setCourses(data.courses)
      setPagination({
        page: data.page,
        total: data.total,
        pages: data.pages
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [filters, pagination.page, sortBy])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPagination(prev => ({ ...prev, page: 1 })) // Reset to first page
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchCourses()
  }

  const getStatusColor = (status: Course['status']) => {
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

  const getStatusText = (status: Course['status']) => {
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ошибка загрузки</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => fetchCourses()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Попробовать снова
          </button>
        </div>
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
              Курсы дополнительного образования
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Получите новую профессию или повысьте квалификацию с документами государственного образца
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск курсов по названию или области..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Найти
                </button>
              </form>
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
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
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
                    <label key={format} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value={format}
                        checked={filters.format === format}
                        onChange={(e) => handleFilterChange('format', e.target.value)}
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
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">До 30 000 ₽</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">30 000 - 50 000 ₽</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">Свыше 50 000 ₽</span>
                  </label>
                </div>
              </div>

              <button 
                onClick={fetchCourses}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Применить фильтры
              </button>
            </div>
          </aside>

          {/* Courses Grid */}
          <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {loading ? 'Загрузка...' : `Найдено курсов: ${pagination.total}`}
              </h2>
              <select 
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  // TODO: Implement sorting
                  console.log('Sort by:', e.target.value)
                }}
              >
                <option>Сортировать по популярности</option>
                <option>Сортировать по цене (по возрастанию)</option>
                <option>Сортировать по цене (по убыванию)</option>
                <option>Сортировать по рейтингу</option>
                <option>Сортировать по дате</option>
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4"></div>
                      <div className="h-8 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative">
                      {course.imageSrc ? (
                        <img
                          src={course.imageSrc}
                          alt={course.title}
                          className="h-48 w-full object-cover"
                        />
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-white opacity-50" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(course.status)}`}>
                          {getStatusText(course.status)}
                        </span>
                      </div>
                      {course.oldPrice && course.oldPrice > course.price && (
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
                          <span className="ml-1 text-sm text-gray-600">{course.avgRating}</span>
                          <span className="ml-1 text-sm text-gray-400">({course.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 overflow-hidden">
                        <span className="block">{course.title}</span>
                      </h3>

                      <p className="text-gray-600 mb-4 overflow-hidden text-ellipsis">
                        {course.description.length > 120 ? course.description.substring(0, 120) + '...' : course.description}
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
                              {course.oldPrice && course.oldPrice > course.price && (
                                <span className="ml-2 text-lg text-gray-500 line-through">
                                  {course.oldPrice.toLocaleString('ru-RU')} ₽
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              или в расср��чку от {Math.round(course.price / 12).toLocaleString('ru-RU')} ₽/мес
                            </div>
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
            )}

            {!loading && courses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Курсы не найдены</h3>
                <p className="text-gray-600 mb-4">Попробуйте изменить параметры поиска</p>
                <button 
                  onClick={() => {
                    setFilters({
                      category: 'Все курсы',
                      format: 'Все форматы',
                      search: '',
                      status: 'ACTIVE'
                    })
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Назад
                  </button>
                  
                  {[...Array(pagination.pages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                      className={`px-4 py-2 border rounded-lg ${
                        pagination.page === i + 1
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
                    disabled={pagination.page === pagination.pages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Вперед
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
