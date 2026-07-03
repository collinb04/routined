export default {
  id: 'valid-anagram',
  title: 'Valid Anagram',
  difficulty: 'easy',
  description: `<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an anagram of <code>s</code>, and <code>false</code> otherwise.</p><p>An anagram uses all the original letters exactly once, rearranged.</p>`,
  examples: [
    { input: 's = "anagram", t = "nagaram"', output: 'true' },
    { input: 's = "rat", t = "car"', output: 'false' },
  ],
  constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters'],
  starterCode: `def is_anagram(s, t):
  pass`,
  functionName: 'is_anagram',
  conceptId: 'arrays',
  testCases: [
    { label: 'anagram', args: ['anagram', 'nagaram'], expected: true },
    { label: 'not anagram', args: ['rat', 'car'], expected: false },
    { label: 'different lengths', args: ['ab', 'a'], expected: false },
  ],
}
