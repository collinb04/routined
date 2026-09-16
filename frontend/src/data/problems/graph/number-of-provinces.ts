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
  starterCode: `class Solution:
    def find_circle_num(self, is_connected):
        pass`,
  runnerSetup: 'find_circle_num = Solution().find_circle_num',
  functionName: 'find_circle_num',
  conceptId: 'graphs',
  testCases: [
    { label: 'Two provinces', args: [[[1,1,0],[1,1,0],[0,0,1]]], expected: 2 },
    { label: 'Three provinces', args: [[[1,0,0],[0,1,0],[0,0,1]]], expected: 3 },
    { label: 'One province', args: [[[1,1,1],[1,1,1],[1,1,1]]], expected: 1 },
  ],
  bruteHint: 'Imagine checking every pair of cities individually: for each pair (i, j), run a fresh traversal over the adjacency matrix to determine whether j is reachable from i, then use those reachability results to group cities into provinces. With n cities there are O(n²) pairs, and each traversal over an n × n matrix costs O(n²) on its own, giving roughly O(n⁴) total work. What lets you avoid re-checking reachability for pairs already grouped together?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(n)' },
  clues: [
    {
      id: 'input-format',
      question: 'Before you can reason about traversal, you need to know exactly what each entry in the given structure represents. The input is an n × n adjacency matrix, not an edge list. What does isConnected[i][j] == 1 mean?',
      highlight: { location: 'constraint', text: 'isConnected[i][j] is 1 or 0' },
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
      question: 'Constraints define the scale you must handle efficiently, so reading the bounds first tells you what complexity is actually achievable. n ≤ 200. The adjacency matrix has n² entries. What is the cost of reading it completely?',
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 200' },
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
      question: 'Input formats often carry a formatting convention that adds no real information, and recognizing it keeps your traversal logic clean. isConnected[i][i] is always 1 — every city is connected to itself. How should your traversal handle the diagonal?',
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
      question: 'Understanding what the output represents shapes the traversal pattern you need, so before diving into implementation, clarify exactly what you are counting. The output is the number of provinces (connected components). What traversal pattern produces the count?',
      highlight: { location: 'description', text: 'number of provinces (connected components)' },
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
  solutionCode: `class Solution:
    def find_circle_num(self, is_connected):
        n = len(is_connected)
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

        for i in range(n):
            for j in range(i + 1, n):
                if is_connected[i][j] == 1:
                    union(i, j)
        return count[0]`,
  solutionComplexity: { time: 'O(n²)', space: 'O(n)' },
  solutionCaveat: 'Only the upper triangle (<code>j > i</code>) of the adjacency matrix is scanned — the matrix is symmetric since <code>is_connected[i][j]</code> always equals <code>is_connected[j][i]</code>, so checking each pair once is enough and avoids redundant unions.',
  solutionExplanation: 'A "province" is exactly a connected component in the graph the adjacency matrix describes, so union-find naturally counts them: every direct connection unions its two cities, and after processing the whole matrix, the number of remaining distinct components is the number of provinces. This is the same union-find component-counting pattern as plain graph connectivity, just reading edges out of a matrix instead of an edge list.',
}
