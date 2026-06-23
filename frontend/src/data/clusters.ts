export interface ClusterConcept {
  id: string
  label: string
  isNew?: boolean
}

export interface Cluster {
  id: string
  label: string
  color: string
  primitive: string
  primitiveExplainer: string
  why: string
  concepts: ClusterConcept[]
  transferHooks: { text: string; targetId: string }[]
  position: { cx: number; cy: number }
}

export interface ClusterEdge {
  from: string
  to: string
  shared: string
  type: 'prerequisite' | 'transfer'
}

// SVG canvas: viewBox="0 0 720 480"
export const CLUSTERS: Cluster[] = [
  {
    id: 'linear',
    label: 'Linear',
    color: '#4a7cf7',
    primitive: 'Contiguous indexing',
    primitiveExplainer: 'Any position is reachable in O(1) — no traversal, just arithmetic.',
    why: `Arrays, strings, two pointers, sliding window, and prefix sums all share the same ground truth: the data sits in a line and you can point to any position instantly. Two pointers are just two indices moving through that line under different rules. A sliding window is a range of consecutive indices that shifts. Prefix sums turn repeated range queries into O(1) lookups by pre-computing cumulative totals. None of these are separate techniques — they're all ways of exploiting the fact that adjacent elements are literally adjacent in memory. Once you see arrays this way, the patterns stop being tricks to memorize and start being the natural shapes the problems take.`,
    concepts: [
      { id: 'linear-intro', label: 'Intro to Linear' },
      { id: 'arrays', label: 'Arrays' },
      { id: 'python-lists', label: 'Lists (Python)' },
      { id: 'strings', label: 'Strings' },
      { id: 'two-pointers', label: 'Two Pointers' },
      { id: 'sliding-window', label: 'Sliding Window' },
      { id: 'prefix-sums', label: 'Prefix Sums' },
      { id: 'stacks-queues', label: 'Stacks & Queues' },
      { id: 'monotonic-stack', label: 'Monotonic Stack' },
    ],
    transferHooks: [
      { text: 'The call stack is itself a linear structure. When you draw a recursion tree, each frame is one node in that tree.', targetId: 'recursive' },
      { text: 'Stack/queue logic drives BFS — the queue IS the frontier, a linear sequence of the next nodes to visit.', targetId: 'graph' },
    ],
    position: { cx: 140, cy: 80 },
  },
  {
    id: 'linked',
    label: 'Linked',
    color: '#7c3aed',
    primitive: 'The pointer',
    primitiveExplainer: 'Each node knows only where the next one lives — no random access.',
    why: `Linked lists, fast/slow pointers, and reversal patterns share one structural fact: you can only navigate by following pointers — you can never jump to position n, you have to walk there. This limitation is also the freedom: nodes can be scattered anywhere in memory and rearranged without copying data. Fast/slow pointers emerge directly from this — two walkers on the same chain at different speeds, guaranteed to collide if the chain loops. Reversal is just rewiring which direction the pointers face, without touching the values. Everything here is pointer manipulation; the "trick" is only choosing which pointers to redirect and when.`,
    concepts: [
      { id: 'linked-intro', label: 'Intro to Linked' },
      { id: 'linked-lists', label: 'Linked Lists' },
      { id: 'fast-slow', label: 'Fast & Slow Pointers' },
      { id: 'list-reversal', label: 'Reversal Patterns' },
    ],
    transferHooks: [
      { text: 'Tree nodes are linked list nodes with two next pointers instead of one. Pointer chasing is the same skill.', targetId: 'recursive' },
    ],
    position: { cx: 470, cy: 80 },
  },
  {
    id: 'lookup',
    label: 'Lookup',
    color: '#d97706',
    primitive: 'The hash function',
    primitiveExplainer: 'Transform a key into a direct position — O(1) lookup, no search needed.',
    why: `Hash maps, hash sets, frequency counting, and complement-finding problems all pivot on the same operation: trading memory for instant lookup. A hash map turns "does this value exist?" from O(n) into O(1) — you no longer search, you address. Frequency counting uses that map to tally occurrences in one pass. Two-sum and most "find a complement" problems are hash map problems in disguise: store what you've seen, check if the missing piece already exists. Interval problems belong here when the insight is using a sorted structure or hash set to efficiently detect overlaps. The pattern is always the same: precompute into a structure that makes future lookups trivial. Every time a problem asks "have we seen this before?" — that's the signal.`,
    concepts: [
      { id: 'lookup-intro', label: 'Intro to Lookup' },
      { id: 'hash-maps', label: 'Hash Maps & Sets' },
      { id: 'merge-intervals', label: 'Interval Problems' },
    ],
    transferHooks: [
      { text: 'Every DP cache is a hash map from subproblem arguments to their result. Memoization IS lookup, applied to function calls.', targetId: 'optimization' },
    ],
    position: { cx: 245, cy: 315 },
  },
  {
    id: 'sorted-search',
    label: 'Sorted Search',
    color: '#0891b2',
    primitive: 'Monotonicity',
    primitiveExplainer: 'If you can determine which half contains the answer, discard the other half forever.',
    why: `Binary search on sorted arrays and binary search on the answer space share one law: if you can determine whether the answer is in the left half or right half, you can discard the other half forever. Classic binary search applies this to a sorted array — compare the midpoint, eliminate half. The pattern generalizes: "binary search on the answer" applies whenever you can pose any candidate answer as a yes/no question with monotonic structure. "Is this window size valid?" "Can k workers finish in d days?" Binary search isn't about sorted arrays — it's about monotonicity. Once you see that, a whole class of optimization problems becomes a search problem in disguise.`,
    concepts: [
      { id: 'sorted-search-intro', label: 'Intro to Sorted Search' },
      { id: 'sorting', label: 'Sorting' },
      { id: 'binary-search', label: 'Binary Search' },
      { id: 'binary-search-answer', label: 'Search on Answer Space' },
    ],
    transferHooks: [
      { text: 'Divide & conquer recurrences in DP use the same "split in half" structure. Sorted search and optimization share a common ancestor.', targetId: 'optimization' },
    ],
    position: { cx: 80, cy: 225 },
  },
  {
    id: 'recursive',
    label: 'Recursive',
    color: '#16a34a',
    primitive: 'The call stack',
    primitiveExplainer: 'Make a choice, go deeper, unwind — then try something else.',
    why: `Trees, DFS, backtracking, and divide & conquer all share the same mechanical heartbeat: push current state, make a choice, go deeper, pop and try something else. A binary tree is this structure materialized in data — each node is a decision point with two recursive paths. DFS walks that structure explicitly. Backtracking is DFS with a pruning step: when a partial path can't succeed, undo the last choice and try the next branch. Divide & conquer splits the problem into non-overlapping subproblems and merges results on the way back up. Same pattern, different directionality. Once you can feel the call stack unwind in your head, you can look at any of these problems and immediately see the shape of the recursion.`,
    concepts: [
      { id: 'recursive-intro', label: 'Intro to Recursive' },
      { id: 'recursion', label: 'Recursion' },
      { id: 'trees', label: 'Trees' },
      { id: 'bfs-dfs', label: 'BFS & DFS' },
      { id: 'backtracking', label: 'Backtracking' },
      { id: 'greedy', label: 'Greedy' },
    ],
    transferHooks: [
      { text: 'DFS on a graph is the same DFS from trees — same call stack, now with a visited set to handle cycles.', targetId: 'graph' },
      { text: 'Recursion + memoization = DP. The cache is a hash map of subproblem results. Recursive Structures and Optimization are the same structure, viewed differently.', targetId: 'optimization' },
    ],
    position: { cx: 590, cy: 185 },
  },
  {
    id: 'graph',
    label: 'Graph',
    color: '#ea580c',
    primitive: 'The adjacency relationship',
    primitiveExplainer: 'Any node can connect to any other — structure emerges from relationships.',
    why: `Graphs, BFS/DFS on graphs, topological sort, and union-find all answer variants of one question: which things are connected, and in what way? Adjacency lists and matrices are two ways to record those connections. BFS finds shortest paths when edges are unweighted — it's the same queue logic from tree level-order traversal, now on a general graph. Topological sort asks "in what order must we process these?" — which is a graph question the moment you see that tasks have dependencies. Union-find asks "are these two nodes in the same connected component?" without traversing the graph at all. Four techniques, one underlying question about reachability.`,
    concepts: [
      { id: 'graph-intro', label: 'Intro to Graph' },
      { id: 'graphs', label: 'Graphs' },
      { id: 'topological-sort', label: 'Topological Sort' },
      { id: 'union-find', label: 'Union-Find' },
    ],
    transferHooks: [
      { text: "Dijkstra's algorithm is BFS where the queue becomes a priority queue. If you know BFS and heaps, you already know Dijkstra.", targetId: 'ordered' },
    ],
    position: { cx: 420, cy: 325 },
  },
  {
    id: 'ordered',
    label: 'Ordered',
    color: '#db2777',
    primitive: 'Partial order',
    primitiveExplainer: 'Always know the most extreme element — never need everything sorted.',
    why: `Heaps, priority queues, and top-K patterns all exploit the same insight: you rarely need everything sorted — you just need the best thing right now. A min-heap maintains just enough order (parent ≤ children) to deliver the minimum in O(1) and replace it in O(log n). Top-K problems don't require sorting all n elements — a heap of size K does it in O(n log K). The unifying principle is deferred commitment: don't sort what you don't need to sort. The moment a problem asks "keep track of the K largest" or "always process the most urgent task next," a heap is the natural answer.`,
    concepts: [
      { id: 'ordered-intro', label: 'Intro to Ordered' },
      { id: 'heaps', label: 'Heaps & Priority Queues' },
      { id: 'top-k', label: 'Top-K Patterns' },
    ],
    transferHooks: [
      { text: "A heap is a tree with one invariant: parent ≤ children. You've already seen trees — this is a constrained version of the same structure.", targetId: 'recursive' },
    ],
    position: { cx: 615, cy: 390 },
  },
  {
    id: 'optimization',
    label: 'Optimization',
    color: '#9333ea',
    primitive: 'Overlapping subproblems',
    primitiveExplainer: 'Identical smaller problems appear inside larger ones — compute once, reuse.',
    why: `All DP problems share one structural property: the optimal solution to a larger problem is built from optimal solutions to smaller problems, and those smaller problems appear repeatedly. The progression from 1D → 2D → interval → knapsack is a progression in the shape of the subproblem space, not a change in the core idea. 1D DP computes a value for each position. 2D DP adds a second dimension of state. Interval DP asks "for every subarray of length L." Knapsack adds a capacity constraint. The technique — define the state, write the recurrence, fill the table — stays constant. What changes is how many dimensions of state the problem forces you to track.`,
    concepts: [
      { id: 'optimization-intro', label: 'Intro to Optimization' },
      { id: 'dynamic-programming', label: 'Dynamic Programming' },
      { id: 'dp-2d', label: '2D DP' },
      { id: 'dp-intervals', label: 'Interval DP' },
      { id: 'dp-knapsack', label: 'Knapsack Variants' },
    ],
    transferHooks: [
      { text: 'Memoized recursion IS DP — the recursive structure from Recursive is identical, the cache makes it efficient.', targetId: 'recursive' },
      { text: 'The DP cache is a hash map. Lookup and Optimization are the same idea from different angles.', targetId: 'lookup' },
    ],
    position: { cx: 375, cy: 430 },
  },
]

export const CLUSTER_EDGES: ClusterEdge[] = [
  { from: 'linear',        to: 'linked',        shared: 'memory model',              type: 'prerequisite' },
  { from: 'linear',        to: 'sorted-search', shared: 'indexed array',             type: 'prerequisite' },
  { from: 'linear',        to: 'lookup',        shared: 'array as hash basis',       type: 'transfer'     },
  { from: 'linked',        to: 'recursive',     shared: 'pointer chasing',           type: 'prerequisite' },
  { from: 'recursive',     to: 'graph',         shared: 'DFS traversal',             type: 'prerequisite' },
  { from: 'recursive',     to: 'optimization',  shared: 'memoized recursion',        type: 'prerequisite' },
  { from: 'sorted-search', to: 'optimization',  shared: 'divide & conquer',          type: 'transfer'     },
  { from: 'lookup',        to: 'optimization',  shared: 'memoization = hash map',    type: 'transfer'     },
  { from: 'graph',         to: 'ordered',       shared: 'BFS + priority = Dijkstra', type: 'transfer'     },
]

export function clusterForSection(sectionId: string): Cluster | undefined {
  return CLUSTERS.find(c => c.concepts.some(concept => concept.id === sectionId))
}
