export default {
  id: 'target-sum',
  title: 'Target Sum',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and integer <code>target</code>, you can assign + or - to each number. Return the number of ways to assign signs to reach the target sum.',
  examples: [
    { input: 'nums=[1,1,1,1,1], target=3', output: '5', explanation: 'There are 5 ways to assign + and - to get sum 3.' },
    { input: 'nums=[1], target=1', output: '1' },
  ],
  constraints: ['1 ≤ nums.length ≤ 20', '0 ≤ nums[i] ≤ 1000', '0 ≤ sum(nums[i]) ≤ 1000', '-1000 ≤ target ≤ 1000'],
  starterCode: `class Solution:
    def find_target_sum_ways(self, nums, target):
        pass`,
  runnerSetup: 'find_target_sum_ways = Solution().find_target_sum_ways',
  functionName: 'find_target_sum_ways',
  conceptId: 'dp-2d',
  testCases: [
    { label: '5 ways', args: [[1,1,1,1,1],3], expected: 5 },
    { label: '1 way', args: [[1],1], expected: 1 },
    { label: 'No way', args: [[1],2], expected: 0 },
  ],
  bruteHint: 'The brute-force approach recursively tries both + and - for every element, building the full binary tree of sign assignments and counting the leaves that sum to target. Since each of the n elements doubles the branching, this explores O(2ⁿ) assignments — up to 2²⁰ for the given constraints — and many branches revisit the exact same (index, running-sum) pair. What could you cache to avoid recomputing those repeated (index, sum) states?',
  optimizeComplexity: { time: 'O(n·sum)', space: 'O(sum)' },
  clues: [
    {
      id: 'counting-not-boolean',
      question: 'The output specification tells you whether the DP needs to track feasibility or an exact count, which changes what each state accumulates. The output is the number of ways to reach the target, not just whether it\'s reachable. This means…',
      highlight: { location: 'description', text: 'Return the number of ways to assign signs to reach the target sum.' },
      options: [
        { label: 'Return true as soon as any assignment reaches the target', isCorrect: false, feedback: 'Stopping at the first valid assignment gives you a boolean, not a count. All valid sign assignments must be enumerated or accumulated.' },
        { label: 'Accumulate a count instead of a boolean', isCorrect: true },
        { label: 'Return the number of elements assigned "+"', isCorrect: false, feedback: 'The count of "+" assignments isn\'t the output — you need the number of distinct complete sign assignments that produce the target sum.' },
        { label: 'Find the maximum number of "+" signs possible', isCorrect: false, feedback: 'Maximizing "+" signs is a different objective. The problem counts all sign assignments that produce exactly the target sum — not just the ones with the most positives.' },
      ],
      correctFeedback: 'dp[i][s] = number of ways to assign signs to the first i elements to achieve sum s. At the end, return dp[n][target].',
      wrongFeedback: [
        'You need a count, not a yes/no answer. How does that change what you store at each DP state?',
        'Instead of dp[i][s] = True/False, store dp[i][s] = how many ways achieve sum s using the first i elements. Accumulate counts.',
      ],
    },
    {
      id: 'constraint-size',
      question: 'Constraints on input size and value range tell you how large the DP state space becomes, which determines whether an approach is computationally feasible. nums.length ≤ 20 and sum(nums) ≤ 1000. What does this tell you about feasible approaches?',
      highlight: { location: 'constraint', text: '0 ≤ sum(nums[i]) ≤ 1000' },
      options: [
        { label: 'Brute force all 2²⁰ sign assignments', isCorrect: false, feedback: '2²⁰ is about 1 million — technically feasible but unnecessary. The DP over (index, sum) states is cleaner and faster at O(n × sum).' },
        { label: 'DP with O(n × sum) states fits well', isCorrect: true },
        { label: 'O(n²) is too slow', isCorrect: false, feedback: 'At n = 20, O(n²) = 400 operations — trivially fast. The concern here is tracking the sum dimension, not the element count.' },
        { label: 'Only O(n) space is acceptable', isCorrect: false, feedback: 'The sum dimension spans from -1000 to +1000. You need O(sum) space to track all reachable sums at each step — O(n) alone is insufficient.' },
      ],
      correctFeedback: 'n ≤ 20 elements and sums ranging from -1000 to +1000 give 20 × 2001 = 40,020 DP states. That\'s tiny — well within memory and time limits.',
      wrongFeedback: [
        'How many distinct (index, current_sum) pairs can there be? Is that a manageable state space?',
        'n = 20 indices and sums from -1000 to +1000 give about 40,000 states. Computing each in O(1) makes the whole DP O(n × sum) ≈ 40,000 operations.',
      ],
    },
    {
      id: 'two-branches',
      question: 'When a problem states a discrete choice made at every step, that choice defines exactly what each DP transition must branch into. Each element is assigned either + or -. How does the DP transition work?',
      highlight: { location: 'description', text: 'you can assign + or - to each number' },
      options: [
        { label: 'dp[i][s] = dp[i-1][s - nums[i]] (take positive only)', isCorrect: false, feedback: 'That transition only considers assigning "+" to nums[i]. You must also consider assigning "-" — both branches contribute to the count.' },
        { label: 'dp[i][s] = dp[i-1][s - nums[i]] + dp[i-1][s + nums[i]]', isCorrect: true },
        { label: 'dp[i][s] = max(dp[i-1][s - nums[i]], dp[i-1][s + nums[i]])', isCorrect: false, feedback: 'max combines paths by picking the better one — that\'s optimization. Here you\'re counting all valid paths, so you add the two counts, not take the max.' },
        { label: 'dp[i][s] = dp[i-1][s] + nums[i]', isCorrect: false, feedback: 'Adding nums[i] to the sum directly doesn\'t represent assigning a sign. Each step must branch into two sub-paths: one adding nums[i] and one subtracting it.' },
      ],
      correctFeedback: 'From sum s at step i, you reach s + nums[i] (assign +) or s - nums[i] (assign -). So dp[i][s] counts paths from both dp[i-1][s - nums[i]] and dp[i-1][s + nums[i]].',
      wrongFeedback: [
        'If you\'re at sum s after i-1 elements, which two sums can you come from at step i? Both contribute to dp[i][s].',
        'sum s after i steps came from s - nums[i] (if + was assigned) or s + nums[i] (if - was assigned) at step i-1. Add both counts.',
      ],
    },
  ],
  solutionCode: `from collections import defaultdict

class Solution:
    def find_target_sum_ways(self, nums, target):
        dp = defaultdict(int)
        dp[0] = 1
        for num in nums:
            new_dp = defaultdict(int)
            for s, cnt in dp.items():
                new_dp[s + num] += cnt
                new_dp[s - num] += cnt
            dp = new_dp
        return dp[target]`,
  solutionComplexity: { time: 'O(n · sum)', space: 'O(sum)' },
  solutionCaveat: 'Both the <code>+</code> and <code>-</code> branches are added into <code>new_dp</code>, never chosen between — every way of reaching a given sum through the first <code>i-1</code> elements branches into two independent ways of reaching a new sum at step <code>i</code>, and both must be counted since they represent genuinely different sign assignments.',
  solutionExplanation: 'A dict mapping each reachable running sum to how many sign assignments produce it starts at <code>{0: 1}</code> (zero elements processed, sum 0, exactly one way — assign nothing) and, for every number, every existing <code>(sum, count)</code> entry spawns two new entries — one for assigning <code>+</code>, one for <code>-</code> — accumulating counts when different paths land on the same sum. After processing all of <code>nums</code>, the count of ways to have reached exactly <code>target</code> is read directly out of the final dict.',
}
