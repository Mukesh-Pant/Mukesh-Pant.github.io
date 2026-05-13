<div align="center">

# Mukesh Pant — Portfolio

**DevOps & Cloud Engineer · AWS Specialist · IaC Architect**

[![Live Site](https://img.shields.io/badge/Live%20Site-mukesh--pant.github.io-7d1d5f?style=flat-square&logo=githubpages&logoColor=white)](https://mukesh-pant.github.io)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)](https://github.com/Mukesh-Pant/Mukesh-Pant.github.io/actions)

A personal portfolio built with Next.js 14 App Router and deployed as a static site to GitHub Pages.  
Designed to reflect professional identity through a clean typographic layout with a light/dark mode toggle.

</div>

---

## Overview

This portfolio presents Mukesh Pant's professional profile, featured projects, skills, certifications, and a project inquiry form — all within a fast, fully static Next.js application. There is no backend; the contact form submits to Formspree and the site deploys automatically to GitHub Pages on every push to `main`.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) · App Router · Static Export |
| Language | TypeScript 5 |
| Styling | CSS Modules (one per component) |
| Fonts | [EB Garamond](https://fonts.google.com/specimen/EB+Garamond) (serif) + [Space Mono](https://fonts.google.com/specimen/Space+Mono) (mono) via `next/font/google` |
| Dark Mode | React Context + `localStorage` + `data-theme` on `<html>` |
| Contact Form | [Formspree](https://formspree.io) |
| Testing | Jest 29 + React Testing Library 14 |
| CI / CD | GitHub Actions → `gh-pages` branch → GitHub Pages |
| Icons | [Devicon](https://devicon.dev) CDN (skills grid) · Inline SVG (nav, connect) |
| Badge Images | [Credly](https://credly.com) CDN (certifications) |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fonts, ThemeProvider, metadata
│   ├── page.tsx            # Single-page composition
│   └── globals.css         # CSS variables, resets, reveal animation
├── components/
│   ├── Nav/                # Navigation bar with dark-mode toggle
│   ├── Hero/               # Name, tagline, download CV, scroll arrow
│   ├── About/              # Bio, location, status
│   ├── Projects/           # Featured project cards (hover-accent)
│   ├── Skills/             # Devicon icon grid — 12 tools
│   ├── Certs/              # Credly badge cards — AWS certifications
│   ├── Connect/            # GitHub / LinkedIn / Email cards
│   ├── ContactForm/        # Project inquiry form (Formspree)
│   ├── SectionHeader/      # Shared heading + rule component
│   └── Footer/             # Copyright footer
├── context/
│   └── ThemeContext.tsx     # Light / dark theme management
└── data/
    ├── profile.ts          # Name, bio, links, URLs — single source of truth
    ├── projects.ts         # Featured project entries
    ├── skills.ts           # Devicon skill icons
    └── certs.ts            # Certification entries with Credly badge URLs
```

---

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm 10 or later

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/Mukesh-Pant/Mukesh-Pant.github.io.git
cd Mukesh-Pant.github.io

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server with hot reload |
| `npm run build` | Export a fully static build to the `out/` directory |
| `npm test` | Run the Jest + RTL test suite in watch mode |
| `npm run test:ci` | Run tests once (CI mode, no watch) |
| `npm run lint` | Run ESLint across the project |

---

## Deployment

Deployment is fully automated via GitHub Actions.

```
Push to main  →  Build (npm run build)  →  Export to out/  →  Publish to gh-pages branch
```

The workflow file lives at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). No manual steps are required — every merge to `main` triggers a fresh deploy within ~1 minute.

The site is served from the `gh-pages` branch by GitHub Pages at **[https://mukesh-pant.github.io](https://mukesh-pant.github.io)**.

> **Note:** The project uses `output: 'export'` in `next.config.mjs`, which generates a fully static site compatible with GitHub Pages. Server-side features (API routes, middleware, `next/image` with external domains) are not available.

---

## Content Customisation

All site content is managed through the `src/data/` directory — no JSX needs to be touched.

| File | What it controls |
|---|---|
| `src/data/profile.ts` | Name, bio, email, phone, social links, resume URL, site metadata |
| `src/data/projects.ts` | Featured project cards — title, description, tools, repo/live URLs |
| `src/data/skills.ts` | Skill icon list — name + Devicon CDN icon URL |
| `src/data/certs.ts` | Certification cards — name, issuer, date, Credly badge image + verify URL |

---

## Featured Projects

| # | Project | Stack highlights |
|---|---|---|
| 01 | **[ServerControl](https://app.onecloudutopia.com)** — Multi-Account EC2 SaaS Platform | Python · Lambda · DynamoDB · Cognito · STS |
| 02 | **IoT Smart Agriculture Decision Support System** | FastAPI · PostgreSQL · Docker · GitHub Actions · ESP32 |
| 03 | **AWS Cloud Lab** — Terraform & CloudFormation | Terraform · CloudFormation · ECS Fargate · Lambda |
| 04 | **NITI-SATHI** — AI Legal Chatbot for Nepali Law | FastAPI · Next.js · pgvector · Gemini 2.5 · Cohere |

---

## Certifications

| Certification | Issued by | Date |
|---|---|---|
| AWS Security — Specialty (SCS-C03) | Amazon Web Services | Feb 2026 |
| AWS Cloud Practitioner (CLF-C02) | Amazon Web Services | Jan 2026 |

---

## Tests

```bash
npm run test:ci
```

```
PASS  src/__tests__/ContactForm.test.tsx
PASS  src/__tests__/ThemeContext.test.tsx

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
```

Tests cover the contact form submission flow (idle → sending → success/error states) and the theme context (initial state, toggle, localStorage persistence).

---

## License

This project is open source under the [MIT License](LICENSE).  
Feel free to use it as a reference or starting point for your own portfolio — attribution appreciated but not required.

---

<div align="center">

Designed and built by **[Mukesh Pant](https://github.com/Mukesh-Pant)** · Kathmandu, Nepal

</div>
