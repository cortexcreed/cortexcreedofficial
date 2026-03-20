import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils"
import Navbar from '@/components/Navbar'
import { ScrollProgress } from "@/components/magicui/scroll-progress"
import { SmoothCursor } from "@/components/magicui/smooth-cursor"

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#000000',
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Cortex Creed — Train Your Mind. Own Your Life.',
  description:
    'Dark psychology. Cognitive science. Human behaviour. A psychological content system for the ones who refuse to stay asleep. Season 1 begins May 6 2026.',
  metadataBase: new URL('https://cortexcreed.github.io/cortexcreed'),
  alternates: {
    canonical: 'https://cortexcreed.github.io/cortexcreed',
  },
  openGraph: {
    title: 'Cortex Creed — Train Your Mind. Own Your Life.',
    description:
      'Dark psychology. Cognitive science. Human behaviour. A psychological content system for the ones who refuse to stay asleep.',
    images: ['/og-image.png'],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cortex Creed — Train Your Mind. Own Your Life.',
    description: 'Dark psychology. Cognitive science. Human behaviour.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(bebasNeue.variable, inter.variable, "font-sans")}>
      <body>
        <ScrollProgress className="z-[9999]" />
        <SmoothCursor />
        {/* Navbar renders on top of everything — z-index 9000 */}
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
