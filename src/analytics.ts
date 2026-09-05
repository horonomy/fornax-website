/**
 * Minimal GA4 wrapper for the public marketing site (FORNX-327/FORNX-329).
 *
 * Public marketing analytics only — never wired to authenticated SaaS/
 * product telemetry, and not to be joined with it without a separate,
 * privacy-reviewed decision. No-ops entirely when VITE_GA_MEASUREMENT_ID is
 * unset, so local dev and PR preview builds behave exactly as before.
 *
 * The gtag.js script + init snippet itself is injected as static,
 * parser-inserted <script> tags at build time (see vite.config.ts), not
 * dynamically via document.createElement -- a real-browser investigation
 * (FORNX-329) found gtag.js never completed tag registration when the
 * script was inserted dynamically, while the identical Measurement ID
 * worked immediately via docs.fornax.horonom.com's static-HTML-injected
 * script (the official @docusaurus/plugin-google-gtag pattern). This
 * module only ever calls the `gtag` that snippet already defines.
 *
 * Only the fixed FunnelEvent names below may ever be sent, with no extra
 * event payload. GA4 auto-collects page_location/user_agent/etc, which is
 * fine for public marketing pages, but nothing here may ever carry prompts,
 * agent execution content, findings/evidence, repository names, org/tenant
 * identifiers, emails, credentials, or authenticated SaaS content.
 */

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const HAS_MEASUREMENT_ID = Boolean(import.meta.env.VITE_GA_MEASUREMENT_ID)

/** The complete marketing funnel event vocabulary. Do not extend ad hoc. */
export type FunnelEvent =
  | 'docs_click'
  | 'github_click'
  | 'app_click'
  | 'pricing_view'
  | 'early_access_click'
  | 'install_cta_click'
  | 'contact_sales_click'
  | 'security_details_click'
  | 'open_source_click'

/** Records a client-side SPA route change as a GA4 page_view. No-op without a Measurement ID. Do not call this for the initial page load -- gtag's own automatic page_view already covers it. */
export function trackPageView(path: string): void {
  if (!HAS_MEASUREMENT_ID || !window.gtag) return
  window.gtag('set', 'page_path', path)
  window.gtag('event', 'page_view')
}

/** Records one of the fixed marketing funnel events. No-op without a Measurement ID. */
export function trackEvent(name: FunnelEvent): void {
  if (!HAS_MEASUREMENT_ID || !window.gtag) return
  window.gtag('event', name)
}
