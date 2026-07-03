export default {
  id: 'lowest-common-ancestor-of-bst',
  title: 'Lowest Common Ancestor of a BST',
  difficulty: 'medium',
  description: `<p>Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST. The LCA is defined as the lowest node in the tree that has both nodes as descendants (a node can be a descendant of itself).</p>`,
  examples: [
    { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6' },
    { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2' },
  ],
  constraints: ['The number of nodes is in [2, 10^5]', '-10^9 <= Node.val <= 10^9', 'All Node.val are unique'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def lowest_common_ancestor(root, p, q):
  pass`,
  functionName: 'lca_bst_run',
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
def _find(root, val):
  while root:
      if root.val == val: return root
      elif val < root.val: root = root.left
      else: root = root.right
def lca_bst_run(arr, p, q):
  root = _build(arr)
  result = lowest_common_ancestor(root, _find(root,p), _find(root,q))
  return result.val`,
  testCases: [
    { label: 'p=2,q=8', args: [[6,2,8,0,4,7,9,null,null,3,5], 2, 8], expected: 6 },
    { label: 'p=2,q=4', args: [[6,2,8,0,4,7,9,null,null,3,5], 2, 4], expected: 2 },
  ],
}
