import type { ArrayFrame, CellKind } from '@/composables/types'

export function generateStackQueueOps(): ArrayFrame[] {
  const frames: ArrayFrame[] = []

  function hl(arr: number[], topIdx: number, pushed = false): CellKind[] {
    return arr.map((_, i) => i === topIdx ? (pushed ? 'match' : 'active') : 'default')
  }

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
    message: `Stack: [3, 7, 1, 6]. LIFO order is what makes stacks useful for function call frames, undo history, expression parsing, and DFS. Queues mirror this — FIFO, add to the back, remove from the front.`,
    array: [...stack], pointers: { top: stack.length - 1 },
    highlights: stack.map(() => 'match' as CellKind),
    windowRange: null,
  })

  return frames
}
