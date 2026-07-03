export default {
  id: 'sort-an-array',
  title: 'Sort an Array',
  difficulty: 'medium',
  description: 'Given an array of integers, sort the array in ascending order and return it. Implement merge sort or quicksort (O(n log n) time, O(log n) space).',
  examples: [
    { input: 'nums = [5,2,3,1]', output: '[1,2,3,5]' },
    { input: 'nums = [5,1,1,2,0,0]', output: '[0,0,1,1,2,5]' },
  ],
  constraints: ['1 ≤ nums.length ≤ 5 × 10⁴', '-5 × 10⁴ ≤ nums[i] ≤ 5 × 10⁴'],
  starterCode: `def sort_array(nums):
  pass`,
  functionName: 'sort_array',
  conceptId: 'sorting',
  testCases: [
    { label: 'Unsorted', args: [[5,2,3,1]], expected: [1,2,3,5] },
    { label: 'With duplicates', args: [[5,1,1,2,0,0]], expected: [0,0,1,1,2,5] },
    { label: 'Single', args: [[1]], expected: [1] },
    { label: 'Already sorted', args: [[1,2,3]], expected: [1,2,3] },
  ],
}
