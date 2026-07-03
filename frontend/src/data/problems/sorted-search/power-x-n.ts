export default {
  id: 'power-x-n',
  title: 'Pow(x, n)',
  difficulty: 'medium',
  description: 'Implement <code>pow(x, n)</code>, which calculates <code>x</code> raised to the power <code>n</code>. Use fast exponentiation (O(log n)) rather than repeated multiplication.',
  examples: [
    { input: 'x = 2.0, n = 10', output: '1024.0' },
    { input: 'x = 2.1, n = 3', output: '9.261', explanation: '2.1³ = 9.261000000000001, rounded.' },
    { input: 'x = 2.0, n = -2', output: '0.25', explanation: '1/4.' },
  ],
  constraints: ['-100.0 < x < 100.0', '-2³¹ ≤ n ≤ 2³¹ − 1', 'n is an integer', 'Either x ≠ 0 or n > 0'],
  starterCode: `def my_pow(x, n):
  pass`,
  functionName: 'my_pow',
  conceptId: 'math-geometry',
  testCases: [
    { label: '2^10', args: [2.0, 10], expected: 1024.0 },
    { label: 'Negative exp', args: [2.0, -2], expected: 0.25 },
    { label: 'n=0', args: [5.0, 0], expected: 1.0 },
    { label: 'n=1', args: [3.0, 1], expected: 3.0 },
  ],
}
