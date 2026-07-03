export default {
  id: 'binary-search-tree-iterator',
  title: 'Binary Search Tree Iterator',
  difficulty: 'medium',
  description: 'Implement an iterator for a BST. <code>next()</code> returns the next smallest number; <code>hasNext()</code> returns whether more elements exist. Both operations should average O(1) time with O(h) space (h = tree height).',
  examples: [
    { input: 'BSTIterator([7,3,15,null,null,9,20]), next(), next(), hasNext(), next(), hasNext(), next(), hasNext(), next(), hasNext()', output: '[3,7,true,9,true,15,true,20,false]' },
  ],
  constraints: ['1 ≤ number of nodes ≤ 10⁵', '0 ≤ Node.val ≤ 10⁶'],
  starterCode: `class BSTIterator:
  def __init__(self, root):
      pass

  def next(self):
      pass

  def has_next(self):
      pass`,
  functionName: 'BSTIterator',
  conceptId: 'trees',
  testCases: [
    { label: 'Standard BST', args: [[[7,3,15,null,null,9,20]]], expected: [3,7,true,9,true,15,true,20,false] },
  ],
}
