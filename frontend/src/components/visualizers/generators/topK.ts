import type { TreeFrame, TreeNode, CellKind } from '@/composables/types'

function buildTree(arr: number[]): TreeNode[] {
  return arr.map((val, i) => ({
    id: i,
    val,
    left:  2 * i + 1 < arr.length ? 2 * i + 1 : null,
    right: 2 * i + 2 < arr.length ? 2 * i + 2 : null,
  }))
}

function hl(arr: number[], opts: { active?: number[]; match?: number[] } = {}): Record<number, CellKind> {
  return Object.fromEntries(
    arr.map((_, i) => [
      i,
      (opts.match?.includes(i) ? 'match' : opts.active?.includes(i) ? 'active' : 'default') as CellKind,
    ]),
  )
}

// Find the K largest values in a stream using a min-heap of size K. The
// root of a size-K min-heap is always the smallest of the K largest seen
// so far — exactly the bar a new value must clear to earn a spot.
export function generateTopK(): TreeFrame[] {
  const stream = [7, 2, 9, 4, 1, 8, 3]
  const K = 3
  const frames: TreeFrame[] = []
  const heap: number[] = []

  frames.push({
    step: 0, phase: 'init',
    message: `Stream: ${stream.join(', ')}. Find the K=${K} largest using a min-heap of size ${K}. Push while there's room. Once full, the root is the smallest of the current top-${K} — a new value only gets in if it beats the root.`,
    nodes: [], highlights: {},
  })

  function siftUp(i: number) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2)
      if (heap[p] <= heap[i]) break
      ;[heap[p], heap[i]] = [heap[i], heap[p]]
      i = p
    }
  }

  function siftDown(i: number) {
    while (true) {
      const l = 2 * i + 1, r = 2 * i + 2
      let smallest = i
      if (l < heap.length && heap[l] < heap[smallest]) smallest = l
      if (r < heap.length && heap[r] < heap[smallest]) smallest = r
      if (smallest === i) break
      ;[heap[i], heap[smallest]] = [heap[smallest], heap[i]]
      i = smallest
    }
  }

  for (const val of stream) {
    if (heap.length < K) {
      heap.push(val)
      siftUp(heap.length - 1)
      const landedAt = heap.indexOf(val)
      frames.push({
        step: frames.length, phase: 'update',
        message: `${val}: heap has room (${heap.length}/${K}) — push.` + (heap.length === K ? ` Heap is full now. Root = ${heap[0]} is the floor to beat.` : ''),
        nodes: buildTree(heap), highlights: hl(heap, { match: [landedAt] }),
      })
      continue
    }

    if (val <= heap[0]) {
      frames.push({
        step: frames.length, phase: 'compare',
        message: `${val} ≤ root (${heap[0]}) — not bigger than the current floor. Discard; heap unchanged.`,
        nodes: buildTree(heap), highlights: hl(heap, { active: [0] }),
      })
      continue
    }

    frames.push({
      step: frames.length, phase: 'compare',
      message: `${val} > root (${heap[0]}) — beats the floor. Replace the root, then sift down to restore the heap property.`,
      nodes: buildTree(heap), highlights: hl(heap, { active: [0] }),
    })
    heap[0] = val
    siftDown(0)
    frames.push({
      step: frames.length, phase: 'update',
      message: `Replaced. Heap: [${heap.join(', ')}]. New root = ${heap[0]} is the new floor.`,
      nodes: buildTree(heap), highlights: hl(heap, { match: [0] }),
    })
  }

  const topKSorted = [...heap].sort((a, b) => b - a)
  frames.push({
    step: frames.length, phase: 'done',
    message: `Stream exhausted. The heap holds the ${K} largest values: {${topKSorted.join(', ')}}. Root (${heap[0]}) is the smallest of them. Total cost O(n log K) — far cheaper than sorting all n elements.`,
    nodes: buildTree(heap), highlights: hl(heap, { match: heap.map((_, i) => i) }),
  })

  return frames
}
