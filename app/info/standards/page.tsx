import { Shield, FileText, Download, CheckCircle, AlertCircle } from 'lucide-react'

export default function StandardsPage() {
  const federalStandards = [
    {
      name: 'Профессиональный стандарт "Педагог"',
      code: 'ПС 01.001',
      approved: 'Приказ Минтруда России от 18.10.2013 № 544н',
      description: 'Профессиональный стандарт педагогической деятельности в дошкольном, начальном общем, основном общем, среднем общем образовании',
      document: '/documents/standard-pedagog.pdf'
    },
    {
      name: 'Профессиональный стандарт "Педагог дополнительного образования детей и взрослых"',
      code: 'ПС 01.003',
      approved: 'Приказ Минтруда России от 08.09.2015 № 613н',
      description: 'Профессиональный стандарт в области дополнительного образования',
      document: '/documents/standard-pedagog-dop.pdf'
    },
    {
      name: 'Профессиональный стандарт "Руководитель образовательной организации"',
      code: 'ПС 01.011',
      approved: 'Приказ Минтруда России от 19.04.2021 № 250н',
      description: 'Профессиональный стандарт управления образовательной организацией',
      document: '/documents/standard-rukovoditel.pdf'
    }
  ]

  const internalStandards = [
    {
      name: 'Положение о порядке разработки и утверждения образовательных программ',
      description: 'Локальный нормативный акт, регламентирующий разработку образовательных программ',
      approved: 'Утверждено приказом директора от 01.09.2023 № 45',
      document: '/documents/polozenie-programmy.pdf'
    },
    {
      name: 'Положение о текущем контроле успеваем��сти и промежуточной аттестации',
      description: 'Порядок проведения оценки знаний обучающихся',
      approved: 'Утверждено приказом директора от 01.09.2023 № 46',
      document: '/documents/polozenie-attestaciya.pdf'
    },
    {
      name: 'Положение об итоговой аттестации',
      description: 'Порядок проведения итоговой аттестации по программам ДПО',
      approved: 'Утверждено приказом директора от 01.09.2023 № 47',
      document: '/documents/polozenie-itogovaya.pdf'
    }
  ]

  const requirements = [
    {
      title: 'Квалификационные требования',
      items: [
        'Высшее образование или среднее профессиональное образование в рамках укрупненных групп направлений подготовки высшего образования и специальностей среднего профессионального образования "Образование и педагогические науки"',
        'Дополнительное профессиональное о��разование по программам повышения квалификации не реже одного раза в три года',
        'Отсутствие ограничений на занятие педагогической деятельностью'
      ]
    },
    {
      title: 'Компетенции педагогических работников',
      items: [
        'Готовность к психолого-педагогической деятельности по реализации образовательных программ',
        'Способность осуществлять обучение, воспитание и развитие с учетом социальных, возрастных, психофизических и индивидуальных особенностей',
        'Готовность к взаимодействию с участниками образовательного процесса',
        'Способность нести ответственность за результаты своей профессиональной деятельности'
      ]
    }
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-6 flex items-center">
          <Shield className="h-8 w-8 mr-3 text-edu-blue" />
          Образовательные стандарты и требования
        </h1>
        
        <div className="prose max-w-none text-gray-700 mb-8">
          <p className="text-lg">
            Информация об образовательных стандартах и требованиях, в соответствии с которыми 
            осуществляется образовательная деятельность. В организации дополнительного 
            профессионального образования реализация программ осуществляется в соответствии 
            с установленными квалификационными требованиями, профессиональными стандартами.
          </p>
        </div>
      </div>

      {/* Федеральные стандарты */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <FileText className="h-6 w-6 mr-3 text-edu-blue" />
          Федеральные государственн��е образовательные стандарты
        </h2>
        
        <div className="space-y-6">
          {federalStandards.map((standard, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{standard.name}</h3>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Код:</strong> {standard.code}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <strong>Утвержден:</strong> {standard.approved}
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">Действует</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{standard.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Документ доступен для скачивания</span>
                <a 
                  href={standard.document} 
                  className="flex items-center text-edu-blue hover:text-edu-navy font-medium"
                  target="_blank"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Скачать PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Требования к педагогическим работникам */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Требования к педагогическим работникам</h2>
        
        <div className="space-y-8">
          {requirements.map((req, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{req.title}</h3>
              <ul className="space-y-3">
                {req.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Внутренние стандарты */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Локальные нормативные акты</h2>
        
        <div className="space-y-4">
          {internalStandards.map((standard, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{standard.name}</h3>
                <a 
                  href={standard.document} 
                  className="text-edu-blue hover:text-edu-navy font-medium"
                  target="_blank"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
              <p className="text-gray-700 mb-2">{standard.description}</p>
              <p className="text-sm text-gray-600">{standard.approved}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Система качества образования */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Система обеспечения качества образования</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Внутренняя оценка качества</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Мониторинг образовательного процесса</li>
              <li>• Анализ результатов обучения</li>
              <li>• Оценка удовлетворенности обучающихся</li>
              <li>• Самообследование организации</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3">Внешняя оценка качества</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• Государственная аккредитация</li>
              <li>• Лицензирование образовательной деятельности</li>
              <li>• Профессионально-общественная аккредитация</li>
              <li>• Независимая оценка качества образования</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Информационная справка */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-amber-600 mt-1" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Важная информация</h3>
            <p className="text-sm text-amber-800">
              Организация дополнительного профессионального образования не реализует основные 
              образовательные программы, поэтому федеральные государственные образовательные 
              стандарты (ФГОС) не применяются. Образовательная деятельность осуществляется в 
              соответствии с профессиональными стандартами и квалификационными т��ебованиями.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
