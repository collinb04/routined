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
  starterCode: `class Solution:
    def find_max_average(self, nums, k):
        pass`,
  runnerSetup: 'find_max_average = Solution().find_max_average',
  functionName: 'find_max_average',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'Basic', args: [[1, 12, -5, -6, 50, 3], 4], expected: 12.75 },
    { label: 'Single element', args: [[5], 1], expected: 5.0 },
    { label: 'All same', args: [[3, 3, 3, 3], 2], expected: 3.0 },
    { label: 'k equals length', args: [[1, 2, 3, 4], 4], expected: 2.5 },
  ],
  bruteHint: 'The brute-force approach checks every window of length k — for each possible starting index, sum all k elements from scratch and compare that average to the best one seen so far. That works, but summing each window independently costs O(k) work, repeated across roughly n starting positions, for O(n·k) overall. At n up to 100,000, how many additions could that be in the worst case, and would it finish in time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'fixed-window-size',
      question: 'The exact wording of a problem\'s requirements often signals which category of technique applies before you\'ve reasoned about anything else. The subarray must have length exactly k — what does a fixed-length window imply about your approach?',
      options: [
        { label: 'Try every pair of indices', isCorrect: false, feedback: 'Every pair of indices gives O(n²) subarray candidates — at n = 100,000 that is 10 billion pairs. A fixed-length window means you can slide, not enumerate.' },
        { label: 'Move the k-length range forward one step', isCorrect: true },
        { label: 'Grow and shrink the range as needed', isCorrect: false, feedback: 'Variable-size windows are used when you need to find a window satisfying some threshold — shrinking when you overshoot. Here the window size is fixed at k, so you never need to shrink.' },
        { label: 'Sort the array and take the k largest elements', isCorrect: false, feedback: 'Sorting destroys the contiguous-subarray constraint. The k largest individual elements may not be adjacent in the original array.' },
      ],
      correctFeedback: 'A fixed-length window slides in O(n): add the new right element, subtract the element that left the window, update the running sum — no recomputation needed.',
      wrongFeedback: [
        'The window size never changes. When one side of the window moves right by one, what happens to the other side?',
        'If you add the new element on the right, what must you remove to keep the window exactly k elements wide?',
      ],
      highlight: { location: 'description', text: 'the contiguous subarray of length <code>k</code>' },
    },
    {
      id: 'constraint-complexity',
      question: 'Size constraints tell you how efficient your solution needs to be before you\'ve written a line of code. nums.length ≤ 10⁵ — what does this rule out?',
      options: [
        { label: 'Any solution that re-sums each window from scratch', isCorrect: true },
        { label: 'Using an approach that reuses previous work', isCorrect: false, feedback: 'A sliding window runs in O(n) — well within the 10⁵ limit. The constraint is ruling out slower approaches, not faster ones.' },
        { label: 'Returning a floating-point average', isCorrect: false, feedback: 'Returning a float has nothing to do with the input size constraint. The constraint is about time complexity, not output type.' },
        { label: 'Arrays with negative numbers', isCorrect: false, feedback: 'Negative numbers are explicitly allowed by the value constraint (-10⁴ ≤ nums[i] ≤ 10⁴). The length constraint is about time, not values.' },
      ],
      correctFeedback: 'Re-summing each window from scratch is O(k) per window and O(n·k) overall — up to 10¹⁰ operations at worst. You need an O(n) approach that reuses the previous sum.',
      wrongFeedback: [
        'If you compute the sum of each k-length window independently, how many additions do you perform across all windows?',
        'Each window overlaps the previous by k − 1 elements. What does that overlap let you reuse?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ k ≤ nums.length ≤ 10⁵' },
    },
    {
      id: 'output-average',
      question: 'The precise form of the output tells you how much bookkeeping you actually need to carry through the algorithm. The output is the average value, not the sum or the starting index — what does that change about the algorithm?',
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
      highlight: { location: 'description', text: 'return that average' },
    },
  ],
  solutionCode: `class Solution:
    def find_max_average(self, nums, k):
        window_sum = sum(nums[:k])
        max_sum = window_sum
        for i in range(k, len(nums)):
            window_sum += nums[i] - nums[i - k]
            max_sum = max(max_sum, window_sum)
        return max_sum / k`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionExplanation: 'Recomputing the sum of every window from scratch is O(n·k) — instead, sliding the window by one position only changes two elements: the one entering on the right and the one leaving on the left. Adding <code>nums[i]</code> and subtracting <code>nums[i - k]</code> updates the running sum in O(1), so the whole array only needs a single pass regardless of how wide the window is.',
}
