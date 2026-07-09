export default {
  id: 'next-greater-element',
  title: 'Next Greater Element I',
  difficulty: 'easy',
  description: 'Given two arrays <code>nums1</code> and <code>nums2</code> (no duplicates), for each element in <code>nums1</code> find its <strong>next greater element</strong> in <code>nums2</code> — the first element to its right that is larger. Return <code>-1</code> if none exists.',
  examples: [
    { input: 'nums1 = [4, 1, 2], nums2 = [1, 3, 4, 2]', output: '[-1, 3, -1]', explanation: '4 has no greater element. 1\'s next greater in nums2 is 3. 2 has no greater element.' },
    { input: 'nums1 = [2, 4], nums2 = [1, 2, 3, 4]', output: '[3, -1]' },
  ],
  constraints: [
    '1 ≤ nums1.length ≤ nums2.length ≤ 1000',
    'All integers in nums1 and nums2 are unique',
    'All elements of nums1 appear in nums2',
  ],
  starterCode: `def next_greater_element(nums1, nums2):
  pass`,
  functionName: 'next_greater_element',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Basic', args: [[4, 1, 2], [1, 3, 4, 2]], expected: [-1, 3, -1] },
    { label: 'Ascending', args: [[2, 4], [1, 2, 3, 4]], expected: [3, -1] },
    { label: 'All descending', args: [[1, 3, 5], [5, 4, 3, 2, 1]], expected: [-1, -1, -1] },
    { label: 'Single element', args: [[1], [1, 2]], expected: [2] },
  ],
  bruteHint: 'Describe scanning forward from each element to find its next greater and its time complexity',
  optimizeHint: 'Name the kind of stack that lets you find every next-greater relationship in a single pass',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'nums2.length ≤ 1000. What does this say about brute-forcing next greater elements in nums2?',
      options: [
        { label: 'O(n²) brute force over nums2 is acceptable here', isCorrect: false, feedback: 'At n = 1000, O(n²) is 1 million — fast enough in Python. But the pattern generalizes: recognizing the monotonic stack approach here prepares you for the circular version where n = 10,000 and O(n²) is 100 million.' },
        { label: 'O(n) preprocessing of nums2 with a stack is the cleaner approach', isCorrect: true },
        { label: 'Binary search on nums2 finds the next greater element', isCorrect: false, feedback: 'Binary search requires a sorted array. nums2 is not sorted, and sorting it would destroy the position information needed to define "next greater to the right."' },
        { label: 'The constraint means you only need to process nums1', isCorrect: false, feedback: 'The next greater element is defined by position in nums2, not nums1. You must process nums2 to find next-greater relationships, regardless of nums1\'s size.' },
      ],
      correctFeedback: 'With n ≤ 1000, O(n²) barely fits. But the monotonic stack solves this in O(n) by processing each element of nums2 exactly once — and that approach scales to the harder circular variant.',
      wrongFeedback: [
        'If you loop over nums2 for every element of nums1, how many comparisons do you make? How does a preprocessing pass change that?',
        'What if you computed, once, a map from every value in nums2 to its next greater element? How many passes over nums2 does that take?',
      ],
    },
    {
      id: 'unique-values',
      question: 'All integers in nums1 and nums2 are unique. What does this let you use as a map key?',
      options: [
        { label: 'The element value directly as a hash map key', isCorrect: true },
        { label: 'The element\'s index in nums2', isCorrect: false, feedback: 'Indexing by position in nums2 would work, but then you would need a separate lookup to find the position of each nums1 element. Using value as the key gives direct O(1) lookup.' },
        { label: 'A sorted rank of each element', isCorrect: false, feedback: 'Ranking requires sorting — extra work. Uniqueness means values themselves are collision-free keys. No coordinate compression needed.' },
        { label: 'The difference between the element and its next greater', isCorrect: false, feedback: 'Differences are not useful as keys — multiple pairs can have the same difference. Unique values are the natural O(1) map key for value-to-answer lookup.' },
      ],
      correctFeedback: 'Uniqueness means no two elements share a value, so you can build next_greater[val] = answer with no collision. Lookup for each nums1 element is then O(1).',
      wrongFeedback: [
        'If values could repeat, two elements at different positions might have the same value but different next-greater answers. Why does uniqueness remove that ambiguity?',
        'You want to precompute the answer for every value in nums2 once, then look up each nums1 element. What map key makes that lookup O(1)?',
      ],
    },
    {
      id: 'monotonic-stack-signal',
      question: '"First element to the right that is larger" — what does a monotonic stack do when a new element is larger than the stack top?',
      options: [
        { label: 'It pushes the new element and ignores the top', isCorrect: false, feedback: 'When a new element is larger, it is the answer for the top element — you pop the top and record the result before pushing the new element. Ignoring the top would miss the answer.' },
        { label: 'It pops the top and records the new element as its next greater', isCorrect: true },
        { label: 'It clears the entire stack', isCorrect: false, feedback: 'Only elements smaller than the new arrival are popped — not the entire stack. Elements larger than the new arrival stay, still waiting for their own next greater element.' },
        { label: 'It sorts the stack to maintain order', isCorrect: false, feedback: 'A monotonic stack maintains order by construction — elements are only pushed when they preserve the monotone property. No sorting step exists.' },
      ],
      correctFeedback: 'The stack holds elements in decreasing order. When nums2[i] > stack.top(), nums2[i] is the first greater element for the top — pop, record next_greater[top] = nums2[i], and repeat while the condition holds.',
      wrongFeedback: [
        'Elements on the stack are waiting for their next greater element. When does a new arrival resolve that wait?',
        'Pop all stack elements smaller than the current value — each one has found its answer. Then push the current value. What remains on the stack after the full scan?',
      ],
    },
  ],
}
