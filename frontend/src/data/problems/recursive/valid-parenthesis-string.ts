export default {
  id: 'valid-parenthesis-string',
  title: 'Valid Parenthesis String',
  difficulty: 'medium',
  description: 'Given a string <code>s</code> containing only <code>(</code>, <code>)</code>, and <code>*</code> (which can be treated as <code>(</code>, <code>)</code>, or empty string), return <code>true</code> if <code>s</code> is valid.',
  examples: [
    { input: 's = "()"', output: 'true' },
    { input: 's = "(*)"', output: 'true' },
    { input: 's = "(*))"', output: 'true' },
  ],
  constraints: ['1 ≤ s.length ≤ 100', 's[i] is \'(\', \')\', or \'*\''],
  starterCode: `def check_valid_string(s):
  pass`,
  functionName: 'check_valid_string',
  conceptId: 'greedy',
  testCases: [
    { label: 'Simple valid', args: ['()'], expected: true },
    { label: 'Star fills', args: ['(*)'], expected: true },
    { label: 'Star as close', args: ['(*))'], expected: true },
    { label: 'Invalid', args: ['((('], expected: false },
  ],
  bruteHint: 'Describe recursively trying all three interpretations of each star character and checking validity, and name the exponential time complexity this produces',
  optimizeHint: 'Name the greedy technique that tracks a range of possible open-parenthesis counts as you scan, rather than branching on every star',
  clues: [
    {
      id: 'star-ambiguity',
      question: '"*" can be treated as "(", ")", or empty string. What does this ambiguity signal about a naive recursive approach?',
      options: [
        { label: 'Try all three interpretations of each * via backtracking', isCorrect: false, feedback: 'With up to 100 characters, a string of all *s has 3^100 interpretations — backtracking without memoization would time out. The ambiguity is a signal to track a range of possible states, not enumerate them.' },
        { label: 'Track the range of possible open-paren counts', isCorrect: true },
        { label: 'Replace all * with "(" and validate', isCorrect: false, feedback: 'Replacing all * with "(" checks only one of 3^n interpretations. The string could be valid with a different assignment — you need to consider all possibilities efficiently.' },
        { label: 'Count * characters and compare to unmatched parens', isCorrect: false, feedback: 'A raw count of * ignores their position. A * after all closing parens is useless for balancing opens that came before it — position and order matter.' },
      ],
      correctFeedback: 'Each * can expand to any of three characters. Rather than trying all 3^100 combinations, track the minimum and maximum possible count of unmatched "(" at each position — a range that represents all valid interpretations at once.',
      wrongFeedback: [
        'With up to 100 * characters, enumeration explodes. Instead of asking "which interpretation is correct?", ask: "what range of open-paren counts is still possible?"',
        'At each *, the open count could go up (treat as "("), stay the same (treat as empty), or go down (treat as ")"). Track the full range of possibilities rather than committing to one.',
      ],
    },
    {
      id: 'constraint-length',
      question: 's.length ≤ 100. What does this size allow in terms of approach?',
      options: [
        { label: 'O(n³) is acceptable — 100³ = 1,000,000', isCorrect: false, feedback: 'A 2D DP over (index, open_count) is O(n²) = 10,000 states — already fast enough. O(n³) would also fit, but the problem\'s structure does not require it.' },
        { label: 'O(n²) DP over position and open count is feasible', isCorrect: true },
        { label: 'Only O(n) solutions are viable', isCorrect: false, feedback: 'O(n) greedy is ideal here, but O(n²) DP also works within n = 100. The constraint does not rule out quadratic approaches.' },
        { label: 'Input size is irrelevant for this problem', isCorrect: false, feedback: 'Input size always informs approach. n ≤ 100 is small enough to allow O(n²) DP — tracking open-count as a state variable alongside position.' },
      ],
      correctFeedback: 'With n ≤ 100, an O(n²) DP table of size 100 × 100 = 10,000 entries is trivially small. This opens the door to tracking (index, open_count) as a DP state.',
      wrongFeedback: [
        'How large is an n × n table when n = 100? Is that manageable?',
        'At each of the 100 positions, the open-paren count can range from 0 to 100. How many (position, open_count) states is that total?',
      ],
    },
    {
      id: 'greedy-range-tracking',
      question: 'Processing left to right, you maintain a range [lo, hi] for possible open-paren counts. When does the string become definitely invalid?',
      options: [
        { label: 'When lo > 0 at the end', isCorrect: false, feedback: 'lo > 0 at the end means the minimum possible open count is positive — there are unmatched opens even in the best case. That is actually the invalidity check, but the string also becomes invalid mid-scan when hi drops below 0.' },
        { label: 'When hi < 0 at any point during the scan', isCorrect: true },
        { label: 'When lo == hi at any point', isCorrect: false, feedback: 'lo == hi simply means all interpretations converge to the same open count — that is not a problem. The string is invalid when no interpretation can balance the parens.' },
        { label: 'When you encounter two consecutive *', isCorrect: false, feedback: 'Two consecutive * just widens the range of possibilities. The string does not become invalid until even the most favorable interpretation cannot keep open count non-negative.' },
      ],
      correctFeedback: 'hi tracks the maximum possible open count. If hi < 0, even the most generous interpretation (treating every * as "(") cannot prevent a closing paren from going unmatched — the string is definitely invalid from this point on.',
      wrongFeedback: [
        'hi represents the best-case open count — every * treated as "(". If hi goes negative, what does that mean for every possible interpretation?',
        'If even the maximum possible open count drops below 0, can any assignment of * values keep the string valid?',
      ],
    },
    {
      id: 'end-condition',
      question: 'After scanning all characters, what condition confirms the string is valid?',
      options: [
        { label: 'lo == 0', isCorrect: true },
        { label: 'hi == 0', isCorrect: false, feedback: 'hi == 0 means the maximum possible open count is zero, but the minimum (lo) could still be positive — meaning some interpretations leave unmatched opens. You need to confirm 0 is reachable, not that it is the maximum.' },
        { label: 'lo <= 0', isCorrect: false, feedback: 'lo is always kept non-negative by clamping (lo = max(lo, 0)). lo ≤ 0 is always true at the end. The meaningful condition is whether 0 is still within the achievable range — i.e., lo == 0.' },
        { label: 'lo + hi == 0', isCorrect: false, feedback: 'lo + hi == 0 would require both to be 0, which is a stricter condition than needed. Validity only requires that 0 is achievable — lo == 0 is sufficient.' },
      ],
      correctFeedback: 'At the end, lo holds the minimum number of unmatched "(" across all valid * interpretations. lo == 0 means at least one interpretation perfectly balances all parens.',
      wrongFeedback: [
        'lo is the minimum unmatched open-paren count over all interpretations. What value of lo confirms that a balanced interpretation exists?',
        'You need at least one interpretation where no opens go unmatched. The minimum possible unmatched count is lo — what value confirms success?',
      ],
    },
  ],
}
