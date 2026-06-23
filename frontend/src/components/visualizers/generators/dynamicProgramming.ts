import type { ArrayFrame, CellKind } from '@/composables/types'

// Climbing stairs: how many distinct ways to climb n stairs
// taking 1 or 2 steps at a time?
// dp[i] = dp[i-1] + dp[i-2]
export function generateDynamicProgramming(n: number = 6): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  const dp: number[] = new Array(n + 1).fill(0)
  dp[0] = 1
  dp[1] = 1

  // Display array is dp[1..n] (stairs 1 through n)
  // Index 0 in display = stair 1, etc.
  function display(): number[] {
    return dp.slice(1)
  }

  function hl(current: number, src1: number | null, src2: number | null, done = false): CellKind[] {
    return display().map((_, i) => {
      const stair = i + 1
      if (done && stair === current) return 'match'
      if (stair === current) return 'active'
      if (stair === src1 || stair === src2) return 'window'
      if (stair < current) return 'eliminated'
      return 'default'
    })
  }

  frames.push({
    step: 0,
    phase: 'init',
    message: `Climbing stairs: how many ways to reach stair ${n} using 1 or 2 steps at a time? We build the answer bottom-up. dp[1] = 1 (only one way to reach stair 1). dp[2] will be computed next.`,
    array: display(),
    pointers: { i: 0 },
    highlights: display().map((_, i) => (i === 0 ? 'active' : 'default') as CellKind),
    windowRange: null,
  })

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
    const isDone = i === n

    frames.push({
      step: frames.length,
      phase: isDone ? 'done' : 'update',
      message: isDone
        ? `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}. There are ${dp[i]} distinct ways to climb ${n} stairs. Each subproblem was solved once and reused — that's the DP payoff.`
        : `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}. To reach stair ${i}, you either stepped from stair ${i - 1} or jumped from stair ${i - 2}. We add both possibilities.`,
      array: display(),
      pointers: { i: i - 1 },
      highlights: hl(i, i - 1, i - 2, isDone),
      windowRange: null,
    })
  }

  return frames
}
