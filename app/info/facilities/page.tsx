import { Building, Monitor, Wifi, Shield, Car, Users, Book, Utensils } from 'lucide-react'

export default function FacilitiesPage() {
  const classrooms = [
    {
      name: 'Аудитория № 101',
      area: '45 кв.м',
      capacity: 25,
      equipment: ['Интерактивная доска', 'Проектор', 'Компьютер преподавателя', 'Система звукоусиления'],
      purpose: 'Лекционные занятия, семинары'
    },
    {
      name: 'Аудитория № 102',
      area: '35 кв.м',
      capacity: 20,
      equipment: ['LED-телевизор 65"', 'Компьютер', 'Флипчарт', 'Система видеоконференцсвязи'],
      purpose: 'Практические занятия, видеоконференции'
    },
    {
      name: 'Компьютерный класс',
      area: '50 кв.м',
      capacity: 15,
      equipment: ['15 рабочих мест с ПК', 'Интерактивная панель', 'Высокоскоростной интернет', 'Специализированное ПО'],
      purpose: 'Занятия по информационным технологиям'
    }
  ]

  const technicalEquipment = [
    {
      category: 'Мультимедийное оборудование',
      items: [
        'Интерактивные доски - 3 шт.',
        'Проекторы - 5 шт.',
        'LED-телевизоры - 4 шт.',
        'Документ-камеры - 2 шт.',
        'Системы звукоусиления - 6 шт.'
      ]
    },
    {
      category: 'Компьютерная техника',
      items: [
        'Персональные компьютеры - 25 шт.',
        'Ноутбуки - 10 шт.',
        'Планшеты - 8 шт.',
        'Принтеры/МФУ - 6 шт.',
        'Сервер - 1 шт.'
      ]
    },
    {
      category: 'Программное обеспечение',
      items: [
        'Microsoft Office 365',
        'LMS "Электронный университет"',
        'Система видеоконференцсвязи Zoom',
        'Антивирусное ПО Kaspersky',
        'Специализированные программы по направлениям обучения'
      ]
    }
  ]

  const library = {
    totalBooks: 2500,
    electronicResources: 15000,
    subscriptions: 12,
    readingSeats: 20,
    workingHours: 'Пн-Пт: 9:00-18:00, Сб: 9:00-15:00'
  }

  const infrastructure = [
    {
      name: 'Административное здание',
      address: 'г. Москва, ул. Примерная, д. 123',
      area: '500 кв.м',
      floors: 3,
      purpose: 'Учебные аудитории, административные помещения',
      accessibility: 'Частично доступно для лиц с ОВЗ'
    }
  ]

  const itInfrastructure = {
    internet: {
      provider: 'Волоконно-оптическая связь',
      speed: '100 Мбит/с',
      wifi: 'Покрытие 100% здания',
      backup: 'Резервный канал связи'
    },
    security: {
      firewall: 'Межсетевой экран',
      antivirus: 'Централизованная антивирусная защита',
      backup: 'Ежедневное резервное копирование',
      monitoring: '24/7 мониторинг сети'
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-6 flex items-center">
          <Building className="h-8 w-8 mr-3 text-edu-blue" />
          Материально-техническое обеспечение и оснащённость образовательного процесса
        </h1>
        
        <div className="prose max-w-none text-gray-700 mb-8">
          <p className="text-lg">
            Информация о материально-техническом обеспечении образовательной деятельности, 
            в том числе сведения о наличии оборудованных учебных кабинетов, объектов для 
            проведения практических занятий, библиотек, объектов спорта, средств обучения 
            и воспитания, об условиях питания и охраны здоровья обучающихся.
          </p>
        </div>
      </div>

      {/* Учебные помещения */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <Users className="h-6 w-6 mr-3 text-edu-blue" />
          Оборудованные учебные кабинеты
        </h2>
        
        <div className="space-y-6">
          {classrooms.map((room, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{room.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div><strong>Площадь:</strong> {room.area}</div>
                    <div><strong>Вместимость:</strong> {room.capacity} человек</div>
                    <div><strong>Назначение:</strong> {room.purpose}</div>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <h4 className="font-semibold text-gray-900 mb-3">Оборудование:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {room.equipment.map((item, i) => (
                      <div key={i} className="flex items-center">
                        <Monitor className="h-4 w-4 mr-2 text-edu-blue" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Техническое оснащение */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <Monitor className="h-6 w-6 mr-3 text-edu-blue" />
          Техническое оснащение
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {technicalEquipment.map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start">
                    <div className="w-2 h-2 bg-edu-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Библиотека */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <Book className="h-6 w-6 mr-3 text-edu-blue" />
          Библиотека
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{library.totalBooks.toLocaleString()}</div>
            <div className="text-sm text-blue-800">Печатных изданий</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{library.electronicResources.toLocaleString()}</div>
            <div className="text-sm text-green-800">Электронных ресурсов</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{library.subscriptions}</div>
            <div className="text-sm text-purple-800">Подписок на периодику</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{library.readingSeats}</div>
            <div className="text-sm text-yellow-800">Посадочных мест</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-xl font-bold text-red-600">100%</div>
            <div className="text-sm text-red-800">Обеспеченность</div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Режим работы библиотеки:</h3>
          <p className="text-gray-700">{library.workingHours}</p>
        </div>
      </div>

      {/* ИТ-инфраструктура */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <Wifi className="h-6 w-6 mr-3 text-edu-blue" />
          ИТ-инфраструктура
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Интернет и связь</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Провайдер:</span>
                <span className="font-medium">{itInfrastructure.internet.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Скорость:</span>
                <span className="font-medium">{itInfrastructure.internet.speed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Wi-Fi:</span>
                <span className="font-medium">{itInfrastructure.internet.wifi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Резерв:</span>
                <span className="font-medium">{itInfrastructure.internet.backup}</span>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Информационная безопасность</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">{itInfrastructure.security.firewall}</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">{itInfrastructure.security.antivirus}</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">{itInfrastructure.security.backup}</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">{itInfrastructure.security.monitoring}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Объекты инфраструктуры */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <Building className="h-6 w-6 mr-3 text-edu-blue" />
          Объекты инфраструктуры
        </h2>
        
        {infrastructure.map((building, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{building.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <strong>Адрес:</strong>
                <div className="text-gray-600">{building.address}</div>
              </div>
              <div>
                <strong>Общая площадь:</strong>
                <div className="text-gray-600">{building.area}</div>
              </div>
              <div>
                <strong>Этажность:</strong>
                <div className="text-gray-600">{building.floors} этажа</div>
              </div>
              <div>
                <strong>Назначение:</strong>
                <div className="text-gray-600">{building.purpose}</div>
              </div>
              <div>
                <strong>Доступность:</strong>
                <div className="text-gray-600">{building.accessibility}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Условия для лиц с ОВЗ */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Доступная среда</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Обеспечение доступности</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Дистанционные образовательные технологии</li>
              <li>• Электронное обучение</li>
              <li>• Индивидуальные образовательные траектории</li>
              <li>• Технические средства обучения</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3">Специальные условия</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• Адаптированные образова��ельные программы</li>
              <li>• Увеличенное время на освоение программы</li>
              <li>• Индивидуальное сопровождение</li>
              <li>• Специальные учебные материалы</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Питание и медицинское обслуживание */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Условия охраны здоровья</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Utensils className="h-5 w-5 mr-2 text-edu-blue" />
              Питание обучающихся
            </h3>
            <p className="text-gray-700 text-sm">
              Организация питания обучающихся не предусмотрена в связи с реализацией 
              исключительно программ дополнительного профессионального об��азования 
              с применением дистанционных образовательных технологий.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-edu-blue" />
              Медицинское обслуживание
            </h3>
            <p className="text-gray-700 text-sm">
              Медицинское обслуживание обучающихся не предусмотрено в связи с 
              особенностями реализации дополнительных профессиональных программ. 
              При необходимости слушатели могут обратиться в медицинские учреждения 
              по месту жительства.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
