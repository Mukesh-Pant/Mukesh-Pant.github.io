'use client'
import { useState, FormEvent } from 'react'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { profile } from '@/data/profile'
import styles from './ContactForm.module.css'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(profile.formspreeEndpoint, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
        setTimeout(() => setStatus('idle'), 6000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact">
      <SectionHeader title="Inquire." />
      <div className={styles.wrap}>
        <div className={`${styles.left} reveal`}>
          <div className={styles.leftTitle}>Get In Touch</div>
          <div className={styles.touchRows}>
            {[
              { icon: '✉', label: 'EMAIL',    value: profile.email,    href: `mailto:${profile.email}` },
              { icon: '☎', label: 'PHONE',    value: profile.phone,    href: `tel:${profile.phone}` },
              { icon: '◎', label: 'LOCATION', value: 'Kathmandu, Nepal', href: null },
              { icon: '◷', label: 'RESPONSE', value: 'Within 24 hours',  href: null },
            ].map((row) => (
              <div key={row.label} className={styles.touchRow}>
                <div className={styles.touchIco}>{row.icon}</div>
                <div>
                  <div className={styles.touchKey}>{row.label}</div>
                  <div className={styles.touchVal}>
                    {row.href ? <a href={row.href}>{row.value}</a> : row.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.divider} />
          <div className={styles.flowLabel}>Typical Project Flow</div>
          <ul className={styles.flowSteps}>
            {['Discovery & Assessment','Proposal & Planning','Implementation & Testing','Review & Handover','Ongoing Support'].map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
        <div className={`${styles.right} reveal`}>
          <div className={styles.rightTitle}>Project Inquiry Form</div>
          <div className={styles.rightSub}>Tell me about your project and I&apos;ll provide a tailored response.</div>
          <form className={styles.form} onSubmit={handleSubmit} data-testid="inquiry-form">
            <div className={styles.row}>
              <div className={styles.group}>
                <label className={styles.label}>Full Name <span className={styles.req}>*</span></label>
                <input name="name" className={styles.input} type="text" placeholder="John Doe" required />
              </div>
              <div className={styles.group}>
                <label className={styles.label}>Email Address <span className={styles.req}>*</span></label>
                <input name="email" className={styles.input} type="email" placeholder="john@company.com" required />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.group}>
                <label className={styles.label}>Company</label>
                <input name="company" className={styles.input} type="text" placeholder="Acme Corp" />
              </div>
              <div className={styles.group}>
                <label className={styles.label}>Your Role</label>
                <input name="role" className={styles.input} type="text" placeholder="CTO, Engineering Manager…" />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.group}>
                <label className={styles.label}>Project Type <span className={styles.req}>*</span></label>
                <select name="projectType" className={styles.input} required defaultValue="">
                  <option value="" disabled>Select project type</option>
                  <option>Cloud Infrastructure Setup</option>
                  <option>CI/CD Pipeline</option>
                  <option>Kubernetes / Container Platform</option>
                  <option>Security Audit</option>
                  <option>IaC Migration (Terraform)</option>
                  <option>Monitoring &amp; Observability</option>
                  <option>Full DevOps Consulting</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={styles.group}>
                <label className={styles.label}>Project Urgency</label>
                <select name="urgency" className={styles.input} defaultValue="">
                  <option value="" disabled>Select urgency</option>
                  <option>ASAP (within a week)</option>
                  <option>Soon (within a month)</option>
                  <option>Standard (1–3 months)</option>
                  <option>Planning phase</option>
                </select>
              </div>
            </div>
            <div className={`${styles.group} ${styles.full}`}>
              <label className={styles.label}>Services Needed</label>
              <div className={styles.checks}>
                {['Infrastructure Design','CI/CD Setup','Security Audit','Cost Optimisation','Kubernetes / Docker','Ongoing Support'].map((svc) => (
                  <label key={svc} className={styles.chk}>
                    <input type="checkbox" name="services" value={svc} />
                    {svc}
                  </label>
                ))}
              </div>
            </div>
            <div className={`${styles.group} ${styles.full}`}>
              <label className={styles.label}>Project Description <span className={styles.req}>*</span></label>
              <textarea name="description" className={`${styles.input} ${styles.ta}`} rows={4} placeholder="Describe your infrastructure challenges, goals, and what you're looking to achieve…" required />
            </div>
            <div className={`${styles.group} ${styles.full}`}>
              <label className={styles.label}>How did you hear about me?</label>
              <input name="source" className={styles.input} type="text" placeholder="LinkedIn, GitHub, referral, blog…" />
            </div>
            <button type="submit" className={`btn-dl ${styles.submit}`} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Inquiry ↗'}
            </button>
            {status === 'success' && (
              <div className={styles.banner} role="alert">✅ Message sent! I&apos;ll respond within 24 hours.</div>
            )}
            {status === 'error' && (
              <div className={`${styles.banner} ${styles.bannerError}`} role="alert">
                ⚠️ Something went wrong. Please email me directly at {profile.email}.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
