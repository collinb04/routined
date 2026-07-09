export default {
  id: 'merge-intervals',
  title: 'Merge Intervals',
  difficulty: 'medium',
  description: 'Given an array of intervals, merge all overlapping intervals and return an array of the non-overlapping intervals.',
  examples: [
    { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: '[1,3] and [2,6] overlap, so they merge to [1,6].' },
    { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]', explanation: 'They share a boundary, so they merge.' },
  ],
  constraints: ['1 ≤ intervals.length ≤ 10⁴', 'intervals[i].length == 2', '0 ≤ start ≤ end ≤ 10⁴'],
  starterCode: `def merge(intervals):
  pass`,
  functionName: 'merge',
  conceptId: 'intervals',
  testCases: [
    { label: 'Two overlapping', args: [[[1,3],[2,6],[8,10],[15,18]]], expected: [[1,6],[8,10],[15,18]] },
    { label: 'Touching', args: [[[1,4],[4,5]]], expected: [[1,5]] },
    { label: 'No overlap', args: [[[1,2],[3,4]]], expected: [[1,2],[3,4]] },
    { label: 'All overlap', args: [[[1,10],[2,3],[4,7]]], expected: [[1,10]] },
  ],
  bruteHint: 'Describe repeatedly comparing every pair of intervals to find and merge overlaps, and its time complexity',
  optimizeHint: 'Name what sorting the intervals by start time lets you do in a single pass',
  clues: [
    {
      id: 'output-structure',
      question: 'The output is a list of merged intervals, not a boolean or count. This means…',
      options: [
        { label: 'Build a new list of resulting intervals', isCorrect: true },
        { label: 'Return indices of overlapping intervals', isCorrect: false, feedback: 'The output is the merged intervals themselves, not positions in the original array. You need to construct new [start, end] pairs, not track where old ones were.' },
        { label: 'Modify intervals in-place, removing duplicates', isCorrect: false, feedback: 'In-place removal is tricky and error-prone here. The cleaner approach is building a result list of merged intervals as you sweep through.' },
        { label: 'Count how many groups remain after merging', isCorrect: false, feedback: 'A count would answer a different question. The output requires the actual merged intervals, not just how many there are.' },
      ],
      correctFeedback: 'You need to produce the merged interval list itself. That means maintaining a result list and extending or appending as you process each interval.',
      wrongFeedback: [
        'The output is [[1,6],[8,10],[15,18]] — actual interval pairs. What do you need to build as you process the input?',
        'You\'re constructing new intervals by combining overlapping ones. Think about what goes into your result list and when.',
      ],
    },
    {
      id: 'sort-first',
      question: 'Intervals arrive in arbitrary order. What must you do before you can merge in a single pass?',
      options: [
        { label: 'Sort by end time', isCorrect: false, feedback: 'Sorting by end time doesn\'t guarantee that adjacent intervals in sorted order are candidates for merging. Two intervals that share a start time but have different ends would be split apart. Sort by start time to ensure merge candidates are adjacent.' },
        { label: 'Sort by start time', isCorrect: true },
        { label: 'Sort by interval length', isCorrect: false, feedback: 'Length sorting doesn\'t help — overlap is determined by where intervals sit on the number line, not how wide they are. Two short intervals can overlap; a short and long interval may not.' },
        { label: 'No sorting needed; use a hash map', isCorrect: false, feedback: 'A hash map doesn\'t capture the ordering relationships between intervals. Without sorting, you\'d need to compare every interval against every other — O(n²) work.' },
      ],
      correctFeedback: 'Sorting by start time ensures that any interval that could overlap with the current one comes immediately after it. That makes a single left-to-right sweep sufficient.',
      wrongFeedback: [
        'You want to process intervals left to right so overlapping ones are adjacent. What ordering makes that possible?',
        'After sorting by start time, any interval that starts inside the current one will appear next in the list. Why does that allow a single pass?',
      ],
    },
    {
      id: 'merge-condition',
      question: 'The example shows [1,4] and [4,5] merge to [1,5]. What overlap condition handles touching endpoints correctly?',
      options: [
        { label: 'Merge when next.start < current.end (strict)', isCorrect: false, feedback: 'Strict less-than would miss the touching case: [1,4] and [4,5] have next.start == current.end, so they wouldn\'t merge. The example shows they should.' },
        { label: 'Merge when next.start ≤ current.end', isCorrect: true },
        { label: 'Merge only when next.start == current.start', isCorrect: false, feedback: 'Identical starts do imply overlap, but that\'s just one case. Two intervals can overlap or touch without sharing a start time — [1,4] and [4,5] are an example.' },
        { label: 'Merge when next.end > current.start', isCorrect: false, feedback: 'This compares the wrong endpoints. To know if the next interval starts within the current one, compare next.start to current.end, not next.end to current.start.' },
      ],
      correctFeedback: 'Touching boundaries count as overlap here, so the merge condition is next.start ≤ current.end. When they merge, the new end is max(current.end, next.end) to handle containment.',
      wrongFeedback: [
        'The test case [1,4],[4,5] → [1,5] requires merging when next.start equals current.end. Which comparison allows that?',
        'Should the boundary count as overlapping? The example says yes. Use ≤ to include that case.',
      ],
    },
    {
      id: 'extend-vs-append',
      question: 'When processing a new interval, you either extend the current merged interval or start a new one. What determines which?',
      options: [
        { label: 'Whether the new interval is longer', isCorrect: false, feedback: 'Length doesn\'t determine overlap. A tiny interval can overlap with a huge one, and a huge interval might not overlap at all. The relevant comparison is between start and end times.' },
        { label: 'Whether next.start ≤ last result\'s end', isCorrect: true },
        { label: 'Whether any prior interval touches the new one', isCorrect: false, feedback: 'After sorting, you only ever need to check the last merged interval. If the new interval doesn\'t overlap the most recently merged one, it can\'t overlap any earlier one either — those ended sooner.' },
        { label: 'Whether the new interval is contained in any existing one', isCorrect: false, feedback: 'Containment is just one form of overlap. Checking for containment specifically would miss partial overlaps. The general condition — next.start ≤ last.end — handles both cases.' },
      ],
      correctFeedback: 'After sorting, the last interval in your result list is always the rightmost boundary seen so far. If the new interval starts at or before that boundary, they overlap and you extend. Otherwise, append.',
      wrongFeedback: [
        'Your result list grows as you process. Which interval in your result do you always compare the new one against?',
        'The last interval in your result has the furthest right end seen so far. Compare the new interval\'s start to that end to decide extend or append.',
      ],
    },
  ],
}
