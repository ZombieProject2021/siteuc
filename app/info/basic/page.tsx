'use client'

import { useState, useEffect } from 'react'
import { Building, Phone, Mail, MapPin, Calendar, FileText, Download } from 'lucide-react'

interface OrganizationData {
  org_full_name: string
  org_short_name: string
  org_founding_date: string
  org_founder: string
  org_legal_address: string
  org_actual_address: string
  org_phone: string
  org_email: string
  org_ogrn: string
  org_inn: string
  org_kpp: string
  org_okved: string
  org_license_series: string
  org_license_number: string
  org_license_date: string
  org_license_issued_by: string
  org_license_validity: string
  org_license_file_url: string
  org_work_schedule: string
  org_vacation_schedule: string
}

const defaultData: OrganizationData = {
  org_full_name: 'Общество с ограниченной ответственностью «Учебный центр»',
  org_short_name: 'ООО «УЦ»',
  org_founding_date: '15 января 2020 года',
  org_founder: 'Иванов Иван Иванович',
  org_legal_address: '123456, г. Москва, ул. Примерная, д. 1, оф. 10',
  org_actual_address: '123456, г. Москва, ул. Примерная, д. 1, оф. 10',
  org_phone: '+7 (495) 123-45-67',
  org_email: 'info@example.ru',
  org_ogrn: '1234567890123',
  org_inn: '1234567890',
  org_kpp: '123456789',
  org_okved: '85.41 - Образование дополнительное детей и взрослых',
  org_license_series: '77Л01',
  org_license_number: '0123456',
  org_license_date: '20 января 2020 года',
  org_license_issued_by: 'Департамент образования и науки города Москвы',
  org_license_validity: 'Бессрочно',
  org_license_file_url: '',
  org_work_schedule: 'Понедельник-пятница: 09:00 - 18:00\nСуббота: 10:00 - 16:00\nВоскресенье: выходной',
  org_vacation_schedule: 'в соответствии с календарным учебным графиком'
}

export default function BasicInfoPage() {
  const [data, setData] = useState<OrganizationData>(defaultData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const settings = await response.json()
        
        // Объединяем настройки с данными по умолчанию
        const loadedData = { ...defaultData }
        Object.keys(defaultData).forEach(key => {
          if (settings[key]) {
            (loadedData as any)[key] = settings[key]
          }
        })
        
        setData(loadedData)
      }
    } catch (error) {
      console.error('Error loading organization data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatWorkSchedule = (schedule: string) => {
    return schedule.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Загрузка данных...</div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-edu-navy mb-6">
        Основные сведения
      </h2>

      <div className="space-y-8">
        {/* Organization Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-edu-navy mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Общие сведения
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Полное наименование
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                  {data.org_full_name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Сокращенное наименование
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                  {data.org_short_name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата создания
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  {data.org_founding_date}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Учредитель
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                  {data.org_founder}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-edu-navy mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Контактная информация
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Юридический адрес
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                  {data.org_legal_address}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Фактический адрес
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                  {data.org_actual_address}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <a href={`tel:${data.org_phone}`} className="hover:text-blue-600">
                    {data.org_phone}
                  </a>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Электронная почта
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <a href={`mailto:${data.org_email}`} className="hover:text-blue-600">
                    {data.org_email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Information */}
        <div>
          <h3 className="text-lg font-semibold text-edu-navy mb-4">
            Правовые сведения
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ОГРН
              </label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                {data.org_ogrn}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ИНН
              </label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                {data.org_inn}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                КПП
              </label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                {data.org_kpp}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ОКВЭД
              </label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                {data.org_okved}
              </p>
            </div>
          </div>
        </div>

        {/* License Information */}
        <div>
          <h3 className="text-lg font-semibold text-edu-navy mb-4">
            Лицензия на образовательную деятельность
          </h3>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Серия и номер
                </label>
                <p className="text-gray-900 font-semibold">
                  {data.org_license_series} № {data.org_license_number}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата выдачи
                </label>
                <p className="text-gray-900">
                  {data.org_license_date}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Кем выдана
                </label>
                <p className="text-gray-900">
                  {data.org_license_issued_by}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Срок действия
                </label>
                <p className="text-gray-900">
                  {data.org_license_validity}
                </p>
              </div>
            </div>

            {data.org_license_file_url && (
              <div className="mt-4">
                <a 
                  href={data.org_license_file_url} 
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-green-300 text-green-700 hover:bg-green-50 rounded-lg font-medium transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4" />
                  <span>Скачать копию лицензии (PDF)</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Work Schedule */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Режим работы
          </h3>
          <div className="text-blue-800 space-y-2">
            {formatWorkSchedule(data.org_work_schedule)}
            <p className="mt-4 text-sm">
              <strong>График каникул:</strong> {data.org_vacation_schedule}
            </p>
          </div>
        </div>

        {/* Legal Note */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Правовые основания размещения информации
          </h3>
          <div className="text-gray-700 space-y-2 text-sm">
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
            <p>
              <strong>Приказ Федеральной службы по надзору в сфере образования и науки 
              от 14.08.2020 № 831</strong> «Об утверждении Требований к структуре официального 
              сайта образовательной организации в информационно-телекоммуникационной сети 
              «Интернет» и формату представления информации»
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
