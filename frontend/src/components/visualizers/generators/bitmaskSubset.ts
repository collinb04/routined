import type { ArrayFrame, CellKind } from '@/composables/types'

const ITEMS = ['A', 'B', 'C']

export function generateBitmaskSubset(): ArrayFrame[] {
  const n = ITEMS.length
  const frames: ArrayFrame[] = []

  frames.push({
    step: 0, phase: 'init',
    message: `3 items: A, B, C. Every subset maps to a unique integer mask from 0 to 2³ − 1 = 7. Bit i of the mask is 1 if item i is included.`,
    array: ITEMS.map(() => 0), pointers: {}, highlights: ITEMS.map(() => 'default') as CellKind[], windowRange: null,
  })

  for (let mask = 0; mask < (1 << n); mask++) {
    const included: string[] = []
    const highlights: CellKind[] = []
    for (let i = 0; i < n; i++) {
      const isIn = (mask & (1 << i)) !== 0
      highlights.push(isIn ? 'active' : 'default')
      if (isIn) included.push(ITEMS[i])
    }
    const binary = mask.toString(2).padStart(n, '0')
    frames.push({
      step: frames.length, phase: mask === (1 << n) - 1 ? 'done' : 'compare',
      message: `mask = ${mask} (binary ${binary}) → subset = {${included.join(', ') || '∅'}}. mask & (1 << i) tests whether item i is included.`,
      array: ITEMS.map((_, i) => ((mask & (1 << i)) ? 1 : 0)),
      pointers: {},
      highlights, windowRange: null,
    })
  }

  return frames
}
