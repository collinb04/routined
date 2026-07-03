export default {
  id: 'path-with-max-probability',
  title: 'Path with Maximum Probability',
  difficulty: 'medium',
  description: 'You are given an undirected weighted graph. Find the path from <code>start</code> to <code>end</code> with the maximum probability. Return 0 if no path exists.',
  examples: [
    { input: 'n=3, edges=[[0,1],[1,2],[0,2]], succProb=[0.5,0.5,0.2], start=0, end=2', output: '0.25', explanation: '0→1→2 has probability 0.5*0.5=0.25, better than 0→2=0.2.' },
  ],
  constraints: ['2 ≤ n ≤ 10⁴', '0 ≤ start, end < n', '0 < succProb[i] ≤ 1'],
  starterCode: `def max_probability(n, edges, succ_prob, start, end):
  pass`,
  functionName: 'max_probability',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: 'Path via 1', args: [3,[[0,1],[1,2],[0,2]],[0.5,0.5,0.2],0,2], expected: 0.25 },
    { label: 'Direct path better', args: [3,[[0,1],[1,2],[0,2]],[0.5,0.5,0.3],0,2], expected: 0.3 },
  ],
}
