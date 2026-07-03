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
}
