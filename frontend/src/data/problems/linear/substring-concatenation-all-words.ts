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
  starterCode: `class Solution:
    def find_substring(self, s, words):
        pass`,
  runnerSetup: 'find_substring = Solution().find_substring',
  functionName: 'find_substring',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'Two indices', args: ['barfoothefoobarman',['foo','bar']], expected: [0,9] },
    { label: 'No match', args: ['wordgoodgoodgoodbestword',['word','good','best','word']], expected: [] },
  ],
  bruteHint: 'A brute-force approach could check every one of the roughly s.length starting positions, and at each one try every permutation of words to see whether some ordering concatenates into a match there — with up to 5000 words, that is up to 5000! orderings to consider per position. Even a version that skips generating permutations and instead just re-slices and re-checks all the words from scratch at every starting position still repeats nearly identical work between neighboring positions. Given how many words there can be, what happens to your runtime the moment you check orderings explicitly instead of comparing word counts directly?',
  optimizeComplexity: { time: 'O(n · k)', space: 'O(m)' },
  clues: [
    {
      id: 'fixed-word-length',
      question: 'A shared, fixed size across every element often unlocks a chunking or windowing strategy. "all same length" — what does this unlock for your scanning strategy?',
      highlight: { location: 'description', text: 'all same length' },
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
      question: 'Which structure fits often depends on whether order matters or only counts do. "a concatenation of all words in any order" — what data structure does "any order" point to?',
      highlight: { location: 'description', text: 'a concatenation of all words in any order' },
      options: [
        { label: 'A sorted list to compare sequences', isCorrect: false, feedback: 'Sorting a list and comparing requires knowing the order. "Any order" means order is irrelevant — you need frequency matching, not sequence matching.' },
        { label: 'Something that counts how many times each word occurs', isCorrect: true },
        { label: 'Something that only records whether a word is present, not how many times', isCorrect: false, feedback: 'A set tracks presence but not count. The second example has "word" twice in the words array — a set would lose that duplicate, causing false positives.' },
        { label: 'A structure built for looking up many variable-length words efficiently', isCorrect: false, feedback: 'A trie is useful for variable-length word lookups. Here all words are the same length, so a direct hash map lookup is simpler and sufficient.' },
      ],
      correctFeedback: 'Order-insensitive matching means you only care about counts — how many times each word appears in words versus in the candidate substring. A frequency map handles this in O(1) per word lookup.',
      wrongFeedback: [
        '"Any order" means the arrangement doesn\'t matter — only counts do. What structure tracks how many times each word appears?',
        'You need to verify that every word appears exactly the right number of times. A frequency map lets you check counts without caring about position.',
      ],
    },
    {
      id: 'window-size-is-fixed',
      question: 'A fixed total size to search for often means scanning windows of exactly that size rather than searching blindly. The valid window length is always len(words) × words[i].length. What does a fixed window size suggest?',
      options: [
        { label: 'Let the window grow and shrink based on what is currently inside it', isCorrect: false, feedback: 'Variable-width windows are for problems where the valid size is unknown or changes. Here the window is exactly len(words) × word_length — fixed.' },
        { label: 'Check every possible window of that fixed size', isCorrect: true },
        { label: 'Jump directly to likely start positions instead of checking each one in turn', isCorrect: false, feedback: 'Binary search requires a monotone predicate. Validity of a concatenation window is not monotone across starting positions — it can be true at index 0 and false at index 1.' },
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
      question: 'Repeated elements rule out any approach that only tracks presence rather than exact counts. Words can contain duplicate entries (e.g., ["word","good","best","word"]). How does this affect validation?',
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
  solutionCode: `class Solution:
    def find_substring(self, s, words):
        if not words or not words[0]:
            return []
        word_len = len(words[0])
        num_words = len(words)
        total_len = word_len * num_words
        n = len(s)
        if n < total_len:
            return []
        word_count = {}
        for w in words:
            word_count[w] = word_count.get(w, 0) + 1

        result = []
        for offset in range(word_len):
            left = offset
            count = 0
            window = {}
            for right in range(offset, n - word_len + 1, word_len):
                word = s[right:right + word_len]
                if word in word_count:
                    window[word] = window.get(word, 0) + 1
                    count += 1
                    while window[word] > word_count[word]:
                        left_word = s[left:left + word_len]
                        window[left_word] -= 1
                        count -= 1
                        left += word_len
                    if count == num_words:
                        result.append(left)
                        left_word = s[left:left + word_len]
                        window[left_word] -= 1
                        count -= 1
                        left += word_len
                else:
                    window.clear()
                    count = 0
                    left = right + word_len
        return sorted(result)`,
  solutionComplexity: { time: 'O(n · k)', space: 'O(m)' },
  solutionCaveat: 'Because every word has the same fixed length, a valid concatenation can only ever start at one of <code>word_len</code> possible offsets (0 through <code>word_len - 1</code>) — running one sliding window per offset covers every possible alignment without ever checking a start position that couldn\'t possibly work.',
  solutionExplanation: 'Since word boundaries are fixed-size, the string can be scanned in whole-word jumps instead of character by character, turning "does this substring concatenate all the words" into a frequency-matching sliding window almost identical to Minimum Window Substring, just with word-sized tokens instead of characters. Whenever a scanned chunk isn\'t one of the target words at all, the window can\'t be salvaged by shrinking — it has to restart entirely from just past that chunk, which is the one place this differs from the character-level version.',
}
