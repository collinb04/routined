import type { TreeFrame, TreeNode, CellKind } from '@/composables/types'

// fib(4) call tree — same shape on both runs. Node 6 (fib(2), right subtree)
// duplicates the work already done at node 2 (fib(2), left subtree).
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

function f(step: number, phase: TreeFrame['phase'], message: string, highlights: Record<number, CellKind>): TreeFrame {
  return { step, phase, message, nodes: NODES, highlights }
}

export function generateRecursionMemoBridge(): TreeFrame[] {
  return [
    f(0, 'init',
      `Naive recursion for fib(4), no cache. Watch node 6 — it's fib(2), and the left subtree (node 2) already computes fib(2).`,
      {}),
    f(1, 'compare',
      `Descend the left subtree first: fib(3) → fib(2) → fib(1), fib(0) — all computed fresh, top to bottom.`,
      { 0: 'active', 1: 'active', 2: 'active', 3: 'active', 4: 'active' }),
    f(2, 'update',
      `Left subtree resolves: fib(3) = 2. Now fib(4) needs its right child, node 6 — also fib(2).`,
      { 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match', 6: 'eliminated', 7: 'eliminated', 8: 'eliminated' }),
    f(3, 'compare',
      `Naive: node 6 is a brand-new call with no memory of node 2. It recurses into fib(1) and fib(0) all over again — nodes 7 and 8 are exact duplicates of nodes 3 and 4.`,
      { 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match', 6: 'active', 7: 'active', 8: 'active' }),
    f(4, 'done',
      `Naive total: 9 calls for fib(4) — and it gets exponentially worse from here. fib(30) makes well over a million calls the same way.`,
      { 0: 'match', 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match', 6: 'match', 7: 'match', 8: 'match' }),
    f(5, 'init',
      `Now add one line: @lru_cache above the same recursive function. Identical recursive structure — but every call is checked against a cache before it recurses.`,
      {}),
    f(6, 'compare',
      `The left subtree runs exactly as before — these are first-time calls, so each result gets cached as it returns: fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2.`,
      { 0: 'active', 1: 'active', 2: 'active', 3: 'active', 4: 'active' }),
    f(7, 'update',
      `Left subtree done and cached. fib(4) now asks for node 6 — also fib(2).`,
      { 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match', 6: 'eliminated', 7: 'eliminated', 8: 'eliminated' }),
    f(8, 'done',
      `Cache hit — fib(2) is already stored from node 2. Node 6 returns instantly; nodes 7 and 8 never execute at all. Memoized total: 6 calls instead of 9, and the gap widens fast — O(n) instead of O(2ⁿ).`,
      { 0: 'match', 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match', 6: 'window', 7: 'eliminated', 8: 'eliminated' }),
  ]
}
