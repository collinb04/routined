export default {
  id: 'merge-triplets-form-target',
  title: 'Merge Triplets to Form Target Triplet',
  difficulty: 'medium',
  description: 'You have triplets <code>[a,b,c]</code> and a target triplet. In one operation, choose two triplets and replace one with the element-wise maximum. Return <code>true</code> if the target triplet can be formed.',
  examples: [
    { input: 'triplets=[[2,5,3],[1,8,4],[1,7,5]], target=[2,7,5]', output: 'true', explanation: 'Merge [2,5,3] and [1,7,5] to get [2,7,5].' },
    { input: 'triplets=[[3,4,5],[4,5,6]], target=[3,2,5]', output: 'false' },
  ],
  constraints: ['1 ≤ triplets.length ≤ 10⁵', '1 ≤ a, b, c, target[i] ≤ 1000'],
  starterCode: `def merge_triplets(triplets, target):
  pass`,
  functionName: 'merge_triplets',
  conceptId: 'greedy',
  testCases: [
    { label: 'Can form', args: [[[2,5,3],[1,8,4],[1,7,5]],[2,7,5]], expected: true },
    { label: 'Cannot form', args: [[[3,4,5],[4,5,6]],[3,2,5]], expected: false },
    { label: 'Exact match', args: [[[1,2,3]],[1,2,3]], expected: true },
  ],
}
