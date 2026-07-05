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
  clues: [
    {
      id: 'constraint-size',
      question: 'strs.length ≤ 10^4 and strs[i].length ≤ 100. What complexity target do these constraints set?',
      options: [
        { label: 'O(n²) — compare each string pair', isCorrect: false, feedback: 'O(n²) comparisons at n = 10,000 is 100 million string comparisons, each up to 100 characters. That\'s potentially 10 billion character operations — too slow.' },
        { label: 'O(n · L) where L is string length', isCorrect: true },
        { label: 'O(n · L · log n) is acceptable', isCorrect: false, feedback: 'O(n · L · log n) could work here given the sizes, but O(n · L) is achievable with a hash map — the tighter bound is the right target.' },
        { label: 'O(L²) per string to build a key', isCorrect: false, feedback: 'Building a canonical key from a string of length L takes O(L log L) to sort or O(L) with a frequency count — not O(L²). No quadratic work per string is needed.' },
      ],
      correctFeedback: 'With n = 10,000 strings each up to L = 100 characters, an O(n · L) approach — one pass per string to build a canonical key — hits roughly 1 million operations total.',
      wrongFeedback: [
        'How many pairs of strings would you compare in a brute-force approach? Is that affordable given n = 10,000?',
        'You need to process each string once to assign it to a group. What\'s the cost per string, and what does that give overall?',
      ],
    },
    {
      id: 'anagram-key',
      question: 'Two strings are anagrams if they have the same characters in the same frequencies. What canonical key captures this?',
      options: [
        { label: 'The string itself (for exact matches)', isCorrect: false, feedback: '"eat" and "tea" are anagrams but have different string values. You need a key that is identical for all anagrams of the same set of characters.' },
        { label: 'The sorted version of the string', isCorrect: false },
        { label: 'Sorted characters or a frequency tuple', isCorrect: true },
        { label: 'The length of the string', isCorrect: false, feedback: 'Length is shared by anagrams but also by many non-anagrams ("bat" and "cat" are length 3 but not anagrams). Length alone is too coarse a key.' },
      ],
      correctFeedback: 'Sorting "eat", "tea", and "ate" all yield "aet". A frequency tuple (a=1, e=1, t=1) also works. Both are identical for anagrams and different for non-anagrams — use either as a hash map key.',
      wrongFeedback: [
        'What transformation produces the same result for "eat", "tea", and "ate" but a different result for "bat"?',
        'You want a function f such that f(s1) == f(s2) if and only if s1 and s2 are anagrams. What operations on a string\'s characters satisfy that?',
      ],
    },
    {
      id: 'output-structure',
      question: 'The output groups strings, with "any order" permitted within and across groups. What data structure naturally accumulates groups by key?',
      options: [
        { label: 'A list of lists, built by nested loops', isCorrect: false, feedback: 'Nested loops would require comparing each string to all existing groups — O(n²) work. You need a structure that assigns a string to its group in O(1).' },
        { label: 'A hash map from canonical key to list of strings', isCorrect: true },
        { label: 'A sorted list of (key, string) pairs', isCorrect: false, feedback: 'Sorting gives you adjacent anagrams, but extracting groups still requires a linear scan. A hash map gives you O(1) group access directly.' },
        { label: 'A set per group to deduplicate', isCorrect: false, feedback: 'Sets deduplicate, but anagram groups can contain duplicate strings (e.g., ["", "", ""]). You need a list per group, not a set.' },
      ],
      correctFeedback: 'A defaultdict(list) maps each canonical key to its group. Each string is inserted once in O(L log L) (sorting) or O(L) (frequency count). Final groups are the dict\'s values.',
      wrongFeedback: [
        'You want to look up "which group does this string belong to?" in O(1). What structure supports O(1) key-to-value lookup?',
        'A hash map from canonical key → list lets you append each new string in O(1). After processing all n strings, what does iterating over the map give you?',
      ],
    },
    {
      id: 'lowercase-letters-only',
      question: '"strs[i] consists of lowercase English letters." What does this enable for building a canonical key?',
      options: [
        { label: 'Sorting is now O(1) per character', isCorrect: false, feedback: 'Sorting is O(L log L) regardless of character set size. The lowercase constraint doesn\'t change sorting complexity.' },
        { label: 'A fixed-size frequency array of 26 slots', isCorrect: true },
        { label: 'Direct ASCII comparison without hashing', isCorrect: false, feedback: 'Comparing strings directly doesn\'t group anagrams — "eat" ≠ "tea" by direct comparison. The lowercase constraint is about the alphabet size, not about skipping hashing.' },
        { label: 'Nothing — any character set would work the same', isCorrect: false, feedback: 'With arbitrary Unicode, a frequency array would need to be much larger or a hash map. Knowing the alphabet is exactly 26 characters lets you use a compact fixed-size array as the key.' },
      ],
      correctFeedback: 'With only 26 lowercase letters, a frequency array [count_a, count_b, ..., count_z] is a compact, fixed-size canonical key. Converting it to a tuple makes it hashable in Python.',
      wrongFeedback: [
        'If the alphabet is exactly 26 characters, what\'s the smallest possible structure that counts every character\'s frequency?',
        'A list of 26 integers covers all lowercase letter counts. How do you turn that list into something usable as a dictionary key in Python?',
      ],
    },
  ],
}
