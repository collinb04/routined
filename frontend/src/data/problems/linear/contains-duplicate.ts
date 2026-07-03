export default {
  id: 'contains-duplicate',
  title: 'Contains Duplicate',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code>, return <code>true</code> if any value appears at least twice, and <code>false</code> if every element is distinct.',
  examples: [
    { input: 'nums = [1, 2, 3, 1]', output: 'true', explanation: '1 appears at index 0 and 3.' },
    { input: 'nums = [1, 2, 3, 4]', output: 'false', explanation: 'All elements are distinct.' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10⁵',
    '-10⁹ ≤ nums[i] ≤ 10⁹',
  ],
  starterCode: `def contains_duplicate(nums):
  pass`,
  functionName: 'contains_duplicate',
  conceptId: 'arrays',
  testCases: [
    { label: 'Has duplicate', args: [[1, 2, 3, 1]], expected: true },
    { label: 'All unique', args: [[1, 2, 3, 4]], expected: false },
    { label: 'Single element', args: [[1]], expected: false },
    { label: 'Multiple duplicates', args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
  ],
}
