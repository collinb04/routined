import type { ArrayFrame, CellKind } from '@/composables/types'

const WIDTH = 8

function bits(n: number): number[] {
  return Array.from({ length: WIDTH }, (_, i) => (n >> (WIDTH - 1 - i)) & 1)
}

export function generateBitManipulation(): ArrayFrame[] {
  let n = 44 // 00101100
  const frames: ArrayFrame[] = []

  frames.push({
    step: 0, phase: 'init',
    message: `n = ${n}, binary ${n.toString(2).padStart(WIDTH, '0')}. Counting set bits with Brian Kernighan's trick: n & (n - 1) clears the lowest set bit each time — loop until n is 0, counting iterations.`,
    array: bits(n), pointers: {}, highlights: bits(n).map(() => 'default') as CellKind[], windowRange: null,
  })

  let count = 0
  while (n !== 0) {
    const bitArr = bits(n)
    const lowestSetIndex = WIDTH - 1 - Math.log2(n & -n)
    frames.push({
      step: frames.length, phase: 'compare',
      message: `n = ${n} — lowest set bit is at position ${WIDTH - 1 - lowestSetIndex} (from the right). n & -n isolates it.`,
      array: bitArr, pointers: { lowest: lowestSetIndex },
      highlights: bitArr.map((_, i) => (i === lowestSetIndex ? 'active' : 'default')) as CellKind[],
      windowRange: null,
    })
    n = n & (n - 1)
    count++
    const newBitArr = bits(n)
    frames.push({
      step: frames.length, phase: 'update',
      message: `n & (n - 1) → n = ${n}. That bit is cleared. Set-bit count so far: ${count}.`,
      array: newBitArr, pointers: {},
      highlights: newBitArr.map((_, i) => (i === lowestSetIndex ? 'match' : 'default')) as CellKind[],
      windowRange: null,
    })
  }

  frames.push({
    step: frames.length, phase: 'done',
    message: `n = 0 — loop ends. Total set bits: ${count}. This took ${count} iterations (one per set bit), not ${WIDTH} (one per bit position) — the trick skips straight from one set bit to the next.`,
    array: bits(0), pointers: {}, highlights: bits(0).map(() => 'match') as CellKind[], windowRange: null,
  })

  return frames
}
