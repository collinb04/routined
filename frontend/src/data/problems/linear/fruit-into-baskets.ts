export default {
  id: 'fruit-into-baskets',
  title: 'Fruit Into Baskets',
  difficulty: 'medium',
  description: 'You have two baskets and a fruit-type array. Starting from any position, you must pick fruits moving right, but each basket can hold only one type of fruit. Return the maximum fruits you can collect.',
  examples: [
    { input: 'fruits = [1,2,1]', output: '3', explanation: 'Pick all three fruits.' },
    { input: 'fruits = [0,1,2,2]', output: '3', explanation: 'Pick fruits 1,2,2.' },
  ],
  constraints: ['1 ≤ fruits.length ≤ 10⁵', '0 ≤ fruits[i] < fruits.length'],
  starterCode: `def total_fruit(fruits):
  pass`,
  functionName: 'total_fruit',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'All unique max 3', args: [[1,2,1]], expected: 3 },
    { label: 'Sliding window', args: [[0,1,2,2]], expected: 3 },
    { label: 'Three types', args: [[1,2,3,2,2]], expected: 4 },
    { label: 'Single type', args: [[1,1,1]], expected: 3 },
  ],
  bruteHint: 'Describe checking every subarray (or every start/end pair) for at most 2 distinct fruit types, and its time complexity',
  optimizeHint: 'Name the technique that maintains a window with at most 2 distinct fruit types as you scan',
  clues: [
    {
      id: 'constraint-restatement',
      question: '"Two baskets, each holding one fruit type" — restated as a data problem, you need the longest subarray with at most…',
      options: [
        { label: 'Exactly 2 distinct values', isCorrect: false, feedback: 'Exactly 2 would exclude subarrays with only one fruit type. The baskets don\'t need to both be in use — "at most 2 distinct" captures every valid window including single-type stretches.' },
        { label: 'At most 2 distinct values', isCorrect: true },
        { label: 'At most 2 consecutive duplicates', isCorrect: false, feedback: '"Consecutive duplicates" is about how elements repeat in sequence, not about how many distinct types exist. [1,2,1,2] has no consecutive duplicates yet fits perfectly in two baskets.' },
        { label: '2 total elements', isCorrect: false, feedback: 'The baskets constrain types, not quantity. You can fill both baskets with as many fruits as you like — the limit is 2 distinct fruit types, not 2 total fruits.' },
      ],
      correctFeedback: 'Two baskets, each one fruit type, means at most 2 distinct values in your window. This is the classic "longest subarray with at most k distinct elements" pattern, here with k = 2.',
      wrongFeedback: [
        'You have 2 baskets, each holding one type. What\'s the maximum number of distinct fruit types you can collect in one continuous picking session?',
        'Restate the basket rule in terms of distinct values in a subarray. "At most" or "exactly"?',
      ],
    },
    {
      id: 'contiguous-picking',
      question: '"Starting from any position, you must pick fruits moving right." What kind of substructure are you maximizing?',
      options: [
        { label: 'Any subset of elements (non-contiguous)', isCorrect: false, feedback: 'You must pick fruits moving right without skipping — once you stop picking at a position, you can\'t resume. This means your picked fruits are always a contiguous subarray.' },
        { label: 'A contiguous subarray', isCorrect: false },
        { label: 'A contiguous subarray (window)', isCorrect: true },
        { label: 'The entire array minus outliers', isCorrect: false, feedback: 'You\'re not removing elements — you\'re choosing where to start and stop picking. The result is one contiguous segment, and you want the longest valid one.' },
      ],
      correctFeedback: 'Moving right from a starting position without skipping is exactly a sliding window. You grow the window right, and shrink from the left when the type count exceeds 2.',
      wrongFeedback: [
        'Can you skip over a fruit type you don\'t want? What constraint forces your picks to be adjacent?',
        'You pick from some index left to some index right without gaps. What data structure pattern operates on a contiguous range and adjusts its boundaries?',
      ],
    },
    {
      id: 'constraint-size',
      question: 'fruits.length ≤ 10⁵. What complexity do you need?',
      options: [
        { label: 'O(n²) — check all pairs of start/end', isCorrect: false, feedback: 'O(n²) at n = 100,000 is 10 billion operations — far too slow. Checking every (start, end) pair is brute force; the sliding window avoids revisiting elements.' },
        { label: 'O(n log n) via sorting', isCorrect: false, feedback: 'Sorting isn\'t relevant here — the subarray must preserve order, and sorting destroys positional information. O(n log n) is also more than needed.' },
        { label: 'O(n) with a sliding window', isCorrect: true },
        { label: 'O(1) — fixed answer regardless of size', isCorrect: false, feedback: 'The answer depends on the input — you must examine the array. O(1) is impossible when the answer changes with the data.' },
      ],
      correctFeedback: 'A sliding window scans the array once: right pointer always advances, and left pointer only moves forward. Both pointers travel at most n steps total, giving O(n).',
      wrongFeedback: [
        'At n = 100,000, how many pairs (start, end) exist? Is that feasible?',
        'A sliding window\'s two pointers together move at most 2n steps. What total complexity does that give, and does it fit within n = 10⁵?',
      ],
    },
    {
      id: 'window-shrink-condition',
      question: 'When the window contains more than 2 fruit types, you must shrink from the left. What data structure efficiently tracks how many of each type are currently in the window?',
      options: [
        { label: 'A sorted set of fruit types', isCorrect: false, feedback: 'A sorted set tracks which types are present but not how many of each remain in the window. When you remove a fruit from the left, you need to know if that type is exhausted — a count is necessary.' },
        { label: 'A hash map from fruit type to count', isCorrect: true },
        { label: 'A running total of distinct types', isCorrect: false, feedback: 'A single integer distinct count doesn\'t tell you which type to remove when you shrink left. You need per-type counts to know when a type drops to zero and leaves the window.' },
        { label: 'Two variables, one per basket', isCorrect: false, feedback: 'Two variables work when types are fixed, but basket contents change dynamically as you slide. You need to handle any pair of types and track their current counts simultaneously.' },
      ],
      correctFeedback: 'A hash map (fruit type → count in window) lets you increment on right expansion and decrement on left shrinkage. When a count hits zero, remove the key — the map size then reflects the number of distinct types.',
      wrongFeedback: [
        'When you slide the left pointer past a fruit, you need to know if that type still appears in the window. What tells you that?',
        'You need both the set of current types and their quantities. Which structure stores both pieces of information?',
      ],
    },
  ],
}
