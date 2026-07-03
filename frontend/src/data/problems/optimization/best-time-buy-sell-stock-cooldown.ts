export default {
  id: 'best-time-buy-sell-stock-cooldown',
  title: 'Best Time to Buy and Sell Stock with Cooldown',
  difficulty: 'medium',
  description: 'After selling, you must wait one day before buying again (cooldown). Given stock prices, find the maximum profit you can achieve.',
  examples: [
    { input: 'prices = [1,2,3,0,2]', output: '3', explanation: 'Buy day 1, sell day 2 (profit 1), cooldown day 3, buy day 4, sell day 5 (profit 2). Total = 3.' },
  ],
  constraints: ['1 ≤ prices.length ≤ 5000', '0 ≤ prices[i] ≤ 1000'],
  starterCode: `def max_profit(prices):
  pass`,
  functionName: 'max_profit',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Standard', args: [[1,2,3,0,2]], expected: 3 },
    { label: 'Single', args: [[1]], expected: 0 },
    { label: 'Descending', args: [[3,2,1]], expected: 0 },
    { label: 'Two days', args: [[1,2]], expected: 1 },
  ],
}
