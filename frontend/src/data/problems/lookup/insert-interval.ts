export default {
  id: 'insert-interval',
  title: 'Insert Interval',
  difficulty: 'medium',
  description: 'Given an array of non-overlapping intervals sorted by start time, insert a new interval and merge if necessary. Return the resulting array of intervals.',
  examples: [
    { input: 'intervals=[[1,3],[6,9]], newInterval=[2,5]', output: '[[1,5],[6,9]]' },
    { input: 'intervals=[[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval=[4,8]', output: '[[1,2],[3,10],[12,16]]' },
  ],
  constraints: ['0 ≤ intervals.length ≤ 10⁴', 'intervals is sorted and non-overlapping', '0 ≤ newInterval[i] ≤ 10⁵'],
  starterCode: `def insert(intervals, new_interval):
  pass`,
  functionName: 'insert',
  conceptId: 'intervals',
  testCases: [
    { label: 'Overlap in middle', args: [[[1,3],[6,9]],[2,5]], expected: [[1,5],[6,9]] },
    { label: 'Span multiple', args: [[[1,2],[3,5],[6,7],[8,10],[12,16]],[4,8]], expected: [[1,2],[3,10],[12,16]] },
    { label: 'Empty list', args: [[],[5,7]], expected: [[5,7]] },
    { label: 'No overlap before', args: [[[3,5],[6,9]],[1,2]], expected: [[1,2],[3,5],[6,9]] },
  ],
  bruteHint: 'Describe appending the new interval and re-sorting the whole list to merge overlaps, and its time complexity',
  optimizeHint: 'Identify what already being sorted lets you do in a single linear pass',
  clues: [
    {
      id: 'sorted-input-guarantee',
      question: '"intervals is sorted and non-overlapping" — what does this guarantee let you skip?',
      options: [
        { label: 'Sort the input before processing', isCorrect: false, feedback: 'The input is already sorted by start time. Re-sorting is wasted work — the guarantee is telling you the array is ready to scan linearly.' },
        { label: 'Skip re-sorting; scan left to right', isCorrect: true },
        { label: 'Use binary search on every interval', isCorrect: false, feedback: 'Binary search could help locate insertion point, but the broader guarantee is that you never need to sort. A single left-to-right pass handles all three regions: before, overlapping, and after the new interval.' },
        { label: 'Merge pairs before inserting', isCorrect: false, feedback: 'The existing intervals are already non-overlapping — there is nothing to pre-merge. The guarantee means the only new merging you need is caused by the new interval itself.' },
      ],
      correctFeedback: 'Because the list is pre-sorted, you can walk it once: copy intervals that end before the new one starts, merge all that overlap, then copy the rest. No sorting step needed.',
      wrongFeedback: [
        'The constraint says the array is already sorted and non-overlapping. What work does that eliminate?',
        'When input is sorted, you can usually replace an O(n log n) step with a single O(n) pass. What step becomes unnecessary here?',
      ],
    },
    {
      id: 'output-type-intervals',
      question: 'The output is a list of intervals, not a count or boolean. What does your algorithm need to build?',
      options: [
        { label: 'A running count of overlaps', isCorrect: false, feedback: 'A count tells you how many merges happened but not what the merged intervals are. You need to reconstruct the full interval list.' },
        { label: 'A new list accumulating result intervals', isCorrect: false },
        { label: 'An in-place modified version of the input', isCorrect: false, feedback: 'Mutating the input as you scan it risks overwriting intervals you have not yet processed. Building a separate result list keeps regions clean.' },
        { label: 'A result list built in one pass', isCorrect: true },
      ],
      correctFeedback: 'One forward pass: append untouched intervals before the gap, accumulate the merged interval across all overlaps, then append untouched intervals after. The result list is your answer.',
      wrongFeedback: [
        'The return value is a full interval list. What does your loop need to collect as it runs?',
        'You need to produce intervals, not a scalar. Think about building a result list incrementally as you encounter each region.',
      ],
    },
    {
      id: 'overlap-condition',
      question: 'Two intervals overlap when one starts before the other ends. What is the merge rule for the new interval?',
      options: [
        { label: 'Take the union: [min(start), max(end)]', isCorrect: true },
        { label: 'Take the intersection: [max(start), min(end)]', isCorrect: false, feedback: 'Intersection narrows the range — it finds the shared portion. Merging overlapping intervals means expanding to cover both, so you want the union.' },
        { label: 'Keep whichever interval is wider', isCorrect: false, feedback: 'The merged interval must span both ranges. Keeping only the wider one would drop coverage on one side.' },
        { label: 'Average the endpoints', isCorrect: false, feedback: 'Averaging endpoints produces a value inside both intervals, not one that covers them. Merging requires extending to the outermost boundaries.' },
      ],
      correctFeedback: 'The merged interval starts at the minimum of the two starts and ends at the maximum of the two ends, covering both originals completely.',
      wrongFeedback: [
        'If [1,5] and [3,8] overlap, what single interval covers both?',
        'Merging means combining, not intersecting. The result must include every point that either original interval covered.',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'intervals.length ≤ 10⁴ — what does this say about acceptable complexity?',
      options: [
        { label: 'O(n²) is fine at this size', isCorrect: false, feedback: 'At n = 10,000, O(n²) is 100 million operations. Even at this moderate size a nested loop approach is marginal at best — and unnecessary, since the sorted input enables a single pass.' },
        { label: 'O(n log n) or better is needed', isCorrect: false, feedback: 'O(n log n) would work, but the sorted-input guarantee means you do not even need a sort step. A single O(n) pass is achievable and expected here.' },
        { label: 'O(n) is achievable via one pass', isCorrect: true },
        { label: 'Input size does not affect approach', isCorrect: false, feedback: 'Input size always bounds acceptable complexity. With n up to 10,000 a linear scan is both fast enough and, given sorted input, the natural approach.' },
      ],
      correctFeedback: 'With sorted input you scan each interval exactly once — before, overlapping, or after the new interval. That is O(n) with no extra structure needed.',
      wrongFeedback: [
        'The input is already sorted. How many times do you need to look at each existing interval?',
        'A single left-to-right scan touches each of the n intervals once. What complexity does that give you?',
      ],
    },
  ],
}
