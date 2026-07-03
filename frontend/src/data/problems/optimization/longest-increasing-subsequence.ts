export default {
  id: 'longest-increasing-subsequence',
  title: 'Longest Increasing Subsequence',
  difficulty: 'medium',
  description: `<p>Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.</p>`,
  examples: [
    { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4 ([2,3,7,101])' },
    { input: 'nums = [0,1,0,3,2,3]', output: '4' },
  ],
  constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
  starterCode: `def length_of_lis(nums):
  pass`,
  functionName: 'length_of_lis',
  conceptId: 'dp-1d',
  testCases: [
    { label: '[10,9,2,5,3,7,101,18]', args: [[10,9,2,5,3,7,101,18]], expected: 4 },
    { label: '[0,1,0,3,2,3]', args: [[0,1,0,3,2,3]], expected: 4 },
    { label: '[7,7,7,7]', args: [[7,7,7,7]], expected: 1 },
  ],
}
