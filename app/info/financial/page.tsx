import { PieChart, BarChart3, TrendingUp, FileText, Download, DollarSign } from 'lucide-react'

export default function FinancialPage() {
  const budgetData = {
    year: 2023,
    totalIncome: 8500000,
    totalExpenses: 7800000,
    incomeStructure: [
      { source: 'Доходы от образовательной деятельности', amount: 7200000, percentage: 84.7 },
      { source: 'Доходы от дополнительных услуг', amount: 800000, percentage: 9.4 },
      { source: 'Прочие доходы', amount: 500000, percentage: 5.9 }
    ],
    expenseStructure: [
      { category: 'Оплата труда и начисления', amount: 4680000, percentage: 60.0 },
      { category: 'Материальные затраты', amount: 1170000, percentage: 15.0 },
      { category: 'Амортизация', amount: 624000, percentage: 8.0 },
      { category: 'Прочие расходы', amount: 1326000, percentage: 17.0 }
    ]
  }

  const subsidy = {
    available: false,
    reason: 'Образовательная организация является частной и не получает государственных субсидий'
  }

  const documents = [
    {
      name: 'Отчет о финансовых результатах за 2023 год',
      description: 'Отчет о прибылях и убытках образовательной организации',
      period: '2023',
      file: '/documents/financial-report-2023.pdf'
    },
    {
      name: 'Бухгалтерский баланс за 2023 год',
      description: 'Бухгалтерский баланс на 31 декабря 2023 года',
      period: '2023',
      file: '/documents/balance-2023.pdf'
    },
    {
      name: 'Отчет об использовании имущества за 2023 год',
      description: 'Сведения об использовании закрепленного имущества',
      period: '2023',
      file: '/documents/property-report-2023.pdf'
    },
    {
      name: 'Отчет о фина��совых результатах за 2022 год',
      description: 'Отчет о прибылях и убытках за предыдущий период',
      period: '2022',
      file: '/documents/financial-report-2022.pdf'
    }
  ]

  const objectValues = {
    totalValue: 12500000,
    breakdown: [
      { category: 'Недвижимое имущество', value: 8000000, percentage: 64.0 },
      { category: 'Учебное оборудование', value: 2500000, percentage: 20.0 },
      { category: 'Компьютерная техника', value: 1200000, percentage: 9.6 },
      { category: 'Мебель и инвентарь', value: 800000, percentage: 6.4 }
    ]
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-6 flex items-center">
          <BarChart3 className="h-8 w-8 mr-3 text-edu-blue" />
          Финансово-хозяйственная деятельность
        </h1>
        
        <div className="prose max-w-none text-gray-700 mb-8">
          <p className="text-lg">
            Информация об объеме образовательной деятельности, финансовое обеспечение 
            которой осуществляется за счет бюджетных ассигнований федерального бюджета, 
            бюджетов субъектов Российской Федерации, местных бюджетов, по договорам об 
            оказании платных образовательных услуг.
          </p>
        </div>
      </div>

      {/* Объем образовательной деятельности */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-3 text-edu-blue" />
          Объем образовательной деятельности
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <DollarSign className="h-8 w-8 mx-auto mb-3 text-blue-600" />
            <div className="text-2xl font-bold text-blue-600">
              {budgetData.totalIncome.toLocaleString()} ₽
            </div>
            <div className="text-sm text-blue-800">Общие доходы {budgetData.year}</div>
          </div>
          
          <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-2xl font-bold text-green-600">0 ₽</div>
            <div className="text-sm text-green-800">За счет бюджета</div>
          </div>
          
          <div className="text-center p-6 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {budgetData.incomeStructure[0].amount.toLocaleString()} ₽
            </div>
            <div className="text-sm text-purple-800">Платные услуги</div>
          </div>
          
          <div className="text-center p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">150</div>
            <div className="text-sm text-yellow-800">Обучающихся в {budgetData.year}</div>
          </div>
        </div>
      </div>

      {/* Структура доходов */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <PieChart className="h-6 w-6 mr-3 text-edu-blue" />
          Структура доходов за {budgetData.year} год
        </h2>
        
        <div className="space-y-4">
          {budgetData.incomeStructure.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">{item.source}</h3>
                <span className="text-lg font-bold text-edu-blue">
                  {item.amount.toLocaleString()} ₽
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-edu-blue h-3 rounded-full" 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 mt-1">{item.percentage}% от общих доходов</div>
            </div>
          ))}
        </div>
      </div>

      {/* Структура расходов */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Структура расходов за {budgetData.year} год</h2>
        
        <div className="space-y-4">
          {budgetData.expenseStructure.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">{item.category}</h3>
                <span className="text-lg font-bold text-red-600">
                  {item.amount.toLocaleString()} ₽
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-red-500 h-3 rounded-full" 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 mt-1">{item.percentage}% от общих расходов</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Общие расходы:</span>
            <span className="text-xl font-bold text-red-600">
              {budgetData.totalExpenses.toLocaleString()} ₽
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-semibold text-gray-900">Чистая прибыль:</span>
            <span className="text-xl font-bold text-green-600">
              {(budgetData.totalIncome - budgetData.totalExpenses).toLocaleString()} ₽
            </span>
          </div>
        </div>
      </div>

      {/* Субсидии */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Государственные субсидии</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-500 mb-2">0 ₽</div>
            <h3 className="font-semibold text-gray-900 mb-3">Субсидии не предоставляются</h3>
            <p className="text-gray-700">{subsidy.reason}</p>
          </div>
        </div>
      </div>

      {/* Стоимость имущества */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Стоимость имущества</h2>
        
        <div className="mb-6">
          <div className="text-center p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {objectValues.totalValue.toLocaleString()} ₽
            </div>
            <div className="text-gray-700">Общая стоимость имущества</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {objectValues.breakdown.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">{item.category}</h3>
                <span className="font-bold text-edu-blue">
                  {item.value.toLocaleString()} ₽
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-edu-blue h-2 rounded-full" 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 mt-1">{item.percentage}% от общей стоимости</div>
            </div>
          ))}
        </div>
      </div>

      {/* Финансовая отчетность */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6 flex items-center">
          <FileText className="h-6 w-6 mr-3 text-edu-blue" />
          Финансовая отчетность
        </h2>
        
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                <span className="text-xs text-gray-500">Отчетный период: {doc.period}</span>
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

      {/* Аудиторское заключение */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Аудиторское заключ��ние</h2>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-3">Аудиторское заключение за 2023 год</h3>
          <p className="text-green-800 mb-4">
            Независимый аудитор подтвердил достоверность бухгалтерской отчетности 
            образовательной организации за 2023 год. Нарушений в ведении бухгалтерского 
            учета и составлении отчетности не выявлено.
          </p>
          <a 
            href="/documents/audit-conclusion-2023.pdf" 
            className="inline-flex items-center text-green-700 hover:text-green-900 font-medium"
            target="_blank"
          >
            <Download className="h-4 w-4 mr-1" />
            Скачать аудиторское заключение
          </a>
        </div>
      </div>

      {/* Информация о закупках */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-edu-navy mb-6">Информация о закупках</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Закупочная деятельность</h3>
          <p className="text-blue-800 mb-4">
            Образовательная организация осуществляет закупки товаров, работ и услуг 
            в соответствии с Федеральным законом от 18.07.2011 № 223-ФЗ "О закупках 
            товаров, работ, услуг отдельными видами юридических лиц".
          </p>
          <a 
            href="/documents/procurement-plan-2024.pdf" 
            className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium"
            target="_blank"
          >
            <Download className="h-4 w-4 mr-1" />
            План закупок на 2024 год
          </a>
        </div>
      </div>
    </div>
  )
}
