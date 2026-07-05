export default {
  id: 'longest-increasing-path-matrix',
  title: 'Longest Increasing Path in a Matrix',
  difficulty: 'hard',
  description: 'Given an <code>m × n</code> matrix, return the length of the longest increasing path (adjacent cells, strictly increasing). Movement is 4-directional.',
  examples: [
    { input: 'matrix = [[9,9,4],[6,6,8],[2,1,1]]', output: '4', explanation: 'Path: 1 → 2 → 6 → 9.' },
    { input: 'matrix = [[3,4,5],[3,2,6],[2,2,1]]', output: '4', explanation: 'Path: 3 → 4 → 5 → 6.' },
  ],
  constraints: ['m == matrix.length', 'n == matrix[0].length', '1 ≤ m, n ≤ 200', '0 ≤ matrix[i][j] ≤ 2³¹ − 1'],
  starterCode: `def longest_increasing_path(matrix):
  pass`,
  functionName: 'longest_increasing_path',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Length 4', args: [[[9,9,4],[6,6,8],[2,1,1]]], expected: 4 },
    { label: 'Length 4 v2', args: [[[3,4,5],[3,2,6],[2,2,1]]], expected: 4 },
    { label: 'Single', args: [[[1]]], expected: 1 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'm, n ≤ 200 tells you…',
      options: [
        { label: 'O(m × n) per cell is acceptable', isCorrect: false, feedback: 'O(m × n) per cell would be O(m² × n²) = O(40,000²) = 1.6 billion operations at maximum size — far too slow. Each cell should be processed in O(1) amortized.' },
        { label: 'Each cell should be visited at most once', isCorrect: true },
        { label: 'O(m × n × log(m × n)) is required', isCorrect: false, feedback: 'Log-factor complexity is not required here. A single DFS pass with memoization visits each cell once — O(m × n) total.' },
        { label: 'BFS from every cell is fine', isCorrect: false, feedback: 'BFS from every cell without memoization could visit cells repeatedly. At m = n = 200, that\'s 40,000 cells each potentially triggering O(m × n) work.' },
      ],
      correctFeedback: 'The grid has m × n = up to 40,000 cells. With memoization, each cell\'s longest path is computed once and cached — O(m × n) total work.',
      wrongFeedback: [
        'How many cells are there at m = n = 200? What happens if you recompute the longest path from each cell from scratch?',
        'Memoize the result at each cell. Once computed, the longest path from (r, c) is never recomputed — total work is O(m × n).',
      ],
    },
    {
      id: 'strictly-increasing',
      question: 'Movement is to adjacent cells with strictly increasing values. What does "strictly increasing" rule out?',
      options: [
        { label: 'Moving diagonally', isCorrect: false, feedback: 'Diagonal movement is ruled out by "4-directional" (up, down, left, right), not by "strictly increasing." Those are two separate constraints.' },
        { label: 'Cycles in the path', isCorrect: true },
        { label: 'Visiting a cell more than once', isCorrect: false, feedback: 'You can\'t revisit a cell because each step must increase strictly — you can\'t return to a lower or equal value. The cycle-free property is the deeper signal here.' },
        { label: 'Starting from a cell with value 0', isCorrect: false, feedback: 'matrix[i][j] ≥ 0 is allowed. "Strictly increasing" means each step must go to a strictly larger value — it says nothing about the starting value.' },
      ],
      correctFeedback: 'Strictly increasing means you can never return to a previously visited cell — any path back would require a decrease or repeat. This makes the implicit graph a DAG, which enables memoized DFS without a visited set.',
      wrongFeedback: [
        'If each step strictly increases the value, can you ever revisit a cell you\'ve been to before? What does that say about cycles?',
        'No cycles means the structure is a DAG — directed acyclic graph. On a DAG, DFS with memoization computes all longest paths correctly without revisit tracking.',
      ],
    },
    {
      id: 'dag-memoization',
      question: 'Because paths are strictly increasing, the same cell can be the starting point of many paths. What does this imply?',
      options: [
        { label: 'Compute longest path from each cell independently', isCorrect: false, feedback: 'Independent computation would repeat identical work — the longest path from cell (r, c) is the same no matter which outer cell triggered the DFS. Cache it.' },
        { label: 'Cache the longest path length at each cell', isCorrect: true },
        { label: 'Sort cells by value and process in order', isCorrect: false, feedback: 'Sorting by value is a valid approach (topological order on the DAG), but the key insight is memoization — caching results so each cell is processed once regardless of visit order.' },
        { label: 'Use a 3D DP table indexed by row, column, and value', isCorrect: false, feedback: 'Values can be up to 2³¹ − 1 — a 3D table indexed by value is completely infeasible. A 2D memo table indexed by (row, column) is sufficient.' },
      ],
      correctFeedback: 'memo[r][c] stores the length of the longest increasing path starting at (r, c). Once filled, it\'s reused by any neighbor that can reach (r, c). The whole grid fills in O(m × n).',
      wrongFeedback: [
        'If multiple cells have a neighbor at (r, c), they all need the same answer. What do you do to avoid recomputing it?',
        'Store the result of DFS(r, c) in a memo table. The first call computes it; every subsequent call returns the cached value in O(1).',
      ],
    },
  ],
}
