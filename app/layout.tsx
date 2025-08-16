import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AccessibilityProvider } from '@/components/AccessibilityProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import FloatingConsultationButton from '@/components/FloatingConsultationButton'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'ООО Учебный Центр - Дополнительное профессио��альное образование в Москве',
  description: 'Курсы повышения квалификации и профессиональной переподготовки. Лицензированные программы, опытные преподаватели, государственные дипломы. Запишитесь на обучение!',
  keywords: 'курсы повышения квалификации, профессиональная переподготовка, дополнительное образование, обучение москва, дипломы государственного образца, курсы для специалистов',
  authors: [{ name: 'ООО Учебный Центр' }],
  robots: 'index, follow',
  openGraph: {
    title: 'ООО Учебный Центр - Профессиональные курсы в Москве',
    description: 'Получите новую специальность или повысьте квалификацию. Лицензированные программы обучения с выдачей государственны�� дипломов.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'ООО Учебный Центр',
  },
  verification: {
    yandex: 'yandex-verification-code',
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AccessibilityProvider>
          <div className="min-h-screen flex flex-col" suppressHydrationWarning={true}>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <CookieBanner />
          <FloatingConsultationButton />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AccessibilityProvider>
      </body>
    </html>
  )
}
