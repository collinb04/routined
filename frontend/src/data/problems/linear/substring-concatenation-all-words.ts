export default {
  id: 'substring-concatenation-all-words',
  title: 'Substring with Concatenation of All Words',
  difficulty: 'hard',
  description: 'Given a string <code>s</code> and an array <code>words</code> (all same length), return all starting indices of substrings that are a concatenation of all words in any order.',
  examples: [
    { input: 's="barfoothefoobarman", words=["foo","bar"]', output: '[0,9]', explanation: '"barfoo" starts at 0; "foobar" starts at 9.' },
    { input: 's="wordgoodgoodgoodbestword", words=["word","good","best","word"]', output: '[]' },
  ],
  constraints: ['1 ≤ s.length ≤ 10⁴', '1 ≤ words.length ≤ 5000', 'words[i].length == 1..30'],
  starterCode: `def find_substring(s, words):
  pass`,
  functionName: 'find_substring',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'Two indices', args: ['barfoothefoobarman',['foo','bar']], expected: [0,9] },
    { label: 'No match', args: ['wordgoodgoodgoodbestword',['word','good','best','word']], expected: [] },
  ],
  clues: [
    {
      id: 'fixed-word-length',
      question: '"All words have the same length." What does this unlock for your scanning strategy?',
      options: [
        { label: 'You can slide by individual characters', isCorrect: false, feedback: 'Sliding by single characters works but ignores the fixed word length. Because every word is the same width, you can slice s in exact word-length chunks rather than character by character.' },
        { label: 'You can slice s into fixed-size chunks', isCorrect: true },
        { label: 'You only need to check one starting offset', isCorrect: false, feedback: 'Fixed word length limits offsets to word_len starting positions (0, 1, ..., word_len - 1), not just one. Each offset gives an independent tiling of s.' },
        { label: 'You can sort the words array', isCorrect: false, feedback: 'Sorting does not help because concatenation order is arbitrary anyway. The fixed length is useful for chunking, not ordering.' },
      ],
      correctFeedback: 'When every word has the same length w, you can tile s into w-character chunks. This reduces the scan to checking non-overlapping word-sized windows instead of every character position.',
      wrongFeedback: [
        'If every word is exactly w characters, how do you split a substring of length w × len(words) into candidate words?',
        'Fixed word length means s can be divided into aligned w-character slots. How does that reduce the number of starting offsets you need to check?',
      ],
    },
    {
      id: 'any-order-signal',
      question: '"A concatenation of all words in any order." What data structure does "any order" point to?',
      options: [
        { label: 'A sorted list to compare sequences', isCorrect: false, feedback: 'Sorting a list and comparing requires knowing the order. "Any order" means order is irrelevant — you need frequency matching, not sequence matching.' },
        { label: 'A frequency map of words', isCorrect: true },
        { label: 'A set of unique words', isCorrect: false, feedback: 'A set tracks presence but not count. The second example has "word" twice in the words array — a set would lose that duplicate, causing false positives.' },
        { label: 'A prefix tree over all words', isCorrect: false, feedback: 'A trie is useful for variable-length word lookups. Here all words are the same length, so a direct hash map lookup is simpler and sufficient.' },
      ],
      correctFeedback: 'Order-insensitive matching means you only care about counts — how many times each word appears in words versus in the candidate substring. A frequency map handles this in O(1) per word lookup.',
      wrongFeedback: [
        '"Any order" means the arrangement doesn\'t matter — only counts do. What structure tracks how many times each word appears?',
        'You need to verify that every word appears exactly the right number of times. A frequency map lets you check counts without caring about position.',
      ],
    },
    {
      id: 'window-size-is-fixed',
      question: 'The valid window length is always len(words) × words[i].length. What does a fixed window size suggest?',
      options: [
        { label: 'Use a variable-width sliding window', isCorrect: false, feedback: 'Variable-width windows are for problems where the valid size is unknown or changes. Here the window is exactly len(words) × word_length — fixed.' },
        { label: 'Check every possible window of that fixed size', isCorrect: true },
        { label: 'Binary search for the start position', isCorrect: false, feedback: 'Binary search requires a monotone predicate. Validity of a concatenation window is not monotone across starting positions — it can be true at index 0 and false at index 1.' },
        { label: 'The window size is irrelevant — check all substrings', isCorrect: false, feedback: 'Checking all substrings of all lengths is far more expensive. The fixed window size bounds your search to exactly s.length - window_size + 1 starting positions.' },
      ],
      correctFeedback: 'The window is always len(words) × word_length characters wide. You slide this fixed-size window across s (or across each word-aligned offset) and verify each window against the word frequency map.',
      wrongFeedback: [
        'If the total concatenation length is always the same, how many distinct starting positions are there in s?',
        'A fixed window means you slide exactly that size across s. How many starting positions do you need to check, and how do you verify each one?',
      ],
    },
    {
      id: 'duplicate-words',
      question: 'words can contain duplicate entries (e.g., ["word","good","best","word"]). How does this affect validation?',
      options: [
        { label: 'Deduplicate words before checking', isCorrect: false, feedback: 'Deduplicating would require the substring to contain "word" once, but the original words array has it twice. Deduplication produces false positives.' },
        { label: 'Match exact frequencies, not just presence', isCorrect: true },
        { label: 'Count total characters, not individual words', isCorrect: false, feedback: 'Character counts do not distinguish which words are present. "wordword" and "wordgood" have the same character count but only one matches ["word","word"].' },
        { label: 'Duplicates cannot exist per the constraints', isCorrect: false, feedback: 'The second example explicitly has "word" twice in words. Duplicates are allowed and must be counted correctly.' },
      ],
      correctFeedback: 'Build a frequency map of words (e.g., {"word": 2, "good": 1, "best": 1}) and compare it against the word frequencies in each candidate window. Presence alone is not enough.',
      wrongFeedback: [
        'The second example has "word" twice. What does a frequency map of words look like? What must the window\'s word frequencies match?',
        'You need "word" to appear exactly twice in the window. A set would only check that "word" appears at all. What tracks exact counts?',
      ],
    },
  ],
}
