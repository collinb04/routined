export default {
  id: 'longest-increasing-subsequence',
  title: 'Longest Increasing Subsequence',
  difficulty: 'medium',
  description: `<p>Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.</p>`,
  examples: [
    { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4 ([2,3,7,101])' },
    { input: 'nums = [0,1,0,3,2,3]', output: '4' },
  ],
  constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
  starterCode: `class Solution:
    def length_of_lis(self, nums):
        pass`,
  runnerSetup: 'length_of_lis = Solution().length_of_lis',
  functionName: 'length_of_lis',
  conceptId: 'dp-1d',
  testCases: [
    { label: '[10,9,2,5,3,7,101,18]', args: [[10,9,2,5,3,7,101,18]], expected: 4 },
    { label: '[0,1,0,3,2,3]', args: [[0,1,0,3,2,3]], expected: 4 },
    { label: '[7,7,7,7]', args: [[7,7,7,7]], expected: 1 },
  ],
  bruteHint: 'The brute-force approach recursively explores every possible subsequence: at each index, branch into "include this element if it continues the increasing run" or "skip it entirely," which produces up to O(2^n) combinations to check. At n = 2,500, that branching factor is completely infeasible. What would let you avoid re-deciding the same subproblem — the longest increasing subsequence ending at a given index — over and over?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraint bounds tell you upfront which time complexities are realistic before you design an approach. nums.length ≤ 2500 tells you…',
      highlight: { location: 'constraint', text: '1 <= nums.length <= 2500' },
      options: [
        { label: 'O(n²) is acceptable', isCorrect: true },
        { label: 'O(n log n) is required', isCorrect: false, feedback: 'O(n log n) is achievable with a patience-sort approach, but n = 2,500 makes O(n²) = 6.25 million operations perfectly fine. The constraint permits the simpler O(n²) DP.' },
        { label: 'O(n³) is fine', isCorrect: false, feedback: 'At n = 2,500, O(n³) is 15.6 billion operations — far too slow. You need at most O(n²).' },
        { label: 'A single pass over the array suffices', isCorrect: false, feedback: 'A single pass can\'t determine the LIS length — you need to compare each element against all previous elements to find which it can extend.' },
      ],
      correctFeedback: 'n = 2,500 makes O(n²) = 6.25 million operations comfortable. That permits the classic double-loop DP: for each i, scan all j < i where nums[j] < nums[i].',
      wrongFeedback: [
        'At n = 2,500, how many comparisons does a double loop perform? Is that feasible?',
        '2,500² = 6.25 million — fast in any language. O(n²) DP is the right fit at this constraint.',
      ],
    },
    {
      id: 'subsequence-not-subarray',
      question: 'Precisely how a term like "subsequence" is defined determines which earlier states your recurrence actually needs to consider. "Subsequence" means elements need not be contiguous. What does this change about the approach?',
      highlight: { location: 'description', text: 'longest strictly increasing subsequence' },
      options: [
        { label: 'You can use a sliding window', isCorrect: false, feedback: 'Sliding windows work on contiguous subarrays. A subsequence can skip elements — the structure is fundamentally non-contiguous, so a window approach loses valid non-adjacent combinations.' },
        { label: 'dp[i] depends on all j < i, not just j = i-1', isCorrect: true },
        { label: 'Sort the array first to find the longest run', isCorrect: false, feedback: 'Sorting destroys the original order, which is exactly what "subsequence" depends on. A subsequence must respect the relative positions in the original array.' },
        { label: 'Reset the count whenever nums[i] ≤ nums[i-1]', isCorrect: false, feedback: 'Resetting on a decrease is the contiguous subarray approach. A subsequence can skip over a decrease and continue from an earlier smaller element.' },
      ],
      correctFeedback: 'For each index i, dp[i] = 1 + max(dp[j]) for all j < i where nums[j] < nums[i]. You look back at every earlier index, not just the immediately previous one.',
      wrongFeedback: [
        'If you can skip elements, which earlier indices can contribute to dp[i]? Is it only the previous index?',
        'Any index j < i where nums[j] < nums[i] can be the predecessor. dp[i] takes the maximum dp[j] over all such j — that\'s why you need a double loop.',
      ],
    },
    {
      id: 'strictly-increasing',
      question: 'The exact wording of an ordering constraint determines whether equal or repeated values are treated as valid extensions. "Strictly increasing" means equal values cannot extend a subsequence. What does [7,7,7,7] reveal?',
      highlight: { location: 'description', text: 'strictly increasing' },
      options: [
        { label: 'The answer is 4 — all elements form one subsequence', isCorrect: false, feedback: '7 is not strictly greater than 7, so no element extends another. Each 7 is its own LIS of length 1. The answer is 1, not 4.' },
        { label: 'The LIS length is 1 — no element extends any other', isCorrect: true },
        { label: 'You must de-duplicate the array first', isCorrect: false, feedback: 'De-duplicating would reduce [7,7,7,7] to [7] but isn\'t needed. Your DP condition nums[j] < nums[i] (strict) naturally handles duplicates — they just never extend each other.' },
        { label: 'Equal elements always form their own subsequence of length n', isCorrect: false, feedback: 'A strictly increasing subsequence cannot include two equal elements. [7,7,7,7] has no pair where one strictly exceeds the other, so the LIS length is 1.' },
      ],
      correctFeedback: 'Strictly increasing means dp[i] only extends from j where nums[j] < nums[i] — not ≤. Equal values each stand alone as length-1 subsequences.',
      wrongFeedback: [
        'Can 7 extend a subsequence ending with 7? What does "strictly increasing" require?',
        'The condition is nums[j] < nums[i], not nums[j] ≤ nums[i]. Equal values never satisfy strict inequality, so each is an isolated length-1 subsequence.',
      ],
    },
    {
      id: 'output-length-not-sequence',
      question: 'What a problem asks you to return determines how much information your solution actually needs to track. The output is the length of the LIS, not the actual subsequence. This means…',
      highlight: { location: 'description', text: 'return the length of the longest strictly increasing subsequence' },
      options: [
        { label: 'You must reconstruct the subsequence to find its length', isCorrect: false, feedback: 'Reconstruction requires backtracking through the DP table, which is extra work the problem never requests. The length is just the maximum value in your dp array.' },
        { label: 'dp[i] stores an integer; the answer is max(dp)', isCorrect: true },
        { label: 'Return the index where the longest subsequence ends', isCorrect: false, feedback: 'The output is the length, not an index. Multiple subsequences of the same maximum length may exist at different indices — you only need the count of elements in the longest one.' },
        { label: 'You need to store the full subsequence at each dp[i]', isCorrect: false, feedback: 'Storing actual subsequences takes O(n²) space. A single integer per index is all you need — the length of the LIS ending at that index.' },
      ],
      correctFeedback: 'Each dp[i] is an integer — the length of the LIS ending at index i. The final answer is just max(dp), read in O(n). No sequence reconstruction needed.',
      wrongFeedback: [
        'You need a single number, not a sequence. What is the simplest thing to store at each dp[i]?',
        'dp[i] = length of the longest increasing subsequence ending at index i. The answer is the maximum over all i — one scan of the dp array.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def length_of_lis(self, nums):
        n = len(nums)
        dp = [1] * n
        for i in range(n):
            for j in range(i):
                if nums[j] < nums[i]:
                    dp[i] = max(dp[i], dp[j] + 1)
        return max(dp) if dp else 0`,
  solutionComplexity: { time: 'O(n²)', space: 'O(n)' },
  solutionCaveat: 'Every <code>j &lt; i</code> is checked, not just <code>j = i - 1</code> — since a subsequence can skip over elements, the best predecessor for <code>nums[i]</code> could be any earlier index whose value is smaller, not necessarily the one immediately before it.',
  solutionExplanation: '<code>dp[i]</code> represents the length of the longest increasing subsequence that ends exactly at index <code>i</code>, and it\'s built by checking every earlier index <code>j</code> that could legally precede it (<code>nums[j] &lt; nums[i]</code>, satisfying the strict-increase requirement) and extending whichever such <code>dp[j]</code> is largest. Since the overall longest increasing subsequence must end somewhere, the answer is simply the maximum value across the whole <code>dp</code> array, not necessarily <code>dp[n-1]</code>.',
}
