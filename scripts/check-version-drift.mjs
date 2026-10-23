#!/usr/bin/env node
// Version-drift gate for the public site (FORNX-461).
//
//   node scripts/check-version-drift.mjs            source vs GitHub releases
//   node scripts/check-version-drift.mjs --live     ... and the deployed site vs source
//   --strict                                          a network failure is a failure, not a skip
//   --url <site>                                      live site (default https://fornax.horonom.com)
//
// The hero badge advertises LATEST_RELEASE from src/config.ts. It must be the
// latest *published* release of horonomy/fornax-core, and never newer than the
// newest published tag: an unreleased candidate must not be advertised.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const REPO = 'horonomy/fornax-core'
const DEFAULT_SITE = 'https://fornax.horonom.com'
const SEMVER = /^v(\d+)\.(\d+)\.(\d+)$/

export function parseSemver(tag) {
  const m = SEMVER.exec(tag ?? '')
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null
}

export function compareSemver(a, b) {
  const pa = parseSemver(a)
  const pb = parseSemver(b)
  if (!pa || !pb) throw new Error(`not a vX.Y.Z tag: ${!pa ? a : b}`)
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] < pb[i] ? -1 : 1
  return 0
}

export function readAdvertisedRelease(configSource) {
  const m = /export const LATEST_RELEASE = '(v\d+\.\d+\.\d+)'/.exec(configSource)
  if (!m) throw new Error('LATEST_RELEASE not found in src/config.ts')
  return m[1]
}

// The build stamps <meta name="fornax-release" content="vX.Y.Z"> into the
// static HTML. A deployment that predates the stamp is read from the legacy
// hand-typed badge literal in its JS bundle ("Early / vX.Y.Z").
export function extractReleaseMeta(html) {
  const m = /<meta[^>]*name="fornax-release"[^>]*content="(v\d+\.\d+\.\d+)"/.exec(html)
    ?? /<meta[^>]*content="(v\d+\.\d+\.\d+)"[^>]*name="fornax-release"/.exec(html)
  return m ? m[1] : null
}

export function extractPill(bundleText) {
  const m = /Early \/ (v\d+\.\d+\.\d+)/.exec(bundleText)
  return m ? m[1] : null
}

// `releases` is the GitHub API list of releases; `latest` is /releases/latest.
export function evaluateSource({ advertised, latestTag, publishedTags }) {
  const findings = []
  const newest = publishedTags
    .filter((t) => parseSemver(t))
    .sort(compareSemver)
    .at(-1)
  if (newest && compareSemver(advertised, newest) > 0) {
    findings.push(`advertises ${advertised}, which is newer than the newest published release ${newest}: an unreleased candidate must not be advertised`)
  } else if (latestTag && advertised !== latestTag) {
    findings.push(`advertises ${advertised} but the latest published release is ${latestTag}`)
  }
  return findings
}

export function evaluateLive({ advertised, deployed }) {
  if (!deployed) return ['could not read the advertised release from the deployed site (no fornax-release meta, no legacy badge)']
  return deployed === advertised
    ? []
    : [`deployed site shows ${deployed} but source advertises ${advertised}: production lags main`]
}

async function getJson(url) {
  const headers = { accept: 'application/vnd.github+json', 'user-agent': 'fornax-website-version-drift' }
  if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`)
  return res.json()
}

async function getText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000), headers: { 'cache-control': 'no-cache' } })
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`)
  return res.text()
}

async function main(argv) {
  const strict = argv.includes('--strict')
  const live = argv.includes('--live')
  const site = (argv.includes('--url') ? argv[argv.indexOf('--url') + 1] : DEFAULT_SITE).replace(/\/$/, '')
  const root = join(dirname(fileURLToPath(import.meta.url)), '..')
  const advertised = readAdvertisedRelease(readFileSync(join(root, 'src/config.ts'), 'utf8'))
  const findings = []
  const notes = []
  try {
    const latest = await getJson(`https://api.github.com/repos/${REPO}/releases/latest`)
    const releases = await getJson(`https://api.github.com/repos/${REPO}/releases?per_page=50`)
    const published = releases.filter((r) => !r.draft).map((r) => r.tag_name)
    findings.push(...evaluateSource({ advertised, latestTag: latest.tag_name, publishedTags: published }))
    notes.push(`source ${advertised}; GitHub latest ${latest.tag_name}`)
    if (live) {
      const html = await getText(`${site}/`)
      const script = /src="(\/assets\/[^"]+\.js)"/.exec(html)?.[1]
      if (!script) throw new Error('no /assets/*.js bundle found in the deployed HTML')
      const deployed = extractReleaseMeta(html) ?? extractPill(await getText(`${site}${script}`))
      findings.push(...evaluateLive({ advertised, deployed }))
      notes.push(`deployed ${deployed ?? 'unknown'}`)
    }
  } catch (err) {
    if (strict) {
      console.error(`version drift check could not run: ${err.message}`)
      return 1
    }
    console.warn(`version drift check skipped (network): ${err.message}`)
    return 0
  }
  if (findings.length) {
    for (const f of findings) console.error(`VERSION DRIFT: ${f}`)
    return 1
  }
  console.log(`version drift check passed (${notes.join('; ')})`)
  return 0
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  process.exit(await main(process.argv.slice(2)))
}
