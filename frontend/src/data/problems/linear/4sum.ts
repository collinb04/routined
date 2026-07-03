export default {
  id: '4sum',
  title: '4Sum',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and integer <code>target</code>, return all unique quadruplets <code>[nums[a], nums[b], nums[c], nums[d]]</code> that sum to <code>target</code>.',
  examples: [
    { input: 'nums=[1,0,-1,0,-2,2], target=0', output: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]' },
    { input: 'nums=[2,2,2,2,2], target=8', output: '[[2,2,2,2]]' },
  ],
  constraints: ['1 ≤ nums.length ≤ 200', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹'],
  starterCode: `def four_sum(nums, target):
  pass`,
  functionName: 'four_sum',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'Three quadruplets', args: [[1,0,-1,0,-2,2],0], expected: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]] },
    { label: 'All same', args: [[2,2,2,2,2],8], expected: [[2,2,2,2]] },
    { label: 'No solution', args: [[1,2,3,4],100], expected: [] },
  ],
}
