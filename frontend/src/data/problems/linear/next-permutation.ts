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
  starterCode: `def next_permutation(nums):
  pass
  return nums`,
  functionName: 'next_permutation',
  conceptId: 'arrays',
  testCases: [
    { label: '[1,2,3]', args: [[1,2,3]], expected: [1,3,2] },
    { label: '[3,2,1]', args: [[3,2,1]], expected: [1,2,3] },
    { label: '[1,1,5]', args: [[1,1,5]], expected: [1,5,1] },
    { label: 'Single', args: [[1]], expected: [1] },
  ],
  clues: [
    {
      id: 'in-place-constraint',
      question: '"Modify in-place" means you cannot…',
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
      question: '"If no such permutation exists, rearrange to the smallest order." What case triggers this?',
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
      question: 'You need to find the rightmost position where the sequence is not yet at its maximum. Where in the array should you look first?',
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
      question: 'After swapping the pivot, what must you do to the suffix to the right of it?',
      options: [
        { label: 'Leave it unchanged', isCorrect: false, feedback: 'Leaving the suffix unchanged keeps it in descending order, which is the largest possible suffix — not the smallest. You need the smallest suffix to minimize the overall increase.' },
        { label: 'Reverse it to ascending order', isCorrect: true },
        { label: 'Sort it with a comparison sort', isCorrect: false, feedback: 'Sorting would work but costs O(m log m) for the suffix length m. Since the suffix is already in descending order after the swap, a simple reverse is O(m).' },
        { label: 'Remove duplicate elements', isCorrect: false, feedback: 'Nothing in the problem permits removing elements. You must use all original elements in your rearrangement.' },
      ],
      correctFeedback: 'After the pivot swap, the suffix is still in descending order. Reversing it makes it ascending — the lexicographically smallest suffix, giving the smallest overall increment.',
      wrongFeedback: [
        'The suffix to the right of the pivot is in descending order. To get the next permutation (smallest increase), you want that suffix to be as small as possible. What order is that?',
        'The smallest arrangement of any set of digits is ascending order. The suffix is already reverse-sorted, so one operation gets you there without re-sorting.',
      ],
    },
  ],
}
