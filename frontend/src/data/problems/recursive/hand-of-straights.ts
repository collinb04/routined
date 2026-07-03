export default {
  id: 'hand-of-straights',
  title: 'Hand of Straights',
  difficulty: 'medium',
  description: 'Alice has some number of cards and wants to rearrange them in groups so that each group is of size <code>groupSize</code> and consists of <code>groupSize</code> consecutive cards. Return <code>true</code> if possible.',
  examples: [
    { input: 'hand=[1,2,3,6,2,3,4,7,8], groupSize=3', output: 'true', explanation: '[1,2,3],[2,3,4],[6,7,8] each have 3 consecutive cards.' },
    { input: 'hand=[1,2,3,4,5], groupSize=4', output: 'false' },
  ],
  constraints: ['1 ≤ hand.length ≤ 10⁴', '0 ≤ hand[i] ≤ 10⁹', '1 ≤ groupSize ≤ hand.length'],
  starterCode: `def is_n_straight_hand(hand, group_size):
  pass`,
  functionName: 'is_n_straight_hand',
  conceptId: 'greedy',
  testCases: [
    { label: 'Valid', args: [[1,2,3,6,2,3,4,7,8],3], expected: true },
    { label: 'Invalid', args: [[1,2,3,4,5],4], expected: false },
    { label: 'Single group', args: [[1,2,3],3], expected: true },
  ],
}
