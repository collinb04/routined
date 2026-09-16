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
  starterCode: `class Solution:
    def product_except_self(self, nums):
        pass`,
  runnerSetup: 'product_except_self = Solution().product_except_self',
  functionName: 'product_except_self',
  conceptId: 'arrays',
  testCases: [
    { label: '[1,2,3,4]', args: [[1,2,3,4]], expected: [24,12,8,6] },
    { label: 'with zero', args: [[-1,1,0,-3,3]], expected: [0,0,9,0,0] },
  ],
  bruteHint: 'A direct approach uses a nested loop: for each index, multiply together every other element by looping through the array again, costing O(n) work per index and O(n²) overall. You might think to instead compute the total product once and divide by nums[i] for O(1) per index — but division is explicitly forbidden here, and it would break anyway wherever nums contains a zero. With nums.length up to 10⁵, an O(n²) nested loop means up to 10 billion operations — if you cannot multiply everything and divide back out, what would let you build each index\'s product using only multiplication?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'no-division-constraint',
      question: 'Knowing which operation is explicitly banned tells you the obvious shortcut is not available, forcing a different route to the same numbers. "Without using the division operation" rules out the simplest approach. What was that approach?',
      highlight: { location: 'description', text: 'without using the division operation' },
      options: [
        { label: 'Reorder the array by value and pick a middle element', isCorrect: false, feedback: 'Sorting has nothing to do with this problem. The naive approach uses the total product divided by each element.' },
        { label: 'Compute total product, divide by each element', isCorrect: true },
        { label: 'Add up a running total instead of multiplying', isCorrect: false, feedback: 'Prefix sums compute additive ranges, not multiplicative ones. The forbidden approach is division — not sums.' },
        { label: 'Work inward from both ends of the array', isCorrect: false, feedback: 'Two pointers is a traversal strategy, not a computation strategy. The banned operation is division specifically.' },
      ],
      correctFeedback: 'The obvious approach: multiply all elements, then divide by nums[i] for each position. The constraint bans this, forcing you to find each product without ever dividing.',
      wrongFeedback: [
        'If you had the product of all n numbers, how would you compute "product except nums[i]" for each i in one step?',
        'Total product ÷ nums[i] gives the answer for each index in O(1) — but division is banned. You need a different way to get the product of all elements except one.',
      ],
    },
    {
      id: 'prefix-suffix-decomposition',
      question: 'Splitting the required computation into two independent halves tells you what two separate passes you will need to combine at the end. For index i, "product of everything except nums[i]" can be split into two independent parts. What are they?',
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
      question: 'Checking how the general approach behaves on an edge case tells you whether it truly needs special-casing or already just works. nums can contain zeros (e.g., [-1,1,0,-3,3]). How does a zero affect the output?',
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
      question: 'Pinning an explicit complexity ceiling tells you exactly which approaches remain viable at this input size. "O(n) time" with nums.length ≤ 10⁵. What does that rule out beyond the division approach?',
      highlight: { location: 'description', text: 'O(n) time' },
      options: [
        { label: 'A single linear pass over the array', isCorrect: false, feedback: 'A single pass is O(n) and is allowed. Two passes are also O(n). The constraint rules out quadratic approaches, not multiple linear passes.' },
        { label: 'Computing each output value with a fresh O(n) scan', isCorrect: true },
        { label: 'Using two extra arrays sized to the input', isCorrect: false, feedback: 'Two arrays of size n are O(n) space and O(n) time to fill — both are fine. The constraint is on time, not space (extra space is acceptable).' },
        { label: 'Any approach with more than one pass', isCorrect: false, feedback: 'Two passes is still O(n). The O(n) constraint rules out O(n²) — not a constant number of passes.' },
      ],
      correctFeedback: 'For each of n indices, computing its product from scratch requires O(n) work — giving O(n²) total. At n = 100,000 that is 10 billion operations. You need each index\'s product to be derived in O(1) from precomputed prefix and suffix arrays.',
      wrongFeedback: [
        'If computing answer[i] requires scanning all n elements each time, what is the total cost for all n outputs?',
        'O(n) per index × n indices = O(n²) = 10 billion operations at n = 10⁵. The prefix/suffix precomputation lets you answer each index in O(1) after two O(n) passes.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def product_except_self(self, nums):
        n = len(nums)
        result = [1] * n
        prefix = 1
        for i in range(n):
            result[i] = prefix
            prefix *= nums[i]
        suffix = 1
        for i in range(n - 1, -1, -1):
            result[i] *= suffix
            suffix *= nums[i]
        return result`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'The output array itself is reused to hold the prefix products first, then multiplied by suffix products in a second pass — this is what keeps the extra space at O(1) beyond the required output, instead of allocating separate prefix and suffix arrays.',
  solutionExplanation: 'Answer[i] is exactly "product of everything before i" times "product of everything after i" — two pieces that can each be built with a single running variable in one direction. A left-to-right pass fills each slot with the product of everything strictly to its left (before that index\'s own value is folded into the running product), and a right-to-left pass multiplies in the product of everything strictly to its right the same way, so every index ends up with the product of all *other* elements without ever performing a division.',
  solution: {
    patternName: 'Precomputed prefix/suffix aggregation — use when each output position needs a combination of "everything before" and "everything after" itself',
    approaches: [
      {
        approachName: 'Brute force',
        oneLineIdea: 'For each index, multiply every other element from scratch',
        subgoals: [
          { label: 'Fix the excluded index', explanation: 'Loop i over every position that needs an output value' },
          { label: 'Multiply everything else', explanation: 'A nested loop multiplies every element except index i' },
          { label: 'Store the running product', explanation: 'The nested loop\'s result becomes answer[i]' },
        ],
        code: `def product_except_self(nums):
    n = len(nums)
    answer = [1] * n
    for i in range(n):                    # fix the excluded index
        product = 1
        for j in range(n):
            if j != i:
                product *= nums[j]         # multiply everything else
        answer[i] = product                # store the running product
    return answer`,
        timeComplexity: 'O(n²) — for each of n indices, a fresh O(n) scan multiplies every other element',
        spaceComplexity: 'O(1) extra beyond the output array — but the O(n²) time is what makes this infeasible at n up to 10⁵',
        whenYouWouldActuallyUseThis: 'Only to confirm the definition of the problem out loud — at n = 10⁵ this is 10 billion multiplications, nowhere close to feasible.',
      },
      {
        approachName: 'Prefix and suffix arrays',
        oneLineIdea: 'Precompute running products from both directions, then multiply them',
        subgoals: [
          { label: 'Build the prefix products', explanation: 'prefix[i] holds the product of every element strictly before i' },
          { label: 'Build the suffix products', explanation: 'suffix[i] holds the product of every element strictly after i' },
          { label: 'Combine the two passes', explanation: 'answer[i] = prefix[i] × suffix[i] combines both halves in O(1) per index' },
        ],
        code: `def product_except_self(nums):
    n = len(nums)
    prefix = [1] * n
    for i in range(1, n):
        prefix[i] = prefix[i - 1] * nums[i - 1]      # build the prefix products

    suffix = [1] * n
    for i in range(n - 2, -1, -1):
        suffix[i] = suffix[i + 1] * nums[i + 1]      # build the suffix products

    return [prefix[i] * suffix[i] for i in range(n)]  # combine the two passes`,
        timeComplexity: 'O(n) — three linear passes: building prefix, building suffix, and combining them',
        spaceComplexity: 'O(n) — the prefix and suffix arrays are each sized to the input',
        whenYouWouldActuallyUseThis: 'When code clarity matters more than shaving off the last bit of memory — keeping prefix and suffix as separate named arrays makes the two-part idea easy to read and debug.',
      },
      {
        approachName: 'Space-optimized',
        oneLineIdea: 'Reuse the output array for the prefix pass, then fold in the suffix pass in place',
        subgoals: [
          { label: 'Fill the output with prefix products', explanation: 'One left-to-right pass writes prefix products directly into answer, with no separate array' },
          { label: 'Sweep suffix products in with a running variable', explanation: 'One right-to-left pass multiplies a single running suffix total into each slot' },
          { label: 'Never materialize a second array', explanation: 'The running suffix variable replaces what would have been the whole suffix array' },
        ],
        code: `def product_except_self(nums):
    n = len(nums)
    answer = [1] * n
    for i in range(1, n):
        answer[i] = answer[i - 1] * nums[i - 1]   # fill the output with prefix products

    suffix = 1
    for i in range(n - 1, -1, -1):
        answer[i] *= suffix                       # sweep suffix products in with a running variable
        suffix *= nums[i]                          # never materialize a second array
    return answer`,
        timeComplexity: 'O(n) — two linear passes, same as the prefix/suffix version',
        spaceComplexity: 'O(1) extra — a single running suffix variable replaces the whole suffix array (the output array doesn\'t count as extra space)',
        whenYouWouldActuallyUseThis: 'The default choice — same time complexity as keeping two arrays, but it satisfies the stricter O(1)-extra-space bar this problem sets, at no real cost to readability.',
      },
    ],
    comparisonTable: [
      { approach: 'Brute force', time: 'O(n²)', space: 'O(1)', structuralUnlock: 'None — every index redoes the full multiplication from scratch' },
      { approach: 'Prefix and suffix arrays', time: 'O(n)', space: 'O(n)', structuralUnlock: 'Splitting "everything except i" into two precomputed halves means each index is answered in O(1), replacing repeated work with two single passes' },
      { approach: 'Space-optimized', time: 'O(n)', space: 'O(1)', structuralUnlock: 'The suffix array was only ever read once per index, in order — a single running variable carries the same information without ever being stored as a full array' },
    ],
    transferNote: 'Precomputing prefix and suffix aggregates the same way solves Trapping Rain Water (max height to the left and right of each bar) and Candy (comparisons built from both directions before combining). Whenever an output position depends on "everything before" combined with "everything after," look for two linear passes before reaching for anything more complex.',
    retrievalCheck: [
      'If division were allowed, how would the total-product approach handle an input containing a zero — and why does prefix/suffix avoid that problem entirely?',
      'If you needed the sum instead of the product of all other elements, would this same prefix/suffix structure still apply?',
      'Why does the space-optimized version still need two separate passes instead of computing everything in one?',
    ],
  },
}
