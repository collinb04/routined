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
}
