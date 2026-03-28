import { Heart, Gift, Users, CreditCard, AlertCircle, HelpCircle } from 'lucide-react'

export default function SupportPage() {
  const supportMeasures = [
    {
      type: 'Социальная поддержка',
      description: 'Меры социальной поддержки обучающихся',
      measures: [
        'Рассрочка оплаты обучения до 12 месяцев',
        'Скидки для многодетных семей - 15%',
        'Скидки для пенсионеров - 10%',
        'Скидки для инвалидов - 20%'
      ],
      icon: Heart,
      color: 'blue'
    },
    {
      type: 'Корпоративные программы',
      description: 'Специальные условия для организаций',
      measures: [
        'Скидки при групповом обучении от 3 человек - 10%',
        'Скидки при групповом обучении от 10 человек - 20%',
        'Индивидуальные программы для предприятий',
        'Корпоративные договоры с отсрочкой платежа'
      ],
      icon: Users,
      color: 'green'
    },
    {
      type: 'Дополнительные льготы',
      description: 'Другие виды поддержки обучающихся',
      measures: [
        'Бесплатные консультации по выбору программы',
        'Техническая поддержка в процессе обучения',
        'Повторное прохождение итоговой аттестации (бесплатно)',
        'Доступ к электронной библиотеке на 6 месяцев после окончания'
      ],
      icon: Gift,
      color: 'purple'
    }
  ]

  const paymentInfo = {
    methods: [
      'Банковский перевод',
      'Оплата картой онлайн',
      'Оплата ��ерез банк по квитанции',
      'Безналичный расчет для юридических лиц'
    ],
    installment: {
      available: true,
      maxPeriod: '12 месяцев',
      minDownPayment: '30%',
      interest: 'Без процентов'
    }
  }

  const scholarshipInfo = {
    available: false,
    reason: 'Стипендии не предусмотрены для программ дополнительного профессионального образования в соответствии с Федеральным законом № 273-ФЗ "Об образовании в Российской Федерации"',
    alternatives: [
      'Возможность получения налогового вычета за обучение',
      'Компенсация расходов на обучение от работодателя',
      'Участие в государственных программах профессиональной переподготовки'
    ]
  }

  const housingInfo = {
    available: false,
    reason: 'Общежитие не предоставляется в связи с реализацией программ с применением дистанционных образовательных технологий'
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-6 flex items-center">
          <Heart className="h-8 w-8 mr-3 text-edu-blue" />
          Стипендии и меры поддержки обучающихся
        </h1>
        
        <div className="prose max-w-none text-gray-700 mb-8">
          <p className="text-lg">
            Информация о наличии и условиях предоставления обучающимся стипендий, 
            мер социальной поддержки, наличии общежития, интерната, количестве 
            жилых помещений в общежитии, интернате для иногородних обучающихся, 
            формировании платы за проживание в общежитии.
          </p>
        </div>
      </div>

      {/* Стипендии */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <CreditCard className="h-6 w-6 mr-3 text-edu-blue" />
          Стипендии
        </h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Информация о стипендиях</h3>
              <p className="text-yellow-800 mb-4">{scholarshipInfo.reason}</p>
              
              <h4 className="font-semibold text-yellow-900 mb-2">Альтернативные возможности финансовой поддержки:</h4>
              <ul className="space-y-1">
                {scholarshipInfo.alternatives.map((alternative, index) => (
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

      {/* Меры социальной поддержки */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Меры социальной поддержки</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportMeasures.map((support, index) => {
            const IconComponent = support.icon
            const colorClasses = {
              blue: 'bg-blue-50 border-blue-200 text-blue-800',
              green: 'bg-green-50 border-green-200 text-green-800',
              purple: 'bg-purple-50 border-purple-200 text-purple-800'
            }
            
            return (
              <div key={index} className={`border rounded-lg p-6 ${colorClasses[support.color]}`}>
                <div className="flex items-center mb-4">
                  <IconComponent className="h-6 w-6 mr-3" />
                  <h3 className="text-lg font-semibold">{support.type}</h3>
                </div>
                <p className="text-sm mb-4">{support.description}</p>
                <ul className="space-y-2">
                  {support.measures.map((measure, i) => (
                    <li key={i} className="text-sm flex items-start">
                      <div className="w-2 h-2 bg-current rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {measure}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* Информация об оплате */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Условия оплаты обучения</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Способы оплаты</h3>
            <ul className="space-y-2">
              {paymentInfo.methods.map((method, index) => (
                <li key={index} className="text-gray-700 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-edu-blue" />
                  {method}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Рассрочка платежа</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Доступность:</span>
                <span className="font-medium text-green-600">
                  {paymentInfo.installment.available ? '��а' : 'Нет'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Максимальный срок:</span>
                <span className="font-medium">{paymentInfo.installment.maxPeriod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Первоначальный взнос:</span>
                <span className="font-medium">{paymentInfo.installment.minDownPayment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Проценты:</span>
                <span className="font-medium text-green-600">{paymentInfo.installment.interest}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Общежитие */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Общежитие и проживание</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <HelpCircle className="h-6 w-6 text-gray-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Предоставление жилья</h3>
              <p className="text-gray-700 mb-4">{housingInfo.reason}</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Дистанционное обучение</h4>
                <p className="text-blue-800 text-sm">
                  Все образовательные программы реализуются с применением дистанционных 
                  образовательных технологий, что позволяет обучающимся проходить обучение 
                  без необходимости постоянного присутствия в образовательной организации.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Дополнительная поддержка */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Дополнительная поддержка</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3">Психологическая поддержка</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• Консультации по адаптации к процессу обучения</li>
              <li>• Помощь в планировании индивидуальной траектории</li>
              <li>• Поддержка в преодолении трудностей обучения</li>
              <li>• Профессиональная ориентация</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Техническая поддержка</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Помощь в настройке оборудования</li>
              <li>• Обучение работе с платформой</li>
              <li>• Решение технических вопросов</li>
              <li>• Консультации по использованию ресурсов</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Контактная информация */}
      <div className="bg-edu-blue text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Получение дополнительной информации</h3>
        <p className="mb-4">
          По вопросам мер социальной поддержки и льгот обращайтесь:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Телефон:</strong> +7 (495) 123-45-67
          </div>
          <div>
            <strong>Email:</strong> support@example.com
          </div>
          <div>
            <strong>Режим работы:</strong> Пн-Пт: 9:00-18:00
          </div>
          <div>
            <strong>Консультации:</strong> По предварительной записи
          </div>
        </div>
      </div>
    </div>
  )
}
