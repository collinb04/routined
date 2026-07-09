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
  bruteHint: 'Describe traversing the entire tree once per depth level to collect the values at that depth, and why repeating a full traversal for every level is wasteful',
  optimizeHint: 'Name the single-pass traversal order and data structure that naturally groups nodes level by level without revisiting the tree',
  clues: [
    {
      id: 'output-structure',
      question: 'The output is a list of lists, not a flat list. What does the nested structure require you to track?',
      options: [
        { label: 'The total number of nodes processed', isCorrect: false, feedback: 'Total node count tells you when to stop, but not which level each node belongs to. The nested output requires grouping nodes by their depth — a count alone cannot do that.' },
        { label: 'Which level (depth) each node belongs to', isCorrect: true },
        { label: 'The parent of each node', isCorrect: false, feedback: 'Parent references help navigate upward in the tree, but BFS already gives you natural level grouping without them. The key is knowing when one level ends and the next begins.' },
        { label: 'Node values in sorted order per level', isCorrect: false, feedback: 'The output requires left-to-right order within each level, not sorted order. Left-to-right order is naturally preserved by a queue (FIFO) — no sorting needed.' },
      ],
      correctFeedback: 'The output [[3],[9,20],[15,7]] groups nodes by depth. During BFS, you need to know when you have finished all nodes at the current level and are moving to the next — typically by snapshotting the queue size at the start of each level.',
      wrongFeedback: [
        'A flat BFS would give [3,9,20,15,7]. To produce [[3],[9,20],[15,7]], you need to group by level. How do you know when one level ends and the next begins?',
        'Before processing each level, snapshot the queue size. That count is exactly how many nodes belong to the current level — process that many, then start a new sublist.',
      ],
    },
    {
      id: 'queue-vs-stack',
      question: 'Level-order traversal visits all nodes at depth d before any nodes at depth d+1. What data structure enforces this ordering?',
      options: [
        { label: 'A stack (LIFO)', isCorrect: false, feedback: 'A stack processes the most recently added item first — that is depth-first, not breadth-first. Using a stack would visit a node\'s children before its siblings, giving DFS order rather than level order.' },
        { label: 'A queue (FIFO)', isCorrect: true },
        { label: 'A sorted set ordered by node value', isCorrect: false, feedback: 'Sorting by value would process nodes in value order, not level order. A node with a small value might be deep in the tree and should not be processed before shallower nodes with larger values.' },
        { label: 'A priority queue (min-heap)', isCorrect: false, feedback: 'A min-heap would process nodes by value priority, not by level. Level-order requires FIFO ordering — nodes added to the queue first (shallower nodes) must be processed first.' },
      ],
      correctFeedback: 'A FIFO queue ensures that nodes at level d are all processed before any level-d+1 nodes are reached — because level-d+1 nodes are enqueued after all level-d nodes are already in the queue.',
      wrongFeedback: [
        'If you enqueue both children of every node as you process it, what processing order guarantees that all nodes at the current level finish before their children are processed?',
        'FIFO: the first items enqueued are the first processed. All level-d nodes enter the queue before any level-d+1 nodes, so they are all processed first.',
      ],
    },
    {
      id: 'level-boundary',
      question: 'How do you know how many nodes to process before starting the next level\'s sublist?',
      options: [
        { label: 'Process nodes until you find a null separator', isCorrect: false, feedback: 'Null separators (enqueuing None as a level delimiter) is one approach but requires extra logic to skip null nodes and avoid enqueuing their children. Snapshotting the queue size at level start is cleaner.' },
        { label: 'Snapshot len(queue) before processing each level', isCorrect: true },
        { label: 'Count all non-null children of nodes at the previous level', isCorrect: false, feedback: 'Counting children before processing the level requires an extra pass. Snapshotting the queue length at the start of each level gives you the exact count with no extra work — the queue already holds exactly the current level\'s nodes.' },
        { label: 'Track node depth as an attribute', isCorrect: false, feedback: 'Storing depth per node works but uses O(n) extra space. The queue snapshot approach needs O(1) extra per level — just the integer snapshot of the queue length.' },
      ],
      correctFeedback: 'At the start of each level: level_size = len(queue). Process exactly level_size nodes, collecting their values into a sublist, while enqueuing their children. When level_size nodes are done, the sublist is complete.',
      wrongFeedback: [
        'When you start processing a level, the queue contains exactly the nodes for that level. How do you know how many that is?',
        'len(queue) before you start popping a level tells you exactly how many nodes belong to this level. Loop that many times, then append the sublist and move on.',
      ],
    },
    {
      id: 'empty-tree',
      question: '0 nodes is allowed. What should your function return for an empty tree, and where should you check?',
      options: [
        { label: 'Return [[]] — one empty level', isCorrect: false, feedback: '[[]] means one level with no nodes — that is not how an empty tree is represented. An empty tree has no levels at all, so the output is [] (an empty list of lists), not [[]].' },
        { label: 'Return [] and check if root is None before entering the loop', isCorrect: true },
        { label: 'Return None — the tree is empty', isCorrect: false, feedback: 'The output type is a list of lists. None is not a valid return — the caller expects an empty list [] when there are no nodes.' },
        { label: 'The loop handles it automatically — no check needed', isCorrect: false, feedback: 'If root is None and you try to enqueue it or access root.val, you get an AttributeError. An explicit guard at the top prevents any code from running on a null root.' },
      ],
      correctFeedback: 'if not root: return [] at the top. Without this, deque([root]) enqueues None, and the first pop tries root.val — AttributeError. The constraint explicitly allows 0 nodes.',
      wrongFeedback: [
        'With 0 nodes, root is None. What happens if you try to initialize your queue with None and then call .val on it?',
        'Accessing None.val raises AttributeError. A single guard — if not root: return [] — handles the empty case before any loop logic runs.',
      ],
    },
  ],
}
