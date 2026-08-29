import { GITHUB_URL } from '../config'
import './OpenSource.css'

export default function OpenSource() {
  return (
    <div className="container page">
      <span className="pill">Open Source</span>
      <h1>Open by default, private by necessity</h1>
      <p className="page__lede">
        Fornax's core claim is that it checks an agent's narration against
        evidence instead of asking you to trust it. That claim only means
        something if the checking logic itself is inspectable. So the parts
        that decide{' '}
        <code>VERIFIED</code> / <code>UNVERIFIED</code> / <code>CONTRADICTED</code>{' '}
        / <code>REVIEW</code> / <code>UNAVAILABLE</code> are public, MIT-licensed,
        and readable end to end.
      </p>

      <div className="oss-grid">
        <div className="card">
          <h2>Public (MIT)</h2>
          <ul>
            <li>Local Rust runtime and daemon</li>
            <li>Claude Code and Codex adapters</li>
            <li>Canonical event/evidence protocol</li>
            <li>Claim / evidence / finding data models</li>
            <li>Deterministic verifiers</li>
            <li>Local privacy/redaction behavior</li>
            <li>CLI and local UX</li>
          </ul>
        </div>
        <div className="card">
          <h2>Private</h2>
          <ul>
            <li>SaaS / cloud implementation</li>
            <li>Production infrastructure and topology</li>
            <li>Credentials and customer data</li>
            <li>Billing and internal operations</li>
            <li>Proprietary calibration data</li>
          </ul>
        </div>
      </div>

      <section className="page__section">
        <h2>Why this split</h2>
        <p>
          Verification logic that decides whether an agent&apos;s claim holds
          up needs to be auditable by the people relying on it — that&apos;s
          the OSS core. Running a hosted, multi-tenant service around that
          core is a separate, ordinary SaaS business, and that&apos;s what
          stays private.
        </p>
      </section>

      <a className="btn btn--primary" href={GITHUB_URL}>
        View the repository
      </a>
    </div>
  )
}
