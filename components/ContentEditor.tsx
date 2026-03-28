'use client'

import { useState, useEffect } from 'react'
import { Edit, Save, X, Plus, Trash2, Eye, Search, Filter } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Content {
  id: number
  key: string
  title: string
  content: string
  type: 'TEXT' | 'HTML' | 'MARKDOWN'
  page: string
  section?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface ContentEditorProps {
  onClose?: () => void
}

export default function ContentEditor({ onClose }: ContentEditorProps) {
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(false)
  const [editingContent, setEditingContent] = useState<Content | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPage, setFilterPage] = useState('')
  
  const [contentForm, setContentForm] = useState({
    key: '',
    title: '',
    content: '',
    type: 'TEXT' as const,
    page: '',
    section: '',
    isActive: true
  })

  const contentTypes = [
    { value: 'TEXT', label: 'Обычный текст' },
    { value: 'HTML', label: 'HTML' },
    { value: 'MARKDOWN', label: 'Markdown' }
  ]

  const pages = [
    'homepage',
    'about', 
    'courses',
    'info',
    'contacts',
    'consultation',
    'reviews',
    'footer',
    'header'
  ]

  // Fetch content
  const fetchContent = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/content')
      const data = await response.json()
      setContents(data.content || [])
    } catch (error) {
      toast.error('Ошибка загрузки контента')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  // Save content
  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      
      const method = editingContent ? 'PUT' : 'POST'
      const body = editingContent 
        ? { id: editingContent.id, ...contentForm }
        : contentForm
      
      const response = await fetch('/api/content', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        throw new Error('Ошибка сохранения контента')
      }

      toast.success(editingContent ? 'Контент обновлен' : 'Контент создан')
      setShowAddForm(false)
      setEditingContent(null)
      resetForm()
      fetchContent()
    } catch (error) {
      toast.error('Ошибка сохранения контента')
    } finally {
      setLoading(false)
    }
  }

  // Delete content
  const handleDeleteContent = async (contentId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот контент?')) return

    try {
      setLoading(true)
      const response = await fetch(`/api/content?id=${contentId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Ошибка удаления контента')
      }

      toast.success('Контент удален')
      fetchContent()
    } catch (error) {
      toast.error('Ошибка удаления контента')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setContentForm({
      key: '',
      title: '',
      content: '',
      type: 'TEXT',
      page: '',
      section: '',
      isActive: true
    })
  }

  const handleEditContent = (content: Content) => {
    console.log('handleEditContent called with:', content)
    setEditingContent(content)
    setContentForm({
      key: content.key,
      title: content.title,
      content: content.content,
      type: content.type,
      page: content.page,
      section: content.section || '',
      isActive: content.isActive
    })
    setShowAddForm(true)
    console.log('Edit form should be visible now')
  }

  // Filter contents
  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPage = !filterPage || content.page === filterPage
    return matchesSearch && matchesPage
  })

  // Get unique pages for filter
  const availablePages = [...new Set(contents.map(c => c.page))].sort()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-edu-navy">Редактор кон��ента</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              resetForm()
              setEditingContent(null)
              setShowAddForm(true)
            }}
            className="bg-edu-blue hover:bg-edu-navy text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Добавить контент
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по заголовку, ключу или содержимому..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
            />
          </div>
          
          <div className="relative">
            <Filter className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <select
              value={filterPage}
              onChange={(e) => setFilterPage(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue appearance-none"
            >
              <option value="">Все страницы</option>
              {availablePages.map(page => (
                <option key={page} value={page}>{page}</option>
              ))}
            </select>
          </div>
          
          <div className="text-sm text-gray-600 flex items-center">
            Найдено: {filteredContents.length} из {contents.length}
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingContent ? 'Редактировать контент' : 'Новый ко��тент'}
            </h3>
            <button
              onClick={() => {
                setShowAddForm(false)
                setEditingContent(null)
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSaveContent} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ключ (уникальный идентификатор) *
                </label>
                <input
                  type="text"
                  value={contentForm.key}
                  onChange={(e) => setContentForm({ ...contentForm, key: e.target.value })}
                  placeholder="например: homepage.hero.title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Заголовок *
                </label>
                <input
                  type="text"
                  value={contentForm.title}
                  onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                  placeholder="Описательное название"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Страница *
                </label>
                <select
                  value={contentForm.page}
                  onChange={(e) => setContentForm({ ...contentForm, page: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                  required
                >
                  <option value="">Выберите страницу</option>
                  {pages.map(page => (
                    <option key={page} value={page}>{page}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Раздел
                </label>
                <input
                  type="text"
                  value={contentForm.section}
                  onChange={(e) => setContentForm({ ...contentForm, section: e.target.value })}
                  placeholder="hero, features, about (необязательно)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Тип контента *
                </label>
                <select
                  value={contentForm.type}
                  onChange={(e) => setContentForm({ ...contentForm, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                >
                  {contentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={contentForm.isActive}
                  onChange={(e) => setContentForm({ ...contentForm, isActive: e.target.checked })}
                  className="h-4 w-4 text-edu-blue border-gray-300 rounded focus:ring-edu-blue"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Активный контент
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Содержимое *
              </label>
              <textarea
                value={contentForm.content}
                onChange={(e) => setContentForm({ ...contentForm, content: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {contentForm.type === 'HTML' && 'Можно использовать HTML-теги'}
                {contentForm.type === 'MARKDOWN' && 'Можно использовать Markdown-разметку'}
                {contentForm.type === 'TEXT' && 'Обычный текст без форматирования'}
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingContent(null)
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

      {/* Content List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Контент
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Страница/Раздел
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Тип
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContents.map((content) => (
                <tr key={content.id}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{content.title}</div>
                      <div className="text-sm text-gray-500 font-mono">{content.key}</div>
                      <div className="text-sm text-gray-600 mt-1 max-w-xs truncate">
                        {content.content}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{content.page}</div>
                    {content.section && (
                      <div className="text-sm text-gray-500">{content.section}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {content.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      content.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {content.isActive ? 'Активен' : 'Неактивен'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          console.log('Edit button clicked for content:', content.id)
                          handleEditContent(content)
                        }}
                        className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-md transition-colors"
                        title="Редактировать"
                        style={{ minWidth: '32px', minHeight: '32px' }}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          console.log('Delete button clicked for content:', content.id)
                          handleDeleteContent(content.id)
                        }}
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                        title="Удалить"
                        style={{ minWidth: '32px', minHeight: '32px' }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredContents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {contents.length === 0 ? 'Контент не найден' : 'Нет результатов поиска'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
