'use client'

import { useEffect } from 'react'
import { MoonIcon, SunIcon } from './art'

// The theme follows the visitor's system setting until they press this; then their choice sticks (localStorage).
// The class on <html> is set before first paint by the script in app/layout.tsx. Both icons are always rendered
// and CSS shows the right one, so the server HTML never disagrees with the client.
const KEY = 'theme-choice'

export function ThemeToggle() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const follow = () => {
      try {
        if (localStorage.getItem(KEY)) return
      } catch {}
      document.documentElement.classList.toggle('dark', mq.matches)
    }
    mq.addEventListener('change', follow)
    return () => mq.removeEventListener('change', follow)
  }, [])

  const toggle = () => {
    const dark = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem(KEY, dark ? 'dark' : 'light')
    } catch {}
  }

  return (
    <button className="tt" type="button" onClick={toggle} aria-label="Toggle dark mode">
      <SunIcon />
      <MoonIcon />
    </button>
  )
}
