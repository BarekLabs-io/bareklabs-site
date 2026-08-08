import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

/* The lab's intake form, built as a console rather than a form card.
 *
 * The proof-of-work step (see api/contact.ts) has to happen anyway, so it is
 * shown rather than hidden behind a spinner: the reader watches the hash
 * search run, which is both the honest description of what the button does
 * and the most interesting second of the interaction.
 *
 * Nothing here is decorative. The counter is real attempts, the digest is the
 * real current hash, and the bar tracks real progress toward the difficulty
 * target. If the search were fake, the submission would fail server-side. */

/* 16 bits ≈ 65k expected hashes ≈ under a second on a phone, and a second per
 * message is the whole cost model that makes bulk sending pointless. 18 was
 * measured at ~4s on a laptop, which is a long time to watch a button. */
const DIFFICULTY_BITS = 16
const TOPICS = ['ADVISORY', 'RESEARCH', 'COLLABORATION', 'GENERAL'] as const

function leadingZeroBits(bytes: Uint8Array): number {
  let bits = 0
  for (const b of bytes) {
    if (b === 0) {
      bits += 8
      continue
    }
    bits += Math.clz32(b) - 24
    break
  }
  return bits
}

const hex = (bytes: Uint8Array) => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')

type Phase = 'idle' | 'solving' | 'sending' | 'sent' | 'error'

export function ContactConsole() {
  const { t } = useLang()
  const c = t.about.console
  const [phase, setPhase] = useState<Phase>('idle')
  const [attempts, setAttempts] = useState(0)
  const [digest, setDigest] = useState('')
  const [best, setBest] = useState(0)
  const [errorKey, setErrorKey] = useState<string>('')
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>('ADVISORY')
  const renderedAt = useRef(Date.now())
  const cancelled = useRef(false)

  useEffect(() => () => { cancelled.current = true }, [])

  async function solve(email: string, ts: number): Promise<number> {
    const enc = new TextEncoder()
    let nonce = 0
    /* Best-so-far is tracked in a local, not read back off state: inside this
     * loop `best` is the value captured when solve() was called and never
     * updates, so comparing against it pinned the progress bar near zero. */
    let bestBits = 0
    // Yield to the event loop between slices so the UI keeps painting.
    for (;;) {
      for (let i = 0; i < 800; i++, nonce++) {
        const buf = await crypto.subtle.digest('SHA-256', enc.encode(`${email}|${ts}|${nonce}`))
        const bytes = new Uint8Array(buf)
        const bits = leadingZeroBits(bytes)
        if (bits >= DIFFICULTY_BITS) {
          setDigest(hex(bytes))
          setBest(bits)
          setAttempts(nonce)
          return nonce
        }
        if (bits > bestBits) {
          bestBits = bits
          setBest(bits)
        }
        if (nonce % 200 === 0) setDigest(hex(bytes))
      }
      setAttempts(nonce)
      if (cancelled.current) throw new Error('cancelled')
      await new Promise((r) => setTimeout(r, 0))
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (phase === 'solving' || phase === 'sending') return
    const data = new FormData(e.currentTarget)
    const email = String(data.get('email') || '')
    const ts = renderedAt.current

    setPhase('solving')
    setErrorKey('')
    setAttempts(0)
    setBest(0)
    try {
      const nonce = await solve(email, ts)
      setPhase('sending')
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email,
          subject: data.get('subject'),
          message: data.get('message'),
          website: data.get('website'),
          topic,
          ts,
          nonce,
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (res.ok && json.ok) {
        setPhase('sent')
        return
      }
      setErrorKey(json.error || 'unknown')
      setPhase('error')
    } catch {
      setErrorKey('network')
      setPhase('error')
    }
  }

  const busy = phase === 'solving' || phase === 'sending'
  const pct = Math.min((best / DIFFICULTY_BITS) * 100, 100)

  if (phase === 'sent') {
    return (
      <div className="border border-signal/40 bg-signal/5 p-8 md:p-10">
        <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">{c.sentLabel}</div>
        <p className="mt-4 max-w-6xl font-mono-lab text-[12px] leading-6 text-dim">{c.sentBody}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="border border-line bg-card2">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono-lab text-[9px] tracking-[0.3em] text-dim">{c.header}</span>
        <span className="font-mono-lab text-[9px] tracking-[0.2em] text-faint" dir="ltr">{c.headerRight}</span>
      </div>

      <div className="grid gap-px bg-line md:grid-cols-2">
        <label className="bg-card2 p-5">
          <span className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{c.fields.name}</span>
          <input
            name="name"
            autoComplete="name"
            className="mt-2 w-full border-b border-line bg-transparent pb-2 font-mono-lab text-[12px] text-foreground outline-none transition-colors focus:border-signal"
          />
        </label>
        <label className="bg-card2 p-5">
          <span className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{c.fields.email} *</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full border-b border-line bg-transparent pb-2 font-mono-lab text-[12px] text-foreground outline-none transition-colors focus:border-signal"
          />
        </label>
      </div>

      <div className="border-t border-line px-5 py-5">
        <span className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{c.fields.topic}</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPICS.map((tp) => (
            <button
              key={tp}
              type="button"
              onClick={() => setTopic(tp)}
              className={cn(
                'border px-3 py-1.5 font-mono-lab text-[9.5px] tracking-[0.2em] transition-all duration-200',
                topic === tp ? 'border-signal bg-signal text-[#0c0e12]' : 'border-line text-dim hover:border-line-hover hover:text-foreground'
              )}
            >
              {c.topics[tp]}
            </button>
          ))}
        </div>
        <p className="mt-3 font-mono-lab text-[10px] leading-5 text-faint">{c.topicNotes[topic]}</p>
      </div>

      <label className="block border-t border-line px-5 py-5">
        <span className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{c.fields.subject}</span>
        <input
          name="subject"
          className="mt-2 w-full border-b border-line bg-transparent pb-2 font-mono-lab text-[12px] text-foreground outline-none transition-colors focus:border-signal"
        />
      </label>

      <label className="block border-t border-line px-5 py-5">
        <span className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{c.fields.message} *</span>
        <textarea
          name="message"
          required
          rows={6}
          className="mt-2 w-full resize-y border-b border-line bg-transparent pb-2 font-mono-lab text-[12px] leading-6 text-foreground outline-none transition-colors focus:border-signal"
        />
      </label>

      {/* Honeypot: off-screen, not display:none, so a bot reading styles still
        * sees a normal field. Never announced to assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* The proof-of-work console. Idle it explains itself; running it shows
        * the real search. */}
      <div className="border-t border-line bg-panel px-5 py-4">
        <div className="flex items-center justify-between font-mono-lab text-[9px] tracking-[0.25em]">
          <span className={busy ? 'text-signal' : 'text-faint'}>{busy ? c.pow.running : c.pow.label}</span>
          <span className="tabular-nums text-faint" dir="ltr">
            {best}/{DIFFICULTY_BITS} {c.pow.bits}
          </span>
        </div>
        <div className="mt-2 h-[3px] w-full bg-track">
          <div className="h-full bg-signal transition-all duration-200" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 truncate font-mono-lab text-[9.5px] text-faint" dir="ltr">
          {digest ? `${attempts.toLocaleString('en-US')} · ${digest.slice(0, 40)}…` : c.pow.idle}
        </div>
      </div>

      {phase === 'error' && (
        <div className="border-t border-danger/40 bg-danger/5 px-5 py-4">
          <p className="font-mono-lab text-[11px] leading-5 text-danger">
            {c.errors[errorKey as keyof typeof c.errors] ?? c.errors.unknown}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className={cn(
          'flex w-full items-center justify-between border-t border-line px-5 py-4 font-mono-lab text-[10px] tracking-[0.25em] transition-all duration-300',
          busy ? 'cursor-wait text-faint' : 'text-signal hover:bg-signal hover:text-[#0c0e12]'
        )}
      >
        <span>{phase === 'solving' ? c.cta.solving : phase === 'sending' ? c.cta.sending : c.cta.idle}</span>
        <span dir="ltr">{busy ? '···' : '→'}</span>
      </button>
    </form>
  )
}
