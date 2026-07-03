export default {
  id: 'merge-sorted-array',
  title: 'Merge Sorted Array',
  difficulty: 'easy',
  description: 'Given two sorted integer arrays <code>nums1</code> and <code>nums2</code>, merge them in-place into <code>nums1</code> in sorted order. <code>nums1</code> has length <code>m + n</code>, with the last <code>n</code> slots reserved for merging.',
  examples: [
    { input: 'nums1=[1,2,3,0,0,0], m=3, nums2=[2,5,6], n=3', output: '[1,2,2,3,5,6]' },
    { input: 'nums1=[1], m=1, nums2=[], n=0', output: '[1]' },
  ],
  constraints: ['0 ≤ m, n ≤ 200', '1 ≤ m + n', '-10⁹ ≤ nums1[i], nums2[j] ≤ 10⁹'],
  starterCode: `def merge(nums1, m, nums2, n):
  pass`,
  functionName: 'merge',
  conceptId: 'sorting',
  testCases: [
    { label: 'Standard merge', args: [[1,2,3,0,0,0],3,[2,5,6],3], expected: [1,2,2,3,5,6] },
    { label: 'Empty second', args: [[1],1,[],0], expected: [1] },
    { label: 'Empty first', args: [[0],0,[1],1], expected: [1] },
  ],
}
