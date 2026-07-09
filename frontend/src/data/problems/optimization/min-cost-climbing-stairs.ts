export default {
  id: 'min-cost-climbing-stairs',
  title: 'Min Cost Climbing Stairs',
  difficulty: 'easy',
  description: `<p>You are given an integer array <code>cost</code> where <code>cost[i]</code> is the cost of the <code>i</code>th step on a staircase. Once you pay the cost, you can climb one or two steps. You can start from index 0 or 1. Return the minimum cost to reach the top of the floor.</p>`,
  examples: [
    { input: 'cost = [10,15,20]', output: '15' },
    { input: 'cost = [1,100,1,1,1,100,1,1,100,1]', output: '6' },
  ],
  constraints: ['2 <= cost.length <= 1000', '0 <= cost[i] <= 999'],
  starterCode: `def min_cost_climbing_stairs(cost):
  pass`,
  functionName: 'min_cost_climbing_stairs',
  conceptId: 'dp-1d',
  testCases: [
    { label: '[10,15,20]', args: [[10,15,20]], expected: 15 },
    { label: 'longer', args: [[1,100,1,1,1,100,1,1,100,1]], expected: 6 },
  ],
  bruteHint: 'Describe the naive recursion that tries one-step and two-step moves from every position, and why it recomputes the same positions repeatedly',
  optimizeHint: 'Name the technique for caching each position\'s minimum cost, and how few previous values you need to keep',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'cost.length ≤ 1000 tells you…',
      options: [
        { label: 'O(n) or O(n²) are both fine', isCorrect: false, feedback: 'At n = 1,000, O(n²) is 1 million operations — acceptable, but the structure of this problem makes O(n) natural. The constraint is wide enough to permit either, so it\'s not the deciding signal here.' },
        { label: 'You need O(n) time and space', isCorrect: false, feedback: 'O(n) time is correct, but you can reduce space to O(1) by keeping only the last two values. The constraint doesn\'t force O(n) space.' },
        { label: 'A single linear pass suffices', isCorrect: true },
        { label: 'A recursive solution is required', isCorrect: false, feedback: 'Recursion without memoization would re-compute subproblems exponentially — that\'s far worse than needed. Iterative DP is cleaner and avoids call-stack overhead at n = 1,000.' },
      ],
      correctFeedback: 'With n ≤ 1,000, even O(n²) fits, but the recurrence only looks back two steps — you can solve this in a single forward pass.',
      wrongFeedback: [
        'Each step depends on at most two previous steps. How many passes do you need?',
        'The recurrence is dp[i] = cost[i] + min(dp[i-1], dp[i-2]). How many previous values do you need to keep at any point?',
      ],
    },
    {
      id: 'two-step-choice',
      question: '"Once you pay the cost, you can climb one or two steps." This means…',
      options: [
        { label: 'You must always take two steps', isCorrect: false, feedback: 'Taking two steps is optional. At each step you choose one or two — the minimum of the two incoming paths determines the cheapest way to arrive.' },
        { label: 'Each step has exactly two predecessors', isCorrect: true },
        { label: 'The last step always costs zero', isCorrect: false, feedback: 'The last step\'s cost is cost[n-1], not zero. The "top" is beyond the last index — you can reach it from either of the last two steps.' },
        { label: 'You must visit every step', isCorrect: false, feedback: 'You can skip steps entirely by taking two at a time. That\'s what makes this an optimization problem — finding which steps to skip.' },
      ],
      correctFeedback: 'Step i is reachable from step i-1 or step i-2, so dp[i] = cost[i] + min(dp[i-1], dp[i-2]). That two-predecessor structure is the entire recurrence.',
      wrongFeedback: [
        'If you can climb one or two steps from any position, which positions can lead to position i?',
        'Position i is reachable from i-1 (one step) and i-2 (two steps). What does that say about how many subproblems feed into each state?',
      ],
    },
    {
      id: 'start-choice',
      question: '"You can start from index 0 or 1." This means…',
      options: [
        { label: 'Index 0 is always the cheaper start', isCorrect: false, feedback: 'cost[0] and cost[1] can be anything — the problem tells you to choose, not which one to pick. Both starting positions need to be seeded as base cases.' },
        { label: 'Both indices are valid base cases', isCorrect: true },
        { label: 'You must try both and take the max', isCorrect: false, feedback: 'You want the minimum cost, not the maximum. Both are valid starts, but you propagate the cheapest path forward.' },
        { label: 'Only index 0 matters for the recurrence', isCorrect: false, feedback: 'If you ignore index 1 as a base case, you force all paths through index 0 — missing the option to skip it entirely by starting at 1.' },
      ],
      correctFeedback: 'dp[0] = cost[0] and dp[1] = cost[1] are both valid starts. The recurrence begins from index 2 onward using both of them.',
      wrongFeedback: [
        'The problem says you can start at either position. How do you represent that in your DP table initialization?',
        'Both positions need to be treated as base cases — dp[0] = cost[0], dp[1] = cost[1] — because neither one is derived from the other.',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is the minimum cost to reach the top, not a path. This means…',
      options: [
        { label: 'You must reconstruct which steps were taken', isCorrect: false, feedback: 'Reconstructing the path requires backtracking through your DP table, which is extra work the problem never asks for. You only need the final cost value.' },
        { label: 'You only need to track the running minimum cost', isCorrect: true },
        { label: 'You need to count all valid paths first', isCorrect: false, feedback: 'Counting paths is a different problem. Here you want the minimum cost, which you build incrementally — there\'s no need to enumerate all paths.' },
        { label: 'A greedy choice at each step is sufficient', isCorrect: false, feedback: 'Greedy — always taking the cheaper next step — can miss the global minimum. For example, paying a small cost now to avoid a large one two steps ahead. DP considers all choices.' },
      ],
      correctFeedback: 'You just need the scalar minimum at the end. That lets you reduce space to O(1) — two variables for the last two costs are enough.',
      wrongFeedback: [
        'The problem asks for a number, not a sequence of steps. What does that free you from tracking?',
        'When output is a single value and you don\'t need the path, you often only need the most recent entries of your DP array — not the whole table.',
      ],
    },
  ],
}
