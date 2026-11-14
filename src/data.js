// All prices are fictional. Models are real products.

export const SLOTS = [
  { key: 'cpu', label: 'Processor', short: 'CPU', icon: 'cpu', hint: 'Sets the socket your motherboard must match.' },
  { key: 'mobo', label: 'Motherboard', short: 'Board', icon: 'board', hint: 'Must match the CPU socket and the memory type.' },
  { key: 'ram', label: 'Memory', short: 'RAM', icon: 'ram', hint: 'DDR4 and DDR5 are not interchangeable.' },
  { key: 'gpu', label: 'Graphics card', short: 'GPU', icon: 'gpu', hint: 'The biggest power draw in the build.' },
  { key: 'psu', label: 'Power supply', short: 'PSU', icon: 'psu', hint: 'Needs 1.5× the combined CPU and GPU draw.' },
  { key: 'case', label: 'Case', short: 'Case', icon: 'case', hint: 'All cases here fit ATX and micro-ATX boards.' },
]

export const PARTS = {
  cpu: [
    { id: 'cpu-7600x', brand: 'AMD', name: 'Ryzen 5 7600X', price: 229, socket: 'AM5', tdp: 105, cores: 6, threads: 12, base: 4.7, boost: 5.3 },
    { id: 'cpu-14600k', brand: 'Intel', name: 'Core i5-14600K', price: 279, socket: 'LGA1700', tdp: 125, cores: 14, threads: 20, base: 3.5, boost: 5.3 },
    { id: 'cpu-7800x3d', brand: 'AMD', name: 'Ryzen 7 7800X3D', price: 389, socket: 'AM5', tdp: 120, cores: 8, threads: 16, base: 4.2, boost: 5.0 },
    { id: 'cpu-7950x', brand: 'AMD', name: 'Ryzen 9 7950X', price: 499, socket: 'AM5', tdp: 170, cores: 16, threads: 32, base: 4.5, boost: 5.7 },
    { id: 'cpu-14900k', brand: 'Intel', name: 'Core i9-14900K', price: 519, socket: 'LGA1700', tdp: 125, cores: 24, threads: 32, base: 3.2, boost: 6.0 },
  ],
  mobo: [
    { id: 'mb-b760m-ds3h', brand: 'Gigabyte', name: 'B760M DS3H DDR4', price: 109, socket: 'LGA1700', ramType: 'DDR4', chipset: 'B760', form: 'mATX' },
    { id: 'mb-b650-tomahawk', brand: 'MSI', name: 'MAG B650 TOMAHAWK WIFI', price: 199, socket: 'AM5', ramType: 'DDR5', chipset: 'B650', form: 'ATX' },
    { id: 'mb-z790-a', brand: 'MSI', name: 'PRO Z790-A WIFI', price: 229, socket: 'LGA1700', ramType: 'DDR5', chipset: 'Z790', form: 'ATX' },
    { id: 'mb-b650e-f', brand: 'ASUS', name: 'ROG STRIX B650E-F GAMING WIFI', price: 259, socket: 'AM5', ramType: 'DDR5', chipset: 'B650E', form: 'ATX' },
    { id: 'mb-x670e-tuf', brand: 'ASUS', name: 'TUF GAMING X670E-PLUS', price: 299, socket: 'AM5', ramType: 'DDR5', chipset: 'X670E', form: 'ATX' },
  ],
  ram: [
    { id: 'ram-crucial-3200', brand: 'Crucial', name: 'Pro 16GB (2×8GB) DDR4-3200', price: 39, type: 'DDR4', capacity: 16, speed: 3200, timing: 'CL22' },
    { id: 'ram-lpx-3600', brand: 'Corsair', name: 'Vengeance LPX 32GB (2×16GB) DDR4-3600', price: 69, type: 'DDR4', capacity: 32, speed: 3600, timing: 'CL18' },
    { id: 'ram-veng-6000', brand: 'Corsair', name: 'Vengeance 32GB (2×16GB) DDR5-6000', price: 109, type: 'DDR5', capacity: 32, speed: 6000, timing: 'CL30' },
    { id: 'ram-trident-6400', brand: 'G.Skill', name: 'Trident Z5 RGB 32GB (2×16GB) DDR5-6400', price: 139, type: 'DDR5', capacity: 32, speed: 6400, timing: 'CL32' },
    { id: 'ram-fury-5600', brand: 'Kingston', name: 'FURY Beast 64GB (2×32GB) DDR5-5600', price: 189, type: 'DDR5', capacity: 64, speed: 5600, timing: 'CL40' },
  ],
  gpu: [
    { id: 'gpu-4060', brand: 'NVIDIA', name: 'GeForce RTX 4060', price: 299, tdp: 115, vram: 8, memType: 'GDDR6' },
    { id: 'gpu-7800xt', brand: 'AMD', name: 'Radeon RX 7800 XT', price: 479, tdp: 263, vram: 16, memType: 'GDDR6' },
    { id: 'gpu-4070s', brand: 'NVIDIA', name: 'GeForce RTX 4070 SUPER', price: 599, tdp: 220, vram: 12, memType: 'GDDR6X' },
    { id: 'gpu-4080s', brand: 'NVIDIA', name: 'GeForce RTX 4080 SUPER', price: 999, tdp: 320, vram: 16, memType: 'GDDR6X' },
    { id: 'gpu-4090', brand: 'NVIDIA', name: 'GeForce RTX 4090', price: 1799, tdp: 450, vram: 24, memType: 'GDDR6X' },
  ],
  psu: [
    { id: 'psu-cx550m', brand: 'Corsair', name: 'CX550M', price: 79, watts: 550, rating: '80+ Bronze', modular: 'Semi-modular' },
    { id: 'psu-rm750e', brand: 'Corsair', name: 'RM750e', price: 129, watts: 750, rating: '80+ Gold', modular: 'Fully modular' },
    { id: 'psu-gx850', brand: 'Seasonic', name: 'FOCUS GX-850', price: 159, watts: 850, rating: '80+ Gold', modular: 'Fully modular' },
    { id: 'psu-sp11-1000', brand: 'be quiet!', name: 'Straight Power 11 1000W', price: 199, watts: 1000, rating: '80+ Platinum', modular: 'Fully modular' },
    { id: 'psu-hx1200', brand: 'Corsair', name: 'HX1200', price: 249, watts: 1200, rating: '80+ Platinum', modular: 'Fully modular' },
  ],
  case: [
    { id: 'case-h5', brand: 'NZXT', name: 'H5 Flow', price: 94, form: 'ATX mid-tower', fans: 2, gpuMax: 365 },
    { id: 'case-4000d', brand: 'Corsair', name: '4000D Airflow', price: 104, form: 'ATX mid-tower', fans: 2, gpuMax: 360 },
    { id: 'case-lancool216', brand: 'Lian Li', name: 'LANCOOL 216', price: 109, form: 'ATX mid-tower', fans: 2, gpuMax: 392 },
    { id: 'case-north', brand: 'Fractal Design', name: 'North', price: 139, form: 'ATX mid-tower', fans: 2, gpuMax: 355 },
    { id: 'case-5000d', brand: 'Corsair', name: '5000D Airflow', price: 174, form: 'ATX mid-tower', fans: 3, gpuMax: 420 },
  ],
}

export function chipsFor(slot, p) {
  switch (slot) {
    case 'cpu':
      return [p.socket, `${p.cores}C / ${p.threads}T`, `${p.base}–${p.boost} GHz`, `${p.tdp} W TDP`]
    case 'mobo':
      return [p.socket, p.chipset, p.ramType, p.form]
    case 'ram':
      return [p.type, `${p.capacity} GB`, `${p.speed} MT/s`, p.timing]
    case 'gpu':
      return [`${p.vram} GB ${p.memType}`, `${p.tdp} W TGP`]
    case 'psu':
      return [`${p.watts} W`, p.rating, p.modular]
    case 'case':
      return [p.form, `${p.fans} fans`, `GPU ≤ ${p.gpuMax} mm`]
    default:
      return []
  }
}

export const PRESETS = [
  {
    id: 'spark',
    name: 'FORGE Spark',
    tag: '1080p · Esports',
    blurb: 'Quick, quiet and frugal. An affordable DDR4 platform with plenty of room to upgrade the GPU later.',
    parts: { cpu: 'cpu-14600k', mobo: 'mb-b760m-ds3h', ram: 'ram-lpx-3600', gpu: 'gpu-4060', psu: 'psu-cx550m', case: 'case-4000d' },
  },
  {
    id: 'blaze',
    name: 'FORGE Blaze',
    tag: '1440p · High refresh',
    blurb: 'The sweet spot. A V-Cache gaming CPU, 16 GB of VRAM and a Gold power supply with generous headroom.',
    parts: { cpu: 'cpu-7800x3d', mobo: 'mb-b650-tomahawk', ram: 'ram-veng-6000', gpu: 'gpu-7800xt', psu: 'psu-rm750e', case: 'case-lancool216' },
  },
  {
    id: 'inferno',
    name: 'FORGE Inferno',
    tag: '4K · Creator',
    blurb: 'No compromises. Sixteen cores, 64 GB of memory and the fastest GPU we sell, on a Platinum 1200 W supply.',
    parts: { cpu: 'cpu-7950x', mobo: 'mb-x670e-tuf', ram: 'ram-fury-5600', gpu: 'gpu-4090', psu: 'psu-hx1200', case: 'case-5000d' },
  },
]

export const SHIPPING = [
  { id: 'standard', label: 'Standard', note: '5–7 business days', price: 0 },
  { id: 'express', label: 'Express', note: '2–3 business days', price: 39 },
]

export const STATES = [
  ['CA', 'California'],
  ['CO', 'Colorado'],
  ['FL', 'Florida'],
  ['GA', 'Georgia'],
  ['IL', 'Illinois'],
  ['MA', 'Massachusetts'],
  ['NY', 'New York'],
  ['NC', 'North Carolina'],
  ['OR', 'Oregon'],
  ['PA', 'Pennsylvania'],
  ['TX', 'Texas'],
  ['WA', 'Washington'],
]

export const usd = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
export const usd2 = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
