import { Building2, Users, UserCheck, FileText, Shield } from 'lucide-react'

export default function StructurePage() {
  const departments = [
    {
      name: 'Администрация',
      head: 'Иванов Иван Иванович',
      position: 'Директор',
      phone: '+7 (495) 123-45-67',
      email: 'director@example.com'
    },
    {
      name: 'Учебно-методический отдел',
      head: 'Петрова Анна Сергеевна',
      position: 'Заведующий отделом',
      phone: '+7 (495) 123-45-68',
      email: 'metodist@example.com'
    },
    {
      name: 'Отдел качества образования',
      head: 'Сидоров Петр Алексеевич',
      position: 'Заведующий отделом',
      phone: '+7 (495) 123-45-69',
      email: 'quality@example.com'
    }
  ]

  const managementBodies = [
    {
      name: 'Общее собрание работников',
      description: 'Высший коллегиальный орган управления',
      competencies: [
        'Принятие решений о заключении коллективного договора',
        'Рассмотрение и принятие правил внутреннего трудового распорядка',
        'Выдвижение коллективных требований работников'
      ]
    },
    {
      name: 'Педагогический совет',
      description: 'Коллегиальный орган управления педагогической деятельностью',
      competencies: [
        'Разработка образовательных программ',
        'Выбор учебников и учебных пособий',
        'Организация научно-методической работы'
      ]
    },
    {
      name: 'Методический совет',
      description: 'Консультативный орган по вопросам мето��ической работы',
      competencies: [
        'Координация деятельности методических объединений',
        'Анализ состояния методической работы',
        'Планирование методической работы'
      ]
    }
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-6 flex items-center">
          <Building2 className="h-8 w-8 mr-3 text-edu-blue" />
          Структура и органы управления образовательной организации
        </h1>
        
        <div className="prose max-w-none text-gray-700 mb-8">
          <p className="text-lg">
            Управление образовательной организацией осуществляется в соответствии с 
            федеральными законами, иными нормативными правовыми актами Российской Федерации, 
            Уставом организации на основе сочетания принципов единоначалия и коллегиальности.
          </p>
        </div>
      </div>

      {/* Органы управления */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <UserCheck className="h-6 w-6 mr-3 text-edu-blue" />
          Органы управления
        </h2>
        
        <div className="space-y-6">
          {managementBodies.map((body, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{body.name}</h3>
              <p className="text-gray-600 mb-4">{body.description}</p>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Компетенции:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {body.competencies.map((competency, i) => (
                    <li key={i}>{competency}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Структурные подразделения */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <Users className="h-6 w-6 mr-3 text-edu-blue" />
          Структурные подразделения
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{dept.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Руководитель:</span> {dept.head}
                </div>
                <div>
                  <span className="font-medium">Должность:</span> {dept.position}
                </div>
                <div>
                  <span className="font-medium">Телефон:</span> {dept.phone}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {dept.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Положения об органах управления */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <FileText className="h-6 w-6 mr-3 text-edu-blue" />
          Положения об органах управления
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Положение об общем собрании работников</h3>
              <p className="text-sm text-gray-600">Регламентирует деятельность общего собрания работников</p>
            </div>
            <a 
              href="/documents/polozenie-obshee-sobranie.pdf" 
              className="text-edu-blue hover:text-edu-navy font-medium"
              target="_blank"
            >
              Скачать PDF
            </a>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Положение о педагогическом совете</h3>
              <p className="text-sm text-gray-600">Регламентирует деятельность педагогического совета</p>
            </div>
            <a 
              href="/documents/polozenie-pedsovет.pdf" 
              className="text-edu-blue hover:text-edu-navy font-medium"
              target="_blank"
            >
              Скачать PDF
            </a>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Положение о методическом совете</h3>
              <p className="text-sm text-gray-600">Регламентирует деятельность методического совета</p>
            </div>
            <a 
              href="/documents/polozenie-metodsovet.pdf" 
              className="text-edu-blue hover:text-edu-navy font-medium"
              target="_blank"
            >
              Скачать PDF
            </a>
          </div>
        </div>
      </div>

      {/* Контактная информация */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Правовая информация</h3>
            <p className="text-sm text-blue-800">
              Структура и органы управления образовательной организации определены в соответствии с 
              Федеральным законом от 29.12.2012 № 273-ФЗ "Об образовании в Российской Федерации" 
              и Уставом организации.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
