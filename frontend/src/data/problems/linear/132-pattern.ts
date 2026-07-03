export default {
  id: '132-pattern',
  title: '132 Pattern',
  difficulty: 'medium',
  description: 'Given an array of integers, return <code>true</code> if there exist indices i, j, k such that i < j < k and <code>nums[i] < nums[k] < nums[j]</code> (a "132 pattern").',
  examples: [
    { input: 'nums = [1,2,3,4]', output: 'false', explanation: 'No 132 pattern exists.' },
    { input: 'nums = [3,1,4,2]', output: 'true', explanation: '1 < 2 < 4 at indices 1, 3, 2.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 2 × 10⁵', '-10⁹ ≤ nums[i] ≤ 10⁹'],
  starterCode: `def find132pattern(nums):
  pass`,
  functionName: 'find132pattern',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'No pattern', args: [[1,2,3,4]], expected: false },
    { label: 'Has pattern', args: [[3,1,4,2]], expected: true },
    { label: 'Has pattern v2', args: [[-1,3,2,0]], expected: true },
    { label: 'All same', args: [[1,1,1]], expected: false },
  ],
}
