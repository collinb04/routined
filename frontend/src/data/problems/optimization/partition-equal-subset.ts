export default {
  id: 'partition-equal-subset',
  title: 'Partition Equal Subset Sum',
  difficulty: 'medium',
  description: 'Given a non-empty array <code>nums</code> of positive integers, determine if it can be partitioned into two subsets with equal sums.',
  examples: [
    { input: 'nums = [1,5,11,5]', output: 'true', explanation: '[1,5,5] and [11] both sum to 11.' },
    { input: 'nums = [1,2,3,5]', output: 'false', explanation: 'Cannot be partitioned into equal sums.' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 200',
    '1 ≤ nums[i] ≤ 100',
  ],
  starterCode: `class Solution:
    def can_partition(self, nums):
        # Hint: target = sum(nums)//2; if odd total, return False
        # dp[j] = True if subset summing to j is reachable
        pass`,
  runnerSetup: 'can_partition = Solution().can_partition',
  functionName: 'can_partition',
  conceptId: 'dp-knapsack',
  testCases: [
    { label: 'Can partition', args: [[1,5,11,5]], expected: true },
    { label: 'Cannot', args: [[1,2,3,5]], expected: false },
    { label: 'Two equal', args: [[3,3]], expected: true },
    { label: 'Odd sum', args: [[1,2]], expected: false },
    { label: 'Larger', args: [[1,2,5,5,11]], expected: true },
  ],
  bruteHint: 'The brute-force approach recursively tries, for each number, two choices: include it in the first subset or leave it for the second, branching across up to 2^n possible ways to split the array. Even though many of these branches ask about the same remaining target sum reached from different points in the array, the recursion re-derives each one independently, giving O(2^n) time in the worst case. If the same (index, remaining-target) pair keeps reappearing across separate branches, what technique would let you compute it once and reuse the answer?',
  optimizeComplexity: { time: 'O(n·sum)', space: 'O(sum)' },
  clues: [
    {
      id: 'odd-sum-early-exit',
      question: 'Cheap invariants derived directly from the input can eliminate entire classes of impossible cases before you write any real algorithm. The two subsets must have equal sums. What can you check immediately before any DP work?',
      highlight: { location: 'description', text: 'equal sums' },
      options: [
        { label: 'Whether the array is sorted', isCorrect: false, feedback: 'Sorted order doesn\'t determine partitionability. [1,5,5,11] can be partitioned even though it\'s unsorted, and sorting it doesn\'t change the answer.' },
        { label: 'Whether the total sum is even', isCorrect: true },
        { label: 'Whether any single element equals half the sum', isCorrect: false, feedback: 'A single element equaling half the sum means it and the rest can form equal subsets, but this is a special case. The odd-sum check is more fundamental — if the total is odd, no equal partition is possible at all.' },
        { label: 'Whether the array has an even number of elements', isCorrect: false, feedback: 'Even length doesn\'t guarantee equal partitioning — [1,1,1,2] has 4 elements but sums to 5, which is odd. The element count is irrelevant; the total sum parity is what matters.' },
      ],
      correctFeedback: 'If sum(nums) is odd, return false immediately — you can\'t split an odd total into two equal integer halves. This free check avoids all subsequent work.',
      wrongFeedback: [
        'If the total sum is 5, can you split it into two equal-sum subsets? What does that tell you to check first?',
        'Equal subsets require sum/2 per subset. If sum is odd, sum/2 isn\'t an integer — no valid partition exists. Return false before starting DP.',
      ],
    },
    {
      id: 'problem-reduction',
      question: 'Recognizing that a complex-sounding requirement is actually a restatement of a well-known simpler problem can save you from designing a solution from scratch. "Two subsets with equal sums" reduces to what simpler problem?',
      highlight: { location: 'description', text: 'partitioned into two subsets' },
      options: [
        { label: 'Find all possible subset sums', isCorrect: false, feedback: 'You don\'t need all subset sums — just whether one specific target (sum/2) is reachable. That\'s a focused subset-sum check, not a full enumeration.' },
        { label: 'Can any subset sum to exactly sum(nums) / 2?', isCorrect: true },
        { label: 'Sort the array and greedily assign elements', isCorrect: false, feedback: 'Greedy fails: [1,5,5,11] sorted is [1,5,5,11]. Greedily taking the largest (11) leaves [1,5,5] = 11 — correct by luck, but this approach fails on many inputs.' },
        { label: 'Find the maximum subset sum ≤ sum(nums) / 2', isCorrect: false, feedback: 'Maximum subset ≤ target is a different problem. You need to know if the target is exactly achievable — not the closest you can get.' },
      ],
      correctFeedback: 'If one subset sums to target = sum/2, the remaining elements automatically sum to target too. You only need to solve subset-sum for one half.',
      wrongFeedback: [
        'If you find a subset summing to exactly sum/2, what must the remaining elements sum to?',
        'The two halves must sum to the same value. Find one half that hits target = sum/2 exactly, and the other half is determined automatically.',
      ],
    },
    {
      id: 'knapsack-state',
      question: 'The bounds given in a problem\'s constraints directly determine how large a DP table you can afford to build. The target is at most sum(nums)/2 ≤ 200×100/2 = 10,000. What DP structure does this suggest?',
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 200' },
      options: [
        { label: 'A 1D boolean array dp[0..target]', isCorrect: true },
        { label: 'A 2D table dp[i][j] over elements and target', isCorrect: false, feedback: 'A 2D table (200 × 10,000 = 2 million cells) works but uses more space than needed. A 1D array updated in reverse order achieves the same result in O(target) space.' },
        { label: 'A set of all reachable sums', isCorrect: false, feedback: 'A set works and is intuitive, but at each step you\'d iterate over all current sums to add the new element. A 1D boolean array indexed by sum is equivalent and more cache-friendly.' },
        { label: 'BFS over all reachable sums', isCorrect: false, feedback: 'BFS over sums would visit each reachable sum once per element — equivalent to the DP but with more overhead. The 1D array is cleaner.' },
      ],
      correctFeedback: 'dp[j] = True if sum j is reachable using a subset of elements seen so far. With target ≤ 10,000, the array has at most 10,001 cells — updated for each of up to 200 elements.',
      wrongFeedback: [
        'The target is at most 10,000. What does a boolean array of that size represent, and how does each element update it?',
        'dp[j] tracks whether sum j is achievable. For each new element x, any previously reachable sum j lets you also reach j+x. Iterate backwards to avoid using the same element twice.',
      ],
    },
    {
      id: 'iterate-backwards',
      question: 'The order in which you update a DP array can silently change what each state represents, so it\'s worth reasoning about direction explicitly. When updating dp[j] with a new element x, you must iterate j from target down to x. Why?',
      options: [
        { label: 'To process larger sums before smaller ones', isCorrect: false, feedback: 'The direction isn\'t about ordering sums by size — it\'s about preventing an element from being used more than once.' },
        { label: 'To prevent using the same element more than once', isCorrect: true },
        { label: 'Because dp[j-x] hasn\'t been computed yet otherwise', isCorrect: false, feedback: 'dp[j-x] is already computed before the current iteration starts. The forward vs. backward direction doesn\'t affect whether dp[j-x] is available — it affects whether dp[j-x] already includes x.' },
        { label: 'Because the target is larger than x', isCorrect: false, feedback: 'The relative sizes of target and x don\'t determine the iteration direction. The direction is dictated by the 0/1 knapsack constraint — each element is either included or not.' },
      ],
      correctFeedback: 'If you iterate forward, dp[j] is updated before dp[j+x] is read — meaning x could be counted twice. Iterating backwards ensures dp[j-x] still reflects the state before x was added.',
      wrongFeedback: [
        'If dp[j] is updated before you check dp[j] when computing dp[j+x], what might go wrong?',
        'Forward iteration lets you use x multiple times in the same pass. Backwards iteration ensures each dp[j] is updated using only the old values — x is used at most once.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def can_partition(self, nums):
        total = sum(nums)
        if total % 2 != 0:
            return False
        target = total // 2
        dp = [False] * (target + 1)
        dp[0] = True
        for num in nums:
            for j in range(target, num - 1, -1):
                dp[j] = dp[j] or dp[j - num]
        return dp[target]`,
  solutionComplexity: { time: 'O(n × target)', space: 'O(target)' },
  solutionCaveat: 'The inner loop walks <code>j</code> *backward*. Going forward would let the same item be "used" twice in one pass — reading <code>dp[j - num]</code> after it was already updated this round for the same item — which turns 0/1 knapsack into the unbounded (reusable-items) variant by accident.',
  solutionExplanation: 'An odd total can never split into two equal halves, so that\'s an instant no. Otherwise this is 0/1 knapsack in disguise: can some subset of <code>nums</code> sum to exactly half the total? <code>dp[j]</code> tracks whether capacity <code>j</code> is reachable using items considered so far; each item either gets skipped (dp[j] stays as-is) or included (dp[j] becomes true if dp[j - num] was already reachable before this item). If half the total is reachable, its complement — the rest of the array — sums to the other half automatically.',
}
