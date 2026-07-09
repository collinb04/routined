export default {
  id: 'reorganize-string',
  title: 'Reorganize String',
  difficulty: 'medium',
  description: 'Given a string <code>s</code>, rearrange its characters so that no two adjacent characters are the same. Return any valid rearrangement, or an empty string if it is not possible.',
  examples: [
    { input: 's = "aab"', output: '"aba"', explanation: 'Rearrange so no two a\'s are adjacent.' },
    { input: 's = "aaab"', output: '""', explanation: 'Impossible — too many a\'s.' },
  ],
  constraints: ['1 ≤ s.length ≤ 500', 's consists of lowercase English letters'],
  starterCode: `def reorganize_string(s):
  pass`,
  functionName: 'reorganize_string',
  conceptId: 'heap',
  testCases: [
    { label: '"aab" → "aba"', args: ['aab'], expected: 'aba' },
    { label: 'Impossible', args: ['aaab'], expected: '' },
    { label: 'Single', args: ['a'], expected: 'a' },
  ],
  bruteHint: 'Describe a naive approach that repeatedly rescans character counts to pick a safe next placement, and why that doesn\'t scale well.',
  optimizeHint: 'Name the data structure that always surfaces the most frequent remaining character in log time.',
  clues: [
    {
      id: 'feasibility-condition',
      question: 'For a rearrangement to exist, what condition must the most frequent character\'s count satisfy?',
      options: [
        { label: 'It must appear at most n / 2 times (rounded down)', isCorrect: false, feedback: 'The threshold is ceil(n / 2), not floor. For n = 5 (odd), a character appearing 3 times is valid — it occupies every other position. floor(5 / 2) = 2 would wrongly reject that case.' },
        { label: 'Its count must be ≤ ceil(n / 2)', isCorrect: true },
        { label: 'All characters must appear the same number of times', isCorrect: false, feedback: '"aab" is solvable as "aba" even though \'a\' appears twice and \'b\' appears once. Equal counts are not required — the threshold is about the maximum frequency relative to string length.' },
        { label: 'No character can appear more than twice', isCorrect: false, feedback: 'A character can appear many times and still be placeable. In "aaabb" (n = 5), \'a\' appears 3 times = ceil(5/2), which is exactly the limit and yields "ababa".' },
      ],
      correctFeedback: 'If the most frequent character appears more than ceil(n / 2) times, it cannot be placed without two being adjacent. For n = 500, that threshold is 250.',
      wrongFeedback: [
        'Think about the worst case: a string of length n where one character dominates. What is the maximum number of times that character can appear if you alternate it with others?',
        'In a string of length n, every other position is the same parity. How many positions of a single parity exist? That is the maximum placements for one character.',
      ],
    },
    {
      id: 'greedy-most-frequent',
      question: 'Each character you place must differ from the previous one. What greedy strategy minimizes the chance of getting stuck?',
      options: [
        { label: 'Place characters in alphabetical order', isCorrect: false, feedback: 'Alphabetical order ignores frequency entirely. You can easily run into a situation where the only remaining characters are all the same letter, causing two adjacent duplicates.' },
        { label: 'Always place the most frequent remaining character', isCorrect: true },
        { label: 'Alternate between the two least frequent characters', isCorrect: false, feedback: 'Using the least frequent characters first preserves the high-frequency characters for later, increasing the chance of being forced to place duplicates adjacent at the end.' },
        { label: 'Place characters randomly and retry if invalid', isCorrect: false, feedback: 'Random placement with retries has no guaranteed termination and is exponentially slow in the worst case. The greedy approach always finds a valid arrangement when one exists.' },
      ],
      correctFeedback: 'Placing the most frequent character at each step reduces its count as quickly as possible, preventing it from accumulating and becoming unavoidable adjacent. This greedy choice is provably optimal for this problem.',
      wrongFeedback: [
        'The danger is that one character\'s count grows so large it must appear consecutively. Which character poses that risk, and what does choosing it greedily accomplish?',
        'If you defer placing the most frequent character, its count stays high while others are used up. What happens when it is the only character left?',
      ],
    },
    {
      id: 'max-heap-role',
      question: 'You need the most frequent remaining character at each step, and counts change as you build the result. What structure gives that in O(log n) per step?',
      options: [
        { label: 'A frequency dictionary, scanning for the max each step', isCorrect: false, feedback: 'Scanning a dictionary for the maximum costs O(26) per step here — acceptable for 26 letters, but a max-heap is the general-purpose pattern and makes the selection O(log n) as counts change dynamically.' },
        { label: 'A max-heap keyed by character frequency', isCorrect: true },
        { label: 'A sorted list of (frequency, character) pairs', isCorrect: false, feedback: 'A sorted list requires O(n) insertion after each decrement to maintain order. A heap does the same in O(log n).' },
        { label: 'A queue ordered by insertion time', isCorrect: false, feedback: 'Insertion order has no relationship to frequency. A queue gives you the oldest character, not the most frequent one.' },
      ],
      correctFeedback: 'A max-heap (negate counts for Python\'s min-heap) gives O(log 26) ≈ O(1) selection of the most frequent character. After placing it, decrement its count and push it back if count > 0.',
      wrongFeedback: [
        'After placing a character, you decrement its count and need to re-rank it. What structure automatically re-orders elements after an update?',
        'You pop the top, use it, reduce its count by 1, and push it back. The heap rebalances to put the new maximum at the top. How does this differ from scanning a dictionary each step?',
      ],
    },
    {
      id: 'adjacent-constraint-enforcement',
      question: 'After placing a character, you cannot immediately place the same character again even if it is still the most frequent. How do you enforce this?',
      options: [
        { label: 'Check the last character in the result before popping the heap', isCorrect: false, feedback: 'Checking and skipping the top of the heap is complex — you would need to pop a second candidate, use it, then re-push the first. A cleaner approach holds the previous character aside for exactly one step.' },
        { label: 'Hold the previous character out of the heap for one step, then re-push it', isCorrect: true },
        { label: 'Shuffle the remaining characters before each placement', isCorrect: false, feedback: 'Shuffling destroys the frequency ordering you built. You need a deterministic structure that enforces the adjacency rule while preserving the greedy selection.' },
        { label: 'The heap automatically prevents adjacent duplicates', isCorrect: false, feedback: 'A heap orders by frequency, not by adjacency history. If the same character is the most frequent across two consecutive steps, the heap will return it both times without any automatic adjacency check.' },
      ],
      correctFeedback: 'Pop the top (most frequent), append it to the result, then hold it aside. On the next step, pop the new top, append it, and re-push the held character. This enforces a one-step gap between reuses.',
      wrongFeedback: [
        'After using a character, it cannot go back into the heap immediately — it would just be popped again. What is the minimum number of steps before it can return?',
        'The character placed at step t cannot be used at step t+1. You can push it back into the heap after step t+1 completes. Where do you store it in the meantime?',
      ],
    },
  ],
}
