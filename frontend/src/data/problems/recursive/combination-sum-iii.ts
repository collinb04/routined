export default {
  id: 'combination-sum-iii',
  title: 'Combination Sum III',
  difficulty: 'medium',
  description: 'Find all valid combinations of <code>k</code> numbers that sum up to <code>n</code> using only numbers 1-9, where each number is used at most once. Return all combinations in sorted order.',
  examples: [
    { input: 'k=3, n=7', output: '[[1,2,4]]', explanation: '1+2+4=7 is the only valid combination.' },
    { input: 'k=3, n=9', output: '[[1,2,6],[1,3,5],[2,3,4]]' },
  ],
  constraints: ['2 ≤ k ≤ 9', '1 ≤ n ≤ 60'],
  starterCode: `def combination_sum3(k, n):
  pass`,
  functionName: 'combination_sum3',
  conceptId: 'backtracking',
  testCases: [
    { label: 'k=3, n=7', args: [3,7], expected: [[1,2,4]] },
    { label: 'k=3, n=9', args: [3,9], expected: [[1,2,6],[1,3,5],[2,3,4]] },
    { label: 'Impossible', args: [3,1], expected: [] },
  ],
}
