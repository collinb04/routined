export default {
  id: 'car-fleet',
  title: 'Car Fleet',
  difficulty: 'medium',
  description: `<p>There are <code>n</code> cars going to the same destination along a one-lane road. The destination is <code>target</code> miles away. You are given two integer arrays <code>position</code> and <code>speed</code>.</p><p>A car can never pass another car ahead of it, but it can catch up to it, and they will drive together as one fleet. Return the number of car fleets that will arrive at the destination.</p>`,
  examples: [
    { input: 'target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]', output: '3' },
  ],
  constraints: ['n == position.length == speed.length', '1 <= n <= 10^5', '0 < target <= 10^6'],
  starterCode: `def car_fleet(target, position, speed):
  pass`,
  functionName: 'car_fleet',
  conceptId: 'stack',
  testCases: [
    { label: 'target=12', args: [12, [10,8,0,5,3], [2,4,1,1,3]], expected: 3 },
    { label: 'single', args: [10, [3], [3]], expected: 1 },
  ],
  bruteHint: 'Describe simulating each car pair-by-pair and repeatedly rescanning to resolve merges, and its time complexity',
  optimizeHint: 'Name the data structure that processes cars from back to front in a single pass while holding onto unresolved fleets',
  clues: [
    {
      id: 'no-passing-rule',
      question: '"A car can never pass another car ahead of it." What does this guarantee about fleet formation?',
      options: [
        { label: 'Faster cars always form their own fleet', isCorrect: false, feedback: 'A faster car behind a slower car cannot pass — it joins the slower car\'s fleet instead. Speed alone does not determine fleet membership.' },
        { label: 'A car catches a fleet only if its arrival time is faster than the car ahead', isCorrect: true },
        { label: 'All cars merge into one fleet eventually', isCorrect: false, feedback: 'Cars that start far behind slower cars may never catch up before the destination. The no-passing rule limits merging, not guarantees it.' },
        { label: 'Process cars from slowest to fastest', isCorrect: false, feedback: 'Speed ordering is irrelevant here. What matters is position — which car is closest to the target determines what a car behind it can merge with.' },
      ],
      correctFeedback: 'If a car behind arrives at the target no later than the car ahead of it, it catches that fleet and they merge. Comparing arrival times is the key test.',
      wrongFeedback: [
        'Two cars form a fleet when the one behind would reach the target before the one ahead. What quantity captures that comparison directly?',
        'Compute arrival_time = (target - position) / speed for each car. When does a car from behind join the fleet ahead?',
      ],
    },
    {
      id: 'position-sort',
      question: 'Cars are given in arbitrary position order. What must you do before comparing fleets?',
      options: [
        { label: 'Sort by speed descending', isCorrect: false, feedback: 'Speed alone does not determine which car is ahead of which. Position determines whether a car can catch another.' },
        { label: 'Sort by position descending (closest to target first)', isCorrect: true },
        { label: 'Process in input order', isCorrect: false, feedback: 'Input order is arbitrary. A car at position 10 must be compared to the car that is ahead of it (closer to the target), not to the car listed next in the array.' },
        { label: 'Sort by arrival time ascending', isCorrect: false, feedback: 'You need arrival times to compare fleets, but the sort should be by position so you process cars from front to back — position sort first, then compute arrival times.' },
      ],
      correctFeedback: 'Sort by position descending so you process cars from front (closest to target) to back. Each car is then compared against the nearest car ahead of it.',
      wrongFeedback: [
        'Fleet merging depends on which car is physically ahead on the road. How do you recover that ordering from the input?',
        'Sort positions descending, then pair each car with position[i] and speed[i]. Now the first car in your list is the one closest to the target.',
      ],
    },
    {
      id: 'arrival-time-comparison',
      question: 'A car forms a new fleet only if it arrives strictly later than the fleet in front. What structure tracks this efficiently?',
      options: [
        { label: 'Compare all pairs of arrival times', isCorrect: false, feedback: 'Comparing all pairs is O(n²). A car only needs to be compared with the nearest fleet ahead, not every other car.' },
        { label: 'A stack of arrival times of distinct fleets', isCorrect: true },
        { label: 'A sorted set of all arrival times', isCorrect: false, feedback: 'A sorted set does not capture the spatial ordering of fleets. You need to compare each car with the one directly ahead, which a stack naturally provides.' },
        { label: 'Count cars whose speed exceeds the average', isCorrect: false, feedback: 'Average speed is irrelevant. Fleet formation depends entirely on arrival time relative to the nearest car ahead.' },
      ],
      correctFeedback: 'Push each car\'s arrival time onto the stack. If the new time is ≤ the stack top, the car merges into the fleet ahead (pop or skip). The stack size at the end is the fleet count.',
      wrongFeedback: [
        'After sorting by position, each car compares to the one directly in front. What structure gives you O(1) access to the most recent distinct fleet?',
        'A stack holds the arrival times of fleets that have not been merged yet. When does a new car merge versus form a new fleet?',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'n ≤ 10⁵ tells you…',
      options: [
        { label: 'O(n²) comparison of all pairs is acceptable', isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations — too slow. You need at most O(n log n) for the sort plus O(n) for the stack pass.' },
        { label: 'O(n log n) for sort plus O(n) stack pass is the target', isCorrect: true },
        { label: 'O(log n) binary search on positions is sufficient', isCorrect: false, feedback: 'You must process every car at least once, so O(log n) is not achievable. The dominant cost is the sort at O(n log n).' },
        { label: 'n is small enough that any approach works', isCorrect: false, feedback: 'At 100,000 cars, an O(n²) approach takes 10 billion operations — beyond what finishes in time.' },
      ],
      correctFeedback: 'Sorting n = 100,000 cars takes O(n log n) ≈ 1.7 million comparisons. The single stack pass is O(n). Together they are well within time limits.',
      wrongFeedback: [
        'At n = 100,000, what does O(n²) mean in operations? What does O(n log n) mean?',
        'The sort dominates at O(n log n). After sorting, what is the complexity of a single left-to-right stack pass?',
      ],
    },
  ],
}
