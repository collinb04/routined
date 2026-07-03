export default {
  id: 'number-of-1-bits',
  title: 'Number of 1 Bits',
  difficulty: 'easy',
  description: 'Given a positive integer <code>n</code>, return the number of set bits (1s) in its binary representation (also known as the Hamming weight).',
  examples: [
    { input: 'n = 11', output: '3', explanation: '11 in binary is 1011, which has three 1-bits.' },
    { input: 'n = 128', output: '1', explanation: '128 is 10000000, which has one 1-bit.' },
  ],
  constraints: ['1 ≤ n ≤ 2³¹ − 1'],
  starterCode: `def hammingWeight(n):
  pass`,
  functionName: 'hammingWeight',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: '11 → 3 bits', args: [11], expected: 3 },
    { label: '128 → 1 bit', args: [128], expected: 1 },
    { label: 'Max 32-bit', args: [2147483647], expected: 31 },
    { label: 'Zero bits... n=1', args: [1], expected: 1 },
  ],
}
