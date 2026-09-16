export default {
  id: 'remove-duplicate-letters',
  title: 'Remove Duplicate Letters',
  difficulty: 'medium',
  description: 'Given a string <code>s</code>, remove duplicate letters so that every letter appears once. The result must be the smallest in lexicographic order among all possible results.',
  examples: [
    { input: 's = "bcabc"', output: '"abc"', explanation: 'Remove last b and c to get smallest arrangement.' },
    { input: 's = "cbacdcbc"', output: '"acdb"' },
  ],
  constraints: ['1 ≤ s.length ≤ 10⁴', 's consists of lowercase English letters'],
  starterCode: `class Solution:
    def remove_duplicate_letters(self, s):
        pass`,
  runnerSetup: 'remove_duplicate_letters = Solution().remove_duplicate_letters',
  functionName: 'remove_duplicate_letters',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: '"bcabc"', args: ['bcabc'], expected: 'abc' },
    { label: '"cbacdcbc"', args: ['cbacdcbc'], expected: 'acdb' },
    { label: 'No duplicates', args: ['abc'], expected: 'abc' },
  ],
  bruteHint: 'Imagine listing every way to remove characters from s so each remaining letter appears exactly once, then filtering for validity and comparing all the survivors to find the lexicographically smallest one. The number of such subsequences explodes combinatorially as the string grows. With s.length up to 10⁴, how many candidates would you need to generate and compare before finding the answer, and does that number stay manageable?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-input-size',
      question: 'Input size sets the ceiling on what complexity your solution can afford. s.length ≤ 10⁴ tells you…',
      highlight: { location: 'constraint', text: '1 ≤ s.length ≤ 10⁴' },
      options: [
        { label: 'O(n²) is fine — 10⁸ is manageable', isCorrect: false, feedback: 'At n = 10,000, O(n²) is 100 million operations. For a string problem that means re-scanning on every character — too slow. You need a linear or near-linear approach.' },
        { label: 'O(n) or O(n · 26) is acceptable', isCorrect: true },
        { label: 'Input size does not affect the approach', isCorrect: false, feedback: 'Input size always constrains acceptable complexity. n = 10⁴ rules out any approach that rebuilds or re-scans the string for each character.' },
        { label: 'O(log n) is required', isCorrect: false, feedback: 'You must read all n characters, so O(log n) is impossible. The bound rules out quadratic solutions, not all superlinear ones.' },
      ],
      correctFeedback: 'n = 10,000 eliminates O(n²). Since the alphabet is fixed at 26 lowercase letters, O(n · 26) = O(n) is the target — one linear pass with O(26) bookkeeping per step.',
      wrongFeedback: [
        'How many operations does an O(n²) algorithm perform at n = 10,000? Is that within range for a single test case?',
        'O(n²) at n = 10⁴ is 10⁸ operations. The alphabet is bounded at 26 characters, which opens up O(n) approaches with constant-factor bookkeeping.',
      ],
    },
    {
      id: 'output-lexicographic-minimum',
      question: 'This ordering requirement decides whether you can safely remove a character you already placed. "Smallest in lexicographic order among all possible results." What does this require you to do when you encounter a smaller character?',
      highlight: { location: 'description', text: 'smallest in lexicographic order among all possible results.' },
      options: [
        { label: 'Always place smaller characters at the front', isCorrect: false, feedback: 'You cannot simply front-load small characters — you must include each letter exactly once, and some earlier larger letters may have no remaining occurrences to place later.' },
        { label: 'Pop larger characters from the result if they appear again later', isCorrect: true },
        { label: 'Sort the unique characters alphabetically', isCorrect: false, feedback: 'Sorting unique characters gives the globally smallest string, but it ignores the original relative order constraint. "acdb" is not a sorted result — it preserves order where forced.' },
        { label: 'Greedily pick the smallest unused character each round', isCorrect: false, feedback: 'A greedy global minimum scan costs O(n) per character, giving O(n²) overall. You also cannot always pick the global minimum — you must keep characters with no future occurrences.' },
      ],
      correctFeedback: 'When a new character is smaller than the last character in your result and that last character appears again later, removing it now produces a smaller result. That is the monotonic-stack decision.',
      wrongFeedback: [
        'If your result ends in "c" and you see "a", and "c" still appears later in s, is keeping "c" now forced or optional?',
        'If a character appears again later in s, you can safely remove it from the result now to place a smaller character first. The key question is: does the top of your stack have a future occurrence?',
      ],
    },
    {
      id: 'each-letter-once',
      question: 'Knowing exactly what invariant to maintain determines which bookkeeping your solution needs. "Every letter appears once." What extra information do you need to track?',
      highlight: { location: 'description', text: 'every letter appears once.' },
      options: [
        { label: 'The sorted order of all unique characters', isCorrect: false, feedback: 'Sorted order does not help you decide whether to pop a character — you need to know if it appears again later, not its rank.' },
        { label: 'Whether a character is already in the result', isCorrect: false, feedback: 'Knowing a character is already in the result is necessary, but insufficient. You also need to know if characters not yet placed will appear again later in s.' },
        { label: 'Remaining count of each character and a "used" set', isCorrect: true },
        { label: 'The last seen index of each character', isCorrect: false, feedback: 'The last index tells you whether a future occurrence exists, but you still need a "used" set to skip characters already placed. Both pieces of information are needed.' },
      ],
      correctFeedback: 'You need two things: a count of remaining occurrences (to know if you can afford to remove a character from the result) and a set of characters already placed (to skip duplicates).',
      wrongFeedback: [
        'When you see a character already in the result, you skip it. When you consider popping the last result character, what do you need to know about it first?',
        'You must not pop a character if it has no future occurrences — it would disappear from the result entirely. Track remaining counts to guard that decision.',
      ],
    },
    {
      id: 'lowercase-alphabet-constraint',
      question: 'Knowing the exact character set available tells you what size bookkeeping you can fix ahead of time. "s consists of lowercase English letters." How does a bounded alphabet simplify your bookkeeping?',
      highlight: { location: 'constraint', text: 's consists of lowercase English letters' },
      options: [
        { label: 'You could track each letter with a general-purpose keyed lookup for O(1) access', isCorrect: false, feedback: 'A general-purpose keyed lookup works, but a fixed array of 26 integers is simpler, faster, and avoids hashing overhead when you know the alphabet size upfront.' },
        { label: 'Index directly by letter into fixed-size storage instead of a general-purpose keyed lookup', isCorrect: true },
        { label: 'You only need to track 5 characters at a time', isCorrect: false, feedback: 'The alphabet has 26 characters, all of which may appear. There is no reason to limit tracking to 5.' },
        { label: 'It means the output is always length ≤ 26', isCorrect: false, feedback: 'The output length is at most 26 (one of each letter), but that fact is a consequence of the problem, not the reason a fixed array helps with bookkeeping.' },
      ],
      correctFeedback: 'With exactly 26 possible characters, a count array of length 26 and a boolean used array of length 26 give O(1) lookup and update. No hash collisions, no dynamic sizing.',
      wrongFeedback: [
        'How many distinct characters can appear in s? What is the most compact structure to count them all?',
        'The alphabet is capped at 26. Two arrays of length 26 — one for counts, one for "used" flags — handle everything in O(1) per operation.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def remove_duplicate_letters(self, s):
        last_occurrence = {ch: i for i, ch in enumerate(s)}
        stack = []
        seen = set()
        for i, ch in enumerate(s):
            if ch in seen:
                continue
            while stack and stack[-1] > ch and last_occurrence[stack[-1]] > i:
                seen.discard(stack.pop())
            stack.append(ch)
            seen.add(ch)
        return ''.join(stack)`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'A letter on the stack is only popped when it still has a *later* occurrence to fall back on (<code>last_occurrence[stack[-1]] > i</code>) — popping a letter that never appears again would lose it from the result entirely, since every letter must appear exactly once.',
  solutionExplanation: 'Building the result greedily letter by letter, a bigger letter already on the stack should be dropped in favor of a smaller one arriving now — but only if that bigger letter is guaranteed to show up again later, since otherwise dropping it would remove it from the answer permanently. Tracking each letter\'s last occurrence answers exactly that "will it come back?" question in O(1), and skipping any letter already placed on the stack (via the <code>seen</code> set) prevents it from ever appearing twice in the final result.',
}
