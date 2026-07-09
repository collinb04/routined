export default {
  id: 'maximum-sum-3-non-overlapping',
  title: 'Maximum Sum of 3 Non-Overlapping Subarrays',
  difficulty: 'hard',
  description: 'Given an integer array <code>nums</code> and integer <code>k</code>, find 3 non-overlapping subarrays of length k with the maximum total sum. Return the starting indices of the subarrays.',
  examples: [
    { input: 'nums=[1,2,1,2,6,7,5,1], k=2', output: '[0,3,5]', explanation: 'Subarrays [1,2],[2,6],[7,5] with sum 15.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 2 × 10⁴', '1 ≤ nums[i] < 2¹⁶', '1 ≤ k ≤ ⌊nums.length / 3⌋'],
  starterCode: `def max_sum_of_three_subarrays(nums, k):
  pass`,
  functionName: 'max_sum_of_three_subarrays',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Standard', args: [[1,2,1,2,6,7,5,1],2], expected: [0,3,5] },
    { label: 'k=1', args: [[1,2,3],1], expected: [0,1,2] },
  ],
  bruteHint: 'Describe trying every combination of 3 non-overlapping windows and its time complexity',
  optimizeHint: 'Name what you would precompute once for every window sum, then explain how tracking the best window to the left and right of each position helps',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'nums.length ≤ 2 × 10⁴. What does this say about trying all triples of starting indices?',
      options: [
        { label: 'Trying all triples is fine', isCorrect: false, feedback: 'There are O(n³) triples — at n = 20,000 that is 8 × 10¹² combinations. Even O(n²) is 400 million, which is marginal. You need a linear or near-linear approach.' },
        { label: 'O(n) with precomputation is the target', isCorrect: true },
        { label: 'Only O(log n) solutions are fast enough', isCorrect: false, feedback: 'O(log n) is far stricter than needed. You cannot even read all windows in log n time. O(n) with a constant number of passes is the realistic target.' },
        { label: 'Input size does not affect the approach', isCorrect: false, feedback: 'Input size always constrains the approach. n = 20,000 rules out O(n³) triple enumeration and even makes O(n²) risky without optimization.' },
      ],
      correctFeedback: 'At n = 20,000, O(n³) is 8 trillion operations. You need to precompute window sums in O(n), then scan left and right best-window arrays — three linear passes total.',
      wrongFeedback: [
        'How many triples of starting indices exist for n = 20,000? What does that imply about nested loops?',
        'You need each window sum computed once, then a way to pick the best left, middle, and right window in a single scan. How many total passes does that require?',
      ],
    },
    {
      id: 'fixed-window-sum',
      question: 'All three subarrays have length exactly k. What does that let you precompute?',
      options: [
        { label: 'Precompute all window sums of length k in O(n)', isCorrect: true },
        { label: 'Sort windows by their sum', isCorrect: false, feedback: 'Sorting windows would help you find the largest sums, but you also need non-overlapping windows at valid positions — sorting loses the position structure you need.' },
        { label: 'Recompute each window sum from scratch as needed', isCorrect: false, feedback: 'Recomputing each window sum from scratch is O(k) per window, O(nk) total — up to 4 × 10⁸ at worst. A sliding window computes all window sums in O(n).' },
        { label: 'Only the first and last window need precomputation', isCorrect: false, feedback: 'All n − 3k + 1 valid windows are candidates. You need every window sum, not just the endpoints, to find the globally optimal triple.' },
      ],
      correctFeedback: 'A sliding window computes all window sums in O(n): add the new right element, subtract the leftmost element. Store these in a window_sum array for O(1) lookups later.',
      wrongFeedback: [
        'Each new window of length k overlaps the previous by k − 1 elements. What does that overlap let you reuse from the previous sum?',
        'If window_sum[i] is the sum of nums[i..i+k-1], how do you compute window_sum[i+1] from window_sum[i] in O(1)?',
      ],
    },
    {
      id: 'non-overlapping-constraint',
      question: 'The three subarrays must be non-overlapping. How does this shape the search over window positions?',
      options: [
        { label: 'Sort windows by position and pick the top 3', isCorrect: false, feedback: 'The top 3 sums may overlap. Non-overlapping means the middle window index j must satisfy j ≥ i + k and j + k ≤ right_start — position constraints, not sum rankings.' },
        { label: 'Fix the middle window index and find the best left and right independently', isCorrect: true },
        { label: 'Use backtracking to try all non-overlapping combinations', isCorrect: false, feedback: 'Backtracking is exponential in the number of windows. The non-overlapping structure is a partition into left / middle / right zones — exploitable with precomputed arrays, not search.' },
        { label: 'Greedily pick the highest-sum window, then repeat', isCorrect: false, feedback: 'Greedy does not work: the single highest-sum window might force poor choices for the other two. You need to jointly optimize all three positions.' },
      ],
      correctFeedback: 'For each middle window starting at j, the best left window is in [0, j−k] and the best right window is in [j+k, n−k]. Precompute left_best[i] and right_best[i] arrays so each lookup is O(1).',
      wrongFeedback: [
        'If the middle window starts at j, what range of indices is valid for the left window? For the right window?',
        'Build left_best[i] = index of the max-sum window in [0..i], and right_best[i] = index of the max-sum window in [i..n-k]. Then iterate j. How many passes does that take?',
      ],
    },
    {
      id: 'output-indices',
      question: 'The output is the starting indices, not the maximum sum itself. What tie-breaking rule applies?',
      options: [
        { label: 'Any valid triple is acceptable', isCorrect: false, feedback: 'The problem requires the lexicographically smallest index triple when ties exist. Returning an arbitrary valid triple may fail test cases where multiple optimal triples exist.' },
        { label: 'Return the lexicographically smallest index triple', isCorrect: true },
        { label: 'Return the triple with the largest middle window sum', isCorrect: false, feedback: 'Maximizing the middle window alone does not maximize the total. And tie-breaking is lexicographic on the indices, not on individual window sums.' },
        { label: 'Return the indices in sorted descending order', isCorrect: false, feedback: 'The indices must be returned in left-to-right order (left, middle, right) since the subarrays are non-overlapping and ordered. Descending order would be meaningless here.' },
      ],
      correctFeedback: 'When multiple triples achieve the same total sum, return the one that is lexicographically smallest. Use strict greater-than (not ≥) when updating the best left and right window arrays to preserve leftmost ties.',
      wrongFeedback: [
        'Two triples have the same total sum. Which one should you return — [0,3,5] or [0,3,6]?',
        'Lexicographic ordering compares the first index, then the second, then the third. To guarantee this, when does your left_best update — only on strictly greater sums, or on equal too?',
      ],
    },
  ],
}
