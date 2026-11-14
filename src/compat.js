import { PARTS, SLOTS } from './data'

// PSU rule: wattage must be at least (CPU TDP + GPU TDP) × 1.5.
export const HEADROOM = 1.5

export const emptySelection = () => Object.fromEntries(SLOTS.map((s) => [s.key, null]))

export function resolve(selection) {
  return Object.fromEntries(
    SLOTS.map((s) => [s.key, PARTS[s.key].find((p) => p.id === selection[s.key]) || null]),
  )
}

export const requiredWatts = (draw) => Math.ceil(draw * HEADROOM)

export function evaluate(sel) {
  const { cpu, mobo, ram, gpu, psu } = sel
  const issues = []

  if (cpu && mobo && cpu.socket !== mobo.socket) {
    issues.push({
      id: 'socket',
      level: 'error',
      slots: ['cpu', 'mobo'],
      title: 'Socket mismatch',
      detail: `${cpu.name} is a ${cpu.socket} processor, but ${mobo.name} has a ${mobo.socket} socket.`,
      fix: `Pick a ${cpu.socket} motherboard or a ${mobo.socket} processor.`,
    })
  }

  if (ram && mobo && ram.type !== mobo.ramType) {
    issues.push({
      id: 'ram',
      level: 'error',
      slots: ['ram', 'mobo'],
      title: 'Memory type mismatch',
      detail: `${mobo.name} takes ${mobo.ramType}, but the selected memory is ${ram.type}.`,
      fix: `Pick ${mobo.ramType} memory or a ${ram.type} motherboard.`,
    })
  }

  const draw = (cpu?.tdp || 0) + (gpu?.tdp || 0)
  const required = requiredWatts(draw)
  if (psu && draw > 0 && psu.watts < required) {
    issues.push({
      id: 'psu',
      level: 'warning',
      slots: ['psu'],
      title: 'Power supply may be too small',
      detail: `CPU + GPU draw about ${draw} W. We recommend at least ${required} W (1.5× headroom); this unit is ${psu.watts} W.`,
      fix: `Choose a power supply of ${required} W or more.`,
    })
  }

  const filled = SLOTS.filter((s) => sel[s.key]).length
  const total = SLOTS.reduce((sum, s) => sum + (sel[s.key]?.price || 0), 0)

  return {
    issues,
    errors: issues.filter((i) => i.level === 'error'),
    warnings: issues.filter((i) => i.level === 'warning'),
    draw,
    required,
    psuWatts: psu?.watts || 0,
    load: psu ? draw / psu.watts : 0,
    filled,
    complete: filled === SLOTS.length,
    total,
  }
}

// Level of the worst issue touching a given slot (or null).
export function slotLevel(evaluation, slot) {
  const hits = evaluation.issues.filter((i) => i.slots.includes(slot))
  if (hits.some((i) => i.level === 'error')) return 'error'
  if (hits.length) return 'warning'
  return null
}

// Explains why an option does not fit the rest of the current build.
// Returns { level, reasons } or null when the option is fine.
export function optionNote(slot, option, sel) {
  const reasons = []
  let level = null
  const add = (lvl, text) => {
    reasons.push(text)
    if (lvl === 'error' || !level) level = lvl
  }

  const { cpu, mobo, ram, gpu, psu } = sel

  if (slot === 'cpu') {
    if (mobo && option.socket !== mobo.socket) add('error', `${option.socket} won't fit your ${mobo.socket} motherboard.`)
    if (psu) {
      const req = requiredWatts(option.tdp + (gpu?.tdp || 0))
      if (psu.watts < req) add('warning', `Your ${psu.watts} W PSU is below the ${req} W recommended with this CPU.`)
    }
  }

  if (slot === 'mobo') {
    if (cpu && option.socket !== cpu.socket) add('error', `${option.socket} socket won't take your ${cpu.socket} CPU.`)
    if (ram && option.ramType !== ram.type) add('error', `${option.ramType} board won't take your ${ram.type} memory.`)
  }

  if (slot === 'ram') {
    if (mobo && option.type !== mobo.ramType) add('error', `${option.type} won't fit your ${mobo.ramType} motherboard.`)
  }

  if (slot === 'gpu') {
    if (psu) {
      const req = requiredWatts((cpu?.tdp || 0) + option.tdp)
      if (psu.watts < req) add('warning', `Needs a ${req} W PSU or more. Yours is ${psu.watts} W.`)
    }
  }

  if (slot === 'psu') {
    const draw = (cpu?.tdp || 0) + (gpu?.tdp || 0)
    if (draw > 0) {
      const req = requiredWatts(draw)
      if (option.watts < req) add('warning', `Below the ${req} W recommended for your CPU + GPU.`)
    }
  }

  return reasons.length ? { level, reasons } : null
}
