export default {
  id: 'move-zeroes',
  title: 'Move Zeroes',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code>, move all 0s to the end while maintaining the relative order of non-zero elements. Do it in-place without making a copy.',
  examples: [
    { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' },
    { input: 'nums = [0]', output: '[0]' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1'],
  starterCode: `def move_zeroes(nums):
  pass
  return nums`,
  functionName: 'move_zeroes',
  conceptId: 'arrays',
  testCases: [
    { label: 'Standard', args: [[0,1,0,3,12]], expected: [1,3,12,0,0] },
    { label: 'Single zero', args: [[0]], expected: [0] },
    { label: 'No zeros', args: [[1,2,3]], expected: [1,2,3] },
    { label: 'All zeros', args: [[0,0,0]], expected: [0,0,0] },
  ],
  bruteHint: 'Describe building a new array to hold non-zero elements followed by zeros and its space cost',
  optimizeHint: 'Name the in-place technique that swaps elements using two pointers in a single pass',
  clues: [
    {
      id: 'in-place-constraint',
      question: '"Do it in-place without making a copy." What does this rule out?',
      options: [
        { label: 'Filtering non-zeros into a new array, then appending zeros', isCorrect: true },
        { label: 'Swapping elements within the original array', isCorrect: false, feedback: 'Swapping operates on the original array — it is in-place by definition. The constraint rules out allocating a separate array, not rearranging within the existing one.' },
        { label: 'Using a write pointer to overwrite elements', isCorrect: false, feedback: 'A write pointer that overwrites positions within the same array is in-place. The constraint rules out creating a second array of the same size, not index manipulation.' },
        { label: 'Iterating through the array more than once', isCorrect: false, feedback: 'Multiple passes over the same array are fine — they are still in-place. The constraint forbids allocating O(n) extra space for a copy, not additional iterations.' },
      ],
      correctFeedback: 'Creating a new array and concatenating non-zeros with zeros uses O(n) extra space. In-place means you must rearrange within the original array using only O(1) extra space.',
      wrongFeedback: [
        'What is the space cost of building a new filtered array? What does "in-place" require instead?',
        'In-place means O(1) extra space. Which approaches use O(n) extra space — a new array, a write pointer, or swapping?',
      ],
    },
    {
      id: 'relative-order',
      question: '"Maintain the relative order of non-zero elements." What does this rule out?',
      options: [
        { label: 'Sorting the array to push zeros to the end', isCorrect: true },
        { label: 'Overwriting positions left-to-right with non-zeros', isCorrect: false, feedback: 'Writing non-zeros left-to-right preserves their relative order — that is exactly the right approach. The constraint rules out order-scrambling methods like sorting.' },
        { label: 'Swapping each zero with the next non-zero element', isCorrect: false, feedback: 'Swapping a zero with the next non-zero keeps relative order intact. Non-zero elements pass each other in the same left-to-right sequence as they originally appeared.' },
        { label: 'Using two passes through the array', isCorrect: false, feedback: 'Two passes can preserve order — the first to place non-zeros, the second to fill zeros. The relative-order constraint rules out reordering methods, not the number of passes.' },
      ],
      correctFeedback: 'Sorting treats elements as interchangeable — [1,3,12] and [12,1,3] both sort to the same end result. But [0,1,0,3,12] must become [1,3,12,0,0], not [1,3,12,0,0] by luck. You must preserve the original non-zero sequence.',
      wrongFeedback: [
        'Consider [3,0,1]: sorting gives [0,1,3] then [1,3,0] — but the correct answer is [3,1,0]. Why does sorting fail the relative-order requirement?',
        'Relative order means non-zero elements appear in the same sequence as the input. Which operations scramble that sequence?',
      ],
    },
    {
      id: 'write-pointer',
      question: 'You need to place all non-zeros at the front in order. What pointer technique achieves this in one pass?',
      options: [
        { label: 'A slow pointer marking the next write position for non-zeros', isCorrect: true },
        { label: 'Two pointers starting from opposite ends', isCorrect: false, feedback: 'Opposite-end pointers swap elements from the back to the front — but swapping a zero from the left with a non-zero from the right can reverse the order of non-zeros. Relative order requires a left-only write pointer.' },
        { label: 'A stack to collect non-zeros in reverse', isCorrect: false, feedback: 'Collecting non-zeros in a stack and popping them reverses their order. You need the original left-to-right sequence, not a reversed one.' },
        { label: 'Count the zeros first, then shift everything left', isCorrect: false, feedback: 'Counting zeros first requires a second pass to shift elements — more work than needed. A single write-pointer pass handles both steps simultaneously.' },
      ],
      correctFeedback: 'The write pointer starts at 0. For each element, if it is non-zero, write it to nums[write] and advance write. After the pass, fill nums[write..] with zeros. One pass, O(1) space.',
      wrongFeedback: [
        'You want to fill positions 0, 1, 2… with non-zeros in order. What does a "write pointer" track, and when does it advance?',
        'After placing all non-zeros at the front, how do you fill the remaining positions? How many zeros do you need?',
      ],
    },
  ],
}
