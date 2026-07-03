export default {
  id: 'binary-tree-maximum-path-sum',
  title: 'Binary Tree Maximum Path Sum',
  difficulty: 'hard',
  description: `<p>A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. The path sum is the sum of the nodes' values in the path.</p><p>Given the root of a binary tree, return the maximum path sum of any non-empty path.</p>`,
  examples: [
    { input: 'root = [1,2,3]', output: '6 (2→1→3)' },
    { input: 'root = [-10,9,20,null,null,15,7]', output: '42 (15→20→7)' },
  ],
  constraints: ['The number of nodes is in [1, 3 * 10^4]', '-1000 <= Node.val <= 1000'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def max_path_sum(root):
  pass`,
  functionName: 'max_path_sum_run',
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
def max_path_sum_run(arr):
  return max_path_sum(_build(arr))`,
  testCases: [
    { label: '[1,2,3]', args: [[1,2,3]], expected: 6 },
    { label: '[-10,9,20,null,null,15,7]', args: [[-10,9,20,null,null,15,7]], expected: 42 },
  ],
}
