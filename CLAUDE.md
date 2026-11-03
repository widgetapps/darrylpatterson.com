# darrylpatterson.com

Personal site of Darryl Patterson: a builder with 35 years of design and
engineering who uses AI to make useful things. Four pages: Home `/`, On AI
`/ai`, About `/about` (with the past work at the bottom), Contact `/contact`.

The requirements (IDs like SITE-1, HERO-4) live in the Requirements doc; the
why, the roadmap and the decisions log live in the Product Spec. Commits name
the requirement IDs they serve. See AGENTS.md for the directory and layer map.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict (TECH-1)
- Tailwind CSS 4; the theme maps one to one to `src/styles/tokens.css`, the only
  file with raw colour values (TECH-2, DSN-10)
- Content in JSON under `content/`, parsed with zod in `src/lib/content.ts` (TECH-3)
- Static pages; one route handler, `/api/weather`, for the living hero (TECH-5)
- pnpm, Node 22 (`.nvmrc`), ESLint 9, Vitest 5, Playwright 1.64 with axe (TECH-9, QA)
- Hosted on Vercel; Google Analytics through `@next/third-parties` when
  `NEXT_PUBLIC_GOOGLE_ANALYTICS` is set (TECH-11)

## Commands

```
pnpm dev            # local dev server
pnpm verify         # typecheck, lint, lint:tokens, unit tests (QA-5)
pnpm test:e2e       # builds, starts on :3100, runs Playwright + axe (QA-2)
pnpm build          # production build
pnpm photos         # re-export photos under public/me and public/photos (MIG-1)
pnpm screenshots    # fresh screenshots of the two apps into public/apps (CNT-2)
```

While `pnpm dev` runs, `/hero-gallery` shows all 64 states of the living
hero (seasons, conditions, day and night). It is a 404 in production.

`pnpm verify` and `pnpm test:e2e` pass before a task is reported done or
anything merges to `main` (QA-5).

## Conventions

- Server components by default. `"use client"` only for the hero's weather
  repaint, the nav's current-page marker and the company list filter (TECH-1).
- No raw colours outside `tokens.css`; use the Tailwind utilities
  (`bg-surface`, `text-ink-muted`, `text-h2`) or `var(--dp-*)` in SVG.
- Copy lives in `content/*.json`, never in components. Sentence case, no
  exclamation marks (the schema rejects them), no hype, no usage numbers for
  the apps (DSN-9, CNT-7).
- Real photos and screenshots only, each with alt text. No AI imagery (CNT-13).
- Every link, button and nav item is at least 44px tall (A11Y-4). Links in
  running text are underlined (A11Y-9). Focus rings are never removed (A11Y-2).
- One h1 per page, a logical heading order, landmarks with labels (A11Y-3).
- Theme follows the system setting; there is no toggle and nothing is stored (DSN-3).
- Motion is minimal and stops under `prefers-reduced-motion` (DSN-7).

## The living hero

`LivingHero` (server) draws the current season under a clear sky; the client
half asks `/api/weather` once and repaints. The route reads Vercel's
`x-vercel-ip-latitude` and `x-vercel-ip-longitude` headers, picks the nearest
Environment Canada city page inside the Algoma District (Sault Ste. Marie for
everyone else), caches each station for ten minutes and stores nothing about
the visitor (HERO-4 to HERO-7). Season boundaries match Algoma Live (HERO-3).
