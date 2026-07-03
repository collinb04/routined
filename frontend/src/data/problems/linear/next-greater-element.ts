export default {
  id: 'next-greater-element',
  title: 'Next Greater Element I',
  difficulty: 'easy',
  description: 'Given two arrays <code>nums1</code> and <code>nums2</code> (no duplicates), for each element in <code>nums1</code> find its <strong>next greater element</strong> in <code>nums2</code> — the first element to its right that is larger. Return <code>-1</code> if none exists.',
  examples: [
    { input: 'nums1 = [4, 1, 2], nums2 = [1, 3, 4, 2]', output: '[-1, 3, -1]', explanation: '4 has no greater element. 1\'s next greater in nums2 is 3. 2 has no greater element.' },
    { input: 'nums1 = [2, 4], nums2 = [1, 2, 3, 4]', output: '[3, -1]' },
  ],
  constraints: [
    '1 ≤ nums1.length ≤ nums2.length ≤ 1000',
    'All integers in nums1 and nums2 are unique',
    'All elements of nums1 appear in nums2',
  ],
  starterCode: `def next_greater_element(nums1, nums2):
  pass`,
  functionName: 'next_greater_element',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Basic', args: [[4, 1, 2], [1, 3, 4, 2]], expected: [-1, 3, -1] },
    { label: 'Ascending', args: [[2, 4], [1, 2, 3, 4]], expected: [3, -1] },
    { label: 'All descending', args: [[1, 3, 5], [5, 4, 3, 2, 1]], expected: [-1, -1, -1] },
    { label: 'Single element', args: [[1], [1, 2]], expected: [2] },
  ],
}
