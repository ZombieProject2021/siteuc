'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AccessibilityContextType {
  isAccessibilityMode: boolean
  fontSize: 'normal' | 'large' | 'extra-large'
  contrast: 'normal' | 'high'
  toggleAccessibility: () => void
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void
  setContrast: (contrast: 'normal' | 'high') => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [isAccessibilityMode, setIsAccessibilityMode] = useState(false)
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('normal')
  const [contrast, setContrast] = useState<'normal' | 'high'>('normal')

  useEffect(() => {
    // Load saved preferences from localStorage only on client side
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('accessibility-mode')
      const savedFontSize = localStorage.getItem('accessibility-font-size')
      const savedContrast = localStorage.getItem('accessibility-contrast')

      if (savedMode === 'true') {
        setIsAccessibilityMode(true)
      }
      if (savedFontSize) {
        setFontSize(savedFontSize as 'normal' | 'large' | 'extra-large')
      }
      if (savedContrast) {
        setContrast(savedContrast as 'normal' | 'high')
      }
    }
  }, [])

  useEffect(() => {
    // Apply accessibility classes to body only on client side
    if (typeof window === 'undefined') return

    const body = document.body
    
    if (isAccessibilityMode) {
      body.classList.add('accessible-colors')
    } else {
      body.classList.remove('accessible-colors')
    }

    // Apply font size classes
    body.classList.remove('large-text', 'extra-large-text')
    if (fontSize === 'large') {
      body.classList.add('large-text')
    } else if (fontSize === 'extra-large') {
      body.classList.add('extra-large-text')
    }

    // Apply contrast classes
    if (contrast === 'high') {
      body.classList.add('high-contrast')
    } else {
      body.classList.remove('high-contrast')
    }

    // Save preferences to localStorage
    localStorage.setItem('accessibility-mode', isAccessibilityMode.toString())
    localStorage.setItem('accessibility-font-size', fontSize)
    localStorage.setItem('accessibility-contrast', contrast)
  }, [isAccessibilityMode, fontSize, contrast])

  const toggleAccessibility = () => {
    setIsAccessibilityMode(!isAccessibilityMode)
  }

  const value = {
    isAccessibilityMode,
    fontSize,
    contrast,
    toggleAccessibility,
    setFontSize,
    setContrast,
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
