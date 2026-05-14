# Portfolio Design Consistency — Spec

**Date:** 2026-05-14  
**Status:** Approved

## Overview

Comprehensive visual consistency pass across the Mukesh Pant portfolio. Seven targeted changes to unify hover animation, corner radius, project card design, typography, and colour palette.

## 1. Press-Down Hover Animation (All Cards)

**Current:** Cards translate `(-Xpx, -Ypx)` on hover — "pops" away from shadow.  
**Change:** Cards translate `(+Xpx, +Ypx)` on hover — moves into shadow ("press down"). Shadow `::after` compresses to `bottom: -1px; right: -1px`.  
**Files:** `ProjectCard.module.css`, `Skills.module.css`, `Certs.module.css`, `Connect.module.css`, `ContactForm.module.css`

## 2. Rounded Corners Everywhere

Missing `border-radius: 6px` on:
- `ContactForm` `.left` panel + its `::after`
- `ContactForm` `.right` panel + its `::after`

All other cards already have `border-radius: 6px`.

## 3. Project Card Tools → Devicon Icons

Create `src/data/toolIcons.ts` mapping tool name → Devicon CDN URL (`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/…`).

Mappings:
- Python → `python/python-original.svg`
- FastAPI → `fastapi/fastapi-original.svg`
- PostgreSQL / pgvector → `postgresql/postgresql-original.svg`
- MongoDB → `mongodb/mongodb-original.svg`
- Docker → `docker/docker-original.svg`
- GitHub Actions → `github/github-original.svg`
- Terraform → `terraform/terraform-original.svg`
- Next.js → `nextjs/nextjs-original.svg`
- Gemini 2.5 → `google/google-original.svg`
- AWS services (Boto3, Lambda, DynamoDB, API Gateway, STS, Cognito, CloudFormation, VPC, ECS Fargate, SNS) → `amazonwebservices/amazonwebservices-plain-wordmark.svg`
- Unmapped tools (ESP32, Cohere) → text chip fallback

`ProjectCard.tsx` renders a flex row of `<img>` tags at 28×28px. Tools without an icon get a styled text chip.

## 4. Project Card Hover State

- Default: white bg, black-bordered outlined buttons
- Hover: magenta bg, white text, "View on GitHub" button → `background: #000; color: #fff; border-color: #000`
- "Live ↗" button same treatment on hover

## 5. Connect Card Subtitles → All Black

Remove `.subGithub` (green #6cc644), `.subLinkedin` (blue #0077B5), `.subEmail` (magenta).  
Single `.sub` class: `color: var(--t1)`.

## 6. Typography Audit

No changes needed — all heading/body/button font assignments are already correct:
- Section headings: `var(--serif)` EB Garamond ✅
- Body/labels/buttons: `var(--mono)` Space Mono ✅
- Footer: `var(--mono)` Space Mono ✅

## 7. ContactForm Border-Radius

Add `border-radius: 6px` to `.left`, `.right`, `.left::after`, `.right::after`.

## Files Changed

| File | Change |
|---|---|
| `src/data/toolIcons.ts` | New — tool name → icon URL map |
| `src/components/Projects/ProjectCard.tsx` | Render Devicon icons in tools row |
| `src/components/Projects/ProjectCard.module.css` | Press-down hover; btnGh black fill on hover |
| `src/components/Skills/Skills.module.css` | Press-down hover |
| `src/components/Certs/Certs.module.css` | Press-down hover |
| `src/components/Connect/Connect.module.css` | Press-down hover; remove sub colour classes |
| `src/components/Connect/Connect.tsx` | Remove per-card subClass |
| `src/components/ContactForm/ContactForm.module.css` | Press-down hover; add border-radius |
