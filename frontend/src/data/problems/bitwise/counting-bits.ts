export default {
  id: 'counting-bits',
  title: 'Counting Bits',
  difficulty: 'easy',
  description: 'Given an integer <code>n</code>, return an array <code>ans</code> of length <code>n + 1</code> such that for each <code>i</code> (0 ≤ i ≤ n), <code>ans[i]</code> is the number of 1-bits in the binary representation of <code>i</code>.',
  examples: [
    { input: 'n = 2', output: '[0,1,1]', explanation: '0→0, 1→1, 2→10.' },
    { input: 'n = 5', output: '[0,1,1,2,1,2]', explanation: '0→0, 1→1, 2→1, 3→2, 4→1, 5→2.' },
  ],
  constraints: ['0 ≤ n ≤ 10⁵', 'Must solve in O(n) time and O(1) extra space (excluding output)'],
  starterCode: `def count_bits(n):
  pass`,
  functionName: 'count_bits',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: 'n=2', args: [2], expected: [0,1,1] },
    { label: 'n=5', args: [5], expected: [0,1,1,2,1,2] },
    { label: 'n=0', args: [0], expected: [0] },
    { label: 'n=4', args: [4], expected: [0,1,1,2,1] },
  ],
}
