export default {
  id: 'contiguous-array',
  title: 'Contiguous Array',
  difficulty: 'medium',
  description: 'Given a binary array <code>nums</code>, return the maximum length of a contiguous subarray with equal numbers of 0s and 1s.',
  examples: [
    { input: 'nums = [0,1]', output: '2', explanation: '[0,1] has one 0 and one 1.' },
    { input: 'nums = [0,1,0]', output: '2', explanation: '[0,1] or [1,0] are the longest equal subarrays.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', 'nums[i] is either 0 or 1'],
  starterCode: `class Solution:
    def find_max_length(self, nums):
        pass`,
  runnerSetup: 'find_max_length = Solution().find_max_length',
  functionName: 'find_max_length',
  conceptId: 'prefix-sum',
  testCases: [
    { label: '[0,1]', args: [[0,1]], expected: 2 },
    { label: '[0,1,0]', args: [[0,1,0]], expected: 2 },
    { label: 'Balanced', args: [[0,0,1,0,0,0,1,1]], expected: 6 },
    { label: 'All zeros', args: [[0,0,0]], expected: 0 },
  ],
  bruteHint: 'The brute-force approach checks every subarray directly: for each starting index, extend the ending index outward while keeping a running count of 0s and 1s, and record the length whenever the counts match. That\'s roughly n²/2 subarrays examined, so O(n²) time with O(1) space beyond the counters. At n up to 100,000, is scanning that many subarrays going to finish in time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'transform-to-balance',
      question: 'Specific wording in a problem statement can hint at a mathematical reframing that turns a comparison into simple arithmetic. Equal numbers of 0s and 1s means count(1s) − count(0s) = 0 for the subarray — what does treating 0 as −1 and 1 as +1 give you?',
      options: [
        { label: 'A sorted array to binary-search', isCorrect: false, feedback: 'Sorting the transformed values destroys index order, which you need to compute subarray lengths.' },
        { label: 'A running balance whose repeat values mark equal-count subarrays', isCorrect: true },
        { label: 'A bitmask for fast XOR operations', isCorrect: false, feedback: 'XOR does not track cumulative balance — it flips bits rather than summing +1/−1 contributions.' },
        { label: 'A running product instead of a running sum', isCorrect: false, feedback: 'Products of +1 and −1 collapse sign information and cannot tell you the net count difference.' },
      ],
      correctFeedback: 'Replace every 0 with −1. Now a prefix sum of 0 at index i means the subarray from 0 to i is balanced. Two indices with equal prefix sums means the subarray between them is balanced.',
      wrongFeedback: [
        'If prefix_sum[j] = prefix_sum[i], what is the sum of the slice from i+1 to j? What does a sum of 0 mean for 0-and-1 balance?',
        'Equal prefix sums at two indices mean the elements between them contributed net zero — equal +1s and −1s, hence equal 1s and 0s.',
      ],
      highlight: { location: 'description', text: 'equal numbers of 0s and 1s' },
    },
    {
      id: 'prefix-sum-hash-map',
      question: 'The exact question you need answered on every iteration determines what structure you should reach for. You need the earliest index where each prefix-sum value was seen — what structure gives O(1) first-occurrence lookup?',
      options: [
        { label: 'A sorted list of (prefix_sum, index) pairs', isCorrect: false, feedback: 'Binary searching a sorted list costs O(log n) per lookup and does not directly give you the earliest occurrence.' },
        { label: 'Map each prefix sum to the first index it occurred at', isCorrect: true },
        { label: 'A set of all prefix-sum values', isCorrect: false, feedback: 'A set confirms whether a value exists but discards the index — you need the actual position to compute subarray length.' },
        { label: 'Two arrays: one for 0-counts, one for 1-counts', isCorrect: false, feedback: 'Tracking separate counts works but still requires matching equal-count pairs, which is exactly what the prefix-sum map handles more directly.' },
      ],
      correctFeedback: 'Store {prefix_sum: first_index} as you scan. When you see a prefix_sum you have seen before, the subarray between the stored index and now is balanced. Length = current_index − stored_index.',
      wrongFeedback: [
        'You want the longest balanced subarray. When you see a repeated prefix sum, how do you compute the length of the subarray between the two occurrences?',
        'Map each prefix sum to the earliest index it appeared. When the same sum reappears at index j, the balanced subarray length is j − map[sum].',
      ],
    },
    {
      id: 'seed-the-map',
      question: 'An unusual initial value in a setup step often exists to handle a boundary case the main loop wouldn\'t otherwise catch. Before scanning, you initialize the map with {0: -1} — why is that starting entry necessary?',
      options: [
        { label: 'Avoid a division-by-zero error', isCorrect: false, feedback: 'There is no division in this algorithm. The seed entry handles a different edge case.' },
        { label: 'Allow detection of balanced subarrays starting at index 0', isCorrect: true },
        { label: 'Set the prefix sum for an empty array to −1', isCorrect: false, feedback: 'The value −1 is the index (before the array starts), not a prefix sum. The prefix sum for an empty prefix is 0.' },
        { label: 'Mark that 0s and 1s have equal counts initially', isCorrect: false, feedback: 'Before any elements are processed there are no 0s or 1s — the seed represents the prefix sum being 0 at a virtual index −1 before the array starts.' },
      ],
      correctFeedback: 'If prefix_sum reaches 0 at index i, the balanced subarray is nums[0..i], with length i − (−1) = i + 1. Without {0: −1}, a balanced prefix starting at index 0 would be missed entirely.',
      wrongFeedback: [
        'Walk through [0,1]: after index 1, prefix_sum = 0. The answer should be 2. What index is stored for sum=0, and how do you get length 2 from it?',
        'When prefix_sum returns to 0 at index i, the subarray from the start to i is balanced. The stored index must be −1 so i − (−1) = i + 1 gives the correct length.',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. What does nums.length ≤ 10⁵ tell you?',
      options: [
        { label: 'O(n²) checking all subarrays is fine', isCorrect: false, feedback: 'At n = 100,000, O(n²) means checking 10 billion subarrays — too slow. The prefix-sum map approach runs in O(n).' },
        { label: 'O(n) single-pass is the target', isCorrect: true },
        { label: 'O(n log n) sliding window is required', isCorrect: false, feedback: 'A sliding window does not directly apply here because balanced-subarray boundaries are not monotone. The prefix-sum insight gives O(n) directly.' },
        { label: 'Input is small enough that brute force is acceptable', isCorrect: false, feedback: 'At 100,000 elements, a brute-force O(n²) scan checks 5 billion pairs — beyond what finishes in time.' },
      ],
      correctFeedback: 'One pass builds prefix sums and checks the map in O(1) per step — O(n) total time and O(n) space for the map. At n = 100,000 that is 100,000 operations.',
      wrongFeedback: [
        'How many distinct subarrays are there for n = 100,000? Can you afford to check each one individually?',
        'A single left-to-right scan with one hash map lookup per step is O(n). What does that give you versus brute force?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 10⁵' },
    },
  ],
  solutionCode: `class Solution:
    def find_max_length(self, nums):
        seen = {0: -1}
        count = 0
        best = 0
        for i, n in enumerate(nums):
            count += 1 if n == 1 else -1
            if count in seen:
                best = max(best, i - seen[count])
            else:
                seen[count] = i
        return best`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'The sentinel <code>{0: -1}</code> matters: it lets a balanced subarray that starts at index 0 be detected correctly, since the running count returning to 0 at index <code>i</code> should measure a length-<code>(i+1)</code> subarray, and <code>i - (-1) = i + 1</code> gives exactly that.',
  solutionExplanation: 'Treating each 1 as +1 and each 0 as -1 turns "equal number of 0s and 1s in a subarray" into "the running count is the same at both ends of that subarray" — a running-sum-equality problem, exactly like the prefix-sum pattern for zero-sum subarrays. The first time each count value is seen gets remembered; any later index with that same count means everything between the two indices summed to zero, i.e. it had equal 0s and 1s, and only the *first* occurrence of a count should ever be stored so that the subarray found is as long as possible.',
}
