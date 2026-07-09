export default {
  id: 'distinct-subsequences',
  title: 'Distinct Subsequences',
  difficulty: 'hard',
  description: 'Given strings <code>s</code> and <code>t</code>, return the number of distinct subsequences of <code>s</code> that equal <code>t</code>.',
  examples: [
    { input: 's="rabbbit", t="rabbit"', output: '3', explanation: 'Three ways to choose letters from "rabbbit" to form "rabbit".' },
  ],
  constraints: ['1 ≤ s.length, t.length ≤ 1000', 's and t consist of lowercase English letters'],
  starterCode: `def num_distinct(s, t):
  pass`,
  functionName: 'num_distinct',
  conceptId: 'dp-2d',
  testCases: [
    { label: '"rabbbit"', args: ['rabbbit','rabbit'], expected: 3 },
    { label: '"babgbag"', args: ['babgbag','bag'], expected: 5 },
    { label: 'Exact match', args: ['a','a'], expected: 1 },
  ],
  bruteHint: 'Describe the recursive approach that, at each character of s, branches into matching it against t or skipping it, and explain why the same (s position, t position) pairs get re-explored exponentially.',
  optimizeHint: 'Name the two things the DP state needs to track — your position in s and your position in t — so each pair of prefixes is memoized once.',
  clues: [
    {
      id: 'constraint-complexity',
      question: 's.length, t.length ≤ 1000 tells you…',
      options: [
        { label: 'O(n) is possible — process characters left to right', isCorrect: false, feedback: 'A single pass can\'t track how many ways the prefix of t has been matched at each position in s. Both string lengths independently affect the state.' },
        { label: 'O(s × t) is the natural target',                      isCorrect: true },
        { label: 'O(n³) is fine — n is at most 1000',                   isCorrect: false, feedback: 'At n = 1000, O(n³) is 1 billion operations — too slow. The constraint targets O(s × t) = 1,000,000, not cubic.' },
        { label: 'O(2^s) — enumerate all subsequences of s',            isCorrect: false, feedback: 'At s.length = 1000, O(2^1000) is astronomically large. You don\'t enumerate subsequences — you count them with DP in O(s × t).' },
      ],
      correctFeedback: 'O(s × t) = 1000 × 1000 = 1 million operations. That\'s the cost of a 2D DP table where each cell represents (prefix of s, prefix of t).',
      wrongFeedback: [
        'Two strings with lengths up to 1000 each. What\'s the product of their lengths at maximum?',
        '1000 × 1000 = 1 million. A 2D table indexed by both string positions fits exactly in that budget.',
      ],
    },
    {
      id: 'output-count',
      question: 'The output is a count of distinct subsequences, not the subsequences themselves. What does this tell you?',
      options: [
        { label: 'Store every matching subsequence found',           isCorrect: false, feedback: 'The number of matching subsequences can be exponentially large. "babgbag" already has 5 for "bag". Storing them all wastes memory and time — you only need the count.' },
        { label: 'Accumulate a count, not a collection',             isCorrect: true },
        { label: 'Return 1 if any subsequence matches, else 0',     isCorrect: false, feedback: 'The problem asks for the total count of distinct ways, not just existence. "rabbbit" has 3 distinct ways to form "rabbit" — not just yes/no.' },
        { label: 'Count the positions in s where t starts',         isCorrect: false, feedback: 'Counting starting positions checks prefix matches, not full subsequences. A subsequence can skip characters in s — "bag" in "babgbag" doesn\'t need contiguous characters.' },
      ],
      correctFeedback: 'You accumulate integer counts at each DP cell. dp[i][j] = number of ways to form t[0..j-1] using s[0..i-1]. No subsequences are stored — just the tally.',
      wrongFeedback: [
        'If the answer is a number, what\'s the minimum you need to track at each cell?',
        'A count — one integer per (i, j) pair. You\'re tallying ways, not remembering which characters were chosen.',
      ],
    },
    {
      id: 'two-string-dp',
      question: 'The state depends on how much of s has been consumed and how much of t has been matched. What does this suggest?',
      options: [
        { label: 'A 1D dp array indexed by position in s',           isCorrect: false, feedback: 'A 1D index over s loses track of how far into t you\'ve matched. At the same position in s, you might have matched 0, 1, or 3 characters of t — those are different states.' },
        { label: 'A 2D dp table: dp[i][j] over (s position, t position)', isCorrect: true },
        { label: 'A 1D dp array indexed by position in t',           isCorrect: false, feedback: 'A 1D index over t loses track of where you are in s. The number of ways to form t[0..j] depends on which prefix of s you\'ve scanned so far.' },
        { label: 'A recursive DFS that tries every character in s',  isCorrect: false, feedback: 'Naive DFS without memoization revisits the same (i, j) pairs exponentially. The overlapping subproblems demand a DP table, not exhaustive search.' },
      ],
      correctFeedback: 'dp[i][j] = number of ways to form t[0..j-1] using only s[0..i-1]. Two independent dimensions, one per string. The table is at most 1000 × 1000 = 1 million cells.',
      wrongFeedback: [
        'Your decision at each step depends on where you are in s and where you are in t. How many independent axes does that require?',
        'Two strings means two positions to track. One axis for i (how far in s), one for j (how far in t) — a 2D table.',
      ],
    },
    {
      id: 'recurrence-cases',
      question: 'At each cell dp[i][j], you\'re at s[i] and t[j]. What are the two cases?',
      options: [
        { label: 'Match: dp[i][j] = dp[i-1][j-1]; no match: dp[i][j] = 0',       isCorrect: false, feedback: 'When there\'s no match, you don\'t zero out the cell — you skip s[i] and carry forward dp[i-1][j]. Zeroing would lose all ways found through earlier characters in s.' },
        { label: 'Always skip s[i], and also use it if s[i] == t[j]',             isCorrect: true },
        { label: 'Match: dp[i][j] = dp[i-1][j-1]; no match: dp[i][j] = dp[i-1][j]', isCorrect: false, feedback: 'Close — but on a match, you can both use s[i] (dp[i-1][j-1]) and skip it (dp[i-1][j]). Skipping a matching character is valid and adds more ways.' },
        { label: 'Use s[i] only when it matches t[j], never skip',               isCorrect: false, feedback: 'You can always skip s[i] regardless of whether it matches. Skipping adds flexibility — the same t[j] might be matched by a later character in s, and skipping s[i] keeps that option open.' },
      ],
      correctFeedback: 'Skip s[i]: dp[i][j] += dp[i-1][j] (always valid). Use s[i]: dp[i][j] += dp[i-1][j-1] (only when s[i] == t[j]). On a match, both apply — that\'s what creates multiple distinct subsequences.',
      wrongFeedback: [
        'For "rabbbit" vs "rabbit": when you see the third "b" in s, should you always use it for t\'s "b", or can you skip it and use an earlier one?',
        'You can always skip a character in s. When s[i] == t[j], you can additionally consume it. Both options may apply at the same cell.',
      ],
    },
  ],
}
