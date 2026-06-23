import type { TreeFrame, TreeNode, CellKind } from '@/composables/types'

const NODES: TreeNode[] = [
  { id: 0, val: 1, left: 1, right: 2 },
  { id: 1, val: 2, left: 3, right: 4 },
  { id: 2, val: 3, left: 5, right: 6 },
  { id: 3, val: 4, left: null, right: null },
  { id: 4, val: 5, left: null, right: null },
  { id: 5, val: 6, left: null, right: null },
  { id: 6, val: 7, left: null, right: null },
]

function f(step: number, phase: string, message: string, highlights: Record<number, CellKind>): TreeFrame {
  return { step, phase, message, nodes: NODES, highlights }
}

export function generateBfsDfsTraversal(): TreeFrame[] {
  return [
    f(0, 'init',
      `BFS visits level by level — nearest to farthest. Uses a queue: enqueue root, then repeatedly dequeue, process, and enqueue children.`,
      {}),
    f(1, 'compare',
      `Enqueue 1. Dequeue 1, process. Enqueue children 2 and 3. Queue: [2, 3].`,
      { 0: 'active' }),
    f(2, 'compare',
      `Dequeue 2, process. Enqueue children 4 and 5. Queue: [3, 4, 5].`,
      { 0: 'match', 1: 'active' }),
    f(3, 'compare',
      `Dequeue 3, process. Enqueue children 6 and 7. Queue: [4, 5, 6, 7]. Level 1 done.`,
      { 0: 'match', 1: 'match', 2: 'active' }),
    f(4, 'compare',
      `Dequeue 4, process. No children. Queue: [5, 6, 7].`,
      { 0: 'match', 1: 'match', 2: 'match', 3: 'active' }),
    f(5, 'compare',
      `Dequeue 5, process. No children. Queue: [6, 7].`,
      { 0: 'match', 1: 'match', 2: 'match', 3: 'match', 4: 'active' }),
    f(6, 'compare',
      `Dequeue 6, process. No children. Queue: [7].`,
      { 0: 'match', 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'active' }),
    f(7, 'done',
      `Dequeue 7, process. Queue empty. Visit order: 1→2→3→4→5→6→7. BFS guarantees the shortest path in unweighted graphs because it never reaches a node via a longer route than the shortest one.`,
      { 0: 'match', 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match', 6: 'match' }),
  ]
}
