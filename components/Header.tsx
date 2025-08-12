'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Eye, Settings, BookOpen } from 'lucide-react'
import { useAccessibility } from '@/components/AccessibilityProvider'
import AccessibilitySettings from '@/components/AccessibilitySettings'

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
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Accessibility Bar */}
        <div className="bg-gray-900 py-2 text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleAccessibility}
                className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isAccessibilityMode
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                }`}
                aria-label={isAccessibilityMode ? 'Отключить версию для слабовидящих' : 'Включить версию для слабовидящих'}
              >
                <Eye className="h-4 w-4" />
                <span>{isAccessibilityMode ? 'Обычная версия' : 'Верси�� для слабовидящих'}</span>
              </button>

              <button
                onClick={() => setIsAccessibilitySettingsOpen(true)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-full text-xs font-medium transition-all"
                aria-label="Настройки доступности"
              >
                <Settings className="h-3 w-3" />
                <span className="hidden sm:inline">Настройки</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4 text-gray-400 text-xs">
                <span>📞 +7 (495) 123-45-67</span>
                <span>✉️ info@uchebnycentr.ru</span>
              </div>
              <Link href="/admin" className="flex items-center space-x-1 text-gray-400 hover:text-yellow-400 transition-colors text-xs">
                <Settings className="h-3 w-3" />
                <span className="hidden sm:inline">Админ</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-6">
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
            <nav className="hidden lg:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-edu-blue transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Открыть меню"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 px-4 text-gray-700 hover:text-edu-blue hover:bg-gray-50 rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
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
