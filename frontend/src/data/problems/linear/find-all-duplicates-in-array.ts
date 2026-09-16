export default {
  id: 'find-all-duplicates-in-array',
  title: 'Find All Duplicates in an Array',
  difficulty: 'medium',
  description: 'Given an array of integers in the range [1, n] where some elements appear twice and others appear once, find all elements that appear twice. Use O(1) extra space.',
  examples: [
    { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[2,3]' },
    { input: 'nums = [1,1,2]', output: '[1]' },
  ],
  constraints: ['n == nums.length', '1 ≤ n ≤ 10⁵', '1 ≤ nums[i] ≤ n', 'Each element appears once or twice'],
  starterCode: `class Solution:
    def find_duplicates(self, nums):
        pass`,
  runnerSetup: 'find_duplicates = Solution().find_duplicates',
  functionName: 'find_duplicates',
  conceptId: 'arrays',
  testCases: [
    { label: 'Two duplicates', args: [[4,3,2,7,8,2,3,1]], expected: [2,3] },
    { label: 'One duplicate', args: [[1,1,2]], expected: [1] },
    { label: 'No duplicates', args: [[1,2,3]], expected: [] },
  ],
  bruteHint: 'The brute-force approach uses a hash set (or an array of counts) to track every value as you scan — if a value is already recorded when you see it again, it\'s a duplicate. That works in O(n) time, but it allocates space proportional to n, exactly what the O(1) extra space constraint forbids. What would it take to reuse the input array itself as that tracking structure, instead of allocating a new one?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'values-as-indices',
      question: 'Comparing a value\'s range to the array\'s own length can reveal whether you already have a ready-made structure to work with. "1 ≤ nums[i] ≤ n" and "n == nums.length". What does this relationship between values and array length suggest?',
      options: [
        { label: 'Sort the array first', isCorrect: false, feedback: 'Sorting takes O(n log n) time and requires no extra space, but it doesn\'t exploit the value-range constraint. The [1, n] range is a stronger signal — values are valid indices into the array itself.' },
        { label: 'Every value is a valid index', isCorrect: true },
        { label: 'Track seen values in a separate collection', isCorrect: false, feedback: 'A hash set works but uses O(n) extra space — which the constraint forbids. The [1, n] bound is specifically hinting at an in-place approach that uses the array as its own marker.' },
        { label: 'The array is already sorted', isCorrect: false, feedback: 'Nothing in the problem says the array is sorted. The constraint is about the range of values ([1, n]), not their order.' },
      ],
      correctFeedback: 'Values in [1, n] map directly to indices 0 through n-1. You can use each value as an index into the array itself, marking visited positions by negating the element at that index.',
      wrongFeedback: [
        'The array has n elements and values 1 through n. What can you do with a value v when you know v is always a valid position in the same array?',
        'If you see value v, you can visit index v-1. What could you do to that position to record "I have seen v" without using any extra space?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ nums[i] ≤ n' },
    },
    {
      id: 'o1-space-constraint',
      question: 'Space constraints tell you which approaches you can actually afford to allocate, not just which ones are logically correct. "Use O(1) extra space." Which approach does this rule out?',
      options: [
        { label: 'Sorting the input in place', isCorrect: false, feedback: 'In-place sorting uses O(1) extra space — it modifies the input array but allocates nothing proportional to n. The constraint rules out structures that grow with input size.' },
        { label: 'Recording every seen value in a new collection', isCorrect: true },
        { label: 'Marking positions as visited using the array itself', isCorrect: false, feedback: 'Negating elements is an in-place trick — it uses the existing array as storage. No additional data structure is allocated, so it satisfies O(1) extra space.' },
        { label: 'Returning a result list', isCorrect: false, feedback: 'The output list is not counted as "extra space" — you must return something. The constraint refers to auxiliary working space, not the result itself.' },
      ],
      correctFeedback: 'A hash set grows O(n) with input size. The constraint pushes you toward an in-place marking scheme using the array itself as storage.',
      wrongFeedback: [
        'O(1) extra space means you can\'t allocate anything that grows with n. Which approach here allocates n slots?',
        'Think about what each approach allocates: sorting allocates nothing extra, a set allocates n entries, negation uses existing slots. Which one violates the constraint?',
      ],
      highlight: { location: 'description', text: 'Use O(1) extra space.' },
    },
    {
      id: 'appears-twice-guarantee',
      question: 'Guarantees about how a value can repeat tell you exactly how much bookkeeping you actually need to do. "Each element appears once or twice." What does this guarantee let you skip?',
      options: [
        { label: 'Tracking exact occurrence counts', isCorrect: true },
        { label: 'Handling values outside [1, n]', isCorrect: false, feedback: '"1 ≤ nums[i] ≤ n" already guarantees values are in range — that\'s a separate constraint. This guarantee is specifically about frequency: no value appears 3 or more times.' },
        { label: 'Resetting markers after each pass', isCorrect: false, feedback: 'The guarantee simplifies what your marker needs to encode, not whether you need multiple passes. With at most two appearances, a single bit of information (seen/unseen) is sufficient per value.' },
        { label: 'Nothing — you must count anyway', isCorrect: false, feedback: 'If elements could appear 3 or more times, you\'d need counts. Knowing the maximum frequency is 2 means you only need to detect a second visit, not count all visits.' },
      ],
      correctFeedback: 'Each value appears at most twice, so you only need a binary "seen / not seen" marker per position. The moment you visit a position that\'s already marked, the value is a duplicate — no counter needed.',
      wrongFeedback: [
        'If a value can appear at most twice, what\'s the minimum information you need to store per value to identify duplicates?',
        'You only need to know "have I seen this before?" — true or false. What does that mean for how you mark the array?',
      ],
      highlight: { location: 'constraint', text: 'Each element appears once or twice' },
    },
  ],
  solutionCode: `class Solution:
    def find_duplicates(self, nums):
        result = []
        for n in nums:
            idx = abs(n) - 1
            if nums[idx] < 0:
                result.append(abs(n))
            else:
                nums[idx] = -nums[idx]
        return result`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'This mutates the input array in place — fine for a one-shot answer, but the caller loses the original values (though every value is recoverable via <code>abs()</code>, since only the sign was changed).',
  solutionExplanation: 'Every value in the array is also a valid index (1 to n), so the array itself can double as the "have I seen this value" tracker with zero extra space: negate <code>nums[value - 1]</code> the first time <code>value</code> is encountered. If that slot is already negative by the time <code>value</code> comes around a second time, <code>value</code> is a duplicate — no separate set needed, since the sign bit of each slot *is* the visited flag.',
}
