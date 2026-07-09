export default {
  id: 'non-overlapping-intervals',
  title: 'Non-overlapping Intervals',
  difficulty: 'medium',
  description: 'Given an array of intervals, return the minimum number of intervals you need to remove to make the rest non-overlapping.',
  examples: [
    { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1', explanation: 'Remove [1,3] and the rest are non-overlapping.' },
    { input: 'intervals = [[1,2],[1,2],[1,2]]', output: '2' },
  ],
  constraints: ['1 ≤ intervals.length ≤ 10⁵', 'intervals[i].length == 2', '-5 × 10⁴ ≤ start < end ≤ 5 × 10⁴'],
  starterCode: `def erase_overlap_intervals(intervals):
  pass`,
  functionName: 'erase_overlap_intervals',
  conceptId: 'intervals',
  testCases: [
    { label: 'Remove one', args: [[[1,2],[2,3],[3,4],[1,3]]], expected: 1 },
    { label: 'Remove two', args: [[[1,2],[1,2],[1,2]]], expected: 2 },
    { label: 'No removal', args: [[[1,2],[2,3]]], expected: 0 },
    { label: 'All overlap', args: [[[1,4],[1,4],[1,4]]], expected: 2 },
  ],
  bruteHint: 'Describe comparing every pair of intervals (or trying combinations) to determine which to remove, and its time complexity',
  optimizeHint: 'Name the greedy strategy — sorting by end time — that lets you keep the maximum non-overlapping set in one pass',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'intervals.length ≤ 10⁵ tells you…',
      options: [
        { label: 'O(n²) is acceptable', isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations — far too slow. You need at most O(n log n).' },
        { label: 'O(n log n) is the target complexity', isCorrect: true },
        { label: 'O(n) is required — no sorting allowed', isCorrect: false, feedback: 'O(n log n) is acceptable and natural here — sorting the intervals is the first step. A sub-linear solution isn\'t achievable since you must examine every interval.' },
        { label: 'Use a hash map for O(1) lookups', isCorrect: false, feedback: 'Intervals aren\'t discrete keys you can hash for membership. The structure of this problem calls for sorting and a greedy sweep, not hash lookups.' },
      ],
      correctFeedback: 'At n = 100,000, O(n²) is 10 billion operations — too slow. Sorting takes O(n log n), and a single greedy pass takes O(n), giving O(n log n) overall.',
      wrongFeedback: [
        'What does O(n²) look like at n = 100,000? Is that feasible?',
        '100,000² = 10 billion operations. You need a strategy that sorts once and scans linearly after.',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is the minimum number of intervals to remove, not which ones. This means…',
      options: [
        { label: 'Record which intervals to remove', isCorrect: false, feedback: 'Tracking specific intervals isn\'t required. The output is a count — you just need to know how many removals are needed, not which intervals they were.' },
        { label: 'Maximize intervals kept, then subtract from n', isCorrect: true },
        { label: 'Find the intervals that cause the most conflicts', isCorrect: false, feedback: 'Identifying the "most conflicting" intervals doesn\'t directly give you the minimum removal count. The equivalent and cleaner framing is: keep the maximum non-overlapping set, then n minus that count is your answer.' },
        { label: 'Enumerate all valid non-overlapping subsets', isCorrect: false, feedback: 'Enumeration would be exponential. The greedy insight is that you can find the optimal subset in O(n log n) without exploring all possibilities.' },
      ],
      correctFeedback: 'Minimum removals = n − maximum intervals kept. Framing it as "keep the most" turns this into a classic greedy interval scheduling problem.',
      wrongFeedback: [
        'If you had to remove as few as possible, what\'s the equivalent way to think about it in terms of what you keep?',
        'Minimum removals = n − maximum non-overlapping intervals. How do you find the maximum non-overlapping set greedily?',
      ],
    },
    {
      id: 'greedy-sort-by-end',
      question: 'To maximize the number of non-overlapping intervals you keep, what should you sort by?',
      options: [
        { label: 'Sort by start time', isCorrect: false, feedback: 'Sorting by start time is useful for detecting overlaps, but doesn\'t give you the greedy property for maximizing kept intervals. An interval that starts early but ends late blocks many future intervals.' },
        { label: 'Sort by end time', isCorrect: true },
        { label: 'Sort by interval length (shortest first)', isCorrect: false, feedback: 'Shortest first sounds greedy but doesn\'t work. A short interval that starts late might block fewer future intervals than a short interval that starts early, depending on position.' },
        { label: 'Sort by start time descending', isCorrect: false, feedback: 'Processing from right to left with start time doesn\'t give you a valid greedy property here. You want to select intervals that end as early as possible to leave maximum room for future ones.' },
      ],
      correctFeedback: 'Sorting by end time is the classic interval scheduling greedy. Always keeping the interval with the earliest end leaves the most room for future intervals — it never hurts to choose it over any later-ending alternative.',
      wrongFeedback: [
        'You want to keep as many intervals as possible. After selecting one, which property of the next candidate helps you keep the most future ones?',
        'An interval that ends earliest leaves the most time available for subsequent intervals. That\'s the greedy invariant — sort by end time and always prefer the earliest end.',
      ],
    },
    {
      id: 'touching-boundary',
      question: 'The first example shows [[1,2],[2,3],[3,4],[1,3]] requires only 1 removal, keeping [1,2],[2,3],[3,4]. Meetings touching at endpoints are considered non-overlapping. What does this mean for your overlap check?',
      options: [
        { label: 'Overlap when next.start < current.end (strict)', isCorrect: true },
        { label: 'Overlap when next.start ≤ current.end', isCorrect: false, feedback: 'Using ≤ would flag [1,2] and [2,3] as overlapping, requiring a removal where none is needed. The example shows they can coexist — touching boundaries don\'t conflict.' },
        { label: 'Overlap when next.start == current.start', isCorrect: false, feedback: 'Same start definitely means overlap, but that\'s only one case. [1,3] and [2,3] overlap too, with different starts. The full condition compares next.start to the current end.' },
        { label: 'Overlap when next.end > current.end', isCorrect: false, feedback: 'This compares the wrong values. To know if a new interval conflicts with the current boundary, compare next.start to current.end — not the ends to each other.' },
      ],
      correctFeedback: 'Two intervals conflict only when next.start < current.end (strict). If next.start == current.end, they touch but don\'t overlap and both can be kept.',
      wrongFeedback: [
        'The test case [1,2],[2,3] should return 0 removals. What comparison between 2 (next.start) and 2 (current.end) correctly identifies no conflict?',
        'Strict less-than: 2 < 2 is false, so no conflict. Using ≤ would incorrectly flag touching intervals as overlapping.',
      ],
    },
  ],
}
