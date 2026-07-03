export default {
  id: 'roman-to-integer',
  title: 'Roman to Integer',
  difficulty: 'easy',
  description: 'Given a Roman numeral string, convert it to an integer. Roman numerals use the subtractive notation (e.g., IV = 4, IX = 9). Symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.',
  examples: [
    { input: 's = "III"', output: '3' },
    { input: 's = "LVIII"', output: '58', explanation: 'L=50, V=5, III=3.' },
    { input: 's = "MCMXCIV"', output: '1994', explanation: 'M=1000, CM=900, XC=90, IV=4.' },
  ],
  constraints: ['1 ≤ s.length ≤ 15', 's contains only valid Roman numeral characters', 'The integer is in the range [1, 3999]'],
  starterCode: `def roman_to_int(s):
  pass`,
  functionName: 'roman_to_int',
  conceptId: 'math-geometry',
  testCases: [
    { label: 'III', args: ['III'], expected: 3 },
    { label: 'LVIII', args: ['LVIII'], expected: 58 },
    { label: 'MCMXCIV', args: ['MCMXCIV'], expected: 1994 },
    { label: 'IX', args: ['IX'], expected: 9 },
  ],
}
