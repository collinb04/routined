export default {
  id: '132-pattern',
  title: '132 Pattern',
  difficulty: 'medium',
  description: 'Given an array of integers, return <code>true</code> if there exist indices i, j, k such that i < j < k and <code>nums[i] < nums[k] < nums[j]</code> (a "132 pattern").',
  examples: [
    { input: 'nums = [1,2,3,4]', output: 'false', explanation: 'No 132 pattern exists.' },
    { input: 'nums = [3,1,4,2]', output: 'true', explanation: '1 < 2 < 4 at indices 1, 3, 2.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 2 × 10⁵', '-10⁹ ≤ nums[i] ≤ 10⁹'],
  starterCode: `class Solution:
    def find132pattern(self, nums):
        pass`,
  runnerSetup: 'find132pattern = Solution().find132pattern',
  functionName: 'find132pattern',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'No pattern', args: [[1,2,3,4]], expected: false },
    { label: 'Has pattern', args: [[3,1,4,2]], expected: true },
    { label: 'Has pattern v2', args: [[-1,3,2,0]], expected: true },
    { label: 'All same', args: [[1,1,1]], expected: false },
  ],
  bruteHint: 'The brute-force approach checks every triple of indices i < j < k directly, testing whether nums[i] < nums[k] < nums[j] holds for each one. That means three nested loops examining roughly n³ combinations. At n up to 2 × 10⁵, how many operations would that be, and would it finish in time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. What does 1 ≤ nums.length ≤ 2 × 10⁵ tell you?',
      options: [
        { label: 'O(n³) is fine for three indices',  isCorrect: false, feedback: 'At n = 200,000, O(n³) is 8 × 10¹⁵ operations — completely infeasible. Even O(n²) is 4 × 10¹⁰, which is too slow. The constraint demands a sub-quadratic approach.' },
        { label: 'O(n²) is acceptable',              isCorrect: false, feedback: 'At n = 200,000, O(n²) is 40 billion operations — far too slow. The constraint rules out any approach that checks all pairs of indices.' },
        { label: 'O(n) or O(n log n) is needed',    isCorrect: true },
        { label: 'Input size does not affect choice', isCorrect: false, feedback: 'Input size always affects the choice. 2 × 10⁵ rules out O(n²) and above — the three-index structure of the problem might suggest a triple loop, but the constraint makes that impossible.' },
      ],
      correctFeedback: '(2 × 10⁵)² = 4 × 10¹⁰ — too slow. You need to track the three values without scanning all triples.',
      wrongFeedback: [
        'The problem involves three indices. How many operations would a triple nested loop take at n = 200,000?',
        'A triple loop is O(n³); a double loop is O(n²). Both are too slow at 2 × 10⁵. What complexity can you afford?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 2 × 10⁵' },
    },
    {
      id: 'pattern-structure',
      question: 'The relationships between the values in a pattern tell you which direction to scan and what to keep track of as you go. The condition is nums[i] < nums[k] < nums[j] with i < j < k. The "3" (nums[j]) is the largest, in the middle position. What does this imply about how you search?',
      options: [
        { label: 'Scan left to right tracking the running minimum', isCorrect: false, feedback: 'Tracking the running minimum finds nums[i] cheaply, but it tells you nothing about whether a valid nums[k] and nums[j] exist to its right. You need to reason about all three values simultaneously.' },
        { label: 'Sort the array to surface the largest value',      isCorrect: false, feedback: 'Sorting destroys the index ordering i < j < k, which is a hard constraint. You cannot sort and still know which elements appeared in which relative positions.' },
        { label: 'Scan right to left, discarding smaller values and remembering the largest one dropped', isCorrect: true },
        { label: 'Use two pointers starting from both ends',         isCorrect: false, feedback: 'Two pointers work when you need a pair summing to a target in a sorted array. Here you need three indices with a specific value ordering — two pointers don\'t capture the middle element\'s role.' },
      ],
      correctFeedback: 'Scanning right to left lets you maintain a monotonic stack of candidates for nums[j], and track the best nums[k] seen so far. When you find nums[i] < nums[k], all three values are confirmed.',
      wrongFeedback: [
        'You need nums[j] > nums[k] > nums[i] with j between i and k. Which scan direction makes it easier to know what\'s already to the right of your current position?',
        'The "3" (nums[j]) is the peak. If you scan right to left, by the time you reach a candidate for nums[j], you\'ve already seen all candidates for nums[k]. What structure tracks "the largest value popped below the current peak"?',
      ],
      highlight: { location: 'description', text: 'nums[i] < nums[k] < nums[j]' },
    },
    {
      id: 'output-type',
      question: 'The type of output you\'re asked for tells you how much of the problem you actually need to solve. The output is a boolean — true if any valid triple exists. What does that let you do?',
      options: [
        { label: 'Return true the moment you find a valid triple', isCorrect: true },
        { label: 'Collect all valid triples before returning',     isCorrect: false, feedback: 'The problem only asks whether a triple exists, not how many or which ones. Collecting all valid triples would be unnecessary work — the moment you confirm one, you\'re done.' },
        { label: 'Count how many patterns exist',                  isCorrect: false, feedback: 'The output is true or false, not a count. You don\'t need to enumerate patterns — one confirmed triple is sufficient.' },
        { label: 'Return the indices i, j, k of the pattern',     isCorrect: false, feedback: 'The output is a boolean, not indices. You don\'t need to record where the pattern is — only whether it exists.' },
      ],
      correctFeedback: 'A boolean output means early exit is valid. The first confirmed triple ends the search — no need to process the rest of the array.',
      wrongFeedback: [
        'The function returns true or false. What can you do the instant you confirm a valid triple?',
        'You\'re not asked to find all patterns or return indices — just confirm existence. What does that allow you to skip?',
      ],
      highlight: { location: 'description' },
    },
    {
      id: 'value-range',
      question: 'Value bounds tell you whether index-based tricks are even available to you. What does -10⁹ ≤ nums[i] ≤ 10⁹ tell you?',
      options: [
        { label: 'You can use values directly as array indices',     isCorrect: false, feedback: 'The range spans 2 × 10⁹ values including negatives. You cannot allocate an array indexed by value — that would require 2 billion slots and break on negative numbers.' },
        { label: 'Negative values are possible; comparisons must handle them', isCorrect: true },
        { label: 'All values fit in a standard integer — no overflow risk', isCorrect: false, feedback: 'In Python integers don\'t overflow, but the constraint still matters: negative values are present and must be handled correctly by any comparison or sentinel you use.' },
        { label: 'Counting sort can organize the values efficiently', isCorrect: false, feedback: 'Counting sort requires a bounded range small enough to allocate. With 2 × 10⁹ possible values it\'s not feasible — and sorting would destroy the index ordering anyway.' },
      ],
      correctFeedback: 'The range includes negative numbers, so any sentinel value representing "no candidate yet" (like negative infinity) must be below all possible inputs — -10⁹ - 1 or float(\'-inf\') works.',
      wrongFeedback: [
        'The range includes -10⁹. If you use a sentinel to mean "no valid nums[k] found yet," what value is safely below every possible input?',
        'Negative values mean comparisons like nums[i] < third (your tracked nums[k] candidate) must be initialized carefully. What sentinel is guaranteed smaller than any value in the array?',
      ],
      highlight: { location: 'constraint', text: '-10⁹ ≤ nums[i] ≤ 10⁹' },
    },
  ],
  solutionCode: `class Solution:
    def find132pattern(self, nums):
        stack = []
        third = float('-inf')
        for n in reversed(nums):
            if n < third:
                return True
            while stack and stack[-1] < n:
                third = max(third, stack.pop())
            stack.append(n)
        return False`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'The stack only ever holds candidates for <code>nums[j]</code> in decreasing order from the top, so popping a smaller one to become <code>third</code> is safe — it can never be a valid <code>nums[j]</code> for anything still on the stack, but it can still serve as the <code>nums[k]</code> half of a pattern.',
  solutionExplanation: 'Scanning right to left, every value popped off the stack while building it up is a number smaller than something that appeared earlier (to its left in the stack, later in the array) — exactly the role <code>nums[k]</code> plays, sandwiched between a bigger <code>nums[j]</code> and needing a smaller <code>nums[i]</code> still to come. Tracking the largest such popped value as <code>third</code> means the moment a new number is smaller than <code>third</code>, all three roles are satisfied: it is <code>nums[i]</code>, <code>third</code> is <code>nums[k]</code>, and whatever pushed <code>third</code> off the stack was <code>nums[j]</code>.',
}
