import type { GridFrame, CellKind } from '@/composables/types'

// 0/1 Knapsack, the canonical small textbook case: 4 items, capacity 7.
// dp[i][w] = best value achievable using the first i items with capacity w.
// Row 0 (no items available) is all zeros — nothing to include yet, so it's
// set directly rather than animated.
export function generateDpKnapsack(): GridFrame[] {
  const items = [
    { w: 1, v: 1 },
    { w: 3, v: 4 },
    { w: 4, v: 5 },
    { w: 5, v: 7 },
  ]
  const W = 7
  const rows = items.length + 1
  const cols = W + 1
  const frames: GridFrame[] = []
  const grid: (string | number)[][] = Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, () => (r === 0 ? 0 : '·')))
  const dp: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0))
  const blank = (): CellKind[][] => Array.from({ length: rows }, (_, r) => Array(cols).fill(r === 0 ? 'eliminated' : 'default')) as CellKind[][]

  frames.push({
    step: 0, phase: 'init',
    message: `Items (weight, value): ${items.map(it => `(${it.w}, ${it.v})`).join(', ')}. Capacity W = ${W}. dp[i][w] = best value using the first i items with capacity w. Row 0 (no items yet) is all zeros — nothing to include.`,
    grid: grid.map(row => [...row]), pointers: {}, highlights: blank(),
  })

  for (let i = 1; i <= items.length; i++) {
    const { w: weight, v: value } = items[i - 1]
    for (let w = 0; w <= W; w++) {
      const hl = blank()
      if (weight > w) {
        dp[i][w] = dp[i - 1][w]
        grid[i][w] = dp[i][w]
        hl[i - 1][w] = 'active'
        hl[i][w] = 'match'
        frames.push({
          step: frames.length, phase: 'update',
          message: `dp[${i}][${w}]: item ${i} (weight ${weight}) doesn't fit in capacity ${w} — carry forward dp[${i - 1}][${w}] = ${dp[i][w]}.`,
          grid: grid.map(row => [...row]), pointers: { cur: [i, w] }, highlights: hl,
        })
        continue
      }

      const skip = dp[i - 1][w]
      const take = dp[i - 1][w - weight] + value
      dp[i][w] = Math.max(skip, take)
      grid[i][w] = dp[i][w]
      hl[i - 1][w] = 'active'
      hl[i - 1][w - weight] = 'active'
      hl[i][w] = 'match'
      const isDone = i === items.length && w === W
      frames.push({
        step: frames.length, phase: isDone ? 'done' : 'update',
        message: isDone
          ? `dp[${i}][${w}] = max(skip = ${skip}, take = dp[${i - 1}][${w - weight}] + ${value} = ${take}) = ${dp[i][w]}. Best value with all items and capacity ${W}: ${dp[i][w]}.`
          : `dp[${i}][${w}] = max(skip = dp[${i - 1}][${w}] = ${skip}, take item ${i} = dp[${i - 1}][${w - weight}] + ${value} = ${take}) = ${dp[i][w]}.`,
        grid: grid.map(row => [...row]), pointers: { cur: [i, w] }, highlights: hl,
      })
    }
  }

  return frames
}
