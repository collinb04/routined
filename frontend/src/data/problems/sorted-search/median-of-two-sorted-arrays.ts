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
  clues: [
    {
      id: 'time-constraint',
      question: '"O(log(m+n)) time." m + n ≤ 2000. What does this requirement rule out?',
      options: [
        { label: 'Merging both arrays, then taking the middle element', isCorrect: true },
        { label: 'Any use of binary search', isCorrect: false, feedback: 'Binary search is exactly the tool the O(log(m+n)) requirement is pointing at. The constraint rules out O(m+n) linear work, not O(log) work.' },
        { label: 'Accessing elements by index', isCorrect: false, feedback: 'Index access is O(1) and is used in binary search. The constraint limits how many elements you visit across both arrays, not how you access them.' },
        { label: 'Nothing — O(m+n) is fine since m+n ≤ 2000', isCorrect: false, feedback: 'The problem explicitly requires O(log(m+n)). Even though 2000 is small and a merge would pass in practice, the problem is testing whether you can binary search across two sorted arrays.' },
      ],
      correctFeedback: 'Merging takes O(m+n) time — linear in the combined size. O(log(m+n)) requires eliminating roughly half the remaining elements per step, pointing to binary search on one of the arrays.',
      wrongFeedback: [
        'Merging both arrays visits every element — how many is that, and what complexity class is it?',
        'A merge is O(m+n). O(log(m+n)) is exponentially faster. What algorithm eliminates half the candidates per step?',
      ],
    },
    {
      id: 'median-definition',
      question: 'The median of a combined array of total length L is the middle value. When L is even, it\'s the average of the two middle values. What does this mean for your algorithm?',
      options: [
        { label: 'Return the middle element of nums1 or nums2, whichever is longer', isCorrect: false, feedback: 'The median is over the combined sorted array, not either individual array. The middle of nums1 alone is unrelated to the median of the merged sequence.' },
        { label: 'Find the (L//2)-th and (L//2 + 1)-th smallest elements across both arrays', isCorrect: true },
        { label: 'Sort both arrays together, then take the middle', isCorrect: false, feedback: 'Concatenating and sorting takes O((m+n) log(m+n)) — worse than the O(m+n) merge, and far worse than the required O(log(m+n)).' },
        { label: 'Average the medians of nums1 and nums2 separately', isCorrect: false, feedback: 'The median of each array separately is not the median of their union. Consider nums1=[1,10] and nums2=[2,3]: median of nums1 is 5.5, median of nums2 is 2.5, average is 4. But merged median is 2.5.' },
      ],
      correctFeedback: 'For even total length L, you need the (L/2)-th and (L/2 + 1)-th elements (1-indexed). For odd L, just the (L+1)/2-th. The binary search partitions both arrays so exactly half the combined elements fall on each side.',
      wrongFeedback: [
        'For L = 4, the median is the average of elements 2 and 3 in the combined sorted order. How does your algorithm identify those two positions across two separate arrays?',
        'You need to find a partition point across both arrays where exactly L//2 elements are on the left side. Binary search on the shorter array to find that partition.',
      ],
    },
    {
      id: 'partition-approach',
      question: 'The O(log(m+n)) solution binary searches on one array to find the right partition. What invariant must hold at a valid partition?',
      options: [
        { label: 'The partition index in nums1 equals the partition index in nums2', isCorrect: false, feedback: 'The two partition indices are complementary, not equal. If nums1 contributes i elements to the left half, nums2 contributes (m+n)//2 − i elements. They add up to the half-size, but aren\'t individually equal.' },
        { label: 'max(left halves) ≤ min(right halves) across both arrays', isCorrect: true },
        { label: 'The last element of nums1\'s left portion equals the first element of nums2\'s right portion', isCorrect: false, feedback: 'Elements from both arrays contribute to both halves — they don\'t need to align at the same value. The invariant is that all left-half elements ≤ all right-half elements, checked at the two boundary crossings.' },
        { label: 'Both partition indices are at the midpoint of their respective arrays', isCorrect: false, feedback: 'Only one partition index is free — the other is determined by total half-size. And the correct partition index in nums1 is rarely at its midpoint; it depends on the relative values in both arrays.' },
      ],
      correctFeedback: 'A valid partition satisfies: nums1[i-1] ≤ nums2[j] AND nums2[j-1] ≤ nums1[i], where i + j = (m+n+1)//2. This ensures everything on the left is ≤ everything on the right. Binary search adjusts i until this holds.',
      wrongFeedback: [
        'You\'re splitting both arrays so the combined left half is all ≤ the combined right half. What two cross-array comparisons verify that boundary is correct?',
        'Check: the last element of nums1\'s left portion ≤ first element of nums2\'s right portion, AND the last element of nums2\'s left portion ≤ first element of nums1\'s right portion. Both must hold.',
      ],
    },
    {
      id: 'binary-search-on-shorter',
      question: 'The algorithm binary searches on the shorter array. Why shorter, not longer?',
      options: [
        { label: 'Shorter arrays have smaller elements on average', isCorrect: false, feedback: 'Array length doesn\'t imply anything about element values. The reason to search the shorter array is purely about the number of steps, not element magnitude.' },
        { label: 'Binary search on the shorter array guarantees O(log(min(m,n))) steps', isCorrect: true },
        { label: 'The longer array\'s median is a better starting guess', isCorrect: false, feedback: 'You\'re not guessing a median — you\'re binary searching for a partition index. The shorter array is chosen because it bounds the number of search steps to O(log(min(m,n))).' },
        { label: 'The shorter array is guaranteed to be sorted', isCorrect: false, feedback: 'Both arrays are sorted — that\'s given in the problem. The choice of shorter array is about minimizing the search range, not about sortedness.' },
      ],
      correctFeedback: 'Binary searching over the shorter array (size min(m,n)) takes O(log(min(m,n))) steps. Since min(m,n) ≤ (m+n)/2, this is within O(log(m+n)). Searching the longer array would still be correct but wastes steps.',
      wrongFeedback: [
        'If you binary search on the array of length m, you take O(log m) steps. If you search the array of length n, O(log n) steps. Which is fewer when m < n?',
        'O(log(min(m,n))) ≤ O(log(m+n)). Searching the shorter array minimizes the search range and bounds complexity to what the problem requires.',
      ],
    },
  ],
}
