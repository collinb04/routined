import type { ArrayFrame, CellKind } from '@/composables/types'

export function generateBinarySearch(
  nums: number[] = [1, 3, 5, 7, 9, 11, 13],
  target: number = 9,
): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  const n = nums.length
  let L = 0, R = n - 1

  function hl(l: number, r: number, m: number | null, found = false): CellKind[] {
    return nums.map((_, i) => {
      if (i < l || i > r) return 'eliminated'
      if (m !== null && i === m) return found ? 'match' : 'active'
      return 'default'
    })
  }

  frames.push({
    step: 0,
    phase: 'init',
    message: `L and R mark the current search boundaries. We'll repeatedly check the middle element and eliminate half the remaining candidates — because the array is sorted, we always know which half can't contain the target.`,
    array: [...nums],
    pointers: { L, R },
    highlights: nums.map(() => 'default' as CellKind),
    windowRange: null,
  })

  while (L <= R) {
    const M = Math.floor((L + R) / 2)

    if (nums[M] === target) {
      frames.push({
        step: frames.length,
        phase: 'done',
        message: `nums[${M}] = ${nums[M]} matches the target. Found at index ${M}! Binary search located it in just ${frames.length} step${frames.length === 1 ? '' : 's'} — a sorted array of ${n} elements needed at most ${Math.ceil(Math.log2(n))} comparisons.`,
        array: [...nums],
        pointers: { L, M, R },
        highlights: hl(L, R, M, true),
        windowRange: null,
      })
      break
    } else if (nums[M] < target) {
      frames.push({
        step: frames.length,
        phase: 'compare',
        message: `nums[${M}] = ${nums[M]} < ${target}. Since the array is sorted, every element at M or to the left is also ≤ ${nums[M]} — none of them can be the target. Discard the left half: L = ${M + 1}.`,
        array: [...nums],
        pointers: { L, M, R },
        highlights: hl(L, R, M),
        windowRange: null,
      })
      L = M + 1
    } else {
      frames.push({
        step: frames.length,
        phase: 'compare',
        message: `nums[${M}] = ${nums[M]} > ${target}. Since the array is sorted, every element at M or to the right is also ≥ ${nums[M]} — none of them can be the target. Discard the right half: R = ${M - 1}.`,
        array: [...nums],
        pointers: { L, M, R },
        highlights: hl(L, R, M),
        windowRange: null,
      })
      R = M - 1
    }
  }

  return frames
}
