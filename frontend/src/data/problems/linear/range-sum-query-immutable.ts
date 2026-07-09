export default {
  id: 'range-sum-query-immutable',
  title: 'Range Sum Query - Immutable',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code>, handle multiple queries of the form: return the sum of elements between indices <code>left</code> and <code>right</code> (inclusive). Precompute prefix sums to answer each query in O(1).',
  examples: [
    { input: 'nums=[−2,0,3,−5,2,−1], sumRange(0,2), sumRange(2,5), sumRange(0,5)', output: '1, −1, −3', explanation: 'Prefix sums allow O(1) range queries.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁵ ≤ nums[i] ≤ 10⁵', 'At most 10⁴ calls to sumRange'],
  starterCode: `def range_sum_query(nums, queries):
  prefix = [0] * (len(nums) + 1)
  for i, v in enumerate(nums):
      prefix[i+1] = prefix[i] + v
  return [prefix[r+1] - prefix[l] for l, r in queries]`,
  functionName: 'range_sum_query',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Multiple queries', args: [[-2,0,3,-5,2,-1],[[0,2],[2,5],[0,5]]], expected: [1,-1,-3] },
    { label: 'Single query', args: [[1,2,3,4],[[1,3]]], expected: [9] },
  ],
  bruteHint: 'Describe summing the elements in the range from scratch on every query, and name its time complexity per query',
  optimizeHint: 'Name the precomputed structure that answers each query in O(1)',
  clues: [
    {
      id: 'multiple-queries',
      question: '"At most 10⁴ calls to sumRange." Why does the number of queries matter?',
      options: [
        { label: 'More queries means a longer output array', isCorrect: false, feedback: 'The output length equals the number of queries, but that is not why query count affects strategy. The key concern is total computation cost.' },
        { label: 'Each naive query costs O(n); 10⁴ queries costs O(n·q) total', isCorrect: true },
        { label: 'Queries must be answered in sorted order', isCorrect: false, feedback: 'Nothing in the problem requires sorted query order. Queries are independent and can be answered in any sequence.' },
        { label: 'You should batch all queries into a single scan', isCorrect: false, feedback: 'Batching is one approach, but precomputing prefix sums lets each query run in O(1) independently — no batching required.' },
      ],
      correctFeedback: 'A naive sum over [left, right] costs O(n) per query. With 10⁴ queries on n = 10⁴ elements, that is 10⁸ operations total. Precomputing prefix sums reduces each query to O(1).',
      wrongFeedback: [
        'If one query takes O(n) time, what is the cost for 10⁴ queries on an array of 10⁴ elements?',
        'O(n) per query × 10⁴ queries = O(n·q). At n = q = 10⁴, that is 10⁸ operations. What precomputation makes each query O(1)?',
      ],
    },
    {
      id: 'prefix-sum-definition',
      question: 'prefix[i] stores the sum of nums[0..i−1]. How do you compute sumRange(left, right) from this?',
      options: [
        { label: 'prefix[right] − prefix[left]', isCorrect: false, feedback: 'This gives sum of nums[0..right−1] minus nums[0..left−1], which excludes nums[left]. The correct formula includes nums[left]: prefix[right+1] − prefix[left].' },
        { label: 'prefix[right+1] − prefix[left]', isCorrect: true },
        { label: 'prefix[right] − prefix[left−1]', isCorrect: false, feedback: 'This fails when left = 0 because prefix[−1] is out of bounds. Defining prefix with a leading 0 at index 0 avoids this edge case.' },
        { label: 'prefix[right+1] − prefix[left+1]', isCorrect: false, feedback: 'This excludes nums[left] from the sum. The formula must start from prefix[left], not prefix[left+1].' },
      ],
      correctFeedback: 'prefix[right+1] holds the sum of nums[0..right]. prefix[left] holds the sum of nums[0..left−1]. Subtracting gives exactly nums[left..right].',
      wrongFeedback: [
        'Write out prefix for [−2,0,3]: it is [0,−2,−2,1]. What is sumRange(0,2)? Which two prefix values subtract to give 1?',
        'prefix[right+1] includes nums[right]; prefix[left] excludes nums[left−1] and all before. Their difference is precisely the range sum you want.',
      ],
    },
    {
      id: 'immutable-constraint',
      question: '"Immutable" means nums does not change after construction. How does this affect your strategy?',
      options: [
        { label: 'You must copy nums before modifying it', isCorrect: false, feedback: 'Nothing in the solution requires modifying nums. "Immutable" is a signal about query semantics, not about copying.' },
        { label: 'Precompute once; answer all queries from the precomputed data', isCorrect: true },
        { label: 'Each query must recompute from the original array', isCorrect: false, feedback: 'Recomputing from the original array each time is the naive O(n) approach — it is what precomputation is designed to replace.' },
        { label: 'You cannot use extra space because nums is read-only', isCorrect: false, feedback: '"Immutable" means nums does not change — it says nothing about whether you can allocate a separate prefix sum array. Extra space is fine.' },
      ],
      correctFeedback: 'Because nums never changes, any precomputed data (like prefix sums) remains valid for all future queries. Precompute once in O(n), then answer every query in O(1).',
      wrongFeedback: [
        'If nums could change between queries, would your prefix sum array stay valid? What does immutability guarantee?',
        'Immutability means the prefix sum you compute at the start is accurate for every query. You pay the O(n) precomputation cost once and reuse it 10⁴ times.',
      ],
    },
  ],
}
