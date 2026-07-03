export default {
  id: 'integer-break',
  title: 'Integer Break',
  difficulty: 'medium',
  description: 'Given an integer <code>n</code>, break it into the sum of at least two positive integers and maximize the product of those integers. Return the maximum product.',
  examples: [
    { input: 'n = 2', output: '1', explanation: '2 = 1 + 1 → product = 1.' },
    { input: 'n = 10', output: '36', explanation: '10 = 3 + 3 + 4 → product = 36.' },
  ],
  constraints: ['2 ≤ n ≤ 58'],
  starterCode: `def integer_break(n):
  pass`,
  functionName: 'integer_break',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'n=2', args: [2], expected: 1 },
    { label: 'n=10', args: [10], expected: 36 },
    { label: 'n=4', args: [4], expected: 4 },
    { label: 'n=3', args: [3], expected: 2 },
  ],
}
