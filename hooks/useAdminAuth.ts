import { useState, useEffect } from 'react'

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdminAuth()
  }, [])

  const checkAdminAuth = () => {
    try {
      // Проверяем localStorage на наличие админского токена
      const adminToken = localStorage.getItem('admin-auth')
      const isAuthenticated = adminToken === 'authenticated'
      
      setIsAdmin(isAuthenticated)
    } catch (error) {
      setIsAdmin(false)
    } finally {
      setLoading(false)
    }
  }

  return { isAdmin, loading, checkAdminAuth }
}
