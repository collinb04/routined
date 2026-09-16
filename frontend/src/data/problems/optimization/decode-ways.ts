export default {
  id: 'decode-ways',
  title: 'Decode Ways',
  difficulty: 'medium',
  description: `<p>A message containing letters from A–Z can be encoded into numbers using the mapping <code>A=1, B=2, ..., Z=26</code>. Given a string <code>s</code> containing only digits, return the number of ways to decode it. If the entire string cannot be decoded in any valid way, return 0.</p>`,
  examples: [
    { input: 's = "12"', output: '2 ("AB" or "L")' },
    { input: 's = "226"', output: '3 ("BZ","VF","BBF")' },
    { input: 's = "06"', output: '0' },
  ],
  constraints: ['1 <= s.length <= 100', 's contains only digits and may contain leading zeros'],
  starterCode: `class Solution:
    def num_decodings(self, s):
        pass`,
  runnerSetup: 'num_decodings = Solution().num_decodings',
  functionName: 'num_decodings',
  conceptId: 'dp-1d',
  testCases: [
    { label: '"12"', args: ['12'], expected: 2 },
    { label: '"226"', args: ['226'], expected: 3 },
    { label: '"06"', args: ['06'], expected: 0 },
  ],
  bruteHint: 'The brute-force approach recursively branches at each position, trying a one-digit decode and, when valid, a two-digit decode, exploring every combination of splits. Since each position can fork into two recursive calls, the recursion tree grows to O(2^n) calls in the worst case, even though most of those calls re-derive the same suffix decode count from scratch. If the same starting index gets revisited across many different branches, what does that overlap tell you about how much of this work is redundant?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraint bounds tell you exactly which time complexities are actually required, so you do not waste effort optimizing past what is needed or undershoot into something too slow. s.length ≤ 100 tells you…',
      highlight: { location: 'constraint', text: '1 <= s.length <= 100' },
      options: [
        { label: 'O(2^n) is fine — n is small',    isCorrect: false, feedback: 'At n = 100, O(2^100) is astronomical. Small n in DP problems permits polynomial slowness, not exponential — naive recursion without memoization will time out.' },
        { label: 'Any polynomial approach works',   isCorrect: true },
        { label: 'O(n log n) is required',          isCorrect: false, feedback: 'O(n log n) would work, but the constraint doesn\'t demand it. At n = 100, even O(n²) is only 10,000 operations — there\'s no pressure to go below linear.' },
        { label: 'Input size is irrelevant',        isCorrect: false, feedback: 'Input size matters even for small n. O(2^100) fails here — you need to spot the overlapping subproblems and memoize.' },
      ],
      correctFeedback: 'At n = 100, O(n) is 100 operations and O(n²) is 10,000. Any polynomial approach is trivially fast — the challenge is structuring the recurrence, not performance.',
      wrongFeedback: [
        'At n = 100, how does O(2^100) compare to O(100)? What does that tell you about naive recursion?',
        'O(2^100) is infeasible. O(n) or O(n²) is fine. The constraint says polynomial, not exponential.',
      ],
    },
    {
      id: 'zero-handling',
      question: 'Constraints that call out an unusual input case explicitly are a signal that the naive solution breaks exactly there, so they are worth checking before you code. "s may contain leading zeros" is explicitly stated. What does this signal about edge cases?',
      highlight: { location: 'constraint', text: 's contains only digits and may contain leading zeros' },
      options: [
        { label: 'Strip leading zeros before decoding',    isCorrect: false, feedback: 'Stripping zeros would change the string\'s meaning. "06" is not decodable at all — "0" has no valid single-digit mapping (A=1, not A=0). You must handle zeros in-place.' },
        { label: 'A \'0\' digit can never be decoded alone', isCorrect: true },
        { label: 'Zeros always double the number of ways',  isCorrect: false, feedback: 'A standalone zero actually kills all ways through that position — no letter maps to 0. Only a two-digit number like "10" or "20" uses a zero validly.' },
        { label: 'Zeros are ignored in the count',          isCorrect: false, feedback: '"06" returns 0, not 1. A zero that can\'t be paired with a valid preceding digit terminates all decoding paths through it.' },
      ],
      correctFeedback: 'No letter maps to 0. A standalone "0" is invalid. "10" maps to J (10) and "20" to T (20), but "30", "40", etc. are also invalid as two-digit codes. Your DP must check both single and two-digit validity at each position.',
      wrongFeedback: [
        'What letter does 0 map to? What does that mean when you try to decode a "0" by itself?',
        'Letters map from 1 to 26. A bare "0" has no match — it terminates every decoding path that reaches it.',
      ],
    },
    {
      id: 'two-choices-at-each-step',
      question: 'How the problem lets you consume input at each step determines exactly which prior states your recurrence needs to reach back to, so this framing is worth translating into DP terms early. At each position, you can decode one digit or two digits. What does this imply about subproblem structure?',
      highlight: { location: 'description', text: 'A=1, B=2, ..., Z=26' },
      options: [
        { label: 'dp[i] depends only on dp[i-1]',                isCorrect: false, feedback: 'If you take a two-digit step, you skip back two positions, not one. dp[i] can depend on both dp[i-1] (one-digit decode) and dp[i-2] (two-digit decode).' },
        { label: 'dp[i] can depend on dp[i-1] and dp[i-2]',     isCorrect: true },
        { label: 'You need to try all possible split points',    isCorrect: false, feedback: 'Only one- and two-digit groupings are valid (codes range from 1 to 26). You never need to look back more than 2 positions.' },
        { label: 'Process the string right to left',             isCorrect: false, feedback: 'The direction doesn\'t change the recurrence. Whether you go left-to-right or right-to-left, each position looks at a window of size 1 or 2.' },
      ],
      correctFeedback: 'dp[i] = ways to decode s[0..i]. One-digit decode: if s[i] != "0", add dp[i-1]. Two-digit decode: if s[i-1..i] is between "10" and "26", add dp[i-2]. Both can contribute simultaneously.',
      wrongFeedback: [
        'For "12", position 1 can be decoded as "1"+"2" or as "12". Which previous dp value does each choice reach back to?',
        'One-digit: use s[i] alone, look back to dp[i-1]. Two-digit: use s[i-1..i], look back to dp[i-2]. Both may apply at the same position.',
      ],
    },
    {
      id: 'valid-two-digit-range',
      question: 'Precise numeric bounds baked into the problem tell you exactly which transitions are legal, and getting them exactly right is what separates a correct recurrence from an off-by-one bug. Two-digit codes are valid only from 10 to 26. What does this bound rule out?',
      highlight: { location: 'description', text: 'Z=26' },
      options: [
        { label: 'Any two-digit number is a valid code',         isCorrect: false, feedback: '"27" through "99" have no letter mapping — only 1–26 are valid. And "01", "02" etc. are invalid because no letter maps to a code with a leading zero.' },
        { label: 'Codes starting with 0, or above 26, are invalid', isCorrect: true },
        { label: 'Only "10" through "19" are valid two-digit codes', isCorrect: false, feedback: '"20" through "26" are also valid — T through Z. The range is 10–26, not just 10–19.' },
        { label: 'Two-digit codes are always valid if the first digit is 1', isCorrect: false, feedback: '"10" through "19" are all valid. But "1" alone can also be decoded as A — the first digit being 1 doesn\'t force a two-digit grouping.' },
      ],
      correctFeedback: 'Valid two-digit codes: 10–26. Below 10 means a leading zero (invalid); above 26 means no letter mapping. This check gates whether dp[i-2] contributes to dp[i].',
      wrongFeedback: [
        'What\'s the largest letter? Z = 26. What does that mean for two-digit codes above 26?',
        'Range is 10–26. "09" starts with 0 (invalid). "27" and above have no matching letter. Only 10–26 unlock the two-digit path.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def num_decodings(self, s):
        n = len(s)
        if n == 0 or s[0] == '0':
            return 0
        dp_prev2 = 1
        dp_prev1 = 1
        for i in range(1, n):
            curr = 0
            if s[i] != '0':
                curr += dp_prev1
            two_digit = int(s[i - 1:i + 1])
            if 10 <= two_digit <= 26:
                curr += dp_prev2
            dp_prev2 = dp_prev1
            dp_prev1 = curr
        return dp_prev1`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'A leading <code>\'0\'</code> anywhere the one-digit path is tried is simply skipped (<code>curr</code> gets no contribution from <code>dp_prev1</code>) rather than crashing or defaulting to some fallback value — a standalone zero has no letter mapping, so that path correctly contributes zero ways, not an error.',
  solutionExplanation: 'At each position, the count of ways to decode the prefix ending there is the sum of two independent contributions: treating the current character as its own one-digit code (carrying forward <code>dp_prev1</code>, valid whenever it isn\'t <code>\'0\'</code>) and treating the current and previous characters together as a two-digit code (carrying forward <code>dp_prev2</code>, valid only when that two-digit value falls between 10 and 26). Both contributions can apply at the same position, which is exactly why a string like "226" has more than one decoding — the DP just needs the two most recent counts, never the full history, so it collapses to O(1) space.',
}
