export default {
  id: 'minimum-size-subarray-sum',
  title: 'Minimum Size Subarray Sum',
  difficulty: 'medium',
  description: 'Given an array of positive integers <code>nums</code> and a positive integer <code>target</code>, return the minimal length of a contiguous subarray whose sum is ≥ <code>target</code>. Return 0 if no such subarray exists.',
  examples: [
    { input: 'target=7, nums=[2,3,1,2,4,3]', output: '2', explanation: '[4,3] has sum 7 and length 2.' },
    { input: 'target=4, nums=[1,4,4]', output: '1' },
  ],
  constraints: ['1 ≤ target ≤ 10⁹', '1 ≤ nums.length ≤ 10⁵', '1 ≤ nums[i] ≤ 10⁴'],
  starterCode: `def min_sub_array_len(target, nums):
  pass`,
  functionName: 'min_sub_array_len',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'Length 2', args: [7,[2,3,1,2,4,3]], expected: 2 },
    { label: 'Length 1', args: [4,[1,4,4]], expected: 1 },
    { label: 'No solution', args: [11,[1,1,1,1,1]], expected: 0 },
    { label: 'Whole array', args: [7,[2,3,2]], expected: 3 },
  ],
  bruteHint: 'Describe checking every subarray and its time complexity',
  optimizeHint: 'Name the two-pointer technique that shrinks the window from the left once the sum condition is met',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'nums.length ≤ 10⁵. What does this rule out?',
      options: [
        { label: 'Checking every (start, end) pair of indices', isCorrect: true },
        { label: 'Using a sliding window', isCorrect: false, feedback: 'A sliding window runs in O(n) — well within n = 100,000. The constraint rules out slower approaches, not the one you want.' },
        { label: 'Iterating through the array once', isCorrect: false, feedback: 'A single pass is O(n) — exactly what you want. The constraint rules out O(n²) pair enumeration, not linear scans.' },
        { label: 'Subarrays that span the full array', isCorrect: false, feedback: 'Full-array subarrays are valid candidates. The constraint limits time complexity — it does not restrict which subarrays are valid answers.' },
      ],
      correctFeedback: 'There are O(n²) index pairs — 5 billion at n = 100,000. You need an approach where each element is added and removed from the window at most once, giving O(n) total.',
      wrongFeedback: [
        'A nested loop over start and end indices checks O(n²) pairs. At n = 10⁵, how many is that?',
        'Each element enters the window once and leaves once. What total number of operations does that give across the entire scan?',
      ],
    },
    {
      id: 'all-positive-values',
      question: '1 ≤ nums[i] ≤ 10⁴ — all values are strictly positive. What does this guarantee about the sliding window?',
      options: [
        { label: 'Adding an element always increases the window sum', isCorrect: true },
        { label: 'The minimum-length subarray is always at the start', isCorrect: false, feedback: 'Positive values guarantee monotone behavior of the window sum, but the optimal subarray can be anywhere. [2,3,1,2,4,3] with target=7 finds [4,3] near the end.' },
        { label: 'The window never needs to shrink', isCorrect: false, feedback: 'The window does shrink — that is the whole point. Once the sum reaches the target, you shrink from the left to minimize length. Positive values guarantee shrinking reduces the sum predictably.' },
        { label: 'Binary search on the window size is required', isCorrect: false, feedback: 'Binary search on window size works (O(n log n)) but is not required. The all-positive constraint enables a simpler O(n) shrink-when-valid approach.' },
      ],
      correctFeedback: 'All-positive values mean the sum strictly increases as the window grows and strictly decreases as it shrinks. This monotone property makes the two-pointer shrink-when-valid strategy correct.',
      wrongFeedback: [
        'If adding an element always increases the sum, what can you conclude when the sum reaches the target — should you expand or shrink?',
        'What would go wrong with the shrink-when-valid strategy if some values were negative? Why does all-positive prevent that problem?',
      ],
    },
    {
      id: 'shrink-when-valid',
      question: 'Once the window sum reaches target, what should you do next?',
      options: [
        { label: 'Record the window length and keep expanding', isCorrect: false, feedback: 'Continuing to expand after hitting the target would only make the window larger. Once valid, shrink from the left to find the minimal length that still meets the target.' },
        { label: 'Shrink from the left while the sum remains ≥ target', isCorrect: true },
        { label: 'Reset the window and start from the next index', isCorrect: false, feedback: 'Resetting discards valid partial sums. Shrinking from the left preserves the right portion — potentially a shorter valid window lurks just one step inward.' },
        { label: 'Record the sum and stop — the first valid window is the smallest', isCorrect: false, feedback: 'The first valid window is not necessarily the smallest. [2,3,1,2,4,3] with target=7: the first valid window might be [2,3,1,2] (length 4), but [4,3] (length 2) is shorter.' },
      ],
      correctFeedback: 'When the sum ≥ target, record the current window length, then remove the leftmost element and check again. This finds the shortest valid window ending at each right pointer position.',
      wrongFeedback: [
        'After the sum hits the target, can removing the leftmost element still leave a valid window? If yes, that would be a shorter answer.',
        'The goal is the minimum length. Once valid, you want to shrink as much as possible while staying valid. What condition keeps the shrink loop running?',
      ],
    },
    {
      id: 'no-solution-case',
      question: 'Return 0 if no such subarray exists. When is this the case?',
      options: [
        { label: 'When target is larger than the sum of the entire array', isCorrect: true },
        { label: 'When all values in nums equal 1', isCorrect: false, feedback: 'If all values are 1 and the array is long enough, the whole array can still meet the target. The no-solution case is when even the full array sum falls short of target.' },
        { label: 'When nums.length is less than target', isCorrect: false, feedback: 'Length and target are unrelated — you can have target=7 and nums=[10] (length 1). The no-solution case depends on the sum of values, not the array length.' },
        { label: 'When the maximum element is less than target', isCorrect: false, feedback: 'Even if no single element meets the target, a subarray of multiple elements might. The no-solution case requires the total sum of all elements to be less than target.' },
      ],
      correctFeedback: 'If sum(nums) < target, no subarray — not even the full array — can reach the target. Track whether the window ever became valid; if not, return 0.',
      wrongFeedback: [
        'The largest possible subarray is the entire array. If that sum is still less than target, what should you return?',
        'Initialize your answer to infinity (or 0 as a sentinel). After the scan, if no valid window was found, return 0; otherwise return the minimum length recorded.',
      ],
    },
  ],
}
