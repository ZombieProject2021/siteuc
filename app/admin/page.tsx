'use client'

import { useState, useEffect } from 'react'
import { 
  Settings, 
  Users, 
  FileText, 
  BookOpen, 
  Upload, 
  BarChart3, 
  Shield, 
  Database,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye
} from 'lucide-react'
import { toast } from 'react-hot-toast'

type AdminSection = 'overview' | 'courses' | 'content' | 'leads' | 'settings' | 'reports'

interface Course {
  id: number
  title: string
  slug: string
  description: string
  category: string
  duration: string
  price: number
  oldPrice?: number
  status: 'ACTIVE' | 'UPCOMING' | 'ARCHIVED' | 'DRAFT'
  maxStudents: number
  currentStudents: number
  avgRating: number
  reviewsCount: number
  createdAt: string
}

interface Lead {
  id: number
  name: string
  email: string
  phone?: string
  courseId?: number
  message?: string
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'LOST'
  createdAt: string
  course?: {
    id: number
    title: string
  }
}

interface Settings {
  [key: string]: string
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview')
  const [courses, setCourses] = useState<Course[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [settings, setSettings] = useState<Settings>({})
  const [loading, setLoading] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [showCourseForm, setShowCourseForm] = useState(false)

  // Course form state
  const [courseForm, setCourseForm] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'Профессиональная переподготовка',
    duration: '',
    price: 0,
    oldPrice: 0,
    status: 'DRAFT' as const,
    maxStudents: 20,
    schedule: '',
    level: 'Средний',
    format: 'Дистанционно'
  })

  const menuItems = [
    { id: 'overview', label: 'Обзор', icon: BarChart3 },
    { id: 'courses', label: 'Курсы', icon: BookOpen },
    { id: 'leads', label: 'Заявки', icon: Users },
    { id: 'content', label: 'Контент', icon: FileText },
    { id: 'settings', label: 'Настройки', icon: Settings },
    { id: 'reports', label: 'Отчёты', icon: Database },
  ]

  // Fetch data functions
  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/courses')
      const data = await response.json()
      setCourses(data.courses || [])
    } catch (error) {
      toast.error('Ошибка загрузки курсов')
    } finally {
      setLoading(false)
    }
  }

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/leads')
      const data = await response.json()
      setLeads(data.leads || [])
    } catch (error) {
      toast.error('Ошибка загрузки заявок')
    } finally {
      setLoading(false)
    }
  }

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      toast.error('Ошибка загрузки настроек')
    }
  }

  // Course management functions
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      
      const method = editingCourse ? 'PUT' : 'POST'
      const url = editingCourse ? `/api/courses/${editingCourse.id}` : '/api/courses'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseForm)
      })

      if (!response.ok) {
        throw new Error('Ошибка сохранения курса')
      }

      toast.success(editingCourse ? 'Курс обновлен' : 'Курс создан')
      setShowCourseForm(false)
      setEditingCourse(null)
      resetCourseForm()
      fetchCourses()
    } catch (error) {
      toast.error('Ошибка сохранения курса')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCourse = async (courseId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот курс?')) return

    try {
      setLoading(true)
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Ошибка удаления курса')
      }

      toast.success('Курс удален')
      fetchCourses()
    } catch (error) {
      toast.error('Ошибка удаления курса')
    } finally {
      setLoading(false)
    }
  }

  const resetCourseForm = () => {
    setCourseForm({
      title: '',
      slug: '',
      description: '',
      category: 'Профессиональная переподготовка',
      duration: '',
      price: 0,
      oldPrice: 0,
      status: 'DRAFT',
      maxStudents: 20,
      schedule: '',
      level: 'Средний',
      format: 'Дистанционно'
    })
  }

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course)
    setCourseForm({
      title: course.title,
      slug: course.slug,
      description: course.description,
      category: course.category,
      duration: course.duration,
      price: course.price,
      oldPrice: course.oldPrice || 0,
      status: course.status,
      maxStudents: course.maxStudents,
      schedule: '', // Will need to be fetched from course details
      level: '', // Will need to be fetched from course details
      format: '' // Will need to be fetched from course details
    })
    setShowCourseForm(true)
  }

  // Settings management
  const handleSaveSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (!response.ok) {
        throw new Error('Ошибка сохранения настроек')
      }

      toast.success('Настройки сохранены')
    } catch (error) {
      toast.error('Ошибка сохранения настроек')
    } finally {
      setLoading(false)
    }
  }

  // Load data on component mount and section change
  useEffect(() => {
    if (activeSection === 'courses') {
      fetchCourses()
    } else if (activeSection === 'leads') {
      fetchLeads()
    } else if (activeSection === 'settings') {
      fetchSettings()
    } else if (activeSection === 'overview') {
      fetchCourses()
      fetchLeads()
      fetchSettings()
    }
  }, [activeSection])

  const renderOverview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-edu-navy">Обзор системы</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-edu-blue" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Курсы</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Заявки</p>
              <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Студенты</p>
              <p className="text-2xl font-bold text-gray-900">
                {courses.reduce((sum, course) => sum + course.currentStudents, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Соответствие</p>
              <p className="text-2xl font-bold text-green-600">100%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Последние заявки</h3>
        <div className="space-y-3">
          {leads.slice(0, 5).map((lead) => (
            <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Users className="h-4 w-4 text-gray-400" />
                <div>
                  <span className="text-gray-900 font-medium">{lead.name}</span>
                  <span className="text-gray-500 text-sm ml-2">{lead.email}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lead.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                  lead.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800' :
                  lead.status === 'CONVERTED' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {lead.status}
                </span>
                <div className="text-sm text-gray-500">
                  {new Date(lead.createdAt).toLocaleDateString('ru-RU')}
                </div>
              </div>
            </div>
          ))}
          {leads.length === 0 && (
            <p className="text-gray-500 text-center py-4">Нет заявок</p>
          )}
        </div>
      </div>
    </div>
  )

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-edu-navy">Управление курсами</h2>
        <button
          onClick={() => {
            resetCourseForm()
            setEditingCourse(null)
            setShowCourseForm(true)
          }}
          className="bg-edu-blue hover:bg-edu-navy text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить курс
        </button>
      </div>

      {showCourseForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingCourse ? 'Редактировать курс' : 'Новый курс'}
            </h3>
            <button
              onClick={() => {
                setShowCourseForm(false)
                setEditingCourse(null)
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSaveCourse} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название курса *
                </label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) => {
                    setCourseForm({ ...courseForm, title: e.target.value })
                    // Auto-generate slug
                    const slug = e.target.value
                      .toLowerCase()
                      .replace(/[^a-zа-я0-9\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-')
                      .trim()
                    setCourseForm(prev => ({ ...prev, slug }))
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL (slug) *
                </label>
                <input
                  type="text"
                  value={courseForm.slug}
                  onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание *
                </label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Категория *
                </label>
                <select
                  value={courseForm.category}
                  onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                >
                  <option>Профессиональная переподготовка</option>
                  <option>Повышение квалификации</option>
                  <option>Корпоративное обучение</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Длительность *
                </label>
                <input
                  type="text"
                  value={courseForm.duration}
                  onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                  placeholder="520 ак.ч."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Цена (₽) *
                </label>
                <input
                  type="number"
                  value={courseForm.price}
                  onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Старая цена (₽)
                </label>
                <input
                  type="number"
                  value={courseForm.oldPrice}
                  onChange={(e) => setCourseForm({ ...courseForm, oldPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Статус *
                </label>
                <select
                  value={courseForm.status}
                  onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                >
                  <option value="DRAFT">Черновик</option>
                  <option value="ACTIVE">Активный</option>
                  <option value="UPCOMING">Скоро</option>
                  <option value="ARCHIVED">Архив</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Макс. студентов *
                </label>
                <input
                  type="number"
                  value={courseForm.maxStudents}
                  onChange={(e) => setCourseForm({ ...courseForm, maxStudents: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowCourseForm(false)
                  setEditingCourse(null)
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-edu-blue text-white rounded-md hover:bg-edu-navy disabled:opacity-50 flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto admin-table">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Курс
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Категория
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Цена
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Студенты
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500">{course.duration}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      course.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      course.status === 'UPCOMING' ? 'bg-blue-100 text-blue-800' :
                      course.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {course.status === 'ACTIVE' ? 'Активный' :
                       course.status === 'UPCOMING' ? 'Скоро' :
                       course.status === 'DRAFT' ? 'Черновик' : 'Архив'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.price.toLocaleString('ru-RU')} ₽
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.currentStudents}/{course.maxStudents}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(`/courses/${course.slug}`, '_blank')}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {courses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Курсы не найдены
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderLeads = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-edu-navy">Управление заявками</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Контакт
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Курс
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                      {lead.phone && (
                        <div className="text-sm text-gray-500">{lead.phone}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.course?.title || 'Общая заявка'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      lead.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800' :
                      lead.status === 'QUALIFIED' ? 'bg-purple-100 text-purple-800' :
                      lead.status === 'CONVERTED' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <select
                      value={lead.status}
                      onChange={async (e) => {
                        // TODO: Update lead status
                        console.log('Update lead status:', lead.id, e.target.value)
                      }}
                      className="text-sm border-gray-300 rounded-md"
                    >
                      <option value="NEW">Новая</option>
                      <option value="CONTACTED">Связались</option>
                      <option value="QUALIFIED">Квалифицирована</option>
                      <option value="CONVERTED">Конвертирована</option>
                      <option value="LOST">Потеряна</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Заявки не найдены
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-edu-navy">Настройки сайта</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название сайта
            </label>
            <input
              type="text"
              value={settings.site_name || ''}
              onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание сайта
            </label>
            <textarea
              value={settings.site_description || ''}
              onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон
              </label>
              <input
                type="text"
                value={settings.contact_phone || ''}
                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={settings.contact_email || ''}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Адрес
            </label>
            <input
              type="text"
              value={settings.contact_address || ''}
              onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
            />
          </div>

          <div className="pt-4 border-t">
            <button
              onClick={handleSaveSettings}
              disabled={loading}
              className="bg-edu-blue hover:bg-edu-navy text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Сохранение...' : 'Сохранить настройки'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview()
      case 'courses':
        return renderCourses()
      case 'leads':
        return renderLeads()
      case 'settings':
        return renderSettings()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 bg-white shadow-lg min-h-screen border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-edu-navy">Админ-панель</h1>
            <p className="text-sm text-gray-500 mt-1">Управление контентом</p>
          </div>
          
          <nav className="mt-6">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as AdminSection)}
                  className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-edu-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-x-hidden">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {loading && activeSection === 'overview' ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Загрузка...</div>
              </div>
            ) : (
              renderContent()
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
