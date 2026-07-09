export default {
  id: 'score-of-parentheses',
  title: 'Score of Parentheses',
  difficulty: 'medium',
  description: 'Given a balanced parentheses string <code>s</code>, return its score. Rules: "()" = 1, "AB" = A + B, "(A)" = 2 * A.',
  examples: [
    { input: 's = "()"', output: '1' },
    { input: 's = "(())"', output: '2' },
    { input: 's = "()()"', output: '2' },
    { input: 's = "(()(()))"', output: '6' },
  ],
  constraints: ['2 ≤ s.length ≤ 50', 's consists of \'(\' and \')\' only', 's is a balanced parentheses string'],
  starterCode: `def score_of_parentheses(s):
  pass`,
  functionName: 'score_of_parentheses',
  conceptId: 'stack',
  testCases: [
    { label: '()', args: ['()'], expected: 1 },
    { label: '(())', args: ['(())'], expected: 2 },
    { label: '()()', args: ['()()'], expected: 2 },
    { label: 'Nested', args: ['(()(()))'], expected: 6 },
  ],
  bruteHint: 'Describe recursively re-parsing matched substrings to compute their scores, and explain why that repeats work',
  optimizeHint: 'Name the structure that tracks accumulated scores at each nesting depth in a single pass',
  clues: [
    {
      id: 'nesting-structure',
      question: 'The rule "(A) = 2 * A" means a closing bracket doubles whatever is inside it. What does this imply about tracking depth?',
      options: [
        { label: 'Count characters linearly', isCorrect: false, feedback: 'A simple character count ignores the doubling structure. "(())" has 4 characters but a score of 2, not 4.' },
        { label: 'Scores are computed inside-out', isCorrect: true },
        { label: 'Sort substrings by depth', isCorrect: false, feedback: 'Sorting destroys the order, but the scoring rules depend on nesting structure, not sorted order.' },
        { label: 'Evaluate left to right with a counter', isCorrect: false, feedback: 'A plain counter tracks depth but loses the partial scores at each level. You need to combine scores from inner levels when you encounter a closing bracket.' },
      ],
      correctFeedback: 'When you hit a closing bracket, you need the score of what is directly inside it to apply the doubling rule. Processing inside-out means tracking partial scores at each nesting level.',
      wrongFeedback: [
        'When you encounter a ")", you need the value of what was inside that pair. How do you know that value before you have fully processed the string?',
        'The result of an inner group is needed the moment its ")" is seen. What data structure naturally gives you "the most recently opened, not-yet-closed group"?',
      ],
    },
    {
      id: 'data-structure-choice',
      question: 'You need to combine scores at the current nesting level and retrieve the enclosing level when a ")" is seen. What structure supports this?',
      options: [
        { label: 'A queue (FIFO)', isCorrect: false, feedback: 'A queue retrieves the oldest item first. You need the most recently opened level — that is last-in, first-out behavior.' },
        { label: 'A stack (LIFO)', isCorrect: true },
        { label: 'A hash map of depths to scores', isCorrect: false, feedback: 'A map can store scores per depth, but once you leave a depth you need to pop it cleanly. A stack already encodes depth by its height.' },
        { label: 'Two separate counters', isCorrect: false, feedback: 'Two counters work only for a fixed nesting depth. Arbitrary nesting depth requires a structure that grows and shrinks dynamically.' },
      ],
      correctFeedback: 'A stack holds the running score at each open nesting level. On "(", push 0. On ")", pop the inner score, apply the rule, and add the result to the new top.',
      wrongFeedback: [
        'Opening brackets add a new level; closing brackets resolve the innermost level and merge it upward. Which structure handles "open a new scope / close the most recent scope"?',
        'The key operation is: when ")" arrives, retrieve and remove the score of the innermost level. Which access pattern is that — first-in-first-out, or last-in-first-out?',
      ],
    },
    {
      id: 'base-case-rule',
      question: '"()" scores 1 — a pair with nothing inside. How does this interact with the doubling rule "(A) = 2 * A"?',
      options: [
        { label: 'Handle "()" as a separate special case', isCorrect: false },
        { label: 'Push 1 when ")" sees an empty top', isCorrect: false, feedback: 'This mixes two separate mechanisms. The stack approach pushes 0 on "(" and lets the ")" rule unify both cases naturally.' },
        { label: 'Treat "()" as "(0)" doubled, then add 1', isCorrect: false, feedback: '2 * 0 = 0, not 1. Doubling an empty interior does not produce the base score of 1.' },
        { label: 'Use max(2 * inner, 1) when closing', isCorrect: true },
      ],
      correctFeedback: 'When a ")" closes an empty interior (inner score = 0), max(2 * 0, 1) = 1 — the base case. When the interior is non-empty, 2 * inner gives the correct doubled score.',
      wrongFeedback: [
        'The base case "()" = 1 and the rule "(A) = 2 * A" must agree. What is 2 * 0, and how does that fail to produce 1?',
        'You need a single expression that handles both "()" → 1 and "(A)" → 2*A. What single formula covers both when the inner score can be 0 or positive?',
      ],
    },
    {
      id: 'balanced-guarantee',
      question: 'The constraint says s is a balanced parentheses string. What does this let you skip?',
      options: [
        { label: 'Checking for mismatched brackets', isCorrect: true },
        { label: 'Handling the empty string case', isCorrect: false, feedback: 'The minimum length is 2, so the empty string is already excluded. But the balanced guarantee specifically removes a different class of validation.' },
        { label: 'Tracking which bracket type was opened', isCorrect: false, feedback: 'There is only one bracket type here — "(" and ")". Mismatched types are not possible by the input definition.' },
        { label: 'Validating that scores are positive', isCorrect: false, feedback: 'Scores are always positive by the scoring rules themselves. The balanced guarantee removes the need for structural error checking, not value checking.' },
      ],
      correctFeedback: 'A balanced string is guaranteed to be valid — every "(" has a matching ")". You can process the string without any error branches for unmatched brackets.',
      wrongFeedback: [
        'What would you normally have to verify when processing a parentheses string? Which of those checks becomes unnecessary when the string is guaranteed balanced?',
        'The balanced guarantee means your stack will never be empty when a ")" arrives and will be empty when the string ends. What validation code does that eliminate?',
      ],
    },
  ],
}
