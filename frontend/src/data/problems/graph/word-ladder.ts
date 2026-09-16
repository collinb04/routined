export default {
  id: 'word-ladder',
  title: 'Word Ladder',
  difficulty: 'hard',
  description: `<p>A transformation sequence from word <code>beginWord</code> to word <code>endWord</code> using a dictionary <code>wordList</code> is a sequence such that every adjacent pair of words differs by exactly one letter and every word is in the dictionary. Return the number of words in the shortest transformation sequence, or 0 if no such sequence exists.</p>`,
  examples: [
    { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5' },
    { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', output: '0' },
  ],
  constraints: ['1 <= beginWord.length <= 10', 'endWord.length == beginWord.length', '1 <= wordList.length <= 5000', 'All words have the same length'],
  starterCode: `class Solution:
    def ladder_length(self, begin_word, end_word, word_list):
        pass`,
  runnerSetup: 'ladder_length = Solution().ladder_length',
  functionName: 'ladder_length',
  conceptId: 'graphs',
  testCases: [
    { label: 'hit→cog', args: ['hit', 'cog', ['hot','dot','dog','lot','log','cog']], expected: 5 },
    { label: 'no path', args: ['hit', 'cog', ['hot','dot','dog','lot','log']], expected: 0 },
  ],
  bruteHint: 'A brute-force approach builds the transformation graph by comparing every pair of words in wordList to check whether they differ by exactly one letter, then runs BFS on that graph to find the shortest path. With n words of length m, comparing all pairs costs O(n² · m) time. Instead of comparing every word to every other word, could you generate the one-letter neighbors of a word directly and look them up in the dictionary?',
  optimizeComplexity: { time: 'O(n · m²)', space: 'O(n · m)' },
  clues: [
    {
      id: 'output-shortest-sequence',
      question: 'Recognizing a request for the shortest sequence is a signal to reach for a traversal that explores outward level by level rather than one that dives deep first. The problem asks for the number of words in the shortest transformation sequence. What does "shortest" signal?',
      highlight: { location: 'description', text: 'the number of words in the shortest transformation sequence' },
      options: [
        { label: 'BFS over the word graph', isCorrect: true },
        { label: 'DFS with memoization', isCorrect: false, feedback: 'DFS explores one path at a time and won\'t naturally find the shortest sequence first. Memoization helps avoid redundant work, but BFS is the right tool for minimum-distance in an unweighted graph.' },
        { label: 'Sort words by similarity to endWord', isCorrect: false, feedback: 'Sorting by similarity doesn\'t capture graph structure — a word one letter from endWord might not be reachable from beginWord without going through many others. BFS explores all reachable words by distance.' },
        { label: 'Greedy — always pick the word closest to endWord', isCorrect: false, feedback: 'A greedy approach can get stuck — the word most similar to endWord might not connect back to any reachable word. BFS explores all options and guarantees the shortest sequence.' },
      ],
      correctFeedback: 'Model words as nodes and one-letter differences as edges. BFS from beginWord finds endWord via the shortest path — the word count at that depth is the answer.',
      wrongFeedback: [
        'Each valid one-letter transformation is an edge in a graph. Which traversal finds the shortest path in an unweighted graph?',
        'BFS from beginWord expands all words reachable in 1 transformation, then 2, and so on. The first time endWord is reached, the current depth + 1 is the answer.',
      ],
    },
    {
      id: 'neighbor-generation',
      question: 'When naive pairwise comparisons would be too slow at scale, that\'s a signal to generate candidates directly instead of scanning the whole collection. Words have length up to 10, and wordList has up to 5,000 words. How do you efficiently find valid one-letter neighbors of a word?',
      highlight: { location: 'constraint', text: '1 <= beginWord.length <= 10' },
      options: [
        { label: 'Compare every word in wordList to the current word', isCorrect: false, feedback: 'Comparing every word in wordList per BFS step is O(5,000 × word_length) per node. With up to 5,000 nodes, that\'s 25 million comparisons. The pattern-matching approach is faster.' },
        { label: 'Generate all 26 × 10 = 260 substitutions and check which ones exist in the word list', isCorrect: true },
        { label: 'Sort wordList and look up each candidate within the sorted list', isCorrect: false, feedback: 'Binary search finds exact matches, not one-letter differences. There\'s no natural sort order that groups one-letter neighbors together.' },
        { label: 'Count differing letters between the current word and every other word', isCorrect: false, feedback: 'Computing full edit distance is more work than needed — you only care about substitutions, not insertions or deletions. Trying all 26 × word_length substitutions and checking a hash set is faster.' },
      ],
      correctFeedback: 'For a word of length L, try replacing each position with all 26 letters: 26L candidates. Check each against a hash set of wordList words. At L = 10, that\'s 260 lookups per node — O(26L) per word, much faster than O(5,000 × L) per word.',
      wrongFeedback: [
        'You need all words one letter away from the current word. Instead of scanning wordList, can you generate all possible one-letter variants and check which ones exist?',
        'For each position (up to 10), try all 26 letters. That\'s 260 candidates per word. Look each up in a hash set of wordList. Which is faster: 260 set lookups or 5,000 string comparisons?',
      ],
    },
    {
      id: 'endword-not-in-list',
      question: 'Spotting an early exit condition before committing to a full traversal can save significant wasted work. The function returns 0 if no transformation sequence exists. What is a quick pre-check before starting BFS?',
      highlight: { location: 'description', text: 'every word is in the dictionary' },
      options: [
        { label: 'Check if beginWord is in wordList', isCorrect: false, feedback: 'beginWord doesn\'t need to be in wordList — the sequence starts from it regardless. The critical check is whether endWord exists in wordList, since the sequence must end there.' },
        { label: 'Check if endWord is in wordList', isCorrect: true },
        { label: 'Check if beginWord and endWord differ by one letter', isCorrect: false, feedback: 'They might differ by more than one letter but still be connected through intermediate words. The pre-check that avoids useless BFS is: is endWord in the dictionary at all?' },
        { label: 'Check if wordList is non-empty', isCorrect: false, feedback: 'An empty wordList means no transformations are possible, but a non-empty one doesn\'t guarantee a path. The specific check that saves work is: does endWord appear in wordList?' },
      ],
      correctFeedback: 'If endWord is not in wordList, no sequence can reach it — return 0 immediately without running BFS. This is an O(n) pre-check that avoids a potentially expensive graph traversal.',
      wrongFeedback: [
        'BFS traverses the word graph looking for endWord. If endWord can\'t appear in any valid sequence, what\'s the earliest point you can detect that?',
        'The sequence must consist entirely of words in wordList (except possibly beginWord). If endWord isn\'t in wordList, it can never be the final word — return 0 before starting BFS.',
      ],
    },
    {
      id: 'word-count-vs-step-count',
      question: 'Distinguishing what a traversal naturally counts (steps) from what the problem actually asks for (a word count) prevents an off-by-one error. The output is the number of words in the sequence (including beginWord and endWord). The example "hit"→"cog" gives 5. How does this relate to BFS depth?',
      highlight: { location: 'description', text: 'the number of words in the shortest transformation sequence' },
      options: [
        { label: 'Return the traversal depth directly', isCorrect: false, feedback: 'BFS depth is the number of transformations (edges), which is one less than the word count. For "hit"→"hot"→"dot"→"dog"→"cog", depth is 4 but the sequence has 5 words. Add 1.' },
        { label: 'Return the traversal depth + 1', isCorrect: true },
        { label: 'Return the traversal depth × word_length', isCorrect: false, feedback: 'Word length has nothing to do with the sequence length. The answer is the number of words visited, which is the number of transformation steps plus 1 for the starting word.' },
        { label: 'Return the number of words in wordList visited', isCorrect: false, feedback: 'You don\'t count all visited words — only the words on the shortest path. That count is the BFS depth (transformations) plus 1 (for beginWord).' },
      ],
      correctFeedback: 'BFS depth = number of edges = number of transformations = word count − 1. The sequence "hit"→"hot"→"dot"→"dog"→"cog" is 4 transformations and 5 words. Return depth + 1.',
      wrongFeedback: [
        'Count the words in the example sequence: hit, hot, dot, dog, cog — that\'s 5. How many transformation steps (edges) are there? What is 5 in terms of steps?',
        'Steps = words − 1. So words = steps + 1 = BFS depth + 1. If endWord is reached at BFS depth 4, the answer is 5.',
      ],
    },
  ],
  solutionCode: `from collections import deque

class Solution:
    def ladder_length(self, begin_word, end_word, word_list):
        word_set = set(word_list)
        if end_word not in word_set:
            return 0

        queue = deque([(begin_word, 1)])
        visited = {begin_word}
        while queue:
            word, steps = queue.popleft()
            if word == end_word:
                return steps
            for i in range(len(word)):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    if c != word[i]:
                        candidate = word[:i] + c + word[i+1:]
                        if candidate in word_set and candidate not in visited:
                            visited.add(candidate)
                            queue.append((candidate, steps + 1))
        return 0`,
  solutionComplexity: { time: 'O(L² · 26 · N)', space: 'O(N · L)' },
  solutionCaveat: 'The queue tracks <code>steps</code> as a <code>word count</code> starting at 1 for <code>begin_word</code> itself, not a transformation count starting at 0 — that offset is exactly why the returned value already equals the required "sequence length" without any final <code>+1</code> adjustment.',
  solutionExplanation: 'Treating every dictionary word as a node and a one-character substitution as an edge to another dictionary word makes finding the shortest transformation sequence a plain unweighted shortest-path problem, which BFS solves exactly: the first time <code>end_word</code> is dequeued, it was reached in the fewest possible steps. Generating all 26 possible substitutions at each position and checking membership in the word set (rather than checking every other word for a one-character difference) keeps each expansion proportional to word length instead of dictionary size.',
}
