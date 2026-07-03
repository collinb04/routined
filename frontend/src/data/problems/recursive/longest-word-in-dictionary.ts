export default {
  id: 'longest-word-in-dictionary',
  title: 'Longest Word in Dictionary',
  difficulty: 'easy',
  description: 'Given an array of strings <code>words</code>, return the longest word that can be built one character at a time using other words in the array. If there is a tie, return the lexicographically smallest result.',
  examples: [
    { input: 'words = ["w","wo","wor","worl","world"]', output: '"world"', explanation: 'Each prefix is in the array.' },
    { input: 'words = ["a","banana","app","appl","ap","apply","apple"]', output: '"apple"' },
  ],
  constraints: ['1 ≤ words.length ≤ 1000', '1 ≤ words[i].length ≤ 30', 'words[i] consists of lowercase English letters'],
  starterCode: `def longest_word(words):
  pass`,
  functionName: 'longest_word',
  conceptId: 'tries',
  testCases: [
    { label: 'Sequential build', args: [['w','wo','wor','worl','world']], expected: 'world' },
    { label: 'Tie break', args: [['a','banana','app','appl','ap','apply','apple']], expected: 'apple' },
    { label: 'Single char', args: [['a','b','c']], expected: 'a' },
  ],
}
