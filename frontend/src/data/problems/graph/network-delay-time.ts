export default {
  id: 'network-delay-time',
  title: 'Network Delay Time',
  difficulty: 'medium',
  description: 'Given a network of n nodes and travel times of directed edges, find the minimum time for a signal sent from node <code>k</code> to reach all nodes. Return -1 if not all nodes are reachable. (Dijkstra\'s algorithm)',
  examples: [
    { input: 'times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2', output: '2', explanation: 'Signal from node 2 reaches all nodes in at most 2 time units.' },
  ],
  constraints: ['1 ≤ k ≤ n ≤ 100', '1 ≤ times.length ≤ 6000', 'All travel times are positive'],
  starterCode: `def network_delay_time(times, n, k):
  pass`,
  functionName: 'network_delay_time',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: 'Standard', args: [[[2,1,1],[2,3,1],[3,4,1]],4,2], expected: 2 },
    { label: 'Unreachable', args: [[[1,2,1]],2,2], expected: -1 },
    { label: 'Single node', args: [[],1,1], expected: 0 },
  ],
  bruteHint: 'Describe trying every possible path from k to each node and comparing total travel times, and why that\'s inefficient',
  optimizeHint: 'Name the shortest-path algorithm that greedily finalizes each node\'s minimum distance using a priority queue',
  clues: [
    {
      id: 'positive-weights',
      question: '"All travel times are positive." What does this guarantee about the algorithm you can use?',
      options: [
        { label: 'Dijkstra\'s algorithm is valid here', isCorrect: true },
        { label: 'Bellman-Ford is required', isCorrect: false, feedback: 'Bellman-Ford handles negative edge weights, but all travel times here are positive. Dijkstra\'s greedy relaxation is correct and faster — O((n + e) log n) versus O(n × e).' },
        { label: 'BFS finds shortest paths', isCorrect: false, feedback: 'Unweighted BFS finds minimum-hop paths, not minimum-time paths. With varying travel times, you need a weighted shortest-path algorithm.' },
        { label: 'Negative cycles must be detected', isCorrect: false, feedback: 'Positive travel times make negative cycles impossible. Negative cycle detection (a Bellman-Ford feature) is unnecessary overhead when all weights are ≥ 1.' },
      ],
      correctFeedback: 'Positive weights mean Dijkstra\'s greedy approach is safe — it never needs to revisit a finalized node. Bellman-Ford would also work but at extra cost.',
      wrongFeedback: [
        'Which shortest-path algorithm requires non-negative edge weights to work correctly?',
        'Dijkstra\'s relies on the guarantee that a finalized shortest distance can never be improved later. What property of the weights makes that safe?',
      ],
    },
    {
      id: 'directed-graph',
      question: 'The edges in times are directed: [u, v, w] means u → v, not v → u. What does this mean for your adjacency list?',
      options: [
        { label: 'Add both directions for every edge', isCorrect: false, feedback: 'Adding both directions would model an undirected graph. Here, a signal traveling u → v does not imply it can travel v → u at the same cost. Only store the directed edge u → v.' },
        { label: 'Store each edge in one direction only', isCorrect: true },
        { label: 'The graph is symmetric, so order does not matter', isCorrect: false, feedback: 'The problem uses directed edges — times[i] = [u, v, w] explicitly encodes direction. Two nodes may have asymmetric travel times or no reverse edge at all.' },
        { label: 'Sort edges by weight before building the list', isCorrect: false, feedback: 'Sorting edges is not part of building a directed adjacency list. Dijkstra\'s priority queue handles weight ordering at query time.' },
      ],
      correctFeedback: 'For each [u, v, w], add v with weight w to u\'s neighbor list only. The reverse direction does not exist unless explicitly listed in times.',
      wrongFeedback: [
        'A directed edge [u, v, w] sends signal from u to v. Can the signal travel v → u on the same edge?',
        'Directed means one-way. When building the adjacency list, how many entries does one directed edge create?',
      ],
    },
    {
      id: 'output-definition',
      question: '"Find the minimum time for the signal to reach all nodes." What exactly should you return?',
      options: [
        { label: 'The sum of all shortest path distances', isCorrect: false, feedback: 'Summing all distances gives total accumulated delay, not the time when the last node is reached. You need the maximum shortest-path distance — that is when the signal has fully propagated.' },
        { label: 'The maximum of all shortest distances from k', isCorrect: true },
        { label: 'The shortest path to the farthest node', isCorrect: false, feedback: 'This is correct — the farthest node\'s shortest path distance is the answer. But "farthest" here means largest shortest-path time, which is the maximum over all nodes.' },
        { label: 'The number of nodes reachable from k', isCorrect: false, feedback: 'Counting reachable nodes tells you whether to return -1, but not the delay time. The output is a time value — the maximum shortest distance from k to any node.' },
      ],
      correctFeedback: 'Run Dijkstra from k to get the shortest travel time to every node. The signal reaches all nodes when the last one is reached — that is the maximum of those shortest-path values.',
      wrongFeedback: [
        'The signal travels all paths simultaneously. When does it finish reaching all nodes — at the shortest arrival time or the longest?',
        'After Dijkstra, you have the minimum travel time to each node from k. Which single value answers "when does every node have the signal?"',
      ],
    },
    {
      id: 'unreachable-check',
      question: '"Return -1 if not all nodes are reachable." When does that condition occur?',
      options: [
        { label: 'When k has no outgoing edges', isCorrect: false, feedback: 'Even if k has no outgoing edges, n = 1 is a valid case (k reaches itself). The -1 condition is about whether all n nodes are reachable, not about k\'s degree specifically.' },
        { label: 'When any node has no path from k after Dijkstra', isCorrect: true },
        { label: 'When any edge weight exceeds n', isCorrect: false, feedback: 'Edge weight magnitude has no bearing on reachability. A node is unreachable when no directed path exists from k to it — not because a weight is large.' },
        { label: 'When times.length is less than n − 1', isCorrect: false, feedback: 'For a directed graph, having fewer than n − 1 edges does not guarantee disconnection — edges can bypass nodes. Reachability must be checked by running Dijkstra, not by counting edges.' },
      ],
      correctFeedback: 'After Dijkstra, any node whose distance remains infinity was never reached. If that happens for any node, return -1. Otherwise return the maximum finite distance.',
      wrongFeedback: [
        'After Dijkstra, unreached nodes retain their initial distance of infinity. How do you check whether that happened for any node?',
        'If the maximum shortest-path distance is infinity, what does that mean about reachability?',
      ],
    },
  ],
}
