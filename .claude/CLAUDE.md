# CLAUDE.md — fornax-website

Read `~/.claude/CLAUDE.md` (global baseline) first. This file overrides it
where they conflict.

## Repository identity

- Repo: `horonomy/fornax-website`. Public. The public marketing/product site
  for [Fornax](https://github.com/horonomy/fornax-core) — an evidence-first
  agent-integrity system for coding agents. Not the technical documentation
  site (that's `fornax-docs`) — this is the landing surface that explains
  the product, presents (placeholder) pricing, calls out the OSS boundary,
  and links out to docs, GitHub, and the SaaS app.
- Deploys to `fornax.horo.run`.
- Language/stack: Vite + React + TypeScript (latest stable at time of
  setup — see `package.json`/`package-lock.json` for exact pinned
  versions), `react-router-dom` for client-side routing, plain CSS with a
  small set of design tokens in `src/index.css` (no CSS framework) —
  static output, no backend. `oxlint` for linting.
- Jira: project `FORNX` (same project as `fornax-core`).

## Architecture constraints

- Static output only — no backend. Plain CSS with design tokens in
  `src/index.css`; no CSS framework.
- Pricing figures on `/pricing` are clearly labeled provisional
  placeholders, not committed prices — real commercial pricing requires
  owner approval.
- The docs (`/docs` link) and SaaS app (sign-in) links point at surfaces
  built in parallel and not live yet; `src/config.ts` is the single place
  those URLs are configured.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build` (typecheck via `tsc -b` + production build to `dist/`)
- Typecheck only: `npm run typecheck`
- Lint: `npm run lint` (oxlint)
- Preview production build: `npm run preview`

## Merge strategy

PR-only to `main`, create-a-merge-commit, Gitmoji commits, path-filtered CI
with SHA-pinned actions (see `.github/workflows/ci.yml`). Branch naming
follows the same convention as `fornax-core`:
`v<release>/FORNX-<n>/<type>/<snake_case_slug>` (e.g.
`v0.0.1/FORNX-44/feat/launch_minimal_website`).

## Source of truth

- Jira: `FORNX` project (same project as `fornax-core`).
- `README.md`'s "Repository conventions" section points at
  [`horonomy/fornax-core`](https://github.com/horonomy/fornax-core)'s
  `docs/adr/` for the architecture and repo/CI conventions this repo
  follows.
