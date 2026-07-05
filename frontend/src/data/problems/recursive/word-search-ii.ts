export default {
  id: 'word-search-ii',
  title: 'Word Search II',
  difficulty: 'hard',
  description: 'Given an <code>m × n</code> board of characters and a list of strings <code>words</code>, return all words on the board. Each word must be formed by sequentially adjacent cells (horizontally or vertically), and cells cannot be reused.',
  examples: [
    { input: 'board=[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words=["oath","pea","eat","rain"]', output: '["eat","oath"]' },
  ],
  constraints: ['1 ≤ m, n ≤ 12', '1 ≤ words.length ≤ 3 × 10⁴', 'All inputs consist of lowercase English letters'],
  starterCode: `def find_words(board, words):
  pass`,
  functionName: 'find_words',
  conceptId: 'tries',
  testCases: [
    { label: 'Standard board', args: [[['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']],['oath','pea','eat','rain']], expected: ['eat','oath'] },
    { label: 'Single cell', args: [[['a']],['a']], expected: ['a'] },
    { label: 'No matches', args: [[['a','b'],['c','d']],['xyz']], expected: [] },
  ],
  clues: [
    {
      id: 'constraint-many-words',
      question: 'words.length can be up to 3 × 10⁴. Why does running a separate DFS for each word become prohibitively expensive?',
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
      question: '"words.length ≤ 3 × 10⁴" combined with a 12 × 12 board. What data structure turns repeated word lookups into a single traversal?',
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
      question: '"The same cell may not be used more than once." How do you enforce this during DFS?',
      options: [
        { label: 'Copy the board at each recursive call', isCorrect: false, feedback: 'Copying a 12 × 12 board at every DFS step creates O(m × n) extra memory per level of recursion. Marking the current cell in place and restoring it on backtrack is the standard approach.' },
        { label: 'Mark the cell in place and restore on backtrack', isCorrect: true },
        { label: 'Keep a global visited set and never remove entries', isCorrect: false, feedback: 'A global visited set that never removes entries would prevent the same cell from being used in any future word — even after backtracking to a completely different path. Cells must be available again once the current path abandons them.' },
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
      question: 'Once a word is found, what optimization prevents finding it again?',
      options: [
        { label: 'Remove the word from the trie after finding it', isCorrect: true },
        { label: 'Add the word to a visited-words set and check before adding to results', isCorrect: false, feedback: 'Checking a visited set prevents duplicates in results, but the DFS still explores paths that lead to already-found words. Removing from the trie prunes those paths entirely, saving traversal work.' },
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
}
