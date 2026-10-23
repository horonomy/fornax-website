import { test } from 'node:test'
import assert from 'node:assert/strict'
import { compareSemver, evaluateLive, evaluateSource, extractPill, extractReleaseMeta, readAdvertisedRelease } from './check-version-drift.mjs'

test('semver compare orders numerically, not lexically', () => {
  assert.equal(compareSemver('v0.0.9', 'v0.0.10'), -1)
  assert.equal(compareSemver('v0.1.0', 'v0.0.9'), 1)
  assert.equal(compareSemver('v0.0.7', 'v0.0.7'), 0)
  assert.throws(() => compareSemver('0.0.7', 'v0.0.7'))
})

test('advertised release is read from the single config constant', () => {
  assert.equal(readAdvertisedRelease("export const LATEST_RELEASE = 'v0.0.7'\n"), 'v0.0.7')
  assert.throws(() => readAdvertisedRelease('export const X = 1'))
})

test('source matching the latest published release passes', () => {
  assert.deepEqual(evaluateSource({ advertised: 'v0.0.7', latestTag: 'v0.0.7', publishedTags: ['v0.0.8', 'v0.0.7'] }), [])
})

test('a stale advertised release is reported', () => {
  const f = evaluateSource({ advertised: 'v0.0.1', latestTag: 'v0.0.7', publishedTags: ['v0.0.8', 'v0.0.7'] })
  assert.equal(f.length, 1)
  assert.match(f[0], /latest published release is v0\.0\.7/)
})

test('advertising an unreleased candidate is reported', () => {
  const f = evaluateSource({ advertised: 'v0.0.9', latestTag: 'v0.0.7', publishedTags: ['v0.0.8', 'v0.0.7'] })
  assert.equal(f.length, 1)
  assert.match(f[0], /unreleased candidate/)
})

test('advertising a pre-release that is published but not "Latest" is reported as stale', () => {
  const f = evaluateSource({ advertised: 'v0.0.8', latestTag: 'v0.0.7', publishedTags: ['v0.0.8', 'v0.0.7'] })
  assert.equal(f.length, 1)
  assert.match(f[0], /latest published release is v0\.0\.7/)
})

test('the badge is extracted from a bundle and compared to source', () => {
  const bundle = 'x{className:`pill`,children:`Early / v0.0.1`}y'
  assert.equal(extractPill(bundle), 'v0.0.1')
  assert.equal(extractPill('nothing here'), null)
  assert.deepEqual(evaluateLive({ advertised: 'v0.0.7', deployed: 'v0.0.7' }), [])
  assert.match(evaluateLive({ advertised: 'v0.0.7', deployed: 'v0.0.1' })[0], /production lags main/)
  assert.match(evaluateLive({ advertised: 'v0.0.7', deployed: null })[0], /could not read the advertised release/)
})

test('the release meta is read in either attribute order, and absent on a pre-stamp deployment', () => {
  assert.equal(extractReleaseMeta('<head><meta name="fornax-release" content="v0.0.7"></head>'), 'v0.0.7')
  assert.equal(extractReleaseMeta('<meta content="v0.0.7" name="fornax-release">'), 'v0.0.7')
  assert.equal(extractReleaseMeta('<head><meta name="viewport" content="v0.0.7"></head>'), null)
})
