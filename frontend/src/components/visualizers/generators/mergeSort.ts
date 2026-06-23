import type { ArrayFrame, CellKind } from '@/composables/types'

// Bottom-up merge sort — avoids recursion so every merge step is visible linearly.
export function generateMergeSort(nums: number[] = [4, 2, 6, 1, 5, 3]): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  const arr = [...nums]
  const n = arr.length
  const finalized = new Set<number>()

  function hl(lo: number, mid: number, hi: number): CellKind[] {
    return arr.map((_, i) => {
      if (finalized.has(i)) return 'match'
      if (i >= lo && i < mid) return 'active'
      if (i >= mid && i < hi) return 'window'
      return 'default'
    })
  }

  function hlAfter(lo: number, hi: number): CellKind[] {
    return arr.map((_, i) => (finalized.has(i) || (i >= lo && i < hi) ? 'match' : 'default'))
  }

  function mergePair(lo: number, mid: number, hi: number) {
    const left = arr.slice(lo, mid)
    const right = arr.slice(mid, hi)
    let a = 0, b = 0, k = lo
    while (a < left.length && b < right.length) {
      arr[k++] = left[a] <= right[b] ? left[a++] : right[b++]
    }
    while (a < left.length) arr[k++] = left[a++]
    while (b < right.length) arr[k++] = right[b++]
    for (let i = lo; i < hi; i++) finalized.add(i)
  }

  frames.push({
    step: 0, phase: 'init',
    message: `Starting array: [${arr.join(', ')}]. Merge sort uses a bottom-up strategy: start by merging adjacent pairs of 1 element, then pairs of 2, then 4, doubling the merge window each pass until the entire array is sorted.`,
    array: [...arr], pointers: {}, highlights: arr.map(() => 'default'), windowRange: null,
  })

  for (let width = 1; width < n; width *= 2) {
    for (let lo = 0; lo < n; lo += 2 * width) {
      const mid = Math.min(lo + width, n)
      const hi = Math.min(lo + 2 * width, n)
      if (mid >= hi) continue

      const leftSlice = arr.slice(lo, mid).join(', ')
      const rightSlice = arr.slice(mid, hi).join(', ')

      frames.push({
        step: frames.length, phase: 'compare',
        message: `Merge [${leftSlice}] (blue) with [${rightSlice}] (light blue). Two sorted halves — always take the smaller front element to build the merged result.`,
        array: [...arr], pointers: {}, highlights: hl(lo, mid, hi), windowRange: null,
      })

      mergePair(lo, mid, hi)

      frames.push({
        step: frames.length, phase: 'update',
        message: `Merged into [${arr.slice(lo, hi).join(', ')}] — this subarray is now sorted and in its final position.`,
        array: [...arr], pointers: {}, highlights: hlAfter(lo, hi), windowRange: null,
      })
    }
  }

  frames.push({
    step: frames.length, phase: 'done',
    message: `Sorted! ${Math.ceil(Math.log2(n))} passes, each doing O(n) total merge work = O(n log n). Every element ended up in its correct position by being part of progressively larger sorted subarrays.`,
    array: [...arr], pointers: {}, highlights: arr.map(() => 'match'), windowRange: null,
  })
  return frames
}
