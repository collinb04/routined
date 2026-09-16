export default {
  id: 'word-break-ii',
  title: 'Word Break II',
  difficulty: 'hard',
  description: 'Given a string <code>s</code> and a dictionary <code>wordDict</code>, add spaces in <code>s</code> to construct all possible sentences where each word is in the dictionary. Return all such sentences.',
  examples: [
    { input: 's="catsanddog", wordDict=["cat","cats","and","sand","dog"]', output: '["cat sand dog","cats and dog"]' },
  ],
  constraints: ['1 ≤ s.length ≤ 20', '1 ≤ wordDict.length ≤ 1000', '1 ≤ wordDict[i].length ≤ 10', 's and wordDict[i] consist of lowercase letters'],
  starterCode: `class Solution:
    def word_break(self, s, word_dict):
        pass`,
  runnerSetup: 'word_break = Solution().word_break',
  functionName: 'word_break',
  conceptId: 'backtracking',
  testCases: [
    { label: 'Two sentences', args: ['catsanddog',['cat','cats','and','sand','dog']], expected: ['cat sand dog','cats and dog'] },
    { label: 'No solution', args: ['a',['b']], expected: [] },
  ],
  bruteHint: 'The brute-force approach recursively tries every possible split point in the string, branching at each position to explore every way the remaining suffix could be broken into words. Without caching, the same suffix gets re-solved from scratch every time it is reached by a different path, so the work grows exponentially, O(2ⁿ) in the length of the string. What happens to that redundant work if you remember the sentences already computed for a given starting index?',
  optimizeComplexity: { time: 'O(2ⁿ)', space: 'O(2ⁿ)' },
  clues: [
    {
      id: 'constraint-small-string',
      question: 'Input size constraints are often the strongest signal for which time complexity is actually acceptable, even when a problem looks like it demands brute force. s.length ≤ 20. What does this small bound signal about the approach?',
      highlight: { location: 'constraint', text: '1 ≤ s.length ≤ 20' },
      options: [
        { label: 'Only O(n) solutions are feasible', isCorrect: false, feedback: 'With n = 20, even exponential backtracking is bounded by a manageable constant. O(n) would be too restrictive — the output itself can have exponentially many sentences.' },
        { label: 'Backtracking with memoization is feasible', isCorrect: true },
        { label: 'Greedy left-to-right matching is sufficient', isCorrect: false, feedback: 'Greedy matching commits to the first valid word at each position. In "catsanddog", greedily picking "cat" finds one sentence — but "cats" also leads to a valid sentence. Greedy misses valid alternatives.' },
        { label: 'No special optimization is needed — brute force all splits', isCorrect: false, feedback: 'At n = 20, naive recursive branching without memoization can still revisit the same suffix many times. Memoizing results by start index prevents redundant work.' },
      ],
      correctFeedback: 'With n ≤ 20, there are at most 20 possible start indices. Memoize the list of sentences reachable from each index — each suffix is computed at most once, bounding the work even if the output is large.',
      wrongFeedback: [
        'How many distinct starting positions are there in a string of length 20? What does that say about the number of unique subproblems?',
        'If you cache results by start index, you have at most 20 subproblems. How does that limit the total work even when many sentences exist?',
      ],
    },
    {
      id: 'output-all-sentences',
      question: 'The exact shape of the required output — a boolean versus a full list of results — determines how much of the search space you are obligated to explore and return. The output is ALL possible sentences, not just whether one exists. How does this differ from Word Break I?',
      highlight: { location: 'description', text: 'Return all such sentences.' },
      options: [
        { label: 'Return true/false — same as Word Break I', isCorrect: false, feedback: 'Word Break II requires returning the actual sentences, not a boolean. You must collect all valid segmentations, not just detect that one exists.' },
        { label: 'Collect and return every valid segmentation, not just detect one', isCorrect: true },
        { label: 'Return the shortest valid sentence only', isCorrect: false, feedback: 'The problem asks for all valid sentences — not the shortest one. Every valid segmentation must be included in the output.' },
        { label: 'Return how many valid sentences exist', isCorrect: false, feedback: 'The output is a list of sentence strings, not a count. You must construct and return the actual segmented strings.' },
      ],
      correctFeedback: 'Unlike Word Break I which returns a boolean, Word Break II must enumerate every valid segmentation. Each recursive call returns a list of sentence suffixes reachable from that position — you combine them with the current word to build full sentences.',
      wrongFeedback: [
        'Word Break I stops as soon as it finds any valid segmentation. What must Word Break II do differently?',
        'The output is a list of strings. Your recursion must build and return those strings — not just a boolean signal.',
      ],
    },
    {
      id: 'dictionary-lookup',
      question: 'Repeated membership checks against a large dictionary are a classic signal to think about the data structure backing those lookups before writing any recursive logic. wordDict has up to 1000 words. How should you store it for efficient prefix checking?',
      highlight: { location: 'constraint', text: '1 ≤ wordDict.length ≤ 1000' },
      options: [
        { label: 'Check each substring by scanning through the entire dictionary from the start every time', isCorrect: false, feedback: 'Scanning a list of 1000 words at each of the 20 positions gives 20,000 comparisons just for membership checks. Converting to a set reduces each check to O(1).' },
        { label: 'Store the dictionary in a structure that checks whether a substring is a word in constant time', isCorrect: true },
        { label: 'Sort the dictionary once and narrow the search range by half on each comparison', isCorrect: false, feedback: 'Binary search is O(log 1000) ≈ 10 comparisons — much better than linear scan, but still unnecessary. A set gives O(1) lookup with no sorting overhead.' },
        { label: 'Build a shared branching structure from the dictionary that lets you prune as soon as no word matches the prefix', isCorrect: false, feedback: 'A trie enables prefix pruning and is useful for Word Search II at board scale. For n ≤ 20 with a 1000-word dictionary, a set is simpler and sufficient.' },
      ],
      correctFeedback: 'A set gives O(1) average-case lookup. At each of the 20 positions you try every possible end index — checking s[start:end] in the set is instant, keeping total work proportional to the number of subproblems times the string length.',
      wrongFeedback: [
        'You will check many substrings against the dictionary. What data structure gives the fastest membership check?',
        'A set stores all 1000 words and checks any query in O(1). How does that compare to scanning the list each time?',
      ],
    },
    {
      id: 'memoization-key',
      question: 'Once you decide to cache results, the correctness and effectiveness of that cache hinges entirely on choosing a key that uniquely captures each subproblem. You memoize results to avoid recomputing. What is the natural key for the memo table?',
      options: [
        { label: 'The current word being formed', isCorrect: false, feedback: 'The current word changes at every step and does not uniquely identify a subproblem. Two different paths could be forming the same word while having different remaining suffixes.' },
        { label: 'The start index into s', isCorrect: true },
        { label: 'The set of words used so far', isCorrect: false, feedback: 'The set of words used so far grows and changes at every branch — it is expensive to hash and does not capture a reusable subproblem. What matters is only what remains to be segmented.' },
        { label: 'The length of the current sentence', isCorrect: false, feedback: 'Sentence length does not identify a unique subproblem — two segmentations of different words could produce sentences of the same length while being at different positions in s.' },
      ],
      correctFeedback: 'The subproblem "find all sentences for s[start:]" depends only on start. Memoizing by start index means each of the ≤ 20 suffixes is solved at most once, and subsequent calls return cached results immediately.',
      wrongFeedback: [
        'What uniquely determines which part of s still needs to be segmented? Two calls at the same position will always produce the same set of sentences.',
        'The subproblem is always "segment s starting at index i." What single integer captures that completely?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def word_break(self, s, word_dict):
        word_set = set(word_dict)
        memo = {}

        def backtrack(start):
            if start in memo:
                return memo[start]
            if start == len(s):
                return ['']
            sentences = []
            for end in range(start + 1, len(s) + 1):
                word = s[start:end]
                if word in word_set:
                    for rest in backtrack(end):
                        sentences.append(word + ('' if rest == '' else ' ' + rest))
            memo[start] = sentences
            return sentences

        return backtrack(0)`,
  solutionComplexity: { time: 'O(2ⁿ)', space: 'O(2ⁿ)' },
  solutionCaveat: 'The base case at <code>start == len(s)</code> returns <code>[\'\']</code> — a list containing one empty sentence, not an empty list — since reaching the end of the string with no more characters left is a <code>successful</code> segmentation (there is exactly one way to segment nothing: use nothing), and an empty list there would incorrectly signal "no valid segmentation exists."',
  solutionExplanation: 'Memoizing by <code>start</code> index alone is sufficient because "all valid sentences for the suffix <code>s[start:]</code>" depends on nothing else — two different paths reaching the same <code>start</code> will always produce identical results, so caching by that single integer collapses what would otherwise be exponential re-computation down to at most <code>len(s)</code> unique subproblems. Each call tries every valid word starting at <code>start</code>, then combines it with every sentence returned by the recursive call on the remaining suffix — that combination step is what builds up full sentences from smaller ones without ever needing to re-derive a suffix\'s sentences twice.',
}
