export default {
  id: 'first-missing-positive',
  title: 'First Missing Positive',
  difficulty: 'hard',
  description: 'Given an unsorted integer array, return the smallest missing positive integer. Your algorithm must run in O(n) time and use O(1) auxiliary space.',
  examples: [
    { input: 'nums = [1,2,0]', output: '3' },
    { input: 'nums = [3,4,-1,1]', output: '2' },
    { input: 'nums = [7,8,9,11,12]', output: '1' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1'],
  starterCode: `class Solution:
    def first_missing_positive(self, nums):
        pass`,
  runnerSetup: 'first_missing_positive = Solution().first_missing_positive',
  functionName: 'first_missing_positive',
  conceptId: 'arrays',
  testCases: [
    { label: 'Missing 3', args: [[1,2,0]], expected: 3 },
    { label: 'Missing 2', args: [[3,4,-1,1]], expected: 2 },
    { label: 'Missing 1', args: [[7,8,9,11,12]], expected: 1 },
    { label: 'Sequential', args: [[1,2,3]], expected: 4 },
  ],
  bruteHint: 'The brute-force approach checks each positive integer starting from 1 — for each one, scan the array to see whether it\'s present, and stop at the first integer that\'s missing. A hash set makes each membership check O(1), giving you O(n) time overall, but building that set costs O(n) auxiliary space. Sorting the array first and scanning for the first gap gets you down to O(1) extra space, but costs O(n log n) time for the sort. Which resource are you willing to spend — and is there a way to avoid spending either?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-o1-space',
      question: 'Space constraints tell you which data structures are even on the table. "Use O(1) auxiliary space." What does this rule out?',
      options: [
        { label: 'A separate structure that records every value seen so far', isCorrect: true },
        { label: 'In-place swaps within the input array', isCorrect: false, feedback: 'Modifying the input array in-place uses no extra space — the array itself becomes the data structure.' },
        { label: 'Counting present values using index signs', isCorrect: false, feedback: 'Using element signs as boolean markers is a classic O(1)-space trick — it encodes information into the existing array without allocating anything new.' },
        { label: 'A single integer to track the answer', isCorrect: false, feedback: 'One integer variable is O(1) space — that\'s well within the constraint.' },
      ],
      correctFeedback: 'A hash set allocates O(n) auxiliary space. With O(1) required, you need to encode presence information into the array itself.',
      wrongFeedback: [
        'O(1) auxiliary space means you cannot allocate structures proportional to n. Which of these options creates a new data structure sized by the input?',
        'The constraint rules out any separate storage that grows with n. One of these options requires exactly that.',
      ],
      highlight: { location: 'description', text: 'O(1) auxiliary space' },
    },
    {
      id: 'constraint-linear-time',
      question: 'Time constraints tell you how much work your algorithm can afford to repeat. "O(n) time." What does this rule out?',
      options: [
        { label: 'Sorting the array first', isCorrect: true },
        { label: 'A single pass over the array', isCorrect: false, feedback: 'A single pass is O(n) — that\'s exactly what the constraint demands.' },
        { label: 'Two sequential passes over the array', isCorrect: false, feedback: 'Two passes is still O(n). Linear time allows any constant number of passes.' },
        { label: 'In-place rearrangement of elements', isCorrect: false, feedback: 'Rearranging elements can be done in O(n) if each element moves to its correct slot at most once. That\'s the key insight here.' },
      ],
      correctFeedback: 'Sorting is O(n log n). At n = 10⁵, that\'s about 1.7 million operations — not ruled out by performance, but explicitly forbidden by the O(n) constraint.',
      wrongFeedback: [
        'Sorting a 10⁵-element array is O(n log n). What does the time constraint say about that?',
        'The constraint is O(n), not O(n log n). Which of these options exceeds that bound?',
      ],
      highlight: { location: 'description', text: 'O(n) time' },
    },
    {
      id: 'answer-range-guarantee',
      question: 'Knowing how many elements you have lets you bound what the answer could possibly be, instead of searching an unbounded range. The array has n elements — what is the guaranteed range of the first missing positive?',
      options: [
        { label: 'It could be any positive integer', isCorrect: false, feedback: 'With n elements, the pigeonhole principle guarantees the answer is between 1 and n+1 — if 1 through n are all present, the answer is n+1.' },
        { label: 'Between 1 and n+1, inclusive', isCorrect: true },
        { label: 'Between 1 and the maximum element', isCorrect: false, feedback: 'The maximum element could be 2³¹ − 1, but the answer is never larger than n+1. An array of n elements can contain at most n distinct positives in [1, n].' },
        { label: 'Always 1 if any negatives are present', isCorrect: false, feedback: 'Negatives are irrelevant — [−1, 1, 2] still has 3 as its first missing positive, not 1.' },
      ],
      correctFeedback: 'An array of n elements holds at most n distinct values. If it contains every integer from 1 to n, the first missing positive is n+1. Otherwise, the answer is somewhere in [1, n]. This bounds the search space and is why the array itself can serve as a lookup table.',
      wrongFeedback: [
        'The array has n slots. Can it hold every integer from 1 to n+1? What does that say about where the answer must land?',
        'Pigeonhole: n slots, n+1 possible values (1 through n+1). At least one of those values must be absent — and that absence is bounded.',
      ],
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 10⁵' },
    },
    {
      id: 'key-insight-array-as-hashmap',
      question: 'When you can\'t allocate new storage, the input itself has to double as your data structure. You need O(1) space but must track which positives in [1, n] are present — what can the array itself act as?',
      options: [
        { label: 'A sorted list of positives', isCorrect: false, feedback: 'Sorting is O(n log n) and doesn\'t encode presence in O(1) space without extra allocation.' },
        { label: 'A boolean presence map using index positions', isCorrect: true },
        { label: 'A stack of candidates to check', isCorrect: false, feedback: 'A stack is an O(n) auxiliary structure — the constraint forbids that.' },
        { label: 'A count of negative values', isCorrect: false, feedback: 'Negative counts don\'t tell you which positive integers are present — you need to track presence in the range [1, n].' },
      ],
      correctFeedback: 'Index i can represent "value i+1 is present." By placing each value in [1, n] at its corresponding index (or by marking indices with sign flips), the array encodes presence without extra space.',
      wrongFeedback: [
        'You know the answer is in [1, n+1]. The array has indices 0 through n−1. Is there a way to use those positions to record which values you\'ve seen?',
        'The array\'s indices map to the range [1, n]. Modifying what\'s stored at an index — without losing the original value — can encode a "seen" bit in O(1) space.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def first_missing_positive(self, nums):
        n = len(nums)
        for i in range(n):
            while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
                target = nums[i] - 1
                nums[i], nums[target] = nums[target], nums[i]
        for i in range(n):
            if nums[i] != i + 1:
                return i + 1
        return n + 1`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'The answer is always in <code>[1, n + 1]</code>: with n elements, the only way every one of 1..n could be present is if they fill every slot exactly, making <code>n + 1</code> the answer; any value outside <code>[1, n]</code> can never contribute to the answer and is simply left wherever it lands.',
  solutionExplanation: 'If the array were perfectly arranged, value <code>v</code> would sit at index <code>v - 1</code> — so the algorithm repeatedly swaps each value into that home position, skipping values already out of range or already correctly placed (or duplicated, which the <code>!=</code> check also catches to avoid an infinite swap loop). After this cleanup pass, the first index where <code>nums[i] != i + 1</code> reveals the first positive integer that never found a home; since swaps are bounded (each one places at least one value correctly), the whole rearrangement is still O(n) despite the nested-looking loop.',
}
