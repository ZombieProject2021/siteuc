import { Utensils, Coffee, AlertCircle, Clock, MapPin, Shield } from 'lucide-react'

export default function FoodPage() {
  const nutritionInfo = {
    available: false,
    reason: 'Организация питания обучающихся не предусмотрена в связи с реализацией исключительно программ дополнительного профессионального образования с применением дистанционных образовательных технологий'
  }

  const facilities = [
    {
      name: 'Комната отдыха',
      description: 'Зона для отдыха сотрудников и преподавателей',
      equipment: ['Дива��', 'Журнальный столик', 'Телевизор', 'Библиотека'],
      capacity: '8 человек'
    },
    {
      name: 'Кухонная зона',
      description: 'Место для приготовления и разогрева пищи',
      equipment: ['Микроволновая печь', 'Электрочайник', 'Холодильник', 'Посуда'],
      capacity: 'Для персонала'
    }
  ]

  const healthRequirements = [
    'Соблюдение санитарно-эпидемиологических требований',
    'Наличие аптечки первой помощи',
    'Контроль качества питьевой воды',
    'Поддержание чистоты помещений'
  ]

  const recommendations = [
    {
      category: 'Для преподавателей',
      items: [
        'Рекомендуется принимать пищу до начала занятий',
        'Использовать перерывы между занятиями для отдыха',
        'Поддерживать водный баланс во время работы',
        'При необходимости использовать кухонную зону'
      ]
    },
    {
      category: 'Для обучающихся',
      items: [
        'Планировать время обучения с учетом приемов пищи',
        'Создать комфортные условия для дистанционного обучения',
        'Делать технические перерывы каждые 45-60 минут',
        'Поддерживать здоровый режим питания'
      ]
    }
  ]

  const nearbyFacilities = [
    {
      name: 'Кафе "Студенческое"',
      type: 'Кафе',
      distance: '150 м',
      workingHours: '8:00-20:00',
      features: ['Комплексные обеды', 'Выпечка', 'Горячие напитки']
    },
    {
      name: 'Столовая "Центральная"',
      type: 'Столовая',
      distance: '300 м',
      workingHours: '9:00-18:00',
      features: ['Домашняя кухня', 'Диетическое меню', 'Доступные цены']
    },
    {
      name: 'Ресторан быстрого питания',
      type: 'Фастфуд',
      distance: '200 м',
      workingHours: '24/7',
      features: ['Быстрое обслуживание', 'Доставка', 'Онлайн-заказ']
    }
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-6 flex items-center">
          <Utensils className="h-8 w-8 mr-3 text-edu-blue" />
          Организация питания в образовательной организации
        </h1>
        
        <div className="prose max-w-none text-gray-700 mb-8">
          <p className="text-lg">
            Информация об условиях питания обучающихся, в том числе инвалидов и лиц 
            с ограниченными возможностями здоровья, о наличии диетического меню в 
            образовательной организации, перечень юридических лиц и индивидуальных 
            предпринимателей, оказывающих услуги по организации питания в образовательных организациях.
          </p>
        </div>
      </div>

      {/* Основная информация о питании */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Информация о питании обучающихся</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Питание не организуется</h3>
              <p className="text-blue-800">{nutritionInfo.reason}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Имеющиеся условия */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Имеющиеся условия для персонала</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((facility, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{facility.name}</h3>
              <p className="text-gray-700 mb-4">{facility.description}</p>
              
              <div className="mb-4">
                <strong className="text-gray-900">Оборудование:</strong>
                <ul className="mt-2 space-y-1">
                  {facility.equipment.map((item, i) => (
                    <li key={i} className="text-gray-700 flex items-center text-sm">
                      <div className="w-2 h-2 bg-edu-blue rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-sm text-gray-600">
                <strong>Вместимость:</strong> {facility.capacity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Санитарно-гигиенические требования */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <Shield className="h-6 w-6 mr-3 text-edu-blue" />
          Санитарно-гигиенические требования
        </h2>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-4">Соблюдаемые требования:</h3>
          <ul className="space-y-2">
            {healthRequirements.map((requirement, index) => (
              <li key={index} className="text-green-800 flex items-start">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Рекомендации */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Рекомендации по организации питания</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{rec.category}</h3>
              <ul className="space-y-2">
                {rec.items.map((item, i) => (
                  <li key={i} className="text-gray-700 flex items-start text-sm">
                    <div className="w-2 h-2 bg-edu-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Ближайшие точки питания */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <MapPin className="h-6 w-6 mr-3 text-edu-blue" />
          Ближайшие точки питания
        </h2>
        
        <div className="space-y-4">
          {nearbyFacilities.map((facility, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{facility.name}</h3>
                  <span className="text-sm text-gray-600">{facility.type}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-700">{facility.distance}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-700">{facility.workingHours}</span>
                </div>
                
                <div>
                  <div className="flex flex-wrap gap-1">
                    {facility.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Питьевой режим */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <Coffee className="h-6 w-6 mr-3 text-edu-blue" />
          Питьевой режим
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Для персонала</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Кулер с питьевой водой в кухонной зоне
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Электрочайник для приготовления горячих напитков
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Одноразовые стаканчики и посуда
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Регулярная замена воды и обслуживание оборудования
              </li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Для дистанционного обучения</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Рекомендация поддерживать водный баланс
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Подготовка напитков перед началом занятий
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Технические перерывы для отдыха
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Создание комфортных условий дома
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Условия для лиц с ОВЗ */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Условия для лиц с ОВЗ и инвалидов</h2>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-purple-900 mb-3">Специальные условия</h3>
          <p className="text-purple-800 mb-4">
            В связи с реализацией программ дополнительного профессионального образования 
            исключите��ьно в дистанционном формате, специальные условия питания для лиц 
            с ОВЗ и инвалидов в здании образовательной организации не предусматриваются.
          </p>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-purple-900">Рекомендации для дистанционного обучения:</h4>
            <ul className="text-purple-800 space-y-1 text-sm">
              <li>• Организация комфортного рабочего места дома</li>
              <li>• Планирование режима питания в соответствии с расписанием занятий</li>
              <li>• Учет индивидуальных потребностей в питании</li>
              <li>• Возможность делать перерывы по медицинским показаниям</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Контролирующие органы */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Контроль и надзор</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Контролирующие органы</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Роспотребнадзор</h4>
              <p className="text-gray-700 text-sm">
                Контроль соблюдения санитарно-эпидемиологических требований
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Рособрнадзор</h4>
              <p className="text-gray-700 text-sm">
                Надзор за соблюдением законодательства в сфере образования
              </p>
            </div>
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
              профессионального образования с применением дистанционных образовательных 
              технологий. В связи с этим организация питания обучающихся не предусмотрена. 
              Обучающиеся самостоятельно организуют питание в удобное для них время в 
              соответствии с расписанием занятий.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
