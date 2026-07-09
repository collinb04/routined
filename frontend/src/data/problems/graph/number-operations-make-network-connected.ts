export default {
  id: 'number-operations-make-network-connected',
  title: 'Number of Operations to Make Network Connected',
  difficulty: 'medium',
  description: 'Given n computers and connections (cables), you can move a cable from one pair of computers to another. Find the minimum number of moves to connect all computers, or -1 if impossible.',
  examples: [
    { input: 'n=4, connections=[[0,1],[0,2],[1,2]]', output: '1', explanation: 'One extra cable connects computer 3.' },
    { input: 'n=6, connections=[[0,1],[0,2],[0,3],[1,2],[1,3]]', output: '2' },
  ],
  constraints: ['1 ≤ n ≤ 10⁵', '1 ≤ connections.length ≤ min(n*(n-1)/2, 10⁵)'],
  starterCode: `def make_connected(n, connections):
  pass`,
  functionName: 'make_connected',
  conceptId: 'graphs',
  testCases: [
    { label: '1 operation', args: [4,[[0,1],[0,2],[1,2]]], expected: 1 },
    { label: '2 operations', args: [6,[[0,1],[0,2],[0,3],[1,2],[1,3]]], expected: 2 },
    { label: 'Impossible', args: [4,[[0,1]]], expected: -1 },
  ],
  bruteHint: 'Describe a brute-force approach that checks each edge by rerunning a full connectivity traversal to see if its endpoints are already connected, and the time complexity that results',
  optimizeHint: 'Name the data structure that lets you detect redundant edges and count components in near-O(1) per edge',
  clues: [
    {
      id: 'impossibility-condition',
      question: 'To connect n computers into one network, you need at least n−1 cables. What does this tell you about when the answer is -1?',
      options: [
        { label: 'When the graph has a cycle', isCorrect: false, feedback: 'A cycle means you have a spare cable — that\'s the opposite of impossible. The -1 case is when you don\'t have enough cables to wire all n computers even optimally.' },
        { label: 'When connections.length < n−1', isCorrect: true },
        { label: 'When some computers have no connections', isCorrect: false, feedback: 'Isolated computers are exactly what you\'re trying to fix by moving cables. The question is whether you have enough cables total — n−1 is the minimum needed for any spanning tree.' },
        { label: 'When the graph has more than one cycle', isCorrect: false, feedback: 'Multiple cycles mean multiple spare cables — more to work with, not fewer. Impossibility is purely about count: fewer than n−1 cables means you can\'t build a spanning tree regardless of how you arrange them.' },
      ],
      correctFeedback: 'A spanning tree on n nodes requires exactly n−1 edges. If connections.length < n−1, there are not enough cables to connect all computers — return -1 immediately.',
      wrongFeedback: [
        'A tree connecting n nodes always has exactly n−1 edges. If you have fewer cables than that, what is the maximum number of computers you can connect?',
        'With fewer than n−1 cables, you cannot build a spanning tree — some computer will always be disconnected. That\'s the only condition for -1.',
      ],
    },
    {
      id: 'spare-cables',
      question: 'Each connected component with k nodes and k edges contains exactly one cycle — meaning one spare cable. What is the total number of spare cables?',
      options: [
        { label: 'connections.length − (n − 1)', isCorrect: false, feedback: 'That formula gives the total number of extra edges above a spanning tree, but not the number of spare cables available to reconnect isolated components. Each cycle in each component yields one spare cable.' },
        { label: 'connections.length − (n − number of components)', isCorrect: false, feedback: 'Close — this counts extras within each component, but the answer to the problem is simpler. The number of moves needed equals the number of isolated components minus 1, and you only need to check if you have enough spares.' },
        { label: 'One per cycle across all components', isCorrect: true },
        { label: 'Zero — cables cannot be spared', isCorrect: false, feedback: 'Any component with more edges than nodes minus 1 has at least one cycle, meaning at least one edge is redundant and can be moved. Spare cables are exactly those redundant edges.' },
      ],
      correctFeedback: 'Each cycle in the graph contributes one spare cable (one edge beyond the component\'s spanning tree). The total spare count is connections.length − (n − components). You need components − 1 moves to merge everything.',
      wrongFeedback: [
        'A tree on k nodes has exactly k−1 edges. If a component has k nodes and more than k−1 edges, how many edges are redundant?',
        'Spare cables = total edges − minimum edges needed = connections.length − (n − number_of_components). You need exactly (components − 1) moves to merge all components.',
      ],
    },
    {
      id: 'component-counting-tool',
      question: 'You need to count connected components and detect cycles. What data structure handles both efficiently?',
      options: [
        { label: 'Union-Find (disjoint set union)', isCorrect: true },
        { label: 'DFS with a visited array', isCorrect: false, feedback: 'DFS can count components and detect cycles, but Union-Find does both in near-O(1) per edge and also directly gives you the component count after processing all edges.' },
        { label: 'Adjacency matrix', isCorrect: false, feedback: 'An adjacency matrix stores connections but doesn\'t efficiently count components or detect cycles. With n up to 10⁵, an n×n matrix would also use 10¹⁰ memory.' },
        { label: 'BFS from each unvisited node', isCorrect: false, feedback: 'BFS can count components, but it doesn\'t naturally detect spare cables (redundant edges). Union-Find detects a redundant edge the moment you try to union two nodes already in the same component.' },
      ],
      correctFeedback: 'Union-Find processes each edge in near-O(1): if the two endpoints are already in the same component, the edge is redundant (a spare cable). After processing all edges, the number of remaining components minus 1 is the answer.',
      wrongFeedback: [
        'You need to simultaneously count components and find redundant edges. Which structure answers "are these two nodes already connected?" in near-O(1)?',
        'Union-Find: if find(u) == find(v), the edge (u, v) is a spare cable — increment your spare count. Otherwise, union them. After all edges, count components.',
      ],
    },
    {
      id: 'minimum-moves',
      question: 'After identifying the number of connected components, what is the minimum number of cable moves needed?',
      options: [
        { label: 'n − 1', isCorrect: false, feedback: 'n−1 is the total edges in a spanning tree, not the number of moves. If there are c components, you already have edges within each one — you only need c−1 more connections to merge them all.' },
        { label: 'components − 1', isCorrect: true },
        { label: 'components', isCorrect: false, feedback: 'If there are c components, you need c−1 merges to reduce them to 1. One bridge between each pair of adjacent components suffices — that\'s c−1 cables, not c.' },
        { label: 'connections.length', isCorrect: false, feedback: 'You don\'t move all cables — only the spare ones. The number of moves needed is determined by how many components exist, not how many cables you have total.' },
      ],
      correctFeedback: 'To merge c isolated components into one, you need exactly c−1 bridge cables. Each cable move connects two components into one, reducing the count by 1. Starting from c, you need c−1 moves to reach 1.',
      wrongFeedback: [
        'If you have 3 separate groups, how many cable moves does it take to connect them all into one? Try drawing it out.',
        'Each move merges two components into one. Starting with c components, after 1 move you have c−1, after 2 moves c−2. How many moves until you reach 1 component?',
      ],
    },
  ],
}
