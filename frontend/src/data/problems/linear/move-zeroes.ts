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
  starterCode: `class Solution:
    def move_zeroes(self, nums):
        pass
        return nums`,
  runnerSetup: 'move_zeroes = Solution().move_zeroes',
  functionName: 'move_zeroes',
  conceptId: 'arrays',
  testCases: [
    { label: 'Standard', args: [[0,1,0,3,12]], expected: [1,3,12,0,0] },
    { label: 'Single zero', args: [[0]], expected: [0] },
    { label: 'No zeros', args: [[1,2,3]], expected: [1,2,3] },
    { label: 'All zeros', args: [[0,0,0]], expected: [0,0,0] },
  ],
  bruteHint: 'The brute-force approach builds a brand-new array: scan nums once to collect all non-zero values in order, then append enough zeros to match the original length, and copy the result back into nums. This takes close to O(n) time, but it allocates a second array of size n along the way. Given the problem says to do this in-place without making a copy, what does that extra O(n) array cost you, and can you rearrange the elements using only the original array instead?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'in-place-constraint',
      question: 'We can tell which approaches are ruled out by paying close attention to the exact constraint on memory usage. "Do it in-place without making a copy." What does this rule out?',
      highlight: { location: 'description', text: 'Do it in-place without making a copy.' },
      options: [
        { label: 'Filtering non-zeros into a new array, then appending zeros', isCorrect: true },
        { label: 'Swapping elements within the original array', isCorrect: false, feedback: 'Swapping operates on the original array — it is in-place by definition. The constraint rules out allocating a separate array, not rearranging within the existing one.' },
        { label: 'Overwriting array positions directly as you scan through once', isCorrect: false, feedback: 'Overwriting positions within the same array as you scan is in-place. The constraint rules out creating a second array of the same size, not index manipulation.' },
        { label: 'Iterating through the array more than once', isCorrect: false, feedback: 'Multiple passes over the same array are fine — they are still in-place. The constraint forbids allocating O(n) extra space for a copy, not additional iterations.' },
      ],
      correctFeedback: 'Creating a new array and concatenating non-zeros with zeros uses O(n) extra space. In-place means you must rearrange within the original array using only O(1) extra space.',
      wrongFeedback: [
        'What is the space cost of building a new filtered array? What does "in-place" require instead?',
        'In-place means O(1) extra space. Which approaches use O(n) extra space — building a new array, overwriting positions directly, or swapping?',
      ],
    },
    {
      id: 'relative-order',
      question: 'We can tell which approaches are ruled out by considering exactly what "order" must be preserved. "Maintain the relative order of non-zero elements." What does this rule out?',
      highlight: { location: 'description', text: 'maintaining the relative order of non-zero elements' },
      options: [
        { label: 'Reordering elements purely by value, ignoring original position', isCorrect: true },
        { label: 'Overwriting positions left-to-right with non-zeros', isCorrect: false, feedback: 'Writing non-zeros left-to-right preserves their relative order — that is exactly the right approach. The constraint rules out order-scrambling methods, not this one.' },
        { label: 'Swapping each zero with the next non-zero element', isCorrect: false, feedback: 'Swapping a zero with the next non-zero keeps relative order intact. Non-zero elements pass each other in the same left-to-right sequence as they originally appeared.' },
        { label: 'Using two passes through the array', isCorrect: false, feedback: 'Two passes can preserve order — the first to place non-zeros, the second to fill zeros. The relative-order constraint rules out reordering methods, not the number of passes.' },
      ],
      correctFeedback: 'Reordering purely by value treats elements as interchangeable — [1,3,12] and [12,1,3] would both be treated as equally valid. But [0,1,0,3,12] must become [1,3,12,0,0], preserving the original left-to-right sequence of non-zero elements — not [12,1,3,0,0] or any other rearrangement. You must preserve the original non-zero sequence.',
      wrongFeedback: [
        'Consider [3,0,1]: sorting gives [0,1,3] then [1,3,0] — but the correct answer is [3,1,0]. Why does sorting fail the relative-order requirement?',
        'Relative order means non-zero elements appear in the same sequence as the input. Which operations scramble that sequence?',
      ],
    },
    {
      id: 'write-pointer',
      question: 'We can figure out which technique fits by thinking about what a single pass needs to keep track of. You need to place all non-zeros at the front in order. What pointer technique achieves this in one pass?',
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
  solutionCode: `class Solution:
    def move_zeroes(self, nums):
        insert_pos = 0
        for n in nums:
            if n != 0:
                nums[insert_pos] = n
                insert_pos += 1
        for i in range(insert_pos, len(nums)):
            nums[i] = 0
        return nums`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionExplanation: 'A single write pointer tracks "the next open slot for a non-zero value" — scanning left to right and copying every non-zero into that slot compacts all non-zero elements to the front, in their original relative order, using only the array itself as storage. Whatever positions are left after the write pointer\'s final position were never written to, so filling everything from there to the end with 0 places every zero exactly where it belongs without ever needing to track where the zeros originally were.',
}
