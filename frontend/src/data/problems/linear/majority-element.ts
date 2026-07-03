export default {
  id: 'majority-element',
  title: 'Majority Element',
  difficulty: 'easy',
  description: 'Given an array of size n, find the majority element — the element that appears more than ⌊n/2⌋ times. The majority element always exists. Try O(1) space (Boyer-Moore voting).',
  examples: [
    { input: 'nums = [3,2,3]', output: '3' },
    { input: 'nums = [2,2,1,1,1,2,2]', output: '2' },
  ],
  constraints: ['n == nums.length', '1 ≤ n ≤ 5 × 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹'],
  starterCode: `def majority_element(nums):
  pass`,
  functionName: 'majority_element',
  conceptId: 'arrays',
  testCases: [
    { label: '3 is majority', args: [[3,2,3]], expected: 3 },
    { label: '2 is majority', args: [[2,2,1,1,1,2,2]], expected: 2 },
    { label: 'Single', args: [[1]], expected: 1 },
  ],
}
