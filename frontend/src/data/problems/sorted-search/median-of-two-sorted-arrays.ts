export default {
  id: 'median-of-two-sorted-arrays',
  title: 'Median of Two Sorted Arrays',
  difficulty: 'hard',
  description: `<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).</p>`,
  examples: [
    { input: 'nums1 = [1,3], nums2 = [2]', output: '2.0' },
    { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.5' },
  ],
  constraints: ['0 <= m, n <= 1000', '1 <= m + n <= 2000', '-10^6 <= nums1[i], nums2[i] <= 10^6'],
  starterCode: `def find_median_sorted_arrays(nums1, nums2):
  pass`,
  functionName: 'find_median_sorted_arrays',
  conceptId: 'binary-search',
  testCases: [
    { label: '[1,3],[2]', args: [[1,3], [2]], expected: 2.0 },
    { label: '[1,2],[3,4]', args: [[1,2], [3,4]], expected: 2.5 },
  ],
}
