export default {
  id: 'construct-tree-from-preorder-inorder',
  title: 'Construct Tree from Preorder and Inorder',
  difficulty: 'medium',
  description: `<p>Given two integer arrays <code>preorder</code> and <code>inorder</code> where <code>preorder</code> is the preorder traversal of a binary tree and <code>inorder</code> is the inorder traversal of the same tree, construct and return the binary tree.</p>`,
  examples: [
    { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]' },
    { input: 'preorder = [-1], inorder = [-1]', output: '[-1]' },
  ],
  constraints: ['1 <= preorder.length <= 3000', 'inorder.length == preorder.length', 'All values are unique'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def build_tree(preorder, inorder):
  pass`,
  functionName: 'build_tree_run',
  conceptId: 'trees',
  runnerSetup: `from collections import deque
def _level(root):
  if not root: return []
  q = deque([root]); res = []
  while q:
      node = q.popleft()
      if node: res.append(node.val); q.append(node.left); q.append(node.right)
      else: res.append(None)
  while res and res[-1] is None: res.pop()
  return res
def build_tree_run(pre, ino):
  return _level(build_tree(pre, ino))`,
  testCases: [
    { label: 'classic', args: [[3,9,20,15,7],[9,3,15,20,7]], expected: [3,9,20,null,null,15,7] },
    { label: 'single', args: [[-1],[-1]], expected: [-1] },
  ],
}
