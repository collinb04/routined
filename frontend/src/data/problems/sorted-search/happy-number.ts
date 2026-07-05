export default {
  id: 'happy-number',
  title: 'Happy Number',
  difficulty: 'easy',
  description: 'A number is "happy" if repeatedly replacing it with the sum of the squares of its digits eventually reaches 1. Return <code>true</code> if <code>n</code> is a happy number, <code>false</code> otherwise.',
  examples: [
    { input: 'n = 19', output: 'true', explanation: '1² + 9² = 82 → 68 → 100 → 1.' },
    { input: 'n = 2', output: 'false', explanation: 'Enters a cycle that never reaches 1.' },
  ],
  constraints: ['1 ≤ n ≤ 2³¹ − 1'],
  starterCode: `def is_happy(n):
  pass`,
  functionName: 'is_happy',
  conceptId: 'math-geometry',
  testCases: [
    { label: '19 is happy', args: [19], expected: true },
    { label: '2 is not happy', args: [2], expected: false },
    { label: '1 is happy', args: [1], expected: true },
    { label: '7 is happy', args: [7], expected: true },
    { label: '4 is not happy', args: [4], expected: false },
  ],
  clues: [
    {
      id: 'termination-condition',
      question: '"Enters a cycle that never reaches 1." For unhappy numbers, the process loops forever. What does this tell you about when to stop?',
      options: [
        { label: 'Run a fixed number of iterations', isCorrect: false, feedback: 'A fixed iteration count would either miss the answer for slow-converging happy numbers or terminate too early. The real signal is whether a value repeats — that\'s a cycle, not a count.' },
        { label: 'Detect a repeated value to identify a cycle', isCorrect: true },
        { label: 'Stop when the number exceeds 2³¹ − 1', isCorrect: false, feedback: 'The sum of squared digits always shrinks large numbers quickly — n = 2³¹ − 1 ≈ 2 billion reduces to at most 9² × 10 = 810 after one step. The number won\'t grow past a small bound, so overflow is not the termination signal.' },
        { label: 'Stop when the number becomes odd', isCorrect: false, feedback: 'Parity has no bearing on happiness. The number 1 is odd and happy; 4 is even and not. The relevant condition is whether the sequence reaches 1 or cycles.' },
      ],
      correctFeedback: 'Unhappy numbers enter a cycle — a value they\'ve seen before. A hash set of visited values detects this in O(1) per lookup. When you see a repeat, you know you\'re looping and can return false.',
      wrongFeedback: [
        'The sequence either reaches 1 (happy) or repeats a value (cycle, not happy). How do you detect that a value has appeared before?',
        'Keep a set of every value you\'ve processed. If the next value is already in the set, you\'ve found the cycle.',
      ],
    },
    {
      id: 'digit-sum-computation',
      question: '"Sum of the squares of its digits." For n = 19: 1² + 9² = 82. What operation extracts digits one at a time?',
      options: [
        { label: 'Convert to string, iterate characters', isCorrect: false, feedback: 'String conversion works, but it\'s not the only approach. The arithmetic approach uses n % 10 to get the last digit and n // 10 to remove it — no string conversion needed.' },
        { label: 'Use n % 10 and n // 10 in a loop', isCorrect: true },
        { label: 'Take the square root of n', isCorrect: false, feedback: 'The square root of n is unrelated to extracting digits. You need the individual decimal digits of n, not a root.' },
        { label: 'Divide n by the number of digits', isCorrect: false, feedback: 'Dividing by digit count doesn\'t isolate individual digits. The modulo-10 / integer-divide-10 loop is the standard digit extraction pattern.' },
      ],
      correctFeedback: 'n % 10 gives the units digit; n // 10 removes it. Repeat until n == 0. This extracts all digits in O(log n) steps, which is the number of digits.',
      wrongFeedback: [
        'To get the last digit of 19, what is 19 % 10? To remove that digit, what is 19 // 10?',
        'Each iteration: digit = n % 10, square it and add to the sum, then n = n // 10. Stop when n == 0.',
      ],
    },
    {
      id: 'cycle-detection-alternative',
      question: 'A hash set detects cycles, but Floyd\'s cycle detection (slow/fast pointers) also works. What property of this sequence makes both valid?',
      options: [
        { label: 'The sequence is monotonically decreasing', isCorrect: false, feedback: 'The sequence is not monotone — n = 19 goes 19 → 82, which is an increase. The sequence bounces unpredictably before either reaching 1 or cycling.' },
        { label: 'Every value deterministically produces exactly one next value', isCorrect: true },
        { label: 'The sequence always enters the cycle at the same point', isCorrect: false, feedback: 'Different unhappy numbers enter different cycles at different points. The shared property is that each value has exactly one successor, making both set-based and pointer-based detection valid.' },
        { label: 'The cycle length is always the same', isCorrect: false, feedback: 'Cycle lengths vary. The common unhappy cycle visits {4, 16, 37, 58, 89, 145, 42, 20}, but different starting points may enter it at different values. Cycle length is not fixed.' },
      ],
      correctFeedback: 'This is a functional graph: each integer has exactly one successor (the digit-square sum). That determinism means a sequence must either terminate at 1 or eventually revisit a node — the two conditions both cycle detectors look for.',
      wrongFeedback: [
        'Both a set and slow/fast pointers detect cycles in sequences. What must be true about the sequence for either method to be guaranteed to work?',
        'If a value could map to multiple successors, the path would branch and Floyd\'s method would break. One value → one successor is what makes the sequence a detectable cycle.',
      ],
    },
  ],
}
