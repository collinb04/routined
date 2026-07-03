export default {
  id: 'minimum-arrows-burst-balloons',
  title: 'Minimum Number of Arrows to Burst Balloons',
  difficulty: 'medium',
  description: 'Balloons are represented as intervals on a horizontal axis. An arrow shot at x bursts all balloons whose range includes x. Return the minimum number of arrows needed to burst all balloons.',
  examples: [
    { input: 'points = [[10,16],[2,8],[1,6],[7,12]]', output: '2', explanation: 'One arrow at x=6 bursts [2,8],[1,6]. One arrow at x=11 bursts [10,16],[7,12].' },
    { input: 'points = [[1,2],[3,4],[5,6],[7,8]]', output: '4', explanation: 'None overlap; need 4 arrows.' },
  ],
  constraints: ['1 ≤ points.length ≤ 10⁵', 'points[i].length == 2', '-2³¹ ≤ x_start ≤ x_end ≤ 2³¹ − 1'],
  starterCode: `def find_min_arrow_shots(points):
  pass`,
  functionName: 'find_min_arrow_shots',
  conceptId: 'intervals',
  testCases: [
    { label: 'Two arrows', args: [[[10,16],[2,8],[1,6],[7,12]]], expected: 2 },
    { label: 'Four separate', args: [[[1,2],[3,4],[5,6],[7,8]]], expected: 4 },
    { label: 'All overlap', args: [[[1,10],[2,9],[3,8]]], expected: 1 },
  ],
}
