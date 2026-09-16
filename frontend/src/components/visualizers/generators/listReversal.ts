import type { LinkedListFrame, ListNode, CellKind } from '@/composables/types'

// Reverse a singly linked list in place using three pointers: prev (starts
// null), curr (starts at head), and a temporary next. Each step: save
// curr.next before it's overwritten, rewire curr.next = prev, then both
// pointers step forward. Classic O(n) time, O(1) space.
export function generateListReversal(): LinkedListFrame[] {
  const frames: LinkedListFrame[] = []
  const nodes: ListNode[] = [
    { id: 1, val: 1, next: 2 },
    { id: 2, val: 2, next: 3 },
    { id: 3, val: 3, next: 4 },
    { id: 4, val: 4, next: null },
  ]

  function snapshot(): ListNode[] { return nodes.map(n => ({ ...n })) }

  function f(
    phase: LinkedListFrame['phase'], message: string,
    highlights: Record<number, CellKind>, pointers: Record<string, number>,
  ): LinkedListFrame {
    return { step: frames.length, phase, message, nodes: snapshot(), highlights, pointers }
  }

  frames.push(f('init',
    `1 → 2 → 3 → 4 → null. Reverse it using three pointers: prev (starts null), curr (starts at the head), and a temporary next. Every step does the same three moves: save, rewire, advance.`,
    { 1: 'active' }, { curr: 1 }))

  let prev: number | null = null
  let curr: number | null = 1

  while (curr !== null) {
    const currNode = nodes.find(n => n.id === curr)!
    const nextId = currNode.next
    const nextVal = nextId !== null ? nodes.find(n => n.id === nextId)!.val : null

    const savePointers: Record<string, number> = { curr }
    if (prev !== null) savePointers.prev = prev
    if (nextId !== null) savePointers.next = nextId

    frames.push(f('compare',
      nextId !== null
        ? `curr = ${currNode.val}. Save next = curr.next = ${nextVal} before it gets overwritten.`
        : `curr = ${currNode.val}. curr.next is already null — this is the tail.`,
      { ...(prev !== null ? { [prev]: 'match' as CellKind } : {}), [curr]: 'active', ...(nextId !== null ? { [nextId]: 'window' as CellKind } : {}) },
      savePointers))

    currNode.next = prev

    frames.push(f('update',
      `curr.next = prev = ${prev !== null ? nodes.find(n => n.id === prev)!.val : 'null'}. Node ${currNode.val}'s arrow now points backward instead of forward.`,
      { ...(prev !== null ? { [prev]: 'match' as CellKind } : {}), [curr]: 'match' },
      savePointers))

    prev = curr
    curr = nextId
  }

  frames.push(f('done',
    `curr is null — done. prev now points to the new head: ${nodes.find(n => n.id === prev)!.val}. Reversed list: 4 → 3 → 2 → 1 → null. Same nodes, same memory — only the pointers changed direction.`,
    Object.fromEntries(nodes.map(n => [n.id, 'match' as CellKind])),
    { head: prev! }))

  return frames
}
