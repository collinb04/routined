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
  starterCode: `def my_atoi(s):
  pass`,
  functionName: 'my_atoi',
  conceptId: 'strings',
  testCases: [
    { label: 'Simple', args: ['42'], expected: 42 },
    { label: 'Negative with spaces', args: ['   -42'], expected: -42 },
    { label: 'Letters after', args: ['4193 with words'], expected: 4193 },
    { label: 'Overflow', args: ['99999999999'], expected: 2147483647 },
    { label: 'Empty', args: [''], expected: 0 },
  ],
  bruteHint: 'Describe a naive parse that skips careful validation of whitespace, sign, digits, and overflow in order',
  optimizeHint: 'Explain how handling overflow clamping and invalid input robustly in one pass makes this correct',
  clues: [
    {
      id: 'sequential-parsing-steps',
      question: 'The description lists steps in order: skip whitespace → parse sign → read digits → stop at non-digit. What approach does this sequence suggest?',
      options: [
        { label: 'Split the string on spaces', isCorrect: false, feedback: 'Splitting on spaces discards the structure you need. The sign and digits follow immediately after leading spaces — splitting would separate them.' },
        { label: 'A single left-to-right scan with a state machine', isCorrect: true },
        { label: 'Use regex to extract the number', isCorrect: false, feedback: 'Regex can work but obscures the state transitions the problem is actually testing. A manual scan with an index pointer models each step explicitly.' },
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
      question: '"Read digits until a non-digit or end of string." What does this tell you about error handling?',
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
      question: '"Clamp the result to the 32-bit signed integer range." The 32-bit signed range is [−2,147,483,648, 2,147,483,647]. What must you handle?',
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
      question: '"0 ≤ s.length ≤ 200" means the string can be empty. What should the output be for an empty input?',
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
}
