export default {
  id: 'search-in-rotated-sorted-array',
  title: 'Search in Rotated Sorted Array',
  difficulty: 'medium',
  description: `<p>There is an integer array <code>nums</code> sorted in ascending order with distinct values, possibly rotated at an unknown pivot. Given the array <code>nums</code> and an integer <code>target</code>, return the index of <code>target</code> if it is in <code>nums</code>, or <code>-1</code> if it is not. You must write an algorithm with O(log n) runtime complexity.</p>`,
  examples: [
    { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
    { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
  ],
  constraints: ['1 <= nums.length <= 5000', 'All values are unique', '-10^4 <= nums[i], target <= 10^4'],
  starterCode: `def search(nums, target):
  pass`,
  functionName: 'search',
  conceptId: 'binary-search',
  testCases: [
    { label: 'target=0', args: [[4,5,6,7,0,1,2], 0], expected: 4 },
    { label: 'not found', args: [[4,5,6,7,0,1,2], 3], expected: -1 },
    { label: 'single', args: [[1], 0], expected: -1 },
  ],
  bruteHint: 'Describe scanning the array linearly to find the target, and why that fails the O(log n) requirement',
  optimizeHint: 'Name the modified binary search technique that determines which half of the array is properly sorted at each step',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'You must use O(log n) runtime. With n ≤ 5,000, what does this rule out?',
      options: [
        { label: 'Linear scan through the array', isCorrect: false, feedback: 'A linear scan is O(n) — up to 5,000 comparisons. O(log n) allows only about 13. The constraint is explicitly ruling out any approach that visits every element.' },
        { label: 'Binary search variant', isCorrect: true },
        { label: 'Hash the array for O(1) lookup', isCorrect: false, feedback: 'Building a hash set requires O(n) time to populate — that violates the O(log n) requirement. The constraint is on the entire algorithm, not just the lookup step.' },
        { label: 'O(log n) is impossible without a fully sorted array', isCorrect: false, feedback: 'The array is sorted, just rotated. At any midpoint, one half is always fully sorted. That guarantee is enough to run binary search with one extra comparison per step.' },
      ],
      correctFeedback: 'O(log n) means binary search. With n = 5,000, that\'s at most log₂(5,000) ≈ 13 iterations. The rotation doesn\'t break binary search — it just requires identifying which half is sorted at each step.',
      wrongFeedback: [
        'O(log n) for a sorted structure is the signature of one classic algorithm. What is it?',
        'Binary search halves the search space each iteration. Can you determine which half to keep even when the array is rotated?',
      ],
    },
    {
      id: 'rotation-structure',
      question: 'The array is sorted then rotated at an unknown pivot. At any midpoint, what can you always determine?',
      options: [
        { label: 'The exact pivot position', isCorrect: false, feedback: 'You cannot determine the pivot from a single midpoint comparison. But you don\'t need it — you only need to know which half is sorted to decide where to search.' },
        { label: 'Which half is fully sorted', isCorrect: true },
        { label: 'Whether mid is the target', isCorrect: false, feedback: 'Checking if mid is the target is one step, but it doesn\'t tell you where to search if it\'s not. The key insight is using nums[lo] and nums[mid] to identify the sorted half.' },
        { label: 'Nothing useful — the rotation breaks all invariants', isCorrect: false, feedback: 'The rotation breaks full-array monotonicity but preserves a key invariant: one of the two halves around any midpoint is always fully sorted. That\'s enough to navigate.' },
      ],
      correctFeedback: 'If nums[lo] ≤ nums[mid], the left half [lo..mid] is sorted. Otherwise the right half [mid..hi] is sorted. From there, check whether the target falls in the sorted half and eliminate the other.',
      wrongFeedback: [
        'In [4,5,6,7,0,1,2], if mid points to 7, is [4,5,6,7] sorted? Is [7,0,1,2] sorted? Which half is always guaranteed to be sorted?',
        'Compare nums[lo] to nums[mid]. If nums[lo] ≤ nums[mid], the left half is unbroken. Use that to decide where the target could be.',
      ],
    },
    {
      id: 'distinct-values-guarantee',
      question: '"All values are unique." How does this simplify the binary search logic?',
      options: [
        { label: 'You can use == to find the target in O(1)', isCorrect: false, feedback: 'Uniqueness doesn\'t give you O(1) lookup — you still need to binary search. It simplifies pivot detection, not access speed.' },
        { label: 'You never need to handle nums[lo] == nums[mid]', isCorrect: true },
        { label: 'The pivot is always at the midpoint', isCorrect: false, feedback: 'The pivot location is unknown and generally not at the midpoint. Uniqueness means you don\'t get ambiguous equal endpoints — it doesn\'t fix the pivot position.' },
        { label: 'Input size doesn\'t matter since values are distinct', isCorrect: false, feedback: 'Distinctness affects comparison logic, not complexity. n ≤ 5,000 still bounds the number of iterations needed.' },
      ],
      correctFeedback: 'When nums[lo] == nums[mid], you can\'t tell which half is sorted — that\'s the hard case in the duplicates variant. Uniqueness guarantees nums[lo] ≠ nums[mid], so the left-half-sorted check is always unambiguous.',
      wrongFeedback: [
        'In the duplicates variant, what goes wrong when nums[lo] == nums[mid] == nums[hi]?',
        'Uniqueness eliminates the tie case. When nums[lo] < nums[mid] is always true or always false (never equal), does the sorted-half comparison become simpler?',
      ],
    },
    {
      id: 'output-structure',
      question: 'The output is an index (or -1), not a boolean. What does this mean for your search logic?',
      options: [
        { label: 'Return true/false first, then find the index', isCorrect: false, feedback: 'Two passes — one to confirm existence and one to find the index — would still be O(log n), but it\'s unnecessary work. The binary search should track the index directly.' },
        { label: 'Track and return the exact position, not just existence', isCorrect: true },
        { label: 'Sort the array to find the index faster', isCorrect: false, feedback: 'Sorting a rotated array would take O(n log n) and destroy the rotation structure you\'re supposed to search. The index in the original array is what you return.' },
        { label: 'The index is always in the sorted half', isCorrect: false, feedback: 'The target can be anywhere — in the sorted half or the unsorted half. You eliminate the half where the target cannot be, then search the other.' },
      ],
      correctFeedback: 'Your binary search must return the index in the original array. When nums[mid] == target, return mid. When the search space empties, return -1.',
      wrongFeedback: [
        'The problem asks for where the target is, not whether it exists. What does your binary search need to track and return?',
        'Return mid when nums[mid] == target. What do you return when lo > hi without finding the target?',
      ],
    },
  ],
}
