export default {
  id: 'maximum-length-repeated-subarray',
  title: 'Maximum Length of Repeated Subarray',
  difficulty: 'medium',
  description: 'Given two integer arrays, return the maximum length of a subarray that appears in both arrays. (Contiguous subarrays, not subsequences.)',
  examples: [
    { input: 'nums1=[1,2,3,2,1], nums2=[3,2,1,4,7]', output: '3', explanation: '[3,2,1] is the longest common subarray of length 3.' },
    { input: 'nums1=[0,0,0,0,0], nums2=[0,0,0,0,0]', output: '5' },
  ],
  constraints: ['1 ≤ nums1.length, nums2.length ≤ 1000', '0 ≤ nums1[i], nums2[i] ≤ 100'],
  starterCode: `class Solution:
    def find_length(self, nums1, nums2):
        pass`,
  runnerSetup: 'find_length = Solution().find_length',
  functionName: 'find_length',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Length 3', args: [[1,2,3,2,1],[3,2,1,4,7]], expected: 3 },
    { label: 'All same', args: [[0,0,0,0,0],[0,0,0,0,0]], expected: 5 },
    { label: 'No overlap', args: [[1,2],[3,4]], expected: 0 },
  ],
  bruteHint: 'The brute-force approach tries every pair of starting positions (i in nums1, j in nums2) and, for each pair, walks forward one element at a time to measure how far the matching run extends before a mismatch. With O(m × n) starting pairs and up to O(min(m, n)) steps to extend each one, this costs roughly O(m × n × min(m, n)) time in the worst case. Every one of those extension walks re-derives a run length that overlaps heavily with the walk from a neighboring starting pair. Could the length of a run ending at (i, j) be computed directly from the length of the run ending at (i-1, j-1)?',
  optimizeComplexity: { time: 'O(m·n)', space: 'O(m·n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraints often reveal the time complexity budget before you write a single line of code. nums1.length, nums2.length ≤ 1000 tells you…',
      highlight: { location: 'constraint', text: '1 ≤ nums1.length, nums2.length ≤ 1000' },
      options: [
        { label: 'O(m × n) is the target complexity', isCorrect: true },
        { label: 'O(m + n) linear time is achievable', isCorrect: false, feedback: 'A linear pass can\'t align subarrays at every possible offset. You need to compare every prefix of nums1 against every prefix of nums2 — that\'s inherently O(m × n).' },
        { label: 'O(m × n × min(m,n)) is acceptable', isCorrect: false, feedback: 'At m = n = 1,000, that\'s 1 billion operations — too slow. The 2D DP solves this in O(m × n) = 1 million operations.' },
        { label: 'Sort both arrays first', isCorrect: false, feedback: 'Sorting destroys the order of elements, which is essential for matching contiguous subarrays. Position matters — [3,2,1] is a subarray; a sorted version [1,2,3] might not appear at the right positions.' },
      ],
      correctFeedback: 'A (m+1) × (n+1) DP table has about 1 million cells at max size. Each cell is O(1). Total: O(m × n) — the natural fit.',
      wrongFeedback: [
        'How many pairs (i, j) are there when both arrays have length up to 1,000? Is O(m × n) feasible?',
        'There are 1,001 × 1,001 ≈ 1 million state pairs. Computing each in O(1) gives O(m × n) total.',
      ],
    },
    {
      id: 'contiguous-requirement',
      question: 'Precise problem wording like "contiguous" versus "subsequence" changes how a mismatch should affect your recurrence. "Contiguous subarray, not subsequence." What does this change about the DP?',
      highlight: { location: 'description', text: '(Contiguous subarrays, not subsequences.)' },
      options: [
        { label: 'A mismatch resets the current run length to 0', isCorrect: true },
        { label: 'A mismatch carries forward the best seen so far', isCorrect: false, feedback: 'Carrying forward the best is the subsequence approach. For a contiguous subarray, a mismatch means the run ending at this pair (i, j) must stop — the length resets to 0.' },
        { label: 'You skip mismatched positions and continue', isCorrect: false, feedback: 'Skipping breaks contiguity. The subarray must be an unbroken run of matching elements at corresponding positions in both arrays.' },
        { label: 'You need a 3D table to track all possible alignments', isCorrect: false, feedback: 'A 2D table is enough. dp[i][j] represents the length of the longest common subarray ending at nums1[i-1] and nums2[j-1] — contiguity is enforced by resetting on mismatch.' },
      ],
      correctFeedback: 'dp[i][j] = dp[i-1][j-1] + 1 if nums1[i-1] == nums2[j-1], else 0. The reset to 0 enforces contiguity — any mismatch breaks the run.',
      wrongFeedback: [
        'If nums1[i] ≠ nums2[j], can the common subarray ending at this pair continue? What does dp[i][j] become?',
        'dp[i][j] is the length of the common subarray ending exactly at positions i and j. A mismatch means no subarray ends here — dp[i][j] = 0.',
      ],
    },
    {
      id: 'track-global-max',
      question: 'The exact quantity a DP state stores doesn\'t always coincide with the final answer, so knowing where the answer lives matters. dp[i][j] is the length of the common subarray ending at positions i and j — not the global maximum. This means…',
      options: [
        { label: 'The answer is always the value computed for the very last pair of elements', isCorrect: false, feedback: 'dp[m][n] is only the length of the common subarray ending at the last elements of both arrays. The longest common subarray might end anywhere — you need to track the maximum across all cells.' },
        { label: 'Track the running maximum across every position pair as you go', isCorrect: true },
        { label: 'Backtrack from the final pair of elements to find the true maximum', isCorrect: false, feedback: 'Backtracking from dp[m][n] won\'t help — the global maximum may be at a completely different cell. You need to check every cell as it\'s computed.' },
        { label: 'The last non-zero diagonal encountered holds the answer', isCorrect: false, feedback: 'Common subarrays don\'t necessarily align on the same diagonal. The maximum can appear at any cell where a run ends — you must scan the whole table.' },
      ],
      correctFeedback: 'Update a global max = max(max, dp[i][j]) for every cell. The answer after filling the table is that global max, not dp[m][n].',
      wrongFeedback: [
        'A common subarray can end anywhere in both arrays. How do you make sure you don\'t miss the longest one?',
        'Maintain a running maximum. Every time you compute dp[i][j] > 0, check whether it beats the current best.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def find_length(self, nums1, nums2):
        m, n = len(nums1), len(nums2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        best = 0
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if nums1[i - 1] == nums2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                    best = max(best, dp[i][j])
        return best`,
  solutionComplexity: { time: 'O(m · n)', space: 'O(m · n)' },
  solutionCaveat: 'On a mismatch, <code>dp[i][j]</code> is left at its default <code>0</code> rather than inheriting <code>dp[i-1][j]</code> or <code>dp[i][j-1]</code> the way the longest-common-*subsequence* recurrence would — contiguity means a broken run must actually restart at zero, not just fall back to a smaller overlapping run.',
  solutionExplanation: '<code>dp[i][j]</code> is the length of the common run that ends exactly at <code>nums1[i-1]</code> and <code>nums2[j-1]</code>, so it only ever grows by one when those two elements match, extending whatever run ended one position earlier in both arrays (<code>dp[i-1][j-1]</code>) — any mismatch forces the run back to zero since contiguous subarrays can\'t skip over a break. Because the longest common run can end at any pair of positions, not necessarily the last elements of both arrays, a running <code>best</code> is tracked across every cell rather than reading only the final one.',
}
