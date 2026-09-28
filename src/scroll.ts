/*
  Scroll choreography.

  The scene is SCROLL_VH tall with a sticky 100svh stage inside it, so
  vertical scroll becomes a 0..1 progress value that drives every phase.

  One departure from the reference: the hero copy arrives on load rather than
  on scroll. A booking site cannot afford an empty fold — the first thing a
  visitor sees has to say what we do and how to book. Scroll then takes over
  for everything after it.

  In place of scrubbed footage, the event photos are a stack that crossfades
  and settles as you scroll — each one holds, then the next lands on top with
  a slow push-in. The sequence occupies PHOTO_SPAN of the scroll; after that
  the last frame holds behind the service cards.
*/

export const SCROLL_VH = 540

/* Phones and portrait tablets run a shorter scene: photos and hero only. The
   services follow as their own section, so there is less to choreograph. */
export const SCROLL_VH_TALL = 240
export const PHOTO_SPAN_TALL = 0.9

/** Phase windows as scroll progress, 0 to 1. */
export const P = {
  heroOut: [0.42, 0.52],
  secHead: [0.53, 0.63],
  cards: [0.6, 0.78],
} as const

/** Load-time intro windows, as a 0..1 fraction of INTRO_MS. */
export const INTRO_MS = 1500
export const I = {
  label: [0.0, 0.45],
  line1: [0.05, 0.5],
  line2: [0.15, 0.6],
  support: [0.35, 0.8],
  facts: [0.5, 1.0],
} as const

/** The photo sequence occupies this much of the scroll; after it the last frame holds. */
export const PHOTO_SPAN = 0.6
export const PHOTOS = ['hero-1', 'hero-2', 'hero-3', 'hero-4', 'hero-5']

/** 0 before `a`, 1 after `b`, eased in between. */
export function span(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  const t = (p - a) / (b - a)
  return 1 - Math.pow(1 - t, 3)
}
