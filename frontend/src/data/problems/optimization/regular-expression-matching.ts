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
  starterCode: `class Solution:
    def is_match(self, s, p):
        pass`,
  runnerSetup: 'is_match = Solution().is_match',
  functionName: 'is_match',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'No match', args: ['aa','a'], expected: false },
    { label: 'Star repeats', args: ['aa','a*'], expected: true },
    { label: 'Dot star', args: ['ab','.*'], expected: true },
    { label: 'Complex', args: ['aab','c*a*b'], expected: true },
  ],
  bruteHint: 'The brute-force approach recursively tries every possible interpretation of each "*" in the pattern — either skipping the preceding element or consuming another matching character — branching at every position pair (i, j) in s and p. Because each "*" can independently choose to expand or stop, the number of recursive paths grows exponentially, roughly O(2^(m+n)) in the worst case. Many of those branches end up re-deriving the same (i, j) position pair through entirely different call sequences. If the same (i, j) pair is being solved again and again, what technique would let you solve it exactly once and reuse the result?',
  optimizeComplexity: { time: 'O(m·n)', space: 'O(m·n)' },
  clues: [
    {
      id: 'two-string-state',
      question: 'When two independent sequences must be traversed together, the DP state has to capture progress in each one separately. You\'re matching string s against pattern p character by character. What state tracks the matching progress?',
      highlight: { location: 'constraint', text: 's contains only lowercase letters; p contains lowercase letters, \'.\', \'*\'' },
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
      question: 'Certain pattern characters change how many ways a match can proceed, and identifying that difference tells you where your DP transition needs extra cases. "*" matches zero or more of the preceding element. What makes "*" harder than "."?',
      highlight: { location: 'description', text: '<code>*</code> (matches zero or more of the preceding element)' },
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
      question: 'Whether a problem asks for a full match or just any match changes what your base or terminal state must check. "The match must cover the entire input string." What does this change?',
      highlight: { location: 'description', text: 'The match must cover the entire input string.' },
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
  solutionCode: `class Solution:
    def is_match(self, s, p):
        m, n = len(s), len(p)
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True
        for j in range(1, n + 1):
            if p[j - 1] == '*':
                dp[0][j] = dp[0][j - 2]

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if p[j - 1] == '*':
                    dp[i][j] = dp[i][j - 2]
                    if p[j - 2] == '.' or p[j - 2] == s[i - 1]:
                        dp[i][j] = dp[i][j] or dp[i - 1][j]
                else:
                    if p[j - 1] == '.' or p[j - 1] == s[i - 1]:
                        dp[i][j] = dp[i - 1][j - 1]
        return dp[m][n]`,
  solutionComplexity: { time: 'O(m · n)', space: 'O(m · n)' },
  solutionCaveat: 'When <code>p[j-1]</code> is <code>\'*\'</code>, <code>dp[i][j]</code> is true if <code>either</code> the "use zero occurrences" branch (<code>dp[i][j-2]</code>) or the "match one more occurrence" branch (<code>dp[i-1][j]</code>, only when the preceding pattern character actually matches <code>s[i-1]</code>) succeeds — both must be checked since a star can validly resolve either way depending on the rest of the string.',
  solutionExplanation: 'A <code>\'*\'</code> in the pattern is the one case where a single pattern position corresponds to a genuine choice rather than a single comparison, so <code>dp[i][j]</code> branches: either the starred element is skipped entirely (falling back to <code>dp[i][j-2]</code>, as if it was never in the pattern) or one more occurrence of the preceding element is consumed from <code>s</code> (falling back to <code>dp[i-1][j]</code>, staying at the same pattern position since <code>*</code> can repeat). Every other pattern character is a direct one-to-one comparison against <code>s[i-1]</code>, advancing both indices together, and the row/column of empty-prefix base cases handles patterns like <code>"a*"</code> matching the empty string.',
}
