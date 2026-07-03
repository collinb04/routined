export default {
  id: 'symmetric-tree',
  title: 'Symmetric Tree',
  difficulty: 'easy',
  description: 'Given the root of a binary tree, check whether it is a mirror of itself (symmetric around its center).',
  examples: [
    { input: 'root = [1,2,2,3,4,4,3]', output: 'true' },
    { input: 'root = [1,2,2,null,3,null,3]', output: 'false' },
  ],
  constraints: ['1 ≤ number of nodes ≤ 1000', '-100 ≤ Node.val ≤ 100'],
  starterCode: `def is_symmetric(root):
  pass`,
  functionName: 'is_symmetric',
  conceptId: 'trees',
  testCases: [
    { label: 'Symmetric', args: [[1,2,2,3,4,4,3]], expected: true },
    { label: 'Not symmetric', args: [[1,2,2,null,3,null,3]], expected: false },
    { label: 'Single node', args: [[1]], expected: true },
  ],
}
