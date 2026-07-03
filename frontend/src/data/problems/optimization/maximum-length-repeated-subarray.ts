export default {
  id: 'maximum-length-repeated-subarray',
  title: 'Maximum Length of Repeated Subarray',
  difficulty: 'medium',
  description: 'Given two integer arrays, return the maximum length of a subarray that appears in both arrays. (Contiguous subarrays, not subsequences.)',
  examples: [
    { input: 'nums1=[1,2,3,2,1], nums2=[3,2,1,4,7]', output: '3', explanation: '[3,2,1] is the longest common subarray of length 3.' },
    { input: 'nums1=[0,0,0,0,0], nums2=[0,0,0,0,0]', output: '5' },
  ],
  constraints: ['1 ≤ nums1.length, nums2.length ≤ 1000', '0 ≤ nums1[i], nums2[i] ≤ 100'],
  starterCode: `def find_length(nums1, nums2):
  pass`,
  functionName: 'find_length',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Length 3', args: [[1,2,3,2,1],[3,2,1,4,7]], expected: 3 },
    { label: 'All same', args: [[0,0,0,0,0],[0,0,0,0,0]], expected: 5 },
    { label: 'No overlap', args: [[1,2],[3,4]], expected: 0 },
  ],
}
