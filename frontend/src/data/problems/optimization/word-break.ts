export default {
  id: 'word-break',
  title: 'Word Break',
  difficulty: 'medium',
  description: `<p>Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.</p>`,
  examples: [
    { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true' },
    { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: 'true' },
    { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: 'false' },
  ],
  constraints: ['1 <= s.length <= 300', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 20'],
  starterCode: `class Solution:
    def word_break(self, s, word_dict):
        pass`,
  runnerSetup: 'word_break = Solution().word_break',
  functionName: 'word_break',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'leetcode', args: ['leetcode', ['leet','code']], expected: true },
    { label: 'applepenapple', args: ['applepenapple', ['apple','pen']], expected: true },
    { label: 'catsandog', args: ['catsandog', ['cats','dog','sand','and','cat']], expected: false },
  ],
  bruteHint: 'The brute-force approach recursively tries every possible word length as a candidate match starting at the current position, then recurses on the remaining suffix of s, branching at every point where a dictionary word could plausibly end. Because different split sequences often bottom out on the exact same suffix of s, this recursion re-solves that suffix from scratch every time a different path reaches it, growing to roughly O(2^n) calls in the worst case. If you could remember whether a given suffix is segmentable the first time you worked it out, would you ever need to redo that work?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: '1 <= s.length <= 300' },
      question: 'Numeric constraints usually reveal the time complexity your solution is expected to target before you write any code. s.length ≤ 300 and wordDict[i].length ≤ 20 tell you…',
      options: [
        { label: 'O(n²) or O(n × max_word_len) is the target', isCorrect: true },
        { label: 'O(n) linear time suffices', isCorrect: false, feedback: 'A single pass can\'t match words of varying lengths — you need to check whether each suffix of s starts with a dictionary word. That requires looking back up to max_word_len = 20 characters at each position.' },
        { label: 'Enumerate all 2ⁿ splits of s', isCorrect: false, feedback: '2^300 splits is astronomically large. The DP avoids this by checking only splits at each character position, not all possible combinations.' },
        { label: 'Sort the dictionary once so each lookup can narrow its search range', isCorrect: false, feedback: 'Sorting the dictionary enables faster lookup only if your words are searched individually. A hash set gives O(1) lookup per word check, which is better than binary search.' },
      ],
      correctFeedback: 'n = 300 positions, and at each position you check at most max_word_len = 20 characters backward. That\'s O(n × max_word_len) = 6,000 operations — fast.',
      wrongFeedback: [
        'At each position in s, how far back do you need to look for a matching word? What bounds that lookback?',
        'wordDict[i].length ≤ 20 limits the lookback: at position i, only check s[i-20..i] through s[i-1..i] against the dictionary. Total work: O(n × 20).',
      ],
    },
    {
      id: 'dp-state',
      question: 'Anchoring the recurrence with a correct base case keeps every later state from having nothing valid to build on. dp[i] = True if s[:i] can be segmented using the dictionary. What is dp[0]?',
      options: [
        { label: 'dp[0] = False, because no word starts at the beginning', isCorrect: false, feedback: 'dp[0] represents the empty prefix, which trivially requires no words to segment. It must be True to allow the first word to be matched from the beginning.' },
        { label: 'dp[0] = True, the empty string is always segmentable', isCorrect: true },
        { label: 'dp[0] depends on whether wordDict is empty', isCorrect: false, feedback: 'The empty string needs zero words to segment it — it\'s always valid regardless of the dictionary. dp[0] = True is a universal base case.' },
        { label: 'dp[0] = True only if s[0] is in the dictionary', isCorrect: false, feedback: 'dp[0] represents s[:0] — the empty string. It says nothing about s[0]. dp[1] = True if s[0:1] is in the dictionary; dp[0] is just the anchor for that.' },
      ],
      correctFeedback: 'dp[0] = True anchors the recurrence. It means "the empty prefix is trivially segmented." Without it, dp[4] = True for "leet" would have nothing to propagate from.',
      wrongFeedback: [
        'dp[4] = True if s[:4] = "leet" is a word. The recurrence checks dp[0] and s[0:4] in wordDict. For dp[0] to anchor this, what must it be?',
        'The base case is the empty string — segmented with zero words, always valid. Set dp[0] = True so that the first word in s can be found by checking dp[0] + a word match.',
      ],
    },
    {
      id: 'dict-lookup-efficiency',
      highlight: { location: 'constraint', text: '1 <= wordDict.length <= 1000' },
      question: 'The data structure backing a repeated lookup can dominate your algorithm\'s real running time even when the asymptotic complexity already looks fine on paper. wordDict.length ≤ 1000. Inside a DP loop, you\'ll check substrings against the dictionary repeatedly. What structure makes this fast?',
      options: [
        { label: 'Convert wordDict to a set for O(1) lookups', isCorrect: true },
        { label: 'Sort wordDict and binary search each substring', isCorrect: false, feedback: 'Binary search gives O(log 1000) ≈ 10 comparisons per lookup. A hash set gives O(1) per lookup — simpler and faster.' },
        { label: 'Use a nested loop to compare each substring to every word', isCorrect: false, feedback: 'At 300 positions × 20 lookback × 1,000 words, that\'s 6 million string comparisons per test case. A set lookup reduces this to 300 × 20 = 6,000 checks.' },
        { label: 'Build a trie from wordDict', isCorrect: false, feedback: 'A trie works and can be faster in theory, but with wordDict.length ≤ 1,000 and word lengths ≤ 20, a hash set is much simpler to implement and sufficient.' },
      ],
      correctFeedback: 'word_set = set(wordDict) converts once in O(total word length). Each of the O(n × max_word_len) lookups inside the DP then runs in O(1).',
      wrongFeedback: [
        'Inside your DP loop, you check whether a substring is in the dictionary. How many times might you perform that check across the whole algorithm?',
        'You check O(n × max_word_len) = up to 6,000 substrings. With a list, each check is O(1,000). With a set, each check is O(1). Convert once before the loop.',
      ],
    },
    {
      id: 'output-boolean',
      highlight: { location: 'description', text: 'can be segmented into a space-separated sequence of one or more dictionary words' },
      question: 'What the problem actually asks you to return often rules out extra work your solution doesn\'t need to do. The output is true or false — not the segmentation itself. This means…',
      options: [
        { label: 'Reconstruct the word sequence by backtracking through the stored results', isCorrect: false, feedback: 'Reconstruction requires backtracking through the DP table to find which words were used. That\'s extra work the problem never asks for.' },
        { label: 'Return dp[len(s)] without tracking which words were used', isCorrect: true },
        { label: 'Count all valid segmentations and return count > 0', isCorrect: false, feedback: 'Counting all segmentations is a different (harder) problem. For a boolean answer, you only need to know whether one valid segmentation exists — stop as soon as dp[n] is set to True.' },
        { label: 'Return early if any prefix is not segmentable', isCorrect: false, feedback: 'A prefix not being segmentable doesn\'t mean the full string isn\'t — a longer match starting before that prefix might still work. You can\'t stop early on an unresolvable prefix.' },
      ],
      correctFeedback: 'dp[n] = True if and only if s can be fully segmented. No backtracking, no path reconstruction — just read off the final boolean value.',
      wrongFeedback: [
        'The output is a single boolean. Once the DP table is filled, where is the answer?',
        'dp[n] holds the answer directly. No reconstruction or backtracking needed — the DP propagates reachability forward, and the final cell gives you true or false.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def word_break(self, s, word_dict):
        word_set = set(word_dict)
        n = len(s)
        dp = [False] * (n + 1)
        dp[0] = True
        max_word_len = max((len(w) for w in word_set), default=0)
        for i in range(1, n + 1):
            for length in range(1, min(i, max_word_len) + 1):
                if dp[i - length] and s[i - length:i] in word_set:
                    dp[i] = True
                    break
        return dp[n]`,
  solutionComplexity: { time: 'O(n · maxWordLen)', space: 'O(n)' },
  solutionCaveat: 'The inner loop only checks lookback lengths up to <code>max_word_len</code>, not all the way back to 0 — no dictionary word is longer than that, so checking further back could never find a valid word and would just waste time.',
  solutionExplanation: '<code>dp[i]</code> is true exactly when some suffix ending at position <code>i</code> is both a dictionary word and left a segmentable prefix behind it (<code>dp[i - length]</code> already true), so trying every possible word length backward from each position and stopping the moment one succeeds finds a valid segmentation without ever reconstructing it. Converting <code>word_dict</code> to a <code>set</code> once up front turns every one of those repeated substring checks into an O(1) lookup instead of an O(word_dict length) scan.',
}
