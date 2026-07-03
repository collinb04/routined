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
}
