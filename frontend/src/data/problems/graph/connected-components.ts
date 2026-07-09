export default {
  id: 'connected-components',
  title: 'Number of Connected Components',
  difficulty: 'medium',
  description: 'Given <code>n</code> nodes labeled 0 to n-1 and a list of undirected edges, return the number of connected components in the graph. Use Union-Find.',
  starterCode: `def count_components(n, edges):
  # Hint: initialize parent[i] = i, then union each edge, count unique roots
  pass`,
  examples: [
    { input: 'n=5, edges=[[0,1],[1,2],[3,4]]', output: '2' },
    { input: 'n=5, edges=[[0,1],[1,2],[2,3],[3,4]]', output: '1' },
  ],
  constraints: [
    '1 ≤ n ≤ 2000',
    '1 ≤ edges.length ≤ 5000',
    'No repeated edges, no self-loops',
  ],
  functionName: 'count_components',
  conceptId: 'union-find',
  testCases: [
    { label: 'Two components', args: [5, [[0,1],[1,2],[3,4]]], expected: 2 },
    { label: 'One component', args: [5, [[0,1],[1,2],[2,3],[3,4]]], expected: 1 },
    { label: 'No edges', args: [4, []], expected: 4 },
    { label: 'All isolated', args: [3, []], expected: 3 },
  ],
  bruteHint: 'Describe testing connectivity between every pair of nodes independently, and the complexity that results',
  optimizeHint: 'Name the structure that merges nodes into groups and lets you check group membership in near-constant time',
  clues: [
    {
      id: 'constraint-size',
      question: 'n ≤ 2000 nodes and up to 5000 edges. What complexity is acceptable?',
      options: [
        { label: 'O(n²) — 4 million ops, borderline', isCorrect: false, feedback: 'At n = 2000, O(n²) is 4 million operations — fast in practice, but the edge count only goes to 5000. An O(n + E) approach with Union-Find is both correct and clearly efficient.' },
        { label: 'O(n + E) with Union-Find is ideal', isCorrect: true },
        { label: 'O(n log n) sort-based approach required', isCorrect: false, feedback: 'Sorting edges doesn\'t help count components — it doesn\'t tell you which nodes are connected. Union-Find processes each edge in near-constant time without sorting.' },
        { label: 'Input is too large for DFS', isCorrect: false, feedback: 'DFS on 2000 nodes and 5000 edges runs in O(n + E) — completely fine. Both DFS and Union-Find are valid here; Union-Find is specified by the problem hint.' },
      ],
      correctFeedback: 'With n = 2000 and E = 5000, O(n + E) is roughly 7000 operations. Union-Find with path compression achieves near-linear time and handles this comfortably.',
      wrongFeedback: [
        'Process every node once and every edge once. What is that in terms of n and E?',
        'n + E ≈ 7000 here. What time complexity does processing each node and edge once represent?',
      ],
    },
    {
      id: 'no-edges-case',
      question: 'When edges is empty, the answer equals n. What does this tell you about initialization?',
      options: [
        { label: 'Start with component count = 0 and increment on each edge', isCorrect: false, feedback: 'Starting at 0 and incrementing on edges counts edges, not components. With no edges and n = 4, you\'d return 0, not 4. The base state is n isolated nodes — n components.' },
        { label: 'Start with component count = n, decrement when two roots merge', isCorrect: true },
        { label: 'Count nodes with degree 0 at the end', isCorrect: false, feedback: 'Degree-0 nodes are isolated, but counting them misses nodes that are part of components. The right approach tracks how many distinct root groups exist.' },
        { label: 'Run BFS from every node and count unique start nodes', isCorrect: false, feedback: 'BFS from every unvisited node works for DFS/BFS approaches. For Union-Find, the count is maintained incrementally — start at n and reduce when edges merge two separate groups.' },
      ],
      correctFeedback: 'Initialize components = n (every node is its own component). Each time a union merges two previously separate groups, decrement by 1. The final value is the answer.',
      wrongFeedback: [
        'With 4 nodes and no edges, there are 4 components. What should your initial component count be before processing any edges?',
        'Union-Find merges components. Each successful merge (two different roots) reduces the count by 1. What do you start counting from?',
      ],
    },
    {
      id: 'union-find-root',
      question: '"Count unique roots" — after processing all edges, how do you count components in a Union-Find structure?',
      options: [
        { label: 'Count nodes where parent[i] == i', isCorrect: true },
        { label: 'Count nodes where parent[i] != i', isCorrect: false, feedback: 'Nodes where parent[i] != i are non-root members of a component, not representatives. Roots are nodes that point to themselves — they are the canonical representative of each component.' },
        { label: 'Sum all parent array values', isCorrect: false, feedback: 'Summing parent values gives a meaningless integer. The structure you need is the count of self-referential entries: nodes that are their own parent.' },
        { label: 'Count nodes with exactly one neighbor', isCorrect: false, feedback: 'Neighbor count is an input graph property, not a Union-Find property. In Union-Find, the parent array tells you about group membership, not the original edge structure.' },
      ],
      correctFeedback: 'After all unions, each component has exactly one root where parent[root] == root. Counting those self-referential entries gives the number of components.',
      wrongFeedback: [
        'In Union-Find, every node points toward a root. What property does the root itself satisfy in the parent array?',
        'A root is a node that is its own parent: parent[i] == i. How many such nodes exist in a Union-Find with k components?',
      ],
    },
    {
      id: 'path-compression',
      question: 'Path compression in Union-Find flattens the tree during find(). Why does this matter here?',
      options: [
        { label: 'It reduces the number of components', isCorrect: false, feedback: 'Path compression doesn\'t change which nodes are grouped together — it only restructures the parent pointers to make future finds faster. Component count is unaffected.' },
        { label: 'It makes repeated find() calls near O(1) amortized', isCorrect: true },
        { label: 'It is required to detect cycles', isCorrect: false, feedback: 'Cycle detection in Union-Find comes from checking whether two nodes share the same root before union — path compression is a speed optimization, not a cycle-detection mechanism.' },
        { label: 'Without it, union() produces wrong results', isCorrect: false, feedback: 'Union() is correct regardless of path compression — it just checks roots and updates one. Path compression is purely a performance optimization that speeds up subsequent find() calls.' },
      ],
      correctFeedback: 'Without path compression, a chain of n unions creates a tree of depth n, making each find() O(n). With path compression, the amortized cost per operation drops to nearly O(1) — the standard Union-Find guarantee.',
      wrongFeedback: [
        'Consider n nodes unioned in a chain: 0→1→2→…→n-1. How deep is the tree, and how long does find(0) take without compression?',
        'Path compression makes the tree shallower after each find(). Over many operations, how does this affect the average cost per find()?',
      ],
    },
  ],
}
