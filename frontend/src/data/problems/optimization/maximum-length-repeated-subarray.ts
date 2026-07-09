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
  starterCode: `def find_length(nums1, nums2):
  pass`,
  functionName: 'find_length',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Length 3', args: [[1,2,3,2,1],[3,2,1,4,7]], expected: 3 },
    { label: 'All same', args: [[0,0,0,0,0],[0,0,0,0,0]], expected: 5 },
    { label: 'No overlap', args: [[1,2],[3,4]], expected: 0 },
  ],
  bruteHint: 'Describe the naive approach that checks every pair of starting positions and extends the match character by character from scratch each time',
  optimizeHint: 'Name the 2D state (ending position in nums1, ending position in nums2) you\'d memoize so each run length is built from the previous one instead of recomputed',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'nums1.length, nums2.length ≤ 1000 tells you…',
      options: [
        { label: 'O(m × n) DP is the target', isCorrect: true },
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
      question: '"Contiguous subarray, not subsequence." What does this change about the DP?',
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
      question: 'dp[i][j] is the length of the common subarray ending at positions i and j — not the global maximum. This means…',
      options: [
        { label: 'The answer is always dp[m][n]', isCorrect: false, feedback: 'dp[m][n] is only the length of the common subarray ending at the last elements of both arrays. The longest common subarray might end anywhere — you need to track the maximum across all cells.' },
        { label: 'Track the running maximum across all dp[i][j] values', isCorrect: true },
        { label: 'Backtrack from dp[m][n] to find the true maximum', isCorrect: false, feedback: 'Backtracking from dp[m][n] won\'t help — the global maximum may be at a completely different cell. You need to check every cell as it\'s computed.' },
        { label: 'The last non-zero diagonal in the table holds the answer', isCorrect: false, feedback: 'Common subarrays don\'t necessarily align on the same diagonal. The maximum can appear at any cell where a run ends — you must scan the whole table.' },
      ],
      correctFeedback: 'Update a global max = max(max, dp[i][j]) for every cell. The answer after filling the table is that global max, not dp[m][n].',
      wrongFeedback: [
        'A common subarray can end anywhere in both arrays. How do you make sure you don\'t miss the longest one?',
        'Maintain a running maximum. Every time you compute dp[i][j] > 0, check whether it beats the current best.',
      ],
    },
  ],
}
