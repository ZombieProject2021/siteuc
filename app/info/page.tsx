import Link from 'next/link'
import { AlertCircle, FileText, CheckCircle } from 'lucide-react'

export default function InfoPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-edu-navy mb-6">
        Обязательная информация
      </h2>

      <div className="prose max-w-none">
        <p className="text-gray-700 mb-6">
          В данном разделе размещена информация об образовательной организации в соответствии 
          с требованиями <strong>статьи 29 Федерального закона от 29.12.2012 № 273-ФЗ 
          «Об образовании в Российской Федерации»</strong> и <strong>постановления Правительства 
          Российской Федерации от 20.10.2021 № 1802</strong>.
        </p>

        {/* Legal Requirements */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Правовые основания
              </h3>
              <ul className="text-blue-800 space-y-2">
                <li>• Федеральный закон «Об образовании в Российской Федерации» № 273-ФЗ</li>
                <li>• Постановление Правительства РФ от 20.10.2021 № 1802</li>
                <li>• Приказ Рособрнадзора от 14.08.2020 № 831</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sections Overview */}
        <h3 className="text-xl font-semibold text-edu-navy mb-4">
          Разделы сведений об организации
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            'Основные сведения',
            'Структура и органы управления образовательной организацией',
            'Д��кументы',
            'Образование',
            'Образовательные стандарты и требования',
            'Руководство. Педагогический (научно-педагогический) состав',
            'Материально-техническое обеспечение и оснащённость образовательного процесса',
            'Стипендии и меры поддержки обучающихся',
            'Платные образовательные услуги',
            'Финансово-хозяйственная деятельность',
            'Вакантные места для приёма (перевода) обучающихся',
            'Доступная среда',
            'Международное сотрудничество',
            'Организация питания в образовательной организации'
          ].map((section, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-green-800 text-sm font-medium">{section}</span>
            </div>
          ))}
        </div>

        {/* Document Requirements */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <FileText className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Требования к документам
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Все документы представлены в формате PDF</li>
                <li>• Документы подписаны усиленной квалифицированной электронной подписью (ЭЦП)</li>
                <li>• Информация актуализируется в течение 10 рабочих дней</li>
                <li>• Размещение информации осуществляется на официальном сайте в сети «Интернет»</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Выберите интересующий раздел из навигационного меню слева для получения подробной информации.
          </p>
          
          <Link 
            href="/info/basic"
            className="inline-flex items-center px-6 py-3 bg-edu-blue text-white font-semibold rounded-lg hover:bg-edu-navy transition-colors"
          >
            Начать с основных сведений
          </Link>
        </div>
      </div>
    </div>
  )
}
