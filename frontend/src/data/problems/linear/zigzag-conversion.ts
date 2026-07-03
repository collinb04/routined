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
}
