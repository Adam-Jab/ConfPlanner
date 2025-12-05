Conference Sessions Planner

## Getting Started

Install and start:

```bash
npm install
npm run dev
```

Open [http://localhost:3000] with your browser to see the result.

## Running tests

```bash
npm test
```

## Tech

- Next.js 16 (App Router) + TypeScript
- styled-components (SWC transform) with ThemeProvider
- Jest + React Testing Library + jest-styled-components

## Features

- Home: SSR sessions list; client-side filters (track, time of day) + search
- Session details: server fetch + client UI; Add/Remove to agenda
- My Agenda: persisted via localStorage; conflict detection; flicker-free hydration

## Architecture decisions

- Next.js version
  - We use Next.js 16.0.7 (App Router).
  - Why 16: mature App Router with React Server Components, streaming SSR and Partial Prerendering for fast TTFB/SEO, built‑in Route Handlers for simple server APIs, SWC transform for styled-components without Babel, and improved dev/build performance (Turbopack) with a stable 2025 API surface, also just few days ago there were ciritcal issues in previous versions.
  - Impact: server-first data fetching in `app/` with small client bundles and clear client/server boundaries; simpler SSR and theming.
  - Trade-offs: RSC/App Router constraints (no browser-only APIs in server components), requires Node 18+, and tests need proper React/Next mocks.
- Data loading
  - `src/data/sessions.json` is read on the server (`getSessions`), so the initial list renders on the server for fast TTFB and SEO.
  - Filters and search run on the client for responsive UX and zero extra requests.
- Client/Server split
  - Pages under `app/` fetch on the server; interactive parts are client components.
  - Session details page: server fetch, renders `<SessionDetails />` (client).
  - Agenda uses a client context (`AgendaContext`) to persist to `localStorage`.
- Hydration handling
  - A `hydrated` flag avoids flicker on refresh (no “empty agenda” or wrong button label before localStorage loads).
- Styling
  - styled-components with Next SWC compiler; ThemeProvider at `src/app/providers.tsx`.
  - Why styled-components: co-located, component-scoped styles; SSR-friendly via SWC transform; theming with type-safe `DefaultTheme`; avoids global CSS conflicts and keeps redesigns contained to components.
- Testing
  - Jest + React Testing Library + jest-styled-components.
  - Why this stack: RTL encourages testing user-visible behavior; Jest runs quickly in-node; `jest-styled-components` asserts style rules and reduces brittle snapshots; works with Next 16 via `jest.config.mjs`.
- Filters/search strategy
  - Client-side filtering over a static JSON list.
  - Why client-side: instant feedback, no extra requests, simple code path for 20–100s of items; for very large datasets we’d move filtering/pagination server-side or to an API.
- Persistence choice
  - `localStorage` for the agenda.
  - Why localStorage: zero-backend persistence, fast and private to the device; good for demo scope. Trade-offs: not synced across devices, limited storage, not suitable for multi-user collaboration.

## Shortcuts / trade-offs

- Static JSON instead of a database; perfect for demo and fast SSR.
- Client-only filters to keep the code simple; could be moved server-side for very large lists.
- Minimal design system; a basic theme is provided to keep styling consistent.

## Improvements with more time

- Server-side filtering and pagination for large datasets
- Date/time timezone picker (user-local vs UTC)
- Better design polish and dark mode via theme
- CI for tests and lint; Lighthouse check in CI
- Expanded test suite: high-coverage unit and component tests across filters, agenda state, conflict detection, routing, and styled rendering
