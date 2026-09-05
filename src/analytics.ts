/**
 * Minimal GA4 wrapper for the public marketing site (FORNX-327).
 *
 * Public marketing analytics only — never wired to authenticated SaaS/
 * product telemetry, and not to be joined with it without a separate,
 * privacy-reviewed decision. No-ops entirely when VITE_GA_MEASUREMENT_ID is
 * unset, so local dev and PR preview builds behave exactly as before.
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

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

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

let initialized = false

/** Injects gtag.js and initializes GA4. No-op if the Measurement ID is unset or this already ran. */
export function initAnalytics(): void {
  if (initialized || !MEASUREMENT_ID) return
  initialized = true

  window.dataLayer = window.dataLayer ?? []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag('js', new Date())
  // send_page_view: false — this is a client-routed SPA, so page views are
  // reported explicitly via trackPageView on every route change instead of
  // relying on gtag's config-time automatic pageview.
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.appendChild(script)
}

/** Records a client-side route change as a GA4 page_view. No-op without a Measurement ID. */
export function trackPageView(path: string): void {
  if (!MEASUREMENT_ID || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_location: window.location.origin + path,
    page_path: path,
  })
}

/** Records one of the fixed marketing funnel events. No-op without a Measurement ID. */
export function trackEvent(name: FunnelEvent): void {
  if (!MEASUREMENT_ID || !window.gtag) return
  window.gtag('event', name)
}
