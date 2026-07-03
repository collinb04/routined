export default {
  id: 'sum-of-two-integers',
  title: 'Sum of Two Integers',
  difficulty: 'medium',
  description: 'Given two integers <code>a</code> and <code>b</code>, return their sum without using the operators <code>+</code> or <code>-</code>. Use bit manipulation instead.',
  examples: [
    { input: 'a = 1, b = 2', output: '3' },
    { input: 'a = 2, b = 3', output: '5' },
  ],
  constraints: ['-1000 ≤ a, b ≤ 1000'],
  starterCode: `def get_sum(a, b):
  pass`,
  functionName: 'get_sum',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: '1+2', args: [1,2], expected: 3 },
    { label: '2+3', args: [2,3], expected: 5 },
    { label: 'Negatives', args: [-1,-2], expected: -3 },
    { label: 'One negative', args: [5,-3], expected: 2 },
  ],
}
