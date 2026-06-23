import type { ArrayFrame, CellKind } from '@/composables/types'

// Visualizes Floyd's cycle detection on an array-backed linked list.
// next[i] gives the index that node i points to.
// Default: 0→1→2→3→4→2 (cycle at node 2)
export function generateFastSlow(
  next: number[] = [1, 2, 3, 4, 2],
  values: number[] = [3, 1, 8, 5, 7],
): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  const n = values.length

  function hl(slow: number, fast: number, met = false): CellKind[] {
    return values.map((_, i) => {
      if (i === slow && i === fast) return met ? 'match' : 'active'
      if (i === slow) return 'active'
      if (i === fast) return 'window'
      return 'default'
    })
  }

  let slow = 0, fast = 0

  frames.push({
    step: 0,
    phase: 'init',
    message: `Both pointers start at node 0. The slow pointer (S) moves one step at a time; the fast pointer (F) moves two. If there's a cycle, fast will lap slow and they'll eventually land on the same node.`,
    array: [...values],
    pointers: { S: slow, F: fast },
    highlights: hl(slow, fast),
    windowRange: null,
  })

  const maxSteps = n * 2 + 2
  for (let step = 0; step < maxSteps; step++) {
    slow = next[slow]
    fast = next[next[fast]]

    const met = slow === fast
    frames.push({
      step: frames.length,
      phase: met ? 'done' : 'compare',
      message: met
        ? `S and F meet at node ${slow} (value ${values[slow]}). A meeting point is only possible if the list contains a cycle — in a straight list, fast would reach the end first. Cycle confirmed!`
        : `S moves to node ${slow} (value ${values[slow]}). F jumps two steps to node ${fast} (value ${values[fast]}). F is gaining on S by one node per round.`,
      array: [...values],
      pointers: { S: slow, F: fast },
      highlights: hl(slow, fast, met),
      windowRange: null,
    })

    if (met) break
  }

  return frames
}
