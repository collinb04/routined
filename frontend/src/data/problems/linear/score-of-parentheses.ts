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
  starterCode: `class Solution:
    def score_of_parentheses(self, s):
        pass`,
  runnerSetup: 'score_of_parentheses = Solution().score_of_parentheses',
  functionName: 'score_of_parentheses',
  conceptId: 'stack',
  testCases: [
    { label: '()', args: ['()'], expected: 1 },
    { label: '(())', args: ['(())'], expected: 2 },
    { label: '()()', args: ['()()'], expected: 2 },
    { label: 'Nested', args: ['(()(()))'], expected: 6 },
  ],
  bruteHint: "A brute-force approach recursively finds each top-level matched pair, computes the score of what is inside it, and combines the results — re-scanning nested substrings from scratch at every level of recursion. This repeated re-parsing of already-visited characters costs O(n²) time in the worst case as nesting depth grows. What work are you redoing every time you recurse into a substring you have already partially scanned?",
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'nesting-structure',
      question: 'Rules that build results from the inside out often signal you need to track work at each level rather than a single running total. The rule "(A) = 2 * A" means a closing bracket doubles whatever is inside it. What does this imply about tracking depth?',
      highlight: { location: 'description', text: '"(A)" = 2 * A.' },
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
      question: 'Matching a problem\'s access pattern (most-recent-first vs. first-in-first-out) to a structure is often the key design decision. You need to combine scores at the current nesting level and retrieve the enclosing level when a ")" is seen. What structure supports this?',
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
      question: 'Base cases must be consistent with the general rule, or your formula silently breaks on the simplest input. "()" scores 1 — a pair with nothing inside. How does this interact with the doubling rule "(A) = 2 * A"?',
      highlight: { location: 'description', text: '"()" = 1' },
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
      question: 'Guarantees about input validity let you skip entire classes of error-handling you would otherwise need to write. The constraint says s is a balanced parentheses string. What does this let you skip?',
      highlight: { location: 'constraint', text: 's is a balanced parentheses string' },
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
  solutionCode: `class Solution:
    def score_of_parentheses(self, s):
        stack = [0]
        for ch in s:
            if ch == '(':
                stack.append(0)
            else:
                v = stack.pop()
                stack[-1] += max(2 * v, 1)
        return stack[0]`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: '<code>max(2 * v, 1)</code> handles both scoring rules in one expression: an empty pair ("()", where <code>v</code> is still 0) scores 1, while a pair wrapping something scores twice whatever that something was worth — the <code>max</code> just selects whichever rule actually applies.',
  solutionExplanation: 'Each stack frame accumulates the score of everything at its own nesting depth, starting at 0 when a new <code>(</code> opens a level. Closing that level with <code>)</code> finalizes its score and folds it into the level below multiplied by 2 (since "(A)" doubles A) — unless nothing was inside, in which case it contributes exactly 1 for the bare "()" pair. Because scores only ever get added to the level directly below, sibling groups like in "()()" naturally sum together in the bottom frame without any special-casing.',
}
