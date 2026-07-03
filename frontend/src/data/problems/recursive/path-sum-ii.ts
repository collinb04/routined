export default {
  id: 'path-sum-ii',
  title: 'Path Sum II',
  difficulty: 'medium',
  description: 'Given the root of a binary tree and integer <code>targetSum</code>, return all root-to-leaf paths where the sum of node values equals <code>targetSum</code>.',
  examples: [
    { input: 'root=[5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum=22', output: '[[5,4,11,2],[5,8,4,5]]' },
  ],
  constraints: ['0 ≤ number of nodes ≤ 5000', '-1000 ≤ Node.val, targetSum ≤ 1000'],
  starterCode: `def path_sum(root, target_sum):
  pass`,
  functionName: 'path_sum',
  conceptId: 'trees',
  testCases: [
    { label: 'Two paths', args: [[5,4,8,11,null,13,4,7,2,null,null,5,1],22], expected: [[5,4,11,2],[5,8,4,5]] },
    { label: 'No paths', args: [[1,2],5], expected: [] },
  ],
}
