export default {
  id: 'find-minimum-in-rotated-sorted-array',
  title: 'Find Minimum in Rotated Sorted Array',
  difficulty: 'medium',
  description: `<p>Suppose an array of length <code>n</code> sorted in ascending order is rotated between 1 and <code>n</code> times. Given the sorted rotated array <code>nums</code> of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.</p>`,
  examples: [
    { input: 'nums = [3,4,5,1,2]', output: '1' },
    { input: 'nums = [4,5,6,7,0,1,2]', output: '0' },
  ],
  constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All elements are unique'],
  starterCode: `def find_min(nums):
  pass`,
  functionName: 'find_min',
  conceptId: 'binary-search',
  testCases: [
    { label: '[3,4,5,1,2]', args: [[3,4,5,1,2]], expected: 1 },
    { label: '[4,5,6,7,0,1,2]', args: [[4,5,6,7,0,1,2]], expected: 0 },
    { label: '[11,13,15,17]', args: [[11,13,15,17]], expected: 11 },
  ],
}
