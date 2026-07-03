export default {
  id: 'implement-trie',
  title: 'Implement Trie (Prefix Tree)',
  difficulty: 'medium',
  description: 'Implement a trie (prefix tree) supporting <code>insert(word)</code>, <code>search(word)</code>, and <code>startsWith(prefix)</code>. <code>search</code> returns true only if the exact word was inserted; <code>startsWith</code> returns true if any inserted word has that prefix.',
  examples: [
    { input: 'insert("apple"), search("apple"), search("app"), startsWith("app"), insert("app"), search("app")', output: '[null, true, false, true, null, true]' },
  ],
  constraints: ['1 ≤ word.length ≤ 2000', 'Only lowercase English letters', 'At most 3 × 10⁴ total calls'],
  starterCode: `class TrieNode:
  def __init__(self):
      self.children = {}
      self.is_end = False

class Trie:
  def __init__(self):
      self.root = TrieNode()

  def insert(self, word):
      pass

  def search(self, word):
      pass

  def starts_with(self, prefix):
      pass`,
  functionName: 'Trie',
  conceptId: 'tries',
  testCases: [
    { label: 'Insert and search', args: [['insert','search','search','startsWith','insert','search'],['apple','apple','app','app','app','app']], expected: [null,true,false,true,null,true] },
    { label: 'Prefix check', args: [['insert','startsWith','search'],['hello','hel','hel']], expected: [null,true,false] },
  ],
}
