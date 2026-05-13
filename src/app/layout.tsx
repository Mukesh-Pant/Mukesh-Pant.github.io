// src/app/layout.tsx
import type { Metadata } from 'next'
import { EB_Garamond, Space_Mono } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'
import { profile } from '@/data/profile'
import './globals.css'

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Mukesh Pant — DevOps & Cloud Engineer',
  description: profile.description,
  openGraph: {
    title: 'Mukesh Pant — DevOps & Cloud Engineer',
    description: profile.description,
    url: profile.siteUrl,
    siteName: 'Mukesh Pant',
    images: [{ url: `${profile.siteUrl}/profile.png`, width: 1024, height: 1024, alt: 'Mukesh Pant' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mukesh Pant — DevOps & Cloud Engineer',
    description: profile.description,
    images: [`${profile.siteUrl}/profile.png`],
  },
  icons: { icon: '/favicon.ico' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  url: profile.siteUrl,
  email: profile.email,
  telephone: profile.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kathmandu',
    addressCountry: 'NP',
  },
  sameAs: [profile.github, profile.linkedin],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${garamond.variable} ${spaceMono.variable}`}
    >
      <head>
        {/* Prevent flash of wrong theme before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
