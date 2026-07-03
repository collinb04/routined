export default {
  id: 'move-zeroes',
  title: 'Move Zeroes',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code>, move all 0s to the end while maintaining the relative order of non-zero elements. Do it in-place without making a copy.',
  examples: [
    { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' },
    { input: 'nums = [0]', output: '[0]' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1'],
  starterCode: `def move_zeroes(nums):
  pass
  return nums`,
  functionName: 'move_zeroes',
  conceptId: 'arrays',
  testCases: [
    { label: 'Standard', args: [[0,1,0,3,12]], expected: [1,3,12,0,0] },
    { label: 'Single zero', args: [[0]], expected: [0] },
    { label: 'No zeros', args: [[1,2,3]], expected: [1,2,3] },
    { label: 'All zeros', args: [[0,0,0]], expected: [0,0,0] },
  ],
}
