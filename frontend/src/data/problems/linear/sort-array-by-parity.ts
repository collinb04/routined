export default {
  id: 'sort-array-by-parity',
  title: 'Sort Array By Parity',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code>, move all even integers to the beginning followed by all odd integers. Return any valid arrangement.',
  examples: [
    { input: 'nums = [3,1,2,4]', output: '[2,4,3,1]', explanation: 'Even numbers first, then odd. Multiple valid answers exist.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 5000', '0 ≤ nums[i] ≤ 5000'],
  starterCode: `def sort_array_by_parity(nums):
  pass`,
  functionName: 'sort_array_by_parity',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'Evens first check', args: [[3,1,2,4]], expected: null },
    { label: 'All even', args: [[2,4,6]], expected: [2,4,6] },
    { label: 'All odd', args: [[1,3,5]], expected: [1,3,5] },
  ],
}
