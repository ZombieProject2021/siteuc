import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AccessibilityProvider } from '@/components/AccessibilityProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'CMS UC - Система управления контентом для учебных центров',
  description: 'Профессиональная CMS для образовательных организаций с соблюдением требований РФ',
  keywords: 'CMS, учебный центр, образование, РФ, дополнительное образование',
  authors: [{ name: 'CMS UC Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'CMS UC - Система для учебных центров',
    description: 'Соответствие всем требованиям законодательства РФ для образовательных организаций',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AccessibilityProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AccessibilityProvider>
      </body>
    </html>
  )
}
