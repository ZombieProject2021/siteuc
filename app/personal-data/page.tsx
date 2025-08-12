import { FileCheck, Shield, Calendar, Download } from 'lucide-react'

export default function PersonalDataConsentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <FileCheck className="h-8 w-8 text-edu-blue mr-3" />
            <h1 className="text-3xl font-bold text-edu-navy">
              Согласие на обработку персональных данных
            </h1>
          </div>

          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Calendar className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-900 font-semibold">Дата последнего обновления: 01 января 2024 г.</span>
            </div>
            <p className="text-green-800">
              Настоящее согласие дается в соответствии с требованиями Федерального закона 
              от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-edu-navy mb-4">
                Согласие субъекта персональных данных на обработку персональных данных
              </h2>
              
              <div className="prose text-gray-700 space-y-4">
                <p>
                  Я, _________________________________ (Ф.И.О. субъекта персональных данных), 
                  в соответствии с требованиями статьи 9 Федерального закона от 27.07.2006 № 152-ФЗ 
                  «О персональных данных», подтверждаю свое согласие на обработку 
                  Обществом с ограниченной ответственностью «Учебный центр» 
                  (далее — «Организация») моих персональных данных.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-edu-navy mb-4">
                1. Состав персональных данных
              </h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-blue-900 font-semibold mb-3">
                  Настоящее согласие распространяется на следующие персональные данные:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-blue-800">
                  <li>Фамилия, имя, отчество</li>
                  <li>Дата рождения</li>
                  <li>Пол</li>
                  <li>Гражданство</li>
                  <li>Адрес места жительства и регистрации</li>
                  <li>Контактная информация (номер телефона, адрес электронной почты)</li>
                  <li>Реквизиты документа, удостоверяющего личность</li>
                  <li>Сведения об образовании, специальности, квалификации</li>
                  <li>Фотография для документов об образовании</li>
                  <li>Иные персональные данные, предоставляемые субъектом для достижения целей обработки</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-edu-navy mb-4">
                2. Цели обработки персональных данных
              </h2>
              
              <div className="prose text-gray-700">
                <p>Согласие дается на обработку персональных данных в следующих целях:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Организация и проведение образовательного процесса</li>
                  <li>Заключение, изменение и расторжение договоров на оказание образовательных услуг</li>
                  <li>Ведение личных дел обучающих��я</li>
                  <li>Подготовка и выдача документов об образовании и (или) о квалификации</li>
                  <li>Предоставление справок и выписок из документов об образовании</li>
                  <li>Информирование о реализуемых образовательных программах и услугах</li>
                  <li>Обеспечение обратной связи с обучающимися</li>
                  <li>Ведение статистической отчетности</li>
                  <li>Исполнение обязательств, предусмотренных законодательством</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-edu-navy mb-4">
                3. Способы обработки персональных данных
              </h2>
              
              <div className="prose text-gray-700">
                <p>
                  Согласие дается на обработку персональных данных как с использованием средств автоматизации, 
                  так и без использования таких средств, включающую в себя следующие действия (операции):
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Сбор</li>
                  <li>Запись</li>
                  <li>Систематизация</li>
                  <li>Накопление</li>
                  <li>Хранение</li>
                  <li>Уточнение (обновление, изменение)</li>
                  <li>Извлечение</li>
                  <li>Использование</li>
                  <li>Передача (распространение, предоставление, доступ)</li>
                  <li>Обезличивание</li>
                  <li>Блокирование</li>
                  <li>Удаление</li>
                  <li>Уничтожение персональных данных</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-edu-navy mb-4">
                4. Сроки обработки и хранения
              </h2>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <p className="text-amber-900">
                  <strong>Срок действия согласия:</strong> с момента предоставления до достижения целей обработки 
                  или до отзыва настоящего согласия.
                </p>
                <p className="text-amber-900 mt-2">
                  <strong>Срок хранения персональных данных:</strong> определяется в соответствии 
                  с законодательством Российской Федерации и внутренними документами Организации.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-edu-navy mb-4">
                5. Передача персональных данных третьим лицам
              </h2>
              
              <div className="prose text-gray-700">
                <p>
                  Согласие распространяется на передачу персональных данных следующим кате��ориям получателей:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Органы государственной власти и местного самоуправления в случаях, предусмотренных законодательством</li>
                  <li>Организации, осуществляющие образовательную деятельность (при переводе обучающегося)</li>
                  <li>Работодатели (по запросам о подтверждении обучения)</li>
                  <li>Банки и платежные системы (для обработки платежей)</li>
                  <li>Страховые организации (при наличии договоров страхования)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-edu-navy mb-4">
                6. Права субъекта персональных данных
              </h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-900 font-semibold mb-3">
                  Субъект персональных данных имеет право:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Получать информацию о месте нахождения Организации, наличии персональных данных, правовых основаниях и целях их обработки</li>
                  <li>Получать информацию о лицах, которые имеют доступ к персональным данным или которым могут быть раскрыты персональные данные</li>
                  <li>Требовать от Организации уточнения персональных данных, их блокирования или уничтожения</li>
                  <li>Отозвать согласие на обработку персональных данных</li>
                  <li>Обратиться с жалобой в уполномоченный орган по защите прав субъектов персональных данных или в суд</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-edu-navy mb-4">
                7. Отзыв согласия
              </h2>
              
              <div className="prose text-gray-700">
                <p>
                  Настоящее согласие может быть отозвано субъектом персональных данных 
                  или его представителем путем направления письменного заявления в Организацию 
                  способами, указанными в Политике конфиденциальности.
                </p>
                <p>
                  В случае отзыва согласия Организация прекращает обработку персональных данных, 
                  за исключением случаев, когда обработка персональных данных необходима для защиты 
                  жизни, здоровья или иных жизненно важных интересов субъекта персональных данных 
                  либо прав и законных интересов других лиц.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-edu-navy mb-4">
                8. Подтверждение согласия
              </h2>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-green-900 mb-4">
                  Подписывая настоящее согласие, я подтверждаю, что:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-green-800">
                  <li>Ознакомился(лась) с Политикой конфиденциальности Организации</li>
                  <li>Понимаю значение и последствия предоставления согласия</li>
                  <li>Выражаю согласие на обработку указанных персональных данных в заявленных целях</li>
                  <li>Понимаю, что согласие действует до достижения целей обработки или до отзыва</li>
                </ul>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-1" />
                <span>Документ соответствует требованиям 152-ФЗ</span>
              </div>
              <div className="flex space-x-4">
                <a 
                  href="/documents/consent-form.pdf"
                  className="document-link text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4" />
                  Бланк согласия (PDF)
                </a>
                <a 
                  href="/documents/consent-example.pdf"
                  className="document-link text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4" />
                  Образец заполнения
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
