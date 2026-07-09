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
  starterCode: `def count_and_say(n):
  pass`,
  functionName: 'count_and_say',
  conceptId: 'strings',
  testCases: [
    { label: 'n=1', args: [1], expected: '1' },
    { label: 'n=2', args: [2], expected: '11' },
    { label: 'n=4', args: [4], expected: '1211' },
    { label: 'n=5', args: [5], expected: '111221' },
  ],
  bruteHint: 'Describe simulating each term by scanning the previous term character by character to build the next one, and note what drives the complexity',
  optimizeHint: 'Name the technique for building the next term in a single pass — collecting run-lengths into a list and joining once, rather than repeated string concatenation',
  clues: [
    {
      id: 'iterative-generation',
      question: 'Each term is built by describing the previous one. What does this dependency imply about computation?',
      options: [
        { label: 'Compute term n directly from n using a formula', isCorrect: false, feedback: 'There is no closed-form formula for the nth term — each term is uniquely determined by reading the previous one character by character.' },
        { label: 'Build terms iteratively from term 1 up to term n', isCorrect: true },
        { label: 'Reverse-engineer term n from the output string', isCorrect: false, feedback: 'The sequence is not reversible in a useful way. The only path to term n is forward through terms 1, 2, …, n−1.' },
        { label: 'Memoize all terms from 1 to 30 upfront', isCorrect: false, feedback: 'Precomputing all 30 terms is unnecessary — you only need to compute up to the requested n, and each step only needs the previous term.' },
      ],
      correctFeedback: 'Start with "1" and apply the run-length description n−1 times. Each application reads the current string and emits counts followed by digits.',
      wrongFeedback: [
        'To get term 4, you need term 3. To get term 3, you need term 2. What starting point lets you build forward?',
        'Build the sequence one step at a time: term[i] = describe(term[i−1]). You need n−1 applications starting from "1".',
      ],
    },
    {
      id: 'run-length-encoding',
      question: 'Each term describes runs of identical digits in the previous term. What technique does this match?',
      options: [
        { label: 'Counting total digit frequency', isCorrect: false, feedback: 'Frequency counts collapse all occurrences globally. Run-length encoding groups consecutive identical characters — position matters.' },
        { label: 'Run-length encoding of consecutive characters', isCorrect: true },
        { label: 'Reversing the string character by character', isCorrect: false, feedback: 'Reversal does not produce the count-and-say output. "21" reversed is "12", but "21" means two 1s — a completely different operation.' },
        { label: 'Splitting the string at digit boundaries', isCorrect: false, feedback: 'Count-and-say does not split on digit type — it groups consecutive identical characters regardless of what digit they are.' },
      ],
      correctFeedback: 'Scan left to right, counting how long each run of the same digit lasts. When the digit changes (or you reach the end), emit the count then the digit.',
      wrongFeedback: [
        'Read "1211" aloud: one 1, one 2, two 1s. What algorithm produces "111221" from that reading?',
        'Group consecutive identical digits and count each group. Emit (count)(digit) for every group in order.',
      ],
    },
    {
      id: 'constraint-small-n',
      question: 'n ≤ 30 is a very small bound. What does this tell you about the approach?',
      options: [
        { label: 'O(2ⁿ) recursion is acceptable', isCorrect: false, feedback: 'Even n = 30 makes O(2ⁿ) about 1 billion operations, and the string lengths grow far faster than 2ⁿ anyway.' },
        { label: 'Simplicity is fine; string length, not n, is the real cost', isCorrect: true },
        { label: 'Binary search on n is possible', isCorrect: false, feedback: 'There is no monotone property to binary-search. Each term must be derived from the one before it.' },
        { label: 'You can skip intermediate terms by doubling', isCorrect: false, feedback: 'There is no doubling shortcut — term n depends on the full content of term n−1, not just its length.' },
      ],
      correctFeedback: 'With n ≤ 30, the loop runs at most 29 times. The bottleneck is the length of the strings (which can grow substantially), not n itself — your inner loop runs in O(length of current term).',
      wrongFeedback: [
        'With n at most 30, how many iterations does your outer loop run? What drives the actual runtime?',
        'The outer loop is bounded by 30. The inner scan is bounded by the string length at each step. What grows as n increases — n or the string length?',
      ],
    },
    {
      id: 'output-structure',
      question: 'The output is a string, not a number. What does this tell you about building the result?',
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
    },
  ],
}
