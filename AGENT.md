# AGENT.md

Instructions for any AI coding agent working in this repo.

## Read first, in order
1. `REQUIREMENT.md` — what to build.
2. `DESIGN.md` — exact visual tokens/components. Treat every value here as load-bearing; don't invent new colors, shadows, or fonts.
3. `HUMANIZER.md` — how to write any copy that ships on the page.
4. `docs/image-prompt.md` — the exact image filenames to reference in code. Do not generate placeholder images or use stock/unsplash URLs — build against the filenames listed there and assume they will exist in `apps/web/src/assets/images/`.

## Ground rules
- This is a monorepo (pnpm workspaces). The only app package is `apps/web`.
- Stack is locked: React + Vite + TypeScript + Tailwind v4 + Framer Motion. Don't swap in another animation or styling library.
- Static site only — no backend, no API routes, no server code, no database.
- The countdown target and the "crash" end-state are the core mechanic — get the timezone math right (`2026-09-11T17:00:00+06:00`, fixed, resolved client-side regardless of visitor timezone).
- Match `DESIGN.md` tokens exactly — reference them by name in code comments where useful (e.g. `// {rounded.pill}`).
- Respect `prefers-reduced-motion`.
- Keep components small and colocated under `src/components/<Feature>/`.

## Workflow
- Work one component/page at a time; don't try to scaffold everything in one giant diff.
- After scaffolding, run the dev server and sanity-check all three breakpoints (mobile/tablet/desktop) before considering a page "done."
- Don't add dependencies beyond what's specified without flagging it first.

## Things to never do
- Never wire up any real deletion, backend call, or destructive action — the "project auto-deletes" concept is a purely visual front-end state.
- Never introduce a brand accent color, drop shadow, or gradient overlay — `DESIGN.md` is explicit that black/white/photography is the entire palette.
- Never write placeholder "Lorem ipsum" copy — use `HUMANIZER.md` voice even for draft text.
