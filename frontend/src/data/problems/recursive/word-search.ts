export default {
  id: 'word-search',
  title: 'Word Search',
  difficulty: 'medium',
  description: `<p>Given an <code>m x n</code> grid of characters <code>board</code> and a string <code>word</code>, return <code>true</code> if <code>word</code> exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same cell may not be used more than once.</p>`,
  examples: [
    { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
    { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false' },
  ],
  constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15'],
  starterCode: `class Solution:
    def exist(self, board, word):
        pass`,
  runnerSetup: 'exist = Solution().exist',
  functionName: 'exist',
  conceptId: 'backtracking',
  testCases: [
    { label: 'ABCCED', args: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCCED'], expected: true },
    { label: 'ABCB false', args: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCB'], expected: false },
  ],
  bruteHint: 'The brute-force approach launches a fresh DFS from every cell on the board, matching the target word character by character along each path of adjacent cells. Each search branches up to 4 ways at every step, so the worst-case cost is bounded by O(m · n · 4^L), where L is the length of the word. Once the next character along a path fails to match, is there any reason to keep exploring further down that branch?',
  optimizeComplexity: { time: 'O(m · n · 4^L)', space: 'O(L)' },
  clues: [
    {
      id: 'constraint-board-size',
      question: 'Small input bounds are a direct hint at which worst-case complexity the intended solution is allowed to have. m, n ≤ 6 and word.length ≤ 15. What does this small size say about the acceptable complexity?',
      highlight: { location: 'constraint', text: '1 <= m, n <= 6' },
      options: [
        { label: 'Only O(m × n) solutions are acceptable', isCorrect: false, feedback: 'With a 6 × 6 board and word length 15, O(m × n × 4^L) DFS is at most 36 × 4^15 ≈ 36 billion — actually tight. In practice, backtracking prunes most branches early, making it feasible.' },
        { label: 'Backtracking with early pruning is sufficient', isCorrect: true },
        { label: 'O(n!) enumeration of all paths is feasible', isCorrect: false, feedback: 'O(n!) for n = 36 cells is astronomically large. Backtracking prunes dead branches early — it does not enumerate all permutations of cells.' },
        { label: 'A hash map of all possible paths solves it in O(1)', isCorrect: false, feedback: 'Precomputing all paths would require storing up to 4^15 sequences — far too many. Backtracking explores paths on demand and stops as soon as a mismatch occurs.' },
      ],
      correctFeedback: 'The 6 × 6 board has 36 cells. DFS from each cell explores at most 4^15 paths in theory, but backtracking prunes mismatches immediately. In practice, the constraint is tight but the pruning makes it work.',
      wrongFeedback: [
        'How does early pruning change the effective search space? If the first character doesn\'t match, how many paths do you skip?',
        'Backtracking stops exploring a path the moment the current character doesn\'t match. How does that bound the actual work compared to the theoretical worst case?',
      ],
    },
    {
      id: 'no-cell-reuse',
      question: 'A rule against reusing elements within a single path is usually meant to be enforced with minimal extra memory, not a brand-new data structure. "The same cell may not be used more than once." How do you enforce this without extra space overhead?',
      highlight: { location: 'description', text: 'The same cell may not be used more than once.' },
      options: [
        { label: 'Keep a separate boolean visited matrix', isCorrect: false, feedback: 'A boolean matrix works correctly but adds O(m × n) extra space. Marking the board cell in place and restoring it on backtrack achieves the same result with O(1) extra space per step.' },
        { label: 'Temporarily overwrite the cell and restore on backtrack', isCorrect: true },
        { label: 'Only move right and down to avoid revisiting', isCorrect: false, feedback: 'Restricting movement direction prevents valid words that require going up or left. The word can snake in any direction — you must track which cells are currently in use, not restrict direction.' },
        { label: 'Record the path and check it before each move', isCorrect: false, feedback: 'Checking the entire path list before each move is O(path length) per step. In-place marking is O(1) — just check if the cell is the sentinel character.' },
      ],
      correctFeedback: 'Replace board[r][c] with a sentinel (e.g., "#") when entering a cell, and restore the original character when backtracking. This prevents revisiting within the current path at O(1) cost per step.',
      wrongFeedback: [
        'You need to mark cells as "in use" for the current path but "available again" after backtracking. Where is the most direct place to record that information?',
        'The board itself is mutable. What temporary change makes a cell unvisitable, and when do you undo it?',
      ],
    },
    {
      id: 'output-boolean-early-exit',
      question: 'A yes or no output is a strong signal that you do not need to explore exhaustively, since you can stop the instant the answer is decided. The output is a single boolean. What does this let you do as soon as you find a valid path?',
      highlight: { location: 'description', text: 'return <code>true</code> if <code>word</code> exists in the grid.' },
      options: [
        { label: 'Continue searching to confirm no other paths exist', isCorrect: false, feedback: 'The output only requires knowing whether any path exists — not all paths. Continuing after finding one is unnecessary work.' },
        { label: 'Return true immediately and stop all recursion', isCorrect: true },
        { label: 'Store the path and return it with the boolean', isCorrect: false, feedback: 'The output is a boolean, not the path itself. Storing the path does extra work that the problem does not require.' },
        { label: 'Restart DFS from a different starting cell to verify', isCorrect: false, feedback: 'One valid path is sufficient — there is no verification step. Return true immediately when the last character of the word is matched.' },
      ],
      correctFeedback: 'Once you match the last character of the word, return true. This propagates up through all recursive calls immediately. No need to continue searching — existence is confirmed.',
      wrongFeedback: [
        'The output asks whether any valid path exists. How many valid paths do you need to find?',
        'One match is conclusive. How does returning true from deep in the recursion propagate the answer back to the caller?',
      ],
    },
    {
      id: 'starting-cell-search',
      question: 'When a problem does not pin down where a solution must begin, that absence of a constraint is itself a signal that you need to consider every possible starting point. The word can start at any cell. What does this imply about how you initiate the search?',
      options: [
        { label: 'Start DFS only from the top-left corner', isCorrect: false, feedback: 'The word can start anywhere on the board. Starting only from (0, 0) would miss words that begin at any other cell.' },
        { label: 'Try DFS from every cell as a potential starting point', isCorrect: true },
        { label: 'Sort cells by character and start from the matching one', isCorrect: false, feedback: 'Multiple cells may match the first character. You must try all of them — sorting selects one, which could miss valid starting positions.' },
        { label: 'Only start from cells on the board perimeter', isCorrect: false, feedback: 'Words can begin at any interior cell, not just the perimeter. A cell in the middle of the board is a valid starting point.' },
      ],
      correctFeedback: 'You iterate over every (row, col) and launch DFS from any cell whose character matches word[0]. Returning true from any of these launches short-circuits the outer loop immediately.',
      wrongFeedback: [
        'The word can start at any position. How many cells could be valid starting points for a word beginning with "A" on a board full of "A"s?',
        'You check every cell as a potential start. As soon as one DFS returns true, what should you do with the remaining starting cells?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def exist(self, board, word):
        m, n = len(board), len(board[0])

        def dfs(r, c, i):
            if i == len(word):
                return True
            if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[i]:
                return False
            temp = board[r][c]
            board[r][c] = '#'
            found = (dfs(r + 1, c, i + 1) or dfs(r - 1, c, i + 1) or
                     dfs(r, c + 1, i + 1) or dfs(r, c - 1, i + 1))
            board[r][c] = temp
            return found

        for r in range(m):
            for c in range(n):
                if dfs(r, c, 0):
                    return True
        return False`,
  solutionComplexity: { time: 'O(m · n · 4^L)', space: 'O(L)' },
  solutionCaveat: 'The original character is saved in <code>temp</code> and restored <code>after</code> all four recursive directions have been tried, not immediately after marking it — restoring too early would let a sibling recursive call revisit the same cell within the same path, violating the no-reuse rule.',
  solutionExplanation: 'Temporarily overwriting the current cell with a sentinel character (<code>\'#\'</code>) that can never match a real board letter is what enforces "no cell reused within a path" at O(1) extra cost per step, instead of paying for a separate boolean visited grid — restoring the original character on the way back out is what makes the cell available again for a completely different path once the current one backtracks past it. Trying every cell as a potential starting point (since the word could begin anywhere) and returning true the instant any one of those DFS searches succeeds is what lets the search stop immediately rather than needlessly checking the remaining candidates.',
}
