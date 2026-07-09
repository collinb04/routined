export default {
  id: 'generate-parentheses',
  title: 'Generate Parentheses',
  difficulty: 'medium',
  description: `<p>Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.</p>`,
  examples: [
    { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]' },
    { input: 'n = 1', output: '["()"]' },
  ],
  constraints: ['1 <= n <= 8'],
  starterCode: `def generate_parenthesis(n):
  pass`,
  functionName: 'generate_parenthesis_run',
  conceptId: 'stack',
  runnerSetup: `def generate_parenthesis_run(n):
  return sorted(generate_parenthesis(n))`,
  testCases: [
    { label: 'n=3', args: [3], expected: ['((()))','(()())','(())()','()(())','()()()'] },
    { label: 'n=1', args: [1], expected: ['()'] },
  ],
  bruteHint: 'Describe generating all 2^(2n) sequences of parentheses and filtering the valid ones, and why that wastes work',
  optimizeHint: 'Name the technique that only adds a parenthesis when doing so keeps the sequence valid so far',
  clues: [
    {
      id: 'small-n-constraint',
      question: '1 ≤ n ≤ 8. The number of valid combinations grows as the nth Catalan number (~4^n / n^1.5). What does the small bound tell you about the expected approach?',
      options: [
        { label: 'Dynamic programming over all substrings', isCorrect: false, feedback: 'DP over substrings works for problems with overlapping subproblems on a fixed string. Here you are generating all valid strings from scratch — the structure is a decision tree, not a substring table.' },
        { label: 'Exhaustive generation (backtracking) is acceptable', isCorrect: true },
        { label: 'A greedy rule produces all combinations', isCorrect: false, feedback: 'Greedy algorithms produce one optimal answer; they can\'t enumerate all valid combinations. You need a strategy that explores every valid choice at each step.' },
        { label: 'O(n²) iteration is sufficient', isCorrect: false, feedback: 'The output itself has up to Catalan(8) ≈ 1430 strings, each of length 2n = 16. Simple O(n²) iteration can\'t enumerate them — you need a tree-search strategy.' },
      ],
      correctFeedback: 'At n = 8, Catalan(8) = 1430 valid strings. Backtracking generates each one by making constrained choices at each position, and the small bound means the full search tree is manageable.',
      wrongFeedback: [
        'The output is a list of all valid strings, not a single answer. What kind of algorithm generates all solutions rather than the best one?',
        'n ≤ 8 is tiny — the brute-force search space won\'t explode. What technique systematically explores all possibilities and discards invalid ones early?',
      ],
    },
    {
      id: 'well-formed-constraint',
      question: '"Well-formed parentheses" — what two rules govern when you can place each character?',
      options: [
        { label: 'Open count ≤ n; close count ≤ open count', isCorrect: true },
        { label: 'Alternate open and close at every step', isCorrect: false, feedback: 'Alternating would only produce "()()()" — it prevents valid nested forms like "((()))". The rules are about counts, not strict alternation.' },
        { label: 'Open and close counts must always be equal', isCorrect: false, feedback: 'Equal counts at every step would mean you close as soon as you open, which again only produces "()". Counts become equal only at completion — during construction, open count leads.' },
        { label: 'Any prefix with more opens than closes', isCorrect: false, feedback: 'This is the necessary condition (close count ≤ open count) but it\'s incomplete — you also need open count ≤ n to avoid placing more than n open brackets.' },
      ],
      correctFeedback: 'You can add "(" when open < n, and ")" when close < open. These two rules prune the tree to only well-formed strings — no validation pass needed at the end.',
      wrongFeedback: [
        'At any point in building the string, what makes it safe to place "("? And what makes it safe to place ")"?',
        'Think about two separate counters: opens placed so far, closes placed so far. What inequality must hold to add each type?',
      ],
    },
    {
      id: 'output-all-combinations',
      question: 'The output is all combinations, not a count or a single example. What does this tell you about your recursion\'s base case?',
      options: [
        { label: 'Stop when open equals close', isCorrect: false, feedback: 'Open equaling close is the validity condition at any prefix, not the terminal state. The base case is when the full string of length 2n is complete.' },
        { label: 'Stop and collect when string length reaches 2n', isCorrect: false },
        { label: 'Stop and record when string reaches length 2n', isCorrect: true },
        { label: 'Stop at the first valid combination found', isCorrect: false, feedback: 'Stopping at the first result would give one answer, not all of them. You need every leaf of the recursion tree that produces a complete string.' },
      ],
      correctFeedback: 'The recursion bottoms out when you have placed exactly n opens and n closes — total length 2n. At that point the string is guaranteed well-formed and gets appended to the result list.',
      wrongFeedback: [
        'Each valid string has exactly 2n characters. When does a recursive branch "finish" and add its result to the output?',
        'You\'re building a string one character at a time. What condition marks a complete, valid string ready to collect?',
      ],
    },
  ],
}
