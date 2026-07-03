export default {
  id: 'jump-game',
  title: 'Jump Game',
  difficulty: 'medium',
  description: 'You are given an integer array <code>nums</code> where <code>nums[i]</code> is the maximum jump length from position <code>i</code>. Return <code>true</code> if you can reach the last index starting from index 0.',
  examples: [
    { input: 'nums = [2,3,1,1,4]', output: 'true', explanation: 'Jump 1 to index 1, then 3 to reach the end.' },
    { input: 'nums = [3,2,1,0,4]', output: 'false', explanation: 'You always reach index 3 with value 0.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '0 ≤ nums[i] ≤ 10⁵'],
  starterCode: `def can_jump(nums):
  pass`,
  functionName: 'can_jump',
  conceptId: 'greedy',
  testCases: [
    { label: 'Can reach', args: [[2,3,1,1,4]], expected: true },
    { label: 'Cannot reach', args: [[3,2,1,0,4]], expected: false },
    { label: 'Single element', args: [[0]], expected: true },
    { label: 'All zeros except first', args: [[2,0,0]], expected: true },
  ],
}
