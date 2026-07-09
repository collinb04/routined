export default {
  id: 'cheapest-flights-k-stops',
  title: 'Cheapest Flights Within K Stops',
  difficulty: 'medium',
  description: 'Given flights as <code>[from, to, price]</code> and integers <code>src</code>, <code>dst</code>, <code>k</code>, return the cheapest price to fly from src to dst with at most k stops. Return -1 if no route. (Bellman-Ford)',
  examples: [
    { input: 'n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src=0, dst=3, k=1', output: '700', explanation: '0→1→3 costs 700 with 1 stop.' },
  ],
  constraints: ['1 ≤ n ≤ 100', '0 ≤ flights.length ≤ n*(n-1)/2', '1 ≤ price ≤ 10⁴'],
  starterCode: `def find_cheapest_price(n, flights, src, dst, k):
  pass`,
  functionName: 'find_cheapest_price',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: 'k=1', args: [4,[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],0,3,1], expected: 700 },
    { label: 'k=2', args: [4,[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],0,3,2], expected: 400 },
  ],
  bruteHint: 'Describe exploring every possible route within k stops via DFS and recomputing the cost of each one from scratch',
  optimizeHint: 'Name the shortest-path technique that relaxes all edges in rounds, bounded to a fixed number of rounds',
  clues: [
    {
      id: 'stop-constraint',
      question: '"At most k stops." A stop is an intermediate city, not counting src or dst. What does this constraint add on top of a standard shortest-path problem?',
      options: [
        { label: 'A hop count limit — not just minimum cost', isCorrect: true },
        { label: 'Nothing — Dijkstra already handles it', isCorrect: false, feedback: 'Dijkstra finds the globally cheapest path regardless of how many hops it takes. The k-stop limit means a cheaper path with too many hops is invalid — standard Dijkstra doesn\'t track that.' },
        { label: 'You must return -1 for all long paths', isCorrect: false, feedback: '-1 is only for when no valid path exists within k stops, not for any path that happens to be long. The constraint bounds how many intermediate cities you may pass through.' },
        { label: 'Prices must be discounted per stop', isCorrect: false, feedback: 'Prices are fixed per flight segment — there\'s no per-stop discount in this problem. The k constraint caps the number of intermediate nodes in the path, not the cost.' },
      ],
      correctFeedback: 'You\'re optimizing cost subject to a step-count constraint. That dual objective (minimize cost, at most k+1 edges) is what makes Bellman-Ford — run for exactly k+1 relaxation rounds — the natural fit.',
      wrongFeedback: [
        'Dijkstra minimizes cost globally. What does "at most k stops" add that Dijkstra\'s priority queue doesn\'t naturally enforce?',
        'You need the cheapest path that uses at most k+1 edges. What algorithm lets you limit relaxation rounds to exactly k+1?',
      ],
    },
    {
      id: 'no-route-output',
      question: 'Return -1 if no route exists within k stops. What does this require in your algorithm?',
      options: [
        { label: 'Check for negative cycles before running', isCorrect: false, feedback: 'All prices are ≥ 1, so negative cycles are impossible here. The -1 output signals unreachability within k stops, not a negative-cycle sentinel.' },
        { label: 'Initialize dist to infinity, return -1 if dst stays unreached', isCorrect: true },
        { label: 'Return 0 if src equals dst', isCorrect: false, feedback: 'That handles the trivial same-node case, not the general unreachable case. You need to detect when no valid path reaches dst within k+1 edges.' },
        { label: 'Run BFS and count levels', isCorrect: false, feedback: 'BFS finds shortest paths by hop count, not by cost. Here you need the cheapest path within a hop bound — a cost-aware algorithm is required.' },
      ],
      correctFeedback: 'Initialize every city\'s cost to infinity. After k+1 Bellman-Ford rounds, if dst is still infinity, no valid route exists — return -1.',
      wrongFeedback: [
        'What initial value represents "not yet reachable"? After your relaxation rounds finish, what does that value still being present at dst mean?',
        'Infinity as an initial cost sentinel, combined with a final check, is the standard way to detect unreachability. What do you return when the sentinel survives?',
      ],
    },
    {
      id: 'bellman-ford-rounds',
      question: 'Bellman-Ford normally runs n-1 rounds. Here you run at most k+1 rounds. Why?',
      options: [
        { label: 'Each round extends paths by exactly one edge', isCorrect: true },
        { label: 'k+1 rounds reduces time complexity to O(k)', isCorrect: false, feedback: 'Each round still processes all flights, so cost per round is O(E). Running k+1 rounds gives O(k·E), not O(k). The bound on rounds comes from the stop limit, not a performance optimization.' },
        { label: 'Fewer rounds avoid negative cycles', isCorrect: false, feedback: 'All prices are positive (≥ 1), so negative cycles can\'t form. Limiting rounds to k+1 enforces the hop count constraint, not negative-cycle protection.' },
        { label: 'You must run exactly n-1 rounds regardless', isCorrect: false, feedback: 'Running n-1 rounds finds shortest paths with no hop limit. Here you have a tighter constraint — at most k stops means at most k+1 edges, so you stop after k+1 rounds.' },
      ],
      correctFeedback: 'After round i of Bellman-Ford, dist[v] holds the cheapest cost to reach v using at most i edges. After k+1 rounds, you\'ve found the cheapest route with at most k intermediate stops.',
      wrongFeedback: [
        'After round 1 of Bellman-Ford, what is the maximum number of edges in any path that has been relaxed? After round 2?',
        'Each Bellman-Ford round extends every known path by one edge. At most k stops means at most k+1 edges total. How many rounds does that require?',
      ],
    },
    {
      id: 'stale-copy',
      question: 'During each Bellman-Ford round, you must use prices from the previous round, not the current one. What happens if you update in-place?',
      options: [
        { label: 'You skip some flights accidentally', isCorrect: false, feedback: 'Processing all flights in a round doesn\'t get skipped — the order issue is different. Using updated values mid-round lets a single round effectively extend a path by more than one edge.' },
        { label: 'A single round can extend a path by more than one hop', isCorrect: true },
        { label: 'Costs might go negative', isCorrect: false, feedback: 'Prices are all positive (≥ 1), so in-place updates can\'t produce negative costs. The problem is that paths grow by more than one edge per round, breaking the hop-count guarantee.' },
        { label: 'The algorithm runs fewer than k+1 rounds', isCorrect: false, feedback: 'You control the number of rounds explicitly. In-place updates don\'t change how many rounds run — they corrupt the path length semantics within each round.' },
      ],
      correctFeedback: 'If you update dist[v] and then use the updated dist[v] to relax further nodes in the same round, you\'ve effectively extended a path by two edges in one pass — violating the k-stop limit. Copy the previous round\'s dist before each round.',
      wrongFeedback: [
        'Suppose node A relaxes node B, and then node B relaxes node C, all in the same round. How many edges have been added to the path from A\'s perspective?',
        'Each round should add at most one edge to any path. Using updated values mid-round lets updates "chain" within a single pass. How many edges can chain in one round if you update in-place?',
      ],
    },
  ],
}
