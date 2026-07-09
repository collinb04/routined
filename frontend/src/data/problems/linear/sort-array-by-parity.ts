export default {
  id: 'sort-array-by-parity',
  title: 'Sort Array By Parity',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code>, move all even integers to the beginning followed by all odd integers. Return any valid arrangement.',
  examples: [
    { input: 'nums = [3,1,2,4]', output: '[2,4,3,1]', explanation: 'Even numbers first, then odd. Multiple valid answers exist.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 5000', '0 ≤ nums[i] ≤ 5000'],
  starterCode: `def sort_array_by_parity(nums):
  pass`,
  functionName: 'sort_array_by_parity',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'Evens first check', args: [[3,1,2,4]], expected: null },
    { label: 'All even', args: [[2,4,6]], expected: [2,4,6] },
    { label: 'All odd', args: [[1,3,5]], expected: [1,3,5] },
  ],
  bruteHint: 'Describe building two new lists for evens and odds and concatenating them, and name the extra space it costs',
  optimizeHint: 'Name the technique that swaps misplaced elements in place using two pointers from each end',
  clues: [
    {
      id: 'any-valid-arrangement',
      question: '"Return any valid arrangement." What constraint does this relax compared to a full sort?',
      options: [
        { label: 'You do not need to separate evens from odds', isCorrect: false, feedback: 'Evens before odds is the core requirement — that constraint remains. "Any valid arrangement" relaxes the relative order among evens and among odds, not the partition itself.' },
        { label: 'Even and odd elements do not need to be sorted among themselves', isCorrect: true },
        { label: 'You can return fewer elements than were given', isCorrect: false, feedback: 'All elements must be returned. "Any valid arrangement" means evens can appear in any order among themselves, and odds can appear in any order — but all must be present.' },
        { label: 'You may skip elements equal to zero', isCorrect: false, feedback: 'Zero is even and must be included in the evens section. No elements are skipped.' },
      ],
      correctFeedback: 'You only need the partition: all evens before all odds. The relative order within each group is unconstrained, which enables in-place swapping approaches that do not preserve original order.',
      wrongFeedback: [
        'Compare "any valid arrangement" to a sort that must also preserve relative order within each group. What extra requirement does the latter impose?',
        'A stable partition preserves relative order; "any valid arrangement" does not. That freedom lets you swap any odd at the front with any even at the back without worrying about sequence.',
      ],
    },
    {
      id: 'two-pointer-opportunity',
      question: 'You want evens at the front and odds at the back. Two pointers — one from each end — can achieve this. What condition triggers a swap?',
      options: [
        { label: 'Left pointer is on an even, right pointer is on an odd', isCorrect: false, feedback: 'If left is even and right is odd, both are already in the correct region — no swap needed. You advance the pointers without swapping.' },
        { label: 'Left pointer is on an odd, right pointer is on an even', isCorrect: true },
        { label: 'Left pointer value is greater than right pointer value', isCorrect: false, feedback: 'Value comparison is for sorting by magnitude. Parity partitioning only cares about even/odd — not whether one value is larger than another.' },
        { label: 'The two pointers point to equal values', isCorrect: false, feedback: 'Equal values have no special meaning for parity. The swap condition is about parity mismatch: an odd on the left side and an even on the right side.' },
      ],
      correctFeedback: 'When the left pointer lands on an odd (misplaced) and the right pointer lands on an even (misplaced), swap them. Both elements move to their correct regions in one operation.',
      wrongFeedback: [
        'The left pointer should only stop at values that do not belong at the front. What kind of value does not belong at the front?',
        'The left pointer advances past evens (they belong at the front) and stops at odds. The right pointer advances past odds and stops at evens. When both stop, the two misplaced elements swap.',
      ],
    },
    {
      id: 'small-constraint',
      question: 'nums.length ≤ 5000. What does this tell you about the algorithm requirements?',
      options: [
        { label: 'Only O(log n) solutions are viable', isCorrect: false, feedback: 'n = 5000 is small — even O(n²) = 25 million operations is fast. O(log n) is not a reasonable requirement and would mean reading fewer than 13 elements.' },
        { label: 'Even O(n²) works; a simple filter-and-concatenate is fine', isCorrect: true },
        { label: 'You need an O(n log n) sort to partition correctly', isCorrect: false, feedback: 'No comparison sort is needed. A simple partition — filter evens, then odds, or use two pointers — is O(n) and more than fast enough.' },
        { label: 'The constraint is too small to influence algorithm choice', isCorrect: false, feedback: 'Small constraints permit simpler algorithms. Knowing n ≤ 5000 means you can use a two-pass filter without concern for efficiency — that is a useful signal.' },
      ],
      correctFeedback: 'n = 5000 makes O(n²) = 25 million operations trivially fast. The simplest correct approach — filter evens into one list, odds into another, concatenate — is perfectly acceptable.',
      wrongFeedback: [
        'At n = 5000, how many operations does an O(n²) algorithm perform? Is that a concern?',
        '5000² = 25 million operations — fast on any machine. The small constraint is a signal that simplicity beats cleverness here. A two-pass O(n) solution is even better, but O(n²) would also pass.',
      ],
    },
    {
      id: 'parity-check',
      question: '0 ≤ nums[i] ≤ 5000. How do you determine if a number is even or odd?',
      options: [
        { label: 'Check if the number is divisible by 2 using division', isCorrect: false, feedback: 'Division works, but the modulo operator is the idiomatic way to check parity. num % 2 == 0 for even; num % 2 == 1 for odd.' },
        { label: 'Check the last bit with num & 1 or num % 2', isCorrect: true },
        { label: 'Compare to the midpoint of the value range', isCorrect: false, feedback: 'The midpoint of [0, 5000] is 2500 and has nothing to do with parity. Even and odd alternate regardless of magnitude.' },
        { label: 'Sort the array; evens cluster at the start', isCorrect: false, feedback: 'Evens do not cluster at the start after sorting by value. 1, 2, 3, 4 is sorted, but odd and even alternate. Parity is independent of magnitude.' },
      ],
      correctFeedback: 'num % 2 == 0 is the standard parity test. Equivalently, num & 1 == 0 checks the last bit. Both are O(1). The value range [0, 5000] has no special meaning for this check.',
      wrongFeedback: [
        'Even numbers are divisible by 2. What arithmetic operation tells you the remainder when dividing by 2?',
        'num % 2 gives the remainder when dividing by 2. If it is 0, the number is even; if it is 1, the number is odd. The range [0, 5000] does not change this.',
      ],
    },
  ],
}
