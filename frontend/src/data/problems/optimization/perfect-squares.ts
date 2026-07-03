export default {
  id: 'perfect-squares',
  title: 'Perfect Squares',
  difficulty: 'medium',
  description: 'Given an integer <code>n</code>, return the minimum number of perfect squares (1, 4, 9, 16, ...) that sum to <code>n</code>.',
  examples: [
    { input: 'n = 12', output: '3', explanation: '12 = 4 + 4 + 4.' },
    { input: 'n = 13', output: '2', explanation: '13 = 4 + 9.' },
  ],
  constraints: ['1 ≤ n ≤ 10⁴'],
  starterCode: `def num_squares(n):
  pass`,
  functionName: 'num_squares',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'n=12', args: [12], expected: 3 },
    { label: 'n=13', args: [13], expected: 2 },
    { label: 'Perfect square', args: [4], expected: 1 },
    { label: 'n=1', args: [1], expected: 1 },
  ],
}
