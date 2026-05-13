# Mukesh Pant Portfolio — Design Spec

**Date:** 2026-05-13  
**Design direction:** Direction B · Editorial (Ridoy-style)  
**Stack:** Next.js 14 App Router · CSS Modules · TypeScript  
**Deployment:** GitHub Pages via GitHub Actions  
**Form backend:** Formspree (`mvzlyqnj`)

---

## 1. Repository Layout

```
Mukesh-Pant.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← build → peaceiris/actions-gh-pages → gh-pages branch
├── .gitignore                  ← Portfolio/, .next/, out/, node_modules/
├── CLAUDE.md
├── next.config.ts              ← output: 'export', images: { unoptimized: true }
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← fonts, ThemeProvider, SEO metadata
│   │   ├── page.tsx            ← renders all sections in order
│   │   └── globals.css         ← CSS tokens, resets, .frame, .reveal, dark mode
│   ├── components/
│   │   ├── Nav/                ← Nav.tsx + Nav.module.css
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Projects/
│   │   ├── Skills/
│   │   ├── Certs/
│   │   ├── Connect/
│   │   ├── ContactForm/
│   │   ├── Footer/
│   │   └── SectionHeader/      ← shared serif h2 + magenta rule
│   └── data/
│       ├── profile.ts
│       ├── projects.ts
│       ├── skills.ts
│       └── certs.ts
└── public/
    ├── profile.png
    ├── Mukesh_Pant_CV.pdf
    └── favicon.ico
```

---

## 2. Design Tokens

All CSS custom properties in `globals.css`:

```css
:root {
  --bg:    #FFFFFF;
  --bg2:   #FAF8F8;
  --acc:   #7D1D5F;
  --acc2:  #A02878;
  --t1:    #0D0D0D;
  --t2:    #3D3D3D;
  --t3:    #888888;
  --brd:   #E8E8E8;
  --serif: 'Libre Baskerville', Georgia, serif;
  --mono:  'Courier Prime', 'Courier New', monospace;
  --shadow-acc: 6px 6px 0 var(--acc);
}

[data-theme="dark"] {
  --bg:    #0D0B0B;
  --bg2:   #171214;
  --t1:    #F2EDE8;
  --t2:    #A89898;
  --t3:    #665858;
  --brd:   #2A2020;
  --acc:   #C43A90;
  --acc2:  #E050A8;
}
```

Fonts loaded via `next/font/google`: Libre Baskerville (700, 700 italic) + Courier Prime (400, 700).

---

## 3. Component Responsibilities

| Component | Responsibility |
|---|---|
| `layout.tsx` | Font vars injected as CSS variables; `<html data-theme>` set by ThemeProvider; root metadata |
| `Nav` | Fixed bar, logo `[M]ukesh`, nav links, theme toggle (34×34), resume download. Active link synced to scroll via `IntersectionObserver`. |
| `Hero` | 2-col grid: left (typewriter, bio, CTAs, scroll cue) + right (photo + offset shadow `::after`). |
| `SectionHeader` | Reusable: takes `title` prop, renders serif italic `h2` + full-width `--acc` rule. |
| `About` | Body text, info pills, ghost CTA. |
| `Projects` | 2×2 grid of `ProjectCard`. `filled` prop on cards 2 & 3 (magenta bg). |
| `Skills` | 3×2 grid of skill boxes with category, name, tag pills, offset-shadow. |
| `Certs` | 2-col cert tiles with icon box, name, date, optional Credly link. |
| `Connect` | Pulsing status pill + 4-card social grid (GitHub, LinkedIn, Phone, Email). |
| `ContactForm` | 2-col: left info panel + right Formspree form. Inline success/error, no page reload. |
| `Footer` | Centered mono copyright line. |

---

## 4. Data Layer

All content is extracted from components into typed data files:

- `profile.ts` — name, role, bio, location, email, phone, GitHub, LinkedIn, status
- `projects.ts` — array of `{ id, label, title, description, tools, liveUrl?, repoUrl, filled }` (IoT Smart Agriculture and AWS Cloud Lab have `filled: true`; ServerControl and NITI-SATHI have `filled: false`)
- `skills.ts` — array of `{ category, name, tags[] }`
- `certs.ts` — array of `{ icon, name, date, verifyUrl? }`

Components receive data as props or import directly from data files. No content is hardcoded in JSX.

---

## 5. Dark Mode

`ThemeProvider` is a client component (`'use client'`) that:
1. On mount, reads `localStorage.getItem('theme')` (defaults to `'light'`)
2. Sets `document.documentElement.setAttribute('data-theme', value)`
3. Exposes a `toggle()` function via React context
4. The Nav's theme button calls `toggle()`

All color transitions handled by CSS (`transition: background 0.3s, color 0.3s` on `body`).

---

## 6. Contact Form

- Endpoint: `https://formspree.io/f/mvzlyqnj`
- Submit handler: `fetch(endpoint, { method: 'POST', body: FormData, headers: { Accept: 'application/json' } })`
- On `response.ok`: show inline success banner, reset form
- On error: show inline error message in the same banner slot
- Button shows `Sending…` while awaiting response
- No page redirect (Formspree AJAX mode, no `_next` field)

---

## 7. Animations & Accessibility

- **Typewriter**: cycles `['DevOps & Cloud Eng.', 'Platform Engineer', 'AWS Specialist', 'IaC Architect']`, 90ms type / 45ms delete / 1800ms pause
- **Scroll reveal**: `IntersectionObserver` on `.reveal` elements, `opacity 0→1` + `translateY(18px→0)`, 0.6s ease, 70ms stagger
- **Nav active**: `IntersectionObserver` on `section[id]` at threshold 0.4
- **Status dot**: `pulse` keyframe 2s infinite (opacity 1→0.3→1)
- **`prefers-reduced-motion`**: single media query in `globals.css` disables transforms and transitions

---

## 8. Responsive Breakpoint: 860px

| Element | Desktop | Mobile |
|---|---|---|
| `.frame` borders | visible | hidden |
| Nav links | visible | hidden |
| Hero | 2-col | 1-col (text above, photo below) |
| Projects | 2-col | 1-col |
| Skill boxes | 3×2 | 2×3 |
| Social cards | 4-col | 2-col |
| Contact form | 2-col | 1-col |
| Cert row | 2-col | 1-col |

---

## 9. SEO

In `layout.tsx` metadata export:

```ts
title: 'Mukesh Pant — DevOps & Cloud Engineer'
description: 'DevOps & Cloud Engineer specializing in AWS, Terraform, Kubernetes, and CI/CD.'
openGraph: {
  url: 'https://mukesh-pant.github.io',   // GitHub Pages normalizes username to lowercase
  images: [{ url: '/profile.png', width: 1024, height: 1024 }]
}
```

JSON-LD `Person` schema injected via `<script type="application/ld+json">` in layout.

---

## 10. GitHub Actions Deployment

`.github/workflows/deploy.yml`:

1. Trigger: `push` to `main`
2. Steps: `actions/checkout` → `actions/setup-node@v4` (Node 20) → `npm ci` → `npm run build`
3. Add `.nojekyll` to `out/` (prevents Jekyll processing on GitHub Pages)
4. Deploy `out/` to `gh-pages` branch via `peaceiris/actions-gh-pages@v3`
5. GitHub Pages source: `gh-pages` branch, root `/`

---

## 11. .gitignore Additions

```
Portfolio/
.next/
out/
node_modules/
.env.local
```

---

## 12. Assets

`profile.png` and `Mukesh_Pant_CV.pdf` are copied from `Portfolio/direction-b-editorial/` into `public/` as part of the initial scaffold. They are committed to the repo (not gitignored) so GitHub Pages can serve them.
