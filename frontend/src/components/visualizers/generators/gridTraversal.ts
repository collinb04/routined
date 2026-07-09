import type { GridFrame, CellKind } from '@/composables/types'

export function generateGridTraversal(): GridFrame[] {
  const rows = 4, cols = 4
  const grid: number[][] = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => r * cols + c + 1),
  )
  const frames: GridFrame[] = []
  const highlights: CellKind[][] = Array.from({ length: rows }, () => Array(cols).fill('default')) as CellKind[][]

  frames.push({
    step: 0, phase: 'init',
    message: `A 4×4 grid. Spiral order walks right along the top, down the right side, left along the bottom, up the left side — then shrinks the remaining boundary and repeats.`,
    grid: grid.map(row => [...row]), pointers: {}, highlights: highlights.map(row => [...row]),
  })

  let top = 0, bottom = rows - 1, left = 0, right = cols - 1
  const order: [number, number][] = []
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) order.push([top, c])
    top++
    for (let r = top; r <= bottom; r++) order.push([r, right])
    right--
    if (top <= bottom) {
      for (let c = right; c >= left; c--) order.push([bottom, c])
      bottom--
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) order.push([r, left])
      left++
    }
  }

  order.forEach(([r, c], i) => {
    highlights[r][c] = 'active'
    frames.push({
      step: frames.length, phase: 'compare',
      message: `Visit (${r}, ${c}) = ${grid[r][c]} — step ${i + 1} of ${order.length}.`,
      grid: grid.map(row => [...row]), pointers: { cur: [r, c] },
      highlights: highlights.map(row => [...row]),
    })
    highlights[r][c] = 'match'
  })

  frames.push({
    step: frames.length, phase: 'done',
    message: `Spiral order: ${order.map(([r, c]) => grid[r][c]).join(', ')}. Four shrinking boundaries — no rotation formula needed, just track when to stop each side.`,
    grid: grid.map(row => [...row]), pointers: {}, highlights: highlights.map(row => [...row]),
  })

  return frames
}
