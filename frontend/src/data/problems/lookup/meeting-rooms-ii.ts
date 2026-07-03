export default {
  id: 'meeting-rooms-ii',
  title: 'Meeting Rooms II',
  difficulty: 'medium',
  description: 'Given an array of meeting time intervals <code>[start, end]</code>, return the minimum number of conference rooms required to hold all meetings.',
  examples: [
    { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2', explanation: 'Meetings [0,30] and [5,10] overlap, requiring 2 rooms.' },
    { input: 'intervals = [[7,10],[2,4]]', output: '1' },
  ],
  constraints: ['1 ≤ intervals.length ≤ 10⁴', '0 ≤ start < end ≤ 10⁶'],
  starterCode: `def min_meeting_rooms(intervals):
  pass`,
  functionName: 'min_meeting_rooms',
  conceptId: 'intervals',
  testCases: [
    { label: 'Two rooms needed', args: [[[0,30],[5,10],[15,20]]], expected: 2 },
    { label: 'One room', args: [[[7,10],[2,4]]], expected: 1 },
    { label: 'All at same time', args: [[[1,5],[1,5],[1,5]]], expected: 3 },
    { label: 'Sequential', args: [[[1,2],[2,3],[3,4]]], expected: 1 },
  ],
}
