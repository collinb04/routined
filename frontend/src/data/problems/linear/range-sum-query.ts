export default {
  id: 'range-sum-query',
  title: 'Range Sum Query',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code> and two indices <code>left</code> and <code>right</code> (0-indexed, inclusive), return the sum of elements between them. Use a prefix sum array so the query runs in O(1).',
  examples: [
    { input: 'nums = [-2, 0, 3, -5, 2, -1], left = 0, right = 2', output: '1', explanation: '-2 + 0 + 3 = 1.' },
    { input: 'nums = [-2, 0, 3, -5, 2, -1], left = 2, right = 5', output: '-1', explanation: '3 + (-5) + 2 + (-1) = -1.' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10⁴',
    '-10⁵ ≤ nums[i] ≤ 10⁵',
    '0 ≤ left ≤ right < nums.length',
  ],
  starterCode: `def range_sum(nums, left, right):
  pass`,
  functionName: 'range_sum',
  conceptId: 'prefix-sums',
  testCases: [
    { label: 'First three', args: [[-2, 0, 3, -5, 2, -1], 0, 2], expected: 1 },
    { label: 'Last four', args: [[-2, 0, 3, -5, 2, -1], 2, 5], expected: -1 },
    { label: 'Full array', args: [[-2, 0, 3, -5, 2, -1], 0, 5], expected: -3 },
    { label: 'Single element', args: [[3, 5, 2], 1, 1], expected: 5 },
  ],
  bruteHint: 'Describe summing the elements in the range from scratch, and name its time complexity',
  optimizeHint: 'Name the precomputed structure that turns each query into an O(1) lookup',
  clues: [
    {
      id: 'o1-query-requirement',
      question: '"Use a prefix sum array so the query runs in O(1)." What does O(1) rule out?',
      options: [
        { label: 'Using a loop to sum elements in [left, right]', isCorrect: true },
        { label: 'Allocating an extra array', isCorrect: false, feedback: 'The problem explicitly asks you to use a prefix sum array — extra space is expected. O(1) refers to query time, not space.' },
        { label: 'Handling negative numbers', isCorrect: false, feedback: 'Negative numbers are straightforward — prefix sums work identically for negative values. O(1) refers to the time complexity of the query.' },
        { label: 'Answering when left equals right', isCorrect: false, feedback: 'left = right is the single-element case. The O(1) requirement applies uniformly — no loop for any case, including single elements.' },
      ],
      correctFeedback: 'Iterating from left to right costs O(right − left + 1) — up to O(n) per query. O(1) means the answer must come from arithmetic on two precomputed values, not a loop.',
      wrongFeedback: [
        'What computation costs O(n) for a range query, and what could replace it with O(1)?',
        'Summing elements in a range requires visiting each one — that is O(n). To get O(1), the sum must already be encoded in a structure you can index directly.',
      ],
    },
    {
      id: 'prefix-sum-construction',
      question: 'prefix[0] = 0 and prefix[i+1] = prefix[i] + nums[i]. For nums = [-2, 0, 3, -5], what is prefix[3]?',
      options: [
        { label: '3', isCorrect: false, feedback: 'prefix[3] = prefix[2] + nums[2]. prefix[2] = prefix[1] + nums[1] = -2 + 0 = -2. So prefix[3] = -2 + 3 = 1.' },
        { label: '1', isCorrect: true },
        { label: '-2', isCorrect: false, feedback: 'That is prefix[1]. prefix[1] = prefix[0] + nums[0] = 0 + (−2) = −2. prefix[3] includes the first three elements.' },
        { label: '-4', isCorrect: false, feedback: 'prefix[4] = prefix[3] + nums[3] = 1 + (−5) = −4. That is one step further than prefix[3].' },
      ],
      correctFeedback: 'prefix[3] = 0 + (−2) + 0 + 3 = 1. It is the cumulative sum of the first three elements (indices 0, 1, 2), which is exactly sumRange(0, 2).',
      wrongFeedback: [
        'Build prefix step by step: prefix[0]=0, prefix[1]=prefix[0]+nums[0], prefix[2]=prefix[1]+nums[1], prefix[3]=?',
        'prefix[i] is the sum of the first i elements. For nums=[-2,0,3,-5]: prefix[1]=-2, prefix[2]=-2, prefix[3]=1.',
      ],
    },
    {
      id: 'left-equals-zero',
      question: '0 ≤ left ≤ right. When left = 0, how does the prefix formula handle it?',
      options: [
        { label: 'It fails — prefix[-1] is out of bounds', isCorrect: false, feedback: 'The formula is prefix[right+1] − prefix[left], not prefix[right+1] − prefix[left−1]. When left = 0, you subtract prefix[0] = 0, which is valid.' },
        { label: 'prefix[right+1] − prefix[0] = prefix[right+1]', isCorrect: true },
        { label: 'You need a special case for left = 0', isCorrect: false, feedback: 'No special case is needed. prefix[0] = 0 by construction, so prefix[right+1] − prefix[0] simplifies naturally to prefix[right+1].' },
        { label: 'left = 0 makes prefix sums unnecessary', isCorrect: false, feedback: 'Even when left = 0, the prefix formula gives you the sum in O(1). Abandoning the prefix approach for this case would complicate the code without benefit.' },
      ],
      correctFeedback: 'prefix[0] = 0 by construction. So sumRange(0, right) = prefix[right+1] − 0 = prefix[right+1], which is exactly the cumulative sum of the first right+1 elements.',
      wrongFeedback: [
        'In the formula prefix[right+1] − prefix[left], what is prefix[left] when left = 0?',
        'prefix[0] was initialized to 0. The formula prefix[right+1] − prefix[0] = prefix[right+1] requires no special handling — the leading 0 was placed there for exactly this reason.',
      ],
    },
  ],
}
