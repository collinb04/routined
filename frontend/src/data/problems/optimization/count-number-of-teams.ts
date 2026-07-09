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
  bruteHint: 'Describe the brute-force approach of checking every triple of indices directly and its time complexity.',
  optimizeHint: 'Name what you can precompute for each soldier — how many smaller and larger ratings sit on each side — to avoid the third nested loop.',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 1000 tells you…',
      options: [
        { label: 'O(n) is required',         isCorrect: false, feedback: 'O(n) would be impressive, but n ≤ 1000 is a hint that slower approaches are acceptable. At n = 1000, even O(n²) is only 1 million operations.' },
        { label: 'O(n²) is acceptable',       isCorrect: true },
        { label: 'O(n³) is fine — n is tiny', isCorrect: false, feedback: 'At n = 1000, O(n³) is 1 billion operations — too slow. The constraint permits quadratic, not cubic.' },
        { label: 'Input size is irrelevant',  isCorrect: false, feedback: 'Input size always shapes your complexity budget. n ≤ 1000 signals that O(n²) is your practical ceiling here.' },
      ],
      correctFeedback: 'At n = 1000, O(n²) is 1 million operations — fast. O(n³) would be 1 billion — too slow. The constraint targets a quadratic solution.',
      wrongFeedback: [
        'Square n = 1000 and cube it. Which of those fits in a reasonable operation count?',
        '1000² = 1 million, 1000³ = 1 billion. The constraint permits O(n²) and rules out O(n³).',
      ],
    },
    {
      id: 'triple-structure',
      question: 'A team requires indices i < j < k with strictly increasing or decreasing ratings. What does the index ordering imply?',
      options: [
        { label: 'Sort the array to find valid triples',        isCorrect: false, feedback: 'Sorting destroys the original indices. The constraint i < j < k is about positions in the original array — you must preserve the order.' },
        { label: 'Fix the middle element and count valid pairs on each side', isCorrect: true },
        { label: 'Use a sliding window of size 3',             isCorrect: false, feedback: 'A sliding window only checks consecutive triples. Valid teams can span any three positions, not just adjacent ones.' },
        { label: 'Enumerate all triples with three nested loops', isCorrect: false, feedback: 'Three nested loops are O(n³) — too slow at n = 1000. The index ordering suggests a smarter approach: fix one element and count around it.' },
      ],
      correctFeedback: 'For each middle index j, count how many i < j have rating[i] < rating[j] (call it left_less) and how many k > j have rating[k] > rating[j] (call it right_greater). The ascending teams through j = left_less × right_greater.',
      wrongFeedback: [
        'If you fix j as the middle soldier, what two independent counts do you need from the left side and the right side?',
        'Left of j: count elements smaller (and larger) than rating[j]. Right of j: count elements larger (and smaller). Multiply the matching pair for each direction.',
      ],
    },
    {
      id: 'two-directions',
      question: 'Valid teams are either strictly increasing or strictly decreasing. How does this affect counting?',
      options: [
        { label: 'Run the algorithm twice on a reversed array',  isCorrect: false, feedback: 'You don\'t need a second pass. For each middle element, you already have left_less, left_greater, right_less, right_greater — ascending and descending teams come from the same single scan.' },
        { label: 'Count both directions in one pass',            isCorrect: true },
        { label: 'Subtract descending teams from total triples', isCorrect: false, feedback: 'You can\'t derive one direction by subtracting from total triples — the total includes all orderings, not just monotone ones. Count each direction directly.' },
        { label: 'Only count ascending — descending is symmetric', isCorrect: false, feedback: 'The input is not symmetric in general. A specific array might have more ascending teams than descending. You must count both explicitly.' },
      ],
      correctFeedback: 'For each middle index j, ascending teams = left_less × right_greater, and descending teams = left_greater × right_less. Sum both into a single total as you scan.',
      wrongFeedback: [
        'For middle index j, you already know four counts: elements smaller and larger on each side. Which pairs multiply to give ascending teams? Which for descending?',
        'Ascending: (smaller left) × (larger right). Descending: (larger left) × (smaller right). Both are computable from the same four counts.',
      ],
    },
    {
      id: 'unique-ratings',
      question: '"All ratings are unique" is guaranteed. What does this let you skip?',
      options: [
        { label: 'You don\'t need to handle equal-rating ties',       isCorrect: true },
        { label: 'You can sort the array and use binary search',       isCorrect: false, feedback: 'Uniqueness doesn\'t permit sorting — you still need original index ordering. It just means you never encounter a pair with equal ratings that would complicate the strict inequality check.' },
        { label: 'You can skip the i < j < k index constraint',        isCorrect: false, feedback: 'Uniqueness applies to ratings, not positions. The index constraint i < j < k is still required — two soldiers at different positions could have had the same rating without this guarantee.' },
        { label: 'You can use a hash set for O(1) membership lookup',  isCorrect: false, feedback: 'Membership lookup isn\'t the bottleneck here. The guarantee simplifies comparisons — every pair is strictly ordered — but doesn\'t change the core algorithm.' },
      ],
      correctFeedback: 'With all ratings unique, every pair is either strictly less or strictly greater — no ties to handle. You never need to check for equality in your comparisons.',
      wrongFeedback: [
        'If two soldiers had the same rating, would rating[i] < rating[j] < rating[k] still be strict? What does uniqueness remove from your logic?',
        'Uniqueness means every comparison is strictly one way or the other. You can check < and > without a separate equals case.',
      ],
    },
  ],
}
