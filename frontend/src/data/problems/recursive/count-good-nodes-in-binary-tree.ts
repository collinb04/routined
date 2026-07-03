export default {
  id: 'count-good-nodes-in-binary-tree',
  title: 'Count Good Nodes in Binary Tree',
  difficulty: 'medium',
  description: `<p>Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X. Return the number of good nodes in the binary tree.</p>`,
  examples: [
    { input: 'root = [3,1,4,3,null,1,5]', output: '4' },
    { input: 'root = [3,3,null,4,2]', output: '3' },
  ],
  constraints: ['The number of nodes is in [1, 10^5]', '-10^4 <= Node.val <= 10^4'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def good_nodes(root):
  pass`,
  functionName: 'good_nodes_run',
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
def good_nodes_run(arr):
  return good_nodes(_build(arr))`,
  testCases: [
    { label: '[3,1,4,3,null,1,5]', args: [[3,1,4,3,null,1,5]], expected: 4 },
    { label: '[3,3,null,4,2]', args: [[3,3,null,4,2]], expected: 3 },
  ],
}
