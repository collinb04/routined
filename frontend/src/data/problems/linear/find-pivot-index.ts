export default {
  id: 'find-pivot-index',
  title: 'Find Pivot Index',
  difficulty: 'easy',
  description: 'Find the leftmost index such that the sum of all elements to its left equals the sum of all elements to its right. Return -1 if no such index exists.',
  examples: [
    { input: 'nums = [1,7,3,6,5,6]', output: '3', explanation: 'Left sum = 1+7+3 = 11, right sum = 5+6 = 11.' },
    { input: 'nums = [1,2,3]', output: '-1' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '-1000 ≤ nums[i] ≤ 1000'],
  starterCode: `def pivot_index(nums):
  pass`,
  functionName: 'pivot_index',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Middle pivot', args: [[1,7,3,6,5,6]], expected: 3 },
    { label: 'No pivot', args: [[1,2,3]], expected: -1 },
    { label: 'Left edge', args: [[2,1,-1]], expected: 0 },
    { label: 'Single', args: [[1]], expected: 0 },
  ],
}
