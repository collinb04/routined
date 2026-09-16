export default {
  id: 'string-to-integer-atoi',
  title: 'String to Integer (atoi)',
  difficulty: 'medium',
  description: 'Implement <code>atoi</code>: read leading whitespace, parse optional sign, then read digits until a non-digit or end of string. Clamp the result to the 32-bit signed integer range.',
  examples: [
    { input: 's = "42"', output: '42' },
    { input: 's = "   -42"', output: '-42' },
    { input: 's = "4193 with words"', output: '4193' },
  ],
  constraints: ['0 ≤ s.length ≤ 200', 's consists of English letters, digits, \' \', \'+\', \'-\', \'.\''],
  starterCode: `class Solution:
    def my_atoi(self, s):
        pass`,
  runnerSetup: 'my_atoi = Solution().my_atoi',
  functionName: 'my_atoi',
  conceptId: 'strings',
  testCases: [
    { label: 'Simple', args: ['42'], expected: 42 },
    { label: 'Negative with spaces', args: ['   -42'], expected: -42 },
    { label: 'Letters after', args: ['4193 with words'], expected: 4193 },
    { label: 'Overflow', args: ['99999999999'], expected: 2147483647 },
    { label: 'Empty', args: [''], expected: 0 },
  ],
  bruteHint: 'A naive parse might lean on separate string operations: strip leading whitespace with one pass, slice off an optional sign with another, grab the leading digit run with a regex or repeated slicing, then finally compare the accumulated number against the bounds. Each step is its own pass over a shrinking piece of the string, so the whole thing is still roughly linear but touches the characters several times over. If a single left-to-right walk could track whitespace, sign, digits, and bounds all at once, what do the extra passes and intermediate strings actually buy you?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'sequential-parsing-steps',
      question: 'Which technique fits often depends on the order operations must happen in. "read leading whitespace, parse optional sign" — the description lists steps in order: skip whitespace → parse sign → read digits → stop at non-digit. What approach does this sequence suggest?',
      highlight: { location: 'description', text: 'read leading whitespace, parse optional sign' },
      options: [
        { label: 'Split the string on spaces', isCorrect: false, feedback: 'Splitting on spaces discards the structure you need. The sign and digits follow immediately after leading spaces — splitting would separate them.' },
        { label: 'A single left-to-right scan that tracks which stage of parsing you are in', isCorrect: true },
        { label: 'Extract the number by matching one predefined pattern in a single step', isCorrect: false, feedback: 'A pattern match can work but obscures the state transitions the problem is actually testing. A manual scan with an index pointer models each step explicitly.' },
        { label: 'Reverse the string and scan right to left', isCorrect: false, feedback: 'The order of steps (whitespace → sign → digits) is left-to-right. Reversing destroys that order and makes sign detection harder.' },
      ],
      correctFeedback: 'The ordered steps map directly to parser states: SKIP_SPACE → SIGN → DIGITS → DONE. A single pass with an index tracks which state you are in.',
      wrongFeedback: [
        'Each step builds on the previous one and must happen in order. What kind of scan processes characters left to right, one state at a time?',
        'Think of the problem as a state machine: you start in one mode, transition to another, and stop. A single pointer walking left to right handles all transitions.',
      ],
    },
    {
      id: 'stop-on-non-digit',
      question: 'Knowing exactly where parsing stops rules out entire categories of error-handling behavior. "read digits until a non-digit or end of string" — what does this tell you about how to handle a non-digit character?',
      highlight: { location: 'description', text: 'read digits until a non-digit or end of string' },
      options: [
        { label: 'Return 0 if any non-digit appears', isCorrect: false, feedback: '"4193 with words" returns 4193, not 0. Non-digits after the digit run end parsing — they do not invalidate digits already read.' },
        { label: 'Stop reading and return what you have', isCorrect: true },
        { label: 'Skip non-digits and continue', isCorrect: false, feedback: 'Skipping non-digits would turn "4193 with words" into 4193words — an incorrect parse. Only the leading digit run counts.' },
        { label: 'Raise an exception for invalid characters', isCorrect: false, feedback: 'The problem explicitly defines valid behavior for non-digit characters: stop. There is no error case — non-digits are valid terminators.' },
      ],
      correctFeedback: 'A non-digit is a terminator, not an error. Return the integer built from digits consumed so far and stop — exactly what "4193 with words" → 4193 demonstrates.',
      wrongFeedback: [
        'Look at the example "4193 with words" → 4193. The space stops parsing. What does that mean for how you treat non-digits?',
        'Non-digits end the digit run. You do not discard what came before — you just stop accumulating and return.',
      ],
    },
    {
      id: 'clamp-to-32bit',
      question: 'Knowing the valid output range rules out certain results before you even finish computing them. "Clamp the result to the 32-bit signed integer range." The 32-bit signed range is [−2,147,483,648, 2,147,483,647]. What must you handle?',
      highlight: { location: 'description', text: 'Clamp the result to the 32-bit signed integer range.' },
      options: [
        { label: 'Return None for values outside the range', isCorrect: false, feedback: 'The problem says clamp, not reject. "99999999999" should return 2,147,483,647 — the closest valid value, not None.' },
        { label: 'Cap the value at INT_MIN or INT_MAX before returning', isCorrect: true },
        { label: 'Use Python int to avoid overflow', isCorrect: false, feedback: 'Python ints do not overflow, but that is irrelevant — the problem requires clamping the output to the 32-bit range regardless of what Python can represent internally.' },
        { label: 'Check for overflow only when digits exceed 10', isCorrect: false, feedback: 'Digit count alone is not a reliable overflow detector. "2147483648" has 10 digits but still overflows. Compare against INT_MAX = 2,147,483,647 directly.' },
      ],
      correctFeedback: 'After parsing, if the value exceeds 2,147,483,647 return 2,147,483,647; if below −2,147,483,648 return −2,147,483,648. This clamping is a required output constraint, not optional.',
      wrongFeedback: [
        'The test case "99999999999" expects 2,147,483,647, not the actual number. What does "clamp" mean for values outside the range?',
        'Clamping means: if the result would exceed the boundary, return the boundary itself. What are the two boundaries you need to check against?',
      ],
    },
    {
      id: 'empty-string-edge',
      question: 'Boundary constraints often hide edge cases that a general algorithm must still handle gracefully. "0 ≤ s.length ≤ 200" means the string can be empty. What should the output be for an empty input?',
      highlight: { location: 'constraint', text: '0 ≤ s.length ≤ 200' },
      options: [
        { label: '0', isCorrect: true },
        { label: 'Raise an exception', isCorrect: false, feedback: 'An empty string is a valid input per the constraint. The parser finds no digits and should return 0 — the natural result of accumulating nothing.' },
        { label: '-1 as a sentinel value', isCorrect: false, feedback: 'The problem does not define a sentinel for failure. An empty string produces 0 because no digits were read — consistent with how atoi behaves on empty input.' },
        { label: 'The sign character if present', isCorrect: false, feedback: 'An empty string has no characters at all. The output is 0 because the digit accumulator starts at 0 and is never updated.' },
      ],
      correctFeedback: 'No digits found means the accumulator stays at 0. An empty string (or a string with only whitespace or only a sign) all return 0.',
      wrongFeedback: [
        'What value does a digit accumulator hold before any digits are read? What does reading zero digits return?',
        'Start the accumulator at 0. If parsing ends without consuming any digits, what do you return?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def my_atoi(self, s):
        i = 0
        n = len(s)
        while i < n and s[i] == ' ':
            i += 1
        sign = 1
        if i < n and s[i] in '+-':
            if s[i] == '-':
                sign = -1
            i += 1
        num = 0
        while i < n and s[i].isdigit():
            num = num * 10 + int(s[i])
            i += 1
        num *= sign
        INT_MAX = 2**31 - 1
        INT_MIN = -2**31
        if num > INT_MAX:
            return INT_MAX
        if num < INT_MIN:
            return INT_MIN
        return num`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'Clamping happens only *after* the sign has already been applied to the accumulated digits — clamping the unsigned digit total first and then negating would silently give the wrong bound for negative numbers, since <code>-2³¹</code> and <code>2³¹ - 1</code> are not symmetric around zero.',
  solutionExplanation: 'The description\'s own ordering — whitespace, then sign, then digits, then stop — maps directly onto four sequential stretches of one left-to-right scan, each stopping the instant its condition fails rather than needing a lookahead or a separate pass. Multiplying by the sign only at the very end (after accumulating a purely positive digit total) keeps the digit-accumulation loop simple, and comparing against the 32-bit bounds as the last step catches overflow without needing to check after every single digit.',
}
