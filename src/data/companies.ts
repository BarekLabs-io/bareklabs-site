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

  ASML: {
    ticker: 'ASML',
    name: 'ASML Holding',
    tagline: 'The absolute, indispensable monopoly on lithography — without ASML, no advanced chip gets made. The most defensible link in the entire semiconductor chain.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'A single EUV machine costs ~$180M, weighs 180 tons, contains 100,000+ parts and has an 18–24 month lead time. ASML is the only company on earth that can build one — the ultimate physical bottleneck of AI.',
      rows: [
        { level: 'EUV lithography', players: 'ASML (100%)', position: 'Total monopoly', tone: 'core' },
        { level: 'DUV immersion lithography', players: 'ASML (98.7%), Nikon (1.3%)', position: 'Near-total monopoly', tone: 'core' },
        { level: 'DUV dry lithography', players: 'ASML, Nikon, Canon', position: 'Leader', tone: 'core' },
        { level: 'Metrology / inspection', players: 'ASML (YieldStar, HMI e-beam), KLAC', position: 'Complementary', tone: 'client' },
        { level: 'Foundry / IDM', players: 'TSMC, Samsung, Intel', position: 'Direct customers — 3 clients are nearly everything', tone: 'client' },
      ],
      segments: [
        'EUV: the only supplier worldwide — every leading-edge chip needs it',
        'High-NA EUV (EXE:5200): first accepted by Intel for high-volume manufacturing, priced ~$380–400M/unit vs. ~$180M for standard EUV',
        'GAA and CFET (sub-2nm) both require more EUV passes and, for CFET, High-NA EUV specifically — ASML is the sole supplier',
      ],
      aiShift:
        'Every AI GPU and accelerator chip requires ASML equipment somewhere in its production — there is no alternate path. GAA and CFET transitions both need more EUV layers per node, and HBM/3D DRAM (51% of Q1 system sales) is itself becoming a growth driver via EUV layers in memory.',
    },
    valuation: {
      peers: ['ASML', 'AMAT', 'LRCX', 'KLAC'],
      metrics: [
        { label: 'Price', values: ['$1,550.69', '$452.14', '$259.79', '$178.87'] },
        { label: 'Market cap', values: ['$595.6B', '$359B', '$325B', '$233.6B'] },
        { label: 'Trailing P/E', values: ['53.5x', '42.5x', '49.2x', '50.7x'] },
        { label: 'Forward P/E', values: ['26.8x', '26.8x', '31.8x', '27.2x'] },
        { label: 'P/S (TTM)', values: ['~16.9x', '12.4x', '15.0x', '~17.8x'] },
        { label: 'P/B', values: ['~1.33x', '15.0x', '30.7x', '40.1x'] },
        { label: 'EV/EBITDA', values: ['~33.3x', '40.7x', '42.8x', '~42.8x'] },
        { label: 'Beta', values: ['1.39', '1.57', '1.81', '1.41'] },
        { label: 'Dividend yield', values: ['0.57%', '0.41%', '0.36%', '0.45%'] },
        { label: 'ROE', values: ['53.9%', '40.6%', '45.7%', '95.0%'] },
        { label: 'Net margin', values: ['30.1%', '26.4%', '25.7%', '35.7%'] },
        { label: 'Revenue (TTM)', values: ['~$35.3B', '$29.0B', '$21.7B', '$13.1B'] },
        { label: 'Revenue growth FY2026E', values: ['+32–37%', '~30%', '~30%', '~11%'] },
        { label: 'Debt/Equity', values: ['9.1%', '—', '—', '54.6%'] },
      ],
      verdictTone: 'low',
      verdictPoints: [
        'Forward P/E of 26.8x matches AMAT (26.8x) and undercuts both LRCX (31.8x) and KLAC (27.2x) — the best valuation in the WFE group for the highest quality',
        'P/B of ~1.33x is remarkably low for a technology monopoly — partly a Dutch accounting artifact (asset revaluation), but also a sign the market hasn’t fully repriced the balance-sheet quality',
        'EV/EBITDA of ~33x is the lowest in the WFE peer group',
        'Debt/equity of 9.1% with $7.6B cash and $2B debt — a genuine fortress balance sheet, plus a €1.1B/quarter buyback on top of the dividend',
      ],
      justifiedIf: [
        'The raised FY2026 guidance (€43–45B, up from €36–40B) holds through the year',
        'High-NA EUV adoption at Intel, TSMC and Samsung scales as qualification completes',
        'GAA/CFET node transitions keep requiring more EUV exposure per wafer, as the thesis argues',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$1,350 – $1,450', rationale: '200-day MA return zone, ~10% discount to spot' },
        { tier: 'acceptable', range: '$1,450 – $1,650', rationale: 'Current zone through the recent congestion band' },
        { tier: 'expensive', range: '>$1,700', rationale: 'Approaching the 50-day MA — risk/reward unfavorable' },
      ],
      technical: [
        'ATH $1,999.96 — current $1,550.69 is a ~22.5% correction from the top',
        '52-week low $683.48',
        'Trading below the 50-day MA ($1,743) but above the 200-day MA ($1,382) — a short-term downtrend inside a longer uptrend',
        'Key support $1,450–1,500 (March–April 2026 congestion); major support $1,350–1,400 (200-day MA + February gap)',
      ],
      scenarios: [
        { label: 'BASE', prob: 55, note: 'Raised FY2026 guidance holds, High-NA EUV adoption scales as qualified — grinds toward the $2,000–2,300 analyst consensus over 12–18 months.' },
        { label: 'BULL', prob: 20, note: 'GAA/CFET transitions accelerate demand for EUV exposure per wafer faster than modeled — pushes toward the $2,867 high target.' },
        { label: 'BEAR', prob: 25, note: 'China export restrictions tighten further (~20% of revenue at stake) or a major customer (Intel) capex freeze hits — retests $1,200–1,350.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $1,200 (structure break)',
    },
    risks: [
      { risk: 'Export controls / China', severity: 'high', note: '~20% of revenue. Any tightening of DUV/EUV restrictions is a direct hit — management already guides ~20% for 2026.' },
      { risk: 'China EUV development', severity: 'medium', note: 'China is developing a domestic EUV prototype, with first chips possibly 2028–2030. An existential long-term threat if it succeeds, not a near-term one.' },
      { risk: 'Customer concentration', severity: 'high', note: 'TSMC, Samsung and Intel dominate — a capex freeze at any one (e.g. Intel financial distress) would be an immediate shock.' },
      { risk: 'WFE cyclicality', severity: 'medium', note: 'Less cyclical than perceived thanks to a multi-year backlog, but an AI slowdown would still be felt.' },
      { risk: 'High-NA EUV execution', severity: 'medium', note: 'Intel’s EXE:5200 has processed 500K+ wafers at ~80% uptime, but cost-per-exposure is 2.5x standard EUV — adoption could be slower than modeled.' },
      { risk: 'Zeiss supply chain', severity: 'medium', note: 'Critical dependence on Carl Zeiss for optics — a monopoly inside the monopoly.' },
      { risk: 'Hyper-NA R&D', severity: 'low', note: 'Very long-dated (~2030, ~$720M/tool) — a distant consideration, not a near-term risk.' },
    ],
    backlog: {
      visibility: [
        'Record backlog of €38.8B at end-2025, ~66% (€25.5B) of it EUV',
        'Record Q4 2025 bookings of €13.2B (€7.4B EUV)',
        'FY2026 guidance raised to €43–45B (from €36–40B); Q2 2026 actual €9.3B beat with 54% gross margin; Q3 guided at €11.0–12.0B',
      ],
      wins: [
        'Intel: first customer to accept the EXE:5200 High-NA EUV system for high-volume manufacturing',
        'TSMC and Samsung: in qualification on High-NA-produced wafers',
        'Capacity expansion signals structural demand: Low-NA EUV +30% by 2027, DUV immersion +30% by 2027, High-NA scaling through 2028',
      ],
      clients: ['TSMC', 'Samsung', 'Intel'],
      suppliers: ['Carl Zeiss (optics)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 5, note: 'An absolute monopoly with impassable barriers to entry and effectively infinite switching costs.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Every AI chip requires ASML somewhere in its production; €38.8B backlog.' },
        { criterion: 'Profitability', stars: 5, note: '30% net margin, 54% ROE, gross margin expanding toward 54–56%.' },
        { criterion: 'Valuation', stars: 5, note: 'Forward P/E of 26.8x is the best in the WFE group; P/B of ~1.3x is remarkably low.' },
        { criterion: 'Balance sheet', stars: 5, note: 'Debt/equity of 9%, $7.6B cash, near-zero debt.' },
        { criterion: 'Risk', stars: 4, note: 'China exposure (20%) and customer concentration, offset by a multi-year backlog.' },
        { criterion: 'Entry timing', stars: 4, note: 'A 22.5% drawdown from the ATH sits in a reasonable accumulation zone.' },
      ],
      readLabel: 'CONSTRUCTIVE — ARGUABLY THE BEST NAME ON THIS LIST',
      summary:
        'Probably the single best semiconductor business in the world right now, and the only link in the chain where the market hasn’t fully repriced the balance-sheet quality — a P/B near 1.3x for an unassailable monopoly is genuinely unusual. Every structural AI driver (GAA, CFET, HBM/3D DRAM) increases demand for ASML’s equipment specifically. The main risks are geopolitical (China exposure, customer concentration) rather than competitive — nobody else can build what ASML builds.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
  },

  TTMI: {
    ticker: 'TTMI',
    name: 'TTM Technologies',
    tagline: 'Advanced PCBs and substrates for AI datacenters and defense electronics — a downstream pick-and-shovel with ~80% of sales tied to AI + defense.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Not a front-end semiconductor play — no lithography, no foundry — but a critical downstream infrastructure supplier: the advanced PCBs and substrates that GPU/ASIC/networking modules are built on, with a strong defense-electronics overlay. AI + defense is ~80% of net sales per CEO Edwin Roks.',
      rows: [
        { level: 'Advanced PCBs (HDI, Ultra-HDI, 20–40 layer)', players: 'TTMI, TSMC substrate peers', position: 'Core business — AI datacenter buildout', tone: 'core' },
        { level: 'RF & microwave', players: 'TTMI and defense-electronics peers', position: 'Radar, secure comms, electronic warfare', tone: 'growth' },
        { level: 'Mission systems / A&D', players: 'Raytheon (customer), TTMI', position: 'Defense super-cycle exposure', tone: 'core' },
        { level: 'IC substrates', players: 'Advanced packaging suppliers', position: 'Bridge to advanced packaging', tone: 'growth' },
      ],
      segments: [
        'Data Center + Networking: 36% of Q4’25 revenue, +57% YoY',
        'Aerospace & Defense: ~46% of FY2025 revenue, $1.46B backlog with visibility into 2027',
        'New capacity: Penang, Malaysia (highly automated, full production since early 2025); Syracuse, NY (Ultra-HDI, defense-dedicated, ramping H2 2026)',
      ],
      aiShift:
        'AI servers need 20–40 layer, Ultra-HDI PCBs in exotic materials — exactly TTMI’s core competency. Not a direct player in front-end technologies (ALD, hybrid bonding, GAA, CFET — those belong to foundries and equipment makers), but a clear downstream beneficiary as package and system complexity rises. Co-packaged optics and silicon photonics are flagged as a real forward strategic axis (the CEO is a founding member of the Optica Executive Team).',
    },
    valuation: {
      peers: ['TTMI', 'JBL', 'SANM', 'CLS', 'FN'],
      metrics: [
        { label: 'Price', values: ['$101.77', '—', '—', '—', '—'] },
        { label: 'Market cap', values: ['$10.6B', '$30.1B', '$8.8B', '$37.8B', '$14.9B'] },
        { label: 'Forward P/E', values: ['18.8x', '17.1x', '11.8x', '17.1x', '23.9x'] },
        { label: 'EV/EBITDA', values: ['25.5x', '13.6x', '11.1x', '24.5x', '29.0x'] },
        { label: 'Revenue growth', values: ['30.4%', '11.8%', '69.7%', '62.4%', '39.3%'] },
        { label: 'Net margin', values: ['6.3%', '2.6%', '2.4%', '7.2%', '9.9%'] },
        { label: 'Beta', values: ['2.10', '1.28', '1.56', '1.52', '1.20'] },
      ],
      verdictTone: 'high',
      verdictPoints: [
        'Trailing P/E of 55.3x is high in absolute terms, but reflects a real transformation from cyclical PCB maker to critical AI + defense infrastructure supplier',
        'Forward P/E of ~18.8x (vs. a ~17x peer average) is reasonable against ~32% EPS growth (FY26→FY27); implied PEG of ~0.36 trailing suggests growth largely justifies the multiple',
        'P/S of 3.4x is high vs. pure EMS players (JBL 0.9x, SANM 0.7x) but comparable to Fabrinet (3.5x), another optical/AI-infrastructure play',
        'Not the cheapest name in the group — SANM and JBL are more "value" on multiples — but TTMI offers the purest advanced-PCB exposure to AI plus a higher net margin than JBL/SANM',
      ],
      justifiedIf: [
        'Operating margin expands toward the guided 13–15% (from 8.6% today) and EBITDA margin toward 16–18%',
        'The $1.46B defense backlog and 1.15 book-to-bill ratio keep converting on schedule',
        'AI datacenter capex (the leading indicator per the doc itself) doesn’t roll over',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$90 – $105', rationale: 'Near the 200-day MA (~$112), technical support' },
        { tier: 'acceptable', range: '$105 – $140', rationale: 'Current zone through moderate accumulation' },
        { tier: 'expensive', range: '>$160', rationale: 'Above the base-case target — thin margin of safety' },
      ],
      technical: [
        '52-week high $223.83 — current $101.77 is a ~55% correction from the top',
        'Free cash flow TTM is -$55M despite $324M of operating cash flow — heavy capex from Syracuse, Penang and European acquisitions',
        'Book-to-bill ratio of 1.15 (Q4’25), 90-day backlog of $610.4M',
      ],
      scenarios: [
        { label: 'BASE', prob: 45, note: 'Growth continues with a moderate slowdown, margins reach 12–13% — targets $140–160.' },
        { label: 'BULL', prob: 30, note: 'AI capex stays robust, margins reach 15%, European acquisitions (Swiss Technology Group, ILFA) integrate well — targets $180–200.' },
        { label: 'BEAR', prob: 25, note: 'An AI capex recession hits, multiples compress, margins miss — targets $70–85.' },
      ],
      horizon: '12–24 months',
      invalidation: 'Weekly close below $75 (-26% from a $101.77 entry)',
    },
    risks: [
      { risk: 'AI capex concentration', severity: 'high', note: 'A hyperscaler (Google, Microsoft, Meta, Amazon) capex pullback hits TTMI directly — the stock has already dropped 55% from its top, partly pricing this in.' },
      { risk: 'Valuation / multiple compression', severity: 'high', note: 'Forward P/E of 19x is reasonable, but an earnings miss or margin guidance cut could compress it sharply — beta of 2.1 amplifies moves either way.' },
      { risk: 'Heavy capex / negative FCF', severity: 'medium', note: 'TTM free cash flow is -$55M despite $324M of operating cash flow, as Syracuse, Penang and European M&A drain cash.' },
      { risk: 'M&A integration', severity: 'medium', note: 'The Swiss Technology Group and ILFA acquisitions (Europe) carry real execution risk.' },
      { risk: 'Geopolitics / tariffs', severity: 'medium', note: 'Exposure across China (4 PCB plants), Malaysia and the US amid ongoing US–China tension.' },
      { risk: 'Customer concentration', severity: 'medium', note: 'A handful of large hyperscale and defense customers represent a significant share of revenue.' },
      { risk: 'Defense budget cyclicality', severity: 'medium', note: 'Defense budgets can be lumpy depending on appropriation cycles.' },
    ],
    backlog: {
      visibility: [
        'Defense (A&D) backlog of $1.46B, with visibility into 2027',
        'Book-to-bill ratio of 1.15 in Q4’25 (>1.0 means new orders are outpacing revenue) — a solid pipeline signal',
        '90-day backlog of $610.4M as of Q4’25',
      ],
      wins: [
        'LTAMDS (Raytheon): a potential multi-year contract worth $200M+',
        'AN/APS-153: exclusive Navy supplier for the MH-60R program',
        'MOSAIC AESA radar: maritime surveillance, counter-UAS, advanced air mobility',
        'June 2026: acquired Swiss Technology Group and ILFA to expand European footprint, aligned with rising NATO spending',
      ],
      clients: ['Raytheon', 'US Navy', 'Unnamed AI hyperscalers'],
      suppliers: [],
    },
    synthesis: {
      scores: [
        { criterion: 'AI infrastructure theme', stars: 4, note: 'A direct pick-and-shovel on advanced PCBs, though not core semiconductor front-end.' },
        { criterion: 'Defense theme', stars: 5, note: '$1.46B backlog, multi-year programs, real super-cycle exposure.' },
        { criterion: 'Valuation', stars: 3, note: 'A reasonable forward P/E against high P/S and EV/EBITDA vs. peers.' },
        { criterion: 'Growth', stars: 4, note: 'Revenue +30%, EPS guided +55%, solid guidance.' },
        { criterion: 'Backlog / visibility', stars: 4, note: 'Book-to-bill of 1.15 and a long-dated defense backlog.' },
        { criterion: 'Risk', stars: 3, note: 'Beta of 2.10, negative FCF, real AI-capex dependence.' },
      ],
      readLabel: 'CONSTRUCTIVE — CAUTIOUS ACCUMULATION AFTER THE CORRECTION',
      summary:
        'A dual-theme story: the purest advanced-PCB exposure to AI datacenter buildout, layered with a genuine defense super-cycle backlog that provides a revenue floor independent of the AI cycle. The 55% drawdown from the 52-week high already prices in real AI-capex slowdown fear, and the forward multiple looks reasonable against guided growth — but beta of 2.1 and negative free cash flow argue for scaling in gradually rather than a single entry, watching hyperscaler capex trends as the leading indicator.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
  },

  HIVE: {
    ticker: 'HIVE',
    name: 'HIVE Digital Technologies',
    tagline: 'A green-energy Bitcoin miner pivoting into Tier-3 AI/HPC colocation across Canada, Sweden and Paraguay — a hybrid crypto cash engine funding a genuine AI infrastructure bet.',
    sector: 'ENERGY & SPACE',
    asOf: '2026.08',
    chain: {
      intro:
        'Not a semiconductor play. HIVE operates renewable-powered data centers across Canada, Sweden and Paraguay — founded in 2017 as a green Bitcoin miner, pivoting since 2023 toward AI/HPC through its BUZZ HPC division. It sits in two rows of the value chain at once: an emerging Tier-3 AI cloud/colo player and a top-10-global Bitcoin miner (25.1 EH/s). This is a hybrid Bitcoin-mining-plus-AI-infrastructure "picks and shovels" play, not a front-end semi name — the thesis is a valuation re-rating from cyclical crypto-miner multiples toward recurring AI-datacenter multiples.',
      rows: [
        { level: 'Fabrication (front-end)', players: 'TSMC, Samsung, Intel', position: 'Not applicable', tone: 'none' },
        { level: 'Advanced packaging / testing', players: 'ASE, Amkor, Advantest', position: 'Not applicable', tone: 'none' },
        { level: 'AI data center / HPC', players: 'CoreWeave, Lambda, Crusoe, HIVE', position: 'Emerging player — Tier-3 AI cloud & colo', tone: 'growth' },
        { level: 'Bitcoin mining', players: 'MARA, RIOT, CLSK, HIVE', position: 'Top-10 global — 25.1 EH/s', tone: 'core' },
      ],
      segments: [
        'Revenue FY2026: $297.8M, +158% YoY — a record, and the only positive revenue growth among mining peers',
        'Gross operating margin FY2026: $107.9M, +329% YoY, 36.2% margin',
        'Adjusted EBITDA FY2026: $72.9M; operating cash flow $62.3M, ×3.5 vs FY2025',
        '93.5% of revenue is still Bitcoin mining — the AI pivot is real but small relative to the core business today',
      ],
      aiShift:
        'HIVE has no exposure to ALD, hybrid bonding, GAA/CFET or advanced packaging — it sits downstream, hosting the compute rather than making it. Its relevance is entirely about power and land: 860 MW of footprint (440 MW active) in a world where power is the #1 bottleneck on AI buildout. BUZZ Cloud was rated by SemiAnalysis ClusterMAX 2.0, an industry-recognized GPU-cloud scoring system, which lends technical credibility to the infrastructure. Sovereign AI / data-residency (Canadian-soil compute) and green/sustainable compute (100% renewable — hydro, wind) are flagged as genuine differentiators versus US hyperscale colo.',
    },
    valuation: {
      peers: ['HIVE', 'RIOT', 'MARA', 'CLSK', 'WULF'],
      metrics: [
        { label: 'Price', values: ['$2.54', '$18.24', '$10.05', '$12.01', '$15.09'] },
        { label: 'Market cap', values: ['$0.7B', '$6.9B', '$3.8B', '$3.1B', '$7.5B'] },
        { label: 'P/S (TTM)', values: ['2.3x', '10.6x', '4.4x', '4.2x', '44.5x'] },
        { label: 'Revenue growth YoY', values: ['+158%', '+3.6%', '-18.4%', '-24.9%', '-1.1%'] },
        { label: 'Hash rate (EH/s)', values: ['25.1', '33.8', '58.0', '90.0', '10.0'] },
        { label: 'Power (MW)', values: ['440', '600', '250', '1,000', '300'] },
        { label: 'Gross margin', values: ['36.2%', '32.3%', '45.3%', '50.7%', '64.0%'] },
        { label: 'Beta', values: ['3.72', '3.81', '5.37', '3.84', '4.26'] },
      ],
      verdictTone: 'low',
      verdictPoints: [
        'The lowest P/S in the group (2.3x vs. 4.2–10.6x for RIOT/MARA/CLSK, and a startling 44.5x for WULF)',
        'The only peer with positive and massive revenue growth (+158% YoY) — RIOT, MARA and CLSK are all declining',
        'Smallest market cap in the group ($0.7B) despite a real infrastructure base (440 MW active, 25.1 EH/s)',
        'Highest analyst upside-to-target in the peer set (+179% vs. 63–151% for peers) — Buy rating, 7 of 8 analysts',
      ],
      justifiedIf: [
        'The $220M Bell Canada + Cohere GPU-cloud contract keeps converting and the broader $660M FY2028 HPC ARR pipeline materializes',
        'Bitcoin holds above roughly $60k, keeping the mining cash engine intact while the AI pivot scales',
        'The GTA Gigafactory (320 MW, ~$3.5B CAD) reaches contracted capacity without major cost overrun or delay',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$2.20 – $2.60', rationale: 'Current zone, close to swing-low support' },
        { tier: 'acceptable', range: '$2.00 – $2.80', rationale: 'DCA range for a small, staged position' },
        { tier: 'expensive', range: '>$4.80', rationale: 'Intermediate resistance zone from April–May 2026 consolidation' },
      ],
      technical: [
        '52-week range $1.73 – $7.84 — current $2.54 is a ~68% correction from the high',
        'Price sits below the 50-day MA (~$3.69) and above the 200-day MA (~$3.23)',
        'Major support $1.73 (52-week low, absolute floor); near support $2.20–$2.30; near resistance $3.20–$3.50 (MA50 + volume zone)',
        '267M shares outstanding with warrants/options/RSUs outstanding; a $115M 0%-coupon convertible at $2.57/share is dilutive, partially offset by a $4.92 capped call',
        '21% of float is short — squeeze potential, but also persistent selling pressure',
      ],
      scenarios: [
        { label: 'BASE', prob: 45, note: 'HPC pipeline executes on schedule, Bitcoin stable above $60k, gradual valuation re-rating — targets $4.00–5.50.' },
        { label: 'BULL', prob: 25, note: 'Gigafactory HPC contract signed, GPU cloud ARR reaches $200M — targets $6.00–8.00.' },
        { label: 'BEAR', prob: 30, note: 'Bitcoin falls below $40k, the AI pivot stalls, dilution accelerates — targets $1.50–2.00.' },
      ],
      horizon: '18–36 months',
      invalidation: 'Weekly close below $1.60 (-37% from a $2.54 entry)',
    },
    risks: [
      { risk: 'Bitcoin price dependence', severity: 'high', note: '93.5% of revenue is still mining. If BTC falls below roughly $40k, cash flow collapses and the AI pivot loses its funding engine.' },
      { risk: 'Massive dilution', severity: 'high', note: '267M shares outstanding plus warrants, options and RSUs; a $115M 0%-coupon convertible at $2.57/share adds further dilutive pressure (partially capped at $4.92).' },
      { risk: 'AI-pivot execution', severity: 'high', note: 'The ~$3.5B CAD GTA Gigafactory is a huge undertaking for a company this size — real risk of cost overrun, delay, or a shortfall of signed clients.' },
      { risk: 'Intense HPC competition', severity: 'high', note: 'CoreWeave, Lambda, Crusoe and the hyperscalers themselves are all chasing the same colo/cloud demand; HIVE is a newcomer with a thin enterprise track record.' },
      { risk: 'Narrative-dependent valuation', severity: 'high', note: 'The share price leans heavily on the AI-pivot story; a stumble in narrative — not just fundamentals — could hit the stock hard.' },
      { risk: 'Sweden regulatory friction', severity: 'medium', note: 'VAT tax issues forced HIVE to halt ASIC mining in Sweden and pivot that site to HPC instead.' },
      { risk: 'Short interest', severity: 'medium', note: '21% of float is shorted — a possible squeeze catalyst, but also a persistent overhang.' },
    ],
    backlog: {
      visibility: [
        'Current GPU cloud ARR run-rate: $35M (FY2026)',
        'GPU cloud target: $200M ARR by FY2027 (6,000 GPUs)',
        'HPC colocation (Toronto, Boden, New Brunswick) target: $460M ARR by FY2028',
        'GTA Gigafactory colo target: $360M ARR by late 2027/early 2028',
        'Total HPC ARR target: $660M by FY2028 — a real but largely unproven pipeline',
      ],
      wins: [
        'Bell Canada + Cohere: $220M, 3-year GPU-cloud contract — 2,304 Nvidia Grace Blackwell GPUs, ~$70M ARR — the first large-scale proof point for the model',
        'Bell Canada AI Fabric: strategic colocation partnership, 16.6 MW IT across Manitoba and British Columbia',
        'BUZZ Cloud rated by SemiAnalysis ClusterMAX 2.0, an industry-recognized GPU-cloud quality benchmark',
        'CEO Aydin Kilic has laid out an explicit sum-of-the-parts valuation: ~CAD 3.6B for HPC colo (8x forward FY2028E ARR), ~CAD 1.2B for GPU cloud (5.9x FY2027E ARR), ~CAD 0.5B for Bitcoin mining — implying CAD 5.3–7.6B total EV against a ~CAD 0.9B market cap today, a potential 4–8x re-rating if execution follows',
      ],
      clients: ['Bell Canada', 'Cohere'],
      suppliers: ['Dell Technologies', 'NVIDIA', 'Hypertec'],
    },
    synthesis: {
      scores: [
        { criterion: 'AI infrastructure theme', stars: 4, note: 'Not core semiconductor exposure, but a real and critical downstream infrastructure position.' },
        { criterion: 'Bitcoin / crypto theme', stars: 4, note: 'Top-10 global miner at 25.1 EH/s, green energy base, resilient post-halving margins.' },
        { criterion: 'Valuation', stars: 4, note: 'P/S of 2.3x is the lowest in the peer set, with large upside if the AI re-rating thesis plays out.' },
        { criterion: 'Growth', stars: 5, note: 'Revenue +158% YoY — the only peer with positive growth in a declining sector.' },
        { criterion: 'Backlog / visibility', stars: 3, note: '$35M ARR today versus a $660M FY2028 target — a real pipeline but still mostly "if."' },
        { criterion: 'Risk', stars: 2, note: 'Beta of 3.72, heavy dilution, Bitcoin dependence and unproven AI execution all stack in the same direction.' },
      ],
      readLabel: 'SPECULATIVE — A STRUCTURED LOTTERY TICKET ON THE AI-INFRASTRUCTURE RE-RATE',
      summary:
        'HIVE pairs the cheapest multiple and the only positive growth rate in the crypto-mining peer group with a genuine, if still small, AI/HPC infrastructure buildout funded by Bitcoin cash flow. The 860 MW power footprint is a scarce, real asset, and the Bell Canada + Cohere contract is a credible first proof point — but 93.5% of revenue remains Bitcoin-cyclical, dilution is ongoing, and the Gigafactory is a large bet for a company this size. A beta near 4 and a stack of "if" risks make this a small, staged satellite position rather than a core holding — sized for a portfolio that can absorb the swings, not a conservative one.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
  },

  CRDO: {
    ticker: 'CRDO',
    name: 'Credo Technology Group',
    tagline: 'A fabless connectivity pure-play — AECs, retimers and optical DSPs wiring together AI data centers, growing revenue faster than any peer in the group.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'A fabless semiconductor company (Cayman-incorporated, San Jose-operated, founded 2008) designing high-speed connectivity for data centers and AI infrastructure: SerDes, retimers, optical DSPs, Active Electrical Cables (AECs) and — since the DustPhotonics acquisition — silicon photonics, all built around 112G/224G PAM4 Ethernet and PCIe. Unlike Marvell, which spans custom silicon, storage and networking, Credo is a 100%-focused connectivity pure-play: an edge in expertise, a concentration risk in outcome.',
      rows: [
        { level: 'Fabrication (front-end)', players: 'TSMC, Samsung, Intel', position: 'Fabless — no fab', tone: 'none' },
        { level: 'Equipment (WFE)', players: 'LRCX, AMAT, ASML, TEL', position: 'Not exposed', tone: 'none' },
        { level: 'Connectivity / interconnect', players: 'CRDO, MRVL, ALAB, AVGO', position: 'Leader — AEC + retimers', tone: 'core' },
        { level: 'Optical DSP / silicon photonics', players: 'CRDO, MRVL, Broadcom, Ayar Labs', position: 'Fast-growing position', tone: 'growth' },
        { level: 'Advanced packaging', players: 'ASE, Amkor, TSMC CoWoS', position: 'Direct customers', tone: 'client' },
        { level: 'AI data center / HPC', players: 'Hyperscalers (Microsoft, Google, Meta)', position: 'Primary end market', tone: 'client' },
      ],
      segments: [
        'AEC (Active Electrical Cables): ~65% of FY2026 revenue — ZeroFlap AEC is 1,000x more reliable than optics at half the power',
        'IC (retimers, optical DSPs): ~28% — Ethernet and PCIe retimers, Bluebird optical DSP at 200G/lane',
        'Optical / ZeroFlap / other: ~7% today, flagged as the future growth engine — ZeroFlap optics, silicon-photonics PICs, OmniConnect',
        'Revenue FY2026: $1.30B, +205.7% YoY — a record; FY2027 guide is >80% YoY growth, implying ~$2.35B',
      ],
      aiShift:
        'AECs are emerging as the standard for inter-rack connectivity up to 7 meters, displacing optics inside AI clusters. The $750M DustPhotonics acquisition adds silicon-photonics PICs (Oz, Tamar, Carmel, Kfir — a 400G-to-3.2T roadmap) aimed squarely at co-packaged optics, with management flagging the total addressable market as having tripled in 18 months to over $10B across AEC, retimers, optical DSPs, silicon photonics/CPO and PCIe Gen 6 retimers.',
    },
    valuation: {
      peers: ['CRDO', 'MRVL', 'ALAB', 'AVGO'],
      metrics: [
        { label: 'Price', values: ['$177.45', '$163.40', '$249.74', '$370.32'] },
        { label: 'Market cap', values: ['$33.1B', '$146.7B', '$42.8B', '$1,762B'] },
        { label: 'Revenue growth YoY', values: ['+206%', '+28%', '+93%', '+48%'] },
        { label: 'Forward P/E', values: ['19.6x', '26.2x', '54.7x', '19.0x'] },
        { label: 'P/S (TTM)', values: ['25.5x', '16.8x', '42.8x', '23.3x'] },
        { label: 'Gross margin', values: ['68.0%', '51.5%', '76.0%', '76.3%'] },
        { label: 'Operating margin', values: ['33.3%', '14.5%', '20.1%', '49.0%'] },
        { label: 'Beta', values: ['3.20', '2.20', '3.67', '1.46'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'The strongest revenue growth in the group by far (+206% YoY) — no peer is close',
        'Forward P/E of 19.6x is the lowest in the set after AVGO (19.0x) and well below ALAB (54.7x)',
        'Operating margin of 33.3% beats Marvell (14.5%) and Astera Labs (20.1%) — exceptional operating efficiency for a company scaling this fast',
        'P/S (TTM) of 25.5x is elevated, but the forward P/S (~14.1x on FY2027E) is competitive against the peer set',
      ],
      justifiedIf: [
        'FY2027 optical revenue clears the guided $600M and the DustPhotonics integration lands without major disruption',
        'The four >10%-of-revenue hyperscaler customers keep expanding their AEC and retimer orders rather than diversifying suppliers',
        'AI datacenter capex holds up and Marvell/Astera Labs don\'t win meaningful share in the AEC "cable war"',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$160 – $175', rationale: 'Near the 200-day MA (~$165), technical support' },
        { tier: 'acceptable', range: '$150 – $185', rationale: 'DCA range through moderate accumulation' },
        { tier: 'expensive', range: '>$220', rationale: 'April–May 2026 consolidation resistance — thin margin of safety above it' },
      ],
      technical: [
        '52-week range $86.49 – $308.67 — current $177.45 is a ~43% correction from the high',
        'Price sits below the 50-day MA (~$233) and above the 200-day MA (~$165)',
        'Near resistance $195–200 (pre-breakout zone); major support $140–150 (February 2026 gap); absolute floor $86.49 (52-week low)',
        '~3.2% of float is short',
      ],
      scenarios: [
        { label: 'BASE', prob: 45, note: '>80% FY2027 growth confirmed, margins hold stable — targets $220–260.' },
        { label: 'BULL', prob: 25, note: 'FY2027 optical revenue beats $600M, DustPhotonics integration succeeds — targets $280–320.' },
        { label: 'BEAR', prob: 30, note: 'AI capex slows, multiple compresses, Credo loses share to Marvell/Astera Labs — targets $120–150.' },
      ],
      horizon: '12–24 months',
      invalidation: 'Weekly close below $135 (-24% from a $177.45 entry)',
    },
    risks: [
      { risk: 'Customer concentration', severity: 'high', note: 'Four hyperscalers each represent >10% of revenue. One design or supplier change from any of them is a -30% to -50% shock.' },
      { risk: 'AI capex dependence', severity: 'high', note: 'If hyperscalers pull back AI spending, AEC demand collapses with it.' },
      { risk: 'Valuation / multiple compression', severity: 'high', note: 'Forward P/E of 19.6x is reasonable, but a guidance miss could compress it -20% to -30% given a beta of 3.2.' },
      { risk: 'Competition from Marvell and Astera Labs', severity: 'high', note: 'Marvell launched its Golden Cable Initiative and Astera Labs has Scorpio P-Series — the AEC "cable war" is fully underway.' },
      { risk: 'DustPhotonics acquisition execution', severity: 'medium', note: '$750M for a startup generating roughly $20–30M of revenue carries real integration, dilution and execution risk.' },
      { risk: 'Beta of 3.20', severity: 'medium', note: 'Extreme volatility — the stock ran $86 → $309 → $177 within 12 months.' },
      { risk: 'Geopolitics / China exposure', severity: 'medium', note: 'Design centers in Shanghai and Taiwan expose Credo to ongoing US–China tension.' },
    ],
    backlog: {
      visibility: [
        'FY2027 revenue guide: >$2.35B (>80% YoY)',
        'FY2027 optical revenue guide: >$600M (ZeroFlap + PICs + DSPs)',
        'DustPhotonics integration targets combined optical revenue >$500M post-close in FY2027',
        'FY2029 management narrative: $3.2B revenue, $1.2B earnings',
      ],
      wins: [
        'Microsoft and Google: top-4 clients, each >10% of revenue, AEC-majority (Microsoft) and AEC-plus-retimers (Google)',
        'Two additional US hyperscalers in AEC production ramp-up, plus a fifth hyperscaler beginning initial AEC sales',
        'DustPhotonics: $750M acquisition adding silicon-photonics PICs for CPO / 1.6T roadmaps',
        'TSMC: foundry partner and symposium showcase for 224G PAM4 SerDes IP',
        'PCIe Gen 6 retimers: design wins in FY2026, revenue conversion expected FY2027',
      ],
      clients: ['Microsoft', 'Google'],
      suppliers: ['TSMC', 'DustPhotonics (post-acquisition)'],
    },
    synthesis: {
      scores: [
        { criterion: 'AI infrastructure theme', stars: 5, note: 'Connectivity is a critical layer of the AI data center — Credo sits right in it.' },
        { criterion: 'Growth', stars: 5, note: '+206% revenue YoY — the best in the sector by a wide margin.' },
        { criterion: 'Profitability', stars: 4, note: '68% gross margin, 33% operating margin, 35% net margin — exceptional for a company scaling this fast.' },
        { criterion: 'Balance sheet', stars: 5, note: '$1.44B cash, $25M debt, current ratio of 10.15 — a fortress.' },
        { criterion: 'Valuation', stars: 3, note: 'Forward P/E of 19.6x is attractive, but P/S (TTM) of 25.5x is elevated.' },
        { criterion: 'Risk', stars: 2, note: 'Beta of 3.2, extreme customer concentration, and an AI-capex-dependent demand base all stack together.' },
      ],
      readLabel: 'CONSTRUCTIVE — THE HIGH-QUALITY GROWTH NAME IN AI CONNECTIVITY',
      summary:
        'Credo pairs the fastest revenue growth in the AI-connectivity peer group with a genuinely fortress balance sheet and a forward multiple that looks reasonable against >80% guided FY2027 growth. The DustPhotonics acquisition is a real diversification bet beyond copper AECs into silicon photonics and CPO, expanding an already-tripled TAM. The offsetting risk is structural, not cyclical: four customers each carry more than 10% of revenue, and a beta above 3 means any stumble on guidance or customer mix gets amplified hard. A staged entry near technical support rather than a single full-size position fits a name with this much upside and this much single-name concentration risk.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
  },

  BE: {
    ticker: 'BE',
    name: 'Bloom Energy Corp',
    tagline: 'Global leader in solid-oxide fuel cells for on-site power generation — the "bring your own power" answer to AI data centers outrunning the grid.',
    sector: 'ENERGY & SPACE',
    asOf: '2026.08',
    chain: {
      intro:
        'Bloom Energy (founded 2001 by former NASA scientist Dr. K.R. Sridhar, San Jose, CA) designs, manufactures and installs modular Energy Servers — solid-oxide fuel cells (SOFC) that convert natural gas or hydrogen blends into electricity electrochemically, without combustion, at roughly 65% electrical efficiency. It is the global SOFC market leader (~18% share) and a distributed-generation leader as AI data centers hit grid-interconnection limits and need on-site power now, not in five years.',
      rows: [
        { level: 'Fabrication (front-end)', players: 'TSMC, Samsung, Intel', position: 'Not exposed', tone: 'none' },
        { level: 'Equipment (WFE)', players: 'LRCX, AMAT, ASML, TEL', position: 'Not exposed', tone: 'none' },
        { level: 'Power generation / utilities', players: 'VST, TLN, NEE, BE', position: 'Distributed-generation leader', tone: 'core' },
        { level: 'Fuel cell technology', players: 'BE (~18% market share), FCEL, Doosan', position: 'Global SOFC leader', tone: 'core' },
        { level: 'AI data center / HPC', players: 'Hyperscalers (Microsoft, Google, Meta, Oracle)', position: 'Primary end market — "bring your own power"', tone: 'client' },
        { level: 'Semiconductor manufacturing', players: 'TSMC, Intel, Samsung', position: 'Direct customer', tone: 'client' },
      ],
      segments: [
        'Product (Energy Servers): ~88% of Q2 2026 revenue ($935M) — core sale-and-install business',
        'Service & installation: ~9% ($100M) — maintenance, commissioning, stack replacements',
        'Electricity & other: ~3% ($30M) — power purchase agreements, RECs',
        'Q2 2026 revenue: $1.065B, +166% YoY, +42% QoQ — the first quarter above $1B, a confirmed inflection point; FY2026 guidance raised to $3.9–4.2B (~100% YoY growth)',
      ],
      aiShift:
        '"Bring your own power" has moved from slogan to necessity for AI hyperscalers as grid interconnection queues stretch years — McKinsey projects US data-center power demand nearly doubling from 82 GW (2025) to 153 GW (2028). Bloom\'s differentiators are battery-less load following (millisecond response to AI compute load swings) and absorption cooling from waste heat (cutting data-center electricity consumption by 20%+) — capabilities the source frames as unique versus PEM/MCFC alternatives. Six hyperscalers/neoclouds are now in the backlog, up from one a year ago.',
    },
    valuation: {
      peers: ['BE', 'FCEL', 'VST', 'TLN'],
      metrics: [
        { label: 'Price', values: ['$163.75', '$18.08', '$142.81', '$316.19'] },
        { label: 'Market cap', values: ['$48.2B', '$1.45B', '$48.2B', '$15.1B'] },
        { label: 'Revenue growth YoY', values: ['+130%', '-5%', '+43%', '+97%'] },
        { label: 'Forward P/E', values: ['33.7x', 'N/A', '13.6x', '11.1x'] },
        { label: 'P/S (TTM)', values: ['15.5x', '6.9x', '2.5x', '4.7x'] },
        { label: 'Gross margin', values: ['34.3%', '-18.2%', '38.6%', '40.1%'] },
        { label: 'Operating margin', values: ['22.5%', '-99.3%', '26.6%', '17.2%'] },
        { label: 'Beta', values: ['3.74', '2.31', '1.41', '1.62'] },
      ],
      verdictTone: 'high',
      verdictPoints: [
        'By far the strongest revenue growth in the group (+130% YoY) against fuel-cell and utility peers',
        'Forward P/E of 33.7x is high in absolute terms, but arguably justified by ~100% guided growth and a confirmed profitability inflection',
        'P/S (TTM) of 15.5x is rich — the market is pricing several years of sustained growth, not just the current quarter',
        'Bloom is the only fuel-cell peer profitable at scale — FCEL is still burning cash heavily (-99.3% operating margin); VST and TLN are cheaper on multiples but are traditional utilities with lower growth',
      ],
      justifiedIf: [
        'FY2026 revenue lands at or above the guided $3.9–4.2B and gross margin holds near 34%',
        'Manufacturing capacity scales from ~1 GW to the targeted 2 GW without delivery delays',
        'The six hyperscaler/neocloud backlog commitments convert on schedule without a mega-client deferral',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$140 – $165', rationale: 'Near the 200-day MA (~$178), historical support' },
        { tier: 'acceptable', range: '$130 – $180', rationale: 'DCA range through moderate accumulation' },
        { tier: 'expensive', range: '>$250', rationale: 'May–June 2026 congestion zone — thin margin of safety above it' },
      ],
      technical: [
        '52-week range $32.52 – $351.28 — current $163.75 is a ~53% correction from the high',
        'Price sits between the 50-day MA (~$263, well above) and the 200-day MA (~$178, just above current price) — a technically bearish position below the 200-day',
        'Near support $150–160 (February–March 2026 congestion); major support $120–140 (January–February 2026 base); absolute floor $32.52 (52-week low)',
      ],
      scenarios: [
        { label: 'BASE', prob: 45, note: 'Execution against the $3.9–4.2B FY2026 guide, margins stable near 34% — targets $200–260.' },
        { label: 'BULL', prob: 25, note: 'FY2026 beats $4.2B+, capacity expansion announced, a new mega-client signs — targets $280–350.' },
        { label: 'BEAR', prob: 30, note: 'Delivery misses, multiple compression, AI capex slowdown — targets $100–140.' },
      ],
      horizon: '12–24 months',
      invalidation: 'Weekly close below $110 (-33% from a $163.75 entry)',
    },
    risks: [
      { risk: 'Valuation / multiple compression', severity: 'high', note: 'Forward P/E of 33.7x, P/S of 15.5x and P/B of 59.7x leave very little margin for error — a quarterly miss could mean an immediate -20% to -30% move given a beta of 3.74.' },
      { risk: 'Production capacity', severity: 'high', note: 'The $3.9–4.2B guide requires scaling to roughly 2 GW of capacity; if manufacturing can\'t keep pace, deliveries slip.' },
      { risk: 'Customer concentration', severity: 'high', note: 'Six hyperscalers dominate the backlog — a deferral or cancellation from any mega-client is an immediate shock.' },
      { risk: 'Natural gas price dependence', severity: 'medium', note: 'Energy Servers run primarily on natural gas; a sustained price increase erodes the economic advantage versus grid power.' },
      { risk: 'Leverage', severity: 'medium', note: 'D/E of 171.6% ($2.8B of debt) — the company now generates real cash, but leverage remains elevated.' },
      { risk: 'Competition from FCEL, Doosan, Ceres', severity: 'medium', note: 'FCEL has a 4 GW pipeline (90% data centers) and Doosan mass-produces 50 MW/year of SOFC — though Bloom is described as roughly 20 years ahead technologically.' },
      { risk: 'Energy policy / regulation', severity: 'medium', note: 'Shifts in natural-gas policy, clean-energy subsidies, or data-center siting rules could affect demand.' },
      { risk: 'Beta of 3.74', severity: 'medium', note: 'Extreme volatility — the stock ran $32 → $351 → $164 within 12 months.' },
    ],
    backlog: {
      visibility: [
        'Product backlog: $6B+ as of Q4 2025 — doubled in a single quarter',
        'Estimated total backlog (including 20-year service contracts): ~$20B',
        'Hyperscaler clients: 6, up from 1 a year ago',
        'Repeat-customer revenue: ~2/3 of the commercial & industrial segment',
        'FY2026 revenue guide: $3.9–4.2B (raised, ~100% YoY); FY2026 non-GAAP operating income guide: $800–900M (~21% margin); non-GAAP EPS guide: $2.55–2.85',
      ],
      wins: [
        'Nebius: 328 MW deployed, long-term AI-cloud partnership, first project operational in 2026',
        'Brookfield: $5B financing partnership for AI data center deployment — de-risks the capital side',
        'SK ecoplant (SK Group): 500 MW through 2027, $1.5B product plus $3B of 20-year service revenue',
        'AEP (American Electric Power): $2.65B unconditional order, the largest in Bloom\'s history, deliverable independent of final offtake',
        'IDF + Oaktree: $1.7B investment financing fuel-cell deployments',
        'Equinix: 100+ MW across 19 data centers in 6 US states',
        'Oracle and Crusoe: strategic power collaborations for data-center and neocloud infrastructure',
      ],
      clients: ['Nebius', 'AEP', 'Oracle', 'Crusoe', 'Equinix', 'SK ecoplant'],
      suppliers: ['Brookfield (financing)', 'IDF + Oaktree (financing)'],
    },
    synthesis: {
      scores: [
        { criterion: 'AI infrastructure theme', stars: 5, note: 'On-site power is the #1 bottleneck for AI data centers — Bloom sits directly on it.' },
        { criterion: 'Growth', stars: 5, note: '+130% revenue YoY, ~100% FY2026 guidance — the strongest growth profile in the group.' },
        { criterion: 'Profitability', stars: 4, note: '34.3% gross margin, 22.5% operating margin, 24% EBITDA margin — a confirmed inflection, GAAP EPS turned positive at $0.62.' },
        { criterion: 'Backlog / visibility', stars: 5, note: '$6B+ product backlog, six hyperscaler clients, multi-year commitments.' },
        { criterion: 'Valuation', stars: 2, note: 'Forward P/E of 33.7x, P/S of 15.5x, P/B near 60x — expensive, leaving little room for error.' },
        { criterion: 'Risk', stars: 2, note: 'Beta of 3.74, D/E of 171.6%, and customer concentration all compound the valuation risk.' },
      ],
      readLabel: 'CONSTRUCTIVE — THE QUALITY ENERGY PLAY ON AI INFRASTRUCTURE',
      summary:
        'Bloom Energy has crossed from promising to proven: the first $1B quarter, doubled FY2026 guidance, GAAP profitability, and a $6B+ backlog spanning six hyperscalers who have no alternative to on-site power while grid interconnection queues stretch for years. The technology moat (SOFC efficiency, battery-less load following, waste-heat cooling) looks genuinely differentiated versus FCEL and Doosan. The clear offsetting risk is valuation — a forward multiple in the low 30s and a P/S above 15x leave the stock priced for continued execution, and a beta near 3.74 means any capacity delay or hyperscaler deferral gets punished hard and fast. A staged entry near the 200-day moving average rather than a single full-size position fits the risk/reward here.',
    },
    sourceNote:
      'Adapted from a financial-metrics compilation dated August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
  },
'8035.T': {
  ticker: '8035.T',
  name: 'Tokyo Electron',
  tagline: 'Japan\'s WFE flagship — dominant in coater/developer (>90% share) and a top-3 global player in etch/deposition, riding the same AI capex wave as Lam and Applied Materials.',
  sector: 'TELECOM & TECH',
  asOf: '2026.08',
  chain: {
    intro: 'Tokyo Electron (TEL) is the largest Japanese wafer-fab-equipment maker and one of the "big five" WFE suppliers alongside ASML, Applied Materials, Lam Research and KLA. Its coater/developer franchise (photoresist coating/developing systems) is a near-monopoly, and it holds strong share in etch, deposition and cleaning tools used at every advanced logic and memory node.',
    rows: [
      { level: 'Coater/developer', players: 'TEL (>90% share)', position: 'Near-monopoly — the photolithography companion process to ASML\'s scanners', tone: 'core' },
      { level: 'Etch / deposition / clean', players: 'TEL, Lam Research, Applied Materials', position: 'Top-3 global player, strong in 3D NAND and DRAM etch', tone: 'core' },
      { level: 'EUV lithography', players: 'ASML (monopoly)', position: 'Complementary — TEL\'s coater/developer tools sit right after ASML\'s scanners in the litho cell', tone: 'client' },
      { level: 'Foundry / memory fabs', players: 'TSMC, Samsung, SK Hynix, Micron, Intel', position: 'Direct customers — capex-driven order book', tone: 'client' },
      { level: 'HBM / advanced memory', players: 'SK Hynix, Samsung, Micron', position: 'Growth vector — HBM stacking requires more etch/deposition/coater steps per wafer', tone: 'growth' },
    ],
    segments: [
      'FY2026 (ended March 2026) revenue: record ¥2.44T, roughly flat YoY (+0.5%) after two years of a China-driven pull-forward, but H1 FY2027 guidance raised to +33% YoY on the back of a Q4 beat',
      'China fell to ~31.8% of sales in the most recent quarter (an 8.5pp sequential drop from earlier ~41–42% levels) as the initial 2023–2025 restriction-driven stockpiling normalizes; management expects China to stabilize near ~30%',
      'Coater/developer segment (>90% share) is guided for >50% YoY growth as DRAM and advanced-logic customers expand capacity',
      'Balance sheet: ~¥455B net cash position, no meaningful debt',
    ],
    aiShift: 'Every advanced logic and HBM/DRAM wafer that gets etched, deposited, cleaned or coated for photolithography likely passes through a TEL tool. The GAA transition (more etch/deposition layers per transistor) and the HBM stacking boom (more process steps per memory die) both increase TEL\'s dollar content per wafer independent of unit volume — the same structural tailwind driving Lam Research and Applied Materials.',
  },
  valuation: {
    peers: ['8035.T', 'LRCX', 'AMAT', 'ASML'],
    metrics: [
      { label: 'Price', values: ['¥58,670', '$259.79', '$452.14', '$1,550.69'] },
      { label: 'Market cap', values: ['~¥24.4T (~$160B)', '$325B', '$359B', '$595.6B'] },
      { label: 'Trailing P/E', values: ['~42.9x', '49.2x', '42.5x', '53.5x'] },
      { label: 'Forward P/E', values: ['~35.1x', '31.8x', '26.8x', '26.8x'] },
      { label: 'P/B', values: ['~14.9x', '30.7x', '15.0x', '~1.33x'] },
      { label: 'EV/EBITDA', values: ['~20.1x', '42.8x', '40.7x', '~33.3x'] },
      { label: 'Dividend yield', values: ['~1.3%', '0.36%', '0.41%', '0.57%'] },
      { label: 'Beta', values: ['1.24', '1.81', '1.57', '1.39'] },
      { label: 'ROE', values: ['28.5%', '45.7%', '40.6%', '53.9%'] },
      { label: 'Revenue (FY2026)', values: ['¥2.44T', '$21.7B', '$29.0B', '~$35.3B'] },
      { label: 'Revenue growth', values: ['+0.5% (H1 FY27 guided +33%)', '~30%', '~30%', '+32–37%'] },
    ],
    verdictTone: 'fair',
    verdictPoints: [
      'Forward P/E of ~35x is the richest multiple in the WFE peer group — a premium to LRCX (31.8x), AMAT (26.8x) and even ASML (26.8x)',
      'The premium is partly explained by TEL\'s near-monopoly coater/developer franchise (>90% share) and a fortress balance sheet (~¥455B net cash, no debt) — but it leaves little room for a China-normalization surprise',
      'P/B of ~14.9x is far above ASML\'s ~1.33x (an accounting artifact) but broadly in line with LRCX/AMAT on an asset-light manufacturing model',
      'The flat FY2026 revenue print (+0.5%) masks the real trend — H1 FY2027 guidance of +33% suggests the China-driven distortion is clearing and underlying AI-capex demand is reasserting',
    ],
    justifiedIf: [
      'H1 FY2027 guidance (+33% YoY) holds as China stabilizes near ~30% of sales rather than falling further',
      'Coater/developer segment delivers the guided >50% YoY growth as DRAM/HBM and advanced-logic capacity expands',
      'No further tightening of Japan-aligned export controls on China-bound WFE',
    ],
  },
  priceMap: {
    zones: [
      { tier: 'ideal', range: '¥42,000 – ¥50,000', rationale: 'Near the 200-day MA, a meaningful discount to the ¥81,260 ATH' },
      { tier: 'acceptable', range: '¥50,000 – ¥65,000', rationale: 'Current trading zone, consistent with WFE-cycle re-acceleration' },
      { tier: 'expensive', range: '>¥75,000', rationale: 'Approaching the 52-week high — limited margin of safety' },
    ],
    technical: [
      '52-week range: ¥19,870 – ¥81,260 — the stock is up ~51% over the trailing year but has pulled back meaningfully from the high',
      'Current price ¥58,670 sits roughly 28% below the 52-week high',
      'Analyst commentary flags a neutral stance around a ¥73,000 price target given China-revenue uncertainty despite the raised H1 FY2027 outlook',
      'Net cash of ~¥455B provides a floor during any WFE-cycle air pocket',
    ],
    scenarios: [
      { label: 'BASE', prob: 50, note: 'China stabilizes near 30% of sales, H1 FY2027 guidance of +33% is met as coater/developer and etch orders convert — grinds back toward the ¥70,000–80,000 area.' },
      { label: 'BULL', prob: 20, note: 'HBM/DRAM capex accelerates further and advanced-logic GAA transitions add incremental tool intensity — retests the ¥81,260 ATH and beyond.' },
      { label: 'BEAR', prob: 30, note: 'Further export-control tightening on China or a WFE-cycle digestion pause after two strong years — retraces toward ¥40,000–45,000.' },
    ],
    horizon: '12–24 months',
    invalidation: 'Weekly close below ¥38,000 (breaks the post-correction base)',
  },
  risks: [
    { risk: 'China export controls', severity: 'high', note: 'China fell from ~41–42% to ~31.8% of sales in one quarter as restrictions and stockpile normalization bite — a swing factor of tens of billions of yen in quarterly revenue.' },
    { risk: 'WFE cyclicality', severity: 'medium', note: 'Semiconductor capex is inherently lumpy; a digestion phase after the 2025–2026 AI-driven capex surge is a normal-cycle risk.' },
    { risk: 'Customer concentration', severity: 'high', note: 'TSMC, Samsung, SK Hynix, Micron and Intel dominate order books — any one customer\'s capex pause is directly felt.' },
    { risk: 'Valuation premium', severity: 'medium', note: 'Forward P/E (~35x) is the richest in the WFE group — a multiple that assumes the China normalization completes cleanly.' },
    { risk: 'Yen sensitivity', severity: 'low', note: 'A structurally stronger yen would compress reported yen revenue/margins even if dollar-denominated demand holds.' },
    { risk: 'Competitive share loss', severity: 'medium', note: 'Etch/deposition is contested with Lam Research and Applied Materials; coater/developer dominance is TEL-specific but not immune to long-term share erosion.' },
  ],
  backlog: {
    visibility: [
      'FY2026 (ended March 2026) revenue: record ¥2.44T',
      'H1 FY2027 guidance raised to +33% YoY on a Q4 FY2026 beat',
      'Coater/developer segment targeted for >50% YoY growth on DRAM/advanced-logic capacity additions',
    ],
    wins: [
      'Coater/developer near-monopoly (>90% share) remains structurally intact through the current capex cycle',
      'Positioned directly behind ASML in the lithography cell — every EUV/DUV exposure needs a TEL (or peer) coat/develop step',
      'Etch and deposition share gains in 3D NAND and HBM-adjacent DRAM processes',
    ],
    clients: ['TSMC', 'Samsung', 'SK Hynix', 'Micron', 'Intel'],
    suppliers: [],
  },
  synthesis: {
    scores: [
      { criterion: 'Business quality', stars: 5, note: 'Near-monopoly coater/developer franchise plus top-3 global share in etch/deposition/clean.' },
      { criterion: 'AI growth exposure', stars: 5, note: 'GAA and HBM/DRAM stacking both raise TEL\'s dollar content per wafer.' },
      { criterion: 'Profitability', stars: 4, note: 'ROE of 28.5% and a debt-free, ~¥455B net-cash balance sheet.' },
      { criterion: 'Valuation', stars: 2, note: 'Forward P/E (~35x) is the richest multiple among the major WFE peers.' },
      { criterion: 'Balance sheet', stars: 5, note: 'Zero net debt, ~¥455B cash cushion.' },
      { criterion: 'Risk', stars: 3, note: 'China exposure (~32% of sales) remains the single largest swing factor in the model.' },
      { criterion: 'Entry timing', stars: 3, note: 'A ~28% pullback from the ATH offers some cushion, but the multiple has not de-rated as much as peers.' },
    ],
    readLabel: 'CONSTRUCTIVE — PREMIUM WFE FRANCHISE, PREMIUM PRICE',
    summary: 'Tokyo Electron sits at the center of the WFE oligopoly with a coater/developer franchise nobody else can easily replicate, and the FY2026 flat print is a China-driven optical illusion masking a real re-acceleration signaled by the +33% H1 FY2027 guide. The catch is valuation: at ~35x forward earnings, TEL trades at the top of its own peer group (ahead of Lam, Applied Materials and even ASML), pricing in a clean China stabilization that has not yet fully played out. This reads better as a name to accumulate on China-driven or cyclical air pockets than to chase at the current multiple — sizing should reflect that the balance sheet is a genuine safety net, but the price is not obviously cheap.',
  },
  sourceNote: 'Compiled from public market data (stockanalysis.com, Yahoo Finance, GuruFocus, Investing.com) and company/analyst disclosures as of August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
},

'6857.T': {
  ticker: '6857.T',
  name: 'Advantest Corporation',
  tagline: 'The dominant player (~50%+ share) in automated test equipment — the single most direct way to buy the HBM/AI-chip testing boom, in a duopoly with Teradyne.',
  sector: 'TELECOM & TECH',
  asOf: '2026.08',
  chain: {
    intro: 'Advantest builds the automated test equipment (ATE) that verifies every advanced logic chip, GPU, ASIC and — critically — every HBM stack before it ships. It holds an estimated 50%+ share of the overall ATE market, in a duopoly with Teradyne, and roughly half of its memory-test business is now HBM-specific.',
    rows: [
      { level: 'SoC / logic test', players: 'Advantest, Teradyne', position: 'Duopoly — tests every AI GPU/ASIC/CPU before shipment', tone: 'core' },
      { level: 'Memory test (HBM/DRAM/NAND)', players: 'Advantest (leader), Teradyne', position: 'HBM is now ~50% of Advantest\'s memory-test business', tone: 'core' },
      { level: 'Handlers / interface', players: 'Advantest, Cohu', position: 'Adjacent back-end test infrastructure', tone: 'client' },
      { level: 'AI GPU / ASIC design', players: 'Nvidia, AMD, Broadcom, hyperscaler ASIC programs', position: 'Every chip these players tape out needs ATE time', tone: 'client' },
      { level: 'HBM producers', players: 'SK Hynix, Samsung, Micron', position: 'Direct beneficiary of the HBM3e/HBM4 test-intensity ramp', tone: 'growth' },
    ],
    segments: [
      'FY2026 guidance raised sharply: sales to ¥1,714.0B (from ¥1,420.0B), operating income to ¥846.0B (from ¥627.5B), net income to ¥660.0B (from ¥465.5B) — all record levels',
      'Q1 FY2026 revenue +39% YoY with a record 51.7% operating margin',
      'HBM now makes up roughly 50% of the memory-test business; HBM3e/HBM4 investment is described as following an independent growth curve from the traditional memory cycle',
      'Test demand is broadening beyond training GPUs into inference-focused ASICs, CPUs and DRAM as the AI market shifts from training to inference',
    ],
    aiShift: 'No AI accelerator, HBM stack or advanced ASIC ships without passing through ATE — and HBM in particular requires materially more test time and complexity than conventional DRAM due to stacking and repair requirements. Advantest is arguably the single cleanest way to express the "AI chip volume growth" thesis without picking winners among GPU/ASIC vendors, since it gets paid regardless of which chip design wins.',
  },
  valuation: {
    peers: ['6857.T', 'TER', 'COHU'],
    metrics: [
      { label: 'Price', values: ['¥33,350', '—', '—'] },
      { label: 'Market cap', values: ['~¥24.3T (~$165B)', '$47.6B', '$2.26B'] },
      { label: 'Forward P/E', values: ['~39.6x', '~48–53x', 'n/m (loss-making TTM)'] },
      { label: 'P/B', values: ['44.3x', '—', '—'] },
      { label: 'EV/EBITDA', values: ['37.9x', '—', '—'] },
      { label: 'Dividend yield', values: ['0.2%', '—', '—'] },
      { label: 'Beta', values: ['1.21', '—', '—'] },
      { label: 'Revenue growth', values: ['+39% (Q1 FY26)', '—', '+38% (Q2 2026)'] },
    ],
    verdictTone: 'high',
    verdictPoints: [
      'Forward P/E of ~39.6x is rich in absolute terms but below Teradyne\'s ~48–53x, despite Advantest holding the larger ATE share (~50%+ vs Teradyne\'s ~40%)',
      'P/B of 44.3x reflects a business with very high returns on a relatively capital-light balance sheet, but leaves no margin for a testing-demand air pocket',
      'The stock is up roughly +411% over the trailing 52 weeks — an extraordinary re-rating that has already priced in a large share of the HBM/AI-test thesis',
      'Cohu (the smaller, more diversified back-end name) trades at a fraction of Advantest\'s market cap and is not a like-for-like comp on HBM exposure',
    ],
    justifiedIf: [
      'The raised FY2026 guidance (sales +21%, operating profit +35% vs prior guide) is actually delivered as HBM4 ramps',
      'AI inference-driven test demand for ASICs/CPUs/DRAM continues to run ahead of the April-2026 baseline projections',
      'HBM test intensity per bit keeps rising as stack heights increase (HBM4, HBM4E) rather than plateauing',
    ],
  },
  priceMap: {
    zones: [
      { tier: 'ideal', range: '¥22,000 – ¥26,000', rationale: 'Roughly 2x the 52-week low, a meaningful pullback from the current price' },
      { tier: 'acceptable', range: '¥26,000 – ¥34,000', rationale: 'Current trading zone following the guidance raise' },
      { tier: 'expensive', range: '>¥36,000', rationale: 'Near the 52-week high — priced for flawless execution' },
    ],
    technical: [
      '52-week range: ¥9,744 – ¥35,940 — a ~411% move over the trailing year, among the largest of any large-cap semiconductor name globally',
      'Current price ¥33,350 sits close to the top of that range',
      'Beta of 1.21 understates realized volatility given the scale of the 52-week move',
      'Record Q1 FY2026 operating margin of 51.7% signals genuine operating leverage, not just multiple expansion',
    ],
    scenarios: [
      { label: 'BASE', prob: 45, note: 'Raised FY2026 guidance is met as HBM4 test intensity ramps in line with expectations — the stock consolidates in the ¥30,000–38,000 range.' },
      { label: 'BULL', prob: 20, note: 'AI-inference test demand continues to outrun April-2026 projections and HBM4E adds further test complexity — a fresh leg toward ¥42,000+.' },
      { label: 'BEAR', prob: 35, note: 'A pause in hyperscaler AI capex or an HBM inventory digestion cycle triggers multiple compression from the current ~40x forward P/E — retraces toward ¥18,000–22,000.' },
    ],
    horizon: '12–18 months',
    invalidation: 'Weekly close below ¥18,000 (roughly halves the current price, breaking the 2026 uptrend structurally)',
  },
  risks: [
    { risk: 'Valuation / multiple compression', severity: 'high', note: 'A +411% 52-week move and a ~40x forward P/E leave very little room for disappointment; any guidance miss would likely trigger an outsized de-rating.' },
    { risk: 'HBM cycle concentration', severity: 'high', note: 'A large share of the current growth narrative is HBM-specific — a slowdown in HBM capacity additions at SK Hynix/Samsung/Micron would hit disproportionately.' },
    { risk: 'Customer concentration', severity: 'medium', note: 'A handful of memory makers and a handful of AI-chip designers drive the bulk of incremental ATE demand.' },
    { risk: 'Teradyne competition', severity: 'medium', note: 'The ATE market is effectively a duopoly — Teradyne is a credible, well-capitalized competitor for the same testing dollars.' },
    { risk: 'AI capex cyclicality', severity: 'high', note: 'ATE spending is a leading (and volatile) indicator of chip production plans; any hyperscaler capex pause flows through quickly.' },
    { risk: 'Currency', severity: 'low', note: 'A materially stronger yen would compress yen-reported results even with stable dollar demand.' },
  ],
  backlog: {
    visibility: [
      'FY2026 guidance raised to ¥1,714.0B sales (+21% vs prior guide), ¥846.0B operating income (+35% vs prior guide), ¥660.0B net income (+42% vs prior guide)',
      'Q1 FY2026 revenue +39% YoY, record 51.7% operating margin',
      'HBM ~50% of memory-test business and described as decoupling from the traditional memory cycle',
    ],
    wins: [
      'T5833 memory tester — full HBM test/repair solution combined with ALPG and DBM',
      'T5801 ultra-high-speed memory test system launched for next-generation DRAM',
      'AI-inference test demand for ASICs/CPUs/DRAM running ahead of April-2026 company projections',
    ],
    clients: ['SK Hynix', 'Samsung', 'Micron', 'Leading AI GPU/ASIC designers (indirect via foundry/OSAT test flow)'],
    suppliers: [],
  },
  synthesis: {
    scores: [
      { criterion: 'Business quality', stars: 5, note: 'Duopoly-leading share (~50%+) in a mission-critical, high-switching-cost category.' },
      { criterion: 'AI growth exposure', stars: 5, note: 'Every HBM stack and AI chip needs ATE time — HBM alone is ~50% of memory-test revenue.' },
      { criterion: 'Profitability', stars: 5, note: 'Record 51.7% operating margin in the most recent quarter.' },
      { criterion: 'Valuation', stars: 2, note: '~40x forward P/E and a +411% 52-week move leave little room for error.' },
      { criterion: 'Balance sheet', stars: 4, note: 'Capital-light model with strong incremental margins funding the raised guidance.' },
      { criterion: 'Risk', stars: 3, note: 'Heavy HBM/AI-capex concentration cuts both ways — a powerful tailwind and a single point of failure.' },
      { criterion: 'Entry timing', stars: 2, note: 'Trading near the top of an extraordinary 52-week range; a disciplined entry would wait for a pullback.' },
    ],
    readLabel: 'SPECULATIVE MOMENTUM — BEST-IN-CLASS BUSINESS, STRETCHED PRICE',
    summary: 'Advantest is arguably the purest way to buy the HBM/AI-chip test cycle, with duopoly-leading share and margins that just hit a record 51.7% — the raised FY2026 guidance is real, not promotional. But a +411% trailing-52-week move and a ~40x forward multiple mean the market has already underwritten a great deal of future HBM4/HBM4E growth, and the stock now behaves like a high-beta proxy for AI-capex sentiment rather than a steady compounder. This is a name where position sizing and entry discipline matter more than the underlying business quality — a staged approach on pullbacks toward the lower half of the 52-week range is more defensible than chasing strength near the highs.',
  },
  sourceNote: 'Compiled from public market data (stockanalysis.com, Investing.com earnings-call transcripts, company IR) as of August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
},

'6146.T': {
  ticker: '6146.T',
  name: 'Disco Corporation',
  tagline: 'The de facto monopoly on precision dicing, grinding and polishing — every wafer that becomes a chip passes through a Disco tool at least once, and advanced packaging/HBM stacking is raising the tool count per wafer.',
  sector: 'TELECOM & TECH',
  asOf: '2026.08',
  chain: {
    intro: 'Disco holds an estimated 70%+ global share in dicing saws and a dominant position in precision grinders and polishers — the tools that separate a finished wafer into individual dies and thin it for advanced packaging. As chiplet architectures and HBM stacking multiply the number of dicing/grinding/TAIKO-style thinning steps per finished package, Disco\'s dollar content per wafer rises structurally.',
    rows: [
      { level: 'Dicing saws', players: 'Disco (dominant share)', position: 'Near-monopoly — every die-separation step needs one', tone: 'core' },
      { level: 'Grinders / polishers (wafer thinning)', players: 'Disco, Tokyo Seimitsu (Accretech)', position: 'Leader — critical for advanced packaging thinning', tone: 'core' },
      { level: 'Advanced packaging / chiplets', players: 'TSMC, Samsung, Intel, OSATs', position: 'Direct growth driver as multi-die packages proliferate', tone: 'growth' },
      { level: 'HBM stacking', players: 'SK Hynix, Samsung, Micron', position: 'Each additional DRAM layer needs its own grind/dice step', tone: 'growth' },
      { level: 'Front-end fabs / foundries', players: 'TSMC, Samsung, memory makers', position: 'Direct customers', tone: 'client' },
    ],
    segments: [
      'FY2026 (ended March 2026) guidance: net sales ¥419.0B, operating income ¥172.1B, net income ¥126.4B, EPS ¥1,165.72',
      'Q1 FY2027 (Apr–Jun 2026) guidance: net sales ¥106.1B (+18.0% YoY), operating profit ¥42.0B, net income ¥29.5B',
      'Growth driver: multi-layer stacking (HBM) and the spread of chiplets are increasing the technical difficulty — and dollar value — of grinding/dicing without damaging thinner, more fragile wafers',
      'Disco discloses guidance only one quarter ahead given the volatility of semiconductor-industry demand',
    ],
    aiShift: 'AI accelerators increasingly rely on chiplet packaging and HBM memory stacks, both of which require far more precision dicing/grinding/thinning steps than a monolithic die. Disco captures incremental revenue directly from this packaging complexity — it does not need unit wafer-start growth alone, just rising process-step intensity per wafer, which the AI-driven packaging shift is delivering.',
  },
  valuation: {
    peers: ['6146.T', '7729.T', 'AMAT'],
    metrics: [
      { label: 'Price', values: ['¥71,900', '—', '$452.14'] },
      { label: 'Market cap', values: ['~¥7.87T (~$36.4B)', '~¥782B (~$5.3B)', '$359B'] },
      { label: 'Trailing P/E', values: ['~50.8x', '~26.4x', '42.5x'] },
      { label: 'Dividend yield', values: ['~0.9%', '—', '0.41%'] },
      { label: 'Beta', values: ['~0.9–1.0', '—', '1.57'] },
      { label: 'Revenue growth (latest Q guide)', values: ['+18.0%', '—', '~30%'] },
    ],
    verdictTone: 'high',
    verdictPoints: [
      'Trailing P/E of ~50.8x is well above Tokyo Seimitsu\'s ~26.4x, though Tokyo Seimitsu is a smaller, more diversified metrology/dicing player rather than a pure precision-processing monopoly',
      'Disco\'s premium reflects its dominant share in a category (dicing) with very high switching costs and blade/consumables recurring revenue',
      'Market cap has more than doubled over the trailing year (+110%), a re-rating consistent with the broader WFE/AI-packaging complex',
      'One-quarter-ahead guidance (rather than full-year) makes the stock structurally harder to underwrite on a DCF basis — the market is pricing a continuation of the current growth cadence',
    ],
    justifiedIf: [
      'Q1 FY2027 guided +18% YoY growth continues at a similar cadence through the year',
      'Chiplet/HBM-driven process-step intensity keeps rising faster than underlying wafer-start growth',
      'No sharp digestion phase in advanced-packaging capex after two strong years of AI-driven investment',
    ],
  },
  priceMap: {
    zones: [
      { tier: 'ideal', range: '¥45,000 – ¥55,000', rationale: 'Roughly the midpoint of the 52-week range, a meaningful discount to current' },
      { tier: 'acceptable', range: '¥55,000 – ¥80,000', rationale: 'Current trading zone' },
      { tier: 'expensive', range: '>¥88,000', rationale: 'Near the 52-week high — priced for uninterrupted growth' },
    ],
    technical: [
      '52-week range: ¥37,260 – ¥91,680',
      'Current price ¥71,900 sits roughly 22% below the 52-week high',
      'One-quarter-ahead guidance cadence (net sales +18.0% for the June 2026 quarter) is the market\'s main forward signal',
      'Dividend yield of ~0.9–1.0% is modest, consistent with a growth-reinvestment profile',
    ],
    scenarios: [
      { label: 'BASE', prob: 45, note: 'Quarterly guidance cadence continues in the high-teens % YoY range as chiplet/HBM packaging intensity rises — the stock holds the ¥65,000–85,000 band.' },
      { label: 'BULL', prob: 25, note: 'HBM4/advanced-packaging adoption accelerates faster than modeled, pushing toward a retest of the ¥91,680 high.' },
      { label: 'BEAR', prob: 30, note: 'A digestion phase in advanced-packaging capex or a soft quarterly guide triggers multiple compression from ~51x trailing P/E — retraces toward ¥45,000–55,000.' },
    ],
    horizon: '12–24 months',
    invalidation: 'Weekly close below ¥42,000 (below the lower third of the 52-week range)',
  },
  risks: [
    { risk: 'Valuation', severity: 'high', note: 'Trailing P/E of ~50.8x prices in continued high-teens+ growth; a guidance miss would likely compress the multiple sharply.' },
    { risk: 'One-quarter guidance visibility', severity: 'medium', note: 'Disco discloses forecasts only one quarter ahead — inherently less predictable than peers with fuller-year guidance.' },
    { risk: 'Advanced-packaging capex cyclicality', severity: 'medium', note: 'A pause in chiplet/HBM packaging investment at TSMC, Samsung or the memory makers would directly reduce process-step intensity growth.' },
    { risk: 'Customer concentration', severity: 'medium', note: 'A handful of leading-edge foundries and memory makers account for the bulk of advanced dicing/grinding demand.' },
    { risk: 'Competition from Tokyo Seimitsu/Accretech', severity: 'low', note: 'A credible domestic competitor exists in grinding/dicing/metrology, though Disco retains share leadership.' },
    { risk: 'Yen strength', severity: 'low', note: 'A stronger yen compresses reported results even with stable dollar-denominated demand.' },
  ],
  backlog: {
    visibility: [
      'FY2026 guidance: net sales ¥419.0B, operating income ¥172.1B, net income ¥126.4B',
      'Q1 FY2027 guidance: net sales ¥106.1B (+18.0% YoY), operating profit ¥42.0B',
      'Guidance disclosed one quarter ahead given demand volatility',
    ],
    wins: [
      'Structural beneficiary of chiplet adoption and HBM stacking — both increase dicing/grinding steps per finished package',
      'TAIKO-style wafer-thinning processes positioned directly against the advanced-packaging trend',
      'Consumables (dicing blades, grinding wheels) provide a recurring-revenue tail alongside capital equipment sales',
    ],
    clients: ['TSMC', 'Samsung', 'SK Hynix', 'Leading OSATs (indirect)'],
    suppliers: [],
  },
  synthesis: {
    scores: [
      { criterion: 'Business quality', stars: 5, note: 'Dominant share in a mission-critical, high-switching-cost category with a recurring-consumables tail.' },
      { criterion: 'AI growth exposure', stars: 5, note: 'Chiplet and HBM-stacking adoption directly raise Disco\'s dollar content per wafer.' },
      { criterion: 'Profitability', stars: 4, note: 'FY2026-guided operating margin of ~41% on ¥419.0B sales.' },
      { criterion: 'Valuation', stars: 2, note: 'Trailing P/E of ~50.8x is rich, roughly double a domestic peer (Tokyo Seimitsu).' },
      { criterion: 'Visibility', stars: 3, note: 'Only one quarter of forward guidance is disclosed — a structural limitation on forecast confidence.' },
      { criterion: 'Risk', stars: 3, note: 'Concentrated in a handful of leading-edge customers, but diversified across dicing/grinding/polishing product lines.' },
      { criterion: 'Entry timing', stars: 3, note: 'A ~22% pullback from the 52-week high offers some cushion but the multiple remains elevated.' },
    ],
    readLabel: 'CONSTRUCTIVE — STRUCTURAL PACKAGING WINNER AT A FULL PRICE',
    summary: 'Disco is one of the cleanest structural beneficiaries of the AI-driven shift toward chiplets and HBM stacking, since every additional die-separation or wafer-thinning step is incremental revenue regardless of unit wafer-start growth. The business quality is not in question; the valuation (trailing P/E near 51x, one-quarter-ahead guidance visibility) is what requires discipline — this reads better as a name to build into on guidance-driven pullbacks than to add aggressively near the top of its 52-week range.',
  },
  sourceNote: 'Compiled from public market data (stockanalysis.com, Yahoo Finance, company IR/JPX filings) as of August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
},

'6622.T': {
  ticker: '6622.T',
  name: 'DAIHEN Corporation',
  tagline: 'A diversified power-electronics and welding-robotics conglomerate whose RF/DC power supplies for plasma etch/deposition give it a small but real slice of the semiconductor-equipment supply chain.',
  sector: 'TELECOM & TECH',
  asOf: '2026.08',
  chain: {
    intro: 'DAIHEN is primarily a transformer, welding-machine and industrial-robot maker, but its Material Processing segment supplies RF/DC power supplies and automatic matching units used in plasma etch and deposition chambers — the same category dominated globally by MKS Instruments and Advanced Energy. It is a minority, niche participant rather than a category leader.',
    rows: [
      { level: 'RF/DC power supplies for plasma etch/deposition', players: 'MKS Instruments, Advanced Energy, Comet, DAIHEN', position: 'Niche participant in a market MKS+AE collectively dominate (~35–51% combined share)', tone: 'core' },
      { level: 'Etch/deposition tool makers (customers)', players: 'Tokyo Electron, Lam Research, Applied Materials', position: 'Indirect client — power-supply subsystems sold into their tools', tone: 'client' },
      { level: 'Power transformers / grid infrastructure', players: 'DAIHEN, Hitachi Energy, Siemens Energy', position: 'Adjacent growth vector — AI datacenter power demand needs more grid transformers/switchgear', tone: 'growth' },
      { level: 'Arc welding robots / industrial automation', players: 'DAIHEN, Fanuc, Yaskawa', position: 'Legacy core business — not AI-exposed but the largest revenue driver', tone: 'none' },
    ],
    segments: [
      'Three segments: Energy Management (transformers, switchgear), Factory Automation (welding/industrial robots), Material Processing (welding machines, plasma power supplies)',
      'FY2025 revenue: ¥226.38B, +20.05% YoY — broad-based growth across segments',
      'RF power supplies for semiconductor etch are described as a margin expander as the semiconductor cycle trends upward',
      'Welding & Mechatronics division benefits from labor-shortage-driven automation demand in developed markets, a separate (non-AI) growth vector',
    ],
    aiShift: 'DAIHEN\'s exposure to AI is genuinely secondary: its RF/DC power supplies are subsystems inside etch/deposition tools sold by Tokyo Electron, Lam Research and Applied Materials, so AI-driven wafer-fab capex flows through only partially and behind MKS/Advanced Energy\'s larger share. A second, less direct AI angle is grid infrastructure (transformers, switchgear) for the power buildout AI datacenters require — a growing but still small piece of DAIHEN\'s overall revenue mix.',
  },
  valuation: {
    peers: ['6622.T', 'MKSI', 'AEIS'],
    metrics: [
      { label: 'Price', values: ['¥15,280', '—', '$382.99'] },
      { label: 'Market cap', values: ['~¥398.5B (~$2.6B)', '$21.9B', '$14.4B'] },
      { label: 'Trailing P/E', values: ['~21.9x', '~65.4x', '—'] },
      { label: 'Forward P/E', values: ['n/a (thinly covered)', '—', '~36.2x'] },
      { label: 'Dividend yield', values: ['~1.1–1.4%', '—', '—'] },
      { label: 'Beta', values: ['~1.4', '—', '—'] },
      { label: 'Revenue growth (FY2025)', values: ['+20.1%', '—', '—'] },
    ],
    verdictTone: 'low',
    verdictPoints: [
      'Trailing P/E of ~21.9x is a fraction of MKS Instruments\' ~65.4x and well below Advanced Energy\'s ~36.2x forward multiple',
      'The discount is real but partly structural — DAIHEN is a diversified industrial conglomerate (welding robots, transformers) in which semiconductor-plasma power supplies are one sub-segment, not the whole story, unlike the US pure-plays',
      'Thin analyst/data coverage (forward P/E not reliably published) reflects DAIHEN\'s small float and limited international investor attention relative to MKSI/AEIS',
      'Revenue growth of +20.1% in FY2025 is respectable but broad-based across segments, not a pure semiconductor-cycle read-through',
    ],
    justifiedIf: [
      'The Material Processing (plasma power supply) segment continues to expand as a share of the mix, closing the "conglomerate discount" to pure-play peers',
      'Grid-infrastructure demand tied to AI datacenter buildouts becomes a more material, disclosed growth driver',
      'The semiconductor equipment upcycle (TEL, Lam, AMAT capex) continues to pull through incremental power-supply orders',
    ],
  },
  priceMap: {
    zones: [
      { tier: 'ideal', range: '¥9,000 – ¥11,000', rationale: 'Near the lower third of the 52-week range' },
      { tier: 'acceptable', range: '¥11,000 – ¥17,000', rationale: 'Current trading zone' },
      { tier: 'expensive', range: '>¥19,000', rationale: 'Near the 52-week high of ¥19,790 — limited further re-rating room given thin coverage' },
    ],
    technical: [
      '52-week range: ¥6,520 – ¥19,790',
      'Current price ¥15,280 sits well above the midpoint of the 52-week range',
      'Thin float and limited English-language analyst coverage mean price discovery can be choppy relative to larger WFE-adjacent names',
      'FY2025 revenue growth of +20.1% is the clearest available fundamental anchor',
    ],
    scenarios: [
      { label: 'BASE', prob: 50, note: 'Broad-based industrial and semiconductor-power-supply growth continues in the high-teens % range — the stock holds the ¥13,000–18,000 band.' },
      { label: 'BULL', prob: 20, note: 'Semiconductor-cycle and AI-datacenter grid-infrastructure demand both accelerate, closing some of the valuation gap to MKSI/AEIS — retests ¥19,790+.' },
      { label: 'BEAR', prob: 30, note: 'A slowdown in industrial automation or semiconductor capex, combined with thin liquidity, drives a sharper-than-average pullback toward ¥9,000–11,000.' },
    ],
    horizon: '12–24 months',
    invalidation: 'Weekly close below ¥8,500 (below the lower quartile of the 52-week range)',
  },
  risks: [
    { risk: 'Thin liquidity / coverage', severity: 'medium', note: 'Limited international analyst coverage and a small float can amplify price moves in either direction.' },
    { risk: 'Conglomerate structure', severity: 'medium', note: 'Only a fraction of revenue is semiconductor-exposed — the stock will not move cleanly with AI/semiconductor sentiment.' },
    { risk: 'Sub-scale vs. MKS/Advanced Energy', severity: 'medium', note: 'DAIHEN is a minority share holder in RF/DC plasma power supplies against a dominant MKS+AE duopoly — limited pricing power.' },
    { risk: 'Industrial-cycle exposure', severity: 'medium', note: 'Welding robots and transformers are tied to broader capex and labor-market cycles, not just AI/semiconductors.' },
    { risk: 'Currency', severity: 'low', note: 'A stronger yen would compress overseas-denominated segment results.' },
    { risk: 'Data reliability', severity: 'low', note: 'Publicly available forward-looking metrics (e.g., forward P/E) are inconsistent across sources given thin coverage — flagged explicitly in this profile.' },
  ],
  backlog: {
    visibility: [
      'FY2025 revenue ¥226.38B, +20.05% YoY',
      'Material Processing segment (welding, plasma power supplies) flagged as a margin expander in an upward semiconductor cycle',
    ],
    wins: [
      'Named competitor (alongside MKS, Advanced Energy, Comet, Trumpf) in the global RF power supply for semiconductor market',
      'Welding & Mechatronics automation demand from developed-market labor shortages, independent of the AI cycle',
    ],
    clients: ['Semiconductor etch/deposition tool makers (indirect, via power-supply subsystems)', 'Industrial/automotive welding customers'],
    suppliers: [],
  },
  synthesis: {
    scores: [
      { criterion: 'Business quality', stars: 3, note: 'Solid, diversified industrial franchise, but a minority player in its semiconductor-relevant niche.' },
      { criterion: 'AI growth exposure', stars: 2, note: 'AI relevance is real but indirect and a small share of total revenue.' },
      { criterion: 'Profitability', stars: 3, note: 'FY2025 revenue growth of +20.1% with described margin expansion in the semiconductor sub-segment.' },
      { criterion: 'Valuation', stars: 4, note: 'Trailing P/E of ~21.9x is well below pure-play US peers, though partly a conglomerate discount.' },
      { criterion: 'Balance sheet', stars: 3, note: 'No major red flags identified, but detailed disclosure is thinner than large-cap peers.' },
      { criterion: 'Risk', stars: 3, note: 'Thin coverage and conglomerate structure add noise beyond the underlying semiconductor thesis.' },
      { criterion: 'Entry timing', stars: 3, note: 'Trading well above the 52-week low; no strong technical signal either way given limited data.' },
    ],
    readLabel: 'SPECULATIVE — SMALL, INDIRECT SLICE OF THE AI SUPPLY CHAIN',
    summary: 'DAIHEN is best understood as a diversified Japanese industrial conglomerate with a genuine but minority foothold in semiconductor-plasma power supplies — a category MKS Instruments and Advanced Energy dominate globally — plus a secondary, still-small grid-infrastructure angle on AI datacenter power buildouts. The valuation discount to US pure-plays is real (trailing P/E near 22x vs. 36–65x), but a meaningful part of that gap reflects DAIHEN\'s conglomerate structure and thin international coverage rather than a mispriced AI opportunity. This belongs in a portfolio as a small, speculative satellite position sized for its thin liquidity and indirect AI linkage, not as a core semiconductor-equipment holding.',
  },
  sourceNote: 'Compiled from public market data (companiesmarketcap.com, GuruFocus, Investing.com, MarketScreener) as of August 2026; DAIHEN is thinly covered by English-language sources, and several metrics (forward P/E, precise market cap) showed meaningful variance across providers — treat the figures above as directional. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
},

'4004.T': {
  ticker: '4004.T',
  name: 'Resonac Holdings',
  tagline: 'Formerly Showa Denko — a top-tier global supplier of back-end semiconductor packaging materials (CMP slurry, bonding materials, interposers) riding the same AI-packaging boom as Ajinomoto\'s ABF.',
  sector: 'TELECOM & TECH',
  asOf: '2026.08',
  chain: {
    intro: 'Resonac\'s Semiconductor & Electronic Materials segment supplies CMP slurry, packaging/bonding materials, photosensitive dry films and advanced-interposer technology used across front-end and back-end semiconductor manufacturing — a direct materials play on both leading-edge logic and AI-driven advanced packaging.',
    rows: [
      { level: 'CMP slurry', players: 'Resonac, Fujimi, Cabot Microelectronics', position: 'Leading global share (No.1 in ceria CMP slurry for STI)', tone: 'core' },
      { level: 'Advanced packaging materials (bonding, interposers)', players: 'Resonac, Ajinomoto (ABF), Sumitomo Bakelite', position: 'Direct beneficiary of AI-driven advanced-packaging growth', tone: 'growth' },
      { level: 'Front-end semiconductor materials', players: 'Resonac, Shin-Etsu Chemical, JSR', position: 'Broad materials supplier across the wafer-fab process', tone: 'core' },
      { level: 'Foundry / OSAT / memory customers', players: 'TSMC, Samsung, SK Hynix, leading OSATs', position: 'Direct customers', tone: 'client' },
    ],
    segments: [
      'Semiconductor & Electronic Materials segment guided to ¥570B revenue for 2026, with core operating profit targeted at ¥128B (up from ¥108.4B in FY2025, +47% YoY)',
      'FY2025 Semiconductor & Electronic Materials core operating income hit a record ¥108.4B, driven by AI-related back-end (packaging) materials',
      'Q1 2026 core operating profit surged ~2.3x YoY to ¥33.6B; first-half guidance raised ~40% on stronger-than-expected AI-driven advanced-semiconductor demand',
      '10 sell-side analysts rate the stock Buy, 0 rate it Sell, per aggregated coverage',
    ],
    aiShift: 'Resonac captures AI-driven demand from two directions at once: front-end materials (CMP slurry, etc.) used in every advanced logic/memory wafer, and back-end advanced-packaging materials whose growth is explicitly tied to generative-AI chip production — the company describes back-end process material volumes as the primary engine behind its recent profit beats.',
  },
  valuation: {
    peers: ['4004.T', '4063.T', '4203.T'],
    metrics: [
      { label: 'Price', values: ['¥14,505', '—', '¥5,472'] },
      { label: 'Market cap', values: ['~¥3.36T (~$17–22B)', '¥14.47T', '~¥447B (~$3.0B)'] },
      { label: 'Trailing P/E', values: ['~36.8x', '—', '—'] },
      { label: 'Forward P/E', values: ['—', '~22.3x', '—'] },
      { label: 'Dividend yield', values: ['~0.4–2.3% (source-dependent)', '—', '—'] },
      { label: 'Beta', values: ['1.27', '—', '—'] },
    ],
    verdictTone: 'fair',
    verdictPoints: [
      'Trailing P/E of ~36.8x is above Shin-Etsu Chemical\'s forward P/E of ~22.3x, though Shin-Etsu is a far larger, more diversified materials giant (silicon wafers, PVC, encapsulants) with different segment mix',
      'The stock is up ~466% over the trailing year — one of the largest re-ratings among Japanese semiconductor-materials names — as the market re-prices the AI-packaging-materials thesis',
      'Core operating profit for the Semiconductor & Electronic Materials segment more than doubled YoY in the most recent quarter, giving some fundamental support to the re-rating',
      'Dividend-yield figures vary meaningfully across sources given the scale of the recent price move — treat any single yield figure as approximate',
    ],
    justifiedIf: [
      'FY2026 Semiconductor & Electronic Materials segment guidance (¥570B revenue, ¥128B core operating profit) is delivered',
      'Advanced-packaging materials demand (interposers, bonding materials) keeps growing faster than the broader chemicals conglomerate average',
      'The non-semiconductor segments (Mobility, Chemicals) do not offset segment-level AI materials strength with weakness elsewhere',
    ],
  },
  priceMap: {
    zones: [
      { tier: 'ideal', range: '¥8,000 – ¥10,500', rationale: 'Well below the 52-week midpoint, reflecting the stock\'s extreme volatility over the trailing year' },
      { tier: 'acceptable', range: '¥10,500 – ¥16,000', rationale: 'Current trading zone' },
      { tier: 'expensive', range: '>¥19,000', rationale: 'Approaching the ¥20,495 ATH set in May 2026' },
    ],
    technical: [
      '52-week range: ¥3,366 – ¥20,495 (ATH set May 14, 2026) — an extraordinary +466% trailing-year move',
      'Current price ¥14,505 sits roughly 29% below the all-time high',
      '10 analysts rate the stock Buy with 0 Sell ratings per aggregated sell-side coverage',
      'Segment-level core operating profit growth (+2.3x YoY in the most recent quarter) is the key fundamental datapoint behind the re-rating',
    ],
    scenarios: [
      { label: 'BASE', prob: 45, note: 'Semiconductor & Electronic Materials segment delivers the guided ¥128B core operating profit for 2026 — the stock consolidates in the ¥12,000–18,000 band.' },
      { label: 'BULL', prob: 25, note: 'AI-driven advanced-packaging materials demand continues to beat guidance as it has in recent quarters — retests the ¥20,495 ATH.' },
      { label: 'BEAR', prob: 30, note: 'A digestion phase in advanced-packaging capex, or weakness in the non-semiconductor Chemicals/Mobility segments, triggers a sharp pullback given the stock\'s high realized volatility — retraces toward ¥8,000–10,000.' },
    ],
    horizon: '12–24 months',
    invalidation: 'Weekly close below ¥7,500 (roughly halves the current price)',
  },
  risks: [
    { risk: 'Extreme volatility', severity: 'high', note: 'A 52-week range of ¥3,366–¥20,495 (a >6x spread) signals this is a high-beta, sentiment-sensitive name even by semiconductor-materials standards.' },
    { risk: 'Conglomerate drag', severity: 'medium', note: 'Resonac also operates Mobility, Innovation Enabling Materials and Chemicals segments — non-semiconductor weakness could offset segment strength.' },
    { risk: 'Advanced-packaging capex cyclicality', severity: 'medium', note: 'A slowdown in AI-driven packaging investment at TSMC/Samsung/OSATs would directly hit the fastest-growing segment.' },
    { risk: 'Data/coverage noise', severity: 'medium', note: 'Dividend yield and other metrics show wide variance across sources given the scale and speed of the recent re-rating.' },
    { risk: 'Competitive materials landscape', severity: 'low', note: 'CMP slurry and packaging materials face competition from Shin-Etsu, JSR, Fujimi and Ajinomoto (in ABF specifically).' },
    { risk: 'Currency', severity: 'low', note: 'A stronger yen would compress overseas-denominated segment revenue.' },
  ],
  backlog: {
    visibility: [
      'Semiconductor & Electronic Materials segment: FY2026 revenue guided to ¥570B, core operating profit targeted at ¥128B',
      'Q1 2026 core operating profit ¥33.6B, up ~2.3x YoY; first-half guidance raised ~40%',
      'FY2025 segment core operating income record ¥108.4B, +47% YoY',
    ],
    wins: [
      'No.1 ceria CMP slurry (STI) share as of 2023, sustained leadership in Cu/barrier-metal polishing slurries',
      'Chip-embedded interposer prototype developed on 510×515mm panels (20 bridge dies per panel) — an advanced-packaging R&D milestone',
      '10 of 10 covering analysts rate the stock Buy',
    ],
    clients: ['TSMC', 'Samsung', 'SK Hynix', 'Leading OSATs (indirect)'],
    suppliers: [],
  },
  synthesis: {
    scores: [
      { criterion: 'Business quality', stars: 4, note: 'Leading share in CMP slurry and a credible position in advanced-packaging materials.' },
      { criterion: 'AI growth exposure', stars: 5, note: 'Both front-end and back-end (advanced packaging) materials benefit directly from AI-chip production growth.' },
      { criterion: 'Profitability', stars: 4, note: 'Segment core operating profit growing ~2.3x YoY in the most recent quarter.' },
      { criterion: 'Valuation', stars: 3, note: 'Trailing P/E of ~36.8x after a +466% trailing-year move — fair given the growth rate, but no longer cheap.' },
      { criterion: 'Balance sheet / structure', stars: 3, note: 'A diversified chemicals conglomerate — semiconductor materials is the growth engine but not the whole company.' },
      { criterion: 'Risk', stars: 2, note: 'Among the most volatile names in this peer set, with a >6x 52-week trading range.' },
      { criterion: 'Entry timing', stars: 3, note: 'A ~29% pullback from the May 2026 ATH provides some cushion.' },
    ],
    readLabel: 'CONSTRUCTIVE — HIGH-BETA AI PACKAGING-MATERIALS PLAY',
    summary: 'Resonac has genuine, fast-growing exposure to AI-driven advanced-packaging materials (CMP slurry, bonding materials, interposer technology) with segment profit more than doubling year-on-year in the latest quarter — but the stock\'s extraordinary volatility (a greater than 6x 52-week range) and its status as one segment inside a broader chemicals conglomerate mean this is not a low-risk way to express the thesis. Position sizing should reflect the realized volatility rather than the headline growth-rate narrative, and a staged entry on further pullbacks is more defensible than adding after a run this large.',
  },
  sourceNote: 'Compiled from public market data (companiesmarketcap.com, Investing.com earnings transcripts, company IR/BigGo Finance summaries) as of August 2026; dividend-yield and market-cap figures showed notable variance across sources given the scale of the recent price move. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
},

'5706.T': {
  ticker: '5706.T',
  name: 'Mitsui Kinzoku',
  tagline: 'Formerly Mitsui Mining & Smelting — a specialty copper-foil and materials supplier whose ultra-thin VSP copper foil is used in AI-server high-frequency circuit boards and next-gen batteries.',
  sector: 'TELECOM & TECH',
  asOf: '2026.08',
  chain: {
    intro: 'Mitsui Kinzoku\'s Engineered/Functional Materials segment produces ultra-thin electrolytic copper foil (including its VSP™ line) with carriers, used in high-frequency circuit boards for AI servers as well as battery applications — a specialty-materials angle on the AI infrastructure buildout, alongside legacy metals-smelting operations.',
    rows: [
      { level: 'Ultra-thin/VSP copper foil (AI server PCBs)', players: 'Mitsui Kinzoku, Furukawa Electric, JX Advanced Metals', position: 'Specialty materials supplier — direct beneficiary of AI-server HDI/high-frequency PCB demand', tone: 'core' },
      { level: 'Battery copper foil', players: 'Mitsui Kinzoku and battery-materials peers', position: 'Adjacent growth vector, less AI-specific', tone: 'growth' },
      { level: 'PCB/substrate manufacturers (customers)', players: 'AI-server PCB and substrate fabricators', position: 'Direct customers for copper foil', tone: 'client' },
      { level: 'Base metals smelting', players: 'Mitsui Kinzoku legacy operations', position: 'Not AI-exposed — cyclical commodity business', tone: 'none' },
    ],
    segments: [
      '9-month FY2026 revenue ¥542.27B, +3.1% YoY; operating profit ¥71.72B, +27.6% YoY',
      'Full-year FY2026 operating profit forecast raised to ¥117.0B, +56.5% YoY, on stronger-than-expected demand for ultra-thin copper foil with carrier and electro-deposited copper foil used in AI-server high-frequency circuit boards',
      'VSP™ copper foil sales volumes expected to exceed prior forecasts',
      'A major US broker raised its target price to ¥34,500, explicitly citing AI-server copper-foil demand',
    ],
    aiShift: 'AI servers require far higher signal-integrity performance than conventional servers, driving demand for ultra-thin, low-profile copper foil (like Mitsui Kinzoku\'s VSP™ line) in the high-frequency, multi-layer PCBs used in AI accelerator boards and backplanes. This is a genuine, disclosed AI-driven growth vector layered on top of a larger, more cyclical legacy metals business.',
  },
  valuation: {
    peers: ['5706.T', '5801.T', '5016.T'],
    metrics: [
      { label: 'Price', values: ['¥30,890', '¥3,386', '—'] },
      { label: 'Market cap', values: ['~¥1.5–2.0T (~$10–13B, noisy)', '$9.87B', '—'] },
      { label: 'Trailing P/E', values: ['~19.7x', '—', '—'] },
      { label: 'Dividend yield', values: ['~0.8–1.1%', '—', '—'] },
      { label: 'Beta', values: ['~1.4', '—', '—'] },
      { label: 'Net margin', values: ['—', '—', '11.8%'] },
      { label: 'Earnings growth forecast', values: ['+56.5% (FY2026 operating profit)', '—', '~15%/yr'] },
    ],
    verdictTone: 'fair',
    verdictPoints: [
      'Trailing P/E of ~19.7x is modest for a company guiding +56.5% FY2026 operating-profit growth — a favorable growth-adjusted setup if the guidance holds',
      'A major US broker\'s target-price raise to ¥34,500 (versus the current ~¥30,890) implies continued modest upside is expected even after the recent rally',
      'JX Advanced Metals, a closer specialty-materials peer, is guided for ~15%/year earnings growth with an 11.8% net margin — a useful growth-rate anchor, though direct multiple comparison data was not reliably available',
      'Both price and market-cap figures for this name showed meaningful variance across data sources within the same year, reflecting thin coverage and a highly volatile 2026 trading range',
    ],
    justifiedIf: [
      'The raised full-year FY2026 operating-profit guidance (¥117.0B, +56.5% YoY) is actually delivered',
      'VSP™ copper-foil volumes for AI-server high-frequency PCBs continue to run ahead of prior forecasts',
      'The legacy base-metals smelting business does not offset copper-foil strength with commodity-price weakness',
    ],
  },
  priceMap: {
    zones: [
      { tier: 'ideal', range: '¥18,000 – ¥22,000', rationale: 'Well below the current price, reflecting this name\'s wide historical trading range' },
      { tier: 'acceptable', range: '¥22,000 – ¥32,000', rationale: 'Current trading zone' },
      { tier: 'expensive', range: '>¥36,000', rationale: 'Above the analyst target price of ¥34,500' },
    ],
    technical: [
      '52-week range: approximately ¥6,410 – ¥57,700 per aggregated data (an unusually wide range — treat as approximate given thin coverage)',
      'Current price ¥30,890 is below the broker target price of ¥34,500',
      'FY2026 operating-profit guidance was raised mid-year (+56.5% YoY), a positive fundamental catalyst behind recent broker target-price increases',
      'Price and market-cap data for this name showed unusually wide dispersion across sources within 2026 — a function of thin analyst coverage',
    ],
    scenarios: [
      { label: 'BASE', prob: 45, note: 'Raised FY2026 operating-profit guidance (+56.5%) is delivered as VSP copper-foil volumes for AI-server PCBs continue to beat prior forecasts — grinds toward the ¥34,500 broker target.' },
      { label: 'BULL', prob: 20, note: 'AI-server PCB demand accelerates further and battery-copper-foil demand adds an additional leg — extends well above ¥34,500.' },
      { label: 'BEAR', prob: 35, note: 'A pullback in AI-server PCB demand or weakness in the base-metals smelting segment offsets copper-foil strength — retraces toward ¥18,000–22,000.' },
    ],
    horizon: '12–24 months',
    invalidation: 'Weekly close below ¥15,000 (roughly halves the current price)',
  },
  risks: [
    { risk: 'Data reliability / thin coverage', severity: 'high', note: 'Price, market cap and 52-week range figures showed unusually wide dispersion across sources — treat all figures for this name as directional, not precise.' },
    { risk: 'Legacy commodity exposure', severity: 'medium', note: 'Base-metals smelting remains part of the business and is exposed to commodity-price cycles unrelated to AI demand.' },
    { risk: 'Customer/product concentration', severity: 'medium', note: 'The AI-relevant growth story is concentrated in a specific copper-foil product line (VSP™) rather than the whole company.' },
    { risk: 'Competitive materials landscape', severity: 'medium', note: 'Furukawa Electric and JX Advanced Metals both compete in copper foil and specialty metals for electronics.' },
    { risk: 'Currency', severity: 'low', note: 'A stronger yen would compress overseas-denominated segment revenue.' },
    { risk: 'Guidance execution', severity: 'medium', note: 'The +56.5% FY2026 operating-profit guide is a significant raise — execution risk exists if AI-server PCB demand growth moderates.' },
  ],
  backlog: {
    visibility: [
      '9-month FY2026 revenue ¥542.27B (+3.1% YoY), operating profit ¥71.72B (+27.6% YoY)',
      'Full-year FY2026 operating-profit forecast raised to ¥117.0B (+56.5% YoY)',
      'VSP™ copper-foil sales volumes tracking ahead of prior forecasts',
    ],
    wins: [
      'Target price raised to ¥34,500 by a major US broker, explicitly citing AI-server copper-foil performance',
      'VSP™ ultra-thin copper foil with carrier positioned for high-frequency AI-server PCB applications',
      'Diversification into battery materials (electro-deposited copper foil) alongside the AI-server product line',
    ],
    clients: ['AI-server PCB and substrate fabricators (not individually named in available disclosures)'],
    suppliers: [],
  },
  synthesis: {
    scores: [
      { criterion: 'Business quality', stars: 3, note: 'A legacy metals/smelting company with a genuine, fast-growing specialty copper-foil franchise layered on top.' },
      { criterion: 'AI growth exposure', stars: 4, note: 'VSP™ copper foil is a disclosed, direct beneficiary of AI-server high-frequency PCB demand.' },
      { criterion: 'Profitability', stars: 4, note: 'FY2026 operating profit guided up 56.5% YoY on copper-foil strength.' },
      { criterion: 'Valuation', stars: 4, note: 'Trailing P/E of ~19.7x looks reasonable against the guided growth rate, though data confidence is lower than for larger peers.' },
      { criterion: 'Data confidence', stars: 2, note: 'Price and market-cap figures showed unusually wide variance across sources — a genuine limitation for this name.' },
      { criterion: 'Risk', stars: 3, note: 'Commodity/smelting exposure adds a layer of cyclicality beyond the AI-copper-foil story.' },
      { criterion: 'Entry timing', stars: 3, note: 'Trading below the analyst target price, but the wide historical range makes technical levels less reliable.' },
    ],
    readLabel: 'SPECULATIVE — REAL AI COPPER-FOIL ANGLE INSIDE A LEGACY METALS BUSINESS',
    summary: 'Mitsui Kinzoku offers a genuine, disclosed AI angle through its VSP™ ultra-thin copper-foil line for AI-server high-frequency PCBs, with FY2026 operating-profit guidance raised 56.5% on the back of that specific product line — a real, if narrow, growth vector layered on a larger, more cyclical base-metals smelting business. Data quality for this name is meaningfully weaker than for the larger caps in this set (wide dispersion in price, market cap and 52-week range across sources), which itself argues for smaller position sizing and independent verification of current figures before acting, rather than treating any single data point here as precise.',
  },
  sourceNote: 'Compiled from public market data (companiesmarketcap.com, tradingeconomics.com, company IR call summaries) as of August 2026; this name showed unusually wide variance in price, market cap and 52-week range across sources, reflecting thin English-language coverage — treat figures as directional/approximate and cross-check before acting on anything here.',
},

'6278.T': {
  ticker: '6278.T',
  name: 'Union Tool Co',
  tagline: 'A small-cap global leader (~12–15% share) in ultra-precision PCB micro-drills — a pure-play bet on the AI-server HDI PCB buildout, with a stock that has already re-rated hard.',
  sector: 'TELECOM & TECH',
  asOf: '2026.08',
  chain: {
    intro: 'Union Tool manufactures carbide micro-drills used to drill the ultra-fine holes in printed circuit boards, with roughly 12–15% global market share and reported reach into over 60% of high-density-interconnect (HDI) PCB manufacturers. It is one of the smallest and most thinly covered names in this peer set, but among the most direct pure-plays on AI-server PCB demand.',
    rows: [
      { level: 'PCB micro-drills (carbide)', players: 'Union Tool (~12–15% global share)', position: 'Market leader in a niche, high-precision consumable-tool category', tone: 'core' },
      { level: 'HDI / AI-server PCB fabrication', players: 'PCB fabricators supplying AI-server and networking OEMs', position: 'Direct customer base — AI-server HDI PCB demand growing at a reported ~18.5% CAGR', tone: 'client' },
      { level: 'Advanced packaging / IC substrates', players: 'Substrate and PCB capacity expansions across Japan/Taiwan/Korea', position: 'Adjacent growth vector as substrate capacity scales', tone: 'growth' },
    ],
    segments: [
      'Core business: manufacture and sale of PCB tools, primarily precision carbide drills, plus broader cutting-tool products',
      'Global PCB drills market estimated at ~$876.3M (2026), growing toward ~$1.29B by 2035 at a ~4.4% CAGR — Union Tool\'s specific AI-server-linked sub-segment (HDI/ultra-fine drills) is growing meaningfully faster',
      'AI Server HDI PCB market specifically reported growing at an ~18.5% CAGR, well above the broader PCB-drill market average',
      'TTM revenue approximately ¥43.9B with a reported net margin of ~16.8%',
    ],
    aiShift: 'AI servers require multilayer, high-density-interconnect PCBs with far more precision-drilled micro-vias than conventional server boards — directly increasing demand for Union Tool\'s core product. As a small, tightly focused company, its revenue is unusually sensitive (in both directions) to the pace of AI-server PCB capacity additions relative to more diversified peers.',
  },
  valuation: {
    peers: ['6278.T', '6136.T'],
    metrics: [
      { label: 'Price', values: ['¥22,700', '—'] },
      { label: 'Market cap', values: ['~¥393.6B (~$2.6B)', '~¥307B (~$1.1B)'] },
      { label: 'Trailing P/E', values: ['~64.4x', '~12.3x'] },
      { label: 'P/S', values: ['—', '~1.18x'] },
      { label: 'P/B', values: ['—', '~1.16x'] },
      { label: 'Dividend yield', values: ['~0.55%', '—'] },
      { label: 'Net margin', values: ['~16.8%', '—'] },
    ],
    verdictTone: 'high',
    verdictPoints: [
      'Trailing P/E of ~64.4x is roughly 5x OSG Corporation\'s ~12.3x — OSG is a larger, more diversified industrial cutting-tool maker without Union Tool\'s specific AI-server PCB narrative, so the comparison is illustrative rather than like-for-like',
      'The market cap has reportedly grown well over 200% in the trailing year as investors have re-rated the stock around the AI-server HDI PCB growth narrative',
      'A ~16.8% net margin is solid for a small-cap precision-tooling business, but the current multiple prices in continued outsized (double-digit+) growth',
      'As one of the smallest, most thinly traded names in this set, the stock is prone to sharp moves on both sentiment shifts and limited float',
    ],
    justifiedIf: [
      'AI-server HDI PCB demand continues to grow at or above the reported ~18.5% CAGR',
      'Union Tool defends or grows its ~12–15% global share against domestic and Taiwanese competitors in precision PCB drilling',
      'Substrate/PCB capacity expansions across Japan, Taiwan and Korea continue to convert into incremental drill-consumable demand',
    ],
  },
  priceMap: {
    zones: [
      { tier: 'ideal', range: '¥9,000 – ¥12,000', rationale: 'Well below the 52-week range midpoint, reflecting this stock\'s extreme volatility' },
      { tier: 'acceptable', range: '¥12,000 – ¥21,000', rationale: 'Below the current price but within the broader 2026 trading range' },
      { tier: 'expensive', range: '>¥23,500', rationale: 'Near the 52-week high of ¥24,100' },
    ],
    technical: [
      '52-week range: ¥4,525 – ¥24,100 — more than a 5x spread, among the most volatile names in this peer set',
      'Current price ¥22,700 sits close to the top of the 52-week range',
      'Next earnings date reported as August 11, 2026 — a near-term catalyst for updated guidance',
      'Trailing P/E of ~64.4x leaves little room for a growth disappointment',
    ],
    scenarios: [
      { label: 'BASE', prob: 40, note: 'AI-server HDI PCB demand growth continues near the ~18.5% CAGR reported for the category — the stock consolidates in the ¥16,000–23,000 band.' },
      { label: 'BULL', prob: 20, note: 'Substrate/PCB capacity expansion accelerates further and Union Tool gains share — retests or exceeds the ¥24,100 high.' },
      { label: 'BEAR', prob: 40, note: 'A digestion phase in PCB/substrate capex, share loss to competitors, or a disappointing August 2026 earnings report triggers a sharp correction given the stock\'s thin float and high realized volatility — retraces toward ¥9,000–12,000.' },
    ],
    horizon: '12–24 months',
    invalidation: 'Weekly close below ¥8,000 (roughly two-thirds off the current price)',
  },
  risks: [
    { risk: 'Extreme volatility / thin float', severity: 'high', note: 'A 52-week range of ¥4,525–¥24,100 (over 5x) makes this one of the highest-beta names in the entire peer set.' },
    { risk: 'Valuation', severity: 'high', note: 'Trailing P/E of ~64.4x prices in continued high growth in a fairly narrow product category.' },
    { risk: 'Single-product concentration', severity: 'high', note: 'The business is heavily concentrated in PCB drilling tools — far less diversified than any other name in this set.' },
    { risk: 'Competitive pressure', severity: 'medium', note: 'Precision PCB tooling faces competition from other Japanese and Taiwanese carbide-tool makers.' },
    { risk: 'End-market cyclicality', severity: 'medium', note: 'PCB/substrate capex is itself cyclical, and Union Tool\'s consumable-tool revenue moves with fabricator utilization rates.' },
    { risk: 'Data/coverage limitations', severity: 'medium', note: 'Very thin English-language analyst coverage — price and market-cap data showed some variance across sources.' },
  ],
  backlog: {
    visibility: [
      'TTM revenue ~¥43.9B with ~16.8% net margin',
      'Next earnings report due August 11, 2026',
      'AI Server HDI PCB market category growing at a reported ~18.5% CAGR',
    ],
    wins: [
      'Reported reach into over 60% of global HDI PCB manufacturers as a supplier',
      'Global PCB-drill market share estimated at ~12–15%, among the largest of any single supplier',
    ],
    clients: ['HDI PCB fabricators serving AI-server and networking OEMs (not individually named in available disclosures)'],
    suppliers: [],
  },
  synthesis: {
    scores: [
      { criterion: 'Business quality', stars: 3, note: 'Market-leading niche position, but a narrow, single-product-category business.' },
      { criterion: 'AI growth exposure', stars: 4, note: 'A relatively pure-play link to AI-server HDI PCB demand, growing well above the broader PCB-drill market.' },
      { criterion: 'Profitability', stars: 4, note: '~16.8% net margin is solid for a small-cap precision-tooling business.' },
      { criterion: 'Valuation', stars: 1, note: 'Trailing P/E of ~64.4x is the richest multiple of any name in this set relative to company size and diversification.' },
      { criterion: 'Liquidity / data confidence', stars: 2, note: 'Thin float, high realized volatility and some data variance across sources.' },
      { criterion: 'Risk', stars: 2, note: 'Single-product concentration plus extreme historical volatility make this a high-risk, high-reward profile.' },
      { criterion: 'Entry timing', stars: 2, note: 'Trading near the top of an extraordinarily wide 52-week range.' },
    ],
    readLabel: 'SPECULATIVE MOMENTUM — HIGH-BETA PURE-PLAY, DEMANDS STRICT SIZING',
    summary: 'Union Tool is one of the most direct pure-plays on AI-server HDI PCB demand in this entire set — a genuine market leader in a niche, high-precision consumable-tool category — but that focus cuts both ways: a single-product concentration, a greater-than-5x 52-week trading range, and a trailing P/E near 64x leave essentially no margin for a demand disappointment or share loss. This is a name for a small, clearly bounded speculative allocation with strict position sizing, not a core holding, and the upcoming August 2026 earnings report is a near-term event worth watching before adding exposure.',
  },
  sourceNote: 'Compiled from public market data (Investing.com, TradingView, dividendjapan.com industry commentary) as of August 2026; Union Tool is thinly covered and price/market-cap figures showed some variance across sources — treat figures as directional. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
},

'2802.T': {
  ticker: '2802.T',
  name: 'Ajinomoto Co',
  tagline: 'A diversified global food and biotech company whose Ajinomoto Build-up Film (ABF) — used in virtually every advanced logic packaging substrate — commands over 95% share of a market AI has turned into a critical, capacity-constrained bottleneck.',
  sector: 'TELECOM & TECH',
  asOf: '2026.08',
  chain: {
    intro: 'Ajinomoto is best known as a food and amino-acids company, but its electronic-materials business — centered on Ajinomoto Build-up Film (ABF), an insulating dielectric film — controls over 95% of the ABF substrate-dielectric market and has become the industry standard for advanced chip packaging substrates, including those used for AI GPUs and high-performance CPUs. This profile focuses specifically on that semiconductor-materials angle.',
    rows: [
      { level: 'ABF (packaging substrate dielectric film)', players: 'Ajinomoto (>95% share)', position: 'Near-total monopoly — the industry-standard insulation layer for advanced packaging substrates', tone: 'core' },
      { level: 'Advanced packaging substrates', players: 'Ibiden, Shinko, Unimicron, AT&S', position: 'Direct customers — substrate makers buy ABF as a critical input', tone: 'client' },
      { level: 'AI GPU / advanced logic packaging', players: 'TSMC, Intel, AMD, Nvidia (indirect via substrate supply chain)', position: 'End-market pull — ABF is required for the flip-chip BGA substrates under most advanced AI/HPC packages', tone: 'growth' },
      { level: 'Core food & seasonings business', players: 'Ajinomoto\'s largest revenue segment', position: 'Not AI-exposed — the majority of consolidated revenue and the reason valuation multiples reflect a blended business', tone: 'none' },
    ],
    segments: [
      'Electronic materials business generated ¥100.7B in sales, +31% YoY, ~6% of total consolidated revenue',
      'Functional Materials segment (ABF-centered) generated ¥54.6B in operating profit, +35% YoY, ~30% of total consolidated operating profit — a segment margin above 50%',
      'Ajinomoto is investing at least ¥25B by 2030 to expand ABF production capacity by 50%, plus a separate land purchase for a new plant targeted for 2032',
      'With ABF qualification lead times exceeding a year, supply is expected to stay tight through at least 2027, giving Ajinomoto pricing power as an early mover',
    ],
    aiShift: 'Every advanced AI GPU, HPC accelerator and high-end CPU built on a flip-chip BGA substrate needs ABF as the dielectric insulation layer between build-up circuit layers — and there is effectively no qualified alternative supplier at scale. As AI chip packages grow larger and more complex (more layers, larger substrates), ABF consumption per package rises, and Ajinomoto — despite being a small fraction of the parent company\'s revenue — captures outsized operating-profit growth (segment margin above 50%) from this single, tightly supply-constrained material.',
  },
  valuation: {
    peers: ['2802.T', '4004.T', '4203.T'],
    metrics: [
      { label: 'Price', values: ['¥5,069', '¥14,505', '¥5,472'] },
      { label: 'Market cap', values: ['~¥4.84T (~$31.0B)', '~¥3.36T (~$17–22B)', '~¥447B (~$3.0B)'] },
      { label: 'Trailing P/E', values: ['~35.5x', '~36.8x', '—'] },
      { label: 'Dividend yield', values: ['~0.97%', '~0.4–2.3%', '—'] },
      { label: 'Beta', values: ['~0.40', '1.27', '—'] },
      { label: 'Electronic-materials segment growth', values: ['+31% (sales), +35% (op. profit)', 'n/a (different segment mix)', 'n/a'] },
    ],
    verdictTone: 'high',
    verdictPoints: [
      'Trailing P/E of ~35.5x reflects the whole consolidated company (mostly food/seasonings, ~94% of revenue) — not a pure ABF/semiconductor-materials multiple, so it is not directly comparable to pure-play chip-materials names',
      'A beta of ~0.40 is far lower than Resonac\'s (1.27) or any other name in this set, underscoring that Ajinomoto\'s share price is dominated by its stable food business, with ABF as a fast-growing but still-small overlay',
      'The ABF segment itself is growing much faster than the consolidated business (op. profit +35% YoY vs. a low-single-digit-to-low-teens consolidated growth profile typical of a food conglomerate) and carries a segment margin above 50%',
      'Investors buying Ajinomoto for ABF exposure are also buying a large, low-beta food and amino-acids business — a diversification benefit but a dilution of the pure semiconductor-materials thesis',
    ],
    justifiedIf: [
      'ABF capacity expansion (the ¥25B, 50%-capacity investment through 2030, plus the 2032 plant) executes on schedule to meet AI-packaging substrate demand',
      'ABF supply stays structurally tight (qualification lead times >1 year) through 2027+, preserving Ajinomoto\'s pricing power',
      'The core food/seasonings business continues its stable, low-volatility performance, allowing the ABF segment\'s growth to show through in consolidated earnings',
    ],
  },
  priceMap: {
    zones: [
      { tier: 'ideal', range: '¥3,600 – ¥4,200', rationale: 'Near the lower half of the 52-week range' },
      { tier: 'acceptable', range: '¥4,200 – ¥5,600', rationale: 'Current trading zone' },
      { tier: 'expensive', range: '>¥6,100', rationale: 'Near the 52-week high of ¥6,340' },
    ],
    technical: [
      '52-week range: ¥3,270 – ¥6,340',
      'Current price ¥5,069 sits roughly in the upper-middle of the 52-week range',
      'Beta of ~0.40 signals a defensive, low-volatility stock relative to the rest of this peer set — a structural feature of its food-company base',
      'ABF segment margin above 50% is the key fundamental signal for the semiconductor-materials thesis specifically',
    ],
    scenarios: [
      { label: 'BASE', prob: 50, note: 'ABF segment continues growing in the +25–35% YoY range on AI-packaging substrate demand, while the core food business remains stable — the stock holds the ¥4,500–5,800 band.' },
      { label: 'BULL', prob: 20, note: 'ABF capacity expansion executes ahead of schedule and AI-chip packaging complexity keeps rising, pushing the segment\'s consolidated contribution higher and re-rating the stock above ¥6,340.' },
      { label: 'BEAR', prob: 30, note: 'A slowdown in AI-packaging substrate demand, or a stumble in the core food business (e.g., input-cost inflation), offsets ABF strength — retraces toward ¥3,600–4,200.' },
    ],
    horizon: '12–24 months',
    invalidation: 'Weekly close below ¥3,400 (near the 52-week low)',
  },
  risks: [
    { risk: 'Thesis dilution by the core business', severity: 'medium', note: 'ABF is only ~6% of consolidated revenue — the stock price is dominated by the much larger, slower-growing food/seasonings business, not the AI-materials story.' },
    { risk: 'Advanced-packaging capex cyclicality', severity: 'medium', note: 'A slowdown in AI-chip packaging investment at TSMC/Intel/AMD would directly hit ABF demand growth, even if it is a small piece of Ajinomoto overall.' },
    { risk: 'Capacity-expansion execution', severity: 'medium', note: 'The ¥25B, 50%-capacity ABF investment through 2030 and the 2032 plant both carry execution risk on cost and timeline.' },
    { risk: 'Alternative dielectric materials', severity: 'low', note: 'Long-term R&D into alternative packaging dielectrics is a distant but real competitive risk to ABF\'s near-monopoly.' },
    { risk: 'Currency / input costs', severity: 'low', note: 'The core food business carries commodity input-cost and currency exposure unrelated to the semiconductor-materials thesis.' },
    { risk: 'Segment disclosure limits', severity: 'low', note: 'Ajinomoto discloses ABF/electronic-materials performance at the segment level, not as a standalone entity — limiting granularity for a pure semiconductor-materials read.' },
  ],
  backlog: {
    visibility: [
      'Electronic materials sales ¥100.7B, +31% YoY (~6% of consolidated revenue)',
      'Functional Materials (ABF-centered) operating profit ¥54.6B, +35% YoY (~30% of consolidated operating profit), segment margin >50%',
      'ABF qualification lead times exceed one year, keeping supply tight through at least 2027',
    ],
    wins: [
      '>95% share of the ABF dielectric-film supply market — the closest thing to a true monopoly in this entire nine-company set',
      '¥25B capacity-expansion investment by 2030 to grow ABF output 50%',
      'Additional land purchase for a new ABF plant targeted for 2032',
    ],
    clients: ['Ibiden', 'Shinko Electric Industries', 'Unimicron', 'AT&S (substrate makers, indirect end-market: TSMC/Intel/AMD advanced packaging)'],
    suppliers: [],
  },
  synthesis: {
    scores: [
      { criterion: 'Business quality (ABF segment)', stars: 5, note: 'A >95%-share, near-monopoly position in a critical, supply-constrained advanced-packaging material.' },
      { criterion: 'AI growth exposure', stars: 4, note: 'Direct, high-margin exposure to AI-chip packaging complexity, though diluted by the much larger food business.' },
      { criterion: 'Profitability (ABF segment)', stars: 5, note: 'Segment operating margin above 50%, +35% YoY operating-profit growth.' },
      { criterion: 'Consolidated valuation', stars: 3, note: 'Trailing P/E of ~35.5x reflects a blended food+materials business, not a pure ABF multiple.' },
      { criterion: 'Balance sheet / stability', stars: 5, note: 'A large, stable consumer/food conglomerate with low beta (~0.40) — genuine downside ballast.' },
      { criterion: 'Risk', stars: 4, note: 'The food business dilutes both the upside and the volatility of the ABF thesis specifically.' },
      { criterion: 'Entry timing', stars: 3, note: 'Trading in the upper-middle of a relatively narrow, low-beta 52-week range.' },
    ],
    readLabel: 'CONSTRUCTIVE — MONOPOLY MATERIAL, DILUTED BY A FOOD CONGLOMERATE',
    summary: 'Ajinomoto\'s ABF business is arguably the single closest thing to a true monopoly in this entire nine-company set — over 95% share of a material with no scaled alternative and qualification lead times that lock in multi-year pricing power — but it sits inside a large, low-beta food and amino-acids conglomerate that represents roughly 94% of consolidated revenue. That structure is a genuine diversification benefit (a food company\'s earnings stability underwriting a monopoly semiconductor material) but also means the stock will never move as purely with AI-packaging sentiment as a dedicated materials name would; investors should size this as a defensive-with-optionality holding rather than a leveraged AI-capex bet, and track the ABF segment\'s disclosed growth rate as the real signal to watch each quarter.',
  },
  sourceNote: 'Compiled from public market data (companiesmarketcap.com, Investing.com, BigGo Finance, TrendForce, company IR filings) as of August 2026. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
},

'6981.T': {
  ticker: '6981.T',
  name: 'Murata Manufacturing',
  tagline: 'The global leader in multilayer ceramic capacitors (MLCCs) — passive components now in structural shortage as AI servers demand roughly 2x more MLCC content than conventional servers.',
  sector: 'TELECOM & TECH',
  asOf: '2026.08',
  chain: {
    intro: 'Murata is the world\'s largest MLCC maker and a top supplier of inductors, EMI filters and sensors — components used in every electronic device, but consumed at dramatically higher density in AI server motherboards and power-delivery systems. MLCC orders tied to AI-server platforms are reported running at roughly 2x available supply.',
    rows: [
      { level: 'MLCCs (multilayer ceramic capacitors)', players: 'Murata (global leader), TDK, Taiyo Yuden, Samsung Electro-Mechanics', position: 'Market leader — MLCC orders for AI-server platforms running ~2x supply', tone: 'core' },
      { level: 'Inductors / EMI filters / sensors', players: 'Murata, TDK', position: 'Complementary passive-component leadership', tone: 'core' },
      { level: 'AI server / datacenter OEMs', players: 'Server ODMs, hyperscalers (indirect via component supply chain)', position: 'Direct demand driver — AI server boards require materially more MLCC content per unit', tone: 'growth' },
      { level: 'Automotive electronics', players: 'Murata\'s largest traditional end-market', position: 'Legacy core business, not AI-specific', tone: 'none' },
    ],
    segments: [
      'Revenue guidance raised to ¥2.11T for the current fiscal year (+15.2% YoY), per the company\'s most recent (July 31, 2026) update',
      'Full-year data-center segment guidance of ¥370.6B, with MLCC volumes for that segment expected to roughly double',
      'Net profit forecast raised to ¥338B on surging AI-server MLCC demand, with the company eyeing a record annual profit',
      'A February 2026 guidance revision alone added ¥60B to the outlook, citing stronger AI-server component demand and MLCC orders running at roughly 2x available supply',
    ],
    aiShift: 'AI server motherboards and power-delivery systems require dramatically more MLCC content per board than conventional servers — data-center MLCC revenue is guided to roughly double this fiscal year, and the company has raised prices on high-end MLCCs given orders running at roughly twice available supply. This is a genuine capacity-constrained, pricing-power situation rather than simple volume growth, which is unusual for a passive-components business.',
  },
  valuation: {
    peers: ['6981.T', '6762.T', '6976.T'],
    metrics: [
      { label: 'Price', values: ['¥7,129', '¥3,052', '—'] },
      { label: 'Market cap', values: ['~¥13.0T (~$88B)', '~¥5.79T (~$39B)', '—'] },
      { label: 'Trailing P/E', values: ['~42.4x', '~29.6x', '—'] },
      { label: 'Forward P/E', values: ['~34–56x (wide source variance)', '—', '—'] },
      { label: 'EV/EBITDA', values: ['~29.7x', '—', '—'] },
      { label: 'Net margin', values: ['~12.8%', '—', '—'] },
      { label: 'ROE', values: ['~8.8%', '—', '—'] },
      { label: 'Revenue growth (guided)', values: ['+15.2%', '—', '+4.1% (FY2026 actual)'] },
    ],
    verdictTone: 'high',
    verdictPoints: [
      'Trailing P/E of ~42.4x is well above TDK\'s ~29.6x — Murata\'s premium reflects its larger MLCC share and the AI-server-specific capacity-constrained pricing dynamic',
      'Forward P/E estimates showed unusually wide dispersion across sources (roughly 34x to 56x depending on provider and date) given how fast guidance has moved in 2026 — treat any single figure with caution',
      'ROE of ~8.8% is modest relative to the trailing P/E, suggesting the market is pricing in significant forward earnings growth (consistent with the +15.2% revenue guide and doubling data-center MLCC volumes) rather than current profitability',
      'Taiyo Yuden, a smaller domestic MLCC peer, posted only +4.1% FY2026 revenue growth but +536% earnings growth off a low base — illustrating how AI-server MLCC operating leverage is showing up across the whole peer group, not just Murata',
    ],
    justifiedIf: [
      'Data-center segment revenue actually reaches the guided ¥370.6B with MLCC volumes doubling as projected',
      'MLCC supply/demand stays structurally tight (orders ~2x supply) long enough to sustain the recent high-end price increases',
      'Automotive and traditional-electronics MLCC demand does not weaken enough to offset AI-server strength at the consolidated level',
    ],
  },
  priceMap: {
    zones: [
      { tier: 'ideal', range: '¥4,500 – ¥5,500', rationale: 'Well below the 52-week midpoint, reflecting this stock\'s wide historical range' },
      { tier: 'acceptable', range: '¥5,500 – ¥8,500', rationale: 'Current trading zone' },
      { tier: 'expensive', range: '>¥11,500', rationale: 'Approaching the 52-week high of ¥12,895' },
    ],
    technical: [
      '52-week range: ¥2,282.5 – ¥12,895',
      'Current price ¥7,129 sits roughly in the middle of the 52-week range',
      'Average 12-month analyst price target ¥10,797 (range: ¥4,200–¥15,750); 16 analysts rate the stock Buy, 0 rate it Sell',
      'Data-center segment MLCC volumes are guided to roughly double this fiscal year — the single most important forward datapoint',
    ],
    scenarios: [
      { label: 'BASE', prob: 45, note: 'Data-center segment revenue tracks toward the guided ¥370.6B as MLCC volumes roughly double — the stock grinds toward the ¥9,000–11,000 range, consistent with the analyst consensus target.' },
      { label: 'BULL', prob: 25, note: 'AI-server MLCC shortage persists or worsens, supporting further high-end price increases and additional guidance raises — pushes toward the ¥12,895–15,750 range (near the high analyst estimate).' },
      { label: 'BEAR', prob: 30, note: 'MLCC supply catches up to demand, pricing power fades, or automotive/traditional-electronics demand weakens — retraces toward ¥4,500–5,500.' },
    ],
    horizon: '12–24 months',
    invalidation: 'Weekly close below ¥4,200 (near the low analyst estimate and well below the 52-week midpoint)',
  },
  risks: [
    { risk: 'MLCC supply catch-up', severity: 'medium', note: 'The current ~2x orders-to-supply imbalance is a temporary capacity-constrained condition; new capacity (from Murata or peers) could eventually normalize pricing power.' },
    { risk: 'Automotive-end-market softness', severity: 'medium', note: 'Automotive electronics remains Murata\'s largest traditional end-market — a slowdown there could offset AI-server strength at the consolidated level.' },
    { risk: 'Valuation dispersion', severity: 'medium', note: 'Forward P/E estimates vary widely (~34x to ~56x) across sources given how fast 2026 guidance has moved — a sign of real estimate uncertainty, not just data noise.' },
    { risk: 'Competitive capacity additions', severity: 'medium', note: 'TDK, Taiyo Yuden and Samsung Electro-Mechanics are all expanding MLCC capacity in response to the same AI-server demand signal.' },
    { risk: 'Customer concentration in data center', severity: 'low', note: 'A relatively small number of server ODMs/hyperscalers drive the AI-server MLCC demand surge.' },
    { risk: 'Currency', severity: 'low', note: 'A stronger yen would compress yen-reported results even with stable dollar-denominated demand.' },
  ],
  backlog: {
    visibility: [
      'Revenue guidance raised to ¥2.11T (+15.2% YoY) as of the July 31, 2026 update',
      'Data-center segment full-year guidance ¥370.6B, with MLCC volumes for that segment guided to roughly double',
      'Net profit forecast raised to ¥338B, tracking toward a record annual profit',
    ],
    wins: [
      'MLCC orders for AI-server platforms running at roughly 2x available supply, per company commentary',
      'High-end MLCC price increases implemented in response to the AI-server-driven supply/demand imbalance',
      '16 of 16 covering analysts rate the stock Buy, with an average 12-month target of ¥10,797',
    ],
    clients: ['AI server ODMs and hyperscale datacenter builders (not individually named in available disclosures)'],
    suppliers: [],
  },
  synthesis: {
    scores: [
      { criterion: 'Business quality', stars: 5, note: 'Global MLCC leadership with genuine, disclosed pricing power in the current AI-server supply/demand imbalance.' },
      { criterion: 'AI growth exposure', stars: 5, note: 'Data-center segment MLCC volumes guided to double this fiscal year.' },
      { criterion: 'Profitability', stars: 4, note: 'Net profit forecast raised to a record ¥338B, though ROE (~8.8%) is modest relative to the multiple.' },
      { criterion: 'Valuation', stars: 2, note: 'Trailing P/E of ~42.4x is a clear premium to TDK; forward-multiple estimates show wide dispersion across sources.' },
      { criterion: 'Balance sheet', stars: 4, note: 'A large, well-capitalized global leader with diversified end-markets beyond AI (automotive, consumer electronics).' },
      { criterion: 'Risk', stars: 3, note: 'The current MLCC shortage is a real but potentially temporary capacity-constrained condition.' },
      { criterion: 'Entry timing', stars: 3, note: 'Trading near the middle of a very wide 52-week range, below the analyst consensus target.' },
    ],
    readLabel: 'CONSTRUCTIVE — MLCC LEADER WITH A GENUINE, DISCLOSED SUPPLY SQUEEZE',
    summary: 'Murata is the clearest large-cap way to buy the AI-server passive-components shortage: data-center MLCC volumes are guided to double, orders are running at roughly 2x available supply, and the company has been able to push through high-end price increases — a genuine pricing-power signal that is unusual for a components business. The trailing P/E premium to TDK reflects that strength, but forward-multiple estimates vary widely across sources given how quickly 2026 guidance has moved, and the current supply/demand imbalance is, by nature, a condition that new capacity (from Murata or competitors) will eventually erode. A staged approach that adds on pullbacks toward the lower half of the 52-week range is more consistent with disciplined entry than chasing strength near the highs.',
  },
  sourceNote: 'Compiled from public market data (GuruFocus, Investing.com, BigGo Finance, company IR summaries) as of August 2026; forward P/E estimates for this name showed unusually wide variance across sources given the pace of 2026 guidance revisions. This is a research framework, not a live feed — cross-check current prices and guidance before acting on anything here.',
},
'000660.KS': {
  ticker: '000660.KS',
  name: 'SK Hynix',
  tagline: 'The world\'s #2 memory maker and NVIDIA\'s dominant HBM supplier — Korea\'s most direct, highest-conviction bet on the AI memory supercycle.',
  sector: 'TELECOM & TECH',
  asOf: '2026.08',
  chain: {
    intro:
      'SK Hynix sits at the physical bottleneck of the AI buildout: every high-end GPU needs HBM stacked next to it, and SK Hynix ships more of it than anyone else.',
    rows: [
      { level: 'Memory fabrication (DRAM/NAND)', players: 'SK Hynix, Samsung, Micron', position: 'Core business — took #1 global DRAM revenue share in Q2 2026 (26% vs. Micron\'s 25%)', tone: 'core' },
      { level: 'HBM design + stacking', players: 'SK Hynix, Samsung, Micron', position: 'Dominant share of HBM shipments/revenue (roughly half to ~60%+ depending on quarter and metric)', tone: 'core' },
      { level: 'Advanced packaging partners', players: 'TSMC (logic base-die collaboration)', position: 'Strategic packaging tie-up for parts of the HBM4 stack', tone: 'indirect' },
      { level: 'Fabless AI accelerator design', players: 'NVIDIA, AMD, Broadcom', position: 'Direct customers — NVIDIA reportedly allocating roughly two-thirds to 70% of Rubin-platform HBM4 demand to SK Hynix', tone: 'client' },
      { level: 'AI datacenter / hyperscalers', players: 'Microsoft, Google, Amazon, Meta, Oracle', position: 'End-demand driver, exposure runs through GPU vendors', tone: 'indirect' },
      { level: 'Upstream equipment/materials', players: 'Lam Research, Applied Materials, Hanmi Semiconductor (TC bonders)', position: 'Suppliers to SK Hynix, not exposure for SK Hynix', tone: 'none' },
    ],
    segments: [
      'DRAM: the majority of revenue and the #1 global revenue share as of Q2 2026 (26%, edging out Micron\'s 25%), driven by both HBM and firm conventional DRAM pricing',
      'HBM: the growth engine — HBM3E is in full volume, and HBM4 entered mass production in Q2 2026 with yields already approaching mature HBM3E levels; HBM4E samples have shipped to key customers',
      'NAND: a smaller, more cyclical segment, secondary to the AI narrative',
      'Q2 2026: revenue ₩79.32T (+257% YoY, +51% QoQ), operating profit ₩60.54T (+557% YoY), operating margin 76% — a record',
    ],
    aiShift:
      'HBM is essentially a 100%-AI-driven product line sold almost entirely into GPU/accelerator stacks. NVIDIA is reported to be allocating close to two-thirds to 70% of its Rubin-platform HBM4 demand to SK Hynix, and the company is the only supplier positioned to ship both HBM3E and HBM4 in volume through the 2026 transition. The July 2026 Nasdaq ADR listing — $26.5B raised, the largest US listing ever by a foreign company — both funds capacity (the Cheongju M15X fab) and signals SK Hynix is increasingly being underwritten by a global AI-investor base rather than priced as a plain cyclical Korean memory stock.',
  },
  valuation: {
    peers: ['000660.KS', '005930.KS', 'MU'],
    metrics: [
      { label: 'Price', values: ['₩1,668,000 (Aug 5, 2026)', '₩248,250', '$873.29'] },
      { label: 'Market cap', values: ['₩1,215.75T (~$833.8B)', '₩1,527.6T (~$1.13T)', '$1.008T'] },
      { label: 'Trailing P/E', values: ['~16.6x', '~10.9x (computed: price / TTM EPS ₩22,704)', '19.7x'] },
      { label: 'Forward P/E', values: ['~6.8x', '~6.8x', '~6.1x'] },
      { label: 'P/B', values: ['~8.0x', '3.64x', 'n/a'] },
      { label: 'ROE (TTM)', values: ['~61%', '30.8%', '66.6%'] },
      { label: 'Dividend yield', values: ['0.17%', '0.61%', '0.07%'] },
      { label: 'Op. margin (Q2 2026)', values: ['76%', 'n/a', 'n/a'] },
    ],
    verdictTone: 'low',
    verdictPoints: [
      'Forward P/E of ~6.8x sits far below the AI-chip complex (TSMC, NVIDIA trade at multiples several times higher)',
      'PEG is near zero (~0.08 per several trackers) — earnings growth is outrunning the share-price re-rating',
      'Trailing P/E (~16.6x) and P/B (~8x) are not cheap in absolute terms — this is "cheap on forward earnings," not "cheap on every metric"',
    ],
    justifiedIf: [
      'HBM4 mass production ramps on schedule and yields keep tracking toward HBM3E maturity',
      'NVIDIA\'s Rubin-cycle allocation to SK Hynix holds near the reported ~70% level rather than shifting toward Samsung/Micron',
      'The 76% operating margin proves durable rather than a peak-cycle print',
    ],
  },
  priceMap: {
    zones: [
      { tier: 'ideal', range: '₩1,200,000 – ₩1,400,000', rationale: 'A meaningful pullback toward pre-ADR-listing levels; would reset the forward multiple further below peers' },
      { tier: 'acceptable', range: '₩1,400,000 – ₩1,900,000', rationale: 'Current trading zone — scaling in here accepts post-record-quarter volatility' },
      { tier: 'expensive', range: '>₩2,400,000', rationale: 'Approaches the June 2026 all-time high (₩2,987,000); little margin for a memory-pricing air pocket' },
    ],
    technical: [
      'All-time high ₩2,987,000 (June 25, 2026)',
      '52-week low ₩245,000 (pre-AI-supercycle re-rating)',
      'Stock is +512% over the trailing 12 months per most trackers',
      'Nasdaq ADR (SKHY) fell ~9% immediately after the record Q2 print — a "sell the news" reaction to profit-structure commentary (long-term HBM contracts constraining near-term flexibility), worth watching as a sentiment tell',
      'Current price sits well off the June ATH, consolidating post-earnings',
    ],
    scenarios: [
      { label: 'BASE', prob: 50, note: 'HBM4 ramps roughly as guided, DRAM pricing stays firm, shareholder-return policy lands as promised later in 2026 — stock ranges broadly ₩1.4M–₩2.0M over the next 12 months.' },
      { label: 'BULL', prob: 25, note: 'Rubin-cycle demand exceeds plan, Samsung\'s HBM4 qualification slips further, a buyback/dividend announcement lands well — retests or clears the ₩2.99M ATH.' },
      { label: 'BEAR', prob: 25, note: 'AI-capex digestion or a memory-pricing correction hits, Samsung/Micron narrow the HBM4 share gap faster than expected, multiple compresses back toward ₩1.0M–₩1.2M.' },
    ],
    horizon: '12 months',
    invalidation: 'Weekly close below ₩1,100,000 (loss of post-Q2-earnings support structure)',
  },
  risks: [
    { risk: 'Memory pricing cyclicality', severity: 'medium', note: 'DRAM/NAND have always been boom-bust; an AI-capex digestion phase would hit pricing even for HBM-heavy mix.' },
    { risk: 'Customer concentration', severity: 'medium', note: 'NVIDIA is the dominant buyer of HBM; a shift in Rubin-platform allocation toward Samsung or Micron is a real swing factor.' },
    { risk: 'Competitive catch-up', severity: 'medium', note: 'Samsung has cleared HBM4 qualification hurdles with NVIDIA and AMD after trailing through 2025; Micron already edged ahead in raw DRAM share in one recent quarter (25% vs. SK Hynix\'s 26%).' },
    { risk: 'Post-run valuation fatigue', severity: 'medium', note: 'Stock is up ~512% in a year; the ADR sold off on the record Q2 print itself — a sign the market is starting to price perfection.' },
    { risk: 'Capex / execution risk', severity: 'medium', note: 'Heavy buildout (Cheongju M15X and beyond) into HBM4/HBM4E carries yield-ramp and execution risk on an aggressive timeline.' },
    { risk: 'Geopolitical / export control', severity: 'medium', note: 'US-China chip-tech tensions bracket a Korean supplier serving both an American GPU customer base and a Chinese fab-tool/materials supply chain.' },
    { risk: 'Shareholder-return uncertainty', severity: 'low', note: 'Buyback/dividend policy was still undecided as of the Nasdaq ADR process (constrained by US securities disclosure rules); a weak announcement could disappoint.' },
  ],
  backlog: {
    visibility: [
      'HBM4 mass production underway since Q2 2026; HBM4E samples already shipped to key customers, targeting volume production in 2027',
      'Long-term supply agreements reportedly in place with roughly 10 customers',
      'Net cash position of ₩69.4T (cash ₩88T) post-ADR gives balance-sheet flexibility for further capacity and/or shareholder returns',
      'Shareholder-return policy (dividend/buyback specifics) expected to be detailed later in 2026',
    ],
    wins: [
      '$26.5B Nasdaq ADR listing (July 10, 2026) — the largest US share sale ever by a foreign company',
      'Reported ~two-thirds to 70% share of NVIDIA\'s Rubin-platform HBM4 allocation',
      '#1 global DRAM revenue share in Q2 2026 (26%)',
      'Record Q2 2026 operating margin of 76%',
    ],
    clients: ['NVIDIA', 'AMD', 'Broadcom (indirect, via custom silicon HBM demand)'],
    suppliers: ['Lam Research', 'Applied Materials', 'Hanmi Semiconductor (TC bonders)', 'ASML'],
  },
  synthesis: {
    scores: [
      { criterion: 'Business quality', stars: 5, note: 'Oligopoly memory market structure; SK Hynix leads the highest-value segment (HBM) outright.' },
      { criterion: 'AI growth exposure', stars: 5, note: 'About as direct as AI-infrastructure exposure gets — HBM is essentially a 100% AI-driven product line.' },
      { criterion: 'Valuation', stars: 4, note: 'Forward P/E (~6.8x) and PEG (~0.08) are genuinely low for the growth on offer, even after the run.' },
      { criterion: 'Momentum / entry timing', stars: 2, note: 'Up over 500% in a year; the post-earnings ADR selloff suggests the easy re-rating is largely behind it.' },
      { criterion: 'Risk', stars: 3, note: 'Cyclicality, customer concentration and resurgent competition are real, partly offset by a strong net-cash balance sheet.' },
      { criterion: 'Capital returns', stars: 2, note: 'Policy still undefined as of mid-2026 — a near-term unknown, not a current strength.' },
    ],
    readLabel: 'STRUCTURALLY CENTRAL TO THE AI MEMORY CYCLE — CHEAP ON FORWARD EARNINGS, NOT ON MOMENTUM',
    summary:
      'SK Hynix is the cleanest, most direct AI-infrastructure exposure among the three names here: HBM is overwhelmingly AI-driven demand, and SK Hynix is NVIDIA\'s largest HBM supplier by a wide margin. The valuation paradox is real — forward multiples remain low because earnings have grown even faster than the share price — but the stock has already moved enormously, and capital-return policy and competitive response from Samsung/Micron are the swing factors to watch over the next year.',
  },
  sourceNote:
    'Compiled from SK hynix Q2 2026 earnings materials, Nasdaq ADR listing coverage, and third-party market-data trackers (Investing.com, TradingView, various finance-data aggregators) as of early August 2026. Forward P/E, market cap and 52-week range figures vary somewhat by source and snapshot date given the stock\'s extreme volatility this year — cross-check live quotes before using any number here for a live decision.',
},

'042700.KS': {
  ticker: '042700.KS',
  name: 'Hanmi Semiconductor',
  tagline: 'Korea\'s dominant TC-bonder maker — the back-end equipment that physically stacks HBM dies, sitting directly in the SK Hynix/Micron/Samsung HBM supply chain.',
  sector: 'TELECOM & TECH',
  asOf: '2026.08',
  chain: {
    intro:
      'Note on ticker labeling: 042700.KS is Hanmi Semiconductor, a back-end packaging-equipment maker — not Samsung Electronics (whose real ticker is 005930.KS). This profile covers Hanmi Semiconductor.',
    rows: [
      { level: 'Raw materials / components', players: 'Precision servo, vision and bonding-head components (largely sourced, not disclosed in granular detail)', position: 'Not vertically integrated', tone: 'none' },
      { level: 'Back-end packaging equipment (TC bonders)', players: 'Hanmi Semiconductor, ASMPT, BESI, Kulicke & Soffa', position: 'Core business — historically ~70%+ overall TC-bonder share, reported as high as ~90% specifically in HBM TC bonders', tone: 'core' },
      { level: 'Memory manufacturers (HBM stacking)', players: 'SK Hynix, Micron, Samsung Electronics', position: 'Direct equipment customers', tone: 'client' },
      { level: 'Fabless AI accelerator design', players: 'NVIDIA, AMD', position: 'End demand — HBM volumes flow from GPU roadmaps', tone: 'indirect' },
      { level: 'AI / datacenter', players: 'Hyperscalers', position: 'Indirect end market', tone: 'indirect' },
    ],
    segments: [
      'TC bonders (thermo-compression bonders): the flagship product, used to precisely bond memory dies under heat and pressure during HBM stacking — Hanmi\'s core moat',
      'FY2025 revenue: ₩576.7B (record), operating margin 43.6%',
      'Q1 2026: revenue collapsed to ₩50.9B (-65.5% YoY) and operating profit to ₩8.46B (-87.9% YoY) as customer orders air-pocketed during the HBM3E-to-HBM4 transition',
      'Q2 2026: sharp recovery — revenue and operating profit beat consensus by 8% and 13% respectively; gross margin 62%, operating margin 52%',
      'Next-generation TC bonder for HBM4/HBM4E slated for launch in 2H 2026',
    ],
    aiShift:
      'Hanmi is a pure-play on the physical bonding step every HBM stack requires. Demand is entirely a function of HBM memory-maker capex and node-transition timing (HBM3E to HBM4), which is why results are lumpy quarter to quarter even as the multi-year trend is clearly up. Micron accounted for 46% of one recent quarter\'s sales and SK hynix has resumed TC-bonder ordering tied to HBM4 (including a ₩44.2B order won in June 2026), underscoring how directly Hanmi rides the same HBM cycle as SK Hynix and Samsung.',
  },
  valuation: {
    peers: ['042700.KS', '0522.HK', 'BESI.AS'],
    metrics: [
      { label: 'Price', values: ['₩284,000 (Aug 5, 2026 open)', 'n/a (HKD-denominated)', 'n/a (EUR-denominated)'] },
      { label: 'Market cap', values: ['~₩25.6T (~$18-19B)', 'HKD ~78-85B', 'EUR ~16-22B'] },
      { label: 'Trailing P/E', values: ['~68x', 'n/a', 'n/a'] },
      { label: 'Forward P/E', values: ['~53x', '~46-52x', '~47-56x'] },
      { label: 'Dividend yield', values: ['~0.3-0.5%', 'n/a', 'n/a'] },
      { label: 'Op. margin (Q2 2026)', values: ['52%', 'n/a', 'n/a'] },
      { label: 'Analyst target price', values: ['₩325,000 (bull case, Jul 2026) vs. ₩182,875 (bear case) — wide dispersion', 'n/a', 'n/a'] },
    ],
    verdictTone: 'fair',
    verdictPoints: [
      'Forward P/E (~53x) is broadly in line with global advanced-packaging peers ASMPT and BESI (~46-56x), despite Hanmi\'s narrower, more concentrated product line',
      'Stock trades ~33% below its May 2026 all-time high, but analyst targets disagree sharply (₩182,875 to ₩325,000) — the market has not converged on fair value',
      'Trailing P/E (~68x) reflects the Q1 2026 earnings air-pocket dragging on TTM earnings, not a clean read on run-rate profitability',
    ],
    justifiedIf: [
      'TC-bonder orders keep recovering through 2026 as HBM4 volume ramps broaden across SK Hynix, Micron and (eventually) Samsung',
      'The 2H 2026 next-generation TC bonder launch defends share against BESI/ASMPT encroachment',
      'The company\'s own $1.5B 2026 revenue target (vs. ₩576.7B delivered in FY2025) proves directionally achievable, even if not fully met',
    ],
  },
  priceMap: {
    zones: [
      { tier: 'ideal', range: '₩180,000 – ₩220,000', rationale: 'Deep pullback zone, closer to pre-2026-rally levels and the more bearish analyst target' },
      { tier: 'acceptable', range: '₩220,000 – ₩310,000', rationale: 'Current trading range — accepts continued order lumpiness as the price of HBM-equipment pure-play exposure' },
      { tier: 'expensive', range: '>₩380,000', rationale: 'Approaches the ₩426,000 all-time high — priced for flawless HBM4 ramp execution' },
    ],
    technical: [
      'All-time high ₩426,000 (May 12, 2026)',
      '52-week low ₩81,400',
      'Down roughly 33% from the ATH as of early August 2026, including a -14.4% single week',
      'Chairman Kwak Dong-shin raised his stake to 33.61% with a ₩5B open-market purchase during the earnings slump — an insider-confidence signal worth noting, not a valuation floor',
    ],
    scenarios: [
      { label: 'BASE', prob: 45, note: 'TC-bonder orders keep recovering through 2026 as HBM4 ramps broaden across customers; revenue grows meaningfully but likely falls short of the $1.5B target — stock ranges roughly ₩250,000-₩350,000.' },
      { label: 'BULL', prob: 25, note: 'The 2H26 next-gen TC bonder wins share, Samsung becomes a large new customer, HBM4 volumes beat plan — stock retests or clears the ₩426,000 ATH.' },
      { label: 'BEAR', prob: 30, note: 'A Q1-2026-style order air pocket repeats around the next node transition, and/or BESI or ASMPT take further share in hybrid bonding — stock retests ₩150,000-₩180,000.' },
    ],
    horizon: '12 months',
    invalidation: 'Weekly close below ₩180,000',
  },
  risks: [
    { risk: 'Customer concentration', severity: 'high', note: 'A single customer (Micron) accounted for 46% of sales in one recent quarter; SK Hynix and Samsung order timing swings materially move results.' },
    { risk: 'Order lumpiness around node transitions', severity: 'high', note: 'Q1 2026 revenue fell 65.5% YoY purely on the HBM3E-to-HBM4 order gap — this pattern can recur at each future memory-generation transition.' },
    { risk: 'Competitive share loss', severity: 'medium', note: 'BESI and ASMPT are gaining share from Korean suppliers (Hanmi and Hanwha) as HBM bonding tolerances tighten.' },
    { risk: 'Technology-transition risk (hybrid bonding)', severity: 'medium', note: 'A longer-term industry shift toward copper-copper hybrid bonding could eventually erode the addressable market for thermo-compression bonders.' },
    { risk: 'Valuation dispersion / volatility', severity: 'medium', note: 'Analyst targets span from ₩182,875 to ₩325,000 — an unusually wide range signaling real disagreement on fair value.' },
    { risk: 'Aggressive growth target', severity: 'medium', note: 'Management\'s $1.5B 2026 revenue goal implies roughly 2.5x+ growth over FY2025\'s record ₩576.7B — a high bar even with HBM4 tailwinds.' },
    { risk: 'Small-cap liquidity / single-market exposure', severity: 'low', note: 'Concentrated in KRW, on a single equipment category, with a market cap far smaller than global peers ASMPT/BESI.' },
  ],
  backlog: {
    visibility: [
      'Next-generation TC bonder for HBM4/HBM4E slated for launch in 2H 2026',
      '2026 company revenue target of $1.5B (~₩2T), versus FY2025 actual of ₩576.7B — an explicit, aggressive management goal, not a guarantee',
      'Q2 2026 results already beat consensus by 8% (revenue) and 13% (operating profit), signaling the order recovery is underway',
    ],
    wins: [
      '₩44.2B HBM4 TC-bonder order win from SK hynix (June 2026)',
      'Micron order flow resumed strongly, 46% of one recent quarter\'s sales',
      'FY2025 record revenue (₩576.7B) and record 43.6% operating margin',
    ],
    clients: ['SK Hynix', 'Micron', 'Samsung Electronics (smaller, growing)'],
    suppliers: ['Precision component and vision-system suppliers (not individually disclosed in public filings)'],
  },
  synthesis: {
    scores: [
      { criterion: 'Business quality', stars: 4, note: 'Dominant, sticky niche in a critical HBM process step, though a single-product concentration versus more diversified peers.' },
      { criterion: 'AI growth exposure', stars: 5, note: 'A pure-play on HBM stacking volume — no unrelated business lines diluting the story.' },
      { criterion: 'Valuation', stars: 3, note: 'Down sharply from the ATH and roughly in line with global peers on forward P/E, but not statistically cheap.' },
      { criterion: 'Order visibility', stars: 2, note: 'Proven to swing violently quarter to quarter around memory-node transitions — visibility is genuinely poor near transition points.' },
      { criterion: 'Competitive moat', stars: 3, note: 'Historically dominant TC-bonder share, but BESI and ASMPT are credibly encroaching, especially as bonding precision requirements rise.' },
      { criterion: 'Risk', stars: 3, note: 'Customer concentration and node-transition lumpiness are real and recurring, not one-off.' },
    ],
    readLabel: 'HIGH-CONVICTION HBM EQUIPMENT PURE-PLAY — EXPECT LUMPY QUARTERS',
    summary:
      'Hanmi is about as close to a pure-play HBM-equipment bet as exists on the Korean market — it makes the machines that physically stack the dies SK Hynix and Micron ship into NVIDIA\'s supply chain. The business is excellent when node transitions are mid-ramp and brutal when they\'re not, as Q1 2026\'s 65.5% revenue decline demonstrated. Down a third from its ATH with analyst targets that disagree by nearly 2x, this reads as a legitimate but genuinely volatile way to play the HBM equipment cycle — not a steady compounder.',
  },
  sourceNote:
    'Compiled from Hanmi Semiconductor Q1/Q2 2026 earnings coverage (Seoul Economic Daily, BigGo Finance, Asia Business Daily), and third-party data aggregators (stockanalysis.com, TradingView, GuruFocus) as of early August 2026. IMPORTANT CORRECTION: an earlier internal note mislabeled ticker 042700.KS as "Samsung Electronics" — that is incorrect. Samsung Electronics trades under 005930.KS; 042700.KS is Hanmi Semiconductor, and all data in this profile is about Hanmi. Valuation figures (market cap, P/E) vary noticeably across sources/dates given the stock\'s volatility — cross-check before live use.',
},

'000150.KS': {
  ticker: '000150.KS',
  name: 'Doosan Corporation',
  tagline: 'An industrial holding company (Bobcat, Robotics, electronic materials) making a real but still-early pivot toward semiconductors via a pending SK Siltron acquisition — priced well ahead of what it has actually delivered.',
  sector: 'TELECOM & TECH',
  asOf: '2026.08',
  chain: {
    intro:
      'Doosan Corporation is primarily an industrial conglomerate holding company, not a semiconductor company. Its AI/chip exposure today is real but narrow (electronic materials, chip testing); a pending wafer-maker acquisition would expand that exposure materially, but has not closed yet.',
    rows: [
      { level: 'Silicon wafers (post-close)', players: 'SK Siltron (pending 70.6% acquisition, expected to close ~Jan 2027)', position: 'Not yet consolidated — deal signed July 31, 2026, not closed', tone: 'growth' },
      { level: 'Electronic materials (CCL substrates)', players: 'Doosan Corporation Electro-Materials BG', position: 'Core, wholly-owned business unit — supplies copper-clad laminate used in semiconductor substrate packaging, including to Nvidia-linked supply chains', tone: 'core' },
      { level: 'System-semiconductor back-end testing', players: 'Doosan Tesna (38.7% stake)', position: 'Minority-but-controlling stake in Korea\'s #1 chip-testing firm', tone: 'core' },
      { level: 'Construction/industrial equipment', players: 'Doosan Bobcat, Doosan Mottrol', position: 'The largest consolidated revenue driver — not semiconductor/AI-related', tone: 'none' },
      { level: 'Collaborative robotics', players: 'Doosan Robotics', position: 'Growing but still operating-loss-making; sells into general industrial automation, not chip-specific', tone: 'none' },
      { level: 'Power/energy equipment', players: 'Doosan Enerbility (separately listed affiliate stake)', position: 'Equity-method affiliate, not a consolidated semiconductor exposure', tone: 'none' },
    ],
    segments: [
      'Doosan Bobcat: by far the largest revenue segment — Q2 2026 revenue ₩2.45T (~$1.7B), operating profit ₩291.7B (+43% YoY, partly on a US tariff refund) — construction/compact equipment, unrelated to AI/semiconductors',
      'Electro-Materials BG: CCL for semiconductor substrates; posted a record ~30% operating margin in an early-2025 quarter on AI-linked demand; guided to ₩1.5T in 2H 2026 sales',
      'Doosan Robotics: Q2 2026 revenue ₩17.7B (+290% YoY), operating loss narrowed to -₩14.4B — still unprofitable',
      'Doosan Tesna: system-semiconductor back-end testing, majority-controlled since 2022',
      'Consolidated Q2 2026: revenue ₩5,586B (+5.0% YoY, +11.0% QoQ), operating profit ₩488B (+37.8% YoY) — an implied consolidated operating margin of ~8.7%, well below the AI-linked sub-segments\' own margins because Bobcat and other non-AI units dominate the total',
    ],
    aiShift:
      'Be precise about what is and isn\'t AI exposure here: Electro-Materials (CCL substrates) and Doosan Tesna (chip testing) are real, AI/semiconductor-linked businesses, but together they are a minority of consolidated revenue dominated by Doosan Bobcat\'s construction-equipment business. The genuinely transformative event is the pending SK Siltron acquisition — a 70.6% stake for ₩2.3T (~$1.6B), signed July 31, 2026 — which would make Doosan a top-tier global silicon/SiC wafer supplier to Samsung, SK Hynix, Intel, Micron and TSMC, with a stated ambition of ₩3T in wafer sales by 2031 and a #2 global memory-wafer-supplier position. As of August 2026 this deal has NOT closed (expected close ~January 2027), and the remaining 29.4% Siltron stake held personally by SK Chairman Chey Tae-won is still a separate, unresolved negotiation. Until close, Doosan\'s "semiconductor pivot" is a narrative the stock has already priced in more than a delivered financial reality.',
  },
  valuation: {
    peers: ['000150.KS', '034730.KS'],
    metrics: [
      { label: 'Price', values: ['₩1,046,000 (Jul 28, 2026)', '₩467,000 (Jul 30, 2026)'] },
      { label: 'Market cap', values: ['~₩18.7T (~$13.6B)', '~$25.3B (~₩34.7T)'] },
      { label: 'Trailing P/E', values: ['~230x-620x (sources diverge widely — thin consolidated net income relative to market cap)', 'n/a'] },
      { label: 'P/S', values: ['0.64x', 'n/a'] },
      { label: 'Op. margin (Q2 2026, consolidated)', values: ['~8.7% (computed: ₩488B / ₩5,586B)', 'n/a'] },
      { label: 'Revenue growth (Q2 2026 YoY)', values: ['+5.0%', 'n/a'] },
    ],
    verdictTone: 'high',
    verdictPoints: [
      'Trailing P/E readings in the hundreds (sources range roughly 230x-620x) indicate the stock is priced almost entirely on the semiconductor-transformation narrative, not on delivered consolidated earnings',
      'Consolidated operating margin (~8.7%) is a low-single-digit-industrial-conglomerate margin, not a semiconductor-company margin — the AI-linked segments (Electro-Materials, Tesna) are real but still small relative to Bobcat',
      'The stock is already down roughly 55-58% from its 2026 all-time high (₩2,489,000), suggesting the market has partially, but not fully, walked back the initial re-rating on Siltron deal news',
    ],
    justifiedIf: [
      'The SK Siltron acquisition closes on schedule (~January 2027) without regulatory delay or a dilutive financing structure',
      'Doosan successfully negotiates the remaining 29.4% Siltron stake from Chey Tae-won, giving it full control',
      'Electro-Materials and Tesna keep growing fast enough, and Bobcat/Robotics stay healthy enough, to make the "AI infrastructure conglomerate" story credible on delivered numbers, not just deal announcements',
    ],
  },
  priceMap: {
    zones: [
      { tier: 'ideal', range: '₩600,000 – ₩800,000', rationale: 'Near pre-Siltron-speculation levels; would reflect a real reset of the transformation premium' },
      { tier: 'acceptable', range: '₩800,000 – ₩1,300,000', rationale: 'Current trading zone — still carries meaningful deal-completion and integration risk' },
      { tier: 'expensive', range: '>₩1,800,000', rationale: 'Approaches prior 2026 highs; priced for a flawless Siltron close and integration with no execution slippage' },
    ],
    technical: [
      'All-time high ₩2,489,000 (2026, on Siltron deal speculation)',
      '52-week low ₩468,000',
      'Stock jumped over 5% on Dec 24, 2025 when financing-structure uncertainty (treasury shares vs. a rights offering) was resolved — a reminder of how deal-mechanics headlines move this name',
      'Currently trading well off the 2026 high, reflecting the gap between the SPA signing (July 31, 2026) and the actual deal close (~January 2027)',
    ],
    scenarios: [
      { label: 'BASE', prob: 45, note: 'The SK Siltron deal closes roughly on schedule (~Jan 2027) without major regulatory friction; Electro-Materials and Bobcat keep delivering — stock consolidates broadly in the ₩800,000-₩1,300,000 range awaiting Siltron consolidation.' },
      { label: 'BULL', prob: 20, note: 'Integration executes cleanly, Doosan secures the remaining 29.4% Siltron stake from Chey Tae-won, wafer sales trend ahead of the ₩3T/2031 target — re-rate back toward 2026 highs.' },
      { label: 'BEAR', prob: 35, note: 'Regulatory delay, financing/dilution overhang, or a Bobcat demand slowdown (North American construction cycle, tariff policy) reasserts the conglomerate discount — retest of ₩600,000-₩700,000.' },
    ],
    horizon: '12-18 months (deal close alone is not expected until ~January 2027)',
    invalidation: 'Weekly close below ₩600,000',
  },
  risks: [
    { risk: 'SK Siltron deal completion risk', severity: 'high', note: 'SPA signed July 31, 2026 but close isn\'t expected until ~January 2027; regulatory approvals and the separate negotiation for Chey Tae-won\'s 29.4% stake are both still open.' },
    { risk: 'Valuation far ahead of delivered earnings', severity: 'high', note: 'Trailing P/E in the hundreds reflects a stock priced on a semiconductor-transformation story, not on consolidated fundamentals that remain dominated by industrial/construction equipment.' },
    { risk: 'Semiconductor exposure still a minority of revenue', severity: 'medium', note: 'Electro-Materials and Doosan Tesna are real but small next to Doosan Bobcat; Siltron isn\'t consolidated yet — don\'t mistake the narrative for the current numbers.' },
    { risk: 'Financing / dilution risk', severity: 'medium', note: 'Funding the ₩2.3T Siltron purchase already moved the stock on treasury-share/rights-offering speculation in December 2025; how the remaining stake and integration are financed remains a live question.' },
    { risk: 'Conglomerate / chaebol governance complexity', severity: 'medium', note: 'Capital allocation spans Bobcat, Robotics, Electro-Materials, an Enerbility equity stake, Tesna, and soon Siltron — cross-holding and related-party structures are typical chaebol-governance considerations.' },
    { risk: 'Doosan Bobcat cyclicality', severity: 'medium', note: 'The largest revenue segment is exposed to North American construction-equipment demand and tariff policy; the Q2 2026 profit beat was partly a one-off tariff refund, not pure organic growth.' },
    { risk: 'Doosan Robotics still loss-making', severity: 'low', note: 'Revenue is growing fast (+290% YoY) but the segment remains operating-loss-negative, a drag rather than a contributor today.' },
  ],
  backlog: {
    visibility: [
      'SK Siltron SPA signed July 31, 2026 for a 70.6% stake at ₩2.3T; close targeted ~January 2027',
      'Stated ambition: ₩3T in Siltron wafer sales by 2031 and a #2 global memory-wafer-supplier position',
      'Electro-Materials BG guided to ₩1.5T in 2H 2026 sales on AI/semiconductor demand and new facility ramp-up',
      'Remaining 29.4% Siltron stake (held by SK Chairman Chey Tae-won) is a separate, unresolved negotiation Doosan intends to pursue',
    ],
    wins: [
      'SK Siltron acquisition agreement — Doosan\'s first "megadeal" since the 2007 Bobcat acquisition',
      'Electro-Materials BG record ~30% operating margin quarter on AI-linked CCL demand (including Nvidia-linked shipments)',
      'Doosan Bobcat Q2 2026 operating profit +43% YoY',
      'Doosan Robotics Q2 2026 revenue +290% YoY on large new orders and the ONEXIA acquisition',
    ],
    clients: ['Nvidia (Electro-Materials CCL demand)', 'Samsung, SK Hynix, Intel, Micron, TSMC (future SK Siltron wafer customers, post-close)'],
    suppliers: ['Copper and glass-fiber inputs (Electro-Materials)', 'Component/hydraulics suppliers to Doosan Bobcat (non-semiconductor)'],
  },
  synthesis: {
    scores: [
      { criterion: 'Business quality', stars: 3, note: 'Solid industrial businesses (Bobcat) alongside a still-loss-making robotics unit and small high-margin electronic-materials niche — a mixed portfolio, not a focused compounder.' },
      { criterion: 'Semiconductor exposure today', stars: 2, note: 'Real (Electro-Materials, Tesna) but genuinely a minority of consolidated revenue; don\'t overstate it.' },
      { criterion: 'Semiconductor exposure post-Siltron (if closed)', stars: 4, note: 'Would meaningfully reposition the group as a global wafer supplier — but this is a 2027-and-beyond outcome, not a current fact.' },
      { criterion: 'Valuation', stars: 1, note: 'Trailing multiples in the hundreds price in a transformation that hasn\'t closed yet, let alone been integrated.' },
      { criterion: 'Deal/execution risk', stars: 2, note: 'Regulatory approval, the remaining 29.4% stake negotiation, and financing structure are all still open questions.' },
      { criterion: 'Momentum', stars: 2, note: 'Down ~55-58% from the 2026 all-time high, reflecting a cooling of the initial re-rating as the market waits for the deal to actually close.' },
    ],
    readLabel: 'PRE-TRANSFORMATION HOLDING COMPANY — SEMICONDUCTOR STORY IS MOSTLY A 2027+ EVENT',
    summary:
      'Doosan Corporation is, today, primarily a construction-equipment and industrial holding company with a small but genuine semiconductor-materials/testing sliver (Electro-Materials, Doosan Tesna). The pending SK Siltron acquisition is a real and significant strategic pivot — if it closes as planned around January 2027 and the remaining stake gets resolved, it would make Doosan a legitimate global wafer supplier. But as of August 2026 that deal has not closed, the semiconductor businesses remain a minority of consolidated revenue, and the stock\'s extreme trailing multiples suggest the market has already paid up for a transformation that is still, mechanically, in progress rather than done.',
  },
  sourceNote:
    'Compiled from Doosan Corporation Q1/Q2 2026 earnings releases, Seoul Economic Daily, Korea JoongAng Daily, The Korea Times and Korea Herald coverage of the SK Siltron transaction, and third-party data aggregators (Morningstar, stockanalysis.com) as of early August 2026. P/E and market-cap figures vary substantially across sources given thin/volatile consolidated earnings — treat the trailing P/E figures here as directionally indicative ("very expensive on current earnings"), not precise, and cross-check before live use. The SK Siltron deal was signed but not yet closed as of this writing.',
},
  '300476.SZ': {
    ticker: '300476.SZ',
    name: 'Victory Giant Technology (Huizhou) Co., Ltd',
    tagline: 'China\'s top AI-server PCB maker by revenue share — a core HDI/HLC board supplier inside Nvidia\'s GB200/GB300 supply chain, now sampling for Rubin.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Victory Giant doesn\'t design silicon — it fabricates the high-density-interconnect (HDI) and high-layer-count (HLC) printed circuit boards that carry GPU, switch and networking silicon inside AI servers. It ranked #1 globally in AI/HPC PCB revenue share (13.8%) in H1 2025 and holds an estimated 50-60% share of HDI/HLC boards on Nvidia\'s GB200 platform.',
      rows: [
        { level: 'CCL / copper foil laminate', players: 'Shengyi Technology, EMC, Iteq', position: 'Upstream input supplier', tone: 'indirect' },
        { level: 'PCB fabrication (HDI/HLC)', players: 'Victory Giant, Shennan Circuits, WUS, Unimicron', position: 'Core business — #1 global AI/HPC PCB share (13.8%, H1 2025)', tone: 'core' },
        { level: 'AI server ODM/OEM', players: 'Foxconn, Quanta, Wiwynn', position: 'Direct customers for finished boards', tone: 'client' },
        { level: 'GPU / accelerator design', players: 'Nvidia (GB200/GB300, Rubin sampling), AMD, Broadcom', position: 'End-silicon driving board specification', tone: 'indirect' },
        { level: 'Hyperscaler datacenter', players: 'Microsoft, Google, Meta, Amazon', position: 'End-market demand pull', tone: 'indirect' },
      ],
      segments: [
        'HDI boards: 38.5% of 2025 revenue (up from 14.2% in 2024), revenue +388.2% YoY to RMB 7.42B',
        '2025 total revenue RMB 19.3B (+79.8% YoY); net profit RMB 4.31B (+273.5% YoY)',
        'Gross margin expanded to 35.2% in 2025 from 22.7% in 2024',
        'Capacity build-out in Huizhou plus new bases in Thailand, Vietnam and Malaysia to diversify geography',
        'Filed for a Hong Kong secondary listing in April 2026 to access international capital',
      ],
      aiShift:
        'Every generation of Nvidia AI-server platform (GB200 to GB300 to Rubin/Rubin Ultra) raises layer count, via density and board complexity, which increases dollar content per board for whoever supplies it. Victory Giant is an early sampling/testing partner for Rubin and Rubin Ultra and entered Nvidia\'s supply chain in 2020, making it one of the most direct China-listed proxies for AI-server capex.',
    },
    valuation: {
      peers: ['300476.SZ', '002916.SZ', '002463.SZ'],
      metrics: [
        { label: 'Price', values: ['¥201.22', '~¥217-333 (volatile)', '¥128.83'] },
        { label: 'Market cap', values: ['~¥198B (~$28B)', '~¥180-260B (noisy)', '~¥241B'] },
        { label: 'Trailing P/E', values: ['~46x', 'n/a', '~56.5x'] },
        { label: 'Forward P/E', values: ['n/a', 'n/a', '~35.6x'] },
        { label: 'Gross margin', values: ['35.2% (FY2025)', 'n/a', 'n/a'] },
        { label: 'Net margin', values: ['~22.3% (FY2025)', 'n/a', 'n/a'] },
        { label: 'Revenue growth', values: ['+79.8% (FY2025)', 'n/a', 'n/a'] },
        { label: '52-week return', values: ['highly volatile, +100%+ then a sharp correction', 'n/a', '+175.9%'] },
      ],
      verdictTone: 'high',
      verdictPoints: [
        'Trailing P/E of roughly 46x follows a 273.5% net-profit surge in 2025 — growth-adjusted it is less extreme than the peer group\'s triple-digit multiples, but it is still a full re-rating on a single AI-cycle narrative',
        'Price and market-cap data for this name are unusually dispersed across data aggregators (figures seen from ¥182 to ¥402.60 over the trailing year) — this reflects genuine, extreme volatility rather than a data error, driven by a June 2026 governance scandal and Nvidia pricing-related news flow layered on top of the underlying AI-PCB rally',
        'Gross margin nearly doubled from 22.7% (2024) to 35.2% (2025) as HDI mix shifted from 14% to 38.5% of revenue — the re-rating has real margin support, not just multiple expansion',
      ],
      justifiedIf: [
        'GB200/GB300 shipments and early Rubin/Rubin Ultra sampling convert into sustained HDI/HLC order volume through 2027',
        'Victory Giant defends its 50-60% share of Nvidia HDI/HLC content against Shennan Circuits, WUS and Unimicron capacity additions',
        'Overseas capacity (Thailand, Vietnam, Malaysia) ramps on schedule, insulating the order book from any single-country tariff or export-control shock',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '¥150 – ¥180', rationale: 'Near the reported 52-week low (~¥182) — a genuine stress-test level for this name' },
        { tier: 'acceptable', range: '¥180 – ¥230', rationale: 'Current post-correction trading zone' },
        { tier: 'expensive', range: '>¥320', rationale: 'Approaching the reported 2026 high near ¥400-402' },
      ],
      technical: [
        '52-week range approximately ¥182 – ¥402.60 (sources vary; treat precise levels as directional given this stock\'s extreme volatility)',
        'Stock lost roughly RMB 20B (~$3.0B) of market cap in a single June 2026 session after a chairman personal-conduct scandal, before partly rebounding',
        'Further pressure in July 2026 from Nvidia price-cut rumors hitting PCB-supplier sentiment sector-wide',
        'Current price (~¥201, early August 2026) sits well off the 2026 high, closer to the 52-week low than the high',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'GB200/GB300 volumes and Rubin sampling convert on schedule, HDI mix keeps rising — grinds back toward ¥280-320 over 6-12 months.' },
        { label: 'BULL', prob: 20, note: 'Rubin ramp plus incremental share gains against domestic rivals re-rate the stock back toward or beyond the ~¥400 high.' },
        { label: 'BEAR', prob: 30, note: 'AI-capex digestion, a customer concentration shock, or renewed governance/sentiment overhang retests the ¥150-180 area.' },
      ],
      horizon: '6-12 months',
      invalidation: 'Weekly close below ¥150',
    },
    risks: [
      { risk: 'Customer concentration', severity: 'high', note: 'A large share of the AI-PCB growth story runs through Nvidia\'s GB-series and Rubin programs — any Nvidia design change or dual-sourcing shift hits directly.' },
      { risk: 'Valuation and volatility', severity: 'high', note: 'The stock has moved through an extremely wide range within 2026; a ~46x trailing P/E on a single-narrative growth story leaves limited room for disappointment.' },
      { risk: 'AI capex cyclicality', severity: 'high', note: 'Revenue and margin gains are tightly coupled to hyperscaler/GPU-maker capex cycles, which can pause or digest sharply.' },
      { risk: 'Governance / key-man risk', severity: 'medium', note: 'A June 2026 personal scandal involving the chairman triggered a same-day ~7% share-price drop — a reminder of thin corporate-governance buffers typical of recently-listed Chinese growth names.' },
      { risk: 'Competitive capacity additions', severity: 'medium', note: 'Shennan Circuits, WUS Printed Circuit and Taiwan\'s Unimicron are all scaling HDI/HLC capacity to capture the same AI-server demand.' },
      { risk: 'Nvidia pricing power', severity: 'medium', note: 'Rumors of Nvidia pushing for supplier price cuts (July 2026) illustrate the asymmetric bargaining position of the end customer.' },
      { risk: 'China export-control overhang', severity: 'low', note: 'Broader US-China tech restrictions are a tail risk to the AI-server supply chain Victory Giant sits inside, even though PCBs themselves are not directly export-controlled.' },
    ],
    backlog: {
      visibility: [
        'HDI revenue +388.2% YoY in 2025, rising from 14.2% to 38.5% of total revenue',
        '2025 revenue +79.8% YoY to RMB 19.3B; net profit +273.5% YoY to RMB 4.31B',
        'Hong Kong IPO filed April 2026 for international capital access',
        'RMB ~700M employee stock ownership plan launched June 2026 to stabilize the shareholder base after the governance-scandal selloff',
      ],
      wins: [
        'Estimated 50-60% share of HDI/HLC boards on Nvidia\'s GB200 platform',
        'Early sampling/testing partner for Nvidia\'s next-generation Rubin and Rubin Ultra platforms',
        '#1 global AI/HPC PCB revenue share (13.8%) in H1 2025',
        'New production bases in Thailand, Vietnam and Malaysia advancing to diversify geographic/tariff exposure',
      ],
      clients: ['Nvidia (via ODM supply chain)', 'Foxconn', 'Quanta', 'Wiwynn'],
      suppliers: ['Shengyi Technology', 'Elite Material Co (EMC)', 'Iteq Corporation'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 4, note: 'Leading HDI/HLC PCB maker with a genuine, margin-backed AI-server growth story.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Direct, first-order exposure to Nvidia GB200/GB300 and early Rubin sampling.' },
        { criterion: 'Valuation', stars: 2, note: '~46x trailing P/E after a 273% profit surge — priced for continued hypergrowth.' },
        { criterion: 'Governance / risk', stars: 2, note: 'A June 2026 chairman scandal and extreme price volatility flag thin governance buffers.' },
        { criterion: 'Growth momentum', stars: 5, note: 'Revenue +80%, net profit +273%, gross margin +12.5pp in a single year.' },
        { criterion: 'Entry timing', stars: 3, note: 'Well off the 2026 high, but no clear technical floor has been established given the volatility.' },
      ],
      readLabel: 'HIGH-BETA AI-PCB LEADER — GOVERNANCE AND VALUATION DEMAND CAUTION',
      summary:
        'Victory Giant is arguably the most direct China-listed proxy for Nvidia\'s AI-server board content, with real margin expansion behind the growth narrative rather than pure multiple inflation. But 2026 has been a case study in single-name idiosyncratic risk: a chairman scandal wiped out billions in market cap in a single session, Nvidia price-cut rumors hit sentiment weeks later, and the resulting price swings make this one of the noisiest names in the set to price precisely. The fundamentals argue for a structural AI-PCB winner; the volatility argues for treating any single data point on price or multiple as a snapshot, not a fact.',
    },
    sourceNote:
      'IMPORTANT: the ticker "300475.SZ" as originally specified corresponds to Shannon Semiconductor Technology, not Victory Giant — Victory Giant Technology (Huizhou) trades under 300476.SZ, which is used throughout this entry. Compiled from stockanalysis.com, Yahoo Finance, Investing.com, Xueqiu, Reuters/TradingView and Chinese-language financial press as of August 2026. Price and market-cap figures for this name were unusually dispersed across sources (likely reflecting a mid-2026 capitalization/share event plus extreme trading volatility) — cross-check current levels before using any number here as precise.',
  },

  '301377.SZ': {
    ticker: '301377.SZ',
    name: 'Guangdong Dtech Technology Co., Ltd',
    tagline: 'Global #1 in PCB drill bits (26.5% share) — the precision tooling every high-layer AI-server board is drilled with, priced at an extraordinary multiple.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Dtech doesn\'t make PCBs — it makes the micro-drills, milling cutters, CNC tool grinders and abrasive/brush consumables that PCB fabricators use to drill vias and shape multilayer boards. As AI-server HDI boards add layers and via density, tool consumption per board rises independently of which fabricator wins the business.',
      rows: [
        { level: 'Tungsten carbide raw material', players: 'Undisclosed carbide suppliers', position: 'Upstream input', tone: 'indirect' },
        { level: 'Precision PCB tooling', players: 'Dtech (26.5% global share, 2023), Union Tool (Japan), Mitsubishi Materials', position: 'Core business — global #1 in PCB drill bits', tone: 'core' },
        { level: 'PCB fabrication', players: 'Victory Giant, Unimicron, Shennan Circuits, WUS, TTM', position: 'Direct tooling customers', tone: 'client' },
        { level: 'AI-server / advanced HDI PCB', players: 'Same fabricators, higher layer counts', position: 'Growth — more drilling operations per high-layer board', tone: 'growth' },
        { level: 'Adjacent tooling (semiconductor, coating, film)', players: 'Diversification segments', position: 'Early-stage growth vector beyond PCB', tone: 'growth' },
      ],
      segments: [
        'PCB drill bits: global market share 26.5% in 2023, the company\'s largest and best-established product line',
        'Milling cutters, blades, grinding brushes and CNC tool grinders / tap thread grinders',
        'Functional film materials: privacy films, automotive light-control and explosion-proof films, DBEF/COP/AR films',
        'Q1 2025 revenue +27.2% YoY, net profit +78.5% YoY; gross margin 38.05% (+4.28pp YoY), net margin 17.04%',
        'TTM revenue ¥1.91B (+25.4% YoY); TTM net margin ~24.5%, ROE ~22.7%',
      ],
      aiShift:
        'AI-server boards carry more layers and denser microvias than prior-generation designs, which mechanically increases the number of drilling and tooling operations per board. Dtech captures this as a volume tailwind on its core tooling business regardless of which PCB fabricator ultimately wins Nvidia or hyperscaler content — a picks-and-shovels-behind-the-picks-and-shovels position.',
    },
    valuation: {
      peers: ['301377.SZ', '6278.T'],
      metrics: [
        { label: 'Price', values: ['¥548.70', '¥22,700'] },
        { label: 'Market cap', values: ['~¥243B', '~$1.6B'] },
        { label: 'Trailing P/E', values: ['~245x', 'n/a'] },
        { label: 'ROE', values: ['~22.7% (TTM)', 'n/a'] },
        { label: 'Net margin', values: ['~24.5% (TTM)', 'n/a'] },
        { label: 'Gross margin', values: ['38.05% (Q1 2025)', 'n/a'] },
        { label: 'Revenue growth', values: ['+25.4% (TTM)', 'AI-driven demand growth cited qualitatively'] },
      ],
      verdictTone: 'high',
      verdictPoints: [
        'A trailing P/E near 245x is among the richest multiples anywhere in this PCB-adjacent supply chain — it prices in years of continued AI-driven tooling demand',
        'Margin expansion is real (gross margin +4.3pp YoY, net profit +78.5% in Q1 2025) but nowhere close to closing a ~245x multiple on its own',
        '52-week price range (roughly ¥33 to ¥666, likely distorted by a mid-cycle share/capitalization event) signals this is a thin, highly volatile, recently-listed (2022 IPO) name — treat any single price point cautiously',
      ],
      justifiedIf: [
        'AI-server PCB layer counts keep rising, mechanically increasing drilling and tooling intensity per board',
        'Dtech holds or extends its 26.5%+ global PCB-drill-bit share against Japan\'s Union Tool and Mitsubishi Materials',
        'The functional-film and semiconductor/vacuum-coating tooling diversification scales into a credible second growth leg, justifying a platform multiple rather than a pure-play tooling multiple',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '¥350 – ¥420', rationale: 'Well below current levels, a meaningful discount to the recent trading range' },
        { tier: 'acceptable', range: '¥420 – ¥580', rationale: 'Current trading zone' },
        { tier: 'expensive', range: '>¥650', rationale: 'Near the reported 52-week/all-time high (~¥666)' },
      ],
      technical: [
        '52-week range approximately ¥33.21 – ¥666.00 — the low end likely reflects a pre-capitalization-event price and is not directly comparable to the current level',
        'Current price ¥548.70 sits roughly 18% below the reported high of ¥666.00',
        'Listed on Shenzhen\'s ChiNext board in 2022; short trading history amplifies data noise across aggregators',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'AI-PCB drilling intensity and margin expansion continue on trend — grinds toward ¥600-650.' },
        { label: 'BULL', prob: 20, note: 'Share gains plus successful diversification into semiconductor/film tooling re-rate the multiple — breaks to a new high.' },
        { label: 'BEAR', prob: 30, note: 'AI-capex digestion or margin pressure passed down from PCB fabricators to their tooling suppliers — retraces toward ¥350-400.' },
      ],
      horizon: '6-12 months',
      invalidation: 'Weekly close below ¥350',
    },
    risks: [
      { risk: 'Extreme valuation', severity: 'high', note: 'A ~245x trailing P/E leaves essentially no margin for a growth disappointment.' },
      { risk: 'AI capex cyclicality passthrough', severity: 'high', note: 'As a tooling supplier one step removed from the fabricators, Dtech inherits the same cyclicality with less end-market pricing power of its own.' },
      { risk: 'Customer concentration', severity: 'medium', note: 'Revenue is concentrated among a handful of large PCB fabricators (Victory Giant, Shennan, WUS, Unimicron) whose own capex/output decisions drive tool orders.' },
      { risk: 'Competitive pressure', severity: 'medium', note: 'Japan\'s Union Tool and Mitsubishi Materials compete at the high end of precision PCB tooling.' },
      { risk: 'Thin trading history / high volatility', severity: 'medium', note: '2022 ChiNext IPO; the unusually wide 52-week price range signals limited liquidity depth and data reliability relative to more established names.' },
      { risk: 'Diversification execution risk', severity: 'low', note: 'Functional film and semiconductor/vacuum-coating tooling segments are still early-stage relative to the core PCB drill-bit business.' },
    ],
    backlog: {
      visibility: [
        'Q1 2025 revenue +27.2% YoY, net profit +78.5% YoY',
        'Gross margin expansion of +4.28pp YoY in Q1 2025 signals pricing power in the core tooling business',
        'TTM revenue +25.4% YoY to ¥1.91B',
      ],
      wins: [
        'Global #1 market share in PCB drill bits, 26.5% as of 2023',
        'Diversification into semiconductor, smart-warehousing and vacuum-coating tooling markets',
        'Functional film unit (privacy, AR, automotive light-control films) adds a second, PCB-independent growth vector',
      ],
      clients: ['PCB fabricators broadly (Victory Giant, Shennan Circuits, WUS, Unimicron — inferred industry customers, not individually disclosed)'],
      suppliers: ['Tungsten carbide raw-material suppliers (not individually disclosed)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 4, note: 'Dominant niche position in a high-barrier precision-tooling market.' },
        { criterion: 'AI growth exposure', stars: 4, note: 'Indirect but structural — drilling intensity scales mechanically with PCB layer count.' },
        { criterion: 'Valuation', stars: 1, note: '~245x trailing P/E is extreme even relative to other AI-narrative names in this set.' },
        { criterion: 'Diversification', stars: 3, note: 'Film and semiconductor-tooling segments are promising but still early relative to the core business.' },
        { criterion: 'Risk', stars: 3, note: 'Thin trading history, high volatility, and customer concentration in PCB fabricators.' },
        { criterion: 'Entry timing', stars: 2, note: 'No clear valuation support at current levels — the multiple assumes years of flawless execution.' },
      ],
      readLabel: 'NICHE TOOLING LEADER — VALUATION FAR AHEAD OF FUNDAMENTALS',
      summary:
        'Dtech is a genuinely dominant player in an unglamorous but structurally necessary niche — someone has to drill the vias in every AI-server board, and Dtech holds more than a quarter of that global market. The margin trend (gross margin up 4+ points, net profit up nearly 80% in a single quarter) is real. What is much harder to justify is a ~245x trailing earnings multiple on a company whose growth, while strong, is still tethered to the capex decisions of a small number of PCB fabricators one step downstream. This reads as a name where the business case is sound and the price has run well ahead of it.',
    },
    sourceNote:
      'The company name specified in the original brief ("Guangdong Bingtai") does not correspond to ticker 301377.SZ — the correct company is Guangdong Dtech Technology Co., Ltd, a Dongguan-based PCB tooling and functional-film maker, and that name is used throughout this entry. Compiled from stockanalysis.com, Investing.com, TradingView, Yahoo Finance and Chinese-language financial press as of August 2026. This is a thinly-traded, recently-listed small-cap with unusually wide data dispersion across aggregators — cross-check current price and multiples before use.',
  },

  '600961.SS': {
    ticker: '600961.SS',
    name: 'Zhuzhou Smelter Group Co., Ltd',
    tagline: 'A China Minmetals-controlled lead-zinc smelter whose byproduct indium, germanium and bismuth sit inside China\'s 2025 strategic-minerals export-control regime — a rare-metals proxy, not a chipmaker.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Zhuzhou Smelter is not a semiconductor company. It is a base-metals (lead, zinc, copper) smelter, majority-linked to central state-owned China Minmetals Corporation, that recovers strategic byproduct metals — indium, germanium, bismuth, tellurium, cadmium, silver — during the smelting process. Its relevance to the semiconductor/materials chain runs entirely through those byproducts, several of which China placed under export license control in 2025.',
      rows: [
        { level: 'Concentrate feed', players: 'Own mines plus third-party suppliers', position: 'Upstream raw-material sourcing', tone: 'indirect' },
        { level: 'Smelting / refining', players: 'Zhuzhou Smelter Group and other Minmetals units', position: 'Core business — lead, zinc, copper, gold, silver', tone: 'core' },
        { level: 'Strategic byproduct metals', players: 'Indium, germanium, bismuth, tellurium, cadmium ingots', position: 'High-margin byproducts, now under Chinese export-license control (since Feb 2025)', tone: 'growth' },
        { level: 'Compound semiconductor / optical / display', players: 'ITO glass, InP precursor, and infrared-optics makers', position: 'Indirect end-use for indium/germanium output — not a direct customer relationship', tone: 'indirect' },
        { level: 'AI / datacenter hardware', players: 'n/a', position: 'No direct exposure — this is a raw-material chokepoint, not a device maker', tone: 'none' },
      ],
      segments: [
        'Lead and zinc ingots/alloys: the majority of revenue and volume',
        'Byproduct precious and strategic metals: silver, bismuth, tellurium, indium, cadmium — smaller volume, higher margin',
        '2024 full-year revenue ~RMB 19.76B (+1.8% YoY); Q1 2025 revenue RMB 4.80B (+8.5% YoY), net profit RMB 277M (+74.1% YoY)',
        'ROE ~23.1%, net margin ~5% — typical of a high-volume, thin-margin commodity smelter with a byproduct-metals kicker',
      ],
      aiShift:
        'Zhuzhou Smelter has no direct AI-hardware product. Its "AI-adjacent" story runs entirely through indium (an input to ITO display glass and indium-phosphide/compound-semiconductor precursor chemistry) and germanium (used in infrared optics and some fiber-optic and specialty-semiconductor applications) being swept into China\'s February 2025 export-control list alongside tungsten, tellurium, bismuth and molybdenum. This is a geopolitical scarcity/pricing-power story, not a demand-growth story tied to AI capex.',
    },
    valuation: {
      peers: ['600961.SS', '000657.SZ'],
      metrics: [
        { label: 'Price', values: ['¥16.23', '¥55.51'] },
        { label: 'Market cap', values: ['~¥16.7B', '~¥132-170B (noisy)'] },
        { label: 'Trailing P/E', values: ['~15.7x', '~79.9x'] },
        { label: 'ROE', values: ['~23.1%', 'n/a'] },
        { label: 'Net margin', values: ['~5%', 'n/a'] },
        { label: 'Revenue growth (FY2024)', values: ['+1.8%', 'n/a'] },
        { label: '52-week range', values: ['~¥7.7 - ¥27.5 (sources vary)', '¥12.32 - ¥113.99'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'A trailing P/E near 15.7x is a conventional commodity-smelter multiple — the market has not (yet) extended Zhuzhou Smelter the same "critical minerals" valuation premium it has given peer China Tungsten Hi-Tech (~80x), another Minmetals-group strategic-metals unit',
        'ROE of ~23% against a thin ~5% net margin is typical smelter economics (high volume/turnover, low margin) rather than a materials-technology profile',
        'The stock is up roughly 100% over the trailing year purely on the China critical-minerals/export-control narrative, despite flat (+1.8%) underlying revenue growth in FY2024',
      ],
      justifiedIf: [
        'China\'s export controls on indium, germanium, bismuth and tellurium tighten further (a partial suspension was already in effect Nov 2025 through Nov 2026), pushing byproduct-metal price premiums higher',
        'Base-metal (lead/zinc) prices stay firm, supporting the core smelting business that generates the bulk of revenue',
        'A Minmetals-group asset injection or restructuring formally carves out and re-rates the strategic-metals byproduct business',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '¥10 – ¥12', rationale: 'Near the lower end of the reported 52-week range' },
        { tier: 'acceptable', range: '¥12 – ¥18', rationale: 'Current trading zone' },
        { tier: 'expensive', range: '>¥24', rationale: 'Near the reported 52-week high (~¥27.5)' },
      ],
      technical: [
        '52-week range approximately ¥7.66 – ¥27.48 (figures vary meaningfully by source; treat as approximate)',
        'Current price ¥16.23, roughly double the trailing-year low',
        'Price action tracks the China critical-minerals/export-control news cycle more closely than company-specific fundamentals',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'Base-metal prices and byproduct-metal premiums hold near current levels — grinds toward ¥18-22.' },
        { label: 'BULL', prob: 25, note: 'Further tightening of export controls on indium/germanium/bismuth, or a Minmetals-group strategic-metals asset injection, re-rates the stock toward its ~¥27 high.' },
        { label: 'BEAR', prob: 25, note: 'A lead/zinc price correction, or further easing of export controls (as partially occurred in the Nov 2025-Nov 2026 window) removing the scarcity premium — retraces toward ¥10-12.' },
      ],
      horizon: '12 months',
      invalidation: 'Weekly close below ¥10',
    },
    risks: [
      { risk: 'Commodity-price cyclicality', severity: 'high', note: 'The core business remains a lead/zinc/base-metals smelter; earnings are exposed to global base-metal price cycles independent of any strategic-minerals narrative.' },
      { risk: 'Export-control policy reversal', severity: 'medium', note: 'China already suspended some October 2025 export-control announcements from November 2025 through November 2026 — a reminder that the scarcity premium behind this stock\'s re-rating is a policy variable, not a fixed structural moat.' },
      { risk: 'Thin net margins', severity: 'medium', note: 'A ~5% net margin leaves little buffer against input-cost or metal-price swings.' },
      { risk: 'Limited byproduct-segment disclosure', severity: 'medium', note: 'Indium/germanium/bismuth revenue and profitability are not broken out with enough granularity to independently size the "strategic metals" thesis.' },
      { risk: 'Weak fit to a semiconductor-materials thesis', severity: 'medium', note: 'This is fundamentally a base-metals smelter with byproduct exposure to compound-semiconductor and display-adjacent metals — investors expecting a direct semiconductor-materials pure play will be looking at the wrong company.' },
      { risk: 'SOE governance / capital allocation', severity: 'low', note: 'As a China Minmetals-controlled state enterprise, capital-allocation decisions may prioritize group-level strategic objectives over minority-shareholder returns.' },
    ],
    backlog: {
      visibility: [
        'FY2024 revenue ~RMB 19.76B (+1.8% YoY)',
        'Q1 2025 revenue RMB 4.80B (+8.5% YoY), net profit +74.1% YoY',
        'Indium, germanium, bismuth and tellurium items placed under Chinese export-license control since February 2025, with the regime still substantially intact as of August 2026',
      ],
      wins: [
        'Comprehensive byproduct-metal recovery across copper, lead, zinc, gold, silver, bismuth, cadmium, indium and germanium — a rare vertically-integrated platform within the Minmetals group',
        'One of eight publicly-listed China Minmetals Corporation subsidiaries, alongside China Tungsten Hi-Tech (000657.SZ) and Minmetals Capital (600390.SS)',
      ],
      clients: ['Not individually disclosed — sells into domestic and export base- and strategic-metals markets'],
      suppliers: ['Own mining operations plus undisclosed third-party concentrate suppliers'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 3, note: 'A solid, high-volume commodity smelter with thin margins and a strategic-metals kicker.' },
        { criterion: 'Semiconductor/AI exposure', stars: 2, note: 'Indirect and thin — byproduct-metal exposure only, with no direct semiconductor product or customer relationship.' },
        { criterion: 'Valuation', stars: 4, note: '~15.7x trailing P/E is undemanding relative to the "critical minerals" narrative already priced into peer names.' },
        { criterion: 'Strategic-scarcity optionality', stars: 4, note: 'Indium/germanium/bismuth export controls create real, if policy-dependent, asymmetric upside.' },
        { criterion: 'Risk', stars: 3, note: 'Commodity cyclicality and export-control policy reversal risk cut in both directions.' },
        { criterion: 'Entry timing', stars: 3, note: 'No clear near-term catalyst beyond commodity-price and export-policy news flow.' },
      ],
      readLabel: 'RARE-METALS SMELTER, NOT A SEMICONDUCTOR MATERIALS PURE PLAY',
      summary:
        'Zhuzhou Smelter is best understood as a China critical-minerals/export-control theme stock that happens to sit inside the semiconductor and display supply chain through its indium and germanium byproducts — not as a direct semiconductor-materials company in the way Elite Material or Guangdong Dtech are. The valuation (a conventional smelter multiple, not an AI-mania multiple) reflects that the market largely agrees: this is priced as a metals company with strategic optionality, not as a growth story. Anyone approaching this ticker expecting a rare-earth-magnets-style direct semiconductor play should recalibrate expectations before sizing a position.',
    },
    sourceNote:
      'IMPORTANT: this ticker does not correspond to "China Minmetals Corporation" itself — Minmetals is an unlisted central state-owned parent. 600961.SS is Zhuzhou Smelter Group Co., Ltd, one of Minmetals\' eight publicly-listed subsidiaries, and a base-metals smelter rather than a rare-earth or semiconductor-materials pure play; that distinction is reflected throughout this entry. Compiled from Yahoo Finance, Investing.com, Bloomberg, Moomoo, Simply Wall St and Chinese regulatory/trade-press sources (Global Trade Alert, SMM, IEA policy tracker) as of August 2026. Financial figures for this name are sparser and noisier than the other five tickers in this set — treat all metrics here as directional and verify against a live terminal before use.',
  },

  '3037.TW': {
    ticker: '3037.TW',
    name: 'Unimicron Technology Corp',
    tagline: 'Taiwan\'s #1 ABF/IC-substrate and PCB maker — the substrate layer under every advanced-packaged AI GPU and ASIC, sold out into a supply-demand gap through 2028.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Unimicron sits directly between silicon and the finished AI-accelerator package: its ABF (Ajinomoto Build-up Film) substrates are the physical carrier that GPU and ASIC dies are mounted on before advanced packaging (CoWoS and equivalents). It also retains a large legacy HDI/PCB/FPC business.',
      rows: [
        { level: 'ABF resin / copper foil', players: 'Ajinomoto, copper-foil suppliers', position: 'Upstream input supplier', tone: 'indirect' },
        { level: 'IC substrate (ABF/BT)', players: 'Unimicron, Kinsus, Nan Ya PCB, Ibiden, Shinko', position: 'Core business — Taiwan\'s largest ABF substrate maker', tone: 'core' },
        { level: 'HDI PCB / FPC', players: 'Unimicron, TTM Technologies, Compeq', position: 'Legacy core business', tone: 'core' },
        { level: 'Advanced packaging (CoWoS/EFB)', players: 'TSMC, ASE, AMD', position: 'Direct downstream customer — substrate feeds packaging lines', tone: 'client' },
        { level: 'Fabless GPU / ASIC design', players: 'Nvidia, AMD, Broadcom, custom ASIC programs', position: 'End-silicon driving substrate specification and demand', tone: 'indirect' },
      ],
      segments: [
        '2025 revenue NT$131.24B (+13.75% YoY); net profit NT$6.67B (+31.3% YoY)',
        'December 2025 monthly net profit +2,770% YoY — the clearest sign the ABF earnings cycle has inflected',
        'Q1 2026 comprehensive income NT$6.56B vs NT$1.72B in Q1 2025',
        'Gross margin 18.0% (vs 13.4% a year earlier); operating margin ~7% (vs ~4% a year earlier)',
        'ABF substrate reported "sold out" through 2026 amid AI-chip demand; AMD opening an embedded-bridge (EFB) demand front beyond CoWoS',
      ],
      aiShift:
        'The ABF substrate supply-demand gap is guided by industry analysts to widen sharply, reaching as high as 29% by 2027-2028, as AI GPU and custom-ASIC die sizes grow and warping/thermal-stress issues push substrate complexity higher. Morgan Stanley projects a roughly 105% EPS CAGR for Unimicron from 2025 to 2028 on this dynamic — one of the more aggressive structural growth calls anywhere in the AI hardware supply chain.',
    },
    valuation: {
      peers: ['3037.TW', '3189.TW', '8046.TW'],
      metrics: [
        { label: 'Price', values: ['NT$969', 'n/a', 'NT$920'] },
        { label: 'Market cap', values: ['NT$1.52T', 'n/a', '~NT$540-914B (noisy)'] },
        { label: 'Trailing P/E', values: ['~103x (low-base artifact)', 'n/a', '~300x (low-base artifact)'] },
        { label: 'Forward P/E', values: ['~27.9x', 'n/a', 'n/a'] },
        { label: 'Gross margin', values: ['18.0%', 'n/a', 'n/a'] },
        { label: 'ROE (trailing)', values: ['~3.75%', 'n/a', 'n/a'] },
        { label: 'Revenue growth (FY2025)', values: ['+13.75%', '+28.87%', '+24.44%'] },
        { label: 'Beta', values: ['~2.49', 'n/a', 'n/a'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'A trailing P/E near 103x is a statistical artifact of a very low prior-year earnings base as the ABF cycle just inflected — the forward P/E of roughly 27.9x is the more meaningful read against a guided ~105% 2025-2028E EPS CAGR',
        'Nan Ya PCB shows the same low-base distortion (a reported ~300x trailing P/E) across the whole Taiwan ABF-substrate group — none of the three majors should be judged on trailing multiples alone right now',
        'EV/EBITDA near 66.7x looks rich on trailing figures but should compress quickly if the guided earnings ramp lands as analysts expect',
      ],
      justifiedIf: [
        'The ABF supply-demand gap (guided to reach ~29% by 2027-2028) holds and Unimicron defends its #1 Taiwan ABF-substrate share',
        'AI GPU/ASIC unit growth continues at the pace assumed for the ~105% 2025-2028E EPS CAGR consensus',
        'No destocking or demand-digestion air pocket interrupts the ramp between now and 2028',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: 'NT$650 – NT$750', rationale: 'Below current levels, closer to 2025 congestion zones' },
        { tier: 'acceptable', range: 'NT$750 – NT$1,050', rationale: 'Current trading zone' },
        { tier: 'expensive', range: '>NT$1,200', rationale: 'Near the analyst consensus target and the top of the 52-week range' },
      ],
      technical: [
        '52-week range NT$128.18 – NT$1,130.00 — the low end reflects the pre-ABF-cycle trough and is not representative of current fundamentals',
        'Current price NT$969 sits roughly 14% below the 52-week high',
        'Analyst consensus (17 analysts, 0 sells, "Strong Buy") targets NT$1,241, roughly 28% above spot; high estimate NT$1,700',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'The ABF supply gap persists and the guided earnings ramp lands — grinds toward the NT$1,100-1,250 consensus range over 12-18 months.' },
        { label: 'BULL', prob: 25, note: 'AMD/custom-ASIC demand broadens beyond CoWoS (EFB), the supply gap widens further than guided — breaks above NT$1,300.' },
        { label: 'BEAR', prob: 25, note: 'AI-capex digestion, or a major customer\'s design change/dual-sourcing shift, interrupts the "sold out" narrative — retraces toward NT$650-750.' },
      ],
      horizon: '12-18 months',
      invalidation: 'Weekly close below NT$650',
    },
    risks: [
      { risk: 'Demand digestion after a violent re-rating', severity: 'high', note: 'The stock and earnings base have both moved extremely fast in 2025-2026; any pause in the AI-capex cycle would hit a name pricing in near-continuous acceleration.' },
      { risk: 'Beta / absolute volatility', severity: 'high', note: 'A beta near 2.49 means Unimicron amplifies both broad AI-capex optimism and any market-wide correction.' },
      { risk: 'Customer/program concentration', severity: 'medium', note: 'Substrate demand is concentrated in a relatively small number of high-profile AI GPU/ASIC programs; a design change at any one customer is a real swing factor.' },
      { risk: 'Trailing/forward multiple dispersion', severity: 'medium', note: 'The gap between a ~103x trailing P/E and a ~28x forward P/E leaves room for narrative disappointment if the earnings ramp is even modestly delayed.' },
      { risk: 'Competitive capacity additions', severity: 'medium', note: 'Kinsus, Nan Ya PCB, Japan\'s Ibiden and Korea\'s Shinko are all expanding ABF capacity, which could erode the current supply-gap premium over a multi-year horizon.' },
      { risk: 'Currency and geopolitical exposure', severity: 'low', note: 'NT dollar strength and Taiwan-China cross-strait tension are standing tail risks for any Taiwan-listed hardware name.' },
    ],
    backlog: {
      visibility: [
        'ABF substrate reported "sold out" through 2026 per industry trade press (Digitimes)',
        'Supply-demand gap for ABF substrate guided to reach as high as 29% by 2027-2028',
        'Morgan Stanley projects a ~105% EPS CAGR for Unimicron over 2025-2028E',
        'December 2025 net profit +2,770% YoY is the clearest evidence the earnings inflection is already showing up in reported results',
      ],
      wins: [
        '#1 Taiwan ABF/IC-substrate maker by scale',
        'AMD opening an embedded fan-out bridge (EFB) demand channel beyond CoWoS adds a second AI-substrate growth vector',
        'Across-the-board foreign-broker target-price upgrades through 2026 (alongside Kinsus and Nan Ya PCB)',
      ],
      clients: ['Nvidia (indirect, via substrate supply into advanced packaging)', 'AMD', 'TSMC / advanced-packaging customers'],
      suppliers: ['Ajinomoto (ABF resin)', 'Copper-foil suppliers (not individually disclosed)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 4, note: '#1 scale in a supply-constrained, high-barrier ABF-substrate market.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Direct structural beneficiary of the ABF substrate supply gap guided through 2028.' },
        { criterion: 'Valuation', stars: 3, note: 'Trailing multiple is a distorted artifact; forward multiple (~28x) against >100% guided EPS growth is more defensible but not cheap.' },
        { criterion: 'Profitability trend', stars: 3, note: 'Margins are recovering fast (ROE still just 3.75% trailing) but not yet fully re-based.' },
        { criterion: 'Risk', stars: 3, note: 'Beta ~2.49 and high absolute volatility cut both ways.' },
        { criterion: 'Momentum', stars: 5, note: 'December 2025 net profit +2,770% YoY; Q1 2026 comprehensive income roughly quadrupled YoY.' },
        { criterion: 'Entry timing', stars: 3, note: 'Only ~14% below the 52-week high with a unanimous analyst Buy consensus already reflecting the good news.' },
      ],
      readLabel: 'STRUCTURAL ABF-SUBSTRATE BENEFICIARY — EARNINGS INFLECTION ALREADY VISIBLE',
      summary:
        'Unimicron is arguably the cleanest way to buy the AI-GPU advanced-packaging substrate bottleneck: the supply-demand gap is real and industry-guided to widen through 2028, and the earnings inflection (December 2025\'s +2,770% YoY monthly net profit) is not a forecast, it is already in the reported numbers. The catch is that the market has largely caught up to this story — the stock trades close to its 52-week high with a unanimous analyst Buy rating, and the trailing P/E, while distorted by a low base, still leaves a wide gap to the more sober forward multiple. This reads as a structurally sound holding in a genuinely scarce niche, priced for the good news that has already started arriving.',
    },
    sourceNote:
      'Compiled from stockanalysis.com, Investing.com, Yahoo Finance, Digitimes and Morgan Stanley-sourced analyst commentary as of August 2026. This is a research framework, not a live feed — cross-check current prices, multiples and guidance before acting on anything here.',
  },

  '2383.TW': {
    ticker: '2383.TW',
    name: 'Elite Material Co., Ltd',
    tagline: 'Taiwan\'s leading copper-clad-laminate maker — the low-loss base material every AI-server board and 800G/1.6T switch is built on, at a valuation that assumes years of flawless execution.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Elite Material Co (EMC) makes copper-clad laminate (CCL) and prepreg — the resin-and-copper base material that PCB fabricators etch into finished boards. It sits one processing step upstream of the PCB itself, and its low-loss/ultra-low-loss grades are the qualified material for the highest-speed AI-server and networking-switch boards.',
      rows: [
        { level: 'Resin, glass fiber, copper foil', players: 'Specialty-chemical and copper-foil suppliers', position: 'Upstream input supplier', tone: 'indirect' },
        { level: 'Copper-clad laminate / prepreg', players: 'EMC, Taiwan Union Technology (TUC), Iteq, Shengyi Technology', position: 'Core business — Taiwan\'s leading low-loss CCL maker', tone: 'core' },
        { level: 'PCB fabrication', players: 'Unimicron, Victory Giant, TTM, Shennan Circuits', position: 'Direct customers etching EMC laminate into finished boards', tone: 'client' },
        { level: 'AI server / networking switch (800G, 1.6T)', players: 'Nvidia-, Broadcom-class AI server and switch platforms', position: 'Fastest-growing end market — pulls low-loss/ultra-low-loss demand', tone: 'growth' },
        { level: 'Advanced-packaging ABF substrate', players: 'Unimicron, Kinsus, Nan Ya PCB', position: 'Adjacent but distinct resin chemistry — limited direct overlap', tone: 'indirect' },
      ],
      segments: [
        '2025 revenue NT$94.26B (+46.4% YoY); net profit NT$14.65B (+52.9% YoY)',
        'Gross margin 29.6%, operating margin 20.5%, net margin 15.6%',
        'Low-loss and ultra-low-loss CCL for AI server/switch boards is the fastest-growing, highest-margin product tier',
        'ROE 40.7%, among the highest in the Taiwan electronics-materials sector',
      ],
      aiShift:
        'AI-server and 800G-to-1.6T networking-switch boards require low-loss, tightly-controlled Df/Dk copper-clad laminate to handle high-speed PCIe and optical-interconnect signaling without excessive signal degradation. EMC\'s low-loss and ultra-low-loss laminate grades are qualified onto Nvidia/Broadcom-class AI server and switch programs, making the company a direct beneficiary of the industry-wide shift from 400G/800G toward 1.6T switching.',
    },
    valuation: {
      peers: ['2383.TW', '6274.TWO', '6213.TW'],
      metrics: [
        { label: 'Price', values: ['NT$5,250', 'NT$1,340', 'NT$286'] },
        { label: 'Market cap', values: ['NT$1.89T', 'NT$386.96B', '~NT$68-104B (noisy)'] },
        { label: 'Trailing P/E', values: ['~110.2x', 'n/a', '~37.2x'] },
        { label: 'Forward P/E', values: ['~47.1x', 'n/a', 'n/a'] },
        { label: 'Gross margin', values: ['29.6%', 'n/a', 'n/a'] },
        { label: 'Operating margin', values: ['20.5%', 'n/a', 'n/a'] },
        { label: 'ROE', values: ['40.7%', 'n/a', 'n/a'] },
        { label: 'Revenue growth (FY2025)', values: ['+46.4%', 'n/a', 'n/a'] },
      ],
      verdictTone: 'high',
      verdictPoints: [
        'A trailing P/E of ~110x, moderating to ~47x forward, is still rich even measured against a 40.7% ROE and 15.6% net margin',
        'The stock is up roughly 543% over the trailing 52 weeks — one of the strongest re-ratings anywhere in the Taiwan AI-hardware supply chain',
        'Analyst book-value projections imply P/B compression from ~43x (2025) to ~26x (2026) and ~15x (2027) purely on earnings retention — the multiple is pricing several more years of continued hypergrowth, not a one-off cycle',
      ],
      justifiedIf: [
        'AI-server and 800G/1.6T switch build-outs keep pulling low-loss CCL demand faster than TUC, Iteq and Shengyi can add qualified capacity',
        'EMC holds or extends share specifically in the highest-margin ultra-low-loss tier rather than losing it to lower-cost competitors as the category matures',
        'No AI-hardware destocking cycle interrupts CCL demand through 2027',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: 'NT$3,000 – NT$3,800', rationale: 'Well below the ATH, closer to a 2025 base' },
        { tier: 'acceptable', range: 'NT$3,800 – NT$5,500', rationale: 'Current trading zone' },
        { tier: 'expensive', range: '>NT$6,000', rationale: 'Near the all-time high (NT$6,250, July 2026)' },
      ],
      technical: [
        '52-week range NT$1,075 – NT$6,250; all-time high NT$6,250 reached July 6, 2026',
        'Current price NT$5,250 sits roughly 16% below the ATH',
        'Analyst consensus (14 buys, 0 sells, "Strong Buy") targets NT$7,123, roughly 36% above spot',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'Low-loss CCL demand keeps outrunning qualified supply — grinds back toward the NT$6,000-7,100 consensus range.' },
        { label: 'BULL', prob: 20, note: 'The 800G-to-1.6T switch transition accelerates faster than guided — breaks to new highs above NT$7,100.' },
        { label: 'BEAR', prob: 30, note: 'AI-capex digestion, or TUC/Iteq/Shengyi capacity catch-up compressing the ultra-low-loss margin premium — retraces toward NT$3,000-3,500.' },
      ],
      horizon: '12 months',
      invalidation: 'Weekly close below NT$3,000',
    },
    risks: [
      { risk: 'Valuation', severity: 'high', note: 'A ~110x trailing / ~47x forward P/E leaves very limited room for a growth miss.' },
      { risk: 'AI capex cyclicality', severity: 'high', note: 'Demand is tightly coupled to hyperscaler and AI-accelerator capex cycles, which can pause or digest sharply.' },
      { risk: 'Product/margin-tier concentration', severity: 'medium', note: 'A disproportionate share of the growth and margin story sits in the highest-margin ultra-low-loss tier, which is also the tier most exposed to a competitive catch-up.' },
      { risk: 'Competitive capacity additions', severity: 'medium', note: 'Taiwan Union Technology, Iteq, Shengyi Technology and Panasonic are all expanding low-loss CCL capacity to capture the same AI-server upgrade cycle.' },
      { risk: 'Input-cost volatility', severity: 'low', note: 'Copper and specialty-resin price swings can compress margins independent of demand strength.' },
      { risk: 'Currency and geopolitical exposure', severity: 'low', note: 'NT dollar strength and Taiwan-China cross-strait tension are standing tail risks for any Taiwan-listed hardware-materials name.' },
    ],
    backlog: {
      visibility: [
        '2025 revenue +46.4% YoY, net profit +52.9% YoY',
        'Analyst consensus 12-month target NT$7,123, +36% from spot, based on 14 buy-rated analysts and 0 sells',
        'Book value per share guided by analysts to build from NT$140.81 (2025) toward NT$401.53 (2027E), implying substantial P/B compression on earnings retention alone',
      ],
      wins: [
        'Leading low-loss/ultra-low-loss CCL qualified across AI server and 800G/1.6T switch platforms',
        'One of Taiwan\'s three major CCL makers (alongside TUC and Iteq) capturing the AI-driven material-upgrade cycle',
      ],
      clients: ['PCB and substrate fabricators supplying Nvidia/Broadcom-class AI server and switch programs (not individually disclosed)'],
      suppliers: ['Copper-foil and specialty-resin suppliers (not individually disclosed)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 5, note: 'Market-leading, high-margin CCL franchise at the center of the AI-server material-upgrade cycle.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Direct structural beneficiary of the shift to low-loss CCL for AI servers and 800G/1.6T switches.' },
        { criterion: 'Valuation', stars: 2, note: '~110x trailing / ~47x forward P/E is priced for near-perfect multi-year execution.' },
        { criterion: 'Profitability', stars: 5, note: 'ROE 40.7% and net margin 15.6% are both best-in-class for the sector.' },
        { criterion: 'Risk', stars: 3, note: 'High beta, an extreme trailing-52-week run, and thin margin of safety at current levels.' },
        { criterion: 'Entry timing', stars: 2, note: 'Only ~16% off the all-time high with a unanimous Strong Buy consensus already reflected in the price.' },
      ],
      readLabel: 'BEST-IN-CLASS CCL FRANCHISE — VALUATION LEAVES NO MARGIN FOR ERROR',
      summary:
        'Elite Material is genuinely the highest-quality name of the six covered here on pure business-quality metrics — a 40%+ ROE, best-in-sector margins, and a direct, qualified position in the specific low-loss CCL grades AI-server and next-generation switch platforms require. The problem is that the market has already recognized all of this: the stock is up more than 500% over the trailing year, sits close to its all-time high, and trades at a multiple that assumes the growth and margin trajectory holds essentially without interruption through 2027. This is a name to understand deeply and watch closely for a real drawdown rather than one to chase at the current multiple.',
    },
    sourceNote:
      'Compiled from stockanalysis.com, Investing.com, GuruFocus, MarketCapOf and Yahoo Finance as of August 2026. Forward book-value-per-share and P/B compression figures are analyst projections, not reported GAAP results — treat them as directional. This is a research framework, not a live feed — cross-check current prices, multiples and guidance before acting on anything here.',
  },

  'TPRO.MI': {
    ticker: 'TPRO.MI',
    name: 'Technoprobe S.p.A.',
    tagline: 'Italy\'s probe-card champion — the #2 global player behind FormFactor in wafer testing, now winning share on TSMC\'s 2nm node.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Technoprobe makes probe cards — the precision interface used to electrically test a wafer\'s individual dies before dicing and packaging. It sits at the wafer-test step, downstream of fabrication and upstream of advanced packaging and final test, and is the clearest European pure-play on AI/HPC chip-testing intensity.',
      rows: [
        { level: 'Wafer fabrication', players: 'TSMC, Samsung, Intel', position: 'Their fab output is what gets tested — an indirect relationship', tone: 'client' },
        { level: 'Probe cards / wafer test', players: 'Technoprobe (~16% share), FormFactor (~22% share), MJC, JEM, MPI', position: 'Core business — #2 global probe-card maker, gaining share on leading-edge nodes', tone: 'core' },
        { level: 'Advanced packaging / final test', players: 'ASE, Amkor', position: 'Downstream of the wafer-test step Technoprobe serves', tone: 'indirect' },
        { level: 'Fabless GPU / ASIC design', players: 'Nvidia, AMD, Broadcom, Apple', position: 'End-silicon that must be wafer-tested before shipping', tone: 'client' },
        { level: 'AI / HPC datacenter', players: 'Hyperscalers', position: 'End-market demand pull — ~58% of global probe-card demand is now AI/GPU/HPC-driven', tone: 'growth' },
      ],
      segments: [
        'FY2025 revenue EUR 628.4M (+15.7% YoY); EBITDA EUR 201.4M (32.1% margin); net profit EUR 98.8M (+57.4% YoY)',
        'Q1 2026 revenue EUR 187.0M (+19.0% YoY, +15.6% QoQ); gross margin 48.7%; EBITDA margin 37.0%',
        'FY2026 guidance raised to EUR 950M-1,050M revenue with a 44-46% EBITDA margin',
        'Won roughly 30% of TSMC\'s 2nm qualification volume, eroding FormFactor\'s historical leading-edge lead',
        'Opened an EUR 80M Dresden, Germany facility in September 2025 to expand European capacity',
      ],
      aiShift:
        'AI and HPC chip testing is more complex than legacy digital-logic testing — more I/O pins, higher signal speeds, and HBM-stacked memory all raise probe-card dollar content per wafer. Roughly 58% of global probe-card demand is now AI/GPU/HPC-driven, and Technoprobe\'s fully integrated MEMS-tip production gave it the technical edge to win a meaningful share of TSMC\'s 2nm qualification volume — directly at FormFactor\'s expense.',
    },
    valuation: {
      peers: ['TPRO.MI', 'FORM'],
      metrics: [
        { label: 'Price', values: ['EUR 29.52', '$117.53'] },
        { label: 'Market cap', values: ['~EUR 17-18B (~$25-26B, noisy)', '~$8.0B'] },
        { label: 'Trailing P/E', values: ['~120-220x (widely dispersed across sources)', '~148-179x (widely dispersed across sources)'] },
        { label: 'P/S', values: ['~26.6x', 'n/a'] },
        { label: 'EBITDA margin', values: ['32.1% (FY2025)', 'n/a'] },
        { label: 'Revenue growth', values: ['+15.7% (FY2025); guided +51-67% (FY2026E)', '+18.5% (guided FY2026)'] },
        { label: 'Dividend yield', values: ['None paid', 'n/a'] },
      ],
      verdictTone: 'high',
      verdictPoints: [
        'A trailing P/E cited anywhere from roughly 120x to 220x depending on source and date reflects a stock pricing in the raised FY2026 guidance (EUR 950M-1,050M revenue, up 51-67% YoY) well ahead of realized trailing earnings',
        'A P/S near 26.6x is a steep premium to FormFactor despite FormFactor still holding the larger overall probe-card market share (22% vs 16%)',
        'The stock repeatedly made fresh 52-week highs through H1 2026 on the raised guidance and 2nm share-gain narrative, leaving very little room for a guidance miss to be absorbed gracefully',
      ],
      justifiedIf: [
        'FY2026 guidance (EUR 950M-1,050M revenue, 44-46% EBITDA margin) is met or beaten as AI/HPC wafer-test demand continues to scale',
        'The ~30% TSMC 2nm qualification share gain proves durable across multiple design cycles rather than a one-off win',
        'The Dresden facility ramps on schedule, expanding capacity to serve European and North American customers without execution slippage',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: 'EUR 15 – EUR 20', rationale: 'Well below the current range, closer to a 2025 base' },
        { tier: 'acceptable', range: 'EUR 20 – EUR 32', rationale: 'Current trading zone' },
        { tier: 'expensive', range: '>EUR 38', rationale: 'Near the 52-week high' },
      ],
      technical: [
        '52-week range EUR 5.92 – EUR 38.58',
        'Stock made repeated fresh 52-week highs through H1 2026 on the raised guidance and 2nm share-gain narrative',
        'Analyst consensus (7 analysts, 0 sells, "Strong Buy") targets EUR 39.00, roughly 32% above spot; high estimate EUR 45.00',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'FY2026 guidance (EUR 950M-1,050M revenue, 44-46% EBITDA margin) is met — grinds toward the EUR 39 consensus target.' },
        { label: 'BULL', prob: 20, note: '2nm share gains continue and the Dresden facility ramps ahead of schedule — breaks to new highs above EUR 40.' },
        { label: 'BEAR', prob: 30, note: 'AI/HPC test-capex digestion or a guidance cut re-rates the multiple down sharply — retraces toward EUR 18-22.' },
      ],
      horizon: '12 months',
      invalidation: 'Weekly close below EUR 18',
    },
    risks: [
      { risk: 'Valuation', severity: 'high', note: 'A trailing P/E in the 120-220x range and a ~27x P/S leave extremely limited room for a miss against already-raised FY2026 guidance.' },
      { risk: 'AI/HPC end-market concentration', severity: 'high', note: 'Roughly 58% of global probe-card demand is now AI/GPU/HPC-driven — a concentration that cuts both ways as capex cycles turn.' },
      { risk: 'FormFactor competitive response', severity: 'medium', note: 'FormFactor acquired a California MEMS firm for $120M in October 2025, a direct response to Technoprobe\'s vertically-integrated MEMS-tip advantage.' },
      { risk: 'Semiconductor test-capex cyclicality', severity: 'medium', note: 'Automotive and industrial end-markets, historically a meaningful share of probe-card demand, are only partway through a cyclical recovery.' },
      { risk: 'Execution risk on capacity expansion', severity: 'low', note: 'The new Dresden facility and continued qualification wins both carry ordinary ramp and yield-execution risk.' },
      { risk: 'Currency and listing-liquidity', severity: 'low', note: 'EUR-denominated, Milan-listed shares carry currency exposure and somewhat thinner liquidity than US-listed semiconductor-equipment peers.' },
      { risk: 'Geopolitical/export exposure', severity: 'medium', note: 'A majority of revenue is Asia-derived (per company disclosure), leaving exposure to any future US/EU-China semiconductor export-control escalation.' },
    ],
    backlog: {
      visibility: [
        'FY2026 guidance raised to EUR 950M-1,050M revenue (44-46% EBITDA margin) after a Q1 2026 beat',
        'Q2 2026 guided at EUR 266M ± 3% revenue, 55% ± 200bps gross margin, 45% ± 200bps EBITDA margin',
      ],
      wins: [
        'Won roughly 30% of TSMC\'s 2nm qualification volume, denting FormFactor\'s historical leading-edge share lead',
        'EUR 80M Dresden, Germany facility opened September 2025 to expand European manufacturing capacity',
        'Fully integrated MEMS-tip production is the specific technical edge behind the 2nm qualification win',
      ],
      clients: ['TSMC and other leading-edge foundries/fabless customers testing AI/HPC/GPU silicon (not individually disclosed)'],
      suppliers: ['Vertically integrated MEMS-tip production reduces reliance on external tooling suppliers (not individually disclosed)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 5, note: '#2 global probe-card maker with vertically-integrated MEMS-tip technology, actively taking share at the leading edge.' },
        { criterion: 'AI growth exposure', stars: 5, note: '~58% of demand is AI/GPU/HPC-driven — a direct beneficiary of rising wafer-test complexity.' },
        { criterion: 'Valuation', stars: 1, note: 'Among the richest multiples anywhere in the semiconductor-equipment supply chain covered in this set.' },
        { criterion: 'Profitability', stars: 4, note: 'EBITDA margin 32-37% and rising per FY2026 guidance.' },
        { criterion: 'Risk', stars: 3, note: 'High end-market concentration in AI/HPC and a direct competitive response already underway from FormFactor.' },
        { criterion: 'Momentum', stars: 5, note: 'Q1 2026 EBITDA +44.2% YoY, guidance raised, repeated fresh 52-week highs through H1 2026.' },
        { criterion: 'Entry timing', stars: 2, note: 'Trading near highs with a unanimous Strong Buy consensus already reflecting the good news.' },
      ],
      readLabel: 'TECHNICAL LEADER, PRICED FOR A FLAWLESS FY2026',
      summary:
        'Technoprobe is a genuine technology leader taking real share from FormFactor at the leading edge (TSMC 2nm), with guidance, margins and momentum all pointing the same direction. The issue is that essentially all of this good news is already reflected in a valuation that sits at the extreme end of the entire semiconductor-equipment supply chain — a P/S multiple well above FormFactor\'s despite FormFactor still holding the larger overall market share. This is a name whose execution has earned the premium so far, but whose price leaves almost no room for the FY2026 guidance to land even slightly short.',
    },
    sourceNote:
      'Compiled from Technoprobe\'s FY2025 and Q1 2026 press releases, stockanalysis.com, multiples.vc, companiesmarketcap.com and Yahoo Finance as of August 2026. Valuation multiples for this name were unusually dispersed across aggregators (trailing P/E cited from roughly 120x to 220x depending on source and date) — treat as directional given the stock\'s rapid re-rating in H1 2026, and cross-check current levels before use.',
  },
}
