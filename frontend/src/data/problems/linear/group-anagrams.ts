export default {
  id: 'group-anagrams',
  title: 'Group Anagrams',
  difficulty: 'medium',
  description: `<p>Given an array of strings <code>strs</code>, group the anagrams together. You can return the answer in any order.</p>`,
  examples: [
    { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
  ],
  constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters'],
  starterCode: `def group_anagrams(strs):
  pass`,
  functionName: 'group_anagrams_run',
  conceptId: 'arrays',
  runnerSetup: `def group_anagrams_run(strs):
  result = group_anagrams(strs)
  return sorted([sorted(g) for g in result])`,
  testCases: [
    { label: 'mixed', args: [['eat','tea','tan','ate','nat','bat']], expected: [['bat'],['ate','eat','tea'],['nat','tan']] },
    { label: 'single', args: [['a']], expected: [['a']] },
    { label: 'all same', args: [['','','']], expected: [['','','']] },
  ],
}
