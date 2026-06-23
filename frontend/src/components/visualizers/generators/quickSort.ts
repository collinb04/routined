import type { ArrayFrame, CellKind } from '@/composables/types'

// Lomuto partition — pivot is always the last element of the current subarray.
export function generateQuickSort(nums: number[] = [7, 2, 4, 1, 5, 3, 6]): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  const arr = [...nums]
  const n = arr.length
  const inFinalPos = new Set<number>()

  function hl(lo: number, hi: number, pivotIdx: number | null, leftEnd: number | null): CellKind[] {
    return arr.map((_, i) => {
      if (inFinalPos.has(i)) return 'match'
      if (pivotIdx !== null && i === pivotIdx) return 'match'
      if (leftEnd !== null && i >= lo && i <= leftEnd) return 'window'
      if (leftEnd !== null && i > leftEnd && i < (pivotIdx ?? hi)) return 'eliminated'
      if (i >= lo && i <= hi) return 'default'
      return 'default'
    })
  }

  frames.push({
    step: 0, phase: 'init',
    message: `Starting array: [${arr.join(', ')}]. Quicksort picks a pivot, partitions everything ≤ pivot to its left and everything > pivot to its right, then recurses on each side. The pivot lands in its final sorted position after each partition.`,
    array: [...arr], pointers: {}, highlights: arr.map(() => 'default'), windowRange: null,
  })

  type Sub = [number, number]
  const stack: Sub[] = [[0, n - 1]]

  while (stack.length > 0) {
    const [lo, hi] = stack.pop()!
    if (lo >= hi) continue

    const pivot = arr[hi]

    frames.push({
      step: frames.length, phase: 'compare',
      message: `Subarray [${arr.slice(lo, hi + 1).join(', ')}] (indices ${lo}–${hi}). Pivot = ${pivot} (last element, index ${hi}). Partition: scan left to right and move everything ≤ ${pivot} to the left side.`,
      array: [...arr], pointers: { pivot: hi },
      highlights: arr.map((_, i) => {
        if (inFinalPos.has(i)) return 'match'
        if (i === hi) return 'active'
        if (i >= lo && i < hi) return 'default'
        return 'default'
      }) as CellKind[],
      windowRange: null,
    })

    let i = lo - 1
    for (let j = lo; j < hi; j++) {
      if (arr[j] <= pivot) {
        i++
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
    ;[arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]]
    const pivotFinal = i + 1
    inFinalPos.add(pivotFinal)

    const leftSide = pivotFinal > lo ? `[${arr.slice(lo, pivotFinal).join(', ')}]` : '(empty)'
    const rightSide = pivotFinal < hi ? `[${arr.slice(pivotFinal + 1, hi + 1).join(', ')}]` : '(empty)'

    frames.push({
      step: frames.length, phase: 'update',
      message: `Pivot ${pivot} placed at index ${pivotFinal} — its final sorted position. Left: ${leftSide} (all ≤ ${pivot}), Right: ${rightSide} (all > ${pivot}). Now recurse on each side.`,
      array: [...arr], pointers: { pivot: pivotFinal },
      highlights: hl(lo, hi, pivotFinal, pivotFinal > lo ? pivotFinal - 1 : null),
      windowRange: null,
    })

    stack.push([pivotFinal + 1, hi])
    stack.push([lo, pivotFinal - 1])
  }

  frames.push({
    step: frames.length, phase: 'done',
    message: `Sorted! Each partition placed one pivot in its final position and narrowed the problem. O(n log n) average — each level of recursion does O(n) total partition work across all active subarrays.`,
    array: [...arr], pointers: {}, highlights: arr.map(() => 'match'), windowRange: null,
  })
  return frames
}
