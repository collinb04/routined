export default {
  id: 'count-number-nice-subarrays',
  title: 'Count Number of Nice Subarrays',
  difficulty: 'medium',
  description: 'Given an array of integers <code>nums</code> and integer <code>k</code>, a "nice" subarray contains exactly <code>k</code> odd numbers. Return the number of nice subarrays.',
  examples: [
    { input: 'nums=[1,1,2,1,1], k=3', output: '2', explanation: 'Subarrays [1,1,2,1] and [1,2,1,1] each have exactly 3 odd numbers.' },
    { input: 'nums=[2,4,6], k=1', output: '0' },
  ],
  constraints: ['1 ≤ nums.length ≤ 50000', '1 ≤ nums[i] ≤ 10⁵', '1 ≤ k ≤ nums.length'],
  starterCode: `def number_of_subarrays(nums, k):
  pass`,
  functionName: 'number_of_subarrays',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'Two nice', args: [[1,1,2,1,1],3], expected: 2 },
    { label: 'No nice', args: [[2,4,6],1], expected: 0 },
    { label: 'All odd', args: [[1,3,5],2], expected: 2 },
  ],
  clues: [
    {
      id: 'odd-as-one-even-as-zero',
      question: 'The problem counts odd numbers in subarrays. What transformation simplifies this to a prefix-sum problem?',
      options: [
        { label: 'Sort elements by parity', isCorrect: false, feedback: 'Sorting destroys the subarray structure — subarrays are contiguous, so element positions must be preserved.' },
        { label: 'Replace each element with 1 if odd, 0 if even', isCorrect: true },
        { label: 'Store only the indices of odd numbers', isCorrect: false, feedback: 'Storing odd indices is one approach, but converting to a binary array lets you apply standard prefix-sum techniques directly.' },
        { label: 'Divide each element by 2 and check the remainder', isCorrect: false, feedback: 'That determines parity, but storing the remainder directly (1 or 0) is the useful transformation — not storing the divided values.' },
      ],
      correctFeedback: 'After replacement, each element is 0 or 1. The sum of any subarray equals its odd count. Now "exactly k odds" becomes "prefix_sum[j] − prefix_sum[i] = k", a standard prefix-sum count problem.',
      wrongFeedback: [
        'After mapping odds to 1 and evens to 0, what does the sum of a subarray represent? How does "exactly k odds" translate?',
        'The transformed array has prefix sums. A subarray from i+1 to j has k odds when prefix_sum[j] − prefix_sum[i] = k. What does that let you count?',
      ],
    },
    {
      id: 'prefix-sum-count',
      question: 'You need subarrays where prefix_sum[j] − prefix_sum[i] = k. What does this reduce to?',
      options: [
        { label: 'Finding the maximum prefix sum', isCorrect: false, feedback: 'Maximum prefix sum finds the largest cumulative odd count, not the number of subarrays with exactly k odds.' },
        { label: 'Counting prefix sums equal to (current sum − k)', isCorrect: true },
        { label: 'Checking all pairs of indices for the difference', isCorrect: false, feedback: 'Checking all pairs is O(n²). The hash map approach answers in O(1) per step by storing prefix sum frequencies.' },
        { label: 'Using a two-pointer to slide a window of size k', isCorrect: false, feedback: 'A two-pointer window of fixed size k would count elements, not subarrays with exactly k odds — even elements can pad the subarray to different lengths.' },
      ],
      correctFeedback: 'At each index j with prefix_sum[j] = s, you want the count of previous indices i where prefix_sum[i] = s − k. A hash map {prefix_sum: frequency} gives that count in O(1).',
      wrongFeedback: [
        'For each j, how many valid i values satisfy prefix_sum[j] − prefix_sum[i] = k? What does your map need to store to answer that in O(1)?',
        'Store a frequency map of prefix sums seen so far. At each j, add freq[prefix_sum[j] − k] to your answer. Seed the map with {0: 1}.',
      ],
    },
    {
      id: 'seed-the-map',
      question: 'The map is initialized with {0: 1} before scanning. Why?',
      options: [
        { label: 'Handle the case where k = 0', isCorrect: false, feedback: 'The constraint says k ≥ 1, so k = 0 is not a valid input. The seed handles a different edge case.' },
        { label: 'Count subarrays starting at index 0 with exactly k odds', isCorrect: true },
        { label: 'Prevent division by zero in the frequency map', isCorrect: false, feedback: 'There is no division in this algorithm. The seed {0: 1} has semantic meaning — it represents the empty prefix.' },
        { label: 'Set the default frequency for unseen prefix sums', isCorrect: false, feedback: 'Unseen prefix sums implicitly have frequency 0. The seed {0: 1} specifically represents the empty prefix before index 0.' },
      ],
      correctFeedback: 'The empty prefix has sum 0 and exists once. When prefix_sum[j] = k, you look up freq[0] = 1, correctly counting the subarray from index 0 to j as a valid nice subarray.',
      wrongFeedback: [
        'Walk through [1,1,2,1,1] with k=3. At j=3, prefix_sum=3. You look up freq[3−3] = freq[0]. Why must that be 1?',
        'The seed {0: 1} represents the state before any element is processed. It allows subarrays from index 0 to be counted when their prefix sum equals k.',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'nums.length ≤ 50,000 tells you…',
      options: [
        { label: 'O(n²) scanning all subarrays is acceptable', isCorrect: false, feedback: 'At n = 50,000, O(n²) is 2.5 billion subarray checks — too slow. The prefix-sum map approach runs in O(n).' },
        { label: 'O(n) with a hash map is the target', isCorrect: true },
        { label: 'O(n log n) with a sorted structure is needed', isCorrect: false, feedback: 'No sorting is necessary. A hash map gives O(1) lookup per step, yielding O(n) overall.' },
        { label: 'n is small enough that brute force is fine', isCorrect: false, feedback: 'At 50,000 elements, O(n²) means 2.5 billion iterations — beyond what finishes in time.' },
      ],
      correctFeedback: 'One pass builds prefix sums and does O(1) map lookups — O(n) time and O(n) space. At n = 50,000 that is 50,000 steps, well within any time limit.',
      wrongFeedback: [
        'At n = 50,000, how many distinct subarrays exist? Can you evaluate each one in time?',
        'Each step is O(1): increment prefix sum, look up freq[sum − k], increment freq[sum]. What is the total complexity?',
      ],
    },
  ],
}
