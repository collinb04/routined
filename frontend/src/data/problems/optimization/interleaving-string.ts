export default {
  id: 'interleaving-string',
  title: 'Interleaving String',
  difficulty: 'medium',
  description: 'Given strings <code>s1</code>, <code>s2</code>, and <code>s3</code>, return <code>true</code> if <code>s3</code> can be formed by interleaving <code>s1</code> and <code>s2</code> (preserving relative orders of s1 and s2).',
  examples: [
    { input: 's1="aabcc", s2="dbbca", s3="aadbbcbcac"', output: 'true' },
    { input: 's1="aabcc", s2="dbbca", s3="aadbbbaccc"', output: 'false' },
  ],
  constraints: ['0 ≤ s1.length, s2.length ≤ 100', 's3.length == s1.length + s2.length'],
  starterCode: `def is_interleave(s1, s2, s3):
  pass`,
  functionName: 'is_interleave',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Valid interleave', args: ['aabcc','dbbca','aadbbcbcac'], expected: true },
    { label: 'Invalid interleave', args: ['aabcc','dbbca','aadbbbaccc'], expected: false },
    { label: 'Empty strings', args: ['','',''], expected: true },
  ],
  bruteHint: 'Describe the naive recursion that branches on taking the next character from s1 or s2 at every step, and why the same (i, j) position gets revisited many times',
  optimizeHint: 'Name the 2D state (index into s1, index into s2) you\'d memoize to avoid recomputing overlapping subproblems',
  clues: [
    {
      id: 'length-constraint',
      question: 's3.length == s1.length + s2.length. What does this guarantee?',
      options: [
        { label: 'You can immediately return false if this fails', isCorrect: true },
        { label: 's3 always contains s1 as a substring', isCorrect: false, feedback: 'Interleaving preserves relative order of characters, not contiguous runs. s1 does not need to appear as a substring in s3.' },
        { label: 'You must compare s3 to all permutations of s1+s2', isCorrect: false, feedback: 'Interleaving only preserves the original order of each string — it isn\'t the same as all permutations. There are far fewer valid interleavings than all permutations.' },
        { label: 's3 contains exactly the characters of s1 concatenated with s2', isCorrect: false, feedback: 'The lengths match, but the characters in s3 come from both s1 and s2 interleaved — not s1 followed by s2.' },
      ],
      correctFeedback: 'If s3.length ≠ s1.length + s2.length you can immediately return false — no interleaving is possible. This check is a free early-exit before any DP work.',
      wrongFeedback: [
        'If the lengths don\'t add up, is any interleaving of s1 and s2 possible? What does that let you do early?',
        'An interleaving of s1 and s2 must use every character from both. If s3 is the wrong length, you know the answer instantly.',
      ],
    },
    {
      id: 'two-string-state',
      question: 'You\'re consuming characters from s1 and s2 simultaneously. What state captures where you are in the matching process?',
      options: [
        { label: 'Current index in s3 only', isCorrect: false, feedback: 'Knowing where you are in s3 doesn\'t tell you which characters came from s1 vs. s2. You need to track progress in both source strings independently.' },
        { label: 'Index i into s1 and index j into s2', isCorrect: true },
        { label: 'A bitmask of which s3 characters are matched', isCorrect: false, feedback: 'A bitmask over s3 of length up to 200 would have 2²⁰⁰ states — completely infeasible. The DP state needs to be polynomial.' },
        { label: 'The remaining unmatched portion of s3', isCorrect: false, feedback: 'Storing remaining s3 substrings creates too many distinct states and doesn\'t directly encode progress in s1 and s2 separately.' },
      ],
      correctFeedback: 'State (i, j) means you\'ve consumed i characters from s1 and j characters from s2, matching s3[0..i+j-1]. With both lengths ≤ 100, that\'s at most 101 × 101 = 10,201 states.',
      wrongFeedback: [
        'At each step you take the next character from either s1 or s2. What two numbers tell you exactly where you stand in both?',
        'You need to know how far into s1 and how far into s2 you\'ve consumed. Those two indices together uniquely define your position in s3.',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 's1.length, s2.length ≤ 100 tells you…',
      options: [
        { label: 'A recursive approach without memoization is fine', isCorrect: false, feedback: 'Without memoization, the recursion branches at each character and revisits the same (i, j) states many times. At lengths up to 100 that\'s up to 2¹⁰⁰ paths — completely infeasible.' },
        { label: 'O(m × n) DP with a 101 × 101 table is sufficient', isCorrect: true },
        { label: 'You need O(m + n) linear time', isCorrect: false, feedback: 'The state space is inherently 2D — you must track progress in both strings. O(m + n) linear time isn\'t achievable without losing information about one of the strings.' },
        { label: 'Input size is small enough to try all interleavings', isCorrect: false, feedback: 'The number of valid interleavings is C(m+n, m) — for m=n=100 that\'s C(200,100), astronomically large. Enumeration is not viable.' },
      ],
      correctFeedback: 'With m, n ≤ 100, a 101×101 DP table has just 10,201 cells. Each cell is computed in O(1), giving O(m×n) total — efficient and straightforward.',
      wrongFeedback: [
        'How many distinct (i, j) states are there when s1 and s2 are both up to length 100? Is that a manageable number?',
        'There are at most 101 × 101 = 10,201 states. Computing each once with memoization or bottom-up DP makes the solution linear in the state space.',
      ],
    },
    {
      id: 'order-preservation',
      question: 'The interleaving must preserve the relative orders of both s1 and s2. What does this tell you about the DP transition?',
      options: [
        { label: 'You can pick any character from s1 or s2 in any order', isCorrect: false, feedback: 'You must take the next character in sequence from whichever string you choose. Skipping or reordering characters within s1 or s2 is not allowed.' },
        { label: 'At each (i, j), the next character comes from s1[i] or s2[j] — not earlier', isCorrect: true },
        { label: 'You need to sort s1 and s2 before comparing to s3', isCorrect: false, feedback: 'Sorting s1 or s2 would destroy their relative order, which is exactly what the interleaving constraint preserves.' },
        { label: 'Only characters at the same index in s1 and s2 can interleave', isCorrect: false, feedback: 'Interleaving merges the two strings at any point — index alignment between s1 and s2 is not required.' },
      ],
      correctFeedback: 'Order preservation means the only choice at state (i, j) is: does s3[i+j] match s1[i] (advance i) or s2[j] (advance j)? You never look back into s1 or s2.',
      wrongFeedback: [
        'If you\'ve consumed i characters from s1 and j from s2, which character in s1 and which in s2 are available next?',
        'Relative order means you always consume s1 left-to-right and s2 left-to-right. At (i, j), only s1[i] and s2[j] are candidates for matching s3[i+j].',
      ],
    },
  ],
}
