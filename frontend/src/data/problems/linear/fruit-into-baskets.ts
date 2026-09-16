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
  starterCode: `class Solution:
    def total_fruit(self, fruits):
        pass`,
  runnerSetup: 'total_fruit = Solution().total_fruit',
  functionName: 'total_fruit',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'All unique max 3', args: [[1,2,1]], expected: 3 },
    { label: 'Sliding window', args: [[0,1,2,2]], expected: 3 },
    { label: 'Three types', args: [[1,2,3,2,2]], expected: 4 },
    { label: 'Single type', args: [[1,1,1]], expected: 3 },
  ],
  bruteHint: 'The brute-force approach checks every possible start and end pair, and for each subarray verifies whether it contains at most 2 distinct fruit types before tracking the longest one that qualifies. Naively re-scanning each subarray to count distinct types costs O(n) per subarray, so checking all O(n²) subarrays lands you at O(n³) overall — or O(n²) if you incrementally track distinct counts as you extend the end pointer for each fixed start. At n up to 100,000, how many operations does either version actually run, and does that fit in time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-restatement',
      question: 'Key details in a problem\'s setup often translate directly into a formal structural constraint. "Two baskets, each holding one fruit type" — restated as a data problem, you need the longest subarray with at most…',
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
      highlight: { location: 'description', text: 'each basket can hold only one type of fruit' },
    },
    {
      id: 'contiguous-picking',
      question: 'The way a problem lets you move through the input determines what shape the answer must take. "Starting from any position, you must pick fruits moving right." What kind of substructure are you maximizing?',
      options: [
        { label: 'Any subset of elements (non-contiguous)', isCorrect: false, feedback: 'You must pick fruits moving right without skipping — once you stop picking at a position, you can\'t resume. This means your picked fruits are always a contiguous subarray.' },
        { label: 'A contiguous subarray', isCorrect: false },
        { label: 'One unbroken stretch of the array', isCorrect: true },
        { label: 'The entire array minus outliers', isCorrect: false, feedback: 'You\'re not removing elements — you\'re choosing where to start and stop picking. The result is one contiguous segment, and you want the longest valid one.' },
      ],
      correctFeedback: 'Moving right from a starting position without skipping is exactly a sliding window. You grow the window right, and shrink from the left when the type count exceeds 2.',
      wrongFeedback: [
        'Can you skip over a fruit type you don\'t want? What constraint forces your picks to be adjacent?',
        'You pick from some index left to some index right without gaps. What data structure pattern operates on a contiguous range and adjusts its boundaries?',
      ],
      highlight: { location: 'description', text: 'Starting from any position, you must pick fruits moving right' },
    },
    {
      id: 'constraint-size',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. fruits.length ≤ 10⁵. What complexity do you need?',
      options: [
        { label: 'O(n²) — check all pairs of start/end', isCorrect: false, feedback: 'O(n²) at n = 100,000 is 10 billion operations — far too slow. Checking every (start, end) pair is brute force; the sliding window avoids revisiting elements.' },
        { label: 'O(n log n) via sorting', isCorrect: false, feedback: 'Sorting isn\'t relevant here — the subarray must preserve order, and sorting destroys positional information. O(n log n) is also more than needed.' },
        { label: 'O(n) — one pass, pointers only move forward', isCorrect: true },
        { label: 'O(1) — fixed answer regardless of size', isCorrect: false, feedback: 'The answer depends on the input — you must examine the array. O(1) is impossible when the answer changes with the data.' },
      ],
      correctFeedback: 'A sliding window scans the array once: right pointer always advances, and left pointer only moves forward. Both pointers travel at most n steps total, giving O(n).',
      wrongFeedback: [
        'At n = 100,000, how many pairs (start, end) exist? Is that feasible?',
        'A sliding window\'s two pointers together move at most 2n steps. What total complexity does that give, and does it fit within n = 10⁵?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ fruits.length ≤ 10⁵' },
    },
    {
      id: 'window-shrink-condition',
      question: 'The exact bookkeeping a window needs determines which structure can keep up with it in O(1). When the window contains more than 2 fruit types, you must shrink from the left. What data structure efficiently tracks how many of each type are currently in the window?',
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
  solutionCode: `class Solution:
    def total_fruit(self, fruits):
        count = {}
        left = 0
        best = 0
        for right, f in enumerate(fruits):
            count[f] = count.get(f, 0) + 1
            while len(count) > 2:
                lf = fruits[left]
                count[lf] -= 1
                if count[lf] == 0:
                    del count[lf]
                left += 1
            best = max(best, right - left + 1)
        return best`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'The window only ever needs to *shrink by one step* when a third type appears, never reset — since the fruit that just triggered the third type is still inside the window, dropping just the leftmost element (repeatedly, if needed) is enough to restore the two-type invariant without losing progress on the rest of the window.',
  solutionExplanation: 'This is "longest subarray with at most 2 distinct values" wearing a fruit costume: expanding the window to the right and tracking a count per fruit type tells you exactly when a third type has snuck in (<code>len(count) > 2</code>), at which point shrinking from the left — decrementing counts and dropping any type that hits zero — is the only correction needed. Because the window only ever grows or shrinks by one element at a time and each fruit is added and removed from <code>count</code> at most once per position, the whole scan stays O(n) despite the nested-looking while loop.',
}
