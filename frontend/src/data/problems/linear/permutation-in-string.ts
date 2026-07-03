export default {
  id: 'permutation-in-string',
  title: 'Permutation in String',
  difficulty: 'medium',
  description: `<p>Given two strings <code>s1</code> and <code>s2</code>, return <code>true</code> if <code>s2</code> contains a permutation of <code>s1</code>, or <code>false</code> otherwise.</p><p>In other words, return true if one of <code>s1</code>'s permutations is a substring of <code>s2</code>.</p>`,
  examples: [
    { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true' },
    { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false' },
  ],
  constraints: ['1 <= s1.length, s2.length <= 10^4', 's1 and s2 consist of lowercase English letters'],
  starterCode: `def check_inclusion(s1, s2):
  pass`,
  functionName: 'check_inclusion',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'ab in eidbaooo', args: ['ab', 'eidbaooo'], expected: true },
    { label: 'ab in eidboaoo', args: ['ab', 'eidboaoo'], expected: false },
  ],
}
