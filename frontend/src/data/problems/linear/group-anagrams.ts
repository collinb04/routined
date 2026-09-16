export default {
  id: 'group-anagrams',
  title: 'Group Anagrams',
  difficulty: 'medium',
  description: `<p>Given an array of strings <code>strs</code>, group the anagrams together. You can return the answer in any order.</p>`,
  examples: [
    { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
  ],
  constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters'],
  starterCode: `class Solution:
    def group_anagrams(self, strs):
        pass`,
  functionName: 'group_anagrams_run',
  conceptId: 'arrays',
  runnerSetup: `def group_anagrams_run(strs):
  result = Solution().group_anagrams(strs)
  return sorted([sorted(g) for g in result])`,
  testCases: [
    { label: 'mixed', args: [['eat','tea','tan','ate','nat','bat']], expected: [['bat'],['ate','eat','tea'],['nat','tan']] },
    { label: 'single', args: [['a']], expected: [['a']] },
    { label: 'all same', args: [['','','']], expected: [['','','']] },
  ],
  bruteHint: 'The brute-force approach compares every string against every other string, checking each pair for anagram equality by sorting both and seeing if they match. That\'s roughly n² pairs, and checking each pair costs O(L log L) for the sort, where L is the string length. At n up to 10,000 strings, how many pairwise comparisons does that add up to, and would it finish in time?',
  optimizeComplexity: { time: 'O(n · k)', space: 'O(n · k)' },
  clues: [
    {
      id: 'constraint-size',
      question: 'We can understand how efficient we need to be based on the size constraints of the input. strs.length ≤ 10^4 and strs[i].length ≤ 100 — what complexity target do these constraints set?',
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
      question: 'Key vocabulary in a problem statement often points straight at the transformation you need. Two strings are anagrams if they have the same characters in the same frequencies — what canonical key captures this?',
      options: [
        { label: 'The string itself (for exact matches)', isCorrect: false, feedback: '"eat" and "tea" are anagrams but have different string values. You need a key that is identical for all anagrams of the same set of characters.' },
        { label: 'The sorted version of the string', isCorrect: false },
        { label: 'Convert each string into a form anagrams share', isCorrect: true },
        { label: 'The length of the string', isCorrect: false, feedback: 'Length is shared by anagrams but also by many non-anagrams ("bat" and "cat" are length 3 but not anagrams). Length alone is too coarse a key.' },
      ],
      correctFeedback: 'Sorting "eat", "tea", and "ate" all yield "aet". A frequency tuple (a=1, e=1, t=1) also works. Both are identical for anagrams and different for non-anagrams — use either as a hash map key.',
      wrongFeedback: [
        'What transformation produces the same result for "eat", "tea", and "ate" but a different result for "bat"?',
        'You want a function f such that f(s1) == f(s2) if and only if s1 and s2 are anagrams. What operations on a string\'s characters satisfy that?',
      ],
      highlight: { location: 'description', text: 'group the anagrams together' },
    },
    {
      id: 'output-structure',
      question: 'The type of output you\'re asked for tells you how much structure you need to impose on the result. The output groups strings, with "any order" permitted within and across groups — what data structure naturally accumulates groups by key?',
      options: [
        { label: 'A list of lists, built by nested loops', isCorrect: false, feedback: 'Nested loops would require comparing each string to all existing groups — O(n²) work. You need a structure that assigns a string to its group in O(1).' },
        { label: 'Add each string directly to its group by key', isCorrect: true },
        { label: 'A sorted list of (key, string) pairs', isCorrect: false, feedback: 'Sorting gives you adjacent anagrams, but extracting groups still requires a linear scan. A hash map gives you O(1) group access directly.' },
        { label: 'A set per group to deduplicate', isCorrect: false, feedback: 'Sets deduplicate, but anagram groups can contain duplicate strings (e.g., ["", "", ""]). You need a list per group, not a set.' },
      ],
      correctFeedback: 'A defaultdict(list) maps each canonical key to its group. Each string is inserted once in O(L log L) (sorting) or O(L) (frequency count). Final groups are the dict\'s values.',
      wrongFeedback: [
        'You want to look up "which group does this string belong to?" in O(1). What structure supports O(1) key-to-value lookup?',
        'A hash map from canonical key → list lets you append each new string in O(1). After processing all n strings, what does iterating over the map give you?',
      ],
      highlight: { location: 'description', text: 'You can return the answer in any order.' },
    },
    {
      id: 'lowercase-letters-only',
      question: 'Guarantees about the input\'s alphabet tell you how compact a representation you can get away with. "strs[i] consists of lowercase English letters" — what does this enable for building a canonical key?',
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
      highlight: { location: 'constraint', text: 'strs[i] consists of lowercase English letters' },
    },
  ],
  solutionCode: `class Solution:
    def group_anagrams(self, strs):
        groups = {}
        for s in strs:
            key = ''.join(sorted(s))
            groups.setdefault(key, []).append(s)
        return list(groups.values())`,
  solutionComplexity: { time: 'O(n · L log L)', space: 'O(n · L)' },
  solutionCaveat: 'Sorting each string into its key is simple and correct, but costs O(L log L) per string; a frequency-count key (a tuple of 26 letter counts) does the same grouping in O(L) per string instead, at the cost of a slightly more involved key to build.',
  solutionExplanation: 'Two strings are anagrams exactly when they contain the same letters the same number of times — and sorting a string is a simple way to produce a canonical form where every anagram of it sorts to the identical string. Using that sorted string as a dictionary key means every original string naturally lands in the same bucket as its anagrams, turning an O(n²) pairwise-comparison problem into a single O(n) pass that just looks up (or creates) one bucket per string.',
  solution: {
    patternName: 'Canonical-key grouping via hashing — use when many items need to be bucketed by an equivalence relation, not compared pairwise',
    approaches: [
      {
        approachName: 'Brute force',
        oneLineIdea: 'Compare every string against every group\'s existing members',
        subgoals: [
          { label: 'Try each string against existing groups', explanation: 'For each new string, check every group formed so far for an anagram match' },
          { label: 'Confirm anagram-hood pairwise', explanation: 'Sorting both strings and comparing confirms whether they belong together' },
          { label: 'Start a new group on no match', explanation: 'If no existing group matches, the string starts a group of its own' },
        ],
        code: `def group_anagrams(strs):
    groups = []
    for s in strs:
        placed = False
        for group in groups:                      # try each string against existing groups
            if sorted(s) == sorted(group[0]):       # confirm anagram-hood pairwise
                group.append(s)
                placed = True
                break
        if not placed:
            groups.append([s])                     # start a new group on no match
    return groups`,
        timeComplexity: 'O(n² · L log L) — up to n strings compared against up to n existing groups, each comparison sorting two strings of length L',
        spaceComplexity: 'O(n · L) — storing all strings across all groups',
        whenYouWouldActuallyUseThis: 'Only for a handful of very short strings — it re-sorts the same strings repeatedly and re-scans every existing group for every new string, exactly the redundant work a canonical key eliminates.',
      },
      {
        approachName: 'Sorted-key grouping',
        oneLineIdea: 'Use each string\'s sorted form as a group key',
        subgoals: [
          { label: 'Compute a canonical key', explanation: 'Sorting a string produces the same result for every anagram of it' },
          { label: 'Bucket by that key', explanation: 'A hash map from key to list collects every string sharing that key in O(1) per insert' },
          { label: 'Return the buckets as groups', explanation: 'The map\'s values, once fully populated, are exactly the answer' },
        ],
        code: `def group_anagrams(strs):
    groups = {}
    for s in strs:
        key = ''.join(sorted(s))              # compute a canonical key
        groups.setdefault(key, []).append(s)  # bucket by that key
    return list(groups.values())              # return the buckets as groups`,
        timeComplexity: 'O(n · L log L) — each of the n strings is sorted once, at O(L log L) per string',
        spaceComplexity: 'O(n · L) — every string is stored once, plus its key',
        whenYouWouldActuallyUseThis: 'A perfectly reasonable default when L is small — sorting a handful of characters is cheap, and the code reads clearly.',
      },
      {
        approachName: 'Frequency-key grouping',
        oneLineIdea: 'Use each string\'s 26-letter frequency count as a group key',
        subgoals: [
          { label: 'Count letters instead of sorting them', explanation: 'A 26-slot tally is built in one pass over the string, with no reordering' },
          { label: 'Convert the tally into a hashable key', explanation: 'A tuple of 26 counts is fixed-size and usable directly as a dict key' },
          { label: 'Bucket and return exactly as before', explanation: 'The bucketing step is unchanged from the sorted-key version' },
        ],
        code: `def group_anagrams(strs):
    groups = {}
    for s in strs:
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - ord('a')] += 1   # count letters instead of sorting them
        key = tuple(counts)                    # convert the tally into a hashable key
        groups.setdefault(key, []).append(s)   # bucket and return exactly as before
    return list(groups.values())`,
        timeComplexity: 'O(n · L) — each of the n strings is scanned once to build its 26-slot tally, with no sorting',
        spaceComplexity: 'O(n · L) — every string is stored once, plus a fixed 26-integer key per string',
        whenYouWouldActuallyUseThis: 'The default choice once the alphabet is small and fixed — it drops the log L factor sorting pays for, and it\'s the natural generalization of the frequency-counting idea from Valid Anagram.',
      },
    ],
    comparisonTable: [
      { approach: 'Brute force', time: 'O(n² · L log L)', space: 'O(n · L)', structuralUnlock: 'None — every new string is compared against every existing group from scratch' },
      { approach: 'Sorted-key grouping', time: 'O(n · L log L)', space: 'O(n · L)', structuralUnlock: 'A canonical key turns "compare against every group" into "look up one bucket," removing the n-way comparison entirely' },
      { approach: 'Frequency-key grouping', time: 'O(n · L)', space: 'O(n · L)', structuralUnlock: 'Counting instead of sorting drops the log L factor — the fixed 26-letter alphabet makes a tally strictly cheaper than a reordering' },
    ],
    transferNote: 'Canonical-key bucketing is the same move behind Valid Anagram (comparing exactly two keys instead of grouping many), extended to grouping instead of pairwise comparison. Whenever the question is "which items belong together," look for a transformation that maps every member of a group to an identical key, then let a hash map do the bucketing in one pass.',
    retrievalCheck: [
      'If strs[i] could contain uppercase letters and digits instead of just lowercase letters, would the 26-slot frequency array still work — what would you replace it with?',
      'If instead of grouping you only needed to check whether two specific strings belong in the same group, which of these three approaches would you strip down, and to what?',
      'If string length L could be up to 10⁵ instead of 100, would the gap between sorted-key and frequency-key grouping matter more or less?',
    ],
  },
}
