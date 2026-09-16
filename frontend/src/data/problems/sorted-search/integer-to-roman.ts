export default {
  id: 'integer-to-roman',
  title: 'Integer to Roman',
  difficulty: 'medium',
  description: 'Given an integer in the range [1, 3999], convert it to its Roman numeral representation using the standard subtractive notation.',
  examples: [
    { input: 'num = 3', output: '"III"' },
    { input: 'num = 58', output: '"LVIII"' },
    { input: 'num = 1994', output: '"MCMXCIV"' },
  ],
  constraints: ['1 ≤ num ≤ 3999'],
  starterCode: `class Solution:
    def int_to_roman(self, num):
        pass`,
  runnerSetup: 'int_to_roman = Solution().int_to_roman',
  functionName: 'int_to_roman',
  conceptId: 'greedy',
  testCases: [
    { label: '3', args: [3], expected: 'III' },
    { label: '58', args: [58], expected: 'LVIII' },
    { label: '1994', args: [1994], expected: 'MCMXCIV' },
    { label: '4', args: [4], expected: 'IV' },
    { label: '9', args: [9], expected: 'IX' },
  ],
  bruteHint: 'A brute-force approach hardcodes a conditional for each subtractive case — checking whether num falls in the 900s, 400s, 90s, 40s, 9s, or 4s ranges and appending the right symbols by hand. This works, but six special cases multiply the branching logic and are easy to get wrong or leave incomplete. Since num is bounded by a fixed constraint, this still runs in O(1) time — but is there a more uniform structure that avoids hardcoding each case separately?',
  optimizeComplexity: { time: 'O(1)', space: 'O(1)' },
  clues: [
    {
      id: 'subtractive-notation',
      highlight: { location: 'description', text: 'standard subtractive notation' },
      question: 'The description\'s phrasing often signals exactly which notation rules your lookup table must encode. "Standard subtractive notation" — 4 is IV, 9 is IX, 40 is XL. What does this tell you about the symbol table you need?',
      options: [
        { label: 'Only include the 7 basic symbols: I, V, X, L, C, D, M', isCorrect: false, feedback: 'With only 7 symbols, you\'d need to handle subtractive cases (IV, IX, XL, XC, CD, CM) as special logic. Including all 13 combinations as table entries eliminates that branching entirely.' },
        { label: 'Include all 13 value-symbol pairs, with subtractive forms', isCorrect: true },
        { label: 'Convert to base 5 first, then map to symbols', isCorrect: false, feedback: 'Roman numerals don\'t follow a clean base-5 pattern — subtractive forms like IX and CM break any simple base conversion. A direct value-to-symbol table is the right structure.' },
        { label: 'Handle subtractive cases with if-statements during conversion', isCorrect: false, feedback: 'Hardcoding conditionals for IV, IX, XL, XC, CD, and CM produces six special cases. A table with all 13 pairs (M=1000, CM=900, D=500, …, I=1) eliminates all branching.' },
      ],
      correctFeedback: 'A table of 13 pairs ordered largest-to-smallest — M=1000, CM=900, D=500, DC=400, C=100, XC=90, L=50, XL=40, X=10, IX=9, V=5, IV=4, I=1 — handles every subtractive form automatically.',
      wrongFeedback: [
        'Subtractive forms are just more entries in a value-to-symbol mapping. If 900 maps to "CM", how does that simplify the conversion loop?',
        'With 13 ordered entries, your loop can greedily subtract the largest fitting value each step without any special cases. How many entries cover all subtractive forms?',
      ],
    },
    {
      id: 'greedy-strategy',
      question: 'Recognizing why a greedy choice is safe tells you whether backtracking is ever necessary. The conversion appends symbols greedily from largest to smallest. Why does greedy work here?',
      options: [
        { label: 'Roman numerals are base 10, so greedy always works', isCorrect: false, feedback: 'Roman numerals aren\'t strictly base 10 — they have mixed denominators (1000, 900, 500, 400, …). Greedy works because the symbol table is designed so no combination of smaller symbols can represent a larger value more efficiently.' },
        { label: 'No combination of smaller symbols ever sums to a larger symbol\'s value', isCorrect: true },
        { label: 'Greedy works because num ≤ 3999 is small enough to try all combinations', isCorrect: false, feedback: '3999 is small, but brute force is unnecessary. The symbol table is structured so greedy produces the unique correct representation without backtracking.' },
        { label: 'Greedy works because the output is always the same length as num\'s digits', isCorrect: false, feedback: 'Output length and digit count are unrelated — MCMXCIV (7 symbols) represents 1994 (4 digits). The greedy correctness comes from the table\'s structure, not string length.' },
      ],
      correctFeedback: 'Each table entry\'s value is less than twice the next entry. That means using a smaller symbol twice can never exceed the larger symbol. Greedy produces the shortest, correct representation.',
      wrongFeedback: [
        'Could you represent 1000 using two D\'s (500 + 500) instead of one M? If not, greedy won\'t miss anything by choosing M first.',
        'The table ensures each value is irreplaceable by smaller combinations. Once you subtract the largest fitting value, the remainder is handled the same way — no backtracking needed.',
      ],
    },
    {
      id: 'output-structure',
      question: 'Thinking about the output\'s shape upfront clarifies what your loop needs to accumulate. The output is a string. What does the conversion loop look like?',
      options: [
        { label: 'Build a list of digits, then join', isCorrect: false, feedback: 'The output is Roman numeral symbols, not digits. You accumulate symbol strings as you subtract each value — concatenate or append to a result string or list of strings.' },
        { label: 'While num > 0, subtract the largest fitting value and append its symbol', isCorrect: true },
        { label: 'Divide num by each symbol value and append the quotient as repeated symbols', isCorrect: false, feedback: 'Appending symbols once per iteration is cleaner. Dividing by the value gives the repetition count (e.g., 3 // 1000 = 0 for M), and you can loop that many times — but a while loop that subtracts once per pass is simpler.' },
        { label: 'Convert the most significant digit, then repeat the same process on the remainder', isCorrect: false, feedback: 'Recursion would work but adds call-stack overhead for no benefit. An iterative while loop that subtracts and appends is direct and avoids depth issues.' },
      ],
      correctFeedback: 'Iterate over the 13 value-symbol pairs. For each, while num ≥ value, subtract value from num and append the symbol to the result. When the loop ends, num is 0 and the result string is complete.',
      wrongFeedback: [
        'At each step you want the largest value that fits into the remaining num. What two things do you do when you find it?',
        'Subtract the value from num and append the symbol to your result. Repeat for the same entry as long as num ≥ value, then move to the next entry.',
      ],
    },
    {
      id: 'constraint-range',
      highlight: { location: 'constraint', text: '1 ≤ num ≤ 3999' },
      question: 'Constraint bounds often cap which symbols or edge cases you actually need to handle. 1 ≤ num ≤ 3999. What does the upper bound tell you about the maximum Roman numeral symbol needed?',
      options: [
        { label: 'You need a symbol for 5000 (V̄)', isCorrect: false, feedback: 'Roman numerals for values ≥ 4000 use overlined symbols, but num ≤ 3999 means the maximum is MMMCMXCIX. The symbol M (1000) is the largest you need.' },
        { label: 'M (1000) is the largest symbol needed; at most 3 M\'s appear', isCorrect: true },
        { label: 'The table only needs entries up to 500 (D)', isCorrect: false, feedback: 'num can be as large as 3999 = MMMCMXCIX, which requires M (1000). Stopping at D (500) would leave you unable to represent any value ≥ 1000.' },
        { label: 'The constraint implies num is always even', isCorrect: false, feedback: 'Parity is irrelevant to Roman numeral conversion. The constraint bounds the range, which determines which symbols are needed — that\'s all.' },
      ],
      correctFeedback: '3999 = MMMCMXCIX. At most three M\'s appear (for 3000). The constraint ensures no symbol above M is needed, keeping the table to exactly 13 entries.',
      wrongFeedback: [
        'What is 3999 in Roman numerals? How many M\'s does it contain, and what does that tell you about the table?',
        '3000 requires three M\'s (MMM). The remaining 999 uses CM, XC, IX. M is the largest symbol, and you never need more than three of it.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def int_to_roman(self, num):
        values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
        symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
        result = []
        for value, symbol in zip(values, symbols):
            if num == 0:
                break
            count, num = divmod(num, value)
            result.append(symbol * count)
        return "".join(result)`,
  solutionComplexity: { time: 'O(1)', space: 'O(1)' },
  solutionCaveat: 'Including the subtractive pairs (900, 400, 90, 40, 9, 4) as their own entries in the table — not just the six base symbols — is what avoids six separate special-case branches: each subtractive case is handled by the exact same <code>divmod</code> logic as every other value.',
  solutionExplanation: 'Every Roman numeral value, subtractive pairs included, can be treated uniformly as "how many times does this value divide into what remains" — walking the value table from largest to smallest and using <code>divmod</code> at each step greedily consumes as much of the number as that symbol allows before moving to the next-smaller value. Since the table already encodes the subtractive notation as first-class entries, there is nothing special left to detect; the same loop body handles every case.',
}
