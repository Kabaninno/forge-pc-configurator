import { Check, Download } from 'lucide-react'
import { Container, SectionHead } from './ui'
import { PARTS, PRESETS, SLOTS, usd } from '../data'

const part = (slot, id) => PARTS[slot].find((p) => p.id === id)

export default function Presets({ activeId, onLoad }) {
  return (
    <section id="builds" className="py-16 lg:py-24">
      <Container>
        <SectionHead index="01" label="Ready-made builds" title="Start from a build we already tested.">
          Load one into the configurator, then swap any part. Every preset passes all three compatibility checks.
        </SectionHead>

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {PRESETS.map((p, i) => {
            const total = SLOTS.reduce((sum, s) => sum + part(s.key, p.parts[s.key]).price, 0)
            const active = activeId === p.id
            const cpu = part('cpu', p.parts.cpu)
            const gpu = part('gpu', p.parts.gpu)
            const ram = part('ram', p.parts.ram)
            const psu = part('psu', p.parts.psu)
            return (
              <li
                key={p.id}
                className={`card flex flex-col rounded-xl p-6 transition-colors ${
                  active ? 'border-ice-400/70 shadow-[0_0_0_1px_rgba(79,214,250,0.35),0_0_40px_-12px_rgba(79,214,250,0.35)]' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-5xl font-bold tabular-nums text-ink-600">0{i + 1}</span>
                  <span className="chip text-ice-300">{p.tag}</span>
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink-50">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{p.blurb}</p>

                <dl className="mt-6 space-y-2.5 border-t border-ink-600 pt-5 font-mono text-xs">
                  {[
                    ['CPU', `${cpu.name}`],
                    ['GPU', `${gpu.name}`],
                    ['RAM', `${ram.capacity} GB ${ram.type}`],
                    ['PSU', `${psu.watts} W ${psu.rating.replace('80+ ', '')}`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-ink-400">{k}</dt>
                      <dd className="text-right text-ink-100">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-auto pt-6">
                  <div className="flex items-end justify-between border-t border-ink-600 pt-5">
                    <span className="label-mono">Total</span>
                    <span className="font-mono text-3xl font-bold tabular-nums text-ink-50">{usd(total)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onLoad(p)}
                    className={`mt-5 w-full ${active ? 'btn-ghost !border-ice-400 !text-ice-300' : 'btn-ice'}`}
                    aria-pressed={active}
                  >
                    {active ? (
                      <>
                        <Check className="size-4" aria-hidden="true" /> Loaded
                      </>
                    ) : (
                      <>
                        <Download className="size-4" aria-hidden="true" /> Load build
                      </>
                    )}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
