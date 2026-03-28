import { BookOpen, Clock, Users, Award, Calendar, FileText } from 'lucide-react'

interface Program {
  id: string
  title: string
  description: string
  duration: string
  participants: number
  category: string
  price: string
  schedule: string
  status: 'active' | 'upcoming' | 'archived'
}

const programs: Program[] = [
  {
    id: '1',
    title: 'Профессиональная переподготовка по направлению «Управление персоналом»',
    description: 'Комплексная программа для руко��одителей и специалистов HR-службы',
    duration: '520 академических часов',
    participants: 25,
    category: 'Профессиональная переподготовка',
    price: '45 000 руб.',
    schedule: 'Вечерние занятия 3 раза в неделю',
    status: 'active'
  },
  {
    id: '2',
    title: 'Повышение квалификации «Современные технологии обучения»',
    description: 'Программа для педагогических работников образовательных организаций',
    duration: '72 академических часа',
    participants: 18,
    category: 'Повышение квалификации',
    price: '12 000 руб.',
    schedule: 'Дневные занятия по субботам',
    status: 'active'
  },
  {
    id: '3',
    title: 'Курс «Основы проектного управления»',
    description: 'Практическая программа по управлению проектами для специалистов',
    duration: '144 академических часа',
    participants: 0,
    category: 'Дополнительное образование',
    price: '25 000 руб.',
    schedule: 'Начало набора: март 2024',
    status: 'upcoming'
  }
]

const getStatusColor = (status: Program['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'upcoming':
      return 'bg-blue-100 text-blue-800'
    case 'archived':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: Program['status']) => {
  switch (status) {
    case 'active':
      return 'Идёт набор'
    case 'upcoming':
      return 'Скоро'
    case 'archived':
      return 'Архив'
    default:
      return 'Неизвестно'
  }
}

export default function EducationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-4">
          Образовательные программы
        </h1>
        <p className="text-gray-600 mb-6">
          Наш учебный центр предлагает качественные программы дополнительного профессионального 
          образования для взрослых. Все программы лицензированы и соответствуют государственным 
          образовательным стандартам.
        </p>
      </div>

      {/* Program Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <BookOpen className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Профессиональная переподготовка</h3>
          <p className="text-blue-100 text-sm">
            Программы от 250 часов для получения новой квалификации
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
          <Award className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Повышение квалификации</h3>
          <p className="text-green-100 text-sm">
            Программы от 16 до 249 часов для совершенствования компетенций
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <Users className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Корпоративное обучение</h3>
          <p className="text-purple-100 text-sm">
            Индивидуальные программы для организаций и предприятий
          </p>
        </div>
      </div>

      {/* Programs List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-edu-navy">Актуальные программы</h2>
        
        {programs.map((program) => (
          <div key={program.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 pr-4">
                      {program.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(program.status)}`}>
                      {getStatusText(program.status)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{program.duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {program.participants > 0 ? `${program.participants} обучающихся` : 'Идёт набор'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{program.schedule}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{program.price}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <FileText className="h-4 w-4" />
                    <span>Категория: {program.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button 
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    program.status === 'active' 
                      ? 'bg-edu-blue text-white hover:bg-edu-navy' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={program.status !== 'active'}
                >
                  {program.status === 'active' ? 'Подать заявку' : 'Набор закрыт'}
                </button>
                
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Подробнее о программе
                </button>
                
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Скачать учебный план
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Information Section */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-edu-navy mb-6">Важная информация</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Документы об образовании</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Диплом о профессиональной переподготовке (250+ часов)</li>
              <li>• Удостоверение о повышении квалификации (16-249 часов)</li>
              <li>• Сертификат о прохождении обучения</li>
              <li>• Справка об обучении (для незавершённых программ)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Условия обучения</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Лицензированные образовательные программы</li>
              <li>• Квалифицированные преподаватели-практики</li>
              <li>• Гибкий график обучения</li>
              <li>• Современная материально-техническая база</li>
              <li>• Дистанционные и очные форматы</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Как поступить на обучение
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-blue-800">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">1</div>
              <p>Выберите программу</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">2</div>
              <p>Подайте заявку</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">3</div>
              <p>Заключите договор</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">4</div>
              <p>Начните обучение</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
