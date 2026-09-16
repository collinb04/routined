import type { GridFrame, CellKind } from '@/composables/types'

// Burst Balloons: bursting balloon k pays nums[i] × nums[k] × nums[j],
// where i, j are the nearest *surviving* neighbors at that moment. Padding
// both ends with a sentinel balloon of value 1 turns "nearest surviving
// neighbor" into a clean interval DP: dp[i][j] = best coins obtainable by
// bursting every balloon strictly between i and j. Same code sample this
// topic already shows — filled here by increasing interval length.
export function generateDpIntervals(): GridFrame[] {
  const nums = [3, 1, 5, 8]
  const padded = [1, ...nums, 1]
  const n = padded.length
  const frames: GridFrame[] = []
  const grid: (string | number)[][] = Array.from({ length: n }, (_, r) =>
    Array.from({ length: n }, (_, c) => (c <= r + 1 ? '·' : '')),
  )
  const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0))
  const blank = (): CellKind[][] =>
    Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (c <= r ? 'eliminated' : 'default'))) as CellKind[][]

  frames.push({
    step: 0, phase: 'init',
    message: `Burst balloons [${nums.join(', ')}] for max coins — bursting balloon k pays nums[i] × nums[k] × nums[j], where i, j are the nearest surviving neighbors. Pad both ends with a sentinel 1 → [${padded.join(', ')}]. dp[i][j] = best coins from clearing everything strictly between i and j. Fill by increasing interval length, since dp[i][j] needs every shorter interval already solved.`,
    grid: grid.map(row => [...row]), pointers: {}, highlights: blank(),
  })

  for (let length = 2; length < n; length++) {
    for (let i = 0; i + length < n; i++) {
      const j = i + length
      let best = -Infinity, bestK = -1
      for (let k = i + 1; k < j; k++) {
        const coins = padded[i] * padded[k] * padded[j] + dp[i][k] + dp[k][j]
        if (coins > best) { best = coins; bestK = k }
      }

      const cmpHl = blank()
      cmpHl[i][j] = 'active'
      frames.push({
        step: frames.length, phase: 'compare',
        message: `dp[${i}][${j}]: try every split k in between — the last balloon burst in this range. Best is k=${bestK}: ${padded[i]}×${padded[bestK]}×${padded[j]} + dp[${i}][${bestK}] + dp[${bestK}][${j}] = ${best}.`,
        grid: grid.map(row => [...row]), pointers: {}, highlights: cmpHl,
      })

      dp[i][j] = best
      grid[i][j] = best
      const isDone = i === 0 && j === n - 1
      const doneHl = blank()
      doneHl[i][j] = isDone ? 'match' : 'window'
      frames.push({
        step: frames.length, phase: isDone ? 'done' : 'update',
        message: isDone
          ? `dp[0][${n - 1}] = ${best}. That's the max coins obtainable bursting all ${nums.length} balloons in the best order. O(n²) subproblems, O(n) work each — O(n³) total.`
          : `dp[${i}][${j}] = ${best}.`,
        grid: grid.map(row => [...row]), pointers: {}, highlights: doneHl,
      })
    }
  }

  return frames
}
