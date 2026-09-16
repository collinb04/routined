export default {
  id: 'design-add-search-words',
  title: 'Design Add and Search Words Data Structure',
  difficulty: 'medium',
  description: 'Design a data structure supporting <code>addWord(word)</code> and <code>search(word)</code> where <code>word</code> may contain the wildcard <code>\'.\' </code> that matches any letter.',
  examples: [
    { input: 'addWord("bad"), addWord("dad"), addWord("mad"), search("pad"), search("bad"), search(".ad"), search("b..")', output: '[null,null,null,false,true,true,true]' },
  ],
  constraints: ['1 ≤ word.length ≤ 25', 'word for addWord consists of lowercase letters; word for search may contain \'.\'', 'At most 10⁴ calls total'],
  starterCode: `class WordDictionary:
  def __init__(self):
      pass

  def add_word(self, word):
      pass

  def search(self, word):
      pass`,
  functionName: 'word_dictionary_run',
  conceptId: 'tries',
  runnerSetup: `def word_dictionary_run(ops, words):
  wd = WordDictionary()
  results = []
  for op, w in zip(ops, words):
      if op == 'addWord': wd.add_word(w); results.append(None)
      elif op == 'search': results.append(wd.search(w))
  return results`,
  testCases: [
    { label: 'Wildcard search', args: [['addWord','addWord','addWord','search','search','search','search'],['bad','dad','mad','pad','bad','.ad','b..']], expected: [null,null,null,false,true,true,true] },
  ],
  bruteHint: 'A brute-force design stores every added word in a plain list and, for each search call, scans through all of them, comparing characters one by one and treating \'.\' as a match for any letter. With up to 10⁴ calls and words up to length 25, that\'s O(n · L) work per search, where n is the number of stored words — potentially hundreds of thousands of comparisons for a single query. What would let you avoid re-scanning every stored word from scratch on every search?',
  optimizeComplexity: { time: 'O(m)', space: 'O(n · m)' },
  clues: [
    {
      id: 'prefix-sharing-structure',
      highlight: { location: 'constraint', text: '1 ≤ word.length ≤ 25' },
      question: 'The way a problem\'s data is shaped often points directly at the data structure that should hold it. addWord stores words up to length 25, and search needs to match them character by character. What structure fits character-by-character word storage naturally?',
      options: [
        { label: 'A hash set of complete words', isCorrect: false, feedback: 'A hash set works for exact lookups, but the wildcard \'.\' requires exploring multiple branches at a given position — a hash set gives you no way to navigate partial matches.' },
        { label: 'A sorted list of words', isCorrect: false, feedback: 'Sorting helps with prefix queries via binary search, but the wildcard \'.\' can appear anywhere and match any letter, making sorted-list traversal awkward compared to a character-indexed structure.' },
        { label: 'A trie (prefix tree)', isCorrect: true },
        { label: 'A hash map from word to boolean', isCorrect: false, feedback: 'Exact-match lookup works with a hash map, but \'.\' must match any letter at its position. You need a structure that lets you branch across all possible characters at a wildcard position.' },
      ],
      correctFeedback: 'A trie stores each character as a node, so at a \'.\' you simply recurse into all 26 children. Shared prefixes like "bad"/"bat" cost no extra space, and each level corresponds to one character position.',
      wrongFeedback: [
        'The wildcard \'.\' can appear at any position and must match any letter. What structure lets you explore all possible characters at a single position?',
        'You need to branch at \'.\' positions. A trie node holds up to 26 children — one per letter — so a wildcard just means trying all of them.',
      ],
    },
    {
      id: 'wildcard-search-strategy',
      highlight: { location: 'description', text: 'may contain the wildcard <code>\'.\' </code> that matches any letter.' },
      question: 'When a description calls out special-case behavior like a wildcard, that behavior usually dictates the shape of your search algorithm. search("b..") must match any 3-letter word starting with "b". What does the \'.\' wildcard require of your search algorithm?',
      options: [
        { label: 'Trying every child at a \'.\' position, since any letter could match', isCorrect: true },
        { label: 'Regex matching over stored words', isCorrect: false, feedback: 'Regex over a list of words is O(n × L) per search, where n is up to 10⁴ words. A trie search with branching at \'.\' is bounded by the trie depth (25 levels) times at most 26 branches.' },
        { label: 'Skip the \'.\' and match remaining characters', isCorrect: false, feedback: 'Skipping \'.\' would mean ignoring a required character position. The wildcard must consume exactly one character — you branch at that position rather than skip it.' },
        { label: 'Return true immediately on any partial match', isCorrect: false, feedback: 'You need a complete word match, not a partial one. "b" or "ba" should not match search("b..") — the full length and end-of-word marker both matter.' },
      ],
      correctFeedback: 'At a \'.\' node, recurse into every non-null child. If any branch reaches the end of the pattern with is_end=True, return true. This is DFS with branching at wildcard positions.',
      wrongFeedback: [
        'At a \'.\' position you don\'t know which child to follow. What do you do when you don\'t know which direction to go in a tree?',
        'Try all 26 children at \'.\' — this is backtracking. If any path leads to a complete word match, the search succeeds.',
      ],
    },
    {
      id: 'end-of-word-marker',
      question: 'Examples that contrast two similar inputs often expose a subtle invariant your data structure must track. search("app") should return false if only "apple" was added. What must the trie track beyond just characters?',
      options: [
        { label: 'Word length at each node', isCorrect: false, feedback: 'Length alone doesn\'t tell you whether a word ends here. "app" and "apple" share the first three nodes — only a marker at the "p" node tells you "app" is a complete word.' },
        { label: 'A count of how many words pass through each node', isCorrect: false, feedback: 'A count would tell you how many words share a prefix, but not whether a word ends at exactly this node. You need a boolean: is this node a valid word endpoint?' },
        { label: 'An end-of-word flag at terminal nodes', isCorrect: true },
        { label: 'The full word string stored at each leaf', isCorrect: false, feedback: 'Storing the full word at leaves wastes the prefix-sharing benefit of a trie and doesn\'t help with intermediate nodes. A single boolean flag is_end is sufficient and efficient.' },
      ],
      correctFeedback: 'The is_end flag distinguishes "app" (is_end=True) from "apple" (is_end=True only at the "e" node). Without it, every prefix of every inserted word would incorrectly match.',
      wrongFeedback: [
        '"app" and "apple" share the same first three trie nodes. How do you distinguish searching for "app" versus searching for "apple"?',
        'You need to know whether the pattern\'s last character lands on a node that marks a complete word. That\'s what is_end tracks.',
      ],
    },
    {
      id: 'call-volume',
      highlight: { location: 'constraint', text: 'At most 10⁴ calls total' },
      question: 'Call-volume constraints tell you the complexity budget every operation must fit inside. At most 10⁴ calls total. How does this bound influence your design choices?',
      options: [
        { label: 'Pre-sort all words for faster search', isCorrect: false, feedback: 'Sorting helps binary search over a list, but a trie already achieves O(L) search per query without sorting. Sorting adds O(n log n) work that the trie does not need.' },
        { label: 'Each operation should run in O(L) time, not O(total words)', isCorrect: true },
        { label: 'Cache all search results to avoid repeated work', isCorrect: false, feedback: 'Caching can help if the same query repeats, but with 10⁴ distinct possible queries and wildcards, a cache doesn\'t help systematically. The trie already makes each search O(L).' },
        { label: '10⁴ calls is too many for a character-by-character search structure', isCorrect: false, feedback: '10⁴ calls at O(L) per call is 10⁴ × 25 = 250,000 operations — very fast. The trie handles this comfortably; 10⁴ is not a warning, it\'s a confirmation that O(L) is acceptable.' },
      ],
      correctFeedback: 'With 10⁴ calls and words up to length 25, each trie operation touches at most 25 nodes. Total work is bounded at 250,000 node visits — well within limits.',
      wrongFeedback: [
        'If each search scanned all stored words, 10⁴ searches over 10⁴ words is 100 million comparisons. What complexity does the trie achieve instead?',
        'A trie search follows one path of length L — the word length — not a path proportional to the number of stored words.',
      ],
    },
  ],
  solutionCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def add_word(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word):
        def dfs(node, i):
            if i == len(word):
                return node.is_end
            ch = word[i]
            if ch == '.':
                for child in node.children.values():
                    if dfs(child, i + 1):
                        return True
                return False
            if ch not in node.children:
                return False
            return dfs(node.children[ch], i + 1)

        return dfs(self.root, 0)`,
  solutionComplexity: { time: 'O(L) per addWord, O(26^d) worst case per search', space: 'O(n · L)' },
  solutionCaveat: 'A <code>\'.\'</code> in the search pattern fans the DFS out across <code>every</code> child at that position rather than following a single path — so a pattern with many dots can, in the worst case, explore a large portion of the trie, even though a pattern with no dots resolves in a single O(L) walk.',
  solutionExplanation: 'Storing every added word character-by-character in a shared tree means words with common prefixes (like "bad" and "dad" sharing no prefix, or "bad" and "bat" sharing "ba") never duplicate storage, and an <code>is_end</code> flag at each node is what distinguishes a complete stored word from merely a prefix of a longer one. Searching a pattern with a literal character follows exactly one child pointer, while a <code>\'.\'</code> branches into every available child and recursively tries each — succeeding if any branch reaches the end of the pattern on a node marked <code>is_end</code>.',
}
