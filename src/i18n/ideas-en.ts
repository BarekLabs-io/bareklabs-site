import type { IdeaItem } from '@/data/ideaReports'

/* The open theses, in English. Kept out of dict-en.ts because these are the
 * only entries in the dictionary that carry real research: they change on
 * their own schedule, they get re-dated, and they should be reviewable as a
 * file rather than as a diff buried in a 900-line translation object.
 *
 * Every figure here traces to the long-form report the card links to. Where a
 * report publishes no probability weighting, the card carries no scenario bar
 * rather than an invented one.
 *
 * All eight reports were rebuilt on 7 August 2026 after a method error was
 * found in the terminal year. The cards carry a REBUILT marker, and several
 * of the numbers moved a long way. Data as of 6 August 2026. */
export const ideasEn: IdeaItem[] = [
  {
    id: 'IDEA-01',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'AI INFRA',
    company: 'Nebius Group N.V.',
    tickers: ['NBIS'],
    revised: 'REBUILT 07.08',
    report: 'nbis',
    title: 'Nebius: the constraint is the grid, not the demand',
    thesis:
      'Nebius ended 2025 claiming more than three gigawatts of contracted power against about 170 megawatts actually live and billing — 5.7%. It has signed more than $32bn of firm contracts with Microsoft and Meta, so demand is not the constraint. What limits growth is the ability to connect, cool and energise: a permitting risk, not a market risk. Revenue went from $91.5m in 2024 to $529.8m in 2025 to $399.0m in Q1 2026 alone, so the execution is real — but any model that values contracted gigawatts linearly is wrong by a factor of seventeen.',
    entry:
      'The only one of this batch where the price sits inside our scenario range: $189.88 against a $156.90 weighted target, a $109.57 base case and a $484.08 bull. The entry is judged on whether July\'s secured financing replicates — $775m at SOFR plus 250 basis points, covering more than 100% of the capex of the contract it funds. Each deal of that shape removes future dilution. Note also that the $47.8bn enterprise value implies a 7.3x exit multiple on our central 2033 EBITDA against the 5.0x our own terminal value produces: here the market is more conservative than we are.',
    invalidation:
      'Megawatts connected coming in well below the guided 800–1,000 MW range for the end of 2026, or a final refusal of the Vineland extension — the site that serves the $17.4bn Microsoft contract. On 6 August a contested planning hearing in that New Jersey town took 13.3% off the stock: a municipal meeting in a place of 60,000 people erased more than six billion dollars of market value. And read the discount rate warning: at 8% the same central path is worth $332, which inverts the conclusion entirely.',
    horizon: 'Q2 print on 12 August 2026, NVIDIA warrant exercisable 11 September 2026, end-2026 guidance, modelled to 2033.',
    discountRate:
      '10.80% WACC, on a retained beta of 1.60 against 1.43 observed. On this file the discount rate is the dominant assumption, ahead of megawatt conversion — at 8% the stock comes out at $332 against a $189.88 close',
    scenarios: [
      { label: 'BEAR', prob: 32, tone: 'down' },
      { label: 'BASE', prob: 46, tone: 'mid' },
      { label: 'BULL', prob: 22, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-02',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'ENERGY',
    company: 'Energy Vault Holdings',
    tickers: ['NRGV'],
    revised: 'REBUILT 07.08',
    report: 'nrgv',
    title: 'Energy Vault: the backlog that is not one',
    thesis:
      'Energy Vault communicates a $1.35bn backlog. The same SEC filing puts its contractual performance obligations at $142.4m — 10.5% of the headline. The gap comes from a house definition that books into backlog the future revenue the company hopes to pay itself, on assets it owns. Note also what the business now is: 96% of revenue comes from integrating conventional lithium batteries, and the gravity technology it was founded on generates no identifiable revenue at all.',
    entry:
      'Not an entry at this level. Three verifiable signals condition the file: the SOSA and Stoney Creek project financings closing at ordinary infrastructure terms, the Cross Trails coverage ratio returning above its contractual threshold, and an end to the use of floating-conversion debentures. None of our approaches reaches the $2.96 price — not the $0.17 scenario DCF, not the $0.89 sum of the parts, not the $0.78 weighted average.',
    invalidation:
      'The thesis breaks if Q2 2026 ASC 606 obligations rise sharply as a proportion of the communicated backlog, or if a non-recourse financing is announced below 9%. A warning that belongs on the same card: at an 8% discount rate the central case comes out above the market price. The bearish conclusion here depends on the cost of capital we retain, not on the operating path.',
    horizon: 'Q2 print on 11 August 2026, Calistoga covenant test 30 November 2026, modelled to 2033.',
    discountRate:
      '14.23% WACC, on a retained beta of 1.80 against 1.17 observed, plus a three-point size premium — that choice is the lever that decides the result, and it runs against the company',
    scenarios: [
      { label: 'BEAR', prob: 35, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 20, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-03',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'AI INFRA',
    company: 'Digi Power X',
    tickers: ['DGXX'],
    revised: 'REBUILT 07.08',
    report: 'dgxx',
    title: 'Digi Power X: one contract, and a number nobody publishes',
    thesis:
      'Digi Power X is worth roughly $370m on the promise of a single colocation contract — 40 megawatts leased to Cerebras, $1.1bn over ten years, signed 4 May 2026 — which has produced no revenue at all. Breakeven sits at about $9.11m of capex per megawatt: above that the contract destroys value, below it creates value. The issuer does not publish that number. Nor is the $370m firm: it is $342m on the stale 10-Q share count.',
    entry:
      'The entry depends on a datapoint, not on a level. Capex per megawatt, and the phase-two project financing — a condition precedent covering 63% of the contract — decide the sign of the result. Until one or the other is published, any position is a bet on an unknown variable. The one metric that flatters the file is real: about $5.4m of enterprise value per contracted megawatt against $10–22m for comparables, though those comparables are diversified and several are credit-enhanced.',
    invalidation:
      'On the upside: a non-recourse financing at 9–10% coupled with capex under $9m per megawatt validates the bull case. On the downside: phase one slipping past its 15 December 2026 service date, or a share count on the 14 August 10-Q approaching 115 million — beyond that, no defensible bull case reaches the price at all. At the 98.54m shares this report retains, the bull case is $3.78 against a $3.75 close; at 115m it is $3.24. That cover page is a binary event.',
    horizon: 'Q2 print on 14 August 2026, phase one targeted 15 December 2026, 40 MW by end Q1 2027, contract to 2036.',
    discountRate:
      '15.98% WACC, on a retained beta of 2.40 against 6.19 observed — the mining legacy is not the risk of the future business. Terminal value is a residual asset value in bear and base, a perpetuity in the bull case only. At 8% the conclusion holds: the gap comes from capex per megawatt, not from the rate',
    scenarios: [
      { label: 'BEAR', prob: 40, tone: 'down' },
      { label: 'BASE', prob: 42, tone: 'mid' },
      { label: 'BULL', prob: 18, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-04',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'BIOTECH',
    company: 'Recursion Pharmaceuticals',
    tickers: ['RXRX'],
    revised: 'REBUILT 07.08',
    report: 'rxrx',
    title: 'Recursion: the platform against the clock',
    thesis:
      'Recursion has pushed industrialised AI drug discovery further than anyone — 2.2 million samples processed a week, 36 petabytes of proprietary data, and more than $500m collected from Roche, Sanofi, Bayer and Merck KGaA. No Recursion-discovered drug has yet cleared phase 2 with a robust efficacy signal. The question is not whether the platform works, but how much time is left and how many shares it takes to find out.',
    entry:
      'Read the number as a sum of the parts, not as a discounted cash flow. The DCF disqualifies itself here: terminal value comes out at −172% of enterprise value, because the present value of the first ten years is negative by $931m. Drop the discount rate to an absurd 2% and value per share falls to −$8.89 rather than rising, because a lower rate lifts ten years of losses more than it lifts the terminal value. So the figure that counts is the sum of the parts: $542.6m of net cash, plus $212m of risk-adjusted pipeline, plus platform value, minus $660m for the dilution needed to get there. REC-4881 alone is 48% of that pipeline.',
    invalidation:
      'REC-4881 failing to hold its efficacy at CGA-IGC in November 2026, or a financing priced near the bear case — where $2.1bn has to be raised at $1.90 and more than twice the existing 536m shares get created, against 21% dilution in the bull case. Q2 2026 revenue of $7.7m was down 60% year on year and 36.9% below consensus, with a $131.0m net loss and $197.1m of cash burned in the half.',
    horizon: 'To the readouts. Runway guided "into early 2028", wording reaffirmed 5 August 2026.',
    discountRate:
      '12.9% on the central case (11.9–14.9% across the three) — but the target is not a discounted-cash-flow output. The DCF is published only to show why it cannot be used on this file',
    scenarios: [
      { label: 'BEAR', prob: 40, tone: 'down' },
      { label: 'BASE', prob: 40, tone: 'mid' },
      { label: 'BULL', prob: 20, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-05',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'MEDTECH',
    company: 'Intuitive Surgical',
    tickers: ['ISRG'],
    revised: 'REBUILT 07.08',
    report: 'isrg',
    title: 'Intuitive Surgical: the monopoly has an appointment',
    thesis:
      'Eleven thousand seven hundred and ten da Vinci robots placed and more than 3.2 million procedures in 2025, at 66% gross margin, 31% operating margin, $8.6bn of cash and zero debt. It is one of the finest machines in medtech, and the stock is 38% off its high. Two things happened at once: US procedure growth fell to +12% in Q2 2026, and on 22 July the FDA authorised Johnson & Johnson\'s OTTAVA across ten general-surgery procedures — the core of da Vinci volume.',
    entry:
      'The entire debate on this name is 286 basis points wide. Our base case is $217 against a $373.71 price at a 10.86% cost of capital, which is the observed beta of 1.46 Blume-adjusted to 1.308. Hold the operating path exactly as it is and move the rate to 8% — the long-run return on US equities — and the same model gives $351, six percent below the market. Fifty-eight percent of the value sits beyond 2035, so the rate dominates everything: someone who says ISRG is worth $500 and someone who says $250 can agree on every operating assumption.',
    invalidation:
      'US procedure growth reaccelerating back above the mid-teens would reset the bear case on its own. In the other direction, OTTAVA converting placements rather than merely clearing the FDA is what would turn a regulatory event into a commercial one. One disclosure about the numbers themselves: our bull case first came out 0.4% below the market price, which fails the blocking test, and its assumptions were widened until it passed at +2.2%. A bull case calibrated to reach the price is not a bull case that was discovered, and the range should be read knowing that.',
    horizon: 'Multi-year. On this name the duration is the thesis.',
    discountRate:
      '10.86% WACC, central case (9.08–11.86% across the three), on the observed beta rather than an assumed one. At 8% the model gives $351.36 against $373.71 — the conclusion does not invert, it evaporates',
    scenarios: [
      { label: 'BEAR', prob: 25, tone: 'down' },
      { label: 'BASE', prob: 50, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-06',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'MEDTECH',
    company: 'TransMedics Group',
    tickers: ['TMDX'],
    revised: 'REBUILT 07.08',
    report: 'tmdx',
    title: 'TransMedics: one organ, one thesis',
    thesis:
      'TransMedics built, in five years, the only integrated organ procurement, perfusion and transport network in the United States, and revenue has grown 2.5x since 2023. Two things qualify that: 78% of organ revenue comes from the liver, and adjusted operating margin fell from 23.2% to 13.6% in a year. Neither business lost margin — product gross margin actually improved. It is the growing weight of the logistics business that drags the average down.',
    entry:
      'The conclusion inverts at 8%, and that is the most important sentence on this card. Our base case is $64.30 against a $78.74 price — 18.3% below — at a 10.33% cost of capital derived from the observed beta of 1.88. Hold the operating path strictly unchanged and discount it at 8%, the long-run return on US equities, and the same cash flows are worth $110.06, or 39.8% above the market. This report does not say TransMedics is worth less; it says it is worth less at the rate we require. Q2 2026 revenue of $189.9m was an absolute record, up 21%.',
    invalidation:
      'Heart or lung scaling would widen the thesis rather than end it — liver concentration is the risk, not the ceiling, and the US does about 12,344 liver transplants a year growing at roughly 8%. The live risk is legal: the part of the securities litigation that attacks the core commercial model survived its motion to dismiss and is now in discovery. Note the bear case needs no disaster — no recall, no lost approval, no fraud — only for the liver to saturate.',
    horizon: '2026–2027, on the mix shift and on discovery.',
    discountRate:
      '10.33% WACC, central case (9.33–11.58% across the three), 3% perpetual growth. At 8% the same operating path is worth $110.06 against a $78.74 close — the conclusion inverts',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-07',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'SPACE',
    company: 'Rocket Lab · AST SpaceMobile',
    tickers: ['RKLB', 'ASTS'],
    revised: 'REBUILT 07.08',
    report: 'rklb-asts',
    title: 'Two space bets, one question: what do you have to believe about 2035?',
    thesis:
      'Rocket Lab and AST SpaceMobile are valued on the same basis — belief — while having nothing industrially in common. One has 92 successful launches, a $2.2bn backlog and an $8bn acquisition in progress; the other has twelve satellites in orbit out of the 45 to 60 it needs, and no commercial revenue. Our probability-weighted cases come out at $12.98 and $29.40. The market asks $78.89 and $68.50.',
    entry:
      'There is no entry level to give: the disagreement is not about price, it is about trajectory. What would make the Rocket Lab file different is a first successful Neutron flight, which unlocks up to $5.6bn of NSSL mission orders that are inaccessible today — the single event that moves the base case toward the bull case. For ASTS it is launch cadence: without a launch every 45 days from here to December, continuous US coverage slips, and the 2028–2030 revenue path goes with it. Turned around, the price implies a 4.50% discount rate for RKLB, or $66.9bn of 2035 revenue — 87% of what Lockheed Martin does today; for ASTS, 6.63%, or $18.4bn, which is 1.2 times the entire estimated 2035 direct-to-device market.',
    invalidation:
      'The bearish reading breaks if Neutron flies successfully in Q4 2026 and wins NSSL mission orders within twelve months; if Rocket Lab quantifies Iridium synergies above $300m a year, which would make the $8bn price defensible; if AST SpaceMobile reaches 45 satellites in orbit by mid-2027 and publishes operator revenue sharing above 50%; or if the direct-to-device market is repriced an order of magnitude above the $15.5bn estimated for 2035. One disclosure about the method: this report carries four scenarios, not three. The fourth — a blue-sky case at $92.01 for RKLB and $156.53 for ASTS, weighted 5% and 7% — was added so that the range would bracket the market price, which is the lab\'s blocking test. The weighted targets above are computed on all four.',
    horizon: 'Q2 prints for both after the close on 10 August 2026. First Neutron flight targeted Q4 2026, Iridium close expected mid-2027, modelled to 2035.',
    discountRate:
      '13.5% for RKLB and 14.0% for ASTS in the central case — a 4.65% risk-free rate, a 4.75% equity risk premium, and betas brought down to 1.90 and 2.10 against 2.55–2.63 and 2.68–2.75 observed, on ten-year convergence. A project-finance variant is computed at 9–10%',
  },
  {
    id: 'IDEA-08',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'MATERIALS',
    company: 'ALUULA Composites',
    tickers: ['AUUA.V'],
    revised: 'REBUILT 07.08',
    report: 'auua',
    title: 'ALUULA Composites: the width trade',
    thesis:
      'ALUULA fuses ultra-high-molecular-weight polyethylene into a glue-free laminate in Victoria, British Columbia. Revenue rose 90% in the first half of fiscal 2026 with gross margin steady in the low forties for six straight quarters, and the plant is now at 100% utilisation. Everything the company wants to do next — shelters, structural panels, defence, aerospace — is gated by one physical constraint: roll width. Victoria makes 0.925 metres; Vancouver is being built for 1.5. The 128 millimetres that matter are the ones that take ALUULA past the 54-inch width the technical-textile world cuts its patterns around.',
    entry:
      'Not a price level. The entry logic is the capacity gate: Victoria is full and can only make 0.925-metre rolls, so revenue is capped near C$12m until Vancouver opens at 1.5 metres. That is a dated, binary, verifiable event rather than a narrative. Anyone taking a position before it is paying for an outcome that has not been demonstrated; anyone waiting is paying a different price for far less uncertainty. The two arm\'s-length blocks that cleared at C$3.30 — the February placement and the July founder sale, five months apart — are the only prices at which size has actually traded.',
    invalidation:
      'Vancouver not operational at 1.5-metre width by 31 October 2026 would be the first broken commitment in this management\'s record, and it removes the gate on every non-windsport market. A second consecutive sequential decline in the disclosed order book, after the fall from C$3.5m to C$2.7m at Q2, would resolve the central ambiguity in the adverse direction. And an operating cost base running past C$9m annualised before the new plant produces would push operating breakeven out by a full scenario year. Disclosed defence revenue is, and has always been, zero.',
    horizon: 'Q3 FY2026 results by roughly 29 September 2026, Vancouver possession October 2026, fiscal year end 31 October 2026, modelled to FY2029.',
    discountRate:
      '11.43% WACC — a 4.69% risk-free rate plus a peer-derived beta of 0.89 and a 3.0% size and illiquidity premium carried on its own line. But no single rate decides this one: the two methods disagree by a factor of nearly nine, weighted DCF C$0.64 against weighted multiple C$5.65, because EV/gross profit is neutral to margin and blind to operating cost. The report publishes both and does not average them',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
]
