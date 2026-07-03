export default {
  id: 'missing-number',
  title: 'Missing Number',
  difficulty: 'easy',
  description: 'Given an array <code>nums</code> containing <code>n</code> distinct numbers in the range <code>[0, n]</code>, return the only number in the range that is missing.',
  examples: [
    { input: 'nums = [3,0,1]', output: '2', explanation: '2 is missing from the range [0,3].' },
    { input: 'nums = [0,1]', output: '2', explanation: '2 is missing from [0,2].' },
  ],
  constraints: ['n = nums.length', '0 ≤ nums[i] ≤ n', 'All numbers are distinct'],
  starterCode: `def missing_number(nums):
  pass`,
  functionName: 'missing_number',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: 'Missing 2', args: [[3,0,1]], expected: 2 },
    { label: 'Missing at end', args: [[0,1]], expected: 2 },
    { label: 'Single element 0', args: [[0]], expected: 1 },
    { label: 'Missing first', args: [[1,2,3]], expected: 0 },
  ],
}
