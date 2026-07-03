export default {
  id: 'best-time-buy-sell-stock-iii',
  title: 'Best Time to Buy and Sell Stock III',
  difficulty: 'hard',
  description: 'Given stock prices, find the maximum profit using at most 2 transactions. You must sell before you buy again.',
  examples: [
    { input: 'prices = [3,3,5,0,0,3,1,4]', output: '6', explanation: 'Buy day 4 (price 0), sell day 6 (price 3): profit 3. Buy day 7 (price 1), sell day 8 (price 4): profit 3. Total = 6.' },
    { input: 'prices = [1,2,3,4,5]', output: '4', explanation: 'Buy day 1, sell day 5: profit 4.' },
  ],
  constraints: ['1 ≤ prices.length ≤ 10⁵', '0 ≤ prices[i] ≤ 10⁵'],
  starterCode: `def max_profit(prices):
  pass`,
  functionName: 'max_profit',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Two transactions', args: [[3,3,5,0,0,3,1,4]], expected: 6 },
    { label: 'One transaction', args: [[1,2,3,4,5]], expected: 4 },
    { label: 'Descending', args: [[7,6,4,3,1]], expected: 0 },
  ],
}
