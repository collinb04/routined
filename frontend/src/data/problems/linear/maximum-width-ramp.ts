export default {
  id: 'maximum-width-ramp',
  title: 'Maximum Width Ramp',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code>, a ramp is a pair (i, j) with i < j and nums[i] ≤ nums[j]. Return the maximum width j − i of any ramp, or 0 if no ramp exists.',
  examples: [
    { input: 'nums = [6,0,8,2,1,5]', output: '4', explanation: 'Ramp (1, 5): nums[1]=0 ≤ nums[5]=5, width = 4.' },
    { input: 'nums = [9,8,1,0,1,9,4,0,4,1]', output: '7' },
  ],
  constraints: ['2 ≤ nums.length ≤ 5 × 10⁴', '0 ≤ nums[i] ≤ 5 × 10⁴'],
  starterCode: `def max_width_ramp(nums):
  pass`,
  functionName: 'max_width_ramp',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Width 4', args: [[6,0,8,2,1,5]], expected: 4 },
    { label: 'Width 7', args: [[9,8,1,0,1,9,4,0,4,1]], expected: 7 },
    { label: 'Descending', args: [[3,2,1]], expected: 0 },
    { label: 'Single ramp', args: [[1,2]], expected: 1 },
  ],
}
