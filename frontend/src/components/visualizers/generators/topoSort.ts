import type { GraphFrame, GraphNode, GraphEdge, CellKind } from '@/composables/types'

// Edges: 0→2, 0→1, 2→4, 2→3, 1→3, 3→5.
// In-degrees: 0:0, 1:1, 2:1, 3:2, 4:1, 5:1. Topo order: 0, 2, 1, 4, 3, 5.
const NODES: GraphNode[] = [
  { id: 0, label: '0', x: 0.10, y: 0.30 },
  { id: 1, label: '1', x: 0.10, y: 0.70 },
  { id: 2, label: '2', x: 0.42, y: 0.30 },
  { id: 3, label: '3', x: 0.42, y: 0.70 },
  { id: 4, label: '4', x: 0.78, y: 0.30 },
  { id: 5, label: '5', x: 0.78, y: 0.70 },
]
const EDGES: GraphEdge[] = [
  { from: 0, to: 2 }, { from: 0, to: 1 },
  { from: 2, to: 4 }, { from: 2, to: 3 },
  { from: 1, to: 3 }, { from: 3, to: 5 },
]

function f(step: number, phase: string, message: string, nodeHL: Record<number, CellKind>): GraphFrame {
  return { step, phase, message, nodes: NODES, edges: EDGES, directed: true, nodeHL, edgeHL: {} }
}

export function generateTopoSort(): GraphFrame[] {
  return [
    f(0, 'init',
      `Topological sort: order a DAG so every edge points left to right. Kahn's algorithm removes in-degree-0 nodes one by one. In-degrees: 0:0, 1:1, 2:1, 3:2, 4:1, 5:1.`,
      {}),
    f(1, 'compare',
      `Node 0 has in-degree 0 — remove it. Decrement in-degrees of 0's successors: in[2] → 0, in[1] → 0. Queue: [2, 1].`,
      { 0: 'active' }),
    f(2, 'compare',
      `Remove node 2. Decrement: in[4] → 0, in[3] → 1. Node 4 joins the queue. Queue: [1, 4].`,
      { 0: 'match', 2: 'active' }),
    f(3, 'compare',
      `Remove node 1. Decrement: in[3] → 0. Queue: [4, 3].`,
      { 0: 'match', 2: 'match', 1: 'active' }),
    f(4, 'compare',
      `Remove node 4. No successors. Queue: [3].`,
      { 0: 'match', 2: 'match', 1: 'match', 4: 'active' }),
    f(5, 'compare',
      `Remove node 3. Decrement: in[5] → 0. Queue: [5].`,
      { 0: 'match', 2: 'match', 1: 'match', 4: 'match', 3: 'active' }),
    f(6, 'done',
      `Remove node 5. Done. Order: 0→2→1→4→3→5. Every edge in the original DAG points forward in this sequence. If any cycle existed, at least one node's in-degree would never reach 0 — detecting a partial result catches cycles.`,
      { 0: 'match', 1: 'match', 2: 'match', 3: 'match', 4: 'match', 5: 'match' }),
  ]
}
