export default {
  id: 'max-depth-tree',
  title: 'Maximum Depth of Binary Tree',
  difficulty: 'easy',
  description: 'Given a list of node values in level-order (with <code>None</code> for missing nodes), return the maximum depth of the binary tree.',
  examples: [
    { input: 'level_order = [3, 9, 20, None, None, 15, 7]', output: '3' },
    { input: 'level_order = [1, None, 2]', output: '2' },
  ],
  constraints: [
    '0 ≤ number of nodes ≤ 10⁴',
    '-100 ≤ Node.val ≤ 100',
  ],
  starterCode: `def max_depth(level_order):
  # level_order is a list like [3, 9, 20, None, None, 15, 7]
  # Build the tree and find max depth
  pass`,
  functionName: 'max_depth',
  conceptId: 'trees',
  testCases: [
    { label: 'Basic tree', args: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
    { label: 'Single node', args: [[1]], expected: 1 },
    { label: 'Empty tree', args: [[]], expected: 0 },
    { label: 'Left skewed', args: [[1, 2, null, 3]], expected: 3 },
  ],
}
