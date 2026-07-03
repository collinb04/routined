export default {
  id: 'kth-smallest-element-in-bst',
  title: 'Kth Smallest Element in a BST',
  difficulty: 'medium',
  description: `<p>Given the root of a binary search tree and an integer <code>k</code>, return the <code>k</code>th smallest value (1-indexed) of all the values of the nodes in the tree.</p>`,
  examples: [
    { input: 'root = [3,1,4,null,2], k = 1', output: '1' },
    { input: 'root = [5,3,6,2,4,null,null,1], k = 3', output: '3' },
  ],
  constraints: ['The number of nodes is n', '1 <= k <= n <= 10^4', '0 <= Node.val <= 10^4'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def kth_smallest(root, k):
  pass`,
  functionName: 'kth_smallest_run',
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
def kth_smallest_run(arr, k):
  return kth_smallest(_build(arr), k)`,
  testCases: [
    { label: 'k=1', args: [[3,1,4,null,2], 1], expected: 1 },
    { label: 'k=3', args: [[5,3,6,2,4,null,null,1], 3], expected: 3 },
  ],
}
