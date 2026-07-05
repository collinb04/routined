export default {
  id: 'basic-calculator',
  title: 'Basic Calculator',
  difficulty: 'hard',
  description: 'Implement a basic calculator to evaluate a string expression containing <code>+</code>, <code>-</code>, parentheses, and non-negative integers. No multiplication or division.',
  examples: [
    { input: 's = "1 + 1"', output: '2' },
    { input: 's = " 2-1 + 2 "', output: '3' },
    { input: 's = "(1+(4+5+2)-3)+(6+8)"', output: '23' },
  ],
  constraints: ['1 ≤ s.length ≤ 3 × 10⁵', 's contains only digits, \'+\', \'-\', \'(\', \')\', and spaces', 'Expression is valid'],
  starterCode: `def calculate(s):
  pass`,
  functionName: 'calculate',
  conceptId: 'stack',
  testCases: [
    { label: 'Simple', args: ['1 + 1'], expected: 2 },
    { label: 'With subtraction', args: [' 2-1 + 2 '], expected: 3 },
    { label: 'With parens', args: ['(1+(4+5+2)-3)+(6+8)'], expected: 23 },
  ],
  clues: [
    {
      id: 'parentheses-nesting',
      question: 'The expression contains nested parentheses like "(1+(4+5+2)-3)". What does nesting imply about processing?',
      options: [
        { label: 'Find matching parens with two pointers', isCorrect: false, feedback: 'Two pointers find one matching pair, but nesting means you must handle the inner result before the outer can proceed — a linear scan with two pointers cannot track that recursively.' },
        { label: 'Replace parens with their values first', isCorrect: false, feedback: 'Replacing innermost parens iteratively works but requires multiple passes over the string — O(n²) for deeply nested expressions at n = 3 × 10⁵.' },
        { label: 'Save context on open paren, restore on close paren', isCorrect: true },
        { label: 'Evaluate left to right, parens don\'t change order', isCorrect: false, feedback: 'Parentheses explicitly override left-to-right order. "(1+(4+5+2)-3)" requires the inner sum to complete before it is subtracted.' },
      ],
      correctFeedback: 'On every ( you push the current running total and sign onto the stack; on every ) you pop them and combine. This mirrors how a call stack handles nested function calls.',
      wrongFeedback: [
        'When you encounter (, you are not done with the outer expression yet. Where can you store its partial result while you work on the inner one?',
        'Think of each ( as pausing the current calculation. A stack lets you pause and resume in LIFO order — matching exactly how nesting works.',
      ],
    },
    {
      id: 'no-multiplication-division',
      question: 'The problem explicitly excludes * and /. What does this simplify?',
      options: [
        { label: 'No precedence differences to handle', isCorrect: true },
        { label: 'Evaluation is still non-trivial due to parens', isCorrect: false, feedback: 'This is true but not the simplification implied by the constraint. The absence of * and / specifically removes the need to handle operator precedence between terms.' },
        { label: 'You can ignore signs entirely', isCorrect: false, feedback: 'Signs still matter — subtraction flips the sign of the following term. The absence of * and / does not remove + and - from the problem.' },
        { label: 'The string can be evaluated with eval()', isCorrect: false, feedback: 'Using eval() may work in some contexts but bypasses the algorithmic insight the problem is testing. Also, it does not apply in constrained environments.' },
      ],
      correctFeedback: 'Without * and /, every term at the same nesting level has equal precedence. You only need to track the current sign (+ or -) and running total — no deferred-multiplication logic needed.',
      wrongFeedback: [
        'Compare Basic Calculator I and II. What does II need that I does not, given the operators each contains?',
        'Precedence only matters when * or / mix with + or -. Without them, what is the only thing you need to track per term?',
      ],
    },
    {
      id: 'sign-tracking',
      question: 'Subtraction like "2-1" is the same as "2 + (-1)". What does this suggest?',
      options: [
        { label: 'Parse subtraction as a separate operator type', isCorrect: false, feedback: 'Treating subtraction as its own operator requires extra branching. Converting it to signed addition unifies the logic.' },
        { label: 'Track a sign multiplier (+1 or -1) per term', isCorrect: true },
        { label: 'Negate the entire expression on a minus', isCorrect: false, feedback: 'A minus only negates the immediately following term, not everything that follows. Negating the whole expression would corrupt subsequent additions.' },
        { label: 'Use a second stack for subtracted terms', isCorrect: false, feedback: 'A second stack adds unnecessary complexity. A single sign variable (+1 or -1) applied to each number before adding it to the total is sufficient.' },
      ],
      correctFeedback: 'Maintain a sign variable that flips on -. Multiply each number by the current sign before adding it to the running total. This works uniformly across flat and nested expressions.',
      wrongFeedback: [
        'If you treat every operator as addition with a signed number, how do you represent subtraction without a special branch?',
        'A sign variable — set to +1 at the start, flipped to -1 on minus — lets you write: total += sign * number. How does that simplify your loop?',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 's.length ≤ 3 × 10⁵ tells you…',
      options: [
        { label: 'Multiple passes over the string are fine', isCorrect: false, feedback: 'Even two passes is acceptable, but nested parentheses require saving state that makes a stack natural. Multiple passes scanning for matching parens would be O(n²) in the worst case.' },
        { label: 'O(n) single-pass is the target', isCorrect: true },
        { label: 'O(log n) is achievable with binary search', isCorrect: false, feedback: 'You cannot evaluate an expression in less than O(n) time — you must read every character. O(log n) would require skipping input, which is not possible here.' },
        { label: 'Length is irrelevant since only + and - are used', isCorrect: false, feedback: 'The length still bounds complexity. At 3 × 10⁵ characters, a quadratic approach — like repeated inner-expression substitution — would time out.' },
      ],
      correctFeedback: 'One left-to-right pass handles every character in O(1) per step. The stack depth is bounded by nesting level, not string length, so total space is also O(n).',
      wrongFeedback: [
        'At 300,000 characters, how many operations does your approach use in the worst case?',
        'Each character is visited once. What is the overall time complexity if each step is O(1)?',
      ],
    },
  ],
}
