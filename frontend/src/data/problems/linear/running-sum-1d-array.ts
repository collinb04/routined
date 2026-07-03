export default {
  id: 'running-sum-1d-array',
  title: 'Running Sum of 1d Array',
  difficulty: 'easy',
  description: 'Given an array <code>nums</code>, return the running sum array where <code>runningSum[i] = sum(nums[0]...nums[i])</code>.',
  examples: [
    { input: 'nums = [1,2,3,4]', output: '[1,3,6,10]' },
    { input: 'nums = [1,1,1,1,1]', output: '[1,2,3,4,5]' },
  ],
  constraints: ['1 ≤ nums.length ≤ 1000', '-10⁶ ≤ nums[i] ≤ 10⁶'],
  starterCode: `def running_sum(nums):
  pass`,
  functionName: 'running_sum',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Increasing', args: [[1,2,3,4]], expected: [1,3,6,10] },
    { label: 'All ones', args: [[1,1,1,1,1]], expected: [1,2,3,4,5] },
    { label: 'With negatives', args: [[3,-2,5]], expected: [3,1,6] },
  ],
}
