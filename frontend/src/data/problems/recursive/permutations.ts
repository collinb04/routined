export default {
  id: 'permutations',
  title: 'Permutations',
  difficulty: 'medium',
  description: `<p>Given an array <code>nums</code> of distinct integers, return all the possible permutations. You can return the answer in any order.</p>`,
  examples: [
    { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
    { input: 'nums = [0,1]', output: '[[0,1],[1,0]]' },
  ],
  constraints: ['1 <= nums.length <= 6', 'All integers are unique'],
  starterCode: `def permute(nums):
  pass`,
  functionName: 'permute_run',
  conceptId: 'backtracking',
  runnerSetup: `def permute_run(nums):
  return sorted(permute(nums))`,
  testCases: [
    { label: '[1,2,3]', args: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
    { label: '[0,1]', args: [[0,1]], expected: [[0,1],[1,0]] },
  ],
}
