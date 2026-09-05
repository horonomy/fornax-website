import './Security.css'

export default function Security() {
  return (
    <div className="container page">
      <span className="pill">Security &amp; Privacy</span>
      <h1>Local-first by default, not just by marketing</h1>
      <p className="page__lede">
        The local runtime is the privacy boundary, not an afterthought bolted
        onto a cloud product. This page describes what actually ships today.
      </p>

      <section className="page__section">
        <h2>Local-only unless you opt in</h2>
        <p>By default, these stay on your machine and are never uploaded:</p>
        <ul>
          <li>Raw prompts and agent transcripts</li>
          <li>Source code and file contents</li>
          <li>File paths</li>
          <li>Shell and tool arguments</li>
          <li>Tokens, secrets, and credentials</li>
        </ul>
        <p>
          Local integrity checking — capture, verification, the five-state
          findings, the CLI, the local dashboard — works fully with cloud
          network access disabled and requires no SaaS account.
        </p>
      </section>

      <section className="page__section">
        <h2>What can leave your machine</h2>
        <p>
          Cloud sync is opt-in — off by default, and local integrity
          checking works the same with it off. <strong>Beta</strong> is the
          hosted sync target: an early, opt-in preview, not the default way
          to run Fornax and not a general-availability product. When
          enabled, it sends a redacted envelope containing only
          policy-approved metadata, findings, fingerprints, and
          version/provenance summaries — never the raw content listed
          above. Every field is scanned and redacted at the point it is
          first captured, before it reaches local storage, and that
          redaction step is covered by an automated regression test.
        </p>
        <p>
          Connecting a machine to Beta requires device registration and
          authenticated ingest — that flow is still being built (tracked as
          FORNX-151) and is marked <strong>Beta — coming soon</strong> in the
          docs until it ships; it is not live today.
        </p>
      </section>

      <section className="page__section">
        <h2>Analytics on this website</h2>
        <p>
          This marketing site (fornax.horo.run) uses Google Analytics 4 to
          count page views and a small set of named button/link clicks —
          docs, GitHub, sign-in, pricing view, early access, install and
          contact-sales CTAs. That is separate from, and never joined with,
          the local runtime or the Beta cloud tier described above: it never
          receives prompts, agent execution content, findings/evidence,
          repository names, organization or tenant identifiers, emails,
          credentials, or any authenticated product data. It only runs on
          this public website, not in the local runtime, the CLI, the local
          dashboard, or the authenticated app.
        </p>
      </section>

      <section className="page__section">
        <h2>Honest limits</h2>
        <p>
          Secret and credential filtering is a defensive layer, not
          marketed as perfect data-loss prevention — treat it as one control
          among several, not a guarantee. It has been exercised with a
          dedicated adversarial-input and secret-egress test pass at the
          point evidence is captured and stored locally; the further path
          once an upload leaves that boundary (upload transport through to
          the hosted dashboard) has not had the same level of independent,
          end-to-end re-verification. Fornax is at MVP maturity (v0.0.1)
          with an opt-in Beta cloud tier, not a GA product; this page will
          be updated as the privacy boundary is extended and independently
          reviewed.
        </p>
      </section>
    </div>
  )
}
