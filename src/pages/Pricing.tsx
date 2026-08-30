import { Link } from 'react-router-dom'
import { GITHUB_URL } from '../config'
import './Pricing.css'

export default function Pricing() {
  return (
    <div className="container page">
      <span className="pill pill--placeholder">Provisional — not final</span>
      <h1>Pricing</h1>
      <p className="page__lede">
        Fornax v0.0.1 is a local-first OSS runtime with an opt-in Beta cloud
        tier. Nothing below is a committed price — the Beta tier&apos;s
        price is a hypothesis we&apos;re testing, not an offer, and requires
        owner commercial approval before it becomes real. Talk to us if you
        want to shape it.
      </p>

      <div className="pricing-grid">
        <div className="card pricing-card">
          <h2>Free / OSS</h2>
          <p className="pricing-card__price">$0</p>
          <p>The local runtime, forever, for anyone running it themselves.</p>
          <ul>
            <li>Full local daemon: adapters, verifiers, storage</li>
            <li>Claude Code &amp; Codex adapters</li>
            <li>CLI, status line, local dashboard</li>
            <li>No cloud account required</li>
          </ul>
          <a className="btn btn--secondary" href={GITHUB_URL}>
            Get it on GitHub
          </a>
        </div>

        <div className="card pricing-card pricing-card--placeholder">
          <span className="pill pill--placeholder">Beta — price is a hypothesis</span>
          <h2>Beta / Early Access</h2>
          <p className="pricing-card__price">TBD</p>
          <p>
            Opt-in cloud sync and a hosted findings dashboard are available
            today as an unbilled Beta preview — not a committed product tier.
            Price, seat model, and final scope are still unset; nothing here
            is an offer until it gets owner commercial approval.
          </p>
          <ul>
            <li>Everything in Free</li>
            <li>Opt-in cloud sync of redacted findings (Beta, unbilled today)</li>
            <li>Hosted findings dashboard</li>
            <li>Device connect flow: coming soon (FORNX-151)</li>
            <li>Shape it: early access conversations open now</li>
          </ul>
          <a
            className="btn btn--secondary"
            href="mailto:hello@horo.run?subject=Fornax%20Early%20Access"
          >
            Request early access
          </a>
        </div>

        <div className="card pricing-card">
          <h2>Enterprise</h2>
          <p className="pricing-card__price">Contact us</p>
          <p>
            Custom deployment, procurement, and support conversations for
            organizations evaluating Fornax at scale. No packaged terms yet.
          </p>
          <a
            className="btn btn--secondary"
            href="mailto:hello@horo.run?subject=Fornax%20Enterprise"
          >
            Contact sales
          </a>
        </div>
      </div>

      <p className="pricing-disclaimer">
        Fornax is at MVP maturity (v0.0.1). None of the tiers above represent
        a signed contract or a guaranteed feature set — see{' '}
        <Link to="/open-source">Open Source</Link> and{' '}
        <Link to="/security">Security &amp; Privacy</Link> for what actually
        ships today.
      </p>
    </div>
  )
}
