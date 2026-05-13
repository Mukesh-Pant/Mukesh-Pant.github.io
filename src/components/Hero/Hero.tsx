'use client'
import { useEffect, useRef } from 'react'
import { profile } from '@/data/profile'
import styles from './Hero.module.css'

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const roles = [...profile.roles]
    let ri = 0, ci = 0, del = false
    let timer: ReturnType<typeof setTimeout>

    function type() {
      const el = typedRef.current
      if (!el) return
      const cur = roles[ri]
      if (!del) {
        el.textContent = cur.slice(0, ++ci)
        if (ci === cur.length) { del = true; timer = setTimeout(type, 1800); return }
      } else {
        el.textContent = cur.slice(0, --ci)
        if (ci === 0) { del = false; ri = (ri + 1) % roles.length }
      }
      timer = setTimeout(type, del ? 45 : 90)
    }

    timer = setTimeout(type, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.left}>
          <div className={styles.hi}>HI! I&apos;M</div>
          <div className={styles.name}>MUKESH PANT.</div>
          <div className={styles.role}>
            <span className={styles.bar}>|</span>
            <span ref={typedRef}>{profile.roles[0]}</span>
            <span className={styles.cursor} aria-hidden="true" />
          </div>
          <div className={styles.spec}>Specialized In</div>
          <p className={styles.bio}>{profile.bio}</p>
          <div className={styles.ctas}>
            <a href={profile.resumeUrl} className="btn-dl" download>↓ Download Resume</a>
          </div>
        </div>
        <div className={styles.photoWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.photoUrl} alt="Mukesh Pant — DevOps & Cloud Engineer" />
        </div>
      </div>
      <div className={styles.scrollRow}>
        <a href="#about" className={styles.scrollBtn} aria-label="Scroll to about section">↓</a>
      </div>
    </section>
  )
}
