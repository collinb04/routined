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
  clues: [
    {
      id: 'subtractive-notation',
      question: '"IV = 4, IX = 9" — Roman numerals use subtractive notation. What signal does a smaller symbol before a larger one send?',
      options: [
        { label: 'Add both values', isCorrect: false, feedback: 'Adding I + V = 6, not 4. When a smaller value precedes a larger one, the smaller is subtracted, not added.' },
        { label: 'Subtract the smaller from the larger', isCorrect: true },
        { label: 'Skip the smaller symbol entirely', isCorrect: false, feedback: 'Skipping the I in IV would give you 5, not 4. The smaller symbol contributes to the value — it just gets subtracted rather than added.' },
        { label: 'Multiply the two adjacent values', isCorrect: false, feedback: 'I × V = 5, not 4. Roman numeral arithmetic uses only addition and subtraction — never multiplication of adjacent symbols.' },
      ],
      correctFeedback: 'When a smaller value appears immediately before a larger one, subtract the smaller. IV = 5 − 1 = 4, IX = 10 − 1 = 9. All other cases add.',
      wrongFeedback: [
        'In IV, I comes before V. Does that I add to or reduce the total?',
        'The rule: if s[i] < s[i+1], subtract s[i]; otherwise add s[i]. Walk through IX with this rule.',
      ],
    },
    {
      id: 'traversal-strategy',
      question: 'To detect subtractive pairs, you need to compare each symbol to the next one. What traversal is most natural?',
      options: [
        { label: 'Right to left, accumulating', isCorrect: false, feedback: 'Right-to-left works, but it\'s not the most natural framing. Left-to-right lets you peek at the next character to decide add vs. subtract as you go.' },
        { label: 'Left to right, peeking at the next symbol', isCorrect: true },
        { label: 'Sort the symbols by value first', isCorrect: false, feedback: 'Sorting destroys the symbol order, which is exactly the information that encodes the value. "IX" sorted becomes "IX" or "XI" — but only the original order tells you which rule applies.' },
        { label: 'Count each symbol type independently', isCorrect: false, feedback: 'Counting each symbol type gives you the wrong answer for subtractive pairs. "IX" has one I and one X, but counting I + X = 11, not 9 = X − I.' },
      ],
      correctFeedback: 'Left to right: at each position, compare s[i] to s[i+1]. If s[i] < s[i+1], subtract s[i]; otherwise add s[i]. Process the last character without comparison — always add it.',
      wrongFeedback: [
        'To know whether I in "IX" should be added or subtracted, what information do you need?',
        'You need to know the next character to decide the current one\'s sign. Which traversal direction gives you that context most naturally?',
      ],
    },
    {
      id: 'lookup-structure',
      question: 'You need to convert each Roman symbol to its integer value. What is the right data structure for this?',
      options: [
        { label: 'A sorted array of (symbol, value) pairs', isCorrect: false, feedback: 'A sorted array requires O(log k) binary search or O(k) linear scan per symbol. A hash map gives O(1) lookup for the 7 Roman symbols.' },
        { label: 'A hash map from symbol to value', isCorrect: true },
        { label: 'A set of all valid symbols', isCorrect: false, feedback: 'A set tells you whether a symbol is valid — not what its value is. You need symbol → integer mapping, which requires a structure that stores key-value pairs.' },
        { label: 'A counter of each symbol\'s occurrences', isCorrect: false, feedback: 'A counter only tells you how many times each symbol appears, not their positional relationships. "IX" and "XI" have the same counts but different values (9 vs. 11).' },
      ],
      correctFeedback: 'A hash map with 7 entries (I, V, X, L, C, D, M) gives O(1) value lookup. With a string of at most 15 characters, the entire conversion runs in O(1) time and space.',
      wrongFeedback: [
        'You have 7 symbols, each with a fixed integer value. What structure gives you O(1) lookup by key?',
        'You need to look up the integer value for a given character. Which structure maps keys to values in O(1)?',
      ],
    },
  ],
}
