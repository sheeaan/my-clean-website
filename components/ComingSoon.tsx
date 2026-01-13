import Link from 'next/link'
import { ConstructionIcon } from './icons'

export function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-6">
          <ConstructionIcon className="mx-auto text-text-muted" />
        </div>
        <h1 className="text-2xl font-medium mb-3">coming soon</h1>
        <p className="text-text-muted mb-8">this page is under construction.</p>
        <Link
          href="/"
          className="text-text-muted hover:text-text transition-colors text-sm"
        >
          &larr; back home
        </Link>
      </div>
    </div>
  )
}
