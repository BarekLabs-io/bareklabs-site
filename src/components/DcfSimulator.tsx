import { useEffect, useMemo, useState } from 'react'
import { runDcf, exitMultipleValue, upsidePct, type DcfInputs } from '@/lib/dcf'
import { parseAmountNative } from '@/lib/marketCap'
import { parseMetricValue } from '@/lib/priceSeries'
import { companies } from '@/data/companies'
import { currencyOf, formatMoney, withCurrency } from '@/data/valueChain'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

/* Prefills come from each ticker's own researched metrics — nothing is
 * invented to fill a box. Where a field can't be derived it starts blank and
 * is flagged, rather than being seeded with a plausible-looking number the
 * reader would take for data. `provenance` drives that labelling. */
type Provenance = 'derived' | 'sourced' | 'assumption' | 'missing'

function metric(ticker: string, pattern: RegExp): string | null {
  const c = companies[ticker]
  return c?.valuation.metrics.find((m) => pattern.test(m.label))?.values[0] ?? null
}

type Prefill = {
  inputs: DcfInputs
  provenance: Record<string, Provenance>
  price: number | null
  currency: string
}

/* Every money figure below is carried in MILLIONS of the listing currency, so
 * the boxes read like a model rather than like a bank statement, and so
 * equity-value-over-shares lands on a per-share number without either side
 * needing a scale factor. */
const M = 1e6

function buildPrefill(ticker: string): Prefill {
  const currency = currencyOf(ticker)
  const price = parseMetricValue(metric(ticker, /^price|^share price/i) ?? undefined)
  // Cap and price must be in the SAME currency to divide into a share count,
  // so this uses the cap as written rather than the USD-converted figure.
  const capRaw = parseAmountNative(metric(ticker, /market cap/i))
  const capNative = capRaw != null ? capRaw / M : null
  const psRaw = parseMetricValue(metric(ticker, /^p\/s/i) ?? undefined)
  const revAbs = parseAmountNative(metric(ticker, /^revenue \(ttm\)/i))
  const revRaw = revAbs != null ? revAbs / M : null
  const opMargin = parseMetricValue(metric(ticker, /operating margin/i) ?? undefined)
  const netMargin = parseMetricValue(metric(ticker, /net margin/i) ?? undefined)
  const growth = parseMetricValue(metric(ticker, /revenue growth/i) ?? undefined)

  const provenance: Record<string, Provenance> = {}

  // Shares ≈ market cap / price. Both researched, same currency.
  let shares = 0
  if (capNative != null && price != null && price > 0) {
    shares = capNative / price
    provenance.shares = 'derived'
  } else {
    provenance.shares = 'missing'
  }

  // Revenue: prefer a stated TTM revenue, else back it out of P/S.
  let revenue = 0
  if (revRaw != null) {
    revenue = revRaw
    provenance.revenue = 'sourced'
  } else if (capNative != null && psRaw != null && psRaw > 0) {
    revenue = capNative / psRaw
    provenance.revenue = 'derived'
  } else {
    provenance.revenue = 'missing'
  }

  // EBIT margin: operating margin if we have it; net margin is a rough stand-in
  // (it is after interest and tax, so it understates EBIT) — flagged as such.
  let ebitMarginPct = 0
  if (opMargin != null) {
    ebitMarginPct = opMargin
    provenance.ebitMarginPct = 'sourced'
  } else if (netMargin != null) {
    ebitMarginPct = netMargin
    provenance.ebitMarginPct = 'derived'
  } else {
    provenance.ebitMarginPct = 'missing'
  }

  if (growth != null) provenance.growthPct = 'sourced'
  else provenance.growthPct = 'assumption'

  // No net-debt figure is held for most tickers, so this stays at zero and is
  // called out. Zero net debt makes equity == enterprise value, which flatters
  // any levered name — the UI says so rather than hiding it.
  provenance.netDebt = 'missing'
  provenance.waccPct = 'assumption'
  provenance.terminalGrowthPct = 'assumption'
  provenance.taxRatePct = 'assumption'
  provenance.reinvestmentPct = 'assumption'

  return {
    currency,
    price,
    provenance,
    inputs: {
      revenue: Math.round(revenue * 10) / 10,
      growthPct: growth ?? 12,
      // Left at zero when we hold no margin for the name — the warning below
      // says so. Seeding a plausible 15% here would read as researched.
      ebitMarginPct: Math.round(ebitMarginPct * 10) / 10,
      waccPct: 9.5,
      terminalGrowthPct: 2.5,
      taxRatePct: 21,
      reinvestmentPct: 15,
      netDebt: 0,
      shares: Math.round(shares * 100) / 100,
    },
  }
}

const FIELDS: { key: keyof DcfInputs; step: number; suffix?: string }[] = [
  { key: 'revenue', step: 10 },
  { key: 'growthPct', step: 0.5, suffix: '%' },
  { key: 'ebitMarginPct', step: 0.5, suffix: '%' },
  { key: 'waccPct', step: 0.25, suffix: '%' },
  { key: 'terminalGrowthPct', step: 0.25, suffix: '%' },
  { key: 'taxRatePct', step: 1, suffix: '%' },
  { key: 'reinvestmentPct', step: 1, suffix: '%' },
  { key: 'netDebt', step: 100 },
  { key: 'shares', step: 1 },
]

export function DcfSimulator({ ticker, livePrice }: { ticker: string; livePrice?: number | null }) {
  const { t } = useLang()
  const d = t.chain.dcf
  const prefill = useMemo(() => buildPrefill(ticker), [ticker])
  const [inputs, setInputs] = useState<DcfInputs>(prefill.inputs)
  const [targetPe, setTargetPe] = useState(30)

  // Re-seed whenever the constellation selection changes.
  useEffect(() => {
    setInputs(prefill.inputs)
  }, [prefill])

  const price = livePrice ?? prefill.price
  /* With no revenue or no margin the model still "works" — it returns zero,
   * and a zero fair value next to a live price prints as "-100% vs spot",
   * which reads as a call rather than as an empty box. Show nothing but the
   * missing-inputs warning until there is something to discount. */
  const computable = inputs.revenue > 0 && inputs.ebitMarginPct > 0
  const result = computable ? runDcf(inputs) : null
  const peValue = computable ? exitMultipleValue(inputs, targetPe) : null
  const dcfUpside = result && price ? upsidePct(result.perShare, price) : null
  const peUpside = peValue && price ? upsidePct(peValue, price) : null
  const company = companies[ticker]

  const set = (k: keyof DcfInputs, v: string) =>
    setInputs((prev) => ({ ...prev, [k]: v === '' ? 0 : Number(v) }))

  const fmt = (v: number) => formatMoney(v, prefill.currency)
  /* Enterprise and equity value come out of the model in millions. Printing
   * "$73,308" for a $73bn company invites a three-orders-of-magnitude misread,
   * so those two are rescaled to a suffix on the way out — always with two
   * decimals, so the net-debt bridge between them stays visible even in a
   * currency normally quoted whole (¥6.99T vs ¥7.14T, not ¥7T twice). */
  const fmtScale = (millions: number) => {
    const abs = Math.abs(millions)
    const [v, unit] = abs >= 1e6 ? [millions / 1e6, 'T'] : abs >= 1e3 ? [millions / 1e3, 'B'] : [millions, 'M']
    const num = v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return `${withCurrency(num, prefill.currency)}${unit}`
  }
  /* Only warn about a field the reader has not already answered. The
   * provenance says what we hold on file; once a real number is typed in, the
   * box is no longer an empty one and repeating the warning just nags. */
  const missing = Object.entries(prefill.provenance).filter(
    ([k, p]) => p === 'missing' && !(inputs[k as keyof DcfInputs] as number)
  )

  return (
    <div className="border border-line bg-panel">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-6 py-4">
        <div>
          <div className="font-mono-lab text-[9px] tracking-[0.3em] text-signal">{d.label}</div>
          <h3 className="mt-1 text-lg font-medium tracking-tight md:text-xl">
            {d.title} <span className="font-mono-lab text-sm text-dim" dir="ltr">{ticker}</span>
          </h3>
        </div>
        {price != null && (
          <div className="text-end font-mono-lab text-[10px] tracking-wider text-faint">
            {d.spot}
            <div className="mt-0.5 text-base tabular-nums text-foreground" dir="ltr">{fmt(price)}</div>
          </div>
        )}
      </div>

      {!company ? (
        <p className="px-6 py-8 font-mono-lab text-[11px] leading-5 tracking-wide text-faint">{d.noData}</p>
      ) : (
        <div className="grid gap-0 lg:grid-cols-12">
          {/* ---- assumptions ---- */}
          <div className="border-b border-line p-6 lg:col-span-5 lg:border-b-0 lg:border-e">
            <div className="font-mono-lab text-[9px] tracking-[0.25em] text-dim">{d.assumptions}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {FIELDS.map((f) => {
                const prov = prefill.provenance[f.key]
                return (
                  <label key={f.key} className="block">
                    <span className="flex items-baseline justify-between font-mono-lab text-[9px] tracking-[0.12em] text-faint">
                      <span>{d.fields[f.key]}</span>
                      {/* Every field is badged, defaults included — an unlabelled
                          box reads as researched when it is just a starting value. */}
                      {prov && (
                        <span
                          className={cn(
                            prov === 'missing'
                              ? 'text-danger'
                              : prov === 'derived'
                                ? 'text-warn'
                                : prov === 'assumption'
                                  ? 'text-faint'
                                  : 'text-signal'
                          )}
                          title={d.provenanceNote[prov]}
                        >
                          {d.provenance[prov]}
                        </span>
                      )}
                    </span>
                    <input
                      type="number"
                      step={f.step}
                      value={Number.isFinite(inputs[f.key] as number) ? (inputs[f.key] as number) : ''}
                      onChange={(e) => set(f.key, e.target.value)}
                      className="mt-1 w-full border border-line bg-card2 px-2.5 py-1.5 font-mono-lab text-[12px] tabular-nums text-foreground focus:border-signal focus:outline-none"
                      dir="ltr"
                    />
                  </label>
                )
              })}
              <label className="block">
                <span className="font-mono-lab text-[9px] tracking-[0.12em] text-faint">{d.fields.targetPe}</span>
                <input
                  type="number"
                  step={1}
                  value={targetPe}
                  onChange={(e) => setTargetPe(Number(e.target.value) || 0)}
                  className="mt-1 w-full border border-line bg-card2 px-2.5 py-1.5 font-mono-lab text-[12px] tabular-nums text-foreground focus:border-signal focus:outline-none"
                  dir="ltr"
                />
              </label>
            </div>
            <p className="mt-4 font-mono-lab text-[9px] leading-4 tracking-wide text-faint">{d.unitsNote}</p>
          </div>

          {/* ---- results ---- */}
          <div className="p-6 lg:col-span-7">
            {!computable ? null : !result ? (
              <div className="border border-danger/40 bg-danger/5 p-4 font-mono-lab text-[11px] leading-5 tracking-wide text-danger">
                {d.invalid}
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Outcome
                    label={d.dcfValue}
                    value={fmt(result.perShare)}
                    upside={dcfUpside}
                    upsideLabel={d.vsSpot}
                  />
                  <Outcome
                    label={`${d.peValue} · ${targetPe}×`}
                    value={peValue != null ? fmt(peValue) : '—'}
                    upside={peUpside}
                    upsideLabel={d.vsSpot}
                  />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden border border-line bg-line">
                  <Cell label={d.enterpriseValue} value={fmtScale(result.enterpriseValue)} />
                  <Cell label={d.equityValue} value={fmtScale(result.equityValue)} />
                  <Cell
                    label={d.terminalWeight}
                    value={`${(result.terminalWeight * 100).toFixed(0)}%`}
                    tone={result.terminalWeight > 0.8 ? 'warn' : undefined}
                  />
                </div>

                {/* projected free cash flow */}
                <div className="mt-6">
                  <div className="font-mono-lab text-[9px] tracking-[0.25em] text-dim">
                    {d.fcfLabel} <span className="text-faint">· M</span>
                  </div>
                  <div className="mt-3 flex items-end gap-2">
                    {result.fcf.map((v, i) => {
                      const max = Math.max(...result.fcf.map(Math.abs), 1)
                      const h = Math.max(4, (Math.abs(v) / max) * 84)
                      return (
                        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                          <span className="font-mono-lab text-[9px] tabular-nums text-dim" dir="ltr">
                            {Math.round(v).toLocaleString('en-US')}
                          </span>
                          <div
                            className={cn('w-full transition-all duration-500', v >= 0 ? 'bg-signal/70' : 'bg-danger/70')}
                            style={{ height: `${h}px` }}
                          />
                          <span className="font-mono-lab text-[9px] text-faint">Y{i + 1}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {result.terminalWeight > 0.8 && (
                  <p className="mt-5 border-s-2 border-warn ps-3 font-mono-lab text-[10px] leading-4 tracking-wide text-warn">
                    {d.terminalWarning}
                  </p>
                )}
              </>
            )}

            {missing.length > 0 && (
              <p className="mt-5 border-s-2 border-danger ps-3 font-mono-lab text-[10px] leading-4 tracking-wide text-danger">
                {d.missingWarning.replace(
                  '{fields}',
                  missing.map(([k]) => d.fields[k as keyof typeof d.fields] ?? k).join(', ')
                )}
              </p>
            )}
            <p className="mt-5 border-t border-line pt-4 font-mono-lab text-[9.5px] leading-4 tracking-wide text-faint">
              {d.disclaimer}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function Outcome({
  label,
  value,
  upside,
  upsideLabel,
}: {
  label: string
  value: string
  upside: number | null
  upsideLabel: string
}) {
  return (
    <div className="border border-line bg-card2 p-4">
      <div className="font-mono-lab text-[9px] tracking-[0.2em] text-faint">{label}</div>
      <div className="mt-2 font-mono-lab text-2xl tabular-nums text-foreground" dir="ltr">{value}</div>
      {upside != null && (
        <div
          className={cn('mt-1 font-mono-lab text-[11px] tabular-nums', upside >= 0 ? 'text-signal' : 'text-danger')}
          dir="ltr"
        >
          {upside >= 0 ? '+' : ''}{upside.toFixed(1)}% <span className="text-faint">{upsideLabel}</span>
        </div>
      )}
    </div>
  )
}

function Cell({ label, value, tone }: { label: string; value: string; tone?: 'warn' }) {
  return (
    <div className="bg-card2 p-3">
      <div className="font-mono-lab text-[8.5px] tracking-[0.18em] text-faint">{label}</div>
      <div
        className={cn('mt-1 font-mono-lab text-[13px] tabular-nums', tone === 'warn' ? 'text-warn' : 'text-foreground')}
        dir="ltr"
      >
        {value}
      </div>
    </div>
  )
}
