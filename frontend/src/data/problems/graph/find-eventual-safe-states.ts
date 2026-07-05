export default {
  id: 'find-eventual-safe-states',
  title: 'Find Eventual Safe States',
  difficulty: 'medium',
  description: 'A node is safe if every path from it eventually leads to a terminal node (no outgoing edges). Return all safe nodes sorted in ascending order.',
  examples: [
    { input: 'graph = [[1,2],[2,3],[5],[0],[5],[],[]]', output: '[2,4,5,6]' },
  ],
  constraints: ['n == graph.length', '1 ≤ n ≤ 10⁴', '0 ≤ graph[i].length ≤ n'],
  starterCode: `def eventual_safe_nodes(graph):
  pass`,
  functionName: 'eventual_safe_nodes',
  conceptId: 'graphs',
  testCases: [
    { label: 'Standard', args: [[[1,2],[2,3],[5],[0],[5],[],[]]], expected: [2,4,5,6] },
    { label: 'No cycles', args: [[[1],[2],[]]], expected: [0,1,2] },
  ],
  clues: [
    {
      id: 'safe-definition',
      question: 'A node is safe if every path from it eventually leads to a terminal node. What makes a node unsafe?',
      options: [
        { label: 'It has more than one outgoing edge', isCorrect: false, feedback: 'Multiple outgoing edges are fine — node 4 in the example has one edge to 5 and is safe. Unsafe nodes are those with at least one path that loops forever, meaning they are on or lead into a cycle.' },
        { label: 'It lies on or leads into a cycle', isCorrect: true },
        { label: 'It is not reachable from node 0', isCorrect: false, feedback: 'Reachability from node 0 is not the criterion. Safety is about what paths leave from a node, not how you arrive at it. An isolated node with no outgoing edges is safe.' },
        { label: 'It has no outgoing edges', isCorrect: false, feedback: 'A node with no outgoing edges is a terminal — it is always safe by definition. The problem is asking which nodes eventually lead to terminals, not which ones have outgoing edges.' },
      ],
      correctFeedback: 'A node is unsafe if any path from it enters a cycle and never terminates. Safe nodes are exactly those whose entire reachable subgraph is acyclic — every path from them hits a terminal.',
      wrongFeedback: [
        'Terminal nodes are safe. What about a node that points to a terminal — is it safe? What about one that points into a cycle?',
        'If any path from a node loops forever, that node is unsafe. What graph structure causes a path to loop forever?',
      ],
    },
    {
      id: 'cycle-detection-approach',
      question: 'n ≤ 10⁴ nodes with up to n outgoing edges each. You need to classify every node. What approach works in O(n + E)?',
      options: [
        { label: 'Run separate DFS from every node to check for cycles', isCorrect: false, feedback: 'Running an independent DFS from each of n nodes costs O(n · (n + E)) — up to O(n³) when each node has n neighbors. Memoizing cycle status across DFS calls brings this down to O(n + E).' },
        { label: 'Single DFS with three-color cycle detection and memoized results', isCorrect: true },
        { label: 'Sort nodes by out-degree and process smallest first', isCorrect: false, feedback: 'Out-degree ordering doesn\'t determine safety — a node with one outgoing edge to a cycle is unsafe, while one with many edges all pointing to terminals is safe. You need path exploration, not degree sorting.' },
        { label: 'Union-Find over all edges to detect components', isCorrect: false, feedback: 'Union-Find merges components but doesn\'t track directionality or cycle membership in directed graphs. Directed cycle detection requires DFS with state tracking, not Union-Find.' },
      ],
      correctFeedback: 'Use DFS with three states: unvisited, in-progress (on the current path), and safe. Once a node is confirmed safe, cache that result — any future DFS that reaches it can immediately conclude its path is safe too.',
      wrongFeedback: [
        'If you\'ve already determined node X is safe, and a later DFS reaches X, do you need to explore X\'s subgraph again?',
        'Three-color DFS: white (unvisited), gray (in current DFS path), black (confirmed safe). What does hitting a gray node mean, and what does reaching a black node mean?',
      ],
    },
    {
      id: 'terminal-node-signal',
      question: '"A terminal node has no outgoing edges." What does graph[i] = [] tell you immediately?',
      options: [
        { label: 'Node i is isolated — it has no edges at all', isCorrect: false, feedback: 'graph[i] = [] means node i has no outgoing edges, but other nodes can still point to i. It is a terminal, not necessarily isolated. Other nodes leading to i can be safe because of i.' },
        { label: 'Node i is safe without any further checking', isCorrect: true },
        { label: 'Node i must be checked for incoming cycles', isCorrect: false, feedback: 'A terminal\'s safety is absolute — it has no outgoing paths at all, so no path from it can loop. You don\'t need to inspect incoming edges to confirm it is safe.' },
        { label: 'Node i cannot be part of the answer', isCorrect: false, feedback: 'Terminals are always safe and must appear in the output. In the example, nodes 5 and 6 are terminals (empty adjacency lists) and are included in [2,4,5,6].' },
      ],
      correctFeedback: 'A terminal node has no outgoing edges — no path from it can go anywhere, so it trivially leads to a "terminal." Mark it safe immediately and use it as a base case for safe propagation.',
      wrongFeedback: [
        'If graph[i] is empty, what happens when you try to follow any path starting from i? Can that path ever loop?',
        'Terminal nodes are the base cases of safety. If a node points only to terminals, is it safe? What about a node that points to nodes that point to terminals?',
      ],
    },
    {
      id: 'output-sorted',
      question: 'The output must be sorted in ascending order. What does this tell you about how to collect results?',
      options: [
        { label: 'Run DFS in sorted node order to build a sorted output naturally', isCorrect: false, feedback: 'DFS visit order doesn\'t determine when a node is confirmed safe — nodes deep in a DFS are confirmed before their ancestors. Collecting results during DFS and sorting afterward is cleaner.' },
        { label: 'Collect all safe nodes, then sort before returning', isCorrect: true },
        { label: 'Use a min-heap to insert nodes as they are confirmed safe', isCorrect: false, feedback: 'A min-heap would work but adds unnecessary complexity. With n ≤ 10⁴, collecting results in a list and calling sort() at the end is simpler and equally fast.' },
        { label: 'Iterate nodes 0 to n-1 and append only safe ones — naturally sorted', isCorrect: false, feedback: 'This actually works — iterating in order 0 to n-1 after all nodes are classified produces a sorted list without an explicit sort call. It\'s a valid optimization, but not the only option.' },
      ],
      correctFeedback: 'With n ≤ 10⁴, sorting the result list costs O(n log n) — negligible compared to the DFS. Either collect-then-sort or iterate in index order 0 to n-1 after classification; both produce a correctly sorted answer.',
      wrongFeedback: [
        'DFS doesn\'t visit nodes in index order — a post-order traversal can confirm node 7 safe before node 2. How do you guarantee the output is in ascending order?',
        'After your DFS classifies all nodes, how do you produce a sorted list of safe nodes? Is an extra sort step expensive at n ≤ 10⁴?',
      ],
    },
  ],
}
