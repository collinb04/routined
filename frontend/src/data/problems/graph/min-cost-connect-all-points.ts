export default {
  id: 'min-cost-connect-all-points',
  title: 'Min Cost to Connect All Points',
  difficulty: 'medium',
  description: 'Given an array of points on a 2D plane, return the minimum cost to connect all points. The cost of connecting two points is their Manhattan distance. (Prim\'s or Kruskal\'s MST)',
  examples: [
    { input: 'points=[[0,0],[2,2],[3,10],[5,2],[7,0]]', output: '20' },
    { input: 'points=[[3,12],[-2,5],[-4,1]]', output: '18' },
  ],
  constraints: ['1 ≤ points.length ≤ 1000', '-10⁶ ≤ x, y ≤ 10⁶', 'No two points are the same'],
  starterCode: `def min_cost_connect_points(points):
  pass`,
  functionName: 'min_cost_connect_points',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: 'Five points', args: [[[0,0],[2,2],[3,10],[5,2],[7,0]]], expected: 20 },
    { label: 'Three points', args: [[[3,12],[-2,5],[-4,1]]], expected: 18 },
    { label: 'Single point', args: [[[0,0]]], expected: 0 },
  ],
  bruteHint: 'Describe trying every possible set of edges that connects all points, and its exponential complexity',
  optimizeHint: 'Name the algorithm (Prim\'s or Kruskal\'s) that builds a Minimum Spanning Tree to connect all points at minimum total cost',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'points.length ≤ 1000. Every pair of points is a potential edge. How many edges exist?',
      options: [
        { label: 'About 1000 edges', isCorrect: false, feedback: 'With 1000 points fully connected, the number of edges is 1000 × 999 / 2 ≈ 500,000 — not 1000. Every pair contributes one edge.' },
        { label: 'About 500,000 edges — O(n²)', isCorrect: true },
        { label: 'Exactly n − 1 edges', isCorrect: false, feedback: 'n − 1 is the number of edges in the final spanning tree, not the number of candidate edges. Every pair of points can potentially be connected, giving O(n²) candidates.' },
        { label: 'The number of edges depends on coordinates', isCorrect: false, feedback: 'Every pair of distinct points is a valid edge regardless of their coordinates. With n points, that is always n(n−1)/2 candidate edges.' },
      ],
      correctFeedback: 'With n = 1000 points, you have 1000 × 999 / 2 ≈ 500,000 candidate edges. Your MST algorithm must handle this dense graph efficiently.',
      wrongFeedback: [
        'How many pairs can you form from 1000 points? That is the number of potential edges.',
        'With n points all potentially connected to each other, the edge count is n(n−1)/2. At n = 1000, what is that?',
      ],
    },
    {
      id: 'edge-weight-definition',
      question: '"The cost of connecting two points is their Manhattan distance." What does Manhattan distance mean for computing edge weights?',
      options: [
        { label: 'Use Euclidean (straight-line) distance', isCorrect: false, feedback: 'Euclidean distance is √((x₁−x₂)² + (y₁−y₂)²). Manhattan distance is |x₁−x₂| + |y₁−y₂| — no square root, no squaring. Using the wrong formula gives wrong edge weights.' },
        { label: '|x₁ − x₂| + |y₁ − y₂| for each pair', isCorrect: true },
        { label: 'Max of |x₁ − x₂| and |y₁ − y₂|', isCorrect: false, feedback: 'That is Chebyshev distance, not Manhattan. Manhattan distance sums the absolute differences in both dimensions independently.' },
        { label: 'Distance only between adjacent grid cells', isCorrect: false, feedback: 'The points are not on a grid — they are arbitrary coordinates. Any two points can be connected, and the cost is always |x₁−x₂| + |y₁−y₂| regardless of proximity.' },
      ],
      correctFeedback: 'Manhattan distance is |x₁−x₂| + |y₁−y₂|. For each of the ~500,000 pairs, compute this as the edge weight before or during your MST construction.',
      wrongFeedback: [
        'Manhattan distance counts steps along axes only — no diagonals. How do you express that mathematically for two points (x₁, y₁) and (x₂, y₂)?',
        'Think of moving on a city grid: you go |Δx| steps horizontally and |Δy| steps vertically. What is the formula?',
      ],
    },
    {
      id: 'output-minimum-spanning-tree',
      question: '"Minimum cost to connect all points" — every point must be reachable from every other. What problem structure does this describe?',
      options: [
        { label: 'Shortest path between two points', isCorrect: false, feedback: 'Shortest path connects two specific points. This problem requires all points to be connected to each other with minimum total edge cost — that is a spanning tree problem, not a shortest path.' },
        { label: 'Minimum spanning tree (MST)', isCorrect: true },
        { label: 'Maximum flow between source and sink', isCorrect: false, feedback: 'Maximum flow models capacity through a network between two endpoints. This problem has no source or sink — it asks for the minimum-cost set of edges that connects all nodes.' },
        { label: 'Topological sort of point dependencies', isCorrect: false, feedback: 'Topological sort applies to directed acyclic graphs with ordering constraints. Here the graph is undirected and the goal is connectivity with minimum total weight — a spanning tree.' },
      ],
      correctFeedback: 'Connecting all n points with minimum total cost and no redundant edges is exactly a Minimum Spanning Tree. An MST on n nodes uses exactly n−1 edges.',
      wrongFeedback: [
        'You need all points connected, every point reachable from every other, at minimum total cost. What graph structure satisfies connectivity with exactly n−1 edges?',
        'A tree on n nodes connects all nodes with n−1 edges and no cycles. The minimum-weight such tree has a name — what is it?',
      ],
    },
    {
      id: 'single-point-guarantee',
      question: '"No two points are the same" and points.length can be 1. What edge case does the constraint introduce?',
      options: [
        { label: 'Handle duplicate coordinates', isCorrect: false, feedback: 'The constraint explicitly guarantees no duplicate points. You do not need to deduplicate. The edge case is a single point, not duplicates.' },
        { label: 'Return 0 when only one point exists', isCorrect: true },
        { label: 'The graph may have negative-weight edges', isCorrect: false, feedback: 'Manhattan distance is always non-negative — it is a sum of absolute values. Negative weights are impossible here, so you do not need algorithms designed for negative edges.' },
        { label: 'Some points may be unreachable', isCorrect: false, feedback: 'Every pair of points is a valid edge, so the graph is fully connected — no point is ever unreachable. The only special case is a single point with no edges to form.' },
      ],
      correctFeedback: 'With one point, there are no edges to add and no cost — the single point is already "connected." Return 0. Most MST implementations handle this naturally if initialized correctly.',
      wrongFeedback: [
        'If points.length == 1, how many edges does the minimum spanning tree contain? What is its total cost?',
        'A spanning tree on n nodes has n−1 edges. When n = 1, that is 0 edges. What cost does 0 edges produce?',
      ],
    },
  ],
}
