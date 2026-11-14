import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import Header from './components/Header'
import Hero from './components/Hero'
import Presets from './components/Presets'
import SlotCard from './components/SlotCard'
import Summary from './components/Summary'
import Checkout from './components/Checkout'
import Modal from './components/Modal'
import Footer from './components/Footer'
import { Container, SectionHead } from './components/ui'
import { PRESETS, SLOTS, usd } from './data'
import { emptySelection, evaluate, resolve } from './compat'

export default function App() {
  const [selection, setSelection] = useState(emptySelection)
  const [openSlot, setOpenSlot] = useState(null)
  const [checkout, setCheckout] = useState(false)
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  const sel = useMemo(() => resolve(selection), [selection])
  const ev = useMemo(() => evaluate(sel), [sel])
  const status = ev.errors.length ? 'error' : ev.warnings.length ? 'warning' : ev.filled ? 'ok' : 'idle'

  const activePreset = PRESETS.find((p) => SLOTS.every((s) => selection[s.key] === p.parts[s.key]))

  useEffect(() => () => clearTimeout(toastTimer.current), [])
  const notify = useCallback((message) => {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 3200)
  }, [])

  const choose = (slot, id) => {
    setSelection((s) => ({ ...s, [slot]: id }))
    setOpenSlot(null)
  }
  const clearSlot = (slot) => setSelection((s) => ({ ...s, [slot]: null }))
  const clearAll = () => {
    setSelection(emptySelection())
    setOpenSlot(null)
  }
  const loadPreset = (p) => {
    setSelection({ ...p.parts })
    setOpenSlot(null)
    notify(`${p.name} loaded. Swap any part to make it yours.`)
    document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const jump = (slot) => setOpenSlot(slot)

  const newBuild = () => {
    setCheckout(false)
    clearAll()
    document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <a
        href="#configurator"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ice-400 focus:px-4 focus:py-3 focus:text-ink-950"
      >
        Skip to configurator
      </a>
      <Header total={ev.total} status={status} />
      <main>
        <Hero />
        <Presets activeId={activePreset?.id} onLoad={loadPreset} />

        <section id="configurator" className="border-t border-ink-600/70 bg-ink-900/40 py-16 lg:py-24">
          <Container>
            <SectionHead index="02" label="Configurator" title="Choose every part. Conflicts show up instantly.">
              Open a slot to see the options. Parts that do not fit your build are dimmed with the reason.
            </SectionHead>

            <div className="mt-12 grid gap-6 lg:grid-cols-12">
              <ol className="space-y-3 lg:col-span-8" aria-label="Components">
                {SLOTS.map((slot, i) => (
                  <SlotCard
                    key={slot.key}
                    slot={slot}
                    index={i}
                    part={sel[slot.key]}
                    sel={sel}
                    evaluation={ev}
                    open={openSlot === slot.key}
                    onToggle={() => setOpenSlot((cur) => (cur === slot.key ? null : slot.key))}
                    onSelect={(id) => choose(slot.key, id)}
                    onClear={() => clearSlot(slot.key)}
                  />
                ))}
              </ol>
              <div className="lg:col-span-4">
                <Summary sel={sel} ev={ev} onJump={jump} onClear={clearAll} onCheckout={() => setCheckout(true)} />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />

      {/* mobile total bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-600 bg-ink-950/95 backdrop-blur lg:hidden">
        <Container className="flex items-center justify-between gap-4 py-3">
          <div>
            <p className="label-mono">{ev.filled}/{SLOTS.length} parts</p>
            <p className="font-mono text-xl font-bold tabular-nums text-ink-50">{usd(ev.total)}</p>
          </div>
          <a href="#summary" className="btn-ice !py-3">
            Summary <ChevronRight className="size-4" aria-hidden="true" />
          </a>
        </Container>
      </div>

      {toast && (
        <div
          role="status"
          className="modal-pop fixed bottom-24 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-lg border border-ice-400/50 bg-ink-850 px-4 py-3 text-center text-sm text-ink-50 shadow-xl lg:bottom-6"
        >
          {toast}
        </div>
      )}

      <Modal open={checkout} onClose={() => setCheckout(false)} eyebrow="Secure demo checkout" title="Complete your order">
        <Checkout sel={sel} ev={ev} onClose={() => setCheckout(false)} onNewBuild={newBuild} />
      </Modal>
    </>
  )
}
