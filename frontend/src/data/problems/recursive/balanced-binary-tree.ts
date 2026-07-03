export default {
  id: 'balanced-binary-tree',
  title: 'Balanced Binary Tree',
  difficulty: 'easy',
  description: `<p>Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.</p>`,
  examples: [
    { input: 'root = [3,9,20,null,null,15,7]', output: 'true' },
    { input: 'root = [1,2,2,3,3,null,null,4,4]', output: 'false' },
  ],
  constraints: ['The number of nodes is in [0, 5000]', '-10^4 <= Node.val <= 10^4'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def is_balanced(root):
  pass`,
  functionName: 'is_balanced_run',
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
def is_balanced_run(arr):
  return is_balanced(_build(arr))`,
  testCases: [
    { label: 'balanced', args: [[3,9,20,null,null,15,7]], expected: true },
    { label: 'unbalanced', args: [[1,2,2,3,3,null,null,4,4]], expected: false },
  ],
}
