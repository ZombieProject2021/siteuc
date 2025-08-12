'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Eye, Settings } from 'lucide-react'
import { useAccessibility } from '@/components/AccessibilityProvider'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAccessibilityMode, toggleAccessibility } = useAccessibility()

  const navigationItems = [
    { href: '/', label: 'Главная' },
    { href: '/info', label: 'Сведения об организации' },
    { href: '/education', label: 'Образование' },
    { href: '/documents', label: 'Документы' },
    { href: '/staff', label: 'Сотрудники' },
    { href: '/contacts', label: 'Контакты' },
  ]

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Accessibility Bar */}
        <div className="bg-edu-light-gray py-2 text-sm border-b border-gray-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Версия для слабовидящих:</span>
              <button
                onClick={toggleAccessibility}
                className={`flex items-center space-x-2 px-3 py-1 rounded ${
                  isAccessibilityMode 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label={isAccessibilityMode ? 'Отключить версию для слабовидящих' : 'Включить версию для слабовидящих'}
              >
                <Eye className="h-4 w-4" />
                <span>{isAccessibilityMode ? 'Обычная версия' : 'Для слабовидящих'}</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-1 text-gray-600 hover:text-edu-blue">
                <Settings className="h-4 w-4" />
                <span>Админ-панель</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-edu-navy">
              CMS UC
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
    </header>
  )
}
