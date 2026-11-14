import { CircleAlert, CircleCheck, Lock, RotateCcw, ShieldCheck, TriangleAlert } from 'lucide-react'
import { SLOTS, usd } from '../data'
import { useAnimatedNumber } from '../hooks'

function PowerGauge({ ev, psu }) {
  const pct = psu ? Math.min(100, ev.load * 100) : 0
  const limit = 100 / 1.5
  const tone = !psu ? 'bg-ink-500' : ev.load > 1 ? 'bg-rose-400' : ev.psuWatts < ev.required ? 'bg-amber-400' : 'bg-ice-400'

  let message
  if (ev.draw === 0) message = 'Pick a CPU and a graphics card to estimate power draw.'
  else if (!psu) message = `Recommended power supply: ${ev.required} W or more.`
  else if (ev.psuWatts < ev.required) message = `Below the ${ev.required} W recommended minimum.`
  else message = `Meets the 1.5× headroom rule with ${ev.psuWatts - ev.draw} W to spare.`

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="label-mono">Power supply load</p>
        <p className="font-mono text-sm font-bold tabular-nums text-ink-50">{psu ? `${Math.round(ev.load * 100)}%` : '—'}</p>
      </div>
      <div className="relative mt-3 h-3 overflow-hidden rounded-sm bg-ink-900 ring-1 ring-ink-600">
        <div className={`h-full transition-[width,background-color] duration-500 ease-out ${tone}`} style={{ width: `${pct}%` }} />
        <div className="absolute inset-y-0 w-px bg-ink-100/70" style={{ left: `${limit}%` }} aria-hidden="true" />
      </div>
      <div className="relative mt-1.5 h-4 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-ink-400" aria-hidden="true">
        <span className="absolute left-0">0 W</span>
        <span className="absolute -translate-x-1/2" style={{ left: `${limit}%` }}>
          1.5× limit
        </span>
        <span className="absolute right-0">{psu ? `${ev.psuWatts} W` : 'PSU'}</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-ink-600 bg-ink-600 text-center">
        {[
          ['Est. draw', ev.draw ? `${ev.draw} W` : '—'],
          ['Recommended', ev.draw ? `${ev.required} W` : '—'],
          ['Your PSU', psu ? `${ev.psuWatts} W` : '—'],
        ].map(([k, v]) => (
          <div key={k} className="bg-ink-850 px-1 py-2.5">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-ink-400">{k}</p>
            <p className="mt-1 font-mono text-sm font-bold tabular-nums text-ink-50">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[0.8125rem] leading-snug text-ink-300">{message}</p>
    </div>
  )
}

function Status({ ev, onJump }) {
  if (ev.issues.length === 0) {
    const done = ev.complete
    return (
      <div className="flex items-start gap-3 rounded-lg border border-emerald-400/30 bg-emerald-400/[0.07] p-4">
        <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-300" aria-hidden="true" />
        <div>
          <p className="font-semibold text-emerald-200">{done ? 'All parts are compatible' : ev.filled ? 'No conflicts so far' : 'Nothing selected yet'}</p>
          <p className="mt-1 text-[0.8125rem] leading-snug text-ink-300">
            {done
              ? 'Socket, memory and power checks all pass.'
              : ev.filled
                ? 'Keep going. Parts are checked against each other as you choose.'
                : 'Pick a part or load a ready-made build to begin.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {ev.issues.map((i) => {
        const error = i.level === 'error'
        return (
          <li
            key={i.id}
            className={`rounded-lg border p-4 ${error ? 'border-rose-400/40 bg-rose-400/[0.07]' : 'border-amber-400/40 bg-amber-400/[0.07]'}`}
          >
            <div className="flex items-start gap-3">
              {error ? (
                <CircleAlert className="mt-0.5 size-5 shrink-0 text-rose-300" aria-hidden="true" />
              ) : (
                <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-300" aria-hidden="true" />
              )}
              <div className="min-w-0">
                <p className={`font-semibold ${error ? 'text-rose-200' : 'text-amber-200'}`}>{i.title}</p>
                <p className="mt-1 text-[0.8125rem] leading-snug text-ink-200">{i.detail}</p>
                <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-300">{i.fix}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {i.slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onJump(s)}
                      className="rounded border border-ink-500 px-2.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-100 hover:border-ice-400 hover:text-ice-300"
                    >
                      Change {SLOTS.find((x) => x.key === s).short}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default function Summary({ sel, ev, onJump, onClear, onCheckout }) {
  const total = useAnimatedNumber(ev.total)
  const blocked = !ev.complete || ev.errors.length > 0

  let hint
  if (!ev.complete) hint = `Select all ${SLOTS.length} parts to check out (${ev.filled}/${SLOTS.length}).`
  else if (ev.errors.length) hint = `Resolve ${ev.errors.length} conflict${ev.errors.length > 1 ? 's' : ''} to continue.`
  else if (ev.warnings.length) hint = 'Heads up: the power warning above does not block your order.'
  else hint = 'Assembled, burn-in tested and shipped in 3–4 business days.'

  return (
    <aside id="summary" className="card scroll-mt-24 rounded-xl lg:sticky lg:top-20" aria-label="Build summary">
      <div className="border-b border-ink-600 p-5">
        <div className="flex items-center justify-between">
          <p className="label-mono">Your build · {ev.filled}/{SLOTS.length} parts</p>
          {ev.filled > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-300 hover:text-rose-300"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" /> Clear
            </button>
          )}
        </div>
        <p className="mt-3 font-mono text-5xl font-bold tabular-nums tracking-tight text-ink-50" aria-live="polite">
          {usd(total)}
        </p>
        <p className="mt-1.5 font-mono text-xs text-ink-300">Assembly &amp; burn-in included</p>
      </div>

      <ul className="divide-y divide-ink-600/70 border-b border-ink-600">
        {SLOTS.map((s) => {
          const p = sel[s.key]
          return (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => onJump(s.key)}
                className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-white/[0.03]"
              >
                <span className="w-11 shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ice-400">{s.short}</span>
                <span className={`min-w-0 flex-1 truncate text-sm ${p ? 'text-ink-100' : 'text-ink-400'}`}>
                  {p ? `${p.brand} ${p.name}` : 'Not selected'}
                </span>
                <span className="font-mono text-sm tabular-nums text-ink-200">{p ? usd(p.price) : '—'}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="space-y-6 p-5">
        <PowerGauge ev={ev} psu={sel.psu} />

        <div>
          <p className="label-mono mb-3">Compatibility</p>
          <Status ev={ev} onJump={onJump} />
        </div>

        <div>
          <button type="button" onClick={onCheckout} disabled={blocked} className="btn-ice w-full">
            {blocked ? <Lock className="size-4" aria-hidden="true" /> : <ShieldCheck className="size-4" aria-hidden="true" />}
            Checkout
          </button>
          <p className="mt-3 text-center text-[0.8125rem] leading-snug text-ink-300" aria-live="polite">
            {hint}
          </p>
        </div>
      </div>
    </aside>
  )
}
