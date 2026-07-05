export default {
  id: 'maximum-total-importance-roads',
  title: 'Maximum Total Importance of Roads',
  difficulty: 'medium',
  description: 'Given n cities (0-indexed) and bidirectional roads, assign values 1-n to cities (each value used once) to maximize the sum of road importances. A road\'s importance is the sum of its two city values.',
  examples: [
    { input: 'n=5, roads=[[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]', output: '43' },
    { input: 'n=5, roads=[[0,3],[2,4],[1,3]]', output: '20' },
  ],
  constraints: ['2 ≤ n ≤ 5 × 10⁴', '1 ≤ roads.length ≤ 5 × 10⁴'],
  starterCode: `def maximum_importance(n, roads):
  pass`,
  functionName: 'maximum_importance',
  conceptId: 'graphs',
  testCases: [
    { label: 'Six roads', args: [5,[[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]], expected: 43 },
    { label: 'Three roads', args: [5,[[0,3],[2,4],[1,3]]], expected: 20 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 5 × 10⁴ cities and roads.length ≤ 5 × 10⁴. What complexity is acceptable?',
      options: [
        { label: 'O(n²) comparison of all city pairs', isCorrect: false, feedback: 'At n = 50,000, O(n²) is 2.5 billion operations — far too slow. You cannot afford to compare every pair of cities directly.' },
        { label: 'O(n log n) with a sort', isCorrect: true },
        { label: 'O(n) only — no sorting allowed', isCorrect: false, feedback: 'O(n log n) is perfectly acceptable at n = 50,000. Sorting 50,000 elements takes about 800,000 operations — trivial. There is no reason to avoid a sort.' },
        { label: 'Input size is irrelevant here', isCorrect: false, feedback: 'n = 50,000 rules out quadratic approaches but permits sorting. Input size directly determines whether your value-assignment strategy is fast enough.' },
      ],
      correctFeedback: 'At n = 50,000, O(n²) is 2.5 billion operations — too slow. O(n log n) fits comfortably, which is the cost of sorting the degree counts before assigning values.',
      wrongFeedback: [
        'At n = 50,000, how many operations does an O(n²) algorithm perform? Is that acceptable?',
        'You need to assign values to n cities in order of some property. What is the cost of sorting n items?',
      ],
    },
    {
      id: 'value-assignment-insight',
      question: 'Each city is assigned a unique value from 1 to n. A road\'s importance is the sum of its two city values. What determines which city should get the highest value?',
      options: [
        { label: 'The city with the lowest label number', isCorrect: false, feedback: 'City labels (0, 1, 2…) are just identifiers — they have nothing to do with optimal value assignment. What matters is how many roads each city appears in.' },
        { label: 'The city with the most roads (highest degree)', isCorrect: true },
        { label: 'The city closest to the center of the graph', isCorrect: false, feedback: 'Graph centrality has no bearing on this problem. A city\'s contribution to total importance is its value multiplied by its degree — higher degree should get higher value.' },
        { label: 'Assign values randomly and compute all permutations', isCorrect: false, feedback: 'There are n! permutations — at n = 50,000 that is astronomical. The optimal assignment follows a greedy rule based on degree, not exhaustive search.' },
      ],
      correctFeedback: 'Every road a city belongs to adds its value once to the total. A city with degree d contributes value × d. To maximize the sum, assign the highest value n to the city with the highest degree.',
      wrongFeedback: [
        'A city with 5 roads contributes its value to 5 different road importances. What does that suggest about which city should receive the largest value?',
        'Think of it as: each city\'s value is multiplied by the number of roads it appears in. To maximize the total, what should you multiply the highest value by?',
      ],
    },
    {
      id: 'greedy-ordering',
      question: 'Values 1 through n are each used exactly once. What is the optimal assignment strategy?',
      options: [
        { label: 'Assign values in random order', isCorrect: false, feedback: 'Random assignment produces an expected-average total, not the maximum. The optimal strategy is deterministic: sort cities by degree and assign values in ascending order.' },
        { label: 'Sort cities by degree; assign value 1 to lowest, n to highest', isCorrect: true },
        { label: 'Assign value n to the city with the fewest roads', isCorrect: false, feedback: 'Giving the highest value to the lowest-degree city wastes it. A city with one road contributes its value only once. You want n multiplied by the degree that appears most often.' },
        { label: 'Give all high-degree cities the same value', isCorrect: false, feedback: 'Each value must be used exactly once — ties in assignment are not allowed. You rank cities by degree and assign distinct consecutive values accordingly.' },
      ],
      correctFeedback: 'Sort cities by degree ascending. Assign value 1 to the lowest-degree city, value 2 to the next, and so on up to value n for the highest-degree city. This greedy ordering is provably optimal.',
      wrongFeedback: [
        'You want to maximize the weighted sum where each city\'s weight is its degree. How do you pair weights with values to maximize a sum?',
        'In a sum of products, you maximize by pairing the largest value with the largest weight. Here the "weight" is each city\'s degree.',
      ],
    },
  ],
}
