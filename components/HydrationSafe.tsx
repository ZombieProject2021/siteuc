'use client'

import { ReactNode } from 'react'

interface HydrationSafeProps {
  children: ReactNode
  className?: string
  tag?: keyof JSX.IntrinsicElements
}

export default function HydrationSafe({ 
  children, 
  className = '',
  tag = 'div'
}: HydrationSafeProps) {
  const Component = tag as any

  return (
    <Component 
      className={className}
      suppressHydrationWarning={true}
    >
      {children}
    </Component>
  )
}
