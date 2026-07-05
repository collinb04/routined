export default {
  id: 'jump-game',
  title: 'Jump Game',
  difficulty: 'medium',
  description: 'You are given an integer array <code>nums</code> where <code>nums[i]</code> is the maximum jump length from position <code>i</code>. Return <code>true</code> if you can reach the last index starting from index 0.',
  examples: [
    { input: 'nums = [2,3,1,1,4]', output: 'true', explanation: 'Jump 1 to index 1, then 3 to reach the end.' },
    { input: 'nums = [3,2,1,0,4]', output: 'false', explanation: 'You always reach index 3 with value 0.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '0 ≤ nums[i] ≤ 10⁵'],
  starterCode: `def can_jump(nums):
  pass`,
  functionName: 'can_jump',
  conceptId: 'greedy',
  testCases: [
    { label: 'Can reach', args: [[2,3,1,1,4]], expected: true },
    { label: 'Cannot reach', args: [[3,2,1,0,4]], expected: false },
    { label: 'Single element', args: [[0]], expected: true },
    { label: 'All zeros except first', args: [[2,0,0]], expected: true },
  ],
  clues: [
    {
      id: 'max-reach-signal',
      question: 'nums[i] is the maximum jump length, not the exact jump. What does "maximum" imply about your choices?',
      options: [
        { label: 'You must always jump nums[i] steps', isCorrect: false, feedback: 'nums[i] is a ceiling, not a requirement. From index i you can jump 1, 2, … or nums[i] steps. You are free to land anywhere within that range — choosing a shorter jump may open better paths.' },
        { label: 'You can jump any number of steps from 1 to nums[i]', isCorrect: true },
        { label: 'You should always jump as far as possible', isCorrect: false, feedback: 'Jumping as far as possible at each step is not always optimal. In [3,2,1,0,4], always jumping max lands you at index 3 with value 0 just as badly as shorter jumps. The key insight is tracking the farthest reachable index, not always using the maximum.' },
        { label: 'You must jump exactly 1 step at a time', isCorrect: false, feedback: 'Jumping exactly 1 each time would be O(n) steps and ignore the ability to cover multiple positions at once. nums[i] > 1 means you can skip ahead.' },
      ],
      correctFeedback: 'From index i, you can land on any index from i+1 to i+nums[i]. Tracking the farthest reachable index at each step captures all possible jump choices without trying each one.',
      wrongFeedback: [
        'If nums[1] = 3, can you jump to index 2? To index 3? To index 4? What is the full range of valid landing positions?',
        'From index i you can land on i+1, i+2, …, or i+nums[i]. You want to track the maximum of i+nums[i] across all reachable indices.',
      ],
    },
    {
      id: 'zero-trap',
      question: '[3,2,1,0,4] always returns false. What makes index 3 (value 0) a trap that cannot be avoided?',
      options: [
        { label: 'Index 3 has value 0, so you cannot jump from it', isCorrect: false, feedback: 'That is true — but the question is why you cannot avoid landing there. Every path from index 0 must pass through indices 1, 2, or 3 to reach index 4. With values [3,2,1], the farthest any of those indices can reach is 0+3=3, 1+2=3, 2+1=3 — all land at 3 at most.' },
        { label: 'Every reachable index can reach at most index 3', isCorrect: true },
        { label: 'The array is too short to skip index 3', isCorrect: false, feedback: 'Array length is not the constraint. Index 0 has value 3, which in a different array could jump over index 3 entirely. The issue here is that every position reachable from index 0 has a max reach of exactly index 3.' },
        { label: 'Index 4 is out of bounds', isCorrect: false, feedback: 'Index 4 is the last valid index in a length-5 array — it is exactly where you need to reach. The problem is getting there, not that it is out of bounds.' },
      ],
      correctFeedback: 'From index 0 (value 3): max reach = 3. From index 1 (value 2): max reach = 3. From index 2 (value 1): max reach = 3. The "horizon" never extends past index 3, so index 4 is unreachable.',
      wrongFeedback: [
        'Track the farthest index reachable from index 0, 1, and 2. Can any of them reach index 4?',
        '0+3=3, 1+2=3, 2+1=3. All reachable positions cap out at index 3. From index 3, nums[3]=0 means you are stuck. The horizon never reaches 4.',
      ],
    },
    {
      id: 'greedy-max-reach',
      question: 'A greedy approach tracks max_reach as you scan left to right. What condition means you can reach the last index?',
      options: [
        { label: 'max_reach > 0 at any point', isCorrect: false, feedback: 'max_reach > 0 just means you can move at all — it says nothing about whether the last index is within reach. You need max_reach >= len(nums) - 1 specifically.' },
        { label: 'max_reach >= len(nums) - 1 after scanning', isCorrect: true },
        { label: 'You never encounter a zero in nums', isCorrect: false, feedback: 'Zeros are not automatically fatal. [2,0,0] returns true — index 0 (value 2) jumps over the zeros directly to the last index. A zero at index i is only a problem if i is the farthest reachable index.' },
        { label: 'The sum of nums is >= len(nums)', isCorrect: false, feedback: 'The sum does not reflect reachability. [0,3,2,1] has sum 6 >= length 4, but you are trapped at index 0 immediately. What matters is whether the running max reach ever covers the last index.' },
      ],
      correctFeedback: 'Scan left to right; at each index i update max_reach = max(max_reach, i + nums[i]). If max_reach >= n-1 at any point, return true. If i ever exceeds max_reach, you are stuck — return false.',
      wrongFeedback: [
        'As you scan, you track the farthest index you could reach. What value must that reach achieve for the answer to be true?',
        'You need max_reach >= last index (n-1). Also watch for the case where your current position i exceeds max_reach — that means you\'re on an island you can\'t leave.',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'nums.length ≤ 10⁴ and nums[i] ≤ 10⁵. Could a brute-force approach (try every path) be fast enough?',
      options: [
        { label: 'Yes — 10⁴ is small enough for brute force', isCorrect: false, feedback: 'In the worst case, the number of distinct jump sequences is exponential. From each position you can jump up to nums[i] ≤ 10⁵ places — the branching factor makes exhaustive search completely infeasible.' },
        { label: 'No — the branching factor makes it exponential', isCorrect: true },
        { label: 'Yes — because nums[i] values are bounded at 10⁵', isCorrect: false, feedback: 'A larger max jump value means more branches per step, which makes brute force slower, not faster. The bounds tell you that a greedy O(n) pass is needed — not that brute force is acceptable.' },
        { label: 'Only if you sort nums first to prune branches', isCorrect: false, feedback: 'Sorting destroys the original indices — you cannot sort nums and still know which position maps to which jump length. The greedy approach avoids brute force entirely in O(n) with no sorting.' },
      ],
      correctFeedback: 'At each step you can branch up to 10⁵ ways; with 10⁴ steps the search tree is astronomical. The greedy max-reach approach is O(n) — one scan, no branching, no backtracking.',
      wrongFeedback: [
        'At index 0, you might try 1 jump, 2 jumps, ..., up to nums[0] jumps. At each of those positions, you branch again. How large does the search tree get?',
        'With up to 10⁵ branches per step over 10⁴ steps, brute force is infeasible. The greedy approach collapses all choices into a single max_reach variable — O(n) total.',
      ],
    },
  ],
}
