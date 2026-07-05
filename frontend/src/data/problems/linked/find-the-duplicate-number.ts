export default {
  id: 'find-the-duplicate-number',
  title: 'Find the Duplicate Number',
  difficulty: 'medium',
  description: `<p>Given an array of integers <code>nums</code> containing <code>n + 1</code> integers where each integer is in the range <code>[1, n]</code>, there is only one repeated number. Return this repeated number.</p><p>You must solve the problem without modifying the array and uses only constant extra space.</p>`,
  examples: [
    { input: 'nums = [1,3,4,2,2]', output: '2' },
    { input: 'nums = [3,1,3,4,2]', output: '3' },
  ],
  constraints: ['1 <= n <= 10^5', 'nums.length == n + 1', '1 <= nums[i] <= n', 'There is only one repeated number'],
  starterCode: `def find_duplicate(nums):
  pass`,
  functionName: 'find_duplicate',
  conceptId: 'linked-list',
  testCases: [
    { label: '[1,3,4,2,2]', args: [[1,3,4,2,2]], expected: 2 },
    { label: '[3,1,3,4,2]', args: [[3,1,3,4,2]], expected: 3 },
  ],
  clues: [
    {
      id: 'constraint-no-modification',
      question: '"You must solve the problem without modifying the array." This rules out…',
      options: [
        { label: 'Sorting the array in place', isCorrect: true },
        { label: 'Reading any element twice', isCorrect: false, feedback: 'Reading elements multiple times is fine — the constraint is about writing. Sorting, swapping, and negation tricks all mutate the array, which is forbidden.' },
        { label: 'Using a hash map', isCorrect: false, feedback: 'A hash map reads the array but never modifies it, so it satisfies the no-modification constraint. However, it uses O(n) extra space, which violates the constant-space constraint.' },
        { label: 'Iterating the array more than once', isCorrect: false, feedback: 'Multiple passes over the array are fine — the constraint forbids writing to the array, not reading it repeatedly.' },
      ],
      correctFeedback: 'Sorting is the classic in-place duplicate finder, but it mutates the array. The constraint explicitly blocks that path, steering you toward read-only approaches.',
      wrongFeedback: [
        'The constraint says "without modifying the array." Which operation in the options writes to the array?',
        'Sorting rearranges elements — that\'s a modification. The constraint is telling you to find the duplicate without rearranging anything.',
      ],
    },
    {
      id: 'constraint-constant-space',
      question: '"Uses only constant extra space." With n ≤ 10^5, this rules out…',
      options: [
        { label: 'A visited set or hash map', isCorrect: true },
        { label: 'Two integer pointers', isCorrect: false, feedback: 'Two pointers use O(1) space — that\'s exactly constant space. The constraint is ruling out structures that grow with n, like sets or maps.' },
        { label: 'Returning an integer', isCorrect: false, feedback: 'The output is a single integer — O(1) space. The constraint targets auxiliary data structures that grow proportionally to n, not the output itself.' },
        { label: 'Reading nums[i] as an index', isCorrect: false, feedback: 'Treating values as indices is a read-only operation that uses no extra space. It\'s actually the key insight the constant-space constraint is hinting toward.' },
      ],
      correctFeedback: 'A hash set of seen values costs O(n) space — up to 100,000 entries. The constant-space constraint rules that out and forces you toward a pointer-based approach.',
      wrongFeedback: [
        'At n = 10^5, which option would require storing up to 100,000 elements?',
        'A set grows with n — O(n) space. The constraint says O(1). What approach uses only a fixed number of variables regardless of input size?',
      ],
    },
    {
      id: 'pigeonhole-guarantee',
      question: 'nums has n + 1 integers, each in [1, n], with only one repeated number. This structure means…',
      options: [
        { label: 'You must check every pair of elements', isCorrect: false, feedback: 'Checking every pair is O(n²) — up to 10 billion operations at n = 10^5. The pigeonhole guarantee means a duplicate must exist; you don\'t need exhaustive pair comparison to find it.' },
        { label: 'A cycle must exist when values are used as indices', isCorrect: true },
        { label: 'Binary search on values will find the duplicate', isCorrect: false, feedback: 'Binary search on the value space can find the duplicate via the pigeonhole principle, but it requires O(n log n) counting passes. The array-as-linked-list insight provides an O(n) path.' },
        { label: 'The duplicate is always at index 0 or 1', isCorrect: false, feedback: 'The duplicate can appear anywhere in the array. The structure guarantee is about counts — n+1 values in [1,n] force a repeat — not about position.' },
      ],
      correctFeedback: 'When you treat each value nums[i] as a pointer to index nums[i], you get an implicit linked list. Because n+1 values map into n indices, two entries point to the same index — creating a cycle. The duplicate is the cycle\'s entry point.',
      wrongFeedback: [
        'If nums[i] is an index into nums, what happens when two different positions hold the same value?',
        'Two elements with the same value both point to the same index — like two roads merging at one node. That\'s a cycle. What algorithm detects cycle entry points in O(n) and O(1) space?',
      ],
    },
    {
      id: 'one-duplicate-guarantee',
      question: '"There is only one repeated number." This means…',
      options: [
        { label: 'The answer might not exist', isCorrect: false, feedback: 'The guarantee says a duplicate always exists — the answer is never missing. You don\'t need any "not found" handling.' },
        { label: 'You can stop as soon as you find the duplicate', isCorrect: false, feedback: 'Stopping early would work for a hash-set approach, but the O(1)-space approach (Floyd\'s algorithm) needs to complete its cycle before it can identify the entry point.' },
        { label: 'There is exactly one entry point to find', isCorrect: true },
        { label: 'All other numbers appear at least twice', isCorrect: false, feedback: 'Only one number is repeated; the rest appear exactly once. If others also repeated, there could be multiple cycle entry points, and the approach would need modification.' },
      ],
      correctFeedback: 'Exactly one repeated number means exactly one cycle entry point in the implicit linked list. Floyd\'s algorithm finds exactly that — the node where two paths converge.',
      wrongFeedback: [
        'If multiple numbers were repeated, there could be multiple duplicates. What does "only one repeated" tell you about how many entry points you\'re looking for?',
        'One duplicate means one convergence point. Algorithms designed for a single cycle entry — like Floyd\'s — apply directly here.',
      ],
    },
  ],
}
