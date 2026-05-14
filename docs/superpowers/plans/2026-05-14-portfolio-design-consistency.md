# Portfolio Design Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply consistent press-down hover animation, rounded corners, Devicon tool icons, black-filled GitHub buttons, and unified Connect subtitle colours across the entire portfolio.

**Architecture:** CSS-only animation reversal (translate direction flip + shadow compression) applied identically to every card component; new `toolIcons.ts` data file provides a name→URL map consumed by `ProjectCard`; minimal JSX changes in `Connect` to remove per-card colour classes.

**Tech Stack:** Next.js 14 App Router, TypeScript, CSS Modules, Devicon CDN

---

### Task 1: Create `toolIcons.ts` — tool name → Devicon URL map

**Files:**
- Create: `src/data/toolIcons.ts`

- [ ] **Step 1: Create the file with all mappings**

```ts
const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const AWS = `${BASE}/amazonwebservices/amazonwebservices-plain-wordmark.svg`

export const toolIcons: Record<string, string> = {
  Python:           `${BASE}/python/python-original.svg`,
  FastAPI:          `${BASE}/fastapi/fastapi-original.svg`,
  PostgreSQL:       `${BASE}/postgresql/postgresql-original.svg`,
  pgvector:         `${BASE}/postgresql/postgresql-original.svg`,
  MongoDB:          `${BASE}/mongodb/mongodb-original.svg`,
  Docker:           `${BASE}/docker/docker-original.svg`,
  'GitHub Actions': `${BASE}/github/github-original.svg`,
  Terraform:        `${BASE}/terraform/terraform-original.svg`,
  'Next.js':        `${BASE}/nextjs/nextjs-original.svg`,
  'Gemini 2.5':     `${BASE}/google/google-original.svg`,
  Boto3:            AWS,
  Lambda:           AWS,
  DynamoDB:         AWS,
  'API Gateway':    AWS,
  STS:              AWS,
  Cognito:          AWS,
  CloudFormation:   AWS,
  VPC:              AWS,
  'ECS Fargate':    AWS,
  SNS:              AWS,
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/toolIcons.ts
git commit -m "feat: add toolIcons map for Devicon CDN URLs"
```

---

### Task 2: Update `ProjectCard.tsx` — render Devicon icons in tools row

**Files:**
- Modify: `src/components/Projects/ProjectCard.tsx`

- [ ] **Step 1: Replace tools rendering with icon-first logic**

Replace the entire file content with:

```tsx
import { Project } from '@/data/projects'
import { toolIcons } from '@/data/toolIcons'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project, variant = 'default' }: { project: Project; variant?: 'default' | 'accent' }) {
  const cardClass = variant === 'accent' ? styles.cardAccent : styles.card
  return (
    <div className={`${cardClass} reveal`}>
      <div className={styles.label}>{project.label}</div>
      <div className={styles.title}>{project.title}</div>
      <div className={styles.overviewLabel}>Overview:</div>
      <p className={styles.desc}>{project.description}</p>
      <div className={styles.tools}>
        <div className={styles.toolsLabel}>Tools:</div>
        <div className={styles.pills}>
          {project.tools.map((t) => {
            const iconUrl = toolIcons[t]
            return iconUrl ? (
              <span key={t} className={styles.iconPill} title={t}>
                <img src={iconUrl} alt={t} width={24} height={24} />
              </span>
            ) : (
              <span key={t} className={styles.pill}>{t}</span>
            )
          })}
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

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects/ProjectCard.tsx
git commit -m "feat: render Devicon icons in ProjectCard tools row"
```

---

### Task 3: Update `ProjectCard.module.css` — press-down hover + black GitHub button + icon pill style

**Files:**
- Modify: `src/components/Projects/ProjectCard.module.css`

- [ ] **Step 1: Replace the entire file**

```css
.card {
  border: 2px solid var(--acc); padding: 1.8rem;
  border-radius: 6px;
  transition: all 0.2s; position: relative;
  background: var(--bg);
}
.card::after {
  content: ''; position: absolute;
  bottom: -8px; right: -8px; width: 100%; height: 100%;
  border: 2px solid var(--acc); border-radius: 6px;
  z-index: -1; transition: all 0.2s;
}
.card:hover {
  background: var(--acc);
  transform: translate(4px, 4px);
}
.card:hover::after {
  bottom: -1px; right: -1px;
  border-color: rgba(255, 255, 255, 0.25);
}
.card:hover .label,
.card:hover .overviewLabel,
.card:hover .title,
.card:hover .desc,
.card:hover .toolsLabel { color: rgba(255, 255, 255, 0.9); }
.card:hover .pill { color: rgba(255, 255, 255, 0.85); border-color: rgba(255, 255, 255, 0.3); }
.card:hover .btnGh { background: #000; color: #fff; border-color: #000; }
.card:hover .btnGh:hover { background: #fff; color: #000; border-color: #fff; }

/* Accent (even-position) card — solid magenta filled */
.cardAccent {
  border: 2px solid var(--acc); padding: 1.8rem;
  border-radius: 6px;
  transition: all 0.2s; position: relative;
  background: var(--acc);
}
.cardAccent::after {
  content: ''; position: absolute;
  bottom: -8px; right: -8px; width: 100%; height: 100%;
  border: 2px solid var(--acc); border-radius: 6px;
  background: rgba(0,0,0,0.15);
  z-index: -1; transition: all 0.2s;
}
.cardAccent:hover {
  transform: translate(4px, 4px);
  filter: brightness(1.08);
}
.cardAccent:hover::after {
  bottom: -1px; right: -1px;
}
.cardAccent .label,
.cardAccent .overviewLabel,
.cardAccent .title,
.cardAccent .desc,
.cardAccent .toolsLabel { color: rgba(255, 255, 255, 0.9); }
.cardAccent .pill { color: rgba(255, 255, 255, 0.85); border-color: rgba(255, 255, 255, 0.3); }
.cardAccent .btnGh { border-color: #fff; color: #fff; }
.cardAccent .btnGh:hover { background: #fff; color: var(--acc); }

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
.pills { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.pill { font-family: var(--mono); font-size: 11px; padding: 3px 8px; border: 1px solid var(--brd); color: var(--t2); border-radius: 3px; }
.iconPill {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 36px;
  border: 1px solid var(--brd); border-radius: 4px;
  background: var(--bg2);
  transition: border-color 0.15s;
}
.iconPill img { display: block; }
.card:hover .iconPill { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.08); }
.cardAccent .iconPill { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.08); }
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

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects/ProjectCard.module.css
git commit -m "feat: press-down hover, black GitHub button, icon pill styles in ProjectCard"
```

---

### Task 4: Update `Skills.module.css` — press-down hover

**Files:**
- Modify: `src/components/Skills/Skills.module.css`

- [ ] **Step 1: Change hover translate direction and compress shadow**

Replace `.iconBox:hover` and `.iconBox:hover::after`:

```css
.iconBox:hover {
  background: var(--acc);
  transform: translate(3px, 3px);
}
.iconBox:hover::after {
  bottom: -1px; right: -1px;
  border-color: rgba(255, 255, 255, 0.25);
}
```

Full file after change:

```css
.wrap { padding: 2.5rem; }
.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
}
.iconBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  background: var(--bg);
  border: 2px solid var(--acc);
  border-radius: 6px;
  position: relative;
  transition: all 0.2s;
  cursor: default;
}
.iconBox::after {
  content: '';
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 100%;
  height: 100%;
  border: 2px solid var(--acc);
  border-radius: 6px;
  z-index: -1;
  transition: all 0.2s;
}
.iconBox img {
  width: 52px;
  height: 52px;
  object-fit: contain;
}
.iconBox:hover {
  background: var(--acc);
  transform: translate(3px, 3px);
}
.iconBox:hover::after {
  bottom: -1px; right: -1px;
  border-color: rgba(255, 255, 255, 0.25);
}
@media (max-width: 860px) {
  .wrap { padding: 1.5rem; }
  .grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 480px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Skills/Skills.module.css
git commit -m "feat: press-down hover on Skills icon cards"
```

---

### Task 5: Update `Certs.module.css` — press-down hover

**Files:**
- Modify: `src/components/Certs/Certs.module.css`

- [ ] **Step 1: Replace hover rules**

Full file after change:

```css
.wrap { padding: 0 2.5rem 3rem; }

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin-top: 2rem;
}

.card {
  border: 2px solid var(--acc);
  background: var(--bg);
  padding: 2rem 1.5rem;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  transition: all 0.2s;
}

.card::after {
  content: '';
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 100%;
  height: 100%;
  border: 2px solid var(--acc);
  border-radius: 6px;
  z-index: -1;
  transition: all 0.2s;
}

.card:hover {
  background: var(--acc);
  transform: translate(3px, 3px);
}

.card:hover::after {
  bottom: -1px; right: -1px;
  border-color: rgba(255, 255, 255, 0.25);
}

.badge {
  width: 80px;
  height: 80px;
  object-fit: contain;
  transition: filter 0.2s;
}

.card:hover .badge {
  filter: drop-shadow(0 0 6px rgba(255,255,255,0.5));
}

.name {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--t1);
  transition: color 0.2s;
}

.card:hover .name { color: #fff; }

.meta {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--t3);
  transition: color 0.2s;
}

.card:hover .meta { color: rgba(255, 255, 255, 0.8); }

@media (max-width: 860px) {
  .wrap { padding-left: 1.5rem; padding-right: 1.5rem; }
}

@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Certs/Certs.module.css
git commit -m "feat: press-down hover on Certs cards"
```

---

### Task 6: Update `Connect.module.css` and `Connect.tsx` — press-down hover + all subtitles black

**Files:**
- Modify: `src/components/Connect/Connect.module.css`
- Modify: `src/components/Connect/Connect.tsx`

- [ ] **Step 1: Replace `Connect.module.css`**

```css
.wrap { padding: 2.5rem; }

.center { text-align: center; margin-bottom: 2rem; }

.statusBadge {
  display: inline-block;
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 6px 16px;
  border: 1.5px solid var(--t1);
  color: var(--t1);
  border-radius: 4px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}

.card {
  border: 2px solid var(--acc);
  background: var(--bg);
  padding: 2.5rem 1rem;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  position: relative;
  transition: all 0.2s;
}

.card::after {
  content: '';
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 100%;
  height: 100%;
  border: 2px solid var(--acc);
  border-radius: 6px;
  z-index: -1;
  transition: all 0.2s;
}

.card:hover {
  background: var(--acc);
  transform: translate(4px, 4px);
}

.card:hover::after {
  bottom: -1px; right: -1px;
  border-color: rgba(255, 255, 255, 0.25);
}

.ico { color: var(--t1); transition: color 0.2s; }
.card:hover .ico { color: #fff; }

.nm {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--t1);
  transition: color 0.2s;
}
.card:hover .nm { color: #fff; }

.sub {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--t1);
  transition: color 0.2s;
}
.card:hover .sub { color: #fff; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (max-width: 860px) {
  .wrap { padding: 1.5rem; }
  .grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Update `Connect.tsx` — remove per-card subClass**

Replace the `CARDS` array and JSX (remove all `subClass` usage):

```tsx
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { profile } from '@/data/profile'
import styles from './Connect.module.css'

const GitHubIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const EmailIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const CARDS = [
  { href: profile.github,            icon: <GitHubIcon />,   label: 'GitHub',   sub: 'Check My Repos' },
  { href: profile.linkedin,          icon: <LinkedInIcon />, label: 'LinkedIn', sub: "Let's Connect"   },
  { href: `mailto:${profile.email}`, icon: <EmailIcon />,    label: 'Email',    sub: 'Say Hello'       },
]

export default function Connect() {
  return (
    <section id="connect">
      <SectionHeader title="Let's Connect" centered />
      <div className={styles.wrap}>
        <div className={`${styles.center} reveal`}>
          <div className={styles.statusBadge}>■ STATUS: ACTIVE</div>
        </div>
        <div className={`${styles.grid} reveal`}>
          {CARDS.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={styles.card}
            >
              <span className={styles.ico}>{card.icon}</span>
              <div className={styles.nm}>{card.label}</div>
              <div className={styles.sub}>{card.sub}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Connect/Connect.module.css src/components/Connect/Connect.tsx
git commit -m "feat: press-down hover and unified black subtitles in Connect"
```

---

### Task 7: Update `ContactForm.module.css` — press-down hover + border-radius on panels

**Files:**
- Modify: `src/components/ContactForm/ContactForm.module.css`

- [ ] **Step 1: Replace the entire file**

```css
.wrap { display: grid; grid-template-columns: 1fr 1.6fr; gap: 1.5rem; padding: 0 2.5rem 3rem; align-items: start; }

.left {
  border: 2px solid var(--acc);
  padding: 1.8rem;
  background: var(--bg);
  border-radius: 6px;
  position: relative;
  transition: all 0.2s;
}

.left::after {
  content: '';
  position: absolute;
  bottom: -7px;
  right: -7px;
  width: 100%;
  height: 100%;
  border: 2px solid var(--acc);
  border-radius: 6px;
  z-index: -1;
  transition: all 0.2s;
}

.left:hover { transform: translate(3px, 3px); }
.left:hover::after { bottom: -1px; right: -1px; }

.leftTitle { font-family: var(--serif); font-size: 1.2rem; font-weight: 700; color: var(--acc); margin-bottom: 1.2rem; }

.touchRows { display: flex; flex-direction: column; gap: 0.9rem; margin-bottom: 1.2rem; }
.touchRow { display: flex; align-items: flex-start; gap: 0.8rem; }
.touchIco { width: 34px; height: 34px; border: 1.5px solid var(--acc); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; color: var(--acc); }
.touchKey { font-family: var(--mono); font-size: 9.5px; font-weight: 700; letter-spacing: 0.1em; color: var(--t3); margin-bottom: 2px; }
.touchVal { font-family: var(--mono); font-size: 12.5px; color: var(--t1); line-height: 1.5; }
.touchVal a { color: var(--acc); text-decoration: none; }
.touchVal a:hover { text-decoration: underline; }

.divider { height: 1px; background: var(--brd); margin: 1rem 0; }
.flowLabel { font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--t2); margin-bottom: 0.6rem; }
.flowSteps { list-style: none; display: flex; flex-direction: column; gap: 5px; }
.flowSteps li { font-family: var(--mono); font-size: 12px; color: var(--t2); padding-left: 1.3em; position: relative; }
.flowSteps li::before { content: '▸'; position: absolute; left: 0; color: var(--acc); }

.right {
  border: 2px solid var(--acc);
  padding: 1.8rem;
  background: var(--bg);
  border-radius: 6px;
  position: relative;
  transition: all 0.2s;
}

.right::after {
  content: '';
  position: absolute;
  bottom: -7px;
  right: -7px;
  width: 100%;
  height: 100%;
  border: 2px solid var(--acc);
  border-radius: 6px;
  z-index: -1;
  transition: all 0.2s;
}

.right:hover { transform: translate(3px, 3px); }
.right:hover::after { bottom: -1px; right: -1px; }

.rightTitle { font-family: var(--serif); font-size: 1.15rem; font-weight: 700; color: var(--t1); margin-bottom: 0.3rem; }
.rightSub { font-family: var(--mono); font-size: 12.5px; color: var(--t3); margin-bottom: 1.2rem; }

.form { display: flex; flex-direction: column; gap: 0.9rem; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; }
.group { display: flex; flex-direction: column; gap: 4px; }
.full { grid-column: 1 / -1; }
.label { font-family: var(--mono); font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--t2); }
.req { color: var(--acc); }
.input { padding: 9px 12px; border: 2px solid var(--brd); font-family: var(--mono); font-size: 12.5px; color: var(--t1); background: var(--bg2); outline: none; transition: border-color 0.2s; width: 100%; }
.input:focus { border-color: var(--acc); }
.ta { resize: vertical; min-height: 96px; }
.checks { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; margin-top: 3px; }
.chk { display: flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 12px; color: var(--t2); cursor: pointer; }
.chk input { accent-color: var(--acc); width: 13px; height: 13px; }
.submit { width: 100%; justify-content: center; margin-top: 0.3rem; }
.banner { margin-top: 0.5rem; padding: 10px 14px; border: 2px solid var(--acc); font-family: var(--mono); font-size: 12.5px; color: var(--acc); background: rgba(125,29,95,0.06); }
.bannerError { border-color: #c0392b; color: #c0392b; background: rgba(192,57,43,0.06); }

@media (max-width: 860px) {
  .wrap { grid-template-columns: 1fr; padding-left: 1.5rem; padding-right: 1.5rem; }
  .row { grid-template-columns: 1fr; }
  .checks { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactForm/ContactForm.module.css
git commit -m "feat: press-down hover and border-radius on ContactForm panels"
```

---

### Task 8: Verify build passes

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: `Export successful` with no TypeScript or CSS errors.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No errors.

- [ ] **Step 3: Run tests**

```bash
npm run test:ci
```

Expected: 8 tests pass across 2 suites.
