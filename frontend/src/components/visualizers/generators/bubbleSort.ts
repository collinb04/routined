import type { ArrayFrame, CellKind } from '@/composables/types'

export function generateBubbleSort(nums: number[] = [4, 2, 5, 1, 3]): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  const arr = [...nums]
  const n = arr.length
  const sorted = new Set<number>()

  function hl(j: number, swapped: boolean): CellKind[] {
    return arr.map((_, i) => {
      if (sorted.has(i)) return 'match'
      if (i === j || i === j + 1) return swapped ? 'active' : 'window'
      return 'default'
    })
  }

  frames.push({
    step: 0, phase: 'init',
    message: `Starting array: [${arr.join(', ')}]. Bubble sort makes repeated passes, comparing adjacent pairs and swapping them if out of order. After each pass, the largest unsorted element is guaranteed to be in its final position.`,
    array: [...arr], pointers: {}, highlights: arr.map(() => 'default'), windowRange: null,
  })

  for (let pass = 0; pass < n - 1; pass++) {
    let anySwap = false
    for (let j = 0; j < n - 1 - pass; j++) {
      const a = arr[j], b = arr[j + 1]
      if (a > b) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        anySwap = true
        frames.push({
          step: frames.length, phase: 'update',
          message: `Pass ${pass + 1}: ${a} > ${b} — swap! ${arr[j]} moves left, ${arr[j + 1]} moves right.`,
          array: [...arr], pointers: {}, highlights: hl(j, true), windowRange: null,
        })
      } else {
        frames.push({
          step: frames.length, phase: 'compare',
          message: `Pass ${pass + 1}: ${a} ≤ ${b} — already in order, no swap needed.`,
          array: [...arr], pointers: {}, highlights: hl(j, false), windowRange: null,
        })
      }
    }
    sorted.add(n - 1 - pass)
    if (!anySwap) {
      frames.push({
        step: frames.length, phase: 'done',
        message: `No swaps in pass ${pass + 1} — the array is already sorted! Early exit. This is the O(n) best-case scenario.`,
        array: [...arr], pointers: {}, highlights: arr.map(() => 'match'), windowRange: null,
      })
      return frames
    }
  }
  sorted.add(0)

  frames.push({
    step: frames.length, phase: 'done',
    message: `Sorted! Each of the ${n - 1} passes pushed the largest remaining element to its final position. You can see the sorted suffix (green) grow by one each pass.`,
    array: [...arr], pointers: {}, highlights: arr.map(() => 'match'), windowRange: null,
  })
  return frames
}
