export default {
  id: 'minimum-cost-connect-sticks',
  title: 'Minimum Cost to Connect Sticks',
  difficulty: 'medium',
  description: 'You have sticks with given lengths. Combine two sticks into one: the cost equals their combined length. Return the minimum cost to combine all sticks into one.',
  examples: [
    { input: 'sticks = [2,4,3]', output: '14', explanation: 'Combine 2+3=5 (cost 5), then 4+5=9 (cost 9). Total=14.' },
    { input: 'sticks = [1,8,3,5]', output: '30' },
  ],
  constraints: ['1 ≤ sticks.length ≤ 10⁴', '1 ≤ sticks[i] ≤ 10⁴'],
  starterCode: `def connect_sticks(sticks):
  pass`,
  functionName: 'connect_sticks',
  conceptId: 'heap',
  testCases: [
    { label: 'Three sticks', args: [[2,4,3]], expected: 14 },
    { label: 'Four sticks', args: [[1,8,3,5]], expected: 30 },
    { label: 'Single', args: [[5]], expected: 0 },
    { label: 'Two sticks', args: [[1,2]], expected: 3 },
  ],
}
