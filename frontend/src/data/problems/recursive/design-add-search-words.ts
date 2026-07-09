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
  functionName: 'WordDictionary',
  conceptId: 'tries',
  testCases: [
    { label: 'Wildcard search', args: [['addWord','addWord','addWord','search','search','search','search'],['bad','dad','mad','pad','bad','.ad','b..']], expected: [null,null,null,false,true,true,true] },
  ],
  bruteHint: 'Describe storing every added word in a list and, for each search call, scanning through all of them and comparing characters (including the \'.\' wildcard) one by one',
  optimizeHint: 'Explain how a trie\'s per-character nodes let you match position by position instead of scanning every stored word, and describe how you would explore multiple branches when you hit a \'.\' in the pattern',
  clues: [
    {
      id: 'prefix-sharing-structure',
      question: 'addWord stores words up to length 25, and search needs to match them character by character. What structure fits character-by-character word storage naturally?',
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
      question: 'search("b..") must match any 3-letter word starting with "b". What does the \'.\' wildcard require of your search algorithm?',
      options: [
        { label: 'Backtracking through all children at \'.\' positions', isCorrect: true },
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
      question: 'search("app") should return false if only "apple" was added. What must the trie track beyond just characters?',
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
      question: 'At most 10⁴ calls total. How does this bound influence your design choices?',
      options: [
        { label: 'Pre-sort all words for faster search', isCorrect: false, feedback: 'Sorting helps binary search over a list, but a trie already achieves O(L) search per query without sorting. Sorting adds O(n log n) work that the trie does not need.' },
        { label: 'Each operation should run in O(L) time, not O(total words)', isCorrect: true },
        { label: 'Cache all search results to avoid repeated work', isCorrect: false, feedback: 'Caching can help if the same query repeats, but with 10⁴ distinct possible queries and wildcards, a cache doesn\'t help systematically. The trie already makes each search O(L).' },
        { label: '10⁴ calls is too many for any trie operation', isCorrect: false, feedback: '10⁴ calls at O(L) per call is 10⁴ × 25 = 250,000 operations — very fast. The trie handles this comfortably; 10⁴ is not a warning, it\'s a confirmation that O(L) is acceptable.' },
      ],
      correctFeedback: 'With 10⁴ calls and words up to length 25, each trie operation touches at most 25 nodes. Total work is bounded at 250,000 node visits — well within limits.',
      wrongFeedback: [
        'If each search scanned all stored words, 10⁴ searches over 10⁴ words is 100 million comparisons. What complexity does the trie achieve instead?',
        'A trie search follows one path of length L — the word length — not a path proportional to the number of stored words.',
      ],
    },
  ],
}
