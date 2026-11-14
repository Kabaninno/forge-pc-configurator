import { useState } from 'react'
import { ArrowRight, Truck, TriangleAlert } from 'lucide-react'
import { Field, SubmitButton, SuccessMark } from './ui'
import { SHIPPING, SLOTS, STATES, usd, usd2 } from '../data'
import { useFakeSubmit } from '../hooks'

const TAX_RATE = 0.0725

export default function Checkout({ sel, ev, onClose, onNewBuild }) {
  const { status, submit } = useFakeSubmit()
  const [order, setOrder] = useState('')
  const [shipping, setShipping] = useState('standard')
  const [f, setF] = useState({ name: '', email: '', phone: '', address: '', city: '', state: 'CO', zip: '' })
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }))

  const ship = SHIPPING.find((s) => s.id === shipping)
  const subtotal = ev.total
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100
  const grand = subtotal + ship.price + tax

  if (status === 'success') {
    return (
      <div className="py-4 text-center" role="status">
        <SuccessMark />
        <h3 className="mt-6 text-3xl font-bold tracking-tight text-ink-50">Order confirmed</h3>
        <p className="mt-2 text-ink-300">Thanks, {f.name.split(' ')[0] || 'builder'}. Your build is in the queue.</p>

        <div className="mx-auto mt-7 max-w-sm rounded-lg border border-ice-400/40 bg-ice-400/[0.06] p-5">
          <p className="label-mono text-ice-300">Order number</p>
          <p className="mt-2 font-mono text-3xl font-bold tracking-[0.08em] text-ink-50">{order}</p>
        </div>

        <dl className="mx-auto mt-7 grid max-w-sm gap-px overflow-hidden rounded-lg border border-ink-600 bg-ink-600 text-left">
          {[
            ['Total charged', usd2(grand)],
            ['Shipping', `${ship.label} · ${ship.note}`],
            ['Ship to', `${f.address}, ${f.city}, ${f.state} ${f.zip}`],
            ['Receipt sent to', f.email],
          ].map(([k, v]) => (
            <div key={k} className="bg-ink-850 p-3.5">
              <dt className="label-mono">{k}</dt>
              <dd className="mt-1 break-words font-mono text-sm text-ink-100">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-ink-300">
          Assembly and a 24-hour burn-in start tomorrow morning. We email photos of your build before it ships.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" className="btn-ice" onClick={onClose}>
            Close
          </button>
          <button type="button" className="btn-ghost" onClick={onNewBuild}>
            Start a new build
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={(e) => submit(e, () => setOrder(`FRG-${Math.floor(100000 + Math.random() * 900000)}`))} className="space-y-6">
      {ev.warnings.length > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-400/40 bg-amber-400/[0.07] p-4 text-[0.8125rem] leading-snug text-amber-100">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-300" aria-hidden="true" />
          <p>{ev.warnings[0].detail} You can still order, but we recommend upgrading the power supply.</p>
        </div>
      )}

      <section aria-label="Order summary" className="rounded-lg border border-ink-600 bg-ink-900/60">
        <ul className="divide-y divide-ink-600/70">
          {SLOTS.map((s) => (
            <li key={s.key} className="flex items-center gap-3 px-4 py-2.5 text-sm">
              <span className="w-11 shrink-0 font-mono text-[0.6875rem] uppercase text-ice-400">{s.short}</span>
              <span className="min-w-0 flex-1 truncate text-ink-100">
                {sel[s.key].brand} {sel[s.key].name}
              </span>
              <span className="font-mono tabular-nums text-ink-200">{usd(sel[s.key].price)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 border-t border-ink-600 px-4 py-4 font-mono text-sm">
          <div className="flex justify-between text-ink-300">
            <dt>Parts</dt>
            <dd className="tabular-nums">{usd2(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-ink-300">
            <dt>Assembly &amp; burn-in</dt>
            <dd>Included</dd>
          </div>
          <div className="flex justify-between text-ink-300">
            <dt>Shipping</dt>
            <dd className="tabular-nums">{ship.price ? usd2(ship.price) : 'Free'}</dd>
          </div>
          <div className="flex justify-between text-ink-300">
            <dt>Est. sales tax (7.25%)</dt>
            <dd className="tabular-nums">{usd2(tax)}</dd>
          </div>
          <div className="flex justify-between border-t border-ink-600 pt-3 text-lg font-bold text-ink-50">
            <dt>Total</dt>
            <dd className="tabular-nums">{usd2(grand)}</dd>
          </div>
        </dl>
      </section>

      <fieldset>
        <legend className="label-mono mb-3">Shipping method</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {SHIPPING.map((s) => (
            <label
              key={s.id}
              className="relative flex cursor-pointer items-start gap-3 rounded-lg border border-ink-500 bg-ink-900 p-4 transition-colors hover:border-ink-400 has-[:checked]:border-ice-400 has-[:checked]:bg-ice-400/[0.07] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ice-400"
            >
              <input type="radio" name="shipping" value={s.id} checked={shipping === s.id} onChange={() => setShipping(s.id)} className="sr-only" />
              <Truck className="mt-0.5 size-5 shrink-0 text-ice-400" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-ink-50">
                  {s.label} · <span className="font-mono">{s.price ? usd(s.price) : 'Free'}</span>
                </span>
                <span className="mt-0.5 block font-mono text-xs text-ink-300">{s.note}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-5">
        <Field label="Full name" name="name" required autoComplete="name" placeholder="Alex Rivera" value={f.name} onChange={set('name')} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" name="email" type="email" required autoComplete="email" placeholder="alex@example.com" value={f.email} onChange={set('email')} />
          <Field label="Phone" name="phone" type="tel" required autoComplete="tel" placeholder="(415) 555-0134" value={f.phone} onChange={set('phone')} />
        </div>
        <Field label="Street address" name="address" required autoComplete="street-address" placeholder="742 Evergreen Terrace" value={f.address} onChange={set('address')} />
        <div className="grid gap-5 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Field label="City" name="city" required autoComplete="address-level2" placeholder="Denver" value={f.city} onChange={set('city')} />
          </div>
          <div className="sm:col-span-2">
            <Field label="State" name="state" as="select" required autoComplete="address-level1" value={f.state} onChange={set('state')}>
              {STATES.map(([code, name]) => (
                <option key={code} value={code}>
                  {code} — {name}
                </option>
              ))}
            </Field>
          </div>
          <div className="sm:col-span-1">
            <Field
              label="ZIP"
              name="zip"
              required
              inputMode="numeric"
              pattern="[0-9]{5}"
              maxLength={5}
              autoComplete="postal-code"
              placeholder="80202"
              title="Five-digit ZIP code"
              value={f.zip}
              onChange={set('zip')}
            />
          </div>
        </div>
      </div>

      <div>
        <SubmitButton status={status} sending="Placing order…">
          Place order · {usd2(grand)} <ArrowRight className="size-4" aria-hidden="true" />
        </SubmitButton>
        <p className="mt-3 text-center text-xs text-ink-400">Demo checkout. No payment is taken and nothing is shipped.</p>
      </div>
    </form>
  )
}
