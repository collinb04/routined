export default {
  id: 'sliding-window-maximum',
  title: 'Sliding Window Maximum',
  difficulty: 'hard',
  description: `<p>You are given an array of integers <code>nums</code> and there is a sliding window of size <code>k</code> which is moving from the very left of the array to the very right. You can only see the <code>k</code> numbers in the window. Each time the sliding window moves right by one position, return the max sliding window values.</p>`,
  examples: [
    { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' },
    { input: 'nums = [1], k = 1', output: '[1]' },
  ],
  constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
  starterCode: `def max_sliding_window(nums, k):
  pass`,
  functionName: 'max_sliding_window',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'k=3', args: [[1,3,-1,-3,5,3,6,7], 3], expected: [3,3,5,5,6,7] },
    { label: 'k=1', args: [[1], 1], expected: [1] },
  ],
}
