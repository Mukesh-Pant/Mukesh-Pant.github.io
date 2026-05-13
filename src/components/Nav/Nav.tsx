'use client'
import { useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { label: 'Portfolio', href: '#hero' },
  { label: 'About',     href: '#about' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Skills',    href: '#skills' },
  { label: 'Connect',   href: '#connect' },
]

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="4.5"/>
    <line x1="12" y1="2" x2="12" y2="4"/>
    <line x1="12" y1="20" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/>
    <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="4" y2="12"/>
    <line x1="20" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/>
    <line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>
  </svg>
)

export default function Nav() {
  const { theme, toggle } = useTheme()
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            linkRefs.current.forEach((l) => l?.classList.remove(styles.active))
            const active = linkRefs.current.find(
              (l) => l?.getAttribute('href') === `#${entry.target.id}`
            )
            active?.classList.add(styles.active)
          }
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={styles.nav}>
      <a href="#hero" className={styles.brand}>
        <span className={styles.logoBox}>M</span>ukesh
      </a>
      <ul className={styles.links}>
        {NAV_LINKS.map((link, i) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={styles.link}
              ref={(el) => { linkRefs.current[i] = el }}
            >
              {link.label.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.right}>
        <button className={styles.themeBtn} onClick={toggle} aria-label="Toggle theme">
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  )
}
