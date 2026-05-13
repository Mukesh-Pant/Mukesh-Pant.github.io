'use client'
import { useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { profile } from '@/data/profile'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { label: 'Portfolio', href: '#hero' },
  { label: 'About',     href: '#about' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Skills',    href: '#skills' },
  { label: 'Connect',   href: '#connect' },
]

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
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <a href={profile.resumeUrl} className={styles.resumeBtn} download>
          ↓ Resume
        </a>
      </div>
    </nav>
  )
}
