export default {
  id: 'capacity-ship-packages',
  title: 'Capacity To Ship Packages Within D Days',
  difficulty: 'medium',
  description: 'Packages must be shipped in order within <code>days</code> days. Given weights of packages, find the minimum ship weight capacity to ship all packages on time.',
  examples: [
    { input: 'weights=[1,2,3,4,5,6,7,8,9,10], days=5', output: '15', explanation: 'With capacity 15, ship [1-5],[6-8],[9],[10],[nothing] in 5 days.' },
  ],
  constraints: ['1 ≤ days ≤ weights.length ≤ 500', '1 ≤ weights[i] ≤ 500'],
  starterCode: `def ship_within_days(weights, days):
  pass`,
  functionName: 'ship_within_days',
  conceptId: 'binary-search',
  testCases: [
    { label: '5 days', args: [[1,2,3,4,5,6,7,8,9,10],5], expected: 15 },
    { label: '3 days', args: [[3,2,2,4,1,4],3], expected: 6 },
    { label: '1 day', args: [[1,2,3,1,1],1], expected: 8 },
  ],
}
