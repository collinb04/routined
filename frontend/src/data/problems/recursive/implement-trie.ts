export default {
  id: 'implement-trie',
  title: 'Implement Trie (Prefix Tree)',
  difficulty: 'medium',
  description: 'Implement a trie (prefix tree) supporting <code>insert(word)</code>, <code>search(word)</code>, and <code>startsWith(prefix)</code>. <code>search</code> returns true only if the exact word was inserted; <code>startsWith</code> returns true if any inserted word has that prefix.',
  examples: [
    { input: 'insert("apple"), search("apple"), search("app"), startsWith("app"), insert("app"), search("app")', output: '[null, true, false, true, null, true]' },
  ],
  constraints: ['1 ≤ word.length ≤ 2000', 'Only lowercase English letters', 'At most 3 × 10⁴ total calls'],
  starterCode: `class TrieNode:
  def __init__(self):
      self.children = {}
      self.is_end = False

class Trie:
  def __init__(self):
      self.root = TrieNode()

  def insert(self, word):
      pass

  def search(self, word):
      pass

  def starts_with(self, prefix):
      pass`,
  functionName: 'Trie',
  conceptId: 'tries',
  testCases: [
    { label: 'Insert and search', args: [['insert','search','search','startsWith','insert','search'],['apple','apple','app','app','app','app']], expected: [null,true,false,true,null,true] },
    { label: 'Prefix check', args: [['insert','startsWith','search'],['hello','hel','hel']], expected: [null,true,false] },
  ],
  clues: [
    {
      id: 'search-vs-startswith',
      question: 'search("app") returns false after inserting only "apple", but startsWith("app") returns true. What is the structural difference between the two operations?',
      options: [
        { label: 'search checks length; startsWith does not', isCorrect: false, feedback: 'Both operations traverse the trie character by character — length is implicit in that traversal. The difference is what you check at the final node: is_end for search, mere existence for startsWith.' },
        { label: 'search requires is_end=True at the last character; startsWith only requires the path to exist', isCorrect: true },
        { label: 'startsWith stores words in reverse order', isCorrect: false, feedback: 'Both insert and search traverse the trie in forward character order. Reversing words would break insert/search consistency. The distinction is only the is_end check at the terminal node.' },
        { label: 'search uses DFS; startsWith uses BFS', isCorrect: false, feedback: 'Both operations follow a single linear path through the trie — one node per character. Neither requires DFS or BFS; the path is determined character by character.' },
      ],
      correctFeedback: '"app" and "apple" share the first three nodes. After inserting "apple", the node at "p" has is_end=False. startsWith("app") returns True because the path exists; search("app") returns False because is_end is False at that node.',
      wrongFeedback: [
        'After inserting "apple", the nodes a→p→p→l→e all exist. search("app") stops at the second "p". What must be true at that node for an exact match?',
        'The is_end flag marks where a complete word ends. search checks is_end at the last traversed node; startsWith only checks that the path exists at all.',
      ],
    },
    {
      id: 'node-children-structure',
      question: 'Words contain only lowercase English letters. How many children can each trie node have at most?',
      options: [
        { label: 'As many as the longest word (up to 2000)', isCorrect: false, feedback: 'The length of words determines the depth of the trie, not the branching factor of a single node. Each node branches on the next character — and there are exactly 26 lowercase letters.' },
        { label: '26 — one per lowercase letter', isCorrect: true },
        { label: '2 — like a binary tree', isCorrect: false, feedback: 'A binary tree branches on two options. A trie branches on characters — up to 26 for lowercase English. That is why the starter code uses a dictionary (or array of size 26) for children.' },
        { label: 'Unlimited — depends on how many words are inserted', isCorrect: false, feedback: 'The number of inserted words affects how many children are populated, not the maximum possible. The alphabet size (26) sets the hard cap on children per node.' },
      ],
      correctFeedback: 'Each node maps a character to a child node — at most 26 entries. Using a dict means only populated children consume space; an array of size 26 gives O(1) child access.',
      wrongFeedback: [
        'A trie node branches based on what comes next in the word. How many distinct "next characters" are possible given only lowercase letters?',
        'The 26-letter alphabet means each node has at most 26 children, one per possible next character. The starter code\'s children = {} represents this.',
      ],
    },
    {
      id: 'call-volume-complexity',
      question: 'At most 3 × 10⁴ calls, words up to length 2000. What is the time complexity of each insert or search call?',
      options: [
        { label: 'O(total words inserted)', isCorrect: false, feedback: 'A trie lookup follows one path of length L — the word length — regardless of how many words are stored. It never scans other branches.' },
        { label: 'O(L) where L is the word length', isCorrect: true },
        { label: 'O(L × total calls)', isCorrect: false, feedback: 'Each call independently traverses L nodes. The total calls bound (3 × 10⁴) determines total work across all calls, but each individual call is O(L) on its own.' },
        { label: 'O(26^L) due to branching', isCorrect: false, feedback: 'The branching factor applies to a full trie traversal of all paths, not a single lookup. Searching for a specific word follows exactly one path of length L — one character determines one direction at each node.' },
      ],
      correctFeedback: 'Each insert or search visits exactly L nodes — one per character. With 3 × 10⁴ calls and L ≤ 2000, worst-case total work is 3 × 10⁴ × 2000 = 60 million node visits — well within limits.',
      wrongFeedback: [
        'During insert("apple"), how many trie nodes do you create or traverse? Does it depend on how many other words exist in the trie?',
        'You follow one path: one node per character. That\'s O(L) per call, independent of how many words are already stored.',
      ],
    },
    {
      id: 'shared-prefix-space',
      question: '"apple" and "app" share the prefix "app". How does a trie store this compared to a hash set of full words?',
      options: [
        { label: 'The trie duplicates "app" nodes for each word', isCorrect: false, feedback: 'Sharing prefixes is the whole point of a trie. The nodes for "a", "p", "p" are created once and reused by both "app" and "apple" — no duplication.' },
        { label: 'The trie shares the first 3 nodes between both words', isCorrect: true },
        { label: 'A hash set is more space-efficient than a trie', isCorrect: false, feedback: 'A hash set stores each complete word as a separate string. With many words sharing prefixes (like a dictionary), a trie can be far more space-efficient than storing every word independently.' },
        { label: 'The trie stores words in sorted order for faster lookup', isCorrect: false, feedback: 'A trie does not sort words — it decomposes them into characters. The prefix-sharing benefit is space and lookup efficiency, not sorted ordering.' },
      ],
      correctFeedback: 'Nodes a→p→p exist once and are shared. "app" sets is_end=True at the second "p"; "apple" extends the path with l→e. This prefix sharing is the key space advantage of a trie over a hash set.',
      wrongFeedback: [
        'If you insert "apple" first, what nodes exist? When you later insert "app", do you create new nodes for "a", "p", "p"?',
        'You traverse existing nodes and only create new ones where the path diverges. "app" reuses the first three nodes already created by "apple" and marks the end there.',
      ],
    },
  ],
}
