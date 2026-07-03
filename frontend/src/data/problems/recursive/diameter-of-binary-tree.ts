export default {
  id: 'diameter-of-binary-tree',
  title: 'Diameter of Binary Tree',
  difficulty: 'easy',
  description: `<p>Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes. This path may or may not pass through the root.</p>`,
  examples: [
    { input: 'root = [1,2,3,4,5]', output: '3 (path: 4→2→1→3)' },
    { input: 'root = [1,2]', output: '1' },
  ],
  constraints: ['The number of nodes is in [1, 10^4]', '-100 <= Node.val <= 100'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def diameter_of_binary_tree(root):
  pass`,
  functionName: 'diameter_of_binary_tree_run',
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
def diameter_of_binary_tree_run(arr):
  return diameter_of_binary_tree(_build(arr))`,
  testCases: [
    { label: '[1,2,3,4,5]', args: [[1,2,3,4,5]], expected: 3 },
    { label: '[1,2]', args: [[1,2]], expected: 1 },
  ],
}
