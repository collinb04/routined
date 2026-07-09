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
  bruteHint: 'Describe collecting every node into full level lists via BFS, then keeping only the last value from each list',
  optimizeHint: 'Name the traversal order that lets you record just the last (or first) node seen at each depth directly',
  clues: [
    {
      id: 'output-structure',
      question: 'The output is values "ordered from top to bottom." What does that tell you about how to traverse the tree?',
      options: [
        { label: 'Traverse depth-first, right side only', isCorrect: false, feedback: 'Depth-first right-side traversal would miss nodes like node 5 in [1,2,3,null,5,null,4], which is visible from the right even though node 3 is to its right at a higher level. You need to process one full level at a time.' },
        { label: 'Process the tree level by level', isCorrect: true },
        { label: 'Collect all right children recursively', isCorrect: false, feedback: 'A node\'s rightmost visible node at each level is not always its right child — it is the last node at that level in BFS order. A tree with only a left subtree below a certain depth would still show that left subtree from the right.' },
        { label: 'Return the rightmost leaf path', isCorrect: false, feedback: 'The rightmost leaf path misses visible nodes that appear on the right side at levels where the rightmost branch is absent. You need the rightmost node at every level, not just along one branch.' },
      ],
      correctFeedback: 'Level-order (BFS) groups nodes by depth. The last node in each level\'s group is the one visible from the right — exactly what you need.',
      wrongFeedback: [
        'In [1,2,3,null,5,null,4], node 4 is the rightmost visible node at depth 2 — but it is the right child of node 3, not of the root. Which traversal naturally groups nodes by depth?',
        'The "right side view" means one node per depth level: whichever node is furthest right. What traversal visits exactly one full level at a time?',
      ],
    },
    {
      id: 'visible-node-rule',
      question: 'In [1,2,3,null,5,null,4], node 4 (not node 5) is visible at depth 2 even though 5 is also at that depth. Why?',
      options: [
        { label: 'Node 4 has a higher value than node 5', isCorrect: false, feedback: 'Visibility has nothing to do with node values — it depends on position. The rightmost node at each level is the one visible from the right.' },
        { label: 'Node 4 is the last (rightmost) node at its depth level', isCorrect: true },
        { label: 'Node 5 is a left child so it is always hidden', isCorrect: false, feedback: 'A left child is hidden only when there is a node at the same depth further to the right. If node 5 were the only node at its depth, it would be visible despite being a left child.' },
        { label: 'Only right children are ever visible', isCorrect: false, feedback: 'In the example [1,null,3], node 3 is a right child and is visible. But in a tree with only a left subtree below a point, the leftmost node would be the visible one. Visibility depends on being last in level order, not on being a right child.' },
      ],
      correctFeedback: 'The right side view picks the last node encountered in BFS order at each level. That is always the rightmost node at that depth, regardless of whether it is a left or right child.',
      wrongFeedback: [
        'List the nodes at depth 2 in left-to-right BFS order for [1,2,3,null,5,null,4]. Which one is last?',
        'BFS visits nodes left to right within each level. The last node seen at each level is the one a viewer on the right would see. What determines "last" in BFS?',
      ],
    },
    {
      id: 'empty-tree-edge',
      question: 'The number of nodes can be 0. What should the output be for an empty tree?',
      options: [
        { label: 'Return [null]', isCorrect: false, feedback: 'An empty tree has no nodes to see, so the output is an empty list — not a list containing null.' },
        { label: 'Return []', isCorrect: true },
        { label: 'Return [-1] as a sentinel', isCorrect: false, feedback: 'Sentinel values in the output would confuse callers. The problem returns actual node values; an empty tree simply has no visible nodes.' },
        { label: 'Raise an exception for empty input', isCorrect: false, feedback: 'The constraint explicitly allows 0 nodes. Your code must handle it gracefully by returning an empty list.' },
      ],
      correctFeedback: 'An empty tree has zero levels, so there are zero visible nodes. Returning [] immediately when root is None handles this edge case cleanly.',
      wrongFeedback: [
        'If there are no nodes, how many levels exist? How many nodes can be visible from any side?',
        'The problem guarantees 0 nodes is valid input. What is the right side view of nothing?',
      ],
    },
  ],
}
