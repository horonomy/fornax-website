/**
 * Cross-cutting links to Fornax surfaces that live outside this repo.
 *
 * Canonical hostnames per FORNX-43 ("Fornax Cloudflare product-domain
 * topology") and FORNX-154's own Beta-surface scope: `fornax.horo.run`
 * (this site), `docs.fornax.horo.run` (fornax-docs), `app.fornax.horo.run`
 * (the fornax-cloud SaaS frontend). This supersedes the single-domain
 * `fornax.horo.run/docs` pattern fornax-core's ADR 0002 originally recorded
 * — that ADR flags itself as not yet reconciled with FORNX-43, and the
 * reconciliation/amendment is fornax-core's to make, not this repo's.
 *
 * These are placeholders until the corresponding surfaces are live:
 * - fornax-docs (FORNX-45) is built but not deployed yet.
 * - The SaaS app (fornax-cloud, FORNX-42) has no public sign-in yet.
 * - DNS/routing for all three hostnames (FORNX-43, Cloudflare) is not live —
 *   confirmed via `dig`, no records exist yet as of 2026-08-30.
 *
 * `DOCS_LIVE`/`APP_LIVE` below gate every CTA that points at these URLs so
 * the site never claims a surface is reachable before FORNX-43/FORNX-47
 * actually flip it on.
 */
export const DOCS_URL = 'https://docs.fornax.horo.run'
export const GITHUB_URL = 'https://github.com/horonomy/fornax-core'
export const APP_URL = 'https://app.fornax.horo.run'

/** Whether the linked surfaces above are actually live yet. */
export const DOCS_LIVE = false
export const APP_LIVE = false
