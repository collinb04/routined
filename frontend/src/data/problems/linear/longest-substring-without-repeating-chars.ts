export default {
  id: 'longest-substring-without-repeating-chars',
  title: 'Longest Substring Without Repeating Chars',
  difficulty: 'medium',
  description: `<p>Given a string <code>s</code>, find the length of the longest substring without repeating characters.</p>`,
  examples: [
    { input: 's = "abcabcbb"', output: '3 ("abc")' },
    { input: 's = "bbbbb"', output: '1 ("b")' },
    { input: 's = "pwwkew"', output: '3 ("wke")' },
  ],
  constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces'],
  starterCode: `def length_of_longest_substring(s):
  pass`,
  functionName: 'length_of_longest_substring',
  conceptId: 'sliding-window',
  testCases: [
    { label: '"abcabcbb"', args: ['abcabcbb'], expected: 3 },
    { label: '"bbbbb"', args: ['bbbbb'], expected: 1 },
    { label: '"pwwkew"', args: ['pwwkew'], expected: 3 },
  ],
}
