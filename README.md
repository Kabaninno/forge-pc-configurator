# FORGE — Custom PC Configurator

A single-page PC builder with live compatibility and power checks, ready-made builds and a simulated checkout. Frontend-only demo; prices and orders are fictional.

**Live demo:** https://Kabaninno.github.io/forge-pc-configurator/

## Key features

- Six component slots (CPU, motherboard, memory, GPU, power supply, case) with five real models each
- Live compatibility checks: CPU socket vs motherboard, RAM type vs motherboard, PSU wattage vs 1.5× CPU + GPU draw
- Incompatible options are dimmed with an explanation
- Three ready-made builds you can load and modify
- Sidebar with total price, PSU load gauge and compatibility status
- Checkout is disabled until the build is complete and conflict-free, then a form returns an order number
- Dark, responsive UI from 360 px

## Tech stack

React 18, Vite, Tailwind CSS v4, lucide-react (JavaScript, no backend)

## Run locally

```bash
npm install
npm run dev
```

`npm run build` outputs the static site to `docs/` (served by GitHub Pages).
