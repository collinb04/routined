export default {
  id: 'coin-change-ii',
  title: 'Coin Change II',
  difficulty: 'medium',
  description: 'Given an amount and a list of coin denominations, return the number of combinations that make up that amount.',
  examples: [
    { input: 'amount=5, coins=[1,2,5]', output: '4', explanation: '5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1.' },
    { input: 'amount=3, coins=[2]', output: '0', explanation: 'Cannot make 3 with coins of 2.' },
  ],
  constraints: ['1 ≤ coins.length ≤ 300', '1 ≤ coins[i] ≤ 5000', '0 ≤ amount ≤ 5000'],
  starterCode: `def change(amount, coins):
  pass`,
  functionName: 'change',
  conceptId: 'dp-2d',
  testCases: [
    { label: '4 ways', args: [5,[1,2,5]], expected: 4 },
    { label: 'No solution', args: [3,[2]], expected: 0 },
    { label: 'amount=0', args: [0,[1,2,3]], expected: 1 },
  ],
}
