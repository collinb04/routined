export default {
  id: 'nth-tribonacci-number',
  title: 'N-th Tribonacci Number',
  difficulty: 'easy',
  description: 'The Tribonacci sequence is T₀=0, T₁=1, T₂=1, and Tₙ₊₃ = Tₙ + Tₙ₊₁ + Tₙ₊₂ for n ≥ 0. Given n, return the n-th tribonacci number.',
  examples: [
    { input: 'n = 4', output: '4', explanation: 'T3=2, T4=4.' },
    { input: 'n = 25', output: '1389537' },
  ],
  constraints: ['0 ≤ n ≤ 37', 'The answer is guaranteed to fit in a 32-bit integer'],
  starterCode: `def tribonacci(n):
  pass`,
  functionName: 'tribonacci',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'n=4', args: [4], expected: 4 },
    { label: 'n=0', args: [0], expected: 0 },
    { label: 'n=1', args: [1], expected: 1 },
    { label: 'n=25', args: [25], expected: 1389537 },
  ],
  clues: [
    {
      id: 'constraint-small-n',
      question: 'n ≤ 37 tells you…',
      options: [
        { label: 'Recursion without memoization is fine', isCorrect: false, feedback: 'Naive recursion computes the same subproblems repeatedly — T(n) calls T(n-1), T(n-2), and T(n-3), each of which fan out further. Even at n = 37, the call tree balloons. Memoization or iteration is needed.' },
        { label: 'Even O(3ⁿ) would be acceptable', isCorrect: false, feedback: '3^37 is over 450 billion operations. That\'s not acceptable for any problem. The small n makes O(n) easy, not an excuse to be exponential.' },
        { label: 'A simple iterative solution with three variables suffices', isCorrect: true },
        { label: 'Matrix exponentiation is required', isCorrect: false, feedback: 'Matrix exponentiation achieves O(log n), which is impressive — but total overkill at n = 37. A simple O(n) loop with three rolling variables is all you need.' },
      ],
      correctFeedback: 'At n ≤ 37, even O(n) with a tiny constant is instant. Three rolling variables — a, b, c — updated each step is the cleanest solution.',
      wrongFeedback: [
        'With only 37 steps, what\'s the simplest approach that avoids recomputing values?',
        'You only ever need the last three values. Can you maintain those in three variables and update them in a loop?',
      ],
    },
    {
      id: 'three-predecessor-recurrence',
      question: 'Tₙ₊₃ = Tₙ + Tₙ₊₁ + Tₙ₊₂. This means each value depends on…',
      options: [
        { label: 'The single previous value only', isCorrect: false, feedback: 'Fibonacci depends on two predecessors; Tribonacci depends on three. Using only one predecessor gives you wrong values — you\'d be computing something like the running total, not the Tribonacci sequence.' },
        { label: 'All values from T₀ onward', isCorrect: false, feedback: 'The recurrence is a fixed three-term sum, not a cumulative sum over the whole sequence. You only need the three most recent values, not the entire history.' },
        { label: 'Exactly three predecessors', isCorrect: true },
        { label: 'Two predecessors, like Fibonacci', isCorrect: false, feedback: 'This is specifically "Tribonacci" — three terms summed, not two. The "tri-" prefix is the signal. Fibonacci\'s recurrence is Fₙ = Fₙ₋₁ + Fₙ₋₂; here you add Tₙ₋₃ as well.' },
      ],
      correctFeedback: 'Each Tribonacci number is the sum of the preceding three. You need to track exactly three rolling values — one more than Fibonacci requires.',
      wrongFeedback: [
        'The "tri-" in Tribonacci means three. Count the terms on the right side of Tₙ₊₃ = Tₙ + Tₙ₊₁ + Tₙ₊₂.',
        'Three terms summed means three predecessors needed. You can store them as three variables and shift them forward each iteration.',
      ],
    },
    {
      id: 'base-cases',
      question: 'T₀=0, T₁=1, T₂=1 are explicitly given. This means…',
      options: [
        { label: 'You can derive T₀ from the recurrence', isCorrect: false, feedback: 'The recurrence requires three prior values. T₀ has none — it\'s a seed, not a derived value. Treating it as derivable would require values before the sequence starts.' },
        { label: 'All three must be seeded before the loop starts', isCorrect: true },
        { label: 'Only T₀ is a true base case', isCorrect: false, feedback: 'The recurrence Tₙ₊₃ = Tₙ + Tₙ₊₁ + Tₙ₊₂ cannot compute T₃ without T₀, T₁, and T₂ all being known. All three are base cases.' },
        { label: 'Return 0 or 1 directly for n < 2', isCorrect: false, feedback: 'You need to handle n = 0, 1, and 2 as special cases — not just n < 2. T₂ = 1, not 0, and a loop starting from index 3 needs all three seeds already set.' },
      ],
      correctFeedback: 'Seed a=0, b=1, c=1 before starting the loop. For n=0,1,2 you return immediately; for n≥3 the loop shifts the three variables forward.',
      wrongFeedback: [
        'Your loop computes Tₙ₊₃ from three known values. What needs to be true before the first loop iteration?',
        'Before any iteration, you need T₀, T₁, and T₂ all initialized. Handle n=0, n=1, n=2 as early returns, then seed three variables for the loop.',
      ],
    },
  ],
}
