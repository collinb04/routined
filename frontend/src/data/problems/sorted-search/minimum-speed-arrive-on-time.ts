export default {
  id: 'minimum-speed-arrive-on-time',
  title: 'Minimum Speed to Arrive on Time',
  difficulty: 'medium',
  description: 'You have <code>n</code> trains to take in sequence, with integer distances. You must arrive at exactly <code>hour</code> hours (decimal). Find the minimum speed (integer) to arrive on time, or -1 if impossible.',
  examples: [
    { input: 'dist=[1,3,2], hour=6', output: '1', explanation: 'At speed 1: 1+3+2=6 hours.' },
    { input: 'dist=[1,3,2], hour=2.7', output: '3' },
    { input: 'dist=[1,3,2], hour=1.9', output: '-1' },
  ],
  constraints: ['n == dist.length', '1 ≤ n ≤ 10⁵', '1 ≤ dist[i] ≤ 10⁵', '1 ≤ hour ≤ 10⁷'],
  starterCode: `def min_speed_on_time(dist, hour):
  pass`,
  functionName: 'min_speed_on_time',
  conceptId: 'binary-search',
  testCases: [
    { label: 'Speed 1', args: [[1,3,2],6], expected: 1 },
    { label: 'Speed 3', args: [[1,3,2],2.7], expected: 3 },
    { label: 'Impossible', args: [[1,3,2],1.9], expected: -1 },
  ],
  bruteHint: 'Describe trying every integer speed starting from 1 upward and checking feasibility for each, and why that could be slow',
  optimizeHint: 'Name the search technique that exploits the fact that feasibility is monotone in speed',
  clues: [
    {
      id: 'monotone-feasibility',
      question: 'If speed s gets you there on time, does any speed greater than s also work? What does this property enable?',
      options: [
        { label: 'Greedy: always pick the largest dist', isCorrect: false },
        { label: 'Binary search on the answer', isCorrect: true },
        { label: 'Dynamic programming on subarrays', isCorrect: false, feedback: 'DP breaks a problem into overlapping subproblems. Speed feasibility has no overlapping subproblems — it\'s a single monotone yes/no function.' },
        { label: 'Sort distances, then scan', isCorrect: false, feedback: 'Sorting the distances would change the travel order. The trains run in a fixed sequence, so order is not yours to change.' },
      ],
      correctFeedback: 'Feasibility is monotone: if speed s works, every speed above s also works. That monotone yes/no function is exactly what binary search exploits, cutting the search space in half each step.',
      wrongFeedback: [
        'Higher speed always means less or equal travel time. If feasible(s) is true, what can you say about feasible(s+1)?',
        'When a predicate flips from false to true at some threshold and never flips back, one classic algorithm finds that threshold in O(log(search space)) time.',
      ],
    },
    {
      id: 'search-space-bounds',
      question: 'n ≤ 10⁵ and dist[i] ≤ 10⁵. What is a safe upper bound for the binary search range?',
      options: [
        { label: '10⁷ (from hour upper bound)', isCorrect: false, feedback: 'hour bounds time, not speed. The worst-case minimum speed is driven by the maximum distance and the tightest time budget, not by hour directly.' },
        { label: '10⁵ (maximum dist value)', isCorrect: true },
        { label: '10⁵ × 10⁵ = 10¹⁰', isCorrect: false, feedback: 'That upper bound is correct but far too loose — binary search over 10¹⁰ values takes about 33 iterations, which is fine, but 10⁵ is a tighter and cleaner bound given the constraints.' },
        { label: 'n × max(dist[i])', isCorrect: false },
      ],
      correctFeedback: 'At speed 10⁵ you cover any single leg in 1 hour. Since each non-final leg is ceiling-rounded and dist[i] ≤ 10⁵, speed 10⁵ is always sufficient — making it a safe upper bound for binary search.',
      wrongFeedback: [
        'What is the slowest possible speed that still guarantees each dist[i] can be covered in at most 1 hour?',
        'Speed 10⁵ covers even the longest leg (dist[i] ≤ 10⁵) in exactly 1 hour. How many values does that leave to binary-search over?',
      ],
    },
    {
      id: 'ceiling-rounding-rule',
      question: 'All trains except the last depart on the hour (ceiling rounding). How does this affect feasibility checking?',
      options: [
        { label: 'Ignore the last train; check the rest', isCorrect: false, feedback: 'The last train\'s time is not ceiling-rounded — it uses exact division. Ignoring it means you\'re not accounting for the fractional arrival time.' },
        { label: 'Sum ceil(dist/speed) for all but last, then add exact for last', isCorrect: true },
        { label: 'Use exact division for every train', isCorrect: false, feedback: 'Exact division applies only to the final leg. Earlier trains wait for the next departure hour, so you must ceiling their travel times.' },
        { label: 'Use ceiling division for every train', isCorrect: false, feedback: 'The last train\'s arrival time is fractional — you cannot ceiling-round it, or you\'d overcount and declare feasible solutions impossible.' },
      ],
      correctFeedback: 'The first n-1 legs are ceiling-rounded (you wait for the next whole hour); only the last leg uses exact division. A feasibility check must mix both, or it will misclassify edge cases near the boundary.',
      wrongFeedback: [
        'The problem says "depart on the hour" for all but the last. What does "depart on the hour" imply about how you round each intermediate travel time?',
        'Two different rounding rules apply to two different groups of trains. What is each group, and which rule applies to which?',
      ],
    },
    {
      id: 'impossible-case',
      question: 'The problem returns -1 when arrival is impossible. When is it definitely impossible regardless of speed?',
      options: [
        { label: 'When n > hour', isCorrect: false, feedback: 'n > hour is a necessary condition (you need at least n-1 full hours for the first n-1 trains), but it\'s not "definitely impossible." When hour ≤ n-1 is the precise cutoff.' },
        { label: 'When hour ≤ n − 1', isCorrect: true },
        { label: 'When any dist[i] > hour', isCorrect: false, feedback: 'Increasing speed reduces travel time per leg. A large dist[i] is not a hard blocker — it just requires higher speed.' },
        { label: 'When sum(dist) > hour', isCorrect: false, feedback: 'Sum of distances is not the bottleneck because the ceiling rounding on intermediate trains dominates. You could have tiny distances but still miss if n−1 ≥ hour.' },
      ],
      correctFeedback: 'The first n-1 trains each consume at least 1 full hour (ceiling rounding). If hour ≤ n-1, there\'s zero time left for the last train, making arrival impossible at any speed.',
      wrongFeedback: [
        'Each of the first n-1 trains takes at least 1 full hour due to ceiling rounding. What does that imply about the minimum possible total time?',
        'If the first n-1 trains consume at least n-1 hours, what must be true about hour for there to be any time left for the final leg?',
      ],
    },
  ],
}
