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
  starterCode: `class Solution:
    def min_cost_climbing_stairs(self, cost):
        pass`,
  runnerSetup: 'min_cost_climbing_stairs = Solution().min_cost_climbing_stairs',
  functionName: 'min_cost_climbing_stairs',
  conceptId: 'dp-1d',
  testCases: [
    { label: '[10,15,20]', args: [[10,15,20]], expected: 15 },
    { label: 'longer', args: [[1,100,1,1,1,100,1,1,100,1]], expected: 6 },
  ],
  bruteHint: 'The brute-force approach recursively tries both a one-step and a two-step move from every position, exploring every possible path to the top — since each position spawns two more recursive calls, that branches out to O(2^n) calls. Because the same step index gets reached by multiple different paths, the recursion recomputes its result over and over. Could you cache each position\'s minimum cost the first time you compute it, so overlapping subproblems are only solved once?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: '2 <= cost.length <= 1000' },
      question: 'Size constraints tell you how much computational headroom you have, which narrows down what time complexity is actually required. cost.length ≤ 1000 tells you…',
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
      highlight: { location: 'description', text: 'Once you pay the cost, you can climb one or two steps.' },
      question: 'The problem statement\'s own wording about how movement works often encodes the recurrence relation you need to build directly. "Once you pay the cost, you can climb one or two steps." This means…',
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
      highlight: { location: 'description', text: 'You can start from index 0 or 1.' },
      question: 'Base-case details buried in the problem description determine how your DP table gets initialized, so it\'s worth reading them literally. "You can start from index 0 or 1." This means…',
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
      highlight: { location: 'description', text: 'Return the minimum cost to reach the top of the floor.' },
      question: 'What the problem asks you to return — a single value versus a full structure — tells you how much information your solution actually needs to retain. The output is the minimum cost to reach the top, not a path. This means…',
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
  solutionCode: `class Solution:
    def min_cost_climbing_stairs(self, cost):
        n = len(cost)
        prev2, prev1 = 0, 0
        for i in range(2, n + 1):
            curr = min(prev1 + cost[i - 1], prev2 + cost[i - 2])
            prev2, prev1 = prev1, curr
        return prev1`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: '<code>prev2</code> and <code>prev1</code> both start at 0 — representing the free "virtual" starting positions before index 0 and before index 1, since the problem lets you begin at either step without paying anything to arrive there, only to leave.',
  solutionExplanation: 'The top of the staircase is reachable from either of the last two steps, so the minimum cost to reach position <code>i</code> is that step\'s own cost plus whichever of the two positions behind it (one step back or two) was cheaper to reach — the classic two-predecessor recurrence. Because each new value only ever depends on the two immediately preceding ones, rolling them forward in two variables instead of a full array collapses the space requirement to O(1).',
}
