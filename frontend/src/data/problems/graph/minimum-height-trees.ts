export default {
  id: 'minimum-height-trees',
  title: 'Minimum Height Trees',
  difficulty: 'medium',
  description: 'A tree of n nodes can be rooted at any node. Find all root labels that give trees of minimum height. Return all such roots.',
  examples: [
    { input: 'n=4, edges=[[1,0],[1,2],[1,3]]', output: '[1]', explanation: 'Rooting at 1 gives height 1.' },
    { input: 'n=6, edges=[[3,0],[3,1],[3,2],[3,4],[5,4]]', output: '[3,4]' },
  ],
  constraints: ['1 ≤ n ≤ 2 × 10⁴', 'edges.length == n − 1'],
  starterCode: `class Solution:
    def find_min_height_trees(self, n, edges):
        pass`,
  runnerSetup: 'find_min_height_trees = Solution().find_min_height_trees',
  functionName: 'find_min_height_trees',
  conceptId: 'graphs',
  testCases: [
    { label: 'One root', args: [4,[[1,0],[1,2],[1,3]]], expected: [1] },
    { label: 'Two roots', args: [6,[[3,0],[3,1],[3,2],[3,4],[5,4]]], expected: [3,4] },
    { label: 'Single node', args: [1,[]], expected: [0] },
  ],
  bruteHint: 'One direct approach roots the tree at every single node in turn, computes its height with a BFS or DFS from that root, and tracks which roots give the smallest height. Recomputing height from scratch for each of the n candidate roots costs O(n) per root, so the total work is O(n²). At n up to 2 × 10⁴, that is potentially hundreds of millions of operations. Can you avoid re-measuring the whole tree for every candidate root?',
  optimizeComplexity: { time: 'O(V)', space: 'O(V)' },
  clues: [
    {
      id: 'constraint-n-edges',
      question: 'Constraints often encode structural guarantees about the input, not just size limits. "edges.length == n − 1" — the input is always a tree, not a general graph. What does this guarantee?',
      highlight: { location: 'constraint', text: 'edges.length == n − 1' },
      options: [
        { label: 'The graph may have cycles', isCorrect: false, feedback: 'A connected graph with exactly n − 1 edges has no cycles — that is the definition of a tree. You do not need to detect or handle cycles here.' },
        { label: 'No cycles exist; the structure is a tree', isCorrect: true },
        { label: 'Some nodes may be disconnected', isCorrect: false, feedback: 'n − 1 edges on a connected structure means all nodes are reachable from each other. Disconnected components would require fewer edges to form a spanning tree for each.' },
        { label: 'You must verify the graph is connected before proceeding', isCorrect: false, feedback: 'The problem guarantees a valid tree — connectivity is given, not something to verify. Union-Find would be redundant work.' },
      ],
      correctFeedback: 'With exactly n − 1 edges and n nodes, the input is always a valid tree. You skip cycle detection and connectivity checks entirely and focus on finding the best root.',
      wrongFeedback: [
        'A tree has exactly n − 1 edges. What structural properties does that guarantee about the graph?',
        'n − 1 edges with n nodes means one path between any two nodes and no cycles. How does that simplify your algorithm?',
      ],
    },
    {
      id: 'output-structure',
      question: 'How a problem shapes its expected output can reveal structural bounds on the answer before you write any code. The output is a list of root labels — potentially more than one. What does this tell you about the answer?',
      highlight: { location: 'description', text: 'Find all root labels that give trees of minimum height.' },
      options: [
        { label: 'Always return every node', isCorrect: false, feedback: 'Most trees have only 1 or 2 optimal roots. Returning all n nodes would be wrong — only nodes that produce the minimum height qualify.' },
        { label: 'At most 2 roots can minimize height', isCorrect: true },
        { label: 'Return nodes sorted by degree', isCorrect: false, feedback: 'Degree order does not determine which root minimizes height. The optimal root minimizes the longest path to any leaf — that is a structural property of the tree\'s center, not its degree.' },
        { label: 'The root with highest degree always wins', isCorrect: false, feedback: 'Highest degree finds the most connected node, not the center of the longest path. The minimum-height root is the centroid — the midpoint of the tree\'s diameter — which may or may not be the highest-degree node.' },
      ],
      correctFeedback: 'A tree\'s center consists of at most 2 nodes. Any tree has either 1 or 2 centroids — the midpoints of its longest path. Your answer list will never exceed 2 elements.',
      wrongFeedback: [
        'Think about where the optimal root must lie. Can the center of a tree have more than 2 nodes?',
        'The optimal root minimizes the maximum distance to any leaf. The center of a path graph has 1 or 2 nodes. Is that ever more than 2?',
      ],
    },
    {
      id: 'leaf-trimming-strategy',
      question: 'When a brute-force complexity collides with the input size, that tension is the signal to look for a smarter algorithmic technique. n ≤ 2 × 10⁴ and the tree has n − 1 edges. Checking every node as a root naively costs O(n²). What is the efficient approach?',
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 2 × 10⁴' },
      options: [
        { label: 'Root at node 0 and measure height', isCorrect: false, feedback: 'Node 0 is just an arbitrary label — it has no structural significance. Starting there and measuring height is O(n) for one root but does not find the minimum-height root without checking all n candidates.' },
        { label: 'Iteratively remove leaf nodes until 1–2 remain', isCorrect: true },
        { label: 'Sort nodes by degree and pick the top two', isCorrect: false, feedback: 'High-degree nodes are hubs, not necessarily centroids. A star graph has one hub with degree n − 1, which is also the centroid — but in other tree shapes, the centroid may have low degree.' },
        { label: 'Run BFS from every node and compare heights', isCorrect: false, feedback: 'BFS from every node is O(n²) total — at n = 20,000, that is 400 million operations. The leaf-trimming approach finds the centroid in O(n).' },
      ],
      correctFeedback: 'Repeatedly remove all current leaves (degree-1 nodes) until 1 or 2 nodes remain. Those remaining nodes are the centroids — the optimal roots. This runs in O(n) like topological sort peeling.',
      wrongFeedback: [
        'At n = 20,000, O(n²) is 400 million operations. What O(n) strategy finds the tree\'s center without trying every root?',
        'Think of peeling an onion from the outside in: remove all leaves, then all new leaves, and so on. What is left at the end?',
      ],
    },
    {
      id: 'single-node-edge-case',
      question: 'Edge cases at the boundary of valid input often expose assumptions your main algorithm silently relies on. n can equal 1 with an empty edges list. What must your solution return in that case?',
      options: [
        { label: '[0] — the only node is always the root', isCorrect: true },
        { label: '[] — no tree exists with a single node', isCorrect: false, feedback: 'A single node is a valid tree of height 0. Node 0 is trivially the root and the only possible answer.' },
        { label: '-1 to signal no edges', isCorrect: false, feedback: 'The output is always a list of root labels, never -1. A single node has no edges but is still a valid tree — return [0].' },
        { label: 'Run the full algorithm to confirm', isCorrect: false, feedback: 'With n = 1 and no edges, the leaf-trimming loop has nothing to process. Handle this as an upfront base case to avoid indexing into an empty structure.' },
      ],
      correctFeedback: 'When n = 1, return [0] immediately. There is only one node, it is the only root, and the tree has height 0. Handling this base case prevents issues in the main loop.',
      wrongFeedback: [
        'If there is only one node and no edges, what is the only possible root label?',
        'A tree of one node has height 0. What should the output list contain?',
      ],
    },
  ],
  solutionCode: `from collections import deque

class Solution:
    def find_min_height_trees(self, n, edges):
        if n == 1:
            return [0]
        adj = [set() for _ in range(n)]
        for u, v in edges:
            adj[u].add(v)
            adj[v].add(u)

        leaves = deque([i for i in range(n) if len(adj[i]) == 1])
        remaining = n
        while remaining > 2:
            leaf_count = len(leaves)
            remaining -= leaf_count
            for _ in range(leaf_count):
                leaf = leaves.popleft()
                nbr = adj[leaf].pop()
                adj[nbr].discard(leaf)
                if len(adj[nbr]) == 1:
                    leaves.append(nbr)
        return list(leaves)`,
  solutionComplexity: { time: 'O(V)', space: 'O(V)' },
  solutionCaveat: 'The peeling stops once <code>remaining</code> drops to 2 or fewer rather than peeling down to a single node — a tree\'s minimum-height root(s) are always the one or two centermost nodes, and peeling one layer further would strip away a true center along with the leaves.',
  solutionExplanation: 'A tree\'s minimum height is achieved by rooting at its geometric center, so this repeatedly strips away the current outermost layer of leaves (nodes with only one remaining neighbor), the same way peeling an onion removes one ring at a time — each stripped leaf can never have been the center, since a leaf sits at a tree\'s edge, not its middle. What survives after every layer but the innermost one or two nodes has been peeled away is exactly the tree\'s center, or centers when the longest path has even length.',
}
