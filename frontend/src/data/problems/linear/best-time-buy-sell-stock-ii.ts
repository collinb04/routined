export default {
  id: 'best-time-buy-sell-stock-ii',
  title: 'Best Time to Buy and Sell Stock II',
  difficulty: 'medium',
  description: 'Given an integer array <code>prices</code> where <code>prices[i]</code> is the price of a stock on day <code>i</code>, find the maximum profit you can achieve. You may complete as many transactions as you like (buy then sell, then buy again).',
  examples: [
    { input: 'prices = [7,1,5,3,6,4]', output: '7', explanation: 'Buy on day 2 (price 1) and sell on day 3 (price 5) for profit 4. Then buy on day 4 (price 3) and sell on day 5 (price 6) for profit 3. Total = 7.' },
  ],
  constraints: ['1 ≤ prices.length ≤ 3 × 10⁴', '0 ≤ prices[i] ≤ 10⁴'],
  starterCode: `def max_profit(prices):
  pass`,
  functionName: 'max_profit',
  conceptId: 'arrays',
  testCases: [
    { label: 'Multiple transactions', args: [[7,1,5,3,6,4]], expected: 7 },
    { label: 'Ascending', args: [[1,2,3,4,5]], expected: 4 },
    { label: 'Descending', args: [[7,6,4,3,1]], expected: 0 },
  ],
}
