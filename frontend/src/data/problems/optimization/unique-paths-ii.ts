export default {
  id: 'unique-paths-ii',
  title: 'Unique Paths II',
  difficulty: 'medium',
  description: 'A robot starts at the top-left of an <code>m × n</code> grid and moves only right or down. Some cells have obstacles (1 = obstacle, 0 = empty). Return the number of unique paths to the bottom-right.',
  examples: [
    { input: 'obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]', output: '2', explanation: 'The obstacle blocks one of the three paths.' },
    { input: 'obstacleGrid = [[0,1],[0,0]]', output: '1' },
  ],
  constraints: ['m == obstacleGrid.length', 'n == obstacleGrid[0].length', '1 ≤ m, n ≤ 100', 'obstacleGrid[i][j] is 0 or 1'],
  starterCode: `class Solution:
    def unique_paths_with_obstacles(self, obstacle_grid):
        pass`,
  runnerSetup: 'unique_paths_with_obstacles = Solution().unique_paths_with_obstacles',
  functionName: 'unique_paths_with_obstacles',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'One obstacle', args: [[[0,0,0],[0,1,0],[0,0,0]]], expected: 2 },
    { label: 'Right obstacle', args: [[[0,1],[0,0]]], expected: 1 },
    { label: 'Blocked', args: [[[1,0]]], expected: 0 },
  ],
  bruteHint: 'The brute-force approach recursively tries moving right or moving down from the current cell, branching into two recursive calls at each step until it falls off the grid or reaches the bottom-right corner. Since the recursion branches at up to every one of the O(m+n) moves, it explores O(2^(m+n)) paths, and the same cell (i, j) gets revisited by many different move sequences along the way. What could you cache at each cell to avoid recomputing it every time it\'s reached?',
  optimizeComplexity: { time: 'O(m·n)', space: 'O(m·n)' },
  clues: [
    {
      id: 'obstacle-zero-rule',
      question: 'The description defines a marker value for blocked cells, and recognizing what that marker means for reachability tells you how to adapt the standard grid recurrence. Cells with value 1 are obstacles. What does an obstacle mean for dp[i][j]?',
      highlight: { location: 'description', text: 'Some cells have obstacles (1 = obstacle, 0 = empty).' },
      options: [
        { label: 'dp[i][j] = dp[i-1][j] + dp[i][j-1] as usual', isCorrect: false, feedback: 'An obstacle blocks all paths through it — applying the normal recurrence would incorrectly route paths through a blocked cell.' },
        { label: 'dp[i][j] = 0, and no paths flow through it', isCorrect: true },
        { label: 'dp[i][j] = dp[i-1][j] only (skip horizontal)', isCorrect: false, feedback: 'An obstacle blocks all movement through that cell — not just horizontal movement. Both the left and top contributions must be zeroed out.' },
        { label: 'Reroute: try the next available cell in each direction', isCorrect: false, feedback: 'DP doesn\'t reroute — it counts paths through every valid cell. An obstacle simply has dp[i][j] = 0, which naturally prevents any paths from passing through it.' },
      ],
      correctFeedback: 'If obstacleGrid[i][j] == 1, set dp[i][j] = 0. No paths pass through a blocked cell, so its contribution to all downstream cells is 0.',
      wrongFeedback: [
        'If a cell is blocked, how many paths can pass through it? What does that make dp[i][j]?',
        'dp[i][j] = 0 for any obstacle cell. Since downstream cells add dp[i][j] to their counts, this zeroes out all paths that would have passed through the obstacle.',
      ],
    },
    {
      id: 'first-row-column',
      question: 'Because movement is restricted to only two directions, the grid\'s edges can only be reached one way, so boundary cells need special-case initialization rather than the general recurrence. The first row and first column can only be reached by moving right or down respectively. How do obstacles affect their initialization?',
      highlight: { location: 'description', text: 'moves only right or down' },
      options: [
        { label: 'Initialize all first-row and first-column cells to 1', isCorrect: false, feedback: 'An obstacle anywhere in the first row blocks all cells to its right — there\'s no way to bypass it since you can only move right or down. After an obstacle, all subsequent cells in that row are 0.' },
        { label: 'Set cells to 1 until an obstacle, then 0 for the rest', isCorrect: true },
        { label: 'Only the starting cell is initialized to 1', isCorrect: false, feedback: 'The starting cell is 1, but so are all reachable first-row and first-column cells before any obstacle. Stopping at the start cell undercounts reachable positions.' },
        { label: 'Initialize to 0 and let the recurrence fill them in', isCorrect: false, feedback: 'The recurrence for first-row cells only looks left (no cell above). If you initialize to 0 and try to compute from the recurrence, there\'s nothing to propagate from — you need explicit initialization.' },
      ],
      correctFeedback: 'For the first row: dp[0][j] = 1 if no obstacle in dp[0][0..j], else 0 for all cells from the obstacle onward. Same logic applies to the first column.',
      wrongFeedback: [
        'In the first row, the robot can only move right. If there\'s an obstacle at (0, 2), can (0, 3) ever be reached?',
        'An obstacle in the first row blocks all cells to its right — there\'s no detour. Set all cells after the first obstacle in that row to 0.',
      ],
    },
    {
      id: 'start-or-end-blocked',
      question: 'The description singles out the start and end corners of the grid, which are the cells most likely to break a naive recurrence if they happen to be blocked. The third test case [[1,0]] has an obstacle at the starting cell. What should you return?',
      highlight: { location: 'description', text: 'starts at the top-left' },
      options: [
        { label: 'Treat start as valid and compute normally', isCorrect: false, feedback: 'If the starting cell is blocked, the robot can\'t even begin. No paths exist — return 0 immediately.' },
        { label: '0, because no path can begin from a blocked start', isCorrect: true },
        { label: '1, because the destination might still be reachable', isCorrect: false, feedback: 'The robot starts at the top-left. If that cell is blocked, no movement is possible and no path exists — return 0 regardless of the destination.' },
        { label: 'Skip the start cell and count paths from (0,1)', isCorrect: false, feedback: 'You can\'t skip the starting position. The robot must start at (0, 0) — if it\'s blocked, the answer is 0.' },
      ],
      correctFeedback: 'If obstacleGrid[0][0] == 1, return 0 immediately. Similarly, if obstacleGrid[m-1][n-1] == 1, the destination is blocked and 0 is also correct.',
      wrongFeedback: [
        'If the starting cell has an obstacle, can the robot make any move? Does the DP need to run at all?',
        'A blocked start means dp[0][0] = 0. Every cell inherits from it — the entire table will be 0. You can short-circuit and return 0 early.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def unique_paths_with_obstacles(self, obstacle_grid):
        m, n = len(obstacle_grid), len(obstacle_grid[0])
        if obstacle_grid[0][0] == 1:
            return 0

        dp = [[0] * n for _ in range(m)]
        dp[0][0] = 1
        for i in range(m):
            for j in range(n):
                if obstacle_grid[i][j] == 1:
                    dp[i][j] = 0
                    continue
                if i == 0 and j == 0:
                    continue
                top = dp[i - 1][j] if i > 0 else 0
                left = dp[i][j - 1] if j > 0 else 0
                dp[i][j] = top + left
        return dp[m - 1][n - 1]`,
  solutionComplexity: { time: 'O(m · n)', space: 'O(m · n)' },
  solutionCaveat: 'An obstacle cell is set to <code>dp[i][j] = 0</code> and left there — it never picks up a contribution from above or to the left — which is exactly what stops any path from being counted as passing through it, since every downstream cell only ever adds in <code>0</code> from a blocked neighbor.',
  solutionExplanation: 'The number of ways to reach any open cell is the sum of the ways to reach the cell above it and the cell to its left, since those are the only two directions the robot can arrive from — an obstacle simply forces that cell\'s count to zero, which then naturally propagates forward as "zero paths pass through here" without any special-case logic elsewhere in the table. Starting <code>dp[0][0] = 1</code> only when the start itself isn\'t blocked (returning 0 immediately otherwise) anchors the whole table correctly.',
}
