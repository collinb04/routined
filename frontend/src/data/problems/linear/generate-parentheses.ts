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
  starterCode: `class Solution:
    def generate_parenthesis(self, n):
        pass`,
  functionName: 'generate_parenthesis_run',
  conceptId: 'stack',
  runnerSetup: `def generate_parenthesis_run(n):
  return sorted(Solution().generate_parenthesis(n))`,
  testCases: [
    { label: 'n=3', args: [3], expected: ['((()))','(()())','(())()','()(())','()()()'] },
    { label: 'n=1', args: [1], expected: ['()'] },
  ],
  bruteHint: 'One approach is to generate all 2^(2n) sequences of \'(\' and \')\' and filter out the ones that aren\'t valid. For n = 8 that\'s 2^16 = 65,536 candidate strings, most of which get thrown away, and each still needs an O(n) validity scan. What would let you avoid building the invalid ones in the first place?',
  optimizeComplexity: { time: 'O(4ⁿ / √n)', space: 'O(4ⁿ / √n)' },
  clues: [
    {
      id: 'small-n-constraint',
      question: 'The size bound tells you how exhaustive a search you can afford — a tiny n permits an approach that would never scale to a large one. 1 ≤ n ≤ 8. The number of valid combinations grows as the nth Catalan number (~4^n / n^1.5). What does the small bound tell you about the expected approach?',
      options: [
        { label: 'Build a table of results for overlapping subproblems', isCorrect: false, feedback: 'That works for problems with overlapping subproblems on a fixed input. Here you are generating all valid strings from scratch — the structure is a decision tree, not a table to fill in.' },
        { label: 'Exhaustively exploring choices and backing out of dead ends is acceptable', isCorrect: true },
        { label: 'A single best-choice rule produces all combinations', isCorrect: false, feedback: 'A rule that always makes one "best" choice produces one answer; it can\'t enumerate all valid combinations. You need a strategy that explores every valid choice at each step.' },
        { label: 'O(n²) iteration is sufficient', isCorrect: false, feedback: 'The output itself has up to Catalan(8) ≈ 1430 strings, each of length 2n = 16. Simple O(n²) iteration can\'t enumerate them — you need a tree-search strategy.' },
      ],
      correctFeedback: 'At n = 8, Catalan(8) = 1430 valid strings. Exploring choices and abandoning dead ends generates each one by making constrained decisions at each position, and the small bound means the full search tree is manageable.',
      wrongFeedback: [
        'The output is a list of all valid strings, not a single answer. What kind of algorithm generates all solutions rather than the best one?',
        'n ≤ 8 is tiny — the brute-force search space won\'t explode. What technique systematically explores all possibilities and discards invalid ones early?',
      ],
      highlight: { location: 'constraint', text: '1 <= n <= 8' },
    },
    {
      id: 'well-formed-constraint',
      question: 'Key vocabulary in a problem statement often encodes a precise rule that constrains every step of construction, not just the final answer. "Well-formed parentheses" — what two rules govern when you can place each character?',
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
      highlight: { location: 'description', text: 'well-formed parentheses' },
    },
    {
      id: 'output-all-combinations',
      question: 'The type of output you\'re asked for tells you how your recursion should terminate — collecting everything versus stopping at one answer are different base cases. The output is all combinations, not a count or a single example. What does this tell you about your recursion\'s base case?',
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
      highlight: { location: 'description', text: 'generate all combinations' },
    },
  ],
  solutionCode: `class Solution:
    def generate_parenthesis(self, n):
        result = []
        def backtrack(current, open_count, close_count):
            if len(current) == 2 * n:
                result.append(current)
                return
            if open_count < n:
                backtrack(current + '(', open_count + 1, close_count)
            if close_count < open_count:
                backtrack(current + ')', open_count, close_count + 1)
        backtrack('', 0, 0)
        return result`,
  solutionComplexity: { time: 'O(4ⁿ / √n)', space: 'O(4ⁿ / √n)' },
  solutionCaveat: 'The <code>close_count < open_count</code> guard is what keeps every generated string well-formed as it\'s built, rather than generating everything and filtering afterward — a closing paren is only ever attempted when there\'s an unmatched opening one still waiting for it.',
  solutionExplanation: 'Building the string one character at a time and only ever taking a move that *cannot* lead to an invalid result prunes the search down to exactly the valid combinations, instead of generating all 2^(2n) bit-strings and checking each one afterward. An opening paren is always safe to add as long as fewer than <code>n</code> have been used; a closing paren is only safe once it has an unmatched opening paren to pair with, which is exactly what <code>close_count < open_count</code> checks.',
}
