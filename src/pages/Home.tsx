import { Link } from 'react-router-dom'
import { DOCS_URL, GITHUB_URL, DOCS_LIVE } from '../config'
import VerdictPill from '../components/VerdictPill'
import './Home.css'

export default function Home() {
  return (
    <>
      <section className="container hero">
        <span className="pill">Early / v0.0.1</span>
        <h1>What should you believe about what your coding agent just told you?</h1>
        <p className="hero__lede">
          Fornax watches a coding agent session in real time, captures
          immutable evidence — tool calls, exit codes, transcripts — and
          checks the agent&apos;s own claims against that evidence. No made-up
          trust score. Just{' '}
          <VerdictPill state="VERIFIED" /> or one of four honest alternatives.
        </p>
        <div className="hero__ctas">
          <a
            className="btn btn--primary"
            href={DOCS_LIVE ? DOCS_URL : GITHUB_URL}
            aria-disabled={!DOCS_LIVE}
          >
            {DOCS_LIVE ? 'Read the docs' : 'Get started on GitHub'}
          </a>
          <Link className="btn btn--secondary" to="/how-it-works">
            See how it works
          </Link>
        </div>
      </section>

      <section className="container">
        <h2>The problem</h2>
        <p>
          A coding agent narrates what it did — &quot;ran the tests, they
          pass,&quot; &quot;fixed the bug,&quot; &quot;deployed the
          change.&quot; That narration is not evidence. It is a claim, and
          claims can be wrong, stale, or simply optimistic. Reviewing an
          agent&apos;s work today usually means re-running everything
          yourself or trusting the transcript at face value.
        </p>
      </section>

      <section className="container">
        <h2>The Fornax promise</h2>
        <p>
          Fornax sits alongside the agent, not in front of it. It records
          what actually happened — the tool calls, their exit codes, the
          files touched, the transcript — before it interprets anything.
          Then it compares the agent&apos;s claims to that record and reports
          one of five states, never a single blended &quot;trust score&quot;
          that hides what it doesn&apos;t know:
        </p>
        <ul className="verdict-list">
          <li>
            <VerdictPill state="VERIFIED" /> the claim matches observed
            evidence
          </li>
          <li>
            <VerdictPill state="UNVERIFIED" /> no evidence either way yet
          </li>
          <li>
            <VerdictPill state="CONTRADICTED" /> the evidence disagrees with
            the claim
          </li>
          <li>
            <VerdictPill state="REVIEW" /> evidence exists but needs a human
            read
          </li>
          <li>
            <VerdictPill state="UNAVAILABLE" /> the provider doesn&apos;t
            expose the signal needed to check — reported as such, never
            silently treated as a pass
          </li>
        </ul>
      </section>

      <section className="container">
        <h2>Supported agents</h2>
        <div className="status-grid">
          <div className="card">
            <h3>Claude Code</h3>
            <p>Adapter translates hook events into evidence. In active development.</p>
            <span className="pill pill--placeholder">In progress</span>
          </div>
          <div className="card">
            <h3>Codex</h3>
            <p>
              Adapter translates CLI rollout events into evidence. Capability
              surface differs from Claude Code and is tracked explicitly, not
              assumed symmetric.
            </p>
            <span className="pill pill--placeholder">In progress</span>
          </div>
        </div>
      </section>
    </>
  )
}
