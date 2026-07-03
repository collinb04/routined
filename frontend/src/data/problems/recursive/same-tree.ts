export default {
  id: 'same-tree',
  title: 'Same Tree',
  difficulty: 'easy',
  description: `<p>Given the roots of two binary trees <code>p</code> and <code>q</code>, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.</p>`,
  examples: [
    { input: 'p = [1,2,3], q = [1,2,3]', output: 'true' },
    { input: 'p = [1,2], q = [1,null,2]', output: 'false' },
  ],
  constraints: ['The number of nodes in both trees is in [0, 100]', '-10^4 <= Node.val <= 10^4'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def is_same_tree(p, q):
  pass`,
  functionName: 'is_same_tree_run',
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
def is_same_tree_run(p, q):
  return is_same_tree(_build(p), _build(q))`,
  testCases: [
    { label: 'same', args: [[1,2,3],[1,2,3]], expected: true },
    { label: 'different structure', args: [[1,2],[1,null,2]], expected: false },
  ],
}
