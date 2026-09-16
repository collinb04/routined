export default {
  id: 'is-subsequence',
  title: 'Is Subsequence',
  difficulty: 'easy',
  description: 'Given strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>s</code> is a subsequence of <code>t</code>. A subsequence maintains relative order but not necessarily contiguous positions.',
  examples: [
    { input: 's = "abc", t = "ahbgdc"', output: 'true', explanation: 'a-h-b-g-d-c contains a, b, c in order.' },
    { input: 's = "axc", t = "ahbgdc"', output: 'false' },
  ],
  constraints: ['0 ≤ s.length ≤ 100', '0 ≤ t.length ≤ 10⁴', 's and t consist of lowercase English letters'],
  starterCode: `class Solution:
    def is_subsequence(self, s, t):
        pass`,
  runnerSetup: 'is_subsequence = Solution().is_subsequence',
  functionName: 'is_subsequence',
  conceptId: 'strings',
  testCases: [
    { label: 'Is subsequence', args: ['abc','ahbgdc'], expected: true },
    { label: 'Not subsequence', args: ['axc','ahbgdc'], expected: false },
    { label: 'Empty s', args: ['','ahbgdc'], expected: true },
    { label: 'Empty t', args: ['a',''], expected: false },
  ],
  bruteHint: 'A brute-force approach could recursively try keeping or skipping each character of t, generating every possible subsequence of t and checking whether it equals s — that\'s up to 2^|t| candidate subsequences to generate and compare. With t up to 10,000 characters, that search space is nowhere near tractable. Is there a way to check whether s appears in order inside t without ever generating a candidate subsequence at all?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'subsequence-vs-substring',
      question: 'Key vocabulary in a problem statement often encodes the exact rule you need to implement, not just flavor text. "A subsequence maintains relative order but not necessarily contiguous positions." What does this mean for how you scan <code>t</code>?',
      options: [
        { label: 'Find s as a contiguous block in t', isCorrect: false, feedback: 'Contiguous matching is substring search — a different problem. A subsequence can skip characters in t, so you only need to find each character of s in order, not adjacent.' },
        { label: 'Match characters of s in order, skipping freely in t', isCorrect: true },
        { label: 'Check that every char of s appears in t', isCorrect: false, feedback: 'Membership alone ignores order. "ba" would match t = "ab" by membership, but "ba" is not a subsequence of "ab" because the order is wrong.' },
        { label: 'Match s to any permutation of t', isCorrect: false, feedback: 'Permutations discard order entirely. A subsequence must respect the left-to-right order of both s and t — you can skip characters in t, but you cannot reorder them.' },
      ],
      correctFeedback: 'Walk through t with one pointer; advance the s pointer only when you find a match. If the s pointer reaches the end, s is a subsequence.',
      wrongFeedback: [
        'Can the characters of s be spread out across t, or must they sit next to each other?',
        'You need each character of s to appear in t in the same left-to-right order. What two-pointer approach does that suggest?',
      ],
      highlight: { location: 'description', text: 'A subsequence maintains relative order but not necessarily contiguous positions.' },
    },
    {
      id: 'empty-string-edge-cases',
      question: 'Constraints that permit zero-length input are flagging an edge case you must handle explicitly, before you write any core logic. "0 ≤ s.length ≤ 100" and "0 ≤ t.length ≤ 10⁴" — both can be empty. Which empty-string case must return true?',
      options: [
        { label: 'Empty t (t = "")', isCorrect: false, feedback: 'If t is empty and s is non-empty, there are no characters to match — the answer is false. An empty t only returns true when s is also empty.' },
        { label: 'Empty s (s = "")', isCorrect: true },
        { label: 'Both empty', isCorrect: false, feedback: 'Both empty is a subset of the correct answer, not the full answer. Any empty s — regardless of t — is a valid subsequence of t, because zero characters need to be matched.' },
        { label: 'Neither — empty strings are invalid input', isCorrect: false, feedback: 'The constraint "0 ≤ s.length" explicitly permits empty strings. An empty string is a valid subsequence of any string — there are zero characters to match, so the condition is trivially satisfied.' },
      ],
      correctFeedback: 'The empty string is a subsequence of every string — zero characters need to match. Your pointer logic handles this naturally: the s pointer starts already at the end.',
      wrongFeedback: [
        'Think about what it means to match zero characters. Is the condition "all characters of s found in order" satisfied when s has no characters?',
        'An empty s means you need to find zero characters in t. Is that always possible, regardless of what t contains?',
      ],
      highlight: { location: 'constraint', text: '0 ≤ s.length ≤ 100' },
    },
    {
      id: 'complexity-from-constraints',
      question: 'Constraint bounds don\'t just tell you what\'s required — they also confirm whether a straightforward approach is already fast enough. s.length ≤ 100 and t.length ≤ 10⁴. What is the complexity of a single linear scan of t?',
      options: [
        { label: 'O(|s| × |t|) — compare every pair', isCorrect: false, feedback: 'O(|s| × |t|) would be 100 × 10,000 = 1 million comparisons — viable, but unnecessary. A single pass through t with a pointer into s solves this in O(|t|) without nested loops.' },
        { label: 'O(|t|) — one pass through t', isCorrect: true },
        { label: 'O(|s| log |t|) — binary search per character', isCorrect: false, feedback: 'Binary search per character requires a sorted structure. t is unsorted and must be scanned in order to preserve sequence constraints — binary search does not apply here.' },
        { label: 'O(|s|²) — recheck s on each mismatch', isCorrect: false, feedback: 'Rechecking s from the start on each mismatch would be incorrect — it would reset progress already made. The s pointer only ever moves forward.' },
      ],
      correctFeedback: 'One pass through t (at most 10,000 characters) with a pointer into s (at most 100 characters). Both pointers move only forward — O(|t|) total.',
      wrongFeedback: [
        'How many characters of t do you need to visit in the worst case? Does any character of t need to be revisited?',
        'Each character of t is examined at most once. What complexity does a single left-to-right scan give?',
      ],
      highlight: { location: 'constraint', text: '0 ≤ t.length ≤ 10⁴' },
    },
  ],
  solutionCode: `class Solution:
    def is_subsequence(self, s, t):
        i = 0
        for ch in t:
            if i < len(s) and s[i] == ch:
                i += 1
        return i == len(s)`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionExplanation: 'A single pointer into <code>s</code> that only ever moves forward is enough: scanning <code>t</code> once and advancing the pointer whenever the current character of <code>t</code> matches the character the pointer is waiting for greedily consumes the earliest possible match for each letter of <code>s</code>, in order — exactly what "subsequence" requires. If the pointer reaches the end of <code>s</code> by the time the scan of <code>t</code> finishes, every character was found in order.',
}
