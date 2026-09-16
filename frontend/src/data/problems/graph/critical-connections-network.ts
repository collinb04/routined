export default {
  id: 'critical-connections-network',
  title: 'Critical Connections in a Network',
  difficulty: 'hard',
  description: 'Given a network of n servers and connections, a critical connection (bridge) is one whose removal disconnects the network. Find all critical connections. (Tarjan\'s bridge algorithm)',
  examples: [
    { input: 'n=4, connections=[[0,1],[1,2],[2,0],[1,3]]', output: '[[1,3]]', explanation: 'Removing [1,3] disconnects server 3.' },
  ],
  constraints: ['2 ≤ n ≤ 10⁵', 'n−1 ≤ connections.length ≤ 10⁵', 'No repeated connections'],
  starterCode: `class Solution:
    def critical_connections(self, n, connections):
        pass`,
  runnerSetup: 'critical_connections = Solution().critical_connections',
  functionName: 'critical_connections',
  conceptId: 'bfs-dfs',
  testCases: [
    { label: 'One bridge', args: [4,[[0,1],[1,2],[2,0],[1,3]]], expected: [[1,3]] },
    { label: 'All bridges', args: [3,[[0,1],[1,2]]], expected: [[0,1],[1,2]] },
  ],
  bruteHint: 'A brute-force approach removes each connection one at a time, then re-runs a full connectivity check (a traversal or Union-Find scan) to see whether the network split apart. With up to 10^5 connections and each check costing O(n + E), the total comes to roughly O(E * (n + E)) operations — on the order of 10^10, far too slow. Is there a way to discover every bridge in a single traversal instead of testing each edge in isolation?',
  optimizeComplexity: { time: 'O(V + E)', space: 'O(V + E)' },
  clues: [
    {
      id: 'bridge-definition',
      question: 'Precisely defining the property you are searching for is the first step before choosing how to detect it efficiently. A critical connection is one whose removal disconnects the network. What property makes an edge a bridge?',
      highlight: { location: 'description', text: 'a critical connection (bridge) is one whose removal disconnects the network.' },
      options: [
        { label: 'It is the longest edge in the graph', isCorrect: false, feedback: 'Edge length is not defined here — connections are unweighted. A bridge is defined by connectivity: it is the only path between the two subgraphs it joins.' },
        { label: 'It is not part of any cycle', isCorrect: true },
        { label: 'It connects the two highest-degree nodes', isCorrect: false, feedback: 'Node degree has no bearing on whether an edge is a bridge. A high-degree node can have all its edges in cycles, making none of them bridges.' },
        { label: 'It has exactly one endpoint with no other connections', isCorrect: false, feedback: 'A leaf edge (one endpoint is degree 1) is always a bridge, but bridges also exist between higher-degree nodes. The defining property is the absence of an alternative path — a cycle — not degree.' },
      ],
      correctFeedback: 'An edge is a bridge if and only if it belongs to no cycle. If there\'s a cycle through an edge, removing it leaves another path connecting those nodes — so it\'s not critical.',
      wrongFeedback: [
        'If you remove an edge and the graph stays connected, there must have been another path between its endpoints. What structure provides that alternative path?',
        'A cycle through an edge means the two endpoints are still reachable via the rest of the cycle after the edge is removed. What does the absence of any such cycle mean for the edge?',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'Input bounds tell you immediately whether a naive re-check-everything approach can survive, or whether you need an algorithm that solves the problem in a single pass. n ≤ 10⁵ nodes and up to 10⁵ edges. What does this rule out?',
      highlight: { location: 'constraint', text: '2 ≤ n ≤ 10⁵' },
      options: [
        { label: 'O(n + E) traversal — too slow for 10⁵ nodes', isCorrect: false, feedback: 'O(n + E) is the ideal complexity here. With n = E = 10⁵, that\'s 200,000 operations — exactly what Tarjan\'s algorithm achieves in a single DFS pass.' },
        { label: 'Removing each edge and re-running connectivity checks', isCorrect: true },
        { label: 'Using a visited array during traversal', isCorrect: false, feedback: 'A visited array is O(n) space and O(1) per lookup — no problem at 10⁵ nodes. It\'s a standard component of Tarjan\'s algorithm.' },
        { label: 'An adjacency list representation', isCorrect: false, feedback: 'An adjacency list is O(n + E) space — fine at 10⁵ nodes and edges. An adjacency matrix would be O(n²) = 10¹⁰ bits, which is the problematic choice.' },
      ],
      correctFeedback: 'Brute force — remove each of E edges and re-run an O(n + E) connectivity check — costs O(E · (n + E)) ≈ 10¹⁰ operations. You need an algorithm that finds all bridges in a single O(n + E) pass.',
      wrongFeedback: [
        'There are up to 10⁵ edges. If you remove each one and run a full graph traversal to test connectivity, what is the total cost?',
        'E · (n + E) ≈ 10⁵ × 2 × 10⁵ = 2 × 10¹⁰ operations. What does that rule out, and what should you target instead?',
      ],
    },
    {
      id: 'low-link-signal',
      question: 'Understanding what a derived per-node value actually represents is what lets a single DFS pass double as a bridge-detection test. Tarjan\'s algorithm assigns each node a discovery time and a "low" value — the earliest discovery time reachable via back edges. What does it mean when low[v] > disc[u] for edge (u, v)?',
      options: [
        { label: 'v was discovered before u', isCorrect: false, feedback: 'If v were discovered before u, disc[v] < disc[u], and the edge would be a back edge pointing to an ancestor — not a tree edge. Tarjan\'s checks tree edges, not back edges, for the bridge condition.' },
        { label: 'There is no back edge from v\'s subtree reaching u or higher', isCorrect: true },
        { label: 'v has more neighbors than u', isCorrect: false, feedback: 'Neighbor count plays no role in Tarjan\'s bridge condition. low[v] > disc[u] means v\'s entire subtree has no alternative route back past u — the edge (u, v) is the only link.' },
        { label: 'u and v are in different connected components', isCorrect: false, feedback: 'If u and v were in different components, there would be no edge between them. The question is whether the edge (u, v) is the sole connection — which low[v] > disc[u] confirms.' },
      ],
      correctFeedback: 'low[v] > disc[u] means v\'s subtree cannot reach u or any of u\'s ancestors via a back edge. Removing (u, v) therefore cuts v off entirely — it\'s a bridge.',
      wrongFeedback: [
        'low[v] is the earliest discovery time reachable from v\'s subtree via back edges. If low[v] > disc[u], can any node in v\'s subtree reach u or earlier without using the edge (u, v)?',
        'If v\'s subtree had a back edge to u or an ancestor of u, low[v] would be ≤ disc[u]. What does low[v] > disc[u] say about the reachability of that subtree without the edge (u, v)?',
      ],
    },
    {
      id: 'parent-edge-skip',
      question: 'Special-casing the edge you just arrived on is often necessary to keep a traversal from misreading its own bookkeeping. During DFS on an undirected graph, when computing low[v] you skip the edge back to v\'s parent. Why?',
      options: [
        { label: 'The parent edge has already been marked as a bridge', isCorrect: false, feedback: 'Whether the parent edge is a bridge is determined after processing v, not before. The skip is about preventing a false "back edge" signal, not about prior bridge marking.' },
        { label: 'The undirected edge to parent looks like a back edge but isn\'t one', isCorrect: true },
        { label: 'Parents are always in a different component', isCorrect: false, feedback: 'The parent is definitely in the same connected component — you just traversed the edge to get to v. The issue is that the undirected edge (v, parent) is the same tree edge you came from, not a separate cycle.' },
        { label: 'Low values are only updated via forward edges', isCorrect: false, feedback: 'Low values are updated via back edges — edges to already-visited ancestors. The parent skip is because the undirected return edge to parent would appear to be a back edge but is actually just the tree edge traversed in reverse.' },
      ],
      correctFeedback: 'In an undirected graph, every tree edge (u, v) appears twice in the adjacency list. If you follow the return edge v→u, you\'d set low[v] = disc[u], making every tree edge appear to be in a cycle. Skipping the parent prevents this false signal.',
      wrongFeedback: [
        'In an undirected graph, edge (u, v) means u is in v\'s adjacency list and v is in u\'s. When DFS is at v and sees u in its neighbor list, is that a genuine back edge to an ancestor or the same tree edge reversed?',
        'If you don\'t skip the parent edge, low[v] gets set to disc[parent] for every node v. What would that incorrectly imply about every tree edge in the graph?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def critical_connections(self, n, connections):
        adj = [[] for _ in range(n)]
        for u, v in connections:
            adj[u].append(v)
            adj[v].append(u)

        disc = [-1] * n
        low = [-1] * n
        bridges = []
        timer = [0]

        def dfs(node, parent):
            disc[node] = low[node] = timer[0]
            timer[0] += 1
            for nbr in adj[node]:
                if nbr == parent:
                    continue
                if disc[nbr] == -1:
                    dfs(nbr, node)
                    low[node] = min(low[node], low[nbr])
                    if low[nbr] > disc[node]:
                        bridges.append(sorted([node, nbr]))
                else:
                    low[node] = min(low[node], disc[nbr])

        dfs(0, -1)
        return sorted(bridges)`,
  solutionComplexity: { time: 'O(V + E)', space: 'O(V + E)' },
  solutionCaveat: 'Sorting the final bridge list (and each pair within it) has nothing to do with correctness — Tarjan\'s algorithm finds every bridge regardless of order — it just normalizes the output into one canonical order, since "any valid order" answers still need a single fixed representation to compare against.',
  solutionExplanation: 'A tree edge <code>(u, v)</code> is a bridge exactly when <code>v</code>\'s subtree has no back edge reaching <code>u</code> or anything discovered before <code>u</code> — tracked by comparing <code>low[v]</code>, the earliest discovery time reachable from <code>v</code>\'s subtree via any back edge, against <code>disc[u]</code>. Skipping the immediate parent when scanning neighbors is essential in an undirected graph, since without it the single tree edge back to the parent would be mistaken for a back edge to an ancestor, making every edge in the graph look non-bridging.',
}
