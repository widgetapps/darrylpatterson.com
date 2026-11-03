<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Working on darrylpatterson.com

Read CLAUDE.md first for the stack, the commands and the conventions. This file
is the map.

## Directory map

```
content/            JSON content, one file per page or collection (CNT-12)
public/             static assets: me/, photos/, apps/, work/, ppl_mark.svg
scripts/            lint-tokens, photos, screenshots
src/app/            routes, metadata images, sitemap, robots, api/weather
src/components/     atoms, molecules, organisms, templates (TECH-7)
src/lib/            content loaders, season, stations, weather, scene, redirects, list filter
src/styles/         tokens.css (the only raw colours) and globals.css (the Tailwind theme)
tests/unit/         Vitest (QA-1)
tests/e2e/          Playwright with axe, desktop and phone and dark (QA-2 to QA-4)
```

## Layer map (atomic design, TECH-7)

Decide the layer before creating a file and record it here.

| Layer | Files | Rule |
| --- | --- | --- |
| atoms | `GooseMark`, `Icon`, `Button`, `Meta`, `Heading` | one element, no content knowledge |
| molecules | `AppCard`, `CaseCard`, `PullQuote`, `CtaStrip`, `PhotoStrip`, `FactGrid`, `NavLinks`, `CompanyList` | a few atoms with one job; may be client |
| organisms | `SiteHeader`, `SiteFooter`, `LivingHero` + `LivingHeroClient` + `HeroScene`, `EvidenceCards`, `OgCard` | a section of a page; may read content |
| templates | `Page` (`ContentPage`, `ProsePage`, `PageIntro`) | frames that own the `<main>` landmark |
| pages | `src/app/**/page.tsx`, `not-found.tsx`, `hero-gallery` (dev only) | compose organisms from content |

## Requirement IDs

Every commit message names the IDs it serves, for example
`Add the weather route (HERO-4, HERO-5, HERO-6)`. The IDs are in the
Requirements doc; new behaviour without an ID needs one added there first.

## Accessibility rules that the tests enforce

- axe at WCAG 2.2 AA on every route, light and dark, 1280px and 320px
- skip link first in the DOM; one h1; header, nav[aria-label], main#main, footer
- 44px targets; underlined links in prose; visible focus; no horizontal scroll at 320px
- the hero scene is `aria-hidden` and carries no text

## Keeping docs current

Change CLAUDE.md or AGENTS.md in the same commit that changes what they describe (TECH-10).
