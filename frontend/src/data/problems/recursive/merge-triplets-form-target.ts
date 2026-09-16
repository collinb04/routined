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
  starterCode: `class Solution:
    def merge_triplets(self, triplets, target):
        pass`,
  runnerSetup: 'merge_triplets = Solution().merge_triplets',
  functionName: 'merge_triplets',
  conceptId: 'greedy',
  testCases: [
    { label: 'Can form', args: [[[2,5,3],[1,8,4],[1,7,5]],[2,7,5]], expected: true },
    { label: 'Cannot form', args: [[[3,4,5],[4,5,6]],[3,2,5]], expected: false },
    { label: 'Exact match', args: [[[1,2,3]],[1,2,3]], expected: true },
  ],
  bruteHint: 'The brute-force approach tries every possible sequence of merges between triplets, checking after each merge whether the target triplet has been produced — an exhaustive search over combinations that grows exponentially as the number of triplets increases. That is fine for a handful of triplets, but with up to 10⁵ triplets it is far too slow. What if you could decide whether a single triplet is useful just by looking at it once, without ever combining it with anything else?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: '1 ≤ triplets.length ≤ 10⁵' },
      question: 'Constraint bounds tell you upfront which time complexities are even achievable before you write a line of code. Up to 10⁵ triplets. What complexity does this require?',
      options: [
        { label: 'O(n²) — try all pairs of triplets', isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations. You cannot try all pairs. The key insight is that you only need one pass over the list.' },
        { label: 'O(n) — a single pass suffices', isCorrect: true },
        { label: 'O(n log n) — sort triplets first', isCorrect: false, feedback: 'Sorting adds O(n log n) cost without helping — the merge operation is commutative and associative, so order does not matter. A single linear pass is sufficient.' },
        { label: 'O(1) — only the target matters', isCorrect: false, feedback: 'You must inspect each triplet at least once to decide whether it can contribute to the target. That is O(n) at minimum.' },
      ],
      correctFeedback: 'With 10⁵ triplets, a single O(n) scan is the right approach. You only need to filter out harmful triplets and accumulate the rest.',
      wrongFeedback: [
        'You have 100,000 triplets. Can you decide whether each one is useful in O(1) per triplet, making the total O(n)?',
        'Each triplet is either safe to merge (no element exceeds the target) or must be discarded. One comparison per triplet gives O(n) overall.',
      ],
    },
    {
      id: 'harmful-triplet-signal',
      highlight: { location: 'description', text: 'replace one with the element-wise maximum' },
      question: 'Understanding exactly how the merge operation behaves tells you which triplets can safely contribute and which cannot. Example 2: triplets=[[3,4,5],[4,5,6]], target=[3,2,5] returns false. Why can neither triplet contribute?',
      options: [
        { label: 'No triplet exactly matches the target', isCorrect: false, feedback: 'Exact matches are not required — you can build the target by merging multiple triplets. The reason example 2 fails is different: any merge would exceed a target element.' },
        { label: 'Both triplets have an element exceeding the target', isCorrect: true },
        { label: 'The target\'s second element (2) is too small to reach', isCorrect: false, feedback: 'The second element of 2 in the target is the issue, but not because it\'s unreachable — it\'s because any triplet that could contribute the right first or third element would also push the second element above 2.' },
        { label: 'You need more triplets to build the target', isCorrect: false, feedback: 'Adding more triplets would not help if every available triplet has an element that exceeds the target. More triplets with the same overflowing values cannot fix the constraint violation.' },
      ],
      correctFeedback: 'If any element of a triplet exceeds the corresponding target element, merging it would push that target position above its limit. Such triplets must be discarded before accumulating.',
      wrongFeedback: [
        'When you merge two triplets, the result takes the element-wise maximum. What happens if one triplet has a value larger than the target at some position?',
        'Merging in a triplet where triplet[i] > target[i] permanently raises that position above the target. Filter those triplets out first.',
      ],
    },
    {
      id: 'greedy-accumulation',
      highlight: { location: 'description', text: 'Return <code>true</code> if the target triplet can be formed.' },
      question: 'Knowing precisely what the problem asks you to return tells you when your accumulation is actually complete. After filtering out harmful triplets, what do you check?',
      options: [
        { label: 'Whether any single remaining triplet equals the target', isCorrect: false, feedback: 'You are not looking for a single match — you can merge multiple safe triplets together. The accumulated element-wise maximum of all safe triplets must equal the target.' },
        { label: 'Whether safe triplets\' element-wise max equals target', isCorrect: true },
        { label: 'Count how many safe triplets exist', isCorrect: false, feedback: 'The count of safe triplets is irrelevant — what matters is whether their combined element-wise maximum reaches each target position. Even one safe triplet might be enough.' },
        { label: 'Whether any safe triplet shares a value with the target', isCorrect: false, feedback: 'Sharing one value is not enough. You need the combined maximum across all three positions to exactly hit the target. Partial matches do not confirm the answer.' },
      ],
      correctFeedback: 'Accumulate the element-wise maximum of all safe triplets. If the result equals the target, return true — every target element is achievable without overshooting.',
      wrongFeedback: [
        'You have filtered out all triplets that could overshoot. Now, can the remaining triplets together reach the target at every position?',
        'Take the element-wise max across all safe triplets. If that equals the target, you can form it. If any position falls short, you cannot.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def merge_triplets(self, triplets, target):
        best = [0, 0, 0]
        for t in triplets:
            if t[0] <= target[0] and t[1] <= target[1] and t[2] <= target[2]:
                best[0] = max(best[0], t[0])
                best[1] = max(best[1], t[1])
                best[2] = max(best[2], t[2])
        return best == target`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'A triplet with even one element exceeding the corresponding target value is skipped <code>entirely</code> — not partially used — since merging it in would push that one position permanently above the target, and no later merge operation (element-wise max only ever increases values) could ever bring it back down.',
  solutionExplanation: 'Since a merge takes the element-wise maximum, any "safe" triplet — one whose every element is already ≤ the matching target element — can only ever help, never hurt, so accumulating the running maximum across all safe triplets is exactly equivalent to trying every possible sequence of merges among them. The target is achievable exactly when that accumulated maximum equals the target at all three positions, since anything less means no combination of safe triplets reaches that position, and unsafe triplets were correctly excluded from ever contributing.',
}
