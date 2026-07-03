export default {
  id: 'first-missing-positive',
  title: 'First Missing Positive',
  difficulty: 'hard',
  description: 'Given an unsorted integer array, return the smallest missing positive integer. Your algorithm must run in O(n) time and use O(1) auxiliary space.',
  examples: [
    { input: 'nums = [1,2,0]', output: '3' },
    { input: 'nums = [3,4,-1,1]', output: '2' },
    { input: 'nums = [7,8,9,11,12]', output: '1' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1'],
  starterCode: `def first_missing_positive(nums):
  pass`,
  functionName: 'first_missing_positive',
  conceptId: 'arrays',
  testCases: [
    { label: 'Missing 3', args: [[1,2,0]], expected: 3 },
    { label: 'Missing 2', args: [[3,4,-1,1]], expected: 2 },
    { label: 'Missing 1', args: [[7,8,9,11,12]], expected: 1 },
    { label: 'Sequential', args: [[1,2,3]], expected: 4 },
  ],
}
