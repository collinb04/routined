export default {
  id: 'maximum-total-importance-roads',
  title: 'Maximum Total Importance of Roads',
  difficulty: 'medium',
  description: 'Given n cities (0-indexed) and bidirectional roads, assign values 1-n to cities (each value used once) to maximize the sum of road importances. A road\'s importance is the sum of its two city values.',
  examples: [
    { input: 'n=5, roads=[[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]', output: '43' },
    { input: 'n=5, roads=[[0,3],[2,4],[1,3]]', output: '20' },
  ],
  constraints: ['2 ≤ n ≤ 5 × 10⁴', '1 ≤ roads.length ≤ 5 × 10⁴'],
  starterCode: `def maximum_importance(n, roads):
  pass`,
  functionName: 'maximum_importance',
  conceptId: 'graphs',
  testCases: [
    { label: 'Six roads', args: [5,[[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]], expected: 43 },
    { label: 'Three roads', args: [5,[[0,3],[2,4],[1,3]]], expected: 20 },
  ],
}
