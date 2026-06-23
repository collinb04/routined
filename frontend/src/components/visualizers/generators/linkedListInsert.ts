import type { LinkedListFrame, ListNode, CellKind } from '@/composables/types'

export function generateLinkedListInsert(): LinkedListFrame[] {
  const frames: LinkedListFrame[] = []

  function f(
    step: number, phase: string, message: string,
    nodes: ListNode[], highlights: Record<number, CellKind>,
  ): LinkedListFrame {
    return { step, phase, message, nodes, highlights }
  }

  const initial: ListNode[] = [
    { id: 0, val: 3, next: 1 },
    { id: 1, val: 7, next: 2 },
    { id: 2, val: 1, next: 3 },
    { id: 3, val: 5, next: null },
  ]

  frames.push(f(0, 'init',
    `3 → 7 → 1 → 5. Each node holds a value and a pointer to the next node — no index math. To insert or delete, only two pointers change. O(n) to find the spot, O(1) to do the insert.`,
    initial, {}))

  frames.push(f(1, 'compare',
    `Traverse from the head to find the insertion point. At 3: not it.`,
    initial, { 0: 'active' }))

  frames.push(f(2, 'compare',
    `At 7: found the insertion point.`,
    initial, { 0: 'eliminated', 1: 'active' }))

  frames.push(f(3, 'compare',
    `Create node 9. Step 1: set 9.next = 7.next, pointing 9 → 1. The list isn't broken yet.`,
    initial, { 1: 'active', 2: 'window' }))

  const inserted: ListNode[] = [
    { id: 0, val: 3, next: 1 },
    { id: 1, val: 7, next: 4 },
    { id: 4, val: 9, next: 2 },
    { id: 2, val: 1, next: 3 },
    { id: 3, val: 5, next: null },
  ]

  frames.push(f(4, 'update',
    `Step 2: set 7.next = 9. Two pointer updates — done.`,
    inserted, { 1: 'match', 4: 'match' }))

  frames.push(f(5, 'done',
    `3 → 7 → 9 → 1 → 5. No elements were moved or copied. An array insert here would shift every element after position 2. Linked lists trade O(n) traversal for O(1) structural changes.`,
    inserted, {}))

  return frames
}
