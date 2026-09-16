export default {
  id: 'detonate-maximum-bombs',
  title: 'Detonate the Maximum Bombs',
  difficulty: 'medium',
  description: 'You have bombs at positions <code>[x, y, r]</code>. Detonating a bomb also detonates any bomb whose center is within its radius. Return the maximum number of bombs that can be detonated by detonating exactly one bomb.',
  examples: [
    { input: 'bombs = [[2,1,3],[6,1,4]]', output: '2', explanation: 'Detonating bomb 1 reaches bomb 0. Detonating bomb 0 doesn\'t reach bomb 1.' },
  ],
  constraints: ['1 ≤ bombs.length ≤ 100', 'bombs[i].length == 3', '1 ≤ x, y, r ≤ 10⁵'],
  starterCode: `class Solution:
    def maximum_detonation(self, bombs):
        pass`,
  runnerSetup: 'maximum_detonation = Solution().maximum_detonation',
  functionName: 'maximum_detonation',
  conceptId: 'graphs',
  testCases: [
    { label: 'Two bombs', args: [[[2,1,3],[6,1,4]]], expected: 2 },
    { label: 'No chain', args: [[[1,1,1],[2,2,1]]], expected: 1 },
    { label: 'Single', args: [[[5,5,5]]], expected: 1 },
  ],
  bruteHint: 'The brute-force approach simulates the chain reaction directly: detonate a starting bomb, then repeatedly rescan every remaining bomb to see which ones now fall within some newly detonated bomb\'s radius, continuing until no new bombs trigger. Doing this fresh for each of the n possible starting bombs, with a full O(n) rescan at every step of a chain that can itself be O(n) long, costs O(n⁴) in the worst case. What could you precompute once, up front, so each starting bomb\'s chain reaction doesn\'t require rescanning every other bomb from scratch?',
  optimizeComplexity: { time: 'O(n³)', space: 'O(n²)' },
  clues: [
    {
      id: 'directed-reach',
      highlight: { location: 'description', text: 'Detonating a bomb also detonates any bomb whose center is within its radius.' },
      question: 'Precise wording about which entity acts on which often reveals whether a relationship is symmetric or one-directional, changing the graph model you build. Bomb A detonates bomb B if B\'s center is within A\'s radius, but not necessarily the other way around. What kind of graph does this produce?',
      options: [
        { label: 'Undirected — if A reaches B, B reaches A', isCorrect: false, feedback: 'Reach is one-way: it depends on each bomb\'s own radius. A can reach B without B reaching A, as shown in the example where bomb 1 reaches bomb 0 but not vice versa.' },
        { label: 'Directed — each edge represents one-way reach', isCorrect: true },
        { label: 'Weighted — edge weight equals the distance between bombs', isCorrect: false, feedback: 'The distance between bombs is used to determine whether an edge exists, but the graph itself is unweighted. All that matters is reachability, not the exact distance value.' },
        { label: 'Bipartite — triggers and targets are separate sets', isCorrect: false, feedback: 'Any bomb can be both a trigger and a target, so there are no separate sets. The graph is directed but not bipartite.' },
      ],
      correctFeedback: 'Edge A → B exists exactly when dist(A, B) ≤ radius(A). Because radius(A) and radius(B) can differ, the edge is one-directional — a directed graph.',
      wrongFeedback: [
        'Does A being able to reach B guarantee that B can reach A? What determines each bomb\'s reach?',
        'Each bomb has its own radius. Draw the two bombs from the example: does radius(0) cover bomb 1\'s center? Does radius(1) cover bomb 0\'s center?',
      ],
    },
    {
      id: 'constraint-size',
      highlight: { location: 'constraint', text: '1 ≤ bombs.length ≤ 100' },
      question: 'Input-size bounds tell you how expensive an algorithm you can afford, ruling out both over-engineered and infeasible approaches. bombs.length ≤ 100. What complexity is acceptable for this problem?',
      options: [
        { label: 'O(n) — a single linear pass is required', isCorrect: false, feedback: 'With n = 100, you can afford much more than linear. Building the directed graph alone is O(n²), and running DFS from every node adds another O(n²) factor — total O(n³) = 10⁶, which is fine.' },
        { label: 'O(n³) — DFS from every node over an n²-edge graph', isCorrect: true },
        { label: 'O(n!) — trying all detonation orderings', isCorrect: false, feedback: 'n! at n = 100 is astronomically large. Detonation order doesn\'t matter — what matters is which bombs are reachable from a starting bomb, which is a standard graph reachability question.' },
        { label: 'O(n²) is the upper limit — DFS from one node', isCorrect: false, feedback: 'You need the best starting bomb, which means trying all n starting points. Each DFS is O(n + E) = O(n²) over a dense graph, giving O(n · n²) = O(n³) = 10⁶ for n = 100.' },
      ],
      correctFeedback: 'With n ≤ 100, O(n³) = 10⁶ operations — well within limits. Build the directed graph in O(n²), then run DFS from each of n starting bombs, each DFS taking O(n²) in the worst case.',
      wrongFeedback: [
        'You need to find which starting bomb triggers the most detonations. How many starting bombs do you need to try, and how expensive is each reachability check?',
        'n = 100 means n³ = 1,000,000. Is that feasible? Enumerate: n starting points × O(n + E) per DFS × up to n² edges.',
      ],
    },
    {
      id: 'edge-condition',
      highlight: { location: 'constraint', text: '1 ≤ x, y, r ≤ 10⁵' },
      question: 'The magnitude of numeric constraints often signals whether a naive computation will hit precision or overflow pitfalls. Bomb A reaches bomb B when dist(A, B) ≤ r_A. You compute dist(A, B) = sqrt((x_A−x_B)² + (y_A−y_B)²). What implementation detail avoids a pitfall?',
      options: [
        { label: 'Use integer division to avoid floating-point errors', isCorrect: false, feedback: 'Integer division would truncate the distance and give wrong comparisons. The standard fix is to compare squared distances: dist² ≤ r² avoids the sqrt entirely with no floating-point risk.' },
        { label: 'Compare squared distance to r² instead of using sqrt', isCorrect: true },
        { label: 'Add a small epsilon to r before comparing', isCorrect: false, feedback: 'An epsilon fudge factor introduces its own errors and is unnecessary. Squaring both sides of dist ≤ r gives an exact integer comparison: (x_A−x_B)² + (y_A−y_B)² ≤ r_A².' },
        { label: 'Convert all coordinates to floats before computing', isCorrect: false, feedback: 'Converting to float introduces the floating-point imprecision you\'re trying to avoid. Squaring both sides keeps everything in exact integers since x, y, r ≤ 10⁵ and their squares fit in 64-bit integers.' },
      ],
      correctFeedback: 'Comparing (x_A−x_B)² + (y_A−y_B)² ≤ r_A² is exact and avoids any sqrt or floating-point rounding. With values up to 10⁵, the squared terms fit comfortably in 64-bit integers (max ≈ 2 × 10¹⁰).',
      wrongFeedback: [
        'sqrt can introduce floating-point rounding errors near the boundary. How can you rewrite dist ≤ r without using sqrt?',
        'Both sides of dist ≤ r are non-negative, so squaring preserves the inequality. What does that give you in terms of a comparison you can do with integers only?',
      ],
    },
    {
      id: 'chain-propagation',
      highlight: { location: 'description', text: 'Return the maximum number of bombs that can be detonated by detonating exactly one bomb.' },
      question: 'Descriptions of cascading or triggered effects are a strong signal that a traversal needs to follow multiple hops, not just immediate neighbors. Detonating bomb A can trigger bomb B, which then triggers bomb C. What graph algorithm captures this chain?',
      options: [
        { label: 'Check only direct neighbors of A', isCorrect: false, feedback: 'Direct neighbors give only the first wave. B\'s detonation triggers its own neighbors, and so on. You need to follow the entire reachable subgraph from A, not just its immediate edges.' },
        { label: 'BFS or DFS from A to count all reachable nodes', isCorrect: true },
        { label: 'Topological sort of the bomb graph', isCorrect: false, feedback: 'Topological sort orders nodes for dependency processing — it doesn\'t count reachable nodes from a source. For this problem you need a reachability count from each possible starting bomb.' },
        { label: 'Shortest path from A to every other bomb', isCorrect: false, feedback: 'Shortest path finds minimum-cost routes — not relevant here since all bombs detonate once reached. You just need to know how many bombs are reachable, not the path cost to reach them.' },
      ],
      correctFeedback: 'BFS or DFS from A traverses all edges reachable from A in the directed graph. The count of visited nodes (including A) is the number of bombs detonated. Run this from each possible starting bomb and take the maximum.',
      wrongFeedback: [
        'The chain can be arbitrarily long: A→B→C→D→…. What traversal follows directed edges until no new reachable nodes remain?',
        'You need to count all nodes reachable from a source in a directed graph. DFS and BFS both do this — what do you count at the end?',
      ],
    },
  ],
  solutionCode: `from collections import deque

class Solution:
    def maximum_detonation(self, bombs):
        n = len(bombs)
        adj = [[] for _ in range(n)]
        for i in range(n):
            xi, yi, ri = bombs[i]
            for j in range(n):
                if i == j:
                    continue
                xj, yj, _ = bombs[j]
                if (xi - xj) ** 2 + (yi - yj) ** 2 <= ri * ri:
                    adj[i].append(j)

        def bfs(start):
            visited = {start}
            queue = deque([start])
            while queue:
                node = queue.popleft()
                for nxt in adj[node]:
                    if nxt not in visited:
                        visited.add(nxt)
                        queue.append(nxt)
            return len(visited)

        return max(bfs(i) for i in range(n))`,
  solutionComplexity: { time: 'O(n³)', space: 'O(n²)' },
  solutionCaveat: 'The reachability edge from bomb i to bomb j only requires j to fall within i\'s blast <code>radius</code> — it does not require the reverse, so the adjacency built here is directed and asymmetric, and a chain reaction started at i can legitimately detonate more bombs than one started at j even when i and j overlap.',
  solutionExplanation: 'Detonating bomb <code>i</code> triggers every bomb whose center lies within <code>i</code>\'s blast circle, and each of those can in turn trigger further bombs, so "how many bombs does starting at i eventually detonate" is exactly a reachability count in a directed graph where an edge <code>i → j</code> exists whenever j is inside i\'s radius. Building that graph from the pairwise distance check once, then running one BFS per possible starting bomb and tracking the largest visited-set size, finds the best bomb to detonate first.',
}
