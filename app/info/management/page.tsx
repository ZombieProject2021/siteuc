import { User, Phone, Mail, Calendar, Award, FileText } from 'lucide-react'

export default function ManagementPage() {
  const director = {
    name: 'Иванов Иван Иванович',
    position: 'Директор',
    education: 'Высшее профессиональное образование',
    qualification: 'Педагог-психолог, Менеджер образования',
    experience: {
      total: '15 лет',
      management: '8 лет',
      organization: '5 лет'
    },
    contact: {
      phone: '+7 (495) 123-45-67',
      email: 'director@example.com',
      reception: 'Понедельник, среда 14:00-16:00'
    },
    education_details: [
      'Московский государственный университет им. М.В. Ломоносова, факультет психологии, 2008 г.',
      'Российская академия нар��дного хозяйства и государственной службы при Президенте РФ, "Менеджмент в образовании", 2015 г.'
    ],
    additional_education: [
      'Повышение квалификации "Управление образовательной организацией в условиях реализации ФГОС", 2023 г.',
      'Повышение квалификации "Цифровая трансформация образования", 2022 г.'
    ]
  }

  const deputies = [
    {
      name: 'Петрова Анна Сергеевна',
      position: 'Заместитель директора по учебно-методической работе',
      education: 'Высшее профессиональное образование',
      qualification: 'Педагог, Методист',
      experience: {
        total: '12 лет',
        management: '5 лет',
        organization: '3 года'
      },
      contact: {
        phone: '+7 (495) 123-45-68',
        email: 'metodist@example.com'
      }
    },
    {
      name: 'Сидоров Петр Алексеевич', 
      position: 'Заместитель директора по качеству образования',
      education: 'Высшее профессиональное образование',
      qualification: 'Педагог, Эксперт по качеству образования',
      experience: {
        total: '10 лет',
        management: '4 года',
        organization: '2 года'
      },
      contact: {
        phone: '+7 (495) 123-45-69',
        email: 'quality@example.com'
      }
    }
  ]

  const documents = [
    {
      name: 'Приказ о назначении директора',
      date: '15.01.2020',
      number: '№ 1-к',
      description: 'Приказ учредителя о назначении на должность директора',
      file: '/documents/order-director.pdf'
    },
    {
      name: 'Доверенность директора',
      date: '20.01.2020',
      number: '№ 1',
      description: 'Доверенность на представление интересов организации',
      file: '/documents/doverennost-director.pdf'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-6 flex items-center">
          <User className="h-8 w-8 mr-3 text-edu-blue" />
          Руководство о��разовательной организации
        </h1>
        
        <div className="prose max-w-none text-gray-700 mb-8">
          <p className="text-lg">
            Информация о руководителе образовательной организации, его заместителях, 
            руководителях филиалов образовательной организации (при их наличии), включая 
            контактные данные (служебные), биографические и профессиональные данные.
          </p>
        </div>
      </div>

      {/* Директор */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Директор</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{director.name}</h3>
                <p className="text-lg text-edu-blue font-medium mb-2">{director.position}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <div><strong>Образование:</strong> {director.education}</div>
                  <div><strong>Квалификация:</strong> {director.qualification}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Образование</h4>
                <ul className="space-y-2">
                  {director.education_details.map((edu, index) => (
                    <li key={index} className="text-gray-700 flex items-start">
                      <Award className="h-4 w-4 mr-2 mt-1 text-edu-blue flex-shrink-0" />
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Дополнительное профессиональное образование</h4>
                <ul className="space-y-2">
                  {director.additional_education.map((edu, index) => (
                    <li key={index} className="text-gray-700 flex items-start">
                      <Award className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Опыт работы</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-edu-navy">{director.experience.total}</div>
                    <div className="text-sm text-gray-600">Общий стаж</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-edu-navy">{director.experience.management}</div>
                    <div className="text-sm text-gray-600">Руководящий стаж</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-edu-navy">{director.experience.organization}</div>
                    <div className="text-sm text-gray-600">В да��ной организации</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">Контактная информация</h4>
              <div className="space-y-3">
                <div className="flex items-center text-blue-800">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">{director.contact.phone}</span>
                </div>
                <div className="flex items-center text-blue-800">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">{director.contact.email}</span>
                </div>
                <div className="flex items-start text-blue-800">
                  <Calendar className="h-4 w-4 mr-2 mt-1" />
                  <div className="text-sm">
                    <div className="font-medium">Приёмные часы:</div>
                    <div>{director.contact.reception}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Заместители директора */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Заместители директора</h2>
        
        <div className="space-y-8">
          {deputies.map((deputy, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{deputy.name}</h3>
                      <p className="text-edu-blue font-medium mb-2">{deputy.position}</p>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div><strong>Образование:</strong> {deputy.education}</div>
                        <div><strong>Квалификация:</strong> {deputy.qualification}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Общий стаж:</span>
                      <div className="text-gray-600">{deputy.experience.total}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Руководящий:</span>
                      <div className="text-gray-600">{deputy.experience.management}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">В организации:</span>
                      <div className="text-gray-600">{deputy.experience.organization}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Контакты</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-700">
                      <Phone className="h-3 w-3 mr-2" />
                      {deputy.contact.phone}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Mail className="h-3 w-3 mr-2" />
                      {deputy.contact.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Документы */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <FileText className="h-6 w-6 mr-3 text-edu-blue" />
          Документы о назначении
        </h2>
        
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  <span>{doc.number} от {doc.date}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{doc.description}</p>
              </div>
              <a 
                href={doc.file} 
                className="text-edu-blue hover:text-edu-navy font-medium"
                target="_blank"
              >
                Скачать PDF
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Информация о филиалах */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Филиалы и представительства</h3>
        <p className="text-gray-600">
          Образовательная организация не имеет филиалов и представительств.
        </p>
      </div>
    </div>
  )
}
