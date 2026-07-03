export default {
  id: 'target-sum',
  title: 'Target Sum',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and integer <code>target</code>, you can assign + or - to each number. Return the number of ways to assign signs to reach the target sum.',
  examples: [
    { input: 'nums=[1,1,1,1,1], target=3', output: '5', explanation: 'There are 5 ways to assign + and - to get sum 3.' },
    { input: 'nums=[1], target=1', output: '1' },
  ],
  constraints: ['1 ≤ nums.length ≤ 20', '0 ≤ nums[i] ≤ 1000', '0 ≤ sum(nums[i]) ≤ 1000', '-1000 ≤ target ≤ 1000'],
  starterCode: `def find_target_sum_ways(nums, target):
  pass`,
  functionName: 'find_target_sum_ways',
  conceptId: 'dp-2d',
  testCases: [
    { label: '5 ways', args: [[1,1,1,1,1],3], expected: 5 },
    { label: '1 way', args: [[1],1], expected: 1 },
    { label: 'No way', args: [[1],2], expected: 0 },
  ],
}
