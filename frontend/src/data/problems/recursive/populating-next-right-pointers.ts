export default {
  id: 'populating-next-right-pointers',
  title: 'Populating Next Right Pointers in Each Node',
  difficulty: 'medium',
  description: 'Given a perfect binary tree, populate each node\'s <code>next</code> pointer to the next node on the same level. The rightmost node\'s <code>next</code> should be null.',
  examples: [
    { input: 'root = [1,2,3,4,5,6,7]', output: '[1,#,2,3,#,4,5,6,7,#]', explanation: 'Each level connects left to right, ending with #.' },
  ],
  constraints: ['Tree is perfect: all leaves at the same depth, all interior nodes have two children', '0 ≤ Node.val ≤ 100'],
  starterCode: `def connect(root):
  pass`,
  functionName: 'connect',
  conceptId: 'trees',
  testCases: [
    { label: 'Perfect tree', args: [[1,2,3,4,5,6,7]], expected: [1,null,2,3,null,4,5,6,7,null] },
  ],
}
