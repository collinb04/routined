export default {
  id: 'find-first-occurrence-string',
  title: 'Find the Index of the First Occurrence in a String',
  difficulty: 'easy',
  description: 'Given strings <code>haystack</code> and <code>needle</code>, return the index of the first occurrence of <code>needle</code> in <code>haystack</code>, or -1 if <code>needle</code> is not part of <code>haystack</code>.',
  examples: [
    { input: 'haystack = "sadbutsad", needle = "sad"', output: '0', explanation: '"sad" first appears at index 0.' },
    { input: 'haystack = "leetcode", needle = "leeto"', output: '-1' },
  ],
  constraints: ['1 ≤ haystack.length, needle.length ≤ 10⁴', 'Both strings consist of lowercase English letters'],
  starterCode: `class Solution:
    def str_str(self, haystack, needle):
        pass`,
  runnerSetup: 'str_str = Solution().str_str',
  functionName: 'str_str',
  conceptId: 'strings',
  testCases: [
    { label: 'Found at start', args: ['sadbutsad','sad'], expected: 0 },
    { label: 'Not found', args: ['leetcode','leeto'], expected: -1 },
    { label: 'Found in middle', args: ['hello','ll'], expected: 2 },
    { label: 'Empty needle', args: ['hello',''], expected: 0 },
  ],
  bruteHint: 'The brute-force approach checks every possible starting position in haystack, then compares needle against the substring beginning there, character by character. That works, but for a haystack of length n and needle of length m, it checks up to n × m characters in the worst case. At n and m each up to 10,000, how many comparisons is that, and would it finish in time?',
  optimizeComplexity: { time: 'O(n · m)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. haystack.length ≤ 10⁴ and needle.length ≤ 10⁴ — what does this tell you about acceptable time complexity?',
      options: [
        { label: 'O(n·m) is acceptable', isCorrect: true },
        { label: 'O(n) only; no inner loop allowed', isCorrect: false, feedback: 'O(n) would require KMP or Z-algorithm. At 10⁴ × 10⁴ = 100 million comparisons in the worst case, a naive approach is borderline but acceptable for these bounds — a smarter O(n) approach would matter at 10⁶.' },
        { label: 'O(log n) is achievable', isCorrect: false, feedback: 'Binary search finds a position in a sorted structure — it cannot locate a substring match by halving the search space.' },
        { label: 'O(1) is achievable here', isCorrect: false, feedback: 'You must inspect characters to find a match; constant time is not possible.' },
      ],
      correctFeedback: 'At most 10⁴ × 10⁴ = 100 million comparisons worst case — tight but not ruled out at these bounds. A sliding window of needle.length over haystack works.',
      wrongFeedback: [
        'Consider the worst case: haystack is 10⁴ characters, needle is 10⁴ characters. How many character comparisons could a naive scan perform?',
        'The product of both lengths is 10⁸ in the worst case. Is that ruled out, or borderline acceptable?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ haystack.length, needle.length ≤ 10⁴' },
    },
    {
      id: 'output-type',
      question: 'The type of output you\'re asked for tells you how much of the problem you actually need to solve. The output is an index, or -1 — what does the -1 case signal about your loop?',
      options: [
        { label: 'Return true/false, then derive index', isCorrect: false, feedback: 'The output is a position, not a boolean. You need to track where the match starts, not just whether one exists.' },
        { label: 'Return the match count', isCorrect: false, feedback: 'The problem asks for the first occurrence index, not how many times needle appears.' },
        { label: 'Return -1 as a sentinel after exhausting haystack', isCorrect: true },
        { label: 'Raise an exception if not found', isCorrect: false, feedback: 'The contract explicitly asks for -1, not an exception — return -1 after the scan finds nothing.' },
      ],
      correctFeedback: 'If no window in haystack matches needle, you\'ve exhausted all starting positions. -1 is the conventional sentinel for "not found" in index-return problems.',
      wrongFeedback: [
        'The function must return an index. What should it return when every possible starting position has been checked and none matched?',
        'The problem specifies -1 explicitly. That means your loop needs a fallback return after it finishes without finding a match.',
      ],
      highlight: { location: 'description', text: 'or -1 if' },
    },
    {
      id: 'first-occurrence',
      question: 'Specific wording in a problem statement tells you what work you can skip doing. "Return the index of the first occurrence." What does "first" let you skip?',
      options: [
        { label: 'You must scan all of haystack', isCorrect: false, feedback: '"First" means you stop at the earliest match — no need to scan past it looking for later ones.' },
        { label: 'You must collect all match positions', isCorrect: false, feedback: 'Collecting all positions would answer a different problem. "First occurrence" means you stop as soon as you find one.' },
        { label: 'You can return as soon as a match is found', isCorrect: true },
        { label: 'You only need to check needle[0] against haystack', isCorrect: false, feedback: 'A first-character match is just the start of a candidate — you still need to verify the full needle at that position.' },
      ],
      correctFeedback: 'The first match you find is the answer. You can return its starting index immediately without scanning the rest of haystack.',
      wrongFeedback: [
        'If "first occurrence" is what you need, what can you do the moment a full match is confirmed?',
        'Guarantees about what you need ("first") are also permissions about what you can skip. What work becomes unnecessary once a match is confirmed?',
      ],
      highlight: { location: 'description', text: 'the first occurrence' },
    },
  ],
  solutionCode: `class Solution:
    def str_str(self, haystack, needle):
        n, m = len(haystack), len(needle)
        for i in range(n - m + 1):
            if haystack[i:i + m] == needle:
                return i
        return -1`,
  solutionComplexity: { time: 'O(n · m)', space: 'O(1)' },
  solutionExplanation: 'Every window of length <code>len(needle)</code> is a candidate match, and there are only <code>n - m + 1</code> of them, so checking each one directly against <code>needle</code> and returning the first success is already the direct, "first occurrence" reading of the problem — no need to build any auxiliary structure (like a KMP failure table) unless the O(n · m) worst case genuinely needs to come down.',
}
