'use client'

import { useState, useEffect } from 'react'
import { Edit, Settings } from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'

export default function AdminIndicator() {
  const { isAdmin } = useAdminAuth()

  if (!isAdmin) return null

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2 text-sm">
        <Edit className="h-4 w-4" />
        <span>Режим редактирования активен</span>
      </div>
    </div>
  )
}
