export default {
  id: 'lemonade-change',
  title: 'Lemonade Change',
  difficulty: 'easy',
  description: 'At a lemonade stand, each lemonade costs $5. Customers pay with $5, $10, or $20 bills. Given the order of bills, return <code>true</code> if you can give every customer correct change.',
  examples: [
    { input: 'bills = [5,5,5,10,20]', output: 'true' },
    { input: 'bills = [5,5,10,10,20]', output: 'false', explanation: 'Not enough $5 bills to make change for the second $20.' },
  ],
  constraints: ['1 ≤ bills.length ≤ 10⁵', 'bills[i] is 5, 10, or 20'],
  starterCode: `def lemonade_change(bills):
  pass`,
  functionName: 'lemonade_change',
  conceptId: 'greedy',
  testCases: [
    { label: 'Can make change', args: [[5,5,5,10,20]], expected: true },
    { label: 'Cannot', args: [[5,5,10,10,20]], expected: false },
    { label: 'All fives', args: [[5,5,5,5]], expected: true },
    { label: 'First $10', args: [[10]], expected: false },
  ],
}
