'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/field-notes', label: 'writing' },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 py-6 px-6 md:px-10 bg-bg/80 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        {/* Name */}
        <Link
          href="/"
          className="highlight-sweep font-medium"
        >
          shawn wei
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')

            return (
              <Link
                key={href}
                href={href}
                className={`text-[0.9375rem] transition-colors duration-150 ${
                  isActive
                    ? 'text-text'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="hidden md:inline-flex items-center gap-1 text-text-subtle text-xs px-2 py-1 border border-border rounded">
            <span>ctrl</span>
            <span>+</span>
            <span>K</span>
          </span>
        </div>
      </div>
    </nav>
  )
}
