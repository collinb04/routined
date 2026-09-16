export default {
  id: 'maximum-subarray',
  title: 'Maximum Subarray',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code>, find the contiguous subarray with the largest sum and return that sum. (Kadane\'s Algorithm)',
  examples: [
    { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1] has the largest sum = 6.' },
    { input: 'nums = [1]', output: '1' },
    { input: 'nums = [5,4,-1,7,8]', output: '23' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
  starterCode: `class Solution:
    def max_sub_array(self, nums):
        pass`,
  runnerSetup: 'max_sub_array = Solution().max_sub_array',
  functionName: 'max_sub_array',
  conceptId: 'arrays',
  testCases: [
    { label: 'Mixed values', args: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
    { label: 'Single', args: [[1]], expected: 1 },
    { label: 'All positive', args: [[5,4,-1,7,8]], expected: 23 },
    { label: 'All negative', args: [[-1,-2,-3]], expected: -1 },
  ],
  bruteHint: 'The brute-force approach tries every pair of start and end indices, summing the elements between them for each candidate subarray. With nested loops over start and end, that is roughly O(n²) subarrays to check, and resumming each one from scratch pushes it toward O(n³). At n up to 100,000, how many operations would that be, and would it finish in time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. nums.length ≤ 10⁵. What does this tell you about trying all possible subarrays?',
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 10⁵' },
      options: [
        { label: 'Enumerating all (start, end) pairs is too slow', isCorrect: true },
        { label: 'Enumerating all (start, end) pairs is fine', isCorrect: false, feedback: 'There are O(n²) pairs — 5 billion at n = 100,000. Summing each one naively adds another O(n) factor. You need an approach that visits each element a constant number of times.' },
        { label: 'Splitting the array in half repeatedly and combining the results is required', isCorrect: false, feedback: 'Divide-and-conquer works at O(n log n) and is a valid approach, but linear O(n) is achievable here. The constraint rules out O(n²), not O(n).' },
        { label: 'You should compute the running total from the start up to every index first', isCorrect: false, feedback: 'Prefix sums let you compute any subarray sum in O(1), but you still need to check O(n²) pairs to find the maximum. Prefix sums alone do not reduce the complexity below O(n²).' },
      ],
      correctFeedback: 'O(n²) is 10 billion operations at n = 100,000 — too slow. You need an O(n) scan that decides at each element whether to extend the current subarray or start fresh.',
      wrongFeedback: [
        'Nested loops over start and end give O(n²) candidates. At n = 10⁵, how many is that?',
        'You need to process each element once. What question do you ask at each element to decide whether to extend the current subarray?',
      ],
    },
    {
      id: 'negative-values',
      question: 'We can figure out which cases our approach must handle by considering the full range of values allowed. -10⁴ ≤ nums[i] ≤ 10⁴ — values can be negative. What does the presence of negatives imply for subarray selection?',
      highlight: { location: 'constraint', text: '-10⁴ ≤ nums[i] ≤ 10⁴' },
      options: [
        { label: 'Filter out negatives before processing', isCorrect: false, feedback: 'Removing negatives breaks contiguity. The subarray [4,-1,2,1] has sum 6, which beats [4,2,1] = 7 — wait, actually filtering here loses the contiguity constraint entirely. A negative element can be worth including if it bridges two large positive sections.' },
        { label: 'A negative running sum is worth restarting from the current element', isCorrect: true },
        { label: 'The maximum subarray always starts at a positive element', isCorrect: false, feedback: 'Not guaranteed. Consider [-1, 5]: the best subarray is [5], which starts after the negative. But consider [-2,1]: the best is [1]. The start is determined by where a fresh start beats extending.' },
        { label: 'Sort the array to place positives together', isCorrect: false, feedback: 'Sorting destroys contiguity — the problem requires a contiguous subarray from the original order. You cannot rearrange elements.' },
      ],
      correctFeedback: 'If the running sum drops below 0, it is a liability: adding it to any future element gives a smaller result than starting fresh from that element. Reset to 0 when the running sum goes negative.',
      wrongFeedback: [
        'Suppose your running sum is -3 and the next element is 5. Is it better to take -3 + 5 = 2, or start fresh with 5?',
        'A negative running sum subtracts from anything you append. What is the decision rule at each element for whether to extend or restart?',
      ],
    },
    {
      id: 'all-negative-case',
      question: 'We can spot important edge cases by examining what the examples imply about valid outputs. The test case [-1,-2,-3] has output -1, not 0. What does this tell you about the answer?',
      options: [
        { label: 'Return 0 when all elements are negative', isCorrect: false, feedback: 'The output for [-1,-2,-3] is -1, not 0. The problem requires a non-empty subarray — which means you must return the least-bad negative when all elements are negative.' },
        { label: 'The subarray must be non-empty, so the answer can be negative', isCorrect: true },
        { label: 'The empty subarray has sum 0, which is always a valid answer', isCorrect: false, feedback: 'The problem says "find the contiguous subarray" — implying non-empty. An empty subarray is not a valid answer. The output for all-negative inputs is the maximum (least negative) element.' },
        { label: 'Skip all negative elements during the scan', isCorrect: false, feedback: 'Skipping all negatives would return 0 for [-1,-2,-3], but the correct answer is -1. You must include at least one element, even if all are negative.' },
      ],
      correctFeedback: 'The subarray must be non-empty. When all values are negative, the maximum sum is the single largest (least negative) element — and your running maximum must be initialized to handle this.',
      wrongFeedback: [
        'If you initialize your maximum to 0, what do you return for [-1,-2,-3]? Does that match the expected output of -1?',
        'Initialize your global maximum to negative infinity (or nums[0]), not 0. What does that ensure when every element is negative?',
      ],
    },
    {
      id: 'output-sum',
      question: 'We can figure out how much state we actually need to track based on exactly what the output requires. The output is the sum of the best subarray, not the subarray itself or its indices. What does that simplify?',
      highlight: { location: 'description', text: 'return that sum' },
      options: [
        { label: 'Track only two integers: running sum and global max', isCorrect: true },
        { label: 'You still need to record the start and end indices', isCorrect: false, feedback: 'Indices are only needed if asked to return the subarray itself. Since the output is the sum, you track two numbers — current running sum and the global maximum — and nothing else.' },
        { label: 'You can skip elements until you find a positive one', isCorrect: false, feedback: 'Skipping elements breaks contiguity and can miss cases like [2,-1,5] where including the -1 bridges two positive sections for a total of 6. Process every element.' },
        { label: 'Return the sum of all positive elements', isCorrect: false, feedback: 'Summing all positives ignores contiguity. [5,-100,3] has the maximum subarray [5] with sum 5, not 5+3=8, because -100 breaks the connection.' },
      ],
      correctFeedback: 'Two variables are all you need: current_sum (extend or restart) and max_sum (the best seen so far). Update both at each element for an O(n) O(1)-space solution.',
      wrongFeedback: [
        'What is the minimum state you need to decide (1) whether to extend or restart, and (2) what the best result so far was?',
        'One variable tracks the running total for the current subarray. One tracks the global best. At each step, you update both. How many total variables is that?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def max_sub_array(self, nums):
        best = nums[0]
        current = nums[0]
        for n in nums[1:]:
            current = max(n, current + n)
            best = max(best, current)
        return best`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionExplanation: 'At every position, the best subarray ending exactly there is either "extend the previous best-ending-here subarray by one element" or "start fresh from this element alone" — whichever gives a bigger sum. Once a running sum drops low enough that starting over would beat extending it, there is never a reason to drag that negative baggage forward, since it can only ever pull future sums down. Tracking that running "best ending here" alongside a separate global best seen so far turns the whole search into one linear pass.',
}
