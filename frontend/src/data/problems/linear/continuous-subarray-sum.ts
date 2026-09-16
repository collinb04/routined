export default {
  id: 'continuous-subarray-sum',
  title: 'Continuous Subarray Sum',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and integer <code>k</code>, return <code>true</code> if there is a subarray of length at least 2 whose sum is a multiple of <code>k</code>.',
  examples: [
    { input: 'nums=[23,2,4,6,7], k=6', output: 'true', explanation: '[2,4] sums to 6 which is a multiple of 6.' },
    { input: 'nums=[23,2,6,4,7], k=6', output: 'true', explanation: '[23,2,6,4,7] sums to 42 which is a multiple of 6.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '0 ≤ nums[i] ≤ 10⁹', '0 ≤ k ≤ 2³¹ − 1'],
  starterCode: `class Solution:
    def check_subarray_sum(self, nums, k):
        pass`,
  runnerSetup: 'check_subarray_sum = Solution().check_subarray_sum',
  functionName: 'check_subarray_sum',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Short subarray', args: [[23,2,4,6,7],6], expected: true },
    { label: 'Full array', args: [[23,2,6,4,7],6], expected: true },
    { label: 'No match', args: [[1,2,3],7], expected: false },
  ],
  bruteHint: 'The brute-force approach checks every subarray directly — for each starting index, extend the ending index outward while keeping a running sum, and test whether that sum is divisible by k. That covers roughly n² subarrays in the worst case. At n up to 100,000, how many sums would you be computing, and would that finish in time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'modular-prefix-sum',
      question: 'Certain wording in a problem description encodes a mathematical relationship you can exploit directly, instead of recomputing sums from scratch. A subarray sum is a multiple of k when prefix_sum[j] % k == prefix_sum[i] % k. What does this let you track?',
      options: [
        { label: 'Check every pair of prefix sums for equality', isCorrect: false, feedback: 'Checking every pair is O(n²). The insight is that you only need to know if a remainder has been seen before, not which specific pair produced it.' },
        { label: 'Store seen prefix-sum remainders mod k', isCorrect: true },
        { label: 'Sort prefix sums and scan for equal adjacent values', isCorrect: false, feedback: 'Sorting loses the index ordering needed to verify the subarray length is at least 2.' },
        { label: 'Track the total sum and check divisibility once at the end', isCorrect: false, feedback: 'A divisible total only confirms the full-array sum; it misses shorter qualifying subarrays like [2,4] in the first example.' },
      ],
      correctFeedback: 'If prefix_sum[j] % k == prefix_sum[i] % k, then (prefix_sum[j] − prefix_sum[i]) % k = 0, meaning nums[i+1..j] is divisible by k. A hash map of {remainder: first_index} catches this in O(n).',
      wrongFeedback: [
        'If two prefix sums share the same remainder mod k, what does their difference equal mod k? What does that mean for the subarray between them?',
        'Two prefix sums with equal remainders mod k differ by a multiple of k. The subarray between those indices has a sum that is a multiple of k.',
      ],
      highlight: { location: 'description', text: 'is a multiple of' },
    },
    {
      id: 'length-at-least-two',
      question: 'A minimum-length guarantee on the answer tells you exactly what extra bookkeeping your check can\'t skip. The subarray must have length at least 2. How does this constrain your hash-map check?',
      options: [
        { label: 'Require the stored index to be at least 2', isCorrect: false, feedback: 'The stored index is the first occurrence of a remainder — it can be any valid index. The length constraint is about the gap between indices, not their absolute values.' },
        { label: 'Only return true if current_index − stored_index ≥ 2', isCorrect: true },
        { label: 'Skip the first element before recording remainders', isCorrect: false, feedback: 'Skipping the first element would miss valid subarrays that start at index 0. You need to check length, not skip indices.' },
        { label: 'Check that the subarray contains at least one even number', isCorrect: false, feedback: 'Parity of elements is irrelevant. The constraint is purely about the count of elements in the subarray being ≥ 2.' },
      ],
      correctFeedback: 'When you find a repeated remainder at index j, the subarray is nums[stored+1..j]. Its length is j − stored. You need j − stored ≥ 2, i.e., stored_index ≤ j − 2.',
      wrongFeedback: [
        'If the remainder was first seen at index i and is now seen at index j, the subarray is nums[i+1..j]. How long is that subarray?',
        'Subarray length = j − i. For length ≥ 2 you need j − i ≥ 2. Store the first occurrence and check the gap before returning true.',
      ],
      highlight: { location: 'description', text: 'a subarray of length at least 2' },
    },
    {
      id: 'seed-the-map',
      question: 'An initialization step that looks arbitrary is usually there to correctly cover an edge case the main scan would otherwise miss. You initialize the map with {0: -1} before scanning. Why?',
      options: [
        { label: 'Handle k = 0 as a special case', isCorrect: false, feedback: 'k = 0 is a separate edge case handled by checking if any subarray sum equals zero. The seed {0: −1} handles a different situation.' },
        { label: 'Detect subarrays starting at index 0 that are divisible by k', isCorrect: true },
        { label: 'Prevent a lookup error the first time a remainder is checked', isCorrect: false, feedback: 'A KeyError can be avoided with a default — the seed {0: −1} has semantic meaning beyond defensive programming.' },
        { label: 'Mark that the empty prefix has sum −1', isCorrect: false, feedback: 'The empty prefix has sum 0, not −1. The value −1 is the index, representing a virtual position before the array starts.' },
      ],
      correctFeedback: 'If prefix_sum[j] % k == 0, the subarray nums[0..j] is divisible by k. With {0: −1} in the map, the length check gives j − (−1) = j + 1 ≥ 2 whenever j ≥ 1.',
      wrongFeedback: [
        'What should happen if the prefix sum at index 1 is already divisible by k? Trace through with {0: −1} in the map — what length do you compute?',
        'With {0: −1}, a prefix sum of 0 at index j gives length j − (−1) = j + 1. Without the seed, a valid prefix subarray starting at 0 would be missed entirely.',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. nums.length ≤ 10⁵ and values up to 10⁹ tell you…',
      options: [
        { label: 'O(n²) checking all subarray sums is fine', isCorrect: false, feedback: 'At n = 100,000, O(n²) means 10 billion subarray sum checks — too slow. The prefix-sum map approach runs in O(n).' },
        { label: 'O(n) with a single pass is the target', isCorrect: true },
        { label: 'Values up to 10⁹ require 64-bit prefix sums only', isCorrect: false, feedback: 'While large values mean prefix sums can overflow 32-bit integers, the key insight is about algorithm complexity, not integer width — and you are taking mod k anyway.' },
        { label: 'O(n log n) is needed due to large element values', isCorrect: false, feedback: 'Element magnitude does not affect algorithm complexity here. The mod operation reduces remainders to [0, k−1] regardless of element size.' },
      ],
      correctFeedback: 'One pass computes prefix sums and does O(1) map lookups — O(n) total. At n = 100,000 that is 100,000 steps, well within time limits.',
      wrongFeedback: [
        'How many subarray sums exist for n = 100,000? Can you compute and check all of them in time?',
        'The hash map reduces each step to O(1): compute prefix_sum % k and check the map. What is the total complexity across n elements?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 10⁵' },
    },
  ],
  solutionCode: `class Solution:
    def check_subarray_sum(self, nums, k):
        seen = {0: -1}
        total = 0
        for i, n in enumerate(nums):
            total += n
            r = total % k if k != 0 else total
            if r in seen:
                if i - seen[r] >= 2:
                    return True
            else:
                seen[r] = i
        return False`,
  solutionComplexity: { time: 'O(n)', space: 'O(min(n, k))' },
  solutionCaveat: 'Only the *first* index seen for each remainder is ever stored, never overwritten — keeping the earliest occurrence maximizes the gap to any later index with the same remainder, giving the best chance of hitting the "length at least 2" requirement.',
  solutionExplanation: 'A subarray\'s sum is a multiple of <code>k</code> exactly when the prefix sums at its two endpoints share the same remainder mod <code>k</code> — subtracting them cancels everything but a multiple of <code>k</code>. So the problem becomes: has this remainder been seen before, at an index far enough back to give a subarray of length at least 2? Storing the first index each remainder appears at and comparing gaps on every later repeat answers exactly that in one linear pass, with the sentinel <code>{0: -1}</code> covering subarrays that start at index 0.',
}
