'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/about', label: 'about' },
  { href: '/experiences', label: 'experiences' },
  { href: '/field-notes', label: 'fieldnotes' },
  { href: '/adventures', label: 'my philosophy' },
  { href: '/photos', label: 'photos' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-48 shrink-0 pt-16 pl-8">
        <nav className="sticky top-16">
          <ul className="space-y-5">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/')

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-[0.9375rem] transition-colors duration-150 ${
                      isActive
                        ? 'text-text'
                        : 'text-text-muted hover:text-text'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-bg/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-text text-[15px] font-medium">
            shawn wei
          </Link>
          <button
            className="text-text-muted hover:text-text text-[14px] transition-colors duration-150"
            aria-label="Open menu"
          >
            menu
          </button>
        </div>
      </div>
    </>
  )
}
