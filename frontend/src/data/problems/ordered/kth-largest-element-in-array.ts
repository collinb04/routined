export default {
  id: 'kth-largest-element-in-array',
  title: 'Kth Largest Element in an Array',
  difficulty: 'medium',
  description: `<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code>th largest element in the array. Note that it is the <code>k</code>th largest element in sorted order, not the <code>k</code>th distinct element. You must solve it in O(n) average time complexity.</p>`,
  examples: [
    { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
    { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
  ],
  constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
  starterCode: `def find_kth_largest(nums, k):
  pass`,
  functionName: 'find_kth_largest',
  conceptId: 'heap',
  testCases: [
    { label: 'k=2', args: [[3,2,1,5,6,4], 2], expected: 5 },
    { label: 'k=4', args: [[3,2,3,1,2,4,5,5,6], 4], expected: 4 },
  ],
}
