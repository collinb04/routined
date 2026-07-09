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
  starterCode: `def is_valid(s):
  pass`,
  functionName: 'is_valid',
  conceptId: 'stacks-queues',
  testCases: [
    { label: 'Simple pair', args: ['()'], expected: true },
    { label: 'All types', args: ['()[]{}'], expected: true },
    { label: 'Mismatched', args: ['(]'], expected: false },
    { label: 'Wrong order', args: ['([)]'], expected: false },
    { label: 'Nested', args: ['{[]}'], expected: true },
  ],
  bruteHint: 'Describe repeatedly scanning for and removing matched adjacent pairs until none remain, and its time complexity',
  optimizeHint: 'Name the data structure that validates the string in one pass by matching each closing bracket against the top',
  clues: [
    {
      id: 'last-in-first-out',
      question: '"Every open bracket is closed by the same type in the correct order." What does "correct order" imply about the data structure you need?',
      options: [
        { label: 'A queue (FIFO) to match brackets in order', isCorrect: false, feedback: 'A queue matches the first open bracket with the first close bracket. But "{[}" would incorrectly match "[" with "}" before "[" is closed. You need the most-recently-opened bracket, not the oldest.' },
        { label: 'A stack (LIFO) to match the most recent open bracket', isCorrect: true },
        { label: 'A counter for each bracket type', isCorrect: false, feedback: 'Counting opening and closing brackets of each type catches mismatches in quantity, but not order. "([)]" has balanced counts of each type yet is invalid — type-aware ordering requires a stack.' },
        { label: 'A set of seen open brackets', isCorrect: false, feedback: 'A set records presence, not ordering. "[{" and "{[" have the same set of open brackets, but only one ordering can be correctly closed — order must be tracked.' },
      ],
      correctFeedback: 'A stack mirrors the nesting: push open brackets, and when a close bracket arrives, the top of the stack must be its matching open. LIFO ensures the innermost open bracket is matched first.',
      wrongFeedback: [
        '"Correct order" means the most recently opened bracket must be closed first. What data structure gives you the most recently added item?',
        'In "{[}", the "[" was opened last and must be closed first. A stack (last in, first out) tracks that nesting without a queue\'s first-in-first-out mismatch.',
      ],
    },
    {
      id: 'three-bracket-types',
      question: 's contains three types of brackets: (), [], {}. How does this affect the matching rule?',
      options: [
        { label: 'Any closing bracket can close any open bracket', isCorrect: false, feedback: '"(]" is explicitly invalid even though both sides have one open and one close bracket. Type must match — "(" must be closed by ")", not "]" or "}".' },
        { label: 'Each closing bracket must match the top open bracket by type', isCorrect: true },
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
      question: 'After processing all characters, what must be true for the string to be valid?',
      options: [
        { label: 'The last character was a closing bracket', isCorrect: false, feedback: '"()(" ends with "(" — an unclosed open bracket — but your last character test would not catch it. The stack must be empty to confirm every open bracket was matched.' },
        { label: 'The stack is empty', isCorrect: true },
        { label: 'The string length is even', isCorrect: false, feedback: 'Even length is necessary but not sufficient. "(]" has even length yet is invalid. An empty stack at the end is the definitive check.' },
        { label: 'The stack size equals the number of bracket types seen', isCorrect: false, feedback: 'Stack size has no meaningful relationship to bracket types. An empty stack means every open bracket was closed in the correct order — that\'s the required condition.' },
      ],
      correctFeedback: 'A non-empty stack at the end means at least one open bracket was never closed. Return len(stack) == 0 as the final check.',
      wrongFeedback: [
        'What does it mean if the stack still has items after you\'ve processed every character?',
        'Leftover items in the stack are unmatched open brackets. A valid string leaves the stack empty — every push was eventually matched by a pop.',
      ],
    },
  ],
}
