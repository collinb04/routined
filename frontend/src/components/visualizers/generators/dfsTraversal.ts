import type { TreeFrame, TreeNode, CellKind } from '@/composables/types'

// Same tree as BFS. DFS preorder: root → left → right. Visit order: 1,2,4,5,3,6,7.
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

export function generateDfsTraversal(): TreeFrame[] {
  return [
    f(0, 'init',
      `DFS dives as deep as possible before backtracking. Uses a stack — push root, pop and process, push children right-then-left so left is popped first. Same tree as BFS above — compare the visit orders.`,
      {}),
    f(1, 'compare',
      `Push 1. Pop 1, process. Push right (3), then left (2). Stack: [3, 2]. Next: pop 2.`,
      { 0: 'active' }),
    f(2, 'compare',
      `Pop 2, process. Push right (5), then left (4). Stack: [3, 5, 4]. Next: pop 4.`,
      { 0: 'match', 1: 'active' }),
    f(3, 'compare',
      `Pop 4, process. No children. Stack: [3, 5]. At the deepest point of the left subtree.`,
      { 0: 'match', 1: 'match', 3: 'active' }),
    f(4, 'compare',
      `Pop 5, process. No children. Stack: [3]. Left subtree of 2 exhausted — backtrack.`,
      { 0: 'match', 1: 'match', 3: 'match', 4: 'active' }),
    f(5, 'compare',
      `Pop 3, process. Push right (7), then left (6). Stack: [7, 6]. Now in the right subtree of root.`,
      { 0: 'match', 1: 'match', 3: 'match', 4: 'match', 2: 'active' }),
    f(6, 'compare',
      `Pop 6, process. No children. Stack: [7].`,
      { 0: 'match', 1: 'match', 3: 'match', 4: 'match', 2: 'match', 5: 'active' }),
    f(7, 'done',
      `Pop 7, process. Stack empty. Visit order: 1→2→4→5→3→6→7. BFS order above was 1→2→3→4→5→6→7. DFS uses O(h) stack space (h = height); BFS uses O(w) queue space (w = max level width).`,
      { 0: 'match', 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match', 6: 'match' }),
  ]
}
