export default {
  id: 'sort-an-array',
  title: 'Sort an Array',
  difficulty: 'medium',
  description: 'Given an array of integers, sort the array in ascending order and return it. Implement merge sort or quicksort (O(n log n) time, O(log n) space).',
  examples: [
    { input: 'nums = [5,2,3,1]', output: '[1,2,3,5]' },
    { input: 'nums = [5,1,1,2,0,0]', output: '[0,0,1,1,2,5]' },
  ],
  constraints: ['1 ≤ nums.length ≤ 5 × 10⁴', '-5 × 10⁴ ≤ nums[i] ≤ 5 × 10⁴'],
  starterCode: `def sort_array(nums):
  pass`,
  functionName: 'sort_array',
  conceptId: 'sorting',
  testCases: [
    { label: 'Unsorted', args: [[5,2,3,1]], expected: [1,2,3,5] },
    { label: 'With duplicates', args: [[5,1,1,2,0,0]], expected: [0,0,1,1,2,5] },
    { label: 'Single', args: [[1]], expected: [1] },
    { label: 'Already sorted', args: [[1,2,3]], expected: [1,2,3] },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 50,000 and the problem requires O(n log n). What does that rule out?',
      options: [
        { label: 'O(n log n) algorithms like merge sort', isCorrect: false, feedback: 'O(n log n) is the target, not what\'s ruled out. At n = 50,000, O(n log n) is about 800,000 operations — fast enough.' },
        { label: 'O(n²) algorithms like bubble sort or insertion sort', isCorrect: true },
        { label: 'O(n) counting sort', isCorrect: false, feedback: 'O(n) counting sort would satisfy the O(n log n) constraint and is also valid here given the bounded value range. The constraint rules out slower approaches, not faster ones.' },
        { label: 'Using recursion', isCorrect: false, feedback: 'Recursion is the natural structure for both merge sort and quicksort. The constraint is about time complexity, not implementation style.' },
      ],
      correctFeedback: 'At n = 50,000, O(n²) is 2.5 billion operations — far too slow. O(n log n) ≈ 800,000 operations. The constraint rules out selection sort, bubble sort, and insertion sort.',
      wrongFeedback: [
        'At n = 50,000, how many operations does O(n²) produce? Is that feasible?',
        '50,000² = 2.5 billion. Python handles roughly 10 million simple operations per second. How long would an O(n²) sort take?',
      ],
    },
    {
      id: 'space-constraint',
      question: 'The problem requires O(log n) space. Which sorting approach satisfies this?',
      options: [
        { label: 'Merge sort with O(n) auxiliary array', isCorrect: false, feedback: 'Standard merge sort allocates O(n) space for the merge buffer — that violates the O(log n) space requirement. Quicksort with in-place partitioning uses only O(log n) stack space.' },
        { label: 'Quicksort with in-place partitioning', isCorrect: true },
        { label: 'Counting sort with a frequency array', isCorrect: false, feedback: 'Counting sort uses O(max_value − min_value) space for its frequency array. With values ranging from −50,000 to 50,000, that\'s 100,001 entries — O(n) not O(log n).' },
        { label: 'Both merge sort and quicksort use O(log n) space', isCorrect: false, feedback: 'Standard merge sort uses O(n) auxiliary space for the temporary merge array. Only quicksort (in-place) achieves O(log n) from recursive call stack depth alone.' },
      ],
      correctFeedback: 'In-place quicksort uses O(log n) stack space from recursion depth (on average). Merge sort needs O(n) auxiliary space for the temporary merge buffer, violating the constraint.',
      wrongFeedback: [
        'Merge sort merges two halves into a temporary array. How large is that temporary array?',
        'Compare the auxiliary space each algorithm needs: merge sort allocates an extra array during the merge step; quicksort partitions in-place with only a recursion stack. Which fits O(log n)?',
      ],
    },
    {
      id: 'duplicates',
      question: 'The input may contain duplicates (e.g., [5,1,1,2,0,0]). How does that affect pivot choice in quicksort?',
      options: [
        { label: 'Duplicates always cause O(n²) behavior', isCorrect: false, feedback: 'Duplicates cause O(n²) only with a naive partition that puts equal elements on one side. Three-way partitioning (Dutch National Flag) handles duplicates in O(n log n) by grouping equal elements together.' },
        { label: 'Three-way partition handles equal elements efficiently', isCorrect: true },
        { label: 'Sort duplicates first with a counting pass', isCorrect: false, feedback: 'A counting pre-pass adds O(n) work and complexity without fixing the core partitioning issue. Three-way partition handles duplicates directly within the existing recursive structure.' },
        { label: 'Duplicates have no effect on quicksort performance', isCorrect: false, feedback: 'With a standard two-way partition, an array of all equal elements causes every partition to be maximally unbalanced — O(n²). Duplicates do matter for pivot and partition strategy.' },
      ],
      correctFeedback: 'Three-way partitioning (< pivot | == pivot | > pivot) places all equal elements in their final positions in one pass. Subarrays with many duplicates become very small, avoiding the O(n²) degenerate case.',
      wrongFeedback: [
        'What happens to a two-way quicksort partition when every element equals the pivot? Are the two halves balanced?',
        'A partition of all equal elements into [all elements | empty] gives O(n) levels of recursion — O(n²) total. What partition strategy groups equal elements together and recurses only on the unequal sides?',
      ],
    },
  ],
}
