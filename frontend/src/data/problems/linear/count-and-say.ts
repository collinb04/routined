export default {
  id: 'count-and-say',
  title: 'Count and Say',
  difficulty: 'medium',
  description: 'The count-and-say sequence starts with "1". Each subsequent term describes the previous: "11" (one 1), "21" (two 1s), "1211" (one 2, one 1), etc. Given <code>n</code>, return the nth term.',
  examples: [
    { input: 'n = 1', output: '"1"' },
    { input: 'n = 4', output: '"1211"', explanation: '1→11→21→1211.' },
  ],
  constraints: ['1 ≤ n ≤ 30'],
  starterCode: `class Solution:
    def count_and_say(self, n):
        pass`,
  runnerSetup: 'count_and_say = Solution().count_and_say',
  functionName: 'count_and_say',
  conceptId: 'strings',
  testCases: [
    { label: 'n=1', args: [1], expected: '1' },
    { label: 'n=2', args: [2], expected: '11' },
    { label: 'n=4', args: [4], expected: '1211' },
    { label: 'n=5', args: [5], expected: '111221' },
  ],
  bruteHint: 'The naive way to build each next term is to grow the result via repeated string concatenation — scanning the previous term character by character and doing result += str(count) + digit as you go — which reallocates a new string object on every append and costs roughly O(L²) for a term of length L. Term lengths grow almost exponentially as n increases (each application of the rule tends to lengthen the string, roughly ×1.3 per step per Conway\'s cosmological theorem), so that per-term quadratic cost compounds badly across all n−1 iterations if you\'re not careful. What changes about your running time if you collect each (count)(digit) piece in a list and join once, instead of concatenating on every character you emit?',
  optimizeComplexity: { time: 'O(n · L)', space: 'O(L)' },
  clues: [
    {
      id: 'iterative-generation',
      question: 'A dependency chain between steps tells you whether you can compute an answer directly or must build up to it one step at a time. Each term is built by describing the previous one. What does this dependency imply about computation?',
      options: [
        { label: 'Compute term n directly from n using a formula', isCorrect: false, feedback: 'There is no closed-form formula for the nth term — each term is uniquely determined by reading the previous one character by character.' },
        { label: 'Build terms iteratively from term 1 up to term n', isCorrect: true },
        { label: 'Reverse-engineer term n from the output string', isCorrect: false, feedback: 'The sequence is not reversible in a useful way. The only path to term n is forward through terms 1, 2, …, n−1.' },
        { label: 'Precompute every term from 1 to 30 in advance', isCorrect: false, feedback: 'Precomputing all 30 terms is unnecessary — you only need to compute up to the requested n, and each step only needs the previous term.' },
      ],
      correctFeedback: 'Start with "1" and apply the run-length description n−1 times. Each application reads the current string and emits counts followed by digits.',
      wrongFeedback: [
        'To get term 4, you need term 3. To get term 3, you need term 2. What starting point lets you build forward?',
        'Build the sequence one step at a time: term[i] = describe(term[i−1]). You need n−1 applications starting from "1".',
      ],
      highlight: { location: 'description', text: 'Each subsequent term describes the previous' },
    },
    {
      id: 'run-length-encoding',
      question: 'Specific wording in a problem statement often encodes a known technique in disguise, and naming it correctly saves you from reinventing it from scratch. Each term describes runs of identical digits in the previous term. What technique does this match?',
      options: [
        { label: 'Counting total digit frequency', isCorrect: false, feedback: 'Frequency counts collapse all occurrences globally. Run-length encoding groups consecutive identical characters — position matters.' },
        { label: 'Group consecutive identical characters and count the length of each group', isCorrect: true },
        { label: 'Reversing the string character by character', isCorrect: false, feedback: 'Reversal does not produce the count-and-say output. "21" reversed is "12", but "21" means two 1s — a completely different operation.' },
        { label: 'Splitting the string at digit boundaries', isCorrect: false, feedback: 'Count-and-say does not split on digit type — it groups consecutive identical characters regardless of what digit they are.' },
      ],
      correctFeedback: 'Scan left to right, counting how long each run of the same digit lasts. When the digit changes (or you reach the end), emit the count then the digit.',
      wrongFeedback: [
        'Read "1211" aloud: one 1, one 2, two 1s. What algorithm produces "111221" from that reading?',
        'Group consecutive identical digits and count each group. Emit (count)(digit) for every group in order.',
      ],
      highlight: { location: 'description', text: '"11" (one 1), "21" (two 1s), "1211" (one 2, one 1)' },
    },
    {
      id: 'constraint-small-n',
      question: 'The size constraint tells you how much runtime slack you have, though a tiny bound can also hide where the real cost actually lives. n ≤ 30 is a very small bound. What does this tell you about the approach?',
      options: [
        { label: 'O(2ⁿ) growth is fine at this size', isCorrect: false, feedback: 'Even n = 30 makes O(2ⁿ) about 1 billion operations, and the string lengths grow far faster than 2ⁿ anyway.' },
        { label: 'Simplicity is fine; string length, not n, is the real cost', isCorrect: true },
        { label: 'Skip directly to term n without deriving earlier terms', isCorrect: false, feedback: 'There is no monotone property to binary-search. Each term must be derived from the one before it.' },
        { label: 'You can skip intermediate terms by doubling', isCorrect: false, feedback: 'There is no doubling shortcut — term n depends on the full content of term n−1, not just its length.' },
      ],
      correctFeedback: 'With n ≤ 30, the loop runs at most 29 times. The bottleneck is the length of the strings (which can grow substantially), not n itself — your inner loop runs in O(length of current term).',
      wrongFeedback: [
        'With n at most 30, how many iterations does your outer loop run? What drives the actual runtime?',
        'The outer loop is bounded by 30. The inner scan is bounded by the string length at each step. What grows as n increases — n or the string length?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 30' },
    },
    {
      id: 'output-structure',
      question: 'The type of output you\'re asked for tells you how much of the problem you actually need to solve, and what kind of value you need to build up. The output is a string, not a number. What does this tell you about building the result?',
      options: [
        { label: 'Accumulate a numeric sum', isCorrect: false, feedback: 'The output is a string of digits, not an integer. "1211" is not the number 1211 — it is a sequence of characters to be read as a description.' },
        { label: 'Concatenate (count)(digit) pairs into a new string', isCorrect: true },
        { label: 'Return the count of distinct digits', isCorrect: false, feedback: 'The output is the full encoded string, not a count of how many distinct digits appeared.' },
        { label: 'Convert each count to binary before appending', isCorrect: false, feedback: 'Counts in the sequence are always single-digit (consecutive runs never exceed 3 in practice), and the output uses decimal digit characters.' },
      ],
      correctFeedback: 'For each run of length count with digit d, append str(count) + d to the result. Building the string character by character avoids repeated concatenation overhead.',
      wrongFeedback: [
        'Each run contributes exactly two characters to the next term: the count and the digit. How do you accumulate those pairs into the output string?',
        'Use a list to collect str(count) + digit for each run, then join at the end. This avoids O(n²) string concatenation overhead.',
      ],
      highlight: { location: 'description', text: 'return the nth term' },
    },
  ],
  solutionCode: `class Solution:
    def count_and_say(self, n):
        result = "1"
        for _ in range(n - 1):
            next_result = []
            i = 0
            while i < len(result):
                j = i
                while j < len(result) and result[j] == result[i]:
                    j += 1
                next_result.append(str(j - i))
                next_result.append(result[i])
                i = j
            result = "".join(next_result)
        return result`,
  solutionComplexity: { time: 'O(n · L)', space: 'O(L)' },
  solutionExplanation: 'Each term is built by scanning the previous one and, at every run of identical characters, recording the run\'s length followed by the character itself — exactly what "count and say" means. Collecting each <code>(count)(digit)</code> piece into a list and joining once, instead of concatenating string-by-string, avoids the O(L²) cost of repeated string reallocation as terms grow across the <code>n - 1</code> iterations.',
}
