export default {
  id: 'binary-search',
  title: 'Binary Search',
  difficulty: 'easy',
  description: 'Given a sorted array of integers <code>nums</code> and a <code>target</code>, return the index of the target. If not found, return <code>-1</code>.',
  examples: [
    { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', output: '4', explanation: '9 exists at index 4.' },
    { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', output: '-1', explanation: '2 does not exist in the array.' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10⁴',
    'nums is sorted in ascending order with unique values',
  ],
  starterCode: `def binary_search(nums, target):
  pass`,
  functionName: 'binary_search',
  conceptId: 'binary-search',
  testCases: [
    { label: 'Found', args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
    { label: 'Not found', args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
    { label: 'Single element', args: [[5], 5], expected: 0 },
    { label: 'First element', args: [[1, 3, 5, 7], 1], expected: 0 },
    { label: 'Last element', args: [[1, 3, 5, 7], 7], expected: 3 },
  ],
  clues: [
    {
      id: 'sorted-input',
      question: '"nums is sorted in ascending order" — what does this tell you about how to search?',
      options: [
        { label: 'Scan every element linearly', isCorrect: false, feedback: 'Linear scan ignores the sorted order entirely. Sorting is a structural guarantee that lets you eliminate half the remaining elements with each comparison.' },
        { label: 'Use a hash map for O(1) lookup', isCorrect: false, feedback: 'A hash map is powerful for unsorted data, but you already have something better: sorted order. You can exploit that structure without extra space.' },
        { label: 'Halve the search space each step', isCorrect: true },
        { label: 'Sort it again before searching', isCorrect: false, feedback: 'The array is already sorted — re-sorting is unnecessary work. The guarantee is there so you can skip it.' },
      ],
      correctFeedback: 'Sorted order means if the middle element is too small, the target must be in the right half — and vice versa. Each comparison halves the remaining search space, giving O(log n).',
      wrongFeedback: [
        'The array is already sorted. What does knowing the relative order of every element let you do that a linear scan cannot?',
        'If the midpoint is less than your target, can you rule out the entire left half? What operation does that describe?',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'nums.length ≤ 10⁴ — is a linear scan acceptable here?',
      options: [
        { label: 'Yes, 10⁴ is small enough', isCorrect: false, feedback: 'Linear scan is O(n), which is 10,000 operations at worst — that would pass. But the sorted guarantee makes O(log n) achievable, and the problem is testing whether you use it.' },
        { label: 'No, you must use O(log n)', isCorrect: true },
        { label: 'No, you need O(1) lookup', isCorrect: false, feedback: 'O(1) lookup requires a hash map or direct indexing, neither of which applies to searching an unknown target in a sorted array.' },
        { label: 'Input size is irrelevant here', isCorrect: false, feedback: 'Input size always matters. At n = 10⁴, O(log n) is about 14 comparisons versus 10,000 — the constraint signals which approach the problem is training.' },
      ],
      correctFeedback: 'The problem title and sorted guarantee together signal O(log n). At n = 10⁴, binary search takes roughly 14 comparisons; linear scan takes up to 10,000.',
      wrongFeedback: [
        'The array is sorted and the problem is called "Binary Search." What complexity does binary search achieve?',
        'Binary search cuts the remaining candidates in half each step. How many steps does that take to reach 1 candidate from 10,000?',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is the index of the target, not the value. What does that mean for your search state?',
      options: [
        { label: 'Track the value at each midpoint', isCorrect: false, feedback: 'You compare values to decide which half to search next, but the thing you ultimately return is a position, not a value.' },
        { label: 'Track left and right index boundaries', isCorrect: true },
        { label: 'Build a map from values to indices first', isCorrect: false, feedback: 'Prebuilding a map costs O(n) time and space. The sorted structure already enables index-based searching without it.' },
        { label: 'Return early as soon as any match appears', isCorrect: false },
      ],
      correctFeedback: 'Binary search works by narrowing an index window — left and right pointers. The midpoint index is what you check and ultimately return.',
      wrongFeedback: [
        'You need to return a position. What two variables define the range of positions still under consideration?',
        'Binary search maintains a window with two pointers. Those pointers are indices, not values.',
      ],
    },
    {
      id: 'not-found-case',
      question: 'Return -1 if not found. When does the search definitely fail?',
      options: [
        { label: 'When left equals right', isCorrect: false, feedback: 'When left equals right, one candidate remains and must still be checked. The window is exhausted only when left exceeds right.' },
        { label: 'When the midpoint value is too large', isCorrect: false, feedback: 'A midpoint being too large just narrows the window to the left half — it does not end the search.' },
        { label: 'When left exceeds right', isCorrect: true },
        { label: 'When the array length is odd', isCorrect: false, feedback: 'Array length parity has no bearing on whether the target exists. The search ends when the window collapses.' },
      ],
      correctFeedback: 'The loop runs while left ≤ right. Once left > right, the window is empty — no candidate remains, so the target is absent and you return -1.',
      wrongFeedback: [
        'Think about what the left and right pointers represent. When is there provably no index left to check?',
        'The search window is the range [left, right]. What condition means that range contains zero elements?',
      ],
    },
  ],
}
