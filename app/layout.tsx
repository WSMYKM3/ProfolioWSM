import type { Metadata } from 'next'
import { Inter, Bodoni_Moda } from 'next/font/google'
import './globals.css'
import FontLoader from './components/FontLoader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

// Bodoni 字体 - 优雅的高对比度衬线体
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'WSM_Portfolio',
  description: 'Portfolio website with masonry layout',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bodoni.variable}`}>
      <body>
        <FontLoader />
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  )
}

