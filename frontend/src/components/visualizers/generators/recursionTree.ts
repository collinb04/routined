import type { TreeFrame, TreeNode, CellKind } from '@/composables/types'

const NODES: TreeNode[] = [
  { id: 0, val: 4, left: 1, right: 6 },
  { id: 1, val: 3, left: 2, right: 5 },
  { id: 2, val: 2, left: 3, right: 4 },
  { id: 3, val: 1, left: null, right: null },
  { id: 4, val: 0, left: null, right: null },
  { id: 5, val: 1, left: null, right: null },
  { id: 6, val: 2, left: 7, right: 8 },
  { id: 7, val: 1, left: null, right: null },
  { id: 8, val: 0, left: null, right: null },
]

function f(step: number, phase: string, message: string, highlights: Record<number, CellKind>): TreeFrame {
  return { step, phase, message, nodes: NODES, highlights }
}

export function generateRecursionTree(): TreeFrame[] {
  return [
    f(0, 'init',
      `fib(n) = fib(n-1) + fib(n-2), base cases fib(0)=0 and fib(1)=1. Each node shows the argument n. The tree branches at every call — watch how deep it goes for just fib(4).`,
      {}),
    f(1, 'compare',
      `fib(4) splits into fib(3) and fib(2). Both must be computed before fib(4) can return.`,
      { 0: 'active' }),
    f(2, 'compare',
      `Descend into fib(3). It too splits into fib(2) and fib(1).`,
      { 0: 'eliminated', 1: 'active' }),
    f(3, 'compare',
      `Descend into fib(2). Needs fib(1) and fib(0).`,
      { 0: 'eliminated', 1: 'eliminated', 2: 'active' }),
    f(4, 'update',
      `fib(1) = 1 — base case. Returns immediately.`,
      { 0: 'eliminated', 1: 'eliminated', 2: 'eliminated', 3: 'match' }),
    f(5, 'update',
      `fib(0) = 0 — base case. fib(2) = 1 + 0 = 1. Returns up the call stack.`,
      { 0: 'eliminated', 1: 'eliminated', 2: 'match', 3: 'match', 4: 'match' }),
    f(6, 'update',
      `fib(1) = 1. fib(3) = fib(2) + fib(1) = 1 + 1 = 2. Returns.`,
      { 0: 'eliminated', 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match' }),
    f(7, 'compare',
      `Back in fib(4): now compute fib(2) — the right subtree. We already computed fib(2) in the left subtree and threw the result away.`,
      { 0: 'active', 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match', 6: 'window' }),
    f(8, 'update',
      `fib(1) = 1, fib(0) = 0, fib(2) = 1 — recomputed from scratch. Nodes 7 and 8 are exact duplicates of nodes 3 and 4.`,
      { 0: 'active', 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match', 6: 'match', 7: 'match', 8: 'match' }),
    f(9, 'done',
      `fib(4) = fib(3) + fib(2) = 2 + 1 = 3. Total calls: 9 for just fib(4). For fib(n), naive recursion makes ~2ⁿ calls. Memoization caches fib(2) after the first call and cuts it to O(n).`,
      { 0: 'match', 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match', 6: 'match', 7: 'match', 8: 'match' }),
  ]
}
