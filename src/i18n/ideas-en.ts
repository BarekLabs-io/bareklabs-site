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
    revised: 'REBUILT',
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
    revised: 'REBUILT',
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
    revised: 'REBUILT',
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
    revised: 'REBUILT',
    report: 'rxrx',
    title: 'Recursion: the platform against the clock',
    thesis:
      'Recursion has pushed the industrialisation of AI drug discovery further than anyone: 36 petabytes of proprietary data, 2.2 million samples processed a week, more than $500m collected from Roche, Sanofi, Bayer and Merck KGaA. But no molecule from the platform has cleared phase 2 with a robust efficacy signal, and the one programme that would prove it — REC-7735 — delivers no data before the first half of 2028.',
    entry:
      'This is not a cash-flow file, it is an option on a method: strike price $557m of cash, expiry "early 2028". The only external validator that counts is a pharmaceutical partner exercising an option — Genentech did on 5 August 2026 on its first neuroscience target, taking the cumulative collected to $216m. A new deal with a three-digit upfront is the only non-dilutive source of cash. Our weighted target comes out at $0.99 against a $3.125 close — bear $0.00, base $0.24, bull $4.47.',
    invalidation:
      'The REC-4881 phase 2 data at the CGA-IGC congress in November 2026 are the only binary event of the year: that programme alone carries nearly half the risk-adjusted pipeline. A failure there erases most of the ex-cash value. In the other direction, the bear thesis survives neither a major partnership deal nor an M&A move — 38 biotech deals since January, the best pace in seven years.',
    horizon: 'CGA-IGC in November 2026, three grouped readouts in H1 2027, the guided runway ending early 2028, first REC-7735 data in H1 2028.',
    discountRate:
      '12.88% cost of equity — observed beta 0.995, Blume-adjusted to 0.997, plus a 3.5-point size and execution premium. METHOD WARNING: the base case terminal-value share comes out at −172%, the explicit period destroys value, and the enterprise value of the operating stream alone is negative by $342m. The DCF is not the right tool; the published figure comes from the sum of the parts — net cash, plus the risk-adjusted present value of the pipeline, plus the platform, minus the cost of the necessary dilution. At a 2% discount rate the value per share is negative: no cost of capital makes this file attractive on discounted cash flows',
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
    revised: 'REBUILT',
    report: 'isrg',
    title: 'Intuitive Surgical: the monopoly has an appointment',
    thesis:
      'For twenty years Intuitive had no credible Western competitor. On 22 July 2026, six days after its second-quarter release, the FDA authorised Johnson & Johnson\'s OTTAVA across ten general-surgery procedures — the segment Intuitive\'s own management names as its primary US growth engine. On the call the day before, no competitor had been mentioned.',
    entry:
      'The entry is judged on OTTAVA\'s adoption pace over its first twelve months, not on its authorisation. Karl Storz has just demonstrated that the obstacle is the ecosystem, not the regulatory green light: it shut down Senhance and abandoned Luna on 22 June 2026, two years after buying Asensus. A slow, traction-less launch validates the bull case; 75% of Intuitive\'s revenue is recurring, and a loss of placement share takes seven to ten years to show in the accounts. Our weighted target comes out at $237.56 against a $373.71 close — bear $134.38, base $216.90, bull $382.04.',
    invalidation:
      'Three conditions hold the bull thesis and any one of them breaks it: US procedure growth below 10% — it is at 12% in Q2 2026 against 20% outside the US —, a rise in long rates, or OTTAVA beyond one US placement in five. GLP-1 substitution is a fourth, unquantifiable risk: Intuitive does not publish its mix by procedure. One disclosure about the numbers themselves: our bull case first came out 0.4% below the market price, which fails the blocking test, and its assumptions were widened until it passed at +2.2%. A bull case calibrated to reach the price is not a bull case that was discovered, and the range should be read knowing that.',
    horizon: 'Q3 2026 in October — the first full quarter after the 1 June Japanese reimbursement reform and after OTTAVA, with harder comparables announced; FDA decision on the Hugo 510(k)s in Q3–Q4; clarity on Chinese billing codes not before 2027; modelled to 2035.',
    discountRate:
      '10.86% cost of equity, equal to the WACC since the company carries no financial debt — observed beta 1.460, Blume-adjusted to 1.308, retained without deviation. The price implies an observed beta of 0.47, between Johnson & Johnson\'s (0.235) and Coca-Cola\'s (0.349). At 8% the conclusion does not invert but the gap falls to −6.0%: it is almost entirely a cost-of-capital gap',
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
    revised: 'REBUILT',
    report: 'tmdx',
    title: 'TransMedics: one organ, one thesis',
    thesis:
      'TransMedics draws 78% of its organ revenue from the liver alone, on a US market of 12,344 transplants a year growing at 8%. The margin compression is not an accident: service — perfusion, logistics, aviation — went from 27% to 41% of revenue in three years, at 28–35% gross margin against 79% on the product. The mix, not the businesses, explains the decline.',
    entry:
      'The file does not turn on a level but on a fork. Three verifiable facts decide it: approval of the ENHANCE Part B IDE supplement with CHOPS, which opens heart and lung; operating margin returning above 16% without a growth downgrade, which would prove the logistics leverage; and the internal fleet coverage rate, up from 82% to 86% in one quarter. The third is the only one improving today. Our weighted target comes out at $65.68 against a $78.74 close — bear $16.87, base $64.30, bull $126.74.',
    invalidation:
      'The thesis falls if hepatic penetration plateaus — revenue growth below 10% as early as 2028 is enough — or if the forced-bundling count of Jewik v. TransMedics (1:25-cv-10385), which survived its motion to dismiss on 29 July 2026 and moves into discovery, constrains how the National OCS Program is sold. The integrated NOP is not a distribution channel; it is the business model.',
    horizon: 'ENHANCE Part A before end 2026, Part B IDE in Q3–Q4, the Somerville headquarters purchase option on 31 December 2027, the convertibles due 1 June 2028, modelled to 2035.',
    discountRate:
      '10.33% WACC — observed beta 1.881, Blume-adjusted to 1.590, 75.8% equity and 24.2% debt at 6.0% pre-tax. WARNING: at 8% the conclusion inverts and the stock comes out at $110.06 — on this file the discount rate decides the sign',
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
    revised: 'REBUILT',
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
    revised: 'REBUILT',
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
  {
    id: 'IDEA-09',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'AI INFRA',
    company: 'Meta Platforms',
    tickers: ['META'],
    report: 'meta',
    title: 'Meta: the depreciation that hasn\'t landed',
    thesis:
      'Meta printed the best advertising quarter in its history — $60.80bn, up 28% — and lost 9.6% after hours. The public argument was about a $2.4bn legal charge. The real story sits elsewhere: $80.3bn of assets under construction that are not depreciating yet — 27.4% of the gross asset base — and $347bn of signed lease commitments that do not appear on the balance sheet, 3.1 times the debt that does. Operating margin fell from 43.0% to 30.9%, and only about six of those twelve points are one-offs.',
    entry:
      'The market is pricing the plan, with a modest premium. Three advertising paths, built from impressions and price separately: the plan path is worth about $628 against a $589.47 close — 6.5% above — at the default 8.5% cost of capital; the upside path $1,101; the reversion path $393. The 62-analyst consensus at $756.95 sits between plan and upside. The asymmetry to hold on to: depreciation reaches roughly $118bn a year by 2031 in the central path against $26bn today, and that charge is already determined by signed contracts, while the revenue meant to absorb it depends on personal agents — a product category nobody has shipped at consumer scale.',
    invalidation:
      'The one number that flips the file: advertising price growth, +12% in Q2 2026, carries half the growth and the whole "AI improves the core business" thesis — below +6% for two consecutive quarters, the reversion path becomes the central case. Free cash flow is negative in 2026 and 2027 on all three paths ($0.78bn in Q2 against $8.55bn a year earlier, capex at 51% of revenue). And note where the real risk sits: with terminal value at 89% of enterprise value, moving the rate from 7.5% to 9.5% swings the plan path from $787 to $518 — a wider spread than plan versus reversion. The principal risk is not that agents fail to sell; it is that long rates fail to fall.',
    horizon: 'Connect on 23 September 2026 (glasses, and personal agents if they exist), Q3 print late October — the first quantified 2027 capex, US youth trials through H2, Hyperion leases entering the balance sheet from 2029.',
    discountRate:
      '8.5% WACC and 3.0% terminal growth on the interactive model\'s defaults. The three paths carry no probability weights — the report names what each requires and prices all three, and the card invents no weighting',
  },
]
