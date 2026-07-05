export default {
  id: 'fibonacci-number',
  title: 'Fibonacci Number',
  difficulty: 'easy',
  description: 'The Fibonacci sequence is defined as: <code>F(0) = 0</code>, <code>F(1) = 1</code>, and <code>F(n) = F(n-1) + F(n-2)</code>. Given <code>n</code>, return <code>F(n)</code>. Implement it recursively.',
  examples: [
    { input: 'n = 4', output: '3', explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3.' },
    { input: 'n = 10', output: '55' },
  ],
  constraints: ['0 ≤ n ≤ 30'],
  starterCode: `def fib(n):
  # Base cases: fib(0) = 0, fib(1) = 1
  pass`,
  functionName: 'fib',
  conceptId: 'recursion',
  testCases: [
    { label: 'F(0)', args: [0], expected: 0 },
    { label: 'F(1)', args: [1], expected: 1 },
    { label: 'F(4)', args: [4], expected: 3 },
    { label: 'F(10)', args: [10], expected: 55 },
    { label: 'F(20)', args: [20], expected: 6765 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 30. What does this tell you about acceptable complexity?',
      options: [
        { label: 'Only O(n) or better is acceptable', isCorrect: false, feedback: 'n ≤ 30 is very small. Even O(2ⁿ) — naive recursion without memoization — is at most 2³⁰ ≈ 1 billion, which is borderline. But the bound does allow solutions that would be catastrophic at larger n.' },
        { label: 'Exponential time is fine at this scale', isCorrect: false, feedback: 'Naive O(2ⁿ) recursion at n = 30 makes over a billion calls. That\'s slow and the problem asks you to implement it recursively — the intent is to think about redundant subproblems, not accept them.' },
        { label: 'Even O(2ⁿ) naive recursion is technically bounded here', isCorrect: true },
        { label: 'n ≤ 30 means sorting is required first', isCorrect: false, feedback: 'Sorting has nothing to do with computing a Fibonacci number. The constraint is purely about how large the input can get, not about ordering.' },
      ],
      correctFeedback: 'n ≤ 30 is intentionally small — it lets naive recursion pass while hinting that the interesting question is *why* it\'s slow and how memoization collapses it to O(n).',
      wrongFeedback: [
        'At n = 30, how many calls does fib(n) = fib(n-1) + fib(n-2) make without any caching?',
        'Naive recursion doubles calls at each level: roughly 2³⁰ ≈ 1 billion calls. The small bound is a hint that this approach exists but is not ideal.',
      ],
    },
    {
      id: 'base-cases',
      question: 'F(0) = 0 and F(1) = 1 are given explicitly. What role do they play in a recursive implementation?',
      options: [
        { label: 'They are the base cases that stop recursion', isCorrect: true },
        { label: 'They are initial values to store in an array', isCorrect: false, feedback: 'Storing values in an array is the iterative DP approach. In a pure recursive implementation, F(0) and F(1) are the conditions that return a value directly without making further recursive calls.' },
        { label: 'They are edge cases to handle after computing the result', isCorrect: false, feedback: 'F(0) and F(1) are not edge cases to post-process — they are the termination conditions. Without them, fib(n) recurses into fib(-1) and beyond, running forever.' },
        { label: 'They are used to verify the recursion is correct', isCorrect: false, feedback: 'F(0) and F(1) are structural requirements of the recursion, not test values. Every recursive call eventually reduces to one of these two cases — they are what makes the recursion terminate.' },
      ],
      correctFeedback: 'Without base cases, fib(0) would call fib(-1) which calls fib(-2) — infinite recursion. F(0) = 0 and F(1) = 1 are the two values the recursion bottoms out on.',
      wrongFeedback: [
        'What stops a recursive function from calling itself forever? What condition makes it return immediately instead?',
        'Base cases return a value without a recursive call. Here, when n == 0 or n == 1, you return the given value directly — no further recursion.',
      ],
    },
    {
      id: 'overlapping-subproblems',
      question: 'Computing fib(5) requires fib(4) and fib(3). fib(4) also requires fib(3). What does this overlap signal?',
      options: [
        { label: 'The recursion has a bug', isCorrect: false, feedback: 'Repeated subproblems are not a bug — they are a structural property of the Fibonacci recurrence. The definition F(n) = F(n-1) + F(n-2) naturally produces overlap.' },
        { label: 'Memoization could eliminate redundant calls', isCorrect: true },
        { label: 'The recurrence relation is wrong', isCorrect: false, feedback: 'The recurrence F(n) = F(n-1) + F(n-2) is the correct definition. The overlap is a consequence of the definition, not an error.' },
        { label: 'You should use a loop instead of recursion', isCorrect: false, feedback: 'A loop is one valid approach, but the problem specifically asks for a recursive implementation. Memoization keeps the recursive structure while eliminating the redundant calls.' },
      ],
      correctFeedback: 'fib(3) is computed twice in fib(5), four times in fib(7), and so on — the call tree grows exponentially. Memoizing each result after the first computation reduces total calls from O(2ⁿ) to O(n).',
      wrongFeedback: [
        'If fib(3) is computed twice, is that second computation doing any new work? What would happen if you saved and reused the first result?',
        'Caching results (memoization) turns repeated O(2ⁿ) work into O(n) — each subproblem is computed exactly once.',
      ],
    },
  ],
}
