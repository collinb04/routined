export default {
  id: 'combinations',
  title: 'Combinations',
  difficulty: 'medium',
  description: 'Given two integers <code>n</code> and <code>k</code>, return all possible combinations of <code>k</code> numbers chosen from the range [1, n]. Return the answer in any order.',
  examples: [
    { input: 'n=4, k=2', output: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]' },
    { input: 'n=1, k=1', output: '[[1]]' },
  ],
  constraints: ['1 ≤ n ≤ 20', '1 ≤ k ≤ n'],
  starterCode: `def combine(n, k):
  pass`,
  functionName: 'combine',
  conceptId: 'backtracking',
  testCases: [
    { label: 'n=4,k=2', args: [4,2], expected: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]] },
    { label: 'n=1,k=1', args: [1,1], expected: [[1]] },
  ],
}
