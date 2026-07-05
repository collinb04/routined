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
  clues: [
    {
      id: 'in-place-constraint',
      question: 'The result must be written into <code>nums1</code> in-place. What does this rule out?',
      options: [
        { label: 'Returning a new merged array', isCorrect: true },
        { label: 'Using two pointers', isCorrect: false, feedback: 'Two pointers are exactly the right tool here — they let you compare elements from both arrays without allocating extra space.' },
        { label: 'Reading from nums2', isCorrect: false, feedback: 'In-place means you write back to nums1, not that you avoid reading other inputs. You still need to read nums2 to merge.' },
        { label: 'Comparing elements from both arrays', isCorrect: false },
      ],
      correctFeedback: 'In-place means the output lives in nums1 — you cannot allocate and return a separate list. Every merged element must land in nums1\'s existing slots.',
      wrongFeedback: [
        'nums1 already has m + n slots. What does "in-place" mean for how you return the result?',
        'In-place is a constraint on output allocation. What is the only thing it prevents?',
      ],
    },
    {
      id: 'trailing-zeros-signal',
      question: 'nums1 has length m + n with the last n slots set to 0. What does this tell you about where to start writing?',
      options: [
        { label: 'Fill from the front, shifting right', isCorrect: false, feedback: 'Filling from the front means overwriting valid elements in nums1 before you\'ve compared them. You\'d lose data.' },
        { label: 'Sort both arrays together first', isCorrect: false, feedback: 'Both arrays are already sorted. Sorting again throws away the structure you were given for free.' },
        { label: 'Fill from the back using the empty slots', isCorrect: true },
        { label: 'Append nums2 then sort', isCorrect: false, feedback: 'Appending then sorting costs O((m+n) log(m+n)) and ignores that both arrays are already sorted. The reserved slots hint at something cheaper.' },
      ],
      correctFeedback: 'The n trailing zeros are your write buffer. Filling from the back means you always write into a slot that hasn\'t been read yet, so you never clobber live data.',
      wrongFeedback: [
        'The zeros at the end of nums1 are reserved space. If you write from the back instead of the front, what problem disappears?',
        'Filling from back to front means the write pointer never catches up to the read pointer. Which direction avoids overwriting elements you still need?',
      ],
    },
    {
      id: 'both-sorted-guarantee',
      question: 'Both nums1 and nums2 are already sorted. What complexity does this guarantee enable?',
      options: [
        { label: 'O(n log n) with a heap', isCorrect: false, feedback: 'A heap merge works for k unsorted lists, but here both arrays are fully sorted. You can do better than O(n log n) by exploiting the existing order directly.' },
        { label: 'O(m + n) with a linear merge', isCorrect: true },
        { label: 'O(m × n) element-by-element', isCorrect: false },
        { label: 'O(log(m + n)) with binary search', isCorrect: false, feedback: 'Binary search finds an element in a sorted array but doesn\'t merge two of them. You still have to place all m + n elements somewhere.' },
      ],
      correctFeedback: 'Two sorted arrays can be merged in a single O(m + n) pass — one pointer per array, always advancing the side with the larger current element.',
      wrongFeedback: [
        'Each array is already in order. How many passes do you need if you just walk both simultaneously and always pick the larger remaining element?',
        'With two sorted arrays and one pointer each, you visit each element exactly once. What does that make the time complexity?',
      ],
    },
  ],
}
