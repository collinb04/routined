export default {
  id: 'interval-list-intersections',
  title: 'Interval List Intersections',
  difficulty: 'medium',
  description: 'Given two lists of closed intervals <code>firstList</code> and <code>secondList</code>, return the intersection of these two interval lists.',
  examples: [
    { input: 'firstList=[[0,2],[5,10],[13,23],[24,25]], secondList=[[1,5],[8,12],[15,24],[25,26]]', output: '[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]' },
  ],
  constraints: ['0 ≤ firstList.length, secondList.length ≤ 1000', '0 ≤ start ≤ end ≤ 10⁹', 'Both lists are sorted and pairwise disjoint'],
  starterCode: `def interval_intersection(first_list, second_list):
  pass`,
  functionName: 'interval_intersection',
  conceptId: 'intervals',
  testCases: [
    { label: 'Standard', args: [[[0,2],[5,10],[13,23],[24,25]],[[1,5],[8,12],[15,24],[25,26]]], expected: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]] },
    { label: 'Empty first', args: [[],[[1,2]]], expected: [] },
    { label: 'No intersection', args: [[[1,2]],[[3,4]]], expected: [] },
  ],
}
