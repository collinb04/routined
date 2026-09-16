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
  starterCode: `class Solution:
    def calculate(self, s):
        pass`,
  runnerSetup: 'calculate = Solution().calculate',
  functionName: 'calculate',
  conceptId: 'stack',
  testCases: [
    { label: 'Precedence', args: ['3+2*2'], expected: 7 },
    { label: 'Division', args: [' 3/2 '], expected: 1 },
    { label: 'Mixed', args: [' 3+5 / 2 '], expected: 5 },
    { label: 'Subtraction', args: ['10-3*2+1'], expected: 5 },
  ],
  bruteHint: 'A brute-force approach treats this like repeated string surgery: scan the expression for the first * or /, evaluate that one operation, and splice the result back into the string, then repeat until only + and - remain before summing the rest. Each scan-and-splice pass is O(n), and you may need up to O(n) passes to resolve every operator, so the whole thing runs in O(n²) time — rescanning and rebuilding the string over and over. At s.length up to 3 × 10⁵, how many character copies does that add up to, and would it finish in time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'operator-precedence',
      question: 'The mix of operators in an expression tells you what evaluation rules a correct solution must respect. The expression includes both + / - and * / /. What does operator precedence require?',
      options: [
        { label: 'Evaluate strictly left to right', isCorrect: false, feedback: 'Strict left-to-right evaluation gives "3+2*2" → 10, but the correct answer is 7. Multiplication must be resolved before addition.' },
        { label: 'Resolve * and / before + and -', isCorrect: true },
        { label: 'Re-run evaluation on each sub-expression', isCorrect: false, feedback: 'Recursion is needed for parentheses (Basic Calculator I), but this problem has no parentheses — precedence alone is the challenge.' },
        { label: 'Sort operators by precedence first', isCorrect: false, feedback: 'Sorting operators detaches them from their operands. Precedence is about evaluation order, not operator arrangement.' },
      ],
      correctFeedback: 'Multiplication and division bind tighter than addition and subtraction. You need a way to apply * and / immediately while deferring + and - terms until the end.',
      wrongFeedback: [
        'Try evaluating "3+2*2" left to right. What do you get? What should you get?',
        '* and / must complete before their results are added or subtracted. What structure lets you defer + and - while resolving * and / on the spot?',
      ],
      highlight: { location: 'description', text: '<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>' },
    },
    {
      id: 'deferred-addition',
      question: 'Recognizing what shape the final answer takes tells you what you need to hold onto while scanning. After handling precedence, the result is a sum of terms. What does this imply about storage?',
      options: [
        { label: 'Track a single running total', isCorrect: false, feedback: 'A single running total cannot defer addition — you need to apply * and / before summing. Merging too early produces wrong results when a + follows a * operand.' },
        { label: 'Store each resolved term, sum at the end', isCorrect: true },
        { label: 'Save every character before processing begins', isCorrect: false, feedback: 'Storing raw characters delays all processing. You need resolved numeric terms, not raw input characters.' },
        { label: 'Keep operands and operators in two matching sequences', isCorrect: false, feedback: 'A two-stack approach is common for full expression parsers with parentheses. Without parentheses, one stack of resolved terms is sufficient.' },
      ],
      correctFeedback: 'Push each resolved term onto a stack (negating for subtraction), then sum everything at the end. This naturally handles precedence because * and / are resolved before their result is pushed.',
      wrongFeedback: [
        'Think about what you know once you hit a + or -: the previous term is fully resolved. Where can you put it so you can sum everything later?',
        'One stack holding resolved numeric terms — push on + or -, apply immediately on * or /. Sum the stack at the end.',
      ],
    },
    {
      id: 'truncation-toward-zero',
      question: 'Precise wording about how an operation behaves tells you exactly which built-in will match it, especially at the edges. "Integer division truncates toward zero." How does this affect negative division?',
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
      highlight: { location: 'description', text: 'Integer division truncates toward zero.' },
    },
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. s.length ≤ 3 × 10⁵ tells you…',
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
      highlight: { location: 'constraint', text: '1 ≤ s.length ≤ 3 × 10⁵' },
    },
  ],
  solutionCode: `class Solution:
    def calculate(self, s):
        stack = []
        num = 0
        op = '+'
        s = s + '+'
        for ch in s:
            if ch.isdigit():
                num = num * 10 + int(ch)
            elif ch == ' ':
                continue
            else:
                if op == '+':
                    stack.append(num)
                elif op == '-':
                    stack.append(-num)
                elif op == '*':
                    stack.append(stack.pop() * num)
                elif op == '/':
                    stack.append(int(stack.pop() / num))
                op = ch
                num = 0
        return sum(stack)`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'Appending a trailing <code>+</code> to the string is what flushes the final number into the stack — without it, the last term never gets pushed since a number is only committed to the stack when the *next* operator is seen.',
  solutionExplanation: 'Every number is only resolved once the operator that follows it is known: on <code>+</code>/<code>-</code> it goes onto the stack as-is (negated for <code>-</code>), but on <code>*</code>/<code>/</code> it is immediately combined with whatever the stack\'s top already holds. That immediate combination is what makes multiplication and division bind tighter than addition — by the time a <code>+</code> or <code>-</code> is reached, every <code>*</code>/<code>/</code> before it has already been folded in, so summing the whole stack at the end is safe.',
}
