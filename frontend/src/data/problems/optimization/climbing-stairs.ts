export default {
  id: 'climbing-stairs',
  title: 'Climbing Stairs',
  difficulty: 'easy',
  description: 'You are climbing a staircase with <code>n</code> steps. Each time you can climb 1 or 2 steps. Return the number of distinct ways to reach the top.',
  examples: [
    { input: 'n = 2', output: '2', explanation: '1+1 or 2.' },
    { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1.' },
  ],
  constraints: [
    '1 ≤ n ≤ 45',
  ],
  starterCode: `def climb_stairs(n):
  pass`,
  functionName: 'climb_stairs',
  conceptId: 'dynamic-programming',
  testCases: [
    { label: 'n = 2', args: [2], expected: 2 },
    { label: 'n = 3', args: [3], expected: 3 },
    { label: 'n = 5', args: [5], expected: 8 },
    { label: 'n = 1', args: [1], expected: 1 },
    { label: 'n = 10', args: [10], expected: 89 },
  ],
}
