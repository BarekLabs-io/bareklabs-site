/* Batch add: MSFT, GOOGL, META — three of the most important names in the AI
 * value chain's cloud/models/apps layer, previously missing a deep-dive entry
 * despite being referenced throughout the site (AI Value Chain constellation,
 * and as a named client/counterparty in numerous other companies' entries —
 * e.g. LRCX, ASML, AMD, Marvell, Nebius, CoreWeave). Written as a standalone
 * file to avoid merge conflicts with parallel batches editing companies.ts;
 * merge into companies.ts by spreading this object in.
 *
 * Research pass: web search + fetch, compiled 2026.08.06 (in-universe "today").
 * Many primary data aggregators (stockanalysis.com, macrotrends.net, wsj.com,
 * cnbc.com, companiesmarketcap.com) returned HTTP 403 to direct fetch during
 * this pass; figures below are therefore drawn from search-engine-summarized
 * snapshots of those same aggregators (plus company IR pages, SEC filings and
 * financial press where fetchable), not a single verified terminal feed.
 * Cross-aggregator figures disagreed meaningfully on several multiples
 * (trailing/forward P/E, EV/EBITDA, P/S) — see each sourceNote for specifics.
 * Treat every multiple here as directional, and cross-check before acting. */

import type { Company } from './companies'

export const companiesBatch: Record<string, Company> = {
  MSFT: {
    ticker: 'MSFT',
    name: 'Microsoft',
    tagline: 'Azure AI capacity plus the enterprise distribution channel for copilots — the hyperscaler with the deepest enterprise moat and the messiest AI-lab partnership.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Microsoft sits at the cloud-and-apps layer of the AI value chain: it buys silicon from NVIDIA and AMD (plus a small, still-nascent in-house Maia accelerator program), turns it into Azure compute, and monetizes that compute twice — once as raw cloud capacity, once as Copilot seats layered on top of Microsoft 365 and GitHub. Its OpenAI relationship, restructured in April 2026, is no longer exclusive but remains the single largest strategic dependency in the stack.',
      rows: [
        { level: 'Silicon / AI accelerators', players: 'NVIDIA, AMD, Microsoft Maia (in-house, still small-scale)', position: 'Buyer at massive scale; in-house ASIC program immature vs. Amazon Trainium or Google TPU', tone: 'client' },
        { level: 'Cloud infrastructure (hyperscale)', players: 'Microsoft Azure, AWS, Google Cloud, Oracle', position: 'Core business — Azure crossed $100B annualized revenue in FY2026 (+41% for the full year)', tone: 'core' },
        { level: 'Foundation models', players: 'OpenAI (GPT), Microsoft in-house (Phi, MAI), Anthropic (Azure marketplace)', position: 'Anchor investor (~27% of OpenAI Group PBC) and primary — no longer exclusive — cloud partner', tone: 'core' },
        { level: 'Enterprise apps / distribution', players: 'Microsoft 365 Copilot, GitHub Copilot, Dynamics 365', position: 'Core business — 30M+ paid Copilot seats, net adds accelerating', tone: 'core' },
        { level: 'AI datacenter capacity (external)', players: 'Nebius, CoreWeave, other neoclouds', position: 'Direct capacity buyer on top of owned build-out — Nebius alone is a $17.4–19.4B, 5-year GPU capacity deal', tone: 'client' },
      ],
      segments: [
        'Intelligent Cloud (Azure + server products): the growth engine — Azure/other cloud services +43% YoY in Q4 FY2026, crossing $100B in annualized revenue for the first time',
        'Productivity & Business Processes (Microsoft 365, Copilot, Dynamics, LinkedIn): the monetization layer for AI features — Microsoft 365 Copilot passed 30M paid seats in Q4 FY2026, with net paid-seat additions more than doubling sequentially',
        'More Personal Computing (Windows, Xbox, Search/Bing/Copilot consumer): smallest AI-growth lever of the three segments',
      ],
      aiShift:
        'Microsoft is monetizing AI on two fronts simultaneously: as an infrastructure landlord (Azure capacity, increasingly capacity-constrained and rationed toward the highest-value workloads) and as a software-seat vendor (Copilot embedded across the Office/GitHub/Dynamics stack). The April 2026 restructuring of the OpenAI partnership ended Microsoft\'s cloud exclusivity — OpenAI can now run on any cloud — but locked in an incremental commercial commitment from OpenAI to Azure reported at roughly $250B through 2030, "independent of OpenAI\'s technology progress." That trade (less exclusivity, more contracted revenue) is the central strategic bet embedded in the stock right now.',
    },
    valuation: {
      peers: ['MSFT', 'GOOGL', 'META', 'AMZN'],
      metrics: [
        { label: 'Price', values: ['$487.46 (Aug 6, 2026)', '$360.13 (Aug 5–6, 2026, post-selloff)', '$566.91 (Aug 6, 2026)', '$277.42 (Aug 4, 2026)'] },
        { label: 'Market cap', values: ['~$3.62T', '~$4.3–4.4T (aggregators disagree, $4.34–4.59T range)', '~$1.43–1.5T', '~$3.0T'] },
        { label: 'Trailing P/E', values: ['~27.2–27.5x', '~18.2–18.9x (see note — GAAP-earnings distorted)', '~22.2x', '~22.0x'] },
        { label: 'Forward P/E', values: ['~25.1–25.9x', '~27.5–27.9x', '~17.0–17.3x', '~24.5–31x (wide aggregator spread)'] },
        { label: 'P/S (TTM)', values: ['~10.9x (computed: mcap/$331.8B FY26 revenue; aggregators range 7.9–11.1x)', '~9.8–10.2x', '~6.6x', '~4.3x (computed, approximate)'] },
        { label: 'P/B', values: ['~11.7x (last verified ~Nov 2025, not refreshed to Aug price)', '~10.3–10.5x (last verified ~Jan 2026, likely higher now)', '~6.6x (computed from ROE/net income, not directly sourced)', '—'] },
        { label: 'EV/EBITDA', values: ['~19.1x', '~24–26x (one source: 17.6x — methodology unclear, flagged)', '~13.1x (looks low vs. P/E; not independently verified)', '—'] },
        { label: 'PEG (trailing)', values: ['~1.3x (sources range 0.76–1.6x)', '~1.0x (sources range 0.55–2.0x)', '0.82', '1.46'] },
        { label: 'ROE', values: ['34.0%', '48.7%', '29.9%', '—'] },
        { label: 'Net margin', values: ['~39% (approx., FY2026)', '54.8% TTM — inflated by unrealized equity-investment gains, see note', '29.8% TTM', '—'] },
        { label: 'Gross margin', values: ['67.9% (FY2026)', '60.9%', '81.8%', '50.8%'] },
        { label: 'Operating margin', values: ['46.8% (FY2026)', '33.1%', '~31% (Q2 2026 GAAP, compressed by $2.4B legal + $1.18B severance charges)', '12.1%'] },
        { label: 'Beta', values: ['1.13', '1.25', '~1.25 (approximate)', '1.45'] },
        { label: 'Dividend yield', values: ['0.74%', '0.23%', '0.38%', '0% (no dividend)'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'Forward P/E of ~25.5x is not extreme for a business posting 40%+ Azure growth and 30M+ Copilot seats, but it is a premium to Alphabet\'s headline (GAAP-distorted) trailing multiple and roughly in line with Alphabet\'s cleaner forward P/E',
        'Net margin (~39%) and operating margin (46.8%) are best-in-class among the three, reflecting the software/services mix — but free cash flow fell as capex hit a record $41B in the quarter',
        'The OpenAI restructuring is a genuine two-sided trade: Microsoft gave up cloud exclusivity but locked in a large multi-year Azure purchase commitment from OpenAI — the market has not fully resolved whether that net favors Microsoft',
      ],
      justifiedIf: [
        'Azure growth holds near the guided ~45% constant-currency range and Copilot seat growth keeps compounding off the 30M base',
        'OpenAI\'s ~$250B Azure commitment draws down roughly on schedule despite the loss of exclusivity',
        'Capex intensity (record $41B in Q4 FY2026, guided higher for FY2027) is matched by AI-monetization revenue rather than eroding free cash flow further',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$410 – $440', rationale: 'Mid-recovery zone between the 52-week low ($349.20) and current price, ~10–16% below spot' },
        { tier: 'acceptable', range: '$440 – $500', rationale: 'Current zone — post-earnings-pop consolidation, defensible but not a gift' },
        { tier: 'expensive', range: '>$540', rationale: 'Approaches the Oct 28, 2025 all-time-high close of $541.06 — forward P/E would push toward 29x+' },
      ],
      technical: [
        'ATH close $541.06 (Oct 28, 2025); current $487.46 is a ~9.9% pullback from that peak',
        '52-week range: $349.20 (low, Jun 25, 2026) – $553.72 (high, Oct 28, 2025)',
        'Current price is ~39.6% above the 52-week low, most of that recovered after the Jul 29, 2026 FY26 Q4 earnings beat triggered a ~15% single-day jump',
        'Average analyst target clusters $563–$592 across polled cohorts (56–97 analysts depending on source); high target $870, low target $400',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'Azure growth holds near the ~45% cc guide, Copilot seat growth compounds, OpenAI\'s Azure commitments draw down on schedule — grinds toward the $563–592 consensus range over 12–18 months.' },
        { label: 'BULL', prob: 25, note: 'Enterprise Copilot monetization inflects faster than modeled and Azure reaccelerates past guidance — pushes toward the $700–870 high-end targets.' },
        { label: 'BEAR', prob: 25, note: 'AI capex fails to show a clean ROI, free-cash-flow compression continues, or OpenAI meaningfully diversifies spend away from Azure now that exclusivity is gone — retests the $400–440 low-end target zone.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $400 (breach of the low-end analyst target cluster and a structural break)',
    },
    risks: [
      { risk: 'Capex intensity vs. monetization', severity: 'high', note: 'Record $41B quarterly capex (roughly two-thirds short-lived assets like GPUs/CPUs) and free cash flow already down 23% YoY; FY2027 capex guided higher again. The stock is pricing continued AI-monetization follow-through, not just cloud growth.' },
      { risk: 'OpenAI relationship reset', severity: 'medium', note: 'The April 2026 restructuring ended Azure exclusivity — OpenAI can now deploy on any cloud (it is already pursuing the $500B Stargate build with Oracle/SoftBank). Microsoft keeps a ~27% equity stake and a reported ~$250B minimum Azure purchase commitment through 2030, but the captive-compute advantage is gone.' },
      { risk: 'Cloud AI competitive intensity', severity: 'medium', note: 'Google Cloud grew 82% YoY in Q2 2026 (from a smaller base) versus Azure\'s 43% — the growth-rate gap matters even if Azure\'s absolute base is larger. AWS and neoclouds add further GPU-capacity competition.' },
      { risk: 'Free cash flow / margin trajectory', severity: 'medium', note: 'Rising depreciation from the AI buildout and continued heavy capex could compress margins faster than Copilot/Azure AI revenue offsets it — a dynamic every hyperscaler now shares.' },
      { risk: 'GPU/silicon supplier dependence', severity: 'low', note: 'Maia (in-house AI accelerator) remains small-scale versus Amazon Trainium or Google TPU; Microsoft is still overwhelmingly reliant on NVIDIA and, secondarily, AMD.' },
      { risk: 'Valuation', severity: 'medium', note: 'Forward P/E ~25.5x leaves limited room for a Copilot-monetization or Azure-growth disappointment, though it is not stretched relative to the growth on offer.' },
      { risk: 'Regulatory', severity: 'low', note: 'Materially less exposed than Google or Meta on structural antitrust this cycle, though EU/DOJ scrutiny of Teams/Copilot bundling persists as a background risk.' },
    ],
    backlog: {
      visibility: [
        'FY2026 (ended Jun 30, 2026) total revenue $331.8B, +18% YoY; Q4 FY2026 revenue $90B, +18% YoY, beating the ~$87.6B consensus',
        'Azure and other cloud services +43% YoY in Q4, crossing $100B in annualized revenue for the first time; full-year Azure revenue +41%',
        'Q4 FY2026 GAAP net income $35.8B, +31% YoY; adjusted EPS $4.74 vs. ~$4.24 consensus',
        'Record Q4 capital spending of ~$41B, about two-thirds on short-lived assets (GPUs/CPUs); FY2027 capex guided to grow further, with one analyst estimate citing a $255–260B range (not confirmed company guidance — treat as an estimate)',
        'Management guides Azure growth of ~45% in constant currency for the next quarter',
      ],
      wins: [
        'Restructured OpenAI partnership (Apr 27, 2026): non-exclusive cloud arrangement, Microsoft retains ~27% stake in OpenAI Group PBC (valued ~$135B as of the Oct 2025 agreement) and a reported ~$250B minimum Azure purchase commitment from OpenAI through 2030',
        'Microsoft 365 Copilot passed 30M paid seats in Q4 FY2026, with net paid-seat additions more than doubling sequentially',
        'Nebius five-year GPU-capacity deal worth $17.4B (up to $19.4B with the option), anchored by a new Vineland, NJ datacenter',
        'GitHub Copilot and Dynamics 365 Copilot continuing to layer AI monetization onto the existing enterprise installed base',
      ],
      clients: ['Broad Microsoft 365 / Azure enterprise customer base', 'OpenAI (Azure capacity purchaser + equity partner)'],
      suppliers: ['NVIDIA (primary GPU supplier)', 'AMD (secondary GPU supplier)', 'Nebius (leased GPU capacity, $17.4–19.4B contract)', 'TSMC (Maia fabrication)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 5, note: 'Best-in-class margins among the three (46.8% operating margin), a genuine enterprise distribution moat via Microsoft 365/GitHub, and now a $100B+ annualized Azure business.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Azure is capacity-constrained by demand, not lack of it; Copilot seat growth is accelerating; OpenAI remains the largest single AI-lab relationship in the industry even post-restructuring.' },
        { criterion: 'Valuation', stars: 3, note: 'Forward P/E ~25.5x is reasonable for the growth, not cheap — leaves limited room for disappointment.' },
        { criterion: 'Risk', stars: 4, note: 'Lower structural/regulatory risk than Google or Meta; the main open question is whether record capex converts to durable AI revenue.' },
        { criterion: 'Entry timing', stars: 3, note: 'A ~10% pullback from the all-time-high close is a reasonable, not exceptional, entry point after a sharp post-earnings run.' },
      ],
      readLabel: 'CONSTRUCTIVE — HIGHEST QUALITY, NOT THE CHEAPEST',
      summary:
        'Microsoft is the most balanced of the three names here: real enterprise distribution (Copilot), real infrastructure scarcity value (Azure), and the deepest AI-lab relationship in the industry, even after that relationship\'s exclusivity was traded away in April 2026 for a larger contracted revenue commitment. The risk is not the franchise — it is whether the record capex cycle (a record $41B in a single quarter) converts into durable AI monetization fast enough to keep free cash flow from eroding further.',
    },
    sourceNote:
      'Compiled from a web research pass dated Aug 6, 2026: Microsoft FY2026 Q4 earnings release and investor call (Jul 29, 2026), the Apr 27, 2026 Microsoft/OpenAI partnership restructuring announcement (Microsoft and OpenAI newsrooms, Forbes, The Register, Redmondmag), and price/valuation data aggregated via search-engine summaries of stockanalysis.com, GuruFocus, MacroTrends, Morningstar and Yahoo Finance (direct fetch of several of these returned HTTP 403 during this pass, so figures reflect summarized snapshots, not a single verified terminal feed — cross-aggregator P/S figures alone ranged from 7.9x to 11.1x). This is a research framework, not a live feed — cross-check current prices, multiples and guidance before acting on anything here.',
  },

  GOOGL: {
    ticker: 'GOOGL',
    name: 'Alphabet',
    tagline: 'Full stack: TPU silicon, Gemini models, cloud and consumer surfaces — the only hyperscaler that owns its own AI chip, its own frontier model, and now sells surplus compute to a direct model-layer competitor.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Alphabet is the most vertically integrated name in this batch: it designs its own AI accelerator (TPU, now in its 7th generation — "Ironwood"), trains its own frontier model family (Gemini), runs the cloud those run on (Google Cloud), and owns the largest ad-funded consumer distribution surface on earth (Search, YouTube, Android). It is now also a merchant AI-silicon vendor — Google is renting TPU capacity to Anthropic, a direct Gemini competitor, in a deal that doubles as the market\'s clearest third-party endorsement of the TPU program.',
      rows: [
        { level: 'Custom AI silicon', players: 'Google TPU (Ironwood, 7th gen), Broadcom (co-design partner)', position: 'Core, vertically integrated — now selling external TPU capacity to Anthropic (up to 1M chips, 5GW over 5 years)', tone: 'core' },
        { level: 'Cloud infrastructure', players: 'Google Cloud, Microsoft Azure, AWS', position: 'Core business — Cloud revenue +82% YoY to $24.8B in Q2 2026, the fastest growth rate of the big three clouds', tone: 'core' },
        { level: 'Foundation models', players: 'Gemini (Google DeepMind), OpenAI, Anthropic', position: 'Core — Gemini is the in-house frontier model; TPUs also now power a rival lab (Anthropic) as merchant compute', tone: 'core' },
        { level: 'Consumer surfaces / distribution', players: 'Search, YouTube, Android, Gemini app, Chrome', position: 'Core business — the ad-funded distribution layer AI features are being embedded into', tone: 'core' },
        { level: 'Regulatory constraint', players: 'US DOJ/states (search + ad-tech cases), EU', position: 'Two live antitrust cases directly constrain default-placement and bundling of Search, Chrome and the Gemini app', tone: 'indirect' },
      ],
      segments: [
        'Google Services (Search, YouTube ads, Android, subscriptions/devices): the cash engine and the primary AI-feature distribution surface',
        'Google Cloud (GCP + Workspace): the fastest-growing major segment — +82% YoY in Q2 2026, cloud backlog reached $514B',
        'Other Bets (Waymo, Verily, etc.): immaterial to the AI-value-chain thesis at current scale',
      ],
      aiShift:
        'Alphabet\'s AI shift is structurally different from Microsoft\'s or Meta\'s: it is monetizing compute on three levels at once — as merchant silicon (TPU capacity sold to Anthropic), as cloud infrastructure (GCP), and as an embedded consumer feature (Gemini in Search/Android). The tradeoff is real: Google\'s own DeepMind researchers have reportedly been queuing for TPU compute behind paying external customers, an internal capacity squeeze that is the flip side of TPU demand being genuinely strong enough to sell externally. Two live antitrust cases (the search-monopoly remedies, on appeal, and the ad-tech/AdX case, remedies ruling still pending as of this research pass) constrain how aggressively Google can bundle Gemini into its distribution surfaces going forward.',
    },
    valuation: {
      peers: ['GOOGL', 'MSFT', 'META', 'AMZN'],
      metrics: [
        { label: 'Price', values: ['$360.13 (Aug 5–6, 2026, post AI-leadership-shakeup selloff)', '$487.46 (Aug 6, 2026)', '$566.91 (Aug 6, 2026)', '$277.42 (Aug 4, 2026)'] },
        { label: 'Market cap', values: ['~$4.3–4.4T (aggregators disagree, $4.34–4.59T range)', '~$3.62T', '~$1.43–1.5T', '~$3.0T'] },
        { label: 'Trailing P/E', values: ['~18.2–18.9x (see note — GAAP-earnings distorted)', '~27.2–27.5x', '~22.2x', '~22.0x'] },
        { label: 'Forward P/E', values: ['~27.5–27.9x', '~25.1–25.9x', '~17.0–17.3x', '~24.5–31x (wide aggregator spread)'] },
        { label: 'P/S (TTM)', values: ['~9.8–10.2x', '~10.9x (computed)', '~6.6x', '~4.3x (computed, approximate)'] },
        { label: 'P/B', values: ['~10.3–10.5x (last verified ~Jan 2026, likely higher now)', '~11.7x (last verified ~Nov 2025)', '~6.6x (computed, not directly sourced)', '—'] },
        { label: 'EV/EBITDA', values: ['~24–26x (one source: 17.6x — methodology unclear, flagged)', '~19.1x', '~13.1x (looks low vs. P/E; not independently verified)', '—'] },
        { label: 'PEG (trailing)', values: ['~1.0x (sources range 0.55–2.0x)', '~1.3x (sources range 0.76–1.6x)', '0.82', '1.46'] },
        { label: 'ROE', values: ['48.7%', '34.0%', '29.9%', '—'] },
        { label: 'Net margin', values: ['54.8% TTM — inflated by unrealized equity-investment gains, see note', '~39% (approx., FY2026)', '29.8% TTM', '—'] },
        { label: 'Gross margin', values: ['60.9%', '67.9% (FY2026)', '81.8%', '50.8%'] },
        { label: 'Operating margin', values: ['33.1%', '46.8% (FY2026)', '~31% (Q2 2026 GAAP, compressed by legal + severance charges)', '12.1%'] },
        { label: 'Beta', values: ['1.25', '1.13', '~1.25 (approximate)', '1.45'] },
        { label: 'Dividend yield', values: ['0.23%', '0.74%', '0.38%', '0% (no dividend)'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'The headline trailing P/E (~18.5x) looks cheap relative to Microsoft and Meta, but Alphabet\'s TTM net margin of ~55% is inflated by unrealized mark-to-market gains on equity investments — a real but non-cash, non-recurring driver. The forward P/E (~27.6x), which strips most of that distortion out via forward earnings estimates, is a more honest comparison point and lands close to Microsoft\'s',
        'Cloud is now growing faster than either Azure or AWS in percentage terms (+82% YoY) off a smaller base — the clearest evidence Google Cloud is closing the scale gap',
        'Capex guidance has been raised twice in 2026 (now $195–205B, from an original $180–190B), with management flagging a "significant" further increase for 2027 — the multiple is increasingly a bet on Cloud/TPU monetization catching up to the spend',
      ],
      justifiedIf: [
        'Google Cloud sustains 60%+ growth and the $514B backlog converts to revenue roughly on schedule',
        'The TPU external-sales program (Anthropic and any future customers) scales into a genuine third revenue pillar alongside ads and cloud',
        'The pending ad-tech (AdX/DFP) remedies ruling lands on behavioral rather than structural (divestiture) terms',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$300 – $330', rationale: 'A deeper pullback zone, ~10–17% below spot, last visited in the pre-rally consolidation' },
        { tier: 'acceptable', range: '$330 – $390', rationale: 'Current zone, spanning the recent AI-leadership-driven selloff' },
        { tier: 'expensive', range: '>$410', rationale: 'At or above the 52-week high — forward multiple stretches further without a Cloud-growth reacceleration' },
      ],
      technical: [
        '52-week high $408.61 (May 18, 2026); 52-week low $193.67 (Aug 6, 2025) — a ~94% trailing-year move before the recent pullback',
        'Current $360.13 is ~11.9% below the 52-week high, and roughly +86% above the 52-week low',
        'Recent volatility: shares fell ~4% in a single session around Aug 5–6, 2026 tied to an AI-division leadership shakeup (reported departures including Jeff Dean)',
        'Average analyst target ~$427.59 (64 analysts polled), high target $515, low target $340 — some cohorts show a lower ~$401.62 average',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'Google Cloud growth stays well above 50%, the $195–205B capex guide holds without another raise, and the pending ad-tech ruling lands mostly behavioral — grinds toward the $420–460 consensus/high-end range over 12–18 months.' },
        { label: 'BULL', prob: 20, note: 'TPU external sales scale beyond Anthropic, Gemini monetization inflects, and the antitrust overhangs resolve favorably — pushes toward the $500–515 high-end targets.' },
        { label: 'BEAR', prob: 30, note: 'A structural AdX/DFP divestiture is ordered, capex is raised again without matching Cloud-margin improvement, or the search-remedies appeal goes against Google — retests the $300–340 low-end target zone.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $300, or a confirmed structural ad-tech divestiture order (a fundamental break of the ad-monetization stack)',
    },
    risks: [
      { risk: 'Ad-tech antitrust (AdX/DFP)', severity: 'high', note: 'Judge Brinkema (EDVA) found Google illegally monopolized the publisher ad-server and ad-exchange markets in April 2025. The remedies trial closed Nov 21, 2025; the DOJ is seeking a forced sale of AdX. As of this research pass the ruling had not been publicly issued — legal analysts expected it "imminently" back in early April 2026, so the timeline itself has already slipped. A divestiture order would be the most significant forced U.S. corporate breakup since AT&T in 1984.' },
      { risk: 'Search antitrust appeal', severity: 'medium', note: 'The Sept 2025 remedies (data-sharing mandate; ban on exclusive default-placement contracts for Search, Chrome and the Gemini app) rejected a Chrome divestiture, but both the DOJ/states and Google have appealed to the DC Circuit — oral arguments expected late 2026/early 2027. A harsher outcome on appeal remains a live tail risk.' },
      { risk: 'Capex escalation / free cash flow', severity: 'high', note: 'FY2026 capex guidance was raised to $195–205B (from $180–190B); Q2 2026 capex alone was $44.9B, pushing free cash flow negative for the quarter. Management has flagged a "significant" further increase for 2027.' },
      { risk: 'GAAP earnings quality', severity: 'medium', note: 'TTM net margin (~55%) is materially boosted by unrealized/mark-to-market gains on equity investments — a real accounting effect (not fabricated), but one that makes the headline trailing P/E look cheaper than the underlying operating business supports. Use the forward P/E, not the trailing one, for comparison.' },
      { risk: 'Internal TPU capacity squeeze', severity: 'medium', note: 'Reports indicate Google\'s own DeepMind researchers are queuing for TPU compute behind paying external customers like Anthropic — a sign of genuine demand, but also a risk that Gemini\'s own roadmap gets deprioritized versus contracted external revenue.' },
      { risk: 'Key AI-personnel stability', severity: 'low', note: 'The recent AI-leadership shakeup (reported departures including Jeff Dean) triggered a real single-day ~4% stock decline — a reminder of how sensitive the market is to any signal of instability in Google\'s AI leadership.' },
      { risk: 'Cloud margin pressure from bridge capacity', severity: 'medium', note: 'Management has explicitly warned of Q3 2026 Cloud margin pressure from leasing third-party compute to bridge demand ahead of Google\'s own capacity coming online.' },
    ],
    backlog: {
      visibility: [
        'Q2 2026 revenue $119.8B, +24.0% YoY; operating income $40.8B (34.0% operating margin)',
        'Google Cloud revenue $24.8B in Q2 2026, +82.0% YoY, driven by enterprise AI/AI infrastructure demand; Cloud backlog reached $514B',
        'FY2026 capex guidance raised twice, now $195–205B (from an original $180–190B)',
        'Trailing-twelve-month revenue ~$445.9B, TTM net income ~$244.1B (net-margin figure carries the equity-gains caveat noted above)',
      ],
      wins: [
        'Google–Anthropic deal: up to $40B investment, up to 1 million 7th-generation Ironwood TPUs, and 5GW of TPU capacity over 5 years — Google\'s clearest move yet into merchant AI silicon, competing directly with NVIDIA',
        'A separate Broadcom-mediated supply line adds a further 3.5GW of TPU capacity for Anthropic starting 2027, on top of the 1GW already being delivered in 2026',
        'Anthropic training a competing frontier model on Google\'s own silicon is read by analysts as the clearest third-party endorsement of the Ironwood TPU program to date',
      ],
      clients: ['Anthropic (TPU capacity + Google Cloud)', 'Broad Google Cloud enterprise customer base', 'Search/Android/YouTube consumer base (ad-funded)'],
      suppliers: ['Broadcom (TPU co-design)', 'TSMC (TPU fabrication)', 'NVIDIA (supplemental GPU capacity for GCP)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 5, note: 'The only name in this batch that owns silicon, model, cloud and consumer distribution simultaneously — full vertical integration.' },
        { criterion: 'AI growth exposure', stars: 5, note: 'Fastest cloud growth of the big three (+82% YoY) plus a genuinely novel second revenue lever in merchant TPU sales.' },
        { criterion: 'Valuation', stars: 3, note: 'Cheap-looking on a distorted trailing P/E; fairly valued, not cheap, on the cleaner forward multiple (~27.6x).' },
        { criterion: 'Risk', stars: 2, note: 'Two live, structurally significant antitrust cases (search remedies on appeal; ad-tech divestiture ruling still pending) are real, near-term, idiosyncratic risks the other two names in this batch do not carry at the same intensity.' },
        { criterion: 'Entry timing', stars: 3, note: 'A ~12% pullback from the 52-week high, but the stock is still up roughly 86% over the trailing year — not a distressed entry point.' },
      ],
      readLabel: 'CONSTRUCTIVE, LEGAL OVERHANG — WATCH THE ADX RULING',
      summary:
        'The most structurally interesting name here: Alphabet is the only hyperscaler monetizing AI as silicon, model, cloud and consumer product at once, and the Anthropic TPU deal is real evidence the chip program can stand on its own commercially. The headline valuation is misleadingly cheap because of a GAAP earnings-quality quirk (unrealized equity gains) — the true multiple is closer to Microsoft\'s. The dominant near-term risk isn\'t competitive, it\'s legal: a still-pending ad-tech remedies ruling that could, in the worst case, force a structural breakup of the ad-exchange business.',
    },
    sourceNote:
      'Compiled from a web research pass dated Aug 6, 2026: Alphabet Q2 2026 earnings release and call (Jul 22, 2026), CNBC/Investing.com/Digiday/AdExchanger coverage of the DOJ v. Google search-remedies (Sept 2025 ruling, appeals filed Jan–Feb 2026) and ad-tech (Judge Brinkema, EDVA — liability found Apr 2025, remedies closing arguments Nov 21, 2025, ruling still pending as of this pass) cases, DataCenterDynamics/SemiAnalysis coverage of the Google–Anthropic TPU deal, and price/valuation data aggregated via search-engine summaries of stockanalysis.com, MacroTrends, GuruFocus and Yahoo Finance (direct fetch of several of these returned HTTP 403 during this pass). Price and market-cap figures showed real cross-aggregator disagreement (market cap cited anywhere from $4.34T to $4.59T depending on snapshot timing/share-count assumptions) — treat every multiple here as directional, and cross-check current prices and the AdX ruling status before acting on anything here.',
  },

  META: {
    ticker: 'META',
    name: 'Meta Platforms',
    tagline: 'The open-weight Llama strategy is quietly being walked back — Meta is now monetizing AI through ads and engagement while betting up to $145B a year on a still-unproven "superintelligence" push.',
    sector: 'TELECOM & TECH',
    asOf: '2026.08',
    chain: {
      intro:
        'Meta is the pure demand-side hyperscaler in this batch — it buys silicon and leases/builds datacenter capacity but does not sell cloud externally; its entire AI investment is monetized through its own advertising and engagement surfaces (Facebook, Instagram, WhatsApp, Threads). 2026 has brought a real strategic pivot: after Llama 4 failed to close the gap with GPT and Claude, Meta Superintelligence Labs shipped Muse Spark in April 2026 as Meta\'s first closed-weight model since the Llama era began — the open-weight strategy the tagline above describes is now explicitly a hybrid, not a given.',
      rows: [
        { level: 'Silicon / AI accelerators', players: 'NVIDIA, AMD (MI450 — up to 6GW committed), Meta MTIA (in-house, smaller scale)', position: 'Buyer at massive scale; in-house ASIC program secondary to merchant GPUs', tone: 'client' },
        { level: 'Cloud / datacenter capacity', players: 'Meta-owned datacenters, plus leased capacity (Nebius, and others)', position: 'Consumes but does not sell cloud externally — demand-only hyperscaler', tone: 'client' },
        { level: 'Foundation models', players: 'Llama (open-weight, legacy strategy), Muse (Meta Superintelligence Labs, closed-weight, new)', position: 'Core, strategy actively shifting from pure open-weight to a hybrid open/closed split', tone: 'core' },
        { level: 'Consumer apps / advertising', players: 'Facebook, Instagram, WhatsApp, Threads', position: 'Core business — 3.6B daily active people, ad-funded monetization of every AI feature', tone: 'core' },
        { level: 'Regulatory', players: 'FTC (won at trial), EU (DMA/DSA, ongoing)', position: 'Meta prevailed in the FTC Instagram/WhatsApp monopolization case (Nov 2025); FTC has appealed', tone: 'indirect' },
      ],
      segments: [
        'Family of Apps (Facebook, Instagram, WhatsApp, Threads, Messenger): ~97%+ of revenue, almost entirely advertising',
        'Reality Labs (VR/AR, Orion/smart glasses): a persistent, large cash drag, not a near-term AI-monetization lever',
        'Meta Superintelligence Labs (MSL): the new AI-model organization under Chief AI Officer Alexandr Wang (ex-Scale AI), shipping Muse Spark and Muse Image alongside continued Llama releases',
      ],
      aiShift:
        'Meta\'s AI shift has two distinct, sometimes contradictory threads. On the product side, AI is being used to improve ad targeting/pricing (price per ad +12% YoY in Q2 2026) and to build new engagement surfaces (Meta AI daily interactions reportedly up 60% since the Muse Spark integration; Business AIs on WhatsApp/Messenger reaching 10M weekly conversations). On the model-strategy side, Meta has quietly reversed course: Llama 4 (2025) was supposed to close the gap with GPT and Claude on the strength of open-weight distribution plus Meta\'s compute scale; it did not. Meta Superintelligence Labs shipped Muse Spark as a closed-weight model in April 2026 — the first closed release since the Llama era began — while a near-term Llama 5 release was, as of mid-2026, treated as a low-probability scenario rather than the central case. The "open-weight strategy monetized through ads" framing is now a description of Meta\'s recent past more than its committed future.',
    },
    valuation: {
      peers: ['META', 'GOOGL', 'MSFT', 'AMZN'],
      metrics: [
        { label: 'Price', values: ['$566.91 (Aug 6, 2026)', '$360.13 (Aug 5–6, 2026, post AI-leadership-shakeup selloff)', '$487.46 (Aug 6, 2026)', '$277.42 (Aug 4, 2026)'] },
        { label: 'Market cap', values: ['~$1.43–1.5T', '~$4.3–4.4T (aggregators disagree, $4.34–4.59T range)', '~$3.62T', '~$3.0T'] },
        { label: 'Trailing P/E', values: ['~22.2x', '~18.2–18.9x (see note — GAAP-earnings distorted)', '~27.2–27.5x', '~22.0x'] },
        { label: 'Forward P/E', values: ['~17.0–17.3x', '~27.5–27.9x', '~25.1–25.9x', '~24.5–31x (wide aggregator spread)'] },
        { label: 'P/S (TTM)', values: ['~6.6x', '~9.8–10.2x', '~10.9x (computed)', '~4.3x (computed, approximate)'] },
        { label: 'P/B', values: ['~6.6x (computed from ROE/net income, not directly sourced)', '~10.3–10.5x (last verified ~Jan 2026)', '~11.7x (last verified ~Nov 2025)', '—'] },
        { label: 'EV/EBITDA', values: ['~13.1x (looks low vs. P/E; not independently verified)', '~24–26x (one source: 17.6x — methodology unclear, flagged)', '~19.1x', '—'] },
        { label: 'PEG (trailing)', values: ['0.82', '~1.0x (sources range 0.55–2.0x)', '~1.3x (sources range 0.76–1.6x)', '1.46'] },
        { label: 'ROE', values: ['29.9%', '48.7%', '34.0%', '—'] },
        { label: 'Net margin', values: ['29.8% TTM', '54.8% TTM — inflated by unrealized equity-investment gains, see note', '~39% (approx., FY2026)', '—'] },
        { label: 'Gross margin', values: ['81.8%', '60.9%', '67.9% (FY2026)', '50.8%'] },
        { label: 'Operating margin', values: ['~31% (Q2 2026 GAAP, compressed by $2.4B legal + $1.18B severance charges)', '33.1%', '46.8% (FY2026)', '12.1%'] },
        { label: 'Beta', values: ['~1.25 (approximate)', '1.25', '1.13', '1.45'] },
        { label: 'Dividend yield', values: ['0.38%', '0.23%', '0.74%', '0% (no dividend)'] },
      ],
      verdictTone: 'fair',
      verdictPoints: [
        'Meta screens as the cheapest of the three on forward P/E (~17.1x) and PEG (0.82), the two metrics best suited to a business still growing revenue in the high-20s% while absorbing heavy AI capex',
        'Gross margin (81.8%) is the highest of the three — the advertising business itself remains extremely profitable; the Q2 2026 operating-margin compression to ~31% was driven by one-time-ish items (legal charges, severance), not core-business deterioration',
        'The EV/EBITDA figure sourced this pass (~13.1x) looks low relative to the trailing P/E and was not independently cross-verified — treat it with more caution than the other multiples in this table',
      ],
      justifiedIf: [
        'FY2026 capex stays inside the guided $130–145B range (already narrowed once) without another upward revision that isn\'t matched by a monetization story',
        'Ad revenue growth holds in the high-20s% YoY range and price-per-ad continues compounding as AI-driven targeting improves',
        'Muse Spark / Business-AI products (WhatsApp, Messenger) become a credible second monetization lever rather than a pure cost center',
      ],
    },
    priceMap: {
      zones: [
        { tier: 'ideal', range: '$520 – $560', rationale: 'Near the 52-week low ($520.26), ~1–8% below spot' },
        { tier: 'acceptable', range: '$560 – $650', rationale: 'Current zone, mid-way through the post-ATH correction' },
        { tier: 'expensive', range: '>$720', rationale: 'Approaching the 52-week high — would require the capex/margin overhang to fully clear' },
      ],
      technical: [
        '52-week high $796.25 (Aug 15, 2025); 52-week low $520.26 (Mar 27, 2026)',
        'Current $566.91 is a ~28.8% correction from the 52-week high, and sits only ~9.0% above the 52-week low',
        'The drawdown from the ATH roughly tracks two events: the escalating capex guide (now up to $145B) and the Q2 2026 legal-charge/severance hit to reported operating income',
        'Average analyst target ranges $756.95–$842.85 depending on cohort (62–72 analysts); high target $1,000, low target $580',
      ],
      scenarios: [
        { label: 'BASE', prob: 50, note: 'Ad revenue growth holds in the mid-to-high-20s% YoY, capex stays inside the $130–145B guided range, and Muse/agent products remain useful optionality rather than a drag — grinds toward the $757–843 consensus range over 12–18 months.' },
        { label: 'BULL', prob: 20, note: 'Muse Spark and Business-AI products (WhatsApp/Messenger) become a genuine second monetization line faster than modeled, while ad pricing keeps compounding — pushes toward the $900–1,000 high-end targets.' },
        { label: 'BEAR', prob: 30, note: 'Capex guidance is raised again without a matching ROI story, legal/regulatory charges recur (EU DMA/DSA exposure is ongoing), or ad growth decelerates — retests the $500–520 low / 52-week-low zone.' },
      ],
      horizon: '12–18 months',
      invalidation: 'Weekly close below $500 (below the 52-week low, a structure break)',
    },
    risks: [
      { risk: 'Capex/expense escalation without a proven AI payoff', severity: 'high', note: 'FY2026 capex guided to $130–145B and total expenses to $165–169B, while Meta Superintelligence Labs has yet to produce a standalone revenue line remotely comparable to advertising. Zuckerberg\'s public framing of this as a "~$135B bet" on superintelligence is an explicit admission the payoff is not yet proven.' },
      { risk: 'Q2 2026 margin compression', severity: 'medium', note: 'GAAP operating income fell 8% YoY despite 28% revenue growth, driven by $2.4B in legal charges and $1.18B in severance. Legal-charge risk in particular is not obviously one-time given ongoing EU and U.S. regulatory exposure.' },
      { risk: 'Open-weight strategy reversal / execution risk', severity: 'medium', note: 'Llama 4 did not close the capability gap with GPT/Claude despite the open-weight-plus-scale thesis. Meta Superintelligence Labs shipping the closed-weight Muse Spark (Apr 2026) is a tacit admission of that failure; whether the reorganized team under Alexandr Wang can build a credible frontier program is unproven.' },
      { risk: 'FTC appeal (Instagram/WhatsApp)', severity: 'low', note: 'Meta won the FTC monopolization trial (Nov 18, 2025) when Judge Boasberg found the FTC failed to prove a current monopoly. The FTC has appealed to the DC Circuit — a low-probability, multi-year tail risk, not a near-term one.' },
      { risk: 'EU regulatory exposure (DMA/DSA)', severity: 'medium', note: 'Meta\'s ads-based monetization model and cross-app data practices remain a recurring target for EU fines and mandated design changes, a structurally different regulatory posture than either the U.S. antitrust cases against Google.' },
      { risk: 'Revenue concentration in advertising', severity: 'medium', note: 'Advertising is still ~97%+ of revenue (ad revenue $59.36B of $60.8B total in Q2 2026). Muse/agent products and Business AIs are optionality, not yet a second pillar — growth remains tied to ad pricing, impressions and platform engagement.' },
      { risk: 'GPU/server depreciation assumptions', severity: 'medium', note: 'Like its hyperscaler peers, Meta has extended assumed useful life on servers/GPUs to smooth depreciation expense; if actual hardware obsolescence runs faster than assumed, future earnings could be restated lower.' },
    ],
    backlog: {
      visibility: [
        'Q2 2026 revenue $60.80B, +28% YoY; advertising revenue $59.36B, +27% YoY (ad impressions +14%, average price per ad +12%)',
        'Daily active people across all apps reached 3.6B; Instagram surpassed 2B daily actives',
        'FY2026 capex guidance narrowed to $130–145B (including finance-lease principal payments); total FY2026 expense guidance $165–169B',
        'Q2 2026 net income $15.85B (diluted EPS $6.18); GAAP operating income fell 8% YoY on $2.4B legal charges + $1.18B severance',
      ],
      wins: [
        'AMD MI450 GPU commitment: up to 6GW of MI450 accelerators deployed in Helios rack-scale servers — one of the largest disclosed non-NVIDIA AI-silicon commitments in the industry',
        'Meta Superintelligence Labs shipped Muse Spark and Muse Image (its first closed-weight model family) in April 2026, alongside continued open-weight Llama development',
        'Meta AI daily interactions reportedly up 60% since the Muse Spark integration; Business AIs on WhatsApp and Messenger reaching 10M weekly conversations',
        'Won the FTC Instagram/WhatsApp monopolization trial outright (Nov 18, 2025), removing (pending appeal) the largest structural-breakup risk the company faced',
      ],
      clients: ['Advertisers across the Family of Apps (core revenue base)', '3.6B daily active people across Facebook, Instagram, WhatsApp, Threads'],
      suppliers: ['NVIDIA (primary GPU supplier)', 'AMD (MI450, up to 6GW committed)', 'Nebius and other neoclouds (leased datacenter capacity)'],
    },
    synthesis: {
      scores: [
        { criterion: 'Business quality', stars: 4, note: 'The highest gross margin (81.8%) of the three and a still-growing, high-30s%-underlying-margin ad business, though Reality Labs remains a persistent cash drag.' },
        { criterion: 'AI growth exposure', stars: 3, note: 'AI is clearly improving the core ad business (price-per-ad +12%), but the standalone "superintelligence" bet (Muse, MSL) is unproven and the open-weight strategy that anchored Meta\'s AI narrative is being walked back.' },
        { criterion: 'Valuation', stars: 4, note: 'Cheapest of the three on forward P/E (~17.1x) and PEG (0.82) — the market is already discounting real capex-and-execution risk.' },
        { criterion: 'Risk', stars: 2, note: 'The largest capex-to-proven-payoff gap of the three names here, plus recurring legal/regulatory charge risk in both the U.S. and EU.' },
        { criterion: 'Entry timing', stars: 4, note: 'A ~29% drawdown from the ATH, sitting near the 52-week low, is a genuinely deep pullback relative to Microsoft\'s or Alphabet\'s more modest corrections.' },
      ],
      readLabel: 'CONSTRUCTIVE ON PRICE, CAUTIOUS ON THE AI STORY',
      summary:
        'Meta is the value name of this batch on conventional multiples — cheapest forward P/E, lowest PEG, deepest drawdown from its all-time high — but that discount reflects real, specific risk: a capex program (up to $145B a year) running well ahead of any proven standalone AI revenue line, a model-strategy reversal (the open-weight Llama bet did not pan out and Meta is now shipping closed models under new leadership) that undercuts the very tagline the market knows Meta by, and recurring legal-charge volatility. The core advertising business remains excellent; the "superintelligence" bet layered on top of it is the part investors are being asked to underwrite without much evidence yet.',
    },
    sourceNote:
      'Compiled from a web research pass dated Aug 6, 2026: Meta Q2 2026 earnings release and call (Jul 29, 2026, via investor.atmeta.com and press coverage), reporting on Meta Superintelligence Labs and the Muse Spark closed-weight release (StartupHub.ai, Digitimes, LogicHQ, Apr 2026), the FTC v. Meta trial outcome (Sullivan & Cromwell, CBS News, CNBC, Nov 2025) and subsequent FTC appeal, and price/valuation data aggregated via search-engine summaries of stockanalysis.com, GuruFocus, TipRanks and financecharts.com (direct fetch of several of these returned HTTP 403 during this pass). Two independent price snapshots this pass disagreed by roughly 4% ($566.91 dated Aug 6, 2026 vs. $591.42 undated) — the lower, explicitly dated figure was used throughout; the AMD MI450/Helios 6GW figure is corroborated by AMD\'s own company entry elsewhere on this site. This is a research framework, not a live feed — cross-check current prices, multiples and capex guidance before acting on anything here.',
  },
}
