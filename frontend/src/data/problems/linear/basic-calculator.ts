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
  starterCode: `class Solution:
    def calculate(self, s):
        pass`,
  runnerSetup: 'calculate = Solution().calculate',
  functionName: 'calculate',
  conceptId: 'stack',
  testCases: [
    { label: 'Simple', args: ['1 + 1'], expected: 2 },
    { label: 'With subtraction', args: [' 2-1 + 2 '], expected: 3 },
    { label: 'With parens', args: ['(1+(4+5+2)-3)+(6+8)'], expected: 23 },
  ],
  bruteHint: 'A brute-force approach recursively locates each matching closing parenthesis, evaluates the substring inside it, and substitutes the result back into the string before continuing outward. Finding each match requires its own scan, and every substitution means the surrounding expression gets rescanned from where it left off. For deeply nested expressions near the 3 × 10⁵ character limit, this repeated substitution-and-rescan pattern costs O(n²) time. What would let you evaluate the whole expression in a single pass instead of rebuilding the string each time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'parentheses-nesting',
      question: 'Certain syntax in a problem signals that you can\'t process the input in one flat left-to-right pass — you need to pause and resume partial work. The expression contains nested parentheses like "(1+(4+5+2)-3)". What does nesting imply about processing?',
      options: [
        { label: 'Scan ahead for each closing paren\'s match, then evaluate', isCorrect: false, feedback: 'Two pointers find one matching pair, but nesting means you must handle the inner result before the outer can proceed — a linear scan with two pointers cannot track that recursively.' },
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
      question: 'The operators a problem explicitly excludes tell you what logic you get to skip entirely. The problem explicitly excludes * and /. What does this simplify?',
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
      highlight: { location: 'description', text: 'No multiplication or division.' },
    },
    {
      id: 'sign-tracking',
      question: 'Recognizing that one operation is just a special case of another can collapse two code paths into one. Subtraction like "2-1" is the same as "2 + (-1)". What does this suggest?',
      options: [
        { label: 'Parse subtraction as a separate operator type', isCorrect: false, feedback: 'Treating subtraction as its own operator requires extra branching. Converting it to signed addition unifies the logic.' },
        { label: 'Track a sign multiplier (+1 or -1) per term', isCorrect: true },
        { label: 'Negate the entire expression on a minus', isCorrect: false, feedback: 'A minus only negates the immediately following term, not everything that follows. Negating the whole expression would corrupt subsequent additions.' },
        { label: 'Track subtracted terms completely separately from added ones', isCorrect: false, feedback: 'Tracking them separately adds unnecessary complexity. A single sign variable (+1 or -1) applied to each number before adding it to the total is sufficient.' },
      ],
      correctFeedback: 'Maintain a sign variable that flips on -. Multiply each number by the current sign before adding it to the running total. This works uniformly across flat and nested expressions.',
      wrongFeedback: [
        'If you treat every operator as addition with a signed number, how do you represent subtraction without a special branch?',
        'A sign variable — set to +1 at the start, flipped to -1 on minus — lets you write: total += sign * number. How does that simplify your loop?',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. s.length ≤ 3 × 10⁵ tells you…',
      options: [
        { label: 'Multiple passes over the string are fine', isCorrect: false, feedback: 'Even two passes is acceptable, but nested parentheses require saving state that makes a stack natural. Multiple passes scanning for matching parens would be O(n²) in the worst case.' },
        { label: 'O(n) single-pass is the target', isCorrect: true },
        { label: 'O(log n) is achievable', isCorrect: false, feedback: 'You cannot evaluate an expression in less than O(n) time — you must read every character. O(log n) would require skipping input, which is not possible here.' },
        { label: 'Length is irrelevant since only + and - are used', isCorrect: false, feedback: 'The length still bounds complexity. At 3 × 10⁵ characters, a quadratic approach — like repeated inner-expression substitution — would time out.' },
      ],
      correctFeedback: 'One left-to-right pass handles every character in O(1) per step. The stack depth is bounded by nesting level, not string length, so total space is also O(n).',
      wrongFeedback: [
        'At 300,000 characters, how many operations does your approach use in the worst case?',
        'Each character is visited once. What is the overall time complexity if each step is O(1)?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ s.length ≤ 3 × 10⁵' },
    },
  ],
  solutionCode: `class Solution:
    def calculate(self, s):
        stack = []
        total = 0
        num = 0
        sign = 1
        for ch in s:
            if ch.isdigit():
                num = num * 10 + int(ch)
            elif ch in '+-':
                total += sign * num
                num = 0
                sign = 1 if ch == '+' else -1
            elif ch == '(':
                stack.append(total)
                stack.append(sign)
                total = 0
                sign = 1
            elif ch == ')':
                total += sign * num
                num = 0
                total *= stack.pop()
                total += stack.pop()
                sign = 1
        return total + sign * num`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'On <code>(</code>, both the running <code>total</code> *and* the current <code>sign</code> get pushed — not just the total. That sign is what a later <code>)</code> multiplies back in, which is exactly what correctly distributes a leading minus across an entire parenthesized group, e.g. the <code>-3</code> in <code>(1+(4+5+2)-3)</code>.',
  solutionExplanation: 'A running <code>sign</code> variable turns every subtraction into an addition of a negated number, so there is only one code path for <code>+</code> and <code>-</code> instead of two. Parentheses are handled the way a call stack handles nested calls: hitting <code>(</code> freezes the outer expression\'s partial total and sign by pushing them, and hitting <code>)</code> resumes exactly where it left off by popping them back and folding the inner result in — which is what lets the sign in front of a <code>(</code> apply correctly to everything inside it.',
}
