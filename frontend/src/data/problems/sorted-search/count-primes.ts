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
  starterCode: `class Solution:
    def count_primes(self, n):
        pass`,
  runnerSetup: 'count_primes = Solution().count_primes',
  functionName: 'count_primes',
  conceptId: 'arrays',
  testCases: [
    { label: 'n=10', args: [10], expected: 4 },
    { label: 'n=0', args: [0], expected: 0 },
    { label: 'n=2', args: [2], expected: 0 },
    { label: 'n=20', args: [20], expected: 8 },
  ],
  bruteHint: 'The brute-force approach tests every number from 2 to n − 1 individually for primality, typically via trial division up to its square root — O(√k) work per number k. Summed across roughly n numbers, that totals about O(n × √n) overall. With n allowed up to 5,000,000, how many total operations would that require, and would it finish in time?',
  optimizeComplexity: { time: 'O(n log log n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraint bounds often reveal the complexity class the intended solution must hit. n ≤ 5,000,000 tells you…',
      highlight: { location: 'constraint', text: '0 ≤ n ≤ 5 × 10⁶' },
      options: [
        { label: 'Test each number independently for primality', isCorrect: false, feedback: 'Testing each number independently costs O(√n) per number. Over 5 million numbers that\'s roughly 5,000,000 × 2,236 ≈ 11 billion operations — far too slow.' },
        { label: 'O(n log log n) or better is needed', isCorrect: true },
        { label: 'O(n²) is acceptable', isCorrect: false, feedback: 'At n = 5,000,000, O(n²) is 25 trillion operations. That\'s not viable in any language. The constraint demands a sub-quadratic approach.' },
        { label: 'Store known primes for fast membership checks', isCorrect: false, feedback: 'A hash set stores primes but doesn\'t generate them. You still need an algorithm to decide which numbers are prime — storing them is a separate step.' },
      ],
      correctFeedback: 'At n = 5,000,000, you need bulk marking rather than per-number tests. The Sieve of Eratosthenes eliminates composites in O(n log log n) — close enough to linear for this input size.',
      wrongFeedback: [
        'At n = 5,000,000, how many total operations does testing each number individually require?',
        'Per-number primality testing is O(√n) each. Over 5 million numbers that\'s billions of operations. You need an approach that amortizes the work across all numbers at once.',
      ],
    },
    {
      id: 'sieve-mechanism',
      question: 'When a problem statement names the exact technique to use, the mechanism behind that name is what you need to nail down. The problem says "use the Sieve of Eratosthenes." The sieve works by…',
      highlight: { location: 'description', text: 'Sieve of Eratosthenes' },
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
      question: 'Exact wording in a problem statement often encodes a precise boundary condition. "Strictly less than n." In the example, n = 10 gives 4 primes. What does this boundary condition require?',
      highlight: { location: 'description', text: 'strictly less than' },
      options: [
        { label: 'Include n itself if it\'s prime', isCorrect: false, feedback: '"Strictly less than n" means n is excluded. If n = 10 and 10 were prime (it isn\'t), it still wouldn\'t count. "Less than" and "less than or equal to" are different boundaries.' },
        { label: 'Stop iterating before reaching index n', isCorrect: true },
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
  solutionCode: `class Solution:
    def count_primes(self, n):
        if n < 3:
            return 0
        is_prime = [True] * n
        is_prime[0] = is_prime[1] = False
        for i in range(2, int(n ** 0.5) + 1):
            if is_prime[i]:
                for j in range(i * i, n, i):
                    is_prime[j] = False
        return sum(is_prime)`,
  solutionComplexity: { time: 'O(n log log n)', space: 'O(n)' },
  solutionCaveat: 'Marking composites only starts at <code>i * i</code>, not <code>2 * i</code> — every smaller multiple of <code>i</code> (like <code>2i</code>, <code>3i</code>, ...) was already crossed off earlier by a smaller prime factor, so starting there skips redundant work without missing anything.',
  solutionExplanation: 'Instead of testing each number for primality independently, the sieve flips the direction of the work: every time a number is confirmed prime, all of its multiples are immediately marked composite, so no composite number is ever tested for primality on its own. Stopping the outer loop at <code>√n</code> is sufficient because any composite number less than n must have a factor at or below its own square root, so every composite gets caught by the time the sieve reaches that point.',
}
