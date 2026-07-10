import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'
import FontLoader from './components/FontLoader'

const inter = localFont({
  variable: '--font-inter',
  display: 'swap',
  src: [
    { path: './fonts/inter-300.woff2', weight: '300', style: 'normal' },
    { path: './fonts/inter-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/inter-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/inter-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/inter-700.woff2', weight: '700', style: 'normal' },
    { path: './fonts/inter-800.woff2', weight: '800', style: 'normal' },
    { path: './fonts/inter-900.woff2', weight: '900', style: 'normal' },
  ],
})

const bodoni = localFont({
  variable: '--font-bodoni',
  display: 'swap',
  src: [
    { path: './fonts/bodoni-moda-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/bodoni-moda-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/bodoni-moda-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/bodoni-moda-700.woff2', weight: '700', style: 'normal' },
    { path: './fonts/bodoni-moda-800.woff2', weight: '800', style: 'normal' },
    { path: './fonts/bodoni-moda-900.woff2', weight: '900', style: 'normal' },
    { path: './fonts/bodoni-moda-italic-400.woff2', weight: '400', style: 'italic' },
    { path: './fonts/bodoni-moda-italic-500.woff2', weight: '500', style: 'italic' },
    { path: './fonts/bodoni-moda-italic-600.woff2', weight: '600', style: 'italic' },
    { path: './fonts/bodoni-moda-italic-700.woff2', weight: '700', style: 'italic' },
    { path: './fonts/bodoni-moda-italic-800.woff2', weight: '800', style: 'italic' },
    { path: './fonts/bodoni-moda-italic-900.woff2', weight: '900', style: 'italic' },
  ],
})

const fraunces = localFont({
  variable: '--font-fraunces',
  display: 'swap',
  src: [
    { path: './fonts/fraunces-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/fraunces-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/fraunces-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/fraunces-700.woff2', weight: '700', style: 'normal' },
    { path: './fonts/fraunces-800.woff2', weight: '800', style: 'normal' },
    { path: './fonts/fraunces-900.woff2', weight: '900', style: 'normal' },
    { path: './fonts/fraunces-italic-400.woff2', weight: '400', style: 'italic' },
    { path: './fonts/fraunces-italic-500.woff2', weight: '500', style: 'italic' },
    { path: './fonts/fraunces-italic-600.woff2', weight: '600', style: 'italic' },
    { path: './fonts/fraunces-italic-700.woff2', weight: '700', style: 'italic' },
    { path: './fonts/fraunces-italic-800.woff2', weight: '800', style: 'italic' },
    { path: './fonts/fraunces-italic-900.woff2', weight: '900', style: 'italic' },
  ],
})

const spaceGrotesk = localFont({
  variable: '--font-space-grotesk',
  display: 'swap',
  src: [
    { path: './fonts/space-grotesk-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/space-grotesk-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/space-grotesk-700.woff2', weight: '700', style: 'normal' },
  ],
})

export const metadata: Metadata = {
  title: 'Siming Wang — Creative Technologist & XR Developer',
  description: 'Portfolio of Siming Wang, Creative Technologist and XR Developer building games, XR products, and interactive installations.',
  icons: { icon: '/favicon.ico' },
}

const googleTranslateDomGuard = `
(function () {
  if (window.__googleTranslateDomGuardInstalled) return;
  window.__googleTranslateDomGuardInstalled = true;

  var originalRemoveChild = Node.prototype.removeChild;
  var originalInsertBefore = Node.prototype.insertBefore;

  Node.prototype.removeChild = function removeChild(child) {
    if (child && child.parentNode !== this) {
      return child;
    }
    return originalRemoveChild.call(this, child);
  };

  Node.prototype.insertBefore = function insertBefore(newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      return this.appendChild(newNode);
    }
    return originalInsertBefore.call(this, newNode, referenceNode);
  };
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bodoni.variable} ${fraunces.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script
          id="google-translate-dom-guard"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: googleTranslateDomGuard }}
        />
        <FontLoader />
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  )
}
