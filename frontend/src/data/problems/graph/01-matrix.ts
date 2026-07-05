export default {
  id: '01-matrix',
  title: '01 Matrix',
  difficulty: 'medium',
  description: 'Given an <code>m × n</code> binary matrix <code>mat</code>, return a matrix of the same size where each cell contains the distance to the nearest 0. Use BFS.',
  examples: [
    { input: 'mat = [[0,0,0],[0,1,0],[0,0,0]]', output: '[[0,0,0],[0,1,0],[0,0,0]]' },
    { input: 'mat = [[0,0,0],[0,1,0],[1,1,1]]', output: '[[0,0,0],[0,1,0],[1,2,1]]' },
  ],
  constraints: ['m == mat.length', 'n == mat[0].length', '1 ≤ m, n ≤ 10⁴', 'mat[i][j] is 0 or 1', 'At least one 0'],
  starterCode: `def update_matrix(mat):
  pass`,
  functionName: 'update_matrix',
  conceptId: 'graphs',
  testCases: [
    { label: 'Center 1', args: [[[0,0,0],[0,1,0],[0,0,0]]], expected: [[0,0,0],[0,1,0],[0,0,0]] },
    { label: 'Corner 1s', args: [[[0,0,0],[0,1,0],[1,1,1]]], expected: [[0,0,0],[0,1,0],[1,2,1]] },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'm, n ≤ 10⁴ means up to 10⁸ cells. What does this tell you about acceptable complexity?',
      options: [
        { label: 'O(m²·n²) is fine', isCorrect: false, feedback: 'With m = n = 10⁴, that\'s 10¹⁶ operations — not remotely feasible. The grid size rules out any per-cell BFS.' },
        { label: 'O(n log n) or better', isCorrect: false, feedback: 'O(n log n) would be exceptional, but you can\'t even read all cells without touching each one. The bound rules out quadratic — not all super-linear approaches.' },
        { label: 'O(m·n) — visit each cell once', isCorrect: true },
        { label: 'Input size doesn\'t constrain this', isCorrect: false, feedback: 'With up to 10⁸ cells, every additional pass over the grid multiplies the cost. Input size is the primary guide here.' },
      ],
      correctFeedback: 'With up to 10⁸ cells total, you need an approach that touches each cell a constant number of times — linear in the grid size.',
      wrongFeedback: [
        'Think about worst case: if m = n = 10⁴, how many cells are there total? Can you afford to visit each cell more than once?',
        'The grid has up to m × n cells. A single pass touches each cell once. What traversal strategy does that in O(m·n)?',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is a full matrix of distances, not a single value. What does this imply?',
      options: [
        { label: 'Run BFS from each 1-cell separately', isCorrect: false, feedback: 'Starting BFS from each 1-cell would recompute distances redundantly and costs O((m·n)²) in the worst case — too slow for a 10⁴ × 10⁴ grid.' },
        { label: 'Compute distances for all cells simultaneously', isCorrect: true },
        { label: 'Sort cells by distance first', isCorrect: false, feedback: 'Distances aren\'t known before traversal — sorting presupposes what you\'re computing. You need to discover distances during traversal, not before.' },
        { label: 'Return only the maximum distance', isCorrect: false, feedback: 'The output requires a distance at every position in the matrix. Returning one value loses all per-cell information.' },
      ],
      correctFeedback: 'Every cell needs its own answer, which suggests computing all distances in one unified sweep rather than repeated independent searches.',
      wrongFeedback: [
        'You need a distance for every cell. Starting a separate BFS per cell would recompute the same distances many times — what single traversal fills them all at once?',
        'Consider seeding the traversal from all 0-cells simultaneously. What does that produce in a single pass?',
      ],
    },
    {
      id: 'multi-source-signal',
      question: '"At least one 0" is guaranteed. What does this tell you about the traversal starting point?',
      options: [
        { label: 'Start BFS from every 1-cell', isCorrect: false, feedback: 'Starting from 1s means you have to search for 0s from each one — that\'s the hard direction. The 0s are the sources of distance, not the destinations.' },
        { label: 'Seed BFS from all 0-cells at once', isCorrect: true },
        { label: 'Find the single nearest 0 per row', isCorrect: false, feedback: 'The nearest 0 for a cell might be in any direction, not just along its row. A row-by-row scan misses diagonal neighbors.' },
        { label: 'The guarantee has no algorithmic impact', isCorrect: false, feedback: 'The guarantee matters because it means the BFS always terminates — no 1-cell can be at infinite distance. But the bigger signal is about where to start.' },
      ],
      correctFeedback: 'All 0-cells have distance 0 from themselves. Enqueuing them all at the start of one BFS propagates distances outward level by level — each 1-cell gets the shortest distance to any 0.',
      wrongFeedback: [
        'Distance to the nearest 0 is measured from 0, not toward it. Which cells already know their own distance?',
        '0-cells are at distance 0 from themselves. What happens if you put all of them in the BFS queue at the same time?',
      ],
    },
    {
      id: 'distance-definition',
      question: 'Distance here means steps between adjacent cells (4-directional). What does this rule out?',
      options: [
        { label: 'Diagonal moves are allowed', isCorrect: false, feedback: 'The problem uses grid adjacency, which is 4-directional: up, down, left, right. Diagonals would change the distance values and aren\'t valid moves here.' },
        { label: 'Euclidean distance formulas', isCorrect: true },
        { label: 'BFS as the traversal method', isCorrect: false, feedback: 'BFS is exactly right for unweighted step-by-step distances. Each BFS level corresponds to one additional step, so level k holds all cells at distance k.' },
        { label: 'Visiting cells more than once', isCorrect: false, feedback: 'In BFS, the first time you reach a cell is the shortest path — so you mark it visited and don\'t revisit. That property is what makes BFS correct here.' },
      ],
      correctFeedback: 'Manhattan-style step distances are what BFS naturally computes on a grid — each level of the BFS frontier is exactly one step farther from the sources.',
      wrongFeedback: [
        'The distance is counted in grid steps, not straight-line geometry. What traversal counts steps one at a time?',
        'BFS explores cells level by level, where each level is one additional step. How does that match the distance definition here?',
      ],
    },
  ],
}
