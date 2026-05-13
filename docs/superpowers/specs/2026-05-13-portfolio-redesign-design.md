# Portfolio Redesign — Design Spec
**Date:** 2026-05-13  
**Approach:** Full redesign with data restructuring (Approach B)  
**Goal:** Pixel-close clone of the reference design (Ridoy Dey portfolio) applied to Mukesh Pant's content.

---

## 1. Typography

**File:** `src/app/layout.tsx`

| Current | Replace with |
|---|---|
| `Libre_Baskerville` (weight 700, normal + italic) | `EB_Garamond` (weight 700, normal only) |
| `Courier_Prime` (weights 400 + 700) | `Space_Mono` (weights 400 + 700) |

CSS variables `--font-serif` / `--font-mono` are unchanged — all components inherit automatically.

---

## 2. Navbar

**Files:** `src/components/Nav/Nav.tsx`, `src/components/Nav/Nav.module.css`

### Structural changes
- **Remove** the Resume `<a>` element and `.resumeBtn` CSS rule entirely.
- The `.right` div keeps only the theme toggle button.

### Dark mode toggle icon
Replace emoji characters `🌙` / `☀️` with inline SVG icons:
- **Light mode button** (click to go dark): solid crescent moon SVG, black fill
- **Dark mode button** (click to go light): sun/star SVG, current fill

SVGs sized to ~18px, centered in the existing 34×34px `.themeBtn` box.

### Active nav link border
- Change `.link` default border from `1.5px solid transparent` to `2px solid transparent`
- Active/hover rule stays `border-color: var(--acc); color: var(--acc)` — now renders as a solid 2px box

---

## 3. Hero Section

**Files:** `src/components/Hero/Hero.tsx`, `src/components/Hero/Hero.module.css`

### CTA row
- Remove `<a href="#connect" className="btn-ghost">Let's Connect ✉</a>` from `.ctas`
- Keep only the "↓ Download Resume" button

### Scroll arrow positioning
Move `scrollBtn` out of `.left` div. New DOM structure:

```
<section.hero>                ← flex-column
  <div.heroContent>           ← grid (1fr 400px) — contains .left + .photoWrap
  <div.scrollRow>             ← full-width row, flex, justify-content: center
    <a.scrollBtn>↓</a>
```

CSS: `.hero { display: flex; flex-direction: column; }` — `.heroContent` takes `flex: 1` and holds the existing grid layout.

### Photo frame
- Add `display: inline-block` to `.photoWrap` so `::after` shadow box is sized to the image, not the grid column.
- Keep existing border + offset shadow values (`3px solid var(--acc)`, offset `bottom: -12px; right: -12px`).

---

## 4. Section Headers

**File:** `src/components/SectionHeader/SectionHeader.module.css`, `SectionHeader.tsx`

- Remove `font-style: italic` from `.heading`
- Add optional `centered?: boolean` prop to `SectionHeader`
  - When true: `text-align: center` on `.heading`, rule remains full-width

---

## 5. Projects Cards

**Files:** `src/data/projects.ts`, `src/components/Projects/ProjectCard.tsx`, `ProjectCard.module.css`

### Data changes
- Remove `filled: boolean` from the `Project` interface
- Remove `filled: false / true` from all 4 project entries

### CSS changes
- Remove `.filled`, `.filled .label`, `.filled .title`, `.filled .desc`, `.filled .overviewLabel`, `.filled .toolsLabel`, `.filled .pill`, `.filled .btnGh`, `.filled .btnGh:hover`
- Add full hover-to-accent state:

```css
.card:hover {
  background: var(--acc);
  transform: translate(-4px, -4px);
}
.card:hover .label,
.card:hover .overviewLabel,
.card:hover .title,
.card:hover .desc,
.card:hover .toolsLabel { color: rgba(255,255,255,0.9); }
.card:hover .pill { color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.3); }
.card:hover::after { border-color: rgba(255,255,255,0.4); bottom: -12px; right: -12px; }
.card:hover .btnGh { border-color: #fff; color: #fff; }
.card:hover .btnGh:hover { background: #fff; color: var(--acc); }
```

### Component changes
- Remove `project.filled ? styles.filled : ''` from className

---

## 6. Skills Section — Full Rebuild

**Files:** `src/data/skills.ts`, `src/components/Skills/Skills.tsx`, `Skills.module.css`

### Data model
```typescript
export interface Skill {
  name: string
  iconUrl: string
}
```

### Skill list (12 items, 2 rows × 6)
| Name | Devicon URL slug |
|---|---|
| AWS | amazonwebservices/amazonwebservices-original-wordmark.svg |
| Terraform | terraform/terraform-original.svg |
| Docker | docker/docker-original.svg |
| Kubernetes | kubernetes/kubernetes-original.svg |
| Ansible | ansible/ansible-original.svg |
| GitHub Actions | github/github-original.svg |
| Jenkins | jenkins/jenkins-original.svg |
| Python | python/python-original.svg |
| Linux | linux/linux-original.svg |
| Git | git/git-original.svg |
| Prometheus | prometheus/prometheus-original.svg |
| Grafana | grafana/grafana-original.svg |

Base CDN: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/`

### Component layout
6-column CSS grid. Each `.iconBox`:
- `display: flex; flex-direction: column; align-items: center; padding: 1.5rem 1rem`
- `background: var(--bg); border: 2px solid var(--acc)`
- `::after` offset shadow: `bottom: -6px; right: -6px; border: 2px solid var(--acc)`
- `<img>` 48×48px, `object-fit: contain`
- `<span>` below: mono, uppercase, 11px, `color: var(--t2)`
- **Hover**: `background: var(--acc); transform: translate(-3px,-3px)`; `img { filter: brightness(0) invert(1) }`; `span { color: #fff }`

---

## 7. Connect Section

**Files:** `src/components/Connect/Connect.tsx`, `Connect.module.css`  
**Page:** Remove `<ContactForm />` import and JSX from `src/app/page.tsx`

### Section header
Pass `centered` prop: `<SectionHeader title="Let's Connect" centered />`

### Status badge
- Replace current pill: `■ STATUS: ACTIVE` (square bullet `■`, not a dot)
- Style: white/bg bg, `border: 1.5px solid var(--t1)`, mono text, small padding, centered

### Social cards (3 cards)
Remove Phone card. Keep and update:

| Card | Icon | Label | Subtitle | Subtitle color |
|---|---|---|---|---|
| GitHub | GitHub SVG | GITHUB | CHECK MY REPOS | `#6cc644` |
| LinkedIn | LinkedIn SVG | LINKEDIN | LET'S CONNECT | `#0077B5` |
| Email | Envelope SVG | EMAIL | SAY HELLO | `var(--acc)` |

Card default style (matches project/skill cards):
- `background: var(--bg); border: 2px solid var(--acc)`
- `::after` offset shadow: `bottom: -8px; right: -8px`
- Hover: `background: var(--acc)`, icon `filter: brightness(0) invert(1)`, name + subtitle → `color: #fff`

### Remove ContactForm
- Remove `import ContactForm` and `<ContactForm />` from `page.tsx`
- `ContactForm` component files can remain (not deleted) but are unused

---

## 8. Certs Section — Badge Card Rebuild

**Files:** `src/data/certs.ts`, `src/components/Certs/Certs.tsx`, `Certs.module.css`

### Data model
```typescript
export interface Cert {
  name: string
  issuer: string
  date: string
  badgeUrl: string   // Credly CDN image URL for the badge PNG
  verifyUrl: string  // Credly public badge URL — card links here
}
```

### Cert entries
| Cert | Badge image URL | Verify URL |
|---|---|---|
| AWS Security — Specialty (SCS-C03) | `https://images.credly.com/size/340x340/images/53acdae5-d69f-4dda-b650-d02ed7a50dd7/image.png` | https://www.credly.com/badges/fe40cb52-c521-4d82-8562-e8d521ece68a/public_url |
| AWS Cloud Practitioner (CLF-C02) | `https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png` | *(no verify URL — link disabled)* |

### Component layout
2-column grid (one row, matching the 2 certs). Each card is an `<a>` pointing to `verifyUrl` (opens in new tab):
- White bg, 2px accent border, offset shadow (`bottom: -6px; right: -6px`)
- Badge `<img>` centered, 80×80px (larger than skills icons to show badge detail)
- Cert name below: mono, bold, 13px, uppercase
- Issuer + date row: mono, small, `color: var(--t3)`
- **Hover**: accent bg, `filter: brightness(0) invert(1)` on badge image, name → white, issuer/date → white
- Cards without a verifyUrl render as `<div>` instead of `<a>` (no pointer/hover link behaviour — still shows hover accent for visual consistency)

---

## 9. Footer

**File:** `src/components/Footer/Footer.tsx`

Update copyright text to: `© 2026 Mukesh Pant. All rights reserved.`  
Style: centered, mono font, small size — matching reference footer.

---

## File Change Summary

| File | Change type |
|---|---|
| `src/app/layout.tsx` | Font swap (EB Garamond + Space Mono) |
| `src/components/Nav/Nav.tsx` | Remove resume btn, SVG theme icons |
| `src/components/Nav/Nav.module.css` | Remove .resumeBtn, fix border width |
| `src/components/Hero/Hero.tsx` | Remove CTA btn, restructure scroll arrow |
| `src/components/Hero/Hero.module.css` | photoWrap inline-block, new scrollRow |
| `src/components/SectionHeader/SectionHeader.tsx` | Add centered prop |
| `src/components/SectionHeader/SectionHeader.module.css` | Remove italic, add centered variant |
| `src/data/projects.ts` | Remove filled field |
| `src/components/Projects/ProjectCard.tsx` | Remove filled className |
| `src/components/Projects/ProjectCard.module.css` | Remove filled CSS, add hover-accent |
| `src/data/skills.ts` | Full rewrite — flat icon list |
| `src/components/Skills/Skills.tsx` | Full rewrite — icon grid |
| `src/components/Skills/Skills.module.css` | Full rewrite — icon box styles |
| `src/components/Connect/Connect.tsx` | 3-card layout, centered header, STATUS badge |
| `src/components/Connect/Connect.module.css` | Updated card + hover styles |
| `src/app/page.tsx` | Remove ContactForm import + JSX |
| `src/data/certs.ts` | Add badgeUrl, issuer fields; remove emoji icon |
| `src/components/Certs/Certs.tsx` | Badge card grid — `<a>` links to Credly |
| `src/components/Certs/Certs.module.css` | Badge card + hover-accent styles |
| `src/components/Footer/Footer.tsx` | Copyright text update |
