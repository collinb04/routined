export default {
  id: 'koko-eating-bananas',
  title: 'Koko Eating Bananas',
  difficulty: 'medium',
  description: 'Koko has <code>piles</code> of bananas and <code>h</code> hours. She eats at most <code>k</code> bananas per hour from one pile. Find the minimum integer <code>k</code> such that she can eat all bananas within <code>h</code> hours.',
  examples: [
    { input: 'piles = [3,6,7,11], h = 8', output: '4' },
    { input: 'piles = [30,11,23,4,20], h = 5', output: '30', explanation: 'Must finish each pile in exactly one hour.' },
  ],
  constraints: [
    '1 ≤ piles.length ≤ h ≤ 10⁴',
    '1 ≤ piles[i] ≤ 10⁹',
  ],
  starterCode: `import math

def min_eating_speed(piles, h):
  # Hint: binary search on k in range [1, max(piles)]
  pass`,
  functionName: 'min_eating_speed',
  conceptId: 'binary-search-answer',
  testCases: [
    { label: 'Basic', args: [[3,6,7,11], 8], expected: 4 },
    { label: 'Must rush', args: [[30,11,23,4,20], 5], expected: 30 },
    { label: 'Extra time', args: [[30,11,23,4,20], 6], expected: 23 },
    { label: 'Single pile', args: [[10], 3], expected: 4 },
  ],
}
