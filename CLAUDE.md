# CLAUDE.md

## Project
Next.js 14 App Router portfolio for Mukesh Pant, deployed to GitHub Pages at https://mukesh-pant.github.io.

## Stack
- Framework: Next.js 14, App Router, TypeScript, CSS Modules
- Fonts: Libre Baskerville (serif) + Courier Prime (mono) via next/font/google
- Dark mode: ThemeProvider in src/context/ThemeContext.tsx (localStorage + data-theme on html)
- Contact form: Formspree endpoint https://formspree.io/f/mvzlyqnj
- Deployment: GitHub Actions → gh-pages branch → GitHub Pages

## Key conventions
- One CSS Module per component
- All content lives in src/data/*.ts — never hardcode in JSX
- The Portfolio/ directory is gitignored (design assets only)
- Static export: next.config.mjs sets output: 'export' and images.unoptimized: true

## Commands
- npm run dev    — local dev server
- npm run build  — static export to out/
- npm test       — Jest + RTL tests
- npm run test:ci — CI-safe test run (no watch mode)
