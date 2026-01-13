import type { Metadata } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { DreamyBackground } from '@/components/DreamyBackground'
import './globals.css'

// =============================================================================
// Fonts
// =============================================================================

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
})

// =============================================================================
// Metadata
// =============================================================================

export const metadata: Metadata = {
  title: 'Shawn Wei',
  description: 'Personal website',
}

// =============================================================================
// Layout Component
// =============================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme on initial load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored !== 'light') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${sourceSerif.variable} antialiased min-h-screen`}
      >
        <ThemeProvider>
          <DreamyBackground />
          <main className="pt-4 relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
