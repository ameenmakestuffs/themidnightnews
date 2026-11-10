import type { Metadata } from 'next'
import { Newsreader, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
  adjustFontFallback: false,
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Midnight Gazette',
  description: 'A Next.js broadsheet newspaper reader for Kiroween 2026 — resurrecting the classic printed broadsheet + Google Reader RSS into a modern, fast tech & AI reader.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="paper-grain min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}