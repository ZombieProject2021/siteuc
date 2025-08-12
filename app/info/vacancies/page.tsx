import { Users, Briefcase, MapPin, Clock, GraduationCap, Star, AlertCircle } from 'lucide-react'

export default function VacanciesPage() {
  const currentVacancies = [
    {
      position: 'Преподаватель дополнительного профессионального образования',
      department: 'Учебно-методический отдел',
      type: 'Основное место работы',
      schedule: 'По совместительству',
      salary: 'от 45 000 ₽',
      requirements: [
        'Высшее образование по профилю деятельности',
        'Опыт педагогической деятельности не менее 3 лет',
        'Знание современных образовательных технологий',
        'Опыт дистанционного обучения приветствуется'
      ],
      duties: [
        'Проведение лекционных и практических занятий',
        'Разработка учебно-методических материалов',
        'Консультирование обучающихся',
        'Участие в разработке образовательных программ'
      ],
      open: true
    },
    {
      position: 'Методист',
      department: 'Учебно-методический отдел',
      type: 'Основное место работы',
      schedule: 'Полный рабочий день',
      salary: 'от 50 000 ₽',
      requirements: [
        'Высшее педагогическое образование',
        'Опыт методической работы не менее 2 лет',
        'Знание нормативных документов в сфере образования',
        'Владение ИКТ-компетенциями'
      ],
      duties: [
        'Методическое сопровождение образовательного процесса',
        'Экспертиза образовательных программ',
        'Организация повышения квалификации педагогов',
        'Мониторинг качества образования'
      ],
      open: true
    }
  ]

  const closedVacancies = [
    {
      position: 'Специалист по качеству образования',
      department: 'Отдел качества образования',
      closedDate: '15.11.2023',
      reason: 'Вакансия закрыта - найден подходящий кандидат'
    },
    {
      position: 'Системный администратор',
      department: 'IT-отдел',
      closedDate: '28.10.2023',
      reason: 'Вакансия закрыта - внутреннее перемещение сотрудника'
    }
  ]

  const applicationProcess = {
    steps: [
      {
        step: 1,
        title: 'Подача заявления',
        description: 'Направьте резюме и сопроводительное письмо на email hr@example.com'
      },
      {
        step: 2,
        title: 'Рассмотрение документов',
        description: 'Специалисты HR-отдела изучат ваши документы в течение 5 рабочих дней'
      },
      {
        step: 3,
        title: 'Собеседование',
        description: 'При положительном решении вас пригласят на собеседование'
      },
      {
        step: 4,
        title: 'Принятие решения',
        description: 'Результат сообщается в течение 3 рабочих дней после собеседования'
      }
    ]
  }

  const statistics = {
    totalPositions: 15,
    filledPositions: 13,
    vacantPositions: 2,
    avgSalary: 52000,
    turnoverRate: 8.5
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-6 flex items-center">
          <Briefcase className="h-8 w-8 mr-3 text-edu-blue" />
          Вакантные места для приёма (перевода) обучающихся
        </h1>
        
        <div className="prose max-w-none text-gray-700 mb-8">
          <p className="text-lg">
            Информация о количестве вакантных мест для приёма (перевода) обучающихся 
            по каждой образовательной программе, по профессии, специальности, 
            направлению подгото��ки (на места, финансируемые за счет бюджетных 
            ассигнований федерального бюджета, бюджетов субъектов Российской Федерации, 
            местных бюджетов, по договорам об образовании за счет средств физических и 
            (или) юридических лиц).
          </p>
        </div>
      </div>

      {/* Статистика по вакансиям для обучающихся */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <Users className="h-6 w-6 mr-3 text-edu-blue" />
          Вакантные места для обучающихся
        </h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="text-center">
            <GraduationCap className="h-16 w-16 mx-auto mb-4 text-blue-600" />
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Прием ведется круглогодично</h3>
            <p className="text-blue-800 mb-4">
              Набор на программы дополнительно��о профессионального образования 
              осуществляется в течение всего календарного года по мере формирования групп.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">∞</div>
              <div className="text-sm text-blue-800">Бюджетные места</div>
              <div className="text-xs text-gray-600">Не предусмотрены</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600">200+</div>
              <div className="text-sm text-green-800">Платные места</div>
              <div className="text-xs text-gray-600">Ежемесячно</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-purple-600">15</div>
              <div className="text-sm text-purple-800">Активных программ</div>
              <div className="text-xs text-gray-600">Для в��бора</div>
            </div>
          </div>
        </div>
      </div>

      {/* Программы с открытым набором */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Программы с открытым набором</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Образовательная программа
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Тип программы
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Продолжительность
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Форма обучения
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Вакантные места
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Стоимость
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Менеджмент в образовании</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Проф. переподготовка
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">520 ак.ч.</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Дистанционная</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-green-600 font-semibold">15 мест</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">45 000 ₽</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Педагогическая деятельность в ДО</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Проф. переподготовка
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">340 ак.ч.</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Очно-заочная</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-green-600 font-semibold">12 мест</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">35 000 ₽</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Цифровые технологии в образовании</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Повышение квалификации
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">72 ак.ч.</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Дистанционная</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-green-600 font-semibold">25 мест</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">12 000 ₽</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Текущие вакансии для трудоустройства */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Вакансии для трудоустройства</h2>
        
        <div className="space-y-6">
          {currentVacancies.map((vacancy, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{vacancy.position}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {vacancy.department}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {vacancy.schedule} • {vacancy.type}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      {vacancy.salary}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Открыта
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Требования:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {vacancy.requirements.map((req, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-2 h-2 bg-edu-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Обязанности:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {vacancy.duties.map((duty, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {duty}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Процесс подачи заявления */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Процесс трудоустройства</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {applicationProcess.steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-edu-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Статистика персонала */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Статистика персонала</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{statistics.totalPositions}</div>
            <div className="text-sm text-blue-800">Всего должностей</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{statistics.filledPositions}</div>
            <div className="text-sm text-green-800">Занятых должностей</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{statistics.vacantPositions}</div>
            <div className="text-sm text-yellow-800">Вакантных мест</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{statistics.avgSalary.toLocaleString()} ₽</div>
            <div className="text-sm text-purple-800">Средняя зарплата</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{statistics.turnoverRate}%</div>
            <div className="text-sm text-red-800">Текучесть кадров</div>
          </div>
        </div>
      </div>

      {/* Закрытые вакансии */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Недавно закрытые вакансии</h2>
        
        <div className="space-y-4">
          {closedVacancies.map((vacancy, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{vacancy.position}</h3>
                  <p className="text-sm text-gray-600">{vacancy.department}</p>
                  <p className="text-xs text-gray-500 mt-1">Закрыта: {vacancy.closedDate}</p>
                </div>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                  Закрыта
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{vacancy.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Информация для соискателей */}
      <div className="bg-edu-blue text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Информация для соискателей</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Контакты HR-отдела:</h4>
            <div className="text-sm space-y-1">
              <div>Email: hr@example.com</div>
              <div>Телефон: +7 (495) 123-45-70</div>
              <div>Время работы: Пн-Пт 9:00-18:00</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Преимущества работы:</h4>
            <ul className="text-sm space-y-1">
              <li>• Конкурентная заработная плата</li>
              <li>• Возможности профессионального развития</li>
              <li>• Дружный коллектив</li>
              <li>• Современное оборудование</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Важная информация */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-yellow-600 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">Важная информация</h3>
            <p className="text-yellow-800 text-sm">
              Образовательная организация реализует исключительно программы дополнительного 
              профессионального образования. Места, финансируемые за счет бюджетных средств, 
              не предоставляются. Все программы являются платными.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
