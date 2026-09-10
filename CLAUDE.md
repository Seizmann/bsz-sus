# CLAUDE.md

Guidance for Claude Code working in this repository.

## Project
Single-page, animated, football-fantasy themed countdown web app with a custom animated 404 page. Full spec in `REQUIREMENT.md`, design tokens in `DESIGN.md`, copy voice in `HUMANIZER.md`, image asset list in `docs/image-prompt.md`.

## Stack
React 18 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · pnpm workspaces. Deploy target: Vercel.

## Commands
```bash
pnpm install            # install all workspace deps
pnpm --filter web dev   # run dev server
pnpm --filter web build # production build
pnpm --filter web lint  # lint
```

## Architecture
- `apps/web` is the only application package in the monorepo.
- No backend/API layer — fully static.
- `src/pages/Home.tsx` — the countdown experience.
- `src/pages/NotFound.tsx` — custom animated 404.
- `src/hooks/useCountdown.ts` — countdown target `2026-09-11T17:00:00+06:00`; must resolve correctly independent of visitor timezone.
- `src/components/Background` — handles the full-bleed, art-directed background images per breakpoint (filenames per `docs/image-prompt.md`).

## Code style
- TypeScript strict mode, no `any`.
- Tailwind v4 CSS-first config (`@import "tailwindcss"` in `src/styles/index.css`), no `tailwind.config.js` unless a JS-level override is unavoidable.
- Framer Motion for all transitions/animation — no other animation library.
- Keep design tokens from `DESIGN.md` as the single source of truth; don't hardcode colors/spacing that diverge from it.

## Before finishing a task
- Verify mobile/tablet/desktop layout matches `DESIGN.md` breakpoints.
- Verify `prefers-reduced-motion` fallback works.
- Verify no console errors on build.
