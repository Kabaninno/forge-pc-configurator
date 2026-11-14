import { Container } from './ui'
import { usd } from '../data'

export function LogoMark({ className = 'size-7' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 3l11 6.4v13.2L16 29 5 22.6V9.4z" fill="none" stroke="#4fd6fa" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M11 12.5h10v3.2h-6.4V22H11z" fill="#4fd6fa" />
    </svg>
  )
}

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="FORGE — home">
      <LogoMark />
      <span className="text-lg font-bold tracking-[0.22em] text-ink-50">FORGE</span>
    </a>
  )
}

const dot = { ok: 'bg-emerald-400', warning: 'bg-amber-400', error: 'bg-rose-400', idle: 'bg-ink-400' }

export default function Header({ total, status }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-600/80 bg-ink-950/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <a href="#builds" className="font-mono text-xs uppercase tracking-[0.14em] text-ink-200 transition-colors hover:text-ice-300">
            Ready builds
          </a>
          <a href="#configurator" className="font-mono text-xs uppercase tracking-[0.14em] text-ink-200 transition-colors hover:text-ice-300">
            Configurator
          </a>
          <a href="#how" className="font-mono text-xs uppercase tracking-[0.14em] text-ink-200 transition-colors hover:text-ice-300">
            How we check
          </a>
        </nav>
        <a
          href="#summary"
          className="flex items-center gap-3 rounded-md border border-ink-500 px-3.5 py-2 transition-colors hover:border-ice-400"
          aria-label={`Your build total ${usd(total)}. Go to summary`}
        >
          <span className={`size-2 rounded-full ${dot[status]}`} aria-hidden="true" />
          <span className="label-mono hidden sm:inline">Your build</span>
          <span className="font-mono text-sm font-bold text-ink-50 tabular-nums">{usd(total)}</span>
        </a>
      </Container>
    </header>
  )
}
