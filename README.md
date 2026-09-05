# fornax-website

The public marketing/product site for [Fornax](https://github.com/horonomy/fornax-core)
— an evidence-first agent-integrity system for coding agents. This is **not**
the technical documentation site (that's `fornax-docs`); it's the landing
surface that explains the product, presents (placeholder) pricing, calls out
the OSS boundary, and links out to docs, GitHub, and the SaaS app.

Deploys to `fornax.horonom.com` (moved from `fornax.horo.run` per FORNX-328;
`fornax.horo.run` still aliases to the same deployment but is no longer
canonical — runtime/API surfaces stay on `horo.run` by design).

## Stack

- [Vite](https://vite.dev/) + React + TypeScript (latest stable at time of
  setup — see `package.json`/`package-lock.json` for exact pinned versions)
- [react-router-dom](https://reactrouter.com/) for client-side routing
- Plain CSS with a small set of design tokens in `src/index.css` (no CSS
  framework) — static output, no backend
- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) for linting

## Development

```bash
npm install
npm run dev        # start the dev server
npm run build       # typecheck (tsc -b) + production build to dist/
npm run lint         # oxlint
npm run preview      # preview the production build locally
```

## Content status

Fornax is at MVP maturity (v0.0.1). Pricing figures on `/pricing` are clearly
labeled provisional placeholders, not committed prices — real commercial
pricing requires owner approval. The docs (`/docs` link) and SaaS app
(sign-in) links point at surfaces that are being built in parallel and are
not live yet; see `src/config.ts` for the single place those URLs are
configured.

## Repository conventions

Part of the `horonomy` GitHub organization / Fornax product family. See
[`horonomy/fornax-core`](https://github.com/horonomy/fornax-core)'s
`docs/adr/` for the architecture and repo/CI conventions this repo follows
(PR-only merge-commit workflow to `main`, Gitmoji commits, path-filtered CI
with SHA-pinned actions).

## License

MIT — see [`LICENSE`](./LICENSE).
