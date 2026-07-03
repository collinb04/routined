export default {
  id: 'domino-tromino-tiling',
  title: 'Domino and Tromino Tiling',
  difficulty: 'medium',
  description: 'You have 2×1 dominoes and L-shaped trominoes. Fill a 2×n board with these pieces. Return the number of ways modulo 10⁹ + 7.',
  examples: [
    { input: 'n = 3', output: '5', explanation: 'Five different ways to tile a 2×3 board.' },
    { input: 'n = 1', output: '1' },
  ],
  constraints: ['1 ≤ n ≤ 1000'],
  starterCode: `def num_tilings(n):
  pass`,
  functionName: 'num_tilings',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'n=3', args: [3], expected: 5 },
    { label: 'n=1', args: [1], expected: 1 },
    { label: 'n=2', args: [2], expected: 2 },
    { label: 'n=4', args: [4], expected: 11 },
  ],
}
