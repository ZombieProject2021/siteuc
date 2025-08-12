import { Users, Award, Target, Heart, CheckCircle, BookOpen, Calendar, MapPin } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { label: 'Лет на рынке', value: '15+', icon: Calendar },
    { label: 'Выпускников', value: '5000+', icon: Users },
    { label: 'Программ обучения', value: '50+', icon: BookOpen },
    { label: 'Преподавателей', value: '30+', icon: Award },
  ]

  const values = [
    {
      icon: Target,
      title: 'Качество образования',
      description: 'Мы предоставляем образование высокого качества, соответствующее современным требованиям рынка труда.'
    },
    {
      icon: Heart,
      title: 'Индивидуальный подход',
      description: 'Каждый студент для нас уникален. Мы учитываем потребности и возможности каждого обучающегося.'
    },
    {
      icon: Award,
      title: 'Практическая направленность',
      description: 'Наши программы сфокусированы на практических навыках, которые сразу можно применить в работе.'
    },
    {
      icon: Users,
      title: 'Профессиональная команда',
      description: 'С вами работают опытные преподаватели-практики с многолетним стажем в своих областях.'
    }
  ]

  const team = [
    {
      name: 'Иванов Иван Иванович',
      position: 'Директор',
      experience: '20 лет опыта в образовании',
      education: 'МГУ им. М.В. Ломоносова',
      description: 'Кандидат экономических наук, автор более 50 научных публикаций'
    },
    {
      name: 'Петрова Анна Сергеевна',
      position: 'Академический директор',
      experience: '15 лет опыта в HR',
      education: 'МГИМО',
      description: 'Эксперт в области управления персоналом и организационного развития'
    },
    {
      name: 'Сидоров Петр Михайлович',
      position: 'Ведущий методист',
      experience: '12 лет в образовании',
      education: 'РЭУ им. Г.В. Плеханова',
      description: 'Специалист по разработке образовательных программ и методик'
    }
  ]

  const achievements = [
    'Лицензия на образовательную деятельность',
    'Аккредитация Министерства образования РФ',
    'Член Российского союза промышленников и предпринимателей',
    'Партнер ведущих IT-компаний',
    'Сертифицированный центр Microsoft',
    'Авторизованный учебный центр 1С'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              О нашем учебном центре
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Более 15 лет мы помогаем людям получать новые профессии и развивать карьеру
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Company Story */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Наша история
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl leading-relaxed mb-6">
                ООО «Учебный Центр» основан в 2008 году с целью предоставления качественного 
                дополнительного профессионального образования. За годы работы мы выпустили 
                более 5000 специалистов в различных областях.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Мы специализируемся на программах профессиональной переподготовки и повышения 
                квалификации для взрослых. Наши курсы разработаны с учетом современных требований 
                рынка труда и лучших практик ведущих компаний.
              </p>
              <p className="text-lg leading-relaxed">
                Сегодня наш учебный центр — это современная образовательная организация с 
                собственной методической базой, квалифицированными преподавателями и 
                инновационными технологиями обучения.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Цифры, которые говорят за нас
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Наши ценности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mb-6 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Наша команда
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{member.position}</p>
                <p className="text-gray-600 text-sm mb-3">{member.experience}</p>
                <p className="text-gray-600 text-sm mb-4">{member.education}</p>
                <p className="text-gray-700 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Наши достижения и партнеры
          </h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Готовы начать обучение?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Свяжитесь с нами для получения подробной консультации
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>г. Москва, ул. Примерная, д. 1, оф. 10</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞 +7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️ info@uchebnycentr.ru</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
