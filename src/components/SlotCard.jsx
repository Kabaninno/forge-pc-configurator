import { useEffect, useRef } from 'react'
import { Check, ChevronDown, CircuitBoard, Cpu, Fan, MemoryStick, PcCase, Plus, TriangleAlert, Trash2, Zap } from 'lucide-react'
import { PARTS, chipsFor, usd } from '../data'
import { optionNote, slotLevel } from '../compat'

const ICONS = { cpu: Cpu, board: CircuitBoard, ram: MemoryStick, gpu: Fan, psu: Zap, case: PcCase }

const RING = {
  error: 'border-rose-400/60 shadow-[0_0_0_1px_rgba(251,113,133,0.25)]',
  warning: 'border-amber-400/60 shadow-[0_0_0_1px_rgba(251,191,36,0.2)]',
  none: 'border-ink-600',
}

function LevelBadge({ level }) {
  if (!level) return null
  const error = level === 'error'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded px-1.5 py-1 font-mono text-[0.625rem] font-bold uppercase leading-none tracking-[0.1em] ${
        error ? 'bg-rose-400/15 text-rose-300' : 'bg-amber-400/15 text-amber-300'
      }`}
    >
      <TriangleAlert className="size-3" aria-hidden="true" />
      {error ? 'Conflict' : 'Warning'}
    </span>
  )
}

export default function SlotCard({ slot, index, part, sel, evaluation, open, onToggle, onSelect, onClear }) {
  const ref = useRef(null)
  const Icon = ICONS[slot.icon]
  const level = part ? slotLevel(evaluation, slot.key) : null
  const options = PARTS[slot.key]

  useEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    return () => cancelAnimationFrame(id)
  }, [open])

  return (
    <li
      ref={ref}
      id={`slot-${slot.key}`}
      className={`card scroll-mt-24 overflow-hidden rounded-xl transition-colors ${RING[level || 'none']} ${open ? 'bg-ink-800' : ''}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`slot-panel-${slot.key}`}
        className="flex w-full items-center gap-3.5 p-4 text-left transition-colors hover:bg-white/[0.02] sm:gap-5 sm:p-5"
      >
        <span
          className={`grid size-12 shrink-0 place-items-center rounded-lg border sm:size-14 ${
            part ? 'border-ice-400/40 bg-ice-400/10 text-ice-400' : 'border-ink-500 bg-ink-900 text-ink-300'
          }`}
        >
          <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="label-mono">
              <span className="text-ice-400">0{index + 1}</span> · {slot.label}
            </span>
            <LevelBadge level={level} />
          </span>
          {part ? (
            <>
              <span className="mt-1.5 block text-[1.05rem] font-semibold leading-snug text-ink-50">
                <span className="font-medium text-ink-300">{part.brand}</span> {part.name}
              </span>
              <span className="mt-2.5 flex flex-wrap gap-1.5">
                {chipsFor(slot.key, part).map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </span>
            </>
          ) : (
            <span className="mt-1.5 flex items-center gap-2 text-[1.05rem] font-medium text-ink-300">
              <Plus className="size-4 text-ice-400" aria-hidden="true" />
              Choose {slot.label.toLowerCase()}
            </span>
          )}
        </span>

        <span className="flex shrink-0 flex-col items-end gap-3 self-stretch justify-between">
          <span className="font-mono text-base font-bold tabular-nums text-ink-50 sm:text-lg">{part ? usd(part.price) : '—'}</span>
          <ChevronDown className={`size-5 text-ink-300 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </span>
      </button>

      {open && (
        <div id={`slot-panel-${slot.key}`} className="modal-pop border-t border-ink-600 bg-ink-900/50 p-3 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
            <p className="text-sm text-ink-300">{slot.hint}</p>
            {part && (
              <button
                type="button"
                onClick={onClear}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-ink-300 hover:text-rose-300"
              >
                <Trash2 className="size-3.5" aria-hidden="true" /> Remove
              </button>
            )}
          </div>

          <ul className="space-y-2">
            {options.map((o) => {
              const selected = part?.id === o.id
              const note = selected ? null : optionNote(slot.key, o, sel)
              return (
                <li key={o.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(o.id)}
                    aria-pressed={selected}
                    className={`flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-colors ${
                      selected
                        ? 'border-ice-400 bg-ice-400/[0.07]'
                        : 'border-ink-600 bg-ink-850 hover:border-ink-400 hover:bg-ink-800'
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className={note ? 'block opacity-55' : 'block'}>
                        <span className="block text-sm text-ink-300">{o.brand}</span>
                        <span className="block font-semibold leading-snug text-ink-50">{o.name}</span>
                        <span className="mt-2.5 flex flex-wrap gap-1.5">
                          {chipsFor(slot.key, o).map((c) => (
                            <span key={c} className="chip">
                              {c}
                            </span>
                          ))}
                        </span>
                      </span>
                      {note && (
                        <span className="mt-3 block space-y-1">
                          {note.reasons.map((r) => (
                            <span
                              key={r}
                              className={`flex items-start gap-2 text-[0.8125rem] leading-snug ${
                                note.level === 'error' ? 'text-rose-300' : 'text-amber-300'
                              }`}
                            >
                              <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                              {r}
                            </span>
                          ))}
                        </span>
                      )}
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-2">
                      <span className={`font-mono text-base font-bold tabular-nums ${note ? 'text-ink-300' : 'text-ink-50'}`}>
                        {usd(o.price)}
                      </span>
                      {selected && (
                        <span className="grid size-6 place-items-center rounded-full bg-ice-400 text-ink-950">
                          <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </li>
  )
}
