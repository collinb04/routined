export default {
  id: 'invert-binary-tree',
  title: 'Invert Binary Tree',
  difficulty: 'easy',
  description: `<p>Given the root of a binary tree, invert the tree (mirror it), and return its root.</p>`,
  examples: [
    { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
    { input: 'root = [2,1,3]', output: '[2,3,1]' },
  ],
  constraints: ['The number of nodes is in [0, 100]', '-100 <= Node.val <= 100'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def invert_tree(root):
  pass`,
  functionName: 'invert_tree_run',
  conceptId: 'trees',
  runnerSetup: `from collections import deque
def _build(arr):
  if not arr or arr[0] is None: return None
  root = TreeNode(arr[0]); q = deque([root]); i = 1
  while q and i < len(arr):
      node = q.popleft()
      if i < len(arr) and arr[i] is not None:
          node.left = TreeNode(arr[i]); q.append(node.left)
      i += 1
      if i < len(arr) and arr[i] is not None:
          node.right = TreeNode(arr[i]); q.append(node.right)
      i += 1
  return root
def _level(root):
  if not root: return []
  q = deque([root]); res = []
  while q:
      node = q.popleft()
      if node: res.append(node.val); q.append(node.left); q.append(node.right)
      else: res.append(None)
  while res and res[-1] is None: res.pop()
  return res
def invert_tree_run(arr):
  return _level(invert_tree(_build(arr)))`,
  testCases: [
    { label: '[4,2,7,1,3,6,9]', args: [[4,2,7,1,3,6,9]], expected: [4,7,2,9,6,3,1] },
    { label: '[2,1,3]', args: [[2,1,3]], expected: [2,3,1] },
  ],
}
