export default {
  id: 'longest-consecutive-sequence',
  title: 'Longest Consecutive Sequence',
  difficulty: 'medium',
  description: `<p>Given an unsorted array of integers <code>nums</code>, return the length of the longest consecutive elements sequence.</p><p>You must write an algorithm that runs in O(n) time.</p>`,
  examples: [
    { input: 'nums = [100,4,200,1,3,2]', output: '4 (sequence: 1,2,3,4)' },
    { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' },
  ],
  constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
  starterCode: `def longest_consecutive(nums):
  pass`,
  functionName: 'longest_consecutive',
  conceptId: 'arrays',
  testCases: [
    { label: '[100,4,200,1,3,2]', args: [[100,4,200,1,3,2]], expected: 4 },
    { label: '[0,3,7,2,5,8,4,6,0,1]', args: [[0,3,7,2,5,8,4,6,0,1]], expected: 9 },
    { label: 'empty', args: [[]], expected: 0 },
  ],
  bruteHint: 'Describe sorting and scanning, or checking membership repeatedly for each number, and their time complexities',
  optimizeHint: 'Name the data structure that gives O(1) lookups, and explain what check ensures you only start counting from the beginning of a sequence',
  clues: [
    {
      id: 'on-time-requirement',
      question: '"You must write an algorithm that runs in O(n) time." What common approach does this explicitly rule out?',
      options: [
        { label: 'Using a hash set', isCorrect: false, feedback: 'Building a hash set from n elements takes O(n) time. A hash set is compatible with the O(n) requirement — it\'s part of the intended solution.' },
        { label: 'Sorting the array first', isCorrect: true },
        { label: 'A single linear scan', isCorrect: false, feedback: 'A linear scan is O(n) — exactly what the constraint requires. The O(n) requirement is ruling out slower approaches, not linear ones.' },
        { label: 'Counting each element once', isCorrect: false, feedback: 'Counting each element once is O(n) — that satisfies the constraint. The requirement is pointing you away from approaches that are fundamentally super-linear.' },
      ],
      correctFeedback: 'Sorting takes O(n log n), which violates the O(n) requirement. The constraint forces you to find consecutive sequences without ordering the array.',
      wrongFeedback: [
        'What is the time complexity of sorting? Is O(n log n) the same as O(n)?',
        'Sorting is the natural first instinct for a "consecutive sequence" problem. But O(n log n) > O(n). What can you use instead to get O(1) lookup without sorting?',
      ],
    },
    {
      id: 'large-value-range',
      question: '"-10^9 ≤ nums[i] ≤ 10^9". What does this rule out for tracking which numbers have been seen?',
      options: [
        { label: 'A hash set', isCorrect: false, feedback: 'A hash set stores only the values that appear in nums — its size is at most n, not 2 × 10^9. Hash sets are not bounded by value range.' },
        { label: 'A boolean array indexed by value', isCorrect: true },
        { label: 'Storing values in a list', isCorrect: false, feedback: 'A list of the n input values uses O(n) space regardless of value range. The constraint doesn\'t restrict list storage.' },
        { label: 'Comparing values to each other', isCorrect: false, feedback: 'Comparing values is O(1) per comparison and doesn\'t depend on value range. The constraint affects any structure sized proportional to the value space, not comparisons.' },
      ],
      correctFeedback: 'A boolean array indexed by value would need 2 × 10^9 slots — about 2 GB. The value range is too large for direct indexing. A hash set keyed on the actual values uses O(n) space instead.',
      wrongFeedback: [
        'If you used an array with one slot per possible value, how large would it need to be given the range -10^9 to 10^9?',
        'Direct-index arrays work when the value range is comparable to n. Here the range is 2 × 10^9 but n ≤ 10^5. What structure handles arbitrary values in O(n) space?',
      ],
    },
    {
      id: 'sequence-start-detection',
      question: 'To avoid re-counting sequences, you should only begin counting from a sequence start. How do you identify that a number n is the start of a consecutive sequence?',
      options: [
        { label: 'n is the smallest number in nums', isCorrect: false, feedback: 'There is only one smallest number in nums, but there can be many sequence starts. For example, in [1,2,100,101] both 1 and 100 are sequence starts.' },
        { label: 'n-1 is not in the set', isCorrect: true },
        { label: 'n+1 is in the set', isCorrect: false, feedback: 'n+1 being present means n could be a start, but it could also be a middle element. The definitive test is that n-1 is absent — if n has no predecessor, it must be a start.' },
        { label: 'n appears exactly once in nums', isCorrect: false, feedback: 'Occurrence count is irrelevant to identifying a sequence start. Duplicates don\'t affect consecutive-sequence structure — only the presence or absence of n-1 matters.' },
      ],
      correctFeedback: 'If n-1 is not in the set, n has no predecessor — it is the start of a new sequence. Only from these starting points do you count forward (n+1, n+2, ...). This ensures each sequence is counted exactly once.',
      wrongFeedback: [
        'If you start counting from every element, you\'d recount the same sequence multiple times. What property uniquely identifies where a sequence begins?',
        'A sequence start has no element immediately before it. How do you check "is there an element just before n?" in O(1)?',
      ],
    },
    {
      id: 'duplicate-handling',
      question: 'nums can contain duplicates (e.g., [0,3,7,2,5,8,4,6,0,1] has two 0s). How does a hash set handle this automatically?',
      options: [
        { label: 'It counts each value\'s frequency', isCorrect: false, feedback: 'A hash set stores presence, not frequency. It doesn\'t count occurrences — it just records whether a value is in the set. Duplicates are silently ignored on insertion.' },
        { label: 'It deduplicates on insertion', isCorrect: true },
        { label: 'It raises an error for duplicate values', isCorrect: false, feedback: 'Sets in Python silently ignore duplicate insertions — no error is raised. Converting a list with duplicates to a set simply keeps one copy of each value.' },
        { label: 'It stores all copies and you must deduplicate manually', isCorrect: false, feedback: 'Python sets never store duplicate values. Adding 0 twice to a set results in a set with one 0. No manual deduplication step is needed.' },
      ],
      correctFeedback: 'A set stores each value at most once. Adding [0, 0, 1] produces {0, 1}. Duplicates are harmless — the set already reflects which values are present, and sequence counting is based on presence, not frequency.',
      wrongFeedback: [
        'What happens when you add the same value to a Python set twice? Does the set grow?',
        'set([0, 0, 1]) gives {0, 1}. Does that affect your sequence length calculation for the sequence starting at 0?',
      ],
    },
  ],
}
