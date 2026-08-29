import './VerdictPill.css'

export type VerdictState =
  | 'VERIFIED'
  | 'UNVERIFIED'
  | 'CONTRADICTED'
  | 'REVIEW'
  | 'UNAVAILABLE'

const CLASS_BY_STATE: Record<VerdictState, string> = {
  VERIFIED: 'verdict-pill verdict-pill--verified',
  UNVERIFIED: 'verdict-pill verdict-pill--unverified',
  CONTRADICTED: 'verdict-pill verdict-pill--contradicted',
  REVIEW: 'verdict-pill verdict-pill--review',
  UNAVAILABLE: 'verdict-pill verdict-pill--unavailable',
}

export default function VerdictPill({ state }: { state: VerdictState }) {
  return <code className={CLASS_BY_STATE[state]}>{state}</code>
}
