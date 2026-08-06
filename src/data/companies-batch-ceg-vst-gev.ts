/* Batch add: CEG (Constellation Energy), VST (Vistra), GEV (GE Vernova) —
 * the three anchor names in the AI value chain's energy & grid layer that
 * had no deep-dive entry despite being referenced on the constellation page.
 * Same schema and voice as src/data/companies.ts; kept as a standalone file
 * to avoid merge conflicts with parallel research on other tickers. */

import type { Company } from './companies'

export const companiesBatch: Record<string, Company> = {
  CEG: {
    ticker: 'CEG',
    name: 'Constellation Energy Corporation',
    tagline:
      'The largest competitive nuclear fleet in the US, now selling reactor output directly to hyperscalers on 20-year contracts — the electron supplier restarting Three Mile Island for Microsoft.',
    sector: 'ENERGY & SPACE',
    asOf: '2026.08',
    chain: {
      intro:
        'Constellation (spun off from Exelon in 2022, Baltimore, MD) owns roughly 22 GW of nuclear generation — about one-fifth of all US nuclear capacity, the largest fleet of any operator — plus, since closing its ~$21.8B acquisition of Calpine on January 7, 2026, another ~23 GW of gas and geothermal generation. The combined ~55 GW makes Constellation the largest private-sector power producer in the US, serving roughly 2.5 million retail customers. Its nuclear fleet is the reason it sits at the center of the AI power story: reactors run flat-out, carbon-free, 24/7, which is exactly the load profile hyperscalers want for always-on training and inference and cannot get from wind or solar.',
      rows: [
        { level: 'Nuclear fuel / fabrication', players: 'Westinghouse, Centrus, Cameco', position: 'Fuel purchaser, not producer — not exposed upstream', tone: 'none' },
        { level: 'Grid equipment / turbines', players: 'GEV, Siemens Energy, Mitsubishi Heavy', position: 'Equipment buyer, not maker — not exposed', tone: 'none' },
        { level: 'Power generation / utilities', players: 'CEG, VST, NRG, PEG', position: 'Largest US nuclear generator; largest private power producer post-Calpine', tone: 'core' },
        { level: 'Nuclear baseload', players: 'CEG (~22 GW, ~20% of US nuclear), VST, TLN', position: 'Core business — dominant, hardest-to-replicate fleet', tone: 'core' },
        { level: 'Wholesale / capacity markets', players: 'PJM, ISO-NE, NYISO, MISO', position: 'Sells capacity and energy across multiple RTOs', tone: 'core' },
        { level: 'AI datacenter / hyperscaler', players: 'Microsoft, Meta', position: 'Direct 20-year PPA counterparties — the primary new demand source', tone: 'client' },
      ],
      segments: [
        'Generation: ~22 GW nuclear (largest US fleet) plus, post-Calpine (closed Jan 7, 2026), ~23 GW of natural gas and geothermal — combined ~55 GW across nuclear, gas, geothermal, hydro, wind and solar',
        'Commercial & retail: energy supply to homes, businesses and public-sector customers across multiple US regions; ~2.5 million customers post-Calpine',
        'Nuclear relicensing/uprate pipeline: the restart of Unit 1 at the former Three Mile Island site (renamed the Crane Clean Energy Center) is the highest-profile single project — targeted for a possible 2027 in-service date, originally guided to 2028, backed by roughly $1.6B of restart capex',
        'March 2026: agreed to sell a set of PJM generation assets to LS Power as part of the FERC/DOJ antitrust resolution of the Calpine transaction — a real, sourced regulatory concession, not a rumor',
      ],
      aiShift:
        'Hyperscalers training and serving frontier models need firm, carbon-free, 24/7 power — a load shape renewables alone cannot supply and merchant gas can only supply with carbon offsets. Nuclear baseload fits that need almost exactly, and it is scarce: no new large reactor has come online in the US outside Vogtle in decades, so the entire addressable supply is existing fleets like Constellation\'s. Microsoft\'s 20-year PPA to restart Crane/Three Mile Island Unit 1 (FERC granted a waiver advancing the restart in June 2026) and Meta\'s 20-year PPA for the full 1,121 MW output of the Clinton Clean Energy Center (signed June 2025, delivery from June 2027, plus a 30 MW uprate) are the two clearest, most-cited examples of this trade — hyperscalers paying up for contracted, existing or soon-to-restart nuclear rather than waiting years for new capacity to be built.',
    },
    valuation: {
      peers: ['CEG', 'VST', 'NRG', 'PEG'],
      metrics: [
        { label: 'Price', values: ['~$276 (early Aug 2026 — see sourceNote, quotes varied $258–$310 across aggregators in the days around Aug 4–5, 2026)', '$143.23 (Aug 4, 2026 close)', '$120.99 (Aug 5, 2026)', '~$78 (late Jul 2026)'] },
        { label: 'Market cap', values: ['~$98.5B (computed: 357.1M shares × ~$276)', '~$48.4B (computed: 337.8M shares × $143.23)', '~$25.5–28.0B (sources vary)', '~$39.8B'] },
        { label: 'Trailing P/E', values: ['21.2x', '25.1x', '161.6x (GAAP-distorted by a one-time item — treat with real caution)', '17.0x'] },
        { label: 'Forward P/E', values: ['~21.2x (repeated near-flat vs trailing across sources — plausibly reflects GAAP vs the $11–12 adjusted-operating-EPS guide, not independently reconciled)', '16.3x', 'N/A — not sourced', 'N/A — not sourced'] },
        { label: 'EV/EBITDA', values: ['13.9x', '10.7x (ranged 9.3x–12.8x across 2026 snapshots)', '~10–16x (wide variance across sources)', '14.8x'] },
        { label: 'P/S', values: ['~3.3x (computed: $98.5B ÷ $29.9B TTM revenue)', '2.9x', '~1.4x EV/Revenue (P/S not independently sourced)', '~3.1x (computed: $39.8B ÷ $12.8B TTM revenue)'] },
        { label: 'P/B', values: ['2.7x', '17.5x (stands out vs peers — plausibly reflects years of aggressive buybacks shrinking book equity; not independently reconciled)', 'N/A — not sourced', 'N/A — not sourced'] },
        { label: 'ROE', values: ['16.1%', '17.3%', '15.3%', '13.4%'] },
        { label: 'Net margin', values: ['12.7% (TTM)', '11.5%', '~5% (recent FY)', '17.7% (TTM)'] },
        { label: 'Gross margin', values: ['23.3% (TTM)', '38.6%', 'N/A — not sourced', 'N/A — not sourced'] },
        { label: 'Beta', values: ['1.09', '1.41', '~1.2–1.3 (sources vary)', 'N/A — not sourced'] },
        { label: 'Dividend yield', values: ['0.69% ($1.71/yr, $0.4265/qtr confirmed via Aug 4, 2026 declaration)', '0.58%', '1.32%', '3.5%'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'At ~21x trailing/forward earnings, CEG trades roughly in line with PEG (17.0x) and well below NRG\'s GAAP-distorted 161.6x — not the AI-infrastructure premium multiple LRCX or BE command, despite arguably the scarcest contracted asset in the whole value chain (irreplaceable nuclear baseload)',
        'EV/EBITDA of 13.9x sits mid-pack against the utility peer group (10x–16x range across NRG reads, 14.8x for PEG) — the market is not yet pricing CEG as a structural AI winner the way it prices semiconductor-equipment or fuel-cell names',
        'Q2 2026 was a real beat (EPS $2.55 vs $2.34 consensus, +$0.21) but revenue of $7.5B missed the $7.7B estimate, and full-year adjusted operating EPS guidance of $11–12 was reaffirmed, not raised — the market read this as "on track," not "accelerating"',
        'P/B of 2.7x is unremarkable for a capital-intensive utility; the modest multiple looks more like "regulated-utility-plus-optionality" pricing than "AI-scarcity-asset" pricing',
      ],
      justifiedIf: [
        'The Crane/Three Mile Island restart (Microsoft PPA) and the Clinton uprate (Meta PPA) both hit their 2027 in-service targets without a cost overrun or delay',
        'Calpine integration proceeds cleanly post the LS Power divestiture, and the combined ~55 GW fleet delivers the synergies management guided to at close',
        'PJM and other RTOs continue clearing capacity auctions near the $325/MW-day FERC-approved price collar ceiling, which directly lifts merchant nuclear economics',
        'No additional large hyperscaler PPA defers or repriced lower as AI capex plans get revisited',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$240 – $260', rationale: 'Near the 52-week low ($243.30) — a meaningful discount to the ~$412.70 52-week/2026 intraday high' },
        { tier: 'acceptable', range: '$260 – $320', rationale: 'Current trading zone through the March 2026 local high ($310.02) — defensible accumulation, not a gift' },
        { tier: 'expensive', range: '>$360', rationale: 'Approaching the prior closing-ATH area ($346.32, Jan 2025) and the $360–380 average analyst price-target band — thinning margin of safety' },
      ],
      technical: [
        '52-week range $243.30 – $412.70 (2026); note the $412.70 intraday level exceeds the prior all-time closing high of $346.32 set Jan 24, 2025 — so the true post-2025 high sits within the current 52-week window, not before it',
        'Stock is down roughly 22% over the trailing 52 weeks per aggregator reads even as it sits well above its 52-week low — a genuinely volatile, not a smoothly trending, name in 2026',
        'Average analyst price target ~$353–360 (consensus "Buy"), 20–30% above the ~$276 level used here',
        'Price quotes were unusually inconsistent across aggregators in early Aug 2026 ($258 to $310 range) — plausibly real day-to-day volatility around the Calpine-integration and PJM-auction news flow rather than a data error; treat the $276 reference price as directional',
      ],
      scenarios: [
        { label: 'BASE', prob: 45, note: 'Calpine integration and the Crane/Clinton PPAs proceed on the guided timeline, FY2026 lands inside the $11–12 adjusted-EPS guide — grinds toward $320–360 over 12–24 months.' },
        { label: 'BULL', prob: 25, note: 'A new large hyperscaler nuclear PPA is announced, PJM capacity prices stay pinned near the $325/MW-day collar ceiling, and the restart timeline pulls forward — retests or exceeds the $412.70 high.' },
        { label: 'BEAR', prob: 30, note: 'A Crane/TMI restart delay or cost overrun, political/ratepayer backlash against data-center-driven capacity prices, or an AI-capex pause that softens hyperscaler PPA demand — retraces toward $220–245.' },
      ],
      horizon: '12–24 months',
      invalidation: 'Weekly close below $220 (below the 52-week low, breaking the 2026 base)',
    },
    risks: [
      { risk: 'Ratepayer / political backlash', severity: 'high', note: 'PJM\'s capacity auction cleared at the FERC-approved $325/MW-day price ceiling — a direct benefit to CEG\'s merchant fleet, but also a direct, visible cost to consumers that has already drawn political scrutiny over data-center-driven price increases.' },
      { risk: 'Nuclear restart/uprate execution', severity: 'high', note: 'The Crane (Three Mile Island) restart carries an estimated ~$1.6B capex bill and has already seen its in-service target move between 2027 and 2028; NRC and community review (a federal hearing on the restart was held in 2026) adds real timeline risk.' },
      { risk: 'Calpine integration / antitrust', severity: 'medium', note: 'The March 2026 agreement to sell PJM generation assets to LS Power was a condition of FERC/DOJ clearing the Calpine deal — a real regulatory concession that trims the combined fleet\'s footprint versus the original deal thesis.' },
      { risk: 'Hyperscaler counterparty concentration', severity: 'medium', note: 'Microsoft (Crane) and Meta (Clinton) are the two named anchor 20-year PPAs; both are investment-grade counterparties, but a broader AI-capex slowdown could chill the pipeline of additional deals the market is implicitly pricing in.' },
      { risk: 'Leverage from the Calpine deal', severity: 'medium', note: 'The ~$21.8B Calpine acquisition was partly debt-funded; integration costs and the LS Power divestiture proceeds both affect near-term balance-sheet flexibility.' },
      { risk: 'Nuclear fuel supply chain', severity: 'medium', note: 'US restrictions on Russian-origin enriched uranium have tightened the global enrichment supply chain CEG\'s fleet ultimately depends on, even though Constellation itself does not produce fuel.' },
      { risk: 'Valuation re-rating either direction', severity: 'low', note: 'At ~21x earnings CEG is not priced like a scarcity asset today; a re-rating toward AI-infrastructure multiples would be a tailwind, but the reverse (a de-rating back toward plain-utility multiples if the AI-power narrative cools) is the mirror risk.' },
    ],
    backlog: {
      visibility: [
        'Q2 2026: EPS $2.55 vs $2.34 consensus (beat by $0.21); revenue $7.5B vs $7.7B consensus (a miss)',
        'FY2026 guidance: $11–12 adjusted operating EPS, reaffirmed (not raised) after the Q2 print',
        'Calpine acquisition closed Jan 7, 2026 (~$21.8B), creating a combined ~55 GW fleet serving ~2.5 million customers — the largest private-sector power producer in the US',
        'March 2026: agreed to sell a defined set of PJM generation assets to LS Power to resolve FERC/DOJ antitrust conditions on the Calpine deal',
        'June 2026: FERC granted a waiver advancing the Crane Clean Energy Center (Three Mile Island Unit 1) restart; the plant plans to permanently employ ~600 people (150 returning "boomerang" employees, 450 new hires)',
      ],
      wins: [
        'Microsoft: 20-year PPA (signed 2024) for the full output of the restarted Crane Clean Energy Center (former Three Mile Island Unit 1) — targeted in-service as early as 2027, originally guided to 2028',
        'Meta: 20-year PPA (signed June 2025) for the full 1,121 MW output of the Clinton Clean Energy Center in Illinois, starting June 2027, including a 30 MW plant uprate — keeps the plant running past the 2027 expiration of an Illinois zero-emission tax credit',
      ],
      clients: ['Microsoft', 'Meta', 'PJM and other regional wholesale markets', '~2.5 million retail customers (post-Calpine)'],
      suppliers: ['Westinghouse (nuclear fuel and services)', 'LS Power (divestiture counterparty under the Calpine antitrust settlement)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 5, note: 'The largest US nuclear fleet plus, post-Calpine, the largest private power producer overall — an essentially irreplaceable asset base in a market with no new large reactors coming online.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Direct, named 20-year PPAs with Microsoft and Meta for existing/restarted nuclear output — about as close to a pure, contracted AI-power trade as exists in public markets.' },
        { criterion: 'Valuation', stars: 4, note: 'At ~21x earnings and 2.7x book, CEG is not priced like a scarcity asset — arguably cheap relative to the strategic value of the fleet, though a utility-style multiple is also the market\'s honest read of regulatory and political risk.' },
        { criterion: 'Execution risk', stars: 3, note: 'The Crane restart timeline has already moved once; Calpine integration and the LS Power divestiture both add near-term complexity.' },
        { criterion: 'Entry timing', stars: 3, note: 'A real, if noisy, pullback from the 2026 highs offers a reasonable entry window, but price data was unusually inconsistent across sources in early Aug 2026 — size accordingly.' },
      ],
      readLabel: 'CONSTRUCTIVE — SCARCITY VALUE ON CONTRACTED NUCLEAR BASELOAD',
      summary:
        'Constellation owns the single hardest-to-replicate asset in the AI power trade: an irreplaceable, 22 GW nuclear fleet now being directly contracted by Microsoft and Meta on 20-year terms for exactly the firm, carbon-free, always-on power AI data centers need and cannot get from renewables. The Calpine deal roughly doubled the fleet and made CEG the largest private power producer in the US, though it came with real regulatory friction (the LS Power divestiture) and integration risk. What is notable is that none of this is priced like a scarcity premium yet — CEG trades at a plain-utility-adjacent ~21x earnings, not the 30–60x multiples the market assigns to other AI-infrastructure picks-and-shovels names. The gating factors are execution (the Crane/Three Mile Island restart has already slipped once) and politics (PJM capacity prices at the FERC ceiling are a direct tailwind for CEG and a direct, visible cost for ratepayers, which invites regulatory blowback). This reads as a name to accumulate on volatility rather than chase, with position sizing reflecting genuinely noisy near-term price data.',
    },
    sourceNote:
      'Compiled Aug 2026 via live web research (WebSearch across stockanalysis.com, Yahoo Finance, CNBC, Utility Dive, Power Engineering, World Nuclear News, SEC filings and Constellation/GE Vernova/Vistra press releases; direct WebFetch to most financial-data sites returned HTTP 403 and could not be used, so figures rely on search-engine-summarized snippets from those sites, cross-checked across multiple independent queries where possible). Business facts (Calpine close date and size, Microsoft/Meta PPA terms, LS Power divestiture, FERC capacity price collar, Q2 2026 EPS/revenue) were corroborated across 2+ independent sources each. Price and market cap were not: aggregator snapshots for CEG ranged from ~$248 to ~$310 across queries run within the same research pass in early Aug 2026, which may reflect genuine day-to-day/intraday volatility around Calpine-integration and PJM-auction news rather than stale data — the ~$276 figure used here is a middle estimate (implied by a ~$98.5B market cap ÷ 357.1M shares outstanding, both independently sourced) and should be treated as directional, not precise. P/E, P/S and other computed ratios inherit that same uncertainty. Cross-check current price and multiples before acting on anything here.',
  },

  VST: {
    ticker: 'VST',
    name: 'Vistra Corp.',
    tagline:
      'Texas\'s largest competitive power generator — a dispatchable gas-and-nuclear fleet now signing 20-year PPAs with Amazon and Meta and stacking on nuclear uprates for the AI load surge.',
    sector: 'ENERGY & SPACE',
    asOf: '2026.08',
    chain: {
      intro:
        'Vistra (Dallas, TX; the former TXU Energy generation business, publicly independent since 2016) operates roughly 43.7 GW of generation across ERCOT (Texas), PJM and other markets — the second-largest competitive nuclear fleet in the US (6,448 MW, including Comanche Peak in Texas and PJM plants Perry and Davis-Besse) layered on top of a large dispatchable gas fleet (~26,000 MW) plus legacy coal (~4,570 MW) and a growing solar/battery portfolio (~1,421 MW). Where Constellation is the pure-nuclear-baseload story, Vistra is the "dispatchable power plus optionality" story: gas that can ramp to meet AI-load spikes today, and a nuclear fleet with real uprate potential for the 2030s.',
      rows: [
        { level: 'Fuel supply (gas, coal, uranium)', players: 'Permian Basin gas, Westinghouse fuel services', position: 'Fuel purchaser and hedger, not a producer', tone: 'none' },
        { level: 'Grid equipment / turbines', players: 'GEV, Siemens Energy, Mitsubishi Heavy', position: 'Equipment buyer for new gas builds — not exposed as a maker', tone: 'none' },
        { level: 'Power generation / utilities', players: 'VST, CEG, NRG, TLN', position: 'Largest ERCOT competitive generator; 2nd-largest US competitive nuclear fleet', tone: 'core' },
        { level: 'Dispatchable + nuclear baseload', players: 'VST (~26 GW gas, 6.4 GW nuclear), CEG, TLN', position: 'Core business — the flexible complement to pure-nuclear peers', tone: 'core' },
        { level: 'Retail energy supply', players: 'Vistra retail brands (TXU Energy and others)', position: 'Vertically integrated retail arm supports margin stability', tone: 'core' },
        { level: 'AI datacenter / hyperscaler', players: 'Amazon Web Services, Meta', position: 'Direct 20-year PPA counterparties for nuclear output and uprates', tone: 'client' },
      ],
      segments: [
        'Generation fleet (~43.7 GW as of late 2025): ~26,000 MW natural gas (combined cycle, combustion turbine, steam), 6,448 MW nuclear, 4,570 MW coal, 1,421 MW solar/battery storage',
        'Growth capacity under construction/agreement: 860 MW of new gas units at the Permian Basin plant; ~630 MW Coleto Creek coal-to-gas conversion; pending $4.7B Cogentrix acquisition adding 5.5 GW of modern gas capacity (expected to close 2H 2026)',
        'Retail: vertically integrated supply to residential/commercial/industrial customers, mainly in deregulated ERCOT (Texas)',
        'Nuclear uprate pipeline: up to ~3.2 GW of potential additional capacity across Comanche Peak and the PJM Beaver Valley/Perry/Davis-Besse fleet, though most uprates are not expected online before 2031',
      ],
      aiShift:
        'AI data centers need power now, and grid interconnection queues run years — Vistra\'s answer is a large, already-built dispatchable gas fleet that can be contracted or expanded faster than new nuclear, plus a real (if longer-dated) nuclear uprate option. In March 2026, Vistra signed a 20-year PPA with Amazon Web Services for up to 1,200 MW from the Comanche Peak nuclear plant in Texas (delivery from Q4 2027, ramping to full capacity by 2032, with roughly 200 MW of potential uprate). Separately, Vistra signed 20-year PPAs with Meta for more than 2,600 MW of energy, capacity and uprates across its PJM nuclear fleet (Perry capacity from Dec 2026, Davis-Besse from Dec 2027, with uprates phased in from 2031 through 2034). Together these anchor Vistra\'s nuclear economics for two decades while its gas fleet remains the flexible, faster-to-market complement.',
    },
    valuation: {
      peers: ['VST', 'CEG', 'NRG', 'TLN'],
      metrics: [
        { label: 'Price', values: ['$143.23 (Aug 4, 2026 close, down from a $155.94 prior close)', '~$276 (early Aug 2026, see CEG entry)', '$120.99 (Aug 5, 2026)', '$329.65 (Aug 5, 2026)'] },
        { label: 'Market cap', values: ['~$48.4B (computed: 337.8M shares × $143.23)', '~$98.5B', '~$25.5–28.0B (sources vary)', '~$15.0B'] },
        { label: 'Trailing P/E', values: ['25.1x', '21.2x', '161.6x (GAAP-distorted — treat with caution)', '-436.3x (a large GAAP loss/impairment, not an operating signal)'] },
        { label: 'Forward P/E', values: ['16.3x', '~21.2x', 'N/A — not sourced', '16.4x'] },
        { label: 'EV/EBITDA', values: ['10.7x (ranged 9.3x–12.8x across 2026 snapshots)', '13.9x', '~10–16x (wide variance across sources)', 'N/A — not sourced'] },
        { label: 'P/S', values: ['2.9x', '~3.3x', '~1.4x EV/Revenue (P/S not independently sourced)', 'N/A — not sourced'] },
        { label: 'P/B', values: ['17.5x (stands out — see note below)', '2.7x', 'N/A — not sourced', 'N/A — not sourced'] },
        { label: 'ROE', values: ['17.3%', '16.1%', '15.3%', 'N/A — not sourced (distorted by the GAAP loss)'] },
        { label: 'Net margin', values: ['11.5%', '12.7% (TTM)', '~5% (recent FY)', 'N/A — not sourced'] },
        { label: 'Gross margin', values: ['38.6%', '23.3% (TTM)', 'N/A — not sourced', 'N/A — not sourced'] },
        { label: 'Beta', values: ['1.41', '1.09', '~1.2–1.3 (sources vary)', 'N/A — not sourced'] },
        { label: 'Dividend yield', values: ['0.58%', '0.69%', '1.32%', 'N/A — not sourced (does not appear to pay a regular dividend)'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'Vistra is the cheapest of the group on EV/EBITDA (10.7x vs 13.9x for CEG) despite arguably the strongest near-term growth story — Q1 2026 revenue was up 43% YoY and net income swung from a $268M loss to a $1.03B profit',
        'The P/B of 17.5x is a genuine outlier versus every other name in this table; it most plausibly reflects years of large share buybacks shrinking book equity rather than a market that thinks Vistra\'s hard assets are worth 17x their carrying value — flagged, not smoothed over, because it was not independently reconciled in this pass',
        'Forward P/E of 16.3x, well below the 25.1x trailing figure, implies the market expects real earnings growth as Cogentrix closes and the Meta/AWS PPAs begin contributing — none of which is in the reaffirmed 2026 guidance',
        'A 1.41 beta is the highest in this peer group — Vistra is the most Texas-grid- and commodity-exposed name here, which cuts both ways in a genuine ERCOT demand surge',
      ],
      justifiedIf: [
        'The Cogentrix acquisition ($4.7B, 5.5 GW of gas capacity) closes on schedule in 2H 2026 without integration surprises',
        'The AWS Comanche Peak PPA (up to 1,200 MW from Q4 2027) and the Meta PJM nuclear PPAs (2,600+ MW, phased from Dec 2026) both convert to delivered, contracted revenue on schedule',
        'ERCOT and PJM capacity/energy prices stay firm as data-center load growth continues to outrun new supply',
        'No major weather event (an ERCOT-grid stress episode akin to Winter Storm Uri) forces a large unplanned capex or liability event',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$120 – $140', rationale: 'Near the 52-week low ($132.66) through the Aug 4, 2026 close — a meaningful discount to the ~$219.82 2026 high' },
        { tier: 'acceptable', range: '$140 – $180', rationale: 'Current-to-moderate trading range; scaling in here is defensible given the reaffirmed 2026 guide' },
        { tier: 'expensive', range: '>$205', rationale: 'Approaching the 52-week/2026 high ($219.82) — thin margin of safety above it' },
      ],
      technical: [
        '52-week range $132.66 – $219.81/$219.82 (sources vary by a cent) — the 2026 high exceeds the prior all-time closing high of $191.56 set Jan 23, 2025, so the true post-2025 high sits inside the current 52-week window',
        'Aug 4, 2026 saw an unusually large single-day move, closing $143.23 versus a $155.94 prior close (roughly -8%) — timing lines up with the run-up to Q1/Q2 2026 earnings territory and general pre-earnings positioning ahead of the Aug 7, 2026 report; not independently confirmed as earnings-related in this pass',
        'Current price sits roughly 35% below the 52-week high and about 8% above the 52-week low — a genuinely volatile 12-month range, not a smooth trend',
      ],
      scenarios: [
        { label: 'BASE', prob: 40, note: 'Cogentrix closes on schedule, the Meta/AWS nuclear PPAs begin contributing on the guided timeline — grinds toward $180–210 over 12–24 months.' },
        { label: 'BULL', prob: 25, note: 'ERCOT/PJM demand growth outruns new supply further, additional hyperscaler PPAs are signed, nuclear uprate timelines pull forward — retests or exceeds the ~$220 high.' },
        { label: 'BEAR', prob: 35, note: 'A natural-gas price collapse compresses spark spreads, an ERCOT grid-stress event forces unplanned capex, or Cogentrix integration disappoints — retraces toward $110–130.' },
      ],
      horizon: '12–24 months',
      invalidation: 'Weekly close below $110 (below the 52-week low, breaking the 2026 base)',
    },
    risks: [
      { risk: 'Commodity / power-price exposure', severity: 'high', note: 'Vistra\'s gas fleet (~26 GW) is the largest single piece of its capacity — natural gas and ERCOT/PJM power-price swings flow directly through merchant generation economics even with hedging in place.' },
      { risk: 'Texas grid volatility', severity: 'high', note: 'As the largest ERCOT generator, Vistra is directly exposed to Texas grid-stress events (the kind that produced Winter Storm Uri in 2021) — both as an operational and a potential liability risk.' },
      { risk: 'M&A integration / leverage', severity: 'medium', note: 'The pending $4.7B Cogentrix acquisition (5.5 GW of gas capacity, expected to close 2H 2026) is on top of an already active M&A program — integration risk and balance-sheet leverage both increase before the deal closes.' },
      { risk: 'Nuclear uprate/relicensing timeline', severity: 'medium', note: 'Most of the contracted nuclear uprate capacity under the Meta and AWS PPAs is not expected online before 2031, and NRC relicensing/engineering review adds real multi-year execution risk to that tail of value.' },
      { risk: 'New-build interconnection delays', severity: 'medium', note: 'The 860 MW Permian Basin gas build and the Coleto Creek coal-to-gas conversion both depend on equipment lead times and interconnection queues that have stretched across the sector.' },
      { risk: 'Valuation outlier (P/B)', severity: 'medium', note: 'A P/B of 17.5x is far outside this peer group and was not independently reconciled in this research pass — worth specific diligence before treating it as a "cheap on book value" read.' },
      { risk: 'Retail/regulatory competition', severity: 'low', note: 'Vistra\'s retail arm operates in a deregulated Texas market that remains subject to periodic regulatory review, though this has historically been a stable, lower-risk piece of the business.' },
    ],
    backlog: {
      visibility: [
        'Q1 2026: revenue $5.64B (+43% YoY vs $3.93B in Q1 2025); net income $1.03B (vs a $268M net loss in Q1 2025); adjusted EBITDA $1.494B, a record calendar-Q1 figure',
        'FY2026 guidance reaffirmed: adjusted EBITDA of $6.8B–$7.6B; adjusted free cash flow before growth of $3.925B–$4.725B — both figures explicitly exclude any contribution from the pending Cogentrix acquisition or the Meta PPA',
        'Pending: $4.7B Cogentrix acquisition (5.5 GW of modern gas capacity), expected to close 2H 2026',
        'Under construction/agreement: 860 MW of new gas units at the Permian Basin Power Plant; ~630 MW Coleto Creek coal-to-gas conversion',
      ],
      wins: [
        'Amazon Web Services: 20-year PPA for up to 1,200 MW from the Comanche Peak nuclear plant (Texas) — delivery from Q4 2027, ramping to full capacity by 2032, with roughly 200 MW of potential further uprate',
        'Meta: 20-year PPAs for more than 2,600 MW of energy, capacity and uprates across Vistra\'s PJM nuclear fleet — Perry capacity from Dec 2026, Davis-Besse from Dec 2027, with plant uprates phased in from 2031 through 2034',
        'Up to ~3.2 GW of additional contractable nuclear capacity identified across Comanche Peak and the Beaver Valley/Perry/Davis-Besse PJM fleet',
      ],
      clients: ['Amazon Web Services', 'Meta', 'TXU Energy retail customer base (Texas)'],
      suppliers: ['Cogentrix (pending $4.7B acquisition target)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 4, note: 'Largest competitive generator in ERCOT plus the #2 competitive nuclear fleet in the US — a genuinely diversified, dispatchable-plus-baseload asset base.' },
        { criterion: 'AI growth exposure', stars: 4, note: 'Named 20-year PPAs with both Amazon Web Services and Meta anchor real, contracted nuclear demand, layered on a gas fleet that can respond to load growth faster than new nuclear can be built.' },
        { criterion: 'Valuation', stars: 3, note: 'Cheapest of the peer group on EV/EBITDA, but the outlier P/B (17.5x) and wide multiple variance across sources argue for real diligence, not a reflexive "cheap" read.' },
        { criterion: 'Risk', stars: 3, note: 'Commodity, Texas-grid and M&A-integration risk all stack on a beta (1.41) that is the highest in this peer set.' },
        { criterion: 'Entry timing', stars: 3, note: 'A large single-session drop into Aug 4, 2026 (down from $155.94 to $143.23) sits well below the 2026 high — a real pullback, though the reason for the drop was not independently confirmed in this pass.' },
      ],
      readLabel: 'CONSTRUCTIVE — DISPATCHABLE POWER FOR THE AI-DRIVEN LOAD SURGE',
      summary:
        'Vistra is the complement to Constellation\'s pure-nuclear story: a large, flexible, already-built dispatchable gas fleet layered on the country\'s second-largest competitive nuclear fleet, now anchored by real 20-year PPAs with Amazon Web Services (Comanche Peak) and Meta (the PJM nuclear plants). The Q1 2026 turnaround — from a $268M loss to a $1.03B profit on 43% revenue growth — and the pending $4.7B Cogentrix acquisition both point to real near-term earnings momentum that is not yet reflected in the reaffirmed 2026 guidance. The catch is that Vistra carries the most commodity and Texas-grid exposure of any name in this group, and one specific data point in this research pass — a P/B of 17.5x, well outside the peer range — deserves independent verification before being treated as a valuation signal either way. This reads as a name worth owning for the dispatchable-power thesis, sized for real commodity and grid-event volatility rather than treated as a bond-like nuclear-scarcity play.',
    },
    sourceNote:
      'Compiled Aug 2026 via live web research (WebSearch across stockanalysis.com, Yahoo Finance, Investing.com, Utility Dive, Power Engineering, World Nuclear News, Eurasia Review/Carbon Credits coverage of the Meta/AWS deals, SEC 8-K filings and Vistra investor-relations press releases; direct WebFetch to most financial-data sites returned HTTP 403 and could not be used). The Aug 4, 2026 closing price ($143.23, down from $155.94) came from a specific, internally consistent dated quote (open $143.90, day low $140.17) and was used as the reference price; other aggregator snapshots in the same research pass showed a materially higher figure (~$162) that appears to reflect a different, likely earlier, snapshot date rather than the same trading session — flagged rather than reconciled. Market cap was computed directly from a separately sourced share count (337.8M) rather than taken from any single aggregator. P/B of 17.5x was reported consistently in search results but could not be independently cross-checked against a balance-sheet source in this pass. Treat all multiples as directional; cross-check current price and guidance before acting on anything here.',
  },

  GEV: {
    ticker: 'GEV',
    name: 'GE Vernova Inc.',
    tagline:
      'The picks-and-shovels of electrification — gas turbines with a decade-long backlog and the grid hardware every new data center needs to actually connect to power.',
    sector: 'ENERGY & SPACE',
    asOf: '2026.08',
    chain: {
      intro:
        'GE Vernova (spun off from General Electric in April 2024, Cambridge, MA) makes the physical equipment that generates and moves electricity: heavy-duty gas turbines and power generation equipment (Power segment), transformers, switchgear and grid software (Electrification segment), and wind turbines (Wind segment). It does not generate or sell power itself — it sells the machines that Constellation, Vistra and every utility and data-center developer need in order to build new capacity or connect it to the grid. That makes GEV the clearest "arms dealer" position in the AI power trade: it benefits from every gigawatt of new gas or grid capacity regardless of which utility or hyperscaler ultimately owns it.',
      rows: [
        { level: 'Raw materials / castings', players: 'Specialty steel, nickel-alloy and electrical-steel suppliers', position: 'Not exposed — an equipment manufacturer, not a materials producer', tone: 'none' },
        { level: 'Power generation equipment', players: 'GEV, Siemens Energy, Mitsubishi Heavy Industries', position: 'Core business — heavy-duty gas turbines, the tightest-supplied piece of the value chain', tone: 'core' },
        { level: 'Grid equipment / electrification', players: 'GEV, Siemens Energy, Hitachi Energy', position: 'Core business — transformers, switchgear, HVDC and grid software', tone: 'core' },
        { level: 'Power generation / utilities', players: 'CEG, VST, NRG, PEG and utilities globally', position: 'Direct equipment customer — ~80% of GEV orders are still traditional utility/industrial buyers', tone: 'client' },
        { level: 'AI datacenter / hyperscaler', players: 'Data-center developers and operators (not individually named in sourced materials)', position: 'Fast-growing but still minority order share — ~20% of orders and rising', tone: 'growth' },
      ],
      segments: [
        'Power: heavy-duty gas turbines and related generation equipment/services — the gas-turbine order backlog reached 116 GW at Q2 2026 (up from 100 GW at Q1 2026), with management targeting a combined 125 GW of backlog plus slot reservations by year-end 2026',
        'Electrification: grid equipment (transformers, switchgear, HVDC) and grid software — booked $2.4B of data-center-related equipment orders in Q2 2026 alone, more than all of 2025; segment guided to 18–20% organic revenue growth and 18–20% EBITDA margin for 2026',
        'Wind: onshore and offshore wind turbines — the structurally weak segment, guided to a low-double-digit organic revenue decline and roughly $400M of EBITDA losses for 2026',
        'Manufacturing capacity is the binding constraint on Power: roughly 10 GW/year of heavy-duty gas turbine output against a 116 GW backlog — close to a decade of committed output already booked — with expansion plans targeting 20 GW annualized output in Q3 2026, 24 GW by 2028, and actions toward 30 GW by 2030',
      ],
      aiShift:
        'Every new gigawatt of AI-driven power demand ultimately has to pass through either a gas turbine or a grid connection — and both are GE Vernova products. Data-center orders reached over $5B year-to-date through Q2 2026, more than double the full-2025 total, and Electrification alone booked $2.4B in data-center equipment orders in Q2 2026, exceeding all of 2025. Still, management\'s own disclosure is that roughly 80% of gas-turbine orders remain "traditional" utility and industrial customers, with data centers at about 20% and rising — a real but still-minority share of demand, not (yet) a company that is majority AI-driven. The gas-turbine backlog of 116 GW against ~10 GW/year of current manufacturing capacity is both the strongest visibility signal in this file and the clearest capacity constraint: turbine slots are effectively sold out into the early 2030s.',
    },
    valuation: {
      peers: ['GEV', 'Siemens Energy (SMNEY/ENR.DE)', 'Mitsubishi Heavy Industries (7011.T)'],
      metrics: [
        { label: 'Price', values: ['$1,006.76 (Aug 4, 2026 close)', '€150.86 (Aug 5, 2026)', '¥4,091 (Aug 4, 2026)'] },
        { label: 'Market cap', values: ['~$270B (computed: ~267M shares × $1,006.76; independently corroborated at ~$273.6B in early Aug 2026 reads)', '~€129.0B (~$159.6B, Jun 2026)', '~¥13.44T (~$80.3B, May 2026)'] },
        { label: 'Trailing P/E', values: ['~29x per most aggregator reads (also seen as high as ~87x on some snapshots) — GAAP EPS has been distorted by one-time gains (Q1 2026 net margin spiked to 50.9%); treat with real caution', '>80x per financial press ("no room for error" framing)', '~51–58x (sources vary)'] },
        { label: 'Forward P/E', values: ['~40–48x across sources (wide variance, not reconciled)', 'N/A — not sourced', 'N/A — not sourced'] },
        { label: 'EV/EBITDA', values: ['~87x on a trailing basis per one aggregator (TTM EBITDA is depressed by ongoing Wind-segment losses); on 2026 guided EBITDA (~$5.5–6.4B at the 12–14% margin guide on $45.5–46.5B revenue) this computes closer to ~42–49x — still rich, but a fairer read of a mid-ramp company', 'N/A — not sourced', 'N/A — not sourced'] },
        { label: 'Revenue growth (2026)', values: ['+22% YoY in Q2 2026; FY2026 guide raised to $45.5–46.5B (from $44.5–45.5B)', '+14–16% comparable growth guided for FY2026', 'roughly flat to -1% guided for FY2026 (per one source)'] },
        { label: 'Gross margin', values: ['~19–21% (sources vary)', 'N/A — not sourced', 'N/A — not sourced'] },
        { label: 'Net margin', values: ['~26% (H1 2026); Q1 2026 alone spiked to ~51% on one-time gains — flagged as non-recurring, not a run-rate figure', 'N/A — not sourced', '~6.9% guided for FY2026'] },
        { label: 'Beta', values: ['1.03', 'N/A — not sourced', 'N/A — not sourced'] },
        { label: 'Dividend yield', values: ['~0.16–0.2% ($0.50/qtr, doubled from $0.25/qtr effective Q1 2026)', 'N/A — not sourced', 'N/A — not sourced'] },
      ],
      verdictTone: 'high',
      verdictPoints: [
        'GEV is priced for exceptional execution: even the more conservative forward-looking EV/EBITDA read (~42–49x on guided 2026 EBITDA) is a rich multiple for an industrial equipment maker, and the trailing GAAP P/E is genuinely hard to pin down across sources (29x to 87x) because one-time gains have distorted recent quarterly earnings',
        'The 116 GW gas-turbine backlog against ~10 GW/year of current capacity is the single strongest visibility argument for the premium — turbine slots are sold out for most of a decade — but it also means near-term revenue growth is capacity-gated, not demand-gated',
        'The Wind segment is a real, quantified drag (~$275–382M of quarterly EBITDA losses in 2026, ~$400M guided for the full year) that keeps consolidated margins and reported EPS messier than the AI-infrastructure narrative alone would suggest',
        'Siemens Energy trades at an even richer trailing multiple (reported >80x) on a similar grid-and-turbine thesis, while Mitsubishi Heavy Industries (~51–58x) sits in between — the entire heavy-electrical-equipment peer group has re-rated sharply on AI-driven demand, not just GEV'
      ],
      justifiedIf: [
        'Manufacturing capacity actually scales as guided (20 GW annualized by Q3 2026, 24 GW by 2028, 30 GW by 2030) without slippage, converting backlog into recognized revenue on schedule',
        'Data-center order share keeps climbing from the current ~20% without a slowdown in AI capex from hyperscalers',
        'Wind-segment losses stabilize near the ~$400M guided figure rather than widening further',
        'The FY2026 guide ($45.5–46.5B revenue, $11.5–12.5B free cash flow) is met or beaten, as it was raised to be after the Q2 2026 print',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$700 – $800', rationale: 'A meaningful discount to current levels, roughly the pre-2026-rally trading zone' },
        { tier: 'acceptable', range: '$850 – $1,050', rationale: 'Current trading zone (spot $1,006.76) — consistent with continued backlog conversion, not a bargain' },
        { tier: 'expensive', range: '>$1,150', rationale: 'Approaching the 2026 all-time high (~$1,175–1,196 depending on source) — minimal margin of safety' },
      ],
      technical: [
        '52-week range $530.16 – ~$1,195.94; a 2026 all-time high was reported between $1,174.86 and $1,195.94 depending on the source (not reconciled to the dollar) — current $1,006.76 sits roughly 15–16% below that high',
        'Jefferies reportedly raised its price target to $1,210 (Buy) around the time of the most recent ATH print, implying limited perceived further upside from already-elevated levels',
        'The stock has been one of the strongest performers in the entire AI-infrastructure trade since its April 2024 spinoff from GE, with the 52-week low ($530.16) itself well above the spinoff price',
      ],
      scenarios: [
        { label: 'BASE', prob: 45, note: 'Gas-turbine and Electrification backlog convert on the guided capacity-expansion timeline, Wind losses hold near $400M — grinds toward $1,100–1,300 over 12–24 months.' },
        { label: 'BULL', prob: 20, note: 'Manufacturing capacity expansion beats the 20/24/30 GW targets, data-center order share keeps climbing past ~20%, Wind reaches breakeven sooner — breaks meaningfully above the ~$1,195 high.' },
        { label: 'BEAR', prob: 35, note: 'A capacity-expansion delay, a widening of Wind losses, a tariff-driven margin hit (guided at $250–350M net impact for 2026), or a broader AI-capex pause — retraces toward $700–850.' },
      ],
      horizon: '12–24 months',
      invalidation: 'Weekly close below $700 (a ~30% drawdown from spot, breaking the 2026 uptrend)',
    },
    risks: [
      { risk: 'Manufacturing capacity constraint', severity: 'high', note: 'Current heavy-duty gas-turbine output is only ~10 GW/year against a 116 GW backlog — a delivery delay or a missed step in the 20/24/30 GW capacity-expansion plan directly delays revenue recognition, not just growth optics.' },
      { risk: 'Valuation / multiple compression', severity: 'high', note: 'Trailing P/E readings ranged from ~29x to ~87x across sources in this pass, and even the more conservative forward EV/EBITDA read (~42–49x on guided 2026 EBITDA) leaves very little room for a guidance miss or a backlog-conversion delay.' },
      { risk: 'Wind segment losses', severity: 'medium', note: 'Quarterly Wind EBITDA losses widened through 2026 ($382M in Q1, $275M in Q2) on weak onshore demand and higher offshore project costs; the ~$400M full-year loss guide is a real drag on consolidated profitability, not a rounding error.' },
      { risk: 'Tariff / trade policy exposure', severity: 'medium', note: 'Management guided to a $250–350M net tariff impact for 2026 — a direct, quantified margin headwind tied to trade policy outside the company\'s control.' },
      { risk: 'Data-center order concentration/reversal', severity: 'medium', note: 'Data-center orders are growing fast (>$5B YTD through Q2 2026, more than double full-2025) but remain roughly 20% of the order book — a sharp AI-capex pullback would hit the highest-growth piece of demand hardest, even if the base utility business held up.' },
      { risk: 'GAAP earnings volatility', severity: 'medium', note: 'One-time gains have materially distorted recent quarterly net margin (a spike to ~50.9% in Q1 2026), making trailing P/E and EV/EBITDA unusually unreliable as valuation anchors in this specific stretch.' },
      { risk: 'Competitive capacity race', severity: 'low', note: 'Siemens Energy and Mitsubishi Heavy Industries are both expanding gas-turbine and grid-equipment capacity in response to the same demand signal — GEV\'s multi-year backlog lead is real today but not permanent.' },
    ],
    backlog: {
      visibility: [
        'Total company backlog: $176B at Q2 2026, up $13B sequentially from Q1 2026',
        'Gas-turbine order backlog: 116 GW at Q2 2026 (up from 100 GW at Q1 2026), targeting a combined 125 GW of backlog plus slot reservations by year-end 2026',
        'Q2 2026: revenue $11.1B (+22% YoY), orders $24.2B (+88% organic), free cash flow $5,107M (vs $194M in Q2 2025)',
        'FY2026 guidance raised twice in 2026: revenue to $45.5–46.5B (from $44.5–45.5B) and free cash flow to $11.5–12.5B (from $6.5–7.5B) after the Q2 2026 beat',
        'Manufacturing capacity expansion targets: 20 GW annualized gas-turbine output by Q3 2026, 24 GW by 2028, actions toward 30 GW by 2030 — largely within the existing manufacturing footprint',
      ],
      wins: [
        'Electrification segment booked $2.4B of data-center-related equipment orders in Q2 2026 alone — more than the whole of 2025',
        'Data-center orders company-wide exceeded $5B year-to-date through Q2 2026, more than double the full-2025 total',
        'Board doubled the quarterly dividend to $0.50/share and raised the buyback authorization to $10B (from $6B) in the Dec 2025 multi-year outlook update, alongside raised medium-term financial targets',
      ],
      clients: ['Utilities and industrial customers (~80% of orders, not individually named in sourced materials)', 'Data-center developers and operators (~20% of orders and rising)'],
      suppliers: [],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 4, note: 'A near-duopoly/oligopoly position in heavy-duty gas turbines alongside Siemens Energy and Mitsubishi Heavy, plus a genuinely essential grid-equipment franchise — offset by a structurally loss-making Wind segment.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Every new gigawatt of AI-driven power demand needs either a gas turbine or a grid connection GEV can supply — data-center orders more than doubled year-to-date through Q2 2026.' },
        { criterion: 'Valuation', stars: 2, note: 'Trailing multiples that range from rich to extreme depending on the source (29x–87x P/E; ~87x trailing EV/EBITDA), even before accounting for GAAP-earnings distortion from one-time gains.' },
        { criterion: 'Backlog / visibility', stars: 5, note: '$176B total backlog and a 116 GW gas-turbine order book against ~10 GW/year of current capacity — close to a decade of committed demand already on the books.' },
        { criterion: 'Risk', stars: 3, note: 'Manufacturing-capacity execution, Wind-segment losses, tariff exposure and unusually volatile GAAP earnings all compound the valuation risk.' },
        { criterion: 'Entry timing', stars: 2, note: 'Trading only ~15–16% below a 2026 all-time high after one of the strongest runs in the entire AI-infrastructure trade — not an obvious dip to buy.' },
      ],
      readLabel: 'CONSTRUCTIVE — THE PICKS-AND-SHOVELS PLAY, PRICED FOR PERFECTION',
      summary:
        'GE Vernova is the clearest "sells to everyone" position in the AI power trade — its gas turbines and grid equipment are needed regardless of which utility, hyperscaler or country ends up owning the generation, and the 116 GW gas-turbine backlog against roughly 10 GW/year of current manufacturing capacity is about as strong a multi-year revenue-visibility signal as exists anywhere in this file. The catch is that almost none of this is a secret: GEV has re-rated into one of the richest multiples among the names covered here, GAAP earnings have been genuinely distorted by one-time gains this year (making the P/E hard to pin down with any precision), and the Wind segment remains a real, quantified drag on consolidated profitability rather than a rounding error. Roughly 80% of orders are still traditional utility/industrial demand, not AI-driven — a reminder that the AI story, while real and accelerating, is still the minority of the book. This is a name to own for the structural, multi-decade electrification thesis, not to chase after a run this large without real conviction on execution.',
    },
    sourceNote:
      'Compiled Aug 2026 via live web research (WebSearch across mgrid.org, Utility Dive, Turbomachinery Magazine, Power Engineering, GE Vernova investor-relations press releases and SEC 8-K filings, windpowermonthly.com, Baird Maritime/reNEWS coverage of Wind-segment results, and financial aggregators; direct WebFetch to SEC.gov filing URLs and most financial-data sites returned HTTP 403 and could not be used). Business and backlog facts (Q1/Q2 2026 revenue, orders, backlog, guidance raises, gas-turbine GW figures, Wind-segment EBITDA losses, tariff guidance, dividend/buyback actions) were corroborated across 2+ independent sources each and are the most reliable content in this entry. Valuation multiples were not: trailing P/E readings for GEV ranged from ~28x to ~87x and EV/EBITDA from the high-40s (on a forward-guidance basis, computed here) to ~87x (trailing, per one aggregator) depending on source and snapshot date, plausibly reflecting real GAAP-earnings distortion from one-time gains this year rather than simple data staleness — both readings are presented rather than collapsed into a single false-precision number. Price ($1,006.76, Aug 4, 2026 close) and the ~$270B market cap were cross-checked against an independently sourced share count (~267M) and against a separately reported ~$273.6B market-cap figure for early Aug 2026, and are reasonably consistent. Cross-check current price and multiples before acting on anything here.',
  },
}
