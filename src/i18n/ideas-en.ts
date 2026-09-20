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

  /* Memory supply chain, reports n°09 to n°19, in report order. Every
   * figure is lifted from the delivered card markdown and from nowhere
   * else.
   *
   * Sector note, flagged rather than settled quietly: the delivered cards
   * put WDC/STX, SUMCO and Micron under AI INFRA and say so explicitly —
   * mass storage and silicon wafers have no entry of their own in the
   * nomenclature, and both cards ask for the point to be raised. MEMORY
   * and MATERIALS are the publisher's call, taken knowingly. */
  {
    id: 'IDEA-10',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'MEMORY',
    company: 'Western Digital · Seagate',
    tickers: ['WDC', 'STX'],
    report: 'wdc-stx',
    title: 'The best year in hard-drive history, and the rate it takes to pay for it',
    thesis:
      'Western Digital and Seagate are out of the best year in their history — 54.1% and 52.7% gross margin last quarter, order books sold out to 2028, no new capacity announced. The T2 blocking test FAILS on both: the bull case tops out at $224.76 and $378.12 against prices of $432.76 and $814.75. The report therefore becomes a REVERSE DCF. For the central case to be worth the market price, it has to be discounted at 5.72% and 5.27% — on shares whose observed annualised volatility is 133.1% and 119.8%.',
    entry:
      'There is no entry level to give, and that is the point: the disagreement is not about a price but about the discount rate. What would make this file different is not a fall in the price but a durable normalisation of the beta, today at 2.17 and 2.07. The only industrial event that would move the central case towards the bull case would be published multi-year flat-capacity commitments alongside firm-price long-term agreements beyond 2028.',
    invalidation:
      'The reading breaks if the beta normalises durably towards that of an ordinary equipment maker, which would close the gap without a single industrial fact changing; if the duopoly publishes flat-capacity commitments beyond 2028; if revenue durably passes $25bn per company before 2030, against 2032 in the bull case; or if several hundred exabytes of NAND capacity are formally committed to nearline, with a schedule and financing.',
    horizon: 'Year ended 3 July 2026, reported 28 July (STX) and 5 August 2026 (WDC); Q1 FY2027 expected late October 2026; modelled to 2036',
    discountRate:
      '13.06% for WDC and 12.64% for STX — risk-free rate 4.65%, equity risk premium 4.75%, observed betas 2.17 and 2.07 Blume-adjusted to 1.78 and 1.71; no judgement override on the observed beta. At 8% the central case comes out at $262.65 and $423.15: the conclusion holds, its magnitude does not',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-11',
    date: '2026-08-07',
    status: 'WATCHING',
    sector: 'MEMORY',
    company: 'Phison Electronics',
    tickers: ['8299.TWO'],
    report: 'phison',
    freshness: 'Predates the Q2 accounts',
    title: 'The firmware company',
    thesis:
      'The only independent NAND controller maker in the world. Its real asset is twenty years of firmware qualified against four manufacturers\' memory, and it appears nowhere on the balance sheet. Weighted target TWD 3,375 (+67.1%), and the gap WIDENS under the 8% robustness test (TWD 3,838, +90.0%).',
    entry:
      'The gap does not rest on the Taiwanese risk-free rate, the lowest in the series. What the report does publish is its explicit disagreement with TrendForce on the timing of the NAND turn, noting that every source that agrees with it is structurally long NAND.',
    invalidation:
      'Q2 2026 gross margin, due around mid-August: if it does not clear 61.3% despite the NAND surge, the 315 days of forward inventory have stopped protecting and the leverage runs the other way.',
    horizon: 'Q2 financial report around mid-August 2026; modelled to 2036',
    discountRate:
      '8.91% WACC = cost of equity, TWD risk-free rate 1.94%, observed beta 1.698',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-12',
    date: '2026-08-07',
    status: 'WATCHING',
    sector: 'MEMORY',
    company: 'SanDisk · Kioxia',
    tickers: ['SNDK', '285A.T'],
    report: 'sandisk-kioxia',
    freshness: 'Kioxia figures predate the 1 October 2026 share split',
    title: 'What you must believe',
    thesis:
      'Two NAND makers out of the same Japanese joint venture, listed for under eighteen months, with betas of 3.65 and 5.19. Kioxia comes out at JPY 32,904 (−31.1%) — but at JPY 46,436, which is the market price, on a sector beta of 2.10. SanDisk FAILS the bull-case test: that half of the report is a reverse DCF.',
    entry:
      'No intrinsic value is published for SanDisk. The report states the three things one would have to believe to justify $1,212.21: a 7.56% cost of capital, joint-venture capex with no economic effect, and an 84.6% gross margin that is at least partly structural.',
    invalidation:
      'For SanDisk: the annual report detailing the BiCS joint-venture commitments — real economic capex above accounting capex would WIDEN the gap. For both: a beta recomputed over three to five years of trading.',
    horizon: 'Kioxia three-for-one share split on 1 October 2026; modelled to 2036',
    discountRate:
      '15.99% WACC (Kioxia, JPY risk-free rate 2.80%) and 22.74% (SanDisk, USD risk-free rate 4.65%), each in its own currency',
    scenarios: [
      { label: 'BEAR', prob: 35, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 20, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-13',
    date: '2026-08-07',
    status: 'WATCHING',
    sector: 'MEMORY',
    company: 'Micron Technology',
    tickers: ['MU'],
    report: 'micron',
    title: 'The perfect quarter, and what you must believe to extend it',
    thesis:
      'Micron has just printed the highest margins any memory maker has ever posted — 84.9% gross, 81.2% operating — and guides the next one higher still. At $880 the market pays the bull case almost at the convention rate (11.79% against 12.98%). The disagreement is about neither quality nor rate: it is about how deep the next trough runs, and so about the file\'s one real novelty — 16 price-floor customer agreements, never tested in a downturn. Weighted target $460.71.',
    entry:
      'The dominant variable is not the rate but the depth of the next trough: the bear-to-base spread weighs more than 200 basis points of WACC. The event that would move the weighting is the first real test of those agreements — two to three quarters of correction during which customers honour the floors. Until then, ADATA\'s gross margin and contract DRAM pricing serve as the warning system.',
    invalidation:
      'The cautious reading breaks if the price-floor agreements hold through a first downturn, in which case the BLUE_SKY scenario rises in probability; if DRAM stays tight beyond 2027 against the history of the cycle; or if sector capex stays disciplined under 20% of revenue despite record margins. Conversely, an inflection in contract DRAM pricing before mid-2027, or sector capex durably above 25%, validates the bear case.',
    horizon: 'FQ3 2026 reported 24 June 2026; FQ4 expected late September 2026; modelled to 2036',
    discountRate:
      '12.98% WACC — USD risk-free rate 4.65%, observed beta 2.142 Blume-adjusted to 1.765, 4.75% premium, marginal debt. The fourth scenario, BLUE_SKY at $1,007.34, was CONSTRUCTED to satisfy the widening test and is flagged as such, not discovered; the organic bull case tops out at $789.26. The weighted target is struck on all four. At 8% the central case comes out at $687.35: the conclusion holds',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 18, tone: 'up' },
      { label: 'BLUE_SKY', prob: 7, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-14',
    date: '2026-08-07',
    status: 'WATCHING',
    sector: 'MEMORY',
    company: 'SK hynix',
    tickers: ['000660.KS'],
    report: 'skhynix',
    title: 'The rate is the thesis',
    thesis:
      'The best quarter in SK hynix\'s history, and a conclusion that flips with the cost of capital: KRW 1,181,420 (−16.9%) at the 13.47% convention WACC, KRW 2,081,859 (+46.4%) at 8%. The observed beta of 2.413 is computed over the most violent stretch in memory\'s history.',
    entry:
      'A cost-of-capital file, not an operating one. The report publishes the gap between the model price (KRW 1,422,000) and the 7 August IBKR close (KRW 1,465,000, +3.0%) rather than settling it quietly.',
    invalidation:
      'An inflection in contract DRAM pricing before mid-2027, or sector capex durably above 25% of combined revenue.',
    horizon: 'Quarterly prints; modelled to 2036',
    discountRate:
      '13.47% WACC = cost of equity (net cash), KRW risk-free rate 4.22%',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-15',
    date: '2026-08-07',
    status: 'WATCHING',
    sector: 'MEMORY',
    company: 'Winbond Electronics',
    tickers: ['2344.TW'],
    report: 'winbond',
    title: 'Fairly priced',
    thesis:
      'Specialty memory: selling prices more than doubled in a quarter while bits shipped fell 10%, a 70.3% gross margin on memory alone. The weighted target lands at TWD 154, or −6.0% — at the market. The first report from the lab that finds no gap and publishes that as the finding.',
    entry:
      'Low expected disagreement, wide dispersion: from 54% below the price to 64% above it. The report says the market is pricing a niche-versus-cycle mix correctly rather than manufacturing a gap.',
    invalidation:
      'FRAGILE CONCLUSION: it changes sign at an 8% WACC (TWD 186, +13.6%). The central case meets the price at 8.37%, a point below the convention. The most rate-sensitive file in the series.',
    horizon: 'Quarterly prints; modelled to 2036',
    discountRate:
      '9.34% WACC, TWD risk-free rate 1.94%, observed beta 1.878 (over a window of +874% then −30%)',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-16',
    date: '2026-08-07',
    status: 'WATCHING',
    sector: 'MEMORY',
    company: 'ADATA Technology',
    tickers: ['3260.TWO'],
    report: 'adata',
    freshness: 'Predates the Q2 accounts',
    title: 'A bet on beta, not on ADATA',
    thesis:
      'INCONCLUSIVE BY CONSTRUCTION. On exactly the same scenarios: TWD 811 (+94.8%) at the observed beta of 0.944, TWD 478 (+14.8%) at the sector beta of 1.90. One input changes, and it has nothing to do with the company.',
    entry:
      'No single target is published. What remains and is worth the detour: ADATA\'s gross margin — down from 55.69% to 42.10% IN A RISING MARKET — is the cleanest leading sensor in the whole memory cycle, worth watching for every other file in the series.',
    invalidation:
      'A beta recomputed on clean data, with benchmark, window and frequency all declared. That is the only thing that would turn this document into a valuation report.',
    horizon: 'Full Q2 statements around mid-August 2026; Q3 gross margin as a sector signal',
    discountRate:
      '5.82% WACC at the observed beta, 8.30% at the sector beta — TWD risk-free rate 1.94%',
    scenarios: [
      { label: 'BEAR', prob: 35, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 20, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-17',
    date: '2026-08-07',
    status: 'WATCHING',
    sector: 'DISTRIBUTION',
    company: 'Arrow Electronics · Avnet',
    tickers: ['ARW', 'AVT'],
    report: 'arrow-avnet',
    title: 'A distributor\'s revenue measures almost nothing',
    thesis:
      'Arrow and Avnet post +32% and +47.7% growth, but a third of Avnet\'s is memory price inflation. The only quantity that counts is gross profit in dollars: Arrow books 1.8 times WT Micro\'s on half the volume. Weighted targets $266 and $120 against $202.36 and $96.87.',
    entry:
      'The two healthiest files in the batch: ordinary betas (1.20 and 1.11), 4% margins, moderate gaps. Arrow is the sturdier of the two — its central case only falls below the price at a 10.87% WACC, two points above the convention; Avnet\'s tips at 9.04%, under a point away.',
    invalidation:
      'The inventory turn: book-to-bill under 1 in two regions out of three, then days of inventory rising. At Avnet specifically, a −40% normalisation in memory pricing would create a writedown without a single unit of volume falling.',
    horizon: 'Quarterly prints; modelled to 2036',
    discountRate:
      '9.05% WACC (ARW) and 8.08% (AVT), USD risk-free rate 4.65%, observed betas',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-18',
    date: '2026-08-07',
    status: 'WATCHING',
    sector: 'DISTRIBUTION',
    company: 'WT Microelectronics',
    tickers: ['3036.TW'],
    report: 'wtmicro',
    title: 'What feeds the AI',
    thesis:
      'The world\'s largest semiconductor distributor, a 3.41% gross margin and operating leverage that cuts both ways. NVIDIA does not go through a distributor — but the thousands of power components around the processor do. Weighted target TWD 590 (+179.1%).',
    entry:
      'EXTREME RESULT, RULE R7 APPLIED. The report publishes its three weak points rather than its arguments: the 2026 starting base, when the company has just guided its datacentre business down sequentially; a working-capital convention that is probably too generous; and a 30% probability on the inventory turn that may be too low.',
    invalidation:
      'The sequential fall in datacentre revenue repeats in Q4 — at which point it is no longer a shipping calendar. Or the operating margin drops back under 2% for two quarters.',
    horizon: 'Monthly revenue prints; Q3 2026 as a checkpoint; modelled to 2036',
    discountRate:
      '6.88% WACC on Arrow\'s beta (1.20), taken as a sector proxy — the observed beta of 0.169 is a pre-Future legacy and unusable; both lines are published',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-19',
    date: '2026-08-07',
    status: 'WATCHING',
    sector: 'MATERIALS',
    company: 'SUMCO',
    tickers: ['3436.T'],
    report: 'sumco',
    title: 'The company that won\'t build',
    thesis:
      'SUMCO posts a JPY 6.4bn operating loss for the first half of 2026 and the market reads a company in trouble. Revenue is up 4.7% all the same, 300mm wafer shipments are at an all-time high, and rebuilt EBITDA reaches JPY 58.0bn at a 27.0% margin. The loss is produced by a depreciation step — JPY 64.4bn against 49.4bn a year earlier — while capex falls from 51.9 to 19.4bn. This is a harvest phase read as distress. Weighted target JPY 5,867 against a price of 3,500.',
    entry:
      'The thesis does not turn on an entry level but on a dated pivot: the moment the depreciation step flattens while prices keep rising. The first checkpoint is Q3 2026, guided to operating breakeven on a 28.6% EBITDA margin. Management warns, however, that Q4 can deteriorate again after maintenance: this is not a linear path.',
    invalidation:
      'The reading breaks if the Japanese risk-free rate rises sharply — at an 8% WACC the gap goes from +60% to +11.9% and disappears; if SUMCO reopens Yoshinogari or signs a run of long-term agreements at today\'s prices, which would contradict the return discipline the whole thesis rests on; if price increases stay under 10% a year, a level the chairman calls badly insufficient; or if Chinese capacity, up from 3% of the world in 2020 to 28% in 2025, qualifies on advanced nodes.',
    horizon: 'H1 FY2026 reported 6 August 2026; Q3 expected early November 2026; modelled to 2036',
    discountRate:
      '6.38% WACC — risk-free rate in YEN (10-year JGB, 2.80%) and not the US rate, the company reporting in JPY. Observed beta 1.136 Blume-adjusted to 1.0911, 4.75% equity risk premium, 7.98% cost of equity, debt at 23.1% of funding. The lab\'s first file whose weighted target sits ABOVE the price — and it does not read without the robustness warning above',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-20',
    date: '2026-08-07',
    status: 'WATCHING',
    sector: 'MATERIALS',
    company: 'Shin-Etsu Chemical',
    tickers: ['4063.T'],
    report: 'shinetsu',
    title: 'The segment you cannot see',
    thesis:
      'The world number one in silicon wafers, PVC and the most advanced photoresists, at a 24.7% operating margin and 78.7% equity. And no disclosure at all of the wafer line. Sum of the parts across the four published segments: JPY 4,220 (−31.3%) against JPY 6,140.',
    entry:
      'NO DCF, AND THAT IS A DECISION: building a discounted \'wafer\' cash flow would mean inventing the central number. The high case does not reach the price — the report switches to a REVERSE SUM OF THE PARTS and states that one would have to value Electronic Materials at 25.1x its operating profit, with the other segments left on ordinary chemicals multiples.',
    invalidation:
      'Shin-Etsu discloses the revenue or the profit of its wafer line. Or group operating profit recovers well above the year used, which was down 14.4%.',
    horizon: 'Q1 FY2027 published 24 July 2026, not yet incorporated; next tanshin',
    discountRate:
      'No discount rate: a multiples method. Cost of equity published for comparability: 7.81%, JPY risk-free rate 2.80%, beta 1.082',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
]
