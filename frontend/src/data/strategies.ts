export type ComplexityClass =
  | 'O(1)'
  | 'O(log n)'
  | 'O(√n)'
  | 'O(n)'
  | 'O(n log n)'
  | 'O(n²)'
  | 'O(n³)'
  | 'O(2ⁿ)'
  | 'O(n!)'
  | 'O(V + E)'
  | 'O(n · m)'
  | 'O(n · target)'

export const COMPLEXITY_CLASSES: ComplexityClass[] = [
  'O(1)',
  'O(log n)',
  'O(√n)',
  'O(n)',
  'O(n log n)',
  'O(n²)',
  'O(n³)',
  'O(2ⁿ)',
  'O(n!)',
  'O(V + E)',
  'O(n · m)',
  'O(n · target)',
]

export interface Strategy {
  id: string
  name: string
  description: string
  typicalComplexity: string
}

export const STRATEGIES: Strategy[] = [
  {
    id: 'nested_loops',
    name: 'Nested loops',
    description:
      'Enumerate all pairs, triples, or k-tuples by nesting iteration. The outer loop fixes one element; inner loops scan the rest. Simple to reason about but costs O(nᵏ) time — acceptable only when n is tiny (≤ a few hundred) or when no structure exists to exploit.',
    typicalComplexity: 'O(n²) time, O(1) space',
  },
  {
    id: 'hash_set',
    name: 'Hash set',
    description:
      'Store elements in a hash set to answer membership queries in O(1) average time. Useful when you only need to know "have I seen this value before?" without caring about counts or positions. Costs O(n) extra space.',
    typicalComplexity: 'O(n) time, O(n) space',
  },
  {
    id: 'hash_map',
    name: 'Hash map',
    description:
      'Map values to associated metadata (index, count, first occurrence) using a hash table. Every lookup and insert is O(1) average, enabling single-pass solutions that would otherwise require O(n) inner scans. The go-to structure when you need to correlate two pieces of information about each element.',
    typicalComplexity: 'O(n) time, O(n) space',
  },
  {
    id: 'sort_then_scan',
    name: 'Sort then scan',
    description:
      'Sort the input to impose order, then use a single linear pass (or binary search) to find the answer. Sorting costs O(n log n) and enables techniques like two-pointer collision or deduplication that require adjacent duplicates or a monotone ordering. Destroys original indices — inapplicable when positions must be preserved.',
    typicalComplexity: 'O(n log n) time, O(log n) space',
  },
  {
    id: 'two_pointers',
    name: 'Two pointers',
    description:
      'Maintain two index variables that move through the array (or string) in opposite directions or at different speeds. On a sorted array, one pointer advances when the current value is too small and the other retreats when it is too large, collapsing an O(n²) search to O(n). Also covers the fast/slow pointer variant for cycle detection in linked lists.',
    typicalComplexity: 'O(n) time, O(1) space',
  },
  {
    id: 'sliding_window',
    name: 'Sliding window',
    description:
      'Maintain a variable-width or fixed-width window over a contiguous subarray. Expand the right edge to include new elements; contract the left edge when a constraint is violated. Because each element is added and removed at most once, the amortized cost per element is O(1), giving O(n) overall. Best suited for contiguous-subarray problems with a monotone feasibility condition.',
    typicalComplexity: 'O(n) time, O(1) or O(k) space',
  },
  {
    id: 'binary_search',
    name: 'Binary search',
    description:
      'Repeatedly halve a sorted search space. The invariant is a predicate that is false for the left half and true for the right half (or vice versa); each step eliminates half the remaining candidates in O(log n). Applies directly to sorted arrays and also to "binary search on the answer" — any problem where you can phrase the decision as a monotone predicate over a numeric range.',
    typicalComplexity: 'O(log n) time, O(1) space',
  },
  {
    id: 'binary_search_per_element',
    name: 'Binary search per element',
    description:
      'For each element in the input, run a binary search to find a related value. Requires the structure being searched to be sorted or implicitly ordered. Produces O(n log n) overall — better than nested loops when n is large but worse than a hash-based single pass when exact O(n) is needed.',
    typicalComplexity: 'O(n log n) time, O(1) or O(n) space',
  },
  {
    id: 'monotonic_stack',
    name: 'Monotonic stack',
    description:
      'Maintain a stack whose elements are strictly increasing or strictly decreasing. When a new element would violate the monotone property, pop until the property is restored — the popped element\'s "next greater/smaller" context is resolved at that moment. Produces O(n) total time because each element is pushed and popped at most once. Applies to "next greater element," histogram area, and span problems.',
    typicalComplexity: 'O(n) time, O(n) space',
  },
  {
    id: 'heap',
    name: 'Heap (priority queue)',
    description:
      'A heap gives O(log n) insert and O(log n) extract-min/max, enabling efficient k-th element queries and ordered merges. A min-heap always surfaces the current smallest element without a full sort. Use a max-heap of size k to track the k smallest elements, or merge k sorted lists in O(n log k) rather than O(n log n).',
    typicalComplexity: 'O(n log k) time, O(k) space',
  },
  {
    id: 'prefix_sums',
    name: 'Prefix sums',
    description:
      'Precompute a prefix-sum (or prefix-product) array so any subarray sum can be answered in O(1): sum(i, j) = prefix[j+1] − prefix[i]. Building the prefix array costs O(n); each subsequent query is O(1). Combine with a hash map to find subarrays with a target sum in O(n).',
    typicalComplexity: 'O(n) time, O(n) space',
  },
  {
    id: 'bfs',
    name: 'Breadth-first search (BFS)',
    description:
      'Explore a graph or grid level by level using a queue. BFS guarantees the shortest path in an unweighted graph because it visits all nodes at distance d before any node at distance d+1. Also used for multi-source propagation (e.g., rotting oranges, walls and gates) by seeding the queue with all sources simultaneously.',
    typicalComplexity: 'O(V + E) time, O(V) space',
  },
  {
    id: 'dfs',
    name: 'Depth-first search (DFS)',
    description:
      'Explore as deep as possible along each branch before backtracking. DFS naturally handles tree/graph traversal, cycle detection (via coloring), topological sort, and connected-component labeling. Recursive DFS uses the call stack implicitly; iterative DFS uses an explicit stack. Does not guarantee shortest paths in unweighted graphs.',
    typicalComplexity: 'O(V + E) time, O(V) space',
  },
  {
    id: 'dp_memoization',
    name: 'Dynamic programming — memoization',
    description:
      'Solve a problem recursively and cache the result of each unique subproblem to avoid redundant recomputation. The recursion tree makes overlapping subproblems explicit; the memo table converts exponential recursion to polynomial time. Easier to write than tabulation for problems where the subproblem dependency order is non-obvious.',
    typicalComplexity: 'O(states) time and space',
  },
  {
    id: 'dp_tabulation',
    name: 'Dynamic programming — tabulation',
    description:
      'Build a DP table bottom-up, filling smaller subproblems first so each entry is available when needed. Avoids recursion overhead and can often be space-optimized to O(1) or O(n) by discarding rows no longer needed. Preferred when the subproblem ordering is clear and stack depth would be a concern.',
    typicalComplexity: 'O(states) time, O(states) or reduced space',
  },
  {
    id: 'greedy',
    name: 'Greedy',
    description:
      'Make the locally optimal choice at each step and never reconsider. Greedy algorithms run in O(n) or O(n log n) but are only correct when the problem has the greedy-choice property — local optimality leads to global optimality. Common in interval scheduling, activity selection, and coin change with canonical denominations. Proving correctness requires an exchange argument.',
    typicalComplexity: 'O(n) or O(n log n) time, O(1) or O(n) space',
  },
  {
    id: 'counting_sort',
    name: 'Counting / bucket sort',
    description:
      'When the value range is bounded (e.g., values 0–k), tally occurrences in a count array and reconstruct the sorted output in O(n + k). Breaks the O(n log n) comparison-sort lower bound at the cost of O(k) space. Also useful for frequency-based problems: bucket by count and iterate buckets in order.',
    typicalComplexity: 'O(n + k) time, O(k) space',
  },
  {
    id: 'bit_manipulation',
    name: 'Bit manipulation',
    description:
      'Use bitwise operators (AND, OR, XOR, shifts) to exploit the binary representation of integers. XOR of a number with itself is 0; XOR is commutative and associative — useful for finding the single non-paired element in O(n) time and O(1) space. Bit counting, masking, and in-place swaps are other common patterns. Only applicable when the problem involves integers and their binary structure.',
    typicalComplexity: 'O(n) time, O(1) space',
  },
  {
    id: 'union_find',
    name: 'Union-Find (disjoint set union)',
    description:
      'Maintain a forest of disjoint sets. Two operations: find (which set does this element belong to?) and union (merge two sets). With path compression and union by rank, both run in near-O(1) amortized time. Ideal for dynamic connectivity queries: detecting cycles, counting components, and Kruskal\'s MST algorithm.',
    typicalComplexity: 'O(α(n)) per operation, O(n) space',
  },
  {
    id: 'backtracking',
    name: 'Backtracking',
    description:
      'Build a solution incrementally and abandon ("backtrack") a partial solution as soon as it violates a constraint, pruning the search tree. Used for combinatorial problems (permutations, subsets, N-queens, Sudoku) where the full search space is exponential but pruning makes it practical. Time complexity depends on the branching factor and pruning effectiveness.',
    typicalComplexity: 'O(bᵈ) time, O(d) space (b = branching factor, d = depth)',
  },
]

export const STRATEGY_MAP = new Map(STRATEGIES.map(s => [s.id, s]))

export type StrategyId = typeof STRATEGIES[number]['id']
