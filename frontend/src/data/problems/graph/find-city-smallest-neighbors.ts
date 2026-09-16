export default {
  id: 'find-city-smallest-neighbors',
  title: 'Find the City With the Smallest Number of Neighbors at a Threshold Distance',
  difficulty: 'medium',
  description: 'Given n cities, edges with weights, and a threshold, find the city with the fewest reachable cities (within threshold). If tie, return the one with the greatest number.',
  examples: [
    { input: 'n=4, edges=[[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold=4', output: '3' },
  ],
  constraints: ['2 ≤ n ≤ 100', '1 ≤ edges.length ≤ n*(n-1)/2', '1 ≤ distanceThreshold ≤ 10⁴'],
  starterCode: `class Solution:
    def find_the_city(self, n, edges, distance_threshold):
        pass`,
  runnerSetup: 'find_the_city = Solution().find_the_city',
  functionName: 'find_the_city',
  conceptId: 'graphs',
  testCases: [
    { label: 'City 3', args: [4,[[0,1,3],[1,2,1],[1,3,4],[2,3,1]],4], expected: 3 },
    { label: 'City 0', args: [5,[[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]],2], expected: 0 },
  ],
  bruteHint: 'The brute-force approach runs an independent shortest-path search, such as Dijkstra\'s algorithm, from each of the n cities in turn, treating every city\'s search as its own separate problem with no reuse of work between them. Each Dijkstra run costs roughly O(E log V), so repeating it for all n cities costs about O(n · E log V) overall, plus the bookkeeping of n separate distance arrays. What single algorithm could compute the shortest distance between every pair of cities together, reusing intermediate results across all of them at once?',
  optimizeComplexity: { time: 'O(V³)', space: 'O(V²)' },
  clues: [
    {
      id: 'constraint-size',
      highlight: { location: 'constraint', text: '2 ≤ n ≤ 100' },
      question: 'Input-size bounds narrow down which algorithms are fast enough, especially when comparing per-node searches against an all-pairs approach. n ≤ 100 cities. You need shortest paths between all pairs. What algorithm and complexity applies?',
      options: [
        { label: 'Dijkstra from each node — O(n² log n)', isCorrect: false, feedback: 'Dijkstra from each of n nodes works and is O(n · (E log n)) — valid for n = 100. But Floyd-Warshall at O(n³) = 10⁶ is simpler to implement for all-pairs and equally fast at this scale.' },
        { label: 'Floyd-Warshall all-pairs shortest paths — O(n³)', isCorrect: true },
        { label: 'BFS from each node — O(n · (n + E))', isCorrect: false, feedback: 'BFS finds shortest paths by hop count, not by edge weight. This problem has weighted edges, so BFS would give incorrect shortest distances.' },
        { label: 'O(n⁴) — compare every pair of paths', isCorrect: false, feedback: 'At n = 100, O(n⁴) = 10⁸ — marginal. More importantly, O(n⁴) is unnecessary: Floyd-Warshall computes all-pairs shortest paths in O(n³) = 10⁶ operations.' },
      ],
      correctFeedback: 'With n ≤ 100, Floyd-Warshall runs in 10⁶ operations and fills an n×n distance matrix. Then a single pass over cities counts reachable neighbors for each — total O(n³).',
      wrongFeedback: [
        'You need the shortest path from every city to every other city. What algorithm computes all-pairs shortest paths in O(n³)?',
        'n = 100, so n³ = 1,000,000 — a trivial cost. Floyd-Warshall fills a dist[i][j] matrix for all i, j in three nested loops. What is that complexity called?',
      ],
    },
    {
      id: 'threshold-filter',
      highlight: { location: 'description', text: 'Given n cities, edges with weights, and a threshold, find the city with the fewest reachable cities (within threshold).' },
      question: 'Parenthetical qualifiers in a problem statement often carry precise inclusion or exclusion rules that are easy to misread. "Fewest reachable cities within the threshold distance." What does within threshold mean for counting?',
      options: [
        { label: 'Count cities with distance exactly equal to distanceThreshold', isCorrect: false, feedback: '"Within" means ≤ distanceThreshold, not exactly equal. Cities closer than the threshold still count — you want all cities reachable without exceeding the distance limit.' },
        { label: 'Count cities with distance ≤ distanceThreshold (excluding self)', isCorrect: true },
        { label: 'Count cities with distance < distanceThreshold', isCorrect: false, feedback: 'The problem says "within threshold," which is ≤ not <. A city at exactly distanceThreshold is reachable. Include it in the count.' },
        { label: 'Count all cities in the same connected component', isCorrect: false, feedback: 'Connected component membership ignores edge weights and thresholds. A city in the same component might require a distance far exceeding distanceThreshold to reach.' },
      ],
      correctFeedback: 'For each city i, count all j ≠ i where dist[i][j] ≤ distanceThreshold. The city with the smallest such count (greatest index on tie) is the answer.',
      wrongFeedback: [
        'Re-read the condition: "reachable at or under the threshold." Is a city at exactly the threshold distance included or excluded?',
        '"Within" in distance problems is inclusive: ≤ distanceThreshold. Make sure you include cities at exactly the threshold, not just strictly closer ones.',
      ],
    },
    {
      id: 'tie-breaking',
      highlight: { location: 'description', text: 'If tie, return the one with the greatest number.' },
      question: 'Explicit tie-breaking rules in a problem statement tell you exactly how to resolve ambiguous outputs, so they can\'t be skipped or assumed. "If there is a tie, return the city with the greatest number." What does greatest number mean here?',
      options: [
        { label: 'The city with the most edges', isCorrect: false, feedback: 'Greatest number refers to the city\'s index label (0 to n-1), not its degree. Among cities tied for fewest reachable neighbors, pick the one with the highest index.' },
        { label: 'The city with the highest index label', isCorrect: true },
        { label: 'The city closest to the center of the graph', isCorrect: false, feedback: 'Geometric center is not defined in this problem. The tiebreak is purely by integer index: among tied cities, pick the largest index.' },
        { label: 'The city with the highest total edge weight', isCorrect: false, feedback: 'Total edge weight has no role in the tiebreak. The problem\'s tiebreak rule is straightforward: greatest city index number wins.' },
      ],
      correctFeedback: 'Cities are labeled 0 to n-1. When two cities share the fewest neighbor count, return the one with the larger index. Iterating cities from 0 to n-1 and updating the answer with ≤ (not <) naturally picks the last tied city.',
      wrongFeedback: [
        'Cities are labeled by integers 0 to n-1. "Greatest number" refers to those integer labels. Which city index wins in a tie?',
        'Iterate cities 0 to n-1 and track the best. If you update on ≤ (fewer or equal neighbors), which tied city ends up as the answer — the first or the last?',
      ],
    },
    {
      id: 'floyd-warshall-init',
      highlight: { location: 'constraint', text: '1 ≤ edges.length ≤ n*(n-1)/2' },
      question: 'Constraints on how many edges can exist reveal that the graph may be sparse, which matters for how you initialize any all-pairs distance structure. Floyd-Warshall starts with a distance matrix. What are the initial values before running the algorithm?',
      options: [
        { label: 'All zeros — distances start at 0', isCorrect: false, feedback: 'Zero would mean every city is distance 0 from every other city, which would make Floyd-Warshall\'s relaxation step do nothing. Initialize to infinity for unconnected pairs, 0 on the diagonal, and edge weights for direct connections.' },
        { label: 'dist[i][i]=0, direct edges get their weight, rest infinity', isCorrect: true },
        { label: 'All ones — distances start at 1', isCorrect: false, feedback: 'Initializing to 1 confuses edge weights with hop counts. Floyd-Warshall is a weighted shortest-path algorithm — unconnected pairs must start at infinity so relaxation can only improve them.' },
        { label: 'dist[i][j] = distanceThreshold for all pairs', isCorrect: false, feedback: 'Setting all pairs to the threshold would corrupt Floyd-Warshall\'s relaxation. Unconnected pairs must start at infinity so the algorithm can discover whether they can be reached within any distance.' },
      ],
      correctFeedback: 'dist[i][i] = 0 (zero cost to stay), dist[i][j] = weight for direct edges, dist[i][j] = infinity for all other pairs. Floyd-Warshall then relaxes paths through each intermediate node k.',
      wrongFeedback: [
        'Floyd-Warshall starts from direct connections and improves through intermediates. What value represents "no direct connection yet" before any intermediates are considered?',
        'The diagonal is 0 (a city to itself), direct edges get their weight, and everything else starts as infinity — meaning unreachable until a path through some k is found. Does that initialization make sense?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def find_the_city(self, n, edges, distance_threshold):
        INF = float('inf')
        dist = [[INF] * n for _ in range(n)]
        for i in range(n):
            dist[i][i] = 0
        for u, v, w in edges:
            dist[u][v] = w
            dist[v][u] = w

        for k in range(n):
            for i in range(n):
                for j in range(n):
                    if dist[i][k] + dist[k][j] < dist[i][j]:
                        dist[i][j] = dist[i][k] + dist[k][j]

        best_city = -1
        best_count = n + 1
        for i in range(n):
            count = sum(1 for j in range(n) if i != j and dist[i][j] <= distance_threshold)
            if count <= best_count:
                best_count = count
                best_city = i
        return best_city`,
  solutionComplexity: { time: 'O(n³)', space: 'O(n²)' },
  solutionCaveat: 'Ties are broken toward the <code>greatest</code> city number by using <code>&lt;=</code> rather than <code>&lt;</code> when comparing reachable-city counts — later cities with an equally small count overwrite the earlier best, which is what the problem requires when several cities have the same smallest count.',
  solutionExplanation: 'Floyd-Warshall computes every pair of cities\' shortest distance by allowing each city in turn to act as an intermediate stop — after considering all n cities as potential waypoints, <code>dist[i][j]</code> holds the true shortest path. Once every pairwise distance is known, finding "the city reaching the fewest other cities within the threshold" is just one linear pass counting, for each city, how many others fall within <code>distance_threshold</code>.',
}
