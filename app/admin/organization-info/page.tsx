'use client'

import { useState, useEffect } from 'react'
import { Save, Building, FileText, Phone, Mail, MapPin, Calendar, Clock, Shield, Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface OrganizationInfoData {
  // Общие сведения
  full_name: string
  short_name: string
  founding_date: string
  founder: string
  
  // Контактная информация
  legal_address: string
  actual_address: string
  phone: string
  email: string
  
  // Правовые сведения
  ogrn: string
  inn: string
  kpp: string
  okved: string
  
  // Лицензия
  license_series: string
  license_number: string
  license_date: string
  license_issued_by: string
  license_validity: string
  license_file_url: string
  
  // Режим работы
  work_schedule: string
  vacation_schedule: string
}

const defaultData: OrganizationInfoData = {
  full_name: 'Общество с ограниченной ответственностью «Учебный центр»',
  short_name: 'ООО «УЦ»',
  founding_date: '15 января 2020 года',
  founder: 'Иванов Иван Иванович',
  legal_address: '123456, г. Москва, ул. Примерная, д. 1, оф. 10',
  actual_address: '123456, г. Москва, ул. Примерная, д. 1, оф. 10',
  phone: '+7 (495) 123-45-67',
  email: 'info@example.ru',
  ogrn: '1234567890123',
  inn: '1234567890',
  kpp: '123456789',
  okved: '85.41 - Образование дополнительное детей и взрослых',
  license_series: '77Л01',
  license_number: '0123456',
  license_date: '20 января 2020 года',
  license_issued_by: 'Департамент образования и науки города Москвы',
  license_validity: 'Бессрочно',
  license_file_url: '',
  work_schedule: 'Понедельник-пятница: 09:00 - 18:00\nСуббота: 10:00 - 16:00\nВоскресенье: выходной',
  vacation_schedule: 'в соответствии с календарным учебным графиком'
}

export default function OrganizationInfoPage() {
  const [data, setData] = useState<OrganizationInfoData>(defaultData)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/settings')
      if (response.ok) {
        const settings = await response.json()
        
        // Преобразуем настройки в формат данных
        const loadedData = { ...defaultData }
        Object.keys(defaultData).forEach(key => {
          const settingKey = `org_${key}`
          if (settings[settingKey]) {
            (loadedData as any)[key] = settings[settingKey]
          }
        })
        
        setData(loadedData)
      }
    } catch (error) {
      toast.error('Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  const saveData = async () => {
    try {
      setSaving(true)
      
      // Преобразуем данные в формат настроек
      const settings: Record<string, string> = {}
      Object.entries(data).forEach(([key, value]) => {
        settings[`org_${key}`] = value
      })
      
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (!response.ok) {
        throw new Error('Ошибка сохранения')
      }

      toast.success('Данные успешно сохранены')
    } catch (error) {
      toast.error('Ошибка сохранения данных')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof OrganizationInfoData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const uploadLicenseFile = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'organization-docs')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Ошибка загрузки файла')
      }

      const result = await response.json()
      handleInputChange('license_file_url', result.url)
      toast.success('Файл лицензии загружен')
    } catch (error) {
      toast.error('Ошибка загрузки файла')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Загрузка данных...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-edu-navy">
            Сведения об образовательной организации
          </h1>
          <p className="text-gray-600 mt-1">
            Редактирование основных сведений в соответствии с требованиями законодательства
          </p>
        </div>
        <button
          onClick={saveData}
          disabled={saving}
          className="bg-edu-blue hover:bg-edu-navy text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center"
        >
          <Save className="h-5 w-5 mr-2" />
          {saving ? 'Сохранение...' : 'Сохранить все'}
        </button>
      </div>

      {/* Общие сведения */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Building className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Общие сведения</h2>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Полное наименование *
              </label>
              <input
                type="text"
                value={data.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Сокращенное наименование *
              </label>
              <input
                type="text"
                value={data.short_name}
                onChange={(e) => handleInputChange('short_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата создания *
              </label>
              <input
                type="text"
                value={data.founding_date}
                onChange={(e) => handleInputChange('founding_date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                placeholder="15 января 2020 года"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Учредитель *
              </label>
              <input
                type="text"
                value={data.founder}
                onChange={(e) => handleInputChange('founder', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Контактная информация */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Контактная информация</h2>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Юридический адрес *
              </label>
              <textarea
                value={data.legal_address}
                onChange={(e) => handleInputChange('legal_address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Фактический адрес *
              </label>
              <textarea
                value={data.actual_address}
                onChange={(e) => handleInputChange('actual_address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон *
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Электронная почта *
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Правовые сведения */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Правовые сведения</h2>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ОГРН *
              </label>
              <input
                type="text"
                value={data.ogrn}
                onChange={(e) => handleInputChange('ogrn', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ИНН *
              </label>
              <input
                type="text"
                value={data.inn}
                onChange={(e) => handleInputChange('inn', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                КПП *
              </label>
              <input
                type="text"
                value={data.kpp}
                onChange={(e) => handleInputChange('kpp', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ОКВЭД *
              </label>
              <input
                type="text"
                value={data.okved}
                onChange={(e) => handleInputChange('okved', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Лицензия */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-red-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Лицензия на образовательную деятельность</h2>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Серия лицензии *
              </label>
              <input
                type="text"
                value={data.license_series}
                onChange={(e) => handleInputChange('license_series', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Номер лицензии *
              </label>
              <input
                type="text"
                value={data.license_number}
                onChange={(e) => handleInputChange('license_number', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата выдачи *
              </label>
              <input
                type="text"
                value={data.license_date}
                onChange={(e) => handleInputChange('license_date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                placeholder="20 января 2020 года"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Срок действия *
              </label>
              <input
                type="text"
                value={data.license_validity}
                onChange={(e) => handleInputChange('license_validity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                placeholder="Бессрочно"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Кем выдана *
              </label>
              <input
                type="text"
                value={data.license_issued_by}
                onChange={(e) => handleInputChange('license_issued_by', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Файл лицензии (PDF)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) uploadLicenseFile(file)
                  }}
                  className="hidden"
                  id="license-upload"
                />
                <label
                  htmlFor="license-upload"
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Загрузить файл
                </label>
                {data.license_file_url && (
                  <a
                    href={data.license_file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Просмотреть загруженный файл
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Режим ��аботы */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-orange-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Режим работы</h2>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                График работы *
              </label>
              <textarea
                value={data.work_schedule}
                onChange={(e) => handleInputChange('work_schedule', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                placeholder="Понедельник-пятница: 09:00 - 18:00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                График каникул *
              </label>
              <textarea
                value={data.vacation_schedule}
                onChange={(e) => handleInputChange('vacation_schedule', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue"
                placeholder="в соответствии с календарным учебным графиком"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Информационное сообщение */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <FileText className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Правовые основания размещения информации
            </h3>
            <div className="text-blue-800 space-y-2 text-sm">
              <p>
                <strong>Статья 29. Информационная открытость образовательной организации</strong> 
                Федерального закона от 29.12.2012 № 273-ФЗ «Об образовании в Российской Федерации»
              </p>
              <p>
                <strong>Постановление Правительства РФ от 20.10.2021 № 1802</strong> 
                «Об утверждении Правил размещения на официальном сайте образовательной организации 
                в информационно-телекоммуникационной сети «Интернет» и обновления информации 
                об образовательной организации»
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
