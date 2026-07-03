export default {
  id: 'k-pairs-smallest-sums',
  title: 'Find K Pairs with Smallest Sums',
  difficulty: 'medium',
  description: 'Given two integer arrays sorted in ascending order, find the <code>k</code> pairs <code>(u, v)</code> (one from each array) with the smallest sums.',
  examples: [
    { input: 'nums1=[1,7,11], nums2=[2,4,6], k=3', output: '[[1,2],[1,4],[1,6]]' },
    { input: 'nums1=[1,1,2], nums2=[1,2,3], k=2', output: '[[1,1],[1,1]]' },
  ],
  constraints: ['1 ≤ nums1.length, nums2.length ≤ 10⁵', '-10⁹ ≤ nums1[i], nums2[j] ≤ 10⁹', '1 ≤ k ≤ 10⁴'],
  starterCode: `def k_smallest_pairs(nums1, nums2, k):
  pass`,
  functionName: 'k_smallest_pairs',
  conceptId: 'heap',
  testCases: [
    { label: 'Three pairs', args: [[1,7,11],[2,4,6],3], expected: [[1,2],[1,4],[1,6]] },
    { label: 'Duplicate values', args: [[1,1,2],[1,2,3],2], expected: [[1,1],[1,1]] },
  ],
}
