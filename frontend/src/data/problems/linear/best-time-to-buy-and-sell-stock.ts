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
  bruteHint: 'Describe checking every pair of buy and sell days and its time complexity',
  optimizeHint: 'Name the single-pass technique that tracks one running value as you scan through the prices',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'prices.length ≤ 10⁵ tells you…',
      options: [
        { label: 'O(n²) checking all pairs is fine', isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations — far too slow. You need a linear or near-linear approach.' },
        { label: 'O(n) or better is needed', isCorrect: true },
        { label: 'O(log n) binary search is required', isCorrect: false, feedback: 'You must look at every price at least once, so O(log n) is not achievable. The bound rules out slow solutions but does not demand logarithmic time.' },
        { label: 'Input size does not affect the approach', isCorrect: false, feedback: 'At 100,000 elements, an O(n²) nested loop checks 10 billion pairs — that determines the approach entirely.' },
      ],
      correctFeedback: 'At n = 100,000, O(n²) means 10 billion operations — too slow. A single pass tracking the minimum price seen so far gives O(n).',
      wrongFeedback: [
        'With n = 100,000, how many pairs does a brute-force nested loop check?',
        'n² at 100,000 is 10 billion. What bound does that rule out, and what do you need instead?',
      ],
    },
    {
      id: 'ordering-constraint',
      question: '"You must buy before you sell." What does the temporal ordering constraint mean for your approach?',
      options: [
        { label: 'Find global max minus global min', isCorrect: false, feedback: 'The global minimum might occur after the global maximum. In [7,6,4,3,1], min=1 and max=7, but you cannot buy at 1 and sell at 7 because the sell day comes first.' },
        { label: 'Track the minimum price seen so far', isCorrect: true },
        { label: 'Sort prices to find the best pair', isCorrect: false, feedback: 'Sorting destroys the time ordering — you need to know that the buy day precedes the sell day, which sorting removes.' },
        { label: 'Use a two-pointer from both ends', isCorrect: false, feedback: 'Starting one pointer at the end means looking at a sell day before knowing whether a cheaper buy day exists earlier. The ordering makes a right-to-left pointer problematic.' },
      ],
      correctFeedback: 'As you scan left to right, the minimum price seen so far is the best possible buy price for any future sell. At each day, the profit is prices[i] - min_so_far.',
      wrongFeedback: [
        'Can you sell on day 3 and buy on day 5? The ordering rules that out. What does that tell you about how to scan?',
        'You can only sell at prices[i] using a buy price from an earlier index. What do you need to track as you move forward?',
      ],
    },
    {
      id: 'zero-profit-guarantee',
      question: '"If you cannot achieve any profit, return 0." What does this edge case tell you?',
      options: [
        { label: 'Return -infinity when prices decrease', isCorrect: false, feedback: 'The problem explicitly says return 0 when no profit is possible — negative values are never a valid answer.' },
        { label: 'Clamp the result to 0 if no positive profit exists', isCorrect: true },
        { label: 'Skip the case — prices always increase', isCorrect: false, feedback: 'The second example [7,6,4,3,1] is strictly decreasing, so no profitable trade exists. Handling this case is required.' },
        { label: 'Return the loss amount as a negative number', isCorrect: false, feedback: 'The problem defines profit as non-negative. Return 0 when no gain is achievable, not the magnitude of the loss.' },
      ],
      correctFeedback: 'Initialize max_profit to 0. Since you only update it when prices[i] - min_so_far > 0, a fully decreasing sequence naturally returns 0 without a special branch.',
      wrongFeedback: [
        'What should your function return for [7,6,4,3,1]? Does your current logic produce that?',
        'If you initialize max_profit = 0 and only update it when a gain is positive, what happens automatically when prices only decrease?',
      ],
    },
  ],
}
