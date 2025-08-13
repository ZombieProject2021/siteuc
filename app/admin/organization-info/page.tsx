'use client'

import { useState, useEffect } from 'react'
import { Save, FileText, Edit, Eye, Plus, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ContentItem {
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

interface ContentSection {
  key: string
  title: string
  description: string
  icon: string
  sections: {
    key: string
    title: string
    description: string
  }[]
}

const INFO_SECTIONS: ContentSection[] = [
  {
    key: 'basic',
    title: 'Основные сведения',
    description: 'Основная информация об организации',
    icon: '🏢',
    sections: [
      { key: 'info', title: 'Общая информация', description: 'Название, адрес, контакты' },
      { key: 'history', title: 'История организации', description: 'История создания и развития' },
      { key: 'mission', title: 'Миссия и цели', description: 'Миссия организации и основные цели' }
    ]
  },
  {
    key: 'structure',
    title: 'Структура и органы управления',
    description: 'Структура образовательной организации',
    icon: '👥',
    sections: [
      { key: 'management', title: 'Органы управления', description: 'Коллегиальные органы управления' },
      { key: 'structure', title: 'Организационная структура', description: 'Структурные подразделения' }
    ]
  },
  {
    key: 'education',
    title: 'Образование',
    description: 'Информация о реализуемых программах',
    icon: '📚',
    sections: [
      { key: 'programs', title: 'Образовательные программы', description: 'Перечень реализуемых программ' },
      { key: 'schedule', title: 'Учебный план', description: 'Календарный учебный график' },
      { key: 'methods', title: 'Методические материалы', description: 'Методические и иные документы' }
    ]
  },
  {
    key: 'standards',
    title: 'Образовательные стандарты',
    description: 'Стандарты и требования',
    icon: '🏆',
    sections: [
      { key: 'federal', title: 'Федеральные стандарты', description: 'ФГОС и требования' },
      { key: 'professional', title: 'Профессиональные стандарты', description: 'Профстандарты для программ ДПО' }
    ]
  },
  {
    key: 'staff',
    title: 'Педагогический состав',
    description: 'Информация о педагогических работниках',
    icon: '👨‍🏫',
    sections: [
      { key: 'teachers', title: 'Преподаватели', description: 'Состав педагогических работников' },
      { key: 'qualifications', title: 'Квалификации', description: 'Образование и квалификация' }
    ]
  },
  {
    key: 'facilities',
    title: 'Материально-техническое обеспечение',
    description: 'Оснащённость образовательного процесса',
    icon: '🏗️',
    sections: [
      { key: 'equipment', title: 'Оборудование', description: 'Учебное оборудование и техника' },
      { key: 'library', title: 'Библиотека', description: 'Библиотечно-информационные ресурсы' },
      { key: 'digital', title: 'Цифровые ресурсы', description: 'Электронные ресурсы и платформы' }
    ]
  },
  {
    key: 'support',
    title: 'Стипендии и поддержка',
    description: 'Меры поддержки обучающихся',
    icon: '❤️',
    sections: [
      { key: 'scholarships', title: 'Стипендии', description: 'Стипендиальное обеспечение' },
      { key: 'support', title: 'Меры поддержки', description: 'Дополнительные меры поддержки' }
    ]
  },
  {
    key: 'paid-services',
    title: 'Платные услуги',
    description: 'Платные образовательные услуги',
    icon: '💰',
    sections: [
      { key: 'services', title: 'Перечень услуг', description: 'Документы о платных услугах' },
      { key: 'contracts', title: 'Договоры', description: 'Образцы договоров' }
    ]
  },
  {
    key: 'financial',
    title: 'Финансово-хозяйственная деятельность',
    description: 'Финансовая отчётность',
    icon: '����',
    sections: [
      { key: 'budget', title: 'Бюджет', description: 'Объём образовательной деятельности' },
      { key: 'reports', title: 'Отчёты', description: 'Финансовые отчёты' }
    ]
  },
  {
    key: 'vacancies',
    title: 'Вакантные места',
    description: 'Места для приёма обучающихся',
    icon: '📍',
    sections: [
      { key: 'admission', title: 'Вакантные места', description: 'Количество вакантных мест' }
    ]
  },
  {
    key: 'international',
    title: 'Международное сотрудничество',
    description: 'Международная деятельность',
    icon: '🌍',
    sections: [
      { key: 'cooperation', title: 'Сотрудничество', description: 'Международные соглашения' }
    ]
  }
]

export default function OrganizationInfoAdmin() {
  const [selectedSection, setSelectedSection] = useState<string>('')
  const [selectedSubsection, setSelectedSubsection] = useState<string>('')
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [showEditor, setShowEditor] = useState(false)

  useEffect(() => {
    if (selectedSection) {
      loadContent()
    }
  }, [selectedSection])

  const loadContent = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/content?page=info-${selectedSection}`)
      const data = await response.json()
      setContent(data.content || [])
    } catch (error) {
      toast.error('Ошибка загрузки контента')
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async (item: Partial<ContentItem>) => {
    try {
      const method = item.id ? 'PUT' : 'POST'
      const url = item.id ? `/api/content/${item.id}` : '/api/content'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...item,
          page: `info-${selectedSection}`,
          section: selectedSubsection || null
        })
      })

      if (!response.ok) {
        throw new Error('Ошибка сохранения')
      }

      toast.success('Контент сохранен')
      setShowEditor(false)
      setEditingItem(null)
      loadContent()
    } catch (error) {
      toast.error('Ошибка сохранения контента')
    }
  }

  const deleteContent = async (id: number) => {
    if (!confirm('Удалить этот контент?')) return

    try {
      const response = await fetch(`/api/content/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Ошибка удаления')
      }

      toast.success('Контент удален')
      loadContent()
    } catch (error) {
      toast.error('Ошибка удаления контента')
    }
  }

  const currentSection = INFO_SECTIONS.find(s => s.key === selectedSection)
  const filteredContent = selectedSubsection 
    ? content.filter(c => c.section === selectedSubsection)
    : content.filter(c => !c.section)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-edu-navy">
          Редактирование сведений об организации
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Selector */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Разделы</h3>
            <div className="space-y-2">
              {INFO_SECTIONS.map((section) => (
                <button
                  key={section.key}
                  onClick={() => {
                    setSelectedSection(section.key)
                    setSelectedSubsection('')
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedSection === section.key
                      ? 'bg-edu-blue text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{section.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{section.title}</div>
                      <div className="text-xs opacity-75">{section.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {!selectedSection ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Выберите раздел для редактирования
              </h3>
              <p className="text-gray-500">
                Выберите раздел из списка слева для начала редактирования контента
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Subsection Tabs */}
              {currentSection && currentSection.sections.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedSubsection('')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        !selectedSubsection
                          ? 'bg-edu-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Общее
                    </button>
                    {currentSection.sections.map((subsection) => (
                      <button
                        key={subsection.key}
                        onClick={() => setSelectedSubsection(subsection.key)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedSubsection === subsection.key
                            ? 'bg-edu-blue text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {subsection.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Content Management */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {currentSection?.title}
                        {selectedSubsection && ` - ${currentSection?.sections.find(s => s.key === selectedSubsection)?.title}`}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {selectedSubsection 
                          ? currentSection?.sections.find(s => s.key === selectedSubsection)?.description
                          : currentSection?.description
                        }
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem({
                          id: 0,
                          key: '',
                          title: '',
                          content: '',
                          type: 'HTML',
                          page: `info-${selectedSection}`,
                          section: selectedSubsection || undefined,
                          isActive: true,
                          createdAt: '',
                          updatedAt: ''
                        })
                        setShowEditor(true)
                      }}
                      className="bg-edu-blue hover:bg-edu-navy text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Добавить контент
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500">Загрузка контента...</div>
                    </div>
                  ) : filteredContent.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Контент не добавлен
                      </h3>
                      <p className="text-gray-500">
                        Добавьте первый элемент контента для этого раздела
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredContent.map((item) => (
                        <div
                          key={item.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-2">
                                {item.title}
                              </h4>
                              <div 
                                className="text-gray-600 text-sm line-clamp-3"
                                dangerouslySetInnerHTML={{ 
                                  __html: item.content.substring(0, 200) + (item.content.length > 200 ? '...' : '')
                                }}
                              />
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <span>Тип: {item.type}</span>
                                <span>Ключ: {item.key}</span>
                                <span className={`px-2 py-1 rounded ${
                                  item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {item.isActive ? 'Активно' : 'Неактивно'}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <button
                                onClick={() => {
                                  setEditingItem(item)
                                  setShowEditor(true)
                                }}
                                className="text-blue-600 hover:text-blue-800 p-2"
                                title="Редактировать"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteContent(item.id)}
                                className="text-red-600 hover:text-red-800 p-2"
                                title="Удалить"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Editor Modal */}
      {showEditor && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingItem.id ? 'Редактировать контент' : 'Добавить контент'}
              </h3>
              <button
                onClick={() => {
                  setShowEditor(false)
                  setEditingItem(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Заголовок *
                    </label>
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ключ *
                    </label>
                    <input
                      type="text"
                      value={editingItem.key}
                      onChange={(e) => setEditingItem({...editingItem, key: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Тип контента
                    </label>
                    <select
                      value={editingItem.type}
                      onChange={(e) => setEditingItem({...editingItem, type: e.target.value as 'TEXT' | 'HTML' | 'MARKDOWN'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                    >
                      <option value="TEXT">Текст</option>
                      <option value="HTML">HTML</option>
                      <option value="MARKDOWN">Markdown</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingItem.isActive}
                        onChange={(e) => setEditingItem({...editingItem, isActive: e.target.checked})}
                        className="mr-2"
                      />
                      Активно
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Содержимое *
                  </label>
                  <textarea
                    value={editingItem.content}
                    onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowEditor(false)
                  setEditingItem(null)
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={() => saveContent(editingItem)}
                className="px-4 py-2 bg-edu-blue text-white rounded-md hover:bg-edu-navy flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
