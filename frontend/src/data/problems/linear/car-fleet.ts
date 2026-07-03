export default {
  id: 'car-fleet',
  title: 'Car Fleet',
  difficulty: 'medium',
  description: `<p>There are <code>n</code> cars going to the same destination along a one-lane road. The destination is <code>target</code> miles away. You are given two integer arrays <code>position</code> and <code>speed</code>.</p><p>A car can never pass another car ahead of it, but it can catch up to it, and they will drive together as one fleet. Return the number of car fleets that will arrive at the destination.</p>`,
  examples: [
    { input: 'target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]', output: '3' },
  ],
  constraints: ['n == position.length == speed.length', '1 <= n <= 10^5', '0 < target <= 10^6'],
  starterCode: `def car_fleet(target, position, speed):
  pass`,
  functionName: 'car_fleet',
  conceptId: 'stack',
  testCases: [
    { label: 'target=12', args: [12, [10,8,0,5,3], [2,4,1,1,3]], expected: 3 },
    { label: 'single', args: [10, [3], [3]], expected: 1 },
  ],
}
