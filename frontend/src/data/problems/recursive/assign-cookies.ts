export default {
  id: 'assign-cookies',
  title: 'Assign Cookies',
  difficulty: 'easy',
  description: 'You want to give cookies to children. Child <code>i</code> has a greed factor <code>g[i]</code> — the minimum cookie size they\'ll accept. Cookie <code>j</code> has size <code>s[j]</code>. Each child gets at most one cookie. Return the maximum number of content children.',
  examples: [
    { input: 'g = [1,2,3], s = [1,1]', output: '1', explanation: 'Only one child with greed 1 can be satisfied.' },
    { input: 'g = [1,2], s = [1,2,3]', output: '2', explanation: 'Both children can be satisfied.' },
  ],
  constraints: [
    '1 ≤ g.length ≤ 3 × 10⁴',
    '0 ≤ s.length ≤ 3 × 10⁴',
    '1 ≤ g[i], s[j] ≤ 2³¹ - 1',
  ],
  starterCode: `def find_content_children(g, s):
  # Hint: sort both, use two pointers — give smallest sufficient cookie first
  pass`,
  functionName: 'find_content_children',
  conceptId: 'greedy',
  testCases: [
    { label: 'One satisfied', args: [[1,2,3],[1,1]], expected: 1 },
    { label: 'All satisfied', args: [[1,2],[1,2,3]], expected: 2 },
    { label: 'No cookies', args: [[1,2],[]], expected: 0 },
    { label: 'None fit', args: [[10],[1,2,3]], expected: 0 },
    { label: 'Exact match', args: [[1,2,3],[1,2,3]], expected: 3 },
  ],
  bruteHint: 'Describe the brute-force approach of trying every child-cookie pairing and its time complexity',
  optimizeHint: 'Name the technique of sorting both arrays and matching greedily with two pointers',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'g.length and s.length are both up to 3 × 10⁴. What does that tell you about acceptable complexity?',
      options: [
        { label: 'O(n²) is fine at this size', isCorrect: false, feedback: 'At 3 × 10⁴, an O(n²) approach runs roughly 900 million operations — far too slow. The constraint is signaling that you need something closer to linear.' },
        { label: 'O(n log n) or better is needed', isCorrect: true },
        { label: 'O(log n) is the target', isCorrect: false, feedback: 'You must at least read both arrays in full, so O(log n) is impossible here. The bound rules out quadratic work, not linear or linearithmic.' },
        { label: 'Input size has no bearing on approach', isCorrect: false, feedback: 'Input size always constrains your approach. With up to 30,000 elements in each array, you need to rule out any O(n²) strategy.' },
      ],
      correctFeedback: '3 × 10⁴ elements makes O(n²) ≈ 900 million operations — too slow. Sorting both arrays in O(n log n) and scanning linearly is the right target.',
      wrongFeedback: [
        'With 30,000 greed values and 30,000 cookie sizes, how many comparisons does a naive all-pairs check require?',
        'A nested loop over both arrays is O(n²) ≈ 900 million operations. What cheaper structure lets you match efficiently?',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is "the maximum number of content children," not which children or cookies to assign. What does that imply?',
      options: [
        { label: 'Track which cookie each child receives', isCorrect: false, feedback: 'The output is a count, not an assignment. Recording which cookie went to which child is extra work the problem does not ask for.' },
        { label: 'Count satisfied children greedily', isCorrect: true },
        { label: 'Return the list of satisfied children', isCorrect: false, feedback: 'The output is an integer, not a list. You only need to maximize the total count, not enumerate the children.' },
        { label: 'Minimize leftover cookies', isCorrect: false, feedback: 'The goal is to maximize satisfied children, not to minimize waste. Leftover cookies are irrelevant to the output.' },
      ],
      correctFeedback: 'A count output means you just need to increment whenever a child is satisfied — no need to track identities or construct an assignment.',
      wrongFeedback: [
        'The problem asks for a single integer. What is the simplest way to accumulate that number as you scan through children and cookies?',
        'You are counting matches, not recording them. Which greedy pairing strategy maximizes that count?',
      ],
    },
    {
      id: 'greedy-pairing',
      question: '"Each child gets at most one cookie" and cookies have fixed sizes. What pairing strategy maximizes the number of satisfied children?',
      options: [
        { label: 'Give each child the largest cookie available', isCorrect: false, feedback: 'Wasting a large cookie on a low-greed child leaves fewer cookies for high-greed children. Giving the smallest sufficient cookie preserves larger cookies for pickier children.' },
        { label: 'Give the smallest sufficient cookie to the least greedy child', isCorrect: true },
        { label: 'Pair children and cookies randomly, then count', isCorrect: false, feedback: 'Random pairing does not guarantee any maximum. You need a strategy that conserves resources for the children who need them most.' },
        { label: 'Satisfy the greediest children first', isCorrect: false, feedback: 'Starting with the greediest children burns large cookies early and may leave small cookies unused for easy-to-satisfy children. Matching the least greedy first conserves big cookies.' },
      ],
      correctFeedback: 'Sorting both arrays and matching the smallest sufficient cookie to the least greedy unsatisfied child is locally optimal at every step — that greedy choice is globally optimal here.',
      wrongFeedback: [
        'If you have a child with greed 1 and a cookie of size 10, is it wise to use that cookie? What would you save it for?',
        'Sort both arrays. Starting from the least greedy child and smallest cookie, ask: does this cookie satisfy this child? If yes, move both pointers. If no, only advance the cookie pointer.',
      ],
    },
  ],
}
