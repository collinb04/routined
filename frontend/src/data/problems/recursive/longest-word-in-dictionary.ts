export default {
  id: 'longest-word-in-dictionary',
  title: 'Longest Word in Dictionary',
  difficulty: 'easy',
  description: 'Given an array of strings <code>words</code>, return the longest word that can be built one character at a time using other words in the array. If there is a tie, return the lexicographically smallest result.',
  examples: [
    { input: 'words = ["w","wo","wor","worl","world"]', output: '"world"', explanation: 'Each prefix is in the array.' },
    { input: 'words = ["a","banana","app","appl","ap","apply","apple"]', output: '"apple"' },
  ],
  constraints: ['1 ≤ words.length ≤ 1000', '1 ≤ words[i].length ≤ 30', 'words[i] consists of lowercase English letters'],
  starterCode: `class Solution:
    def longest_word(self, words):
        pass`,
  runnerSetup: 'longest_word = Solution().longest_word',
  functionName: 'longest_word',
  conceptId: 'tries',
  testCases: [
    { label: 'Sequential build', args: [['w','wo','wor','worl','world']], expected: 'world' },
    { label: 'Tie break', args: [['a','banana','app','appl','ap','apply','apple']], expected: 'apple' },
    { label: 'Single char', args: [['a','b','c']], expected: 'a' },
  ],
  bruteHint: 'The brute-force approach checks each candidate word by testing whether every one of its prefixes appears somewhere in the original array, scanning the full list of words for each prefix check. For a word of length L, that means up to L scans through n words, so the total cost grows to roughly O(n² × L) across the whole array. With n up to 1000 and L up to 30, that scanning adds up fast — what structure would let you check whether a prefix exists in constant time instead of scanning the whole array each time?',
  optimizeComplexity: { time: 'O(total characters)', space: 'O(total characters)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Bounds on array length and element size define your complexity budget before you write any code. words.length ≤ 1000 and words[i].length ≤ 30. What does this tell you about acceptable complexity?',
      options: [
        { label: 'O(n²) per word is too slow', isCorrect: false, feedback: 'With n = 1000 words and lengths up to 30, O(n × 30²) is under a million operations — well within budget. The constraint here is permissive enough for quadratic-per-word approaches.' },
        { label: 'O(n × L) solutions are fine', isCorrect: true },
        { label: 'Only O(n log n) is acceptable', isCorrect: false, feedback: 'The constraints allow much more than O(n log n). With n = 1000 and word length ≤ 30, even O(n × L) is only 30,000 operations.' },
        { label: 'Input size is irrelevant here', isCorrect: false, feedback: 'Input size always matters. n ≤ 1000 and L ≤ 30 together tell you you can afford to check prefixes for every word without hitting a time limit.' },
      ],
      correctFeedback: 'With at most 1000 words of length ≤ 30, you have budget for O(n × L) approaches — checking each word\'s prefixes against the input set is affordable.',
      wrongFeedback: [
        'What is the maximum total work if you check all prefixes of every word?',
        'At most 1000 words × 30 characters = 30,000 operations at worst. Does that change what structures are viable?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ words.length ≤ 1000' },
    },
    {
      id: 'prefix-check-requirement',
      question: 'Precise wording in the problem description often encodes the exact rule your algorithm must enforce. A word qualifies only if it can be "built one character at a time" — every prefix must also be in the array. What does this imply?',
      options: [
        { label: 'Sort words by length and scan', isCorrect: false, feedback: 'Sorting by length alone does not help you check whether every prefix of a word exists in the array. You still need a membership test for each prefix.' },
        { label: 'Store every word up front so any prefix can be checked instantly', isCorrect: true },
        { label: 'Count occurrences of each word', isCorrect: false, feedback: 'Counting occurrences tells you nothing about whether a given prefix exists in the array. You need existence checks, not frequency.' },
        { label: 'Compare words from both ends of a sorted list', isCorrect: false, feedback: 'Two pointers work on pairs or ranges, not on verifying that all k prefixes of a word appear in an unsorted collection. You need a structure that answers membership queries.' },
      ],
      correctFeedback: 'Inserting all words into a set lets you check each prefix in O(1), so verifying a word of length L costs O(L) total. A trie stores the same information structurally.',
      wrongFeedback: [
        'For each candidate word, you need to confirm that word[0:1], word[0:2], … word[0:L-1] all exist. What data structure answers "does this string exist?" in O(1)?',
        'You need membership queries, not sorting. A hash set or trie both give you O(1) or O(L) prefix existence checks.',
      ],
      highlight: { location: 'description', text: 'built one character at a time' },
    },
    {
      id: 'tie-break-rule',
      question: 'Tie-breaking rules buried in the description change what you track as your "best so far," not just what you compute. If there is a tie in length, return the lexicographically smallest result. What does this signal about how you track candidates?',
      options: [
        { label: 'Return the first qualifying word found', isCorrect: false, feedback: 'The first qualifying word depends on input order, which has nothing to do with lexicographic order. You need to compare candidates by length first, then alphabetically.' },
        { label: 'Track best by length, then alphabetic order', isCorrect: true },
        { label: 'Sort the output list before returning', isCorrect: false, feedback: 'Sorting the output would give you the shortest word first, not the longest. You need to maximize length and only break ties lexicographically.' },
        { label: 'Collect all qualifying words, then pick', isCorrect: false, feedback: 'Collecting all qualifying words works but is unnecessary — you can maintain a single running best and update it greedily as you find longer or lexicographically smaller equal-length words.' },
      ],
      correctFeedback: 'Update your running best when you find a longer word, or a word of equal length that compares smaller alphabetically. Python string comparison does this natively.',
      wrongFeedback: [
        'You want the longest word, but ties go to the alphabetically earlier one. How do you compare two candidates?',
        'Compare on (length, alphabetic order): prefer longer; among equal-length, prefer the one that comes first in a dictionary.',
      ],
      highlight: { location: 'description', text: 'If there is a tie, return the lexicographically smallest result.' },
    },
    {
      id: 'trie-vocabulary',
      question: 'The concept tag attached to a problem is often the most direct signal of the intended data structure or technique. The conceptId for this problem is "tries." What property of a trie makes it a natural fit here?',
      options: [
        { label: 'Tries store words sorted by frequency', isCorrect: false, feedback: 'Tries do not sort by frequency — they organize characters by shared prefixes. Frequency is unrelated to the trie structure.' },
        { label: 'Tries encode shared prefixes structurally', isCorrect: true },
        { label: 'Tries guarantee O(1) lookup for any word', isCorrect: false, feedback: 'Trie lookup is O(L) where L is the word length, not O(1). The advantage is that all prefixes of a word share the same root-to-node path, making prefix existence a single traversal.' },
        { label: 'Tries eliminate duplicate entries automatically', isCorrect: false, feedback: 'Deduplication is a property of sets, not tries. The trie\'s value is that inserting a word also implicitly inserts all its prefixes as paths in the tree.' },
      ],
      correctFeedback: 'A trie\'s edges are characters, so the path from root to a node spells a prefix. Inserting all words into a trie lets you walk down from the root and check, at each depth, whether the current path is a complete word in the dictionary.',
      wrongFeedback: [
        'What does a trie\'s structure look like for the words "w", "wo", "wor", "worl", "world"?',
        'In a trie, each node on the path root → w → o → r → l → d can be marked as a complete word. Walking that path checks all prefixes simultaneously.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def longest_word(self, words):
        word_set = set(words)
        best = ""
        for word in words:
            valid = all(word[:i] in word_set for i in range(1, len(word) + 1))
            if valid:
                if len(word) > len(best) or (len(word) == len(best) and word < best):
                    best = word
        return best`,
  solutionComplexity: { time: 'O(total characters)', space: 'O(total characters)' },
  solutionCaveat: 'The prefix check range runs through <code>len(word) + 1</code>, which includes the word\'s own full length — that\'s deliberate, since a word can only be built one character at a time if it (not just its strict prefixes) is itself present in the array too.',
  solutionExplanation: 'Storing every word in a set up front turns "is this prefix buildable" into an O(1) membership check, so verifying a candidate word of length L costs O(L) instead of rescanning the whole array for each prefix. Comparing each valid candidate against the running best on <code>(length, then lexicographic order)</code> — preferring longer, and among equal lengths preferring the alphabetically earlier one — directly encodes the tie-breaking rule the problem specifies, without needing to collect every valid word and sort them afterward.',
}
