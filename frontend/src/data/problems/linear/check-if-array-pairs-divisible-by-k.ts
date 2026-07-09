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
  starterCode: `def can_arrange(arr, k):
  pass`,
  functionName: 'can_arrange',
  conceptId: 'arrays',
  testCases: [
    { label: 'Valid pairs', args: [[1,2,3,4,5,10,6,7,8,9],5], expected: true },
    { label: 'k=7', args: [[1,2,3,4,5,6],7], expected: true },
    { label: 'k=10', args: [[1,2,3,4,5,6],10], expected: false },
  ],
  bruteHint: 'Describe checking every pair of elements for divisibility by k and its time complexity',
  optimizeHint: 'Name the structure that lets you count how many elements fall into each remainder class mod k',
  clues: [
    {
      id: 'remainder-insight',
      question: 'A pair (a, b) sums to a multiple of k when a + b ≡ 0 (mod k). What does this tell you about their remainders?',
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
    },
    {
      id: 'remainder-frequency-map',
      question: 'You need to match each remainder r with k − r. What structure lets you verify this efficiently?',
      options: [
        { label: 'A set of seen remainders', isCorrect: false, feedback: 'A set tells you whether a remainder exists but not how many times — you need counts to verify that every r is matched with a k−r of equal frequency.' },
        { label: 'A frequency map of remainders mod k', isCorrect: true },
        { label: 'A sorted array of all elements', isCorrect: false, feedback: 'Sorting by value does not group elements by remainder. Two elements with the same remainder may be far apart after sorting by value.' },
        { label: 'A two-pointer scan on the sorted array', isCorrect: false, feedback: 'Two-pointer works for sorted arrays targeting a specific sum, but here you need remainder-complementarity across arbitrary values — a frequency map handles it in O(1) per lookup.' },
      ],
      correctFeedback: 'Compute freq[x % k] for every x. Then verify freq[r] == freq[k - r] for all r from 1 to k//2, and freq[0] is even. This is an O(n + k) check.',
      wrongFeedback: [
        'You need to know: for each remainder r, are there exactly as many elements with remainder k−r? What lets you answer that in O(1)?',
        'Build a counter of all remainders. Then for each r in 1..k//2, check that freq[r] == freq[k−r]. What do you check for r = 0?',
      ],
    },
    {
      id: 'zero-remainder-edge-case',
      question: 'Elements with remainder 0 (multiples of k) must pair with each other. What does this require?',
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
      question: 'arr.length ≤ 2 × 10⁵ and k ≤ 10⁵. What is the complexity of a remainder-frequency approach?',
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
    },
  ],
}
