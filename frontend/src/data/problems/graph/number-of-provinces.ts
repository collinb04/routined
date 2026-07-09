export default {
  id: 'number-of-provinces',
  title: 'Number of Provinces',
  difficulty: 'medium',
  description: 'Given an adjacency matrix <code>isConnected</code> of cities, return the number of provinces (connected components).',
  examples: [
    { input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]', output: '2' },
    { input: 'isConnected = [[1,0,0],[0,1,0],[0,0,1]]', output: '3' },
  ],
  constraints: ['1 ≤ n ≤ 200', 'n == isConnected.length == isConnected[i].length', 'isConnected[i][j] is 1 or 0'],
  starterCode: `def find_circle_num(is_connected):
  pass`,
  functionName: 'find_circle_num',
  conceptId: 'graphs',
  testCases: [
    { label: 'Two provinces', args: [[[1,1,0],[1,1,0],[0,0,1]]], expected: 2 },
    { label: 'Three provinces', args: [[[1,0,0],[0,1,0],[0,0,1]]], expected: 3 },
    { label: 'One province', args: [[[1,1,1],[1,1,1],[1,1,1]]], expected: 1 },
  ],
  bruteHint: 'Describe checking reachability between every pair of cities individually using the matrix, and its time complexity',
  optimizeHint: 'Name the technique (Union-Find or repeated DFS/BFS) that groups cities into provinces by visiting each unvisited city exactly once',
  clues: [
    {
      id: 'input-format',
      question: 'The input is an n × n adjacency matrix, not an edge list. What does isConnected[i][j] == 1 mean?',
      options: [
        { label: 'City i has exactly j neighbors', isCorrect: false, feedback: 'isConnected[i][j] is a binary flag, not a count. A value of 1 means city i and city j are directly connected; j here is a city index, not a neighbor count.' },
        { label: 'City i and city j are directly connected', isCorrect: true },
        { label: 'City j is reachable from city i in j steps', isCorrect: false, feedback: 'The adjacency matrix encodes direct (one-hop) connections only. Reachability across multiple hops requires traversal — the matrix entry itself only indicates a direct edge.' },
        { label: 'City i belongs to province j', isCorrect: false, feedback: 'Province membership is what you need to compute, not what the matrix stores. isConnected[i][j] tells you whether cities i and j share a direct road.' },
      ],
      correctFeedback: 'isConnected[i][j] == 1 means there is a direct road between city i and city j. Reading the i-th row gives all cities directly connected to city i.',
      wrongFeedback: [
        'In an adjacency matrix, what does a 1 at row i, column j represent about the relationship between node i and node j?',
        'The matrix is n × n. What does each cell encode about the two nodes identified by its row and column indices?',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'n ≤ 200. The adjacency matrix has n² entries. What is the cost of reading it completely?',
      options: [
        { label: 'O(n) — one pass through the matrix', isCorrect: false, feedback: 'A matrix has n² entries. Reading it once is O(n²). At n = 200, that is 40,000 entries — fast, but not O(n).' },
        { label: 'O(n²) — you must read n² entries', isCorrect: true },
        { label: 'O(n³) — matrix operations are cubic', isCorrect: false, feedback: 'You are reading entries for traversal, not multiplying matrices. A single DFS or BFS pass over an n × n adjacency matrix is O(n²) — one pass over all n² cells.' },
        { label: 'O(log n) with binary search on rows', isCorrect: false, feedback: 'You cannot find all neighbors of a node in O(log n) using an adjacency matrix — every row has n entries and any of them could be 1. You must read the entire row.' },
      ],
      correctFeedback: 'Reading every cell in an n × n matrix costs O(n²). At n = 200, that is 40,000 entries — trivial. Your DFS or BFS will naturally scan each row to find neighbors.',
      wrongFeedback: [
        'An n × n grid has how many cells total? What is the cost of reading each cell exactly once?',
        'To find all neighbors of city i, you must check all n entries in row i. For all n cities, what is the total work?',
      ],
    },
    {
      id: 'diagonal-entries',
      question: 'isConnected[i][i] is always 1 — every city is connected to itself. How should your traversal handle the diagonal?',
      options: [
        { label: 'Treat self-connections as edges to new nodes', isCorrect: false, feedback: 'isConnected[i][i] == 1 is just the matrix convention for "city i exists." Treating it as an edge to another node would be incorrect — i and i are the same city.' },
        { label: 'Skip diagonal entries — they add no traversal information', isCorrect: true },
        { label: 'Count diagonal 1s as isolated provinces', isCorrect: false, feedback: 'Diagonal entries are not isolation indicators — they are a formatting convention. A city with only a diagonal 1 is isolated, but that is determined by the off-diagonal entries, not the diagonal itself.' },
        { label: 'Return false if any diagonal entry is 0', isCorrect: false, feedback: 'The problem guarantees isConnected[i][i] == 1 for all i. There is no need to validate it — just skip i == j during neighbor scanning.' },
      ],
      correctFeedback: 'When scanning row i for neighbors, skip column j == i. The diagonal is always 1 by convention and adds no new connection information for traversal.',
      wrongFeedback: [
        'isConnected[i][i] == 1 means city i connects to itself. In a traversal looking for other cities to visit, is that entry useful?',
        'When building a neighbor list from row i, which column should you skip and why?',
      ],
    },
    {
      id: 'output-count',
      question: 'The output is the number of provinces (connected components). What traversal pattern produces the count?',
      options: [
        { label: 'Count cities where isConnected[i][i] == 1', isCorrect: false, feedback: 'isConnected[i][i] is always 1 for all i — counting them gives n, not the province count. Province count requires grouping cities by reachability.' },
        { label: 'Start a new DFS/BFS for each unvisited city; count starts', isCorrect: true },
        { label: 'Count rows in the matrix', isCorrect: false, feedback: 'The number of rows is n, which is the number of cities — not provinces. Multiple cities can belong to the same province.' },
        { label: 'Count cities with no off-diagonal 1s', isCorrect: false, feedback: 'Isolated cities (no off-diagonal 1s) each form their own province, but multi-city provinces also exist. Counting only isolated cities misses connected groups entirely.' },
      ],
      correctFeedback: 'Iterate over all n cities. Each time you find an unvisited city, start a DFS or BFS to mark its entire component as visited, then increment the province counter.',
      wrongFeedback: [
        'When you start a new traversal from an unvisited city and mark everything reachable, what have you identified one of?',
        'Each new traversal start — because the current city was unvisited — corresponds to one province. How do you count those starts?',
      ],
    },
  ],
}
