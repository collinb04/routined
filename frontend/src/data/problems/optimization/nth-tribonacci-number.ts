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
}
