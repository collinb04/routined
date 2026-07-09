export default {
  id: 'next-greater-element-ii',
  title: 'Next Greater Element II',
  difficulty: 'medium',
  description: 'Given a circular array <code>nums</code>, return the next greater number for every element. The next greater number of <code>nums[i]</code> is the first greater number reached when traversing to the right (wrapping around). Return -1 if none.',
  examples: [
    { input: 'nums = [1,2,1]', output: '[2,-1,2]', explanation: 'For nums[2]=1, traverse right: wraps to 2, which is greater.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹'],
  starterCode: `def next_greater_elements(nums):
  pass`,
  functionName: 'next_greater_elements',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Circular', args: [[1,2,1]], expected: [2,-1,2] },
    { label: 'Descending', args: [[3,2,1]], expected: [-1,3,3] },
    { label: 'All same', args: [[1,1,1]], expected: [-1,-1,-1] },
    { label: 'Ascending', args: [[1,2,3]], expected: [2,3,-1] },
  ],
  bruteHint: 'Describe scanning forward (and wrapping around) from each element and its time complexity',
  optimizeHint: 'Name the kind of stack that lets you find every next-greater relationship in two passes over the array',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'nums.length ≤ 10⁴. What does this tell you about acceptable complexity?',
      options: [
        { label: 'O(n²) is borderline acceptable', isCorrect: false, feedback: 'At n = 10,000, O(n²) is 100 million operations — slow in Python. The monotonic stack approach runs in O(n), which is the clean target here.' },
        { label: 'O(n) is the target', isCorrect: true },
        { label: 'O(n log n) is required for the circular traversal', isCorrect: false, feedback: 'The circular traversal does not inherently require sorting or heap operations. Simulating two passes over the array in O(n) handles the wrap-around.' },
        { label: 'Input size is irrelevant for this problem', isCorrect: false, feedback: 'Input size always constrains the approach. n ≤ 10,000 allows O(n) or O(n log n) solutions but points you toward the clean linear approach.' },
      ],
      correctFeedback: 'At n = 10,000, O(n²) is 100 million — marginal. The monotonic stack processes each element at most twice (once per simulated pass), giving O(n).',
      wrongFeedback: [
        'A brute-force approach checks every element to the right for each starting position. How many comparisons is that at n = 10,000?',
        'Each element is pushed and popped from the stack at most once. How many total stack operations does that imply across the entire array?',
      ],
    },
    {
      id: 'circular-array',
      question: 'The array is circular — traversal wraps around. How do you simulate this without physically duplicating the array?',
      options: [
        { label: 'Create a new array of length 2n by repeating nums', isCorrect: false, feedback: 'Duplicating the array works but uses O(n) extra space. You can simulate two passes by iterating indices from 0 to 2n−1 and using i % n to access the actual element.' },
        { label: 'Iterate indices 0 to 2n−1 using i % n to index into nums', isCorrect: true },
        { label: 'Sort the array so the largest element is found first', isCorrect: false, feedback: 'Sorting destroys the circular order — the next greater element must appear to the right in the original circular arrangement, not in sorted order.' },
        { label: 'Process only the first n/2 elements and mirror the rest', isCorrect: false, feedback: 'Mirroring does not apply here. Each element independently needs its own next greater element by traversing the full circle. There is no symmetry to exploit.' },
      ],
      correctFeedback: 'Two passes simulate the circle: iterate i from 0 to 2n−1, access nums[i % n]. Elements encountered in the second pass (i ≥ n) can resolve indices still on the stack from the first pass.',
      wrongFeedback: [
        'For nums = [3,2,1], element at index 1 (value 2) needs to wrap around to find 3. How can you reach index 0 again using a linear iteration?',
        'If you iterate i from 0 to 2n−1 and use nums[i % n], what happens when i ≥ n? Which indices from the first pass can now be resolved?',
      ],
    },
    {
      id: 'monotonic-stack-signal',
      question: '"First greater element to the right" — what data structure finds this efficiently for every element?',
      options: [
        { label: 'A max-heap sorted by element value', isCorrect: false, feedback: 'A max-heap finds the global maximum — not the first greater element to the right of each position. Order relative to the current index is what matters, and a heap does not preserve that.' },
        { label: 'A monotonic stack storing indices of unresolved elements', isCorrect: true },
        { label: 'A hash map from value to next greater value', isCorrect: false, feedback: 'A hash map would work if values were unique and positions did not matter, but the "first greater to the right" depends on the position in the array, not just the value.' },
        { label: 'Prefix maximum array', isCorrect: false, feedback: 'A prefix maximum tells you the largest element up to index i — but not the first greater element strictly to the right of a given position. You need a right-looking structure, not a left-accumulating one.' },
      ],
      correctFeedback: 'A monotonic stack stores indices whose next greater element is not yet known. When a new element is larger than the stack top, it is the answer for the top index — pop, record, repeat.',
      wrongFeedback: [
        'Elements waiting for their next greater element form a pending list. When a new element arrives, it resolves some of them. Which elements does it resolve — all of them, or just some?',
        'The stack maintains elements in decreasing order. When nums[i] > nums[stack.top()], what does that mean about nums[i] relative to the stack top?',
      ],
    },
    {
      id: 'no-greater-element',
      question: 'Return -1 if no greater element exists after wrapping the full circle. Which elements receive -1?',
      options: [
        { label: 'Only elements at the last index', isCorrect: false, feedback: 'The last element can still find a greater element by wrapping. For [1,2,3], the last element 3 has no greater element — but for [3,2,1], element 3 at index 0 also gets -1.' },
        { label: 'Elements still on the stack after both passes', isCorrect: true },
        { label: 'Elements with value equal to the array maximum', isCorrect: false, feedback: 'The global maximum always gets -1, but so does any element that wraps the full circle without finding a larger value. Stack remainder is the precise characterization.' },
        { label: 'Elements that appear more than once in the array', isCorrect: false, feedback: 'Duplicates have no special relationship to the -1 outcome. [1,1,1] gives [-1,-1,-1] not because of duplicates, but because no element is ever strictly greater than 1.' },
      ],
      correctFeedback: 'After both passes, any index still in the stack never found a greater element during the full circular traversal. Initialize the result array to -1, and only overwrite positions that get resolved.',
      wrongFeedback: [
        'After iterating 2n indices, some stack entries were never popped. What does it mean for an index to remain on the stack after both passes?',
        'If an element has no greater element in the entire circular array, it never gets popped during the scan. How does your initialization handle those indices?',
      ],
    },
  ],
}
