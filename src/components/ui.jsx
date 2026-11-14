import { useId } from 'react'
import { Check, LoaderCircle } from 'lucide-react'

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export function SectionHead({ index, label, title, children }) {
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-10">
      <div className="lg:col-span-7">
        <p className="label-mono flex items-center gap-3">
          <span className="text-ice-400">{index}</span>
          <span className="h-px w-8 bg-ink-500" aria-hidden="true" />
          {label}
        </p>
        <h2 className="mt-4 text-[2rem] font-bold leading-[1.05] tracking-tight text-balance text-ink-50 sm:text-5xl">{title}</h2>
      </div>
      {children && <p className="leading-relaxed text-ink-300 lg:col-span-4 lg:col-start-9">{children}</p>}
    </div>
  )
}

export function Field({ label, as, required, children, className = '', ...rest }) {
  const id = useId()
  const common = { id, required, className: `field ${className}`, ...rest }
  return (
    <div>
      <label htmlFor={id} className="label-mono mb-2 block">
        {label}
        {required && <span className="text-ice-400"> *</span>}
      </label>
      {as === 'select' ? <select {...common}>{children}</select> : <input {...common} />}
    </div>
  )
}

export function SubmitButton({ status, children, sending = 'Processing…', className = '' }) {
  return (
    <button type="submit" disabled={status === 'sending'} className={`btn-ice w-full ${className}`}>
      {status === 'sending' ? (
        <>
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> {sending}
        </>
      ) : (
        children
      )}
    </button>
  )
}

export function SuccessMark() {
  return (
    <div className="mx-auto grid size-16 place-items-center rounded-full border border-ice-400/50 bg-ice-400/10 text-ice-400">
      <Check className="size-8" strokeWidth={2.5} aria-hidden="true" />
    </div>
  )
}
