export default {
  id: 'house-robber-iii',
  title: 'House Robber III',
  difficulty: 'medium',
  description: 'The thief has found a new neighborhood structured as a binary tree. Adjacent nodes cannot both be robbed. Return the maximum amount that can be robbed.',
  examples: [
    { input: 'root = [3,2,3,null,3,null,1]', output: '7', explanation: 'Rob root (3) and leaves (3+1).' },
    { input: 'root = [3,4,5,1,3,null,1]', output: '9', explanation: 'Rob 4+5=9.' },
  ],
  constraints: ['The number of nodes is in the range [1, 10⁴]', '0 ≤ Node.val ≤ 10⁴'],
  starterCode: `def rob(root):
  pass`,
  functionName: 'rob',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Depth 3', args: [[3,2,3,null,3,null,1]], expected: 7 },
    { label: 'Depth 3 v2', args: [[3,4,5,1,3,null,1]], expected: 9 },
  ],
}
