'use client'

import { useState } from 'react'
import { Phone, Mail, MessageSquare, Clock, CheckCircle, Users, Award, Target, Calendar } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    consultationType: 'general',
    courseInterest: '',
    message: '',
    contactMethod: 'phone'
  })
  const [loading, setLoading] = useState(false)

  const consultationTypes = [
    { value: 'general', label: 'Общая консультация' },
    { value: 'course_selection', label: 'Помощь в выборе курса' },
    { value: 'career_guidance', label: 'Карьерное консультирование' },
    { value: 'financing', label: 'Варианты оплаты и рассрочки' },
    { value: 'corporate', label: 'Корпоративное обучение' }
  ]

  const timeSlots = [
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00'
  ]

  const benefits = [
    {
      icon: Target,
      title: 'Персональный подход',
      description: 'Учитываем ваши цели, опыт и предпочтения при выборе программы обучения'
    },
    {
      icon: Users,
      title: 'Опытные консультанты',
      description: 'Наши специалисты имеют многолетний опыт в образовании и HR-сфере'
    },
    {
      icon: Award,
      title: 'Профессиональные рекомендации',
      description: 'Поможем выбрать оптимальную программу для достижения ваших карьерных целей'
    },
    {
      icon: CheckCircle,
      title: 'Бесплатно и без обязательств',
      description: 'Консультация абсолютно бесплатна, никаких скрытых платежей'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In real app, send data to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Тип консультации: ${formData.consultationType}\nПредпочитаемое время: ${formData.preferredTime}\nИнтересующий курс: ${formData.courseInterest}\nСпособ связи: ${formData.contactMethod}\n\nСообщение: ${formData.message}`,
          source: 'consultation_page'
        })
      })

      if (response.ok) {
        toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredTime: '',
          consultationType: 'general',
          courseInterest: '',
          message: '',
          contactMethod: 'phone'
        })
      } else {
        throw new Error('Ошибка отправки')
      }
    } catch (error) {
      toast.error('Произошла ошибка. Попро��уйте позже или свяжитесь с нами по телефону.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Бесплатная консультация
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Получите персональную консультацию по выбору образовательной программы
            </p>
            
            {/* Quick Contact */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center space-x-2 text-lg">
                <Phone className="h-5 w-5 text-yellow-400" />
                <span>+7 (495) 123-45-67</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-2 text-lg">
                <Mail className="h-5 w-5 text-yellow-400" />
                <span>info@uchebnycentr.ru</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Consultation Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Записаться на консультацию
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+7 (xxx) xxx-xx-xx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.ru"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип консультации
                </label>
                <select
                  name="consultationType"
                  value={formData.consultationType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {consultationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Интересующий курс (необязательно)
                </label>
                <input
                  type="text"
                  name="courseInterest"
                  value={formData.courseInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Название курса или направление"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Предпочитаемое время
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Любое время</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Способ связи
                  </label>
                  <select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="phone">Телефонный звонок</option>
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telegram">Telegram</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дополнительные вопросы
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Расскажите о ваших целях, вопросах или пожеланиях..."
                />
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  Я согласен на обработку персональных данных в соответствии с{' '}
                  <a href="/personal-data" className="text-blue-600 hover:underline">
                    политикой конфиденциальности
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Отправляем...</span>
                  </div>
                ) : (
                  <>
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Записаться на консультацию
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Benefits and Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Что вы получите от консультации
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                        <p className="text-gray-700">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-blue-50 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                График консультаций
              </h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Понедельник-Пятница:</strong> 09:00 - 18:00</p>
                <p><strong>Суббота:</strong> 10:00 - 16:00</p>
                <p><strong>Воскресенье:</strong> выходной</p>
                <p className="text-sm text-blue-600 mt-3">
                  💡 Среднее время консультации: 30-45 минут
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-900 text-white p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">
                Свяжитесь с нами напрямую
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="font-medium">+7 (495) 123-45-67</p>
                    <p className="text-sm text-gray-400">Звоните в рабочее время</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="font-medium">info@uchebnycentr.ru</p>
                    <p className="text-sm text-gray-400">Ответим в течение 2 часов</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="font-medium">WhatsApp / Telegram</p>
                    <p className="text-sm text-gray-400">Тот же номер телефона</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Часто задаваемые вопросы
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Консультация действительно бесплатная?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Да, абсолютно. Никаких скрытых платежей или обязательств.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Сколько длится консультация?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Обычно 30-45 минут, но может быть дольше при необходимости.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Можно ли получить консультацию онлайн?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Да, мы проводим консультации по видеосвязи, телефону или в офисе.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
