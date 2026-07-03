export default {
  id: 'validate-binary-search-tree',
  title: 'Validate Binary Search Tree',
  difficulty: 'medium',
  description: `<p>Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as: the left subtree of a node contains only nodes with keys less than the node's key, the right subtree contains only nodes with keys greater than the node's key, and both subtrees must also be binary search trees.</p>`,
  examples: [
    { input: 'root = [2,1,3]', output: 'true' },
    { input: 'root = [5,1,4,null,null,3,6]', output: 'false (4 is in right subtree of 5)' },
  ],
  constraints: ['The number of nodes is in [1, 10^4]', '-2^31 <= Node.val <= 2^31 - 1'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def is_valid_bst(root):
  pass`,
  functionName: 'is_valid_bst_run',
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
def is_valid_bst_run(arr):
  return is_valid_bst(_build(arr))`,
  testCases: [
    { label: 'valid', args: [[2,1,3]], expected: true },
    { label: 'invalid', args: [[5,1,4,null,null,3,6]], expected: false },
  ],
}
