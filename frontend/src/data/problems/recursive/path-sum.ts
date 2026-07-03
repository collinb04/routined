export default {
  id: 'path-sum',
  title: 'Path Sum',
  difficulty: 'easy',
  description: 'Given the root of a binary tree and an integer <code>targetSum</code>, return <code>true</code> if the tree has a root-to-leaf path such that the sum of all values along the path equals <code>targetSum</code>.',
  examples: [
    { input: 'root=[5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum=22', output: 'true', explanation: 'Path 5→4→11→2 has sum 22.' },
    { input: 'root=[1,2,3], targetSum=5', output: 'false' },
  ],
  constraints: ['0 ≤ number of nodes ≤ 5000', '-1000 ≤ Node.val ≤ 1000', '-1000 ≤ targetSum ≤ 1000'],
  starterCode: `def has_path_sum(root, target_sum):
  pass`,
  functionName: 'has_path_sum',
  conceptId: 'trees',
  testCases: [
    { label: 'Path exists', args: [[5,4,8,11,null,13,4,7,2,null,null,null,1],22], expected: true },
    { label: 'No path', args: [[1,2,3],5], expected: false },
    { label: 'Empty tree', args: [null,0], expected: false },
  ],
}
