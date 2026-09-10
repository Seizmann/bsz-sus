# REQUIREMENT.md — bsz-sus

## 1. Project Overview

A single-page, heavily animated football-fantasy themed web app with one custom animated 404 page. The entire site is one dramatic "mission countdown" experience — visually inspired by SpaceX's launch-countdown pages, reskinned with football content instead of rockets.

- **Repo (remote):** `git@github.com:Seizmann/bsz-sus.git`
- **Package manager:** pnpm (workspaces / monorepo)
- **Deployment target:** Vercel
- **Animation library:** Framer Motion
- **Styling:** Tailwind CSS v4 (CSS-first config, `@import "tailwindcss"`)
- **Language:** TypeScript, strict mode

Read `DESIGN.md` for the full visual system and `HUMANIZER.md` before writing any on-page copy.

## 2. Tech Stack

- React 18 + Vite + TypeScript
- Tailwind CSS v4
- Framer Motion for all animation/transitions
- pnpm monorepo (`apps/web` as the single app package)
- No backend, no database, no API — fully static, client-side only
- Deployed as a static site on Vercel

## 3. Monorepo Structure

```
bsz-sus/
├── apps/
│   └── web/
│       ├── public/
│       │   ├── favicon.svg
│       │   └── og-image.webp
│       ├── src/
│       │   ├── assets/images/         # all webp backgrounds (see docs/image-prompt.md)
│       │   ├── components/
│       │   │   ├── Countdown/
│       │   │   ├── Hero/
│       │   │   └── Background/
│       │   ├── pages/
│       │   │   ├── Home.tsx
│       │   │   └── NotFound.tsx
│       │   ├── hooks/useCountdown.ts
│       │   ├── styles/index.css
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── index.html
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── package.json
├── docs/
│   └── image-prompt.md
├── REQUIREMENT.md
├── DESIGN.md
├── HUMANIZER.md
├── AGENT.md
├── CLAUDE.md
├── package.json
├── pnpm-workspace.yaml
└── .gitignore
```

## 4. Pages

### 4.1 Home (`/`)
Single full-viewport, full-bleed animated experience:
- Football-fantasy hero background image (see `docs/image-prompt.md`), art-directed crops per breakpoint.
- Large uppercase display headline (SpaceX mission-style, pure English, football-fantasy hype tone — see `HUMANIZER.md` for how it should read).
- Live countdown clock (days / hours / minutes / seconds) counting down to:
  - **Target:** `2026-09-11T17:00:00+06:00` (Asia/Dhaka, i.e. 11 September 2026, 5:00 PM Bangladesh time)
  - The target must be computed from this fixed ISO timestamp with UTC offset so it resolves correctly regardless of the visitor's local timezone.
- Countdown digits animate on every tick (Framer Motion — flip/slide/scale, not a static number swap).
- Single ghost-outlined pill CTA per `DESIGN.md` (e.g. a non-functional or anchor-only "MISSION STATUS" button — decorative, matches the brand language).
- Ambient background motion (slow parallax / particle drift / subtle Ken Burns on the hero image) — tasteful, not distracting.

### 4.2 Countdown Completion State
When the countdown reaches zero:
- Transition (Framer Motion) into a **blank/error "system crash" screen** — glitch/static effect, flickering, then settles into a stark near-black screen with a short glitched system-style message.
- No real data is touched — this is a purely visual/front-end illusion. No destructive action, no API calls, nothing is actually deleted.
- This state should persist (no way to "restart" the countdown from the UI once it has completed).

### 4.3 Custom 404 Page
- Same visual system as Home (dark canvas, full-bleed image, D-DIN/Inter uppercase display).
- Distinct animated treatment (not a copy-paste of the crash screen) — e.g. a "lost signal" / "off pitch" themed animation.
- Ghost pill CTA linking back to `/`.

## 5. Visual Design

Follow `DESIGN.md` exactly:
- Pure black/white palette — no accent colors.
- Full-bleed photography as the only decorative depth (no shadows, gradients, or overlays on the canvas itself — grade the photo instead).
- Uppercase D-DIN-Bold display type (fallback: Inter 700, `letter-spacing: 1.6px`, `text-transform: uppercase`, `line-height: 0.95`).
- One ghost-outlined pill CTA per screen — never a filled button on this site.
- Responsive stair-step: display type 80 → 60 → 48 → 40px across breakpoints (Wide/Desktop/Laptop/Tablet/Mobile/Small Mobile per `DESIGN.md`).

## 6. Copy / Tone

Pure English. SpaceX mission-briefing tone, reframed for football fantasy (e.g. "T-MINUS", "MISSION", "LAUNCH WINDOW", "STATUS: ARMED" style phrasing adapted to a football fantasy narrative). All copy must pass the `HUMANIZER.md` checklist before going in — it should read like it was written by a person, not generated boilerplate.

## 7. Images

All background/hero images are pre-generated externally (ChatGPT), compressed to `.webp`, and dropped into `apps/web/src/assets/images/` by the filenames specified in `docs/image-prompt.md`. The coding agent should **not** generate or source its own images — it should build the components to consume the exact filenames listed there, with `srcset`/art-direction per breakpoint where specified.

## 8. Responsiveness

Must work cleanly on mobile, tablet, and desktop — breakpoints and behavior as defined in `DESIGN.md` §Responsive Behavior. Touch targets ≥ 44px. No horizontal scroll at any breakpoint.

## 9. Performance & Quality

- Lighthouse performance/accessibility ≥ 90 on mobile.
- Images lazy-loaded except the initial hero (preload hero only).
- Reduce-motion media query respected (fall back to simple fades if `prefers-reduced-motion` is set).
- No console errors/warnings in production build.

## 10. SEO / Social

- `og-image.webp` (see `docs/image-prompt.md`) used for Open Graph + Twitter card.
- Meta title/description written per `HUMANIZER.md` tone.
- `favicon.svg` included.

## 11. Out of Scope

- No backend, no forms, no real data persistence, no analytics (unless requested later).
- No actual "delete" functionality of any kind — the crash-screen state is visual only.
