export default {
  id: 'sliding-window-maximum',
  title: 'Sliding Window Maximum',
  difficulty: 'hard',
  description: `<p>You are given an array of integers <code>nums</code> and there is a sliding window of size <code>k</code> which is moving from the very left of the array to the very right. You can only see the <code>k</code> numbers in the window. Each time the sliding window moves right by one position, return the max sliding window values.</p>`,
  examples: [
    { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' },
    { input: 'nums = [1], k = 1', output: '[1]' },
  ],
  constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
  starterCode: `class Solution:
    def max_sliding_window(self, nums, k):
        pass`,
  runnerSetup: 'max_sliding_window = Solution().max_sliding_window',
  functionName: 'max_sliding_window',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'k=3', args: [[1,3,-1,-3,5,3,6,7], 3], expected: [3,3,5,5,6,7] },
    { label: 'k=1', args: [[1], 1], expected: [1] },
  ],
  bruteHint: 'A brute-force approach re-scans every element inside each window to find its maximum, then slides the window over by one and repeats — that is O(k) work for each of the n−k+1 windows, or O(n·k) overall. Since n can be up to 10^5 and k can be nearly as large, what does that product grow to, and how many operations would that require in the worst case?',
  optimizeComplexity: { time: 'O(n)', space: 'O(k)' },
  clues: [
    {
      id: 'input-size-complexity',
      question: 'Constraints often tell you exactly how efficient your solution needs to be. nums.length ≤ 10⁵. If you scan each window of size k to find its maximum, what is the total cost?',
      highlight: { location: 'constraint', text: '1 <= nums.length <= 10^5' },
      options: [
        { label: 'O(n) — the window slides by one each time', isCorrect: false, feedback: 'The window slides in O(1) steps, but finding the max within each window requires scanning all k elements. That is O(k) per window, not O(1).' },
        { label: 'O(n · k) — up to 10¹⁰ for large k', isCorrect: true },
        { label: 'O(n log n) — recomputing the max in log time as the window slides', isCorrect: false, feedback: 'A log-time update per element gives O(n log k), not O(k) per window. But even O(n log k) can be beaten — the optimal approach achieves O(n) total.' },
        { label: 'O(k) — you only process k elements', isCorrect: false, feedback: 'There are n−k+1 windows, each of size k. Processing all of them costs O((n−k+1)·k) ≈ O(n·k) total.' },
      ],
      correctFeedback: 'There are n−k+1 windows. Scanning each for its max costs O(k) per window → O(n·k) total. At n = k = 10⁵/2, that is 2.5 billion operations — too slow.',
      wrongFeedback: [
        'How many windows are there for an array of length n with window size k? What is the cost of finding the max in each one?',
        '(n−k+1) windows × O(k) per window = O(n·k). At n = 10⁵ and k = 50,000 that is 2.5 billion operations. You need each window max in O(1) amortized.',
      ],
    },
    {
      id: 'dominated-elements',
      question: 'Recognizing what can be safely ruled out is often the key to an efficient structure. When a new element enters the window and is larger than some existing elements, can those smaller elements ever be the window maximum?',
      options: [
        { label: 'Yes — they could become max if the larger element leaves', isCorrect: false, feedback: 'A smaller element that entered before a larger one will leave the window first (windows slide right, so older elements exit sooner). If the larger element is still in the window when they overlap, the smaller one is always dominated.' },
        { label: 'No — they are permanently dominated and can be discarded', isCorrect: true },
        { label: 'Only if they are equal to the new element', isCorrect: false, feedback: 'Equal elements are not dominated by each other — two equal maximums can both be valid. Strictly smaller elements are the ones that can be discarded.' },
        { label: 'Only if k = 1', isCorrect: false, feedback: 'The dominance argument holds for any k. An older, smaller element will exit the window before the newer, larger element that dominates it.' },
      ],
      correctFeedback: 'A smaller element that entered before a larger one will exit the window (on the left) before the larger one does. As long as both are in the window, the smaller one can never be the max. It is safe to remove it.',
      wrongFeedback: [
        'Elements exit the window in the order they entered (oldest first). If element A entered before element B and A < B, can A ever be the maximum while B is also in the window?',
        'A entered before B, so A exits first. While both are present, B ≥ A means A cannot be the max. When A eventually exits alone, B will already be gone too — A was never needed.',
      ],
    },
    {
      id: 'deque-structure',
      question: 'Matching the required operations to the right structure is what separates a slow solution from a fast one. You need to add to one end and remove from both ends efficiently. What structure supports this?',
      options: [
        { label: 'A stack — O(1) push and pop from one end', isCorrect: false, feedback: 'A stack only gives O(1) access to one end. You need to remove expired elements from the front (left side) as the window slides — a stack cannot do that efficiently.' },
        { label: 'A deque (double-ended queue)', isCorrect: true },
        { label: 'A sorted list — binary search for the max', isCorrect: false, feedback: 'A sorted list gives O(log k) insertion and O(k) deletion by value. A deque gives O(1) for both ends — no need to maintain sorted order.' },
        { label: 'A min-heap — max is always at the top', isCorrect: false, feedback: 'A max-heap gives O(log k) push and pop, and O(n log k) total — better than O(n·k) but worse than the O(n) deque approach. Also, heaps cannot efficiently remove an expired element from an arbitrary position.' },
      ],
      correctFeedback: 'A deque (collections.deque in Python) gives O(1) appendright, popleft, and pop. You append new indices to the right, pop dominated indices from the right, and pop expired indices from the left.',
      wrongFeedback: [
        'You need to remove dominated elements from one end and remove expired (out-of-window) elements from the other. Which structure has O(1) operations at both ends?',
        'A deque supports O(1) popleft (expire old elements) and O(1) pop (discard dominated elements from the back), plus O(1) append. That covers all three operations you need.',
      ],
    },
    {
      id: 'output-size',
      question: 'Knowing exactly how much output is expected helps you verify your loop bounds are correct. nums.length = n, window size = k. How many values are in the output?',
      highlight: { location: 'constraint', text: '1 <= k <= nums.length' },
      options: [
        { label: 'n values — one per element', isCorrect: false, feedback: 'The first full window does not exist until index k−1. There is no output for the first k−1 positions, giving n−k+1 values total, not n.' },
        { label: 'n − k + 1 values', isCorrect: true },
        { label: 'k values — one per window position', isCorrect: false, feedback: 'k is the window size, not the number of windows. The window slides from position 0 to position n−k, giving n−k+1 windows.' },
        { label: 'n / k values — non-overlapping windows', isCorrect: false, feedback: 'Windows overlap — each step moves by 1, not by k. Sliding by 1 each step gives n−k+1 windows, not n/k.' },
      ],
      correctFeedback: 'The window spans indices [0, k−1], [1, k], …, [n−k, n−1]. That is n−k+1 windows. For n=8, k=3: 8−3+1 = 6 outputs, matching the example.',
      wrongFeedback: [
        'The window starts at index 0 and ends when its right edge reaches index n−1. How many positions can the left edge of the window occupy?',
        'The left edge ranges from 0 to n−k (inclusive) — that is n−k+1 positions. Each gives one output. For n=8, k=3: left edge goes 0,1,2,3,4,5 → 6 outputs.',
      ],
    },
  ],
  solutionCode: `from collections import deque

class Solution:
    def max_sliding_window(self, nums, k):
        dq = deque()
        result = []
        for i, n in enumerate(nums):
            while dq and nums[dq[-1]] <= n:
                dq.pop()
            dq.append(i)
            if dq[0] <= i - k:
                dq.popleft()
            if i >= k - 1:
                result.append(nums[dq[0]])
        return result`,
  solutionComplexity: { time: 'O(n)', space: 'O(k)' },
  solutionCaveat: 'Any index popped from the back of the deque for being <code>&lt;=</code> the incoming value can never become a future window\'s maximum — the new, later value is at least as large and will still be in the window whenever that old index would have been, so discarding it loses nothing.',
  solutionExplanation: 'The deque holds indices in strictly decreasing value order, front to back, so the front is always the current window\'s maximum — an O(1) lookup instead of an O(k) scan. Sliding the window one step only ever needs two cheap fixes: dropping indices from the back that the new element has already made irrelevant, and dropping the front if it just aged out of the window\'s left edge; both operations happen at most once per index over the whole scan, keeping total work linear.',
}
