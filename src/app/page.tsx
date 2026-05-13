// src/app/page.tsx
'use client'
import { useEffect } from 'react'
import Nav from '@/components/Nav/Nav'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Projects from '@/components/Projects/Projects'
import Skills from '@/components/Skills/Skills'
import Certs from '@/components/Certs/Certs'
import Connect from '@/components/Connect/Connect'
import ContactForm from '@/components/ContactForm/ContactForm'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('vis'), i * 70)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="frame">
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Certs />
      <Connect />
      <ContactForm />
      <Footer />
    </div>
  )
}
