export default {
  id: 'coin-change',
  title: 'Coin Change',
  difficulty: 'medium',
  description: `<p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount cannot be made up by any combination of the coins, return <code>-1</code>.</p>`,
  examples: [
    { input: 'coins = [1,5,11], amount = 15', output: '3 (5+5+5)' },
    { input: 'coins = [2], amount = 3', output: '-1' },
  ],
  constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
  starterCode: `def coin_change(coins, amount):
  pass`,
  functionName: 'coin_change',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'amount=15', args: [[1,5,11], 15], expected: 3 },
    { label: 'impossible', args: [[2], 3], expected: -1 },
    { label: 'amount=0', args: [[1], 0], expected: 0 },
  ],
  bruteHint: 'Describe the recursive approach that tries every coin at every remaining amount, and explain why it revisits the same remaining amounts repeatedly.',
  optimizeHint: 'Name the technique for caching the minimum coins needed for each remaining amount so it\'s computed only once.',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'amount ≤ 10,000 and coins.length ≤ 12. What complexity does this permit?',
      options: [
        { label: 'O(amount) ignoring coins',       isCorrect: false, feedback: 'An O(amount) approach that ignores coin denominations cannot determine which coins to use. The number of coins available directly affects every sub-amount decision.' },
        { label: 'O(coins × amount) is the target', isCorrect: true },
        { label: 'O(2^coins) — enumerate subsets',  isCorrect: false, feedback: 'Coins can be reused, so a subset enumeration doesn\'t model the problem. And at coins.length = 12, O(2^12) = 4096 is misleadingly small — the real challenge is the amount dimension.' },
        { label: 'O(amount²) is needed',            isCorrect: false, feedback: 'At amount = 10,000, O(amount²) is 100 million operations and misses the coin dimension entirely. The natural structure is coins × amount = 12 × 10,000 = 120,000.' },
      ],
      correctFeedback: 'O(coins × amount) = 12 × 10,000 = 120,000 operations. For each sub-amount, you try every denomination — that\'s the DP inner loop.',
      wrongFeedback: [
        'For each amount from 0 to 10,000, you might try every coin. How many total operations is that?',
        '12 coins × 10,000 amounts = 120,000. That\'s the cost of checking every coin at every sub-amount — exactly what a 1D DP does.',
      ],
    },
    {
      id: 'output-minimum',
      question: 'The output is the fewest coins, not a list of coins used. What does this tell you about what to track?',
      options: [
        { label: 'Track which specific coins are selected', isCorrect: false, feedback: 'Tracking specific coins uses extra memory and work. You only need a count — not a reconstruction of the sequence that achieved it.' },
        { label: 'Track the minimum count at each sub-amount', isCorrect: true },
        { label: 'Track the maximum coin used at each step',   isCorrect: false, feedback: 'The largest coin used doesn\'t determine the minimum total count. Using coin 11 once might be better than using coin 5 and 1 together, depending on the amount.' },
        { label: 'Count all valid combinations, then pick the shortest', isCorrect: false, feedback: 'Enumerating all combinations is exponential. You don\'t need to find all solutions — just the minimum cost one, which DP computes directly.' },
      ],
      correctFeedback: 'dp[a] = minimum coins to make amount a. You update it coin by coin, keeping only the best count — no need to record the path.',
      wrongFeedback: [
        'If the answer is a single number, what\'s the minimum state you need to carry forward for each sub-amount?',
        'One integer per sub-amount — the fewest coins needed to reach it — is all you need. The path that got there doesn\'t matter.',
      ],
    },
    {
      id: 'impossible-case',
      question: 'Return -1 if the amount cannot be made. How does this affect your DP initialization?',
      options: [
        { label: 'Initialize dp[a] = 0 for all amounts',    isCorrect: false, feedback: 'Zero would mean "zero coins needed," which is only true for amount = 0. For unreachable amounts, 0 would be a wrong answer, not a sentinel.' },
        { label: 'Initialize dp[a] = ∞ (or amount+1) for a > 0', isCorrect: true },
        { label: 'Initialize dp[a] = -1 for all amounts',   isCorrect: false, feedback: '-1 is the final output for impossible cases, not an intermediate value you can do arithmetic on. Using -1 in comparisons like min(-1, count+1) produces wrong results.' },
        { label: 'No special initialization needed',        isCorrect: false, feedback: 'Without a sentinel for "unreachable," your DP can\'t distinguish between an amount that genuinely needs 0 coins and one that hasn\'t been reached yet.' },
      ],
      correctFeedback: 'dp[0] = 0, dp[a] = amount+1 (a safe stand-in for infinity) for a > 0. After filling, if dp[amount] > amount, no solution exists — return -1.',
      wrongFeedback: [
        'You need to distinguish "haven\'t found a way yet" from "0 coins needed." What initialization separates those two states?',
        'Use a value larger than any valid answer as your "unreachable" sentinel. After the DP, check whether the final value was ever updated.',
      ],
    },
    {
      id: 'unbounded-reuse',
      question: 'Coins can be reused as many times as needed. How does unlimited reuse shape the DP recurrence?',
      options: [
        { label: 'Mark a coin as used after selecting it',        isCorrect: false, feedback: 'There\'s no finite supply — coins don\'t get used up. Marking them would prevent valid solutions like using coin 5 three times for amount 15.' },
        { label: 'When computing dp[a], any coin c ≤ a can still be used', isCorrect: true },
        { label: 'Use each denomination at most once (0/1 knapsack)', isCorrect: false, feedback: 'A 0/1 knapsack uses each item once. With unlimited coins, you can revisit the same denomination — the recurrence is dp[a] = min(dp[a], dp[a - c] + 1) for all c, not a per-item loop.' },
        { label: 'Greedy: always pick the largest coin that fits',  isCorrect: false, feedback: 'Greedy fails for many inputs. With coins=[1,5,11] and amount=15, greedy takes 11+1+1+1+1 = 5 coins, but the optimal is 5+5+5 = 3 coins.' },
      ],
      correctFeedback: 'For each amount a, you try every coin c where c ≤ a: dp[a] = min(dp[a], dp[a - c] + 1). The same coin can contribute to multiple sub-amounts because it\'s never exhausted.',
      wrongFeedback: [
        'If coin 5 can be used multiple times, can dp[10] use dp[5] which itself used coin 5? What does that mean for the recurrence?',
        'Unlimited reuse means dp[a] can build on dp[a - c] even if c was already used to reach dp[a - c]. The recurrence applies the same set of coins at every sub-amount.',
      ],
    },
  ],
}
