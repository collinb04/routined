export default {
  id: 'longest-consecutive-sequence',
  title: 'Longest Consecutive Sequence',
  difficulty: 'medium',
  description: `<p>Given an unsorted array of integers <code>nums</code>, return the length of the longest consecutive elements sequence.</p><p>You must write an algorithm that runs in O(n) time.</p>`,
  examples: [
    { input: 'nums = [100,4,200,1,3,2]', output: '4 (sequence: 1,2,3,4)' },
    { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' },
  ],
  constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
  starterCode: `def longest_consecutive(nums):
  pass`,
  functionName: 'longest_consecutive',
  conceptId: 'arrays',
  testCases: [
    { label: '[100,4,200,1,3,2]', args: [[100,4,200,1,3,2]], expected: 4 },
    { label: '[0,3,7,2,5,8,4,6,0,1]', args: [[0,3,7,2,5,8,4,6,0,1]], expected: 9 },
    { label: 'empty', args: [[]], expected: 0 },
  ],
}
