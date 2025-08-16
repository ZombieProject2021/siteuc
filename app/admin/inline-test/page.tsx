'use client'

import InlineEditable from '@/components/InlineEditable'
import DynamicContent from '@/components/DynamicContent'

export default function InlineTestPage() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-edu-navy mb-6">
          Тестирование inline редактирования
        </h1>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Редактирование через настройки</h3>
            <div className="border rounded-lg p-4 bg-gray-50">
              <InlineEditable
                contentKey="test_title"
                defaultContent="Заголовок для тестирования"
                tag="h2"
                className="text-xl font-bold text-gray-900"
                saveToSettings={true}
                placeholder="Введите заголовок"
              />
              
              <InlineEditable
                contentKey="test_description"
                defaultContent="Это описание можно редактировать прямо на странице. Попробуйте кликнуть на текст когда вы авторизованы как админ."
                multiline={true}
                className="text-gray-600 mt-2"
                saveToSettings={true}
                placeholder="Введите описание"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Редактирование через Content API</h3>
            <div className="border rounded-lg p-4 bg-blue-50">
              <DynamicContent
                contentKey="test.hero.title"
                defaultContent="Заголовок через DynamicContent"
                tag="h2"
                className="text-xl font-bold text-blue-900"
                editable={true}
                placeholder="Введите заголовок через DynamicContent"
              />
              
              <DynamicContent
                contentKey="test.hero.description"
                defaultContent="Этот контент сохраняется в content API и может быть отредактирован inline."
                tag="p"
                className="text-blue-700 mt-2"
                editable={true}
                multiline={true}
                placeholder="Введите описание через DynamicContent"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Различные типы полей</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Короткий текст
                </label>
                <InlineEditable
                  contentKey="test_short_text"
                  defaultContent="Короткая строка"
                  className="text-gray-900 font-medium"
                  saveToSettings={true}
                  placeholder="Введите короткий текст"
                />
              </div>

              <div className="border rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Многострочный текст
                </label>
                <InlineEditable
                  contentKey="test_multiline_text"
                  defaultContent="Многострочный текст.&#10;Вторая строка.&#10;Третья строка."
                  multiline={true}
                  className="text-gray-900"
                  saveToSettings={true}
                  placeholder="Введите многострочный текст"
                  isHtml={true}
                />
              </div>

              <div className="border rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <InlineEditable
                  contentKey="test_email"
                  defaultContent="test@example.com"
                  className="text-blue-600"
                  saveToSettings={true}
                  placeholder="Введите email"
                />
              </div>

              <div className="border rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <InlineEditable
                  contentKey="test_phone"
                  defaultContent="+7 (999) 123-45-67"
                  className="text-green-600"
                  saveToSettings={true}
                  placeholder="Введите номер телефона"
                />
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">Как использовать:</h4>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• Авторизуйтесь как администратор через /admin</li>
              <li>• Наведите курсор на редактируемые элементы - появится иконка карандаша</li>
              <li>• Кликните на элемент или карандаш для начала редактирования</li>
              <li>• Используйте Enter для сохранения (Ctrl+Enter для многострочных полей)</li>
              <li>• Нажмите Escape для отмены изменений</li>
              <li>• Изменения сохраняются автоматически при подтверждении</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
