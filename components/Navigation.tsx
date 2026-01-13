'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/experiences', label: 'experiences' },
  { href: '/projects', label: 'projects' },
  { href: '/adventures', label: 'adventures' },
  { href: '/photos', label: 'photos' },
  { href: '/field-notes', label: 'field notes' },
  { href: '/contact', label: 'contact' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-10 lg:px-16">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-text text-[15px] font-medium tracking-tight transition-colors duration-150 hover:text-text-muted"
        >
          shawn wei
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')

            return (
              <Link
                key={href}
                href={href}
                className={`text-[14px] tracking-wide transition-colors duration-150 ${
                  isActive
                    ? 'text-text'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                {label}
              </Link>
            )
          })}
          <ThemeToggle />
        </div>

        <MobileMenuButton />
      </div>
    </nav>
  )
}

function MobileMenuButton() {
  return (
    <button
      className="md:hidden text-text-muted hover:text-text transition-colors duration-150 text-[14px]"
      aria-label="Open menu"
    >
      menu
    </button>
  )
}
