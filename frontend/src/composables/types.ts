export type CellKind = 'default' | 'active' | 'match' | 'eliminated' | 'window'

export interface ArrayFrame {
  step: number
  message: string
  phase: 'init' | 'compare' | 'update' | 'done'
  array: number[]
  pointers: Record<string, number>
  highlights: CellKind[]
  windowRange: [number, number] | null
}

export interface StackFrame {
  step: number
  message: string
  phase: 'init' | 'compare' | 'update' | 'done'
  array: number[]
  currentIndex: number
  stack: number[]          // indices currently on the stack
  result: (number | null)[] // result[i] = next greater element for index i, null if not yet found
  poppingIndices: number[] // indices being popped this step (for highlight)
}

export interface TreeNode {
  id: number
  val: number
  left: number | null
  right: number | null
}

export interface TreeFrame {
  step: number
  message: string
  phase: 'init' | 'compare' | 'update' | 'done'
  nodes: TreeNode[]
  highlights: Record<number, CellKind>
}

export interface ListNode {
  id: number
  val: number
  next: number | null
}

export interface LinkedListFrame {
  step: number
  message: string
  phase: 'init' | 'compare' | 'update' | 'done'
  nodes: ListNode[]
  highlights: Record<number, CellKind>
}

export interface GraphNode {
  id: number
  label: string
  x: number  // 0–1 fraction of viewport width
  y: number  // 0–1 fraction of viewport height
}

export interface GraphEdge {
  from: number
  to: number
}

export interface GraphFrame {
  step: number
  message: string
  phase: 'init' | 'compare' | 'update' | 'done'
  nodes: GraphNode[]
  edges: GraphEdge[]
  directed: boolean
  nodeHL: Record<number, CellKind>
  edgeHL: Record<string, CellKind>  // key = `${from}-${to}`
}

export interface Interval {
  id: number
  start: number
  end: number
}

export interface IntervalFrame {
  step: number
  message: string
  phase: 'init' | 'compare' | 'update' | 'done'
  intervals: Interval[]
  highlights: Record<number, CellKind>
  merged: Interval[]
}

export interface UnionFindFrame {
  step: number
  message: string
  phase: 'init' | 'compare' | 'update' | 'done'
  n: number
  parent: number[]
  highlights: Record<number, CellKind>
}

export type Frame = ArrayFrame | StackFrame | TreeFrame | LinkedListFrame | GraphFrame | IntervalFrame | UnionFindFrame
