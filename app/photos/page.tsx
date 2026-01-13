import Link from 'next/link'

export default function Photos() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <div className="text-6xl mb-6">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-text-muted">
            <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 6V8l-7 6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
            <path d="M17 18h1"/>
            <path d="M12 18h1"/>
            <path d="M7 18h1"/>
          </svg>
        </div>
        <h1 className="text-2xl font-medium mb-3">coming soon</h1>
        <p className="text-text-muted mb-8">this page is under construction.</p>
        <Link href="/" className="text-text-muted hover:text-text transition-colors text-sm">
          &larr; back home
        </Link>
      </div>
    </div>
  )
}
