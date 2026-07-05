export default {
  id: 'count-primes',
  title: 'Count Primes',
  difficulty: 'medium',
  description: 'Given an integer <code>n</code>, return the number of prime numbers that are strictly less than <code>n</code>. Use the Sieve of Eratosthenes for efficiency.',
  examples: [
    { input: 'n = 10', output: '4', explanation: 'Primes less than 10: 2, 3, 5, 7.' },
    { input: 'n = 0', output: '0' },
    { input: 'n = 1', output: '0' },
  ],
  constraints: ['0 ≤ n ≤ 5 × 10⁶'],
  starterCode: `def count_primes(n):
  pass`,
  functionName: 'count_primes',
  conceptId: 'math-geometry',
  testCases: [
    { label: 'n=10', args: [10], expected: 4 },
    { label: 'n=0', args: [0], expected: 0 },
    { label: 'n=2', args: [2], expected: 0 },
    { label: 'n=20', args: [20], expected: 8 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 5,000,000 tells you…',
      options: [
        { label: 'Test each number independently for primality', isCorrect: false, feedback: 'Testing each number independently costs O(√n) per number. Over 5 million numbers that\'s roughly 5,000,000 × 2,236 ≈ 11 billion operations — far too slow.' },
        { label: 'O(n log log n) or better is needed', isCorrect: true },
        { label: 'O(n²) is acceptable', isCorrect: false, feedback: 'At n = 5,000,000, O(n²) is 25 trillion operations. That\'s not viable in any language. The constraint demands a sub-quadratic approach.' },
        { label: 'A hash set of known primes is sufficient', isCorrect: false, feedback: 'A hash set stores primes but doesn\'t generate them. You still need an algorithm to decide which numbers are prime — storing them is a separate step.' },
      ],
      correctFeedback: 'At n = 5,000,000, you need bulk marking rather than per-number tests. The Sieve of Eratosthenes eliminates composites in O(n log log n) — close enough to linear for this input size.',
      wrongFeedback: [
        'At n = 5,000,000, how many total operations does testing each number individually require?',
        'Per-number primality testing is O(√n) each. Over 5 million numbers that\'s billions of operations. You need an approach that amortizes the work across all numbers at once.',
      ],
    },
    {
      id: 'sieve-mechanism',
      question: 'The problem says "use the Sieve of Eratosthenes." The sieve works by…',
      options: [
        { label: 'Starting with all composites, marking primes', isCorrect: false, feedback: 'It\'s the opposite — start with all numbers assumed prime, then mark the multiples of each prime as composite. What\'s left unmarked is prime.' },
        { label: 'Starting with all primes, eliminating each number that fails a divisibility test', isCorrect: false, feedback: 'You don\'t test each number for divisibility independently. The sieve marks off all multiples of a prime at once, which is what makes it efficient.' },
        { label: 'Starting with all numbers marked prime, crossing off multiples', isCorrect: true },
        { label: 'Recursively checking whether each number divides a known prime', isCorrect: false, feedback: 'The sieve is iterative, not recursive. It marks multiples in bulk rather than testing divisibility on each candidate.' },
      ],
      correctFeedback: 'Initialize a boolean array of size n, all True. For each prime p found, mark all multiples p², p²+p, p²+2p, … as composite. Numbers still marked True at the end are prime.',
      wrongFeedback: [
        'The sieve maintains an array where each index represents a number. What is the initial assumption for each index, and what action do you take when you find a prime?',
        'Start every index as "prime." When you confirm p is prime, mark 2p, 3p, 4p, … as "not prime." You never test divisibility — you mark in bulk.',
      ],
    },
    {
      id: 'strictly-less-than',
      question: '"Strictly less than n." In the example, n = 10 gives 4 primes. What does this boundary condition require?',
      options: [
        { label: 'Include n itself if it\'s prime', isCorrect: false, feedback: '"Strictly less than n" means n is excluded. If n = 10 and 10 were prime (it isn\'t), it still wouldn\'t count. "Less than" and "less than or equal to" are different boundaries.' },
        { label: 'Your sieve or loop must stop before index n', isCorrect: true },
        { label: 'Subtract 1 from the final count', isCorrect: false, feedback: 'You don\'t adjust the count after the fact — you simply don\'t count n. If your sieve runs indices 0 through n − 1, the boundary is already correct.' },
        { label: 'Return 0 when n is prime', isCorrect: false, feedback: 'The primality of n is irrelevant — n is excluded regardless. "Strictly less than" only tells you where to stop; it doesn\'t change what you count.' },
      ],
      correctFeedback: 'Your sieve should cover indices 0 through n − 1. Count True values in that range — index n is never included.',
      wrongFeedback: [
        'Primes less than 10 are 2, 3, 5, 7 — that\'s 4. Would including 10 change that count if 10 were prime?',
        'Run the sieve for indices 2 through n − 1. The word "strictly" means the upper bound is exclusive.',
      ],
    },
  ],
}
