export default {
  id: 'power-x-n',
  title: 'Pow(x, n)',
  difficulty: 'medium',
  description: 'Implement <code>pow(x, n)</code>, which calculates <code>x</code> raised to the power <code>n</code>. Use fast exponentiation (O(log n)) rather than repeated multiplication.',
  examples: [
    { input: 'x = 2.0, n = 10', output: '1024.0' },
    { input: 'x = 2.1, n = 3', output: '9.261', explanation: '2.1³ = 9.261000000000001, rounded.' },
    { input: 'x = 2.0, n = -2', output: '0.25', explanation: '1/4.' },
  ],
  constraints: ['-100.0 < x < 100.0', '-2³¹ ≤ n ≤ 2³¹ − 1', 'n is an integer', 'Either x ≠ 0 or n > 0'],
  starterCode: `def my_pow(x, n):
  pass`,
  functionName: 'my_pow',
  conceptId: 'math-geometry',
  testCases: [
    { label: '2^10', args: [2.0, 10], expected: 1024.0 },
    { label: 'Negative exp', args: [2.0, -2], expected: 0.25 },
    { label: 'n=0', args: [5.0, 0], expected: 1.0 },
    { label: 'n=1', args: [3.0, 1], expected: 3.0 },
  ],
  bruteHint: 'Describe multiplying x by itself n times in a loop and its time complexity',
  optimizeHint: 'Name the technique that repeatedly squares the base and halves the exponent to compute the result in O(log n)',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'The problem asks for O(log n) rather than repeated multiplication. With n up to 2³¹ − 1 ≈ 2.1 billion, what does O(n) multiplication cost?',
      options: [
        { label: 'About 2 billion multiplications', isCorrect: true },
        { label: 'About 31 multiplications', isCorrect: false, feedback: '31 multiplications is O(log n) — that\'s the target, not the naive approach. The naive approach multiplies n times.' },
        { label: 'The same as O(log n) in practice', isCorrect: false, feedback: '2 billion vs. 31 operations is not the same in practice. The constraint n ≤ 2³¹ − 1 exists precisely to make O(n) infeasible and O(log n) necessary.' },
        { label: 'O(n) is fine since x and n are bounded', isCorrect: false, feedback: 'x is bounded to (−100, 100), but n can reach 2³¹ − 1 ≈ 2.1 billion. Bounding x doesn\'t reduce the number of multiplications needed.' },
      ],
      correctFeedback: 'O(n) means up to 2.1 billion multiplications for the largest n. O(log n) needs only log₂(2,147,483,647) ≈ 31 multiplications — a factor of 70 million faster.',
      wrongFeedback: [
        'How many multiplications does x × x × x × … (n times) require when n = 2³¹ − 1?',
        'Repeated multiplication does n steps. Fast exponentiation halves the problem at each step — how many halvings until you reach 1?',
      ],
    },
    {
      id: 'negative-exponent',
      question: 'n can be negative (e.g., n = −2 gives 0.25). How should your algorithm handle this?',
      options: [
        { label: 'Return 0 for negative n', isCorrect: false, feedback: 'x⁻² = 1/x² = 0.25 when x = 2.0 — never 0. Negative exponents mean reciprocals, not zero.' },
        { label: 'Compute pow(x, |n|) then take the reciprocal', isCorrect: true },
        { label: 'Negate x and use positive n', isCorrect: false, feedback: '(−x)ⁿ ≠ x⁻ⁿ. Negating x changes the base, not the exponent. x⁻ⁿ = 1 / xⁿ.' },
        { label: 'Raise n to the absolute value before calling recursively', isCorrect: false, feedback: 'You convert n to |n| for the recursive computation, but what you return is 1 / pow(x, |n|), not pow(x, |n|). The conversion is correct; the return value is wrong in this description.' },
      ],
      correctFeedback: 'x⁻ⁿ = 1 / xⁿ. Compute the positive-exponent result first, then return its reciprocal. This handles the sign in one step without changing the recursion structure.',
      wrongFeedback: [
        'By definition, x⁻ⁿ = 1 / xⁿ. How do you use your existing positive-exponent logic to compute this?',
        'Compute pow(x, |n|) first. What do you do with the result when the original n was negative?',
      ],
    },
    {
      id: 'fast-exponentiation-insight',
      question: '"Fast exponentiation" halves the exponent at each step. What is the key mathematical identity that enables this?',
      options: [
        { label: 'xⁿ = x × xⁿ⁻¹', isCorrect: false, feedback: 'This identity is correct but leads to O(n) recursion — one multiplication per step. Fast exponentiation needs to halve the problem, not reduce it by one.' },
        { label: 'xⁿ = (x²)^(n/2)', isCorrect: true },
        { label: 'xⁿ = xⁿ/² × xⁿ/²', isCorrect: false, feedback: 'This is equivalent to (x²)^(n/2) and is also valid. However, framing it as squaring x (not splitting the exponent) clarifies why you only need one recursive call regardless of parity.' },
        { label: 'xⁿ = (x + x)^(n−1)', isCorrect: false, feedback: '(x + x)^(n−1) = (2x)^(n−1) ≠ xⁿ. Addition of the base is not a valid exponentiation identity.' },
      ],
      correctFeedback: 'Squaring the base while halving the exponent cuts the problem in half each step. log₂(2,147,483,647) ≈ 31 steps to reach n = 0, regardless of starting value.',
      wrongFeedback: [
        'If you know x⁴ = (x²)², how many multiplications does that take compared to x × x × x × x?',
        'The trick is squaring the base and halving the exponent. How many times can you halve n before reaching 0?',
      ],
    },
    {
      id: 'odd-exponent',
      question: 'When n is odd, (x²)^(n/2) loses one factor of x. How do you account for this?',
      options: [
        { label: 'Round n up to the nearest even number', isCorrect: false, feedback: 'Rounding up changes the exponent — x⁵ ≠ x⁶. You need the exact answer, so you must handle the odd case without changing n.' },
        { label: 'Multiply the result by one extra x', isCorrect: true },
        { label: 'Use integer division and ignore the remainder', isCorrect: false, feedback: 'Integer division of 5 by 2 is 2, so (x²)² = x⁴ ≠ x⁵. Dropping the remainder drops one factor of x from the answer.' },
        { label: 'Switch to O(n) multiplication for odd exponents', isCorrect: false, feedback: 'Falling back to O(n) for odd n would make your average case O(n) — the whole point of fast exponentiation is to halve every step, odd or even.' },
      ],
      correctFeedback: 'xⁿ = x × x^(n−1) when n is odd. After peeling off one factor, n−1 is even and you can halve cleanly. This adds one multiplication per odd level, keeping the algorithm O(log n).',
      wrongFeedback: [
        'x⁵ = x × x⁴. If you compute x⁴ via squaring, what do you multiply by to get x⁵?',
        'For odd n, split off one factor of x and recurse on n − 1. How does this keep the total step count O(log n)?',
      ],
    },
  ],
}
