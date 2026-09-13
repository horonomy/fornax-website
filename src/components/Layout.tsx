import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { DOCS_URL, GITHUB_URL, APP_URL, APP_LIVE } from '../config'
import { trackPageView, trackEvent, type FunnelEvent } from '../analytics'
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
  const isFirstRender = useRef(true)
  const brandRef = useRef<HTMLAnchorElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openFrameRef = useRef<number | null>(null)
  const isMenuRenderedRef = useRef(false)
  const isMenuOpenRef = useRef(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuRendered, setIsMenuRendered] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const openMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    isMenuRenderedRef.current = true
    isMenuOpenRef.current = true
    setIsMenuRendered(true)
    setIsMenuOpen(true)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsMenuVisible(true)
    } else {
      openFrameRef.current = requestAnimationFrame(() => {
        setIsMenuVisible(true)
        openFrameRef.current = null
      })
    }
  }

  const closeMenu = useCallback((focusTarget?: 'menu' | 'brand') => {
    if (!isMenuRenderedRef.current) {
      return
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    if (openFrameRef.current) {
      cancelAnimationFrame(openFrameRef.current)
      openFrameRef.current = null
    }
    setIsMenuOpen(false)
    isMenuOpenRef.current = false
    setIsMenuVisible(false)
    const closeDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 120
    closeTimerRef.current = setTimeout(() => {
      isMenuRenderedRef.current = false
      setIsMenuRendered(false)
      closeTimerRef.current = null
    }, closeDuration)

    if (focusTarget === 'menu') {
      menuButtonRef.current?.focus()
    }
    if (focusTarget === 'brand') {
      brandRef.current?.focus()
    }
  }, [])

  // gtag's own automatic page_view already covers the initial load; only
  // report subsequent SPA route changes here, mirroring the official
  // @docusaurus/plugin-google-gtag pattern (see analytics.ts).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    trackPageView(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu('menu')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen, closeMenu])

  useEffect(() => {
    closeMenu()
  }, [location.pathname, closeMenu])

  useEffect(() => {
    const desktopBreakpoint = window.matchMedia('(min-width: 768px)')
    const closeForDesktop = () => {
      if (!desktopBreakpoint.matches) {
        return
      }

      if (isMenuOpenRef.current) {
        closeMenu('brand')
      }
    }

    closeForDesktop()
    desktopBreakpoint.addEventListener('change', closeForDesktop)
    return () => desktopBreakpoint.removeEventListener('change', closeForDesktop)
  }, [closeMenu])

  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
      if (openFrameRef.current) {
        cancelAnimationFrame(openFrameRef.current)
      }
      isMenuRenderedRef.current = false
      isMenuOpenRef.current = false
    },
    [],
  )

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <NavLink ref={brandRef} to="/" className="site-header__brand" end onClick={() => closeMenu()}>
            <span className="site-header__mark" aria-hidden="true" />
            Fornax
          </NavLink>
          <nav className="site-header__nav site-header__nav--desktop" aria-label="Primary">
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
          <div className="site-header__ctas site-header__ctas--desktop">
            <a
              className="btn btn--secondary"
              href={DOCS_URL}
              onClick={() => trackEvent('docs_click')}
            >
              Docs
            </a>
            {APP_LIVE ? (
              <a
                className="btn btn--primary"
                href={APP_URL}
                onClick={() => trackEvent('app_click')}
              >
                Sign in
              </a>
            ) : (
              // Genuinely not live yet (FORNX-42) — a real disabled <button>
              // (no href, browser-enforced non-interactivity, removed from
              // tab order) rather than a dimmed-but-live <a>, which looked
              // disabled while still navigating on click/Enter (FORNX-336).
              <button
                type="button"
                className="btn btn--primary"
                aria-disabled="true"
                disabled
                title="Sign-in is not available yet"
              >
                Sign in
              </button>
            )}
          </div>
          <a
            className="site-header__compact-docs"
            href={DOCS_URL}
            onClick={() => trackEvent('docs_click')}
          >
            Docs
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="site-header__menu-button"
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation-menu"
            onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
          >
            Menu
          </button>
        </div>
        {isMenuRendered && (
          <div
            id="primary-navigation-menu"
            className={`site-header__disclosure${isMenuVisible ? ' is-open' : ' is-closing'}`}
            aria-hidden={!isMenuOpen}
            inert={!isMenuOpen}
          >
            <nav className="site-header__nav site-header__nav--mobile" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    isActive
                      ? 'site-header__link site-header__menu-link is-active'
                      : 'site-header__link site-header__menu-link'
                  }
                  onClick={() => {
                    if (link.event) {
                      trackEvent(link.event)
                    }
                    closeMenu()
                  }}
                >
                  {link.label}
                </NavLink>
              ))}
              {APP_LIVE ? (
                <a
                  className="site-header__menu-link"
                  href={APP_URL}
                  onClick={() => {
                    trackEvent('app_click')
                    closeMenu()
                  }}
                >
                  Sign in
                </a>
              ) : (
                <button
                  type="button"
                  className="site-header__menu-link"
                  aria-disabled="true"
                  disabled
                  title="Sign-in is not available yet"
                >
                  Sign in
                </button>
              )}
            </nav>
          </div>
        )}
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
