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
  starterCode: `class Solution:
    def merge(self, nums1, m, nums2, n):
        pass`,
  runnerSetup: 'merge = Solution().merge',
  functionName: 'merge',
  conceptId: 'sorting',
  testCases: [
    { label: 'Standard merge', args: [[1,2,3,0,0,0],3,[2,5,6],3], expected: [1,2,2,3,5,6] },
    { label: 'Empty second', args: [[1],1,[],0], expected: [1] },
    { label: 'Empty first', args: [[0],0,[1],1], expected: [1] },
  ],
  bruteHint: 'The simplest correct approach copies nums1\'s first m real elements and all of nums2 into a fresh list, then sorts that combined list from scratch. Since neither array\'s existing order is reused, this costs O((m+n) log(m+n)) time and O(m+n) extra space for the temporary list. Both arrays are already individually sorted — what changes if you merge them the way you\'d merge two sorted piles of cards, comparing fronts, instead of resorting everything?',
  optimizeComplexity: { time: 'O(n + m)', space: 'O(1)' },
  clues: [
    {
      id: 'in-place-constraint',
      question: 'In-place requirements constrain how much extra memory and output allocation your solution is allowed to use. The result must be written into <code>nums1</code> in-place. What does this rule out?',
      highlight: { location: 'description', text: 'merge them in-place into <code>nums1</code> in sorted order' },
      options: [
        { label: 'Returning a new merged array', isCorrect: true },
        { label: 'Tracking a read position in each array while comparing elements', isCorrect: false, feedback: 'Two pointers are exactly the right tool here — they let you compare elements from both arrays without allocating extra space.' },
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
      question: 'The way input space is pre-allocated often hints at the direction your algorithm should work in. nums1 has length m + n with the last n slots set to 0. What does this tell you about where to start writing?',
      highlight: { location: 'description', text: '<code>nums1</code> has length <code>m + n</code>, with the last <code>n</code> slots reserved for merging.' },
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
      question: 'A guarantee that inputs are already sorted usually unlocks a faster complexity than the general case. Both nums1 and nums2 are already sorted. What complexity does this guarantee enable?',
      highlight: { location: 'description', text: 'two sorted integer arrays <code>nums1</code> and <code>nums2</code>' },
      options: [
        { label: 'O(n log n) by repeatedly extracting the smallest remaining element from all candidates', isCorrect: false, feedback: 'A heap merge works for k unsorted lists, but here both arrays are fully sorted. You can do better than O(n log n) by exploiting the existing order directly.' },
        { label: 'O(m + n) with a linear merge', isCorrect: true },
        { label: 'O(m × n) element-by-element', isCorrect: false },
        { label: 'O(log(m + n)) by repeatedly halving the search range', isCorrect: false, feedback: 'Binary search finds an element in a sorted array but doesn\'t merge two of them. You still have to place all m + n elements somewhere.' },
      ],
      correctFeedback: 'Two sorted arrays can be merged in a single O(m + n) pass — one pointer per array, always advancing the side with the larger current element.',
      wrongFeedback: [
        'Each array is already in order. How many passes do you need if you just walk both simultaneously and always pick the larger remaining element?',
        'With two sorted arrays and one pointer each, you visit each element exactly once. What does that make the time complexity?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def merge(self, nums1, m, nums2, n):
        i, j, k = m - 1, n - 1, m + n - 1
        while j >= 0:
            if i >= 0 and nums1[i] > nums2[j]:
                nums1[k] = nums1[i]
                i -= 1
            else:
                nums1[k] = nums2[j]
                j -= 1
            k -= 1
        return nums1`,
  solutionComplexity: { time: 'O(n + m)', space: 'O(1)' },
  solutionCaveat: 'Filling <code>nums1</code> from the *back* forward is what makes true in-place merging possible — merging from the front would immediately overwrite <code>nums1</code>\'s own real elements before they\'ve been read and compared, corrupting the very data the merge still needs.',
  solutionExplanation: 'Because the empty slots reserved for merging sit at the *end* of <code>nums1</code>, placing the largest remaining element from either array into the last open slot and working backward never writes over data that still needs to be read — by the time a slot is overwritten, everything that needed to be compared against it has already been consumed. This reuses <code>nums1</code>\'s own storage entirely, avoiding the O(m+n) temporary array a naive combine-and-sort approach would need.',
}
