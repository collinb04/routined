export default {
  id: 'product-of-array-except-self',
  title: 'Product of Array Except Self',
  difficulty: 'medium',
  description: `<p>Given an integer array <code>nums</code>, return an array <code>answer</code> such that <code>answer[i]</code> is equal to the product of all elements of <code>nums</code> except <code>nums[i]</code>.</p><p>You must solve it in O(n) time without using the division operation.</p>`,
  examples: [
    { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
    { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' },
  ],
  constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer'],
  starterCode: `def product_except_self(nums):
  pass`,
  functionName: 'product_except_self',
  conceptId: 'arrays',
  testCases: [
    { label: '[1,2,3,4]', args: [[1,2,3,4]], expected: [24,12,8,6] },
    { label: 'with zero', args: [[-1,1,0,-3,3]], expected: [0,0,9,0,0] },
  ],
  clues: [
    {
      id: 'no-division-constraint',
      question: '"Without using the division operation" rules out the simplest approach. What was that approach?',
      options: [
        { label: 'Sort the array and pick the median', isCorrect: false, feedback: 'Sorting has nothing to do with this problem. The naive approach uses the total product divided by each element.' },
        { label: 'Compute total product, divide by each element', isCorrect: true },
        { label: 'Use a prefix sum instead of product', isCorrect: false, feedback: 'Prefix sums compute additive ranges, not multiplicative ones. The forbidden approach is division — not sums.' },
        { label: 'Use two pointers from both ends', isCorrect: false, feedback: 'Two pointers is a traversal strategy, not a computation strategy. The banned operation is division specifically.' },
      ],
      correctFeedback: 'The obvious approach: multiply all elements, then divide by nums[i] for each position. The constraint bans this, forcing you to find each product without ever dividing.',
      wrongFeedback: [
        'If you had the product of all n numbers, how would you compute "product except nums[i]" for each i in one step?',
        'Total product ÷ nums[i] gives the answer for each index in O(1) — but division is banned. You need a different way to get the product of all elements except one.',
      ],
    },
    {
      id: 'prefix-suffix-decomposition',
      question: 'For index i, "product of everything except nums[i]" can be split into two independent parts. What are they?',
      options: [
        { label: 'Product of even indices and odd indices', isCorrect: false, feedback: 'Even/odd decomposition has no relationship to excluding a single index. The natural split is what is to the left of i and what is to the right.' },
        { label: 'Product of elements before i and product of elements after i', isCorrect: true },
        { label: 'Product of the first half and the second half', isCorrect: false, feedback: 'Splitting at the midpoint only works for the middle index. For every other index, the split does not match "everything except index i."' },
        { label: 'Maximum element on the left, minimum on the right', isCorrect: false, feedback: 'Max and min are not relevant to a product computation. The question is about multiplying all other elements, not finding extremes.' },
      ],
      correctFeedback: 'answer[i] = (product of nums[0..i−1]) × (product of nums[i+1..n−1]). These are the prefix product up to i and the suffix product from i — both computable in a single pass each.',
      wrongFeedback: [
        'Write out answer[1] for [1,2,3,4]: it equals 1 × 3 × 4. Which elements are to the left of index 1, and which are to the right?',
        'answer[i] = (everything left of i multiplied together) × (everything right of i multiplied together). Can you compute each part with a separate pass over the array?',
      ],
    },
    {
      id: 'zero-handling',
      question: 'nums can contain zeros (e.g., [-1,1,0,-3,3]). How does a zero affect the output?',
      options: [
        { label: 'Division by zero makes the input invalid', isCorrect: false, feedback: 'Division is already banned. The prefix/suffix approach never divides, so zeros in the input are handled naturally — multiplying by zero just gives zero.' },
        { label: 'All outputs are 0 except the position of the zero', isCorrect: true },
        { label: 'You must skip zeros and handle them separately', isCorrect: false, feedback: 'No special-casing is needed. The prefix/suffix products propagate zero naturally: any product that includes the zero element becomes zero.' },
        { label: 'The array must contain at most one zero', isCorrect: false, feedback: 'The problem places no such restriction. With two zeros, every output is 0 — the prefix/suffix approach handles this without any special logic.' },
      ],
      correctFeedback: 'When one zero exists, only the product at the zero\'s index avoids it, giving a non-zero result. All other positions have the zero in their product, so they output 0. Prefix/suffix handles this automatically.',
      wrongFeedback: [
        'For nums = [-1,1,0,-3,3], what is the product of all elements except the zero at index 2? What about the product for index 0?',
        'Any position that is not the zero includes the zero in its product — making it 0. Only the zero\'s own position has a product that excludes it. The prefix/suffix pass computes this correctly without special cases.',
      ],
    },
    {
      id: 'complexity-requirement',
      question: '"O(n) time" with nums.length ≤ 10⁵. What does that rule out beyond the division approach?',
      options: [
        { label: 'A single linear pass over the array', isCorrect: false, feedback: 'A single pass is O(n) and is allowed. Two passes are also O(n). The constraint rules out quadratic approaches, not multiple linear passes.' },
        { label: 'Computing each output value with a fresh O(n) scan', isCorrect: true },
        { label: 'Using two arrays for prefix and suffix', isCorrect: false, feedback: 'Two arrays of size n are O(n) space and O(n) time to fill — both are fine. The constraint is on time, not space (extra space is acceptable).' },
        { label: 'Any approach with more than one pass', isCorrect: false, feedback: 'Two passes is still O(n). The O(n) constraint rules out O(n²) — not a constant number of passes.' },
      ],
      correctFeedback: 'For each of n indices, computing its product from scratch requires O(n) work — giving O(n²) total. At n = 100,000 that is 10 billion operations. You need each index\'s product to be derived in O(1) from precomputed prefix and suffix arrays.',
      wrongFeedback: [
        'If computing answer[i] requires scanning all n elements each time, what is the total cost for all n outputs?',
        'O(n) per index × n indices = O(n²) = 10 billion operations at n = 10⁵. The prefix/suffix precomputation lets you answer each index in O(1) after two O(n) passes.',
      ],
    },
  ],
}
