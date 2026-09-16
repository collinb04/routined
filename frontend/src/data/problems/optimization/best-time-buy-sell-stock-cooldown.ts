export default {
  id: 'best-time-buy-sell-stock-cooldown',
  title: 'Best Time to Buy and Sell Stock with Cooldown',
  difficulty: 'medium',
  description: 'After selling, you must wait one day before buying again (cooldown). Given stock prices, find the maximum profit you can achieve.',
  examples: [
    { input: 'prices = [1,2,3,0,2]', output: '3', explanation: 'Buy day 1, sell day 2 (profit 1), cooldown day 3, buy day 4, sell day 5 (profit 2). Total = 3.' },
  ],
  constraints: ['1 ≤ prices.length ≤ 5000', '0 ≤ prices[i] ≤ 1000'],
  starterCode: `class Solution:
    def max_profit(self, prices):
        pass`,
  runnerSetup: 'max_profit = Solution().max_profit',
  functionName: 'max_profit',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Standard', args: [[1,2,3,0,2]], expected: 3 },
    { label: 'Single', args: [[1]], expected: 0 },
    { label: 'Descending', args: [[3,2,1]], expected: 0 },
    { label: 'Two days', args: [[1,2]], expected: 1 },
  ],
  bruteHint: 'The brute-force approach recursively branches into buy, sell, or rest on each day, exploring every possible sequence of decisions across all days. Since each day roughly doubles the number of branches, this costs O(2ⁿ) time overall, and the same day/state combinations get re-explored repeatedly. With prices.length up to 5000, could you identify the handful of distinct states that keep recurring, so each is computed only once?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: '1 ≤ prices.length ≤ 5000' },
      question: 'Constraints reveal the complexity budget you are working within before you design your algorithm. prices.length ≤ 5000 tells you…',
      options: [
        { label: 'O(n log n) is required',      isCorrect: false, feedback: 'O(n log n) would work, but the constraint doesn\'t demand it. At n = 5000, even O(n²) is only 25 million operations — well within budget.' },
        { label: 'O(n) or O(n²) both fit',       isCorrect: true },
        { label: 'O(n³) is acceptable',          isCorrect: false, feedback: 'At n = 5000, O(n³) is 125 billion operations — far too slow. The constraint rules out anything cubic or worse.' },
        { label: 'Input size doesn\'t matter',   isCorrect: false, feedback: 'Input size always shapes your complexity budget. At n = 5000, you must rule out cubic approaches before deciding how to structure the solution.' },
      ],
      correctFeedback: 'At n = 5000, O(n²) is 25 million operations — acceptable. O(n) is even better. Both approaches are viable here.',
      wrongFeedback: [
        'Cube n = 5000 and square it. Which of those results fits within a reasonable operation count?',
        'O(n³) at n = 5000 is 125 billion — ruled out. O(n²) is 25 million — fine. The constraint permits up to quadratic.',
      ],
    },
    {
      id: 'cooldown-rule',
      highlight: { location: 'description', text: 'After selling, you must wait one day before buying again (cooldown)' },
      question: 'Special rules that restrict when an action can be taken often force extra information into your state. After selling, you must wait one day before buying. What does this constraint introduce into your state?',
      options: [
        { label: 'You can only sell on odd-numbered days',        isCorrect: false, feedback: 'The cooldown applies after each sale, not on fixed calendar positions. You can sell on any day — you just can\'t buy the very next day afterward.' },
        { label: 'You need to track whether you\'re in cooldown', isCorrect: true },
        { label: 'You must find the best single buy/sell pair',   isCorrect: false, feedback: 'This problem allows multiple transactions, not just one. The cooldown rule limits when you can re-enter — it doesn\'t reduce it to a single-transaction problem.' },
        { label: 'You should greedily buy whenever price rises',  isCorrect: false, feedback: 'Greedy buy-on-every-rise ignores the cooldown dependency. A sale today locks out buying tomorrow, which can make an earlier sell more or less valuable than it appears locally.' },
      ],
      correctFeedback: 'The cooldown makes your decision on each day depend on what happened two days ago, not just yesterday. Your state must encode whether you\'re currently holding stock, free to buy, or cooling down.',
      wrongFeedback: [
        'On any given day, your options depend on what you did on previous days. What combinations of recent actions are possible?',
        'There are three distinct situations you can be in: holding stock, free to buy, or cooling down after a sale. Each leads to different choices.',
      ],
    },
    {
      id: 'output-type',
      highlight: { location: 'description', text: 'find the maximum profit you can achieve' },
      question: 'The shape of the expected output often tells you how much information you actually need to retain while solving. The output is maximum profit, not a transaction schedule. What does this tell you about your approach?',
      options: [
        { label: 'Record every buy/sell pair you make',                isCorrect: false, feedback: 'Storing the actual transactions uses more memory and does more work than needed. You only need the profit total — not a record of when each transaction happened.' },
        { label: 'Optimize a value, not reconstruct a sequence',        isCorrect: true },
        { label: 'Count how many transactions you can make',            isCorrect: false, feedback: 'More transactions don\'t automatically mean more profit — especially with cooldowns. The goal is maximum profit, which could come from very few transactions.' },
        { label: 'Find the global max and min price to compute profit', isCorrect: false, feedback: 'Global max minus global min works for a single transaction with no cooldown. With multiple transactions and a cooldown rule, the order of buys and sells matters and you can\'t reduce it to two price lookups.' },
      ],
      correctFeedback: 'You\'re maximizing a scalar value. At each day, you only need the best profit achievable in each possible state — no need to record which days you traded.',
      wrongFeedback: [
        'If the answer is a single number, do you ever need to know the specific days you bought and sold?',
        'You only need to carry forward the best profit for each state at each position — not the path that got you there.',
      ],
    },
    {
      id: 'state-dependencies',
      highlight: { location: 'description', text: 'After selling, you must wait one day before buying again (cooldown)' },
      question: 'Understanding how far back a decision depends shapes exactly how much history your DP state must carry. The cooldown means buying on day i depends on what happened on day i−2, not i−1. What does this imply?',
      options: [
        { label: 'You need the full price history to decide',    isCorrect: false, feedback: 'You don\'t need every historical price — only the best outcomes from recent days. Three state values (holding, free, cooling) updated day by day are enough.' },
        { label: 'Your DP state must look back two days',        isCorrect: true },
        { label: 'You can process days independently',           isCorrect: false, feedback: 'Days are not independent — the cooldown creates a two-day dependency chain. A decision today constrains what you can do tomorrow and the day after.' },
        { label: 'Sorting prices simplifies the dependency',     isCorrect: false, feedback: 'Sorting destroys the time ordering that makes buy-before-sell meaningful. Prices must be processed in their original sequence.' },
      ],
      correctFeedback: 'To buy on day i, you must have been in cooldown on day i−1, which means you sold on day i−2. Your DP transition for "free to buy" must reference the sold state from two days ago.',
      wrongFeedback: [
        'If you sell on day i, when is the earliest you can buy again? Trace that back to see which previous day\'s state you need.',
        'Sell on day i → cooldown on day i+1 → free on day i+2. So "free" on day i comes from "sold" on day i−2.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def max_profit(self, prices):
        if not prices:
            return 0
        hold = -prices[0]
        sold = 0
        rest = 0
        for price in prices[1:]:
            prev_hold, prev_sold, prev_rest = hold, sold, rest
            hold = max(prev_hold, prev_rest - price)
            sold = prev_hold + price
            rest = max(prev_rest, prev_sold)
        return max(sold, rest)`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'Buying can only happen from the <code>rest</code> state, never directly from <code>sold</code> — that\'s exactly what enforces the one-day cooldown, since the day right after selling only ever transitions into <code>rest</code>, not into a fresh purchase.',
  solutionExplanation: 'Every day, being in one of exactly three states — holding a share, having just sold, or resting (free to buy, no cooldown) — captures everything the cooldown rule requires: <code>hold</code> either keeps yesterday\'s position or buys today from <code>rest</code>, <code>sold</code> can only arise by selling out of yesterday\'s <code>hold</code>, and <code>rest</code> carries forward the best of yesterday\'s <code>rest</code> or <code>sold</code> — which is precisely why a sale becomes available to reinvest one day later, not immediately.',
}
