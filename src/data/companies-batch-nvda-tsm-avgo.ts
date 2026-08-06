/* Batch: NVDA, TSM, AVGO — three of the most-referenced names in the AI Value
 * Chain constellation that had no deep-dive entry on the site. Researched via
 * live web lookups (multiple aggregators + primary earnings releases/filings),
 * snapshot dated August 2026. Merge into src/data/companies.ts by spreading
 * `companiesBatch` into the `companies` export — not done here to avoid
 * touching the shared file while other batches are in flight. */

import type { Company } from './companies'

export const companiesBatch: Record<string, Company> = {
  NVDA: {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    tagline: 'The dominant merchant-silicon platform for AI training and inference — GPUs, networking and full rack-scale systems, priced as the default winner of the buildout.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'NVIDIA is a fabless designer sitting at the center of the AI accelerator market — it does not fabricate its own chips (TSMC does, on leading-edge nodes) but controls the GPU architecture, the CUDA software stack, and increasingly the networking (NVLink, Spectrum-X) and rack-scale system design (NVL72/NVL144, Vera Rubin) that hyperscalers build entire datacenters around. Its scale gives it first call on TSMC CoWoS advanced-packaging capacity and HBM allocation from SK Hynix, Samsung and Micron — both of which are structural bottlenecks the rest of the industry competes for.',
      rows: [
        { level: 'Foundry (fabrication)', players: 'TSMC (4NP/3nm nodes)', position: 'NVIDIA is fabless — entirely dependent on TSMC leading-edge and CoWoS advanced-packaging capacity', tone: 'client' },
        { level: 'HBM memory supply', players: 'SK Hynix, Samsung, Micron', position: 'Critical input for every Blackwell/Rubin accelerator — NVIDIA gets first-priority allocation given its volume', tone: 'client' },
        { level: 'Fabless GPU/accelerator design (this company)', players: 'NVIDIA', position: 'Core business — Blackwell (GB200/GB300) shipping now, Vera Rubin ramping 2H FY2027', tone: 'core' },
        { level: 'Networking / interconnect', players: 'NVIDIA (NVLink, Spectrum-X, Mellanox heritage), Broadcom, Marvell', position: 'NVIDIA increasingly sells the switch and NIC silicon around its own GPUs, not just the GPU itself', tone: 'core' },
        { level: 'Rack-scale systems', players: 'NVIDIA NVL72/NVL144, ODM partners (Foxconn, Quanta, Wistron)', position: 'Selling full liquid-cooled racks, not discrete chips — raises the average selling price and the switching cost', tone: 'growth' },
        { level: 'Hyperscaler / AI-lab customers', players: 'Microsoft, Google, Amazon, Meta, OpenAI, Anthropic, Oracle, xAI', position: 'Direct, disclosed multi-gigawatt commitments — the demand side of the buildout', tone: 'client' },
        { level: 'Custom ASIC competitors (indirect)', players: 'Broadcom/Google TPU, Broadcom/Anthropic-Google TPU deal, Amazon Trainium (via Marvell/Annapurna), Microsoft Maia', position: 'Hyperscalers increasingly design their own accelerators to reduce NVIDIA dependence — the single biggest structural risk to the merchant-GPU model', tone: 'indirect' },
      ],
      segments: [
        'Data Center: $75.2B in Q1 FY2027 (quarter ended Apr 2026), +92% YoY — Blackwell GB200/GB300 now the majority of Data Center revenue',
        'Q1 FY2027 total revenue: $81.6-82.0B (sources vary slightly on rounding), +85% YoY, 14th straight quarter of sequential growth per company commentary',
        'Q2 FY2027 guided revenue: $91.0B ± 2%, with GAAP/non-GAAP gross margin guided to ~74.9%/75.0% ± 50bps',
        'Gaming, Professional Visualization and Automotive remain small relative to Data Center but are not broken out in most third-party summaries used here',
      ],
      aiShift:
        'NVIDIA is the AI buildout in merchant-silicon form — Blackwell is shipping in volume, Vera Rubin is guided to ramp in 2H FY2027, and management has pointed to "at least $1 trillion" of cumulative Blackwell+Rubin revenue through the end of calendar 2027. The company has also moved from selling chips to selling infrastructure commitments: a letter of intent with OpenAI for at least 10GW of NVIDIA systems (with NVIDIA investing progressively as each GW deploys — a figure originally framed as up to $100B that CEO Jensen Huang has since said publicly is "probably not in the cards" at that size), a disclosed up-to-$10B commitment to Anthropic, and reported discussions around a $250B Ohio data-center financing package tied to OpenAI. The flip side of that scale is that the same hyperscalers writing those checks (Google, Amazon, Microsoft, and now Anthropic via its expanded Google/Broadcom TPU deal) are simultaneously the biggest funders of custom-ASIC alternatives to NVIDIA silicon.',
    },
    valuation: {
      peers: ['NVDA', 'AMD', 'AVGO', 'TSM'],
      metrics: [
        { label: 'Price', values: ['~$212–219 (Aug 3–5, 2026; intraday moves of this size reflect a live semiconductor rally, not a data error)', '$518.58 (Aug 4, 2026)', '~$392–421 (Aug 3–5, 2026, same rally)', '~$406–419 (Aug 3–5, 2026, same rally)'] },
        { label: 'Market cap', values: ['~$5.1–5.3T (Aug 2026) — the largest company in the world by this measure', '$790.25B (Aug 3, 2026)', '~$1.87–1.99T (Aug 2026, cross-source variance)', '~$2.15T (Aug 2026)'] },
        { label: 'Trailing P/E', values: ['~31.6x', '172.93x', 'not independently captured this pass', '~26.2x'] },
        { label: 'Forward P/E', values: ['~20.7x (one source cites up to ~24x — cross-source variance)', '49.16x', '~19.4x (one source cites ~24.2x)', '~18.4–25.3x (wide cross-source variance)'] },
        { label: 'PEG (trailing)', values: ['~0.47', 'not captured', 'not captured', 'not captured'] },
        { label: 'P/S (TTM)', values: ['~15–17x (EV/Sales cited at ~22.4x by one source; not fully reconciled)', '21.25x', '~16–17x (forward P/S cited between 15.9x–17.2x depending on source/date)', 'not captured'] },
        { label: 'EV/EBITDA', values: ['~27–30x (cross-source variance)', 'not captured', '~44.2x', '~17.8–18.0x'] },
        { label: 'Gross margin', values: ['74.15% (74.9–75.0% guided for Q2 FY2027)', '52.8% (Q1 2026)', '68.35% (TTM)', '67.7% (Q2 2026, +1.5pt sequential on 2nm ramp)'] },
        { label: 'Operating margin', values: ['~64.0%', 'not captured', 'not captured', 'not captured'] },
        { label: 'Net margin', values: ['~63.0% (Q1 FY2027 GAAP net income was heavily boosted by equity-security gains — treat as elevated, not a clean run-rate)', '13.5% (Q1 2026)', '38.85% (Apr 2026)', '55.6% (Q2 2026)'] },
        { label: 'ROE', values: ['~114–132% (sources vary; both are extreme by any standard)', 'not captured', '37.28%', '45.9% (Q2 2026)'] },
        { label: 'Beta', values: ['~2.2', 'not captured', '~1.47', '~1.25–1.39 (source variance)'] },
        { label: 'Dividend yield', values: ['~0.47% ($1.00 annualized, post the Q1 FY2027 dividend increase)', 'not captured', '~0.62%', '~0.91–0.99%'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'Forward P/E of ~20.7x and PEG of ~0.47 look genuinely inexpensive for a company still growing Data Center revenue 92% YoY — this is not priced like a typical mega-cap, closer to how a much smaller, faster-growing company would trade',
        'The catch is scale, not the multiple: at ~$5.1–5.3T market cap NVIDIA needs to keep adding tens of billions in quarterly revenue just to hold the multiple flat — the Q2 FY2027 guide of $91.0B implies another double-digit-billion sequential step-up',
        'Trailing net margin is inflated this year by GAAP equity-security gains tied to strategic investments (OpenAI, Anthropic, others) — the operating business is extremely profitable on its own, but headline net-margin comparisons to AMD/AVGO overstate the gap somewhat',
        'Price action has been volatile day to day (a multi-percent single-day move was visible in the Aug 3–5, 2026 window across this whole peer set) — treat any single price snapshot as a point-in-time read, not a stable level',
      ],
      justifiedIf: [
        'Vera Rubin ramps on the guided 2H FY2027 schedule and the "at least $1 trillion" cumulative Blackwell+Rubin revenue framing through end-2027 holds',
        'The OpenAI (10GW letter of intent), Anthropic (~$10B) and other hyperscaler commitments convert to actual delivered/paid capacity rather than remaining announcements',
        'Custom-ASIC programs (Google TPU/Broadcom, Amazon Trainium, Microsoft Maia) erode NVIDIA share at the margin rather than displacing it wholesale — the bull case assumes NVIDIA keeps the large majority of training and a meaningful share of inference',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$160 – $185', rationale: 'A meaningful pullback from the current ~$212–219 zone — closer to where the stock traded in early-to-mid 2025 before the current leg of the buildout' },
        { tier: 'acceptable', range: '$185 – $236', rationale: 'Brackets the current trading range up to the split-adjusted 52-week/all-time high of $236.54 (May 14, 2026)' },
        { tier: 'expensive', range: '> $240', rationale: 'A fresh push past the current all-time high with no corresponding step-up in guidance would mean paying for growth not yet confirmed' },
      ],
      technical: [
        'Split-adjusted all-time high $236.54 (May 14, 2026) — current ~$212–219 (Aug 2026) is roughly 7–10% below that level',
        'Some aggregators still surface a pre-split $1,255.87 "all-time high" (June 6, 2024) — that figure predates NVIDIA\'s 10-for-1 split (effective June 2024) and is not comparable to current split-adjusted prices; the real post-split high is the $236.54 figure above',
        'An all-time intraday high near $212 was reported for Oct 29, 2025 by one source, superseded by the May 2026 high — historical price data for this stock shows real cross-source disagreement even before accounting for split adjustment',
        'Next earnings: Q2 FY2027 results expected late August 2026 (exact date not independently confirmed in this pass) — guidance is $91.0B revenue ± 2%',
      ],
      scenarios: [
        { label: 'BASE', prob: 45, note: 'Blackwell shipments continue at pace, Q2 FY2027 print lands near the $91B guide, Vera Rubin ramp stays on schedule — grinds back toward the $230–260 area over 12 months.' },
        { label: 'BULL', prob: 25, note: 'OpenAI/Anthropic/other hyperscaler commitments convert faster than modeled, Vera Rubin pulls forward, China demand normalizes — a push toward $280–320.' },
        { label: 'BEAR', prob: 30, note: 'A guidance miss, a custom-ASIC share-loss data point at a major hyperscaler, or renewed China export-control tightening (NVIDIA has flagged the China AI-accelerator market, worth an estimated ~$50B, as a potential total loss) triggers a reset toward $150–175.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $150 (a return to pre-2025-buildout levels) or a disclosed loss/cancellation of a named hyperscaler multi-gigawatt commitment',
    },
    risks: [
      { risk: 'China export-control policy whiplash', severity: 'high', note: 'NVIDIA took a $4.5B charge in Q1 FY2026 on H20 excess inventory when China sales were halted, then policy reversed months later. Management states the China AI-accelerator market it is currently locked out of could reach ~$50B — and separately notes that a year of policy uncertainty means many Chinese customers are no longer ordering at all, unwilling to bet on a policy that could flip again.' },
      { risk: 'Custom-ASIC substitution at hyperscalers', severity: 'high', note: 'The same customers writing multi-gigawatt checks to NVIDIA (Google, Amazon, Microsoft, and Anthropic via its Google/Broadcom TPU deal) are simultaneously funding in-house or co-designed alternatives (Google TPU, Amazon Trainium via Marvell, Microsoft Maia) explicitly to reduce NVIDIA dependence.' },
      { risk: 'Customer/partner commitment concentration', severity: 'high', note: 'A large share of forward-looking narrative rests on a small number of named deals (OpenAI 10GW letter of intent, Anthropic ~$10B commitment) that are not yet fully executed contracts — Huang himself has walked back the headline $100B OpenAI figure.' },
      { risk: 'Valuation at mega-cap scale', severity: 'medium', note: 'A forward P/E in the low-20s looks reasonable on growth, but sustaining it at a ~$5T+ market cap requires tens of billions of incremental quarterly revenue — the law of large numbers works against indefinite 80-90% YoY growth.' },
      { risk: 'Supply-chain concentration (TSMC, HBM)', severity: 'medium', note: 'NVIDIA is entirely fabless and depends on TSMC leading-edge/CoWoS capacity and a three-supplier HBM market (SK Hynix, Samsung, Micron) shared with AMD and every other accelerator maker.' },
      { risk: 'AI-capex cyclicality / digestion risk', severity: 'medium', note: 'The bull case assumes hyperscaler capex keeps compounding; any broad pause or digestion in AI infrastructure spend would hit NVIDIA harder than most peers given its size and the multiple already assigned.' },
    ],
    backlog: {
      visibility: [
        'Q2 FY2027 revenue guided to $91.0B ± 2%, GAAP/non-GAAP gross margin guided ~74.9%/75.0% ± 50bps',
        'Management guidance of "at least $1 trillion" of cumulative Blackwell + Vera Rubin revenue through end of calendar 2027',
        'Vera Rubin platform on track for a 2H FY2027 ramp per company commentary',
        'Q1 FY2027 marked the 14th straight quarter of sequential revenue growth and the third consecutive YoY growth acceleration, per company/analyst commentary',
      ],
      wins: [
        'OpenAI/NVIDIA letter of intent to deploy at least 10GW of NVIDIA systems; first 1GW targeted for 2H 2026 on the Vera Rubin platform, with NVIDIA investing progressively as each GW deploys',
        'Up to $10B committed to Anthropic (alongside a separate $5B Microsoft commitment and Anthropic\'s own $30B Azure compute commitment)',
        'Reported discussions around funding guarantees for a $250B OpenAI-linked Ohio data-center project (SB Energy/SoftBank-affiliated site)',
        'GB300 shipments have crossed GB200 and now represent roughly two-thirds of Blackwell revenue, per Q1 FY2027-era commentary',
        'Dividend raised alongside the Q1 FY2027 report',
      ],
      clients: ['Microsoft', 'Google', 'Amazon', 'Meta', 'OpenAI', 'Anthropic', 'Oracle', 'xAI'],
      suppliers: ['TSMC (foundry, CoWoS advanced packaging)', 'SK Hynix, Samsung, Micron (HBM)', 'Foxconn, Quanta, Wistron and other ODM partners (rack-scale system assembly)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 5, note: 'The default platform for AI training and increasingly inference, with a software moat (CUDA) that has held for over a decade and margins ~74% gross that dwarf the rest of the semiconductor industry.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'As direct as AI-infrastructure exposure gets — Data Center revenue +92% YoY on a base already above $75B/quarter.' },
        { criterion: 'Valuation', stars: 4, note: 'Forward P/E in the low-20s and a sub-1 PEG are genuinely reasonable multiples for the growth rate, an unusual combination at this market cap.' },
        { criterion: 'Risk', stars: 3, note: 'China policy whiplash, hyperscaler custom-ASIC substitution, and concentration in a handful of enormous, not-fully-executed commitments are real and quantified, not diffuse.' },
        { criterion: 'Entry timing', stars: 3, note: 'Roughly 7-10% below the split-adjusted all-time high as of Aug 2026 — a reasonable but not deeply discounted entry, and the stock has shown real day-to-day volatility even within this research window.' },
      ],
      readLabel: 'CORE HOLDING, PRICED MORE REASONABLY THAN ITS SIZE SUGGESTS',
      summary:
        'NVIDIA is the single most direct, highest-quality way to own the AI infrastructure buildout in public markets, and — somewhat counterintuitively for the world\'s largest company — its forward multiple (~20.7x) and PEG (~0.47) are not obviously expensive relative to the growth on the tape. The real risks are structural rather than valuation-driven: China policy has already cost billions in a single quarter and remains genuinely unpredictable: the same hyperscalers funding NVIDIA\'s biggest forward commitments (OpenAI, Anthropic) are simultaneously funding the custom-silicon programs designed to need less of it over time, and a large share of the bullish narrative rests on letters of intent and framework agreements rather than fully executed contracts.',
    },
    sourceNote:
      'Compiled Aug 6, 2026 via live web research across stockanalysis.com, gurufocus.com, macrotrends.net, financecharts.com, CNBC, Yahoo Finance, and primary sources including NVIDIA\'s Q1 FY2027 earnings materials/8-K, its FY2026 annual report (SEC Form ARS), OpenAI/NVIDIA and Anthropic press releases, and Reuters/Forbes/Al Jazeera coverage of the OpenAI infrastructure discussions. NVDA price and market cap showed real intraday/cross-source variance in the Aug 3-5, 2026 window (a visible semiconductor-sector rally was underway across this entire peer set on those dates) and are presented as ranges rather than single points; several metrics (PEG, EV/EBITDA, operating margin) likewise showed source disagreement and are flagged inline. This is a research framework, not a live feed — cross-check current prices, multiples and the upcoming Q2 FY2027 print before acting on anything here.',
  },

  TSM: {
    ticker: 'TSM',
    name: 'Taiwan Semiconductor Manufacturing Company (ADR)',
    tagline: 'The sole leading-edge foundry every fabless AI-chip designer — NVIDIA, AMD, Apple, Broadcom, Google, Amazon — ultimately depends on, at record margins during a record capex cycle.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'TSMC does not design chips — it manufactures nearly everyone else\'s. As the world\'s dominant leading-edge foundry (2nm/3nm/5nm nodes), it sits directly between chip designers (NVIDIA, AMD, Apple, Broadcom, Google, Amazon, Qualcomm) and the equipment/materials suppliers (ASML, LRCX, AMAT, KLAC) that build its fabs. Nearly every AI accelerator sold today, regardless of which logo is on the box, is fabricated on a TSMC line. This ADR trades on the NYSE, with each ADS representing five TSMC ordinary shares listed in Taiwan (TWSE: 2330).',
      rows: [
        { level: 'Equipment (WFE) / materials', players: 'ASML, LRCX, AMAT, KLAC', position: 'Upstream suppliers — TSMC is their single largest customer for leading-edge tools', tone: 'client' },
        { level: 'Leading-edge foundry (this company)', players: 'TSMC', position: 'Core business — the dominant leading-edge foundry, an estimated majority share of global foundry revenue', tone: 'core' },
        { level: 'Trailing/mature-node foundry competitors', players: 'UMC, GlobalFoundries, SMIC (China, export-restricted)', position: 'Compete on older nodes; none currently match TSMC at 3nm/2nm volume and yield', tone: 'indirect' },
        { level: 'Integrated-device competitors', players: 'Samsung Foundry, Intel Foundry', position: 'The only two organizations attempting to compete at the leading edge, both still behind TSMC on yield/volume by most public accounts', tone: 'indirect' },
        { level: 'Fabless customers', players: 'NVIDIA, AMD, Apple, Broadcom, Qualcomm, Google, Amazon, Microsoft (custom silicon)', position: 'Direct customers — TSMC fabricates essentially every major AI accelerator design regardless of which company designed it', tone: 'client' },
        { level: 'Advanced packaging', players: 'TSMC CoWoS (in-house), Amkor, ASE (subcontracted overflow)', position: 'CoWoS capacity has been a binding constraint on AI-accelerator supply; TSMC is expanding aggressively', tone: 'growth' },
      ],
      segments: [
        'Q2 2026 revenue: $40.20B (NT$1.27 trillion), +36% YoY, at the high end of guidance',
        '2nm contributed 3% of wafer revenue in its debut quarter (Q2 2026); 3nm and 5nm combined were 63% of wafer revenue',
        'Q2 2026 gross margin: 67.7%, up 1.5 points sequentially; management has guided Q3 margin to moderate somewhat on 2nm-ramp dilution',
        'FY2026 capex guidance raised to $60-64B (from a prior $52-56B range) on what management called "stronger and stronger" AI demand',
        'FY2026 USD revenue growth outlook raised to "40%-plus" per multiple contemporaneous reports of the Q2 2026 call',
      ],
      aiShift:
        'TSMC is the physical chokepoint of the entire AI accelerator industry — NVIDIA, AMD, Broadcom\'s custom ASICs, Google\'s TPUs, Amazon\'s Trainium and Apple\'s silicon are all fabricated on TSMC lines, mostly on 3nm today with 2nm now ramping. That gives TSMC extraordinary pricing power and margin (67.7% gross in Q2 2026) even as it under-writes the industry\'s single largest capex program: a newly announced additional $100B Arizona investment brings total committed US spending to $265B across multiple leading-edge fabs (2nm and below) plus advanced-packaging facilities — a direct response to both AI-driven demand and US policy pressure to onshore capacity.',
    },
    valuation: {
      peers: ['TSM', 'INTC', 'UMC'],
      metrics: [
        { label: 'Price (ADR)', values: ['~$406–419 (Aug 3–5, 2026)', '~$100–102 (Aug 4–5, 2026)', '~$21.08 (May 27, 2026 — not refreshed to Aug in this pass)'] },
        { label: 'Market cap', values: ['~$2.15T (Aug 2026)', '~$512.5B (Aug 5, 2026)', '~$21.8B (Apr 2026 — not refreshed to Aug in this pass)'] },
        { label: 'Trailing P/E', values: ['~26.2x', 'not meaningful — Intel remains structurally unprofitable/marginal on a GAAP basis in recent periods', '~33.0x (94% above its own 10-year median per one source)'] },
        { label: 'Forward P/E', values: ['~18.4x (one source cites ~25.3x — meaningful cross-source variance, likely reflecting different estimate-update timing)', '~59.3x (described by one source as "significantly overvalued" vs. a ~27.8x semiconductor-industry median)', 'not captured in this pass'] },
        { label: 'EV/EBITDA', values: ['~17.8–18.0x', 'not captured', 'not captured'] },
        { label: 'Gross margin', values: ['67.7% (Q2 2026)', 'materially lower — Intel Foundry remains loss-making; consolidated figure not captured in this pass', 'not captured'] },
        { label: 'Net margin', values: ['55.6% (Q2 2026)', 'not captured (recent net results have been volatile/near breakeven at points)', 'not captured'] },
        { label: 'ROE', values: ['45.9% (Q2 2026), up from 40.5% in Q1 2026', 'not captured', 'not captured'] },
        { label: 'Beta', values: ['~1.25–1.39 (source variance)', 'not captured', 'not captured'] },
        { label: 'Dividend yield', values: ['~0.91–0.99% (source variance); TTM dividends per ADR ~$3.34', 'not captured', 'not captured'] },
        { label: 'Revenue growth YoY', values: ['+36% (Q2 2026, USD)', 'roughly flat to modestly positive per recent quarters — not independently captured this pass', 'not captured'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'A forward P/E in the high-teens to mid-20s (depending on source) for a company growing revenue ~36-40%+ with 67.7% gross margins and 45.9% ROE is not an obviously rich multiple relative to the growth and quality on offer',
        'Genuine cross-source disagreement on the forward P/E (as low as ~18.4x, as high as ~25.3x) likely reflects the pace at which analyst estimates are being revised upward mid-cycle — treat any single figure as directional',
        'TSMC is priced far more conservatively than the fabless AI names (NVDA, AVGO) it manufactures for, despite arguably having the least substitutable position in the entire chain — the closest thing to a structural chokepoint that exists in AI hardware',
        'Intel and UMC are shown here as the closest listed foundry comparables, but neither is currently a credible leading-edge competitor at scale — Samsung Foundry, the other real leading-edge competitor, is not separately listed and is omitted rather than approximated with an unreliable proxy',
      ],
      justifiedIf: [
        'The raised FY2026 capex ($60-64B) and revenue growth ("40%-plus") guidance holds through the back half of the year as the 2nm ramp scales',
        'CoWoS advanced-packaging capacity expansion keeps pace with AI-accelerator demand rather than becoming a fresh bottleneck',
        'The $265B cumulative US (Arizona) investment executes on schedule without diluting margins below the current ~67-68% gross level',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$320 – $360', rationale: 'A meaningful pullback from the current ~$406–419 range, closer to where the stock traded before the sharpest leg of the 2026 AI-capex re-rating' },
        { tier: 'acceptable', range: '$360 – $420', rationale: 'Brackets the current trading range' },
        { tier: 'expensive', range: '> $450', rationale: 'Would push the forward multiple well past the current already-uncertain 18-25x range without a corresponding guidance raise' },
      ],
      technical: [
        'Aug 3, 2026 close $406.11; Aug 5, 2026 close $414.00 (down $3.17/-0.76% that session) — both figures from the same research window, illustrating normal day-to-day movement rather than a data conflict',
        '52-week and all-time-high figures were not independently reconciled in this pass — treat any single cited level with caution',
        'Q2 2026 earnings (reported mid-July 2026) were the last confirmed print in this research window; delivered record profit and the raised capex/revenue guidance summarized above',
      ],
      scenarios: [
        { label: 'BASE', prob: 45, note: 'FY2026 growth tracks the raised "40%-plus" guide, 2nm ramps without a margin air-pocket beyond the flagged Q3 moderation — grinds toward $440–480 over 12-18 months.' },
        { label: 'BULL', prob: 25, note: 'AI-accelerator demand pulls CoWoS and 2nm capacity utilization even higher, pricing power improves further, the Arizona buildout de-risks US policy exposure — a push toward $520–560.' },
        { label: 'BEAR', prob: 30, note: 'A China/Taiwan geopolitical shock, an AI-capex digestion cycle across NVIDIA/AMD/hyperscaler customers, or a 2nm yield/margin disappointment resets the multiple — retests $280–320.' },
      ],
      horizon: '12–24 months',
      invalidation: 'Weekly close below $280 (structure break) or a confirmed, material disruption to Taiwan-based fab operations',
    },
    risks: [
      { risk: 'Taiwan geopolitical risk', severity: 'high', note: 'The large majority of TSMC\'s leading-edge capacity remains concentrated in Taiwan; a cross-strait crisis is a low-probability but existential risk that no amount of diversification (Arizona, Japan, Germany) fully offsets in the near term.' },
      { risk: 'Customer concentration in AI-accelerator demand', severity: 'medium', note: 'A large and growing share of incremental revenue is tied to a handful of AI-accelerator customers (NVIDIA chief among them) — a slowdown in hyperscaler AI capex would hit TSMC\'s growth rate directly, even though its customer base is broader than any single fabless designer\'s.' },
      { risk: 'Execution risk on the 2nm ramp and margin trajectory', severity: 'medium', note: 'Management itself has flagged Q3 2026 gross-margin moderation tied to 2nm ramp costs — new-node ramps are historically where foundry margin surprises (in either direction) tend to show up.' },
      { risk: 'US/Taiwan policy and tariff exposure', severity: 'medium', note: 'The $265B cumulative US investment commitment reflects real policy pressure (CHIPS Act era incentives, tariff threats, "onshoring" pressure) as much as pure demand economics — a shift in US trade or industrial policy could alter the economics of that buildout.' },
      { risk: 'Competitive catch-up at the leading edge', severity: 'low', note: 'Samsung Foundry and Intel Foundry are both explicitly trying to compete at 2nm and below; neither has yet matched TSMC on yield/volume by most public accounts, but both are large, well-capitalized competitors with government backing in their home markets.' },
      { risk: 'ADR/currency and reporting structure', severity: 'low', note: 'As a Taiwan-domiciled company reporting via 6-K filings with an ADR structure (1 ADS = 5 ordinary shares), US investors carry incremental currency, listing-structure and disclosure-timing considerations relative to US-domiciled semiconductor peers.' },
    ],
    backlog: {
      visibility: [
        'FY2026 capex guidance raised to $60-64B (from $52-56B)',
        'FY2026 USD revenue growth outlook raised to "40%-plus" per multiple contemporaneous reports of the Q2 2026 earnings call',
        '2nm node ramping (3% of Q2 2026 wafer revenue in its debut quarter) with further ramp guided through 2H 2026',
        'Cumulative committed US investment raised to $265B across multiple Arizona fabs (2nm and below) plus advanced-packaging facilities',
      ],
      wins: [
        'Record Q2 2026 profit on 36% YoY USD revenue growth and 67.7% gross margin',
        'Additional $100B Arizona investment announced on top of prior commitments',
        '2nm customer demand described by management as "stronger and stronger"',
        'Continued CoWoS advanced-packaging capacity expansion to relieve what has been an industry-wide AI-accelerator supply bottleneck',
      ],
      clients: ['NVIDIA', 'AMD', 'Apple', 'Broadcom', 'Qualcomm', 'Google', 'Amazon'],
      suppliers: ['ASML (EUV/DUV lithography)', 'Lam Research, Applied Materials, KLA (etch/deposition/inspection)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 5, note: 'The closest thing to an irreplaceable chokepoint in the entire AI hardware chain — every major fabless AI-chip designer ultimately depends on TSMC leading-edge capacity.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Indirect but comprehensive — TSMC captures AI-driven demand from every fabless customer simultaneously, rather than betting on any single accelerator architecture winning.' },
        { criterion: 'Valuation', stars: 4, note: 'A high-teens to mid-20s forward P/E for ~36%+ revenue growth and 67.7% gross margins is a reasonable, arguably conservative, multiple relative to comparable AI-infrastructure names.' },
        { criterion: 'Risk', stars: 3, note: 'Taiwan geopolitical risk is real, low-probability-but-high-severity, and structurally undiversifiable in the near term regardless of the Arizona buildout.' },
        { criterion: 'Entry timing', stars: 3, note: 'Trading within a normal-looking recent range as of Aug 2026 — not deeply discounted, not obviously stretched either.' },
      ],
      readLabel: 'STRUCTURAL CHOKEPOINT, PRICED MORE CONSERVATIVELY THAN ITS CUSTOMERS',
      summary:
        'TSMC captures AI-driven semiconductor demand more comprehensively than any single fabless designer, because it manufactures for nearly all of them at once — NVIDIA, AMD, Broadcom\'s custom ASICs, Google\'s TPUs and Apple\'s silicon all run through the same leading-edge lines. Record Q2 2026 profitability, a raised "40%-plus" revenue growth outlook, and a forward multiple that trades at a real discount to its largest fabless customers make the valuation case straightforward. The risk that does not show up in any multiple is geopolitical: TSMC\'s capacity remains overwhelmingly concentrated in Taiwan, and no amount of Arizona/Japan/Germany diversification changes that fact within this decade.',
    },
    sourceNote:
      'Compiled Aug 6, 2026 via live web research across stockanalysis.com, gurufocus.com, macrotrends.net, dividendmax.com/dividend.com, CNBC, and primary sources including TSMC\'s Q1 and Q2 2026 Form 6-K filings (SEC), and contemporaneous coverage from Yahoo Finance, BigGo Finance, VanEck and XenoSpectrum of the July 2026 Q2 earnings call. Cross-source variance was material on several figures — TSM forward P/E ranged from ~18.4x to ~25.3x, and INTC/UMC price and market-cap figures were pulled from slightly different dates within the research window (UMC in particular reflects a May 2026 snapshot, not independently refreshed to Aug 2026) — treat those as directional. This is a research framework, not a live feed — cross-check current prices, multiples and guidance before acting on anything here.',
  },

  AVGO: {
    ticker: 'AVGO',
    name: 'Broadcom Inc.',
    tagline: 'One of only two companies hyperscalers trust to co-design custom AI accelerators at scale, with a $73B AI backlog and named programs for Google, Meta, OpenAI and Anthropic — plus the merchant networking silicon that ties AI clusters together.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Broadcom spans custom AI silicon (XPU/ASIC co-design for hyperscalers), data-center networking/switching (Tomahawk, Jericho), and — since the 2023 acquisition — enterprise infrastructure software via VMware. Along with Marvell, it controls an estimated large majority of the custom AI-ASIC co-design market: the segment building ground-up custom accelerators (Google TPU, Meta MTIA, and now disclosed programs for OpenAI and Anthropic) that compete directly with NVIDIA merchant GPUs for hyperscaler training and inference budgets.',
      rows: [
        { level: 'Fabrication (front-end)', players: 'TSMC', position: 'Broadcom is fabless — no fab, and shares TSMC leading-edge/CoWoS capacity with NVIDIA, AMD and every other AI-chip designer', tone: 'client' },
        { level: 'Custom AI silicon (ASIC co-design, this company)', players: 'Broadcom, Marvell (~two-company majority of the market)', position: 'Core business — six disclosed hyperscale custom-silicon customers including Google, Meta, Anthropic and OpenAI, plus two unnamed', tone: 'core' },
        { level: 'Networking / switching', players: 'Broadcom (Tomahawk, Jericho), Marvell, Cisco', position: 'Merchant switch silicon connecting AI GPU/accelerator clusters — a direct beneficiary of scale-out AI infrastructure regardless of which accelerator wins', tone: 'core' },
        { level: 'Enterprise infrastructure software', players: 'VMware (Broadcom-owned)', position: 'Non-AI legacy/adjacent business — a source of the "VMware warning" investors watch each quarter as software growth normalizes post-acquisition', tone: 'none' },
        { level: 'Hyperscaler / AI-lab customers', players: 'Google, Meta, Anthropic, OpenAI, plus two undisclosed', position: 'Direct, named co-design customers — OpenAI\'s first-generation XPU targeted for volume deployment in 2027 at over 1GW of capacity', tone: 'core' },
        { level: 'Advanced packaging', players: 'TSMC CoWoS, ASE, Amkor', position: 'Indirect exposure via custom-silicon and networking-chip volume', tone: 'indirect' },
      ],
      segments: [
        'AI semiconductor revenue: guided to $16B in Q3 FY2026, up more than 200% YoY',
        'FY2026 full-year AI semiconductor revenue guided to ~$56B, roughly 180% growth over FY2025, per the June 3, 2026 earnings call',
        'FY2027 target: more than $100B in AI chip revenue, per management commentary',
        'Q3 FY2026 consolidated revenue guided to ~$29.4B, +84% YoY, with non-GAAP operating margin guided stable around 67%',
        'Q3 FY2026 earnings scheduled for September 2, 2026, after market close',
      ],
      aiShift:
        'Broadcom has built the single largest disclosed forward order book of any AI-semiconductor company outside NVIDIA: a $73B AI backlog — larger than Broadcom\'s entire FY2025 revenue base — with delivery scheduled over roughly the next 18 months. Custom AI accelerators are now being developed for six hyperscale customers (Google, Meta, Anthropic and OpenAI disclosed by name, plus two undisclosed), each on an 18-24 month design cycle tied to that customer\'s specific model architecture. The most significant recent development is the expanded three-way Anthropic/Google/Broadcom agreement for roughly 3.5GW of next-generation Google TPU capacity coming online from 2027 (on top of 1GW already deploying in 2026) — a structural validation that at least one frontier AI lab now sources meaningfully from custom Broadcom-fabricated silicon rather than merchant GPUs alone.',
    },
    valuation: {
      peers: ['AVGO', 'NVDA', 'MRVL', 'AMD'],
      metrics: [
        { label: 'Price', values: ['~$392–421 (Aug 3–5, 2026; a same-window rally visible across the whole AI-semiconductor peer set)', '~$212–219 (Aug 3–5, 2026)', '~$210–222 (Aug 5, 2026, intraday range)', '$518.58 (Aug 4, 2026)'] },
        { label: 'Market cap', values: ['~$1.87–1.99T (Aug 2026, cross-source variance); crossed $2T briefly in April 2026 per one source', '~$5.1–5.3T (Aug 2026)', '~$168–222B (wide cross-source variance)', '$790.25B (Aug 3, 2026)'] },
        { label: 'Forward P/E', values: ['~19.4x (one source cites ~24.2x — cross-source variance)', '~20.7x', '~56.7x (one source cites trailing P/E of ~66.2x)', '49.16x'] },
        { label: 'P/S (forward)', values: ['~15.9–17.2x (source variance)', '~15–17x', '22.4x (TTM)', '21.25x'] },
        { label: 'EV/EBITDA', values: ['~44.2x (with EV/FCF cited at ~56.0x by one source)', '~27–30x', 'not captured', 'not captured'] },
        { label: 'Gross margin', values: ['68.35% (TTM)', '74.15%', '51.5%', '52.8% (Q1 2026)'] },
        { label: 'Net margin', values: ['38.85% (Apr 2026); another source cites 41.96%', '~63.0% (elevated by equity-security gains)', 'not captured', '13.5% (Q1 2026)'] },
        { label: 'ROE', values: ['37.28%', '~114–132%', 'not captured', 'not captured'] },
        { label: 'Beta', values: ['~1.47', '~2.2', '~2.20', 'not captured'] },
        { label: 'Dividend yield', values: ['~0.62%', '~0.47%', '~0.12%', 'not captured'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'A forward P/E around 19-24x for a company guiding AI semiconductor revenue up ~180% for the full year and targeting >$100B of AI chip revenue in FY2027 is a materially cheaper multiple than most other named AI-infrastructure plays in this peer set',
        'EV/EBITDA (~44x) and EV/FCF (~56x) tell a richer story than the P/E alone — VMware\'s software cash flows and amortization from the acquisition complicate a clean read, and this gap between "cheap on P/E" and "rich on EV/EBITDA" is worth sitting with rather than resolving in either direction',
        'Gross margin (68.35%) sits between AMD\'s (52.8%) and NVIDIA\'s (74.15%), reflecting a genuine mix of high-margin custom-silicon IP licensing and lower-margin networking/software revenue',
        'The stock has shown real single-day volatility within this research window (a multi-percent move visible Aug 3-5, 2026 across the whole peer set) — any single price/market-cap figure here should be read as a snapshot, not a stable level',
      ],
      justifiedIf: [
        'The $73B AI backlog converts to delivered, recognized revenue on the guided ~18-month schedule',
        'FY2026 full-year AI semiconductor revenue lands at or above the ~$56B guide, and FY2027 tracks toward the >$100B target',
        'Broadcom and Marvell maintain their combined majority share of custom AI-ASIC co-design against any new entrants, and no named hyperscaler customer (Google, Meta, Anthropic, OpenAI) pulls back or in-sources a program',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$300 – $340', rationale: 'A meaningful pullback from the current ~$392–421 range, closer to where the stock traded before the sharpest 2026 AI-backlog-driven re-rating' },
        { tier: 'acceptable', range: '$340 – $420', rationale: 'Brackets the current trading range, below the reported June 2026 closing all-time high' },
        { tier: 'expensive', range: '> $480', rationale: 'Approaches or exceeds the reported 52-week high of $495 and June 2026 closing ATH of $480.77 — priced for flawless execution on the $73B backlog' },
      ],
      technical: [
        'Reported all-time closing high $480.77 (June 2, 2026); 52-week high cited at $495.00 by one source (~26% above an Aug 3, 2026 close of $392.23)',
        'Aug 3, 2026 close $392.23; a subsequent same-window quote near $421.38 (+5.26%) suggests a sharp rally into Aug 5-6, 2026, consistent with the broader semiconductor-sector move visible in this peer set — treat the exact current level as a moving target, not a fixed number',
        'Stock fell on the June 3, 2026 Q2 FY2026 print despite AI revenue doubling, driven by softer software/VMware commentary — a reminder that the market has been discriminating between the AI-silicon and legacy-software halves of the business',
        'Q3 FY2026 earnings scheduled for September 2, 2026, after market close',
      ],
      scenarios: [
        { label: 'BASE', prob: 40, note: 'FY2026 AI semiconductor revenue lands near the ~$56B guide, the $73B backlog converts on schedule, VMware growth stabilizes — grinds toward $450–500 over 12-18 months.' },
        { label: 'BULL', prob: 30, note: 'OpenAI\'s 2027 XPU deployment and the expanded Anthropic/Google TPU capacity pull forward faster than guided, additional named hyperscaler wins are disclosed — a push toward $550–650.' },
        { label: 'BEAR', prob: 30, note: 'A named hyperscaler customer pulls back or delays a custom-silicon program, VMware growth disappoints again, or AI capex broadly digests after 2026\'s surge — retests $260–300.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $260 (giving back most of the 2026 AI-backlog re-rating) or a disclosed cancellation/delay of a named hyperscaler custom-silicon program',
    },
    risks: [
      { risk: 'Hyperscaler/named-customer concentration', severity: 'high', note: 'The disclosed custom-silicon customer base is six names (four disclosed: Google, Meta, Anthropic, OpenAI), each on a single, long design cycle per generation — losing or seeing any one program in-sourced or delayed is a multi-billion-dollar swing given the $73B backlog is concentrated across so few relationships.' },
      { risk: 'NVIDIA merchant-GPU competition for the same budgets', severity: 'high', note: 'Broadcom\'s entire custom-ASIC thesis depends on hyperscalers continuing to allocate a growing share of AI capex to purpose-built silicon instead of NVIDIA GPUs — a strategy reversal at any major customer would hit the backlog conversion story directly.' },
      { risk: 'Marvell competitive overlap', severity: 'medium', note: 'Broadcom and Marvell together dominate custom AI-ASIC co-design; any given hyperscaler program going to Marvell instead of Broadcom (or vice versa) is close to a zero-sum outcome between the two.' },
      { risk: 'VMware/software segment growth deceleration', severity: 'medium', note: 'The June 2026 stock reaction to softer software commentary alongside doubling AI revenue shows the market is actively discounting the non-AI half of the business — a real, recurring source of quarter-to-quarter volatility.' },
      { risk: 'Valuation gap between P/E and EV/EBITDA', severity: 'medium', note: 'A forward P/E near 19-24x looks reasonable, but EV/EBITDA near 44x and EV/FCF near 56x suggest debt, amortization from the VMware deal, and cash-flow timing complicate a simple "cheap" read — worth independently modeling rather than relying on any single multiple.' },
      { risk: 'AI-capex cyclicality', severity: 'medium', note: 'Both the custom-silicon and networking segments are directly levered to hyperscaler AI infrastructure capex, which remains at historically elevated levels across this entire peer set.' },
    ],
    backlog: {
      visibility: [
        '$73B AI backlog, larger than Broadcom\'s entire FY2025 revenue base, with delivery guided over roughly the next 18 months',
        'FY2026 AI semiconductor revenue guided to ~$56B (~180% YoY growth); Q3 FY2026 AI semiconductor revenue guided to $16B (+200%+ YoY)',
        'FY2027 target of more than $100B in AI chip revenue per management commentary',
        'Q3 FY2026 consolidated revenue guided to ~$29.4B (+84% YoY); earnings scheduled September 2, 2026',
      ],
      wins: [
        'Custom AI accelerator programs disclosed for six hyperscale customers: Google, Meta, Anthropic, OpenAI (named) plus two undisclosed',
        'OpenAI\'s first-generation XPU slated for volume deployment in 2027 at over 1GW of capacity',
        'Expanded three-way Anthropic/Google/Broadcom agreement for ~3.5GW of next-generation Google TPU capacity coming online from 2027, on top of 1GW already deploying in 2026',
        'Each custom-silicon program engineered to one customer\'s specific model architecture over an 18-24 month design cycle — a structurally sticky, long-duration relationship once won',
      ],
      clients: ['Google', 'Meta', 'Anthropic', 'OpenAI', 'two undisclosed hyperscale customers'],
      suppliers: ['TSMC (fabless manufacturing, advanced packaging)'],
    },
    synthesis: {
      scores: [
        { criterion: 'AI infrastructure theme', stars: 5, note: 'One of only two companies (with Marvell) trusted by hyperscalers to co-design ground-up custom AI silicon at scale, now with a $73B backlog and named programs at four of the industry\'s most important AI labs/hyperscalers.' },
        { criterion: 'Growth', stars: 5, note: 'AI semiconductor revenue guided up ~180% for FY2026 and targeted above $100B for FY2027 — among the fastest disclosed growth rates of any large-cap AI-infrastructure name.' },
        { criterion: 'Profitability', stars: 4, note: '68.35% gross margin and strong ROE (37.28%), though EV/EBITDA and EV/FCF multiples run richer than the P/E alone would suggest, reflecting VMware-related debt and amortization.' },
        { criterion: 'Valuation', stars: 4, note: 'Forward P/E in the high-teens to mid-20s is cheap relative to the growth rate and to most named peers in this set, though the EV-based multiples argue for more caution than the P/E alone implies.' },
        { criterion: 'Risk', stars: 3, note: 'Concentration in a handful of named hyperscaler relationships, direct competition with NVIDIA for the same AI-capex dollars, and a persistently volatile VMware/software narrative are all real, quantified risks.' },
      ],
      readLabel: 'THE CUSTOM-SILICON DUOPOLY LEADER, WITH THE LARGEST DISCLOSED AI BACKLOG OUTSIDE NVIDIA',
      summary:
        'Broadcom has converted its custom-ASIC co-design relationships into the most concrete, dollar-quantified forward order book of any AI-semiconductor company outside NVIDIA — a $73B backlog, named programs at Google, Meta, Anthropic and OpenAI, and a credible path to over $100B of AI chip revenue in FY2027. The multiple on offer (forward P/E in the high-teens to mid-20s) looks genuinely reasonable for that growth. The two things worth watching closely are the same two that have already moved the stock in 2026: whether VMware/software growth stabilizes rather than becoming a recurring drag on an otherwise excellent AI print, and whether the EV/EBITDA-EV/FCF multiples (both meaningfully richer than the P/E) reflect debt and amortization dynamics that matter more than the headline earnings multiple suggests.',
    },
    sourceNote:
      'Compiled Aug 6, 2026 via live web research across stockanalysis.com, gurufocus.com, macrotrends.net, CNBC, and primary/near-primary sources including Broadcom\'s Q2 FY2026 earnings release and call transcript (June 3, 2026), its Q3 FY2026 earnings-date announcement (broadcom.com, Sept 2, 2026), Anthropic\'s own press release on the expanded Google/Broadcom TPU partnership, and contemporaneous coverage from Investing.com, Benzinga, CNBC, Qz and the Futurum Group. Price and market-cap figures showed real intraday/cross-source variance in the Aug 3-5, 2026 window (a visible semiconductor-sector rally was underway across this entire peer set on those dates); EV/EBITDA vs. forward-P/E showed a wide enough gap to flag explicitly rather than resolve. This is a research framework, not a live feed — cross-check current prices, multiples and the Sept 2, 2026 Q3 print before acting on anything here.',
  },
}
