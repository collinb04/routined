export default {
  id: 'maximum-width-ramp',
  title: 'Maximum Width Ramp',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code>, a ramp is a pair (i, j) with i < j and nums[i] ≤ nums[j]. Return the maximum width j − i of any ramp, or 0 if no ramp exists.',
  examples: [
    { input: 'nums = [6,0,8,2,1,5]', output: '4', explanation: 'Ramp (1, 5): nums[1]=0 ≤ nums[5]=5, width = 4.' },
    { input: 'nums = [9,8,1,0,1,9,4,0,4,1]', output: '7' },
  ],
  constraints: ['2 ≤ nums.length ≤ 5 × 10⁴', '0 ≤ nums[i] ≤ 5 × 10⁴'],
  starterCode: `class Solution:
    def max_width_ramp(self, nums):
        pass`,
  runnerSetup: 'max_width_ramp = Solution().max_width_ramp',
  functionName: 'max_width_ramp',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Width 4', args: [[6,0,8,2,1,5]], expected: 4 },
    { label: 'Width 7', args: [[9,8,1,0,1,9,4,0,4,1]], expected: 7 },
    { label: 'Descending', args: [[3,2,1]], expected: 0 },
    { label: 'Single ramp', args: [[1,2]], expected: 1 },
  ],
  bruteHint: 'The brute-force approach checks every pair (i, j) with i < j, testing whether nums[i] ≤ nums[j] and tracking the widest width seen so far. That is roughly n²/2 pairs examined. At n up to 50,000, how many comparisons does that come out to, and would it finish in time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. What does n ≤ 5 × 10⁴ tell you?',
      highlight: { location: 'constraint', text: '2 ≤ nums.length ≤ 5 × 10⁴' },
      options: [
        { label: 'O(n²) is fine for n = 50,000', isCorrect: false, feedback: 'At n = 50,000, O(n²) is 2.5 billion operations — far too slow. The constraint is signaling that a quadratic brute-force over all pairs will time out.' },
        { label: 'O(n log n) or better is needed', isCorrect: true },
        { label: 'O(log n) is required', isCorrect: false, feedback: 'O(log n) is faster than reading the full input. You need a sub-quadratic approach, but not that extreme.' },
        { label: 'Input size does not matter here', isCorrect: false, feedback: 'Input size always matters. With 50,000 elements, checking every (i, j) pair would be 2.5 billion comparisons.' },
      ],
      correctFeedback: 'With n up to 50,000, O(n²) is 2.5 billion comparisons — too slow. You need a linear or O(n log n) strategy.',
      wrongFeedback: [
        'At n = 50,000, how many (i, j) pairs does a brute-force scan check? What does that count tell you?',
        'Count the pairs: n(n−1)/2 ≈ 1.25 billion. You need an approach that avoids checking every pair.',
      ],
    },
    {
      id: 'ramp-start-candidates',
      question: 'We can rule out certain left endpoints entirely based on how the ramp condition is defined. A ramp requires nums[i] ≤ nums[j] with i < j. To maximize j − i, what kind of left endpoints i are worth keeping?',
      options: [
        { label: 'All indices in sorted order', isCorrect: false, feedback: 'Sorting loses the original indices, which define the width j − i. The positions are exactly what you need to preserve.' },
        { label: 'Indices where nums[i] is a new prefix minimum', isCorrect: true },
        { label: 'Indices where nums[i] is a local maximum', isCorrect: false, feedback: 'A large nums[i] is harder to satisfy — few values to its right will be ≥ it. Small left endpoints give the widest potential ramps.' },
        { label: 'Any index with nums[i] = 0', isCorrect: false, feedback: 'Only values of 0 would work for that, and the array may have no zeros. You want a general rule for which left endpoints maximize ramp width.' },
      ],
      correctFeedback: 'Prefix minimums are the only useful left endpoints: if nums[i] > nums[k] for some k < i, then k is a strictly better (smaller value, farther left) ramp start for any right endpoint that works for i.',
      wrongFeedback: [
        'If nums[i] > nums[k] and k < i, can index i ever beat k on ramp width? What does that imply about which left endpoints to keep?',
        'You want i as far left as possible and nums[i] as small as possible. Which indices satisfy both simultaneously?',
      ],
    },
    {
      id: 'scan-direction',
      question: 'We can determine the right scanning strategy based on how ramp width is maximized. After identifying useful left endpoints, which direction should you scan for right endpoints j to find the widest ramp?',
      options: [
        { label: 'Left to right, greedily', isCorrect: false, feedback: 'Scanning left to right for j finds a valid ramp early but not necessarily the widest one — you want j as far right as possible.' },
        { label: 'Right to left, matching greedily', isCorrect: true },
        { label: 'Sort j candidates by value', isCorrect: false, feedback: 'Sorting by value loses the position information that determines width.' },
        { label: 'Binary search from each left endpoint', isCorrect: false, feedback: 'Binary search requires a sorted structure. The original array is unsorted, so you cannot binary search positions directly by value.' },
      ],
      correctFeedback: 'Scanning j from right to left lets you match each candidate left endpoint with the farthest valid j first, maximizing j − i before moving inward.',
      wrongFeedback: [
        'You want j − i as large as possible. Should j be as close to i as possible, or as far away as possible?',
        'To maximize width, start j at the far right and work left. Pair it with the smallest available left endpoint that satisfies nums[i] ≤ nums[j].',
      ],
    },
  ],
  solutionCode: `class Solution:
    def max_width_ramp(self, nums):
        stack = []
        for i, n in enumerate(nums):
            if not stack or n < nums[stack[-1]]:
                stack.append(i)
        best = 0
        for j in range(len(nums) - 1, -1, -1):
            while stack and nums[stack[-1]] <= nums[j]:
                best = max(best, j - stack[-1])
                stack.pop()
        return best`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'This must be two separate passes, not one combined left-to-right scan — popping and computing widths *while* still building the candidate stack would consume an index (like the true global minimum) before a later, wider-reaching j ever got the chance to pair with it.',
  solutionExplanation: 'Only indices that are a new running minimum can ever be the "i" side of the *widest* possible ramp — any index with a value higher than something already seen to its left is strictly dominated by that earlier, smaller value, since anything the later index could pair with, the earlier one could pair with too, at a wider width. Building that decreasing-value stack first captures every real candidate, and only then scanning <code>j</code> from the rightmost index inward lets each candidate be tested against the largest possible <code>j</code> before ever being discarded.',
}
