# CLAUDE.md

## Project
Next.js 14 App Router portfolio for Mukesh Pant, deployed to GitHub Pages at https://mukesh-pant.github.io.

## Stack
- Framework: Next.js 14 (v14.2), App Router, TypeScript 5, CSS Modules
- Fonts: **EB Garamond** (serif, weight 700) + **Space Mono** (mono, weights 400/700) via `next/font/google`
- CSS variables: `--font-serif`, `--font-mono`, `--acc` (accent), `--bg`, `--bg2`, `--t1`, `--t2`, `--t3`, `--brd`
- Dark mode: ThemeProvider in `src/context/ThemeContext.tsx` (localStorage + `data-theme` on `<html>`)
- Contact form: Formspree endpoint https://formspree.io/f/mvzlyqnj
- Deployment: GitHub Actions → `gh-pages` branch → GitHub Pages

## Key Conventions
- One CSS Module per component — no global class names except `.reveal` / `.vis` (intersection observer animation) and `.btn-dl` (download button)
- All content lives in `src/data/*.ts` — never hardcode copy in JSX
- The `Portfolio/` directory is gitignored (design reference assets only)
- Static export: `next.config.mjs` sets `output: 'export'` and `images.unoptimized: true`
- Use plain `<img>` tags for external CDN images (Devicon, Credly) — Next.js `<Image>` requires a server and won't work in static export with external domains
- CSS offset shadow pattern: every card uses `position: relative` + `::after { bottom: -Xpx; right: -Xpx; border: 2px solid var(--acc); z-index: -1; transition: all 0.2s }`
- Hover-accent pattern: cards go to `background: var(--acc); transform: translate(-Xpx, -Xpx)` on hover; text turns `color: #fff`

## Commands
- `npm run dev`      — local dev server (http://localhost:3000)
- `npm run build`    — static export to `out/`
- `npm test`         — Jest + RTL tests (watch mode)
- `npm run test:ci`  — CI-safe run (no watch)
- `npm run lint`     — ESLint

## Component Map

| Component | Section ID | Notes |
|---|---|---|
| `Nav` | — | Dark-mode SVG toggle (moon/sun); no resume button; 2px active border |
| `Hero` | `#hero` | Download CV button; scroll arrow centered below hero content |
| `About` | `#about` | Bio, location, status |
| `Projects` | `#projects` | 4 featured project cards; all white default, hover → accent fill |
| `Skills` | `#skills` | 6-column Devicon icon grid; 12 tools; hover → accent fill + brightness(0) invert(1) |
| `Certs` | `#certs` | 2-column Credly badge cards; card with verifyUrl = `<a>`, without = `<div>` |
| `Connect` | `#connect` | 3 social cards (GitHub, LinkedIn, Email); STATUS: ACTIVE badge; centered SectionHeader |
| `ContactForm` | `#contact` | "Inquire." section; two-panel layout (info left, form right); Formspree submit |
| `Footer` | — | Mono copyright, centered |
| `SectionHeader` | — | Shared `<h2>` + rule; accepts `centered?: boolean` prop; no italic |

## Data Files

| File | Shape |
|---|---|
| `src/data/profile.ts` | `{ name, role, roles[], bio, email, phone, github, linkedin, resumeUrl, photoUrl, formspreeEndpoint, … }` |
| `src/data/projects.ts` | `Project { id, label, title, description, tools[], liveUrl?, repoUrl }` |
| `src/data/skills.ts` | `Skill { name, iconUrl }` — Devicon CDN: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/…` |
| `src/data/certs.ts` | `Cert { name, issuer, date, badgeUrl, verifyUrl? }` — Credly CDN images |

## Tests
- `src/__tests__/ContactForm.test.tsx` — form submission states (idle → sending → success/error)
- `src/__tests__/ThemeContext.test.tsx` — theme toggle and localStorage persistence
- Run with `npm run test:ci` — 8 tests, 2 suites
