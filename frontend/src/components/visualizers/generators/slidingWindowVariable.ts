import type { ArrayFrame, CellKind } from '@/composables/types'

export function generateSlidingWindowVariable(
  nums: number[] = [2, 3, 1, 2, 4, 3],
  target: number = 7,
): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  const n = nums.length

  function hl(l: number, r: number, kind: CellKind = 'window'): CellKind[] {
    return nums.map((_, i) => (i >= l && i <= r ? kind : 'default'))
  }

  let l = 0, sum = 0, bestLen = Infinity, bestL = 0, bestR = 0

  frames.push({
    step: 0,
    phase: 'init',
    message: `Find the shortest subarray with sum ≥ ${target}. The window starts empty. Expand R to grow the window; once the sum hits ${target}, shrink L to find the tightest valid range. L and R move independently — this is what makes it variable-size.`,
    array: [...nums],
    pointers: { L: 0, R: 0 },
    highlights: nums.map(() => 'default' as CellKind),
    windowRange: null,
  })

  for (let r = 0; r < n; r++) {
    sum += nums[r]

    if (sum < target) {
      frames.push({
        step: frames.length,
        phase: 'compare',
        message: `Expand R → ${r}. Added ${nums[r]}. Sum = ${sum} < ${target} — keep expanding right.`,
        array: [...nums],
        pointers: { L: l, R: r },
        highlights: hl(l, r),
        windowRange: [l, r],
      })
      continue
    }

    // sum >= target: valid window, record best, then try to shrink
    if (r - l + 1 < bestLen) { bestLen = r - l + 1; bestL = l; bestR = r }

    frames.push({
      step: frames.length,
      phase: 'update',
      message: `Expand R → ${r}. Added ${nums[r]}. Sum = ${sum} ≥ ${target}! Window [${l}..${r}] (length ${r - l + 1}) is valid. Shrink from the left to find a tighter fit.`,
      array: [...nums],
      pointers: { L: l, R: r },
      highlights: hl(l, r, 'match'),
      windowRange: [l, r],
    })

    while (sum >= target) {
      const dropped = nums[l]
      sum -= dropped
      l++

      if (sum >= target) {
        const len = r - l + 1
        const newBest = len < bestLen
        if (newBest) { bestLen = len; bestL = l; bestR = r }

        frames.push({
          step: frames.length,
          phase: 'update',
          message: newBest
            ? `Drop ${dropped} from left. Sum = ${sum} still ≥ ${target}. New best: [${l}..${r}] length ${len}! Keep shrinking.`
            : `Drop ${dropped} from left. Sum = ${sum} still ≥ ${target}. Window [${l}..${r}] length ${len} — keep shrinking.`,
          array: [...nums],
          pointers: { L: l, R: r },
          highlights: hl(l, r, 'match'),
          windowRange: [l, r],
        })
      } else {
        frames.push({
          step: frames.length,
          phase: 'compare',
          message: `Drop ${dropped} from left. Sum = ${sum} < ${target} — window broken. Advance R to grow again.`,
          array: [...nums],
          pointers: { L: l, R: r },
          highlights: hl(l, r),
          windowRange: l <= r ? [l, r] : null,
        })
      }
    }
  }

  frames.push({
    step: frames.length,
    phase: 'done',
    message: bestLen === Infinity
      ? `No subarray found with sum ≥ ${target}.`
      : `Done! Shortest subarray with sum ≥ ${target}: [${nums.slice(bestL, bestR + 1).join(', ')}] at indices [${bestL}..${bestR}], length ${bestLen}. Each element was added and removed at most once — O(n) total.`,
    array: [...nums],
    pointers: { L: bestL, R: bestR },
    highlights: hl(bestL, bestR, 'match'),
    windowRange: [bestL, bestR],
  })

  return frames
}
