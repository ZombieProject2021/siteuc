import { Users, Award, BookOpen, Clock, GraduationCap, TrendingUp } from 'lucide-react'

export default function StaffPage() {
  const staffStatistics = {
    total: 12,
    withHigherEducation: 12,
    withPedagogicalEducation: 10,
    candidates: 3,
    doctors: 1,
    averageExperience: 8.5,
    professionalDevelopment: 12
  }

  const pedagogicalStaff = [
    {
      name: 'Федорова Елена Владимировна',
      position: 'Преподаватель',
      subjects: ['Менеджмент в образовании', 'Управление персоналом'],
      education: 'Высшее профессиональное',
      qualification: 'Экономист, Менеджер',
      degree: 'Кандидат экономических наук',
      experience: {
        total: 15,
        pedagogical: 12,
        organization: 5
      },
      development: 'Повышение квалификации "Современные технологии обучения взрослых", 2023 г.'
    },
    {
      name: 'Морозов Андрей Петрович',
      position: 'Преподаватель',
      subjects: ['Педагогика', 'Психология'],
      education: 'Высшее профессиональное',
      qualification: 'Педагог-психолог',
      degree: 'Кандидат педагогических наук',
      experience: {
        total: 20,
        pedagogical: 18,
        organization: 7
      },
      development: 'Повышение квалификации "Инклюзивное образование", 2023 г.'
    },
    {
      name: 'Козлова Мария Ивановна',
      position: 'Методист',
      subjects: ['Методика преподавания', 'Образовательные технологии'],
      education: 'Высшее профессиональное',
      qualification: 'Педагог, Методист',
      degree: 'Кандидат педагогических наук',
      experience: {
        total: 12,
        pedagogical: 10,
        organization: 3
      },
      development: 'Профессиональная переподготовка "Цифровые технологии в образовании", 2022 г.'
    },
    {
      name: 'Васильев Сергей Николаевич',
      position: 'Преподаватель',
      subjects: ['Информационные технологии', 'Цифровизация образования'],
      education: 'Высшее профессиональное',
      qualification: 'Инженер-программист, Педагог',
      degree: 'Доктор технических наук',
      experience: {
        total: 25,
        pedagogical: 15,
        organization: 4
      },
      development: 'Повышение квалификации "Искусственный интеллект в образовании", 2023 г.'
    }
  ]

  const supportStaff = [
    {
      name: 'Никитина Ольга Александровна',
      position: 'Специалист по учебно-методической работе',
      education: 'Высшее профессиональное',
      experience: 6
    },
    {
      name: 'Смирнов Алексей Викторович',
      position: 'Системный администратор',
      education: 'Высшее профессиональное',
      experience: 4
    },
    {
      name: 'Павлова Татьяна Сергеевна',
      position: 'Специалист отдела качества',
      education: 'Высшее профессиональное',
      experience: 3
    }
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-6 flex items-center">
          <Users className="h-8 w-8 mr-3 text-edu-blue" />
          Персональный состав педагогических работников
        </h1>
        
        <div className="prose max-w-none text-gray-700 mb-8">
          <p className="text-lg">
            Информация о персональном составе педагогических работников каждой реализуемой 
            образовательной программы в форме электронного документа или в виде активных 
            ссылок, непосредственный переход по которым позволяет получить доступ к страницам 
            Сайта, содержащим информацию, указанную в подпункте "б" подпункта 5 пункта 1 статьи 29 
            Федерального закона от 29 декабря 2012 г. № 273-ФЗ "Об образовании в Российской Федерации".
          </p>
        </div>
      </div>

      {/* Статистика */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-3 text-edu-blue" />
          Общая информация о персонале
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{staffStatistics.total}</div>
            <div className="text-sm text-blue-800">Всего сотрудников</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{staffStatistics.withHigherEducation}</div>
            <div className="text-sm text-green-800">С высшим образованием</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{staffStatistics.withPedagogicalEducation}</div>
            <div className="text-sm text-purple-800">С пед. образованием</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{staffStatistics.candidates}</div>
            <div className="text-sm text-yellow-800">Кандидаты наук</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{staffStatistics.doctors}</div>
            <div className="text-sm text-red-800">Доктора наук</div>
          </div>
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600">{staffStatistics.averageExperience}</div>
            <div className="text-sm text-indigo-800">Средний стаж (лет)</div>
          </div>
          <div className="text-center p-4 bg-teal-50 rounded-lg">
            <div className="text-2xl font-bold text-teal-600">{staffStatistics.professionalDevelopment}</div>
            <div className="text-sm text-teal-800">Повышали квалификацию</div>
          </div>
        </div>
      </div>

      {/* Педагогические работники */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <GraduationCap className="h-6 w-6 mr-3 text-edu-blue" />
          Педагогические работники
        </h2>
        
        <div className="space-y-6">
          {pedagogicalStaff.map((staff, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-edu-blue to-edu-navy rounded-lg flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{staff.name}</h3>
                      <p className="text-edu-blue font-medium mb-2">{staff.position}</p>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div><strong>Образование:</strong> {staff.education}</div>
                        <div><strong>Квалификация:</strong> {staff.qualification}</div>
                        {staff.degree && <div><strong>Ученая степень:</strong> {staff.degree}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Преподаваемые дисциплины:</h4>
                    <div className="flex flex-wrap gap-2">
                      {staff.subjects.map((subject, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Профессиональное развитие:</h4>
                    <p className="text-sm text-gray-700">{staff.development}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Стаж работы
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Общий:</span>
                        <span className="font-medium">{staff.experience.total} лет</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Педагогический:</span>
                        <span className="font-medium">{staff.experience.pedagogical} лет</span>
                      </div>
                      <div className="flex justify-between">
                        <span>В организации:</span>
                        <span className="font-medium">{staff.experience.organization} лет</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Квалификация
                    </h4>
                    <div className="text-sm text-green-800">
                      Соответствует требованиям профессионального стандарта
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Учебно-вспомогательный персонал */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <BookOpen className="h-6 w-6 mr-3 text-edu-blue" />
          Учебно-вспомогательный персонал
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportStaff.map((staff, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{staff.name}</h3>
                <p className="text-edu-blue font-medium text-sm">{staff.position}</p>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div><strong>Образование:</strong> {staff.education}</div>
                <div><strong>Стаж работы:</strong> {staff.experience} лет</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Повышение квалификации */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Повышение квалификации</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Программа развития персонала</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Обязательное повышение квалификации:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Не реже одного раза в 3 года</li>
                <li>• По профилю педагогической деятел��ности</li>
                <li>• Объем не менее 16 академических часов</li>
                <li>• В образовательных организациях ДПО</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Дополнительное развитие:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Участие в научно-практических конференциях</li>
                <li>• Стажировки в ведущих организациях</li>
                <li>• Профессиональная переподготовка</li>
                <li>• Получение дополнительных квалификаций</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Информация о соответствии */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-green-900 mb-2">Соответствие квалификационным требованиям</h3>
        <p className="text-green-800 text-sm">
          Все педагогические работники организации имеют образование, соответствующее 
          квалификационным требованиям, установленным в Едином квалификационном справочнике 
          должностей руководителей, специалистов и служащих, раздел "Квалификационные 
          характеристики должностей работников образования", и (или) профессиональным 
          стандартам по соответствующему виду деятельности.
        </p>
      </div>
    </div>
  )
}
