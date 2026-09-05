import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { DOCS_URL, GITHUB_URL, APP_URL, APP_LIVE, DOCS_LIVE } from '../config'
import { initAnalytics, trackPageView, trackEvent, type FunnelEvent } from '../analytics'
import './Layout.css'

const NAV_LINKS: { to: string; label: string; end?: boolean; event?: FunnelEvent }[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/open-source', label: 'Open Source', event: 'open_source_click' },
  { to: '/security', label: 'Security & Privacy', event: 'security_details_click' },
]

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <NavLink to="/" className="site-header__brand" end>
            <span className="site-header__mark" aria-hidden="true" />
            Fornax
          </NavLink>
          <nav className="site-header__nav" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive ? 'site-header__link is-active' : 'site-header__link'
                }
                onClick={link.event ? () => trackEvent(link.event!) : undefined}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="site-header__ctas">
            <a
              className="btn btn--secondary"
              href={DOCS_URL}
              aria-disabled={!DOCS_LIVE}
              onClick={() => trackEvent('docs_click')}
            >
              Docs
            </a>
            <a
              className="btn btn--primary"
              href={APP_URL}
              aria-disabled={!APP_LIVE}
              onClick={() => trackEvent('app_click')}
            >
              Sign in
            </a>
          </div>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p className="site-footer__copy">
            Fornax is a product of{' '}
            <a href="https://horonomy.dev" target="_blank" rel="noreferrer">
              Horonomy
            </a>
            . Core runtime is MIT-licensed and open source.
          </p>
          <div className="site-footer__links">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('github_click')}
            >
              GitHub
            </a>
            <a href={DOCS_URL} onClick={() => trackEvent('docs_click')}>
              Docs
            </a>
            <NavLink to="/security" onClick={() => trackEvent('security_details_click')}>
              Security &amp; Privacy
            </NavLink>
          </div>
        </div>
      </footer>
    </>
  )
}
