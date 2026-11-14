import { Container } from './ui'
import { Logo } from './Header'

export default function Footer() {
  return (
    <footer className="border-t border-ink-600 bg-ink-950 pb-28 pt-12 lg:pb-12">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-300">
              Custom PCs, built by hand in Austin, TX. Every system ships with a 3-year parts and labor warranty.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-12 gap-y-3 font-mono text-xs uppercase tracking-[0.12em]">
            <li>
              <a href="#builds" className="text-ink-200 hover:text-ice-300">
                Ready builds
              </a>
            </li>
            <li>
              <a href="#configurator" className="text-ink-200 hover:text-ice-300">
                Configurator
              </a>
            </li>
            <li>
              <a href="#how" className="text-ink-200 hover:text-ice-300">
                How we check
              </a>
            </li>
            <li>
              <a href="#top" className="text-ink-200 hover:text-ice-300">
                Back to top
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-ink-600 pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-400 sm:flex-row sm:justify-between">
          <span>© 2026 FORGE Systems, Inc.</span>
          <span>Demo site — prices and orders are fictional.</span>
        </div>
      </Container>
    </footer>
  )
}
