export default {
  id: 'graph-valid-tree',
  title: 'Graph Valid Tree',
  difficulty: 'medium',
  description: `<p>You have a graph of <code>n</code> nodes labeled from <code>0</code> to <code>n - 1</code>. You are given an integer <code>n</code> and a list of undirected edges. Check if the edges make up a valid tree. A valid tree has exactly <code>n-1</code> edges and is fully connected with no cycles.</p>`,
  examples: [
    { input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', output: 'true' },
    { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', output: 'false' },
  ],
  constraints: ['1 <= n <= 2000', '0 <= edges.length <= 5000', 'No self-loops or repeated edges'],
  starterCode: `def valid_tree(n, edges):
  pass`,
  functionName: 'valid_tree',
  conceptId: 'graphs',
  testCases: [
    { label: 'valid tree', args: [5, [[0,1],[0,2],[0,3],[1,4]]], expected: true },
    { label: 'has cycle', args: [5, [[0,1],[1,2],[2,3],[1,3],[1,4]]], expected: false },
  ],
  bruteHint: 'Describe testing connectivity by checking reachability between every pair of nodes, and its time complexity',
  optimizeHint: 'Name the technique that combines an edge-count check with Union-Find to detect cycles in a single pass',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 2000 and edges.length ≤ 5000. What does this tell you about acceptable complexity?',
      options: [
        { label: 'O(n²) is too slow', isCorrect: false, feedback: 'At n = 2000, O(n²) is 4 million operations — well within reach. The constraint here is generous; it does not rule out quadratic approaches.' },
        { label: 'O(n log n) is required', isCorrect: false, feedback: 'Nothing about n = 2000 demands log-factor efficiency. The bound is permissive enough for linear or near-linear work on both nodes and edges.' },
        { label: 'O(n + e) linear traversal is fine', isCorrect: true },
        { label: 'Input size is irrelevant', isCorrect: false, feedback: 'Input size always informs your approach. With n up to 2000 and edges up to 5000, you need to process both — that shapes which data structures make sense.' },
      ],
      correctFeedback: 'With n ≤ 2000 and edges ≤ 5000, even O(n + e) graph traversal finishes instantly. The constraint permits DFS, BFS, or Union-Find with no performance concern.',
      wrongFeedback: [
        'Think about what 2000 nodes and 5000 edges actually cost to traverse once. Is that expensive?',
        'A single pass over all nodes and edges is O(n + e). At these sizes, is that affordable?',
      ],
    },
    {
      id: 'tree-definition',
      question: 'A valid tree has "exactly n-1 edges and is fully connected with no cycles." What two conditions must both hold?',
      options: [
        { label: 'Connected and acyclic', isCorrect: true },
        { label: 'Acyclic with n edges', isCorrect: false, feedback: 'A tree on n nodes has exactly n-1 edges — not n. n edges with connectivity would introduce a cycle.' },
        { label: 'Connected with no repeated edges', isCorrect: false, feedback: '"No repeated edges" is a given constraint, not the tree condition. A graph with no repeated edges can still have cycles or disconnected components and fail to be a tree.' },
        { label: 'n nodes with no self-loops', isCorrect: false, feedback: 'Self-loops being absent is already guaranteed by the constraint list. The tree check requires proving connectivity and freedom from cycles — both together.' },
      ],
      correctFeedback: 'Exactly — connectivity and acyclicity together define a tree. A shortcut: if a connected undirected graph has exactly n-1 edges, it must be acyclic. You can check both at once.',
      wrongFeedback: [
        'The problem gives two conditions in one sentence. What are the two structural properties that make something a tree?',
        'Think about what separates a tree from an arbitrary connected graph, and from a disconnected acyclic graph.',
      ],
    },
    {
      id: 'edge-count-shortcut',
      question: '"Exactly n-1 edges" is listed as a tree requirement. What does checking edge count let you do?',
      options: [
        { label: 'Skip traversal entirely', isCorrect: false, feedback: 'Edge count alone does not prove a tree. A graph with n-1 edges could still be disconnected (e.g., a cycle plus an isolated node). You still need to verify connectivity.' },
        { label: 'Guarantee no cycle exists', isCorrect: false, feedback: 'n-1 edges is necessary but not sufficient to rule out cycles on its own. A disconnected graph with a cycle in one component could have fewer than n edges overall.' },
        { label: 'Reject invalid inputs immediately', isCorrect: true },
        { label: 'Prove the graph is connected', isCorrect: false, feedback: 'Edge count does not prove connectivity. Five nodes with two isolated pairs have four edges but are not connected. The count is a quick elimination, not a proof of connection.' },
      ],
      correctFeedback: 'If edges.length != n-1, you can return false before any traversal. This early exit is the first filter — if it passes, you then verify connectivity to confirm the tree.',
      wrongFeedback: [
        'If you know a tree must have exactly n-1 edges, what can you conclude the moment you see a different count?',
        'Edge count is a necessary condition. Violating a necessary condition lets you do what immediately?',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is a boolean — true or false. What does this mean for your traversal?',
      options: [
        { label: 'Return a path between nodes', isCorrect: false, feedback: 'The problem asks whether the graph is a valid tree, not for any path. A boolean output means you need a yes/no check, not route reconstruction.' },
        { label: 'Count components and compare to 1', isCorrect: false, feedback: 'Counting components is one valid approach, but the output itself just says true or false. The boolean means you only need to confirm or deny the two conditions — how you do it is your choice.' },
        { label: 'You only need to confirm or deny validity', isCorrect: true },
        { label: 'Collect all cycles then check if empty', isCorrect: false, feedback: 'You do not need to find and collect every cycle — you just need to detect whether any cycle exists. Collecting all cycles would be unnecessary work when the first one found is enough.' },
      ],
      correctFeedback: 'A boolean output means you stop as soon as you can confirm or deny. The first cycle found or the first disconnected node found lets you return immediately.',
      wrongFeedback: [
        'The output is true or false. What kind of algorithm does a yes/no question call for?',
        'You do not need to enumerate anything — just decide. What lets you stop a graph traversal as soon as a decision is reachable?',
      ],
    },
  ],
}
