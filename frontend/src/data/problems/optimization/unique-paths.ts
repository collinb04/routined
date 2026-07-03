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
}
