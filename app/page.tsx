'use client'

import Link from 'next/link'
import { useState } from 'react'
import DynamicContent from '@/components/DynamicContent'
import { 
  BookOpen, 
  Users, 
  Award, 
  Shield, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('programs')

  const stats = [
    { label: 'Лет на рынке', valueKey: 'homepage.stats.years', defaultValue: '15+', icon: TrendingUp },
    { label: 'Выпускников', valueKey: 'homepage.stats.graduates', defaultValue: '5000+', icon: Users },
    { label: 'Программ обучения', valueKey: 'homepage.stats.programs', defaultValue: '50+', icon: BookOpen },
    { label: 'Преподавателей', valueKey: 'homepage.stats.teachers', defaultValue: '30+', icon: Award },
  ]

  const programs = [
    {
      id: 1,
      title: 'Управление персоналом',
      duration: '520 ак.ч.',
      price: '45000',
      oldPrice: '55000',
      level: 'Профессиональная переподготовка',
      students: 156,
      rating: 4.8,
      features: ['Диплом гос. образца', 'Дистанционно', 'Практические кейсы']
    },
    {
      id: 2,
      title: 'Бухгалтерский учет и налогообложение',
      duration: '256 ак.ч.',
      price: '32000',
      oldPrice: '38000',
      level: 'Профессиональная переподготовка',
      students: 89,
      rating: 4.9,
      features: ['Диплом гос. образца', 'Очно-заочно', '1С:Бухгалтерия']
    },
    {
      id: 3,
      title: 'Проектное управление',
      duration: '144 ак.ч.',
      price: '25000',
      oldPrice: '',
      level: 'Повышение квалификации',
      students: 67,
      rating: 4.7,
      features: ['Удостоверение', 'Онлайн', 'Международные стандарты']
    }
  ]

  const benefits = [
    { key: 'homepage.benefit.1', defaultText: 'Лицензированные программы' },
    { key: 'homepage.benefit.2', defaultText: 'Государственные дипломы' },
    { key: 'homepage.benefit.3', defaultText: 'Рассрочка без переплат' },
    { key: 'homepage.benefit.4', defaultText: 'Помощь в трудоустройстве' },
    { key: 'homepage.benefit.5', defaultText: 'Гибкий график обучения' },
    { key: 'homepage.benefit.6', defaultText: 'Практикующие преподаватели' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-5xl mx-auto text-center">
            <DynamicContent
              contentKey="homepage.hero.title"
              defaultContent="Получите новую профессию за 2-6 месяцев"
              tag="h1"
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            />
            <DynamicContent
              contentKey="homepage.hero.description"
              defaultContent="Дополнительное профессиональное образование с выдачей документов государственного образца"
              tag="p"
              className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto"
            />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/courses" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
              >
                Выбрать курс
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/consultation" 
                className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Бесплатная консультация
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-8 w-8 text-yellow-400" />
                  </div>
                  <DynamicContent
                    contentKey={stat.valueKey}
                    defaultContent={stat.defaultValue}
                    tag="div"
                    className="text-2xl md:text-3xl font-bold"
                  />
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Programs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <DynamicContent
              contentKey="homepage.programs.title"
              defaultContent="Популярные программы обучения"
              tag="h2"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            />
            <DynamicContent
              contentKey="homepage.programs.subtitle"
              defaultContent="Выберите направление, которое поможет вам достичь карьерных целей"
              tag="p"
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div key={program.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {program.level}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{program.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {program.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{program.duration}</span>
                    <Users className="h-4 w-4 ml-4 mr-2" />
                    <span className="text-sm">{program.students} студентов</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {parseInt(program.price).toLocaleString('ru-RU')} ₽
                        </span>
                        {program.oldPrice && (
                          <span className="ml-2 text-lg text-gray-500 line-through">
                            {parseInt(program.oldPrice).toLocaleString('ru-RU')} ₽
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">или в рассрочку</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link 
                      href={`/courses/${program.id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center transition-colors"
                    >
                      Подробнее
                    </Link>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-4 rounded-lg font-medium transition-colors">
                      Записаться
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/courses"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Все программы обучения
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Почему выбирают нас
              </h2>
              <p className="text-xl text-gray-600">
                Бо��ее 15 лет готовим квалифицированных специалистов
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center p-6 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                  <span className="font-medium text-gray-900">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Готовы начать обучение?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Получите бесплатную консультацию и узнайте, какая программа подходит именно вам
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+74951234567"
                className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                +7 (495) 123-45-67
              </a>
              <a 
                href="mailto:info@uchebnycentr.ru"
                className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
              >
                <Mail className="mr-2 h-5 w-5" />
                Написать нам
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
