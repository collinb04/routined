export default {
  id: 'meeting-rooms',
  title: 'Meeting Rooms',
  difficulty: 'easy',
  description: 'Given an array of meeting time intervals <code>[start, end]</code>, determine if a person can attend all meetings (no two meetings overlap). Meetings that touch at an endpoint do not overlap.',
  examples: [
    { input: 'intervals = [[0,30],[5,10],[15,20]]', output: 'false', explanation: '[0,30] and [5,10] overlap.' },
    { input: 'intervals = [[7,10],[2,4]]', output: 'true', explanation: 'No overlap.' },
  ],
  constraints: [
    '0 ≤ intervals.length ≤ 10⁴',
    '0 ≤ start < end ≤ 10⁶',
  ],
  starterCode: `def can_attend_all(intervals):
  # Hint: sort by start time, then check adjacent pairs
  pass`,
  functionName: 'can_attend_all',
  conceptId: 'merge-intervals',
  testCases: [
    { label: 'Overlap', args: [[[0,30],[5,10],[15,20]]], expected: false },
    { label: 'No overlap', args: [[[7,10],[2,4]]], expected: true },
    { label: 'Touching endpoints', args: [[[1,5],[5,10]]], expected: true },
    { label: 'Adjacent overlap', args: [[[1,3],[2,5]]], expected: false },
    { label: 'Empty', args: [[[]]], expected: true },
  ],
}
