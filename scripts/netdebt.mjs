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

export function compute(symbol, json) {
  const quarters = json?.quarterlyReports ?? []
  const q = quarters.find(complete)
  if (!q) return { symbol, skip: 'aucun trimestre complet dans la réponse' }
  if (q.reportedCurrency !== 'USD') {
    return { symbol, skip: `comptes publiés en ${q.reportedCurrency}, ligne cotée en USD — conversion refusée (piège 1)` }
  }

  /* PIEGE 5 — le repli du piege 3 n'avait pas de fond. Sur RMBS, aucun trimestre
   * entre juin 2026 et septembre 2021 n'etait complet, et `find` a donc rendu un
   * bilan vieux de cinq ans, note comme tel mais publiable. Reculer d'un trimestre
   * quand le dernier est depose a moitie vide est raisonnable ; reculer d'annees
   * ne l'est pas, parce que la dette nette est precisement ce qui bouge entre-temps.
   * Au-dela de deux trimestres d'ecart avec la periode la plus recente rapportee,
   * on refuse et on laisse un tiret plutot qu'un chiffre perime. */
  const DAY = 86400000
  const latest = quarters[0]?.fiscalDateEnding
  if (latest) {
    const gap = (Date.parse(latest + 'T00:00:00Z') - Date.parse(q.fiscalDateEnding + 'T00:00:00Z')) / DAY
    if (gap > 200) {
      return { symbol, skip: `dernier trimestre complet ${q.fiscalDateEnding}, soit ${Math.round(gap / 30.4)} mois avant la periode la plus recente (${latest}) — trop ancien pour une dette nette (piege 5)` }
    }
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

  /* L'echelle suit le chiffre. Tout formater en milliards a deux decimales
   * rendait « cash & ST investments $0.00B » chez BWEN et WYFI : vrai au
   * centieme de milliard pres, illisible, et impossible a distinguer d'une
   * donnee manquante par un lecteur. Sous le milliard on passe en millions. */
  const b = (v) => {
    const a = Math.abs(v)
    return a >= 1e9 ? `$${(a / 1e9).toFixed(2)}B` : `$${Math.round(a / 1e6)}M`
  }
  const when = new Date(q.fiscalDateEnding + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  })
  const staleNote = quarters[0] !== q ? `; the ${quarters[0]?.fiscalDateEnding} quarter is filed incomplete upstream, so the last complete one is used` : ''
  const leaseNote = leases == null ? '; no finance leases reported in this dataset' : ''
  const head = net < 0 ? `-${b(net)} net cash` : b(net)
  const debtLabel = leases == null ? 'debt' : 'debt incl. leases'

  /* PIEGE 6 — la qualite de la source suit la taille du bilan. Verifie contre les
   * documents deposes : AMKR, CRM, UUUU et SMCI tombent juste au dollar pres ; WYFI
   * annonce une tresorerie nulle quand le 10-Q en montre 75,8 M$, et BWEN une dette
   * de 30 M$ quand le 10-Q en montre 15,0 M$. Quatre sur quatre en haut de cote,
   * zero sur deux en bas. Sous le demi-milliard de dette reconstruite, la ligne
   * sort quand meme — refuser priverait de vrais chiffres — mais elle sort marquee,
   * parce qu'une ligne collee sans controle est une ligne publiee. */
  const verify = debt < 5e8
    ? 'petite capitalisation : couverture du fournisseur peu fiable a cette taille, recouper contre le dernier 10-Q avant de coller'
    : null

  return {
    symbol,
    quarter: q.fiscalDateEnding,
    check,
    verify,
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

/** Tickers in companies.ts that are US-listed and carry no Net debt metric.
 * NOTE: "US-listed" is inferred from the absence of a dot in the ticker, which
 * also catches ADRs (TSM, ASML, BABA, ASX, PAGS…). Those file in their home
 * currency, so trap 1 refuses them downstream — this list is a ceiling, not a
 * yield. */
export async function missing() {
  const { readFileSync } = await import('fs')
  const s = readFileSync(new URL('../src/data/companies.ts', import.meta.url), 'utf8')
  const marks = [...s.matchAll(/^\s*ticker: '([^']+)',\s*$/gm)]
  return marks
    .map((m, i) => ({ t: m[1], body: s.slice(m.index, i + 1 < marks.length ? marks[i + 1].index : s.length) }))
    .filter((r) => !r.t.includes('.') && !r.body.includes("label: 'Net debt'"))
    .map((r) => r.t)
}

/* CLI only when run directly. Importing this file gives you compute() and
 * missing() without firing a request or requiring a key — which is how the
 * same trap logic gets reused when the balance sheets arrive by another road
 * (an MCP connector, a cached response) instead of this script's own fetch. */
if (import.meta.url === `file://${process.argv[1]}`) {
  if (!KEY) {
    console.error('ALPHAVANTAGE_API_KEY manquante dans l\'environnement.')
    process.exit(1)
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
    console.error(`${r.verify ? 'VERIF ' : 'OK    '} ${s.padEnd(6)} trimestre ${r.quarter} · ${r.check}`)
    if (r.verify) console.error(`       ${' '.repeat(6)} ${r.verify}`)
    console.log(`// ${s}`)
    if (r.verify) console.log(`// A VERIFIER — ${r.verify}`)
    console.log(r.line)
    await new Promise((res) => setTimeout(res, 1000)) // courtoisie envers le fournisseur
  }
}
