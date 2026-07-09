export default {
  id: 'all-nodes-distance-k',
  title: 'All Nodes Distance K in Binary Tree',
  difficulty: 'medium',
  description: 'Given the root of a binary tree, a target node, and integer <code>k</code>, return all nodes at distance <code>k</code> from the target node. Answer can be in any order.',
  examples: [
    { input: 'root=[3,5,1,6,2,0,8,null,null,7,4], target=5, k=2', output: '[7,4,1]', explanation: 'Nodes 7, 4 (both in subtree) and 1 (distance 2 upward).' },
  ],
  constraints: ['1 ≤ tree nodes ≤ 500', '0 ≤ Node.val ≤ 500', '0 ≤ k ≤ 1000'],
  starterCode: `def distance_k(root, target, k):
  pass`,
  functionName: 'distance_k',
  conceptId: 'trees',
  testCases: [
    { label: 'Three nodes', args: [[3,5,1,6,2,0,8,null,null,7,4],5,2], expected: [1,4,7] },
    { label: 'k=0 returns target', args: [[1],1,0], expected: [1] },
  ],
  bruteHint: 'Describe why DFS from the target using only child pointers can\'t reach nodes above it in the tree',
  optimizeHint: 'Name what you need to build first so the tree can be traversed in both directions, then the traversal that works outward from the target',
  clues: [
    {
      id: 'upward-traversal-constraint',
      question: 'The example output includes node 1, which is 2 edges above the target. What does this tell you about the traversal required?',
      options: [
        { label: 'Only traverse the target\'s subtree', isCorrect: false, feedback: 'Node 1 is the parent of target 5 — it is not in the subtree at all. Subtree-only traversal would miss it.' },
        { label: 'Traversal must move upward through the tree', isCorrect: true },
        { label: 'Use BFS from the root downward', isCorrect: false, feedback: 'BFS from the root would work, but only if you can compute distance from the target — which still requires knowing parent relationships.' },
        { label: 'Convert the tree to a sorted structure', isCorrect: false, feedback: 'Sorting node values has no relationship to edge distances. Distance k is about graph hops, not value ordering.' },
      ],
      correctFeedback: 'Binary trees have no built-in parent pointers, so reaching ancestors requires either storing parent pointers during a first pass or converting the tree to a general graph.',
      wrongFeedback: [
        'The output [7,4,1] comes from two directions: downward into the subtree and upward past the target\'s parent. Can a standard subtree traversal reach upward?',
        'To travel upward from a node, you need access to its parent. How do you add parent information to a tree that only stores child pointers?',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is a list of node values in any order. What does this imply about how you collect results?',
      options: [
        { label: 'Collect in a sorted list', isCorrect: false, feedback: 'The problem explicitly says "any order" — sorting is unnecessary work.' },
        { label: 'Track visited nodes to avoid cycles', isCorrect: true },
        { label: 'Return a single integer count', isCorrect: false, feedback: 'The output is the actual node values, not a count. You need to collect values, not tally them.' },
        { label: 'Use a priority queue to order by distance', isCorrect: false, feedback: 'All target nodes are at exactly distance k — you need nodes at one specific distance, not ordered by distance.' },
      ],
      correctFeedback: 'Once you add parent pointers the tree becomes an undirected graph, which can have cycles in your traversal. You need a visited set to avoid re-visiting nodes.',
      wrongFeedback: [
        'When you convert the tree to a graph with parent edges, what prevents you from traversing back through a node you already visited?',
        'BFS or DFS on a graph with back edges requires marking nodes as seen. What structure handles that in O(1) per lookup?',
      ],
    },
    {
      id: 'constraint-node-count',
      question: 'The tree has at most 500 nodes. What complexity does this permit?',
      options: [
        { label: 'O(n log n) required', isCorrect: false, feedback: 'With n = 500, even O(n²) is only 250,000 operations. The constraint is generous — it permits multiple linear passes.' },
        { label: 'O(n) with two passes is fine', isCorrect: true },
        { label: 'Must be O(log n)', isCorrect: false, feedback: 'O(log n) would mean reading only ~9 nodes out of 500. You cannot even identify the target in log n time without a BST structure.' },
        { label: 'Input size is irrelevant here', isCorrect: false, feedback: 'Input size determines whether a multi-pass approach is acceptable. With n = 500, two full tree traversals are well within budget.' },
      ],
      correctFeedback: 'With only 500 nodes, a first pass to map parent pointers and a second BFS/DFS from the target both run in O(n) — comfortably fast.',
      wrongFeedback: [
        'With n = 500, how expensive is it to traverse the entire tree twice?',
        '500 × 500 = 250,000 operations. Even quadratic time is fine here, so linear-time multi-pass solutions are clearly acceptable.',
      ],
    },
    {
      id: 'distance-direction',
      question: 'k can be 0, meaning the answer is just the target itself. What edge case does this reveal?',
      options: [
        { label: 'Return an empty list when k=0', isCorrect: false, feedback: 'The target itself is at distance 0 from itself. k=0 returns the target node value, not an empty list.' },
        { label: 'Distance 0 means return the target node', isCorrect: false },
        { label: 'Your base case must handle k=0 before exploring neighbors', isCorrect: true },
        { label: 'k=0 means the tree has no valid answer', isCorrect: false, feedback: 'k=0 is a fully valid input — it simply means the target is at distance 0 from itself and should be included in the result.' },
      ],
      correctFeedback: 'When k=0, you stop at the target and return it immediately. Your traversal logic needs to check distance before expanding to neighbors, or the base case handles it directly.',
      wrongFeedback: [
        'If you start BFS at the target with remaining distance k, what happens when k reaches 0 during traversal?',
        'Think of k as a countdown: when the counter hits 0 at any node, that node belongs in the output. What triggers the collection step?',
      ],
    },
  ],
}
