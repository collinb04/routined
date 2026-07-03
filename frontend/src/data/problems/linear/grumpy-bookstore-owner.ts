export default {
  id: 'grumpy-bookstore-owner',
  title: 'Grumpy Bookstore Owner',
  difficulty: 'medium',
  description: 'A bookstore owner has customers per minute and a grumpy array where <code>grumpy[i] = 1</code> means they are grumpy that minute. They can suppress grumpiness for <code>minutes</code> consecutive minutes. Return the maximum satisfied customers.',
  examples: [
    { input: 'customers=[1,0,1,2,1,1,7,5], grumpy=[0,1,0,1,0,1,0,1], minutes=3', output: '16', explanation: 'Suppress grumpiness minutes 3–5.' },
  ],
  constraints: ['n == customers.length == grumpy.length', '1 ≤ minutes ≤ n ≤ 2 × 10⁴', '0 ≤ customers[i] ≤ 1000'],
  starterCode: `def max_satisfied(customers, grumpy, minutes):
  pass`,
  functionName: 'max_satisfied',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'Standard', args: [[1,0,1,2,1,1,7,5],[0,1,0,1,0,1,0,1],3], expected: 16 },
    { label: 'Never grumpy', args: [[1,2,3],[0,0,0],1], expected: 6 },
  ],
}
