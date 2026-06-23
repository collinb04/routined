import type { TreeFrame, TreeNode, CellKind } from '@/composables/types'

function buildTree(arr: number[]): TreeNode[] {
  return arr.map((val, i) => ({
    id: i,
    val,
    left:  2 * i + 1 < arr.length ? 2 * i + 1 : null,
    right: 2 * i + 2 < arr.length ? 2 * i + 2 : null,
  }))
}

function hl(
  arr: number[],
  opts: { active?: number[]; match?: number[]; window?: number[]; eliminated?: number[] } = {},
): Record<number, CellKind> {
  return Object.fromEntries(
    arr.map((_, i) => [
      i,
      (opts.match?.includes(i)       ? 'match'      :
       opts.active?.includes(i)      ? 'active'     :
       opts.window?.includes(i)      ? 'window'     :
       opts.eliminated?.includes(i)  ? 'eliminated' :
       'default') as CellKind,
    ]),
  )
}

// Max-heap [9, 7, 8, 3, 5, 4, 6] — demonstrates extract-max + sift-down.
export function generateHeapExtract(): TreeFrame[] {
  const frames: TreeFrame[] = []
  let arr = [9, 7, 8, 3, 5, 4, 6]

  frames.push({
    step: 0, phase: 'init',
    message: `Max-heap: the root is always the largest element. Heap property — every parent ≥ its children. Stored as array [${arr.join(', ')}]; the tree shape comes from index math: left child = 2i+1, right = 2i+2. We'll extract the max.`,
    nodes: buildTree(arr),
    highlights: hl(arr, { active: [0] }),
  })

  // Step 1: highlight root as the value being extracted
  const maxVal = arr[0]
  frames.push({
    step: 1, phase: 'update',
    message: `Extract-max: pull out the root (${maxVal}). The root is always the max — that's the heap guarantee. Access is O(1). Now we have a hole at the root and need to repair the heap.`,
    nodes: buildTree(arr),
    highlights: hl(arr, { match: [0] }),
  })

  // Step 2: move last element to root
  const lastVal = arr[arr.length - 1]
  arr = [lastVal, ...arr.slice(1, arr.length - 1)]

  frames.push({
    step: 2, phase: 'update',
    message: `Move the last element (${lastVal}) up to the root. This preserves the complete binary tree shape — the only valid heap structure. The heap property is likely broken now; sift ${lastVal} down to fix it.`,
    nodes: buildTree(arr),
    highlights: hl(arr, { active: [0] }),
  })

  // Sift down
  let i = 0
  while (true) {
    const l = 2 * i + 1
    const r = 2 * i + 2
    let largest = i
    if (l < arr.length && arr[l] > arr[largest]) largest = l
    if (r < arr.length && arr[r] > arr[largest]) largest = r

    if (largest === i) {
      frames.push({
        step: frames.length, phase: 'done',
        message: `${arr[i]} ≥ both children — heap property restored! Extract-max runs in O(log n): at most one swap per level, and a complete binary tree has ⌊log₂n⌋ levels.`,
        nodes: buildTree(arr),
        highlights: hl(arr, { match: arr.map((_, k) => k) }),
      })
      break
    }

    const children = [l, r].filter(c => c < arr.length)
    frames.push({
      step: frames.length, phase: 'compare',
      message: `${arr[i]} < ${arr[largest]} (${largest === l ? 'left' : 'right'} child) — swap down. A parent must always be ≥ its children.`,
      nodes: buildTree(arr),
      highlights: hl(arr, { active: [i], window: children }),
    })

    ;[arr[i], arr[largest]] = [arr[largest], arr[i]]

    frames.push({
      step: frames.length, phase: 'update',
      message: `Swapped. ${arr[i]} is now at index ${i}, ${arr[largest]} moved down to index ${largest}. Continue sifting down from index ${largest}...`,
      nodes: buildTree(arr),
      highlights: hl(arr, { match: [i], active: [largest] }),
    })

    i = largest
  }

  return frames
}
