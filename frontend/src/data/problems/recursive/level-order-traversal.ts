export default {
  id: 'level-order-traversal',
  title: 'Binary Tree Level Order Traversal',
  difficulty: 'medium',
  description: 'Given the root of a binary tree, return the level-order traversal of its node values as a list of lists (one list per level, left to right).',
  examples: [
    { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
    { input: 'root = [1]', output: '[[1]]' },
  ],
  constraints: [
    '0 ≤ number of nodes ≤ 2000',
    '-1000 ≤ Node.val ≤ 1000',
  ],
  starterCode: `from collections import deque

class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def level_order(root):
  # Hint: use a queue; process all nodes at current depth before moving on
  pass`,
  functionName: 'level_order',
  conceptId: 'bfs-dfs',
  runnerSetup: `
from collections import deque as _deque

def _build_tree(vals):
  if not vals or vals[0] is None: return None
  root = TreeNode(vals[0])
  q = _deque([root])
  i = 1
  while q and i < len(vals):
      node = q.popleft()
      if i < len(vals) and vals[i] is not None:
          node.left = TreeNode(vals[i])
          q.append(node.left)
      i += 1
      if i < len(vals) and vals[i] is not None:
          node.right = TreeNode(vals[i])
          q.append(node.right)
      i += 1
  return root

_orig_level_order = level_order
def level_order(vals):
  return _orig_level_order(_build_tree(vals))
`,
  testCases: [
    { label: 'Three levels', args: [[3,9,20,null,null,15,7]], expected: [[3],[9,20],[15,7]] },
    { label: 'Single node', args: [[1]], expected: [[1]] },
    { label: 'Empty', args: [[]], expected: [] },
    { label: 'Two levels', args: [[1,2,3]], expected: [[1],[2,3]] },
  ],
}
