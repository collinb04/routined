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
  starterCode: `def convert(s, num_rows):
  pass`,
  functionName: 'convert',
  conceptId: 'strings',
  testCases: [
    { label: '3 rows', args: ['PAYPALISHIRING',3], expected: 'PAHNAPLSIIGYIR' },
    { label: '4 rows', args: ['PAYPALISHIRING',4], expected: 'PINALSIGYAHRPI' },
    { label: '1 row', args: ['A',1], expected: 'A' },
  ],
  bruteHint: 'Describe simulating the full 2D zigzag grid and reading it off afterward, and its space cost',
  optimizeHint: 'Name the technique that appends each character to one of numRows buffers in a single pass, tracking direction',
  clues: [
    {
      id: 'simulate-with-row-buckets',
      question: 'Characters are placed row by row in a zigzag, then read back row by row. What approach models this directly?',
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
      question: 'The zigzag goes down then up, repeating. When does the direction reverse?',
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
      question: '1 ≤ numRows ≤ 1000. What happens when numRows = 1?',
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
}
