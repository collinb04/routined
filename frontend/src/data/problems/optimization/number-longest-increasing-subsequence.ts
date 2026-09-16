export default {
  id: 'number-longest-increasing-subsequence',
  title: 'Number of Longest Increasing Subsequence',
  difficulty: 'medium',
  description: 'Given an integer array, return the number of longest increasing subsequences.',
  examples: [
    { input: 'nums = [1,3,5,4,7]', output: '2', explanation: 'LIS length = 4. There are 2 of length 4: [1,3,5,7] and [1,3,4,7].' },
    { input: 'nums = [2,2,2,2,2]', output: '5', explanation: 'LIS length = 1. There are 5 of length 1.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 2000', '-10⁶ ≤ nums[i] ≤ 10⁶'],
  starterCode: `class Solution:
    def find_number_of_lis(self, nums):
        pass`,
  runnerSetup: 'find_number_of_lis = Solution().find_number_of_lis',
  functionName: 'find_number_of_lis',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'Two LIS', args: [[1,3,5,4,7]], expected: 2 },
    { label: 'All same', args: [[2,2,2,2,2]], expected: 5 },
    { label: 'Single', args: [[1]], expected: 1 },
  ],
  bruteHint: 'The brute-force approach enumerates every possible subsequence of nums by recursively deciding, at each index, whether to include or skip the current element, then checks which resulting subsequences are strictly increasing to find the longest ones and count them. Since each of the n elements can independently be included or excluded, there are O(2ⁿ) possible subsequences to examine. At n = 2,000, that search space is far too large to explore directly. If you already knew the length and count of the longest increasing subsequence ending at every earlier index, would you still need to regenerate every subsequence from scratch just to extend it by one more element?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraints often reveal the time complexity budget before you write a single line of code. nums.length ≤ 2000 tells you…',
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 2000' },
      options: [
        { label: 'O(n log n) is required', isCorrect: false, feedback: 'O(n log n) works for finding the length of the LIS, but counting all sequences of that length is harder to do in O(n log n). At n = 2,000, O(n²) is 4 million operations — well within limits.' },
        { label: 'O(n²) is acceptable', isCorrect: true },
        { label: 'O(2ⁿ) is fine at this size', isCorrect: false, feedback: '2^2000 is incomprehensibly large. Exponential approaches are never fine at n = 2,000.' },
        { label: 'A single pass is sufficient', isCorrect: false, feedback: 'Counting LIS requires comparing each element against all previous elements to find which ones it can extend. A single pass can\'t see those relationships.' },
      ],
      correctFeedback: 'n = 2,000 makes O(n²) = 4 million operations fast. That lets you use the classic double-loop DP: for each i, scan all j < i.',
      wrongFeedback: [
        'At n = 2,000, how many operations does O(n²) require? Is that feasible?',
        '2,000² = 4 million — well within typical time limits. That permits a double-loop over all pairs (j, i) where j < i.',
      ],
    },
    {
      id: 'count-not-length',
      question: 'Paying close attention to exactly what value the problem asks you to return often reveals what additional state your DP needs to track. The output is the count of longest subsequences, not the length. This means…',
      highlight: { location: 'description', text: 'the number of longest increasing subsequences' },
      options: [
        { label: 'Track both length and count at each index', isCorrect: true },
        { label: 'Find the LIS length first, then count separately', isCorrect: false, feedback: 'Two separate passes work but aren\'t necessary. You can accumulate both length[i] and count[i] simultaneously in a single O(n²) pass — fewer variables, one loop.' },
        { label: 'Return the length of the dp array', isCorrect: false, feedback: 'The dp array length is just n. You need to return how many subsequences achieve the maximum length — a completely different value.' },
        { label: 'Use a set to deduplicate subsequences', isCorrect: false, feedback: 'Storing actual subsequences is O(n · 2ⁿ) space. You only need counts — dp arrays tracking length and count per index give you the answer in O(n) space.' },
      ],
      correctFeedback: 'Maintain two arrays: length[i] = length of LIS ending at i, count[i] = number of such subsequences. At the end, sum count[i] for all i where length[i] equals the global maximum.',
      wrongFeedback: [
        'You need to know both "how long is the LIS ending here?" and "how many of that length exist ending here?". How many DP arrays does that suggest?',
        'Two arrays: length[i] and count[i]. When you find a longer extension at i, reset count[i] = count[j]. When you find an equally long extension, add count[j] to count[i].',
      ],
    },
    {
      id: 'count-update-rule',
      question: 'When multiple subproblems combine into one answer, whether you sum, take the max, or multiply depends entirely on whether those subproblems are alternatives or independent choices. When two paths of equal length reach the same endpoint, the count must be…',
      options: [
        { label: 'Taken as the maximum of the two counts', isCorrect: false, feedback: 'Taking the max would pick one path over the other, but both are valid. You want the total number of distinct LIS ending at this index, so you add the counts.' },
        { label: 'Summed: count[i] += count[j]', isCorrect: true },
        { label: 'Left as count[i] = 1', isCorrect: false, feedback: 'Initializing count to 1 is correct only at the start (each element is itself a LIS of length 1). When another path of equal length arrives, you must add its count — otherwise you undercount.' },
        { label: 'Multiplied: count[i] *= count[j]', isCorrect: false, feedback: 'Multiplication applies when paths are independent and combine combinatorially. Here, each path ending at j is a distinct extension — you sum them, not multiply.' },
      ],
      correctFeedback: 'When length[j] + 1 == length[i], the subsequences ending at j all extend to i — so count[i] += count[j]. If length[j] + 1 > length[i], you found a longer one: reset length[i] and count[i] = count[j].',
      wrongFeedback: [
        'Two different paths of the same length both end at index i. How many total LIS of that length end at i?',
        'Each valid predecessor j contributes count[j] distinct subsequences ending at i. To get the total, you accumulate: count[i] += count[j] for every j that extends to the same length.',
      ],
    },
    {
      id: 'equal-elements-edge',
      question: 'Worked examples often expose an edge case that a careless implementation would handle incorrectly. [2,2,2,2,2] produces output 5. This means…',
      options: [
        { label: 'Duplicate values extend increasing subsequences', isCorrect: false, feedback: '2 is not strictly greater than 2, so no element extends another here. Each element is a LIS of length 1 on its own — that\'s why there are 5 of them.' },
        { label: 'Each element is its own LIS of length 1', isCorrect: true },
        { label: 'Return n whenever all elements are equal', isCorrect: false, feedback: 'Returning n for all-equal arrays would be a special case, not a general rule. Your DP should produce 5 naturally: each index has length=1, count=1, and the global max is 1, so you sum all 5 counts.' },
        { label: 'The answer is always the array length', isCorrect: false, feedback: 'In [1,3,5,4,7], the answer is 2, not 5. The all-equal case is a boundary condition, not the general rule.' },
      ],
      correctFeedback: 'Strictly increasing means 2 cannot extend 2. Each element forms a standalone LIS of length 1. Summing five count[i]=1 values gives 5 — your DP handles this correctly without special-casing.',
      wrongFeedback: [
        'For nums[j] < nums[i] to extend a subsequence, what must be true? Does 2 < 2 hold?',
        'Strictly increasing means equal values don\'t extend each other. Every duplicate element stands alone as a LIS of length 1.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def find_number_of_lis(self, nums):
        n = len(nums)
        length = [1] * n
        count = [1] * n
        for i in range(n):
            for j in range(i):
                if nums[j] < nums[i]:
                    if length[j] + 1 > length[i]:
                        length[i] = length[j] + 1
                        count[i] = count[j]
                    elif length[j] + 1 == length[i]:
                        count[i] += count[j]
        max_len = max(length)
        return sum(c for l, c in zip(length, count) if l == max_len)`,
  solutionComplexity: { time: 'O(n²)', space: 'O(n)' },
  solutionCaveat: 'Finding a strictly <code>longer</code> extension from <code>j</code> resets <code>count[i]</code> to <code>count[j]</code>, while finding an <code>equally</code> long one adds to it — these are different operations because a strictly longer path from <code>j</code> makes every prior count at <code>i</code> obsolete, while an equal-length path is a genuinely new way to reach the same best length.',
  solutionExplanation: 'Tracking both <code>length[i]</code> (the LIS length ending at index <code>i</code>) and <code>count[i]</code> (how many distinct subsequences of that length end there) at every index lets the algorithm answer "how many" without ever materializing an actual subsequence: whenever an earlier index <code>j</code> can extend to <code>i</code>, it either sets a new best length (adopting <code>count[j]</code> as the new count) or matches the current best length (adding <code>count[j]</code> to the existing count). Summing <code>count[i]</code> over every index where <code>length[i]</code> equals the global maximum gives the total across every index the true LIS could end at.',
}
