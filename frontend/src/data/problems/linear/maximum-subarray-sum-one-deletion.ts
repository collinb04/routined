export default {
  id: 'maximum-subarray-sum-one-deletion',
  title: 'Maximum Subarray Sum with One Deletion',
  difficulty: 'medium',
  description: 'Return the maximum sum of a non-empty subarray with at most one element deletion. The subarray must be contiguous and non-empty after deletion.',
  examples: [
    { input: 'arr = [1,-2,0,3]', output: '4', explanation: 'Delete -2 to get [1,0,3].' },
    { input: 'arr = [1,-2,-2,3]', output: '3', explanation: 'Delete -2,-2 is not allowed; best is just [3].' },
  ],
  constraints: ['1 ≤ arr.length ≤ 10⁵', '-10⁴ ≤ arr[i] ≤ 10⁴'],
  starterCode: `def maximum_sum(arr):
  pass`,
  functionName: 'maximum_sum',
  conceptId: 'prefix-sum',
  testCases: [
    { label: '[1,-2,0,3]', args: [[1,-2,0,3]], expected: 4 },
    { label: '[1,-2,-2,3]', args: [[1,-2,-2,3]], expected: 3 },
    { label: 'All positive', args: [[1,2,3]], expected: 6 },
    { label: 'Single negative', args: [[-1,-1,-1,-1]], expected: -1 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'arr.length ≤ 10⁵. What does this rule out for finding the best subarray?',
      options: [
        { label: 'Trying every (start, end, deletion-index) triple', isCorrect: true },
        { label: 'A single linear pass through the array', isCorrect: false, feedback: 'A linear pass is exactly what fits within n = 100,000. The constraint rules out slower approaches — not the one you want.' },
        { label: 'Using prefix sums to precompute subarray sums', isCorrect: false, feedback: 'Prefix sums run in O(n) to build and O(1) per query — well within budget. The constraint is ruling out O(n³) triple enumeration.' },
        { label: 'Arrays with negative values', isCorrect: false, feedback: 'Negative values are explicitly allowed by the value constraint (-10⁴ ≤ arr[i] ≤ 10⁴). The length constraint limits time complexity, not values.' },
      ],
      correctFeedback: 'Enumerating every (start, end) pair is O(n²); adding a deletion index makes it O(n³) — 10¹⁵ operations at n = 100,000. You need an O(n) approach.',
      wrongFeedback: [
        'If you fix start, end, and deletion index separately, how many combinations exist when n = 100,000?',
        'O(n³) is 10¹⁵ at n = 10⁵. What approach processes each element a constant number of times instead?',
      ],
    },
    {
      id: 'at-most-one-deletion',
      question: '"At most one element deletion" — not exactly one. What two cases does your solution need to handle?',
      options: [
        { label: 'Delete the minimum element always', isCorrect: false, feedback: 'Deleting the global minimum is not always optimal. The best deletion depends on which element most improves the contiguous subarray sum — that element may not be the global minimum.' },
        { label: 'Zero deletions and exactly one deletion', isCorrect: true },
        { label: 'Only consider subarrays where deletion is beneficial', isCorrect: false, feedback: '"At most one" means no deletion is always a valid option. On an all-positive array, the best answer uses zero deletions — you must compare both cases.' },
        { label: 'Delete any negative element in the subarray', isCorrect: false, feedback: 'You may delete at most one element. Deleting all negatives is not allowed. And sometimes keeping a small negative preserves a larger positive subarray on the other side.' },
      ],
      correctFeedback: 'The answer is the maximum of: (1) the best subarray with no deletion (standard Kadane), and (2) the best subarray that deletes exactly one element. Both cases must be evaluated.',
      wrongFeedback: [
        '"At most one" includes zero. For an all-positive array like [1,2,3], the answer is 6 — which case is that?',
        'You need two separate running values: one for the best subarray ending here with no deletion, and one with exactly one deletion already used.',
      ],
    },
    {
      id: 'state-tracking',
      question: 'To handle the deletion optimally in one pass, what two quantities must you track at each index?',
      options: [
        { label: 'Best subarray sum ending here with 0 deletions used, and with 1 deletion used', isCorrect: true },
        { label: 'The deleted index and the subarray start index', isCorrect: false, feedback: 'You do not need to record which index was deleted — only the running sum assuming a deletion was made. Tracking positions adds memory without helping compute the maximum sum.' },
        { label: 'The global maximum and the global minimum element', isCorrect: false, feedback: 'The global maximum and minimum are not sufficient. The deletion must be within the chosen contiguous subarray — a global minimum may be outside the optimal window.' },
        { label: 'The prefix sum and the suffix sum at each index', isCorrect: false, feedback: 'Precomputing prefix and suffix sums works (it is O(n) space), but the DP-state framing — 0-deletion and 1-deletion running sums — achieves the same in O(1) space.' },
      ],
      correctFeedback: 'Track dp0[i] = best subarray sum ending at i with no deletion, and dp1[i] = best subarray sum ending at i with exactly one deletion. Each updates in O(1) from the previous index.',
      wrongFeedback: [
        'Think of it as two parallel Kadane passes: one where every element is included, and one where you have already "spent" your deletion budget. What transitions link them?',
        'dp1 at index i can come from two places: (1) extend a dp1 subarray by including arr[i], or (2) extend a dp0 subarray by deleting arr[i]. How do you write that recurrence?',
      ],
    },
    {
      id: 'non-empty-guarantee',
      question: '"The subarray must be non-empty after deletion." What edge case does this require you to handle?',
      options: [
        { label: 'Return 0 if all values are negative', isCorrect: false, feedback: 'The subarray must be non-empty — but it can have a negative sum. For [-1,-1,-1,-1] the answer is -1, not 0. You must include at least one element.' },
        { label: 'Never delete the only element remaining in the subarray', isCorrect: true },
        { label: 'Treat single-element arrays specially before running the main logic', isCorrect: false, feedback: 'Single-element arrays are handled correctly if your DP initializes properly: dp0[0] = arr[0], dp1[0] = -infinity (no deletion possible yet). No special case needed.' },
        { label: 'Skip subarrays of length 1 when considering deletions', isCorrect: false, feedback: 'Length-1 subarrays with a deletion would leave zero elements — that is the invalid case. But longer subarrays of any length where deletion still leaves ≥ 1 element are valid.' },
      ],
      correctFeedback: 'Deleting the only element in a length-1 window leaves an empty subarray, which is invalid. Your dp1 state must require at least one non-deleted element to remain.',
      wrongFeedback: [
        'If your subarray currently has only one element and you delete it, how many elements remain? Is that allowed?',
        'dp1[i] should only be valid when there is at least one element besides the deleted one. How does that constrain the initialization of dp1?',
      ],
    },
  ],
}
