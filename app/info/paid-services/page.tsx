import { CreditCard, FileText, Calculator, Shield, AlertTriangle, Download } from 'lucide-react'

export default function PaidServicesPage() {
  const paidPrograms = [
    {
      name: 'Менеджмент в образовании',
      type: 'Профессиональная переподготовка',
      duration: '520 ак.ч.',
      price: 45000,
      installment: true,
      description: 'Подготовка специалистов в области управления образовательными организациями'
    },
    {
      name: 'Педагогическая деятельность в дополнительном образовании',
      type: 'Профес��иональная переподготовка', 
      duration: '340 ак.ч.',
      price: 35000,
      installment: true,
      description: 'Программа для подготовки педагогов дополнительного образования'
    },
    {
      name: 'Цифровые технологии в образовании',
      type: 'Повышение квалификации',
      duration: '72 ак.ч.',
      price: 12000,
      installment: false,
      description: 'Современные цифровые технологии в образовательном процессе'
    },
    {
      name: 'Инклюзивное образование',
      type: 'Повышение квалификации',
      duration: '36 ак.ч.',
      price: 8000,
      installment: false,
      description: 'Организация образовательного процесса для лиц с ОВЗ'
    }
  ]

  const additionalServices = [
    {
      name: 'Индивидуальные консультации',
      price: 2000,
      unit: 'за 1 час',
      description: 'Персональные консультации по профессиональным вопросам'
    },
    {
      name: 'Разработка корпоративных программ',
      price: 'По договоренности',
      unit: '',
      description: 'Создание образовательных программ под потребности организации'
    },
    {
      name: 'Экспертиза образовательных программ',
      price: 15000,
      unit: 'за программу',
      description: 'Профессиональная экспертиза и рецензирование программ'
    }
  ]

  const documents = [
    {
      name: 'Положение о порядке оказания платных образовательных услуг',
      description: 'Локальный нормативный акт, регламентирующий оказание платных услуг',
      file: '/documents/polozenie-platnye-uslugi.pdf'
    },
    {
      name: 'Образец договора об оказании платных образовательных услуг',
      description: 'Типовая форма договора с физическими лицами',
      file: '/documents/dogovor-fiz-lica.pdf'
    },
    {
      name: 'Образец договора для юридических лиц',
      description: 'Типовая форма договора с организациями',
      file: '/documents/dogovor-jur-lica.pdf'
    },
    {
      name: 'Приказ об утверждении стоимости обучения',
      description: 'Приказ директора об установлении цен на 2024 учебный год',
      file: '/documents/prikaz-stoimost-2024.pdf'
    }
  ]

  const paymentTerms = {
    methods: [
      'Банковский перевод',
      'Оплата банковской картой',
      'Оплата через банк по квитанции',
      'Безналичный расчет (для организаций)'
    ],
    installment: {
      periods: ['3 месяца', '6 месяцев', '12 месяцев'],
      downPayment: '30%',
      interest: '0%'
    },
    discounts: [
      { category: 'Многодетные семьи', discount: '15%' },
      { category: 'Пенсионеры', discount: '10%' },
      { category: 'Инвалиды', discount: '20%' },
      { category: 'Групповое обучение (от 3 чел.)', discount: '10%' },
      { category: 'Групповое обучение (от 10 чел.)', discount: '20%' }
    ]
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-6 flex items-center">
          <CreditCard className="h-8 w-8 mr-3 text-edu-blue" />
          Платные образовательные услуги
        </h1>
        
        <div className="prose max-w-none text-gray-700 mb-8">
          <p className="text-lg">
            Информация о порядке оказания платных образовательных услуг, в том числе 
            образец договора об оказании платных образовательных услуг, документ об 
            утверждении стоимости обучения по каждой образовательной программе.
          </p>
        </div>
      </div>

      {/* Образовательные программы */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Образовательные программы</h2>
        
        <div className="space-y-6">
          {paidPrograms.map((program, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <div><strong>Тип программы:</strong> {program.type}</div>
                    <div><strong>Объем:</strong> {program.duration}</div>
                  </div>
                  <p className="text-gray-700">{program.description}</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-edu-blue text-white rounded-lg p-4">
                    <div className="text-2xl font-bold">{program.price.toLocaleString()} ₽</div>
                    <div className="text-sm opacity-90">Полная стоимость</div>
                  </div>
                  {program.installment && (
                    <div className="mt-2 text-xs text-green-600 font-medium">
                      Доступна рассрочка
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-center">
                  <a
                    href="/consultation"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Записаться
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Дополнительные услуги */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Дополнительные услуги</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.name}</h3>
              <div className="text-2xl font-bold text-edu-blue mb-2">
                {typeof service.price === 'number' ? service.price.toLocaleString() + ' ₽' : service.price}
              </div>
              {service.unit && (
                <div className="text-sm text-gray-600 mb-3">{service.unit}</div>
              )}
              <p className="text-sm text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Условия оплаты */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <Calculator className="h-6 w-6 mr-3 text-edu-blue" />
          Условия оплаты
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Способы оплаты</h3>
            <ul className="space-y-2">
              {paymentTerms.methods.map((method, index) => (
                <li key={index} className="text-gray-700 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-edu-blue" />
                  {method}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Рассрочка</h3>
            <div className="space-y-3">
              <div>
                <strong className="text-gray-900">Сроки рассрочки:</strong>
                <div className="text-gray-700">{paymentTerms.installment.periods.join(', ')}</div>
              </div>
              <div>
                <strong className="text-gray-900">Первоначальный взнос:</strong>
                <div className="text-gray-700">{paymentTerms.installment.downPayment}</div>
              </div>
              <div>
                <strong className="text-gray-900">Процентная ставка:</strong>
                <div className="text-green-600 font-medium">{paymentTerms.installment.interest}</div>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Скидки</h3>
            <div className="space-y-2">
              {paymentTerms.discounts.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.category}:</span>
                  <span className="font-medium text-green-600">{item.discount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Документы */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <FileText className="h-6 w-6 mr-3 text-edu-blue" />
          Документы
        </h2>
        
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
              </div>
              <a 
                href={doc.file} 
                className="flex items-center text-edu-blue hover:text-edu-navy font-medium"
                target="_blank"
              >
                <Download className="h-4 w-4 mr-1" />
                Скачать PDF
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Порядок оказания услуг */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Порядок оказания платных образовательных услуг</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Этапы заключения договора:</h3>
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="bg-edu-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                <div>
                  <strong>Консультация</strong>
                  <p className="text-sm text-gray-600">Выбор программы, консультация по условиям</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-edu-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                <div>
                  <strong>Подача заявления</strong>
                  <p className="text-sm text-gray-600">Предоставление документов и заявления</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-edu-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                <div>
                  <strong>Заключение договора</strong>
                  <p className="text-sm text-gray-600">Подписание договора об оказании услуг</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-edu-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                <div>
                  <strong>Оплата</strong>
                  <p className="text-sm text-gray-600">Внесение оплаты согласно договору</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-edu-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">5</span>
                <div>
                  <strong>Начало обучения</strong>
                  <p className="text-sm text-gray-600">Зачисление и начало образовательного процесса</p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Необходимые документы:</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <FileText className="h-4 w-4 mr-2 text-edu-blue" />
                Заявление на обучение
              </li>
              <li className="flex items-center text-gray-700">
                <FileText className="h-4 w-4 mr-2 text-edu-blue" />
                Копия паспорта
              </li>
              <li className="flex items-center text-gray-700">
                <FileText className="h-4 w-4 mr-2 text-edu-blue" />
                Копия диплома об образовании
              </li>
              <li className="flex items-center text-gray-700">
                <FileText className="h-4 w-4 mr-2 text-edu-blue" />
                Справка с места работы (при необходимости)
              </li>
              <li className="flex items-center text-gray-700">
                <FileText className="h-4 w-4 mr-2 text-edu-blue" />
                Документы, подтверждающие льготы (при наличии)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Правовая информация */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Правовые основы</h3>
            <p className="text-blue-800 text-sm mb-3">
              Оказание платных образовательных услуг осуществляется в соответствии с:
            </p>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Федеральным законом от 29.12.2012 № 273-ФЗ "Об образовании в Российской Федерации"</li>
              <li>• Постановлением Правительства РФ от 15.09.2020 № 1441 "Об утверждении Правил оказания платных образовательных услуг"</li>
              <li>• Уставом образовательной организации</li>
              <li>• Положением о порядке оказания платных образовательных услуг</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Возврат средств */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">Условия возврата денежных средств</h3>
            <p className="text-yellow-800 text-sm">
              Возврат денежных средств производится в соответствии с условиями договора 
              и действующим законодательством. При досрочном расторжении договора по 
              инициативе обучающегося возврат производится за вычетом фактически 
              понесенных организацией расходов.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
