export default {
  id: 'fibonacci-number',
  title: 'Fibonacci Number',
  difficulty: 'easy',
  description: 'The Fibonacci sequence is defined as: <code>F(0) = 0</code>, <code>F(1) = 1</code>, and <code>F(n) = F(n-1) + F(n-2)</code>. Given <code>n</code>, return <code>F(n)</code>. Implement it recursively.',
  examples: [
    { input: 'n = 4', output: '3', explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3.' },
    { input: 'n = 10', output: '55' },
  ],
  constraints: ['0 ≤ n ≤ 30'],
  starterCode: `def fib(n):
  # Base cases: fib(0) = 0, fib(1) = 1
  pass`,
  functionName: 'fib',
  conceptId: 'recursion',
  testCases: [
    { label: 'F(0)', args: [0], expected: 0 },
    { label: 'F(1)', args: [1], expected: 1 },
    { label: 'F(4)', args: [4], expected: 3 },
    { label: 'F(10)', args: [10], expected: 55 },
    { label: 'F(20)', args: [20], expected: 6765 },
  ],
}
