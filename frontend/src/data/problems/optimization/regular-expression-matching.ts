export default {
  id: 'regular-expression-matching',
  title: 'Regular Expression Matching',
  difficulty: 'hard',
  description: 'Implement regular expression matching with support for <code>.</code> (matches any single character) and <code>*</code> (matches zero or more of the preceding element). The match must cover the entire input string.',
  examples: [
    { input: 's="aa", p="a"', output: 'false', explanation: '"a" does not match "aa".' },
    { input: 's="aa", p="a*"', output: 'true', explanation: '"a*" means zero or more "a"s.' },
    { input: 's="ab", p=".*"', output: 'true', explanation: '".*" matches any string.' },
  ],
  constraints: ['1 ≤ s.length ≤ 20', '1 ≤ p.length ≤ 30', 's contains only lowercase letters; p contains lowercase letters, \'.\', \'*\''],
  starterCode: `def is_match(s, p):
  pass`,
  functionName: 'is_match',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'No match', args: ['aa','a'], expected: false },
    { label: 'Star repeats', args: ['aa','a*'], expected: true },
    { label: 'Dot star', args: ['ab','.*'], expected: true },
    { label: 'Complex', args: ['aab','c*a*b'], expected: true },
  ],
  bruteHint: 'Describe the naive recursion that branches on every possible interpretation of each "*" in the pattern, and why the same (i, j) position pairs get re-explored',
  optimizeHint: 'Name the 2D DP state that caches whether s[:i] matches p[:j], avoiding re-solving the same prefix pair',
  clues: [
    {
      id: 'two-string-state',
      question: 'You\'re matching string s against pattern p character by character. What state tracks the matching progress?',
      options: [
        { label: 'A single index into s', isCorrect: false, feedback: 'A single index into s doesn\'t tell you where you are in the pattern. You need to track progress in both s and p independently.' },
        { label: 'Index i into s and index j into p', isCorrect: true },
        { label: 'The remaining unmatched portion of s', isCorrect: false, feedback: 'Storing remaining s substrings creates O(n) distinct string objects per position — much more expensive than two integers. Indices (i, j) encode the same information compactly.' },
        { label: 'A stack of characters from p', isCorrect: false, feedback: 'A stack handles nested structures like balanced brackets, but regex patterns aren\'t nested — the matching is linear in both s and p.' },
      ],
      correctFeedback: 'dp[i][j] = True if s[:i] matches p[:j]. With s.length ≤ 20 and p.length ≤ 30, that\'s at most 21 × 31 = 651 states.',
      wrongFeedback: [
        'At each step, which character from s and which from p are you comparing? What two numbers locate your position in both?',
        'You need to know how much of s has been consumed and how much of p has been consumed. Those are exactly two indices — (i, j).',
      ],
    },
    {
      id: 'star-semantics',
      question: '"*" matches zero or more of the preceding element. What makes "*" harder than "."?',
      options: [
        { label: '"*" can match any character, "." cannot', isCorrect: false, feedback: 'That\'s backwards. "." matches any single character; "*" modifies the preceding element to match zero or more of it. They serve completely different roles.' },
        { label: '"*" can consume zero characters, allowing the pattern to skip ahead', isCorrect: true },
        { label: '"*" always consumes at least one character', isCorrect: false, feedback: '"a*" matches the empty string — zero occurrences. That\'s the key difficulty: you have to consider the case where "*" matches nothing at all.' },
        { label: '"*" only appears at the end of the pattern', isCorrect: false, feedback: '"c*a*b" in the last test case shows "*" appearing mid-pattern. "c*" matches zero c\'s, "a*" matches zero or more a\'s, and "b" matches literally — valid for "aab".' },
      ],
      correctFeedback: 'When p[j] == \'*\', you have two choices: skip the preceding element (zero occurrences) by jumping over both p[j-1] and p[j], or match one more of p[j-1] and stay at j. Both must be considered.',
      wrongFeedback: [
        '"a*" can match "", "a", "aa", "aaa"... What two cases must your DP handle when it sees a \'*\'?',
        'Case 1: use zero occurrences — skip p[j-1] and p[j] entirely. Case 2: if s[i] matches p[j-1] or p[j-1]==\'.\', consume s[i] and stay at j (another occurrence possible).',
      ],
    },
    {
      id: 'full-match-requirement',
      question: '"The match must cover the entire input string." What does this change?',
      options: [
        { label: 'Return true as soon as any prefix of s matches p', isCorrect: false, feedback: 'A prefix match isn\'t sufficient. For s="aa", p="a", matching only the first "a" would return true — but the correct answer is false because the second "a" is unmatched.' },
        { label: 'The answer is dp[len(s)][len(p)]', isCorrect: true },
        { label: 'You must also match the pattern from right to left', isCorrect: false, feedback: 'Right-to-left matching isn\'t needed. The "full match" requirement is captured by checking that both i and j reach their end simultaneously — dp[m][n].' },
        { label: 'Stop as soon as a character in s doesn\'t match p', isCorrect: false, feedback: 'A mismatch at one position doesn\'t end the match — the pattern might still match via a "*" that skips the current element. You can\'t terminate early on a single mismatch.' },
      ],
      correctFeedback: 'Full match means both s and p must be entirely consumed. The answer is dp[m][n] where m = len(s) and n = len(p).',
      wrongFeedback: [
        'What does dp[i][j] = True mean? For the whole string to match, what must i and j be at the end?',
        'dp[m][n] asks: does s[:m] (all of s) match p[:n] (all of p)? That\'s the final answer — both strings fully consumed.',
      ],
    },
  ],
}
