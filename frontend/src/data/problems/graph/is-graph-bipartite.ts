export default {
  id: 'is-graph-bipartite',
  title: 'Is Graph Bipartite?',
  difficulty: 'medium',
  description: 'Given a graph represented as an adjacency list, return <code>true</code> if it is bipartite (its nodes can be colored with two colors such that no two adjacent nodes share the same color).',
  examples: [
    { input: 'graph = [[1,2,3],[0,2],[0,1,3],[0,2]]', output: 'false' },
    { input: 'graph = [[1,3],[0,2],[1,3],[0,2]]', output: 'true' },
  ],
  constraints: ['1 ≤ graph.length ≤ 100', '0 ≤ graph[u].length < graph.length', 'No self-loops or repeated edges'],
  starterCode: `def is_bipartite(graph):
  pass`,
  functionName: 'is_bipartite',
  conceptId: 'graphs',
  testCases: [
    { label: 'Not bipartite', args: [[[1,2,3],[0,2],[0,1,3],[0,2]]], expected: false },
    { label: 'Is bipartite', args: [[[1,3],[0,2],[1,3],[0,2]]], expected: true },
  ],
  bruteHint: 'Describe trying every possible 2-coloring assignment and checking it against all edges, and why that grows exponentially',
  optimizeHint: 'Name the traversal technique that assigns alternating colors as it visits nodes and flags conflicts',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'graph.length ≤ 100. What does this say about acceptable solution complexity?',
      options: [
        { label: 'Only O(n) solutions work', isCorrect: false, feedback: 'At n = 100 nodes, even O(n²) is 10,000 operations — trivially fast. The constraint is small enough that efficiency is not the concern here; correctness of traversal logic is.' },
        { label: 'O(n + e) traversal is affordable', isCorrect: true },
        { label: 'O(log n) is required', isCorrect: false, feedback: 'You cannot even visit all nodes in O(log n) time. The constraint is small — n ≤ 100 — so a full graph traversal is fine.' },
        { label: 'Input size does not matter here', isCorrect: false, feedback: 'Input size always shapes the approach. n ≤ 100 tells you this is a small graph where a complete traversal is trivial — which matters when choosing between BFS and DFS.' },
      ],
      correctFeedback: 'With at most 100 nodes, O(n + e) traversal is near-instant. The constraint is small enough that you can visit every node and every edge without any concern about time.',
      wrongFeedback: [
        'What is the cost of visiting every node and every edge once in a graph of 100 nodes?',
        'O(n + e) at n = 100 is at most a few thousand operations. Does the constraint rule that out?',
      ],
    },
    {
      id: 'bipartite-definition',
      question: 'The problem defines bipartite as "nodes can be colored with two colors such that no two adjacent nodes share the same color." What traversal strategy does this suggest?',
      options: [
        { label: 'Sort nodes by degree first', isCorrect: false, feedback: 'Degree order does not help you assign and verify colors. Bipartiteness is checked by propagating a color assignment along edges — sorting gives you no information about which color a neighbor should receive.' },
        { label: 'Assign alternating colors during graph traversal', isCorrect: true },
        { label: 'Find all odd-length cycles', isCorrect: false, feedback: 'A graph is bipartite if and only if it has no odd-length cycles — that is a mathematical fact, not the algorithm. Detecting odd cycles during traversal is exactly what color-assignment achieves implicitly.' },
        { label: 'Count edges per node', isCorrect: false, feedback: 'Edge count per node tells you the degree, not the color assignment. Bipartiteness requires propagating a two-color constraint along every edge, which a count cannot do.' },
      ],
      correctFeedback: 'Color the starting node, then assign the opposite color to every neighbor. If you ever reach a neighbor already colored the same as the current node, the graph is not bipartite.',
      wrongFeedback: [
        'You need to assign two colors so no neighbors share one. How does a graph traversal let you propagate that constraint?',
        'Think about what happens when you visit a neighbor: you know the current node\'s color, so what color must the neighbor be?',
      ],
    },
    {
      id: 'disconnected-graph',
      question: 'The constraint says "0 ≤ graph[u].length < graph.length" — some nodes may have no neighbors. What does this mean for your algorithm?',
      options: [
        { label: 'Start from every node, not just node 0', isCorrect: true },
        { label: 'Skip nodes with no edges', isCorrect: false, feedback: 'Isolated nodes are trivially bipartite, but you cannot skip unvisited nodes entirely — an isolated node still needs to be reached and colored to ensure you cover the full graph.' },
        { label: 'The graph is guaranteed connected', isCorrect: false, feedback: 'The constraint explicitly allows nodes with zero neighbors, which means the graph may be disconnected. A single BFS or DFS from node 0 would miss unreachable components.' },
        { label: 'Return false if any node is isolated', isCorrect: false, feedback: 'An isolated node is vacuously bipartite — no adjacent nodes means no color conflict. Isolated nodes do not cause failure; unreached components with odd cycles do.' },
      ],
      correctFeedback: 'The graph may be disconnected. You must initiate traversal from every unvisited node to check all components — a single BFS from node 0 would miss isolated or disconnected parts.',
      wrongFeedback: [
        'If some nodes have no neighbors, can a single traversal from node 0 guarantee you visited every node?',
        'Disconnected components require separate traversal starts. What does your outer loop need to do?',
      ],
    },
    {
      id: 'output-boolean',
      question: 'The output is a boolean. What does this mean for how your traversal handles a failed color check?',
      options: [
        { label: 'Collect all conflicting edges first', isCorrect: false, feedback: 'You do not need all conflicts — one is enough to prove the graph is not bipartite. Collecting every conflict would be unnecessary work when you can return false immediately.' },
        { label: 'Return false as soon as one conflict is found', isCorrect: true },
        { label: 'Complete traversal before deciding', isCorrect: false, feedback: 'A single color conflict is conclusive. There is no reason to finish the traversal after finding one — the answer is already false.' },
        { label: 'Track all components then vote', isCorrect: false, feedback: 'There is no vote — all components must be bipartite for the answer to be true, and any single failure returns false immediately. No aggregation is needed.' },
      ],
      correctFeedback: 'As soon as a neighbor has the same color as the current node, you can return false. The boolean output means one counterexample is conclusive.',
      wrongFeedback: [
        'The output is true or false. If you find a single edge where both endpoints have the same color, what can you conclude immediately?',
        'A boolean output means one failure is enough. What should your traversal do the moment it detects a color conflict?',
      ],
    },
  ],
}
