/**
 * Cross-cutting links to Fornax surfaces that live outside this repo.
 *
 * Canonical hostnames per FORNX-328 ("Fornax domain migration to the
 * Horonomy company constitution"), superseding FORNX-43/FORNX-154's earlier
 * `horo.run`-only convention: human-facing public surfaces — this site and
 * docs — now live on `horonom.com`; runtime/API/ingest boundaries (the
 * fornax-cloud SaaS frontend and its API/ingest endpoints) stay on
 * `horo.run` by design, not moved for cosmetic consistency.
 *
 * - `fornax.horonom.com` — this site.
 * - `docs.fornax.horonom.com` — fornax-docs. Live.
 * - `app.fornax.horo.run` — the fornax-cloud SaaS frontend. Not moved; no
 *   public sign-in yet (FORNX-42).
 *
 * `DOCS_LIVE`/`APP_LIVE` below gate every CTA that points at these URLs so
 * the site never claims a surface is reachable before it actually is.
 */
export const DOCS_URL = 'https://docs.fornax.horonom.com'
export const GITHUB_URL = 'https://github.com/horonomy/fornax-core'
export const APP_URL = 'https://app.fornax.horo.run'

/** Whether the linked surfaces above are actually live yet. */
export const DOCS_LIVE = false
export const APP_LIVE = false
