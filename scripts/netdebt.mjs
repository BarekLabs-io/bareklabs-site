#!/usr/bin/env node
/* Derives a dated net-debt figure per ticker straight from the SEC's XBRL facts,
 * and prints ready-to-paste metric lines for src/data/companies.ts.
 *
 * POURQUOI LA SEC ET PLUS UN AGREGATEUR
 * La version precedente lisait Alpha Vantage (conservee en second avis dans
 * scripts/netdebt-av.mjs). Elle a produit des chiffres faux sur les petites
 * capitalisations, et la passe de verification a montre que ce n'etaient pas des
 * donnees fausses mais des donnees justes mal rangees : l'agregateur fait entrer
 * les depots dans un schema fixe d'une trentaine de champs, et cette traduction
 * casse des que l'emetteur utilise des balises non standard — ce que font les
 * petits emetteurs. Sur FORM au 27 juin 2026, releve au dollar pres :
 *
 *   shortTermDebt          9 470 k$ = dette courante 1 153 + location courante 8 317
 *   capitalLeaseObligations 18 268 k$ = la TOTALITE des locations simples,
 *                                       sur une societe sans aucune location-financement
 *
 * La location courante etait donc comptee deux fois, et la dette passait de 11,6
 * a 38,2 M$. Ici on lit les postes eux-memes, tels que la societe les a deposes.
 * Pas de cle, pas de quota, pas de couche de normalisation.
 *
 *   node scripts/netdebt.mjs MU AVGO AMAT
 *   node scripts/netdebt.mjs --missing        (tous les trous de companies.ts)
 *
 * La SEC demande un User-Agent nominatif. Surchargeable :
 *   SEC_USER_AGENT="Prenom Nom email@domaine" node scripts/netdebt.mjs ...
 *
 * CE QUE CE FICHIER ENCODE — chaque point vient d'une erreur reelle
 *
 *  1. MONNAIE. On ne lit que les faits libelles en USD. Un ADR qui depose en TWD
 *     ou en EUR est refuse plutot que converti : convertir demande un taux date,
 *     qui est une hypothese de plus, et le role de ce fichier est de les retirer.
 *     En pratique les emetteurs etrangers deposent un 20-F annuel, donc sans bilan
 *     trimestriel — le refus est de toute facon le bon comportement.
 *  2. LOCATIONS HORS DETTE. Les locations ne sont pas de la dette financiere et
 *     sortent sur leur propre ligne. Deux masses separees se comparent d'une
 *     societe a l'autre — dette contre dette, locations contre locations — et le
 *     lecteur additionne quand l'addition a un sens, ce que lui seul peut juger.
 *     La SEC distingue locations simples et locations-financement, ce qu'aucun
 *     agregateur teste ici ne fait de facon fiable : les deux sortent separement.
 *  3. UNE SEULE DATE DE BILAN. Tous les postes sont lus a la meme date de cloture.
 *     Melanger deux trimestres donnerait une dette nette qui n'a jamais existe.
 *  4. TRESORERIE COMPOSEE. La tresorerie utile est liquidites + placements court
 *     terme, additionnees ici, parce qu'aucun poste unique ne porte les deux. La
 *     tresorerie sous restriction est volontairement exclue : elle n'est pas
 *     disponible pour rembourser une dette.
 *  5. BALISES DECLAREES. Chaque montant sort avec le nom de la balise XBRL qui
 *     l'a fourni. Un emetteur qui range sa dette convertible ailleurs que les
 *     autres devient visible a la lecture du journal, au lieu de passer.
 *  6. FRAICHEUR. Si la date de bilan retenue a plus de sept mois, la ligne est
 *     refusee : une dette nette est precisement ce qui bouge entre deux depots.
 *  7. FAITS DIMENSIONNES INVISIBLES. companyfacts n'expose que les faits deposes
 *     SANS dimension. Un emetteur qui ventile un poste de bilan le rend absent de
 *     l'API alors qu'il figure au bilan. Sur UUUU, les 878 338 k$ de titres
 *     courants n'existent sous AUCUNE balise, dans aucun espace de noms — mais la
 *     ligne « Marketable securities » est bien la dans le 10-Q, et la somme des
 *     actifs courants tombe au millier pres. Aucune liste de balises ne corrige
 *     ca : c'est une limite de l'API, pas un defaut de configuration. Le seul
 *     filet est le controle d'actifs courants inexpliques (piege 8), qui marque
 *     la ligne et renvoie au document. Quand il se declenche, on lit le 10-Q.
 */

const UA = process.env.SEC_USER_AGENT?.trim() || 'BAREK LABS research contact@bareklabs.com'
const HEAD = { headers: { 'User-Agent': UA, Accept: 'application/json' } }

/* Listes de repli, dans l'ordre de preference. La premiere balise presente a la
 * date retenue gagne, et son nom est rapporte. */
const TAGS = {
  cash: ['CashAndCashEquivalentsAtCarryingValue'],
  shortTermInvestments: [
    'ShortTermInvestments',
    'MarketableSecuritiesCurrent',
    'AvailableForSaleSecuritiesDebtSecuritiesCurrent',
    'OtherShortTermInvestments',
    /* Sans suffixe de maturite : KLAC porte ses 3 206 M$ la, classes en actifs
     * courants a son bilan, mais rien dans le nom ne le garantit. Accepte en
     * dernier recours, et la ligne reste marquee quand c'est cette balise qui
     * sert — voir vagueSti. */
    'AvailableForSaleSecuritiesDebtSecurities',
  ],
  /* Les deux balises ...AndCapitalLeaseObligations sont en DERNIER recours : elles
   * fusionnent dette et locations-financement dans un seul montant, ce que ce
   * fichier s'emploie justement a separer. MasTec ne depose que celles-la — sans
   * elles il ressort « societe sans dette » avec 2,6 Md$ au bilan. On les accepte
   * donc, mais la ligne produite declare le melange (voir bundled plus bas). */
  /* DebtCurrent est le TOTAL de la dette a moins d'un an : quand il est depose,
   * il se suffit. Sinon la dette courante se reconstruit, et ses composantes
   * s'ADDITIONNENT au lieu de se remplacer — voir currentDebt(). */
  debtCurrentTotal: ['DebtCurrent'],
  /* Groupes de composantes. A l'INTERIEUR d'un groupe les balises sont des
   * synonymes et la premiere trouvee gagne ; ENTRE groupes elles s'additionnent,
   * parce qu'elles designent des dettes differentes toutes exigibles a moins
   * d'un an. LongTermDebtAndCapitalLeaseObligationsCurrent n'est pas un total :
   * c'est la part courante de la dette LONGUE, qui exclut par construction les
   * billets de tresorerie — c'est ce qui faisait disparaitre 5 226 M$ chez CEG. */
  debtCurrentGroups: [
    ['LongTermDebtAndCapitalLeaseObligationsCurrent', 'LongTermDebtCurrent'],
    ['ShortTermBorrowings', 'CommercialPaper', 'LinesOfCreditCurrent'],
    ['NotesPayableCurrent'],
  ],
  debtNoncurrent: [
    'LongTermDebtNoncurrent',
    'LongTermDebt',
    'ConvertibleLongTermNotesPayable',
    'LongTermDebtAndCapitalLeaseObligations',
  ],
  operatingLeaseCurrent: ['OperatingLeaseLiabilityCurrent'],
  operatingLeaseNoncurrent: ['OperatingLeaseLiabilityNoncurrent'],
  financeLeaseCurrent: [
    'FinanceLeaseLiabilityCurrent',
    'CapitalLeaseObligationsCurrent',
  ],
  financeLeaseNoncurrent: [
    'FinanceLeaseLiabilityNoncurrent',
    'CapitalLeaseObligationsNoncurrent',
  ],
}

const usd = (facts, tag) => facts?.['us-gaap']?.[tag]?.units?.USD ?? null

/** Valeur d'une balise a une date de cloture donnee, depot le plus recent gagnant. */
function at(facts, tag, end) {
  const rows = (usd(facts, tag) ?? []).filter((r) => r.end === end && r.form)
  if (!rows.length) return null
  rows.sort((a, b) => a.filed.localeCompare(b.filed))
  return rows[rows.length - 1].val
}

/** Premiere balise de la liste presente a cette date. Rend aussi son nom (piege 5). */
function pick(facts, tags, end) {
  for (const t of tags) {
    const v = at(facts, t, end)
    if (v != null) return { val: v, tag: t }
  }
  return { val: null, tag: null }
}

/* PIEGE 9 — les composantes de la dette courante s'additionnent, elles ne se
 * remplacent pas. Traiter ShortTermBorrowings comme un simple repli de
 * LongTermDebtCurrent revenait a jeter la premiere des deux des que la seconde
 * existait : chez CEG, les echeances courantes de la dette longue etaient
 * retenues et 5 226 M$ de billets de tresorerie et tirages disparaissaient du
 * calcul. Ce sont deux dettes distinctes, toutes deux exigibles a moins d'un an.
 *
 * DebtCurrent, lui, est deja le total de la dette a moins d'un an : quand
 * l'emetteur le depose, l'additionner a ses propres composantes les compterait
 * deux fois. On prend donc le total s'il existe, la somme des parts sinon. */
function currentDebt(facts, end) {
  const total = pick(facts, TAGS.debtCurrentTotal, end)
  if (total.val != null) return total

  const found = TAGS.debtCurrentGroups
    .map((group) => pick(facts, group, end))
    .filter((x) => x.val != null)
  if (!found.length) return { val: null, tag: null }

  return {
    val: found.reduce((s, x) => s + x.val, 0),
    tag: found.map((x) => x.tag).join(' + '),
  }
}

export function compute(symbol, facts) {
  if (!facts) return { symbol, skip: 'aucun fait XBRL rendu par la SEC' }

  /* La date de reference est la derniere cloture ou la tresorerie est deposee en
   * USD. Un emetteur etranger n'aura pas de faits USD : il tombe ici (piege 1). */
  const cashRows = usd(facts, TAGS.cash[0])
  if (!cashRows?.length) {
    return { symbol, skip: 'aucune tresorerie deposee en USD — emetteur etranger ou taxonomie differente (piege 1)' }
  }
  const end = cashRows.map((r) => r.end).sort().pop()

  const age = (Date.parse(`${new Date().toISOString().slice(0, 10)}T00:00:00Z`) - Date.parse(`${end}T00:00:00Z`)) / 86400000
  if (age > 210) {
    return { symbol, skip: `dernier bilan depose le ${end}, soit ${Math.round(age / 30.4)} mois — trop ancien pour une dette nette (piege 6)` }
  }

  const cash = pick(facts, TAGS.cash, end)
  const sti = pick(facts, TAGS.shortTermInvestments, end)
  const dc = currentDebt(facts, end)
  const dn = pick(facts, TAGS.debtNoncurrent, end)
  const olc = pick(facts, TAGS.operatingLeaseCurrent, end)
  const oln = pick(facts, TAGS.operatingLeaseNoncurrent, end)
  const flc = pick(facts, TAGS.financeLeaseCurrent, end)
  const fln = pick(facts, TAGS.financeLeaseNoncurrent, end)

  if (dc.val == null && dn.val == null) {
    return { symbol, skip: `aucun poste de dette financiere depose au ${end} — societe sans dette, ou taxonomie a etendre` }
  }

  const debt = (dc.val ?? 0) + (dn.val ?? 0)
  const liquid = (cash.val ?? 0) + (sti.val ?? 0)
  const net = debt - liquid
  const opLease = (olc.val ?? 0) + (oln.val ?? 0)
  const finLease = (flc.val ?? 0) + (fln.val ?? 0)

  const b = (v) => {
    const a = Math.abs(v)
    return a >= 1e9 ? `$${(a / 1e9).toFixed(2)}B` : `$${Math.round(a / 1e6)}M`
  }
  const when = new Date(`${end}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  })
  const head = net < 0 ? `-${b(net)} net cash` : b(net)

  /* Certains emetteurs ne deposent la dette que fusionnee avec les locations-
   * financement. On ne peut alors pas les separer, et taire ce melange rendrait
   * cette ligne incomparable aux autres sans que ca se voie. Elle le declare. */
  const bundled = [dc.tag, dn.tag].some((t) => t?.includes('AndCapitalLeaseObligations'))
  const bundledNote = bundled
    ? '; this issuer files debt and finance leases as one figure, so this includes finance leases'
    : ''

  const lines = [
    `      { label: 'Net debt', values: ['${head} — financial debt ${b(debt)} less cash & ST investments ${b(liquid)} (balance sheet, ${when}, SEC XBRL${bundledNote})'] },`,
  ]
  /* Quand la dette deposee englobe deja les locations-financement, les repeter
   * ici les ferait compter deux fois par un lecteur qui additionne les deux
   * lignes — ce que ces deux lignes existent precisement pour lui permettre. On
   * ne montre alors que les locations simples, en disant ou sont les autres. */
  const showFin = finLease && !bundled
  if (opLease || showFin) {
    const parts = []
    if (showFin) parts.push(`finance leases ${b(finLease)}`)
    if (opLease) parts.push(`operating leases ${b(opLease)}`)
    const where = bundled
      ? `finance leases are already inside the debt figure above, not repeated here`
      : `reported apart from financial debt and not netted against cash`
    lines.push(`      { label: 'Lease liabilities', values: ['${parts.join(', ')} — ${where} (balance sheet, ${when}, SEC XBRL)'] },`)
  }

  /* PIEGE 7 — le total combine ne veut pas dire la meme chose partout, meme en
   * XBRL. Chez AMKR, DebtLongtermAndShorttermCombinedAmount vaut 1 425 M$ et
   * correspond bien a courant + non courant (1 414 M$). Chez SMCI il vaut
   * 4 114 M$ et ne couvre que les lignes de credit : les 4 659 M$ de convertibles
   * sont tagues a part, et le total reel est la somme des deux — 8,8 Md$, ce que
   * confirme le communique. Reconstruire depuis les postes rate donc la moitie de
   * la dette de SMCI. On ne devine pas : on compare, et on signale l'ecart. */
  const combined = at(facts, 'DebtLongtermAndShorttermCombinedAmount', end)
  const gap = combined == null ? null : Math.abs(combined - debt)
  const debtCheck = combined == null
    ? 'pas de total combine depose'
    : gap < Math.max(1e6, debt * 0.02)
      ? 'total combine concordant'
      : `ATTENTION total combine ${b(combined)} contre ${b(debt)} reconstruit — postes tagues a part chez cet emetteur, la dette est probablement incomplete`

  /* PIEGE 8 — l'absence d'une balise de placements se lit comme un zero et ne
   * fait aucun bruit. Sur UUUU la dette nette bascule de -260 M$ a +619 M$ selon
   * que les titres courants sont trouves ou non.
   *
   * Mais signaler toute absence donnait 21 alertes sur 22 lignes : beaucoup de
   * societes n'ont simplement aucun placement court terme, et un signal qui se
   * declenche presque toujours cesse d'etre lu. On ne signale donc que si les
   * actifs courants portent une masse que ni la tresorerie, ni les creances, ni
   * les stocks n'expliquent — c'est la signature d'un poste liquide manque. */
  const residual = (() => {
    if (sti.tag) return null
    const ac = at(facts, 'AssetsCurrent', end)
    if (ac == null) return null
    const known = (cash.val ?? 0)
      + (at(facts, 'AccountsReceivableNetCurrent', end) ?? at(facts, 'ReceivablesNetCurrent', end) ?? 0)
      + (at(facts, 'InventoryNet', end) ?? 0)
    const r = ac - known
    return r > 5e7 && r > ac * 0.2 ? r : null
  })()

  const vagueSti = sti.tag === 'AvailableForSaleSecuritiesDebtSecurities'

  const used = [
    dc.tag ? `dette courante ${dc.tag}` : 'aucune dette courante deposee',
    dn.tag ? `dette non courante ${dn.tag}` : 'aucune dette non courante deposee',
    vagueSti ? `placements ${sti.tag} — balise sans suffixe de maturite, verifier qu'ils sont bien courants`
      : sti.tag ? `placements ${sti.tag}`
      : residual ? `AUCUN placement trouve mais ${b(residual)} d'actifs courants inexpliques — verifier le 10-Q`
      : 'aucun placement court terme (coherent avec le bilan)',
    debtCheck,
  ].join(' · ')

  const warn = (bundled || residual || vagueSti || (gap != null && gap >= Math.max(1e6, debt * 0.02))) || null

  return { symbol, quarter: end, used, warn, lines }
}

async function facts(symbol, cik) {
  const r = await fetch(`https://data.sec.gov/api/xbrl/companyfacts/CIK${String(cik).padStart(10, '0')}.json`, HEAD)
  if (r.status === 404) return null
  if (!r.ok) throw new Error(`SEC a repondu ${r.status} pour ${symbol}`)
  return (await r.json()).facts
}

/** Table ticker -> CIK publiee par la SEC. */
async function cikMap() {
  const r = await fetch('https://www.sec.gov/files/company_tickers.json', HEAD)
  if (!r.ok) throw new Error(`table des CIK indisponible (${r.status})`)
  const j = await r.json()
  return new Map(Object.values(j).map((e) => [e.ticker.toUpperCase(), e.cik_str]))
}

/** Tickers de companies.ts sans metrique Net debt.
 * NOTE : « cote aux Etats-Unis » est deduit de l'absence de point dans le ticker,
 * ce qui attrape aussi les ADR (TSM, ASML, BABA, ASX, PAGS...). Ceux-la deposent
 * un 20-F annuel sans bilan trimestriel et tombent au piege 1 plus loin — cette
 * liste est un plafond, pas un rendement. */
export async function missing() {
  const { readFileSync } = await import('fs')
  const s = readFileSync(new URL('../src/data/companies.ts', import.meta.url), 'utf8')
  const marks = [...s.matchAll(/^\s*ticker: '([^']+)',\s*$/gm)]
  return marks
    .map((m, i) => ({ t: m[1], body: s.slice(m.index, i + 1 < marks.length ? marks[i + 1].index : s.length) }))
    .filter((r) => !r.t.includes('.') && !r.body.includes("label: 'Net debt'"))
    .map((r) => r.t)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2)
  const symbols = args[0] === '--missing' ? await missing() : args
  if (symbols.length === 0) {
    console.error('Usage: node scripts/netdebt.mjs <TICKER...> | --missing')
    process.exit(1)
  }

  console.error(`${symbols.length} ticker(s) via SEC XBRL. User-Agent : ${UA}\n`)
  const map = await cikMap()

  for (const s of symbols) {
    const cik = map.get(s.toUpperCase())
    if (!cik) { console.error(`SAUTE  ${s.padEnd(6)} absent de la table des CIK — non depose aupres de la SEC`); continue }
    let r
    try {
      r = compute(s, await facts(s, cik))
    } catch (e) {
      console.error(`SAUTE  ${s.padEnd(6)} ${e.message}`)
      continue
    }
    if (r.skip) { console.error(`SAUTE  ${s.padEnd(6)} ${r.skip}`); continue }
    console.error(`${r.warn ? 'VERIF ' : 'OK    '} ${s.padEnd(6)} bilan ${r.quarter} · ${r.used}`)
    console.log(`// ${s}`)
    if (r.warn) console.log(`// A VERIFIER — ${r.used}`)
    for (const l of r.lines) console.log(l)
    await new Promise((res) => setTimeout(res, 120)) // SEC : 10 requetes/seconde maximum
  }
}
