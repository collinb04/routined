export default {
  id: 'letter-combinations-of-phone',
  title: 'Letter Combinations of Phone',
  difficulty: 'medium',
  description: `<p>Given a string containing digits from 2–9, return all possible letter combinations that the number could represent (like a phone keypad). Return the answer in any order. If the input is empty, return an empty list.</p>`,
  examples: [
    { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
    { input: 'digits = ""', output: '[]' },
  ],
  constraints: ['0 <= digits.length <= 4', 'digits[i] is a digit in the range [2,9]'],
  starterCode: `def letter_combinations(digits):
  pass`,
  functionName: 'letter_combinations_run',
  conceptId: 'backtracking',
  runnerSetup: `def letter_combinations_run(digits):
  result = letter_combinations(digits)
  return sorted(result) if result else []`,
  testCases: [
    { label: '"23"', args: ['23'], expected: ['ad','ae','af','bd','be','bf','cd','ce','cf'] },
    { label: 'empty', args: [''], expected: [] },
  ],
}
