import { MapPin, Phone, Mail, Clock, Car, Bus, Users, MessageCircle, BookOpen } from 'lucide-react'

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-edu-navy mb-4">
          Контактная информация
        </h1>
        <p className="text-gray-600">
          Мы готовы ответить на все ваши вопросы и помочь выбрат�� подходящую образовательную программу.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-edu-navy mb-6">Основная информация</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-edu-blue mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Адрес</h3>
                  <p className="text-gray-700">
                    123456, г. Москва, ул. Примерная, д. 1, оф. 10
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Юридический и фактический адрес совпадают
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-edu-blue mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Телефоны</h3>
                  <div className="space-y-1">
                    <p className="text-gray-700">
                      <span className="font-medium">Приёмная:</span> +7 (495) 123-45-67
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Отдел образования:</span> +7 (495) 123-45-68
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Факс:</span> +7 (495) 123-45-69
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-edu-blue mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Электронная почта</h3>
                  <div className="space-y-1">
                    <p className="text-gray-700">
                      <span className="font-medium">Общие вопросы:</span> info@example.ru
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Поступление:</span> admission@example.ru
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Техподдержка:</span> support@example.ru
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-edu-blue mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Режим работы</h3>
                  <div className="space-y-1 text-gray-700">
                    <p><span className="font-medium">Понедельник-Пятница:</span> 09:00 - 18:00</p>
                    <p><span className="font-medium">Суббота:</span> 10:00 - 16:00</p>
                    <p><span className="font-medium">Воскресенье:</span> выходной</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Обеденный перерыв: 13:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transport */}
          <div>
            <h2 className="text-2xl font-semibold text-edu-navy mb-6">Как добраться</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Bus className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Общественный транспорт</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Станция метро «Примерная» (5 минут пешком)</li>
                    <li>• Автобусы: №101, №205, №367 (остановка «Учебная»)</li>
                    <li>• Троллейбусы: №15, №28 (остановка «Образовательная»)</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Car className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">На автомобил��</h3>
                  <p className="text-gray-700 mb-2">
                    Бесплатная парковка во дворе здания
                  </p>
                  <p className="text-sm text-gray-600">
                    Въезд с улицы Примерная, ориентир — красное здание с вывеской «Учебный центр»
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form and Map */}
        <div className="space-y-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-edu-navy mb-6 flex items-center">
              <MessageCircle className="h-6 w-6 mr-2" />
              Задать вопрос
            </h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue focus:border-transparent"
                  placeholder="Ваше имя"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue focus:border-transparent"
                  placeholder="your@email.ru"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue focus:border-transparent"
                  placeholder="+7 (xxx) xxx-xx-xx"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Тема обращения
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue focus:border-transparent"
                >
                  <option value="">Выберите тему</option>
                  <option value="admission">Поступление на программу</option>
                  <option value="programs">Информация о программах</option>
                  <option value="documents">Документы об образовании</option>
                  <option value="payment">Оплата обучения</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Сообщение *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-edu-blue focus:border-transparent resize-none"
                  placeholder="Опишите ваш вопрос..."
                ></textarea>
              </div>
              
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  className="mt-1 h-4 w-4 text-edu-blue border-gray-300 rounded focus:ring-2 focus:ring-edu-blue"
                />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  Я согласен на обработку персональных данных в соответствии с{' '}
                  <a href="/personal-data" className="text-edu-blue hover:underline">
                    политикой конфиденциальности
                  </a>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-edu-blue text-white py-3 px-6 rounded-md font-medium hover:bg-edu-navy transition-colors focus:outline-none focus:ring-2 focus:ring-edu-blue focus:ring-offset-2"
              >
                Отправить сообщение
              </button>
            </form>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p className="font-medium">Интерактивная карта</p>
              <p className="text-sm">г. Москва, ул. Примерная, д. 1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Contacts */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-edu-navy mb-8 flex items-center">
          <Users className="h-6 w-6 mr-2" />
          Ключевые контакты
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-edu-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Иванов Иван Иванович</h3>
            <p className="text-gray-600 mb-2">Директор</p>
            <p className="text-sm text-gray-600">director@example.ru</p>
            <p className="text-sm text-gray-600">+7 (495) 123-45-67, доб. 101</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Петрова Анна Сергеевна</h3>
            <p className="text-gray-600 mb-2">Методист</p>
            <p className="text-sm text-gray-600">education@example.ru</p>
            <p className="text-sm text-gray-600">+7 (495) 123-45-68</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Сидоров Петр Михайлович</h3>
            <p className="text-gray-600 mb-2">Администратор</p>
            <p className="text-sm text-gray-600">admin@example.ru</p>
            <p className="text-sm text-gray-600">+7 (495) 123-45-69</p>
          </div>
        </div>
      </div>
    </div>
  )
}
