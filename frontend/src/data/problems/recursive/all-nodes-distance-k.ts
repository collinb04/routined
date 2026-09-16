export default {
  id: 'all-nodes-distance-k',
  title: 'All Nodes Distance K in Binary Tree',
  difficulty: 'medium',
  description: 'Given the root of a binary tree, a target node, and integer <code>k</code>, return all nodes at distance <code>k</code> from the target node. Answer can be in any order.',
  examples: [
    { input: 'root=[3,5,1,6,2,0,8,null,null,7,4], target=5, k=2', output: '[7,4,1]', explanation: 'Nodes 7, 4 (both in subtree) and 1 (distance 2 upward).' },
  ],
  constraints: ['1 ≤ tree nodes ≤ 500', '0 ≤ Node.val ≤ 500', '0 ≤ k ≤ 1000'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def distance_k(self, root, target, k):
        pass`,
  functionName: 'all_nodes_distance_k_run',
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
def _find(node, val):
  if not node: return None
  if node.val == val: return node
  return _find(node.left, val) or _find(node.right, val)
def all_nodes_distance_k_run(arr, target, k):
  root = _build(arr)
  target_node = _find(root, target)
  result = Solution().distance_k(root, target_node, k)
  return sorted(result)`,
  testCases: [
    { label: 'Three nodes', args: [[3,5,1,6,2,0,8,null,null,7,4],5,2], expected: [1,4,7] },
    { label: 'k=0 returns target', args: [[1],1,0], expected: [1] },
  ],
  bruteHint: 'The brute-force approach computes the distance from the target to every node individually: for each node, trace its path down from the root, trace the target\'s path down from the root too, then use where the two paths diverge (their lowest common ancestor) to sum the remaining distance. Repeating this path reconstruction for all n nodes costs O(n) work per node, giving O(n²) overall. Since a tree node only exposes left and right pointers, there is no way to move from the target directly to an ancestor without rebuilding paths like this — so what could you add to the tree so upward movement is as easy as downward movement?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'upward-traversal-constraint',
      question: 'Worked examples often reveal structural requirements that the plain-language description leaves implicit. The example output includes node 1, which is 2 edges above the target. What does this tell you about the traversal required?',
      options: [
        { label: 'Only traverse the target\'s subtree', isCorrect: false, feedback: 'Node 1 is the parent of target 5 — it is not in the subtree at all. Subtree-only traversal would miss it.' },
        { label: 'Traversal must move upward through the tree', isCorrect: true },
        { label: 'Search downward level-by-level starting at the root', isCorrect: false, feedback: 'BFS from the root would work, but only if you can compute distance from the target — which still requires knowing parent relationships.' },
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
      question: 'How a problem phrases its expected output often signals what internal bookkeeping your traversal actually needs. The output is a list of node values in any order. What does this imply about how you collect results?',
      highlight: { location: 'description', text: 'Answer can be in any order.' },
      options: [
        { label: 'Collect in a sorted list', isCorrect: false, feedback: 'The problem explicitly says "any order" — sorting is unnecessary work.' },
        { label: 'Track visited nodes to avoid cycles', isCorrect: true },
        { label: 'Return a single integer count', isCorrect: false, feedback: 'The output is the actual node values, not a count. You need to collect values, not tally them.' },
        { label: 'Collect nodes ordered by their distance from the target', isCorrect: false, feedback: 'All target nodes are at exactly distance k — you need nodes at one specific distance, not ordered by distance.' },
      ],
      correctFeedback: 'Once you add parent pointers the tree becomes an undirected graph, which can have cycles in your traversal. You need a visited set to avoid re-visiting nodes.',
      wrongFeedback: [
        'When you convert the tree to a graph with parent edges, what prevents you from traversing back through a node you already visited?',
        'BFS or DFS on a graph with back edges requires marking nodes as seen. What structure handles that in O(1) per lookup?',
      ],
    },
    {
      id: 'constraint-node-count',
      question: 'Numeric bounds in the constraints are usually a direct signal for which time complexities remain acceptable. The tree has at most 500 nodes. What complexity does this permit?',
      highlight: { location: 'constraint', text: '1 ≤ tree nodes ≤ 500' },
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
      question: 'Constraint ranges that explicitly allow a boundary value like zero are often hinting at an edge case your solution must handle. k can be 0, meaning the answer is just the target itself. What edge case does this reveal?',
      highlight: { location: 'constraint', text: '0 ≤ k ≤ 1000' },
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
  solutionCode: `class Solution:
    def distance_k(self, root, target, k):
        parent = {}

        def dfs(node, par):
            if not node:
                return
            parent[node] = par
            dfs(node.left, node)
            dfs(node.right, node)

        dfs(root, None)

        visited = {target}
        queue = [target]
        dist = 0
        while queue:
            if dist == k:
                return [node.val for node in queue]
            next_queue = []
            for node in queue:
                for nbr in (node.left, node.right, parent.get(node)):
                    if nbr and nbr not in visited:
                        visited.add(nbr)
                        next_queue.append(nbr)
            queue = next_queue
            dist += 1
        return []`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'A single upfront DFS builds a <code>parent</code> map for every node before the BFS from <code>target</code> even starts — without that map, a node could never move upward toward the root, since a plain <code>TreeNode</code> only ever exposes its children.',
  solutionExplanation: 'Once every node also has access to its parent, the tree becomes an ordinary undirected graph, and BFS from <code>target</code> naturally explores outward level by level in all three directions (left child, right child, parent) — the level reached exactly when the running distance counter equals <code>k</code> is precisely the set of nodes at that distance. The <code>visited</code> set is what keeps this graph-style traversal from walking straight back to a node it just came from.',
}
