import type { TreeFrame, TreeNode, CellKind } from '@/composables/types'

// val = cumulative sum of included elements — unique at every leaf.
// Left = include next element. Right = exclude.
const NODES: TreeNode[] = [
  { id: 0, val: 0, left: 1, right: 2 },
  { id: 1, val: 1, left: 3, right: 4 },
  { id: 2, val: 0, left: 5, right: 6 },
  { id: 3, val: 3, left: null, right: null },
  { id: 4, val: 1, left: null, right: null },
  { id: 5, val: 2, left: null, right: null },
  { id: 6, val: 0, left: null, right: null },
]

function f(step: number, phase: string, message: string, highlights: Record<number, CellKind>): TreeFrame {
  return { step, phase, message, nodes: NODES, highlights }
}

export function generateBacktrackingTree(): TreeFrame[] {
  return [
    f(0, 'init',
      `Subsets of [1, 2]. At each level: go left to include the next element, go right to skip it. Node values show the running sum — unique at every leaf. Two elements → four leaves → four subsets.`,
      {}),
    f(1, 'compare',
      `Start at the root (empty set). Try including 1 — descend left.`,
      { 0: 'active' }),
    f(2, 'compare',
      `Sum = 1. Now decide on 2. Try including it.`,
      { 0: 'eliminated', 1: 'active' }),
    f(3, 'done',
      `{1, 2}: sum = 3. Solution — record it. Backtrack.`,
      { 0: 'eliminated', 1: 'eliminated', 3: 'match' }),
    f(4, 'compare',
      `Back at sum=1. Now exclude 2 — descend right.`,
      { 0: 'eliminated', 1: 'active', 3: 'match' }),
    f(5, 'done',
      `{1}: sum = 1. Solution. Backtrack all the way to the root.`,
      { 0: 'eliminated', 1: 'eliminated', 3: 'match', 4: 'match' }),
    f(6, 'compare',
      `Exclude 1 — descend right from root.`,
      { 0: 'active', 3: 'match', 4: 'match' }),
    f(7, 'compare',
      `Sum = 0. Try including 2.`,
      { 0: 'eliminated', 2: 'active', 3: 'match', 4: 'match' }),
    f(8, 'done',
      `{2}: sum = 2. Solution. Backtrack.`,
      { 0: 'eliminated', 2: 'eliminated', 3: 'match', 4: 'match', 5: 'match' }),
    f(9, 'done',
      `{}: sum = 0. All four subsets found. Backtracking never revisits a completed path — and prunes entire subtrees the moment a constraint is violated, without exploring them.`,
      { 0: 'match', 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match', 6: 'match' }),
  ]
}
