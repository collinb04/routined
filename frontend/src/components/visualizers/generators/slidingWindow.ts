import type { ArrayFrame, CellKind } from '@/composables/types'

export function generateSlidingWindow(
  nums: number[] = [2, 1, 5, 2, 3, 2],
  k: number = 3,
): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  const n = nums.length

  function hl(start: number, end: number, kind: CellKind = 'window'): CellKind[] {
    return nums.map((_, i) => (i >= start && i <= end) ? kind : 'default')
  }

  let windowSum = 0
  for (let i = 0; i < k; i++) windowSum += nums[i]
  let bestSum = windowSum
  let bestStart = 0

  frames.push({
    step: 0,
    phase: 'init',
    message: `The first window covers indices 0–${k - 1}: ${nums.slice(0, k).join(' + ')} = ${windowSum}. We sum k=${k} consecutive elements to get our initial best. From here, we'll slide the window one step at a time rather than recomputing from scratch.`,
    array: [...nums],
    pointers: { L: 0, R: k - 1 },
    highlights: hl(0, k - 1),
    windowRange: [0, k - 1],
  })

  for (let r = k; r < n; r++) {
    const l = r - k + 1
    const outgoing = nums[r - k]
    const incoming = nums[r]
    windowSum += incoming - outgoing
    const isNewBest = windowSum > bestSum
    if (isNewBest) { bestSum = windowSum; bestStart = l }

    frames.push({
      step: frames.length,
      phase: isNewBest ? 'update' : 'compare',
      message: isNewBest
        ? `Drop ${outgoing} off the left, pick up ${incoming} on the right. Sum = ${windowSum} — a new best! The key insight: we update the sum in O(1) by subtracting the outgoing element and adding the incoming one.`
        : `Drop ${outgoing} off the left, pick up ${incoming} on the right. Sum = ${windowSum}. Not a new best (${bestSum}), but we've checked this window in constant time.`,
      array: [...nums],
      pointers: { L: l, R: r },
      highlights: hl(l, r, isNewBest ? 'match' : 'window'),
      windowRange: [l, r],
    })
  }

  frames.push({
    step: frames.length,
    phase: 'done',
    message: `All windows checked. The maximum sum is ${bestSum}, found in the window ending at index ${bestStart + k - 1}. We checked every window in O(n) total — no nested loops needed.`,
    array: [...nums],
    pointers: { L: bestStart, R: bestStart + k - 1 },
    highlights: hl(bestStart, bestStart + k - 1, 'match'),
    windowRange: [bestStart, bestStart + k - 1],
  })

  return frames
}
