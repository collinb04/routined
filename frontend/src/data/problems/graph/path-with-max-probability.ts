export default {
  id: 'path-with-max-probability',
  title: 'Path with Maximum Probability',
  difficulty: 'medium',
  description: 'You are given an undirected weighted graph. Find the path from <code>start</code> to <code>end</code> with the maximum probability. Return 0 if no path exists.',
  examples: [
    { input: 'n=3, edges=[[0,1],[1,2],[0,2]], succProb=[0.5,0.5,0.2], start=0, end=2', output: '0.25', explanation: '0→1→2 has probability 0.5*0.5=0.25, better than 0→2=0.2.' },
  ],
  constraints: ['2 ≤ n ≤ 10⁴', '0 ≤ start, end < n', '0 < succProb[i] ≤ 1'],
  starterCode: `def max_probability(n, edges, succ_prob, start, end):
  pass`,
  functionName: 'max_probability',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: 'Path via 1', args: [3,[[0,1],[1,2],[0,2]],[0.5,0.5,0.2],0,2], expected: 0.25 },
    { label: 'Direct path better', args: [3,[[0,1],[1,2],[0,2]],[0.5,0.5,0.2+0.05],0,2], expected: 0.3 },
  ],
  bruteHint: 'Describe a brute-force DFS that explores every possible path from start to end, and why that blows up combinatorially',
  optimizeHint: 'Name the shortest-path algorithm you can adapt with a max-heap to maximize a product instead of minimizing a sum',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 10,000 nodes. What does this tell you about acceptable algorithm complexity?',
      options: [
        { label: 'O(n²) is acceptable', isCorrect: false, feedback: 'At n = 10,000, O(n²) is 100 million operations — borderline at best. For a graph problem you\'ll also traverse edges, so you want something closer to O((n + E) log n).' },
        { label: 'O((n + E) log n) with a priority queue', isCorrect: true },
        { label: 'O(n!) — try all paths', isCorrect: false, feedback: 'O(n!) is astronomically worse than exponential. With n = 10,000 nodes, even O(n²) is slow. Enumerating all paths is never viable at this scale.' },
        { label: 'Linear O(n) is required', isCorrect: false, feedback: 'O(n) would mean not examining most edges, which isn\'t possible when edge weights determine the answer. O((n + E) log n) via a priority queue is the realistic target.' },
      ],
      correctFeedback: 'With up to 10,000 nodes, a Dijkstra-style priority queue at O((n + E) log n) is the right complexity target — it processes each edge once and the heap keeps the overhead logarithmic.',
      wrongFeedback: [
        'Think about what algorithm finds the "best" path in a weighted graph at reasonable scale. What data structure does it use, and what is its complexity?',
        'You need the highest-probability path across potentially thousands of nodes. A greedy approach with a max-heap visits each node in best-first order — what is that pattern called?',
      ],
    },
    {
      id: 'objective-maximization',
      question: 'Standard shortest-path algorithms minimize cost. This problem maximizes probability. What adaptation does that require?',
      options: [
        { label: 'Negate probabilities to use a min-heap', isCorrect: false, feedback: 'Negating log-probabilities works, but you don\'t need logs at all. The cleaner adaptation is using a max-heap directly and relaxing neighbors when you find a higher probability — not a lower cost.' },
        { label: 'Use a max-heap, relax on higher probability', isCorrect: true },
        { label: 'Use BFS — weights don\'t matter for max', isCorrect: false, feedback: 'BFS ignores edge weights entirely. The probability of a path depends on multiplying edge weights along it — BFS has no mechanism to prefer higher-probability paths.' },
        { label: 'Sort edges by probability descending first', isCorrect: false, feedback: 'Sorting edges doesn\'t account for the path structure — a high-probability edge might dead-end, while a sequence of medium-probability edges could win. You need to evaluate full paths, not individual edges.' },
      ],
      correctFeedback: 'Flip Dijkstra\'s logic: use a max-heap keyed by probability, and update a neighbor only when the new path probability exceeds the best known. The rest of the algorithm is identical to standard Dijkstra.',
      wrongFeedback: [
        'In Dijkstra you pop the minimum-cost node and relax neighbors if you find a lower cost. How would you adapt both of those decisions to maximize instead of minimize?',
        'The structure is the same as Dijkstra — just invert the comparison. What data structure gives you the highest-probability node each time?',
      ],
    },
    {
      id: 'probability-combination',
      question: 'Edge probabilities represent success probability. When you traverse two edges with probabilities 0.5 and 0.5, the combined probability is 0.25 (0.5 × 0.5). What does this mean for the path comparison?',
      options: [
        { label: 'Sum probabilities along the path', isCorrect: false, feedback: 'Summing would give 1.0 for two 0.5 edges — higher than any single probability. Probabilities along independent events multiply, they don\'t add. 0.5 × 0.5 = 0.25, not 1.0.' },
        { label: 'Multiply probabilities; longer paths are not always better', isCorrect: true },
        { label: 'More hops always means lower probability', isCorrect: false, feedback: 'More hops means more multiplications, but if each factor is close to 1, the product stays high. A 3-hop path through 0.9 × 0.9 × 0.9 = 0.73 beats a direct edge of 0.5. Count hops doesn\'t determine outcome.' },
        { label: 'Use the minimum edge probability on any path', isCorrect: false, feedback: 'Minimum edge is the bottleneck heuristic, but that applies to flow problems — not probability. Here you multiply all edge probabilities along the path; the minimum alone doesn\'t capture the full product.' },
      ],
      correctFeedback: 'Path probability is the product of all edge probabilities along it. A shorter path isn\'t guaranteed to win — it depends on the actual probability values. This multiplicative structure is why you need a graph search, not a greedy edge selection.',
      wrongFeedback: [
        'If you flip two coins in sequence, what\'s the probability of getting heads both times? That\'s the same operation you apply to path edges.',
        'Independent probabilities multiply. So the path score is a product, not a sum — and a path with more edges can still win if those edges have high probabilities.',
      ],
    },
  ],
}
