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
  clues: [
    {
      id: 'constraint-complexity',
      question: 'sentence.length ≤ 10⁶. What does this large bound tell you about per-word lookup cost?',
      options: [
        { label: 'O(n × d) per word, where d is dictionary size, is fine', isCorrect: false, feedback: 'A sentence of 10⁶ characters could contain many words. Checking each word against all 1,000 dictionary roots linearly would be expensive. You need per-word lookup to be proportional to the word\'s length, not the dictionary size.' },
        { label: 'Per-word lookup must be O(L) — proportional to word length', isCorrect: true },
        { label: 'Sort the dictionary to enable binary search per word', isCorrect: false, feedback: 'Binary search on the dictionary gives O(log d × L) per word. A trie achieves O(L) — strictly better — and also finds the shortest matching root automatically.' },
        { label: 'Sentence length is irrelevant — focus on dictionary size', isCorrect: false, feedback: 'Sentence length drives the dominant cost. With a 10⁶-character sentence and potentially hundreds of thousands of words, each word lookup must be fast. Sentence length sets the O(n) baseline.' },
      ],
      correctFeedback: 'With up to 10⁶ characters in the sentence, word lookup must be O(L) per word. A trie built from the 1,000 dictionary roots achieves exactly that — walk the trie character by character until you hit a root or exhaust the word.',
      wrongFeedback: [
        'If the sentence has 10⁶ characters, and you check each word against all 1,000 roots one by one, what is the total cost?',
        'Checking every word against 1,000 roots linearly is O(words × 1,000 × root_length). A trie reduces per-word lookup to O(word_length) regardless of dictionary size.',
      ],
    },
    {
      id: 'shortest-root-signal',
      question: 'If a word has multiple matching roots, use the shortest one. What does this imply about your traversal order?',
      options: [
        { label: 'Sort roots by length descending, take the first match', isCorrect: false, feedback: 'Sorting descending and taking the first match gives the longest root, not the shortest. You want the shortest — sort ascending or, better, use a trie which encounters shorter roots naturally first.' },
        { label: 'Walk the trie character by character; return the first complete root hit', isCorrect: true },
        { label: 'Collect all matching roots, then pick the minimum length', isCorrect: false, feedback: 'Collecting all matches and picking the minimum works but does unnecessary work. A trie naturally encounters roots in order of depth — the first root marker you hit is the shortest match by definition.' },
        { label: 'Use the root that appears earliest in the dictionary list', isCorrect: false, feedback: 'Dictionary order has nothing to do with root length. "bat" appearing before "ba" in the list does not make "bat" shorter. You need length comparison, not position comparison.' },
      ],
      correctFeedback: 'In a trie, you walk character by character. The first node you encounter that is marked as a complete root is the shallowest — and therefore shortest — matching root. Return immediately when you hit it.',
      wrongFeedback: [
        'If roots "b", "ba", and "bat" all exist in a trie, in what order do you encounter them while walking "battery"?',
        'You encounter "b" first (depth 1), then "ba" (depth 2), then "bat" (depth 3). The first complete root you reach is always the shortest. Return it immediately without walking further.',
      ],
    },
    {
      id: 'trie-vs-set-signal',
      question: 'Why is a trie more suitable here than a hash set of dictionary words?',
      options: [
        { label: 'A trie uses less memory than a hash set', isCorrect: false, feedback: 'Tries often use more memory than hash sets due to per-node overhead. The advantage is structural: a trie supports prefix-based lookup, which is exactly what "find the shortest matching root" requires.' },
        { label: 'A trie finds the shortest matching prefix in one O(L) pass', isCorrect: true },
        { label: 'Hash sets cannot store strings', isCorrect: false, feedback: 'Hash sets can absolutely store strings. The issue is that a hash set answers "does this exact string exist?" — you would have to generate all O(L) prefixes of each word and check each one, making it O(L²) per word.' },
        { label: 'A trie automatically sorts the results', isCorrect: false, feedback: 'Tries do not sort results — sorting is irrelevant here. The trie\'s value is prefix-based lookup: walk the trie with the word\'s characters and find the first complete root, all in one O(L) traversal.' },
      ],
      correctFeedback: 'A hash set requires generating and checking each of the O(L) prefixes of a word separately — O(L²) per word. A trie walks the word character by character and signals a complete root at the first match — O(L) total.',
      wrongFeedback: [
        'With a hash set, how would you find the shortest root that is a prefix of "cattle"? How many lookups would that take?',
        'With a hash set, you would check "c", "ca", "cat", "catt", "cattl", "cattle" — up to L lookups, each costing O(L) for hashing — O(L²) total. A trie does it in one O(L) walk.',
      ],
    },
    {
      id: 'no-match-passthrough',
      question: 'If no root in the dictionary is a prefix of a word, what should be returned for that word?',
      options: [
        { label: 'An empty string', isCorrect: false, feedback: 'The problem says to replace each word "with its shortest matching root" — if no root matches, the original word stays unchanged. Returning an empty string would corrupt the output sentence.' },
        { label: 'The original word, unchanged', isCorrect: true },
        { label: 'The longest word in the dictionary', isCorrect: false, feedback: 'The longest dictionary word has no special role here. When no root matches, the word passes through the output unchanged — no substitution occurs.' },
        { label: 'Skip the word entirely', isCorrect: false, feedback: 'Skipping the word would change the structure of the sentence. "No replacement" means the original word appears in the output as-is — you can verify this with the test case where none of the dictionary roots match any sentence word.' },
      ],
      correctFeedback: 'If your trie walk exhausts the word without hitting a root marker, the word has no matching root. Include it in the output unchanged. The "No replacement" test case — dictionary=["a"], sentence="b c d" → "b c d" — confirms this.',
      wrongFeedback: [
        'In the test case where dictionary=["a"] and sentence="b c d", none of the words start with "a". What does the output look like?',
        'Words without a matching root pass through unchanged. When your trie walk reaches the end of the word without finding a root marker, return the original word.',
      ],
    },
  ],
}
