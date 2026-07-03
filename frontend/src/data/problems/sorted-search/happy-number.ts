export default {
  id: 'happy-number',
  title: 'Happy Number',
  difficulty: 'easy',
  description: 'A number is "happy" if repeatedly replacing it with the sum of the squares of its digits eventually reaches 1. Return <code>true</code> if <code>n</code> is a happy number, <code>false</code> otherwise.',
  examples: [
    { input: 'n = 19', output: 'true', explanation: '1² + 9² = 82 → 68 → 100 → 1.' },
    { input: 'n = 2', output: 'false', explanation: 'Enters a cycle that never reaches 1.' },
  ],
  constraints: ['1 ≤ n ≤ 2³¹ − 1'],
  starterCode: `def is_happy(n):
  pass`,
  functionName: 'is_happy',
  conceptId: 'math-geometry',
  testCases: [
    { label: '19 is happy', args: [19], expected: true },
    { label: '2 is not happy', args: [2], expected: false },
    { label: '1 is happy', args: [1], expected: true },
    { label: '7 is happy', args: [7], expected: true },
    { label: '4 is not happy', args: [4], expected: false },
  ],
}
