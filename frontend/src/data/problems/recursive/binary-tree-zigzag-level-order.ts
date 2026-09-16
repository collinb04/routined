export default {
  id: 'binary-tree-zigzag-level-order',
  title: 'Binary Tree Zigzag Level Order Traversal',
  difficulty: 'medium',
  description: 'Given the root of a binary tree, return the zigzag level-order traversal: left-to-right for odd levels, right-to-left for even levels.',
  examples: [
    { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]' },
  ],
  constraints: ['0 ≤ number of nodes ≤ 2000', '-100 ≤ Node.val ≤ 100'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def zigzag_level_order(self, root):
        pass`,
  functionName: 'zigzag_level_order_run',
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
def zigzag_level_order_run(arr):
  return Solution().zigzag_level_order(_build(arr))`,
  testCases: [
    { label: 'Standard', args: [[3,9,20,null,null,15,7]], expected: [[3],[20,9],[15,7]] },
    { label: 'Single', args: [[1]], expected: [[1]] },
    { label: 'Empty', args: [null], expected: [] },
  ],
  bruteHint: 'The brute-force approach performs a standard BFS level-order traversal to collect every level left-to-right, then makes a second pass over the finished result to reverse every other level\'s list — O(n) time and O(n) space, since every node is visited once and some sublists are reversed afterward. This works, but it treats the direction flip as an afterthought correction rather than a decision made during the traversal itself. Could you fold that decision into the same BFS pass, so no separate cleanup step is needed?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'output-structure',
      question: 'Output structure often signals which traversal order can even produce it. The output is a list of lists, one per level. What traversal does that structure demand?',
      options: [
        { label: 'Depth-first search', isCorrect: false, feedback: 'DFS traverses down branches before exploring siblings — it does not naturally group nodes by level. You would need extra bookkeeping to reconstruct level boundaries.' },
        { label: 'Breadth-first search (BFS)', isCorrect: true },
        { label: 'Inorder traversal', isCorrect: false, feedback: 'Inorder (left, root, right) produces a sorted sequence for BSTs but has no natural level grouping for general binary trees.' },
        { label: 'Postorder traversal', isCorrect: false, feedback: 'Postorder processes children before parents, giving a bottom-up order with no level boundaries. BFS is the natural choice for level-grouped output.' },
      ],
      correctFeedback: 'BFS uses a queue that processes all nodes at one depth before moving to the next. That boundary is exactly what lets you collect each level into its own sublist.',
      wrongFeedback: [
        'The output requires one sublist per tree level. Which traversal visits all nodes at one depth before visiting any node at the next depth?',
        'Think about a queue. When you process a full level at once (all nodes at depth d), you naturally produce one sublist per level.',
      ],
    },
    {
      id: 'zigzag-mechanism',
      question: 'The exact wording of the problem description often pins down the precise transformation you need to apply. "Left-to-right for odd levels, right-to-left for even levels." What is the most efficient way to alternate direction?',
      highlight: { location: 'description', text: 'left-to-right for odd levels, right-to-left for even levels.' },
      options: [
        { label: 'Maintain two separate collections, one for each direction', isCorrect: false, feedback: 'Two queues do not change traversal order; BFS order is fixed. The alternation is a presentation choice on the collected values, not a traversal direction change.' },
        { label: 'Reverse every other level\'s list before appending', isCorrect: true },
        { label: 'Visit right children before left children on even levels', isCorrect: false, feedback: 'Swapping child insertion order in BFS only works for a deque-based approach. It also risks complicating the queue logic. Reversing collected sublists is simpler and equally correct.' },
        { label: 'Traverse the entire tree twice, once for each direction', isCorrect: false, feedback: 'Running BFS twice visits every node twice — O(n) extra work that accomplishes nothing a single reverse cannot. The direction alternates per level, not per full pass.' },
      ],
      correctFeedback: 'BFS always collects nodes left-to-right. Reversing every even-depth list before appending it to the result is O(level width) and keeps the queue logic unchanged.',
      wrongFeedback: [
        'You already have each level collected left-to-right from BFS. What single operation on a list turns it right-to-left?',
        'Python list reversal is O(k) where k is the level\'s size. Summed across all levels, that is O(n) total — no extra passes needed.',
      ],
    },
    {
      id: 'level-index-tracking',
      question: 'Implementation details like index tracking determine how cleanly you can apply the traversal you\'ve already chosen. To alternate zigzag direction you need to know the current level\'s index. How do you track that during BFS?',
      options: [
        { label: 'Count nodes processed so far', isCorrect: false, feedback: 'Total node count does not tell you the current level — levels have varying widths. You need a level counter, not a node counter.' },
        { label: 'Increment a level counter each time you finish a level', isCorrect: true },
        { label: 'Use node depth stored in the node itself', isCorrect: false, feedback: 'Standard TreeNode does not carry a depth field. While you could attach one, a simple level counter alongside the BFS queue is cleaner and avoids modifying the node structure.' },
        { label: 'Check how many nodes are waiting to be processed to infer the current level', isCorrect: false, feedback: 'Queue size changes as you enqueue children, making it unreliable mid-level. Snapshot the queue size at the start of each level to know how many nodes belong to that level.' },
      ],
      correctFeedback: 'Start each level by snapshotting the current queue length — that tells you exactly how many nodes belong to this level. After processing them all, increment the level counter and decide whether to reverse.',
      wrongFeedback: [
        'At the start of processing a level, the queue holds exactly the nodes for that level. How do you use that fact to process one full level at a time?',
        'Snapshot queue length = current level size. Process exactly that many nodes, collect their values, then increment the level counter before processing the next level.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def zigzag_level_order(self, root):
        if not root:
            return []
        result = []
        queue = [root]
        left_to_right = True
        while queue:
            level = []
            next_queue = []
            for node in queue:
                level.append(node.val)
                if node.left:
                    next_queue.append(node.left)
                if node.right:
                    next_queue.append(node.right)
            if not left_to_right:
                level.reverse()
            result.append(level)
            queue = next_queue
            left_to_right = not left_to_right`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'BFS always collects each level in the same left-to-right order regardless of the zigzag direction — the direction flip is applied as a single <code>reverse()</code> on the finished level list, never by changing which child gets enqueued first, since swapping enqueue order would complicate the queue logic for no benefit.',
  solutionExplanation: 'The queue naturally groups nodes by depth, one full level processed before the next begins, which is exactly the structure needed to produce one sublist per level; a level counter (here, the alternating <code>left_to_right</code> flag) tracks whether the just-collected level needs reversing before being appended to the result. Since a plain list reversal costs O(level width) and every level\'s width sums to n across the whole tree, folding the zigzag decision into the same BFS pass costs no more overall than a standard level-order traversal.',
}
