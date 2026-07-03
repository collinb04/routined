export default {
  id: 'search-rotated-sorted-array-ii',
  title: 'Search in Rotated Sorted Array II',
  difficulty: 'medium',
  description: 'Given a rotated sorted array that may contain duplicates, return <code>true</code> if the target is in the array, <code>false</code> otherwise.',
  examples: [
    { input: 'nums=[2,5,6,0,0,1,2], target=0', output: 'true' },
    { input: 'nums=[2,5,6,0,0,1,2], target=3', output: 'false' },
  ],
  constraints: ['1 ≤ nums.length ≤ 5000', '-10⁴ ≤ nums[i], target ≤ 10⁴'],
  starterCode: `def search(nums, target):
  pass`,
  functionName: 'search',
  conceptId: 'binary-search',
  testCases: [
    { label: 'Found', args: [[2,5,6,0,0,1,2],0], expected: true },
    { label: 'Not found', args: [[2,5,6,0,0,1,2],3], expected: false },
    { label: 'Single', args: [[1],0], expected: false },
    { label: 'All same', args: [[1,1,1,1],1], expected: true },
  ],
}
