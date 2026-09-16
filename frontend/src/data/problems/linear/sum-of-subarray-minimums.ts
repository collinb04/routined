export default {
  id: 'sum-of-subarray-minimums',
  title: 'Sum of Subarray Minimums',
  difficulty: 'medium',
  description: 'Given an array of integers, find the sum of minimums of all subarrays. Return the result modulo 10⁹ + 7.',
  examples: [
    { input: 'arr = [3,1,2,4]', output: '17', explanation: 'Subarrays: [3]=3,[1]=1,[2]=2,[4]=4,[3,1]=1,[1,2]=1,[2,4]=2,[3,1,2]=1,[1,2,4]=1,[3,1,2,4]=1. Sum = 17.' },
  ],
  constraints: ['1 ≤ arr.length ≤ 3 × 10⁴', '1 ≤ arr[i] ≤ 3 × 10⁴'],
  starterCode: `class Solution:
    def sum_subarray_mins(self, arr):
        pass`,
  runnerSetup: 'sum_subarray_mins = Solution().sum_subarray_mins',
  functionName: 'sum_subarray_mins',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Standard', args: [[3,1,2,4]], expected: 17 },
    { label: 'Decreasing', args: [[3,2,1]], expected: 10 },
    { label: 'Single', args: [[1]], expected: 1 },
    { label: 'All same', args: [[2,2,2]], expected: 12 },
  ],
  bruteHint: 'The brute-force approach checks every subarray directly — fixing a start index, extending the end index, and tracking the running minimum as you go, which costs O(n²) time (or O(n³) if you rescan each subarray from scratch to find its minimum). With arr.length up to 3 × 10⁴, O(n²) alone is roughly 900 million operations. If most of that work is spent re-deriving the same minimum for overlapping subarrays, what could you compute once per element instead of once per subarray?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraints often reveal how much work your solution can afford to do. 1 ≤ arr.length ≤ 3 × 10⁴. An array of length n has O(n²) subarrays. What does this constraint say about enumerating all of them?',
      highlight: { location: 'constraint', text: '1 ≤ arr.length ≤ 3 × 10⁴' },
      options: [
        { label: 'Enumerate all subarrays directly', isCorrect: false, feedback: 'At n = 30,000, there are roughly 450 million subarrays. Finding the minimum of each naively would be even more expensive — well beyond what a time limit allows.' },
        { label: 'Find each element\'s contribution without enumerating subarrays', isCorrect: true },
        { label: 'Repeatedly halve a sorted range to search for a value', isCorrect: false, feedback: 'Subarrays are not sorted, and sorting them would destroy their structure. Binary search does not help find minimums of arbitrary subarrays.' },
        { label: 'O(n²) is acceptable at n = 30,000', isCorrect: false, feedback: 'At n = 30,000, O(n²) is 900 million operations — too slow. The constraint points toward O(n) or O(n log n).' },
      ],
      correctFeedback: 'At n = 30,000, O(n²) enumeration is 900 million operations. The key insight is to ask: for each element, how many subarrays is it the minimum of? That count times the element value gives its total contribution.',
      wrongFeedback: [
        'n = 30,000 means O(n²) subarrays. At 900 million, can you visit all of them within a time limit?',
        'Instead of visiting every subarray, ask: how many subarrays does each element arr[i] serve as the minimum of? That reframes the problem as a contribution count.',
      ],
    },
    {
      id: 'contribution-per-element',
      question: 'Turning a subarray-counting problem into a per-element contribution problem is often what makes linear-time solutions possible. For each element arr[i], you want to count how many subarrays have arr[i] as their minimum. What determines that count?',
      options: [
        { label: 'The element\'s value', isCorrect: false, feedback: 'The value determines contribution per subarray, not the count. The count depends on how far left and right arr[i] remains the minimum — i.e., where the next smaller elements are.' },
        { label: 'The nearest smaller element on each side', isCorrect: true },
        { label: 'The total number of subarrays', isCorrect: false, feedback: 'The total subarray count is O(n²). You need the count specific to arr[i] — which subarrays have arr[i] as their minimum, not all subarrays.' },
        { label: 'The index of arr[i]', isCorrect: false, feedback: 'The index alone is not enough. Two elements at different positions with the same nearby structure contribute to the same number of subarrays. What matters is the distance to the nearest smaller elements.' },
      ],
      correctFeedback: 'Let left[i] = distance to the nearest smaller element to the left, right[i] = distance to the nearest smaller element to the right. Then arr[i] is the minimum of exactly left[i] × right[i] subarrays.',
      wrongFeedback: [
        'arr[i] is the minimum of a subarray as long as no smaller element appears within it. What marks the left and right boundaries of that region?',
        'The boundaries are the nearest smaller elements on each side. If arr[i] dominates l positions to the left and r to the right, how many subarrays have it as their minimum?',
      ],
    },
    {
      id: 'monotonic-stack-signal',
      question: 'Recognizing which structure efficiently answers a repeated nearest-smaller query is what turns an O(n²) idea into O(n). You need to find the nearest smaller element to the left (and right) of every element. What data structure does this suggest?',
      options: [
        { label: 'A sorted array', isCorrect: false, feedback: 'Sorting loses position information, which is exactly what you need to compute distances to nearest smaller neighbors.' },
        { label: 'A monotonic stack', isCorrect: true },
        { label: 'A min-heap', isCorrect: false, feedback: 'A heap gives you the global minimum efficiently but not the nearest smaller neighbor for each element. A monotonic stack tracks exactly that relationship in O(n).' },
        { label: 'A two-pointer scan', isCorrect: false, feedback: 'Two pointers work when the array has a monotone property (e.g., sorted). For nearest-smaller queries on an arbitrary array, a monotonic stack processes each element in amortized O(1).' },
      ],
      correctFeedback: 'A monotonic (non-decreasing) stack processes each element once. When a new element is smaller than the stack top, the top has found its right boundary. This computes all nearest-smaller distances in O(n).',
      wrongFeedback: [
        'For each element, you need the nearest element to the left that is smaller than it. What structure efficiently tracks "what is the last smaller element I\'ve seen?"',
        'A stack that stays in non-decreasing order pops whenever a smaller element arrives. The popped element\'s right boundary is found in O(1). What is that pattern called?',
      ],
    },
    {
      id: 'modulo-requirement',
      question: 'Not every signal is about speed — some rule out naive numeric handling instead. "Return the result modulo 10⁹ + 7." Why is this required, and when must you apply it?',
      highlight: { location: 'description', text: 'Return the result modulo 10⁹ + 7.' },
      options: [
        { label: 'Apply mod only to the final sum', isCorrect: false, feedback: 'Waiting until the end risks intermediate values exceeding Python\'s performance range (though Python handles big ints, many graders run C++ under the hood). Apply mod as you accumulate to keep numbers bounded.' },
        { label: 'The sum can be astronomically large; apply mod as you accumulate', isCorrect: true },
        { label: 'Modulo is optional — it only affects the output format', isCorrect: false, feedback: 'Modulo is part of the correctness requirement. The test cases expect the modded value. Skipping it produces the wrong answer for large inputs.' },
        { label: 'Apply mod to each arr[i] before multiplying', isCorrect: false, feedback: 'Modding the element values changes the sums. Apply mod to the contribution (arr[i] × left[i] × right[i]) and to the running total — not to the input values.' },
      ],
      correctFeedback: 'With n = 30,000 elements each up to 30,000, the sum can reach roughly 30,000³ ≈ 27 × 10¹². Applying mod 10⁹ + 7 at each addition keeps the accumulator bounded.',
      wrongFeedback: [
        'With n = 30,000 elements each up to 30,000, how large can the sum get without mod? Does that fit in a standard 32-bit integer?',
        'The sum can reach ~27 × 10¹², far beyond 2³¹. Apply (contribution % MOD) at each step so the accumulator stays manageable.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def sum_subarray_mins(self, arr):
        MOD = 10**9 + 7
        n = len(arr)
        stack = []
        left = [0] * n
        for i in range(n):
            while stack and arr[stack[-1]] >= arr[i]:
                stack.pop()
            left[i] = i - stack[-1] if stack else i + 1
            stack.append(i)
        stack = []
        right = [0] * n
        for i in range(n - 1, -1, -1):
            while stack and arr[stack[-1]] > arr[i]:
                stack.pop()
            right[i] = stack[-1] - i if stack else n - i
            stack.append(i)
        total = 0
        for i in range(n):
            total += arr[i] * left[i] * right[i]
        return total % MOD`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'The left-boundary scan pops on <code>&gt;=</code> while the right-boundary scan pops on strict <code>&gt;</code> — using the same comparison for both would double-count subarrays where two equal minimums both claim the same subarray as their own.',
  solutionExplanation: 'Rather than finding the minimum of every subarray directly, this counts, for each element, exactly how many subarrays have *that element* as their minimum — its contribution is <code>value × (how far left it dominates) × (how far right it dominates)</code>, where "dominates" means no smaller (or, on one side, equal) element interrupts the stretch. A monotonic stack finds each element\'s nearest smaller neighbor on both sides in a single pass per direction, turning what looks like an O(n²) enumeration of subarrays into two O(n) stack sweeps plus one O(n) summation.',
}
