export default {
  id: 'check-if-array-pairs-divisible-by-k',
  title: 'Check If Array Pairs Are Divisible by k',
  difficulty: 'medium',
  description: 'Given an even-length integer array <code>arr</code> and integer <code>k</code>, return <code>true</code> if the array can be divided into pairs such that each pair sums to a multiple of <code>k</code>.',
  examples: [
    { input: 'arr=[1,2,3,4,5,10,6,7,8,9], k=5', output: 'true', explanation: 'Pairs: (1,9),(2,8),(3,7),(4,6),(5,10).' },
    { input: 'arr=[1,2,3,4,5,6], k=7', output: 'true' },
    { input: 'arr=[1,2,3,4,5,6], k=10', output: 'false' },
  ],
  constraints: ['arr.length == 2n', '1 ≤ n ≤ 10⁵', '1 ≤ arr[i] ≤ 10⁹', '1 ≤ k ≤ 10⁵'],
  starterCode: `class Solution:
    def can_arrange(self, arr, k):
        pass`,
  runnerSetup: 'can_arrange = Solution().can_arrange',
  functionName: 'can_arrange',
  conceptId: 'arrays',
  testCases: [
    { label: 'Valid pairs', args: [[1,2,3,4,5,10,6,7,8,9],5], expected: true },
    { label: 'k=7', args: [[1,2,3,4,5,6],7], expected: true },
    { label: 'k=10', args: [[1,2,3,4,5,6],10], expected: false },
  ],
  bruteHint: 'The brute-force approach scans the array and, for each element that hasn\'t been paired yet, checks every other unpaired element to see if their sum is divisible by k — pairing them the instant a match is found. That\'s a nested scan over the array, giving roughly O(n²) time, and arr.length can reach 2 × 10⁵. Would checking every remaining candidate for a partner still finish in time at that size?',
  optimizeComplexity: { time: 'O(n)', space: 'O(k)' },
  clues: [
    {
      id: 'remainder-insight',
      question: 'Rewriting a sum condition in modular arithmetic often exposes the real structural rule that governs which elements can pair together. A pair (a, b) sums to a multiple of k when a + b ≡ 0 (mod k). What does this tell you about their remainders?',
      options: [
        { label: 'Both elements must be multiples of k', isCorrect: false, feedback: 'That is one valid case (remainder 0 + remainder 0), but not the only one. (1, 9) with k=5 both have remainder 1 and 4 — neither is a multiple of 5.' },
        { label: 'Their remainders must sum to k (or both be 0)', isCorrect: true },
        { label: 'Their values must sum to exactly k', isCorrect: false, feedback: 'The pair must sum to any multiple of k, not just k itself. (5, 10) with k=5 sums to 15, not 5.' },
        { label: 'Sort and pair smallest with largest', isCorrect: false, feedback: 'Sorted pairing does not guarantee remainder-complementary pairs. (1, 10) with k=5 sums to 11, which is not a multiple of 5 — but (1, 9) is.' },
      ],
      correctFeedback: 'If a % k = r, its pair must have remainder k - r (mod k). The exception is r = 0, which must pair with another r = 0 element. This reduces the problem to matching remainder frequencies.',
      wrongFeedback: [
        'If a % k = 3 and k = 5, what remainder does a\'s partner need so their sum is divisible by 5?',
        'Remainders of a valid pair sum to k (or both are 0). So remainder r must pair with remainder k - r. What data structure tracks remainder counts?',
      ],
      highlight: { location: 'description', text: 'each pair sums to a multiple of' },
    },
    {
      id: 'remainder-frequency-map',
      question: 'When a problem reduces to matching complementary categories against each other, you need a fast way to count how many elements fall into each one. You need to match each remainder r with k − r. What structure lets you verify this efficiently?',
      options: [
        { label: 'Track only whether each remainder has appeared', isCorrect: false, feedback: 'A set tells you whether a remainder exists but not how many times — you need counts to verify that every r is matched with a k−r of equal frequency.' },
        { label: 'Count how many elements produce each remainder mod k', isCorrect: true },
        { label: 'Sort all elements by their value', isCorrect: false, feedback: 'Sorting by value does not group elements by remainder. Two elements with the same remainder may be far apart after sorting by value.' },
        { label: 'Scan inward from both ends of the sorted array for matching sums', isCorrect: false, feedback: 'Two-pointer works for sorted arrays targeting a specific sum, but here you need remainder-complementarity across arbitrary values — a frequency map handles it in O(1) per lookup.' },
      ],
      correctFeedback: 'Compute freq[x % k] for every x. Then verify freq[r] == freq[k - r] for all r from 1 to k//2, and freq[0] is even. This is an O(n + k) check.',
      wrongFeedback: [
        'You need to know: for each remainder r, are there exactly as many elements with remainder k−r? What lets you answer that in O(1)?',
        'Build a counter of all remainders. Then for each r in 1..k//2, check that freq[r] == freq[k−r]. What do you check for r = 0?',
      ],
    },
    {
      id: 'zero-remainder-edge-case',
      question: 'Symmetric matching conditions often leave one category that can only pair with itself, and that self-pairing case needs its own check. Elements with remainder 0 (multiples of k) must pair with each other. What does this require?',
      options: [
        { label: 'At least one multiple of k in the array', isCorrect: false, feedback: 'It is fine for there to be zero multiples of k. The requirement is that however many there are, the count must be even.' },
        { label: 'An even count of elements with remainder 0', isCorrect: true },
        { label: 'Exactly one multiple of k', isCorrect: false, feedback: 'One multiple of k cannot pair with another multiple of k — you need two, four, or any even number of them.' },
        { label: 'Multiples of k can pair with any element', isCorrect: false, feedback: 'A multiple of k has remainder 0. Its complement is also remainder 0 (since 0 + 0 = 0 ≡ 0 mod k). It can only pair with another multiple of k.' },
      ],
      correctFeedback: 'freq[0] must be even because multiples of k can only pair with each other. An odd count of remainder-0 elements means one is always left without a valid partner.',
      wrongFeedback: [
        'If 3 elements have remainder 0, can all of them be paired? What is the minimum valid count of remainder-0 elements?',
        'Remainder 0 pairs with remainder 0. If there are 3 such elements, one is left unpaired. What must freq[0] satisfy?',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'Once you\'ve settled on an approach, the size limits tell you whether its complexity actually fits. arr.length ≤ 2 × 10⁵ and k ≤ 10⁵. What is the complexity of a remainder-frequency approach?',
      options: [
        { label: 'O(n²) — checking all pairs', isCorrect: false, feedback: 'At n = 200,000, O(n²) is 40 billion operations. The remainder approach avoids this entirely.' },
        { label: 'O(n + k) — one pass to count, one pass to verify', isCorrect: true },
        { label: 'O(n log n) — requires sorting', isCorrect: false, feedback: 'Sorting is not needed. You only need to count remainders (O(n)) and then verify remainder pairs (O(k)).' },
        { label: 'O(k²) — comparing all remainder pairs', isCorrect: false, feedback: 'You only compare complementary pairs (r with k−r), which is O(k/2) = O(k) — not O(k²).' },
      ],
      correctFeedback: 'One O(n) pass builds the remainder frequency map. One O(k) pass verifies complementary frequencies. Total: O(n + k), well within limits for n = 2 × 10⁵ and k = 10⁵.',
      wrongFeedback: [
        'How many steps does building the remainder map take? How many steps does verifying all k remainder pairs take?',
        'Building freq takes O(n). Checking freq[r] == freq[k−r] for r in 0..k takes O(k). What is the combined complexity?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ k ≤ 10⁵' },
    },
  ],
  solutionCode: `class Solution:
    def can_arrange(self, arr, k):
        rem_count = [0] * k
        for n in arr:
            rem_count[n % k] += 1
        if rem_count[0] % 2 != 0:
            return False
        for r in range(1, (k // 2) + 1):
            if r == k - r:
                if rem_count[r] % 2 != 0:
                    return False
            elif rem_count[r] != rem_count[k - r]:
                return False
        return True`,
  solutionComplexity: { time: 'O(n + k)', space: 'O(k)' },
  solutionCaveat: 'Elements with remainder 0 can only ever pair with other remainder-0 elements (0 + 0 is the only way to hit a multiple of k using that remainder twice), so that count needs its own even/odd check separate from the general <code>r</code> / <code>k - r</code> matching.',
  solutionExplanation: 'Two numbers sum to a multiple of <code>k</code> exactly when their remainders mod <code>k</code> add up to <code>k</code> (or both are 0) — so the whole problem reduces to counting how many elements fall into each remainder bucket and checking that bucket <code>r</code> has exactly as many elements as bucket <code>k - r</code> for every <code>r</code>. The one bucket that pairs with itself (remainder 0, and remainder <code>k/2</code> when <code>k</code> is even) needs an even count on its own, since there is no complementary bucket to balance against.',
}
