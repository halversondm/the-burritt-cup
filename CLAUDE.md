# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A React + TypeScript site for The Burritt Cup, an annual golf weekend. It's a static content site (no backend) — pages render golf outings, players, and awards data that's fetched client-side from static JSON files.

## Commands

```bash
npm run dev            # start dev server on :3000 (vite, mode=development)
npm run test           # vitest in watch mode
npm run test:run       # vitest single run (also runs automatically as `prebuild`)
npm run test:coverage  # vitest with coverage
npx vitest run tests/Players.test.tsx   # run a single test file
npm run lint           # eslint . --ext ts,tsx --max-warnings 0
npm run prettier:check # check formatting (npm run prettier to write)
npm run build          # tsc -b && vite build (runs test:run first via prebuild)
npm run tsc            # tsc -w, typecheck only in watch mode
```

`husky` runs `npm run test:run` and `lint-staged` (eslint --fix on staged `.tsx`, prettier on staged `.js`/`.css`/`.md`) on pre-commit.

CI (`.github/workflows/main.yml`) runs on every push to non-master branches: prettier check → lint → test → build. `master.yml` runs the same pipeline on push to `master` and additionally deploys `dist/` to S3 + invalidates CloudFront.

## Architecture

- **Routing**: `src/App.tsx` owns the nav bar (with scroll-based show/hide behavior) and defines all routes via `react-router-dom`: `/` (Main), `/locations` (Locations), `/players` (Players), `/awards` (Awards).
- **Data flow**: Page components (`Locations.tsx`, `Players.tsx`, `Awards.tsx`) are the only components that fetch data. Each `useEffect`-fetches its corresponding JSON file from `public/data/{locations,players,awards}.json` at runtime (not imported at build time) and renders a list of presentational child components (`Post`, `Player`, `Award`). `Post` is shared by both Locations and Awards for cards with a title/subtitle/metatitle/photo-carousel shape.
- **Content is data, not code**: Adding/editing a golf outing, player bio, or award winner means editing the corresponding JSON file in `public/data/`, not the `.tsx` components. Images referenced from that JSON live in `public/img/full` (full-size, linked) and `public/img/thumbnails` (player headshots).
- **Styling**: Tailwind v4, configured via `@theme` in `src/index.css` (not a `tailwind.config.js`) — custom color tokens (`fairway`, `gold`, `cream`, `charcoal`, `sage`) and font tokens (`--font-serif` = Lora, `--font-sans` = Open Sans) are defined there and used as Tailwind utility classes (e.g. `text-fairway-900`, `font-serif`) throughout components.
- **Testing**: Vitest + Testing Library + `happy-dom`. `setupTests.js` wires up an MSW (`msw/node`) server that intercepts the `fetch("data/*.json")` calls page components make, so component tests run against mocked JSON rather than the real files in `public/data`. Snapshots live in `tests/__snapshots__`.
- **Env vars**: `VITE_PUBLIC_URL` differs between `.env.development` (localhost:3000) and `.env.production` (theburrittcup.com).
