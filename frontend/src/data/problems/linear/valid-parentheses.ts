export default {
  id: 'valid-parentheses',
  title: 'Valid Parentheses',
  difficulty: 'easy',
  description: 'Given a string <code>s</code> containing only <code>(</code>, <code>)</code>, <code>{</code>, <code>}</code>, <code>[</code>, and <code>]</code>, return <code>true</code> if the input string is valid. An input string is valid if every open bracket is closed by the same type of bracket in the correct order.',
  examples: [
    { input: 's = "()"', output: 'true' },
    { input: 's = "()[]{}"', output: 'true' },
    { input: 's = "(]"', output: 'false' },
  ],
  constraints: [
    '1 ≤ s.length ≤ 10⁴',
    's consists of parentheses only',
  ],
  starterCode: `class Solution:
    def is_valid(self, s):
        pass`,
  runnerSetup: 'is_valid = Solution().is_valid',
  functionName: 'is_valid',
  conceptId: 'stacks-queues',
  testCases: [
    { label: 'Simple pair', args: ['()'], expected: true },
    { label: 'All types', args: ['()[]{}'], expected: true },
    { label: 'Mismatched', args: ['(]'], expected: false },
    { label: 'Wrong order', args: ['([)]'], expected: false },
    { label: 'Nested', args: ['{[]}'], expected: true },
  ],
  bruteHint: 'A brute-force approach repeatedly scans the string for any adjacent matching pair — such as "()", "[]", or "{}" — removes it, and restarts the scan from the beginning, continuing until no pairs remain to remove. Each full scan costs O(n) time, and deeply nested brackets can require up to O(n) scans, giving roughly O(n²) time overall. With s up to 10,000 characters long, how does this repeated rescanning compare to handling each character only once?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'last-in-first-out',
      question: 'Picking the right structure often comes down to how order must be preserved. "Every open bracket is closed by the same type in the correct order." What does "correct order" imply about the data structure you need?',
      highlight: { location: 'description', text: 'every open bracket is closed by the same type of bracket in the correct order.' },
      options: [
        { label: 'Match brackets in the order they were opened, oldest first', isCorrect: false, feedback: 'Matching oldest-first means "{[}" would incorrectly pair "[" with "}" before "[" is closed. You need the most-recently-opened bracket, not the oldest.' },
        { label: 'Match each closing bracket against the most recently opened bracket still unclosed', isCorrect: true },
        { label: 'Keep a running count of each bracket type seen', isCorrect: false, feedback: 'Counting opening and closing brackets of each type catches mismatches in quantity, but not order. "([)]" has balanced counts of each type yet is invalid — type-aware ordering requires tracking sequence, not just totals.' },
        { label: 'Track which bracket types have been opened, without regard to order', isCorrect: false, feedback: 'Recording presence, not ordering, fails here. "[{" and "{[" involve the same open bracket types, but only one ordering can be correctly closed — order must be tracked.' },
      ],
      correctFeedback: 'A stack mirrors the nesting: push open brackets, and when a close bracket arrives, the top of the stack must be its matching open. LIFO ensures the innermost open bracket is matched first.',
      wrongFeedback: [
        '"Correct order" means the most recently opened bracket must be closed first. What data structure gives you the most recently added item?',
        'In "{[}", the "[" was opened last and must be closed first. A stack (last in, first out) tracks that nesting without a queue\'s first-in-first-out mismatch.',
      ],
    },
    {
      id: 'three-bracket-types',
      question: 'Not every matching rule generalizes automatically once multiple symbol types are involved. s contains three types of brackets: (), [], {}. How does this affect the matching rule?',
      highlight: { location: 'description', text: 'containing only <code>(</code>, <code>)</code>, <code>{</code>, <code>}</code>, <code>[</code>, and <code>]</code>' },
      options: [
        { label: 'Any closing bracket can close any open bracket', isCorrect: false, feedback: '"(]" is explicitly invalid even though both sides have one open and one close bracket. Type must match — "(" must be closed by ")", not "]" or "}".' },
        { label: 'Each closing bracket must match the most recently opened bracket by type', isCorrect: true },
        { label: 'Count each type separately and verify all reach zero', isCorrect: false, feedback: 'Type-separated counts would accept "([)]" — each type balances — but the problem rejects it because "[" is closed by ")" before "]" appears. Order and type both matter.' },
        { label: 'Match brackets left to right regardless of type', isCorrect: false, feedback: 'Left-to-right matching without type checking would accept "(]" — the first open matches the first close. Type checking is the distinguishing rule.' },
      ],
      correctFeedback: 'When a close bracket arrives, pop the stack and verify it is the matching open type. Use a mapping like {")": "(", "]": "[", "}": "{"} for O(1) lookup.',
      wrongFeedback: [
        '"(]" is invalid. The close bracket is "]" but the open bracket was "(". What must be true between a close bracket and the top of the stack?',
        'Build a map from each close bracket to its expected open bracket. When you see ")", the top of the stack must be "(" — otherwise it\'s invalid.',
      ],
    },
    {
      id: 'empty-stack-check',
      question: 'Scanning the string once does not by itself rule out every invalid case — you also need a way to confirm nothing was left over. After processing all characters, what must be true for the string to be valid?',
      options: [
        { label: 'The last character was a closing bracket', isCorrect: false, feedback: '"()(" ends with "(" — an unclosed open bracket — but a last-character test would not catch it. Every previously opened bracket must have been matched by the end.' },
        { label: 'No unmatched open brackets remain', isCorrect: true },
        { label: 'The string length is even', isCorrect: false, feedback: 'Even length is necessary but not sufficient. "(]" has even length yet is invalid. Confirming nothing is left unmatched is the definitive check.' },
        { label: 'The number of unmatched brackets equals the number of bracket types seen', isCorrect: false, feedback: 'This has no meaningful relationship to validity. What matters is that every open bracket was closed in the correct order — that is, nothing is left unmatched.' },
      ],
      correctFeedback: 'A non-empty stack at the end means at least one open bracket was never closed. Return len(stack) == 0 as the final check.',
      wrongFeedback: [
        'What does it mean if the stack still has items after you\'ve processed every character?',
        'Leftover items in the stack are unmatched open brackets. A valid string leaves the stack empty — every push was eventually matched by a pop.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def is_valid(self, s):
        stack = []
        pairs = {')': '(', ']': '[', '}': '{'}
        for ch in s:
            if ch in '({[':
                stack.append(ch)
            elif not stack or stack[-1] != pairs[ch]:
                return False
            else:
                stack.pop()
        return not stack`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'The stack can hold up to n/2 characters in the worst case (a string of nothing but open brackets), so space is O(n) even though most valid inputs empty the stack well before the end.',
  solutionExplanation: 'Every open bracket goes onto the stack. Every close bracket must match whatever is currently on top — that\'s the most recently opened bracket still waiting to be closed, which is exactly what a stack (last in, first out) gives you for free. The <code>pairs</code> map turns "does this closing bracket match the top of the stack" into a single O(1) dictionary lookup instead of a chain of if/elif checks. Two failure conditions end the scan early: a closing bracket with nothing to match (empty stack), or a closing bracket that doesn\'t match what\'s on top (wrong type). If the string survives the whole scan, the final check — <code>not stack</code> — catches the one remaining failure mode: open brackets that were never closed at all.',
}
