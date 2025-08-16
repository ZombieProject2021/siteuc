'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Eye, Settings, BookOpen } from 'lucide-react'
import { useAccessibility } from '@/components/AccessibilityProvider'
import AccessibilitySettings from '@/components/AccessibilitySettings'
import DynamicContent from '@/components/DynamicContent'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAccessibilitySettingsOpen, setIsAccessibilitySettingsOpen] = useState(false)
  const { isAccessibilityMode, toggleAccessibility } = useAccessibility()

  const navigationItems = [
    { href: '/', label: 'Главная' },
    { href: '/courses', label: 'Курсы' },
    { href: '/about', label: 'О нас' },
    { href: '/info', label: 'Сведения' },
    { href: '/reviews', label: 'Отзывы' },
    { href: '/contacts', label: 'Контакты' },
  ]

  return (
    <header className="bg-white shadow-lg relative z-50">
      {/* Accessibility Bar - Full Width */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-3 text-sm border-b border-gray-700 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => {
                    if (!isAccessibilityMode) {
                      toggleAccessibility()
                    } else {
                      setIsAccessibilitySettingsOpen(true)
                    }
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
                    isAccessibilityMode
                      ? 'bg-yellow-400 text-black shadow-lg border-yellow-500'
                      : 'bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white border-gray-600 hover:border-gray-500'
                  }`}
                  aria-label={isAccessibilityMode ? 'Настройки версии для слабовидящих' : 'Включить версию для слабовидящих'}
                >
                  <Eye className="h-4 w-4" />
                  <span>Версия для слабовидящих</span>
                  {isAccessibilityMode && <Settings className="h-4 w-4 ml-1" />}
                </button>

                {isAccessibilityMode && (
                  <button
                    onClick={toggleAccessibility}
                    className="absolute -right-8 top-0 h-full px-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-r-lg text-xs font-medium transition-all border border-yellow-500"
                    aria-label="Отключить версию для слабовидящих"
                    title="Отключить"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-1 text-gray-400 hover:text-yellow-400 transition-colors text-xs">
                <Settings className="h-3 w-3" />
                <span className="hidden sm:inline">Админ</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Container Width */}
      <div className="py-5 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-xl shadow-md">
                <BookOpen className="h-7 w-7" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">ООО Учебный Центр</div>
                <div className="text-sm text-gray-600 font-medium">Профессиональное образование с 2008 года</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium text-sm"
                >
                  {item.label}
                </Link>
              ))}
              <div className="ml-4 pl-4 border-l border-gray-300 flex flex-col space-y-1">
                <a href="tel:+74951234567" className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                  +7 (495) 123-45-67
                </a>
                <a href="mailto:info@uchebnycentr.ru" className="text-blue-600 hover:text-blue-800 text-xs">
                  info@uchebnycentr.ru
                </a>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              <Link
                href="/consultation"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                Звонок
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Открыть меню"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <Link
                    href="/consultation"
                    className="block w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-4 rounded-lg font-semibold text-center transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Бесплатная консультация
                  </Link>
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>

      <AccessibilitySettings
        isOpen={isAccessibilitySettingsOpen}
        onClose={() => setIsAccessibilitySettingsOpen(false)}
      />
    </header>
  )
}
