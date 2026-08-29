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
          Cloud sync is opt-in and best-effort. When enabled, it sends a
          redacted envelope containing only policy-approved metadata,
          findings, fingerprints, and version/provenance summaries — never
          the raw content listed above. The upload policy is deterministic
          and versioned, and you can inspect what an upload would contain
          before turning cloud sync on.
        </p>
      </section>

      <section className="page__section">
        <h2>Honest limits</h2>
        <p>
          Secret and credential filtering is a defensive layer, not
          marketed as perfect data-loss prevention — treat it as one control
          among several, not a guarantee. Fornax is at MVP maturity
          (v0.0.1); this page will be updated as the privacy boundary is
          extended and independently reviewed.
        </p>
      </section>
    </div>
  )
}
