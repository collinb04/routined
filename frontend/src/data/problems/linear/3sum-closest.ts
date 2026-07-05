export default {
  id: '3sum-closest',
  title: '3Sum Closest',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and integer <code>target</code>, find three integers in <code>nums</code> such that the sum is closest to <code>target</code>. Return that sum.',
  examples: [
    { input: 'nums=[-1,2,1,-4], target=1', output: '2', explanation: 'The sum -1+2+1=2 is closest to 1.' },
    { input: 'nums=[0,0,0], target=1', output: '0' },
  ],
  constraints: ['3 ≤ nums.length ≤ 500', '-1000 ≤ nums[i] ≤ 1000', '-10⁴ ≤ target ≤ 10⁴'],
  starterCode: `def three_sum_closest(nums, target):
  pass`,
  functionName: 'three_sum_closest',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'Closest is 2', args: [[-1,2,1,-4],1], expected: 2 },
    { label: 'All zeros', args: [[0,0,0],1], expected: 0 },
    { label: 'Exact match', args: [[1,2,3],6], expected: 6 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 500 tells you…',
      options: [
        { label: 'O(n) is required', isCorrect: false, feedback: 'O(n) would mean reading each element once without any inner loop — there is no known linear algorithm for selecting the best triplet. The constraint is generous enough to allow more.' },
        { label: 'O(n²) is acceptable', isCorrect: true },
        { label: 'O(n³) is fine', isCorrect: false, feedback: 'At n = 500, O(n³) is 125 million operations — borderline too slow. The constraint is hinting that you should reduce a triple loop to a double loop.' },
        { label: 'Input size is irrelevant', isCorrect: false, feedback: 'Input size always constrains your algorithm. 500³ is 125 million; 500² is 250,000 — a very different budget.' },
      ],
      correctFeedback: '500² = 250,000 operations — comfortably fast. You can afford to fix one element and use a two-pointer scan over the remaining n − 1 elements.',
      wrongFeedback: [
        'Think about what 500³ and 500² look like numerically. Which one stays fast enough?',
        'Fixing one element and searching with two pointers turns a triple loop into a double loop — O(n²) total.',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is the closest sum, not the triplet itself. What does this change?',
      options: [
        { label: 'You must track all triplets', isCorrect: false, feedback: 'Collecting every triplet would be extra work. You only need to carry a single "best sum so far" variable and update it when you find something closer.' },
        { label: 'Track one running closest sum', isCorrect: true },
        { label: 'Return indices of the triplet', isCorrect: false, feedback: 'The problem asks for the integer sum, not where the numbers live. Tracking indices would give you information you do not need to output.' },
        { label: 'Count how many sums tie', isCorrect: false, feedback: 'The problem guarantees exactly one closest sum, so ties do not arise. You just need to track the best absolute difference seen so far.' },
      ],
      correctFeedback: 'Right — one variable holding the current best, updated whenever |current sum − target| is smaller than |best − target|.',
      wrongFeedback: [
        'The output is a single integer. What is the minimum state you need to produce it?',
        'You only need to remember the sum with the smallest absolute difference from target — not the elements that made it.',
      ],
    },
    {
      id: 'sorting-enables-pointers',
      question: 'To use two pointers after fixing one element, what must be true first?',
      options: [
        { label: 'Array must be sorted', isCorrect: true },
        { label: 'Array must contain no duplicates', isCorrect: false, feedback: 'Duplicates do not block two pointers — they just mean you might revisit the same sum. The key prerequisite is that moving a pointer reliably changes the sum in a known direction.' },
        { label: 'Array must be reversed', isCorrect: false, feedback: 'Reversed order is a sorted order, so this is partially right — but the meaningful condition is that the array is sorted, not specifically descending.' },
        { label: 'Target must be positive', isCorrect: false, feedback: 'The target can be any value in [-10⁴, 10⁴]. What matters for two pointers is that the array is ordered so moving left/right has a predictable effect on the sum.' },
      ],
      correctFeedback: 'Sorting means moving the left pointer right always increases the sum and moving the right pointer left always decreases it — exactly what two pointers need to work.',
      wrongFeedback: [
        'Two pointers work by deciding "go bigger" or "go smaller." What property of the array makes those moves reliable?',
        'If the array is unordered, moving a pointer does not reliably change the sum in a known direction. What ordering fixes that?',
      ],
    },
    {
      id: 'exact-match-early-exit',
      question: 'If the current triplet sum equals target exactly, what can you do?',
      options: [
        { label: 'Continue scanning all triplets', isCorrect: false, feedback: 'No sum can be closer than distance 0. Continuing the scan would only waste time — you already have the best possible answer.' },
        { label: 'Return immediately', isCorrect: true },
        { label: 'Record it and keep searching for a negative distance', isCorrect: false, feedback: 'Distance cannot be negative — 0 is the minimum. An exact match is provably optimal, so there is nothing left to search for.' },
        { label: 'Store it and look for a smaller triplet', isCorrect: false, feedback: '"Smaller triplet" is not defined by the problem — only "closest to target" is. An exact match means the search is over.' },
      ],
      correctFeedback: 'Absolute difference of 0 is the minimum possible — return the sum immediately and skip the rest of the search.',
      wrongFeedback: [
        'The goal is to minimize |sum − target|. What is the smallest that difference can be?',
        'If the difference is already 0, no further triplet can improve on it. What does that let you do?',
      ],
    },
  ],
}
