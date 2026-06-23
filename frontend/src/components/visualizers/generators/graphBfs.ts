import type { GraphFrame, GraphNode, GraphEdge, CellKind } from '@/composables/types'

const NODES: GraphNode[] = [
  { id: 0, label: '0', x: 0.15, y: 0.20 },
  { id: 1, label: '1', x: 0.50, y: 0.20 },
  { id: 2, label: '2', x: 0.85, y: 0.20 },
  { id: 3, label: '3', x: 0.15, y: 0.60 },
  { id: 4, label: '4', x: 0.50, y: 0.60 },
  { id: 5, label: '5', x: 0.50, y: 0.90 },
]
const EDGES: GraphEdge[] = [
  { from: 0, to: 1 }, { from: 1, to: 2 },
  { from: 0, to: 3 }, { from: 1, to: 4 },
  { from: 3, to: 4 }, { from: 4, to: 5 },
]

function f(step: number, phase: string, message: string, nodeHL: Record<number, CellKind>): GraphFrame {
  return { step, phase, message, nodes: NODES, edges: EDGES, directed: false, nodeHL, edgeHL: {} }
}

export function generateGraphBfs(): GraphFrame[] {
  return [
    f(0, 'init',
      `BFS from node 0. Queue starts with [0]. Dequeue, visit, enqueue unvisited neighbors. Nodes are visited in order of their hop count from 0.`,
      {}),
    f(1, 'compare',
      `Visit 0. Neighbors 1 and 3 are unvisited — enqueue both. Queue: [1, 3].`,
      { 0: 'active' }),
    f(2, 'compare',
      `Dequeue 1, visit. Unvisited neighbors: 2, 4. Enqueue. Queue: [3, 2, 4].`,
      { 0: 'match', 1: 'active' }),
    f(3, 'compare',
      `Dequeue 3, visit. Neighbors: 0 (visited), 4 (queued). Nothing new. Queue: [2, 4].`,
      { 0: 'match', 1: 'match', 3: 'active' }),
    f(4, 'compare',
      `Dequeue 2, visit. Neighbor: 1 (visited). Queue: [4].`,
      { 0: 'match', 1: 'match', 3: 'match', 2: 'active' }),
    f(5, 'compare',
      `Dequeue 4, visit. Unvisited neighbor: 5. Enqueue. Queue: [5].`,
      { 0: 'match', 1: 'match', 3: 'match', 2: 'match', 4: 'active' }),
    f(6, 'done',
      `Dequeue 5, visit. No unvisited neighbors. Queue empty. Order: 0→1→3→2→4→5. Every node was reached via the shortest possible hop count from 0.`,
      { 0: 'match', 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match' }),
  ]
}
