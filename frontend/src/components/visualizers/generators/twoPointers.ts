import type { ArrayFrame, CellKind } from '@/composables/types'

export function generateTwoPointers(
  nums: number[] = [1, 3, 4, 6, 8, 9],
  target: number = 7,
): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  let L = 0, R = nums.length - 1

  function hl(l: number, r: number, kind: CellKind = 'active'): CellKind[] {
    return nums.map((_, i) => (i === l || i === r) ? kind : 'default')
  }

  frames.push({
    step: 0,
    phase: 'init',
    message: `L starts at the smallest value, R at the largest. Because the array is sorted, we can control the sum precisely: moving L right increases it, moving R left decreases it. Target = ${target}.`,
    array: [...nums],
    pointers: { L, R },
    highlights: hl(L, R),
    windowRange: null,
  })

  while (L < R) {
    const sum = nums[L] + nums[R]
    if (sum === target) {
      frames.push({
        step: frames.length,
        phase: 'done',
        message: `${nums[L]} + ${nums[R]} = ${sum} — exactly ${target}. We found the pair without ever scanning the whole array. Two pointers let us do this in O(n) instead of O(n²).`,
        array: [...nums],
        pointers: { L, R },
        highlights: hl(L, R, 'match'),
        windowRange: null,
      })
      break
    } else if (sum > target) {
      frames.push({
        step: frames.length,
        phase: 'compare',
        message: `${nums[L]} + ${nums[R]} = ${sum}, which is ${sum - target} too large. L is already at the smallest unused value, so the only way to reduce the sum is to bring R inward to a smaller number.`,
        array: [...nums],
        pointers: { L, R },
        highlights: hl(L, R),
        windowRange: null,
      })
      R--
    } else {
      frames.push({
        step: frames.length,
        phase: 'compare',
        message: `${nums[L]} + ${nums[R]} = ${sum}, which is ${target - sum} too small. R is already at the largest unused value, so the only way to increase the sum is to move L inward to a larger number.`,
        array: [...nums],
        pointers: { L, R },
        highlights: hl(L, R),
        windowRange: null,
      })
      L++
    }
  }

  return frames
}
