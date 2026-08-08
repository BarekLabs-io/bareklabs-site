#!/usr/bin/env node
/* Derives a dated net-debt figure per ticker from Alpha Vantage's BALANCE_SHEET
 * endpoint, and prints a ready-to-paste `Net debt` metric line for
 * src/data/companies.ts.
 *
 * WHY A SCRIPT AND NOT A LIVE ROUTE
 * Net debt is a valuation input. The site's convention is a dated, sourced,
 * reviewed figure written into the data file — not a number that changes under
 * the reader between two visits. So this script proposes; a human pastes.
 *
 * WHY IT DOES NOT RUN IN THE AGENT SANDBOX
 * The Claude Code environment's network policy denies outbound HTTPS, so this
 * has to run somewhere with real internet — a laptop, or CI. Set the key:
 *
 *   ALPHAVANTAGE_API_KEY=xxx node scripts/netdebt.mjs MU AVGO AMAT
 *   ALPHAVANTAGE_API_KEY=xxx node scripts/netdebt.mjs --missing   (every gap)
 *
 * FOUR TRAPS THIS ENCODES — every one of them was found by reading real
 * responses, and every one of them fails silently if you extract naively.
 *
 *  1. The provider reports in the COMPANY's currency, not the listing's. TSM
 *     files in TWD while its line here is in USD: pasting its net debt raw is
 *     wrong by a factor of about 32. Any ticker whose reportedCurrency is not
 *     USD is refused rather than converted — converting needs a dated FX rate,
 *     which is another assumption, and this file's job is to remove those.
 *  2. `shortLongTermDebtTotal` does not mean the same thing on every ticker.
 *     On MU it is long-term debt plus leases and EXCLUDES short-term debt; on
 *     TSM and AMAT it includes it. So the total is rebuilt from the components
 *     and the provider's own total is used only as a cross-check.
 *  3. The most recent quarter is sometimes filed half-empty — LRCX's June 2026
 *     quarter carries no currency, no long-term debt and no goodwill. Taking
 *     quarterlyReports[0] blindly would have published a debt figure missing
 *     its largest component. The script walks back to the last complete one and
 *     reports which quarter it used.
 *  4. `cashAndShortTermInvestments` is frequently just cash, with short-term
 *     investments sitting in their own field. Adding the two fields yourself is
 *     the only way to get the figure the label promises.
 */

const KEY = process.env.ALPHAVANTAGE_API_KEY?.trim()
if (!KEY) {
  console.error('ALPHAVANTAGE_API_KEY manquante dans l\'environnement.')
  process.exit(1)
}

const num = (v) => {
  if (v == null || v === 'None' || v === '') return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

/** A quarter is usable only if it states its currency and its debt components. */
function complete(q) {
  return q && q.reportedCurrency && q.reportedCurrency !== 'None'
    && num(q.longTermDebt) != null
    && num(q.cashAndCashEquivalentsAtCarryingValue) != null
}

function compute(symbol, json) {
  const quarters = json?.quarterlyReports ?? []
  const q = quarters.find(complete)
  if (!q) return { symbol, skip: 'aucun trimestre complet dans la réponse' }
  if (q.reportedCurrency !== 'USD') {
    return { symbol, skip: `comptes publiés en ${q.reportedCurrency}, ligne cotée en USD — conversion refusée (piège 1)` }
  }

  const short = num(q.shortTermDebt) ?? 0
  const long = num(q.longTermDebt) ?? 0
  const leases = num(q.capitalLeaseObligations) // null means "not broken out", not zero
  const debt = short + long + (leases ?? 0)

  const cash = (num(q.cashAndCashEquivalentsAtCarryingValue) ?? 0) + (num(q.shortTermInvestments) ?? 0)
  const net = debt - cash

  // Cross-check against the provider's own total, whose definition varies.
  const theirs = num(q.shortLongTermDebtTotal)
  const check = theirs == null ? 'pas de total fourni'
    : Math.abs(theirs - debt) < 1e6 ? 'total fournisseur identique'
    : `total fournisseur ${(theirs / 1e9).toFixed(2)}B contre ${(debt / 1e9).toFixed(2)}B reconstruit — définition différente, on garde la reconstruction`

  const b = (v) => `$${(Math.abs(v) / 1e9).toFixed(2)}B`
  const when = new Date(q.fiscalDateEnding + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  })
  const staleNote = quarters[0] !== q ? `; the ${quarters[0]?.fiscalDateEnding} quarter is filed incomplete upstream, so the last complete one is used` : ''
  const leaseNote = leases == null ? '; no finance leases reported in this dataset' : ''
  const head = net < 0 ? `-${b(net)} net cash` : b(net)
  const debtLabel = leases == null ? 'debt' : 'debt incl. leases'

  return {
    symbol,
    quarter: q.fiscalDateEnding,
    check,
    line: `      { label: 'Net debt', values: ['${head} — ${debtLabel} ${b(debt)} less cash & ST investments ${b(cash)} (quarterly balance sheet, ${when}, Alpha Vantage${staleNote}${leaseNote})'] },`,
  }
}

async function one(symbol) {
  const url = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${encodeURIComponent(symbol)}&apikey=${encodeURIComponent(KEY)}`
  const r = await fetch(url, { headers: { Accept: 'application/json' } })
  const json = await r.json()
  if (json.Note || json.Information) return { symbol, skip: `quota atteint : ${json.Note ?? json.Information}` }
  if (!json.quarterlyReports) return { symbol, skip: 'non couvert par ce fournisseur' }
  return compute(symbol, json)
}

/** Tickers in companies.ts that are US-listed and carry no Net debt metric. */
async function missing() {
  const { readFileSync } = await import('fs')
  const s = readFileSync(new URL('../src/data/companies.ts', import.meta.url), 'utf8')
  const marks = [...s.matchAll(/^\s*ticker: '([^']+)',\s*$/gm)]
  return marks
    .map((m, i) => ({ t: m[1], body: s.slice(m.index, i + 1 < marks.length ? marks[i + 1].index : s.length) }))
    .filter((r) => !r.t.includes('.') && !r.body.includes("label: 'Net debt'"))
    .map((r) => r.t)
}

const args = process.argv.slice(2)
const symbols = args[0] === '--missing' ? await missing() : args
if (symbols.length === 0) {
  console.error('Usage: node scripts/netdebt.mjs <TICKER...> | --missing')
  process.exit(1)
}

console.error(`${symbols.length} ticker(s). Une requête par ticker — surveiller le quota.\n`)
for (const s of symbols) {
  const r = await one(s)
  if (r.skip) { console.error(`SAUTE  ${s.padEnd(6)} ${r.skip}`); continue }
  console.error(`OK     ${s.padEnd(6)} trimestre ${r.quarter} · ${r.check}`)
  console.log(`// ${s}`)
  console.log(r.line)
  await new Promise((res) => setTimeout(res, 1000)) // courtoisie envers le fournisseur
}
