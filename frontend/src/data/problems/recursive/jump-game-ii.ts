export default {
  id: 'jump-game-ii',
  title: 'Jump Game II',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> where <code>nums[i]</code> is the maximum jump length from index <code>i</code>, return the minimum number of jumps to reach the last index. The answer is always reachable.',
  examples: [
    { input: 'nums = [2,3,1,1,4]', output: '2', explanation: 'Jump 1 to index 1, then 3 jumps to end. Minimum 2 jumps.' },
    { input: 'nums = [2,3,0,1,4]', output: '2' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '0 ≤ nums[i] ≤ 1000', 'Answer is always reachable'],
  starterCode: `def jump(nums):
  pass`,
  functionName: 'jump',
  conceptId: 'greedy',
  testCases: [
    { label: 'Two jumps', args: [[2,3,1,1,4]], expected: 2 },
    { label: 'Two jumps v2', args: [[2,3,0,1,4]], expected: 2 },
    { label: 'Single', args: [[0]], expected: 0 },
    { label: 'Three jumps', args: [[1,1,1,1]], expected: 3 },
  ],
}
