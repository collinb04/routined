export default {
  id: 'minimum-cost-tree-leaf-values',
  title: 'Minimum Cost Tree From Leaf Values',
  difficulty: 'medium',
  description: 'Given an array of leaf values, build a non-leaf tree where each non-leaf node holds the product of the max leaves in its left and right subtrees. Return the minimum sum of all non-leaf nodes.',
  examples: [
    { input: 'arr = [6,2,4]', output: '32', explanation: 'Two possible trees: 6*(2*4)=48+24 vs (6*2)*4=32.' },
  ],
  constraints: ['2 ≤ arr.length ≤ 40', '1 ≤ arr[i] ≤ 15'],
  starterCode: `def mct_from_leaf_values(arr):
  pass`,
  functionName: 'mct_from_leaf_values',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Three leaves', args: [[6,2,4]], expected: 32 },
    { label: 'Two leaves', args: [[3,5]], expected: 15 },
  ],
}
