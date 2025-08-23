import { useState, useEffect } from 'react'

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    checkAdminAuth()
  }, [])

  const checkAdminAuth = () => {
    try {
      // Проверяем localStorage только на клиенте
      if (typeof window !== 'undefined') {
        const adminToken = localStorage.getItem('admin-auth')
        const isAuthenticated = adminToken === 'authenticated'
        setIsAdmin(isAuthenticated)
      }
    } catch (error) {
      setIsAdmin(false)
    } finally {
      setLoading(false)
    }
  }

  // Возвращаем false для админских функций до монтирования компонента
  return {
    isAdmin: mounted ? isAdmin : false,
    loading: mounted ? loading : true,
    checkAdminAuth
  }
}
