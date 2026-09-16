export default {
  id: 'delete-and-earn',
  title: 'Delete and Earn',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code>, on each step you can pick any value <code>x</code> and gain <code>x</code> points, but then must delete all occurrences of <code>x-1</code> and <code>x+1</code>. Return maximum points you can earn.',
  examples: [
    { input: 'nums = [3,4,2]', output: '6', explanation: 'Earn 3 (delete 2 and 4) → earn 2 = total 5. Or earn 4 (delete 3) → earn 2 = total 6.' },
    { input: 'nums = [2,2,3,3,3,4]', output: '9', explanation: 'Earn all 3s (9 points), deleting 2 and 4.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 2 × 10⁴', '1 ≤ nums[i] ≤ 10⁴'],
  starterCode: `class Solution:
    def delete_and_earn(self, nums):
        pass`,
  runnerSetup: 'delete_and_earn = Solution().delete_and_earn',
  functionName: 'delete_and_earn',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'Simple', args: [[3,4,2]], expected: 6 },
    { label: 'Three 3s', args: [[2,2,3,3,3,4]], expected: 9 },
    { label: 'Single', args: [[1]], expected: 1 },
  ],
  bruteHint: 'The brute-force approach recursively walks the distinct values, and at each one branches into two choices: take it (earning its total points but forbidding both neighbors) or skip it and move on. Because both branches can arrive at the same remaining subset of values through different paths, this naive recursion re-explores identical subproblems many times, giving it exponential time in the number of distinct values. With nums=[2,2,3,3,3,4], can you see how the decision at value 3 gets revisited whether you arrived there by taking 2 first or skipping it?',
  optimizeComplexity: { time: 'O(n + max)', space: 'O(max)' },
  clues: [
    {
      id: 'deletion-rule',
      highlight: { location: 'description', text: 'gain <code>x</code> points, but then must delete all occurrences of <code>x-1</code> and <code>x+1</code>' },
      question: 'Recognizing that a rule creates conflict only between direct neighbors — never further away — is the signal that a whole family of take-it-or-skip-it DP problems applies here. Taking value x deletes all x-1 and x+1 from nums. What pattern does this rule resemble?',
      options: [
        { label: 'A sliding window across sorted values',          isCorrect: false, feedback: 'Sliding windows aggregate contiguous ranges — they don\'t model a take-or-skip decision at each value. The deletion rule creates a choice structure, not a sum-over-window structure.' },
        { label: 'House Robber — you can\'t take adjacent values', isCorrect: true },
        { label: 'Interval scheduling — avoid overlapping intervals', isCorrect: false, feedback: 'Interval scheduling deals with time ranges that overlap. Here, "adjacency" is about numeric value (x-1 and x+1), not time spans. The structure is linear DP over values, not interval conflicts.' },
        { label: 'A graph problem — values are nodes, deletions are edges', isCorrect: false, feedback: 'The adjacency structure is strictly linear (each value conflicts only with its immediate neighbors). That\'s the exact pattern of the House Robber 1D DP, not a general graph.' },
      ],
      correctFeedback: 'Taking x prevents taking x-1 and x+1 — exactly like robbing a house prevents robbing its neighbors. The reduction: build a points array indexed by value, then run House Robber on it.',
      wrongFeedback: [
        'In House Robber, taking house i means you can\'t take house i-1 or i+1. Does the deletion rule here have the same structure?',
        'The conflict is always between a value and its immediate neighbors. That\'s a linear adjacency constraint — the defining feature of House Robber.',
      ],
    },
    {
      id: 'value-aggregation',
      highlight: { location: 'description', text: 'pick any value <code>x</code> and gain <code>x</code> points' },
      question: 'Before a DP recurrence can run cleanly, you often need to collapse raw input into a form where each state contributes exactly once — spotting that need early avoids messy special-casing later. Picking value x earns x points per occurrence. How should you preprocess nums before applying DP?',
      options: [
        { label: 'Sort nums and scan left to right',               isCorrect: false, feedback: 'Sorting helps order the values, but the key step is aggregating all earnings for each distinct value. Without aggregation, you\'d have to handle duplicates on every step.' },
        { label: 'Build a points array: points[x] = x × count(x)', isCorrect: true },
        { label: 'Remove duplicates — each value is picked once',   isCorrect: false, feedback: 'Removing duplicates would discard the extra earnings from repeated values. With nums=[3,3], taking 3 earns 6, not 3. Duplicates amplify the gain — they must be counted.' },
        { label: 'Hash each value to check membership in O(1)',    isCorrect: false, feedback: 'Membership lookup isn\'t what you need. You need the total points earnable for each value — that\'s count × value, not just "is it present."' },
      ],
      correctFeedback: 'points[x] = x × count(x) collapses all occurrences into one cell. Then the DP runs over index values 0 to max(nums), treating points as the "house values" in House Robber.',
      wrongFeedback: [
        'If nums=[3,3,3], how many total points do you earn by taking all the 3s? Where should that total live in your precomputed structure?',
        'Every occurrence of x contributes x points. Summing them: points[x] = x × count(x). This lets you treat each distinct value as a single "house" with a known prize.',
      ],
    },
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: '1 ≤ nums[i] ≤ 10⁴' },
      question: 'Constraints tell you the complexity budget you must fit within, and when a value range is bounded separately from array length, it often signals that your DP should be indexed by value rather than by position. nums[i] ≤ 10⁴ bounds the value range. What does this tell you about the DP array size?',
      options: [
        { label: 'DP array size = nums.length (up to 2 × 10⁴)',  isCorrect: false, feedback: 'The DP runs over value indices, not array positions. Two arrays of different lengths but the same value range need the same DP size.' },
        { label: 'DP array size = max value (up to 10⁴)',         isCorrect: true },
        { label: 'DP array size = number of distinct values',     isCorrect: false, feedback: 'You need a contiguous index space so adjacent values are always at adjacent positions. Using only distinct values would leave gaps that break the neighbor relationship.' },
        { label: 'DP array size = nums.length × nums[i] = 2 × 10⁸', isCorrect: false, feedback: 'That product has no meaning here. The DP is one-dimensional — indexed by value from 0 to max(nums). Its size is the value range, not the array length times value.' },
      ],
      correctFeedback: 'You need a points array indexed from 0 to max(nums) ≤ 10⁴. That\'s at most 10,001 cells — small and fast. The DP then runs in O(max_value + n) time.',
      wrongFeedback: [
        'The DP runs over value indices. What\'s the maximum value index you\'ll ever need to address?',
        'Values go up to 10⁴. Your points array needs one cell per possible value — indices 0 through 10⁴, totaling 10,001 cells.',
      ],
    },
    {
      id: 'output-maximum',
      highlight: { location: 'description', text: 'Return maximum points you can earn.' },
      question: 'When the output is a maximum rather than a count or a boolean, it tells you the DP transition needs to compare competing choices and keep only the best. The output is the maximum points earnable. What does this tell you about the DP transition?',
      options: [
        { label: 'Sum all positive values in the points array',   isCorrect: false, feedback: 'You can\'t take adjacent values simultaneously. Summing everything ignores the constraint that taking x deletes x-1 and x+1.' },
        { label: 'At each value, take the best of skip or take',  isCorrect: true },
        { label: 'Find the largest single value and take only it', isCorrect: false, feedback: 'Taking only the largest value may miss non-adjacent values that together exceed it. With points=[0,0,4,5,0], taking index 3 (5) beats taking index 2 (4), but taking both (which are adjacent) isn\'t allowed — you\'d want to compare 5 vs 4, and also check non-adjacent combinations.' },
        { label: 'Greedily pick the largest value at each step',  isCorrect: false, feedback: 'Greedy fails here. With points=[0,0,4,5,4], taking 5 forces you to skip 4 on both sides (total = 5), while skipping 5 and taking both 4s yields 8.' },
      ],
      correctFeedback: 'dp[i] = max(dp[i-1], dp[i-2] + points[i]). Either skip value i (inherit dp[i-1]) or take it (earn points[i] plus the best from two steps back). This is the standard House Robber recurrence.',
      wrongFeedback: [
        'At value index i, you have two options: skip it or take it. If you take it, you can\'t use i-1. Which dp values does each choice depend on?',
        'Skip: dp[i] = dp[i-1]. Take: dp[i] = dp[i-2] + points[i]. The max of those two is dp[i].',
      ],
    },
  ],
  solutionCode: `class Solution:
    def delete_and_earn(self, nums):
        if not nums:
            return 0
        max_val = max(nums)
        points = [0] * (max_val + 1)
        for x in nums:
            points[x] += x

        take, skip = 0, 0
        for p in points:
            take, skip = skip + p, max(take, skip)
        return max(take, skip)`,
  solutionComplexity: { time: 'O(n + max)', space: 'O(max)' },
  solutionCaveat: 'Every occurrence of a value is folded into <code>points[x] = x × count(x)</code> before the DP even starts — taking value <code>x</code> once versus three times is the difference between earning <code>x</code> and <code>3x</code>, so duplicates must be summed, never deduplicated away.',
  solutionExplanation: 'Since taking value <code>x</code> forces deleting every <code>x-1</code> and <code>x+1</code>, the conflict is purely between adjacent numeric values — exactly House Robber\'s "can\'t take two neighbors" structure, just reindexed from house position to value. Running that same take-or-skip recurrence over the <code>points</code> array (indexed 0 to the maximum value present) finds the best subset of non-adjacent values to fully claim.',
}
