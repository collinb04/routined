export default {
  id: 'largest-number',
  title: 'Largest Number',
  difficulty: 'medium',
  description: 'Given a list of non-negative integers, arrange them such that they form the largest number and return it as a string.',
  examples: [
    { input: 'nums = [10,2]', output: '"210"', explanation: '"210" > "102".' },
    { input: 'nums = [3,30,34,5,9]', output: '"9534330"' },
  ],
  constraints: ['1 ≤ nums.length ≤ 100', '0 ≤ nums[i] ≤ 10⁹'],
  starterCode: `def largest_number(nums):
  pass`,
  functionName: 'largest_number',
  conceptId: 'sorting',
  testCases: [
    { label: '[10,2]', args: [[10,2]], expected: '210' },
    { label: '[3,30,34,5,9]', args: [[3,30,34,5,9]], expected: '9534330' },
    { label: 'All zeros', args: [[0,0]], expected: '0' },
    { label: 'Single', args: [[5]], expected: '5' },
  ],
}
