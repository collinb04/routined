export default {
  id: 'edit-distance',
  title: 'Edit Distance',
  difficulty: 'medium',
  description: 'Given two strings <code>word1</code> and <code>word2</code>, return the minimum number of operations (insert, delete, or replace a character) to convert word1 to word2.',
  examples: [
    { input: 'word1="horse", word2="ros"', output: '3', explanation: 'horse→rorse (replace h with r)→rose (remove r)→ros (remove e). 3 operations.' },
  ],
  constraints: ['0 ≤ word1.length, word2.length ≤ 500', 'Both strings consist of lowercase English letters'],
  starterCode: `def min_distance(word1, word2):
  pass`,
  functionName: 'min_distance',
  conceptId: 'dp-2d',
  testCases: [
    { label: '"horse"→"ros"', args: ['horse','ros'], expected: 3 },
    { label: '"intention"→"execution"', args: ['intention','execution'], expected: 5 },
    { label: 'Empty to word', args: ['','abc'], expected: 3 },
  ],
}
