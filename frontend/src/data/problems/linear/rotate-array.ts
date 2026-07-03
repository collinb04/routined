export default {
  id: 'rotate-array',
  title: 'Rotate Array',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code>, rotate the array to the right by <code>k</code> steps in-place.',
  examples: [
    { input: 'nums=[1,2,3,4,5,6,7], k=3', output: '[5,6,7,1,2,3,4]', explanation: 'Rotate right 3 times.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1', '0 ≤ k ≤ 10⁵'],
  starterCode: `def rotate(nums, k):
  pass
  return nums`,
  functionName: 'rotate',
  conceptId: 'arrays',
  testCases: [
    { label: 'Rotate 3', args: [[1,2,3,4,5,6,7],3], expected: [5,6,7,1,2,3,4] },
    { label: 'Rotate by length', args: [[1,2],2], expected: [1,2] },
    { label: 'Rotate 1', args: [[1,2,3],1], expected: [3,1,2] },
  ],
}
