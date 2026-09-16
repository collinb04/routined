export default {
  id: 'number-of-connected-components',
  title: 'Number of Connected Components',
  difficulty: 'medium',
  description: `<p>You have a graph of <code>n</code> nodes labeled from <code>0</code> to <code>n - 1</code>. You are given an integer <code>n</code> and a list of edges where <code>edges[i] = [ai, bi]</code> indicates there is an edge between nodes <code>ai</code> and <code>bi</code> in the undirected graph. Return the number of connected components in the graph.</p>`,
  examples: [
    { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', output: '2' },
    { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]', output: '1' },
  ],
  constraints: ['1 <= n <= 2000', '1 <= edges.length <= 5000', 'No repeated edges'],
  starterCode: `class Solution:
    def count_components(self, n, edges):
        pass`,
  runnerSetup: 'count_components = Solution().count_components',
  functionName: 'count_components',
  conceptId: 'graphs',
  testCases: [
    { label: '2 components', args: [5, [[0,1],[1,2],[3,4]]], expected: 2 },
    { label: '1 component', args: [5, [[0,1],[1,2],[2,3],[3,4]]], expected: 1 },
  ],
  bruteHint: 'A brute-force approach would test reachability between every pair of nodes to decide which ones belong together in a component, comparing all n² pairs. This costs O(n²) time (or worse, factoring in edge traversal per pair), which grows quickly as n approaches 2000. What if you instead visited each node once and grouped everything reachable from it in a single pass?',
  optimizeComplexity: { time: 'O(V + E)', space: 'O(V)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraint bounds tell you upfront which time complexities are realistic before you commit to an approach. n ≤ 2000 nodes and edges.length ≤ 5000. What does this say about traversal cost?',
      highlight: { location: 'constraint', text: '1 <= n <= 2000' },
      options: [
        { label: 'O(n²) is too slow', isCorrect: false, feedback: 'At n = 2000, O(n²) is only 4 million operations — perfectly fast. The constraint does not rule out quadratic approaches, though O(n + e) is the natural fit.' },
        { label: 'O(n + e) traversal over all nodes and edges is fine', isCorrect: true },
        { label: 'Only O(log n) approaches are fast enough', isCorrect: false, feedback: 'You cannot even read all n nodes in O(log n) time. The constraint is small — n ≤ 2000 and edges ≤ 5000 — so a full graph traversal is trivial.' },
        { label: 'Input size does not affect the approach', isCorrect: false, feedback: 'Input size always informs your choice. n ≤ 2000 and edges ≤ 5000 tell you that visiting every node and edge once is affordable, which shapes whether BFS, DFS, or Union-Find makes sense.' },
      ],
      correctFeedback: 'With n ≤ 2000 and edges ≤ 5000, visiting every node and every edge once is at most 7000 operations — instant. Any of BFS, DFS, or Union-Find works here.',
      wrongFeedback: [
        'What is the total work in visiting every node and every edge exactly once? Is 2000 + 5000 operations expensive?',
        'O(n + e) at n = 2000 and e = 5000 is 7000 operations. Does the constraint rule that out?',
      ],
    },
    {
      id: 'undirected-graph',
      question: 'How a graph\'s edges are described determines whether you need to store connections in one direction or both. The edges are undirected — [a, b] connects both a → b and b → a. How should you build the adjacency list?',
      highlight: { location: 'description', text: 'a list of edges where <code>edges[i] = [ai, bi]</code> indicates there is an edge between nodes <code>ai</code> and <code>bi</code> in the undirected graph.' },
      options: [
        { label: 'Add each edge in one direction only', isCorrect: false, feedback: 'Storing only a → b would prevent traversal from b to a. Undirected edges must be stored in both directions so you can reach either endpoint from the other during traversal.' },
        { label: 'Add both directions for every edge', isCorrect: true },
        { label: 'Sort edges before building the list', isCorrect: false, feedback: 'Sorting does not affect undirected adjacency list construction. The key is storing a → b and b → a for each edge, regardless of order.' },
        { label: 'Store a full n × n table of every possible pair instead', isCorrect: false, feedback: 'An adjacency matrix works but uses O(n²) space — up to 4 million entries at n = 2000. An adjacency list uses O(n + e) space and is the standard choice here.' },
      ],
      correctFeedback: 'For each edge [a, b], add b to a\'s list and a to b\'s list. This ensures traversal can move in either direction across every edge.',
      wrongFeedback: [
        'If you only store a → b, can your traversal start at b and reach a?',
        'Undirected means travel in either direction. How many adjacency list entries does one undirected edge create?',
      ],
    },
    {
      id: 'output-count',
      question: 'The exact quantity a problem asks you to return often points to the traversal pattern needed to produce it. The output is the number of connected components. What traversal pattern produces this count?',
      highlight: { location: 'description', text: 'Return the number of connected components in the graph.' },
      options: [
        { label: 'Count the total number of edges', isCorrect: false, feedback: 'Edge count tells you graph density, not the number of components. Two graphs with the same number of edges can have very different component counts.' },
        { label: 'Start a new traversal for each unvisited node; count starts', isCorrect: true },
        { label: 'Count nodes with degree 0', isCorrect: false, feedback: 'Only isolated nodes have degree 0. Connected components can contain many nodes with positive degree. Counting only isolated nodes misses multi-node components entirely.' },
        { label: 'Count nodes visited in one traversal starting from node 0', isCorrect: false, feedback: 'A single BFS from node 0 only visits its own component. If the graph has multiple components, nodes in other components are never reached and never counted.' },
      ],
      correctFeedback: 'Iterate over all n nodes. For each unvisited node, start a BFS or DFS and mark everything reachable. Each new traversal start corresponds to one component — count those starts.',
      wrongFeedback: [
        'After one BFS, some nodes may still be unvisited. What does a second BFS starting from an unvisited node tell you?',
        'Each time you must start a new traversal to reach an unvisited node, what does that imply about the graph\'s structure?',
      ],
    },
    {
      id: 'isolated-nodes',
      question: 'Constraints sometimes hide edge cases you must special-case, not just performance limits. The constraint allows graphs with fewer edges than nodes. What must your solution handle?',
      highlight: { location: 'constraint', text: '1 <= edges.length <= 5000' },
      options: [
        { label: 'Nodes with no edges are not part of any component', isCorrect: false, feedback: 'An isolated node is itself a connected component of size 1. It must be counted — otherwise your component total will be too low.' },
        { label: 'Isolated nodes each count as their own component', isCorrect: true },
        { label: 'Skip nodes that appear in no edge', isCorrect: false, feedback: 'Skipping isolated nodes would undercount components. A node with degree 0 is a valid component — you must include it in your traversal pass.' },
        { label: 'All nodes appear in at least one edge', isCorrect: false, feedback: 'The constraint says "1 ≤ edges.length ≤ 5000" but n can be up to 2000. With n = 5 and edges = [[0,1]], nodes 2, 3, and 4 are isolated and form their own components.' },
      ],
      correctFeedback: 'An isolated node is a component of size 1. Your outer loop must cover all n nodes — not just those appearing in the edge list — so isolated nodes are counted.',
      wrongFeedback: [
        'If node 4 appears in no edges, how many connected components does it belong to?',
        'Your outer loop iterates over what — the edge list or all n node labels? Which one ensures isolated nodes are counted?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def count_components(self, n, edges):
        parent = list(range(n))
        count = [n]

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(x, y):
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry
                count[0] -= 1

        for u, v in edges:
            union(u, v)
        return count[0]`,
  solutionComplexity: { time: 'O(n + E)', space: 'O(n)' },
  solutionCaveat: 'The component count starts at <code>n</code> — every node is its own component before any edges are processed — rather than starting at 0 and trying to count merges some other way; this makes an isolated node with no edges at all correctly count as one full component with zero extra bookkeeping.',
  solutionExplanation: 'Union-find tracks disjoint groups directly: every successful union (joining two nodes that were not already in the same set) merges two components into one, so decrementing a running counter on every real merge always leaves that counter equal to the current number of distinct components. Starting the count at n and only decrementing when <code>find(x) != find(y)</code> is what correctly leaves isolated nodes counted as their own component, since they are never touched by any union.',
}
