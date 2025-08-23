'use client'

import Link from 'next/link'
import { useState } from 'react'
import DynamicContent from '@/components/DynamicContent'
import ClientOnly from '@/components/ClientOnly'
import HydrationSafe from '@/components/HydrationSafe'
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
  TrendingUp,
  PlayCircle,
  Download,
  FileText,
  Briefcase,
  GraduationCap,
  Calendar,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Quote,
  MapPin,
  Globe,
  Laptop,
  UserCheck,
  Building,
  CreditCard,
  HeadphonesIcon,
  VideoIcon
} from 'lucide-react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('programs')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

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
      level: 'Профе��сиональная переподготовка',
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
    { key: 'homepage.benefit.1', defaultText: 'Лицензированные ����рограммы', icon: Shield },
    { key: 'homepage.benefit.2', defaultText: 'Государственные дипломы', icon: Award },
    { key: 'homepage.benefit.3', defaultText: 'Рассрочка без переплат', icon: CreditCard },
    { key: 'homepage.benefit.4', defaultText: 'Помощь в трудоустройстве', icon: Briefcase },
    { key: 'homepage.benefit.5', defaultText: 'Гибкий график обучения', icon: Clock },
    { key: 'homepage.benefit.6', defaultText: 'Практикующие преподаватели', icon: Users },
  ]

  const learningFormats = [
    {
      title: 'Дистанционное обучение',
      description: 'Изучайте материалы в удобное время из любой точки мира',
      icon: Laptop,
      features: ['Онлайн-лекции', 'Интерактивные задания', 'Персональный куратор']
    },
    {
      title: 'Очно-заочное обучение',
      description: 'Сочетание онлайн-формата с практическими занятиями',
      icon: Building,
      features: ['Вебинары с экспертами', 'Практические семинары', 'Нетворкинг']
    },
    {
      title: 'Корпоративное обучение',
      description: 'Индивидуальные программы для команд и органи��аций',
      icon: Users,
      features: ['Программы под задачи', 'Обучение на рабочем месте', 'Групповые скидки']
    }
  ]

  const testimonials = [
    {
      name: 'Анна Петрова',
      position: 'HR-директор, ООО "Технологии"',
      photo: '/api/placeholder/60/60',
      rating: 5,
      text: 'Прошла курс по управлению персоналом. Отличная программа, много практических кейсов. После обучения получила повышение и увеличение зарплаты на 40%.'
    },
    {
      name: 'Дмитрий Иванов',
      position: 'Главный бухгалтер, ЗАО "Финансы"',
      photo: '/api/placeholder/60/60',
      rating: 5,
      text: 'Программа переподготовки по бухучету превзошла ожидания. Преподаватели-практики, актуальные материалы, отличная поддержка клиентов.'
    },
    {
      name: 'Е��ена Сидорова',
      position: 'Проект-менеджер, IT-компания',
      photo: '/api/placeholder/60/60',
      rating: 5,
      text: '��урс по проектному у��равлению дал все необходимые знания для работы. Получила международный сертификат и новую должность.'
    }
  ]

  const faqs = [
    {
      question: 'Какие документы я получу после обучения?',
      answer: 'По программам профессиональной переподготовки (от 250 часов) выдается диплом государственного образца. По программам повышения квалификации (от 16 часов) - удостоверение государственного образца.'
    },
    {
      question: 'Можно ли учиться в рассрочку?',
      answer: 'Да, мы предоставляем рассрочку до 12 месяцев без процентов и переплат. Для оформления рассрочки нужен только паспорт.'
    },
    {
      question: 'Сколько времени занимает обучение?',
      answer: 'Дл��тельность зависит от программы: курсы повышения квалификации - от 2 недель до 3 месяцев, профессиональная переподготовка - от 2 до 6 месяцев.'
    },
    {
      question: 'Есть ли поддержка во время обучения?',
      answer: 'Каждому клиенту назначается персональный куратор, ��оторый помогает с организационными вопросами и учебным процессом.'
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div suppressHydrationWarning={true}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden" suppressHydrationWarning={true}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-20">
          <HydrationSafe className="max-w-5xl mx-auto text-center">
            <DynamicContent
              contentKey="homepage.hero.title"
              defaultContent="Получите новую профессию за 2-6 месяцев"
              tag="h1"
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight"
              editable={true}
              placeholder="Введите заголовок главной страницы"
            />
            <DynamicContent
              contentKey="homepage.hero.description"
              defaultContent="Дополнительное профессиональное образование с выдачей документов государ��твенного образца"
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
            <ClientOnly>
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
            </ClientOnly>
          </HydrationSafe>
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
              defaultContent="Выберите направлен��е, которое поможет вам достичь карьерных целей"
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
                    <span className="text-sm">{program.students} клиентов</span>
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

      {/* Learning Formats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Форматы обучения
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Выберите удобный для вас формат обучен��я
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningFormats.map((format, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <format.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{format.title}</h3>
                <p className="text-gray-600 mb-6">{format.description}</p>
                <div className="space-y-3">
                  {format.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <DynamicContent
                contentKey="homepage.benefits.title"
                defaultContent="Почему выбирают нас"
                tag="h2"
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              />
              <DynamicContent
                contentKey="homepage.benefits.subtitle"
                defaultContent="Более 15 лет готовим квалифицированных специалистов"
                tag="p"
                className="text-xl text-gray-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start p-6 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <DynamicContent
                      contentKey={benefit.key}
                      defaultContent={benefit.defaultText}
                      tag="h3"
                      className="font-semibold text-gray-900 mb-2"
                    />
                    <p className="text-gray-600 text-sm">
                      {benefit.defaultText === 'Лицензированные программы' && 'Все программы имеют государственную лицензию'}
                      {benefit.defaultText === 'Государственные дипломы' && 'Документы признаются по всей России'}
                      {benefit.defaultText === '��ассрочка без переплат' && 'Удобная оплата до 12 месяцев'}
                      {benefit.defaultText === 'Помощь в трудоуст��ойстве' && 'Содействие в поиске работы'}
                      {benefit.defaultText === 'Гибкий график обучения' && 'Учитесь в удобное время'}
                      {benefit.defaultText === 'Практикующие преподаватели' && 'Эксперты с большим опытом'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Отзывы наших выпускников
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Узнайте, как наше обучение помогло достичь карьерных целей
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={prevTestimonial}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <div className="flex-1 text-center">
                  <Quote className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <p className="text-lg text-gray-700 mb-6 italic">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonials[currentTestimonial].position}
                      </p>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={nextTestimonial}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ответы на популярные вопросы о наших программах обучения
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/consultation"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Задать свой воп��ос
            </Link>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <DynamicContent
              contentKey="homepage.cta.title"
              defaultContent="Готовы начать обучение?"
              tag="h2"
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            />
            <DynamicContent
              contentKey="homepage.cta.subtitle"
              defaultContent="Получите бесплатную консу��ьтацию и узнайте, какая программа подходит именно вам"
              tag="p"
              className="text-xl text-blue-100 mb-8"
            />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+74951234567"
                className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                <DynamicContent
                  contentKey="contacts.phone"
                  defaultContent="+7 (495) 123-45-67"
                  tag="span"
                />
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
