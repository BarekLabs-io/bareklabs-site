import type { Company } from './companies'

/* Batch: MU (Micron Technology), ANET (Arista Networks), SMCI (Super Micro Computer).
 * Standalone file — merge into companies.ts separately to avoid edit conflicts
 * with other in-flight batches. Same conventions as companies.ts: structured
 * scorecards, not buy orders. English-only prototype. */

export const companiesBatch: Record<string, Company> = {
  MU: {
    ticker: 'MU',
    name: 'Micron Technology',
    tagline:
      'The last independent U.S.-headquartered memory maker — HBM has turned a brutally cyclical commodity business into one of NVIDIA\'s tightest supply constraints.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Micron doesn\'t design GPUs or AI accelerators — it makes the DRAM, HBM and NAND that sit next to them. That places it at a physical bottleneck of nearly every AI training and inference cluster, alongside SK Hynix and Samsung.',
      rows: [
        { level: 'Memory fabrication (DRAM/NAND)', players: 'Micron, SK Hynix, Samsung', position: 'Core business — the only leading-edge memory maker headquartered in the US', tone: 'core' },
        { level: 'HBM design + stacking', players: 'SK Hynix, Samsung, Micron', position: '#3 by shipment share, but HBM4 shipments for NVIDIA Vera Rubin began March 2026 and are ramping ahead of plan', tone: 'core' },
        { level: 'Advanced packaging', players: 'TSMC (base-die collaboration), in-house TSV/hybrid bonding', position: 'Mix of in-house and foundry packaging tie-ups for HBM stacks', tone: 'indirect' },
        { level: 'Fabless AI accelerator design', players: 'NVIDIA, AMD, hyperscaler custom silicon (Trainium, Maia, TPU)', position: 'Direct customers — HBM3E and HBM4 are fully booked through calendar 2027, with demand extending into 2028', tone: 'client' },
        { level: 'AI datacenter / hyperscalers', players: 'Microsoft, Google, Amazon, Meta, Oracle', position: 'End-demand driver, exposure runs both through GPU vendors and direct data-center DRAM/NAND/SSD sales', tone: 'indirect' },
        { level: 'Upstream equipment/materials', players: 'Lam Research, Applied Materials, ASML, Tokyo Electron', position: 'Suppliers to Micron, not exposure for Micron', tone: 'none' },
      ],
      segments: [
        'DRAM: record fiscal Q3 2026 revenue of $31.3B, +343% YoY, +67% sequentially — the majority of company revenue',
        'NAND: record fiscal Q3 2026 revenue of $9.9B, +361% YoY, +99% sequentially',
        'HBM: over $1B of HBM4 revenue shipped since the March 2026 Vera Rubin-platform ramp began, running at roughly 2x the pace of HBM3E 12-high with yields ahead of expectations',
        'Consolidated gross margin 84.9% in fiscal Q3 2026 (+10 points sequentially); fiscal Q4 2026 guided to approximately 86%',
      ],
      aiShift:
        'AI has converted Micron from a plain cyclical commodity-memory name into a structurally scarce supplier: HBM3E and HBM4 are fully booked through calendar 2027 with demand already extending into 2028, and DRAM average selling prices rose in the low-60% range sequentially in fiscal Q3 2026 on tight bit supply. The offsetting structural shift is Chinese domestic competition — ChangXin Memory Technologies (CXMT) is reported to be approaching Micron\'s own DRAM capacity (roughly 350K vs. ~375K wafer starts/month by some estimates) by the end of 2026, though it remains dependent on older DUV lithography and is not yet competitive on leading-edge DDR5 or HBM.',
    },
    valuation: {
      peers: ['MU', '000660.KS', '005930.KS'],
      metrics: [
        { label: 'Price', values: ['$873.29 (Aug 5, 2026)', '₩1,668,000 (Aug 5, 2026)', '₩248,250 (Aug 5, 2026)'] },
        { label: 'Market cap', values: ['~$1.008T', '~₩1,215.75T (~$833.8B)', '~₩1,527.6T (~$1.13T)'] },
        { label: 'Trailing P/E', values: ['~19.7x–20.1x (varies by source/snapshot)', '~16.6x', '~10.9x (computed: price / TTM EPS ₩22,704)'] },
        { label: 'Forward P/E', values: ['~6.1x–6.8x (varies by source/snapshot)', '~6.8x', '~6.8x'] },
        { label: 'EV/EBITDA', values: ['~14.9x', 'n/a', 'n/a'] },
        { label: 'P/S (TTM)', values: ['~10x–15x (wide source variance — different TTM windows)', 'n/a', 'n/a'] },
        { label: 'Gross margin', values: ['~72.6% TTM avg (fiscal Q3 2026 quarter alone: 84.9%)', 'n/a', 'n/a'] },
        { label: 'Operating margin', values: ['~65.6% TTM (reflects a recent-quarter surge, not a stable run-rate)', '76% (Q2 2026)', 'n/a'] },
        { label: 'ROE (TTM)', values: ['66.6%', '~61%', '30.8%'] },
        { label: 'Beta', values: ['~2.2', 'n/a', 'n/a'] },
        { label: 'Dividend yield', values: ['0.07%', '0.17%', '0.61%'] },
      ],
      verdictTone: 'low',
      verdictPoints: [
        'Forward P/E of ~6-7x is extremely low for a company guiding $50B in quarterly revenue and record margins — the market is pricing meaningful skepticism that the current DRAM/HBM upcycle is durable',
        'Trailing P/E (~20x) and P/S (low-teens on most trackers) are not cheap in absolute terms — the low forward multiple is a bet that fiscal 2026\'s exceptional prints (Q2 GAAP EPS $12.07, Q3 $24.67) continue rather than mean-revert',
        'CXMT\'s rapid Chinese DRAM capacity buildout is a visible, well-covered overhang keeping the multiple compressed despite record current fundamentals — the stock is already down roughly 28% from its June 2026 all-time high on exactly this concern',
      ],
      justifiedIf: [
        'HBM3E/HBM4 bookings — already covering calendar 2027, with demand into 2028 — convert to revenue on schedule and yields keep improving',
        'DRAM/NAND pricing power persists rather than reversing as new domestic Chinese (CXMT) and competitor (Samsung, SK Hynix) supply comes online',
        'The fiscal Q4 2026 guide ($50.0B ± $1.0B revenue, ~86% gross margin, $31.00 non-GAAP EPS) is met, validating the current earnings run-rate as durable rather than a cyclical peak',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$650 – $750', rationale: 'A further pullback toward the middle of the post-correction range — would price in a genuine CXMT/pricing scare, not just a headline wobble' },
        { tier: 'acceptable', range: '$750 – $950', rationale: 'Spans the current level — scaling in here accepts memory-cycle and China-competition risk without paying ATH prices' },
        { tier: 'expensive', range: '>$1,100', rationale: 'Approaches the June 2026 all-time high; requires the CXMT overhang to clear and pricing to stay firm' },
      ],
      technical: [
        'All-time high $1,213.37 (June 25, 2026); some trackers show a 52-week intraday high of $1,255 — the two figures are not independently reconciled here',
        '52-week low $106.75 (pre-AI-supercycle re-rating)',
        'Current $873.29 (Aug 5, 2026) is a roughly 28% pullback from the ATH, driven largely by CXMT IPO/China DRAM-capacity headlines that hit the whole memory complex the same week (SanDisk -12%, SK Hynix -8%)',
        'Stock remains up substantially over the trailing year on the DRAM/HBM upcycle despite the recent drawdown',
      ],
      scenarios: [
        { label: 'BASE', prob: 45, note: 'HBM4 ramp and DRAM pricing hold through fiscal Q4 2026 and into FY2027 — stock grinds back toward $1,000–1,150 over 12–18 months.' },
        { label: 'BULL', prob: 25, note: 'Rubin-cycle HBM4 demand and AI-server DRAM/NAND attach rates exceed plan, the CXMT overhang proves overstated near-term — retests or clears the $1,213 ATH.' },
        { label: 'BEAR', prob: 30, note: 'CXMT capacity ramps faster than expected and/or a broader AI-capex digestion phase hits memory pricing — multiple compresses further toward $550–650.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $650 (loss of the post-correction support structure)',
    },
    risks: [
      { risk: 'DRAM/NAND cyclicality', severity: 'high', note: 'Memory has always been a brutal boom-bust business; the current forward multiple assumes the upcycle holds rather than reverting to historical norms.' },
      { risk: 'Chinese domestic competition (CXMT)', severity: 'high', note: 'CXMT is reported to be approaching Micron\'s own DRAM wafer-start capacity by late 2026; still behind on leading-edge/HBM but a real medium-term threat to commodity DRAM pricing.' },
      { risk: 'Customer concentration', severity: 'medium', note: 'NVIDIA and a handful of hyperscalers drive the large majority of HBM demand; any allocation shift is a large swing factor.' },
      { risk: 'Export control / geopolitics', severity: 'medium', note: 'US-China chip-tech tensions cut both ways — they constrain CXMT\'s access to advanced tools, but China has previously restricted Micron\'s own domestic sales (2023), and further retaliation is a live risk.' },
      { risk: 'Capex / execution', severity: 'medium', note: 'A large capex ramp (Idaho, New York fabs, HBM capacity) carries yield-ramp and execution risk on an aggressive multi-year timeline.' },
      { risk: 'Competitive share loss in HBM', severity: 'medium', note: 'Micron is the #3 HBM supplier behind SK Hynix and Samsung; Samsung has been clearing HBM4 qualification hurdles after trailing through 2025.' },
      { risk: 'Valuation on a growth-deceleration scenario', severity: 'medium', note: 'Trailing multiples aren\'t a bargain — a guidance miss would hit hard given a beta near 2.2.' },
    ],
    backlog: {
      visibility: [
        'HBM3E and HBM4 fully booked through calendar 2027, with demand already extending into 2028',
        'Fiscal Q4 2026 guide: $50.0B revenue (±$1.0B), ~86% gross margin, $31.00 non-GAAP EPS',
        'Over $1B of HBM4 revenue shipped since the March 2026 ramp began',
      ],
      wins: [
        'HBM4 shipments for NVIDIA\'s Vera Rubin platform began March 2026, ramping roughly 2x faster than HBM3E 12-high with yields ahead of expectations',
        'Record fiscal Q3 2026 DRAM revenue $31.3B (+343% YoY) and NAND revenue $9.9B (+361% YoY)',
        'Fiscal Q3 2026 consolidated gross margin of 84.9%, up 10 points sequentially, a record',
        'DRAM ASPs up in the low-60% range sequentially in fiscal Q3 2026 on tight bit supply',
      ],
      clients: ['NVIDIA', 'AMD', 'AWS / Microsoft / Google (hyperscaler custom silicon and servers)'],
      suppliers: ['Lam Research', 'Applied Materials', 'ASML', 'Tokyo Electron'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 4, note: 'Oligopoly memory market structure, but historically capital-intensive and cyclical relative to pure-software or IP-licensing businesses.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'DRAM, NAND and HBM are all directly levered to the AI buildout — HBM demand is booked years out.' },
        { criterion: 'Valuation', stars: 4, note: 'The forward multiple is genuinely low for the growth on offer, though trailing multiples and P/S are not a bargain in absolute terms.' },
        { criterion: 'Momentum / entry timing', stars: 3, note: 'Already down ~28% from the June 2026 ATH on CXMT jitters — cheaper than the peak, not at a cycle trough.' },
        { criterion: 'Risk', stars: 2, note: 'Memory-cycle risk, a credible Chinese domestic competitor, and China-exposure geopolitics stack into a genuinely high-severity risk set.' },
      ],
      readLabel: 'STRUCTURALLY CENTRAL TO THE AI MEMORY CYCLE — BUT MEMORY IS STILL MEMORY',
      summary:
        'Micron sits at a real physical bottleneck in the AI buildout: HBM3E and HBM4 are sold out years in advance, and DRAM/NAND pricing is at record levels. The forward P/E looks cheap because the market has not fully believed this margin structure is durable — and the CXMT overhang is the specific, well-covered reason why, not a vague catch-all. This is a name where the thesis and the risk are the same fact: memory cycles eventually turn, and this time there\'s a credible new competitor (not just the usual three-way oligopoly) accelerating capacity into the tightest part of the cycle.',
    },
    sourceNote:
      'Compiled from Micron\'s fiscal Q1–Q3 FY2026 earnings releases and call transcripts (through the May 28, 2026 quarter close), the company\'s fiscal Q4 2026 guidance, and third-party market-data trackers (stockanalysis.com, GuruFocus, MacroTrends, Investing.com, various aggregators), snapshot dated early August 2026. Forward P/E, P/S and market-cap figures show meaningful cross-source variance for MU specifically, given the stock\'s recent volatility around CXMT-related headlines — treat single-decimal precision on any of these as approximate. SK Hynix and Samsung figures are cross-referenced from this site\'s own SK Hynix (000660.KS) profile for internal consistency; several peer metrics were not independently available and are marked n/a rather than estimated. This is a research framework, not a live feed — cross-check current prices and guidance (next report: fiscal Q4 2026, expected around late September 2026) before acting on anything here.',
  },

  ANET: {
    ticker: 'ANET',
    name: 'Arista Networks',
    tagline:
      'The Ethernet fabric hyperscalers actually deploy at scale for AI clusters — riding GPU cluster growth without carrying GPU or memory cyclicality directly.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Arista doesn\'t build GPUs or memory — it builds the switches and EOS software that connect them into a functioning cluster, sitting in the data-center networking fabric layer between compute and storage.',
      rows: [
        { level: 'Compute (GPUs/accelerators)', players: 'NVIDIA, AMD, hyperscaler custom silicon', position: 'Not exposed directly — but cluster scale is the primary driver of Arista\'s addressable market', tone: 'indirect' },
        { level: 'Memory (HBM/DRAM)', players: 'SK Hynix, Samsung, Micron', position: 'Not exposed', tone: 'none' },
        { level: 'Data-center networking / switching', players: 'Arista, Cisco, HPE Networking (post-Juniper)', position: 'Core business — leading merchant Ethernet switch platform for AI back-end and front-end fabrics', tone: 'core' },
        { level: 'Optics / interconnect', players: 'Arista Etherlink, Credo, Marvell, Broadcom', position: 'Etherlink platforms plus Linear Pluggable Optics partnerships to cut interconnect power', tone: 'core' },
        { level: 'Hyperscalers / cloud titans', players: 'Microsoft, Meta, Google, Amazon, Oracle', position: 'Direct customers — Microsoft and Meta are each large enough to individually exceed 10% of revenue depending on shipment mix', tone: 'client' },
        { level: 'Enterprise / campus networking', players: 'Cisco, HPE (Aruba/Juniper), Arista', position: 'Smaller, faster-growing adjacent segment beyond the AI-fabric core', tone: 'growth' },
      ],
      segments: [
        'Q2 2026 revenue $3.036B, +37.7% YoY, +12.1% QoQ — the company\'s first quarter above $3B, beating the $2.83B consensus',
        'Full-year 2026 revenue guidance raised to approximately $12.6B (~40% growth) — the third raise of the year',
        'Cumulative Etherlink AI-fabric customers exceed 100, up from four to five at the start of 2024',
        '7060XE7 1.6-terabit Etherlink portfolio launched: up to 100 Tbps of system bandwidth, ~60% lower interconnect power via Linear Pluggable Optics',
      ],
      aiShift:
        'Management describes AI networking demand as "materially above available supply" — the more consequential read-through from the Q2 2026 call is that growth is no longer confined to back-end AI fabrics alone but is broadening into front-end and campus/enterprise networking as well. Arista has disclosed new techniques aimed at maximizing AI cluster utilization and resilience — multi-planar leaf-spine designs, the open Multipath Reliable Connection (MRC) protocol, and segment routing over IPv6 (SRv6) — positioning EOS software, not just switch hardware, as the durable differentiator as NVIDIA and Broadcom push their own fabric alternatives.',
    },
    valuation: {
      peers: ['ANET', 'CSCO', 'HPE'],
      metrics: [
        { label: 'Price', values: ['$199.22 (Aug 5, 2026)', '$121.74 (Aug 4, 2026)', '$52.39 (early Aug 2026)'] },
        { label: 'Market cap', values: ['~$242B–256B (wide source variance around the Aug 4 earnings pop)', '$471.08B', '~$69B (computed from ~1.32B shares)'] },
        { label: 'Trailing P/E', values: ['~64.2x (Aug 3, 2026 snapshot, pre-earnings-pop)', '37.49x', 'n/a'] },
        { label: 'Forward P/E', values: ['~44x–52x (source variance)', '23.98x', '~12.8x–15.9x (source variance)'] },
        { label: 'EV/EBITDA', values: ['~46.3x', 'n/a', 'n/a'] },
        { label: 'P/S (TTM)', values: ['~18x–22x (source variance)', 'n/a', 'n/a'] },
        { label: 'Gross margin', values: ['64.3%', '64.3%', 'n/a'] },
        { label: 'Operating margin', values: ['~42.9%', '23.7%', 'n/a'] },
        { label: 'Net margin', values: ['~39.7%', '19.7%', 'n/a'] },
        { label: 'ROE', values: ['~31.5%', '25.2%', 'n/a'] },
        { label: 'Beta', values: ['1.61', 'n/a', '~1.0 (indicative, not independently verified)'] },
      ],
      verdictTone: 'high',
      verdictPoints: [
        'Trailing (~64x) and forward (~44–52x, depending on snapshot) P/E sit well above Cisco (37x/24x) and far above HPE, reflecting a structurally faster growth rate — +37.7% YoY versus low-to-mid-single-digit growth at the legacy networking incumbents',
        'EV/EBITDA of ~46x and a beta of 1.61 price in continued AI-fabric share gains, not a margin of safety',
        'The stock printed a fresh intraday all-time high ($215) on August 5, 2026, the day after the Q2 beat-and-raise — the market is already extrapolating the newly raised ~$12.6B FY2026 guide',
      ],
      justifiedIf: [
        'The >100-customer Etherlink AI-fabric base keeps expanding and Microsoft/Meta hyperscaler spend doesn\'t pull back or lump into fewer, larger, lower-margin deals',
        'FY2026 revenue clears the raised ~$12.6B guide and AI back-end/front-end fabric growth continues outrunning legacy campus/enterprise networking',
        'Arista defends its merchant-silicon Ethernet position against NVIDIA\'s own Spectrum-X/NVLink push and Broadcom Tomahawk-based white-box competition',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$140 – $165', rationale: 'A real pullback to pre-2026-AI-fabric-rerating levels, well below the current post-earnings ATH' },
        { tier: 'acceptable', range: '$165 – $210', rationale: 'Spans the current level — scaling in here accepts an elevated multiple in exchange for genuine AI-fabric growth' },
        { tier: 'expensive', range: '>$230', rationale: 'Little multiple cushion left; requires the ~40%+ growth rate to persist for years, not quarters' },
      ],
      technical: [
        'New intraday all-time high $215.00 on August 5, 2026, the day after the Q2 earnings beat; prior ATH was $189.82 (July 9, 2026)',
        '52-week range $114.52 – $215.00',
        'Stock rose roughly 12% on the August 4, 2026 earnings reaction (Q2 revenue $3.036B beat the $2.83B consensus) and continued higher (~+4%) on August 5',
        'Next scheduled catalyst is the Q3 2026 earnings report (date not yet confirmed at this snapshot)',
      ],
      scenarios: [
        { label: 'BASE', prob: 45, note: 'FY2026 revenue lands near the raised ~$12.6B guide, the Etherlink customer base keeps growing — grinds toward $220–250 over the next 12 months.' },
        { label: 'BULL', prob: 25, note: 'AI back-end fabric demand keeps outrunning supply, a large new hyperscaler win or a Spectrum-X share-loss narrative reverses — re-rates toward $280–320.' },
        { label: 'BEAR', prob: 30, note: 'AI-capex digestion, a large customer (Microsoft or Meta) pulls back or dual-sources more aggressively toward Cisco/white-box switches, or a guide miss resets the ~45–65x multiple — retests $130–160.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $150 (loss of the post-rerating support structure)',
    },
    risks: [
      { risk: 'Hyperscaler customer concentration', severity: 'high', note: 'Microsoft and Meta can each individually exceed 10% of revenue depending on shipment mix — a pullback or dual-sourcing shift from either is a large single-customer swing.' },
      { risk: 'Valuation', severity: 'high', note: 'Trailing P/E near 64x and EV/EBITDA near 46x leave little room for a growth deceleration; a beta of 1.61 amplifies any multiple reset.' },
      { risk: 'NVIDIA vertical integration', severity: 'medium', note: 'NVIDIA increasingly bundles its own Ethernet (Spectrum-X) and NVLink fabric with GPU sales — a structural, long-run threat to Arista\'s back-end fabric share.' },
      { risk: 'Broadcom / white-box competition', severity: 'medium', note: 'Broadcom Tomahawk silicon plus ODM white-box switches undercut Arista on commodity leaf-spine deployments at hyperscaler scale.' },
      { risk: 'Cisco resurgence / HPE-Juniper combination', severity: 'medium', note: 'Cisco\'s own AI networking push, plus the July 2025 HPE-Juniper combination, narrows the field of credible alternative suppliers hyperscalers can point to.' },
      { risk: 'AI capex cyclicality', severity: 'medium', note: 'Back-end fabric revenue is directly levered to hyperscaler GPU cluster buildout, currently at record levels — a capex digestion phase would hit Arista alongside the GPU/memory names.' },
      { risk: 'Supply/demand imbalance as an execution risk', severity: 'low', note: 'Management\'s own characterization of demand as "materially above available supply" is double-edged: strong demand, but also allocation and execution risk if Arista can\'t fulfill it fast enough.' },
    ],
    backlog: {
      visibility: [
        'FY2026 revenue guidance raised to approximately $12.6B (~40% growth), the third raise in 2026',
        'Cumulative Etherlink AI-fabric customer count exceeds 100, up from four to five at the start of 2024',
        'Management describes AI networking demand as "materially above available supply"',
      ],
      wins: [
        'Q2 2026 revenue of $3.036B (+37.7% YoY), the first quarter above $3B, beating the $2.83B consensus',
        '7060XE7 1.6-terabit Etherlink portfolio launch — up to 100 Tbps of system bandwidth, ~60% lower interconnect power via Linear Pluggable Optics',
        'Continued commitment from large cloud partners Microsoft and Meta, each capable of exceeding 10% of revenue',
        'New AI-fabric techniques disclosed for scale-up/scale-out/scale-across clusters: multi-planar leaf-spine, Multipath Reliable Connection (MRC) protocol, SRv6',
      ],
      clients: ['Microsoft', 'Meta', 'Google', 'Amazon', 'Oracle'],
      suppliers: ['Broadcom (merchant switch silicon)', 'Marvell', 'Credo (optical DSPs/AECs)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 5, note: 'Category-leading merchant Ethernet fabric provider; EOS software creates real switching costs once deployed at hyperscaler scale.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'AI back-end/front-end fabric is now the dominant growth driver, evidenced by the raised guide and the >100-customer Etherlink base.' },
        { criterion: 'Valuation', stars: 2, note: 'Trailing and forward multiples are rich versus Cisco and HPE, and priced for continued outperformance rather than a margin of safety.' },
        { criterion: 'Risk', stars: 3, note: 'Hyperscaler concentration and NVIDIA\'s own networking ambitions are real structural risks, partly offset by a genuine technical/software moat.' },
        { criterion: 'Momentum / entry timing', stars: 2, note: 'A fresh all-time high the day after earnings leaves little cushion for anyone buying at the current price.' },
      ],
      readLabel: 'HIGH-QUALITY AI FABRIC LEADER, PRICED FOR CONTINUED EXECUTION AFTER A FRESH ATH',
      summary:
        'Arista is the cleanest public way to own the Ethernet fabric layer of AI infrastructure — it doesn\'t carry GPU allocation risk or memory-cycle risk, and its Q2 2026 beat-and-raise, third guidance raise of the year, and 100+ Etherlink customers all point to durable, broadening demand. The trade-off is that essentially none of that is a secret: the stock made a fresh all-time high the day after the print, and both trailing and forward multiples sit well above Cisco and HPE. This is a name to own for the AI-fabric growth thesis, not to expect a valuation discount from.',
    },
    sourceNote:
      'Compiled from Arista Networks\' Q2 2026 earnings release and call (August 4, 2026), and third-party market-data trackers (stockanalysis.com, MacroTrends, GuruFocus, Investing.com, TradingKey), snapshot dated August 5, 2026. Market cap and forward P/E in particular show meaningful cross-source variance because the stock moved sharply (+12% then +4%) around the earnings date and different trackers captured different snapshots relative to that move — treat single-decimal precision on any of these as approximate. Juniper Networks is not listed as a peer because HPE completed its $14B acquisition of Juniper on July 2, 2025; HPE is used as the closest available successor comparable. This is a research framework, not a live feed — cross-check current prices and the next quarterly report before acting on anything here.',
  },

  SMCI: {
    ticker: 'SMCI',
    name: 'Super Micro Computer',
    tagline:
      'The AI GPU rack-scale integrator riding NVIDIA\'s fastest ramps — with a real accounting-controls and export-control history that hasn\'t fully receded.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Supermicro doesn\'t design GPUs, memory or networking silicon — it builds and ships the rack-scale servers (its "Data Center Building Block Solutions" architecture) that package NVIDIA/AMD compute, third-party memory and networking gear into deployable AI infrastructure, competing on speed-to-market rather than component IP.',
      rows: [
        { level: 'Compute (GPUs/accelerators)', players: 'NVIDIA, AMD', position: 'Direct relationship — GB300 NVL72, B300 HGX and B200 NVL4 are the core current product lines', tone: 'client' },
        { level: 'Memory (HBM/DRAM)', players: 'SK Hynix, Samsung, Micron', position: 'Component supplier into SMCI systems, not an SMCI exposure', tone: 'none' },
        { level: 'Rack-scale server integration', players: 'Supermicro, Dell, HPE, Lenovo, ODMs (Foxconn, Wiwynn, Quanta)', position: 'Core business — historically one of the fastest integrators to bring each new NVIDIA reference platform to market', tone: 'core' },
        { level: 'Networking / fabric', players: 'NVIDIA (NVLink/Spectrum-X), Arista, Broadcom', position: 'Integrated into SMCI racks, not SMCI-controlled IP', tone: 'indirect' },
        { level: 'Large data-center customers', players: 'A concentrated handful of large buyers', position: 'Direct customers — one buyer alone was approximately 63% of revenue in fiscal Q2 2026', tone: 'client' },
        { level: 'Cloud / colo / enterprise end demand', players: 'Neoclouds, enterprises, sovereign AI buyers', position: 'Indirect, mostly reached through the concentrated direct/large-customer channel', tone: 'indirect' },
      ],
      segments: [
        'AI GPU platforms are approximately 90% of total revenue',
        'FY2026 full-year net sales guided at $38.9B–$40.4B (as of the Q3 FY2026 update)',
        'Fiscal Q4 2026 preliminary (issued July 21, 2026): revenue near the low end of the $11.0B–$12.5B guide; GAAP/non-GAAP gross margin 15–17%, well above the originally guided 8.2–8.4%, on favorable customer/product mix',
        'Record backlog: total new orders exceeded $60B in fiscal Q4 2026 alone',
        'Currently shipping GB300 NVL72, B300 HGX, B200 NVL4 and Dolphin Express PX product lines',
      ],
      aiShift:
        'Supermicro\'s entire business is now essentially an AI GPU rack-scale bet — roughly 90% of revenue is AI GPU platforms, and the company has consistently been among the fastest to ship each new NVIDIA reference architecture (GB200, and now GB300 NVL72). That speed is the moat, but it is also the risk: the April 2026 cancellation of a reported $1.1B–$1.4B, 300–400-rack Oracle GB300 NVL72 order (of which SMCI had already shipped 100–200 racks) showed how quickly a single large customer decision can move results, and it followed reports that Oracle wanted distance from allegations tied to a former SMCI co-founder\'s alleged illicit chip sales to China.',
    },
    valuation: {
      peers: ['SMCI', 'DELL', 'HPE'],
      metrics: [
        { label: 'Price', values: ['$30.32 (Aug 5, 2026)', '$467.27 (Aug 5, 2026)', '$52.39 (early Aug 2026)'] },
        { label: 'Market cap', values: ['~$17B–20.5B (source variance)', '~$271B–302B (source variance)', '~$69B (computed from ~1.32B shares)'] },
        { label: 'Trailing P/E', values: ['~15.1x (Aug 3, 2026 snapshot)', '~37.35x', 'n/a'] },
        { label: 'Forward P/E', values: ['~8.6x–10.1x (source variance)', '~25.2x–25.5x', '~12.8x–15.9x (source variance)'] },
        { label: 'EV/EBITDA', values: ['~14.7x–14.9x', 'n/a', 'n/a'] },
        { label: 'P/S (TTM)', values: ['~0.58x', 'n/a', 'n/a'] },
        { label: 'Gross margin', values: ['~6%–17% (extreme quarter-to-quarter swing — see note)', '~21.0%', 'n/a'] },
        { label: 'ROE', values: ['~17.9%', 'n/a', 'n/a'] },
        { label: 'Beta', values: ['~1.94', '~1.40', 'n/a'] },
        { label: 'PEG', values: ['~0.91', 'n/a', 'n/a'] },
        { label: 'Dividend yield', values: ['none', 'n/a', 'n/a'] },
      ],
      verdictTone: 'low',
      verdictPoints: [
        'Forward P/E of ~8.6–10x and a P/S near 0.6x are low by AI-infrastructure standards, but SMCI\'s gross margin has swung between roughly 6% and 17% within the same fiscal year on customer/product mix — a far less predictable earnings stream than Dell or HPE',
        'The multiple embeds real, disclosed risk that Dell and HPE don\'t carry: an unresolved DOJ/SEC investigation opened after a March 2026 export-control indictment, a 2024 auditor resignation, and a single customer that was roughly 63% of one recent quarter\'s revenue',
        'Record backlog (over $60B of new orders in fiscal Q4 2026 alone) argues demand isn\'t the constraint — margin durability and customer concentration are',
      ],
      justifiedIf: [
        'The DOJ/SEC investigations — opened following the March 2026 indictment of two former employees and a contractor for an alleged export-control conspiracy — close without material findings against the company itself',
        'Gross margin stabilizes in the low-to-mid teens rather than reverting toward the high-single-digits seen earlier in FY2026',
        'The customer base broadens beyond its current concentration on one large buyer (~63% of one recent quarter) — the April 2026 Oracle GB300 order cancellation is a live example of what that concentration risk looks like in practice',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$18 – $24', rationale: 'Near the 52-week low; prices in a continuation of margin volatility and unresolved investigation risk' },
        { tier: 'acceptable', range: '$24 – $36', rationale: 'Spans the current level — scaling in here accepts open investigation and customer-concentration risk' },
        { tier: 'expensive', range: '>$48', rationale: 'Approaches the 52-week high; would require the investigation overhang to visibly clear' },
      ],
      technical: [
        '52-week range approximately $19.48–$59.40 (figures vary slightly by source) — current $30.32 sits in the lower third',
        'Down roughly 6.9% over the trailing week as of the August 5, 2026 snapshot per one tracker',
        'Preliminary Q4 FY2026 business update issued July 21, 2026 (revenue near the low end of guidance, margin well above guidance); full earnings call scheduled for August 11, 2026',
        'Highly volatile around investigation- and customer-order headlines through 2026, including a roughly 10% single-day drop on the reported Oracle order cancellation (April 2026)',
      ],
      scenarios: [
        { label: 'BASE', prob: 40, note: 'FY2026 lands near the low end of the $38.9B–$40.4B guide, gross margin settles in the low-to-mid teens, the investigation drags on without a material charge — trades in a wide $28–$42 range over the next 12 months.' },
        { label: 'BULL', prob: 25, note: 'The DOJ/SEC investigation closes cleanly, the GB300 NVL72 ramp broadens the customer base beyond current concentration, margin holds mid-teens — retests the $50s.' },
        { label: 'BEAR', prob: 35, note: 'The investigation surfaces a material finding, another large customer order is pulled or delayed, gross margin reverts toward high-single-digits — retests the high-teens/$20 low.' },
      ],
      horizon: '6–12 months (shorter than typical given the open investigations and event-driven risk)',
      invalidation: 'Weekly close below $19 (loss of 52-week-low support), or a materially adverse DOJ/SEC finding',
    },
    risks: [
      { risk: 'Ongoing DOJ/SEC investigation', severity: 'high', note: 'A March 2026 indictment named two former employees and a contractor in an alleged $2.5B export-control conspiracy; SMCI itself is not charged, but faces an internal investigation led by independent directors with outside counsel and received an additional SEC subpoena in April 2026. Outcome and any company-level exposure are unresolved as of this writing.' },
      { risk: 'Customer concentration', severity: 'high', note: 'One large data-center customer was approximately 63% of revenue in fiscal Q2 2026; the $1.1B–$1.4B Oracle GB300 NVL72 order cancellation in April 2026 is a direct illustration of how fast that concentration can move results.' },
      { risk: 'Gross margin volatility', severity: 'high', note: 'Margin has swung from roughly 6–8% to 15–17% within the same fiscal year depending on customer/product mix and component costs, making forward earnings unusually hard to model.' },
      { risk: 'Prior accounting-controls history', severity: 'medium', note: 'Ernst & Young resigned as auditor in October 2024 after raising governance and internal-controls concerns; BDO was appointed in November 2024 and delayed filings were brought current with no restatement of prior financials — a real governance precedent, not a one-off, even though it was resolved without restatement.' },
      { risk: 'NVIDIA / hyperscaler dependency', severity: 'medium', note: 'Roughly 90% of revenue is AI GPU platforms tied overwhelmingly to NVIDIA\'s release cadence and allocation decisions; a slower generational transition or reallocation toward Dell/HPE/ODMs would hit SMCI disproportionately.' },
      { risk: 'Competitive intensity', severity: 'medium', note: 'Dell, HPE, Lenovo and Taiwanese ODMs (Foxconn, Wiwynn, Quanta) all compete for the same rack-scale integration business, generally with stronger balance sheets and more diversified customer bases.' },
      { risk: 'Working capital / balance sheet strain', severity: 'medium', note: 'Rapid AI-server revenue growth has historically strained SMCI\'s working capital and cash-conversion cycle.' },
    ],
    backlog: {
      visibility: [
        'Record backlog: total new orders exceeded $60B in fiscal Q4 2026 alone',
        'FY2026 full-year net sales guided at $38.9B–$40.4B',
        'Currently shipping GB300 NVL72, B300 HGX, B200 NVL4 and Dolphin Express PX product lines',
      ],
      wins: [
        'Fiscal Q4 2026 gross margin came in well above guidance (15–17% actual vs. 8.2–8.4% guided) on favorable customer/product mix',
        'Among the fastest integrators to bring each new NVIDIA reference platform (GB300 NVL72, B300, B200 NVL4) to market',
      ],
      clients: ['Large data-center/hyperscaler customers (concentrated — one buyer ~63% of fiscal Q2 2026 revenue)', 'Enterprise and sovereign-AI buyers (smaller, diversifying)'],
      suppliers: ['NVIDIA (GPUs/reference platforms)', 'AMD', 'Memory suppliers (SK Hynix, Samsung, Micron)', 'Networking-silicon partners (Broadcom, others)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 2, note: 'Thin, volatile margins and weak customer diversification relative to Dell/HPE; speed-to-market is the moat, not IP or scale economics.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Approximately 90% of revenue is direct AI GPU platform sales — about as concentrated an AI bet as exists in public markets.' },
        { criterion: 'Valuation', stars: 3, note: 'Single-digit forward P/E and sub-1x P/S look cheap on the surface, but that discount is earned given real governance, investigation and concentration risk.' },
        { criterion: 'Risk', stars: 1, note: 'An open DOJ/SEC investigation, ~63% single-customer concentration, and a 2024 auditor-resignation history stack multiple high-severity risks simultaneously.' },
        { criterion: 'Momentum / entry timing', stars: 2, note: 'Trading in the lower third of its 52-week range with real event risk (investigation outcome, August 11, 2026 earnings) still pending.' },
      ],
      readLabel: 'REAL AI DEMAND, REAL UNRESOLVED RISK — NOT A CLEAN WAY TO PLAY THE RACK-SCALE RAMP',
      summary:
        'Supermicro\'s demand signal is genuinely strong — a record backlog north of $60B in a single quarter, and among the fastest shippers of every new NVIDIA rack-scale platform. But this is not a name where the low multiple is simply a market inefficiency to be arbitraged: it reflects a 2024 auditor resignation, an unresolved March 2026 DOJ export-control indictment with an active SEC subpoena, and revenue concentration (~63% from one buyer in a recent quarter) that has already shown up in results once, via the April 2026 Oracle order cancellation. Investors here are underwriting execution and governance risk on top of the normal AI-capex cyclicality that Dell and HPE also carry.',
    },
    sourceNote:
      'Compiled from Supermicro\'s fiscal Q3 FY2026 earnings materials (May 2026), the July 21, 2026 preliminary fiscal Q4 2026 business update, SEC 8-K filings, and news coverage of the March 2026 DOJ export-control indictment and the October–November 2024 Ernst & Young resignation / BDO appointment, plus third-party market-data trackers (stockanalysis.com, GuruFocus, Investing.com), snapshot dated early August 2026. Market cap, forward P/E and gross-margin figures for SMCI show unusually wide cross-source variance, reflecting both real quarter-to-quarter volatility in the underlying business and differing snapshot dates — treat any single-decimal figure here as approximate. The full fiscal Q4 2026 earnings call was scheduled for August 11, 2026, after this snapshot was compiled; cross-check that report, and the status of the DOJ/SEC investigations, before acting on anything here. This is a research framework, not a live feed.',
  },
}
