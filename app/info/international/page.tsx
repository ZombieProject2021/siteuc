import { Globe, Users, FileText, HandHeart, AlertCircle, TrendingUp } from 'lucide-react'

export default function InternationalPage() {
  const partnerships = [
    {
      name: 'Белорусский государственный университет',
      country: 'Республика Беларусь',
      type: 'Соглашение о сотрудничестве',
      activities: [
        'Обмен опытом в области дополнительного профессионального образования',
        'Совместная разработка образовательных программ',
        'Участие в научно-практических конференциях'
      ],
      since: '2022',
      status: 'Активное'
    },
    {
      name: 'Казахский национальный университет им. аль-Фараби',
      country: 'Республика Казахстан',
      type: 'Меморандум о взаимопонимании',
      activities: [
        'Академические обмены преподавателей',
        'Совместные исследовательские проекты',
        'Обмен учебно-методическим�� материалами'
      ],
      since: '2023',
      status: 'Активное'
    }
  ]

  const internationalPrograms = [
    {
      name: 'Международные стандарты менеджмента качества',
      description: 'Программа повышения квалификации по международным стандартам ISO',
      duration: '72 ак.ч.',
      partners: ['ISO Training Institute (Германия)', 'Quality Management Center (Австрия)'],
      certificates: 'Сертификат международного образца',
      available: true
    },
    {
      name: 'Цифровая трансформация образования: мировой опыт',
      description: 'Изучение лучших прак��ик цифровизации образования в различных странах',
      duration: '108 ак.ч.',
      partners: ['EdTech Finland', 'Digital Education Hub (Эстония)'],
      certificates: 'Удостоверение о повышении квалификации + международный сертификат',
      available: true
    }
  ]

  const exchangePrograms = {
    available: false,
    reason: 'В настоящее время программы а��адемических обменов не реализуются в связи со спецификой дополнительного профессионального образования',
    alternatives: [
      'Участие в международных онлайн-конференциях',
      'Дистанционное участие в зарубежных образовательных программах',
      'Международные вебинары и мастер-классы'
    ]
  }

  const foreignStudents = {
    total: 8,
    countries: [
      { name: 'Республика Беларусь', count: 3 },
      { name: 'Республика Казахстан', count: 2 },
      { name: 'Кыргызская Республика', count: 2 },
      { name: 'Республика Узбекистан', count: 1 }
    ],
    programs: [
      'Менеджмент в образовании',
      'Педагогическая деятельность в дополнительном образовании'
    ]
  }

  const internationalEvents = [
    {
      name: 'Международная конференция "Цифровые технологии в образовании"',
      date: '15-16 марта 2024',
      format: 'Онлайн',
      participants: '150+ участников из 12 стран',
      role: 'Организатор'
    },
    {
      name: 'Форум "Непрерывное образование в XXI веке"',
      date: '22-23 сентября 2023',
      format: 'Гибридный (очно/онлайн)',
      participants: '200+ участников из 8 стран',
      role: 'Партнер'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-6 flex items-center">
          <Globe className="h-8 w-8 mr-3 text-edu-blue" />
          Международное сотрудничество
        </h1>
        
        <div className="prose max-w-none text-gray-700 mb-8">
          <p className="text-lg">
            Информация о заключенных и планируемых к заключению договорах с иностранными и 
            (или) международными организациями по вопросам образования и науки, о международной 
            аккредитации образовательных программ.
          </p>
        </div>
      </div>

      {/* Международные партнеры */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <Handshake className="h-6 w-6 mr-3 text-edu-blue" />
          Международные партнеры
        </h2>
        
        <div className="space-y-6">
          {partnerships.map((partner, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{partner.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div><strong>Страна:</strong> {partner.country}</div>
                    <div><strong>Тип соглашения:</strong> {partner.type}</div>
                    <div><strong>Сотрудничество с:</strong> {partner.since} года</div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  partner.status === 'Активное' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {partner.status}
                </span>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Направления сотрудничества:</h4>
                <ul className="space-y-1">
                  {partner.activities.map((activity, i) => (
                    <li key={i} className="text-gray-700 flex items-start">
                      <div className="w-2 h-2 bg-edu-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Международные программы */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Международные образовательные программы</h2>
        
        <div className="space-y-6">
          {internationalPrograms.map((program, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{program.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  program.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {program.available ? 'Доступна' : 'Недоступна'}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">{program.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <strong className="text-gray-900">Продолжительность:</strong>
                  <div className="text-gray-700">{program.duration}</div>
                </div>
                <div>
                  <strong className="text-gray-900">Документ об образовании:</strong>
                  <div className="text-gray-700">{program.certificates}</div>
                </div>
              </div>
              
              <div>
                <strong className="text-gray-900">Международные партнеры:</strong>
                <ul className="mt-2 space-y-1">
                  {program.partners.map((partner, i) => (
                    <li key={i} className="text-gray-700 flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-edu-blue" />
                      {partner}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Иностранные обучающиеся */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <Users className="h-6 w-6 mr-3 text-edu-blue" />
          Иностранные обучающиеся
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Статистика</h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-edu-blue">{foreignStudents.total}</div>
              <div className="text-gray-600">Иностранных обучающихся</div>
            </div>
            
            <div className="space-y-3">
              {foreignStudents.countries.map((country, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{country.name}:</span>
                  <span className="font-semibold text-edu-blue">{country.count} чел.</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Популярные программы</h3>
            <ul className="space-y-2">
              {foreignStudents.programs.map((program, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {program}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Международные мероприятия */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-3 text-edu-blue" />
          Международные мероприятия
        </h2>
        
        <div className="space-y-4">
          {internationalEvents.map((event, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-900 mb-2">{event.name}</h3>
                  <div className="text-sm text-gray-600">
                    <div><strong>Роль:</strong> {event.role}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">
                    <div><strong>Дата:</strong> {event.date}</div>
                    <div><strong>Формат:</strong> {event.format}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">
                    <strong>Участники:</strong> {event.participants}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Программы обмена */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Программы академического обмена</h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Информация о программах обмена</h3>
              <p className="text-yellow-800 mb-4">{exchangePrograms.reason}</p>
              
              <h4 className="font-semibold text-yellow-900 mb-2">Альтернативные формы международного сотрудничества:</h4>
              <ul className="space-y-1">
                {exchangePrograms.alternatives.map((alternative, index) => (
                  <li key={index} className="text-yellow-800 flex items-start">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {alternative}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Международная аккредитация */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <FileText className="h-6 w-6 mr-3 text-edu-blue" />
          Международная аккредитация
        </h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Планы по международной аккредитации</h3>
          <p className="text-blue-800 mb-4">
            Образовательная организация рассматривает возможность получения международной 
            аккредитации образовательных программ в области менеджмента образования и 
            педагогической деятельности в соответствии с европейскими стандартами качества.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Рассматриваемые агентства:</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• ENQA (European Association for Quality Assurance)</li>
                <li>• FIBAA (Foundation for International Business Administration Accreditation)</li>
                <li>• ACQUIN (Accreditation Agency for Study Programmes)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Ожидаемые преимущества:</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Признание дипломов за рубежом</li>
                <li>• Повышение качества образования</li>
                <li>• Расширение международного сотрудничества</li>
                <li>• Привлечение иностранных студентов</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Контактная информация */}
      <div className="bg-edu-blue text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Международный отдел</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Контактная информация:</h4>
            <div className="text-sm space-y-1">
              <div>Email: international@example.com</div>
              <div>Телефон: +7 (495) 123-45-71</div>
              <div>Время работы: Пн-Пт 9:00-18:00</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Координатор:</h4>
            <div className="text-sm space-y-1">
              <div>Петрова Анна Сергеевна</div>
              <div>Заместитель директора по УМР</div>
              <div>Ответственная за международное сотрудничество</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
