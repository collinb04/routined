export default {
  id: '4sum',
  title: '4Sum',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and integer <code>target</code>, return all unique quadruplets <code>[nums[a], nums[b], nums[c], nums[d]]</code> that sum to <code>target</code>.',
  examples: [
    { input: 'nums=[1,0,-1,0,-2,2], target=0', output: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]' },
    { input: 'nums=[2,2,2,2,2], target=8', output: '[[2,2,2,2]]' },
  ],
  constraints: ['1 ≤ nums.length ≤ 200', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹'],
  starterCode: `def four_sum(nums, target):
  pass`,
  functionName: 'four_sum',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'Three quadruplets', args: [[1,0,-1,0,-2,2],0], expected: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]] },
    { label: 'All same', args: [[2,2,2,2,2],8], expected: [[2,2,2,2]] },
    { label: 'No solution', args: [[1,2,3,4],100], expected: [] },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 200 tells you…',
      options: [
        { label: 'O(n²) is all you need', isCorrect: false, feedback: 'O(n²) handles pairs, not quadruplets. You need to fix two elements with outer loops, so O(n²) is the cost of the inner two-pointer scan alone — the total is O(n³).' },
        { label: 'O(n³) is acceptable', isCorrect: true },
        { label: 'O(n⁴) is fine', isCorrect: false, feedback: 'At n = 200, O(n⁴) is 1.6 billion operations — too slow. The constraint is hinting you should reduce the brute-force quad loop by one level using two pointers.' },
        { label: 'Input size is irrelevant', isCorrect: false, feedback: 'Input size always matters. 200⁴ = 1.6 billion; 200³ = 8 million — a 200× difference that determines whether the solution fits in time.' },
      ],
      correctFeedback: '200³ = 8 million operations — fast enough. Fix two elements with nested outer loops and sweep the remaining pair with two pointers in O(n), giving O(n³) total.',
      wrongFeedback: [
        'A brute-force quad loop at n = 200 is 200⁴ = 1.6 billion. What does the constraint suggest you cut it down to?',
        'Two outer loops (O(n²)) plus a two-pointer inner scan (O(n)) gives O(n³) total — that is the sweet spot at n = 200.',
      ],
    },
    {
      id: 'unique-quadruplets',
      question: '"Return all unique quadruplets." What must you handle that a naïve quad loop misses?',
      options: [
        { label: 'Duplicate quadruplets from repeated values', isCorrect: true },
        { label: 'Quadruplets with negative numbers', isCorrect: false, feedback: 'Negative numbers are just values — the algorithm handles them naturally. The uniqueness constraint is specifically about preventing the same four-value combination from appearing twice.' },
        { label: 'Out-of-bounds index access', isCorrect: false, feedback: 'Index bounds are a standard implementation concern, not what "unique" is calling out. The signal is about value-level deduplication.' },
        { label: 'Integer overflow from large values', isCorrect: false, feedback: 'Overflow is worth noting (values reach ±10⁹), but "unique" specifically flags deduplication — preventing the same four values from appearing in two different index combinations.' },
      ],
      correctFeedback: 'When duplicate values exist, different index combinations can produce the same quadruplet. Sorting and skipping equal adjacent values at each loop level prevents this.',
      wrongFeedback: [
        'The constraint says unique quadruplets. What causes the same four values to appear more than once in a naïve search?',
        'Repeated values in nums can produce the same quadruplet via different indices. After sorting, how do you detect and skip those repeats?',
      ],
    },
    {
      id: 'large-value-range',
      question: 'Values reach ±10⁹ and target also reaches ±10⁹. What arithmetic concern does this introduce?',
      options: [
        { label: 'Sums can exceed 32-bit integer range', isCorrect: true },
        { label: 'Negative values make comparison undefined', isCorrect: false, feedback: 'Comparison works fine on negative numbers. The concern is arithmetic: four values each up to 10⁹ sum to at most 4 × 10⁹, which overflows a 32-bit signed integer.' },
        { label: 'Two pointers break on negative values', isCorrect: false, feedback: 'Two pointers rely on sorted order, not sign. Negative values sort normally and the pointer logic is unchanged.' },
        { label: 'No concern — Python handles big integers', isCorrect: false, feedback: 'Python does handle arbitrary integers, but the signal is still worth reading: in other languages this would overflow, and the intent is to recognize that intermediate sums can be very large.' },
      ],
      correctFeedback: '4 × 10⁹ exceeds the 32-bit signed max of ~2.1 × 10⁹. Python handles this transparently, but recognizing it informs the comparison logic in languages with fixed-width integers.',
      wrongFeedback: [
        'Four values each up to 10⁹ — how large can their sum get, and what integer type does that require?',
        '4 × 10⁹ overflows a 32-bit signed integer. In Python this is automatic, but the constraint is flagging that intermediate sums need more than 32 bits.',
      ],
    },
    {
      id: 'generalizing-from-3sum',
      question: 'This problem extends 3Sum by adding one more element. The key insight is…',
      options: [
        { label: 'Add an outer loop and reuse the 3Sum approach', isCorrect: true },
        { label: 'Use a hash map for all four elements', isCorrect: false, feedback: 'A hash map for four elements would require storing triplet sums as keys — complex and hard to deduplicate. The natural extension of sorted two pointers scales more cleanly.' },
        { label: 'Recursion reduces it to 2Sum directly', isCorrect: false, feedback: 'You can think of it recursively, but the practical technique is simply an extra outer loop: fix two elements, then run the two-pointer 2Sum scan on what remains.' },
        { label: 'Binary search replaces the innermost loop', isCorrect: false, feedback: 'Binary search finds one complement in O(log n), but you need all valid pairs — two pointers do this in O(n) with deduplication built in.' },
      ],
      correctFeedback: 'Fix one element with an extra outer loop, then delegate to the 3Sum (two-pointer) approach on the remaining subarray. The pattern extends cleanly to k-sum problems.',
      wrongFeedback: [
        '3Sum fixes one element and finds pairs with two pointers. How would you extend that pattern to handle four elements?',
        'One more outer loop reduces the problem: fix nums[a] and nums[b], then find the pair summing to target − nums[a] − nums[b] using two pointers.',
      ],
    },
  ],
}
