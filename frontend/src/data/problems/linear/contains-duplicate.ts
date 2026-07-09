export default {
  id: 'contains-duplicate',
  title: 'Contains Duplicate',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code>, return <code>true</code> if any value appears at least twice, and <code>false</code> if every element is distinct.',
  examples: [
    { input: 'nums = [1, 2, 3, 1]', output: 'true', explanation: '1 appears at index 0 and 3.' },
    { input: 'nums = [1, 2, 3, 4]', output: 'false', explanation: 'All elements are distinct.' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10⁵',
    '-10⁹ ≤ nums[i] ≤ 10⁹',
  ],
  starterCode: `def contains_duplicate(nums):
  pass`,
  functionName: 'contains_duplicate',
  conceptId: 'arrays',
  testCases: [
    { label: 'Has duplicate', args: [[1, 2, 3, 1]], expected: true },
    { label: 'All unique', args: [[1, 2, 3, 4]], expected: false },
    { label: 'Single element', args: [[1]], expected: false },
    { label: 'Multiple duplicates', args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
  ],
  bruteHint: 'Describe comparing every pair of elements and its time complexity',
  optimizeHint: 'Name the data structure that gives O(1) membership checks as you scan',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'nums.length ≤ 10⁵ tells you…',
      options: [
        { label: 'O(n²) is acceptable',       isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations. That\'s nowhere near feasible. The constraint is telling you a nested loop won\'t work.' },
        { label: 'Input size doesn\'t matter', isCorrect: false, feedback: 'Input size always matters. 10⁵ is a signal about which complexities are acceptable — ask yourself what happens to a brute-force comparison at that scale.' },
        { label: 'O(n log n) or better needed', isCorrect: false, feedback: 'O(n log n) would work, but the constraint doesn\'t require it — O(n) is achievable and preferable. The constraint rules out O(n²), not all super-linear solutions.' },
        { label: 'O(n²) is too slow; aim for O(n)', isCorrect: true },
      ],
      correctFeedback: '10⁵² = 10 billion operations — far too slow. You need to find a repeated value without comparing every pair.',
      wrongFeedback: [
        'At n = 100,000, how many pairs would a double loop check? Is that fast enough?',
        'A nested loop checks every pair — that\'s n² ≈ 10 billion at max input. What complexity would still be fast enough?',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is a boolean — true if any duplicate exists. This means…',
      options: [
        { label: 'You need to find all duplicate values',    isCorrect: false, feedback: 'The problem only asks whether a duplicate exists, not which values are duplicated or how many times. Collecting all duplicates is unnecessary work.' },
        { label: 'You can stop as soon as you see a repeat', isCorrect: true },
        { label: 'You must count occurrences of every value', isCorrect: false, feedback: 'Counting every value\'s occurrences would give you more than you need. You only need to know if any count exceeds one — and you can detect that the moment you see a second occurrence.' },
        { label: 'You need to return which index has the duplicate', isCorrect: false, feedback: 'The output is true or false, not an index. You don\'t need to track where the duplicate lives — only whether one exists at all.' },
      ],
      correctFeedback: 'A boolean output means the first repeated element ends the search. No need to process the entire array once you\'ve found a duplicate.',
      wrongFeedback: [
        'The output is just true or false. What does that tell you about how much of the array you need to examine?',
        'You\'re not asked for a count or a position — just whether a repeat exists. What can you do the moment you see one?',
      ],
    },
    {
      id: 'membership-lookup',
      question: 'To detect a duplicate, you need to know: "have I seen this value before?" What structure answers that in O(1)?',
      options: [
        { label: 'Sort the array, then scan adjacent pairs', isCorrect: false, feedback: 'Sorting works but costs O(n log n) and mutates the array. There\'s a structure that answers the membership question directly in O(1), making the whole algorithm O(n).' },
        { label: 'A hash set tracking seen values',          isCorrect: true },
        { label: 'A list of previously seen values',         isCorrect: false, feedback: 'Scanning a plain list to check membership is O(n) per lookup — making the overall algorithm O(n²). You need a structure with O(1) lookup.' },
        { label: 'A counter dictionary for all values',      isCorrect: false, feedback: 'A counter works, but building the full count of every value before checking is unnecessary. You only need to know if a value appears twice — a set that tracks seen values catches that the moment the second occurrence arrives.' },
      ],
      correctFeedback: 'A hash set supports O(1) add and O(1) membership check. One pass through the array: if the current value is already in the set, return true; otherwise, add it.',
      wrongFeedback: [
        'You need to answer "seen before?" for each element. Which structure does that in O(1)?',
        'Lists give O(n) membership, sorting gives O(n log n). One structure gives O(1) — it stores elements with no order and no duplicates by definition.',
      ],
    },
    {
      id: 'value-range',
      question: '-10⁹ ≤ nums[i] ≤ 10⁹ tells you…',
      options: [
        { label: 'Values are small enough to use as array indices', isCorrect: false, feedback: 'The range spans 2 × 10⁹ distinct values. You cannot allocate an array that large as a lookup table — that\'s a 2 GB array of booleans.' },
        { label: 'A hash-based structure is the right fit',         isCorrect: true },
        { label: 'All values are positive',                         isCorrect: false, feedback: 'The range includes negative numbers down to -10⁹. Any approach that assumes positive-only values (like direct indexing into an array) would break on negative inputs.' },
        { label: 'Counting sort is applicable here',                isCorrect: false, feedback: 'Counting sort requires allocating space for every possible value in the range. With a span of 2 × 10⁹, that\'s not feasible. The range is too large for array-indexed counting.' },
      ],
      correctFeedback: 'The range is too large for array-indexed lookup but arbitrary values are fine for a hash set or hash map, which handles any integer in O(1).',
      wrongFeedback: [
        'The range spans 2 billion values. What does that rule out as a lookup structure?',
        'Direct array indexing would need 2 × 10⁹ slots. Which lookup structure handles arbitrary integers without pre-allocating space?',
      ],
    },
  ],
}
