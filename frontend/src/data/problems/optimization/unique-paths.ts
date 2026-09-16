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
  starterCode: `class Solution:
    def unique_paths(self, m, n):
        # Hint: dp[i][j] = dp[i-1][j] + dp[i][j-1]; first row and column are all 1s
        pass`,
  runnerSetup: 'unique_paths = Solution().unique_paths',
  functionName: 'unique_paths',
  conceptId: 'dp-2d',
  testCases: [
    { label: '3×7', args: [3, 7], expected: 28 },
    { label: '3×2', args: [3, 2], expected: 3 },
    { label: '1×1', args: [1, 1], expected: 1 },
    { label: '7×3', args: [7, 3], expected: 28 },
    { label: '5×5', args: [5, 5], expected: 70 },
  ],
  bruteHint: 'The brute-force approach recursively branches at every cell, trying a move right and a move down and summing the two results, exploring every possible path independently from the top-left to the bottom-right. Because many different paths pass through the same interior cell, this recursion revisits and re-solves that same (row, col) pair over and over, growing to roughly O(2^(m+n)) calls in the worst case. If you could remember how many ways there are to reach a given cell the first time you computed it, would you ever need to recompute it again?',
  optimizeComplexity: { time: 'O(m·n)', space: 'O(n)' },
  clues: [
    {
      id: 'movement-constraint',
      highlight: { location: 'description', text: 'can only move right or down' },
      question: 'The exact movement rule stated in the problem determines which cells can feed into your recurrence, so it pays to parse it precisely before writing any code. The robot can only move right or down. What does this mean for how paths are counted?',
      options: [
        { label: 'Each cell (i,j) is reachable from exactly two predecessors', isCorrect: true },
        { label: 'Explore every reachable cell without tracking how many distinct paths reach it', isCorrect: false, feedback: 'BFS finds reachable cells, not counts of paths. Every cell is reachable in a grid with no obstacles — what varies is how many distinct paths reach it.' },
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
      highlight: { location: 'description', text: 'starts at the top-left' },
      question: 'Getting boundary values right up front keeps the recurrence from ever referencing a cell that doesn\'t exist. The first row and first column each have only one path to reach any cell. What does this mean for initialization?',
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
      highlight: { location: 'constraint', text: '1 ≤ m, n ≤ 100' },
      question: 'Numeric constraints usually reveal the complexity your solution is expected to target before you write any code. m, n ≤ 100 tells you…',
      options: [
        { label: 'A full m × n table storing every cell\'s count is sufficient', isCorrect: false, feedback: 'An m × n table works, but you can reduce to O(n) space — each row depends only on the previous row. The constraint permits both, but space optimization is worth noting.' },
        { label: 'O(m × n) time and O(n) space is achievable', isCorrect: true },
        { label: 'O(m × n × min(m,n)) is required', isCorrect: false, feedback: 'O(m × n × min(m,n)) would be up to 1 million operations at m = n = 100 — still fine, but unnecessary. The recurrence is O(1) per cell, giving O(m × n) total.' },
        { label: 'Computing the answer directly from m and n in one step is faster than filling a table cell by cell', isCorrect: false, feedback: 'C(m+n-2, m-1) is a valid formula, but computing it requires careful handling of large factorials. DP is simpler to implement correctly without overflow concerns.' },
      ],
      correctFeedback: 'The grid has at most 10,000 cells. Computing each in O(1) gives O(m × n) time. You only need one row at a time, so O(n) space suffices.',
      wrongFeedback: [
        'At m = n = 100, how many cells need to be filled? Is that a concern?',
        '100 × 100 = 10,000 cells — trivially fast. Since each cell depends only on the previous row, you can process one row at a time using O(n) space.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def unique_paths(self, m, n):
        dp = [1] * n
        for _ in range(1, m):
            for j in range(1, n):
                dp[j] += dp[j - 1]
        return dp[-1]`,
  solutionComplexity: { time: 'O(m × n)', space: 'O(n)' },
  solutionCaveat: 'This rolls the usual 2D <code>dp[i][j]</code> table down into a single row, updated in place: since <code>dp[j]</code> only ever depends on the row above it (now still sitting in <code>dp[j]</code> before this iteration overwrites it) and the cell to its left (<code>dp[j-1]</code>, already updated this row), one array is enough — no need to keep every row around.',
  solutionExplanation: 'Every cell can only be reached from directly above or directly left, so the number of paths to any cell is just the sum of the paths to those two. The first row and column are seeded at 1 because there\'s exactly one way to get there — a straight line of rights or a straight line of downs, no choices involved. Everything past that first row and column is just adding two already-known numbers together, the same recurrence as 1D DP with one more dimension of state.',
}
