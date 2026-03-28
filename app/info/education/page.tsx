import { BookOpen, GraduationCap, Clock, Users, FileText, Download } from 'lucide-react'

export default function EducationPage() {
  const educationLevels = [
    {
      level: 'Дополнительное профессиональное образование',
      programs: [
        {
          name: 'Профессиональная переподготовка',
          duration: 'от 250 часов',
          form: 'Очно-заочная, дистанционная',
          description: 'Программы профессиональной переподготовки для получения новой квалификации'
        },
        {
          name: 'Повышение квалификации',
          duration: 'от 16 часов',
          form: 'Очно-заочная, дистанционная', 
          description: 'Программы повышения кв��лификации для совершенствования профессиональных компетенций'
        }
      ]
    }
  ]

  const currentPrograms = [
    {
      name: 'Менеджмент в образовании',
      code: 'ПП-001',
      level: 'Профессиональная переподготовка',
      duration: '520 академических часов',
      form: 'Дистанционная',
      qualification: 'Менеджер образования',
      students: 25,
      budget: 0,
      paid: 25,
      description: 'Программа направлена на подготовку специалистов в области управления образовательными организациями'
    },
    {
      name: 'Педагогическая деятельность в дополнительном образовании',
      code: 'ПП-002',
      level: 'Профессиональная переподготовка',
      duration: '340 академических часов',
      form: 'Очно-заочная',
      qualification: 'Педагог дополнительного образования',
      students: 18,
      budget: 0,
      paid: 18,
      description: 'Программа для подг��товки педагогов дополнительного образования детей и взрослых'
    },
    {
      name: 'Цифровые технологии в образовании',
      code: 'ПК-001',
      level: 'Повышение квалификации',
      duration: '72 академических часа',
      form: 'Дистанционная',
      qualification: 'Удостоверение о повышении квалификации',
      students: 45,
      budget: 0,
      paid: 45,
      description: 'Современные цифровые технологии и их применение в образовательном процессе'
    }
  ]

  const accreditation = {
    number: '№ 2547',
    date: '15.03.2023',
    validUntil: '15.03.2029',
    authority: 'Рособрнадзор'
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-6 flex items-center">
          <GraduationCap className="h-8 w-8 mr-3 text-edu-blue" />
          Образование
        </h1>
        
        <div className="prose max-w-none text-gray-700 mb-8">
          <p className="text-lg">
            Информация о реализуемых образовательных программах, включая адаптированные 
            образовательные программы, с указанием в отношении каждой образовательной программы 
            формы обучения, нормативного срока обучения, срока действия государственной 
            аккредитации образовательной программы.
          </p>
        </div>
      </div>

      {/* Уровни образования */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <BookOpen className="h-6 w-6 mr-3 text-edu-blue" />
          Уровни образования
        </h2>
        
        {educationLevels.map((level, index) => (
          <div key={index} className="mb-8 last:mb-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{level.level}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {level.programs.map((program, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{program.name}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span><strong>Продолжительность:</strong> {program.duration}</span>
                    </div>
                    <div>
                      <strong>Форма обучения:</strong> {program.form}
                    </div>
                    <p className="mt-3">{program.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Реализуемые программы */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <FileText className="h-6 w-6 mr-3 text-edu-blue" />
          Реализуемые образовательные программы
        </h2>
        
        <div className="space-y-6">
          {currentPrograms.map((program, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.name}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {program.level}
                  </span>
                </div>
                <span className="text-sm text-gray-500">Код: {program.code}</span>
              </div>
              
              <p className="text-gray-700 mb-4">{program.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <div className="text-sm font-medium text-gray-900">{program.duration}</div>
                  <div className="text-xs text-gray-600">Продолжительность</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <div className="text-sm font-medium text-gray-900">{program.form}</div>
                  <div className="text-xs text-gray-600">Форма обучения</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <div className="text-sm font-medium text-gray-900">{program.students}</div>
                  <div className="text-xs text-gray-600">Обучающихся</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <GraduationCap className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <div className="text-sm font-medium text-gray-900">Есть</div>
                  <div className="text-xs text-gray-600">Аккредитация</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div>
                  <strong>Квалификация:</strong> {program.qualification}
                </div>
                <div>
                  <strong>За счет бюджета:</strong> {program.budget} чел.
                </div>
                <div>
                  <strong>По договорам:</strong> {program.paid} чел.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Языки образования */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Языки образования</h2>
        <p className="text-gray-700">
          Образование осуществляется на <strong>русском языке</strong> - государственном языке Российской Федерации.
        </p>
      </div>

      {/* Государственная аккредитация */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Государственная аккредитация</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Номер свидетельства:</strong> {accreditation.number}
            </div>
            <div>
              <strong>Дата выдачи:</strong> {accreditation.date}
            </div>
            <div>
              <strong>Действительно до:</strong> {accreditation.validUntil}
            </div>
            <div>
              <strong>Выдано:</strong> {accreditation.authority}
            </div>
          </div>
        </div>
      </div>

      {/* Документы */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <Download className="h-6 w-6 mr-3 text-edu-blue" />
          Документы
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Лицензия на осуществление образовательной деятельности</h3>
              <p className="text-sm text-gray-600">Серия 77Л01 № 0009651, выдана 12.05.2020</p>
            </div>
            <a 
              href="/documents/license.pdf" 
              className="text-edu-blue hover:text-edu-navy font-medium"
              target="_blank"
            >
              Скачать PDF
            </a>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Свидетельство о государственной аккредитации</h3>
              <p className="text-sm text-gray-600">№ 2547 от 15.03.2023</p>
            </div>
            <a 
              href="/documents/accreditation.pdf" 
              className="text-edu-blue hover:text-edu-navy font-medium"
              target="_blank"
            >
              Скачать PDF
            </a>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Образовательные программы</h3>
              <p className="text-sm text-gray-600">Описания и учебные планы реализуемых программ</p>
            </div>
            <a 
              href="/documents/education-programs.pdf" 
              className="text-edu-blue hover:text-edu-navy font-medium"
              target="_blank"
            >
              Скачать PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
