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
 * - `fornax.horo.run` — the fornax-cloud SaaS frontend. Not moved; live
 *   (FORNX-241, founder-approved architecture decision 2026-09-19).
 *
 * `DOCS_LIVE`/`APP_LIVE` below gate every CTA that points at these URLs so
 * the site never claims a surface is reachable before it actually is.
 */
export const DOCS_URL = 'https://docs.fornax.horonom.com'
export const GITHUB_URL = 'https://github.com/horonomy/fornax-core'
export const APP_URL = 'https://fornax.horo.run'

/**
 * Whether the linked surfaces above are actually live yet.
 *
 * DOCS_LIVE flipped true (FORNX-336): docs.fornax.horonom.com has been
 * live and real-browser-verified since FORNX-329/FORNX-330 (both Done).
 * APP_LIVE flipped true (FORNX-241, 2026-09-19): fornax.horo.run is live
 * and real-browser-verified against real Beta data; sign-in today is the
 * documented break-glass device-credential path (SSO/FORNX-111 still
 * pending a live Keycloak instance), a real, working, if not yet polished,
 * public entry point — not a stub.
 */
export const DOCS_LIVE = true
export const APP_LIVE = true

/**
 * The Fornax release this site advertises in the hero badge ("Early / vX").
 *
 * Single source for every version string the site shows. It must equal the
 * latest *published* GitHub release of horonomy/fornax-core (the "Latest"
 * release, which excludes pre-releases) and must never name an unreleased
 * candidate. Bump it in the same change that publishes a release; the drift
 * gate (`npm run check:version`, scripts/check-version-drift.mjs) fails when
 * it disagrees with GitHub, and a daily job (`--live`) fails when the deployed
 * site disagrees with it.
 */
export const LATEST_RELEASE = 'v0.0.7'

