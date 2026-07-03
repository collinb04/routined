export default {
  id: 'find-min-rotated-sorted-array-ii',
  title: 'Find Minimum in Rotated Sorted Array II',
  difficulty: 'hard',
  description: 'Given a rotated sorted array that may contain duplicates, find the minimum element. This is the harder follow-up to "Find Minimum in Rotated Sorted Array."',
  examples: [
    { input: 'nums = [1,3,5]', output: '1' },
    { input: 'nums = [2,2,2,0,1]', output: '0' },
  ],
  constraints: ['n == nums.length', '1 ≤ n ≤ 5000', '-5000 ≤ nums[i] ≤ 5000', 'nums is sorted and possibly rotated, may contain duplicates'],
  starterCode: `def find_min(nums):
  pass`,
  functionName: 'find_min',
  conceptId: 'binary-search',
  testCases: [
    { label: 'No rotation', args: [[1,3,5]], expected: 1 },
    { label: 'With duplicates', args: [[2,2,2,0,1]], expected: 0 },
    { label: 'All same', args: [[1,1,1]], expected: 1 },
    { label: 'Single', args: [[3]], expected: 3 },
  ],
}
