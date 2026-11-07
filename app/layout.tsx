import type { Metadata } from 'next'
import { DM_Mono, Inter, Reenie_Beanie, Silkscreen } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import './site.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' })
const hand = Reenie_Beanie({ variable: '--font-hand', subsets: ['latin'], weight: '400', display: 'swap' })
const pixel = Silkscreen({ variable: '--font-pixel', subsets: ['latin'], weight: '400', display: 'swap' })
const mono = DM_Mono({ variable: '--font-mono', subsets: ['latin'], weight: ['400', '500'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Shawn Wei',
  description: 'Personal website',
  icons: {
    icon: '/cattlebats.png',
  },
}

// Before first paint: dark if the visitor chose dark, or if they haven't chosen and their system is dark.
const THEME = `(function(){try{var c=localStorage.getItem('theme-choice');var d=c?c==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME }} />
      </head>
      <body className={`${inter.variable} ${hand.variable} ${pixel.variable} ${mono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
