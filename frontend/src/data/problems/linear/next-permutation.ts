export default {
  id: 'next-permutation',
  title: 'Next Permutation',
  difficulty: 'medium',
  description: 'Given an array of integers, rearrange the numbers into the next lexicographically greater permutation. If no such permutation exists, rearrange to the smallest (ascending) order. Modify in-place.',
  examples: [
    { input: 'nums = [1,2,3]', output: '[1,3,2]', explanation: 'Next permutation is [1,3,2].' },
    { input: 'nums = [3,2,1]', output: '[1,2,3]', explanation: 'Largest permutation; wrap to smallest.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 100', '0 ≤ nums[i] ≤ 100'],
  starterCode: `class Solution:
    def next_permutation(self, nums):
        pass
        return nums`,
  runnerSetup: 'next_permutation = Solution().next_permutation',
  functionName: 'next_permutation',
  conceptId: 'arrays',
  testCases: [
    { label: '[1,2,3]', args: [[1,2,3]], expected: [1,3,2] },
    { label: '[3,2,1]', args: [[3,2,1]], expected: [1,2,3] },
    { label: '[1,1,5]', args: [[1,1,5]], expected: [1,5,1] },
    { label: 'Single', args: [[1]], expected: [1] },
  ],
  bruteHint: 'The brute-force approach generates every permutation of nums, sorts them all lexicographically, and picks the one immediately after the current arrangement. But an array of length n has n! permutations — at n = 100, that number dwarfs the number of atoms in the observable universe. Would generating and sorting all of them ever finish, let alone fit in memory?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'in-place-constraint',
      question: 'Space constraints in a problem tell you what kind of extra memory you\'re allowed to use. "Modify in-place" means you cannot…',
      highlight: { location: 'description', text: 'Modify in-place.' },
      options: [
        { label: 'Allocate a new output array', isCorrect: true },
        { label: 'Swap elements within nums', isCorrect: false, feedback: 'Swapping within the array is exactly what in-place means — you rearrange the existing elements without extra storage.' },
        { label: 'Iterate from the end', isCorrect: false, feedback: 'Traversal direction is independent of in-place. You can scan from either end as long as you write back into nums.' },
        { label: 'Use more than two pointers', isCorrect: false, feedback: 'The number of pointers you use is not what in-place restricts. In-place means no new array of length n — auxiliary variables are fine.' },
      ],
      correctFeedback: 'In-place means O(1) extra space — you must rearrange nums itself, not build a new array.',
      wrongFeedback: [
        'What does "in-place" say about where the answer is stored?',
        'In-place specifically forbids allocating a separate result structure of the same size. What counts as that here?',
      ],
    },
    {
      id: 'wrap-around-output',
      question: 'Edge-case wording like this tells you exactly which arrangement gets singled out for special handling. "If no such permutation exists, rearrange to the smallest order." What case triggers this?',
      highlight: { location: 'description', text: 'If no such permutation exists, rearrange to the smallest (ascending) order.' },
      options: [
        { label: 'Array has duplicate elements', isCorrect: false, feedback: 'Duplicates can still have a next permutation. The wrap-around happens when no larger arrangement exists — not when elements repeat.' },
        { label: 'Array is in descending order', isCorrect: true },
        { label: 'Array has only one element', isCorrect: false, feedback: 'A single element wraps, but so does any fully descending array. The single-element case is one instance of the broader descending condition.' },
        { label: 'Array is already sorted ascending', isCorrect: false, feedback: 'An ascending array has many larger permutations — it is nowhere near the largest. Only the fully descending arrangement has no greater rearrangement.' },
      ],
      correctFeedback: 'A descending array is the lexicographically largest permutation. Rearranging it to ascending order (sort) is the wrap-around to the smallest.',
      wrongFeedback: [
        'Think about which arrangement of digits makes the biggest number. When does no bigger number exist?',
        'The largest possible arrangement has each digit as large as possible from left to right — that means descending order.',
      ],
    },
    {
      id: 'scan-direction',
      question: 'The direction you scan from determines how little of the array you need to touch to find the answer. You need to find the rightmost position where the sequence is not yet at its maximum. Where in the array should you look first?',
      options: [
        { label: 'From the left (index 0)', isCorrect: false, feedback: 'Scanning from the left finds the most significant digit, but you want the smallest change — which means touching the rightmost "non-peak" position.' },
        { label: 'From the right (last index)', isCorrect: true },
        { label: 'At the middle element', isCorrect: false, feedback: 'The middle has no special significance here. You want the rightmost descent, which requires scanning from the end.' },
        { label: 'At the maximum element', isCorrect: false, feedback: 'The maximum element is not the target — you need the rightmost position where a local increase is possible, regardless of global max.' },
      ],
      correctFeedback: 'Scanning right-to-left, find the first index i where nums[i] < nums[i+1]. That is the pivot — swapping here makes the smallest possible increase.',
      wrongFeedback: [
        'You want the next permutation, meaning the smallest possible increase. Which end of the array controls the least significant digits?',
        'Least significant digits are on the right. Finding the rightmost "dip" (where a number is smaller than its right neighbor) locates the smallest spot to make a change.',
      ],
    },
    {
      id: 'suffix-order',
      question: 'Knowing the existing order of a subsequence tells you how much work is really needed to fix it. After swapping the pivot, what must you do to the suffix to the right of it?',
      options: [
        { label: 'Leave it unchanged', isCorrect: false, feedback: 'Leaving the suffix unchanged keeps it in descending order, which is the largest possible suffix — not the smallest. You need the smallest suffix to minimize the overall increase.' },
        { label: 'Reverse it to ascending order', isCorrect: true },
        { label: 'Re-sort it by comparing pairs of elements one by one', isCorrect: false, feedback: 'Sorting would work but costs O(m log m) for the suffix length m. Since the suffix is already in descending order after the swap, a simple reverse is O(m).' },
        { label: 'Remove duplicate elements', isCorrect: false, feedback: 'Nothing in the problem permits removing elements. You must use all original elements in your rearrangement.' },
      ],
      correctFeedback: 'After the pivot swap, the suffix is still in descending order. Reversing it makes it ascending — the lexicographically smallest suffix, giving the smallest overall increment.',
      wrongFeedback: [
        'The suffix to the right of the pivot is in descending order. To get the next permutation (smallest increase), you want that suffix to be as small as possible. What order is that?',
        'The smallest arrangement of any set of digits is ascending order. The suffix is already reverse-sorted, so one operation gets you there without re-sorting.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def next_permutation(self, nums):
        n = len(nums)
        i = n - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
        if i >= 0:
            j = n - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        left, right = i + 1, n - 1
        while left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1
        return nums`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'When no such <code>i</code> exists (the whole array is non-increasing, i.e. already the largest permutation), the swap step is skipped entirely and only the reversal runs — which correctly wraps around to the smallest permutation by reversing the *entire* array in that case.',
  solutionExplanation: 'The longest suffix that is already non-increasing can never be rearranged into something bigger on its own — it is already at its maximum. So the "pivot" just before that suffix is the rightmost place where a bigger arrangement is even possible: swapping it with the smallest suffix value that still exceeds it produces the smallest possible increase, and reversing the remainder of the suffix (which is still sorted descending after the swap) turns it into its smallest possible order — together making the smallest permutation that is still strictly greater than the original.',
}
