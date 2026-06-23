import type { ArrayFrame, CellKind } from '@/composables/types'

export function generateArrayAccess(): ArrayFrame[] {
  const arr = [7, 2, 9, 4, 6, 1, 8]
  const frames: ArrayFrame[] = []
  const n = arr.length

  frames.push({
    step: 0, phase: 'init',
    message: `${n}-element array, 0-indexed. Every element lives at base_address + index × element_size — one arithmetic operation from the base pointer. Index access is O(1) regardless of array length.`,
    array: [...arr], pointers: {}, highlights: arr.map(() => 'default'), windowRange: null,
  })

  frames.push({
    step: 1, phase: 'compare',
    message: `arr[4]: base + 4 × size. No iteration, no traversal — one address calculation.`,
    array: [...arr], pointers: { idx: 4 },
    highlights: arr.map((_, i) => (i === 4 ? 'active' : 'default')) as CellKind[],
    windowRange: null,
  })

  frames.push({
    step: 2, phase: 'update',
    message: `arr[4] = ${arr[4]}. Retrieved in one step whether the array has 7 elements or 7 million. That's O(1).`,
    array: [...arr], pointers: { idx: 4 },
    highlights: arr.map((_, i) => (i === 4 ? 'match' : 'default')) as CellKind[],
    windowRange: null,
  })

  const target = 6
  frames.push({
    step: 3, phase: 'init',
    message: `Now find value ${target} without knowing its index. Arrays index by position, not value — no shortcut exists. Scan left to right.`,
    array: [...arr], pointers: {}, highlights: arr.map(() => 'default'), windowRange: null,
  })

  const visited: number[] = []
  for (let i = 0; i < n; i++) {
    const found = arr[i] === target
    visited.push(i)
    frames.push({
      step: frames.length, phase: found ? 'done' : 'compare',
      message: found
        ? `arr[${i}] = ${arr[i]} — found after ${i + 1} comparison${i !== 1 ? 's' : ''}. O(n) to search by value vs O(1) to access by index.`
        : `arr[${i}] = ${arr[i]}, not ${target}. Move right.`,
      array: [...arr], pointers: { i },
      highlights: arr.map((_, k) =>
        k === i ? (found ? 'match' : 'active') : visited.includes(k) ? 'eliminated' : 'default',
      ) as CellKind[],
      windowRange: null,
    })
    if (found) break
  }

  return frames
}
