import { Suspense } from 'react'
import HomePageClient from './page-client'

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Загрузка...</p>
        </div>
      </div>
    }>
      <HomePageClient />
    </Suspense>
  )
}
