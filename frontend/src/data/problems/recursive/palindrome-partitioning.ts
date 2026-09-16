export default {
  id: 'palindrome-partitioning',
  title: 'Palindrome Partitioning',
  difficulty: 'medium',
  description: `<p>Given a string <code>s</code>, partition <code>s</code> such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of <code>s</code>.</p>`,
  examples: [
    { input: 's = "aab"', output: '[["a","a","b"],["aa","b"]]' },
    { input: 's = "a"', output: '[["a"]]' },
  ],
  constraints: ['1 <= s.length <= 16', 's consists only of lowercase English letters'],
  starterCode: `class Solution:
    def partition(self, s):
        pass`,
  functionName: 'partition_run',
  conceptId: 'backtracking',
  runnerSetup: `def partition_run(s):
  result = Solution().partition(s)
  return sorted([sorted(p) for p in result])`,
  testCases: [
    { label: '"aab"', args: ['aab'], expected: [['a','a','b'],['aa','b']] },
    { label: '"a"', args: ['a'], expected: [['a']] },
  ],
  bruteHint: 'The brute-force approach generates every possible way to split the string into substrings, then checks afterward which of those splits consist entirely of palindromes. Since there are 2^(n-1) ways to partition a string of length n, and each split must be checked for validity after the fact, this generate-then-check strategy costs roughly O(n · 2ⁿ) time overall. What would let you avoid building splits that you already know contain a non-palindrome substring?',
  optimizeComplexity: { time: 'O(n · 2ⁿ)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Input-size constraints are usually your strongest clue about the complexity class the intended solution should hit. s.length ≤ 16. What does this small bound tell you about the expected approach?',
      highlight: { location: 'constraint', text: '1 <= s.length <= 16' },
      options: [
        { label: 'Greedy: always take the longest palindrome prefix', isCorrect: false, feedback: 'Greedy commits to one choice per position without reconsidering. Partitioning requires exploring all valid splits — taking the longest prefix at each step misses shorter palindromes that enable better splits later.' },
        { label: 'Exhaustive backtracking over all palindrome splits', isCorrect: true },
        { label: 'O(n²) DP is the only option', isCorrect: false, feedback: 'DP can precompute palindrome checks in O(n²), but the partitioning itself requires exploring all splits — DP alone does not enumerate them. The small n ≤ 16 is the signal that backtracking is intended.' },
        { label: 'Input size is irrelevant since s is short', isCorrect: false, feedback: 'Input size shapes the approach. At n = 16, the number of ways to partition a string is 2^(n-1) = 32,768 — exhaustive backtracking is feasible precisely because n is small.' },
      ],
      correctFeedback: 'At n = 16, there are at most 2^15 = 32,768 ways to split the string. Backtracking — try each palindrome prefix, recurse on the rest — explores all of them efficiently.',
      wrongFeedback: [
        'How many ways can you partition a string of length 16 by choosing where to insert separators?',
        'There are 2^(n-1) = 32,768 possible partitions at n = 16. That is trivially enumerable with backtracking.',
      ],
    },
    {
      id: 'output-structure',
      question: 'How the problem describes its expected output determines whether your solution needs to enumerate every valid result or can stop at the first one. The output is all possible palindrome partitions — a list of lists of strings. What does this require?',
      highlight: { location: 'description', text: 'Return all possible palindrome partitioning of <code>s</code>.' },
      options: [
        { label: 'Return the single partition with the fewest parts', isCorrect: false, feedback: 'The problem asks for all valid partitions, not the optimal one. Any approach that picks one result misses the rest of the output.' },
        { label: 'Collect every valid partition into a result list', isCorrect: true },
        { label: 'Return the count of valid partitions', isCorrect: false, feedback: 'Counting would be a different problem. The output here requires the actual partitions — each one a list of palindrome substrings.' },
        { label: 'Return the lexicographically first partition', isCorrect: false, feedback: 'Returning one partition discards all the others. The output is a list of all valid partitions, not a single representative.' },
      ],
      correctFeedback: 'Every time backtracking reaches the end of the string with a valid partition, append a copy of the current path to results. You must explore all branches to collect them all.',
      wrongFeedback: [
        'How many valid partitions exist for "aab"? The output lists all of them — what does your backtracking need to do when it finds one?',
        'Each time you have partitioned the entire string into palindromes, save a copy of the current partition. Continue backtracking to find the rest.',
      ],
    },
    {
      id: 'palindrome-check-signal',
      question: 'The validity condition embedded in a problem statement tells you exactly where to prune invalid branches before they multiply. Every substring in the partition must be a palindrome. When should you check this — before or after recursing?',
      highlight: { location: 'description', text: 'every substring of the partition is a palindrome' },
      options: [
        { label: 'After recursing, filter non-palindrome results', isCorrect: false, feedback: 'Post-filtering means you recurse into invalid branches and discard them after the fact. Checking before recursing prunes those branches immediately, cutting the search space.' },
        { label: 'Before recursing — only extend with palindrome prefixes', isCorrect: true },
        { label: 'Only at the base case when the string is fully consumed', isCorrect: false, feedback: 'By the time you reach the base case, you have already added substrings to the path. Checking only then means you built invalid paths all the way to the end before realizing they are wrong.' },
        { label: 'Never check — all substrings are palindromes by definition', isCorrect: false, feedback: 'Most substrings are not palindromes. "ab" is not a palindrome; neither is "aab". The check is essential to avoid invalid partitions.' },
      ],
      correctFeedback: 'At each step, try every prefix s[start:end]. Only recurse when s[start:end] is a palindrome. This prunes entire subtrees of invalid splits before exploring them.',
      wrongFeedback: [
        'If s[start:end] is not a palindrome, do you need to explore any partition that includes it as a segment?',
        'Prune early: skip any prefix that is not a palindrome. Only pass valid prefixes forward to the next recursive call.',
      ],
    },
    {
      id: 'palindrome-precomputation',
      question: 'Recognizing when the same subproblem gets solved repeatedly across branches is what points you toward caching or precomputing results. You may check the same substring for palindrome-ness multiple times across different branches. What optimization does this suggest?',
      options: [
        { label: 'Precompute a 2D table of palindrome results', isCorrect: true },
        { label: 'Sort the string before partitioning', isCorrect: false, feedback: 'Sorting changes the string entirely — it is not a valid preprocessing step. Palindrome checks depend on the original character positions.' },
        { label: 'Only check substrings of even length', isCorrect: false, feedback: 'Palindromes can be any length — odd or even. "aba" and "aa" are both palindromes. Restricting to even lengths misses half the valid substrings.' },
        { label: 'No optimization needed since n ≤ 16', isCorrect: false, feedback: 'At n = 16, recomputing palindrome checks on every branch is still manageable, but a precomputed O(n²) table of all substring results makes each check O(1) instead of O(n). It is a clean improvement.' },
      ],
      correctFeedback: 'A 2D boolean table dp[i][j] = True if s[i:j+1] is a palindrome can be filled in O(n²) before backtracking begins. Then each check during backtracking is O(1) instead of O(n).',
      wrongFeedback: [
        'During backtracking on a string of length 16, how many distinct substrings might you check for palindrome-ness across all branches?',
        'There are at most n*(n+1)/2 = 136 distinct substrings for n = 16. A precomputed table checks each once upfront, then answers in O(1) during backtracking.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def partition(self, s):
        n = len(s)
        result = []
        path = []

        def is_pal(l, r):
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True

        def backtrack(start):
            if start == n:
                result.append(path[:])
                return
            for end in range(start, n):
                if is_pal(start, end):
                    path.append(s[start:end + 1])
                    backtrack(end + 1)
                    path.pop()

        backtrack(0)
        return result`,
  solutionComplexity: { time: 'O(n · 2ⁿ)', space: 'O(n)' },
  solutionCaveat: 'The palindrome check runs <code>before</code> the recursive call, not after — a substring that fails the check is never appended to <code>path</code> or recursed into, which prunes that entire branch immediately instead of letting the search build out an invalid partition all the way to a leaf before discovering the problem.',
  solutionExplanation: 'Every valid partition corresponds to a sequence of split points, so backtracking one split at a time — trying every possible next palindrome prefix starting at <code>start</code> — naturally enumerates all of them; reaching <code>start == n</code> means the entire string has been consumed by a sequence of confirmed palindromes, which is exactly when a complete valid partition is found and recorded. Because the problem asks for every valid partition rather than just one, the search can never stop early — it must explore every branch that survives the palindrome-check pruning.',
}
