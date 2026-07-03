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
}
