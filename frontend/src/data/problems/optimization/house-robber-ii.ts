export default {
  id: 'house-robber-ii',
  title: 'House Robber II',
  difficulty: 'medium',
  description: `<p>You are a professional robber planning to rob houses arranged in a circle. The first and last houses are adjacent. Given an integer array <code>nums</code> representing the amount of money in each house, return the maximum amount you can rob tonight without alerting the police.</p>`,
  examples: [
    { input: 'nums = [2,3,2]', output: '3' },
    { input: 'nums = [1,2,3,1]', output: '4' },
  ],
  constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 1000'],
  starterCode: `class Solution:
    def rob(self, nums):
        pass`,
  runnerSetup: 'rob = Solution().rob',
  functionName: 'rob',
  conceptId: 'dp-1d',
  testCases: [
    { label: '[2,3,2]', args: [[2,3,2]], expected: 3 },
    { label: '[1,2,3,1]', args: [[1,2,3,1]], expected: 4 },
  ],
  bruteHint: 'The brute-force approach recursively considers, at each house, robbing it (and skipping the next one) or leaving it (and moving on) — branching into both choices every time. Since the same suffix of houses gets explored again from many different earlier decisions, the naive recursion runs in O(2^n). What single value per house could you compute once and reuse instead of re-deriving it down every branch?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'circular-constraint',
      question: 'A structural rule buried in the problem description often forces a variant of the standard approach rather than a totally new one. Houses are arranged in a circle — the first and last are adjacent. What does this change compared to the linear House Robber problem?',
      highlight: { location: 'description', text: 'The first and last houses are adjacent.' },
      options: [
        { label: 'You must rob at least one house', isCorrect: false, feedback: 'The circular layout doesn\'t force you to rob anything — it restricts which houses can be robbed together. The first and last house can\'t both be robbed.' },
        { label: 'You cannot rob both the first and last house', isCorrect: true },
        { label: 'You must process houses in reverse order', isCorrect: false, feedback: 'Circular adjacency is a constraint on which houses can be combined, not a reason to reverse traversal order.' },
        { label: 'The problem requires a 2D DP table', isCorrect: false, feedback: 'The circular constraint adds one dependency, but it doesn\'t expand the state space to two dimensions. The linear DP structure still applies.' },
      ],
      correctFeedback: 'Correct — the circle means houses 0 and n-1 are neighbors, so robbing both would trigger the alarm. You need to handle the mutual exclusion of those two endpoints.',
      wrongFeedback: [
        'In a circle, house 0 and house n-1 are adjacent. What does that adjacency rule mean for whether you can rob both?',
        'The no-adjacent rule applies to house 0 and house n-1 too. What constraint does that create on your solution?',
      ],
    },
    {
      id: 'decomposition-insight',
      question: 'When a global constraint blocks one clean approach, look for a way to split the problem into pieces where that constraint no longer applies. Since houses 0 and n-1 can\'t both be robbed, you can split this into two subproblems. What are they?',
      highlight: { location: 'description', text: 'houses arranged in a circle' },
      options: [
        { label: 'Rob even-indexed vs. odd-indexed houses', isCorrect: false, feedback: 'Even/odd indexing doesn\'t capture the circular constraint. The restriction is specifically about houses 0 and n-1 being adjacent, not about parity.' },
        { label: 'Rob houses [0..n-2] and rob houses [1..n-1], take the max', isCorrect: true },
        { label: 'Rob the first half vs. the second half', isCorrect: false, feedback: 'Splitting by position in the array doesn\'t resolve the circular adjacency. The insight is about which endpoint to exclude, not which half to consider.' },
        { label: 'Try all subsets and filter out invalid ones', isCorrect: false, feedback: 'At n = 100, all subsets is 2¹⁰⁰ possibilities — completely infeasible. The decomposition into two linear passes runs in O(n).' },
      ],
      correctFeedback: 'Exactly — excluding house 0 or excluding house n-1 gives two independent linear House Robber problems. The answer is the max of those two results.',
      wrongFeedback: [
        'One of house 0 or house n-1 must be skipped. If you exclude each one in turn, what do you get?',
        'Each exclusion leaves a linear array with no circular constraint. You already know how to solve that — run it twice.',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'Constraints define the complexity budget your solution has to fit inside. nums.length ≤ 100 tells you…',
      highlight: { location: 'constraint', text: '1 <= nums.length <= 100' },
      options: [
        { label: 'O(n²) or better is acceptable', isCorrect: true },
        { label: 'Only O(n) will pass', isCorrect: false, feedback: 'At n = 100, even O(n³) is just a million operations — far within limits. The constraint is generous; it doesn\'t demand a linear solution.' },
        { label: 'You need a greedy approach', isCorrect: false, feedback: 'Small n doesn\'t imply greedy. A greedy that always picks the largest adjacent house fails — you need to consider global combinations.' },
        { label: 'Input size is irrelevant here', isCorrect: false, feedback: 'The small bound tells you the solution doesn\'t need to be highly optimized. Multiple linear passes are clearly fine at n = 100.' },
      ],
      correctFeedback: 'At n = 100, even quadratic solutions run in microseconds. The small bound confirms you can afford multiple passes over the array without concern.',
      wrongFeedback: [
        'How many operations does worst case look like at n = 100? What does that say about the complexity you need?',
        'n = 100 is tiny. O(n), O(n²), O(n log n) — all finish instantly. Focus on correctness, not micro-optimization.',
      ],
    },
    {
      id: 'output-type',
      question: 'The shape of the return value tells you what you actually need to compute rather than merely check. The output is the maximum amount you can rob. This means you need to…',
      highlight: { location: 'description', text: 'return the maximum amount you can rob tonight without alerting the police' },
      options: [
        { label: 'Return true if any valid robbery plan exists', isCorrect: false, feedback: 'The output is an integer — the maximum money — not a boolean. You need to optimize, not just check feasibility.' },
        { label: 'Track the running best across all valid subsets', isCorrect: false, feedback: 'Enumerating all subsets is exponential. The DP formulation encodes the optimal choice at each step — you track a running max within the DP, not over all subsets.' },
        { label: 'Maximize money while skipping adjacent houses', isCorrect: true },
        { label: 'Return the indices of houses to rob', isCorrect: false, feedback: 'The output is the dollar amount, not the house indices. You only need the maximum value, not which specific houses produce it.' },
      ],
      correctFeedback: 'Right — you\'re optimizing a sum under an adjacency constraint. That\'s the classic DP formulation: at each position, take the best of robbing here or skipping here.',
      wrongFeedback: [
        'The output is an integer amount. What kind of problem produces an optimal numeric value under a constraint?',
        'You\'re maximizing a sum while respecting a no-adjacent rule. What algorithmic pattern does that match?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def rob(self, nums):
        def rob_linear(houses):
            prev, curr = 0, 0
            for x in houses:
                prev, curr = curr, max(curr, prev + x)
            return curr

        n = len(nums)
        if n == 1:
            return nums[0]
        return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'The <code>n == 1</code> case is handled separately before either slice is built — slicing a single-house array both ways would otherwise run the linear solver on the same one house twice, which happens to still give the right answer here, but only because there is nothing else to also exclude by mistake.',
  solutionExplanation: 'Since houses 0 and n-1 can never both be robbed, one of them must always be excluded, which splits the circular problem into exactly two linear ones: rob among houses <code>[0, n-2]</code> (excluding the last) or among houses <code>[1, n-1]</code> (excluding the first). Solving plain House Robber on each slice and taking the better result covers every valid circular arrangement, since any valid plan already excludes at least one of the two endpoints and therefore fits entirely within one of the two slices.',
}
