'use client'

import { useState, useEffect } from 'react'
import { Eye, Type, Palette, Volume2, Settings, X } from 'lucide-react'
import { useAccessibility } from '@/components/AccessibilityProvider'

interface AccessibilitySettingsProps {
  isOpen: boolean
  onClose: () => void
}

export default function AccessibilitySettings({ isOpen, onClose }: AccessibilitySettingsProps) {
  const { 
    isAccessibilityMode, 
    fontSize, 
    contrast, 
    toggleAccessibility, 
    setFontSize, 
    setContrast 
  } = useAccessibility()

  const [speechEnabled, setSpeechEnabled] = useState(false)

  useEffect(() => {
    const savedSpeech = localStorage.getItem('accessibility-speech')
    if (savedSpeech === 'true') {
      setSpeechEnabled(true)
    }
  }, [])

  const handleSpeechToggle = () => {
    const newValue = !speechEnabled
    setSpeechEnabled(newValue)
    localStorage.setItem('accessibility-speech', newValue.toString())
  }

  const speakText = (text: string) => {
    if (speechEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ru-RU'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-edu-navy flex items-center">
            <Settings className="h-6 w-6 mr-2" />
            Настройки доступности
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Закрыть настройки"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Main Toggle */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Основные настройки
            </h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAccessibilityMode}
                  onChange={toggleAccessibility}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  <span className="text-lg font-medium text-blue-900">
                    Включить версию для слабовидящих
                  </span>
                  <p className="text-sm text-blue-700 mt-1">
                    Активирует специальные цвета и улучшенную контрастность
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Type className="h-5 w-5 mr-2" />
              Размер шрифта
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'normal', label: 'Обычный', description: '100%' },
                { value: 'large', label: 'Крупный', description: '120%' },
                { value: 'extra-large', label: 'Очень крупный', description: '150%' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    fontSize === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="fontSize"
                    value={option.value}
                    checked={fontSize === option.value}
                    onChange={(e) => setFontSize(e.target.value as any)}
                    className="sr-only"
                  />
                  <span className="font-medium text-gray-900">{option.label}</span>
                  <span className="text-sm text-gray-600 mt-1">{option.description}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Contrast */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Контрастность
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'normal', label: 'Обычная', description: 'Стандартные цвета' },
                { value: 'high', label: 'Высокая', description: 'Повышенная контрастность' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    contrast === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="contrast"
                    value={option.value}
                    checked={contrast === option.value}
                    onChange={(e) => setContrast(e.target.value as any)}
                    className="sr-only"
                  />
                  <span className="font-medium text-gray-900">{option.label}</span>
                  <span className="text-sm text-gray-600 mt-1">{option.description}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Speech Synthesis */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Volume2 className="h-5 w-5 mr-2" />
              Озвучивание текста
            </h3>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={speechEnabled}
                  onChange={handleSpeechToggle}
                  className="w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                />
                <div>
                  <span className="text-lg font-medium text-green-900">
                    Включить озвучивание
                  </span>
                  <p className="text-sm text-green-700 mt-1">
                    Автоматическое озвучивание текста при наведении
                  </p>
                </div>
              </label>
              
              {speechEnabled && (
                <div className="mt-4">
                  <button
                    onClick={() => speakText('Проверка синтеза речи. Это тестовое сообщение для проверки озвучивания текста.')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Тест озвучивания
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Keyboard Navigation Help */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Навигация с клавиатуры
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p><kbd className="px-2 py-1 bg-gray-200 rounded">Tab</kbd> - Переход к следующему элементу</p>
                <p><kbd className="px-2 py-1 bg-gray-200 rounded">Shift + Tab</kbd> - Переход к предыдущему элементу</p>
                <p><kbd className="px-2 py-1 bg-gray-200 rounded">Enter</kbd> - Активация ссылки/кнопки</p>
              </div>
              <div>
                <p><kbd className="px-2 py-1 bg-gray-200 rounded">Space</kbd> - Активация кнопки</p>
                <p><kbd className="px-2 py-1 bg-gray-200 rounded">Esc</kbd> - Закрытие модальных окон</p>
                <p><kbd className="px-2 py-1 bg-gray-200 rounded">Alt + 1</kbd> - Переход к основному содержанию</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
