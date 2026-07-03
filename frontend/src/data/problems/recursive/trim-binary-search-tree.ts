export default {
  id: 'trim-binary-search-tree',
  title: 'Trim a Binary Search Tree',
  difficulty: 'medium',
  description: 'Given the root of a BST and bounds [low, high], trim the tree so that all values are in the range [low, high]. Return the root of the trimmed tree.',
  examples: [
    { input: 'root=[1,0,2], low=1, high=2', output: '[1,null,2]' },
    { input: 'root=[3,0,4,null,2,null,null,1], low=1, high=3', output: '[3,2,null,1]' },
  ],
  constraints: ['1 ≤ number of nodes ≤ 10⁴', '0 ≤ Node.val ≤ 10⁴', '0 ≤ low ≤ high ≤ 10⁴'],
  starterCode: `def trim_bst(root, low, high):
  pass`,
  functionName: 'trim_bst',
  conceptId: 'trees',
  testCases: [
    { label: 'Simple trim', args: [[1,0,2],1,2], expected: [1,null,2] },
    { label: 'Multi-level trim', args: [[3,0,4,null,2,null,null,1],1,3], expected: [3,2,null,1] },
  ],
}
