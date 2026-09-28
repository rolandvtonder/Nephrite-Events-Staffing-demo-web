/*
  The landscape artboard.

  The reference draws one 1440x810 board and scales it to the window WIDTH.
  That works on a 16:9 monitor, but on a laptop with browser chrome (1440
  wide, ~780 tall) the bottom row falls off screen, and on a phone 17px copy
  shrinks to 4px. So here:

  - Landscape windows get this board, scaled to FIT the stage (the smaller of
    the two axes) and centred. The photos, glow and gradients live outside the
    board at the viewport layer, so the spare margin that fitting leaves is
    filled with photography, never bars.
  - Phones and portrait tablets skip the board entirely and get a real
    responsive layout (see TallHero and Services), because a column of text
    wants to reflow, not shrink.

  Every coordinate below is an absolute position on the 1440x810 board.
*/

export type Box = readonly [x: number, y: number, w: number, h: number]

export const STAGE_W = 1440
export const STAGE_H = 810

/* The inset every block sits behind. Set once so blocks cannot drift apart. */
export const SAFE_L = 96

export const HERO = {
  label: [SAFE_L, 238, 620, 24] as Box,
  line1: [SAFE_L - 4, 270, 760, 104] as Box,
  line2: [SAFE_L - 4, 370, 760, 104] as Box,
  headSize: 112,
  support: [SAFE_L, 506, 460, 84] as Box,
  cta: [SAFE_L, 612, 620, 72] as Box,
  facts: [SAFE_L, 722, 640, 56] as Box,
  cue: [676, 778, 88, 20] as Box,
}

export const SEC = {
  label: [SAFE_L, 164, 400, 20] as Box,
  head: [SAFE_L - 3, 192, 900, 136] as Box,
  headSize: 72,
  more: [STAGE_W - SAFE_L - 300, 276, 300, 44] as Box,
  block: [SAFE_L, 438, STAGE_W - SAFE_L * 2, 340] as Box,
}

/* Card metrics on the board. Sized so the smallest copy is still 15px at a
   1:1 scale — the reference's 70% cards put body copy at 9px. */
export const CARD = {
  w: 280,
  h: 300,
  gap: 42,
  radius: 20,
  pad: 24,
  art: 104,
  artTop: -38,
  artRight: 18,
  titleTop: 124,
  titleSize: 28,
  descTop: 200,
  descSize: 15,
  descLh: 22,
  descRight: 80,
  chip: 44,
  chipInset: 20,
}

/* The four cards sit on a shallow arc rather than a row: the middle hangs
   lowest and each is tilted along the tangent, so they read as a fan. */
export function placeCard(i: number) {
  const u = (i - 1.5) / 1.5 /* -1 .. 1 across the fan */
  const offset = (SEC.block[2] - (CARD.w * 4 + CARD.gap * 3)) / 2
  return {
    left: offset + i * (CARD.w + CARD.gap),
    top: (1 - u * u) * 24,
    tilt: -u * 3.2 /* degrees */,
  }
}
