export default {
  id: 'unique-paths',
  title: 'Unique Paths',
  difficulty: 'medium',
  description: 'A robot starts at the top-left of an <code>m × n</code> grid and can only move right or down. How many unique paths are there to the bottom-right corner?',
  examples: [
    { input: 'm=3, n=7', output: '28' },
    { input: 'm=3, n=2', output: '3', explanation: 'Right-Down-Down, Down-Right-Down, Down-Down-Right.' },
  ],
  constraints: [
    '1 ≤ m, n ≤ 100',
  ],
  starterCode: `def unique_paths(m, n):
  # Hint: dp[i][j] = dp[i-1][j] + dp[i][j-1]; first row and column are all 1s
  pass`,
  functionName: 'unique_paths',
  conceptId: 'dp-2d',
  testCases: [
    { label: '3×7', args: [3, 7], expected: 28 },
    { label: '3×2', args: [3, 2], expected: 3 },
    { label: '1×1', args: [1, 1], expected: 1 },
    { label: '7×3', args: [7, 3], expected: 28 },
    { label: '5×5', args: [5, 5], expected: 70 },
  ],
  clues: [
    {
      id: 'movement-constraint',
      question: 'The robot can only move right or down. What does this mean for how paths are counted?',
      options: [
        { label: 'Each cell (i,j) is reachable from exactly two predecessors', isCorrect: true },
        { label: 'You must use BFS to explore all reachable cells', isCorrect: false, feedback: 'BFS finds reachable cells, not counts of paths. Every cell is reachable in a grid with no obstacles — what varies is how many distinct paths reach it.' },
        { label: 'Cells on the same row have equal path counts', isCorrect: false, feedback: 'Moving right only increases j — cells in the same row have different numbers of ways to reach them. dp[0][0] = 1, dp[0][1] = 1, dp[1][1] = 2.' },
        { label: 'The answer grows exponentially with m and n', isCorrect: false, feedback: 'The answer is C(m+n-2, m-1) — a binomial coefficient, not exponential. For a 100×100 grid, the count is large but the DP computes it in O(m × n) steps.' },
      ],
      correctFeedback: 'Any cell (i, j) with i > 0 and j > 0 is reachable only from (i-1, j) above or (i, j-1) to the left. So dp[i][j] = dp[i-1][j] + dp[i][j-1].',
      wrongFeedback: [
        'From which cells can you reach (i, j) when you can only move right or down? How many predecessors does each interior cell have?',
        'Movement is right-only or down-only. You can arrive at (i, j) from (i-1, j) (moved down) or (i, j-1) (moved right). Those are the only two predecessors.',
      ],
    },
    {
      id: 'base-cases',
      question: 'The first row and first column each have only one path to reach any cell. What does this mean for initialization?',
      options: [
        { label: 'Initialize dp[0][0] = 1; the rest are computed from the recurrence', isCorrect: false, feedback: 'For cells in the first row (dp[0][j]), there\'s no cell above — the recurrence would try dp[-1][j], which doesn\'t exist. The entire first row must be seeded to 1 explicitly.' },
        { label: 'Set dp[0][j] = 1 for all j and dp[i][0] = 1 for all i', isCorrect: true },
        { label: 'Initialize everything to 0 and let the recurrence propagate', isCorrect: false, feedback: 'Starting from all zeros leaves the first row and column at 0 forever — there\'s nothing to propagate from the boundaries. You need explicit base cases.' },
        { label: 'Initialize the first row to 1, 2, 3, ... by index', isCorrect: false, feedback: 'There\'s exactly one path to each cell in the first row: move right repeatedly from (0,0). Each dp[0][j] = 1, not j+1.' },
      ],
      correctFeedback: 'The first row has exactly one path to each cell (move right only). The first column has exactly one path (move down only). These are the base cases: all 1s.',
      wrongFeedback: [
        'How many ways are there to reach dp[0][3] if you can only move right or down? What about dp[2][0]?',
        'Any cell in the first row is reached by moving right from (0,0) with no choices — exactly 1 path. Same for the first column moving down. Both boundaries initialize to 1.',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'm, n ≤ 100 tells you…',
      options: [
        { label: 'An m × n DP table is sufficient', isCorrect: false, feedback: 'An m × n table works, but you can reduce to O(n) space — each row depends only on the previous row. The constraint permits both, but space optimization is worth noting.' },
        { label: 'O(m × n) time and O(n) space is achievable', isCorrect: true },
        { label: 'O(m × n × min(m,n)) is required', isCorrect: false, feedback: 'O(m × n × min(m,n)) would be up to 1 million operations at m = n = 100 — still fine, but unnecessary. The recurrence is O(1) per cell, giving O(m × n) total.' },
        { label: 'A combinatorial formula is faster than DP', isCorrect: false, feedback: 'C(m+n-2, m-1) is a valid formula, but computing it requires careful handling of large factorials. DP is simpler to implement correctly without overflow concerns.' },
      ],
      correctFeedback: 'The grid has at most 10,000 cells. Computing each in O(1) gives O(m × n) time. You only need one row at a time, so O(n) space suffices.',
      wrongFeedback: [
        'At m = n = 100, how many cells need to be filled? Is that a concern?',
        '100 × 100 = 10,000 cells — trivially fast. Since each cell depends only on the previous row, you can process one row at a time using O(n) space.',
      ],
    },
  ],
}
