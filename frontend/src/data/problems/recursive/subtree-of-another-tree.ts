export default {
  id: 'subtree-of-another-tree',
  title: 'Subtree of Another Tree',
  difficulty: 'easy',
  description: `<p>Given the roots of two binary trees <code>root</code> and <code>subRoot</code>, return <code>true</code> if there is a subtree of <code>root</code> with the same structure and node values as <code>subRoot</code> and <code>false</code> otherwise.</p>`,
  examples: [
    { input: 'root = [3,4,5,1,2], subRoot = [4,1,2]', output: 'true' },
    { input: 'root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]', output: 'false' },
  ],
  constraints: ['The number of nodes in root is in [1, 2000]', 'The number of nodes in subRoot is in [1, 1000]'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def is_subtree(root, sub_root):
  pass`,
  functionName: 'is_subtree_run',
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
def is_subtree_run(root, sub):
  return is_subtree(_build(root), _build(sub))`,
  testCases: [
    { label: 'is subtree', args: [[3,4,5,1,2],[4,1,2]], expected: true },
    { label: 'not subtree', args: [[3,4,5,1,2,null,null,null,null,0],[4,1,2]], expected: false },
  ],
}
