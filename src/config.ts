/**
 * Cross-cutting links to Fornax surfaces that live outside this repo.
 *
 * These are placeholders until the corresponding surfaces are live:
 * - fornax-docs (FORNX-45) is being built in parallel and is not deployed yet.
 * - The SaaS app (fornax-cloud, FORNX-42) has no public sign-in yet.
 *
 * ADR 0002 ("Repository, CI, and environment-isolation conventions") mandates
 * one site per product with docs served at `/docs` on the same host — never a
 * separate `docs.*` subdomain. FORNX-43's canonical hostname list has not yet
 * been reconciled with that ADR (see FORNX-44 comment thread). Until that is
 * resolved, this is the single place that needs to change.
 */
export const DOCS_URL = 'https://fornax.horo.run/docs'
export const GITHUB_URL = 'https://github.com/horonomy/fornax-core'
export const APP_URL = 'https://app.fornax.horo.run'

/** Whether the linked surfaces above are actually live yet. */
export const DOCS_LIVE = false
export const APP_LIVE = false
