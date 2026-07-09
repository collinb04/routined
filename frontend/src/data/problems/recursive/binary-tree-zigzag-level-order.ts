export default {
  id: 'binary-tree-zigzag-level-order',
  title: 'Binary Tree Zigzag Level Order Traversal',
  difficulty: 'medium',
  description: 'Given the root of a binary tree, return the zigzag level-order traversal: left-to-right for odd levels, right-to-left for even levels.',
  examples: [
    { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]' },
  ],
  constraints: ['0 ≤ number of nodes ≤ 2000', '-100 ≤ Node.val ≤ 100'],
  starterCode: `def zigzag_level_order(root):
  pass`,
  functionName: 'zigzag_level_order',
  conceptId: 'trees',
  testCases: [
    { label: 'Standard', args: [[3,9,20,null,null,15,7]], expected: [[3],[20,9],[15,7]] },
    { label: 'Single', args: [[1]], expected: [[1]] },
    { label: 'Empty', args: [null], expected: [] },
  ],
  bruteHint: 'Describe doing a standard level-order traversal first, then making a second pass to reverse every other level',
  optimizeHint: 'Name the way to produce each zigzag level in the correct order during the same traversal pass',
  clues: [
    {
      id: 'output-structure',
      question: 'The output is a list of lists, one per level. What traversal does that structure demand?',
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
      question: '"Left-to-right for odd levels, right-to-left for even levels." What is the most efficient way to alternate direction?',
      options: [
        { label: 'Use two queues — one for each direction', isCorrect: false, feedback: 'Two queues do not change traversal order; BFS order is fixed. The alternation is a presentation choice on the collected values, not a traversal direction change.' },
        { label: 'Reverse every other level\'s list before appending', isCorrect: true },
        { label: 'Visit right children before left children on even levels', isCorrect: false, feedback: 'Swapping child insertion order in BFS only works for a deque-based approach. It also risks complicating the queue logic. Reversing collected sublists is simpler and equally correct.' },
        { label: 'Run BFS twice — once in each direction', isCorrect: false, feedback: 'Running BFS twice visits every node twice — O(n) extra work that accomplishes nothing a single reverse cannot. The direction alternates per level, not per full pass.' },
      ],
      correctFeedback: 'BFS always collects nodes left-to-right. Reversing every even-depth list before appending it to the result is O(level width) and keeps the queue logic unchanged.',
      wrongFeedback: [
        'You already have each level collected left-to-right from BFS. What single operation on a list turns it right-to-left?',
        'Python list reversal is O(k) where k is the level\'s size. Summed across all levels, that is O(n) total — no extra passes needed.',
      ],
    },
    {
      id: 'level-index-tracking',
      question: 'To alternate zigzag direction you need to know the current level\'s index. How do you track that during BFS?',
      options: [
        { label: 'Count nodes processed so far', isCorrect: false, feedback: 'Total node count does not tell you the current level — levels have varying widths. You need a level counter, not a node counter.' },
        { label: 'Increment a level counter each time you finish a level', isCorrect: true },
        { label: 'Use node depth stored in the node itself', isCorrect: false, feedback: 'Standard TreeNode does not carry a depth field. While you could attach one, a simple level counter alongside the BFS queue is cleaner and avoids modifying the node structure.' },
        { label: 'Check the queue size to infer the current level', isCorrect: false, feedback: 'Queue size changes as you enqueue children, making it unreliable mid-level. Snapshot the queue size at the start of each level to know how many nodes belong to that level.' },
      ],
      correctFeedback: 'Start each level by snapshotting the current queue length — that tells you exactly how many nodes belong to this level. After processing them all, increment the level counter and decide whether to reverse.',
      wrongFeedback: [
        'At the start of processing a level, the queue holds exactly the nodes for that level. How do you use that fact to process one full level at a time?',
        'Snapshot queue length = current level size. Process exactly that many nodes, collect their values, then increment the level counter before processing the next level.',
      ],
    },
  ],
}
