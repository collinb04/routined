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
}
