import type { UnionFindFrame, CellKind } from '@/composables/types'

export function generateUnionFindOps(): UnionFindFrame[] {
  function frame(
    step: number, phase: string, message: string,
    parent: number[], active: number[],
  ): UnionFindFrame {
    const highlights: Record<number, CellKind> = {}
    active.forEach(id => { highlights[id] = 'active' })
    return { step, phase, message, n: 5, parent, highlights }
  }

  return [
    frame(0, 'init',
      `5 nodes, each its own component. parent[i] = i means every node is its own root. Union-Find tracks connected components as edges are added.`,
      [0, 1, 2, 3, 4], []),
    frame(1, 'update',
      `union(0, 1): find(0) = 0, find(1) = 1. Different roots — merge by setting parent[1] = 0. One component: {0, 1}.`,
      [0, 0, 2, 3, 4], [0, 1]),
    frame(2, 'update',
      `union(2, 3): find(2) = 2, find(3) = 3. Merge: parent[3] = 2. One component: {2, 3}.`,
      [0, 0, 2, 2, 4], [2, 3]),
    frame(3, 'update',
      `union(0, 2): find(0) = 0, find(2) = 2. Merge the two components: parent[2] = 0. Now {0, 1, 2, 3} are connected.`,
      [0, 0, 0, 2, 4], [0, 2]),
    frame(4, 'compare',
      `find(3): follow parent pointers — 3 → 2 → 0. Root = 0. Path compression: set parent[3] = 0 directly. Future finds for node 3 are now O(1).`,
      [0, 0, 0, 0, 4], [3]),
    frame(5, 'done',
      `Two components: {0,1,2,3} rooted at 0, and {4}. With path compression and union by rank, each operation runs in O(α(n)) — the inverse Ackermann function, essentially constant for any realistic n.`,
      [0, 0, 0, 0, 4], []),
  ]
}
