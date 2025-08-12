'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, Phone, X } from 'lucide-react'

export default function FloatingConsultationButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <div className="relative">
          {/* Main Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600
              text-black font-semibold px-4 py-3 rounded-full shadow-lg hover:shadow-xl
              transition-all duration-300 transform hover:scale-105
              flex items-center space-x-2 min-w-[140px] justify-center
              ${isExpanded ? 'rounded-t-2xl rounded-b-none' : 'rounded-full'}
            `}
          >
            {isExpanded ? (
              <X className="h-5 w-5" />
            ) : (
              <>
                <MessageCircle className="h-5 w-5" />
                <span className="hidden sm:inline">Консультация</span>
              </>
            )}
          </button>

          {/* Expanded Menu */}
          {isExpanded && (
            <div className="absolute bottom-0 right-0 bg-white rounded-t-none rounded-b-2xl rounded-l-2xl shadow-xl border border-gray-200 min-w-[200px] overflow-hidden">
              <div className="p-4 space-y-3">
                <div className="text-sm font-semibold text-gray-800 text-center border-b pb-2">
                  Связаться с нами
                </div>
                
                <a
                  href="tel:+74951234567"
                  className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                >
                  <div className="bg-green-500 text-white p-2 rounded-full group-hover:bg-green-600 transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">Позвонить</div>
                    <div className="text-xs text-gray-600">+7 (495) 123-45-67</div>
                  </div>
                </a>

                <Link
                  href="/consultation"
                  className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                  onClick={() => setIsExpanded(false)}
                >
                  <div className="bg-blue-500 text-white p-2 rounded-full group-hover:bg-blue-600 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">Консультация</div>
                    <div className="text-xs text-gray-600">Заказать звонок</div>
                  </div>
                </Link>

                <a
                  href="mailto:info@uchebnycentr.ru"
                  className="flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                >
                  <div className="bg-purple-500 text-white p-2 rounded-full group-hover:bg-purple-600 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">Email</div>
                    <div className="text-xs text-gray-600">info@uchebnycentr.ru</div>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop to close expanded menu */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  )
}
