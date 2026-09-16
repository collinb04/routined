export default {
  id: 'edit-distance',
  title: 'Edit Distance',
  difficulty: 'medium',
  description: 'Given two strings <code>word1</code> and <code>word2</code>, return the minimum number of operations (insert, delete, or replace a character) to convert word1 to word2.',
  examples: [
    { input: 'word1="horse", word2="ros"', output: '3', explanation: 'horse→rorse (replace h with r)→rose (remove r)→ros (remove e). 3 operations.' },
  ],
  constraints: ['0 ≤ word1.length, word2.length ≤ 500', 'Both strings consist of lowercase English letters'],
  starterCode: `class Solution:
    def min_distance(self, word1, word2):
        pass`,
  runnerSetup: 'min_distance = Solution().min_distance',
  functionName: 'min_distance',
  conceptId: 'dp-2d',
  testCases: [
    { label: '"horse"→"ros"', args: ['horse','ros'], expected: 3 },
    { label: '"intention"→"execution"', args: ['intention','execution'], expected: 5 },
    { label: 'Empty to word', args: ['','abc'], expected: 3 },
  ],
  bruteHint: 'A brute-force solution recursively branches at each pair of positions in word1 and word2, trying insert, delete, replace, and match at every step. Since the same (word1 position, word2 position) pair gets revisited along many different branches, this naive recursion costs exponential time, roughly O(3^(m+n)). Which repeated (i, j) pairs are being recomputed over and over, and how could you store their answers instead?',
  optimizeComplexity: { time: 'O(m·n)', space: 'O(m·n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraints reveal the complexity budget the intended solution must respect, so checking them first tells you what\'s realistic before you design anything. word1.length, word2.length ≤ 500 tells you…',
      highlight: { location: 'constraint', text: '0 ≤ word1.length, word2.length ≤ 500' },
      options: [
        { label: 'O(n) is achievable — scan both strings once', isCorrect: false, feedback: 'A single pass can\'t capture how prefixes of word1 relate to prefixes of word2. Both string lengths independently drive the state, requiring a 2D approach.' },
        { label: 'O(m × n) is the natural target',              isCorrect: true },
        { label: 'O(n³) is fine — n is at most 500',           isCorrect: false, feedback: 'At n = 500, O(n³) is 125 million operations — borderline at best. The natural structure is O(m × n) = 500 × 500 = 250,000 operations.' },
        { label: 'Input size doesn\'t matter here',            isCorrect: false, feedback: 'Two strings with up to 500 characters each. O(m × n) = 250,000 — that budget shapes the entire approach.' },
      ],
      correctFeedback: 'O(m × n) = 500 × 500 = 250,000 operations. A 2D DP table, one cell per pair of prefixes, fills in that exact budget.',
      wrongFeedback: [
        'Two strings with lengths up to 500. What\'s the product of their maximum lengths?',
        '500 × 500 = 250,000. A table indexed by both string positions fits that budget exactly.',
      ],
    },
    {
      id: 'output-minimum',
      question: 'Recognizing whether a problem wants you to count, minimize, or simply check feasibility shapes the entire structure of your DP objective. The output is the minimum number of operations. What does this say about your DP objective?',
      highlight: { location: 'description', text: 'return the minimum number of operations (insert, delete, or replace a character) to convert word1 to word2.' },
      options: [
        { label: 'Count all valid operation sequences',              isCorrect: false, feedback: 'Counting sequences is the wrong objective — and there are infinitely many (e.g., insert then delete the same character). You want the shortest sequence, not a tally of all sequences.' },
        { label: 'Minimize a cost — take the cheapest option at each step', isCorrect: true },
        { label: 'Find any valid transformation, then count its steps', isCorrect: false, feedback: 'Any valid sequence might be longer than the minimum. You need to build the optimal solution directly, not find one and measure it afterward.' },
        { label: 'Check whether word1 can be converted to word2',    isCorrect: false, feedback: 'The strings can always be converted (delete all of word1, then insert all of word2). The question is the minimum cost, not whether it\'s possible.' },
      ],
      correctFeedback: 'dp[i][j] = minimum edits to convert word1[0..i-1] to word2[0..j-1]. At each cell you take the minimum of three operations: insert, delete, or replace (free if characters match).',
      wrongFeedback: [
        'When you have multiple ways to reach a state, which one do you keep?',
        'You\'re minimizing — keep the smallest edit count at each cell. At each transition, pick min(insert, delete, replace or match).',
      ],
    },
    {
      id: 'two-string-dp',
      question: 'Whenever a problem tracks two independent sequences at once, your state usually needs a dimension for each — missing one collapses distinct situations together. You\'re converting one string to another. What does the state need to track?',
      highlight: { location: 'description', text: 'two strings <code>word1</code> and <code>word2</code>' },
      options: [
        { label: 'Current position in word1 only',                    isCorrect: false, feedback: 'Position in word1 alone doesn\'t tell you how much of word2 has been constructed. At the same word1 position, you could be halfway through word2 or almost done.' },
        { label: 'Current position in both word1 and word2',          isCorrect: true },
        { label: 'The set of characters edited so far',               isCorrect: false, feedback: 'The set of characters edited grows and doesn\'t encode order — but order matters for string transformations. Two different transformation paths can edit the same character set at completely different costs.' },
        { label: 'The difference in lengths between the two strings', isCorrect: false, feedback: 'Length difference tells you how many net insertions or deletions are needed, but not the minimum cost to align specific characters. Two strings with the same length difference can have very different edit distances.' },
      ],
      correctFeedback: 'dp[i][j] uses position i in word1 and position j in word2. Two independent dimensions. At 500 × 500 = 250,000 cells, the full table fits easily.',
      wrongFeedback: [
        'You\'re aligning prefixes of word1 against prefixes of word2. How many positions do you need to track independently?',
        'Each cell represents a (prefix of word1, prefix of word2) pair. Two positions — two axes.',
      ],
    },
    {
      id: 'three-operations',
      question: 'Each allowed operation in a problem statement typically maps to one specific transition in your recurrence, so enumerating them up front tells you exactly how many transitions to check per cell. Three operations are allowed: insert, delete, replace. At dp[i][j], what do they correspond to?',
      highlight: { location: 'description', text: '(insert, delete, or replace a character)' },
      options: [
        { label: 'Insert: dp[i+1][j], Delete: dp[i][j-1], Replace: dp[i-1][j-1]',  isCorrect: false, feedback: 'The directions are reversed. Insert into word1 means word2 advances (j decreases), not word1. Trace each operation: which string moves, which stays?' },
        { label: 'Insert: dp[i][j-1]+1, Delete: dp[i-1][j]+1, Replace/match: dp[i-1][j-1]+(0 or 1)', isCorrect: true },
        { label: 'All three always cost 1 — just pick any',            isCorrect: false, feedback: 'Replace costs 0 when word1[i] == word2[j] — that\'s the "match" case. Picking any operation wastes the free match and won\'t minimize.' },
        { label: 'You only need delete and insert — replace = delete + insert', isCorrect: false, feedback: 'Treating replace as two operations doubles its cost compared to a direct substitution. The problem defines replace as one operation, and the optimal solution often uses it.' },
      ],
      correctFeedback: 'Insert a char (advance j): dp[i][j-1] + 1. Delete a char (advance i): dp[i-1][j] + 1. Replace/match (advance both): dp[i-1][j-1] + (0 if match, 1 if replace). Take the minimum of all three.',
      wrongFeedback: [
        'For each operation, which prefix changes? Insert adds to word1 (j moves), delete removes from word1 (i moves), replace touches both. Which dp cell does each reference?',
        'Insert → j steps back (word2 shorter to match): dp[i][j-1]+1. Delete → i steps back (word1 shorter): dp[i-1][j]+1. Replace/match → both step back: dp[i-1][j-1] + cost.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def min_distance(self, word1, word2):
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        return dp[m][n]`,
  solutionComplexity: { time: 'O(m · n)', space: 'O(m · n)' },
  solutionCaveat: 'The base row and column (<code>dp[i][0] = i</code>, <code>dp[0][j] = j</code>) encode converting to or from the empty string by pure insertion or deletion — every other cell\'s answer ultimately bottoms out at one of these, so getting them right is what keeps the rest of the table correct.',
  solutionExplanation: 'Each cell <code>dp[i][j]</code> considers the three ways the last operation could resolve the mismatch between <code>word1[:i]</code> and <code>word2[:j]</code>: delete <code>word1[i-1]</code> (<code>dp[i-1][j] + 1</code>), insert to match <code>word2[j-1]</code> (<code>dp[i][j-1] + 1</code>), or replace/match the two characters (<code>dp[i-1][j-1]</code>, plus 1 only when they differ) — taking the minimum of the three finds the cheapest way to have arrived at this pair of prefixes. Building the table left-to-right, top-to-bottom guarantees every cell a transition depends on is already filled in by the time it\'s needed.',
}
