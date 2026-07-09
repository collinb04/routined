export default {
  id: 'partition-labels',
  title: 'Partition Labels',
  difficulty: 'medium',
  description: 'You are given a string <code>s</code>. Partition it into as many parts as possible such that each letter appears in at most one part. Return a list of the sizes of these parts.',
  examples: [
    { input: 's = "ababcbacadefegdehijhklij"', output: '[9,7,8]', explanation: '"ababcbaca" (9), "defegde" (7), "hijhklij" (8).' },
    { input: 's = "eccbbbbdec"', output: '[10]' },
  ],
  constraints: ['1 ≤ s.length ≤ 500', 's consists of lowercase English letters'],
  starterCode: `def partition_labels(s):
  pass`,
  functionName: 'partition_labels',
  conceptId: 'greedy',
  testCases: [
    { label: 'Three parts', args: ['ababcbacadefegdehijhklij'], expected: [9,7,8] },
    { label: 'One part', args: ['eccbbbbdec'], expected: [10] },
    { label: 'All different', args: ['abc'], expected: [1,1,1] },
  ],
  bruteHint: 'Describe trying every possible way to split the string and checking which splits keep each letter confined to a single part',
  optimizeHint: 'Name the single-pass technique of tracking each letter\'s last occurrence to know how far the current part must extend',
  clues: [
    {
      id: 'constraint-complexity',
      question: 's.length ≤ 500. What complexity does this permit?',
      options: [
        { label: 'O(n²) — check all substrings', isCorrect: false, feedback: 'At n = 500, O(n²) is 250,000 operations — technically fine, but entirely unnecessary. The problem has a linear solution, and O(n²) substring checking would reflect a misunderstanding of the approach.' },
        { label: 'O(n) — a single or two-pass scan', isCorrect: true },
        { label: 'O(n log n) — sort characters first', isCorrect: false, feedback: 'Sorting would scramble the original positions you need to track. A single pass to record last-occurrence indices, then one greedy scan, gives O(n) with no sorting needed.' },
        { label: 'O(26) — only 26 letters matter', isCorrect: false, feedback: 'The alphabet size is a constant factor, not the dominant complexity. You still need at least one pass over all n characters to record where each letter last appears.' },
      ],
      correctFeedback: 'Two linear passes: one to record each character\'s last occurrence index, one to greedily extend and close partitions. Total O(n) with O(26) = O(1) space for the last-occurrence map.',
      wrongFeedback: [
        'Can you solve this by reading the string twice? What would each pass do?',
        'Pass 1: record the last index of every character. Pass 2: extend the current partition to cover the last occurrence of each character you encounter. That is O(n).',
      ],
    },
    {
      id: 'last-occurrence-signal',
      question: 'Each letter must appear in at most one part. What information do you need to know before you can close a partition?',
      options: [
        { label: 'The frequency of each character', isCorrect: false, feedback: 'Frequency tells you how many times a character appears, not where it last appears. You need to know the last index to know how far the current partition must extend.' },
        { label: 'The last index where each character appears', isCorrect: true },
        { label: 'Whether each character is unique in the string', isCorrect: false, feedback: 'Uniqueness is irrelevant — even a character that appears once must stay in the partition that contains it. What matters is where its last occurrence is, so you know when it is safe to close.' },
        { label: 'The sorted order of characters', isCorrect: false, feedback: 'Sorted order has nothing to do with keeping a character in one partition. You need index positions — specifically, the rightmost index of each character.' },
      ],
      correctFeedback: 'Precompute last[c] = the rightmost index of character c. As you scan left to right, extend the current partition\'s end to max(current_end, last[c]) for each character c you encounter.',
      wrongFeedback: [
        'When you are at position i and encounter character c, how far right might the current partition need to extend to contain all occurrences of c?',
        'You need last[c] — the last index where c appears — to know the minimum right boundary that keeps all c\'s in the current partition.',
      ],
    },
    {
      id: 'greedy-close-signal',
      question: 'When does it become valid to close the current partition and start a new one?',
      options: [
        { label: 'After every distinct character', isCorrect: false, feedback: 'Closing after every distinct character would split characters across partitions if they appear again later. You can only close when no character in the current partition extends beyond the current position.' },
        { label: 'When the current index equals the partition\'s end boundary', isCorrect: true },
        { label: 'When you encounter a character not seen before', isCorrect: false, feedback: 'A new character just extends the end boundary if its last occurrence is further right. It does not signal a partition close — only reaching the end boundary does.' },
        { label: 'When the partition has accumulated 26 distinct characters', isCorrect: false, feedback: 'Partitions are not bounded by the number of distinct characters. A valid partition closes when you have covered all occurrences of every character inside it, regardless of how many distinct characters that includes.' },
      ],
      correctFeedback: 'Maintain a running end boundary — the maximum last-occurrence index of all characters seen so far. When i == end, you have covered all characters in the current partition. Record its size and start a new one.',
      wrongFeedback: [
        'As you scan left to right, you keep extending the end boundary. When does the boundary stop moving?',
        'When i reaches the current end boundary, every character inside the current segment has its last occurrence at or before i. That is the safe closing point.',
      ],
    },
    {
      id: 'output-structure',
      question: 'The output is a list of partition sizes, not the partitions themselves. What does this simplify?',
      options: [
        { label: 'You must still build and store each substring', isCorrect: false, feedback: 'Sizes are just numbers — you only need to track start and end indices and compute end - start + 1. No substring extraction needed.' },
        { label: 'Record end - start + 1 for each partition; no slicing needed', isCorrect: true },
        { label: 'Sort the sizes before returning', isCorrect: false, feedback: 'The problem wants sizes in the order they appear in the string. Sorting would lose the left-to-right structure. Return them in the order you close each partition.' },
        { label: 'Only return the count of partitions', isCorrect: false, feedback: 'The count is not the output — the sizes of each partition are. Return a list with one integer per partition, in order.' },
      ],
      correctFeedback: 'Track the start of the current partition. When you close it at index i, append i - start + 1 to results and set start = i + 1. No substring needed — just arithmetic on indices.',
      wrongFeedback: [
        'The expected output is [9, 7, 8] — a list of integer lengths. What do you need to track to produce that?',
        'When you close a partition at index i, compute its length as i - start + 1. Append that number and advance start.',
      ],
    },
  ],
}
