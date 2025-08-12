import { Building, Phone, Mail, MapPin, Calendar, FileText } from 'lucide-react'

export default function BasicInfoPage() {
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
                  Полное наименов��ние
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                  Общество с ограниченной ответственностью «Учебный центр»
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Сокращенное наименование
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                  ООО «УЦ»
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата создания
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  15 января 2020 года
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Учредитель
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                  Иванов Иван Иванович
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
                  123456, г. Москва, ул. Примерная, д. 1, оф. 10
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Фактический адрес
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                  123456, г. Москва, ул. Примерная, д. 1, оф. 10
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Те��ефон
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  +7 (495) 123-45-67
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Электронная почта
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded border flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  info@example.ru
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
                1234567890123
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ИНН
              </label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                1234567890
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                КПП
              </label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                123456789
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ОКВЭД
              </label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded border">
                85.41 - Образование дополнительное детей и взрослых
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
                  77Л01 № 0123456
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата выдачи
                </label>
                <p className="text-gray-900">
                  20 января 2020 года
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Кем выдана
                </label>
                <p className="text-gray-900">
                  Департамент образования и науки города Москвы
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Срок действия
                </label>
                <p className="text-gray-900">
                  Бессрочно
                </p>
              </div>
            </div>

            <div className="mt-4">
              <a 
                href="/documents/license.pdf" 
                className="document-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="h-4 w-4" />
                Скачать копию лицензии (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* Regulatory Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Режим работы
          </h3>
          <div className="text-blue-800">
            <p><strong>Понедельник-пятница:</strong> 09:00 - 18:00</p>
            <p><strong>Суббота:</strong> 10:00 - 16:00</p>
            <p><strong>Воскресенье:</strong> выходной</p>
            <p className="mt-2 text-sm">
              <strong>График каникул:</strong> в соответствии с календарным учебным графиком
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
