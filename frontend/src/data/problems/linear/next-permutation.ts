export default {
  id: 'next-permutation',
  title: 'Next Permutation',
  difficulty: 'medium',
  description: 'Given an array of integers, rearrange the numbers into the next lexicographically greater permutation. If no such permutation exists, rearrange to the smallest (ascending) order. Modify in-place.',
  examples: [
    { input: 'nums = [1,2,3]', output: '[1,3,2]', explanation: 'Next permutation is [1,3,2].' },
    { input: 'nums = [3,2,1]', output: '[1,2,3]', explanation: 'Largest permutation; wrap to smallest.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 100', '0 ≤ nums[i] ≤ 100'],
  starterCode: `def next_permutation(nums):
  pass
  return nums`,
  functionName: 'next_permutation',
  conceptId: 'arrays',
  testCases: [
    { label: '[1,2,3]', args: [[1,2,3]], expected: [1,3,2] },
    { label: '[3,2,1]', args: [[3,2,1]], expected: [1,2,3] },
    { label: '[1,1,5]', args: [[1,1,5]], expected: [1,5,1] },
    { label: 'Single', args: [[1]], expected: [1] },
  ],
}
