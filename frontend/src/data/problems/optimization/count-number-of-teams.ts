export default {
  id: 'count-number-of-teams',
  title: 'Count Number of Teams',
  difficulty: 'medium',
  description: 'Given a rating array of soldiers, count teams of 3 soldiers (i < j < k) such that either rating[i] < rating[j] < rating[k] or rating[i] > rating[j] > rating[k].',
  examples: [
    { input: 'rating = [2,5,3,4,1]', output: '3', explanation: 'Teams: (2,3,4),(2,3,1),(2,5,4) → Wait, valid: (2,3,4), (5,3,1), (5,4,1). Count = 3.' },
    { input: 'rating = [1,2,3,4]', output: '4' },
  ],
  constraints: ['n == rating.length', '3 ≤ n ≤ 1000', '1 ≤ rating[i] ≤ 10⁵', 'All ratings are unique'],
  starterCode: `def num_teams(rating):
  pass`,
  functionName: 'num_teams',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Three teams', args: [[2,5,3,4,1]], expected: 3 },
    { label: 'Four teams', args: [[1,2,3,4]], expected: 4 },
    { label: 'No team', args: [[1,2]], expected: 0 },
  ],
}
