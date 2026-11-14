import { ArrowDown, Cpu, Gauge, ShieldCheck } from 'lucide-react'
import { Container } from './ui'

const CY = '#4fd6fa'

function Fan({ cx, cy, r, fast = false }) {
  const s = r / 24
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r={r} fill="#0b0e13" stroke={CY} strokeOpacity="0.5" strokeWidth="1.5" />
      <g className={`fan ${fast ? 'fan-fast' : ''}`}>
        <circle r={r * 0.96} fill="none" />
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            transform={`rotate(${i * 40}) scale(${s})`}
            d="M0 -5C9 -9 16 -16 12 -22C4 -19 -1 -13 0 -5z"
            fill={CY}
            fillOpacity="0.26"
            stroke={CY}
            strokeOpacity="0.6"
            strokeWidth="0.8"
          />
        ))}
      </g>
      <circle r={r * 0.24} fill="#10141a" stroke={CY} strokeWidth="1.2" />
    </g>
  )
}

function Tower() {
  return (
    <svg viewBox="0 0 440 500" className="h-auto w-full" role="img" aria-label="Illustration of a PC tower with a glass side panel, CPU cooler, memory, three-fan graphics card and power supply">
      <defs>
        <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={CY} stopOpacity="0.28" />
          <stop offset="1" stopColor={CY} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.07" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="220" cy="260" rx="215" ry="240" fill="url(#hero-glow)" className="glow" />

      {/* case */}
      <rect x="70" y="20" width="300" height="440" rx="16" fill="#0d1117" stroke="#2a3140" strokeWidth="2" />
      <rect x="100" y="460" width="40" height="8" rx="2" fill="#1c222c" />
      <rect x="300" y="460" width="40" height="8" rx="2" fill="#1c222c" />
      <rect x="84" y="34" width="272" height="412" rx="8" fill="#080a0e" stroke="#1c222c" />

      {/* motherboard */}
      <rect x="100" y="50" width="190" height="260" rx="6" fill="#121720" stroke="#262d39" />
      <path
        d="M110 96H134V140M110 160H130V210H170M270 70V104H246V170M120 280H214V236M190 70V84M262 200V280H236"
        fill="none"
        stroke={CY}
        strokeOpacity="0.22"
        strokeWidth="1.5"
      />

      {/* cpu + cooler */}
      <rect x="138" y="84" width="74" height="74" rx="6" fill="#171d27" stroke={CY} strokeOpacity="0.5" />
      <Fan cx={175} cy={121} r={31} />

      {/* ram */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={226 + i * 14} y="68" width="9" height="112" rx="2" fill="#18202c" stroke={CY} strokeOpacity="0.5" />
          <rect x={226 + i * 14} y="68" width="9" height="5" rx="1" fill={CY} className="glow" style={{ animationDelay: `${i * 0.4}s` }} />
        </g>
      ))}

      {/* gpu */}
      <rect x="92" y="244" width="256" height="82" rx="8" fill="#0e1218" stroke="#2f3848" strokeWidth="1.5" />
      <Fan cx={140} cy={285} r={27} fast />
      <Fan cx={220} cy={285} r={27} fast />
      <Fan cx={300} cy={285} r={27} fast />
      <rect x="92" y="322" width="256" height="3" fill={CY} className="glow" />

      {/* psu shroud */}
      <rect x="84" y="364" width="272" height="82" fill="#0b0e13" stroke="#1c222c" />
      <path d="M100 384H340M100 394H340M100 404H340" stroke="#1c222c" strokeWidth="2" />
      <text x="110" y="433" fontFamily="JetBrains Mono, monospace" fontSize="13" fontWeight="700" letterSpacing="5" fill={CY}>
        FORGE
      </text>
      <text x="340" y="433" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.5" fill="#566074">
        1200 W
      </text>

      {/* glass reflection */}
      <rect x="84" y="34" width="272" height="412" rx="8" fill="url(#hero-glass)" />
    </svg>
  )
}

const FEATURES = [
  { icon: Cpu, title: 'Socket & memory', text: 'CPU socket and RAM type are checked against the board.' },
  { icon: Gauge, title: 'Power headroom', text: 'PSU must cover 1.5× the CPU + GPU draw.' },
  { icon: ShieldCheck, title: 'Burn-in tested', text: 'Assembled and stress-tested for 24 hours before shipping.' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="tech-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden="true" />
      <Container className="relative pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-ice-400/30 bg-ice-400/5 px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ice-300">
              <span className="size-1.5 rounded-full bg-ice-400" aria-hidden="true" />
              Custom PC configurator
            </p>
            <h1 className="mt-7 text-[2.75rem] font-bold leading-[0.98] tracking-tight text-balance text-ink-50 sm:text-7xl">
              Build it. <span className="text-ice-400">We check the math.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-200">
              Choose from 30 real parts across six categories. FORGE flags socket, memory and power problems as you click, then
              builds, burn-tests and ships your PC.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#configurator" className="btn-ice">
                Start configuring <ArrowDown className="size-4" aria-hidden="true" />
              </a>
              <a href="#builds" className="btn-ghost">
                Browse ready builds
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ink-600 bg-ink-600 sm:grid-cols-4">
              {[
                ['30', 'Real parts'],
                ['3', 'Live checks'],
                ['$0', 'Assembly fee'],
                ['24h', 'Burn-in test'],
              ].map(([v, l]) => (
                <div key={l} className="bg-ink-850 p-4">
                  <dt className="label-mono">{l}</dt>
                  <dd className="mt-2 font-mono text-3xl font-bold tabular-nums text-ink-50">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <Tower />
            <div className="absolute left-0 top-[18%] hidden rounded-md border border-ink-500 bg-ink-850/90 px-3 py-2 font-mono text-[0.6875rem] text-ink-200 backdrop-blur sm:block lg:-left-4">
              <span className="text-ice-400">CPU</span> · Ryzen 9 7950X
            </div>
            <div className="absolute right-0 top-[52%] hidden rounded-md border border-ink-500 bg-ink-850/90 px-3 py-2 font-mono text-[0.6875rem] text-ink-200 backdrop-blur sm:block lg:-right-2">
              <span className="text-ice-400">GPU</span> · RTX 4090 · 24 GB
            </div>
          </div>
        </div>

        <ul id="how" className="mt-16 grid scroll-mt-24 gap-4 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="card flex gap-4 rounded-lg p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-md border border-ink-500 bg-ink-900 text-ice-400">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-ink-50">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-300">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
