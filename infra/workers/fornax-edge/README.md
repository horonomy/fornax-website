# fornax-edge

**Superseded (FORNX-241, 2026-09-19):** `fornax.horo.run` now serves the
real Fornax Beta SaaS frontend, deployed by `fornax-cloud/frontend`'s own
Worker — see that repo's `frontend/wrangler.jsonc`. This Worker's route on
that hostname was released in the same change so the new Worker could claim
it; this script stays deployed but routeless (see "Deploy" below), not
deleted, in case the redirect ever needs to come back.

Originally: a single-purpose Cloudflare Worker (HORO-572) to hard-redirect
the legacy `fornax.horo.run` hostname to the canonical `fornax.horonom.com`,
preserving path and query string, with a `301` and no proxying. The
historical rationale below still explains why a Worker (not a Redirect
Rule) was used, and why this stayed a bare redirect rather than adopting
`horologium-edge`'s proxy shape — both are now moot for this hostname but
kept for the record.

## Why this exists

HORO-572's live ground-truth sweep found `fornax.horo.run` still serving the
exact same production build as `fornax.horonom.com` (byte-identical HTML),
including the same marketing GA4 Measurement ID (`G-YD29L01E89`) — a real
duplicate-canonical / latent duplicate-collection risk left over from
FORNX-328, not a documented exception under ADR-0006 §9. This Worker closes
that gap.

## Why a Worker, not a Redirect Rule / Bulk Redirect / Page Rule

Same constraint HORO-579 already found and documented for Ophiuchus: neither
`CLOUDFLARE_DNS_API_TOKEN` nor `CLOUDFLARE_PAGES_API_TOKEN` has Zone Rulesets
or account-level Rules/Lists permission on this account. `CLOUDFLARE_PAGES_API_TOKEN`
already has Workers Scripts + Workers Routes on the `horo.run` zone — the
same permission `ophiuchus-edge`/`horologium-edge`'s routes were created
with — so this reuses an already-authorized, already-precedented mechanism
rather than requesting broader scope.

## Why not the horologium-edge pattern

`horologium-edge` proxies real app/API origins because Horologium's runtime
endpoints share the marketing hostname split. Fornax has no runtime surface
on `fornax.horo.run` — both hosts have only ever served the same static
marketing site — so there is nothing to proxy. This Worker stays a bare
redirect, same reasoning `ophiuchus-edge` documents.

## Deploy

```bash
cd infra/workers/fornax-edge
CLOUDFLARE_API_TOKEN="$CLOUDFLARE_PAGES_API_TOKEN" npx wrangler deploy
```

Not wired into CI — this Worker changes only when the redirect target itself
changes, unlike the website, which redeploys on every content change. Deploy
manually when needed, same convention as `ophiuchus-edge`/`horologium-edge`.
