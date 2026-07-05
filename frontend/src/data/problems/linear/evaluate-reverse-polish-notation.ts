export default {
  id: 'evaluate-reverse-polish-notation',
  title: 'Evaluate Reverse Polish Notation',
  difficulty: 'medium',
  description: `<p>You are given an array of strings <code>tokens</code> that represents an arithmetic expression in Reverse Polish Notation. Evaluate the expression and return an integer representing the value of the expression.</p><p>Valid operators are <code>+</code>, <code>-</code>, <code>*</code>, and <code>/</code>. Integer division truncates toward zero.</p>`,
  examples: [
    { input: 'tokens = ["2","1","+","3","*"]', output: '9 ((2+1)*3)' },
    { input: 'tokens = ["4","13","5","/","+"]', output: '6 (4+(13/5))' },
  ],
  constraints: ['1 <= tokens.length <= 10^4', 'tokens[i] is either an operator or an integer'],
  starterCode: `def eval_rpn(tokens):
  pass`,
  functionName: 'eval_rpn',
  conceptId: 'stack',
  testCases: [
    { label: '(2+1)*3', args: [['2','1','+','3','*']], expected: 9 },
    { label: '4+(13/5)', args: [['4','13','5','/','+']],  expected: 6 },
    { label: 'negative', args: [['10','6','9','3','+','-11','*','/','+','17','+','5','+']], expected: 22 },
  ],
  clues: [
    {
      id: 'rpn-operand-order',
      question: 'In RPN, an operator always applies to the two most recently seen operands. What data structure matches this "most recent first" access pattern?',
      options: [
        { label: 'Queue (FIFO)', isCorrect: false, feedback: 'A queue returns the oldest element first. RPN operators need the two most recent operands — the exact opposite of FIFO order.' },
        { label: 'Stack (LIFO)', isCorrect: true },
        { label: 'Hash map for operand lookup', isCorrect: false, feedback: 'A hash map stores key-value pairs — there are no keys here, only a sequence of numbers to consume in arrival order. You need positional recency, not lookup.' },
        { label: 'Sorted array of operands', isCorrect: false, feedback: 'Sorting destroys the order in which operands arrived, which is exactly what determines what each operator acts on. RPN evaluation depends entirely on arrival sequence.' },
      ],
      correctFeedback: 'A stack pushes each number and pops the top two when an operator appears. LIFO order gives you exactly the most recently pushed pair every time.',
      wrongFeedback: [
        'When you see "+", which two numbers should you combine — the first two you saw, or the last two? What structure gives you the last-in items first?',
        'LIFO means last-in, first-out. Which structure works that way, and which gives you the two most recent numbers on demand?',
      ],
    },
    {
      id: 'constraint-token-count',
      question: 'tokens.length ≤ 10^4. What does this tell you about acceptable complexity?',
      options: [
        { label: 'O(n²) is fine at 10,000 tokens', isCorrect: false, feedback: 'O(n²) at n = 10,000 is 100 million operations. More importantly, each token requires at most one push or one pop — there is no reason for nested iteration.' },
        { label: 'O(n) is achievable and expected', isCorrect: true },
        { label: 'O(log n) is required', isCorrect: false, feedback: 'You must read every token at least once, so O(log n) is impossible. The constraint is generous enough that a single linear pass is all you need.' },
        { label: 'Input size doesn\'t constrain complexity here', isCorrect: false, feedback: 'Input size always informs complexity. At 10,000 tokens you can afford O(n), and the single-pass stack approach achieves exactly that.' },
      ],
      correctFeedback: 'Each token is processed once — either pushed onto the stack or used to pop two operands and push a result. That\'s O(n) time with O(n) stack space in the worst case.',
      wrongFeedback: [
        'How many times do you need to look at each token to evaluate it? Does any token require scanning others?',
        'Each token triggers either a push or a pop-pop-push. Count the operations per token — what total complexity does that give?',
      ],
    },
    {
      id: 'division-truncation',
      question: '"Integer division truncates toward zero." How does this differ from Python\'s default floor division?',
      options: [
        { label: 'They differ only for positive results', isCorrect: false, feedback: 'Positive results are identical for both: 7 // 2 = 3 and int(7 / 2) = 3. The difference only surfaces with negative operands.' },
        { label: 'They differ when the result is negative', isCorrect: true },
        { label: 'They are identical in all cases', isCorrect: false, feedback: 'Python\'s // rounds toward negative infinity: -7 // 2 = -4. Truncation toward zero gives -3. For any negative non-integer result, the two diverge.' },
        { label: 'Truncation applies only to the divisor', isCorrect: false, feedback: 'Truncation describes how the quotient is rounded — not anything about the divisor. The rule is: drop the fractional part, regardless of sign.' },
      ],
      correctFeedback: 'Python\'s // gives -7 // 2 = -4 (floor). Truncation toward zero gives int(-7 / 2) = -3. Use int() or math.trunc() instead of // when the result could be negative.',
      wrongFeedback: [
        'Try -7 ÷ 2 in Python with //. Now try int(-7 / 2). Do they give the same answer?',
        'Floor division rounds toward negative infinity. Truncation rounds toward zero. For negative results those are different directions — which does the problem require?',
      ],
    },
    {
      id: 'operator-operand-guarantee',
      question: '"tokens[i] is either an operator or an integer" — every token is valid and the expression is well-formed. What error handling does this let you skip?',
      options: [
        { label: 'Checking for division by zero', isCorrect: false, feedback: 'Well-formed expression doesn\'t mean division by zero is impossible — the integer 0 is a valid token. Division by zero can still occur and must be handled if the problem allows it (though test cases here avoid it).' },
        { label: 'Validating that tokens are parseable', isCorrect: true },
        { label: 'Handling mismatched operator counts', isCorrect: false, feedback: 'A well-formed RPN expression guarantees exactly one value remains on the stack at the end. You don\'t need to defend against malformed input like "1 + + 2".' },
        { label: 'Nothing — you must validate everything', isCorrect: false, feedback: 'The guarantee means every token is either a valid operator or a parseable integer. You can branch directly on whether the token is an operator without a try/except for parse errors.' },
      ],
      correctFeedback: 'Every token is guaranteed valid, so you can branch on operator vs. integer without try/except around int() conversions or unknown-operator checks. The expression is also guaranteed well-formed, so the stack will have exactly one value at the end.',
      wrongFeedback: [
        'If the problem guarantees every token is valid, what defensive checks become unnecessary?',
        'Think about what could go wrong parsing a token: unknown characters, malformed numbers. Does the guarantee eliminate those cases?',
      ],
    },
  ],
}
