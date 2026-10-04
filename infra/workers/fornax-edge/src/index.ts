// fornax-edge (HORO-572) — the only job of this Worker is a hard redirect
// off the legacy public hostname to the canonical one, per the domain
// convention landed in ADR-0006/HORO-566.
//
// Found during HORO-572's own live ground-truth sweep: fornax.horo.run was
// still serving the exact same live build as fornax.horonom.com (byte-
// identical HTML, confirmed via diff), including the same marketing GA4
// Measurement ID (G-YD29L01E89) — a real duplicate-canonical / latent
// duplicate-collection risk, not a documented exception. FORNX-328 moved
// canonical status to fornax.horonom.com but the old host was left as a
// live alias rather than a redirect. This closes that gap the same way
// ophiuchus-edge (HORO-579) closed the equivalent gap for Ophiuchus.
//
// fornax.horo.run has no runtime surface of its own — both hosts have only
// ever served the same static marketing site — so this stays a bare
// redirect, the same reasoning ophiuchus-edge documents for not adopting
// horologium-edge's proxy machinery.
//
// Attached via a zone-level Workers Route rather than a Cloudflare Redirect
// Rule / Bulk Redirect / Page Rule: per HORO-579's own direct API testing,
// neither CLOUDFLARE_DNS_API_TOKEN nor CLOUDFLARE_PAGES_API_TOKEN has the
// Rulesets or Bulk Redirects (account Lists) permission required for those.
// The Pages-scoped token already has Workers Scripts + Workers Routes access
// on this zone — the same permission ophiuchus-edge/horologium-edge's routes
// were created with — so this reuses an already-authorized mechanism instead
// of requesting broader scope.

const CANONICAL_HOST = 'fornax.horonom.com';

function baselineSecurityHeaders(): Headers {
  const headers = new Headers();
  headers.set('Strict-Transport-Security', 'max-age=15768000');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return headers;
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    // Path and query string are carried over verbatim; only the scheme+host
    // change. No exception for /.well-known/ — this hostname is not (and
    // after this change, cannot be) an ACME HTTP-01 validation target: it is
    // no longer a Pages custom domain, so there is no cert renewal on this
    // host to protect from being swallowed by the redirect.
    const target = `https://${CANONICAL_HOST}${url.pathname}${url.search}`;
    const headers = baselineSecurityHeaders();
    headers.set('Location', target);
    return new Response(null, { status: 301, headers });
  },
};
