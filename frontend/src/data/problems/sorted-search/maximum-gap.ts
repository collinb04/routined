export default {
  id: 'maximum-gap',
  title: 'Maximum Gap',
  difficulty: 'hard',
  description: 'Given an unsorted array, find the maximum difference between successive elements in its sorted form. Return 0 if the array has fewer than 2 elements. Solve in O(n) time.',
  examples: [
    { input: 'nums = [3,6,9,1]', output: '3', explanation: 'Sorted: [1,3,6,9]. Max gap is 9-6=3.' },
    { input: 'nums = [10]', output: '0' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '0 ≤ nums[i] ≤ 10⁹'],
  starterCode: `def maximum_gap(nums):
  pass`,
  functionName: 'maximum_gap',
  conceptId: 'sorting',
  testCases: [
    { label: 'Standard', args: [[3,6,9,1]], expected: 3 },
    { label: 'Single', args: [[10]], expected: 0 },
    { label: 'Two elements', args: [[1,10000000]], expected: 9999999 },
    { label: 'Consecutive', args: [[1,2,3,4,5]], expected: 1 },
  ],
}
