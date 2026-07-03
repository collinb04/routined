export default {
  id: 'count-complete-tree-nodes',
  title: 'Count Complete Tree Nodes',
  difficulty: 'easy',
  description: 'Given the root of a complete binary tree, count the number of nodes. A complete binary tree has all levels fully filled except possibly the last, which is filled from left to right. Achieve O(log²n) time.',
  examples: [
    { input: 'root = [1,2,3,4,5,6]', output: '6' },
    { input: 'root = []', output: '0' },
  ],
  constraints: ['0 ≤ number of nodes ≤ 5 × 10⁴', '0 ≤ Node.val ≤ 5 × 10⁴'],
  starterCode: `def count_nodes(root):
  pass`,
  functionName: 'count_nodes',
  conceptId: 'trees',
  testCases: [
    { label: 'Six nodes', args: [[1,2,3,4,5,6]], expected: 6 },
    { label: 'Empty', args: [null], expected: 0 },
    { label: 'One node', args: [[1]], expected: 1 },
  ],
}
