export default {
  id: 'redundant-connection',
  title: 'Redundant Connection',
  difficulty: 'medium',
  description: `<p>In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with <code>n</code> nodes labeled 1 to n, with one additional edge added. Return an edge that can be removed so that the resulting graph is a tree. If there are multiple answers, return the answer that occurs last in the input.</p>`,
  examples: [
    { input: 'edges = [[1,2],[1,3],[2,3]]', output: '[2,3]' },
    { input: 'edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]', output: '[1,4]' },
  ],
  constraints: ['n == edges.length', '3 <= n <= 1000', 'edges[i].length == 2', 'No repeated edges'],
  starterCode: `def find_redundant_connection(edges):
  pass`,
  functionName: 'find_redundant_connection',
  conceptId: 'graphs',
  testCases: [
    { label: 'triangle', args: [[[1,2],[1,3],[2,3]]], expected: [2,3] },
    { label: 'longer cycle', args: [[[1,2],[2,3],[3,4],[1,4],[1,5]]], expected: [1,4] },
  ],
  clues: [
    {
      id: 'constraint-exactly-one-extra-edge',
      question: 'The graph started as a tree with one extra edge added. What does this guarantee about the graph?',
      options: [
        { label: 'Exactly one cycle exists', isCorrect: true },
        { label: 'The graph may be disconnected', isCorrect: false, feedback: 'A tree is connected by definition, and adding an edge to a connected graph keeps it connected. The graph is always connected — the extra edge created exactly one cycle.' },
        { label: 'Multiple redundant edges may exist', isCorrect: false, feedback: 'Only one edge was added beyond the tree structure. That single edge creates exactly one cycle, so there is exactly one redundant edge to find.' },
        { label: 'The graph has no cycles', isCorrect: false, feedback: 'The problem explicitly says one edge was added to a tree. A tree has no cycles, but that extra edge creates exactly one. Finding and removing the edge that closes the cycle is the task.' },
      ],
      correctFeedback: 'One extra edge on a tree creates exactly one cycle. Your task is to find any edge that, when removed, breaks that cycle and restores the tree structure.',
      wrongFeedback: [
        'A tree has n−1 edges and no cycles. If you add one more edge between two nodes already connected, what does that create?',
        'Adding one edge to a connected acyclic graph (a tree) always creates exactly one cycle. How many redundant edges does that imply?',
      ],
    },
    {
      id: 'cycle-detection-tool',
      question: 'You need to find which edge creates a cycle as you process edges in order. What data structure is ideal for this?',
      options: [
        { label: 'DFS on the completed graph', isCorrect: false, feedback: 'DFS on the full graph finds a cycle, but doesn\'t tell you which edge to return — it finds any back-edge, not necessarily the last one in input order. You need to detect cycle-formation as you add edges one by one.' },
        { label: 'Union-Find (disjoint set union)', isCorrect: true },
        { label: 'BFS to check connectivity after each removal', isCorrect: false, feedback: 'Checking connectivity after removing each edge is O(n) per edge, O(n²) total — functional but slow for n = 1,000. Union-Find detects whether two nodes are already connected in near-O(1) as you build the graph.' },
        { label: 'Adjacency matrix with cycle flag', isCorrect: false, feedback: 'An adjacency matrix stores connections but doesn\'t efficiently tell you whether two nodes are already in the same component. Union-Find tracks component membership directly and answers "already connected?" in near-O(1).' },
      ],
      correctFeedback: 'Union-Find processes edges one by one: if both endpoints are already in the same component, this edge creates a cycle — it\'s redundant. Otherwise, merge the components. The first such edge found (last in input order) is the answer.',
      wrongFeedback: [
        'You need to detect, as you process edges in input order, which edge connects two nodes that are already connected. What structure tracks which nodes share a component?',
        'Union-Find answers "are u and v already in the same set?" in near-O(1). If they are, adding edge (u, v) would create a cycle. That\'s exactly the check you need.',
      ],
    },
    {
      id: 'last-in-input-guarantee',
      question: 'If there are multiple answers, return the edge that occurs last in the input. How does processing edges in order help?',
      options: [
        { label: 'Keep overwriting the answer; the last cycle-forming edge wins', isCorrect: true },
        { label: 'Sort edges and return the maximum', isCorrect: false, feedback: 'Sorting by edge weight or label doesn\'t match "last in input order." You need to track which cycle-forming edge you encountered most recently in the original input sequence.' },
        { label: 'Return the first cycle-forming edge found', isCorrect: false, feedback: 'The problem asks for the last redundant edge in input order. If you stop at the first cycle-forming edge, you might miss a later edge that also creates a cycle and should be returned instead.' },
        { label: 'Build the full graph, then do BFS for the answer', isCorrect: false, feedback: 'Building the full graph loses the input order information. You need to process edges in their original sequence so you know which cycle-forming edge came last.' },
      ],
      correctFeedback: 'Process edges in input order with Union-Find. Each time you find a cycle-forming edge, record it. Because there is exactly one cycle, only one edge will trigger this — it is automatically the last (and only) cycle-forming edge in the input.',
      wrongFeedback: [
        'With exactly one extra edge and therefore exactly one cycle, how many edges in the input will trigger your "already in same component" check?',
        'Since there\'s only one redundant edge, the "last in input" tiebreaker is only relevant if multiple edges form cycles. With exactly one extra edge added to a tree, how many cycle-forming edges will you encounter?',
      ],
    },
  ],
}
