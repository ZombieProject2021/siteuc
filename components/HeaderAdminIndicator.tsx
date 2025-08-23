'use client'

import { Edit } from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import NoSSR from './NoSSR'

export default function HeaderAdminIndicator() {
  // Temporarily disabled to fix hydration issues
  return null

  // const { isAdmin } = useAdminAuth()

  // if (!isAdmin) return null

  // return (
  //   <NoSSR>
  //     <div className="flex items-center space-x-1 text-green-400">
  //       <Edit className="h-3 w-3" />
  //       <span className="hidden sm:inline text-xs">Редактирование</span>
  //     </div>
  //   </NoSSR>
  // )
}
