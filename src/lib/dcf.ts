/* A small two-stage DCF, plus an exit-multiple cross-check.
 *
 * Written to fix two things in the model this replaces:
 *
 *  1. It divided *enterprise* value by the share count to get a per-share
 *     "fair value". Enterprise value belongs to debt and equity holders
 *     together; equity holders only get what is left after the debt. For a
 *     levered name that overstates the answer badly, and it always errs on
 *     the flattering side. Net debt is subtracted here — and because we do
 *     not hold a net-debt figure for most tickers, the UI asks for it rather
 *     than defaulting to a silent zero.
 *
 *  2. Its reinvestment rate was documented as a share of EBIT but applied to
 *     NOPAT. Here it is applied to NOPAT and named for what it is.
 *
 * Everything is an explicit input: no growth, margin or discount rate is
 * inferred for you. A DCF is an argument, not a measurement — the numbers it
 * returns are only as good as the assumptions typed into it. */

export type DcfInputs = {
  /** Latest twelve months revenue, in millions of the listing currency. */
  revenue: number
  /** Annual revenue growth over the explicit forecast, as a percent. */
  growthPct: number
  /** Operating (EBIT) margin held over the forecast, as a percent. */
  ebitMarginPct: number
  /** Weighted average cost of capital, as a percent. */
  waccPct: number
  /** Perpetual growth rate past the forecast, as a percent. */
  terminalGrowthPct: number
  /** Effective tax rate, as a percent. */
  taxRatePct: number
  /** Capex + working capital, as a percent of NOPAT. */
  reinvestmentPct: number
  /** Debt less cash, in millions. Positive = net debt, negative = net cash. */
  netDebt: number
  /** Diluted shares outstanding, in millions. */
  shares: number
  /** Years in the explicit forecast before the terminal value. */
  years?: number
}

export type DcfResult = {
  /** Per-year projected free cash flow, undiscounted. */
  fcf: number[]
  /** Present value of the explicit forecast period. */
  pvExplicit: number
  /** Present value of the terminal value. */
  pvTerminal: number
  /** Total enterprise value. */
  enterpriseValue: number
  /** Enterprise value less net debt — what the equity is worth. */
  equityValue: number
  /** Equity value per share. */
  perShare: number
  /** Share of total value sitting in the terminal value, 0–1. */
  terminalWeight: number
}

/** Returns null when the inputs cannot produce a meaningful result. */
export function runDcf(i: DcfInputs): DcfResult | null {
  const years = i.years ?? 5
  const wacc = i.waccPct / 100
  const g = i.terminalGrowthPct / 100
  const tax = i.taxRatePct / 100
  const reinvest = i.reinvestmentPct / 100

  // A terminal value only converges while the discount rate exceeds the
  // perpetual growth rate. Otherwise the formula returns a negative or
  // infinite number that looks like an answer but isn't one.
  if (!(wacc > g)) return null
  if (!(i.shares > 0) || !Number.isFinite(i.revenue)) return null

  const fcf: number[] = []
  let revenue = i.revenue
  let pvExplicit = 0

  for (let t = 1; t <= years; t++) {
    revenue *= 1 + i.growthPct / 100
    const ebit = revenue * (i.ebitMarginPct / 100)
    const nopat = ebit * (1 - tax)
    const freeCash = nopat * (1 - reinvest)
    fcf.push(freeCash)
    pvExplicit += freeCash / Math.pow(1 + wacc, t)
  }

  const lastFcf = fcf[fcf.length - 1] ?? 0
  const terminalValue = (lastFcf * (1 + g)) / (wacc - g)
  const pvTerminal = terminalValue / Math.pow(1 + wacc, years)

  const enterpriseValue = pvExplicit + pvTerminal
  const equityValue = enterpriseValue - i.netDebt
  const perShare = equityValue / i.shares

  return {
    fcf,
    pvExplicit,
    pvTerminal,
    enterpriseValue,
    equityValue,
    perShare,
    terminalWeight: enterpriseValue !== 0 ? pvTerminal / enterpriseValue : 0,
  }
}

/** Exit-multiple cross-check: value the final year's earnings on a P/E. */
export function exitMultipleValue(i: DcfInputs, targetPe: number): number | null {
  const years = i.years ?? 5
  if (!(i.shares > 0) || !(targetPe > 0)) return null
  let revenue = i.revenue
  for (let t = 1; t <= years; t++) revenue *= 1 + i.growthPct / 100
  const netIncome = revenue * (i.ebitMarginPct / 100) * (1 - i.taxRatePct / 100)
  return (netIncome * targetPe) / i.shares
}

export function upsidePct(fair: number, price: number): number | null {
  if (!(price > 0) || !Number.isFinite(fair)) return null
  return ((fair - price) / price) * 100
}
