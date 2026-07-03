export default {
  id: 'subsets-ii',
  title: 'Subsets II',
  difficulty: 'medium',
  description: `<p>Given an integer array <code>nums</code> that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.</p>`,
  examples: [
    { input: 'nums = [1,2,2]', output: '[[],[1],[1,2],[1,2,2],[2],[2,2]]' },
    { input: 'nums = [0]', output: '[[],[0]]' },
  ],
  constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10'],
  starterCode: `def subsets_with_dup(nums):
  pass`,
  functionName: 'subsets_with_dup_run',
  conceptId: 'backtracking',
  runnerSetup: `def subsets_with_dup_run(nums):
  result = subsets_with_dup(nums)
  return sorted([sorted(s) for s in result])`,
  testCases: [
    { label: '[1,2,2]', args: [[1,2,2]], expected: [[],[1],[1,2],[1,2,2],[2],[2,2]] },
    { label: '[0]', args: [[0]], expected: [[],[0]] },
  ],
}
