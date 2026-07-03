export default {
  id: 'binary-tree-right-side-view',
  title: 'Binary Tree Right Side View',
  difficulty: 'medium',
  description: `<p>Given the root of a binary tree, imagine yourself standing on the right side of it. Return the values of the nodes you can see ordered from top to bottom.</p>`,
  examples: [
    { input: 'root = [1,2,3,null,5,null,4]', output: '[1,3,4]' },
    { input: 'root = [1,null,3]', output: '[1,3]' },
  ],
  constraints: ['The number of nodes is in [0, 100]', '-100 <= Node.val <= 100'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def right_side_view(root):
  pass`,
  functionName: 'right_side_view_run',
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
def right_side_view_run(arr):
  return right_side_view(_build(arr))`,
  testCases: [
    { label: '[1,2,3,null,5,null,4]', args: [[1,2,3,null,5,null,4]], expected: [1,3,4] },
    { label: '[1,null,3]', args: [[1,null,3]], expected: [1,3] },
  ],
}
