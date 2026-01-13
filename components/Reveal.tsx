'use client'

import { useEffect, useRef, type ReactNode } from 'react'

// =============================================================================
// Types
// =============================================================================

interface RevealProps {
  children: ReactNode
  className?: string
  stagger?: boolean
}

// =============================================================================
// Component
// =============================================================================

/**
 * Animates children into view when they enter the viewport.
 * Uses IntersectionObserver for efficient scroll-triggered animations.
 */
export function Reveal({ children, className = '', stagger = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const baseClass = stagger ? 'reveal-stagger' : 'reveal'

  return (
    <div ref={ref} className={`${baseClass} ${className}`}>
      {children}
    </div>
  )
}
