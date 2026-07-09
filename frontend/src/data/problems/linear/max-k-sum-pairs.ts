export default {
  id: 'max-k-sum-pairs',
  title: 'Max Number of K-Sum Pairs',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and an integer <code>k</code>, in one operation pick two numbers that sum to <code>k</code> and remove them. Return the maximum number of such operations.',
  examples: [
    { input: 'nums=[1,2,3,4], k=5', output: '2', explanation: '(1,4) and (2,3) are removed in 2 operations.' },
    { input: 'nums=[3,1,3,4,3], k=6', output: '1', explanation: 'Only one pair (3,3).' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '1 ≤ nums[i] ≤ 10⁹', '2 ≤ k ≤ 10⁹'],
  starterCode: `def max_operations(nums, k):
  pass`,
  functionName: 'max_operations',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'Two pairs', args: [[1,2,3,4],5], expected: 2 },
    { label: 'One pair', args: [[3,1,3,4,3],6], expected: 1 },
    { label: 'No pairs', args: [[1,2,3],10], expected: 0 },
  ],
  bruteHint: 'Describe checking every pair of elements, and the resulting time complexity',
  optimizeHint: 'Name the data structure that lets you look up how many complements are still available, or the sort-plus-two-pointers alternative',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'nums.length ≤ 10⁵. What does this rule out?',
      options: [
        { label: 'Checking every pair of elements', isCorrect: true },
        { label: 'Sorting the array first', isCorrect: false, feedback: 'Sorting is O(n log n) — roughly 1.7 million operations at n = 100,000. That is well within budget. The constraint rules out O(n²), not O(n log n).' },
        { label: 'Using a hash map to count values', isCorrect: false, feedback: 'A hash map runs in O(n) — easily within budget. The constraint is ruling out the O(n²) brute-force pair check, not faster structures.' },
        { label: 'Arrays with large values like 10⁹', isCorrect: false, feedback: 'The value range is a separate constraint. The length constraint limits time complexity, not value size. Large values affect index arithmetic, not whether an O(n) pass is fast enough.' },
      ],
      correctFeedback: 'At n = 100,000, checking every pair is O(n²) = 10 billion operations — too slow. You need an O(n) or O(n log n) approach.',
      wrongFeedback: [
        'How many pairs does a double nested loop check when n = 100,000?',
        'Two nested loops give O(n²) pairs. At n = 10⁵, that is 10¹⁰ comparisons. What faster approach can find all valid pairs?',
      ],
    },
    {
      id: 'complement-structure',
      question: 'For each element x, you need k − x. What structure lets you find k − x efficiently?',
      options: [
        { label: 'A sorted array with two pointers', isCorrect: false, feedback: 'A sorted two-pointer approach also works here — it is O(n log n). But the question is about which structure lets you find k − x: after sorting, you use the pointers on the array itself, not a separate structure.' },
        { label: 'A hash map counting remaining elements', isCorrect: true },
        { label: 'A stack to pair elements LIFO', isCorrect: false, feedback: 'A stack pairs the most-recently-seen element with the current one — but k-sum pairs have no recency requirement. The structure needs value-based lookup, not order-based.' },
        { label: 'A set to check if k − x exists', isCorrect: false, feedback: 'A set tells you whether k − x exists — but not how many times. When multiple copies of a value are available, you need counts to correctly limit the number of pairs.' },
      ],
      correctFeedback: 'A hash map keyed by value stores how many unused copies remain. For each x, look up count[k − x]; if positive, form a pair, decrement both counts.',
      wrongFeedback: [
        'You need to know both whether k − x is present and how many times it is available. Which structure gives you both in O(1)?',
        'A set answers "does k − x exist?" but what happens when k − x = x and there are two copies of x? You need counts, not just presence.',
      ],
    },
    {
      id: 'removal-semantics',
      question: 'Each operation removes the two matched numbers. How does this affect how you count available elements?',
      options: [
        { label: 'Re-scan the array after each removal', isCorrect: false, feedback: 'Re-scanning after each removal is O(n) per operation and O(n²) total — too slow. You can simulate removal by decrementing a count, not by modifying the array.' },
        { label: 'Mark removed indices with a sentinel value', isCorrect: false, feedback: 'Sentinel values require scanning past them on every future lookup, making worst-case O(n²). Counting available copies in a map is O(1) per operation.' },
        { label: 'Decrement the count of each matched element', isCorrect: true },
        { label: 'Sort and remove from sorted order each time', isCorrect: false, feedback: 'Repeatedly removing from a sorted structure is O(log n) per removal using a heap, or O(n) per removal with a list. Decrementing a count in a map is O(1) per pair — simpler and faster.' },
      ],
      correctFeedback: 'Decrementing a count simulates removal in O(1): once a value\'s count hits 0 it is treated as gone, without touching the original array.',
      wrongFeedback: [
        'You do not need to physically remove elements. What in a frequency map represents "this element is no longer available"?',
        'When a count reaches 0, that value is exhausted. How do you prevent pairing an element that has already been used?',
      ],
    },
    {
      id: 'output-count',
      question: 'The output is the maximum number of operations. What does "maximum" imply about how you should pair elements?',
      options: [
        { label: 'Greedily pair each element with its complement immediately', isCorrect: true },
        { label: 'Try all possible pairing orders and pick the best', isCorrect: false, feedback: 'Trying all orderings is exponential in the number of pairs. The greedy observation here is that pairing order does not affect the total count — any valid pair you can form, you should form.' },
        { label: 'Prefer pairing larger values first', isCorrect: false, feedback: 'Value size does not determine whether a pair forms — only whether x and k − x are both available. There is no advantage to ordering by value when counts alone determine the result.' },
        { label: 'Save some elements to enable later pairs', isCorrect: false, feedback: 'Holding back an element can only reduce the count. If x and k − x are both available, forming that pair never prevents a future pair that would not have formed anyway.' },
      ],
      correctFeedback: 'Greedy works here: any pair you can form now does not block a future pair. Every available complement match should be taken immediately to maximize the count.',
      wrongFeedback: [
        'Would skipping a valid pair ever allow you to form more pairs later? Try an example: [1,4,4,1], k=5.',
        'Each pair is independent — forming (1,4) does not use up any elements needed for other pairs. What does that mean for the greedy choice?',
      ],
    },
  ],
}
