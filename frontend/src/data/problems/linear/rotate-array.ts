export default {
  id: 'rotate-array',
  title: 'Rotate Array',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code>, rotate the array to the right by <code>k</code> steps in-place.',
  examples: [
    { input: 'nums=[1,2,3,4,5,6,7], k=3', output: '[5,6,7,1,2,3,4]', explanation: 'Rotate right 3 times.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1', '0 ≤ k ≤ 10⁵'],
  starterCode: `def rotate(nums, k):
  pass
  return nums`,
  functionName: 'rotate',
  conceptId: 'arrays',
  testCases: [
    { label: 'Rotate 3', args: [[1,2,3,4,5,6,7],3], expected: [5,6,7,1,2,3,4] },
    { label: 'Rotate by length', args: [[1,2],2], expected: [1,2] },
    { label: 'Rotate 1', args: [[1,2,3],1], expected: [3,1,2] },
  ],
  bruteHint: 'Describe rotating one step at a time k times, or building a new array, and name their time and space costs',
  optimizeHint: 'Name the in-place technique that reverses the array three times to achieve O(1) extra space',
  clues: [
    {
      id: 'k-mod-n',
      question: '0 ≤ k ≤ 10⁵ and nums.length ≤ 10⁵. What happens when k ≥ nums.length?',
      options: [
        { label: 'The rotation wraps around; k % n is the effective shift', isCorrect: true },
        { label: 'k must be clamped to nums.length − 1', isCorrect: false, feedback: 'Clamping k to n−1 gives the wrong result. Rotating by n steps returns the array to its original state, so k % n is the correct reduction — not k clamped at n−1.' },
        { label: 'The array becomes empty', isCorrect: false, feedback: 'Rotation never removes elements. With n = k, you rotate n steps and return to the original order. k % n handles this: n % n = 0.' },
        { label: 'You should raise an error for k ≥ n', isCorrect: false, feedback: 'The constraint explicitly allows k up to 10⁵ regardless of array length. The problem expects you to handle it — k % n is the standard reduction.' },
      ],
      correctFeedback: 'Rotating by n is a full cycle back to the original. So only k % n steps have any effect. Always reduce k first: effective_k = k % len(nums).',
      wrongFeedback: [
        'What does rotating an array of length 7 by 7 steps produce? What does that say about rotating by 7 + 3 steps?',
        'Every n steps return the array to its original state. Rotating by k is identical to rotating by k % n. What is k % n when k = n?',
      ],
    },
    {
      id: 'in-place-constraint',
      question: '"Rotate the array in-place." What does this rule out?',
      options: [
        { label: 'Using index arithmetic to compute new positions', isCorrect: false, feedback: 'Index arithmetic is allowed regardless of in-place. It does not allocate a separate array of size n, so it satisfies the in-place constraint.' },
        { label: 'Allocating a second array of length n to hold the rotated result', isCorrect: true },
        { label: 'Using a temporary variable during swaps', isCorrect: false, feedback: 'A single temporary variable is O(1) extra space — well within the in-place constraint. In-place means no auxiliary array of size n, not zero variables.' },
        { label: 'Iterating over the array more than once', isCorrect: false, feedback: 'Multiple passes are fine as long as you write the result back into the original nums. In-place restricts space, not pass count.' },
      ],
      correctFeedback: 'In-place means O(1) extra space. Creating a new array of length n, filling it, then copying back is O(n) space — not in-place.',
      wrongFeedback: [
        'What does in-place specifically restrict — time, space, or both? What counts as "extra space" here?',
        'In-place means you must rearrange elements within nums itself using only a constant amount of additional memory. An auxiliary array of the same length violates this.',
      ],
    },
    {
      id: 'reverse-trick',
      question: 'Rotating right by k steps can be achieved with three reversals. What is the order?',
      options: [
        { label: 'Reverse middle, then reverse left, then reverse right', isCorrect: false, feedback: 'There is no "middle" in the three-reversal approach. The splits are the last k elements and the first n−k elements.' },
        { label: 'Reverse the whole array, reverse first k, reverse last n−k', isCorrect: true },
        { label: 'Reverse first k, reverse last n−k, reverse the whole array', isCorrect: false, feedback: 'Reversing the parts first and then the whole gives the left-rotation, not the right-rotation. The order of operations matters.' },
        { label: 'Reverse last n−k, reverse first k, reverse the whole array', isCorrect: false, feedback: 'This ordering does not produce the correct rotation. The standard trick reverses the whole first, then the two parts.' },
      ],
      correctFeedback: 'For [1,2,3,4,5,6,7] with k=3: reverse all → [7,6,5,4,3,2,1]; reverse first 3 → [5,6,7,4,3,2,1]; reverse last 4 → [5,6,7,1,2,3,4]. Three O(n) reversals, O(1) space.',
      wrongFeedback: [
        'Try it by hand: reverse all of [1,2,3,4,5,6,7], then reverse the first k=3 elements of the result. What do you get? Now reverse the rest.',
        'After reversing the whole array, the last k elements (now at the front, reversed) need to be put in their correct forward order. Reversing the first k fixes that; reversing the remaining n−k fixes the other half.',
      ],
    },
    {
      id: 'input-size-complexity',
      question: 'nums.length ≤ 10⁵ and the problem asks for in-place rotation. What complexity does the three-reversal approach achieve?',
      options: [
        { label: 'O(n log n) time, O(1) space', isCorrect: false, feedback: 'Each reversal is a linear scan — O(n) not O(n log n). Three linear passes give O(n) total time.' },
        { label: 'O(n) time, O(1) space', isCorrect: true },
        { label: 'O(n) time, O(n) space', isCorrect: false, feedback: 'The three-reversal approach uses only a temporary swap variable — O(1) extra space. That is its advantage over creating a new array.' },
        { label: 'O(k) time — only the moved elements are touched', isCorrect: false, feedback: 'All three reversals touch the entire array. The first reversal alone is O(n). The total is O(n), not O(k).' },
      ],
      correctFeedback: 'Three reversals, each O(n), give O(n) total time. Swaps within the array use O(1) extra space — satisfying both the in-place constraint and linear-time requirement for n = 100,000.',
      wrongFeedback: [
        'How many elements does each of the three reversals touch? What is the total number of element operations across all three?',
        'Each reversal scans at most n elements. Three scans = O(3n) = O(n). Each swap uses a single temp variable — constant space regardless of n.',
      ],
    },
  ],
}
