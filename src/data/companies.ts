/* Per-ticker company deep dives — distinct from the narrative Insights notes.
 * A structured scorecard: value-chain position, valuation vs peers, price
 * zones with probabilistic scenarios (not buy orders — see Ideas.tsx for
 * the same convention), risks, backlog/partnerships, and a scored summary.
 * English-only prototype; not yet wired through the i18n dict. */

export type ChainRow = { level: string; players: string; position: string; tone: 'core' | 'client' | 'growth' | 'none' | 'indirect' }
export type ValuationMetric = { label: string; values: string[] } // aligned to Company.valuation.peers order, company first
export type PriceZone = { tier: 'ideal' | 'acceptable' | 'expensive'; range: string; rationale: string }
export type Risk = { risk: string; severity: 'high' | 'medium' | 'low'; note: string }
export type Scenario = { label: 'BASE' | 'BULL' | 'BEAR'; prob: number; note: string }

export type Company = {
  ticker: string
  name: string
  tagline: string
  sector: string
  asOf: string
  chain: {
    intro: string
    rows: ChainRow[]
    segments: string[]
    aiShift: string
  }
  valuation: {
    peers: string[]
    metrics: ValuationMetric[]
    verdictTone: 'high' | 'fair' | 'low'
    verdictPoints: string[]
    justifiedIf: string[]
  }
  priceMap: {
    zones: PriceZone[]
    technical: string[]
    scenarios: Scenario[]
    horizon: string
    invalidation: string
  }
  risks: Risk[]
  backlog: {
    visibility: string[]
    wins: string[]
    clients: string[]
    suppliers: string[]
  }
  synthesis: {
    scores: { criterion: string; stars: number; note: string }[]
    readLabel: string
    summary: string
  }
  sourceNote: string
}

export const companies: Record<string, Company> = {
  LRCX: {
    ticker: 'LRCX',
    name: 'Lam Research',
    tagline: 'The pure pick-and-shovel play on wafer fabrication equipment — sells the machines, not the chips.',
    sector: 'ENERGY & SPACE',
    asOf: '2026.08',
    chain: {
      intro:
        'LRCX doesn’t make chips or GPUs — it makes the machines required to produce them. That places it upstream of nearly everything AI-adjacent.',
      rows: [
        { level: 'Raw materials', players: 'Silicon, specialty gases', position: 'Not exposed', tone: 'none' },
        { level: 'Equipment (WFE)', players: 'LRCX, AMAT, ASML, TEL, KLAC', position: 'Core business', tone: 'core' },
        { level: 'Fabless / design', players: 'NVIDIA, AMD, Broadcom, Marvell', position: 'Not exposed', tone: 'none' },
        { level: 'Foundry / IDM', players: 'TSMC, Samsung, Intel, Micron', position: 'Direct customers', tone: 'client' },
        { level: 'Advanced packaging', players: 'ASE, Amkor, TSMC CoWoS', position: '>50% growth guided for 2026', tone: 'growth' },
        { level: 'AI / datacenter', players: 'Hyperscalers (Microsoft, Google, Amazon)', position: 'Indirect exposure', tone: 'indirect' },
      ],
      segments: [
        'Etch: ~28% global share (#2 behind AMAT at 32%)',
        'Deposition: leads tungsten (ALTUS), copper (SABRE), ALD (Striker), high-density CVD (SPEED)',
        'Clean: Coronus, Da Vinci, DV-Prime',
        'Advanced packaging: TSV etch, copper plating, PECVD underfill — >50% growth guided for 2026',
      ],
      aiShift:
        'AI demand is spreading from accelerators/HBM into NAND, DRAM (the 1C migration), foundry/logic and advanced packaging. GAA (gate-all-around) complexity and backside power rails multiply the number of etch and deposition steps per wafer. LRCX secured 42% of GAA-related etch wins in 2025.',
    },
    valuation: {
      peers: ['LRCX', 'AMAT', 'KLAC', 'ASML*'],
      metrics: [
        { label: 'Price', values: ['$259.79', '$452.14', '$175.16', '$1,569'] },
        { label: 'Market cap', values: ['$325B', '$359B', '$229B', '$603B'] },
        { label: 'Trailing P/E', values: ['49.2x', '42.5x', '49.6x', '54.2x'] },
        { label: 'Forward P/E', values: ['31.8x', '26.8x', '26.7x', '27.1x'] },
        { label: 'P/B', values: ['30.7x', '15.0x', '39.3x', '~35x'] },
        { label: 'EV/EBITDA', values: ['42.8x', '40.7x', '42.8x', '~30x'] },
        { label: 'P/S', values: ['15.0x', '12.4x', '17.5x', '17.1x'] },
        { label: 'PEG (trailing)', values: ['1.56', '1.20', '1.96', '2.08'] },
        { label: 'ROE', values: ['45.7%', '39.7%', '95.0%', '53.9%'] },
        { label: 'Net margin', values: ['25.7%', '29.3%', '35.7%', '30.1%'] },
        { label: 'Gross margin', values: ['50.0%', '49.0%', '61.4%', '52.7%'] },
        { label: 'Operating margin', values: ['35.0%', '31.9%', '41.2%', '37.1%'] },
        { label: 'Beta', values: ['1.81', '1.57', '1.41', '1.39'] },
        { label: 'Dividend yield', values: ['0.36%', '0.41%', '0.45%', '0.57%'] },
      ],
      verdictTone: 'high',
      verdictPoints: [
        'Forward P/E of 31.8x is a ~20% premium to AMAT (26.8x) and KLAC (26.7x)',
        'P/B of 30.7x is extreme in absolute terms',
        'PEG of 1.56 stays inside the "reasonable growth" zone (<2) but is not a bargain',
      ],
      justifiedIf: [
        'WFE spend confirms at $140B+ in 2026 and management’s "another year of compelling growth" call for 2027 holds',
        'LRCX keeps taking share (SAM expansion toward the high-30s%)',
        'Margins stay structurally elevated (ROE 45%+)',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$220 – $240', rationale: 'Technical support zone post-correction, ~15–20% below spot' },
        { tier: 'acceptable', range: '$240 – $265', rationale: 'Current zone — scaling in here is defensible, not a gift' },
        { tier: 'expensive', range: '>$300', rationale: 'Forward P/E >36x — risk/reward skews unfavorable' },
      ],
      technical: [
        'ATH $438.50 — a ~41% correction from the top',
        '52-week low $90.94 (10:1 split-adjusted; the real recent low is closer to ~$200)',
        'Current $259.79 sits between the 50-day MA ($338) and the 200-day MA ($238)',
        'Key support: $240–250 (March–April 2026 congestion)',
        'Major support: $200–220 (February 2026 gap)',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'Guided WFE growth confirms, share holds — grinds toward the $350–400 analyst consensus over 12–18 months.' },
        { label: 'BULL', prob: 25, note: 'AI capex reaccelerates, GAA/HBM/packaging wins compound, multiple re-rates toward the ~$500 high-end target.' },
        { label: 'BEAR', prob: 25, note: 'WFE cyclicality reasserts, China export controls tighten, a guidance miss resets the multiple — retests $190–200.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $190 (structure break)',
    },
    risks: [
      { risk: 'WFE cyclicality', severity: 'high', note: 'If AI capex slows, foundry/memory spend contracts fast. LRCX is a pure beta play on the cycle (β=1.81).' },
      { risk: 'China exposure', severity: 'high', note: '~30% of revenue has historically been China-linked. US export controls and Chinese retaliation are live risks.' },
      { risk: 'Customer concentration', severity: 'medium', note: 'TSMC, Samsung, Intel, Micron, SK Hynix form a buyer oligopoly — a TSMC capex freeze would be a real shock.' },
      { risk: 'Execution bottleneck', severity: 'medium', note: 'Management flags cleanroom availability, supply-chain readiness and install resources — not demand — as the binding constraint.' },
      { risk: 'AMAT / TEL competition', severity: 'medium', note: 'AMAT leads dielectric etch (32% vs 28%); TEL is advancing in cryogenic ALD.' },
      { risk: 'Valuation', severity: 'medium', note: 'At 31x forward, little margin for error — a guidance miss could mean a 15–20% reset.' },
      { risk: 'Regulatory', severity: 'low', note: 'CHIPS Act support is currently favorable, but there’s tail dependence on US/EU subsidy policy.' },
    ],
    backlog: {
      visibility: [
        '2026 WFE outlook raised to $140B+ (from $135B) with "bias to the upside"',
        'Management confirms 2027 as "another year of compelling WFE growth"',
        'Lengthening lead times — a signal of robust underlying demand',
        'Capex of $332M rising to support a second Malaysia facility (2H 2026)',
        '+900 employees added sequentially across manufacturing, field and R&D',
      ],
      wins: [
        'First dielectric-etch win at a "key foundry/logic manufacturer" (likely TSMC or Samsung)',
        'A mid-ramp Kiyo win — unusually rare to swap equipment mid-ramp, a signal of real technology edge',
        'ALD silicon-carbide low-k films for DRAM 1C cut capacitance >60%; dielectric-deposition DRAM SAM growing >20%',
        'Advanced packaging (TSV etch + copper plating) in strong growth',
        'DRAM hit a record 27% of systems revenue (vs 23% prior), driven by HBM and the 1C migration',
        'Foundry is 54% of systems revenue, +35% YoY',
      ],
      clients: ['TSMC', 'Samsung Foundry', 'Intel', 'Micron', 'SK Hynix', 'Kioxia'],
      suppliers: ['MKS Instruments (vacuum/RF)', 'Ichor Holdings (gas delivery)', 'Advanced Energy (power)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 5, note: 'Oligopolistic position, extreme barriers to entry, high switching costs.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Direct exposure to HBM, GAA and advanced packaging — the three structural AI drivers.' },
        { criterion: 'Valuation', stars: 3, note: 'A premium to peers, defensible on growth, but not a bargain.' },
        { criterion: 'Risk', stars: 3, note: 'Beta 1.8, cyclical, China-exposed — not for the risk-averse.' },
        { criterion: 'Entry timing', stars: 4, note: 'A 41% drawdown from the ATH is a reasonable accumulation zone, not a floor call.' },
      ],
      readLabel: 'CONSTRUCTIVE — PRICE DISCIPLINE MATTERS',
      summary:
        'Exceptional quality sitting at the core of AI’s physical infrastructure. Valuation isn’t cheap, but the drawdown from the ATH opens a reasonable window. The bigger risk here isn’t demand — management is explicit that demand is not the limiting factor — it’s execution and cyclicality.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices, multiples and guidance before acting on anything here.',
  },

  AXTI: {
    ticker: 'AXTI',
    name: 'AXT Inc.',
    tagline: 'A raw-materials supplier making the InP and GaAs substrates AI optics are built on — a speculative micro-cap, not an institutional pick-and-shovel.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'AXTI is not a WFE equipment maker like LRCX or AMAT — it makes the raw substrates (wafers) chips are later etched onto.',
      rows: [
        { level: 'Raw materials', players: 'Indium, gallium, arsenic', position: 'Vertically integrated (Jinmei, BoYu)', tone: 'core' },
        { level: 'Substrates / wafers', players: 'AXTI, Sumitomo, Wafer Works', position: 'Core business', tone: 'core' },
        { level: 'Equipment (WFE)', players: 'LRCX, AMAT, ASML', position: 'Not exposed', tone: 'none' },
        { level: 'Fabless / design', players: 'NVIDIA, Broadcom, Marvell', position: 'Not exposed', tone: 'none' },
        { level: 'Foundry / IDM', players: 'TSMC, Samsung', position: 'Not exposed', tone: 'none' },
        { level: 'Optical / transceivers', players: 'Coherent, Lumentum, II-VI', position: 'Direct customers', tone: 'client' },
        { level: 'AI / datacenter', players: 'Hyperscalers', position: 'End market', tone: 'indirect' },
      ],
      segments: [
        'Indium Phosphide (InP): 50.5% of Q1 2026 revenue — the substrate optical transceivers, EML lasers and photodetectors are built on',
        'Gallium Arsenide (GaAs): 20.1% of revenue — datacenter VCSELs, RF power amps, micro-LEDs',
        'Vertical integration: Jinmei refines high-purity indium, BoYu makes PBN crucibles',
      ],
      aiShift:
        'AI datacenters need ultra-fast optical interconnects (800G/1.6T transceivers), and InP is the substrate those EML lasers and high-speed photodetectors run on. The optical components market could grow 4–6x over 3–5 years, with co-packaged optics (CPO) adding upside from late 2027. AXTI is already used by several US hyperscalers.',
    },
    valuation: {
      peers: ['AXTI'],
      metrics: [
        { label: 'Price', values: ['$38.55'] },
        { label: 'Market cap', values: ['$2.52B (micro-cap)'] },
        { label: 'Trailing P/E', values: ['N/A — unprofitable historically'] },
        { label: 'Forward P/E', values: ['49.5x'] },
        { label: 'P/S (TTM)', values: ['26.3x'] },
        { label: 'P/B', values: ['7.7x'] },
        { label: 'Beta', values: ['1.87'] },
        { label: 'ROE', values: ['-5.9%'] },
        { label: 'Net margin', values: ['-14.9%'] },
        { label: 'Gross margin', values: ['21.3% (29.9% non-GAAP Q1)'] },
        { label: 'Revenue (TTM)', values: ['$95.9M'] },
        { label: 'Cash / Debt', values: ['$123M / $77.6M'] },
      ],
      verdictTone: 'high',
      verdictPoints: [
        'Forward P/E of 49.5x for a company that has only just reached profitability (Q2 2026 guide: $0.06–0.08 EPS)',
        'P/S of 26.3x vs. a 5-year median of 1.48x',
        'Stock is up +590% YTD vs. +35% for the sector — this is priced for perfection, zero room for error',
      ],
      justifiedIf: [
        'The InP backlog (>$100M, a record) converts into delivered revenue on schedule',
        'Capacity expansion to $35M/quarter by end-2026 executes without delay',
        'US export permits keep flowing — the single biggest swing factor by management’s own admission',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$20 – $25', rationale: 'Technical support post-crash, ~45% discount to spot' },
        { tier: 'acceptable', range: '$25 – $40', rationale: 'March–April 2026 congestion zone through current levels' },
        { tier: 'expensive', range: '>$45', rationale: 'Forward P/E >55x, risk/reward unfavorable' },
      ],
      technical: [
        'ATH $143.16 — current $38.55 is a ~73% correction from the top',
        '52-week low $1.85',
        'Extreme volatility: the stock ran $16 → $70 → $38 in 3 months',
        'Key support $32–35 (March 2026 gap); major support $20–25 (February 2026 base)',
      ],
      scenarios: [
        { label: 'BASE', prob: 40, note: 'InP backlog converts on schedule, capacity doubles by end-2026 — grinds toward $60–80 over 12–18 months.' },
        { label: 'BULL', prob: 25, note: 'Hyperscaler supply agreements convert to long-term contracts, CPO upside pulls forward — well above $80.' },
        { label: 'BEAR', prob: 35, note: 'US export permits tighten or a guidance miss hits the fragile early profitability — retests $15–20.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $15 (structure break)',
    },
    risks: [
      { risk: 'US export permits', severity: 'high', note: '"The most significant single factor to our growth" per management. Without permits, AXTI cannot ship to the US at all.' },
      { risk: 'China exposure', severity: 'high', note: '78% of revenue is APAC-linked, with manufacturing and a subsidiary (Tongmei) inside China — maximum geopolitical exposure.' },
      { risk: 'Fragile profitability', severity: 'high', note: 'Q1 was a $1.6M loss; Q2 is the first profitable quarter expected. A miss here could mean a ~30% single-session drop.' },
      { risk: 'Valuation', severity: 'high', note: 'At 49x forward and 26x P/S, any guidance miss is punished hard.' },
      { risk: 'Competition', severity: 'medium', note: 'Coherent is doubling its own InP 6-inch capacity; Sumitomo and Wafer Works are not far behind.' },
      { risk: 'Customer concentration', severity: 'medium', note: 'Top 5 customers = 32% of revenue — worth watching, not yet alarming.' },
      { risk: 'Dilution', severity: 'medium', note: 'A $632.5M capital raise for the Tongmei facility carries dilution risk.' },
    ],
    backlog: {
      visibility: [
        'InP backlog hit a record >$100M in Q1 2026 (vs. >$60M in Q4 2025) — 3.7x quarterly InP revenue',
        'Ongoing discussions for long-term supply agreements with hyperscalers',
        'Capacity roadmap: ~$17M/quarter today → $35M by end-2026 → $65–70M by end-2027/early 2028',
      ],
      wins: [
        'Already qualified with several US hyperscalers for optical transceiver substrates',
        'Low Etch Pit Density (EPD) crystal technology gives a real quality edge',
        '6-inch InP in development, aligned to customer roadmaps',
        '"China plus one" discussions underway for capacity outside China by 2028',
      ],
      clients: ['Coherent', 'Lumentum', 'II-VI (unnamed hyperscalers via these channels)'],
      suppliers: ['Jinmei (refined indium)', 'BoYu (PBN crucibles)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 3, note: 'An oligopolistic position on InP, but the barriers to entry aren’t impassable.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Direct, near-indispensable exposure to AI optics.' },
        { criterion: 'Valuation', stars: 2, note: 'Extremely expensive — priced for a flawless execution story.' },
        { criterion: 'Risk', stars: 2, note: 'Export permits, China exposure, fragile profitability — a genuinely explosive risk mix.' },
        { criterion: 'Entry timing', stars: 3, note: 'A 73% drawdown from the ATH, but still not cheap on any historical basis.' },
      ],
      readLabel: 'HIGH RISK / HIGH REWARD — SIZE ACCORDINGLY',
      summary:
        'Radically different animal from LRCX or AMAT — not an institutional-quality pick-and-shovel, but a speculative micro-cap with a genuinely strong AI story (InP as the "oil" of datacenter optics), a valuation already pricing perfection, existential geopolitical risk, and profitability that has barely begun. If this fits a portfolio at all, it belongs in the small, high-conviction speculative sleeve — not next to LRCX or AMAT.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices, multiples and guidance before acting on anything here.',
  },

  AEHR: {
    ticker: 'AEHR',
    name: 'Aehr Test Systems',
    tagline: 'Wafer-level burn-in and test — the quality-control layer of the chain, pivoted in two years from pure-play EV/SiC to pure-play AI.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'AEHR is neither a foundry, a fabless designer, nor a classic WFE equipment maker — it’s a test-and-burn-in specialist, a critical but underappreciated layer of the value chain: it verifies chips won’t fail before they’re packaged.',
      rows: [
        { level: 'Raw materials', players: 'AXTI (InP, GaAs), Wacker, SUMCO', position: 'Not exposed', tone: 'none' },
        { level: 'Equipment (WFE)', players: 'LRCX, AMAT, ASML', position: 'Not exposed (test, not fabrication)', tone: 'none' },
        { level: 'Test & burn-in', players: 'AEHR, Advantest, Teradyne, FormFactor', position: 'Core business', tone: 'core' },
        { level: 'Fabless / design', players: 'NVIDIA, Broadcom, Marvell', position: 'End market', tone: 'indirect' },
        { level: 'Foundry / IDM', players: 'TSMC, Samsung, Intel', position: 'Direct customers', tone: 'client' },
        { level: 'OSAT / packaging', players: 'ASE, Amkor', position: 'Direct customers', tone: 'client' },
      ],
      segments: [
        'FOX-XP / FOX-NP: wafer-level burn-in for AI accelerators, CPUs, network processors, SiC',
        'FOX WaferPak: consumable full-wafer contactors — recurring revenue attached to installed systems',
        'Sonoma: package-level burn-in for silicon photonics and high-power devices',
      ],
      aiShift:
        'The pivot is the whole story: AI processors went from ~0% of revenue in FY2024 to 71% in FY2026, while SiC/EV fell from >95% to <5%. Silicon photonics is now 20% of revenue. In two years AEHR went from a pure-play EV/SiC name to a pure-play AI/datacenter one.',
    },
    valuation: {
      peers: ['AEHR'],
      metrics: [
        { label: 'Price', values: ['$67.92'] },
        { label: 'Market cap', values: ['$2.22B (small-cap)'] },
        { label: 'Trailing P/E', values: ['N/A — FY2026 GAAP net loss $(7.1M)'] },
        { label: 'Forward P/E', values: ['49.1x'] },
        { label: 'P/S (TTM)', values: ['44.4x'] },
        { label: 'P/B', values: ['10.0x'] },
        { label: 'Beta', values: ['3.18'] },
        { label: 'Net margin (GAAP)', values: ['-14.3%'] },
        { label: 'Gross margin', values: ['38.5% (45% Q4 non-GAAP)'] },
        { label: 'Revenue FY2026', values: ['$50.0M (-15% YoY)'] },
        { label: 'Revenue FY2027E', values: ['$130–150M (+160–200%)'] },
        { label: 'Cash / Debt', values: ['$116.5M / $9.9M'] },
      ],
      verdictTone: 'high',
      verdictPoints: [
        'P/S of 44.4x TTM is astronomical; on FY2027E revenue it’s closer to ~16x — still rich but inside "growth stock" territory',
        'Forward P/E of 49x against 160–200% guided growth implies a PEG near 0.25 — cheap if the guide lands',
        'Beta of 3.18 means this moves ~3x the market; a tech correction could mean -30% in a session',
      ],
      justifiedIf: [
        'FY2027 revenue guidance ($130–150M) is met — the $100.6M backlog already covers ~70% of it',
        'The lead AI-processor customer keeps expanding wafer-level burn-in adoption',
        'Silicon photonics and SiC recovery add on top of the AI base case',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$45 – $55', rationale: 'Technical support post-earnings, ~25% discount to spot' },
        { tier: 'acceptable', range: '$55 – $72', rationale: 'March–April 2026 consolidation zone through current momentum' },
        { tier: 'expensive', range: '>$80', rationale: 'Forward P/E >55x, thin margin of safety' },
      ],
      technical: [
        '52-week high $126.62 — current $67.92 is a ~46% correction from the top',
        '52-week low $15.94',
        'Extreme volatility: the stock ran $25 → $70 → $35 → $70 in 6 months',
        'Key support $55–60 (post-Q3 consolidation); major support $45–50 (March–April 2026 gap)',
      ],
      scenarios: [
        { label: 'BASE', prob: 45, note: 'FY2027 guide lands on the strength of the existing $100.6M backlog — grinds toward $100–115 over 12–18 months.' },
        { label: 'BULL', prob: 25, note: 'Silicon photonics and a new top-tier AI customer add on top of guide, SiC recovery kicks in — well above $115.' },
        { label: 'BEAR', prob: 30, note: 'Customer concentration bites (3 clients >10% of revenue) or a guidance miss hits the still-thin profitability — retests $35–40.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $35 (structure break)',
    },
    risks: [
      { risk: 'Customer concentration', severity: 'high', note: '3 customers >10% of Q4 revenue. The lead AI customer is now a "critical supplier" relationship — a slowdown there is an immediate shock.' },
      { risk: 'Lumpy, cyclical revenue', severity: 'high', note: 'FOX systems cost $1M+ and orders arrive in waves — Q4 bookings were +500% YoY but full-year revenue was still down 15%.' },
      { risk: 'Execution / capacity', severity: 'medium', note: 'Sonoma capacity is ~$100M/year via a Southeast Asia contract manufacturer; management says it isn’t the constraint even at $150M.' },
      { risk: 'Valuation', severity: 'medium', note: 'A FY2027 guidance miss (even to $110M vs. $140M midpoint) could mean a ~40% single-day drop.' },
      { risk: 'Competition', severity: 'medium', note: 'Advantest and Teradyne dominate traditional package-level test; AEHR’s edge is wafer-level.' },
      { risk: 'China litigation', severity: 'medium', note: 'Patents contested by SemiNexus Test in China — Beijing’s patent office has validated 2 AEHR patents so far, litigation ongoing.' },
      { risk: 'SiC recovery', severity: 'low', note: 'Optional upside, not a risk to the base case — $8M in new SiC orders as of July 2026.' },
    ],
    backlog: {
      visibility: [
        'Backlog hit a record $80.6M at FY2026 close (vs. $15.2M a year prior); effective backlog $100.6M including post-close bookings',
        'Q4 bookings of $60.7M, +500% YoY',
        'Backlog covers ~70% of FY2027 guidance — exceptional visibility for a company this size',
      ],
      wins: [
        'Lead AI-processor customer doubled FOX systems in FY2026 and moved all wafer-level burn-in production onto AEHR systems',
        'Hyperscale customer placed a $41M purchase order for Sonoma systems (April 2026)',
        'A new top-tier AI customer completed benchmark testing with results "better than they can get at the package level" — upside not yet in guidance',
        'A top-2 global automaker placed a direct order to qualify SiC suppliers — first SiC win in Taiwan against a Chinese competitor',
        'Memory (HBM/NAND) evaluation underway — no revenue in the FY2027 guide, optionality for FY2028+',
      ],
      clients: ['Unnamed lead AI-processor customer', 'Unnamed hyperscale customer (Sonoma)', 'Taiwan OSAT', 'Top-2 global automaker'],
      suppliers: ['Southeast Asia contract manufacturer (Sonoma production)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 4, note: 'A niche monopoly in wafer-level burn-in with protected IP and real switching costs.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'A completed pivot from 95% EV to 71%+ AI revenue, with 160–200% FY2027 growth guided.' },
        { criterion: 'Valuation', stars: 2, note: 'P/S of 44x TTM is extreme; forward metrics are better but still carry real risk.' },
        { criterion: 'Visibility / backlog', stars: 5, note: '$100.6M backlog covering ~70% of guide is exceptional for a company this size.' },
        { criterion: 'Risk', stars: 2, note: 'Customer concentration, lumpy revenue, beta of 3.18 — genuinely volatile.' },
        { criterion: 'Entry timing', stars: 3, note: 'A 46% drawdown from the ATH, but still expensive on trailing metrics.' },
      ],
      readLabel: 'QUALITY SPECULATIVE — STRONGER PROFILE THAN AXTI',
      summary:
        'A higher-quality small-cap than AXTI on several counts: a more durable business model (IP and switching costs, not just a materials seller), a pivot that’s executed rather than promised (71% AI revenue today), a record backlog with real visibility, and a path to profitability already guided. Still a small-cap with a beta above 3, concentrated customers and a valuation that prices a lot of the story in already.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices, multiples and guidance before acting on anything here.',
  },

  ATEYY: {
    ticker: 'ATEYY',
    name: 'Advantest',
    tagline: 'The world’s dominant semiconductor test company — the "ASML of test," with software-like margins on industrial hardware. Also trades as 6857.T in Tokyo.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Advantest is the global giant of chip testing — the ultimate quality-control layer of the value chain, but at a completely different scale from a niche player like AEHR.',
      rows: [
        { level: 'Raw materials', players: 'AXTI, Wacker, SUMCO', position: 'Not exposed', tone: 'none' },
        { level: 'Equipment (WFE)', players: 'LRCX, AMAT, ASML', position: 'Not exposed', tone: 'none' },
        { level: 'Test & burn-in', players: 'Advantest, Teradyne, AEHR, Cohu', position: 'Core business — #1 globally', tone: 'core' },
        { level: 'Fabless / design', players: 'NVIDIA, Broadcom, AMD', position: 'End market', tone: 'indirect' },
        { level: 'Foundry / IDM', players: 'TSMC, Samsung, Intel', position: 'Direct customers', tone: 'client' },
        { level: 'OSAT / packaging', players: 'ASE, Amkor', position: 'Direct customers', tone: 'client' },
      ],
      segments: [
        'SoC testers: ~66% share, a duopoly with Teradyne (~34%)',
        'Memory testers (DRAM/HBM): ~60% share — HBM is the structural growth driver',
        'Burn-in systems: package-level (AEHR owns wafer-level instead — complementary, not competing)',
      ],
      aiShift:
        'Advantest holds roughly 70% of the test-equipment market — a rare level of industry dominance. Every AI chip (GPU, CPU, HBM, accelerator) must pass multiple test stages before shipment, and the complexity of AI packages (multi-chip, chiplets, 2.5D/3D) multiplies test time and cost. Management is expanding capacity from 3,000 to 5,000 systems/year in 2026, then 7,500, then 10,000.',
    },
    valuation: {
      peers: ['ATEYY (USD)', '6857.T (JPY)'],
      metrics: [
        { label: 'Price', values: ['$172.93', '¥25,200'] },
        { label: 'Market cap', values: ['$125B', '¥18.2T'] },
        { label: 'Trailing P/E', values: ['55.1x', '49.5x'] },
        { label: 'Forward P/E', values: ['N/A', '37.5x'] },
        { label: 'P/S', values: ['16.8x', '16.5x'] },
        { label: 'P/B', values: ['25.7x', '23.2x'] },
        { label: 'EV/EBITDA', values: ['33.3x', '33.3x'] },
        { label: 'Beta', values: ['1.19', '1.19'] },
        { label: 'ROE', values: ['57.6%', '57.6%'] },
        { label: 'Net margin', values: ['33.3%', '33.3%'] },
        { label: 'Operating margin', values: ['45.9%', '~47% Q1'] },
        { label: 'Revenue FY2026E', values: ['~$11.4B (+51.9%)', '¥1,714B (+51.9%)'] },
        { label: 'Debt/Equity', values: ['2.5%', '2.5%'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'Forward P/E of 37.5x is rich but not unreasonable against 52% growth and 50%+ margins',
        'PEG of ~1.89 sits in "reasonable growth" territory',
        'The stock is up +450% over one year and +128% over 52 weeks — a large part of the re-rating has already happened',
        'Unlike AEHR, Advantest is already deeply profitable: 33% net margin, 58% ROE, ~$1.6B of free cash flow',
      ],
      justifiedIf: [
        'The just-revised FY2026 guidance (revenue +21%, operating income +35%) holds through the year',
        'HBM and SoC test demand keeps compounding as AI package complexity rises',
        'The test-equipment cycle doesn’t roll over in 2027 as some analysts are starting to flag',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$135 – $150 (¥20,000–¥22,500)', rationale: '200-day MA support, ~20% discount to spot' },
        { tier: 'acceptable', range: '$150 – $175 (¥22,500–¥26,000)', rationale: 'Consolidation zone through current momentum' },
        { tier: 'expensive', range: '>$190 (¥28,000+)', rationale: 'Forward P/E >40x — cycle-peak risk' },
      ],
      technical: [
        'ATH $222.45 / ¥35,940 — current $172.93 is a ~22% correction from the top',
        '52-week low $64.91 / ¥9,744',
        'Current price sits between the 50-day MA ($178) and 200-day MA ($155)',
        'Key support $155–160 (¥23,000–24,000); major support $135–145 (¥20,000–21,500)',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'Revised FY2026 guide holds, HBM/SoC test demand compounds — grinds toward analyst targets of $220–250.' },
        { label: 'BULL', prob: 20, note: 'Capacity build-out accelerates further on AI-package complexity, margins stay at record levels — pushes past $250.' },
        { label: 'BEAR', prob: 30, note: 'The test-equipment cycle rolls over in 2027 as flagged by some analysts, or a strong yen erodes USD-reported revenue — retests $120–135.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $120 / ¥18,000 (structure break)',
    },
    risks: [
      { risk: 'Test-equipment cyclicality', severity: 'high', note: 'The market is cyclical — some analysts already flag a potential 2027 slowdown.' },
      { risk: 'Stretched valuation', severity: 'high', note: '55x trailing, 37x forward — a guidance miss could mean an instant -20%.' },
      { risk: 'Customer concentration', severity: 'medium', note: 'NVIDIA, TSMC, Samsung, Micron, SK Hynix form a buyer oligopole — a major capex freeze hits directly.' },
      { risk: 'Teradyne duopoly', severity: 'medium', note: 'Teradyne is spending more on R&D and could take share on select segments.' },
      { risk: 'China exposure', severity: 'medium', note: '~20–25% of revenue. Management calls it "quite healthy" today, but the geopolitical risk persists.' },
      { risk: 'JPY/USD exchange rate', severity: 'medium', note: 'Guidance is built on ¥150/USD. A stronger yen (<140) mechanically lowers USD-reported revenue.' },
      { risk: 'Supply chain / capacity', severity: 'low', note: 'Component-shortage risk exists but management is investing heavily to stay ahead of it.' },
    ],
    backlog: {
      visibility: [
        'FY2026 guidance was just revised sharply higher: revenue +21% (¥1,420B → ¥1,714B), operating income +35%, net income +42%',
        'Q1 FY2026 was a record on every line: revenue +39% YoY, operating income +53% YoY, net income +94% YoY, 51.7% operating margin',
        'Capacity roadmap: 5,000 systems/year by end-2026 (from 3,000), 7,500 in two years, 10,000 in the phase after — management says they "may have to accelerate that build-out faster than originally planned"',
      ],
      wins: [
        'SoC test market growth of +32% expected in 2026',
        'Strong HBM tester demand as high-performance DRAM testing needs scale',
        'Together with Teradyne, controls >80% of the global ATE (automated test equipment) market',
      ],
      clients: ['NVIDIA', 'AMD', 'Intel', 'TSMC', 'Samsung', 'Micron', 'SK Hynix', 'Broadcom', 'Marvell'],
      suppliers: [],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 5, note: 'A de facto monopoly alongside Teradyne, with extreme barriers to entry.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Direct exposure to HBM, AI SoC testing and advanced packaging.' },
        { criterion: 'Profitability', stars: 5, note: 'Record margins (51% operating margin in Q1), 58% ROE.' },
        { criterion: 'Valuation', stars: 3, note: 'Expensive (37x forward) but defensible on growth and quality.' },
        { criterion: 'Risk', stars: 3, note: 'The 2027 cycle question and a stretched multiple, offset by real diversification.' },
        { criterion: 'Entry timing', stars: 4, note: 'A 22% drawdown from the ATH sits in a reasonable accumulation zone.' },
      ],
      readLabel: 'CONSTRUCTIVE — QUALITY OVER AEHR, PRICE OVER PERFECTION',
      summary:
        'One of the best semiconductor businesses in the world right now — a near-guaranteed monopoly with software-like margins, structural AI-driven growth, and a fortress balance sheet. Complementary rather than substitutable with AEHR: Advantest is the core, diversified, already-profitable position; AEHR is the small, high-beta satellite bet on wafer-level burn-in. On the USD-vs-JPY listing question: the USD ADR (ATEYY) is simpler for most non-Japanese investors (no foreign-account filing, no JPY conversion), while 6857.T on Tokyo offers materially better liquidity for those with access to a low-cost Japan broker — either way, remember guidance is built on ¥150/USD, so yen strength is a real swing factor on reported results.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices, multiples, guidance and the JPY/USD rate before acting on anything here.',
  },

  IREN: {
    ticker: 'IREN',
    name: 'IREN Limited',
    tagline: 'The textbook energy-to-AI pivot — a former pure Bitcoin miner turning grid-connected power and land into AI/HPC datacenter infrastructure.',
    sector: 'ENERGY & SPACE',
    asOf: '2026.08',
    chain: {
      intro:
        'IREN owns what everyone in AI is chasing — grid-connected power, land, and operating datacenters — in a market where grid interconnection alone can take five years.',
      rows: [
        { level: 'Energy / power', players: 'IREN, Vistra, Constellation, Talen', position: 'Core business — 5GW secured', tone: 'core' },
        { level: 'Datacenter / HPC', players: 'IREN, Core Scientific, Digital Realty, Equinix', position: 'Core business, in transition', tone: 'core' },
        { level: 'GPU / AI compute', players: 'NVIDIA, AMD', position: 'Client & supplier', tone: 'client' },
        { level: 'Hyperscalers', players: 'Microsoft, Google, Amazon', position: 'End customers', tone: 'client' },
        { level: 'Bitcoin mining', players: 'MARA, RIOT, CLSK', position: 'Legacy business, being wound down', tone: 'indirect' },
      ],
      segments: [
        'The pivot in numbers: AI revenue went from ~$0 to $33.6M/quarter (+94% sequential), targeting $3.7B ARR',
        'GPU fleet: ~2,000 H100/H200 today, targeting 150,000 GPUs',
        'Operational power: ~750MW today, targeting 1.4GW+ at the Sweetwater site alone',
      ],
      aiShift:
        'IREN’s thesis is entirely about physical bottlenecks: grid-connected power and datacenter capacity are the binding constraints on AI compute, and IREN already owns both at scale — while hyperscalers wait years for interconnection, IREN is already energized.',
    },
    valuation: {
      peers: ['IREN'],
      metrics: [
        { label: 'Price', values: ['$31.64'] },
        { label: 'Market cap', values: ['$11.3B (mid-cap)'] },
        { label: 'Trailing P/E', values: ['41.1x (GAAP, one-time charges)'] },
        { label: 'Forward P/E', values: ['N/A — not profitable FY2027E'] },
        { label: 'P/S (TTM)', values: ['14.9x'] },
        { label: 'P/B', values: ['4.0x'] },
        { label: 'EV/EBITDA', values: ['94.3x — heavy investment phase'] },
        { label: 'Beta', values: ['4.28'] },
        { label: 'Net margin', values: ['-14.9%'] },
        { label: 'Gross margin', values: ['68.4% — vertically integrated'] },
        { label: 'Revenue (TTM)', values: ['$757M'] },
        { label: 'Revenue growth FY2027E', values: ['+235%'] },
        { label: 'Cash / Debt', values: ['$2.2B / $4.0B (D/E 148.8%)'] },
      ],
      verdictTone: 'high',
      verdictPoints: [
        'P/S of 14.9x is rich on trailing revenue, but closer to ~4.5x on FY2027E revenue — reasonable for AI infrastructure if it lands',
        'Forward P/E is negative — the company isn’t GAAP-profitable yet, the single biggest red flag',
        'EV/EBITDA of 94x reflects the scale of current datacenter capex, not a steady-state multiple',
        'Beta of 4.28 — this stock moves; a tech correction could mean -40% in a session',
      ],
      justifiedIf: [
        'The $3.1B of contracted ARR (including the $3.4B/5-year NVIDIA deal) converts to revenue on schedule',
        'Sweetwater’s 1.4GW energizes on the planned April 2026 timeline',
        'Bitcoin mining cash flow (still ~60–70% of revenue) holds up while the AI cloud business scales',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$22 – $28', rationale: 'Major technical support, ~25% discount to spot' },
        { tier: 'acceptable', range: '$28 – $35', rationale: 'Current zone — progressive accumulation' },
        { tier: 'expensive', range: '>$45', rationale: 'Risk/reward unfavorable' },
      ],
      technical: [
        'ATH $76.87 — current $31.64 is a ~59% correction from the top',
        '52-week low $14.72',
        'Trading below both the 50-day MA ($50) and 200-day MA ($48) — a downtrend by that measure',
        'Key support $28–32 (Feb–Mar 2026 base); major support $22–25 (January 2026 gap); resistance $42–45',
      ],
      scenarios: [
        { label: 'BASE', prob: 40, note: 'Contracted ARR converts on schedule, Sweetwater energizes on time — grinds toward the $60–80 analyst consensus over 12–18 months.' },
        { label: 'BULL', prob: 20, note: 'GPU fleet expansion outpaces guidance, new hyperscale contracts land on top of NVIDIA — well above $80.' },
        { label: 'BEAR', prob: 40, note: 'Cash burn outruns AI revenue scaling, further dilution, or a Bitcoin price drop hits legacy mining cash flow — retests $18–22.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $18 (structure break)',
    },
    risks: [
      { risk: 'Profitability', severity: 'high', note: 'Forward P/E is negative — the company is burning cash. If AI revenue doesn’t scale fast enough, the balance sheet thins out.' },
      { risk: 'Dilution', severity: 'high', note: 'Repeated ATM offerings, a $3B convertible deal, and equity raises — existing shareholders will keep being diluted.' },
      { risk: 'Debt / leverage', severity: 'high', note: '$4B of debt, 149% debt/equity. A credit tightening cycle raises real distress risk.' },
      { risk: 'Bitcoin price', severity: 'medium', note: 'Mining is still ~60–70% of revenue — a drop below $50K BTC would hit mining cash flow hard.' },
      { risk: 'Datacenter execution', severity: 'medium', note: 'Sweetwater’s 1.4GW must energize on the planned April 2026 timeline — any delay is a real shock.' },
      { risk: 'Hyperscaler competition', severity: 'medium', note: 'Microsoft and Google are building their own datacenters — IREN is a landlord/host, not a software-stack owner.' },
      { risk: 'NVIDIA dependence', severity: 'medium', note: 'The $3.4B/5-year contract is real, but IREN depends on NVIDIA’s own GPU delivery schedule.' },
      { risk: 'Energy regulation', severity: 'low', note: 'Power is green, but datacenter energy-consumption regulation is a tail risk.' },
    ],
    backlog: {
      visibility: [
        '>$10B in secured or in-progress deals',
        '$3.1B of contracted ARR as of Q3 FY2026, targeting $3.7B by end of 2026',
        '$3.4B/5-year AI cloud contract with NVIDIA, signed Q3 FY2026',
      ],
      wins: [
        'Vertical integration — IREN owns the land, the datacenters and the power, with no rent to pay',
        '~50MW/month build cadence, with projects delivered ahead of schedule',
        'Low-cost mining at ~$41,000/BTC breakeven vs. ~$106K spot — a large safety margin on the legacy business',
        '5GW of power secured across multiple sites, with Sweetwater (Texas) alone at 1.4GW',
      ],
      clients: ['NVIDIA (AI cloud contract)', 'Unnamed hyperscale GPU cloud customers'],
      suppliers: ['NVIDIA (GPU fleet)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 4, note: 'A real pivot, vertically integrated, backed by real physical assets (power and land).' },
        { criterion: 'AI growth exposure', stars: 5, note: '+235% revenue growth guided for 2027, $3.1B of contracted ARR.' },
        { criterion: 'Profitability', stars: 2, note: 'Not yet profitable — the single biggest open question.' },
        { criterion: 'Valuation', stars: 3, note: 'Expensive on trailing metrics, cheap on forward if growth materializes.' },
        { criterion: 'Risk', stars: 2, note: 'Beta 4.28, high debt, dilution, no profit — a genuinely combustible mix.' },
        { criterion: 'Entry timing', stars: 3, note: 'A 59% drawdown from the ATH, but still in a technical downtrend.' },
      ],
      readLabel: 'QUALITY SPECULATIVE — THE "VISTRA" OF COMPUTE',
      summary:
        'A lottery ticket on AI infrastructure: a bet that GPU/HPC demand stays insatiable, that grid-connected power remains AI’s #1 bottleneck, and that IREN can execute its mining-to-AI-cloud transition before running low on cash. Among energy/AI peers (Core Scientific, Vistra, Digital Realty), IREN is the most aggressive and the most risky — and carries the largest upside if execution holds. Investors wanting the "energy meets AI" theme with materially less risk might look at Vistra (VST) or Constellation Energy (CEG) instead.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices, multiples and guidance before acting on anything here.',
  },

  WOLF: {
    ticker: 'WOLF',
    name: 'Wolfspeed',
    tagline: 'The pioneer and historical leader in silicon carbide, fresh out of Chapter 11 — a deep-value turnaround bet, priced like distress because it is.',
    sector: 'ENERGY & SPACE',
    asOf: '2026.08',
    chain: {
      intro:
        'Unlike LRCX or AMAT, which sell equipment, Wolfspeed manufactures SiC materials and chips directly — and is the #1 substrate producer worldwide, even after bankruptcy.',
      rows: [
        { level: 'Raw materials', players: 'Graphite, silicon', position: 'Not exposed', tone: 'none' },
        { level: 'SiC substrates', players: 'WOLF (~34%), TanKeBlue (~17%), SICC (~17%)', position: 'Global leader', tone: 'core' },
        { level: 'Epitaxy / wafers', players: 'WOLF, II-VI, Showa Denko', position: 'Vertically integrated', tone: 'core' },
        { level: 'Power devices (SiC)', players: 'STM (~33%), ON (~25%), Infineon (~15%), WOLF (~11%)', position: '#3 worldwide', tone: 'growth' },
        { level: 'EV / automotive', players: 'Tesla, BYD, VW, BMW', position: 'Primary end market', tone: 'client' },
        { level: 'AI / datacenter', players: 'Hyperscalers', position: 'New growth engine (+30% seq.)', tone: 'growth' },
      ],
      segments: [
        'Power products (devices): 67% of Q3 FY2026 revenue, 90% made at 200mm Mohawk Valley',
        'Materials products (substrates): 33% of revenue, -36% YoY on Chinese competition',
        'AI datacenter: still small (~$15M+) but +30% sequential — UPS/PDU power conversion',
      ],
      aiShift:
        'The world’s only fully vertically integrated 200mm SiC manufacturer (Mohawk Valley, NY + Siler City, NC). AI datacenter revenue is a genuinely new vector — the first commercialized 10kV SiC MOSFET targets grid modernization and AI infrastructure power conversion, though it remains small next to the automotive base.',
    },
    valuation: {
      peers: ['WOLF', 'ON (onsemi)', 'STM'],
      metrics: [
        { label: 'Price', values: ['$21.55', '~$65', '~$32'] },
        { label: 'Market cap', values: ['$1.12B — micro-cap', '~$28B', '~$29B'] },
        { label: 'Trailing P/E', values: ['N/A — unprofitable', '~18x', '~15x'] },
        { label: 'Forward P/E', values: ['N/A — unprofitable', '~14x', '~12x'] },
        { label: 'P/S', values: ['1.6x', '~3.5x', '~2.0x'] },
        { label: 'P/B', values: ['1.0x', '~3.5x', '~2.5x'] },
        { label: 'ROE', values: ['-69%', '~15%', '~12%'] },
        { label: 'Net margin', values: ['-107%', '~20%', '~15%'] },
        { label: 'Gross margin (GAAP)', values: ['-27%', '~45%', '~40%'] },
        { label: 'Revenue (TTM)', values: ['$712M', '~$7B', '~$13B'] },
        { label: 'Revenue growth', values: ['-19%', '-5%', '-8%'] },
        { label: 'Cash / Debt', values: ['$1.16B / $1.83B', '~$3B / ~$3B', '~$4B / ~$3B'] },
      ],
      verdictTone: 'low',
      verdictPoints: [
        'P/S of 1.6x is extremely low for a technology leader in a structurally growing market (SiC CAGR ~21% through 2034)',
        'P/B of 1.0x means paying book value, no premium at all',
        'The reason it’s this cheap: fresh out of Chapter 11 (September 2025), gross margin still negative (-27% GAAP), Mohawk Valley running at only ~20% utilization with ~$48M/quarter of underutilization costs',
        'TTM free cash flow is -$767M — this is a real cash-burn situation, not a value-trap illusion',
      ],
      justifiedIf: [
        'Mohawk Valley utilization climbs past 50% and margins turn positive',
        'Customers who qualified second sources during the bankruptcy come back',
        'AI datacenter power conversion scales meaningfully beyond the still-small current base',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$14 – $17', rationale: 'Post-Chapter 11 support, P/S ~1.0x, P/B <1.0x' },
        { tier: 'acceptable', range: '$17 – $22', rationale: 'Current zone — turnaround in progress' },
        { tier: 'expensive', range: '>$30', rationale: 'Without margin improvement this is pure momentum' },
      ],
      technical: [
        'ATH $80.82 — current $21.55 is a ~73% correction from the top',
        '52-week low $8.05 (post-Chapter 11 panic selling)',
        'Trading below both the 50-day MA ($46.50) and 200-day MA ($28.64) — a downtrend by that measure',
        'Key support $16–18 (March–April 2026 base); major support $12–14 (post-earnings gap)',
      ],
      scenarios: [
        { label: 'BASE', prob: 35, note: 'Mohawk Valley utilization climbs gradually, margins narrow toward breakeven — grinds toward $35–45 over 12–18 months if the turnaround holds.' },
        { label: 'BULL', prob: 20, note: 'Utilization crosses 50%+, margins turn positive, lost customers requalify — the stock could triple or quadruple from here.' },
        { label: 'BEAR', prob: 45, note: 'Underutilization persists, customers who left during bankruptcy don’t return — the company drifts back toward distress.' },
      ],
      horizon: '12–18 months (a multi-year turnaround thesis)',
      invalidation: 'Weekly close below $10 (a return toward post-bankruptcy lows)',
    },
    risks: [
      { risk: 'Negative margins / underutilization', severity: 'high', note: '~$48M/quarter of fixed costs on an underused fab. Without volume, cash burn continues.' },
      { risk: 'Recent Chapter 11', severity: 'high', note: 'Emerged September 2025. Fresh-start accounting, recapitalization, prior shareholder dilution — confidence hasn’t fully returned.' },
      { risk: 'Permanent share loss', severity: 'high', note: 'During bankruptcy, customers qualified alternatives (Infineon, STM, ON). That share is durably lost, not just paused.' },
      { risk: 'Chinese competition', severity: 'high', note: 'TanKeBlue + SICC are ~34% of the substrate market and growing; Western automotive qualification is 3–5 years from a direct threat but coming.' },
      { risk: 'Soft EV market', severity: 'medium', note: 'Automotive is 60–70% of the SiC market and EV sales growth has slowed — WOLF is directly exposed.' },
      { risk: 'Debt / leverage', severity: 'medium', note: '$1.83B of debt, D/E 179%. Recent refinancing helped, but leverage stays elevated.' },
      { risk: 'Mohawk Valley execution', severity: 'medium', note: 'The 200mm fab needs 50%+ utilization to turn profitable, which depends on 12–24 months of customer requalification.' },
      { risk: 'AI datacenter (upside)', severity: 'low', note: '+30% sequential growth, but still small relative to the automotive base.' },
    ],
    backlog: {
      visibility: [
        'Renesas: $2B advance payment, 10-year 200mm wafer supply agreement',
        'Multi-year substrate agreements with Infineon (150mm + 200mm) and Rohm',
        'CFIUS clearance obtained for the Renesas equity issuance tied to restructuring',
      ],
      wins: [
        'Toyota: onboard-charger (OBC) win for BEVs',
        'Hopewind: industrial and renewable-energy inverter supply',
        '300mm SiC: a single-crystal wafer already produced in R&D — a future technology edge',
      ],
      clients: ['Renesas', 'Infineon', 'Rohm', 'Toyota', 'Hopewind'],
      suppliers: [],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 3, note: 'A technology leader with real IP, but execution has faltered badly.' },
        { criterion: 'SiC market growth', stars: 5, note: '~21% CAGR market, plus an emerging AI datacenter vector.' },
        { criterion: 'Profitability', stars: 1, note: 'Negative margins, high burn rate — the single biggest problem.' },
        { criterion: 'Valuation', stars: 5, note: 'P/S 1.6x, P/B 1.0x — extremely cheap by any historical standard.' },
        { criterion: 'Risk', stars: 2, note: 'Recent bankruptcy, permanently lost share, rising Chinese competition.' },
        { criterion: 'Entry timing', stars: 3, note: 'A 73% drawdown from the ATH, but no clear reversal signal yet.' },
      ],
      readLabel: 'DEEP-VALUE TURNAROUND — A "CIGARETTE BUTT" OF REAL QUALITY',
      summary:
        'The most contrarian name on this list: a technology leader just out of bankruptcy, with negative margins, priced like a value stock (P/S 1.6x). If Mohawk Valley crosses 50%+ utilization and margins turn positive, this could triple or quadruple; if underutilization persists and customers don’t come back, it drifts toward distress again. Not for everyone — this is a multi-year turnaround bet, not a quick trade. Investors wanting the same SiC theme with a profitable business should look at ON (onsemi) instead. Cheap here is cheap for real reasons; the market’s skepticism is earned, not irrational.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
  },

  KLAC: {
    ticker: 'KLAC',
    name: 'KLA Corporation',
    tagline: 'The de facto monopoly on chip inspection and metrology — the highest margins in semiconductor equipment, and arguably the highest-quality name in the sector.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Unlike LRCX/AMAT which shape the chip, KLA verifies every layer is correct before the next one is added — a critical, underappreciated layer of the value chain.',
      rows: [
        { level: 'Raw materials', players: 'AXTI, Wacker', position: 'Not exposed', tone: 'none' },
        { level: 'Equipment (WFE)', players: 'LRCX, AMAT, ASML, TEL', position: 'Complementary', tone: 'client' },
        { level: 'Process control / inspection', players: 'KLAC (~60–70%), Onto Innovation', position: 'De facto monopoly', tone: 'core' },
        { level: 'Test & burn-in', players: 'Advantest, AEHR, Teradyne', position: 'Not exposed (final test, not in-line)', tone: 'none' },
        { level: 'Foundry / IDM', players: 'TSMC, Samsung, Intel', position: 'Direct customers', tone: 'client' },
        { level: 'Advanced packaging', players: 'ASE, Amkor, TSMC CoWoS', position: '$950M revenue 2025, +70% YoY', tone: 'growth' },
      ],
      segments: [
        'Semiconductor Process Control: ~90% of revenue, $3.08B Q3 FY2026 (+11% YoY) — the core business',
        'Specialty Semiconductor Process: ~4% of revenue (etch, deposition, plasma treatment)',
        'PCB & Component Inspection: ~4–5% of revenue',
      ],
      aiShift:
        'The more complex a chip, the more inspection it needs — and AI is pushing complexity to the extreme. GAA means new etch steps and new inspection points; HBM/3D DRAM means mandatory intermediate inspection of stacked layers; chiplets and 2.5D/3D packaging need critical alignment metrology; larger die sizes mean more surface area to inspect. Advanced packaging alone hit $950M in 2025 (+70% YoY), with mid-to-high-teens growth guided for 2026 as client facility bottlenecks ease.',
    },
    valuation: {
      peers: ['KLAC', 'LRCX', 'AMAT', 'ASML*'],
      metrics: [
        { label: 'Price', values: ['$178.87', '$259.79', '$452.14', '$1,569'] },
        { label: 'Market cap', values: ['$233.6B', '$325B', '$359B', '$603B'] },
        { label: 'Trailing P/E', values: ['50.7x', '49.2x', '42.5x', '54.2x'] },
        { label: 'Forward P/E', values: ['27.2x', '31.8x', '26.8x', '27.1x'] },
        { label: 'P/S (TTM)', values: ['~17.8x', '15.0x', '12.4x', '17.1x'] },
        { label: 'P/B', values: ['40.1x', '30.7x', '15.0x', '~35x'] },
        { label: 'EV/EBITDA', values: ['~42.8x', '42.8x', '40.7x', '~30x'] },
        { label: 'PEG (trailing)', values: ['~2.09', '1.56', '1.20', '2.08'] },
        { label: 'Beta', values: ['1.41', '1.81', '1.57', '1.39'] },
        { label: 'ROE', values: ['95.0%', '45.7%', '40.6%', '53.9%'] },
        { label: 'Net margin', values: ['35.7%', '25.7%', '26.4%', '30.1%'] },
        { label: 'Gross margin', values: ['61.4%', '50.0%', '49.0%', '52.7%'] },
        { label: 'Operating margin', values: ['41.2%', '35.0%', '31.9%', '37.1%'] },
        { label: 'Revenue (TTM)', values: ['$13.1B', '$21.7B', '$29.0B', '~$35B'] },
        { label: 'Revenue growth', values: ['+11.5%', '~+30%', '~+30%', '~+20%'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'Forward P/E of 27.2x is competitive vs. LRCX (31.8x) and in line with ASML (27.1x)',
        'P/B of 40x is extreme in isolation, but explained by a 95% ROE and an asset-light, IP-driven model',
        'The best margins in the sector: 61% gross, 41% operating, 36% net — all sector-leading',
        'The stock has corrected ~42% from its ATH ($307.37), meaningfully improving the entry valuation',
      ],
      justifiedIf: [
        'AI-driven inspection intensity (GAA, HBM, chiplets, advanced packaging) keeps compounding as the doc argues',
        'The 16-year streak of services revenue growth (~24% of total, +18% YoY) continues',
        'Advanced packaging accelerates in 2027 as client facility bottlenecks clear',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$155 – $165', rationale: '200-day MA zone, major technical support, ~10% discount to spot' },
        { tier: 'acceptable', range: '$165 – $200', rationale: 'Current zone, progressive accumulation' },
        { tier: 'expensive', range: '>$220', rationale: 'Above the 50-day MA — risk/reward unfavorable' },
      ],
      technical: [
        'ATH $307.37 — current $178.87 is a ~42% correction from the top',
        '52-week low $83.22',
        'Current price sits between the 50-day MA ($221.18) and 200-day MA ($161.40)',
        'Key support $160–170 (200-day MA + Feb–Mar 2026 congestion); major support $140–150; resistance $220–230',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'The 16-year services growth streak and advanced-packaging ramp continue — grinds toward the $234 analyst mean over 12–18 months.' },
        { label: 'BULL', prob: 25, note: 'Advanced packaging accelerates faster than guided as 2027 facility bottlenecks clear, AI inspection intensity keeps rising — pushes toward the $325 high target.' },
        { label: 'BEAR', prob: 25, note: 'WFE cyclicality bites, wafer starts slow, a guidance miss resets the P/B-heavy multiple — retests $140–150.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $135 (structure break)',
    },
    risks: [
      { risk: 'WFE / wafer-start cyclicality', severity: 'high', note: 'The core business is sensitive to wafer-start fluctuations — if foundries cut production, inspection needs drop.' },
      { risk: 'P/B valuation', severity: 'high', note: 'A P/B of 40x leaves little margin for error; a guidance miss could mean a 15–20% correction.' },
      { risk: 'Segment concentration', severity: 'medium', note: '90% of revenue sits in Process Control — less diversified than AMAT’s six segments.' },
      { risk: 'China exposure', severity: 'medium', note: 'Meaningful, though Barclays notes relative insulation vs. AMAT/LRCX.' },
      { risk: 'R&D budget vs. peers', severity: 'medium', note: 'A smaller R&D budget than AMAT/ASML carries some risk of share loss on select niches.' },
      { risk: 'Onto Innovation competition', severity: 'medium', note: 'Onto is the closest direct competitor in metrology/inspection and is gaining ground, even as KLA dominates.' },
      { risk: 'Gross margin headwinds', severity: 'low', note: 'Temporarily higher DRAM-related costs, expected to ease in H2 2026.' },
    ],
    backlog: {
      visibility: [
        'A strong, growing backlog — lengthening lead times, a strengthening sales funnel',
        '"Back-penetration": customers are inspecting even older nodes to optimize existing fab capacity',
        'Q4 FY2026 guidance of $3.575B, in line with expectations',
      ],
      wins: [
        'Services revenue of $786M in Q2 FY2026 (+6% sequential, +18% YoY) — a 12%+ CAGR streak running 16 consecutive years, an industry record',
        'Advanced packaging: $950M in 2025 (+70% YoY), mid-to-high-teens growth guided for 2026, acceleration expected in 2027',
        '$7B buyback authorization freshly announced, plus a 17th consecutive dividend increase',
      ],
      clients: ['TSMC', 'Samsung', 'Intel', 'Micron', 'SK Hynix'],
      suppliers: [],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 5, note: 'A de facto monopoly with extreme barriers to entry and high switching costs.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Direct exposure to AI-driven complexity — GAA, HBM, chiplets, packaging.' },
        { criterion: 'Profitability', stars: 5, note: 'The best margins in the sector and a 95% ROE.' },
        { criterion: 'Valuation', stars: 3, note: 'A reasonable forward P/E (27x), but P/B (40x) and P/S (~18x) run high.' },
        { criterion: 'Risk', stars: 4, note: 'Less cyclical than LRCX/AMAT — yield optimization is close to a mandatory spend — with a moderate beta of 1.41.' },
        { criterion: 'Entry timing', stars: 4, note: 'A 42% drawdown from the ATH sits in a reasonable accumulation zone.' },
      ],
      readLabel: 'CONSTRUCTIVE — THE SECTOR’S PUREST QUALITY NAME',
      summary:
        'The one semiconductor pick-and-shovel where customers genuinely have no choice — no inspection means no yield means no profit. The best margins in the sector, a ROE near 100%, and an uninterrupted 16-year services growth streak make this arguably the single highest-quality name among these AI-hardware plays. Paired well with AMAT: AMAT for volume and diversification, KLA for quality and pricing power — a case can be made for holding both rather than choosing one.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
  },

  AAOI: {
    ticker: 'AAOI',
    name: 'Applied Optoelectronics',
    tagline: 'A former niche cable-TV optics maker turned dark-horse AI transceiver supplier in 18 months — explosive growth, explosive risk.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'AAOI went from an obscure CATV equipment maker to one of the key optical-transceiver suppliers for hyperscalers in about 18 months.',
      rows: [
        { level: 'Raw materials', players: 'AXTI (InP), WOLF (SiC)', position: 'Customer of InP lasers', tone: 'client' },
        { level: 'Lasers / components', players: 'Lumentum, Coherent, II-VI', position: 'Competitor & supplier', tone: 'indirect' },
        { level: 'Optical transceivers', players: 'AAOI, Lumentum, Coherent, Innolight', position: 'Core business', tone: 'core' },
        { level: 'Switching / networking', players: 'Arista, Cisco, Broadcom', position: 'Complementary', tone: 'indirect' },
        { level: 'Hyperscalers', players: 'Microsoft, Amazon, Oracle, Google', position: 'Direct customers', tone: 'client' },
      ],
      segments: [
        '400G transceivers: mature, spine/aggregation datacenter',
        '800G transceivers: volume ramp in Q2 2026 — GPU cluster interconnect, spine switching',
        '1.6T transceivers: first volume order Q3 2026 — next-gen AI clusters, 102.4T switching',
        'CATV/broadband: legacy but stable, ~$300M/year cash flow',
      ],
      aiShift:
        'Datacenter revenue mix went from ~20% in 2023 to ~50% in 2025, targeting ~70% in 2026. Total revenue went from ~$200M (2023) to $456M (2025), guided past $1B in 2026 as 800G and 1.6T volume ramps. In-house EML laser manufacturing (vertical integration) is the core competitive edge.',
    },
    valuation: {
      peers: ['AAOI', 'Lumentum (LITE)', 'Coherent (COHR)'],
      metrics: [
        { label: 'Price', values: ['$80.83', '~$95', '~$78'] },
        { label: 'Market cap', values: ['$6.5B', '~$6.8B', '~$12B'] },
        { label: 'Trailing P/E', values: ['N/A — unprofitable', '~45x', '~25x'] },
        { label: 'Forward P/E', values: ['16.9x', '~20x', '~18x'] },
        { label: 'P/S (TTM)', values: ['14.8x', '~4.5x', '~2.5x'] },
        { label: 'P/B', values: ['5.8x', '~3.5x', '~2.0x'] },
        { label: 'Beta', values: ['3.69', '~1.5', '~1.8'] },
        { label: 'ROE', values: ['-6.1%', '~5%', '~8%'] },
        { label: 'Net margin', values: ['-8.5%', '~2%', '~5%'] },
        { label: 'Gross margin', values: ['29.6%', '~35%', '~38%'] },
        { label: 'Revenue (TTM)', values: ['$507M', '~$1.5B', '~$4.8B'] },
        { label: 'Revenue growth', values: ['+51%', '+15%', '+12%'] },
        { label: 'Debt/Equity', values: ['25.4%', '~80%', '~120%'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'Forward P/E of 16.9x is attractive for 100%+ growth — cheaper than both Lumentum and Coherent',
        'P/S of 14.8x is very high on trailing revenue, but closer to ~3x on FY2027E revenue (~$2B+) — reasonable',
        'The stock ran +282% YTD and +1,440% over 12 months, then corrected -42% from the ATH and -29.6% in 30 days — the parabolic momentum has broken',
      ],
      justifiedIf: [
        'The 800G/1.6T capacity ramp (90K → 650K+ units/month by end-2026) executes on schedule',
        'The two disclosed hyperscaler orders (>$200M 1.6T, >$53M and >$124M 800G) and the $4B/10-year Amazon-affiliate contract convert as booked',
        'Non-GAAP profitability actually lands in Q2 2026 as guided',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$55 – $65', rationale: 'Major technical support, ~25% discount to spot' },
        { tier: 'acceptable', range: '$65 – $85', rationale: 'March–April 2026 consolidation zone through current levels' },
        { tier: 'expensive', range: '>$100', rationale: 'Above the 50-day MA — risk/reward unfavorable' },
      ],
      technical: [
        'ATH $233.67 — current $80.83 is a ~65% correction from the top',
        '52-week low $18.50',
        'Trading below both the 50-day MA ($148.72) and 200-day MA ($89.17) — a downtrend by that measure',
        'Key support $75–80 (May–June 2026 congestion); major support $55–65 (March–April 2026 base)',
      ],
      scenarios: [
        { label: 'BASE', prob: 40, note: 'Capacity ramp and disclosed hyperscaler orders convert on schedule, non-GAAP profitability lands in Q2 — grinds toward the $150–180 analyst consensus over 12–18 months.' },
        { label: 'BULL', prob: 20, note: 'Additional hyperscaler orders land beyond what’s disclosed, Texas capacity comes online early — pushes toward the $220 high target.' },
        { label: 'BEAR', prob: 40, note: 'One of the two concentrated hyperscaler customers slows or the EML-to-SiPh technology transition erodes AAOI’s position faster than expected — retests $45–55.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $45 (structure break)',
    },
    risks: [
      { risk: 'Customer concentration', severity: 'high', note: 'Two hyperscalers account for the majority of datacenter revenue — the CFO confirmed ~$700M of the ~$1B 2026 guide comes from just 2 customers.' },
      { risk: 'EML → Silicon Photonics transition', severity: 'high', note: 'AAOI is EML-based while the industry migrates to SiPh for 1.6T/3.2T (72% share). Coherent and Lumentum lead SiPh with $2B of NVIDIA backing each — AAOI could lose position medium-term.' },
      { risk: 'Capacity execution', severity: 'high', note: 'Must scale from 90K to 650K units/month in 12 months. Any delay means a guidance miss and a severe stock reaction.' },
      { risk: 'Fragile profitability', severity: 'medium', note: 'Still a GAAP net loss in Q1; non-GAAP profitability is guided for Q2 2026 but unproven — a miss could mean -30% in a session.' },
      { risk: 'Dilution', severity: 'medium', note: 'A $500M ATM program has already sold $250M of shares, with more dilution possible.' },
      { risk: 'Competition', severity: 'medium', note: 'Lumentum, Coherent, Innolight and Eoptolink will all have added capacity by 2027, making the market more competitive.' },
      { risk: 'Tariffs', severity: 'medium', note: '$1.4M impact in Q1; AAOI is diversifying to Texas (30% of 800G/1.6T production by end-2026) partly in response.' },
      { risk: 'InP supply', severity: 'low', note: 'Vertical integration on EML lasers makes AAOI less externally dependent than it might appear.' },
    ],
    backlog: {
      visibility: [
        'March 2026: a >$200M first-volume 1.6T transceiver order from a hyperscaler, shipping Q3–Q4 2026',
        'March 2026: >$53M and >$124M of 800G single-mode transceiver orders from hyperscalers',
        'SEC filing: a $4B/10-year multi-product contract with an Amazon affiliate',
        '2026 guide: >$1B revenue (+119% vs. 2025), >$120M non-GAAP operating profit',
      ],
      wins: [
        'Capacity roadmap: ~90K units/month (Q1 2026) → ~150K (Q2 2026) → >650K by end-2026 → >930K by end-2027',
        'Pearland, Texas: a 400K sq ft facility (groundbreaking July 2026) that will be the largest US-domestic supplier of 800G/1.6T transceivers',
        'Targeting 30% US-based production by end-2026, >50% by end-2027',
      ],
      clients: ['Amazon (affiliate, $4B/10yr)', 'Unnamed hyperscalers (likely Oracle, Microsoft per order pattern)'],
      suppliers: [],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 3, note: 'Vertically integrated on lasers, but EML-only carries real technology-transition risk.' },
        { criterion: 'AI growth exposure', stars: 5, note: '+107% revenue growth, a $4B Amazon contract, and large 800G/1.6T orders.' },
        { criterion: 'Profitability', stars: 2, note: 'Not yet GAAP-profitable — the Q2 2026 inflection is guided but unproven.' },
        { criterion: 'Valuation', stars: 3, note: 'A cheap forward P/E (17x) against a high P/S (15x) and a stock that ran parabolic before correcting.' },
        { criterion: 'Risk', stars: 2, note: 'Extreme customer concentration, a live technology transition, beta of 3.69.' },
        { criterion: 'Entry timing', stars: 3, note: 'A 65% drawdown from the ATH, but still in a technical downtrend.' },
      ],
      readLabel: 'QUALITY SPECULATIVE — AN "UPGRADED AXTI" IN OPTICS',
      summary:
        'A bet on explosive growth in AI optical infrastructure: the orders are real, demand outstrips supply into mid-2027 by the company’s own numbers, and the forward P/E is genuinely reasonable for the growth rate. But the risks are just as real — concentrated customers, a live EML-to-SiPh technology transition where larger, NVIDIA-backed peers (Coherent, Lumentum) lead, and extreme volatility. Investors wanting the same "AI optics" theme with less risk might look at Coherent (COHR) instead — NVIDIA-backed, a SiPh leader, and already profitable.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
  },

  WYFI: {
    ticker: 'WYFI',
    name: 'WhiteFiber',
    tagline: 'The youngest, smallest name here — a Bit Digital spin-off building GPU cloud and colocation infrastructure from a standing start.',
    sector: 'ENERGY & SPACE',
    asOf: '2026.08',
    chain: {
      intro:
        'Founded in 2024, IPO’d August 2025, spun off from Bit Digital — a micro-cap AI-infrastructure story still in its build-out phase, and a much smaller, riskier version of IREN’s thesis.',
      rows: [
        { level: 'Energy / power', players: 'Vistra, Constellation, IREN', position: 'Competitor', tone: 'indirect' },
        { level: 'Datacenter / colocation', players: 'Equinix, Digital Realty, WYFI', position: 'Core business', tone: 'core' },
        { level: 'GPU cloud / HPC', players: 'CoreWeave, Lambda, WYFI', position: 'Core business', tone: 'core' },
        { level: 'AI compute', players: 'NVIDIA, AMD', position: 'GPU suppliers', tone: 'client' },
        { level: 'Hyperscalers', players: 'Microsoft, Amazon', position: 'Indirect end customers', tone: 'indirect' },
      ],
      segments: [
        'Cloud services (GPU cloud): $16.8M Q1 2026, 76.5% of revenue, +13.0% YoY',
        'Colocation services: $4.8M Q1 2026, 21.8% of revenue, +190.2% YoY',
        'Vertically integrated model: owns Tier-3 datacenters (MTL-3 Canada, NC-1 North Carolina), retrofitting existing sites at $8–10M/gross MW — ~40% cheaper than greenfield',
      ],
      aiShift:
        'Same physical-bottleneck thesis as IREN (power and datacenter capacity are the constraint), executed at a fraction of the scale, cash, and track record. Remaining performance obligations of ~$923.7M (mostly multi-year colocation) give real forward visibility for a company this young.',
    },
    valuation: {
      peers: ['WYFI', 'IREN'],
      metrics: [
        { label: 'Price', values: ['$20.93', '$31.64'] },
        { label: 'Market cap', values: ['$808M — micro-cap', '$11.3B'] },
        { label: 'Trailing P/E', values: ['N/A — unprofitable', 'N/A'] },
        { label: 'Forward P/E', values: ['35.9x', 'N/A'] },
        { label: 'P/S (TTM)', values: ['~9.8x', '14.9x'] },
        { label: 'P/B', values: ['1.7x', '4.0x'] },
        { label: 'Net margin', values: ['-46.1%', '-14.9%'] },
        { label: 'Gross margin (ex-D&A)', values: ['60.2%', '68.4%'] },
        { label: 'Revenue (TTM)', values: ['~$83M', '$757M'] },
        { label: 'Cash / Debt', values: ['$80.1M / $251.6M', '$2.2B / $4.0B'] },
        { label: 'Debt/Equity', values: ['71.4%', '148.8%'] },
        { label: 'Company age', values: ['<2 years', '~7 years'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'P/S of ~9.8x is actually cheaper than IREN (14.9x) and AAOI (14.8x)',
        'P/B of 1.7x is reasonable for an infrastructure company',
        'Forward P/E of 35.9x is high in absolute terms but not unreasonable for 49%+ growth',
        'The real issue: under 2 years old, burning cash, and needing hundreds of millions more in capex to reach its stated vision — the stock ran +99% in one month on pure momentum',
      ],
      justifiedIf: [
        'The $923.7M remaining performance obligations (mostly colocation) convert as contracted',
        'NC-1 Phase 1 & 2 generate revenue on the guided Q2 2026 timeline',
        'Financing (equity or convertible) doesn’t dilute existing holders faster than revenue scales',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$12 – $15', rationale: 'Post-IPO support, P/B <1.5x, ~35% discount to spot' },
        { tier: 'acceptable', range: '$15 – $22', rationale: 'March–April 2026 consolidation zone through current levels' },
        { tier: 'expensive', range: '>$25', rationale: 'Above the 50-day MA — risk/reward unfavorable' },
      ],
      technical: [
        'ATH $46.87 — current $20.93 is a ~55% correction from the top',
        '52-week low $10.51',
        'Trading below both the 50-day MA ($30.69) and 200-day MA ($22.57) — a downtrend by that measure',
        'Key support $15–17 (Feb–Mar 2026 congestion); major support $10–12 (post-IPO lows)',
      ],
      scenarios: [
        { label: 'BASE', prob: 35, note: 'NC-1 comes online on schedule, contracted backlog converts, financing dilutes but doesn’t derail — grinds toward $35–45 over 12–18 months if execution holds.' },
        { label: 'BULL', prob: 15, note: 'Additional anchor-tenant contracts land beyond Nscale and the disclosed May 2026 wins, smart-money attention (per its Aschenbrenner-fund holder) compounds — well above $45.' },
        { label: 'BEAR', prob: 50, note: 'Cash runs out faster than revenue scales, forcing dilutive financing, or NC-1 execution slips — retests $9–12.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $9 (post-IPO structure break)',
    },
    risks: [
      { risk: 'Company age / track record', severity: 'high', note: 'Founded 2024, IPO’d August 2025 — zero long-term track record, management background is in crypto mining, not AI datacenters.' },
      { risk: 'Cash burn / financing needs', severity: 'high', note: '$169M of Q1 capex took cash from $118M to $80M. $230M of convertibles raised won’t be enough for NC-1 plus expansion — significant further dilution is likely.' },
      { risk: 'Bit Digital dependence', severity: 'high', note: 'WYFI is a Bit Digital affiliate — potential conflicts of interest and governance questions.' },
      { risk: 'Profitability', severity: 'high', note: 'Q1 net loss of $12M, operating loss of $11M; G&A exploded from $4.2M to $17.8M YoY on public-company costs and stock comp.' },
      { risk: 'Competition', severity: 'medium', note: 'CoreWeave, Lambda, IREN, Crusoe and the hyperscalers themselves — GPU cloud is trending toward commodity.' },
      { risk: 'Datacenter execution', severity: 'medium', note: 'NC-1 Phase 1 & 2 must generate revenue by Q2 2026 as guided — any delay is a real shock.' },
      { risk: 'Customer concentration', severity: 'medium', note: 'Nscale alone is a 10-year, 40MW, ~$865M contract — a critical single customer.' },
      { risk: 'Stock-based compensation', severity: 'medium', note: '$7.3M in Q1 vs. $0.1M a year prior — real dilution pressure.' },
    ],
    backlog: {
      visibility: [
        'Remaining performance obligations of ~$923.7M, mostly multi-year colocation',
        'Deferred revenue of $144.5M in contract liabilities',
        'Analyst FY2026 revenue consensus of ~$140M vs. ~$83M TTM',
      ],
      wins: [
        'Nscale: ~$865M total contract value over 10 years, 40MW anchor tenant at NC-1 (December 2025)',
        'An investment-grade tech customer: >$160M TCV over 5 years, NVIDIA GPUs, Paris Region (May 2026)',
        'Modal Labs / Hyperbolic: ~$17M over 2 years, H200 GPUs from the owned fleet — no incremental GPU capex needed',
        'Held (not led) by Situational Awareness LP, Leopold Aschenbrenner’s AI-focused hedge fund — a real but small signal: ~$20.9M position, just 0.15% of that fund’s book, no board seat, and the same fund carries $8.46B of hedging puts across the AI hardware sector, plus a full exit from Lumentum and Coherent in Q1 2026 — read as thematic validation, not a strategic endorsement',
      ],
      clients: ['Nscale', 'Unnamed investment-grade tech customer (Paris)', 'Modal Labs', 'Hyperbolic'],
      suppliers: ['NVIDIA (GPU fleet)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 2, note: 'An interesting vertically integrated model, but too young and unproven.' },
        { criterion: 'AI growth exposure', stars: 5, note: '+49% revenue growth, a $923M backlog, multi-year anchor contracts.' },
        { criterion: 'Profitability', stars: 1, note: '$12M/quarter net loss, G&A has exploded, no visible inflection yet.' },
        { criterion: 'Valuation', stars: 3, note: 'P/S of 9.8x and P/B of 1.7x are reasonable for the growth rate.' },
        { criterion: 'Risk', stars: 2, note: 'A startup burning cash, dependent on Bit Digital, likely facing more dilution.' },
        { criterion: 'Entry timing', stars: 3, note: 'A 55% drawdown from the ATH, but still in a technical downtrend.' },
      ],
      readLabel: 'HIGH RISK / HIGH REWARD — THE "MINI-IREN"',
      summary:
        'The riskiest name in this set: a company under 2 years old with 83 employees attempting to build a several-hundred-million-dollar AI infrastructure footprint. The model (cheap retrofits, vertical integration) is genuinely interesting, but cash won’t stretch far enough without further dilution, management’s background is in crypto mining rather than AI datacenters, and competition (CoreWeave, Lambda, IREN, hyperscalers themselves) is fierce. Investors wanting the same theme with more scale and a real balance sheet should look at IREN instead; for an institutional-grade version of "energy meets AI," Vistra (VST) or Constellation Energy (CEG) are considerably safer.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
  },

  CIEN: {
    ticker: 'CIEN',
    name: 'Ciena Corporation',
    tagline: 'The world’s leading optical-networking systems vendor — the backbone connecting AI datacenters to each other, with margins now expanding structurally, not just cyclically.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Unlike Lumentum (laser components) or AAOI (transceivers), Ciena sells complete systems — hardware, software and services — and leads the global optical-networking market outright.',
      rows: [
        { level: 'Optical components', players: 'Lumentum, Coherent, AAOI', position: 'Suppliers', tone: 'client' },
        { level: 'Transceivers / pluggables', players: 'Innolight, Cisco, AAOI', position: 'Competitors & suppliers', tone: 'indirect' },
        { level: 'Optical systems (DWDM, DCI)', players: 'Ciena, Nokia/Infinera, Huawei, Cisco', position: 'Global leader', tone: 'core' },
        { level: 'Routing & switching', players: 'Ciena, Arista, Cisco, Juniper', position: 'Explosive growth (+88%)', tone: 'growth' },
        { level: 'Software / automation', players: 'Ciena Blue Planet', position: 'Recurring revenue', tone: 'core' },
        { level: 'Hyperscalers', players: 'Microsoft, Meta, Google, Amazon', position: 'Direct customers', tone: 'client' },
      ],
      segments: [
        'Networking Platforms (Optical): ~$1.02B Q2 FY2026, ~65% of revenue, +42% YoY',
        'Routing & Switching: ~$350M, ~22% of revenue, +88% YoY',
        'Platform Software & Services + Blue Planet: ~$200M combined, stable',
      ],
      aiShift:
        'Ciena calls it "scale-across" — the networking layer connecting AI datacenters to each other across cities and continents, distinct from the "scale-up" GPU interconnect layer inside a single datacenter. RLS HyperRail (intelligent optical line system for AI training over hundreds of kilometers) and DCOM (data-center out-of-band management, co-developed with Meta) are opening genuinely new, structural TAM rather than just riding an existing cycle.',
    },
    valuation: {
      peers: ['CIEN', 'Lumentum (LITE)', 'Cisco (CSCO)', 'Arista (ANET)'],
      metrics: [
        { label: 'Price', values: ['$331.09', '$613.69', '~$65', '~$380'] },
        { label: 'Market cap', values: ['$46.9B', '$47.7B', '~$260B', '~$120B'] },
        { label: 'Trailing P/E', values: ['110.0x', '108.2x', '~18x', '~38x'] },
        { label: 'Forward P/E', values: ['~34.3x', '~33.4x', '~15x', '~30x'] },
        { label: 'P/S (TTM)', values: ['~8.4x', '~19.2x', '~4x', '~14x'] },
        { label: 'P/B', values: ['16.2x', '14.8x', '~5x', '~12x'] },
        { label: 'Beta', values: ['1.27', '1.48', '0.9', '1.1'] },
        { label: 'ROE', values: ['15.5%', '57.6%', '~25%', '~35%'] },
        { label: 'Net margin', values: ['7.9%', '33.3%', '~22%', '~35%'] },
        { label: 'Operating margin (adj.)', values: ['19.5%', '~31%', '~28%', '~40%'] },
        { label: 'Revenue (TTM)', values: ['~$5.6B', '~$2.5B', '~$61B', '~$8.5B'] },
        { label: 'Revenue growth FY2026E', values: ['+32%', '+90%', '+5%', '+20%'] },
        { label: 'Debt/Equity', values: ['54.6%', '~111%', '~40%', '~0%'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'Forward P/E of ~34x is expensive but comparable to Lumentum (~33x) and in line with 32% growth',
        'P/S of ~8.4x is far cheaper than Lumentum (~19x) — Ciena is a systems vendor, not a pure component seller',
        'The real story is margin expansion: gross margin +400bps YoY (41% → 45%), operating margin +1,130bps YoY (8.2% → 19.5%), EPS +290% YoY — genuine operating leverage, not just revenue growth',
        'The stock has corrected ~48% from its ATH ($637.51), meaningfully improving the entry',
      ],
      justifiedIf: [
        'The $7.7B record backlog (80% hardware, convertible within 12 months) converts on schedule',
        'RLS HyperRail and DCOM scale from initial hyperscaler wins into the broader "scale-across" TAM ($25B today, ~$50B guided by 2029)',
        'Margin expansion continues rather than being a one-time supply-constraint artifact',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$280 – $300', rationale: 'Technical support post-correction, ~15% discount to spot' },
        { tier: 'acceptable', range: '$300 – $340', rationale: 'Current zone, progressive accumulation' },
        { tier: 'expensive', range: '>$400', rationale: 'Above the 50-day MA — risk/reward unfavorable' },
      ],
      technical: [
        'ATH $637.51 — current $331.09 is a ~48% correction from the top',
        '52-week low $84.41',
        'Trading below both the 50-day MA ($474) and 200-day MA ($348) — a downtrend by that measure',
        'Key support $300–320 (Feb–Mar 2026 congestion); major support $250–280; resistance $380–420',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'The $7.7B backlog converts and margin expansion continues — grinds toward the $565 analyst mean over 12–18 months.' },
        { label: 'BULL', prob: 25, note: 'HyperRail and DCOM scale faster than guided as the "scale-across" TAM opens — pushes toward the $720 high target.' },
        { label: 'BEAR', prob: 25, note: 'One of the two customers concentrating 34% of Q2 revenue slows capex, or supply constraints turn into a genuine demand problem — retests $240–270.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $240 (structure break)',
    },
    risks: [
      { risk: 'Customer concentration', severity: 'high', note: '2 customers = 34% of Q2 revenue. A major hyperscaler capex freeze or supplier switch would hit immediately.' },
      { risk: 'Supply constraints', severity: 'medium', note: 'Demand exceeds supply — the CFO said Q1 revenue "would have been higher if not for these constraints." A $7.7B backlog is a good problem, but it caps near-term growth.' },
      { risk: 'Valuation', severity: 'medium', note: 'Forward P/E ~34x, P/B 16x — a guidance miss could mean a 20% correction.' },
      { risk: 'Insider selling', severity: 'medium', note: 'Some insider sales have been flagged — not disqualifying, but a signal the current price isn’t an obvious bargain.' },
      { risk: 'Huawei competition', severity: 'medium', note: 'Huawei leads the global optical market (~31% share), though Ciena is #1 in North America (~51%) and benefits from US restrictions on Huawei.' },
      { risk: 'Nokia/Infinera', severity: 'medium', note: 'Combined, they’re ~20% share, comparable to Ciena — though Ciena has been taking share per Dell’Oro data.' },
      { risk: 'Tariffs', severity: 'low', note: 'Management calls the effect "immaterial" to the business.' },
    ],
    backlog: {
      visibility: [
        'Record backlog of $7.7B in Q2 FY2026, up $600M sequentially (Q1 was $7.0B, up from $5B in Q4 2025)',
        '80% of backlog ($6.4B) is hardware, convertible to revenue within 12 months',
        'Record annual orders of $7.8B in 2025; service-provider orders up +70% YoY — the CFO: "Customers would take as much as you could give them."',
      ],
      wins: [
        'RLS HyperRail: first multi-rail order from a leading hyperscaler in Q2 FY2026 — an intelligent optical line system for AI training over hundreds of kilometers, deals worth "hundreds of millions over multiple years," general availability late 2026',
        'DCOM: co-developed with Meta, a second hyperscaler ordered in Q2 — a $1–3B TAM by 2029 for datacenter out-of-band backend networking',
        '400G/800G pluggables on track to more than double vs. 2025; lead 400ZR+ supplier to a major hyperscaler',
        'Co-packaged optics (Vesta 200, 6.4T): up to 70% reduction in power consumption',
        'Acquired Nubis (Q4 2025) to strengthen the interconnect/back-end connectivity portfolio',
      ],
      clients: ['Microsoft', 'Meta', 'Google', 'Amazon'],
      suppliers: ['Lumentum', 'Coherent', 'AAOI'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 5, note: 'A global optical leader with high barriers to entry and real switching costs.' },
        { criterion: 'AI growth exposure', stars: 5, note: '"Scale-across" is a genuinely new, structural market — HyperRail, DCOM, CPO.' },
        { criterion: 'Profitability', stars: 5, note: 'Operating margin +1,130bps YoY, EPS +290% YoY — real operating leverage.' },
        { criterion: 'Valuation', stars: 3, note: 'Forward P/E ~34x, P/B 16x — expensive but defensible given the margin trajectory.' },
        { criterion: 'Risk', stars: 3, note: 'Customer concentration and supply constraints, offset by a moderate beta (1.27).' },
        { criterion: 'Entry timing', stars: 4, note: 'A 48% drawdown from the ATH sits in a reasonable accumulation zone.' },
      ],
      readLabel: 'CONSTRUCTIVE — THE "ARISTA OF OPTICAL"',
      summary:
        'A genuine transformation from cyclical telecom equipment vendor to structural AI infrastructure: margin expansion of +1,130bps in a single year is evidence of structural change, not just a cyclical upswing. In effect, the best of both worlds between Lumentum and Cisco — pure-play-AI-like growth, established-vendor diversification and scale, and margin expansion neither of those two currently shows at this pace.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
  },

  FORM: {
    ticker: 'FORM',
    name: 'FormFactor',
    tagline: 'The pick-and-shovel of wafer-level test — probe cards that touch every pad on every wafer before it’s cut, with a near-debt-free balance sheet.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'FormFactor sits between fabrication (LRCX/AMAT) and final test (Advantest/AEHR) — the invisible but indispensable link where every wafer must be tested before it’s diced. The more complex the die (HBM, GAA, chiplets), the more test points, extreme temperatures and precision are required.',
      rows: [
        { level: 'Fabrication (WFE)', players: 'LRCX, AMAT, ASML, TEL', position: 'Not exposed', tone: 'none' },
        { level: 'Inspection / metrology', players: 'KLAC, Onto Innovation', position: 'Complementary', tone: 'client' },
        { level: 'Wafer-level test', players: 'FORM (~30%), Technoprobe, MJC (~14%)', position: 'Global leader', tone: 'core' },
        { level: 'Final test (ATE)', players: 'Advantest, Teradyne, AEHR', position: 'Downstream', tone: 'client' },
        { level: 'Advanced packaging', players: 'ASE, Amkor, TSMC CoWoS', position: 'Direct customers', tone: 'client' },
        { level: 'HBM / memory', players: 'SK Hynix, Samsung, Micron', position: 'Direct customers', tone: 'client' },
      ],
      segments: [
        'Probe cards: ~85% of revenue — HBM, DRAM, logic/foundry, RF, co-packaged optics',
        'Systems: ~15% of revenue — probe stations, thermal and cryogenic test',
        'MEMS probe cards: ~70% of core patents, fine pitch / high pin count / 3D IC testing',
      ],
      aiShift:
        'FormFactor leads multi-temperature HBM probe cards (developed with SK Hynix) and micro-bump probing for 2.5D/3D advanced packaging (developed with Intel Foundry) — the two structural AI drivers on the memory and packaging side. The probe-card market itself is guided from $2.95B (2025) to $6.58B (2035), an 8.3% CAGR.',
    },
    valuation: {
      peers: ['FORM', 'Advantest', 'KLA', 'AEHR'],
      metrics: [
        { label: 'Price', values: ['$83.45', '$172.93', '$178.87', '$67.92'] },
        { label: 'Market cap', values: ['$6.5B', '$125B', '$233.6B', '$2.2B'] },
        { label: 'Trailing P/E', values: ['95.9x', '55.1x', '50.7x', 'N/A'] },
        { label: 'Forward P/E', values: ['~29.9x', '~37.5x', '~27.2x', '49.1x'] },
        { label: 'P/S (TTM)', values: ['~14.4x', '~16.8x', '~17.8x', '44.4x'] },
        { label: 'P/B', values: ['6.1x', '25.7x', '40.1x', '10.0x'] },
        { label: 'Beta', values: ['1.22', '1.19', '1.41', '3.18'] },
        { label: 'ROE', values: ['7.5%', '57.6%', '95.0%', '35.4%'] },
        { label: 'Net margin', values: ['9.1%', '33.3%', '35.7%', '-14.3%'] },
        { label: 'Gross margin (non-GAAP)', values: ['49.0%', '—', '—', '45%'] },
        { label: 'Revenue (TTM)', values: ['~$840M', '~$7.1B', '~$13.1B', '$50M'] },
        { label: 'Revenue growth', values: ['+32% (Q1)', '+51.9%', '+11.5%', '+160%'] },
        { label: 'Debt/Equity', values: ['3.0%', '~2.5%', '~54.6%', '~4.5%'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'Forward P/E of 29.9x is competitive vs. Advantest (37.5x) and AEHR (49x)',
        'P/B of 6.1x is the lowest in the test/inspection group — a real balance-sheet advantage',
        'Debt is nearly zero ($31.9M) — a rare luxury in semiconductor equipment',
        'Non-GAAP gross margin hit 49.0% in Q1 (+510bps sequential, +980bps YoY) — the restructuring is paying off',
        'The stock has corrected ~48% from its ATH ($160.27), meaningfully improving the entry',
      ],
      justifiedIf: [
        'Q1’s record revenue and margin expansion continue into Q2 as guided ($240M ±$5M revenue, 49.5% ±1.5% gross margin)',
        'HBM testing and advanced-packaging probe demand keep growing with the AI memory cycle',
        'The Texas factory ramp mitigates tariff exposure without eroding margins',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$65 – $75', rationale: 'Major technical support, P/B ~5x, ~20% discount to spot' },
        { tier: 'acceptable', range: '$75 – $95', rationale: 'Current zone, accumulation' },
        { tier: 'expensive', range: '>$100', rationale: 'Above the 50-day MA' },
      ],
      technical: [
        'ATH $160.27 — current $83.45 is a ~48% correction from the top',
        '52-week low $26.08',
        'Trading below both the 50-day MA ($124.99) and 200-day MA ($92.99) — a downtrend by that measure',
        'Key support $75–80 (March–April 2026 congestion); major support $65–70; resistance $95–100, $125',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'Revenue and margin records continue as guided — grinds toward the $145 analyst mean over 12–18 months.' },
        { label: 'BULL', prob: 25, note: 'HBM and advanced-packaging probe demand accelerate further, CoWoS probe cards (3–5x standard pricing) scale — pushes toward the $175 high target.' },
        { label: 'BEAR', prob: 25, note: 'The HBM/DRAM memory cycle turns, a major customer (SK Hynix, Samsung) freezes capex — retests $60–65.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $55 (structure break)',
    },
    risks: [
      { risk: 'DRAM/HBM cyclicality', severity: 'high', note: '~50% of probe-card revenue is memory-linked. If the HBM/DRAM cycle turns, FORM feels it immediately.' },
      { risk: 'Customer concentration', severity: 'high', note: 'A few large HBM/DRAM customers dominate — a capex freeze at SK Hynix or Samsung would be a real shock.' },
      { risk: 'Factory start-up costs', severity: 'medium', note: '$7M in Q1 tied to the Texas expansion, likely to persist through the ramp.' },
      { risk: 'Technoprobe competition', severity: 'medium', note: 'The #2 global player is advancing quickly in a competitive duopoly.' },
      { risk: 'MJC (Micronics Japan)', severity: 'medium', note: '#3 globally with 14% share, strong in memory — a risk of share loss in Asia.' },
      { risk: 'Tariffs / supply chain', severity: 'medium', note: 'The Texas factory mitigates this, but Asia exposure remains significant.' },
      { risk: 'Restructuring charges', severity: 'low', note: '$21.5M GAAP in Q1 — non-recurring and fading.' },
    ],
    backlog: {
      visibility: [
        'Q1 2026: record revenue of $226.1M (+32% YoY), GAAP net income $20.4M (+219% YoY), non-GAAP EPS $0.56 (+143% YoY, beat consensus $0.45)',
        'Non-GAAP gross margin of 49.0% (+980bps YoY), above guidance; free cash flow of $30.7M (+387% YoY)',
        'Q2 2026 guidance: another record — $240M ±$5M revenue, 49.5% ±1.5% gross margin, $0.61 ±$0.04 EPS',
      ],
      wins: [
        'SK Hynix: multi-temperature HBM testing partnership — HBM leadership tracks AI memory leadership',
        'Intel Foundry: micro-bump probing for 2.5D/3D advanced packaging',
        'MEMS probe cards: ~70%+ of core patents in a market that’s 73% MEMS-based',
      ],
      clients: ['SK Hynix', 'Intel Foundry', 'Samsung', 'Micron'],
      suppliers: [],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 4, note: 'A global leader with dominant MEMS patents and high barriers to entry.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'HBM testing and advanced packaging are structural AI drivers.' },
        { criterion: 'Profitability', stars: 4, note: 'Spectacular margin expansion (+980bps YoY) and positive free cash flow.' },
        { criterion: 'Valuation', stars: 4, note: 'A reasonable forward P/E (29.9x) and an attractive P/B (6.1x).' },
        { criterion: 'Balance sheet', stars: 5, note: 'Near-zero debt, $303M cash — a fortress.' },
        { criterion: 'Risk', stars: 4, note: 'Memory cyclicality is real, but beta of 1.22 is moderate.' },
        { criterion: 'Entry timing', stars: 4, note: 'A 48% drawdown from the ATH sits in a reasonable accumulation zone.' },
      ],
      readLabel: 'CONSTRUCTIVE — THE "KLA OF WAFER-LEVEL TEST"',
      summary:
        'An institutional-quality small-cap working through a real technical correction. Fundamentals are solid: record revenue, spectacular margin expansion, a fortress balance sheet, and direct exposure to both structural AI drivers on the test side (HBM and advanced packaging). Among the test/inspection group, this reads as the value play — a better forward P/E than Advantest, a better P/B than KLA, and far less volatile than AEHR.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
  },
}
