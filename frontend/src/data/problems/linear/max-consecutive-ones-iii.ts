export default {
  id: 'max-consecutive-ones-iii',
  title: 'Max Consecutive Ones III',
  difficulty: 'medium',
  description: 'Given a binary array <code>nums</code> and an integer <code>k</code>, return the maximum number of consecutive 1s in the array if you can flip at most <code>k</code> zeros.',
  examples: [
    { input: 'nums=[1,1,1,0,0,0,1,1,1,1,0], k=2', output: '6', explanation: 'Flip two zeros at indices 9 and 10: [1,1,1,0,0,1,1,1,1,1,1] → max run of 6.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', 'nums[i] is 0 or 1', '0 ≤ k ≤ nums.length'],
  starterCode: `class Solution:
    def longest_ones(self, nums, k):
        pass`,
  runnerSetup: 'longest_ones = Solution().longest_ones',
  functionName: 'longest_ones',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'k=2', args: [[1,1,1,0,0,0,1,1,1,1,0],2], expected: 6 },
    { label: 'k=0', args: [[0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1],0], expected: 4 },
    { label: 'All ones', args: [[1,1,1],2], expected: 3 },
    { label: 'k=1', args: [[0,0,0],1], expected: 1 },
  ],
  bruteHint: 'The brute-force approach tries every possible subarray — for each start and end index, count how many zeros it contains and check whether flipping at most k of them would turn the whole subarray into ones. That means checking roughly n² subarrays, and counting zeros fresh in each one costs up to O(n) more work, putting you at O(n³) overall. At n up to 100,000, how many operations would that be, and would it finish in time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. nums.length ≤ 10⁵. What does this tell you about acceptable time complexity?',
      options: [
        { label: 'O(n) or O(n log n) is needed', isCorrect: true },
        { label: 'O(n²) is fine', isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations — far too slow. You cannot check every pair of start and end indices.' },
        { label: 'Binary search on the answer works', isCorrect: false, feedback: 'Binary search on the answer is O(n log n) and can work for some problems, but the window-based constraint here calls for a direct O(n) sliding scan.' },
        { label: 'Input size does not constrain the approach', isCorrect: false, feedback: 'Input size always constrains the approach. n = 100,000 rules out any solution with nested loops over index pairs.' },
      ],
      correctFeedback: 'At n = 100,000, O(n²) is 10 billion operations — too slow. You need an approach that processes each element at most a constant number of times.',
      wrongFeedback: [
        'If you try every possible start and end index, how many pairs are there when n = 100,000?',
        'You need each element visited at most twice total. What technique achieves that for subarray problems?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 10⁵' },
    },
    {
      id: 'flip-budget',
      question: 'Specific limits stated in the problem tell you what invariant your solution has to enforce as it runs. "At most k zeros" can be flipped. What does this budget imply about your window?',
      options: [
        { label: 'The window must contain exactly k zeros', isCorrect: false, feedback: 'The budget is an upper bound, not a requirement. A valid window can contain 0, 1, … or up to k zeros. You want the longest such window.' },
        { label: 'Count zeros; shrink the window when zeros exceed k', isCorrect: true },
        { label: 'Pre-replace all zeros with ones, then find the longest run', isCorrect: false, feedback: 'Pre-replacing ignores the budget constraint — you could flip unlimited zeros. You must track how many zeros your current window contains.' },
        { label: 'Skip zeros entirely and concatenate runs of ones', isCorrect: false, feedback: 'Skipping zeros discards the flipping budget entirely. A window can bridge multiple zero-gaps as long as the total zero count stays within k.' },
      ],
      correctFeedback: 'Track the zero count in the current window. When it exceeds k, advance the left pointer until a zero leaves the window. This keeps the window valid in O(1) per step.',
      wrongFeedback: [
        'The window is valid as long as it contains at most k zeros. When the zero count hits k + 1, what must you do?',
        'Moving the left pointer right eventually removes an element from the window. What condition tells you to stop moving it?',
      ],
      highlight: { location: 'description', text: 'flip at most <code>k</code> zeros' },
    },
    {
      id: 'binary-values',
      question: 'The range of values a problem allows often tells you how little state you actually need to track. nums[i] is 0 or 1 — values are binary. How does this simplify tracking the window content?',
      options: [
        { label: 'You only need to count zeros, not store values', isCorrect: true },
        { label: 'You can use bitwise operations to sum the window', isCorrect: false, feedback: 'Bitwise operations on a range are not directly applicable here. The key simplification is that you only need a single counter for zeros — no frequency map or complex structure.' },
        { label: 'You must track the positions of every zero', isCorrect: false, feedback: 'Storing zero positions is unnecessary. A single integer counter tells you whether the window is valid; when the left pointer moves past a zero, decrement the counter.' },
        { label: 'The window sum equals the number of ones', isCorrect: false, feedback: 'True — but that insight helps compute the answer length, not manage the window. The critical simplification for window validity is tracking the zero count.' },
      ],
      correctFeedback: 'Binary values mean a single counter suffices: increment when a 0 enters the window, decrement when a 0 leaves. No hash map or frequency array needed.',
      wrongFeedback: [
        'With only two possible values, what is the minimum information needed to know whether a window contains more than k zeros?',
        'You need to know when a zero enters and leaves the window. How many integers does that require?',
      ],
      highlight: { location: 'constraint', text: 'nums[i] is 0 or 1' },
    },
    {
      id: 'output-length',
      question: 'The type of output you\'re asked for tells you how much information you actually need to carry forward. The output is the maximum length, not the window\'s start index or contents. What does that mean for your tracking?',
      options: [
        { label: 'Record start index whenever you find a better window', isCorrect: false, feedback: 'You do not need the start index — only the length. Recording extra information complicates the solution without improving it.' },
        { label: 'Track a single maximum length variable', isCorrect: false, feedback: 'Close — but you actually do not even need to track a running maximum explicitly. The window never shrinks below its previous maximum size, so the final window size is the answer.' },
        { label: 'The window width at each step is the candidate answer', isCorrect: true },
        { label: 'You must reconstruct the window contents at the end', isCorrect: false, feedback: 'The output is just the length. You never need to know which elements are in the best window — only how wide it was.' },
      ],
      correctFeedback: 'Right — because the window only grows or stays the same (it never truly shrinks below its peak), the final window width equals the maximum valid window width seen.',
      wrongFeedback: [
        'Think about what happens when the window is invalid: you slide the left pointer right by one, but you also slide the right pointer right by one. Does the window ever get shorter than its previous maximum?',
        'If the window only grows when a new valid element is added and shifts (not shrinks) when invalid, what is the window width at the very end?',
      ],
      highlight: { location: 'description', text: 'return the maximum number of consecutive 1s in the array' },
    },
  ],
  solutionCode: `class Solution:
    def longest_ones(self, nums, k):
        left = 0
        zeros = 0
        best = 0
        for right, n in enumerate(nums):
            if n == 0:
                zeros += 1
            while zeros > k:
                if nums[left] == 0:
                    zeros -= 1
                left += 1
            best = max(best, right - left + 1)
        return best`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'The window never shrinks by more than one step past what is strictly necessary — once <code>zeros</code> drops back to <code>k</code>, the while loop stops immediately, so the window is always the longest one still satisfying the flip budget, not reset from scratch.',
  solutionExplanation: 'A window is valid exactly when it contains at most <code>k</code> zeros, since those are the only positions flipping could fix. Expanding right and counting zeros as they enter, then shrinking from the left only when the zero count exceeds <code>k</code>, keeps the window as large as possible at every step — both pointers only ever move forward, so the whole scan is a single O(n) pass instead of re-checking every candidate window from scratch.',
}
