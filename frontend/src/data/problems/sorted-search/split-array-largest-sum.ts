export default {
  id: 'split-array-largest-sum',
  title: 'Split Array Largest Sum',
  difficulty: 'hard',
  description: 'Given an array of integers and <code>k</code>, split the array into <code>k</code> non-empty contiguous subarrays to minimize the largest sum of any subarray. Return that minimized largest sum.',
  examples: [
    { input: 'nums=[7,2,5,10,8], k=2', output: '18', explanation: 'Split [7,2,5] | [10,8]. Largest sum = 18.' },
    { input: 'nums=[1,2,3,4,5], k=2', output: '9', explanation: 'Split [1,2,3,4] | [5].' },
  ],
  constraints: ['1 ≤ nums.length ≤ 1000', '0 ≤ nums[i] ≤ 10⁶', '1 ≤ k ≤ min(50, nums.length)'],
  starterCode: `def split_array(nums, k):
  pass`,
  functionName: 'split_array',
  conceptId: 'binary-search',
  testCases: [
    { label: 'k=2', args: [[7,2,5,10,8],2], expected: 18 },
    { label: 'Sequential k=2', args: [[1,2,3,4,5],2], expected: 9 },
    { label: 'k=1', args: [[1,2,3],1], expected: 6 },
  ],
  clues: [
    {
      id: 'search-space',
      question: 'The answer is the minimized largest subarray sum. What are the lower and upper bounds of the search space?',
      options: [
        { label: 'Lower: 0, Upper: 10⁶', isCorrect: false, feedback: 'The lower bound must be at least the maximum single element — if any element is 10⁶, it must appear in some subarray, so the largest sum can\'t be less than 10⁶. 0 is too low.' },
        { label: 'Lower: max(nums), Upper: sum(nums)', isCorrect: true },
        { label: 'Lower: sum(nums) / k, Upper: sum(nums)', isCorrect: false, feedback: 'sum(nums) / k is the average, which is a reasonable lower-bound estimate but not always tight. The true lower bound is max(nums): no split can place a single element in a subarray smaller than itself.' },
        { label: 'Lower: 1, Upper: n × 10⁶', isCorrect: false, feedback: 'n × 10⁶ = 10⁹ is valid but loose. sum(nums) is a tighter and more meaningful upper bound — it\'s exactly what you get when k = 1 (no splits at all).' },
      ],
      correctFeedback: 'When k = n, each element is its own subarray and the answer is max(nums). When k = 1, there are no splits and the answer is sum(nums). The real answer lies between these extremes.',
      wrongFeedback: [
        'What is the smallest possible "largest subarray sum" — what constraint forces that floor?',
        'A single element can\'t be split further — the largest sum is at least max(nums). The largest sum is at most sum(nums) (k=1, no splits). Binary search between these two.',
      ],
    },
    {
      id: 'monotone-feasibility',
      question: 'If you can split the array into k pieces where no piece exceeds limit L, can you do the same for any limit greater than L?',
      options: [
        { label: 'Not necessarily — larger limits might force different splits', isCorrect: false, feedback: 'Any split valid under limit L is also valid under limit L+1 — every subarray sum ≤ L is also ≤ L+1. Larger limits are strictly easier, never harder.' },
        { label: 'Yes — feasibility is monotone in L', isCorrect: true },
        { label: 'Only if k equals the number of elements', isCorrect: false, feedback: 'Monotonicity holds for any k. If a greedy split under limit L uses at most k pieces, the same split still works under L+1 (same pieces, same sums, all still within the new limit).' },
        { label: 'No — you might need more splits at larger limits', isCorrect: false, feedback: 'Larger limits allow each piece to be bigger, meaning you need fewer splits, not more. Feasibility only gets easier as L increases.' },
      ],
      correctFeedback: 'Feasibility(L) is monotone: once true, it stays true for all larger L. This monotone yes/no function over the search space [max(nums), sum(nums)] is exactly what binary search exploits.',
      wrongFeedback: [
        'If a greedy split stays within limit 18, does it also stay within limit 19? What about limit 100?',
        'Draw the feasibility function: false, false, ..., false, true, true, ..., true. That shape — a single threshold — is the signature of what algorithm?',
      ],
    },
    {
      id: 'feasibility-check',
      question: 'To check if limit L is feasible, you greedily assign elements to the current subarray. When do you start a new piece?',
      options: [
        { label: 'After every k elements', isCorrect: false, feedback: 'Fixed-size chunks ignore the actual sums. A subarray of k elements might sum to far more than L, or far less. You split based on cumulative sum, not element count.' },
        { label: 'When adding the next element would exceed L', isCorrect: true },
        { label: 'When the current subarray sum equals L exactly', isCorrect: false, feedback: 'Waiting for an exact match is too restrictive — most values of L won\'t produce exact matches. You split when the sum would exceed L, not when it equals L.' },
        { label: 'After each element, always', isCorrect: false, feedback: 'Splitting after every element gives n pieces, which only works when k = n. The greedy check must count how many pieces the greedy assignment produces and compare to k.' },
      ],
      correctFeedback: 'Greedy: accumulate elements into the current piece until the next element would push the sum over L. Then start a new piece. Count total pieces. If count ≤ k, L is feasible.',
      wrongFeedback: [
        'Walk through [7,2,5,10,8] with limit 18: 7, then 7+2=9, then 9+5=14, then 14+10=24 > 18 — start new piece. Count pieces at the end. Is count ≤ k?',
        'The greedy check returns the minimum number of pieces needed to stay within limit L. How does that count tell you if L is feasible for a given k?',
      ],
    },
    {
      id: 'output-interpretation',
      question: 'Binary search finds the smallest L where feasible(L) is true. Why is that L guaranteed to be achievable by some actual split?',
      options: [
        { label: 'It might not be — L is just a theoretical bound', isCorrect: false, feedback: 'The feasibility check is based on an actual greedy split, not a theoretical bound. If feasible(L) returns true, the greedy split that produced it is a concrete valid answer.' },
        { label: 'The greedy check constructs a real split, not just a bound', isCorrect: true },
        { label: 'Because sum(nums) / k always equals the answer', isCorrect: false, feedback: 'sum(nums) / k is the average, which is rarely the exact answer. The answer depends on element distribution, not just averages.' },
        { label: 'The smallest feasible L is always max(nums)', isCorrect: false, feedback: 'max(nums) is the smallest possible answer only when k = n (each element alone). For smaller k, the answer is larger — binary search finds the exact threshold.' },
      ],
      correctFeedback: 'The greedy split used in the feasibility check is a real partition. When binary search converges to the smallest feasible L, that same greedy split achieves it. The answer is not just a bound — it\'s directly constructible.',
      wrongFeedback: [
        'When feasible(L) returns true, what did the greedy algorithm actually do to verify that?',
        'The feasibility check doesn\'t just answer yes/no abstractly — it runs a greedy split. If it says "yes, L works with k pieces," can you produce the actual split?',
      ],
    },
  ],
}
