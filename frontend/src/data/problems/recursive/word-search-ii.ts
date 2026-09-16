export default {
  id: 'word-search-ii',
  title: 'Word Search II',
  difficulty: 'hard',
  description: 'Given an <code>m × n</code> board of characters and a list of strings <code>words</code>, return all words on the board. Each word must be formed by sequentially adjacent cells (horizontally or vertically), and cells cannot be reused.',
  examples: [
    { input: 'board=[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words=["oath","pea","eat","rain"]', output: '["eat","oath"]' },
  ],
  constraints: ['1 ≤ m, n ≤ 12', '1 ≤ words.length ≤ 3 × 10⁴', 'All inputs consist of lowercase English letters'],
  starterCode: `class Solution:
    def find_words(self, board, words):
        pass`,
  functionName: 'find_words_run',
  conceptId: 'tries',
  runnerSetup: `def find_words_run(board, words):
  return sorted(Solution().find_words(board, words))`,
  testCases: [
    { label: 'Standard board', args: [[['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']],['oath','pea','eat','rain']], expected: ['eat','oath'] },
    { label: 'Single cell', args: [[['a']],['a']], expected: ['a'] },
    { label: 'No matches', args: [[['a','b'],['c','d']],['xyz']], expected: [] },
  ],
  bruteHint: 'The brute-force approach runs a separate DFS over the entire m × n board for every single word in the dictionary, checking whether that one word can be traced out through adjacent cells. With up to 3 × 10⁴ words, each triggering its own O(m · n · 4^L) traversal, the same cells and shared prefixes get explored again and again for words that overlap. How could you combine all the words into one shared structure so a single pass over the board checks all of them at once?',
  optimizeComplexity: { time: 'O(m · n · 4^L)', space: 'O(total trie characters)' },
  clues: [
    {
      id: 'constraint-many-words',
      question: 'A large input size on one dimension of the problem, here the word count, often reveals that a naive per-item approach will not scale, even if each individual operation looks cheap. words.length can be up to 3 × 10⁴. Why does running a separate DFS for each word become prohibitively expensive?',
      highlight: { location: 'constraint', text: '1 ≤ words.length ≤ 3 × 10⁴' },
      options: [
        { label: 'Each DFS is O(n) — 30,000 × n is still linear', isCorrect: false, feedback: 'Each DFS on a 12 × 12 board is O(m × n × 4^L) where L is word length. With 30,000 words that is up to 30,000 separate board sweeps — far from linear.' },
        { label: 'You would repeat the same board traversal 30,000 times', isCorrect: true },
        { label: 'DFS cannot handle multiple words simultaneously', isCorrect: false, feedback: 'DFS can handle multiple words — it just does so inefficiently when run independently for each word. The issue is repeated work, not a capability gap.' },
        { label: 'The board is too small for 30,000 words', isCorrect: false, feedback: 'Board size and word count are independent constraints. The problem is that 30,000 independent board sweeps is wasteful, not that the board is undersized.' },
      ],
      correctFeedback: 'Running one DFS per word means traversing the 12 × 12 board up to 30,000 times independently. A trie lets a single DFS match all words simultaneously — shared prefixes are explored once instead of once per word.',
      wrongFeedback: [
        'Imagine 30,000 words that all start with "a". With separate DFS calls, how many times do you explore paths from every "a" cell on the board?',
        'Words that share a prefix ("cat", "cats", "catch") would each trigger a full board DFS independently. What structure lets you explore that shared prefix just once?',
      ],
    },
    {
      id: 'trie-for-prefix-sharing',
      question: 'When constraints hint that many similar items will be searched together, the right shared data structure can turn repeated work into a single pass. "words.length ≤ 3 × 10⁴" combined with a 12 × 12 board. What data structure turns repeated word lookups into a single traversal?',
      highlight: { location: 'constraint', text: '1 ≤ m, n ≤ 12' },
      options: [
        { label: 'A hash set of all words', isCorrect: false, feedback: 'A hash set checks exact matches in O(1), but during DFS you are building a word character by character. A set cannot tell you whether the current prefix is worth continuing — it only confirms complete words.' },
        { label: 'A trie built from all words', isCorrect: true },
        { label: 'A sorted list of words with binary search', isCorrect: false, feedback: 'Binary search finds a complete word in O(log n), but it cannot efficiently answer "is this prefix a valid start of any word?" A trie supports prefix queries in O(prefix length).' },
        { label: 'A dictionary mapping first letter to words', isCorrect: false, feedback: 'Grouping by first letter reduces scope but still requires scanning all words sharing that letter at each step. A trie extends this to all prefix lengths, not just the first character.' },
      ],
      correctFeedback: 'A trie indexes all 30,000 words by their shared prefixes. During DFS, you walk the trie in lockstep with the board. When a board path stops matching any trie prefix, you prune immediately — one traversal, all words.',
      wrongFeedback: [
        'You need to know two things during DFS: "is this a complete word?" and "should I keep going from here?" Which structure answers both questions efficiently?',
        'A trie lets you ask at every step: "do any words continue with this character?" That is the pruning signal. A set only answers "is this a complete word?"',
      ],
    },
    {
      id: 'visited-cells',
      question: 'Constraints on reusing elements within a single path, but not across paths, usually point to a lightweight, reversible way of tracking state rather than a persistent one. "The same cell may not be used more than once." How do you enforce this during DFS?',
      highlight: { location: 'description', text: 'cells cannot be reused.' },
      options: [
        { label: 'Copy the board at each recursive call', isCorrect: false, feedback: 'Copying a 12 × 12 board at every DFS step creates O(m × n) extra memory per level of recursion. Marking the current cell in place and restoring it on backtrack is the standard approach.' },
        { label: 'Mark the cell in place and restore on backtrack', isCorrect: true },
        { label: 'Keep a single shared collection of visited cells that is never cleared', isCorrect: false, feedback: 'A global visited set that never removes entries would prevent the same cell from being used in any future word — even after backtracking to a completely different path. Cells must be available again once the current path abandons them.' },
        { label: 'Only allow left and down moves to avoid revisiting', isCorrect: false, feedback: 'Restricting to left and down moves prevents valid words that require right or up steps. The path can go in any of the four directions — you must explicitly track which cells are in the current path.' },
      ],
      correctFeedback: 'Temporarily replace board[r][c] with a sentinel (e.g., "#") when you enter a cell. Restore the original character when you backtrack. This marks the cell as used for the current path without affecting other paths.',
      wrongFeedback: [
        'You need a cell to be "used" within the current path but "available" once you backtrack past it. How do you achieve that?',
        'The mark must be temporary — tied to the current path, not permanent. What is the standard technique for temporary marking during DFS backtracking?',
      ],
    },
    {
      id: 'pruning-found-words',
      question: 'Once you have already found what you were looking for, the next signal to look for is how to stop the search from wasting time finding it again. Once a word is found, what optimization prevents finding it again?',
      options: [
        { label: 'Delete the matched word from the shared search structure once it has been found', isCorrect: true },
        { label: 'Keep a separate collection of already-found words and check it before adding to results', isCorrect: false, feedback: 'Checking a visited set prevents duplicates in results, but the DFS still explores paths that lead to already-found words. Removing from the trie prunes those paths entirely, saving traversal work.' },
        { label: 'Track found words in results and skip duplicates at the end', isCorrect: false, feedback: 'Post-processing removes duplicates but does nothing to prevent the DFS from exploring paths to words already found. Trie pruning stops those paths before they start.' },
        { label: 'No optimization needed — duplicates are impossible given unique words', isCorrect: false, feedback: 'The same word can appear multiple times on the board. Without marking it as found in the trie, the DFS would add it to results once per board occurrence.' },
      ],
      correctFeedback: 'After adding a word to results, delete its end-of-word marker from the trie. This prevents the same word from being found again at a different board location, avoiding duplicate results without an extra visited set.',
      wrongFeedback: [
        'The same word can appear multiple times on the board. Without any tracking, you might add it to results more than once. What trie modification prevents this?',
        'Removing the word from the trie after finding it serves two purposes: it prevents duplicates and prunes future DFS paths toward that word. Where in the trie should you make this change?',
      ],
    },
  ],
  solutionCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None

class Solution:
    def find_words(self, board, words):
        root = TrieNode()
        for word in words:
            node = root
            for ch in word:
                node = node.children.setdefault(ch, TrieNode())
            node.word = word

        m, n = len(board), len(board[0])
        result = []

        def dfs(r, c, node):
            ch = board[r][c]
            if ch not in node.children:
                return
            child = node.children[ch]
            if child.word:
                result.append(child.word)
                child.word = None
            board[r][c] = '#'
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and board[nr][nc] != '#':
                    dfs(nr, nc, child)
            board[r][c] = ch

        for r in range(m):
            for c in range(n):
                dfs(r, c, root)
        return result`,
  solutionComplexity: { time: 'O(m · n · 4^L)', space: 'O(total trie characters)' },
  solutionCaveat: 'Once a word is found, its <code>word</code> marker is cleared (<code>child.word = None</code>) right there in the shared trie — this doesn\'t just prevent duplicate results if the same word appears at another board location, it also prunes future DFS paths, since the search no longer needs to keep pursuing a complete match it has already recorded.',
  solutionExplanation: 'Building one trie from all the dictionary words lets a single DFS pass over the board check every word simultaneously — walking the trie in lockstep with the board means shared prefixes across many words (like "cat" and "cats") are explored together instead of once per word, which is what collapses what would be thousands of independent board sweeps into one. Marking the current cell with a sentinel during the DFS and restoring it afterward enforces "no cell reused within one path" exactly the way plain Word Search does, and the trie walk itself naturally prunes any board path the instant it no longer matches any word\'s prefix.',
}
