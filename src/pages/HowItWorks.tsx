import VerdictPill from '../components/VerdictPill'
import './HowItWorks.css'

export default function HowItWorks() {
  return (
    <div className="container page">
      <span className="pill">How it works</span>
      <h1>Claim, evidence, finding — in that order</h1>
      <p className="page__lede">
        Fornax never verifies a claim against another claim. It always starts
        from what was actually observed.
      </p>

      <ol className="flow">
        <li className="flow__step card">
          <span className="flow__index">1</span>
          <h2>Observe</h2>
          <p>
            A thin adapter (one per provider — Claude Code, Codex, and,
            experimentally, opencode) translates provider-native events into
            a canonical, immutable event log: tool calls, exit codes, files
            touched, transcript text. Nothing is interpreted yet.
          </p>
        </li>
        <li className="flow__step card">
          <span className="flow__index">2</span>
          <h2>Extract a claim</h2>
          <p>
            When the agent asserts something — &quot;tests pass,&quot;
            &quot;the file was updated,&quot; &quot;the endpoint returns
            200&quot; — that assertion is captured as a discrete claim, tied
            to the point in the transcript it came from.
          </p>
        </li>
        <li className="flow__step card">
          <span className="flow__index">3</span>
          <h2>Verify</h2>
          <p>
            A deterministic verifier compares the claim against the observed
            evidence for that session — nothing live, nothing re-run. The
            same claim and evidence always produce the same finding, so
            verification is replayable offline.
          </p>
        </li>
        <li className="flow__step card">
          <span className="flow__index">4</span>
          <h2>Report a finding</h2>
          <p>
            The result is one of five explicit states — never collapsed into
            a single score:
          </p>
          <ul className="verdict-list">
            <li>
              <VerdictPill state="VERIFIED" /> — matches the evidence
            </li>
            <li>
              <VerdictPill state="UNVERIFIED" /> — no evidence yet either way
            </li>
            <li>
              <VerdictPill state="CONTRADICTED" /> — evidence disagrees
            </li>
            <li>
              <VerdictPill state="REVIEW" /> — needs a human read
            </li>
            <li>
              <VerdictPill state="UNAVAILABLE" /> — the provider doesn&apos;t
              expose what&apos;s needed to check
            </li>
          </ul>
        </li>
      </ol>

      <section className="page__section">
        <h2>Where it runs</h2>
        <p>
          All four steps happen in one local daemon process on your machine.
          There is no required network hop and no cloud dependency on this
          path — adapters, storage, and verifiers are modules inside a single
          process, not separate services calling each other over HTTP.
        </p>
      </section>
    </div>
  )
}
