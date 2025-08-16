'use client'

import { Building, Phone, Mail, MapPin, Calendar, FileText, Download } from 'lucide-react'
import InlineEditable from '@/components/InlineEditable'

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
                  Полное наименование
                </label>
                <div className="text-gray-900 bg-gray-50 p-3 rounded border">
                  <InlineEditable
                    contentKey="org_full_name"
                    defaultContent="Общество с ограниченной ответственностью «Учебный центр»"
                    saveToSettings={true}
                    placeholder="Введите полное наименование организации"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Сокращенное наименование
                </label>
                <div className="text-gray-900 bg-gray-50 p-3 rounded border">
                  <InlineEditable
                    contentKey="org_short_name"
                    defaultContent="ООО «УЦ»"
                    saveToSettings={true}
                    placeholder="Введите сокращенное наименование"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата создания
                </label>
                <div className="text-gray-900 bg-gray-50 p-3 rounded border flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <InlineEditable
                    contentKey="org_founding_date"
                    defaultContent="15 января 2020 года"
                    saveToSettings={true}
                    placeholder="Введите дату создания"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Учредитель
                </label>
                <div className="text-gray-900 bg-gray-50 p-3 rounded border">
                  <InlineEditable
                    contentKey="org_founder"
                    defaultContent="Иванов Иван Иванович"
                    saveToSettings={true}
                    placeholder="Введите данные учредителя"
                  />
                </div>
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
                <div className="text-gray-900 bg-gray-50 p-3 rounded border">
                  <InlineEditable
                    contentKey="org_legal_address"
                    defaultContent="123456, г. Москва, ул. Примерная, д. 1, оф. 10"
                    saveToSettings={true}
                    multiline={true}
                    placeholder="Введите юридический адрес"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Фактический адрес
                </label>
                <div className="text-gray-900 bg-gray-50 p-3 rounded border">
                  <InlineEditable
                    contentKey="org_actual_address"
                    defaultContent="123456, г. Москва, ул. Примерная, д. 1, оф. 10"
                    saveToSettings={true}
                    multiline={true}
                    placeholder="Введите фактический адрес"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон
                </label>
                <div className="text-gray-900 bg-gray-50 p-3 rounded border flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <InlineEditable
                    contentKey="org_phone"
                    defaultContent="+7 (495) 123-45-67"
                    saveToSettings={true}
                    placeholder="Введите номер телефона"
                    tag="span"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Электронная почта
                </label>
                <div className="text-gray-900 bg-gray-50 p-3 rounded border flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <InlineEditable
                    contentKey="org_email"
                    defaultContent="info@example.ru"
                    saveToSettings={true}
                    placeholder="Введите email адрес"
                    tag="span"
                  />
                </div>
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
              <div className="text-gray-900 bg-gray-50 p-3 rounded border">
                <InlineEditable
                  contentKey="org_ogrn"
                  defaultContent="1234567890123"
                  saveToSettings={true}
                  placeholder="Введите ОГРН"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ИНН
              </label>
              <div className="text-gray-900 bg-gray-50 p-3 rounded border">
                <InlineEditable
                  contentKey="org_inn"
                  defaultContent="1234567890"
                  saveToSettings={true}
                  placeholder="Введите ИНН"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                КПП
              </label>
              <div className="text-gray-900 bg-gray-50 p-3 rounded border">
                <InlineEditable
                  contentKey="org_kpp"
                  defaultContent="123456789"
                  saveToSettings={true}
                  placeholder="Введите КПП"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ОКВЭД
              </label>
              <div className="text-gray-900 bg-gray-50 p-3 rounded border">
                <InlineEditable
                  contentKey="org_okved"
                  defaultContent="85.41 - Образование дополнительное детей и взрослых"
                  saveToSettings={true}
                  placeholder="Введите ОКВЭД"
                />
              </div>
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
                <div className="text-gray-900 font-semibold">
                  <InlineEditable
                    contentKey="org_license_series"
                    defaultContent="77Л01"
                    saveToSettings={true}
                    placeholder="Серия"
                    tag="span"
                  />
                  <span> № </span>
                  <InlineEditable
                    contentKey="org_license_number"
                    defaultContent="0123456"
                    saveToSettings={true}
                    placeholder="Номер"
                    tag="span"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата выдачи
                </label>
                <div className="text-gray-900">
                  <InlineEditable
                    contentKey="org_license_date"
                    defaultContent="20 января 2020 года"
                    saveToSettings={true}
                    placeholder="Введите дату выдачи"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Кем выдана
                </label>
                <div className="text-gray-900">
                  <InlineEditable
                    contentKey="org_license_issued_by"
                    defaultContent="Департамент образования и науки города Москвы"
                    saveToSettings={true}
                    multiline={true}
                    placeholder="Введите орган, выдавший лицензию"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Срок действия
                </label>
                <div className="text-gray-900">
                  <InlineEditable
                    contentKey="org_license_validity"
                    defaultContent="Бессрочно"
                    saveToSettings={true}
                    placeholder="Введите срок действия"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <InlineEditable
                contentKey="org_license_file_url"
                defaultContent=""
                saveToSettings={true}
                placeholder="URL файла лицензии (загрузите через админку)"
                tag="div"
              />
            </div>
          </div>
        </div>

        {/* Work Schedule */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Режим ра��оты
          </h3>
          <div className="text-blue-800 space-y-2">
            <InlineEditable
              contentKey="org_work_schedule"
              defaultContent="Понедельник-пятница: 09:00 - 18:00&#10;Суббота: 10:00 - 16:00&#10;Воскресенье: выходной"
              saveToSettings={true}
              multiline={true}
              placeholder="Введите график работы"
              isHtml={true}
            />
            <div className="mt-4 text-sm">
              <strong>График каникул: </strong>
              <InlineEditable
                contentKey="org_vacation_schedule"
                defaultContent="в соответствии с календарным учебным графиком"
                saveToSettings={true}
                placeholder="Введите график каникул"
                tag="span"
              />
            </div>
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
              сайта образовательной организации в ��нформационно-телекоммуникационной сети 
              «Интернет» и формату представления информации»
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
