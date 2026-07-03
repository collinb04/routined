export default {
  id: '3sum',
  title: '3Sum',
  difficulty: 'medium',
  description: `<p>Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p><p>The solution set must not contain duplicate triplets.</p>`,
  examples: [
    { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
    { input: 'nums = [0,1,1]', output: '[]' },
  ],
  constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
  starterCode: `def three_sum(nums):
  pass`,
  functionName: 'three_sum_run',
  conceptId: 'two-pointers',
  runnerSetup: `def three_sum_run(nums):
  result = three_sum(nums)
  return sorted([sorted(t) for t in result])`,
  testCases: [
    { label: '[-1,0,1,2,-1,-4]', args: [[-1,0,1,2,-1,-4]], expected: [[-1,-1,2],[-1,0,1]] },
    { label: '[0,1,1]', args: [[0,1,1]], expected: [] },
    { label: '[0,0,0]', args: [[0,0,0]], expected: [[0,0,0]] },
  ],
}
