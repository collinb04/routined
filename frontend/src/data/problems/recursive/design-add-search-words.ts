export default {
  id: 'design-add-search-words',
  title: 'Design Add and Search Words Data Structure',
  difficulty: 'medium',
  description: 'Design a data structure supporting <code>addWord(word)</code> and <code>search(word)</code> where <code>word</code> may contain the wildcard <code>\'.\' </code> that matches any letter.',
  examples: [
    { input: 'addWord("bad"), addWord("dad"), addWord("mad"), search("pad"), search("bad"), search(".ad"), search("b..")', output: '[null,null,null,false,true,true,true]' },
  ],
  constraints: ['1 ≤ word.length ≤ 25', 'word for addWord consists of lowercase letters; word for search may contain \'.\'', 'At most 10⁴ calls total'],
  starterCode: `class WordDictionary:
  def __init__(self):
      pass

  def add_word(self, word):
      pass

  def search(self, word):
      pass`,
  functionName: 'WordDictionary',
  conceptId: 'tries',
  testCases: [
    { label: 'Wildcard search', args: [['addWord','addWord','addWord','search','search','search','search'],['bad','dad','mad','pad','bad','.ad','b..']], expected: [null,null,null,false,true,true,true] },
  ],
}
