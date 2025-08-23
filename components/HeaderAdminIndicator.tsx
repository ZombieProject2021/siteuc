'use client'

import { useState, useEffect } from 'react'
import { Edit } from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'

export default function HeaderAdminIndicator() {
  const { isAdmin } = useAdminAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isAdmin) return null

  return (
    <div className="flex items-center space-x-1 text-green-400">
      <Edit className="h-3 w-3" />
      <span className="hidden sm:inline text-xs">Редактирование</span>
    </div>
  )
}
