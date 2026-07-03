export default {
  id: 'wiggle-sort-ii',
  title: 'Wiggle Sort II',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code>, reorder it such that <code>nums[0] < nums[1] > nums[2] < nums[3]...</code> (strict inequalities). It is guaranteed that a valid answer exists.',
  examples: [
    { input: 'nums = [1,5,1,1,6,4]', output: '[1,6,1,5,1,4]', explanation: 'One valid wiggle arrangement.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 5 × 10⁴', '0 ≤ nums[i] ≤ 5000', 'A valid answer is guaranteed'],
  starterCode: `def wiggle_sort(nums):
  pass`,
  functionName: 'wiggle_sort',
  conceptId: 'sorting',
  testCases: [
    { label: 'Verify wiggle property', args: [[1,5,1,1,6,4]], expected: null },
    { label: '[1,3,2,2,3,1]', args: [[1,3,2,2,3,1]], expected: null },
  ],
}
