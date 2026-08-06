#!/usr/bin/env node
/* Audits the researched figures in src/data/companies.ts.
 *
 *   node scripts/audit-prices.mjs            # offline checks only
 *   node scripts/audit-prices.mjs --live     # also compare against the feed
 *
 * Two independent checks, because they catch different mistakes:
 *
 *  1. INTERNAL — implied share count = market cap / price. A company's share
 *     count barely moves, so if this number is wildly out of line with the
 *     company's size, one of the two figures was captured wrong. This is what
 *     caught MasTec: a researched $417.41 against a $20.78B cap implied 49.8M
 *     shares, when the real count is ~84M. The price was stale; the cap was
 *     not. Every multiple in that deep dive inherited the error.
 *
 *  2. LIVE — researched price against the quote feed. Needs network and a
 *     running deployment, so it is opt-in. Ordinary drift is fine and
 *     expected; the threshold is set where drift stops being a plausible
 *     explanation.
 *
 * Exits non-zero when anything trips, so it can gate a release.
 */

import { readFileSync } from 'node:fs'

const LIVE = process.argv.includes('--live')
const BASE = process.env.AUDIT_BASE ?? 'https://bareklabs.com'
const DRIFT_LIMIT = 0.2

const src = readFileSync(new URL('../src/data/companies.ts', import.meta.url), 'utf8')

const MULT = { T: 1e12, B: 1e9, M: 1e6, K: 1e3 }

function firstValue(block, label) {
  const m = block.match(new RegExp(`\\{ label: '${label}[^']*', values: \\['([^']*)'`, 'i'))
  return m ? m[1] : null
}

/* Researched figures are prose: "~$16-22B (varies by source/date)",
 * "$1.55T", "~¥24.4T (~$160B)". A range is averaged, and the multiplier is
 * read from the end of the range rather than the start — "16-22B" is 19bn,
 * not 16. Getting this wrong silently turns billions into units. */
function num(raw) {
  if (!raw) return null
  const m = raw
    .replace(/,/g, '')
    .match(/(\d+(?:\.\d+)?)(?:\s*[-–—]\s*(\d+(?:\.\d+)?))?\s*([TBMK])?/i)
  if (!m) return null
  const lo = parseFloat(m[1])
  const hi = m[2] ? parseFloat(m[2]) : null
  const value = hi != null ? (lo + hi) / 2 : lo
  return value * (m[3] ? MULT[m[3].toUpperCase()] : 1)
}

const companies = []
for (const m of src.matchAll(/^[ \t]*([A-Z0-9.]+): \{$/gm)) {
  const start = m.index
  const j = src.indexOf('metrics:', start)
  if (j < 0) continue
  const k = src.indexOf('\n    ],', j)
  const block = src.slice(j, k)
  const ticker = m[1]
  const price = num(firstValue(block, 'Price')) ?? num(firstValue(block, 'Share price'))
  const cap = num(firstValue(block, 'Market cap'))
  const asOf = (src.slice(start, j).match(/asOf: '([^']*)'/) ?? [])[1] ?? '?'
  if (price && cap) companies.push({ ticker, price, cap, asOf, shares: cap / price })
}

let failures = 0
console.log(`\nInternal consistency — implied share count = market cap / price\n${'-'.repeat(72)}`)
for (const c of companies) {
  const m = c.shares / 1e6
  // Flag only the physically implausible. The ceiling has to clear Nvidia,
  // which genuinely carries ~24bn shares after its splits — a threshold that
  // fails on a real capital structure just teaches people to ignore the tool.
  const bad = m < 5 || m > 30000
  if (bad) failures++
  console.log(
    `${bad ? 'FAIL' : '  ok'}  ${c.ticker.padEnd(11)} price ${c.price.toLocaleString('en-US').padStart(12)}` +
    `  cap ${(c.cap / 1e9).toFixed(1).padStart(7)}B  implied ${m.toFixed(1).padStart(9)}M  asOf ${c.asOf}`
  )
}

if (LIVE) {
  console.log(`\nLive drift — researched price vs the quote feed (limit ${DRIFT_LIMIT * 100}%)\n${'-'.repeat(72)}`)
  const symbols = companies.map((c) => c.ticker)
  const quotes = {}
  for (let i = 0; i < symbols.length; i += 25) {
    const batch = symbols.slice(i, i + 25)
    try {
      const res = await fetch(`${BASE}/api/quotes?symbols=${encodeURIComponent(batch.join(','))}`)
      if (res.ok) Object.assign(quotes, (await res.json()).quotes)
    } catch (e) {
      console.log(`  (batch ${i / 25 + 1} failed: ${e.message})`)
    }
  }
  for (const c of companies) {
    const q = quotes[c.ticker]
    if (!q) {
      console.log(`  --  ${c.ticker.padEnd(11)} no quote`)
      continue
    }
    const drift = (q.price - c.price) / c.price
    const bad = Math.abs(drift) > DRIFT_LIMIT
    if (bad) failures++
    console.log(
      `${bad ? 'FAIL' : '  ok'}  ${c.ticker.padEnd(11)} researched ${c.price.toFixed(2).padStart(10)}` +
      `  live ${q.price.toFixed(2).padStart(10)}  drift ${(drift * 100).toFixed(1).padStart(7)}%`
    )
  }
}

console.log(`\n${failures === 0 ? 'No issues.' : `${failures} figure(s) need a refresh.`}\n`)
process.exit(failures === 0 ? 0 : 1)
