export default {
  id: 'replace-words',
  title: 'Replace Words',
  difficulty: 'medium',
  description: 'Given a dictionary of root strings and a sentence, replace each word in the sentence with its shortest matching root. If a word has multiple matching roots, use the shortest one.',
  examples: [
    { input: 'dictionary=["cat","bat","rat"], sentence="the cattle was rattled by the battery"', output: '"the cat was rat by the bat"' },
  ],
  constraints: ['1 ≤ dictionary.length ≤ 1000', '1 ≤ dictionary[i].length ≤ 100', '1 ≤ sentence.length ≤ 10⁶', 'sentence consists of lowercase letters and spaces'],
  starterCode: `def replace_words(dictionary, sentence):
  pass`,
  functionName: 'replace_words',
  conceptId: 'tries',
  testCases: [
    { label: 'Standard', args: [['cat','bat','rat'],'the cattle was rattled by the battery'], expected: 'the cat was rat by the bat' },
    { label: 'No replacement', args: [['a'],'b c d'], expected: 'b c d' },
    { label: 'Multiple roots', args: [['a','b','ab'],'ab ac bc'], expected: 'a a b' },
  ],
}
