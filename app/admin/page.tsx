'use client'

import { useState } from 'react'
import { Settings, Users, FileText, BookOpen, Upload, BarChart3, Shield, Database } from 'lucide-react'
import DocumentUpload from '@/components/DocumentUpload'

type AdminSection = 'overview' | 'documents' | 'content' | 'users' | 'settings' | 'reports'

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview')
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{ name: string, date: string }>>([])

  const handleDocumentUpload = (file: File, signature?: File) => {
    const newDocument = {
      name: file.name,
      date: new Date().toLocaleDateString('ru-RU')
    }
    setUploadedDocuments(prev => [newDocument, ...prev])
  }

  const menuItems = [
    { id: 'overview', label: 'Обзор', icon: BarChart3 },
    { id: 'documents', label: 'Документы', icon: FileText },
    { id: 'content', label: 'Контент', icon: BookOpen },
    { id: 'users', label: 'Пользователи', icon: Users },
    { id: 'settings', label: 'Настройки', icon: Settings },
    { id: 'reports', label: 'Отчёты', icon: Database },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-edu-navy">Обзор системы</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-edu-blue" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Документы</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Обучающиеся</p>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Программы</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
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

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Последние изменения</h3>
              <div className="space-y-3">
                {uploadedDocuments.slice(0, 5).map((doc, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{doc.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{doc.date}</span>
                  </div>
                ))}
                {uploadedDocuments.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Нет последних изменений</p>
                )}
              </div>
            </div>
          </div>
        )

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-edu-navy">Управление документами</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Загрузка нового документа</h3>
              <DocumentUpload onUpload={handleDocumentUpload} />
            </div>

            {uploadedDocuments.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Загруженные документы</h3>
                <div className="space-y-2">
                  {uploadedDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-edu-blue" />
                        <span className="font-medium">{doc.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{doc.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 'content':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-edu-navy">Управление контентом</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Разделы сайта</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>Основные сведения</span>
                      <button className="text-edu-blue hover:text-edu-navy">Редактировать</button>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>Документы</span>
                      <button className="text-edu-blue hover:text-edu-navy">Редактировать</button>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>Педагогический состав</span>
                      <button className="text-edu-blue hover:text-edu-navy">Редактировать</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                    Добавить новость
                  </button>
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                    Обновить контактную информацию
                  </button>
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                    Изменить режим работы
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'users':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-edu-navy">Управление пользователями</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Список пользователей</h3>
                <button className="px-4 py-2 bg-edu-blue text-white rounded-lg hover:bg-edu-navy">
                  Добавить пользователя
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Имя
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Роль
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Администратор
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        admin@example.ru
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Администратор
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Активен
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-edu-navy">Настройки системы</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Общие настройки</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Название организации
                    </label>
                    <input
                      type="text"
                      defaultValue="ООО «Учебный центр»"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="info@example.ru"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      defaultValue="+7 (495) 123-45-67"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Безопасность</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Двухфакторная аутентификация</span>
                    <button className="bg-gray-300 relative inline-flex h-6 w-11 items-center rounded-full">
                      <span className="sr-only">Включить 2FA</span>
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Логирование действий</span>
                    <button className="bg-edu-blue relative inline-flex h-6 w-11 items-center rounded-full">
                      <span className="sr-only">Включить логирование</span>
                      <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Автоматическое резервное копирование</span>
                    <button className="bg-edu-blue relative inline-flex h-6 w-11 items-center rounded-full">
                      <span className="sr-only">Включить резервное копирование</span>
                      <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'reports':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-edu-navy">Отчёты и аналитика</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Соответствие требованиям</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Обязательные разделы сайта</span>
                  </div>
                  <span className="text-green-600 font-semibold">14/14</span>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Документы с ЭЦП</span>
                  </div>
                  <span className="text-green-600 font-semibold">24/24</span>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Версия для слабовидящих</span>
                  </div>
                  <span className="text-green-600 font-semibold">Активна</span>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Политика конфиденциальности</span>
                  </div>
                  <span className="text-green-600 font-semibold">Размещена</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-6">
            <h1 className="text-xl font-bold text-edu-navy">Админ-панель</h1>
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
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
