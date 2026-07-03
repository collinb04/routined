export default {
  id: 'minimum-speed-arrive-on-time',
  title: 'Minimum Speed to Arrive on Time',
  difficulty: 'medium',
  description: 'You have <code>n</code> trains to take in sequence, with integer distances. You must arrive at exactly <code>hour</code> hours (decimal). Find the minimum speed (integer) to arrive on time, or -1 if impossible.',
  examples: [
    { input: 'dist=[1,3,2], hour=6', output: '1', explanation: 'At speed 1: 1+3+2=6 hours.' },
    { input: 'dist=[1,3,2], hour=2.7', output: '3' },
    { input: 'dist=[1,3,2], hour=1.9', output: '-1' },
  ],
  constraints: ['n == dist.length', '1 ≤ n ≤ 10⁵', '1 ≤ dist[i] ≤ 10⁵', '1 ≤ hour ≤ 10⁷'],
  starterCode: `def min_speed_on_time(dist, hour):
  pass`,
  functionName: 'min_speed_on_time',
  conceptId: 'binary-search',
  testCases: [
    { label: 'Speed 1', args: [[1,3,2],6], expected: 1 },
    { label: 'Speed 3', args: [[1,3,2],2.7], expected: 3 },
    { label: 'Impossible', args: [[1,3,2],1.9], expected: -1 },
  ],
}
