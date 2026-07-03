export default {
  id: 'best-time-to-buy-and-sell-stock',
  title: 'Best Time to Buy and Sell Stock',
  difficulty: 'easy',
  description: `<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i</code>th day.</p><p>You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve. If you cannot achieve any profit, return <code>0</code>.</p>`,
  examples: [
    { input: 'prices = [7,1,5,3,6,4]', output: '5' },
    { input: 'prices = [7,6,4,3,1]', output: '0' },
  ],
  constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
  starterCode: `def max_profit(prices):
  pass`,
  functionName: 'max_profit',
  conceptId: 'sliding-window',
  testCases: [
    { label: '[7,1,5,3,6,4]', args: [[7,1,5,3,6,4]], expected: 5 },
    { label: 'decreasing', args: [[7,6,4,3,1]], expected: 0 },
    { label: '[2,4,1]', args: [[2,4,1]], expected: 2 },
  ],
}
