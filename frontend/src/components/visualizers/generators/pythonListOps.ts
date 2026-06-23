import type { ArrayFrame, CellKind } from '@/composables/types'

export function generatePythonListOps(): ArrayFrame[] {
  const frames: ArrayFrame[] = []

  frames.push({
    step: 0, phase: 'init',
    message: `[1, 2, 3, 4] at capacity four. Python lists are backed by a fixed-size C array. When it fills, Python allocates a larger block and copies everything over.`,
    array: [1, 2, 3, 4], pointers: {},
    highlights: [1, 2, 3, 4].map(() => 'active' as CellKind),
    windowRange: null,
  })

  frames.push({
    step: 1, phase: 'update',
    message: `append(5) hits the capacity limit. Python allocates a new block — double the size, 8 slots — and copies all 4 elements. O(n) work for this one call.`,
    array: [1, 2, 3, 4], pointers: {},
    highlights: [1, 2, 3, 4].map(() => 'match' as CellKind),
    windowRange: null,
  })

  frames.push({
    step: 2, phase: 'update',
    message: `Copy done. 5 lands in the first free slot. O(1) now that the space exists.`,
    array: [1, 2, 3, 4, 5], pointers: {},
    highlights: ['match', 'match', 'match', 'match', 'active'] as CellKind[],
    windowRange: null,
  })

  frames.push({
    step: 3, phase: 'compare',
    message: `append(6), (7), (8): three free slots waiting. Each is O(1) — no copy needed.`,
    array: [1, 2, 3, 4, 5, 6, 7, 8], pointers: {},
    highlights: ['match', 'match', 'match', 'match', 'match', 'active', 'active', 'active'] as CellKind[],
    windowRange: null,
  })

  frames.push({
    step: 4, phase: 'update',
    message: `append(9): capacity 8 is full again. Resize to 16, copy 8 elements. Two resizes in 9 appends — each proportional to the size at that moment.`,
    array: [1, 2, 3, 4, 5, 6, 7, 8], pointers: {},
    highlights: [1, 2, 3, 4, 5, 6, 7, 8].map(() => 'eliminated' as CellKind),
    windowRange: null,
  })

  frames.push({
    step: 5, phase: 'done',
    message: `[1–9] in a 16-slot block. Total copy work across both resizes: 4 + 8 = 12 for 9 appends. As n grows the resize costs sum to ~2n — O(n) spread over n operations. Amortized O(1) per append.`,
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9], pointers: {},
    highlights: Array(8).fill('match' as CellKind).concat(['active' as CellKind]),
    windowRange: null,
  })

  return frames
}
