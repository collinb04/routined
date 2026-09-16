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
  starterCode: `class Solution:
    def merge(self, intervals):
        pass`,
  runnerSetup: 'merge = Solution().merge',
  functionName: 'merge',
  conceptId: 'intervals',
  testCases: [
    { label: 'Two overlapping', args: [[[1,3],[2,6],[8,10],[15,18]]], expected: [[1,6],[8,10],[15,18]] },
    { label: 'Touching', args: [[[1,4],[4,5]]], expected: [[1,5]] },
    { label: 'No overlap', args: [[[1,2],[3,4]]], expected: [[1,2],[3,4]] },
    { label: 'All overlap', args: [[[1,10],[2,3],[4,7]]], expected: [[1,10]] },
  ],
  bruteHint: 'The brute-force approach repeatedly scans all intervals, comparing every pair to find one that overlaps, merging them, and restarting the scan since a merge can create new overlaps. Each full pass is O(n), and repeating this until no overlaps remain costs O(n²) time overall. It also risks re-checking already-settled intervals over and over. What single ordering of the intervals would let you catch every overlap in one pass instead?',
  optimizeComplexity: { time: 'O(n log n)', space: 'O(n)' },
  clues: [
    {
      id: 'output-structure',
      question: 'The shape of the expected return value tells you what you actually need to build. The output is a list of merged intervals, not a boolean or count. This means…',
      highlight: { location: 'description', text: 'return an array of the non-overlapping intervals.' },
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
      question: 'When input order is not guaranteed, the first step is often establishing an order you can rely on. Intervals arrive in arbitrary order. What must you do before you can merge in a single pass?',
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
      question: 'Worked examples often encode a boundary rule that the plain description leaves implicit. The example shows [1,4] and [4,5] merge to [1,5]. What overlap condition handles touching endpoints correctly?',
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
      question: 'Once the general rule is set, the remaining question is how to apply it consistently on each pass. When processing a new interval, you either extend the current merged interval or start a new one. What determines which?',
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
  solutionCode: `class Solution:
    def merge(self, intervals):
        intervals.sort(key=lambda x: x[0])
        result = [intervals[0][:]]
        for start, end in intervals[1:]:
            if start <= result[-1][1]:
                result[-1][1] = max(result[-1][1], end)
            else:
                result.append([start, end])
        return result`,
  solutionComplexity: { time: 'O(n log n)', space: 'O(n)' },
  solutionCaveat: 'Sorting a copy of each interval (<code>intervals[0][:]</code>) before mutating <code>result[-1][1]</code> avoids silently corrupting the original input array — mutating a slice of the original list in place would be a subtle bug if the caller still needed the untouched intervals.',
  solutionExplanation: 'Sorting by start time guarantees that any interval which could possibly overlap the one currently being built is either already merged into it or comes immediately next — nothing overlapping can be "hiding" further down the list. That turns the problem into a single left-to-right sweep: extend the last interval in the result whenever the next one starts before (or exactly where) it currently ends, or start a fresh interval otherwise, catching every overlap in one pass instead of repeatedly rescanning.',
}
