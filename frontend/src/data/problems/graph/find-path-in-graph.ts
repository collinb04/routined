export default {
  id: 'find-path-in-graph',
  title: 'Find if Path Exists in Graph',
  difficulty: 'easy',
  description: 'Given <code>n</code> nodes labeled 0 to n-1, a list of undirected edges, a <code>source</code> node and a <code>destination</code> node, return <code>true</code> if a valid path exists from source to destination.',
  examples: [
    { input: 'n=3, edges=[[0,1],[1,2],[2,0]], source=0, destination=2', output: 'true' },
    { input: 'n=6, edges=[[0,1],[0,2],[3,5],[5,4],[4,3]], source=0, destination=5', output: 'false' },
  ],
  constraints: [
    '1 ≤ n ≤ 2 × 10⁵',
    '0 ≤ edges.length ≤ 2 × 10⁵',
    '0 ≤ source, destination < n',
  ],
  starterCode: `class Solution:
    def valid_path(self, n, edges, source, destination):
        # Hint: build an adjacency list, then BFS or DFS from source
        pass`,
  runnerSetup: 'valid_path = Solution().valid_path',
  functionName: 'valid_path',
  conceptId: 'graphs',
  testCases: [
    { label: 'Path exists', args: [3, [[0,1],[1,2],[2,0]], 0, 2], expected: true },
    { label: 'No path', args: [6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5], expected: false },
    { label: 'Same node', args: [1, [], 0, 0], expected: true },
    { label: 'Direct edge', args: [3, [[0,1],[2,1]], 0, 2], expected: true },
  ],
  bruteHint: 'A brute-force approach would explore every possible route from source to destination without remembering which nodes it has already visited. On a graph with cycles, this can revisit the same nodes endlessly and never terminate, and even when it does terminate, the number of routes to check can grow exponentially, roughly O(2^E) in the worst case. What changes if you track visited nodes so each one is explored only once?',
  optimizeComplexity: { time: 'O(V + E)', space: 'O(V + E)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraint bounds tell you upfront which time complexities are even feasible before you write a line of code. n ≤ 2 × 10⁵ nodes and up to 2 × 10⁵ edges. What does this tell you about acceptable complexity?',
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 2 × 10⁵' },
      options: [
        { label: 'O(n²) traversal is fine', isCorrect: false, feedback: 'At n = 200,000, O(n²) is 40 billion operations — far too slow. You need an approach that visits each node and edge at most once.' },
        { label: 'O(n + e) graph traversal is needed', isCorrect: true },
        { label: 'O(log n) binary search applies', isCorrect: false, feedback: 'Binary search requires sorted, random-access data. You cannot find a path in a graph by halving the search space — you must follow edges, which costs at least O(n + e) in the worst case.' },
        { label: 'Input size does not matter for path problems', isCorrect: false, feedback: 'With 200,000 nodes and 200,000 edges, the size absolutely matters. An O(n²) approach would time out; an O(n + e) traversal finishes in time.' },
      ],
      correctFeedback: 'At n = 200,000, you need a traversal that touches each node and edge once — O(n + e). BFS and DFS both achieve this using an adjacency list.',
      wrongFeedback: [
        'At n = 200,000, how many operations does an O(n²) algorithm perform? Is that within reach?',
        'You must follow edges to find a path. What is the minimum cost to visit every reachable node once?',
      ],
    },
    {
      id: 'undirected-graph',
      question: 'How a graph\'s edges are described determines whether you need to store connections in one direction or both. The edges are undirected. What does this mean when building your adjacency list?',
      highlight: { location: 'description', text: 'a list of undirected edges' },
      options: [
        { label: 'Each edge is stored in one direction only', isCorrect: false, feedback: 'If you store edge [u, v] only as u → v, you cannot traverse back from v to u. Undirected edges must be added in both directions so traversal works from any node.' },
        { label: 'Add both directions for every edge', isCorrect: true },
        { label: 'Edges are sorted by node label', isCorrect: false, feedback: 'Sorting is unrelated to directionality. Undirected means traversal can go either way along an edge — that requires storing it in both directions in the adjacency list.' },
        { label: 'Undirected graphs cannot have paths', isCorrect: false, feedback: 'Undirected graphs absolutely have paths — the edges just allow movement in either direction. This is the most common graph type for reachability problems.' },
      ],
      correctFeedback: 'For each edge [u, v], add v to u\'s neighbor list and u to v\'s neighbor list. This lets your traversal move in either direction along every edge.',
      wrongFeedback: [
        'If you only store u → v, can your traversal reach u starting from v?',
        'Undirected means you can travel the edge from either endpoint. How many entries does one edge create in an adjacency list?',
      ],
    },
    {
      id: 'output-boolean',
      question: 'The exact return type a problem expects often reveals how early your algorithm can stop working. The output is a boolean — true or false. What does this mean for your traversal?',
      highlight: { location: 'description', text: 'return <code>true</code> if a valid path exists from source to destination.' },
      options: [
        { label: 'Record the full path from source to destination', isCorrect: false, feedback: 'The problem asks only whether a path exists, not what the path is. Recording the full path adds overhead you do not need and does not change the answer.' },
        { label: 'Stop as soon as destination is reached', isCorrect: true },
        { label: 'Count the number of paths and check if > 0', isCorrect: false, feedback: 'Counting all paths is exponential in the worst case. You only need to know if one path exists — the moment you reach the destination, you have your answer.' },
        { label: 'Find the shortest path and check its length', isCorrect: false, feedback: 'Shortest path algorithms add complexity you do not need. Reachability only requires knowing destination was reached — not how quickly.' },
      ],
      correctFeedback: 'As soon as your BFS or DFS reaches the destination node, return true. No need to explore further — one path is all the problem asks for.',
      wrongFeedback: [
        'The problem asks "does a path exist?" — not "what is the path?" or "how many paths?" What can you do when you first reach the destination?',
        'A boolean output means one success is conclusive. What is the earliest moment in a traversal you can return true?',
      ],
    },
    {
      id: 'same-node-edge-case',
      question: 'Constraints sometimes hide edge cases you must special-case, not just performance limits. source and destination can be the same node. What must your solution return in that case?',
      highlight: { location: 'constraint', text: '0 ≤ source, destination < n' },
      options: [
        { label: 'false — no edge exists to itself', isCorrect: false, feedback: 'A node is always reachable from itself — the path of length zero. The problem\'s constraint allows source == destination, and the correct answer is true.' },
        { label: 'true — a node can always reach itself', isCorrect: true },
        { label: '-1 to signal no traversal needed', isCorrect: false, feedback: 'The output is always a boolean. When source equals destination, you return true immediately — the node is trivially reachable from itself.' },
        { label: 'Depends on whether a self-loop exists', isCorrect: false, feedback: 'You do not need a self-loop to reach a node from itself. The path of length zero always exists, so source == destination always returns true regardless of edges.' },
      ],
      correctFeedback: 'If source == destination, return true before any traversal. A node is trivially reachable from itself with a zero-length path.',
      wrongFeedback: [
        'Does reaching a node from itself require any edges? What is the cost of a path with no steps?',
        'Check for source == destination at the start. What is the correct return value without any traversal?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def valid_path(self, n, edges, source, destination):
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)
        visited = [False] * n
        stack = [source]
        visited[source] = True
        while stack:
            node = stack.pop()
            if node == destination:
                return True
            for nei in adj[node]:
                if not visited[nei]:
                    visited[nei] = True
                    stack.append(nei)
        return False`,
  solutionComplexity: { time: 'O(V + E)', space: 'O(V + E)' },
  solutionCaveat: 'The graph is undirected, so every edge gets added to <em>both</em> endpoints\' adjacency lists — forgetting the reverse direction would silently turn it into a directed graph and miss valid paths that only work "backward" along an edge.',
  solutionExplanation: 'This is plain graph reachability: starting from <code>source</code>, explore every node connected to it, marking each as visited so it\'s never queued twice. If <code>destination</code> ever gets popped off the stack, a path exists; if the stack empties first, it doesn\'t. Swapping the stack for a queue would turn this into BFS instead of DFS — for a plain yes/no reachability question, either one visits the same set of nodes and gives the same answer.',
}
