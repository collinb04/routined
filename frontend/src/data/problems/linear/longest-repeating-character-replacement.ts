export default {
  id: 'longest-repeating-character-replacement',
  title: 'Longest Repeating Character Replacement',
  difficulty: 'medium',
  description: `<p>You are given a string <code>s</code> and an integer <code>k</code>. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most <code>k</code> times.</p><p>Return the length of the longest substring containing the same letter you can get after performing the above operations.</p>`,
  examples: [
    { input: 's = "ABAB", k = 2', output: '4' },
    { input: 's = "AABABBA", k = 1', output: '4' },
  ],
  constraints: ['1 <= s.length <= 10^5', 's consists of only uppercase English letters', '0 <= k <= s.length'],
  starterCode: `def character_replacement(s, k):
  pass`,
  functionName: 'character_replacement',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'ABAB k=2', args: ['ABAB', 2], expected: 4 },
    { label: 'AABABBA k=1', args: ['AABABBA', 1], expected: 4 },
  ],
}
