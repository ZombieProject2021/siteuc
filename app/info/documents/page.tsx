import { FileText, Download, Shield, Calendar } from 'lucide-react'

interface Document {
  id: string
  title: string
  category: string
  date: string
  size: string
  hasSignature: boolean
  downloadUrl: string
}

const documents: Document[] = [
  {
    id: '1',
    title: 'Устав образовательной организации',
    category: 'Учредительные документы',
    date: '15.01.2020',
    size: '1.2 МБ',
    hasSignature: true,
    downloadUrl: '/documents/charter.pdf'
  },
  {
    id: '2',
    title: 'Лицензия на осуществление образовательной деятельности',
    category: 'Разрешительные документы',
    date: '20.01.2020',
    size: '856 КБ',
    hasSignature: true,
    downloadUrl: '/documents/license.pdf'
  },
  {
    id: '3',
    title: 'Правила приема обучающихся',
    category: 'Локальные нормативные акты',
    date: '01.09.2023',
    size: '654 КБ',
    hasSignature: true,
    downloadUrl: '/documents/admission-rules.pdf'
  },
  {
    id: '4',
    title: 'Режим занятий обучающихся',
    category: 'Локальные нормативные акты',
    date: '01.09.2023',
    size: '423 КБ',
    hasSignature: true,
    downloadUrl: '/documents/schedule-rules.pdf'
  },
  {
    id: '5',
    title: 'Порядок и основания перевода, отчисления и восстановления обучающихся',
    category: 'Локальные нормативные акты',
    date: '01.09.2023',
    size: '789 КБ',
    hasSignature: true,
    downloadUrl: '/documents/transfer-rules.pdf'
  },
  {
    id: '6',
    title: 'Порядок оформления возникновения, приостановления и прекращения отношений',
    category: 'Локальные нормативные акты',
    date: '01.09.2023',
    size: '567 КБ',
    hasSignature: true,
    downloadUrl: '/documents/relations-rules.pdf'
  },
  {
    id: '7',
    title: 'Отчет о результатах самообследования',
    category: 'Отчетные документы',
    date: '31.03.2024',
    size: '2.1 МБ',
    hasSignature: true,
    downloadUrl: '/documents/self-examination-2024.pdf'
  },
  {
    id: '8',
    title: 'Предписания органов, осуществляющих государственный контроль',
    category: 'Контрольно-надзорные документы',
    date: 'Не имеется',
    size: '-',
    hasSignature: false,
    downloadUrl: ''
  }
]

const categories = Array.from(new Set(documents.map(doc => doc.category)))

export default function DocumentsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-edu-navy mb-6">
        Документы
      </h2>

      <div className="mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Информация о документах
              </h3>
              <ul className="text-amber-800 space-y-1 text-sm">
                <li>• Все документы представлены в формате PDF</li>
                <li>• Документы подписаны усиленной квалифицированной электронной подписью (ЭЦП)</li>
                <li>• Информация актуализируется в соответствии с требованиями законодательства</li>
                <li>• При отсутствии документов указывается информация об отсутствии</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-edu-navy mb-4">
              {category}
            </h3>
            
            <div className="space-y-4">
              {documents
                .filter(doc => doc.category === category)
                .map((document) => (
                  <div 
                    key={document.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3">
                          <FileText className="h-5 w-5 text-edu-blue mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-2">
                              {document.title}
                            </h4>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Дата: {document.date}</span>
                              </div>
                              
                              {document.size !== '-' && (
                                <div>
                                  <span>Размер: {document.size}</span>
                                </div>
                              )}
                              
                              {document.hasSignature && (
                                <div className="flex items-center space-x-1 text-green-600">
                                  <Shield className="h-4 w-4" />
                                  <span>Подписано ЭЦП</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        {document.downloadUrl ? (
                          <a
                            href={document.downloadUrl}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-edu-blue text-white font-medium rounded-lg hover:bg-edu-navy transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4" />
                            <span>Скачать</span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-600 font-medium rounded-lg">
                            Документ отсутствует
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legal Note */}
      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Правовые основания размещения документов
        </h3>
        <div className="text-gray-700 space-y-2 text-sm">
          <p>
            <strong>Статья 29. Информационная открытость образовательной организации</strong> 
            Федерального закона от 29.12.2012 № 273-ФЗ «Об образовании в Российской Федерации»
          </p>
          <p>
            <strong>Постановление Правительства РФ от 20.10.2021 № 1802</strong> 
            «Об утверждении Правил размещения на официальном сайте образовательной организации 
            в информационно-телекоммуникационной сети «Интернет» и обновления информации 
            об образовательной орг��низации»
          </p>
          <p>
            <strong>Приказ Федеральной службы по надзору в сфере образования и науки 
            от 14.08.2020 № 831</strong> «Об утверждении Требований к структуре официального 
            сайта образовательной организации в информационно-телекоммуникационной сети 
            «Интернет» и формату представления информации»
          </p>
        </div>
      </div>
    </div>
  )
}
