# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pixel-close clone of the reference design — swap fonts, clean up navbar, restructure hero, rebuild skills as icon grid, rebuild certs as badge cards, rebuild connect section, and apply hover-only accent to all project/cert cards.

**Architecture:** Each task touches one component or data file in isolation, following the existing CSS Modules + Next.js App Router pattern. No new npm packages required. Devicon icons and Credly badge images are loaded from CDN via plain `<img>` tags (consistent with the existing profile photo pattern).

**Tech Stack:** Next.js 14 App Router, TypeScript, CSS Modules, EB Garamond + Space Mono via `next/font/google`, devicon CDN (jsDelivr), Credly CDN for cert badge images.

---

## File Map

| File | Change |
|---|---|
| `src/app/layout.tsx` | Font swap: EB Garamond + Space Mono |
| `src/components/Nav/Nav.tsx` | Remove resume btn; SVG moon/sun icons |
| `src/components/Nav/Nav.module.css` | Remove `.resumeBtn`; 2px active border |
| `src/components/Hero/Hero.tsx` | Remove "Let's Connect" CTA; move scroll arrow |
| `src/components/Hero/Hero.module.css` | heroContent grid + scrollRow + photoWrap fix |
| `src/components/SectionHeader/SectionHeader.tsx` | Add `centered?` prop |
| `src/components/SectionHeader/SectionHeader.module.css` | Remove italic; add `.headingCentered` |
| `src/data/projects.ts` | Remove `filled` field |
| `src/components/Projects/ProjectCard.tsx` | Remove `filled` className |
| `src/components/Projects/ProjectCard.module.css` | Remove `.filled*`; add hover-accent |
| `src/data/skills.ts` | Full rewrite — flat `{ name, iconUrl }[]` |
| `src/components/Skills/Skills.tsx` | Full rewrite — 6-col icon grid |
| `src/components/Skills/Skills.module.css` | Full rewrite — icon box styles |
| `src/components/Connect/Connect.tsx` | 3-card layout; centered header; STATUS badge |
| `src/components/Connect/Connect.module.css` | Card + hover styles; 3-col grid |
| `src/app/page.tsx` | Remove `ContactForm` import + JSX |
| `src/data/certs.ts` | Add `badgeUrl`, `issuer`; remove emoji `icon` |
| `src/components/Certs/Certs.tsx` | Badge card grid with Credly links |
| `src/components/Certs/Certs.module.css` | Badge card + hover-accent styles |

---

## Task 1: Font Swap — EB Garamond + Space Mono

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace font imports and configuration**

Open `src/app/layout.tsx`. Replace the entire font section (lines 3–20) with:

```typescript
import { EB_Garamond, Space_Mono } from 'next/font/google'

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['700'],
  style: ['normal'],
  variable: '--font-serif',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})
```

- [ ] **Step 2: Update the `html` className**

Find the line:
```tsx
className={`${baskerville.variable} ${courier.variable}`}
```
Replace with:
```tsx
className={`${garamond.variable} ${spaceMono.variable}`}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```
Expected: no TypeScript or font errors. If `EB_Garamond` is not found, check `next/font/google` — the exact export name is `EB_Garamond` (underscore between EB and Garamond).

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: swap fonts to EB Garamond + Space Mono"
```

---

## Task 2: Navbar — Remove Resume Button + SVG Theme Icons

**Files:**
- Modify: `src/components/Nav/Nav.tsx`
- Modify: `src/components/Nav/Nav.module.css`

- [ ] **Step 1: Rewrite Nav.tsx**

Replace the entire file contents with:

```tsx
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
```

- [ ] **Step 2: Rewrite Nav.module.css**

Replace the entire file contents with:

```css
.nav {
  position: fixed; top: 0; left: 50%; transform: translateX(-50%);
  z-index: 200; width: 100%; max-width: 1160px;
  display: flex; align-items: center;
  padding: 0 2rem; height: 58px;
  background: var(--bg);
  border-bottom: 1.5px solid var(--acc);
  border-left: 2px solid var(--acc);
  border-right: 2px solid var(--acc);
  transition: background 0.3s;
}
.brand {
  display: flex; align-items: center;
  font-family: var(--serif); font-size: 1.1rem; font-weight: 700;
  color: var(--t1); text-decoration: none; margin-right: auto;
}
.logoBox {
  display: inline-flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; border: 2px solid var(--acc);
  font-weight: 700; color: var(--t1); margin-right: 2px; font-size: 1rem;
}
.links { display: flex; gap: 0.1rem; list-style: none; margin-right: 1rem; }
.link {
  font-family: var(--mono); font-size: 12px; font-weight: 700;
  color: var(--t2); text-decoration: none;
  padding: 6px 14px; letter-spacing: 0.06em; text-transform: uppercase;
  border: 2px solid transparent; transition: all 0.15s;
}
.link:hover, .active { border-color: var(--acc); color: var(--acc); }
.right { display: flex; align-items: center; }
.themeBtn {
  width: 34px; height: 34px; border: 2px solid var(--acc);
  background: transparent; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s; color: var(--t1);
}
.themeBtn:hover { background: var(--acc); color: #fff; }
@media (max-width: 860px) {
  .nav { max-width: 100vw; border-left: none; border-right: none; padding: 0 1rem; }
  .links { display: none; }
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: clean build with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav/Nav.tsx src/components/Nav/Nav.module.css
git commit -m "feat: remove resume btn from nav; replace emoji toggle with SVG icons"
```

---

## Task 3: Hero — Remove CTA, Center Scroll Arrow, Fix Photo Frame

**Files:**
- Modify: `src/components/Hero/Hero.tsx`
- Modify: `src/components/Hero/Hero.module.css`

- [ ] **Step 1: Rewrite Hero.tsx**

Replace the entire file contents with:

```tsx
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
```

- [ ] **Step 2: Rewrite Hero.module.css**

Replace the entire file contents with:

```css
.hero {
  min-height: calc(100vh - 58px);
  display: flex;
  flex-direction: column;
  border-bottom: 1.5px solid var(--acc);
}
.heroContent {
  display: grid;
  grid-template-columns: 1fr 400px;
  align-items: center;
  gap: 3rem;
  flex: 1;
  padding: 58px 2.5rem 2rem;
}
.hi, .name {
  font-family: var(--serif);
  font-size: clamp(3rem, 7vw, 6.5rem);
  font-weight: 700; line-height: 0.92;
  letter-spacing: -0.02em; color: var(--t1);
}
.hi { margin-bottom: 0.2rem; }
.name { margin-bottom: 1.2rem; }
.role {
  font-family: var(--mono); font-size: clamp(0.95rem, 1.8vw, 1.3rem);
  color: var(--t1); margin-bottom: 1.5rem;
  display: flex; align-items: center; gap: 0.3rem;
}
.bar { color: var(--acc); font-weight: 700; }
.cursor {
  display: inline-block; width: 2px; height: 1em;
  background: var(--acc);
  animation: blink 1s steps(2) infinite;
  margin-left: 1px; vertical-align: text-bottom;
}
.spec {
  font-family: var(--mono); font-size: 11.5px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--acc); margin-bottom: 0.6rem;
}
.bio {
  font-family: var(--mono); font-size: 14px;
  color: var(--t2); line-height: 1.9;
  max-width: 540px; margin-bottom: 2rem;
}
.ctas { display: flex; gap: 1rem; flex-wrap: wrap; }
.scrollRow {
  display: flex;
  justify-content: center;
  padding: 1.5rem 0 3rem;
}
.scrollBtn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 50px; height: 50px; border: 2px solid var(--acc);
  font-size: 1.2rem; color: var(--acc); text-decoration: none;
  transition: all 0.15s;
  box-shadow: 4px 4px 0 var(--acc);
}
.scrollBtn:hover { background: var(--acc); color: #fff; transform: translate(-2px, -2px); }
.photoWrap {
  position: relative;
  display: inline-block;
  align-self: center;
}
.photoWrap img {
  width: 100%; max-width: 380px; display: block;
  border: 3px solid var(--acc); position: relative; z-index: 1;
}
.photoWrap::after {
  content: ''; position: absolute;
  bottom: -12px; right: -12px;
  width: 100%; height: 100%;
  border: 3px solid var(--acc); z-index: 0;
}
@media (max-width: 860px) {
  .heroContent { grid-template-columns: 1fr; padding: 80px 1.5rem 2rem; gap: 2rem; }
  .photoWrap img { max-width: 280px; }
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero/Hero.tsx src/components/Hero/Hero.module.css
git commit -m "feat: remove Let's Connect CTA from hero; center scroll arrow; fix photo frame"
```

---

## Task 4: Section Header — Remove Italic, Add Centered Prop

**Files:**
- Modify: `src/components/SectionHeader/SectionHeader.tsx`
- Modify: `src/components/SectionHeader/SectionHeader.module.css`

- [ ] **Step 1: Rewrite SectionHeader.tsx**

Replace the entire file contents with:

```tsx
import styles from './SectionHeader.module.css'

interface Props {
  title: string
  centered?: boolean
}

export default function SectionHeader({ title, centered }: Props) {
  return (
    <div className={`${styles.secHd} reveal`}>
      <h2 className={`${styles.heading} ${centered ? styles.headingCentered : ''}`}>
        {title}
      </h2>
      <div className={styles.rule} />
    </div>
  )
}
```

- [ ] **Step 2: Rewrite SectionHeader.module.css**

Replace the entire file contents with:

```css
.secHd {
  padding: 3rem 2.5rem 0;
}
.heading {
  font-family: var(--serif);
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  font-weight: 700;
  color: var(--acc);
  line-height: 1;
  margin-bottom: 0.6rem;
}
.headingCentered {
  text-align: center;
}
.rule {
  width: 100%;
  height: 2px;
  background: var(--acc);
}
@media (max-width: 860px) {
  .secHd { padding-left: 1.5rem; padding-right: 1.5rem; }
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: clean build. All existing `<SectionHeader title="..." />` usages remain valid (centered defaults to undefined/false).

- [ ] **Step 4: Commit**

```bash
git add src/components/SectionHeader/SectionHeader.tsx src/components/SectionHeader/SectionHeader.module.css
git commit -m "feat: remove italic from section headers; add centered prop"
```

---

## Task 5: Projects — Remove Filled, Add Hover-Accent

**Files:**
- Modify: `src/data/projects.ts`
- Modify: `src/components/Projects/ProjectCard.tsx`
- Modify: `src/components/Projects/ProjectCard.module.css`

- [ ] **Step 1: Rewrite projects.ts**

Replace the entire file contents with:

```typescript
export interface Project {
  id: string
  label: string
  title: string
  description: string
  tools: string[]
  liveUrl?: string
  repoUrl: string
}

export const projects: Project[] = [
  {
    id: '01',
    label: 'Featured · Live SaaS',
    title: 'ServerControl — Multi-Account EC2 Platform',
    description:
      'Fully serverless SaaS portal for centralised EC2 control across multiple AWS accounts via STS cross-account role assumption. RBAC through Cognito user groups with DynamoDB audit trail. Eliminated idle compute waste for 3 clients — $200+/month saved via CloudWatch-triggered auto-stop.',
    tools: ['Python', 'Boto3', 'Lambda', 'DynamoDB', 'API Gateway', 'STS', 'Cognito'],
    liveUrl: 'https://app.onecloudutopia.com',
    repoUrl: 'https://github.com/Mukesh-Pant/ec2-control-center',
  },
  {
    id: '02',
    label: 'Featured · Final Year Project',
    title: 'IoT Smart Agriculture Decision Support System',
    description:
      'End-to-end pipeline from ESP32 sensor firmware → MQTT broker → FastAPI backend, feeding 4 co-located ML models served via Next.js dashboard. Containerised full stack with zero-touch GitHub Actions deployments on every merge to main.',
    tools: ['FastAPI', 'PostgreSQL', 'MongoDB', 'Docker', 'GitHub Actions', 'ESP32'],
    repoUrl: 'https://github.com/Mukesh-Pant/smart-agriculture-iot',
  },
  {
    id: '03',
    label: 'Featured · IaC Lab',
    title: 'AWS Cloud Lab — Terraform & CloudFormation',
    description:
      '9 isolated AWS workloads across 8 Terraform modules + 1 CloudFormation template. Every resource, IAM policy, and service wiring explicit from scratch. Reusable config.yaml layer keeps full runs under USD 2.',
    tools: ['Terraform', 'CloudFormation', 'VPC', 'ECS Fargate', 'Lambda', 'SNS'],
    repoUrl: 'https://github.com/Mukesh-Pant/cloud-computing-fwu-labs',
  },
  {
    id: '04',
    label: 'Featured · AI / RAG',
    title: 'NITI-SATHI — AI Legal Chatbot for Nepali Law',
    description:
      'Hybrid RAG pipeline: BM25 (0.3) + pgvector semantic search (0.7), Cohere reranking of top-20 candidates, streaming SSE with bilingual English & Nepali (Devanagari) responses. JWT auth, admin/user RBAC, PDF/DOCX ingestion UI.',
    tools: ['FastAPI', 'Next.js', 'pgvector', 'Gemini 2.5', 'Cohere', 'Docker'],
    repoUrl: 'https://github.com/Mukesh-Pant/NITI-SATHI',
  },
]
```

- [ ] **Step 2: Rewrite ProjectCard.tsx**

Replace the entire file contents with:

```tsx
import { Project } from '@/data/projects'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={`${styles.card} reveal`}>
      <div className={styles.label}>{project.label}</div>
      <div className={styles.title}>{project.title}</div>
      <div className={styles.overviewLabel}>Overview:</div>
      <p className={styles.desc}>{project.description}</p>
      <div className={styles.tools}>
        <div className={styles.toolsLabel}>Tools:</div>
        <div className={styles.pills}>
          {project.tools.map((t) => <span key={t} className={styles.pill}>{t}</span>)}
        </div>
      </div>
      <div className={styles.actions}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.btnGh}>Live ↗</a>
        )}
        <a
          href={project.repoUrl} target="_blank" rel="noopener noreferrer"
          className={styles.btnGh}
          style={project.liveUrl ? {} : { flex: 'unset', width: '100%' }}
        >
          View on GitHub ⌥
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Rewrite ProjectCard.module.css**

Replace the entire file contents with:

```css
.card {
  border: 2px solid var(--acc); padding: 1.8rem;
  transition: all 0.2s; position: relative;
  background: var(--bg);
}
.card::after {
  content: ''; position: absolute;
  bottom: -8px; right: -8px; width: 100%; height: 100%;
  border: 2px solid var(--acc); z-index: -1; transition: all 0.2s;
}
.card:hover {
  background: var(--acc);
  transform: translate(-4px, -4px);
}
.card:hover::after {
  bottom: -12px; right: -12px;
  border-color: rgba(255, 255, 255, 0.35);
}
.card:hover .label,
.card:hover .overviewLabel,
.card:hover .title,
.card:hover .desc,
.card:hover .toolsLabel { color: rgba(255, 255, 255, 0.9); }
.card:hover .pill { color: rgba(255, 255, 255, 0.85); border-color: rgba(255, 255, 255, 0.3); }
.card:hover .btnGh { border-color: #fff; color: #fff; }
.card:hover .btnGh:hover { background: #fff; color: var(--acc); }
.label {
  font-family: var(--mono); font-size: 10.5px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--acc); margin-bottom: 0.5rem;
}
.overviewLabel {
  font-family: var(--mono); font-size: 10.5px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--acc); margin-bottom: 0.2rem;
}
.title { font-family: var(--mono); font-size: 1rem; font-weight: 700; color: var(--t1); margin-bottom: 0.8rem; line-height: 1.3; }
.desc { font-family: var(--mono); font-size: 12.5px; color: var(--t2); line-height: 1.8; margin-bottom: 1.2rem; }
.tools { margin-bottom: 1.2rem; }
.toolsLabel { font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--t3); margin-bottom: 0.5rem; }
.pills { display: flex; flex-wrap: wrap; gap: 5px; }
.pill { font-family: var(--mono); font-size: 11px; padding: 3px 8px; border: 1px solid var(--brd); color: var(--t2); border-radius: 3px; }
.actions { display: flex; gap: 0.6rem; }
.btnGh {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-family: var(--mono); font-size: 12px; font-weight: 700;
  letter-spacing: 0.06em; text-transform: uppercase;
  flex: 1; padding: 10px; text-align: center; justify-content: center;
  text-decoration: none; border: 2px solid var(--t1); color: var(--t1); transition: all 0.15s;
}
.btnGh:hover { background: var(--t1); color: #fff; }
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: clean build. TypeScript will catch any remaining references to `project.filled`.

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.ts src/components/Projects/ProjectCard.tsx src/components/Projects/ProjectCard.module.css
git commit -m "feat: remove filled cards; add hover-accent to project cards"
```

---

## Task 6: Skills — Full Rebuild as Icon Grid

**Files:**
- Modify: `src/data/skills.ts`
- Modify: `src/components/Skills/Skills.tsx`
- Modify: `src/components/Skills/Skills.module.css`

- [ ] **Step 1: Rewrite skills.ts**

Replace the entire file contents with:

```typescript
export interface Skill {
  name: string
  iconUrl: string
}

const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

export const skills: Skill[] = [
  { name: 'AWS',            iconUrl: `${BASE}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
  { name: 'Terraform',      iconUrl: `${BASE}/terraform/terraform-original.svg` },
  { name: 'Docker',         iconUrl: `${BASE}/docker/docker-original.svg` },
  { name: 'Kubernetes',     iconUrl: `${BASE}/kubernetes/kubernetes-original.svg` },
  { name: 'Ansible',        iconUrl: `${BASE}/ansible/ansible-original.svg` },
  { name: 'GitHub Actions', iconUrl: `${BASE}/github/github-original.svg` },
  { name: 'Jenkins',        iconUrl: `${BASE}/jenkins/jenkins-original.svg` },
  { name: 'Python',         iconUrl: `${BASE}/python/python-original.svg` },
  { name: 'Linux',          iconUrl: `${BASE}/linux/linux-original.svg` },
  { name: 'Git',            iconUrl: `${BASE}/git/git-original.svg` },
  { name: 'Prometheus',     iconUrl: `${BASE}/prometheus/prometheus-original.svg` },
  { name: 'Grafana',        iconUrl: `${BASE}/grafana/grafana-original.svg` },
]
```

- [ ] **Step 2: Rewrite Skills.tsx**

Replace the entire file contents with:

```tsx
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { skills } from '@/data/skills'
import styles from './Skills.module.css'

export default function Skills() {
  return (
    <section id="skills">
      <SectionHeader title="Skills." />
      <div className={styles.grid}>
        {skills.map((skill) => (
          <div key={skill.name} className={`${styles.iconBox} reveal`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={skill.iconUrl} alt={skill.name} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Rewrite Skills.module.css**

Replace the entire file contents with:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.5rem;
  padding: 2rem 2.5rem 3rem;
}
.iconBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  background: var(--bg);
  border: 2px solid var(--acc);
  position: relative;
  transition: all 0.2s;
  cursor: default;
}
.iconBox::after {
  content: '';
  position: absolute;
  bottom: -6px; right: -6px;
  width: 100%; height: 100%;
  border: 2px solid var(--acc);
  z-index: -1;
  transition: all 0.2s;
}
.iconBox:hover {
  background: var(--acc);
  transform: translate(-3px, -3px);
}
.iconBox:hover::after { bottom: -9px; right: -9px; }
.iconBox:hover img { filter: brightness(0) invert(1); }
.iconBox:hover span { color: #fff; }
.iconBox img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-bottom: 0.6rem;
}
.iconBox span {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--t2);
  text-align: center;
}
@media (max-width: 860px) {
  .grid { grid-template-columns: repeat(3, 1fr); padding: 1.5rem; gap: 1rem; }
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: clean build. If devicon URLs 404 at runtime, open `npm run dev` and inspect the network tab — the correct slug can be verified at `https://devicon.dev`.

- [ ] **Step 5: Commit**

```bash
git add src/data/skills.ts src/components/Skills/Skills.tsx src/components/Skills/Skills.module.css
git commit -m "feat: rebuild skills section as devicon icon grid"
```

---

## Task 7: Connect Section — 3-Card Layout + Remove ContactForm

**Files:**
- Modify: `src/components/Connect/Connect.tsx`
- Modify: `src/components/Connect/Connect.module.css`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite Connect.tsx**

Replace the entire file contents with:

```tsx
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { profile } from '@/data/profile'
import styles from './Connect.module.css'

const GitHubIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const EmailIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

const SOCIAL_CARDS = [
  { href: profile.github,            icon: <GitHubIcon />,   label: 'GitHub',   sub: 'Check my repos',  subClass: styles.subGithub },
  { href: profile.linkedin,          icon: <LinkedInIcon />, label: 'LinkedIn', sub: "Let's connect",   subClass: styles.subLinkedin },
  { href: `mailto:${profile.email}`, icon: <EmailIcon />,    label: 'Email',    sub: 'Say hello',       subClass: styles.subEmail },
]

export default function Connect() {
  return (
    <section id="connect">
      <SectionHeader title="Let's Connect" centered />
      <div className={styles.wrap}>
        <div className={`${styles.status} reveal`}>
          <span className={styles.dot}>■</span>
          STATUS: ACTIVE
        </div>
        <div className={`${styles.grid} reveal`}>
          {SOCIAL_CARDS.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={styles.card}
            >
              <span className={styles.ico}>{card.icon}</span>
              <div className={styles.nm}>{card.label}</div>
              <div className={`${styles.sub} ${card.subClass}`}>{card.sub}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Rewrite Connect.module.css**

Replace the entire file contents with:

```css
.wrap { padding: 2rem 2.5rem 3rem; }
.status {
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  font-family: var(--mono); font-size: 11px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--t1);
  border: 1.5px solid var(--t1); padding: 7px 18px;
  width: fit-content; margin: 0 auto 2.5rem;
}
.dot { font-size: 7px; }
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.card {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 2.5rem 1.5rem;
  background: var(--bg); border: 2px solid var(--acc);
  position: relative; text-decoration: none; transition: all 0.2s;
}
.card::after {
  content: ''; position: absolute;
  bottom: -8px; right: -8px; width: 100%; height: 100%;
  border: 2px solid var(--acc); z-index: -1; transition: all 0.2s;
}
.card:hover { background: var(--acc); transform: translate(-4px, -4px); }
.card:hover::after { bottom: -12px; right: -12px; border-color: rgba(255, 255, 255, 0.3); }
.card:hover .ico { filter: brightness(0) invert(1); }
.card:hover .nm { color: #fff; }
.card:hover .sub { color: #fff; }
.ico { margin-bottom: 1rem; color: var(--t1); }
.nm {
  font-family: var(--mono); font-size: 13px; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--t1); margin-bottom: 0.3rem;
}
.sub {
  font-family: var(--mono); font-size: 11px; font-weight: 700;
  letter-spacing: 0.06em; text-transform: uppercase;
}
.subGithub  { color: #6cc644; }
.subLinkedin { color: #0077B5; }
.subEmail   { color: var(--acc); }
@media (max-width: 860px) {
  .wrap { padding-left: 1.5rem; padding-right: 1.5rem; }
  .grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Remove ContactForm from page.tsx**

Open `src/app/page.tsx`. Remove line 11 (`import ContactForm ...`) and line 40 (`<ContactForm />`). The file should look like:

```tsx
'use client'
import { useEffect } from 'react'
import Nav from '@/components/Nav/Nav'
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Projects from '@/components/Projects/Projects'
import Skills from '@/components/Skills/Skills'
import Certs from '@/components/Certs/Certs'
import Connect from '@/components/Connect/Connect'
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
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: clean build. The `ContactForm` component files remain on disk but are no longer imported.

- [ ] **Step 5: Commit**

```bash
git add src/components/Connect/Connect.tsx src/components/Connect/Connect.module.css src/app/page.tsx
git commit -m "feat: rebuild connect section with 3-card layout; remove contact form"
```

---

## Task 8: Certs — Badge Card Grid with Credly Links

**Files:**
- Modify: `src/data/certs.ts`
- Modify: `src/components/Certs/Certs.tsx`
- Modify: `src/components/Certs/Certs.module.css`

- [ ] **Step 1: Rewrite certs.ts**

Replace the entire file contents with:

```typescript
export interface Cert {
  name: string
  issuer: string
  date: string
  badgeUrl: string
  verifyUrl?: string
}

export const certs: Cert[] = [
  {
    name: 'AWS Security — Specialty (SCS-C03)',
    issuer: 'Amazon Web Services',
    date: 'Feb 2026',
    badgeUrl: 'https://images.credly.com/size/340x340/images/53acdae5-d69f-4dda-b650-d02ed7a50dd7/image.png',
    verifyUrl: 'https://www.credly.com/badges/fe40cb52-c521-4d82-8562-e8d521ece68a/public_url',
  },
  {
    name: 'AWS Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services',
    date: 'Jan 2026',
    badgeUrl: 'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
  },
]
```

- [ ] **Step 2: Rewrite Certs.tsx**

Replace the entire file contents with:

```tsx
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { certs } from '@/data/certs'
import styles from './Certs.module.css'

export default function Certs() {
  return (
    <section id="certs">
      <SectionHeader title="Certified." />
      <div className={styles.grid}>
        {certs.map((cert) =>
          cert.verifyUrl ? (
            <a
              key={cert.name}
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} reveal`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cert.badgeUrl} alt={cert.name} />
              <div className={styles.name}>{cert.name}</div>
              <div className={styles.meta}>{cert.issuer} · {cert.date}</div>
            </a>
          ) : (
            <div key={cert.name} className={`${styles.card} reveal`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cert.badgeUrl} alt={cert.name} />
              <div className={styles.name}>{cert.name}</div>
              <div className={styles.meta}>{cert.issuer} · {cert.date}</div>
            </div>
          )
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Rewrite Certs.module.css**

Replace the entire file contents with:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding: 2rem 2.5rem 3rem;
}
.card {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 2rem 1.5rem;
  background: var(--bg); border: 2px solid var(--acc);
  position: relative; text-decoration: none; transition: all 0.2s;
  cursor: pointer;
}
.card::after {
  content: ''; position: absolute;
  bottom: -6px; right: -6px; width: 100%; height: 100%;
  border: 2px solid var(--acc); z-index: -1; transition: all 0.2s;
}
.card:hover { background: var(--acc); transform: translate(-3px, -3px); }
.card:hover::after { bottom: -9px; right: -9px; border-color: rgba(255, 255, 255, 0.3); }
.card:hover img { filter: brightness(0) invert(1); }
.card:hover .name,
.card:hover .meta { color: #fff; }
.card img {
  width: 80px; height: 80px;
  object-fit: contain; margin-bottom: 1rem;
}
.name {
  font-family: var(--mono); font-size: 12px; font-weight: 700;
  letter-spacing: 0.05em; text-transform: uppercase;
  color: var(--t1); text-align: center; margin-bottom: 0.3rem;
}
.meta {
  font-family: var(--mono); font-size: 11px;
  color: var(--t3); text-align: center;
}
@media (max-width: 860px) {
  .grid { grid-template-columns: 1fr; padding: 1.5rem; }
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: clean build. If the Credly badge image for Cloud Practitioner 404s (URL may differ), replace with:  
`https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png`  
Verify in browser via `npm run dev` — look at the Certified section, both badges should render.

- [ ] **Step 5: Commit**

```bash
git add src/data/certs.ts src/components/Certs/Certs.tsx src/components/Certs/Certs.module.css
git commit -m "feat: rebuild certs section as badge cards with Credly verify links"
```

---

## Task 9: Final Verification

- [ ] **Step 1: Run full test suite**

```bash
npm run test:ci
```
Expected: all tests pass. The `ThemeContext` test exercises the theme toggle — no code changes affect it. The `ContactForm` test still runs (the component file still exists on disk).

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Expected: clean export to `out/`. No TypeScript errors, no missing modules.

- [ ] **Step 3: Start dev server and do a visual walk-through**

```bash
npm run dev
```
Open `http://localhost:3000`. Check each section:
- Nav: no resume button; moon/sun SVG toggle; active link gets border box
- Hero: one CTA button only; scroll arrow centered; photo frame with offset shadow
- About: "Let's Connect" button present (already was in About section)
- Section headers: upright (not italic), accent color
- Projects: all cards white bg; hover turns accent with white text
- Skills: 6-column icon grid; devicon images visible; hover turns accent
- Certs: 2-column badge cards; AWS Security badge visible and links to Credly
- Connect: 3 cards (GitHub, LinkedIn, Email); STATUS: ACTIVE badge; centered heading
- Footer: copyright visible

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final portfolio redesign — all sections complete"
```
