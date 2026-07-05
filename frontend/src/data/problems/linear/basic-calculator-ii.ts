export default {
  id: 'basic-calculator-ii',
  title: 'Basic Calculator II',
  difficulty: 'medium',
  description: 'Given a string <code>s</code> representing an expression with non-negative integers, <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and spaces, evaluate and return the result as an integer. Integer division truncates toward zero.',
  examples: [
    { input: 's = "3+2*2"', output: '7' },
    { input: 's = " 3/2 "', output: '1' },
    { input: 's = " 3+5 / 2 "', output: '5' },
  ],
  constraints: ['1 ≤ s.length ≤ 3 × 10⁵', 's consists of digits, operators, and spaces', 'All operands fit in a 32-bit integer'],
  starterCode: `def calculate(s):
  pass`,
  functionName: 'calculate',
  conceptId: 'stack',
  testCases: [
    { label: 'Precedence', args: ['3+2*2'], expected: 7 },
    { label: 'Division', args: [' 3/2 '], expected: 1 },
    { label: 'Mixed', args: [' 3+5 / 2 '], expected: 5 },
    { label: 'Subtraction', args: ['10-3*2+1'], expected: 5 },
  ],
  clues: [
    {
      id: 'operator-precedence',
      question: 'The expression includes both + / - and * / /. What does operator precedence require?',
      options: [
        { label: 'Evaluate strictly left to right', isCorrect: false, feedback: 'Strict left-to-right evaluation gives "3+2*2" → 10, but the correct answer is 7. Multiplication must be resolved before addition.' },
        { label: 'Resolve * and / before + and -', isCorrect: true },
        { label: 'Use recursion for every operator', isCorrect: false, feedback: 'Recursion is needed for parentheses (Basic Calculator I), but this problem has no parentheses — precedence alone is the challenge.' },
        { label: 'Sort operators by precedence first', isCorrect: false, feedback: 'Sorting operators detaches them from their operands. Precedence is about evaluation order, not operator arrangement.' },
      ],
      correctFeedback: 'Multiplication and division bind tighter than addition and subtraction. You need a way to apply * and / immediately while deferring + and - terms until the end.',
      wrongFeedback: [
        'Try evaluating "3+2*2" left to right. What do you get? What should you get?',
        '* and / must complete before their results are added or subtracted. What structure lets you defer + and - while resolving * and / on the spot?',
      ],
    },
    {
      id: 'deferred-addition',
      question: 'After handling precedence, the result is a sum of terms. What does this imply about storage?',
      options: [
        { label: 'Track a single running total', isCorrect: false, feedback: 'A single running total cannot defer addition — you need to apply * and / before summing. Merging too early produces wrong results when a + follows a * operand.' },
        { label: 'Store each resolved term, sum at the end', isCorrect: true },
        { label: 'Store every character in a queue', isCorrect: false, feedback: 'Storing raw characters delays all processing. You need resolved numeric terms, not raw input characters.' },
        { label: 'Use two separate stacks for operands and operators', isCorrect: false, feedback: 'A two-stack approach is common for full expression parsers with parentheses. Without parentheses, one stack of resolved terms is sufficient.' },
      ],
      correctFeedback: 'Push each resolved term onto a stack (negating for subtraction), then sum everything at the end. This naturally handles precedence because * and / are resolved before their result is pushed.',
      wrongFeedback: [
        'Think about what you know once you hit a + or -: the previous term is fully resolved. Where can you put it so you can sum everything later?',
        'One stack holding resolved numeric terms — push on + or -, apply immediately on * or /. Sum the stack at the end.',
      ],
    },
    {
      id: 'truncation-toward-zero',
      question: '"Integer division truncates toward zero." How does this affect negative division?',
      options: [
        { label: 'Use Python floor division (//) directly', isCorrect: false, feedback: 'Python\'s // rounds toward negative infinity: -7 // 2 = -4, but truncate-toward-zero gives -3. For negative results these differ.' },
        { label: 'Truncation matches Python // for all cases', isCorrect: false, feedback: 'This is only true for positive results. For negative quotients, Python // floors while truncation rounds toward zero.' },
        { label: 'Use int(a / b) to truncate toward zero', isCorrect: true },
        { label: 'Truncation only matters for the final result', isCorrect: false, feedback: 'Division appears mid-expression, so truncation must be applied at each / operation, not just at the end.' },
      ],
      correctFeedback: 'int(a / b) in Python truncates toward zero for both positive and negative results. int(-7 / 2) = -3, while -7 // 2 = -4 — a meaningful difference.',
      wrongFeedback: [
        'Try -7 // 2 in Python. Now try int(-7 / 2). Are they the same?',
        'Python\'s floor division and truncation-toward-zero diverge for negative results. Which Python operation matches the problem\'s definition?',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 's.length ≤ 3 × 10⁵ tells you…',
      options: [
        { label: 'O(n²) string concatenation is fine', isCorrect: false, feedback: 'At 300,000 characters, O(n²) concatenation means up to 90 billion character copies. That exceeds any reasonable time limit.' },
        { label: 'O(n) single-pass parsing is required', isCorrect: true },
        { label: 'Pre-sort the string for faster lookup', isCorrect: false, feedback: 'Sorting a string expression destroys the token order the parser needs. The length constraint is about time, not search.' },
        { label: 'Input fits in memory; no constraint implied', isCorrect: false, feedback: 'The length directly bounds acceptable complexity. At 3 × 10⁵ characters, any approach slower than linear will time out.' },
      ],
      correctFeedback: 'A single left-to-right scan builds each number character by character and resolves terms when operators are encountered — O(n) time and O(n) space for the stack.',
      wrongFeedback: [
        'At s.length = 300,000, how many operations does O(n²) mean? Is that feasible?',
        'The string must be parsed in one pass. What does your algorithm do at each character?',
      ],
    },
  ],
}
