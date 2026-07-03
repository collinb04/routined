export default {
  id: 'single-number',
  title: 'Single Number',
  difficulty: 'easy',
  description: 'Given a non-empty array of integers where every element appears twice except for one, find that single element. Your algorithm must run in O(n) time and O(1) extra space.',
  examples: [
    { input: 'nums = [2,2,1]', output: '1', explanation: '1 appears only once.' },
    { input: 'nums = [4,1,2,1,2]', output: '4', explanation: '4 is the only non-duplicate.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 3 × 10⁴', 'Each element appears exactly twice except one', '-3 × 10⁴ ≤ nums[i] ≤ 3 × 10⁴'],
  starterCode: `def single_number(nums):
  pass`,
  functionName: 'single_number',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: 'Three elements', args: [[2,2,1]], expected: 1 },
    { label: 'Five elements', args: [[4,1,2,1,2]], expected: 4 },
    { label: 'Single element', args: [[1]], expected: 1 },
    { label: 'Larger array', args: [[1,3,1,2,3]], expected: 2 },
  ],
}
