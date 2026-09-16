export default {
  id: 'zigzag-conversion',
  title: 'ZigZag Conversion',
  difficulty: 'medium',
  description: 'The string "PAYPALISHIRING" written in a zigzag pattern on a given number of rows looks like a zigzag. Return the string read line by line.',
  examples: [
    { input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"', explanation: 'P A H N / A P L S I I G / Y I R read row by row.' },
    { input: 's = "PAYPALISHIRING", numRows = 4', output: '"PINALSIGYAHRPI"' },
  ],
  constraints: ['1 ≤ s.length ≤ 1000', 's consists of English letters, \',\' and \'.\'', '1 ≤ numRows ≤ 1000'],
  starterCode: `class Solution:
    def convert(self, s, num_rows):
        pass`,
  runnerSetup: 'convert = Solution().convert',
  functionName: 'convert',
  conceptId: 'strings',
  testCases: [
    { label: '3 rows', args: ['PAYPALISHIRING',3], expected: 'PAHNAPLSIIGYIR' },
    { label: '4 rows', args: ['PAYPALISHIRING',4], expected: 'PINALSIGYAHRPI' },
    { label: '1 row', args: ['A',1], expected: 'A' },
  ],
  bruteHint: 'A brute-force approach builds the actual zigzag as a full numRows × n grid, placing each character at its computed row and column, then reads the filled cells row by row to assemble the answer. This grid takes O(numRows × n) space even though at most one row is ever touched per character, leaving most of the grid empty. With s up to 1000 characters and numRows up to 1000, how much space is wasted here compared to only keeping numRows growing strings?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'simulate-with-row-buckets',
      question: 'When a problem describes a physical layout, look for an approach that mirrors that layout directly rather than deriving a formula. Characters are placed row by row in a zigzag, then read back row by row. What approach models this directly?',
      options: [
        { label: 'Compute the output index of each character mathematically', isCorrect: false, feedback: 'A direct index formula works but is complex to derive correctly for each row. Simulating the zigzag with row buckets is simpler: assign each character to the row it lands in, then concatenate.' },
        { label: 'Maintain one string per row and append characters as you traverse', isCorrect: true },
        { label: 'Sort characters by their zigzag position', isCorrect: false, feedback: 'Sorting requires computing zigzag positions first, which is the hard part. Simulating the traversal directly assigns characters to rows without sorting.' },
        { label: 'Split the string into chunks of size numRows', isCorrect: false, feedback: 'Chunking by numRows does not account for the diagonal (upward) phase of the zigzag. Characters at the diagonal land in different rows than a simple chunk would place them.' },
      ],
      correctFeedback: 'Create numRows empty strings. Walk s with a current row index and a direction (+1 or -1). Append each character to its row bucket, then concatenate all buckets.',
      wrongFeedback: [
        'Imagine physically writing each character into one of numRows rows as you zigzag down and back up. How would you record which row each character lands in?',
        'One list/string per row. A pointer starts at row 0, moves down to row numRows-1, then reverses upward. Append each character to the current row and flip direction at the boundaries.',
      ],
    },
    {
      id: 'direction-reversal',
      question: 'Getting the traversal logic right depends on pinpointing the exact trigger for each state change. The zigzag goes down then up, repeating. When does the direction reverse?',
      options: [
        { label: 'Every numRows characters', isCorrect: false, feedback: 'Direction reverses at the boundary rows (0 and numRows-1), not after a fixed count of characters. The period is 2 × (numRows - 1) characters, but the reversal point is determined by the row index.' },
        { label: 'When the current row reaches 0 or numRows - 1', isCorrect: true },
        { label: 'When the current row equals numRows // 2', isCorrect: false, feedback: 'The midpoint is not a reversal point — it is just another row in the downward or upward phase. Reversal only happens at the top (row 0) and bottom (row numRows-1).' },
        { label: 'After processing every character in a row', isCorrect: false, feedback: 'Rows are not filled sequentially — only one character is appended per row as you traverse. The traversal is character by character, not row by row.' },
      ],
      correctFeedback: 'When current_row == 0, set direction to +1 (going down). When current_row == numRows - 1, set direction to -1 (going up). Each character advances the row by direction before the next append.',
      wrongFeedback: [
        'You traverse rows 0, 1, 2, ..., numRows-1, numRows-2, ..., 1, 0, 1, ... What triggers each direction flip?',
        'The row pointer bounces between 0 and numRows-1. When it hits either boundary, flip the sign of the step (+1 or -1). That is the only time direction changes.',
      ],
    },
    {
      id: 'single-row-edge-case',
      question: 'Edge cases at the boundaries of the input constraints often reveal whether your general approach still holds. 1 ≤ numRows ≤ 1000. What happens when numRows = 1?',
      highlight: { location: 'constraint', text: '1 ≤ numRows ≤ 1000' },
      options: [
        { label: 'The zigzag has no diagonals — return s unchanged', isCorrect: true },
        { label: 'The output is the reverse of s', isCorrect: false, feedback: 'With one row, every character lands in row 0 in the original order. No reversal occurs — the output equals the input.' },
        { label: 'Divide by zero when computing the period', isCorrect: false, feedback: 'The simulation approach (row buckets + direction) handles numRows = 1 naturally: the direction never flips because the boundary rows 0 and 0 are the same, so every character goes to row 0.' },
        { label: 'The output is a single character per row', isCorrect: false, feedback: 'With numRows = 1, there is only one row and all characters are in it. The output is the entire string in its original order.' },
      ],
      correctFeedback: 'With numRows = 1, the direction pointer stays at row 0 for every character. Concatenating the single row bucket gives back the original string.',
      wrongFeedback: [
        'With only one row, where does every character go? What does the output look like?',
        'All characters land in row 0 — no zigzag happens. Guard against numRows = 1 before the simulation, or let the simulation handle it naturally (direction stays fixed at row 0).',
      ],
    },
  ],
  solutionCode: `class Solution:
    def convert(self, s, num_rows):
        if num_rows == 1:
            return s
        rows = [''] * num_rows
        cur_row = 0
        direction = -1
        for ch in s:
            rows[cur_row] += ch
            if cur_row == 0 or cur_row == num_rows - 1:
                direction = -direction
            cur_row += direction
        return ''.join(rows)`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'Flipping <code>direction</code> whenever the current row hits either the top (0) or the bottom (<code>num_rows - 1</code>) is what produces the actual "bounce" of a zigzag — a single-direction walk down and back up, rather than needing to compute each character\'s exact (row, column) coordinates in a full grid.',
  solutionExplanation: 'A character\'s row only ever needs to bounce back and forth between 0 and <code>num_rows - 1</code>, so tracking just the current row and a direction (+1 or -1) reproduces the zigzag path without ever building the 2D grid it visually represents. Appending each character directly onto a small array of growing strings — one per row — means the final answer is just those rows concatenated top to bottom, in O(n) time using only O(n) space for the output itself.',
}
