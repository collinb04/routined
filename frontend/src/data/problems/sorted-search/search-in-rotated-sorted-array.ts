export default {
  id: 'search-in-rotated-sorted-array',
  title: 'Search in Rotated Sorted Array',
  difficulty: 'medium',
  description: `<p>There is an integer array <code>nums</code> sorted in ascending order with distinct values, possibly rotated at an unknown pivot. Given the array <code>nums</code> and an integer <code>target</code>, return the index of <code>target</code> if it is in <code>nums</code>, or <code>-1</code> if it is not. You must write an algorithm with O(log n) runtime complexity.</p>`,
  examples: [
    { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
    { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
  ],
  constraints: ['1 <= nums.length <= 5000', 'All values are unique', '-10^4 <= nums[i], target <= 10^4'],
  starterCode: `def search(nums, target):
  pass`,
  functionName: 'search',
  conceptId: 'binary-search',
  testCases: [
    { label: 'target=0', args: [[4,5,6,7,0,1,2], 0], expected: 4 },
    { label: 'not found', args: [[4,5,6,7,0,1,2], 3], expected: -1 },
    { label: 'single', args: [[1], 0], expected: -1 },
  ],
}
