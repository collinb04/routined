import type { ArrayFrame, CellKind } from '@/composables/types'

function hl(arr: number[], topIdx: number, pushed = false): CellKind[] {
  return arr.map((_, i) => i === topIdx ? (pushed ? 'match' : 'active') : 'default')
}

export function generateStackOps(): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  let stack = [3, 7, 1, 5, 8]

  frames.push({
    step: 0, phase: 'init',
    message: `Stack with top = ${stack[stack.length - 1]} at index ${stack.length - 1}. LIFO — the last element pushed is always the first popped. Push and pop both touch only the end. Both O(1).`,
    array: [...stack], pointers: { top: stack.length - 1 },
    highlights: hl(stack, stack.length - 1),
    windowRange: null,
  })

  stack = [3, 7, 1, 5]
  frames.push({
    step: 1, phase: 'update',
    message: `pop() → 8. Decrement length. No shifting — the element is just gone. Top is now ${stack[stack.length - 1]}.`,
    array: [...stack], pointers: { top: stack.length - 1 },
    highlights: hl(stack, stack.length - 1),
    windowRange: null,
  })

  stack = [3, 7, 1]
  frames.push({
    step: 2, phase: 'update',
    message: `pop() → 5. Top is now ${stack[stack.length - 1]}.`,
    array: [...stack], pointers: { top: stack.length - 1 },
    highlights: hl(stack, stack.length - 1),
    windowRange: null,
  })

  stack = [3, 7, 1, 6]
  frames.push({
    step: 3, phase: 'update',
    message: `push(6): write to index ${stack.length - 1}, increment length. O(1).`,
    array: [...stack], pointers: { top: stack.length - 1 },
    highlights: hl(stack, stack.length - 1, true),
    windowRange: null,
  })

  frames.push({
    step: 4, phase: 'done',
    message: `Stack: [3, 7, 1, 6]. LIFO — the last element in is the first out. That's what makes stacks useful for call frames, undo history, expression parsing, and DFS.`,
    array: [...stack], pointers: { top: stack.length - 1 },
    highlights: stack.map(() => 'match' as CellKind),
    windowRange: null,
  })

  return frames
}

// Queue: FIFO — enqueue at the back, dequeue from the front.
function qHl(arr: number[], frontIdx: number, backIdx: number, justAdded = false): CellKind[] {
  return arr.map((_, i) => {
    if (i === backIdx && justAdded) return 'match'
    if (i === frontIdx) return 'active'
    if (i === backIdx) return 'window'
    return 'default'
  })
}

export function generateQueueOps(): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  let queue = [3, 7, 1, 5]

  frames.push({
    step: 0, phase: 'init',
    message: `Queue with front = ${queue[0]} at index 0, back = ${queue[queue.length - 1]} at index ${queue.length - 1}. FIFO — the first element enqueued is the first dequeued. Enqueue touches the back, dequeue touches the front.`,
    array: [...queue], pointers: { front: 0, back: queue.length - 1 },
    highlights: qHl(queue, 0, queue.length - 1),
    windowRange: null,
  })

  queue = [3, 7, 1, 5, 8]
  frames.push({
    step: 1, phase: 'update',
    message: `enqueue(8): write to the back (index ${queue.length - 1}). Front is untouched.`,
    array: [...queue], pointers: { front: 0, back: queue.length - 1 },
    highlights: qHl(queue, 0, queue.length - 1, true),
    windowRange: null,
  })

  frames.push({
    step: 2, phase: 'compare',
    message: `dequeue() → 3, from the front. A plain array would need to shift every remaining element left — O(n). That's why real queues are backed by a linked list or circular buffer: removing from the front is O(1), no shifting.`,
    array: [...queue], pointers: { front: 0, back: queue.length - 1 },
    highlights: queue.map((_, i) => (i === 0 ? 'match' : 'default') as CellKind),
    windowRange: null,
  })

  queue = [7, 1, 5, 8]
  frames.push({
    step: 3, phase: 'done',
    message: `Queue: [7, 1, 5, 8]. Front = 7, back = 8. Same two operations as a stack — add and remove one element — but at opposite ends, which flips LIFO into FIFO. BFS uses this: the queue IS the frontier of nodes waiting to be visited.`,
    array: [...queue], pointers: { front: 0, back: queue.length - 1 },
    highlights: qHl(queue, 0, queue.length - 1),
    windowRange: null,
  })

  return frames
}
