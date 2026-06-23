import type { ArrayFrame, CellKind } from '@/composables/types'

export function generateInsertionSort(nums: number[] = [4, 2, 7, 1, 5]): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  const arr = [...nums]
  const n = arr.length

  frames.push({
    step: 0, phase: 'init',
    message: `Starting array: [${arr.join(', ')}]. Insertion sort maintains a sorted prefix (green) on the left and extends it one element at a time — like sorting cards in your hand.`,
    array: [...arr], pointers: {},
    highlights: arr.map((_, i) => (i === 0 ? 'match' : 'default') as CellKind),
    windowRange: null,
  })

  for (let i = 1; i < n; i++) {
    const key = arr[i]

    frames.push({
      step: frames.length, phase: 'compare',
      message: `Pick up ${key} (index ${i}). Scan left through the sorted prefix [${arr.slice(0, i).join(', ')}] to find where it belongs.`,
      array: [...arr], pointers: { key: i },
      highlights: arr.map((_, k) => {
        if (k < i) return 'match'
        if (k === i) return 'active'
        return 'default'
      }) as CellKind[],
      windowRange: null,
    })

    let j = i - 1
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = key

    const insertPos = j + 1
    const shiftCount = i - insertPos
    const shiftMsg = shiftCount > 0
      ? `Shifted ${shiftCount} element${shiftCount > 1 ? 's' : ''} right to make room.`
      : `${key} is already in the right place — no shifts needed.`

    frames.push({
      step: frames.length, phase: 'update',
      message: `${key} inserted at index ${insertPos}. ${shiftMsg} Sorted prefix is now [${arr.slice(0, i + 1).join(', ')}].`,
      array: [...arr], pointers: { key: insertPos },
      highlights: arr.map((_, k) => (k <= i ? 'match' : 'default') as CellKind),
      windowRange: null,
    })
  }

  frames.push({
    step: frames.length, phase: 'done',
    message: `Sorted! The sorted prefix expanded one element per pass until it covered the whole array. O(n²) worst case, O(n) if nearly sorted — that's why Timsort uses insertion sort for small subarrays.`,
    array: [...arr], pointers: {},
    highlights: arr.map(() => 'match' as CellKind),
    windowRange: null,
  })
  return frames
}
