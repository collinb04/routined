export default {
  id: 'number-of-subarrays-bounded-max',
  title: 'Number of Subarrays with Bounded Maximum',
  difficulty: 'medium',
  description: 'Given an array <code>nums</code> and two integers <code>left</code> and <code>right</code>, return the number of contiguous subarrays where the maximum element is in [left, right].',
  examples: [
    { input: 'nums=[2,1,4,3], left=2, right=3', output: '3', explanation: 'Subarrays: [2],[2,1],[3].' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '0 ≤ nums[i] ≤ 10⁹', '0 ≤ left ≤ right ≤ 10⁹'],
  starterCode: `def num_subarray_bounded_max(nums, left, right):
  pass`,
  functionName: 'num_subarray_bounded_max',
  conceptId: 'arrays',
  testCases: [
    { label: 'Three subarrays', args: [[2,1,4,3],2,3], expected: 3 },
    { label: 'All in range', args: [[1,2,3],1,3], expected: 6 },
  ],
  clues: [
    {
      id: 'input-size-complexity',
      question: 'nums.length ≤ 10⁵ tells you…',
      options: [
        { label: 'O(n²) subarray enumeration is fine', isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations — completely infeasible. The constraint rules out any approach that explicitly visits every subarray.' },
        { label: 'O(n) or O(n log n) is needed', isCorrect: true },
        { label: 'O(log n) is achievable', isCorrect: false, feedback: 'You must read all n elements, so O(log n) is impossible. The bound rules out slow solutions, not all superlinear ones.' },
        { label: 'Input size does not affect the approach', isCorrect: false, feedback: 'Input size always constrains which algorithms are viable. n = 10⁵ specifically eliminates O(n²) and slower approaches.' },
      ],
      correctFeedback: 'n = 100,000 makes O(n²) = 10 billion operations infeasible. You need a single-pass or near-linear approach that avoids enumerating all subarrays explicitly.',
      wrongFeedback: [
        'There are roughly n²/2 subarrays for an array of length n. At n = 10⁵, how many is that, and can that many operations complete in time?',
        'O(n²) at n = 10⁵ is 5 billion iterations. You need an approach that processes each element a constant number of times.',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is a count of subarrays, not the subarrays themselves. What does this enable?',
      options: [
        { label: 'You must collect all qualifying subarrays', isCorrect: false, feedback: 'Collecting subarrays themselves would cost O(n²) space in the worst case. A count only requires you to track a running total — no storage of subarrays needed.' },
        { label: 'You can accumulate a running total without storing subarrays', isCorrect: true },
        { label: 'You need to sort the subarrays by maximum', isCorrect: false, feedback: 'Sorting is not implied by counting. You need how many qualify, not a ranked list of them.' },
        { label: 'You can use binary search on the count', isCorrect: false, feedback: 'Binary search applies when you can test a threshold — it does not directly count subarrays satisfying a max-bounded condition.' },
      ],
      correctFeedback: 'A count lets you use a running accumulator. As you scan, you can add the number of new valid subarrays ending at the current index without recording any subarray explicitly.',
      wrongFeedback: [
        'If you only need how many subarrays qualify, do you need to know which ones they are?',
        'Think about building the count incrementally: when you fix the right endpoint, how many valid subarrays end there?',
      ],
    },
    {
      id: 'bounded-max-condition',
      question: 'The condition is "maximum ∈ [left, right]". How is counting subarrays with max ≤ right related to counting those with max ∈ [left, right]?',
      options: [
        { label: 'They are unrelated — track [left, right] directly', isCorrect: false, feedback: 'Tracking the exact range directly is harder. Subarrays with max ≤ right minus those with max ≤ (left−1) equals subarrays with max in [left, right] — set subtraction makes this clean.' },
        { label: 'count(max ≤ right) − count(max ≤ left−1) gives the answer', isCorrect: true },
        { label: 'count(max ≥ left) − count(max > right) gives the answer', isCorrect: false, feedback: 'This is logically equivalent but harder to compute directly. The ≤ form is simpler because you only need one helper that counts subarrays with max below a threshold.' },
        { label: 'The two problems have different time complexities', isCorrect: false, feedback: 'Both the helper and the main problem are O(n). The decomposition does not change complexity — it simplifies the logic.' },
      ],
      correctFeedback: 'Subarrays with max ∈ [left, right] = subarrays with max ≤ right minus subarrays with max ≤ left−1. Each "at-most" subproblem is a simpler single-threshold scan.',
      wrongFeedback: [
        'Counting subarrays where max ≤ some threshold is a simpler subproblem. Can you express [left, right] as a difference of two "at-most" problems?',
        'Think of it as a set difference: all subarrays with max ≤ right, minus those whose max is too small (< left). How do you express "max < left" as an at-most threshold?',
      ],
    },
    {
      id: 'large-element-split',
      question: 'An element greater than right (e.g., 4 when right = 3) appears in the array. How does it affect subarrays that cross it?',
      options: [
        { label: 'It raises the max but the subarray may still qualify', isCorrect: false, feedback: 'If any element in the subarray exceeds right, the maximum of that subarray is greater than right — the subarray cannot qualify.' },
        { label: 'It disqualifies all subarrays that contain it', isCorrect: false, feedback: 'This is true, but the stronger implication is that it acts as a barrier: no valid subarray can span across it.' },
        { label: 'It splits the array into independent segments', isCorrect: true },
        { label: 'It can be ignored if left is also large', isCorrect: false, feedback: 'left and right both bound the maximum from below and above. An element exceeding right always disqualifies any subarray containing it, regardless of left.' },
      ],
      correctFeedback: 'An element > right is a hard boundary. No valid subarray can cross it, so you can reset your segment start at each such element and count within independent segments.',
      wrongFeedback: [
        'If a subarray contains an element greater than right, can it ever have a valid maximum? What does that mean for subarrays on either side of that element?',
        'A value exceeding right acts as a wall. Valid subarrays exist only between consecutive walls — how does that simplify your scan?',
      ],
    },
  ],
}
