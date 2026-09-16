export default {
  id: 'house-robber',
  title: 'House Robber',
  difficulty: 'medium',
  description: `<p>You are a professional robber planning to rob houses along a street. Each house has a certain amount of money. Adjacent houses have security systems — if two adjacent houses are robbed the police will be alerted. Given an integer array <code>nums</code> representing the amount of money in each house, return the maximum amount you can rob tonight without alerting the police.</p>`,
  examples: [
    { input: 'nums = [1,2,3,1]', output: '4 (rob houses 1 and 3)' },
    { input: 'nums = [2,7,9,3,1]', output: '12 (rob houses 1, 3, and 5)' },
  ],
  constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
  starterCode: `class Solution:
    def rob(self, nums):
        pass`,
  runnerSetup: 'rob = Solution().rob',
  functionName: 'rob',
  conceptId: 'dp-1d',
  testCases: [
    { label: '[1,2,3,1]', args: [[1,2,3,1]], expected: 4 },
    { label: '[2,7,9,3,1]', args: [[2,7,9,3,1]], expected: 12 },
  ],
  bruteHint: 'A brute-force solution recursively branches at every house: try robbing it, or try skipping it, and take the best of the two resulting subproblems. Because each house spawns two independent recursive calls, this naive approach explores O(2^n) combinations in the worst case. With up to 100 houses, that exponential blow-up would never finish. Can you see which houses\' subproblems get solved over and over again along different branches of that recursion?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'adjacency-constraint',
      highlight: { location: 'description', text: 'Adjacent houses have security systems — if two adjacent houses are robbed the police will be alerted.' },
      question: 'Constraints on which elements can be selected together are often the first clue that a problem reduces to a local include-or-exclude decision at each step. Adjacent houses cannot both be robbed. What does this tell you about the decision at each house?',
      options: [
        { label: 'Always skip every other house', isCorrect: false, feedback: 'Skipping every other house (even vs. odd indices) isn\'t always optimal. In [2,7,9,3,1], the best plan robs indices 0, 2, and 4 — but that depends on the values, not on a fixed pattern.' },
        { label: 'At each house, choose to rob it or skip it', isCorrect: true },
        { label: 'Sort houses by value and always take the largest one first', isCorrect: false, feedback: 'Sorting scrambles the positions, breaking the adjacency constraint — you\'d no longer know which houses are neighbors.' },
        { label: 'Only consider houses more than two apart', isCorrect: false, feedback: 'You can rob houses that are exactly two apart — the constraint only bans immediately adjacent (distance 1) pairs.' },
      ],
      correctFeedback: 'Exactly — at each house you make a binary choice: rob it (and skip the previous) or skip it (and keep the best from the previous). That local choice composes into the global optimum.',
      wrongFeedback: [
        'At house i, what are your options? And what constraint does each option impose on the previous house?',
        'You can either take house i (which means house i-1 is off-limits) or skip house i. What\'s the best total in each case?',
      ],
    },
    {
      id: 'output-type',
      highlight: { location: 'description', text: 'return the maximum amount you can rob tonight without alerting the police' },
      question: 'The shape of the return value — a single optimal number rather than a path, count, or yes/no answer — usually signals which family of algorithms applies. The output is the maximum amount you can rob. What algorithmic pattern does "maximum value under a constraint" suggest?',
      options: [
        { label: 'Binary search on the answer', isCorrect: false, feedback: 'Binary search works when the search space is sorted and you can check feasibility of a target. Here there\'s no sorted property to exploit — you\'re building an optimal sum, not checking a threshold.' },
        { label: 'Dynamic programming on an optimization objective', isCorrect: true },
        { label: 'Greedy — always rob the highest-value available house', isCorrect: false, feedback: 'Greedy fails here: in [2,7,9,3,1], greedily picking 7 blocks both 2 and 9, giving 7+3=10 instead of the optimal 2+9+1=12.' },
        { label: 'BFS to find the shortest path through houses', isCorrect: false, feedback: 'BFS finds shortest paths in graphs, not maximum sums under selection constraints. There\'s no graph structure here.' },
      ],
      correctFeedback: 'Maximizing a value while respecting a local constraint (can\'t take adjacent) is the canonical 1D DP pattern. Each state stores the best achievable total up to that house.',
      wrongFeedback: [
        'You\'re maximizing a sum where each choice depends on the previous choice. What technique handles overlapping subproblems like that?',
        'At each position, the best answer depends on decisions made earlier. DP stores those results so you don\'t recompute them.',
      ],
    },
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: '1 <= nums.length <= 100' },
      question: 'Input bounds are a direct signal for how much computational complexity your solution is allowed to have. nums.length ≤ 100 and nums[i] ≤ 400 tell you…',
      options: [
        { label: 'Only O(n) will pass', isCorrect: false, feedback: 'At n = 100, even O(n²) is just 10,000 operations — trivially fast. The constraint is very generous here.' },
        { label: 'Even O(n²) or O(n³) is fine', isCorrect: true },
        { label: 'You need to optimize for space as well as time', isCorrect: false, feedback: 'A 100-element DP array uses negligible memory. Space is not the concern at this scale.' },
        { label: 'The value bound means houses should be bucketed by amount rather than compared directly', isCorrect: false, feedback: 'You\'re not sorting anything — you\'re selecting a subset under a constraint. The value bound (≤ 400) is a signal about the maximum possible output, not about the algorithm\'s sort step.' },
      ],
      correctFeedback: 'n = 100 is tiny — even a brute-force O(2ⁿ) would only be 2¹⁰⁰ in theory, but the constraint tells you simple DP is more than sufficient.',
      wrongFeedback: [
        'How many operations is worst case at n = 100 for O(n²)? Is that a problem?',
        'n = 100 means you can afford almost any polynomial approach. Focus on correctness — the bound is very generous.',
      ],
    },
    {
      id: 'subproblem-structure',
      highlight: { location: 'description', text: 'rob houses along a street' },
      question: 'When a problem\'s answer at one position depends only on answers at a small, fixed number of earlier positions, that dependency chain is the hallmark of reusable subproblems. The best solution for houses 0..i depends on the best solution for houses 0..i-1 and 0..i-2. This means…',
      options: [
        { label: 'You need to store the full array of previous results', isCorrect: false, feedback: 'You only ever look back two steps — the best at i-1 and i-2. You can solve this with just two variables, not a full array.' },
        { label: 'The overlapping subproblems mean earlier results should be reused rather than recomputed', isCorrect: true },
        { label: 'You must process houses from right to left', isCorrect: false, feedback: 'The recurrence works left-to-right just as naturally. Direction is a choice, not a requirement of the structure.' },
        { label: 'Recomputing each house\'s answer from scratch every time is efficient here', isCorrect: false, feedback: 'Naïve recursion recomputes the same subproblems exponentially. At n = 100, that\'s 2¹⁰⁰ calls — it would never finish.' },
      ],
      correctFeedback: 'The recurrence dp[i] = max(dp[i-1], dp[i-2] + nums[i]) shows that each subproblem is reused. Memoization or bottom-up DP eliminates redundant recomputation.',
      wrongFeedback: [
        'If you write a recursive solution, how many times might you compute the answer for house i = 5? Is that work shared or repeated?',
        'Subproblems that recur are candidates for caching. Here dp[i] is needed by both dp[i+1] and dp[i+2] — what does that suggest?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def rob(self, nums):
        prev, curr = 0, 0
        for x in nums:
            prev, curr = curr, max(curr, prev + x)
        return curr`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'Both running values are updated <code>simultaneously</code> from their old values in one tuple assignment — computing the new <code>curr</code> using an already-overwritten <code>prev</code> would silently corrupt every later step, since <code>prev + x</code> is supposed to reflect the best total two houses back, not one.',
  solutionExplanation: 'At every house, the best total either skips this house (carrying forward the best total through the previous house, <code>curr</code>) or robs it (adding its value to the best total through two houses back, <code>prev + x</code>) — taking the max of those two options at each step is exactly what respects the no-adjacent-houses rule while only ever needing the two most recent results, never the full history.',
}
