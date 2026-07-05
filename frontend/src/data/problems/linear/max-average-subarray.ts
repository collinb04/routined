export default {
  id: 'max-average-subarray',
  title: 'Maximum Average Subarray I',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code> and an integer <code>k</code>, find the contiguous subarray of length <code>k</code> with the maximum average value and return that average.',
  examples: [
    { input: 'nums = [1, 12, -5, -6, 50, 3], k = 4', output: '12.75', explanation: 'Window [12, -5, -6, 50] averages to 51 / 4 = 12.75.' },
    { input: 'nums = [5], k = 1', output: '5.0' },
  ],
  constraints: [
    '1 ≤ k ≤ nums.length ≤ 10⁵',
    '-10⁴ ≤ nums[i] ≤ 10⁴',
  ],
  starterCode: `def find_max_average(nums, k):
  pass`,
  functionName: 'find_max_average',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'Basic', args: [[1, 12, -5, -6, 50, 3], 4], expected: 12.75 },
    { label: 'Single element', args: [[5], 1], expected: 5.0 },
    { label: 'All same', args: [[3, 3, 3, 3], 2], expected: 3.0 },
    { label: 'k equals length', args: [[1, 2, 3, 4], 4], expected: 2.5 },
  ],
  clues: [
    {
      id: 'fixed-window-size',
      question: 'The subarray must have length exactly k. What does a fixed-length window imply about your approach?',
      options: [
        { label: 'Try every pair of indices', isCorrect: false, feedback: 'Every pair of indices gives O(n²) subarray candidates — at n = 100,000 that is 10 billion pairs. A fixed-length window means you can slide, not enumerate.' },
        { label: 'Slide a window of size k across the array', isCorrect: true },
        { label: 'Use a variable-size window that contracts', isCorrect: false, feedback: 'Variable-size windows are used when you need to find a window satisfying some threshold — shrinking when you overshoot. Here the window size is fixed at k, so you never need to shrink.' },
        { label: 'Sort the array and take the k largest elements', isCorrect: false, feedback: 'Sorting destroys the contiguous-subarray constraint. The k largest individual elements may not be adjacent in the original array.' },
      ],
      correctFeedback: 'A fixed-length window slides in O(n): add the new right element, subtract the element that left the window, update the running sum — no recomputation needed.',
      wrongFeedback: [
        'The window size never changes. When one side of the window moves right by one, what happens to the other side?',
        'If you add the new element on the right, what must you remove to keep the window exactly k elements wide?',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'nums.length ≤ 10⁵. What does this rule out?',
      options: [
        { label: 'Any solution that re-sums each window from scratch', isCorrect: true },
        { label: 'Using a sliding window at all', isCorrect: false, feedback: 'A sliding window runs in O(n) — well within the 10⁵ limit. The constraint is ruling out slower approaches, not faster ones.' },
        { label: 'Returning a floating-point average', isCorrect: false, feedback: 'Returning a float has nothing to do with the input size constraint. The constraint is about time complexity, not output type.' },
        { label: 'Arrays with negative numbers', isCorrect: false, feedback: 'Negative numbers are explicitly allowed by the value constraint (-10⁴ ≤ nums[i] ≤ 10⁴). The length constraint is about time, not values.' },
      ],
      correctFeedback: 'Re-summing each window from scratch is O(k) per window and O(n·k) overall — up to 10¹⁰ operations at worst. You need an O(n) approach that reuses the previous sum.',
      wrongFeedback: [
        'If you compute the sum of each k-length window independently, how many additions do you perform across all windows?',
        'Each window overlaps the previous by k − 1 elements. What does that overlap let you reuse?',
      ],
    },
    {
      id: 'output-average',
      question: 'The output is the average value, not the sum or the starting index. What does that change about the algorithm?',
      options: [
        { label: 'You must divide by k at every step', isCorrect: false, feedback: 'Dividing at every step wastes work — you only need the average of the best window. Track the maximum sum and divide once at the end.' },
        { label: 'You must track the sum, then divide once at the end', isCorrect: true },
        { label: 'You need to track the window start index', isCorrect: false, feedback: 'The output is the average value, not the position of the window. You do not need to record where the best window started.' },
        { label: 'You must avoid negative numbers in the window', isCorrect: false, feedback: 'Negatives in the window are valid — they just reduce the average. You are looking for the maximum, which may still include negatives if that window beats all others.' },
      ],
      correctFeedback: 'Maximizing the average is equivalent to maximizing the sum when k is constant. Compare sums throughout, then divide the winning sum by k once.',
      wrongFeedback: [
        'Average = sum / k. If k is fixed, which window with the largest sum will also have the largest average?',
        'Since k never changes, the average rankings match the sum rankings. How many divisions do you actually need?',
      ],
    },
  ],
}
