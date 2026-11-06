import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

/** The nav row at the top of every page. The current page's link jumps back to the top. */
export function Header({ page }: { page: 'about' | 'projects' }) {
  const link = (to: 'about' | 'projects', href: string) =>
    page === to ? (
      <a className="nav on" href="#top" aria-current="page">
        {to}
      </a>
    ) : (
      <Link className="nav" href={href}>
        {to}
      </Link>
    )
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
      <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 14 }}>
        {link('about', '/')}
        {link('projects', '/projects')}
        <a className="nav" href="/resume.pdf">
          resume
        </a>
      </nav>
      <ThemeToggle />
    </header>
  )
}
