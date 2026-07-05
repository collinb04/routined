export default {
  id: 'smallest-range-k-lists',
  title: 'Smallest Range Covering Elements from K Lists',
  difficulty: 'hard',
  description: 'Given k sorted lists of integers, find the smallest range [a,b] such that each list has at least one element in [a,b].',
  examples: [
    { input: 'nums=[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]', output: '[20,24]', explanation: 'Range [20,24] includes 24 from list 1, 20 from list 2, 22 from list 3.' },
  ],
  constraints: ['nums.length == k', '1 ≤ k ≤ 3500', '1 ≤ nums[i].length ≤ 50', 'All lists are sorted'],
  starterCode: `def smallest_range(nums):
  pass`,
  functionName: 'smallest_range',
  conceptId: 'heap',
  testCases: [
    { label: 'Standard', args: [[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]], expected: [20,24] },
    { label: 'Two lists', args: [[[1,2,3],[1,2,3]]], expected: [1,1] },
  ],
  clues: [
    {
      id: 'coverage-requirement',
      question: 'The range must include at least one element from each of the k lists. What invariant must your algorithm maintain at every step?',
      options: [
        { label: 'The range always contains exactly one element per list', isCorrect: false, feedback: 'A range can contain multiple elements from one list — what matters is that every list contributes at least one. "Exactly one" is a stronger constraint than the problem requires.' },
        { label: 'One representative from each list is tracked in the current window', isCorrect: true },
        { label: 'The range endpoints come from the same list', isCorrect: false, feedback: 'The range endpoints can come from different lists. In the example, [20, 24] has its left endpoint from list 2 (element 20) and its right endpoint from list 1 (element 24).' },
        { label: 'All elements in the range are distinct', isCorrect: false, feedback: 'Elements can repeat across lists. The constraint is coverage — one element from each list in the range — not distinctness.' },
      ],
      correctFeedback: 'At every step the algorithm maintains exactly one "current" pointer per list. The range spans from the minimum to the maximum of those k pointers. Shrinking the range means advancing the pointer at the minimum.',
      wrongFeedback: [
        'You need one element from each list in the range simultaneously. What happens to the range if one list is not represented?',
        'Think of it as k pointers, one per list. The range is [min of pointers, max of pointers]. What must be true about those pointers for the range to be valid?',
      ],
    },
    {
      id: 'min-heap-frontier',
      question: 'You track k current elements, one per list. You need the minimum of those k elements efficiently. What structure is right for this?',
      options: [
        { label: 'Scan all k pointers each step to find the minimum', isCorrect: false, feedback: 'Scanning all k pointers each step costs O(k) per step. With up to 3500 lists and 50 elements each, you have up to 175,000 advance steps — O(k) per step gives O(k × total) which is avoidable.' },
        { label: 'A min-heap holding (value, list_index, element_index)', isCorrect: true },
        { label: 'A sorted array of the k current elements, updated each step', isCorrect: false, feedback: 'Maintaining a sorted array of k elements with O(log k) insertions and O(k) deletions is more expensive than a heap, which does both in O(log k).' },
        { label: 'A max-heap to track the range maximum', isCorrect: false, feedback: 'You need the minimum of the k current elements to know which pointer to advance. A max-heap gives you the maximum, not the minimum. You also need the maximum — but it can be tracked as a running variable alongside a min-heap.' },
      ],
      correctFeedback: 'The min-heap holds (value, list_index, element_index) for each list\'s current pointer. The root is the minimum across all k lists — popping it and pushing the next element from that list advances the frontier in O(log k).',
      wrongFeedback: [
        'Each step you advance the list with the minimum current value. What structure gives you the minimum of k dynamic values in O(log k)?',
        'You have one active element per list. When you advance one pointer, you swap one heap element for the next value in its list. Which heap operation does that in O(log k)?',
      ],
    },
    {
      id: 'range-shrinking-strategy',
      question: 'The range is [min of current elements, max of current elements]. To shrink the range, which pointer should you advance?',
      options: [
        { label: 'The pointer at the maximum value', isCorrect: false, feedback: 'Advancing the maximum pointer increases the minimum of the range or keeps it the same, but does not shrink the gap. To shrink [a, b], you need to raise a or lower b — and you can only raise a by advancing the minimum.' },
        { label: 'The pointer at the minimum value', isCorrect: true },
        { label: 'The pointer from the list with the most remaining elements', isCorrect: false, feedback: 'The number of remaining elements in a list is irrelevant to shrinking the range. The range width is max − min, and the only way to reduce it is to advance the minimum.' },
        { label: 'Any pointer — advancing any one shrinks the range', isCorrect: false, feedback: 'Advancing the maximum pointer or a middle pointer does not help. Only advancing the minimum can reduce the range width, because b − a decreases only when a increases.' },
      ],
      correctFeedback: 'Range width = max − min. Min is fixed by the smallest current element. Advancing the minimum pointer replaces it with a larger value from the same list, potentially raising the floor of the range.',
      wrongFeedback: [
        'Range width is max − min. Which endpoint can you actually move upward, and which list\'s pointer controls that endpoint?',
        'You cannot lower the maximum (that would require going backward in a list). You can only raise the minimum. Which pointer controls the minimum?',
      ],
    },
    {
      id: 'termination-condition',
      question: 'When does the algorithm stop?',
      options: [
        { label: 'When the range width equals zero', isCorrect: false, feedback: 'A width-zero range is ideal but not always achievable. The algorithm must stop when it can no longer maintain full coverage — not only when it finds a perfect match.' },
        { label: 'When any list\'s pointer reaches the end', isCorrect: true },
        { label: 'After exactly k × max_list_length iterations', isCorrect: false, feedback: 'The number of iterations depends on when coverage breaks, not on a fixed count. Iterating a fixed number of times could miss the best range or continue past the valid coverage window.' },
        { label: 'When the minimum and maximum pointers are from the same list', isCorrect: false, feedback: 'The min and max pointers can be from the same list and the range can still be valid. Termination is about losing coverage of any list, not about which lists hold the extremes.' },
      ],
      correctFeedback: 'When the pointer at the minimum reaches the last element of its list, advancing it would leave that list unrepresented. At that point no further shrinking is possible while maintaining full coverage — stop and return the best range found.',
      wrongFeedback: [
        'Advancing a pointer moves past the current element to the next in its list. What happens if a list has no next element?',
        'Full coverage requires one element from every list. If you advance past the last element of any list, that list has no representative. What does that mean for the loop?',
      ],
    },
  ],
}
