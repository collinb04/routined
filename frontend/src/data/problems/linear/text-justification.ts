export default {
  id: 'text-justification',
  title: 'Text Justification',
  difficulty: 'hard',
  description: 'Given an array of strings <code>words</code> and a width <code>maxWidth</code>, format the text so each line has exactly <code>maxWidth</code> characters and is fully left-and-right justified. The last line should be left-justified.',
  examples: [
    { input: 'words=["This","is","an","example","of","text","justification."], maxWidth=16', output: '["This    is    an","example  of text","justification.  "]' },
  ],
  constraints: ['1 ≤ words.length ≤ 300', '1 ≤ words[i].length ≤ 20', '1 ≤ maxWidth ≤ 100', 'words[i] consists of only English letters and symbols'],
  starterCode: `class Solution:
    def full_justify(self, words, max_width):
        pass`,
  runnerSetup: 'full_justify = Solution().full_justify',
  functionName: 'full_justify',
  conceptId: 'strings',
  testCases: [
    { label: 'Standard', args: [['This','is','an','example','of','text','justification.'],16], expected: ['This    is    an','example  of text','justification.  '] },
    { label: 'Single word', args: [['What','must','be','acknowledgment','shall','be'],16], expected: ['What   must   be','acknowledgment  ','shall be        '] },
  ],
  bruteHint: 'A brute-force approach still greedily packs words onto each line, but then distributes the extra spaces one at a time — looping through the gaps repeatedly, adding a single space to each in turn until the extras run out, and rebuilding the line string after each addition. That is O(maxWidth) extra work per line just to place spacing that a single division could compute directly, and it is easy to get the remainder wrong along the way. If you already know k (the gap count) and s (the extra spaces), why loop space-by-space instead of computing s // k and s % k once?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'greedy-line-packing',
      question: 'Which strategy fits depends on whether the problem needs lookahead or can be solved with a single greedy pass. Each line must have exactly maxWidth characters and fit as many words as possible. What strategy fills lines?',
      highlight: { location: 'description', text: 'format the text so each line has exactly <code>maxWidth</code> characters and is fully left-and-right justified.' },
      options: [
        { label: 'Choose line breaks by minimizing total wasted space across all lines', isCorrect: false, feedback: 'Minimizing total raggedness works for word-wrap problems, but this problem requires fitting as many words as possible per line — a left-to-right pack, not a global optimization.' },
        { label: 'Pack words onto the current line left to right, breaking to a new line only when the next word would not fit', isCorrect: true },
        { label: 'Split words equally across lines', isCorrect: false, feedback: 'Equal splitting ignores word lengths. A line must contain complete words that fit within maxWidth — you cannot split or redistribute words arbitrarily.' },
        { label: 'Pack from right to left', isCorrect: false, feedback: 'Text is read left to right; packing right to left would reverse word order. Greedy left-to-right packing respects the original word sequence.' },
      ],
      correctFeedback: 'Greedily add words to the current line while the accumulated length (words + at least one space between each) stays ≤ maxWidth. When the next word would exceed maxWidth, close the line.',
      wrongFeedback: [
        'Each line fits as many words as possible. Do you need to look ahead, or can you decide word by word from left to right?',
        'Add words to the current line until the next word would push you over maxWidth. What do you do at that point?',
      ],
    },
    {
      id: 'space-distribution',
      question: 'Getting the exact spacing formula right rules out naive equal-division approaches that look plausible but produce incorrect output. For a non-last line with k gaps between words and s extra spaces to distribute: "extra spaces should be distributed as evenly as possible; if it doesn\'t divide evenly, left gaps get more." How do you compute spaces per gap?',
      options: [
        { label: 'Give each gap s // k spaces', isCorrect: false, feedback: 'Integer division gives the base amount, but the remainder (s % k) must also be distributed. The first (s % k) gaps each get one extra space.' },
        { label: 'Give the first (s % k) gaps (s // k + 1) spaces, the rest (s // k)', isCorrect: true },
        { label: 'Give the last gap all remaining spaces', isCorrect: false, feedback: 'Leftover spaces go to the leftmost gaps, not the last. Putting them at the end would violate the distribution rule.' },
        { label: 'Divide s by (k + 1) to account for the trailing position', isCorrect: false, feedback: 'Gaps exist between words, so k gaps = k-1 internal + optional trailing. For full justification, distribute across exactly k gaps between words, not k+1.' },
      ],
      correctFeedback: 'Base spaces per gap = s // k. The remainder r = s % k means the first r gaps each get one extra space. This satisfies "evenly as possible; leftovers go left."',
      wrongFeedback: [
        's spaces across k gaps: the base is s // k. What do you do with the remainder s % k?',
        'If s = 7 and k = 3: each gap gets 2 spaces, and one gap gets an extra 1 (remainder). Which gaps get the extra? The leftmost ones.',
      ],
    },
    {
      id: 'last-line-exception',
      question: 'Exceptions like this rule out applying the same formula uniformly across every line. "The last line should be left-justified." How does this differ from full justification?',
      highlight: { location: 'description', text: 'The last line should be left-justified.' },
      options: [
        { label: 'Join words with a single space and pad with trailing spaces', isCorrect: true },
        { label: 'Distribute spaces evenly across gaps as normal', isCorrect: false, feedback: 'Even distribution is full justification, which is explicitly not what the last line uses. The last line gets one space between words and trailing spaces to reach maxWidth.' },
        { label: 'Leave the last line without padding', isCorrect: false, feedback: 'Every line must have exactly maxWidth characters. The last line is left-justified — words separated by single spaces — but still padded with trailing spaces to reach maxWidth.' },
        { label: 'The last line is treated identically to all other lines', isCorrect: false, feedback: 'The problem explicitly calls out the last line as an exception: it is left-justified (single spaces between words, trailing padding) rather than fully justified.' },
      ],
      correctFeedback: 'The last line joins words with exactly one space and pads with trailing spaces until the total length equals maxWidth. No extra distribution logic applies.',
      wrongFeedback: [
        'Left-justified means words are flush to the left with single spaces between them. What fills the remaining characters up to maxWidth?',
        'Last line: words joined by one space, then trailing spaces to reach maxWidth. How is that different from how you compute spaces for interior lines?',
      ],
    },
    {
      id: 'single-word-line',
      question: 'Edge cases like this reveal what your general formula must still handle without bolting on special-case logic. A line contains exactly one word with fewer characters than maxWidth. How do you justify it?',
      options: [
        { label: 'No spaces needed — return the word as-is', isCorrect: false, feedback: 'Every line must be exactly maxWidth characters. A single word shorter than maxWidth must be padded with trailing spaces to reach the required length.' },
        { label: 'Pad with trailing spaces to maxWidth', isCorrect: true },
        { label: 'Split the word across two lines', isCorrect: false, feedback: 'Words are never split. The constraint guarantees 1 ≤ words[i].length ≤ 20 ≤ maxWidth = 100, so every single word fits on one line — just pad it.' },
        { label: 'Distribute spaces before and after the word', isCorrect: false, feedback: 'Left-justification means the word goes first. Single-word lines are left-justified (like the last line) — word at left, trailing spaces to fill.' },
      ],
      correctFeedback: 'A single-word line is effectively a left-justified line with zero gaps. Pad with (maxWidth − len(word)) trailing spaces.',
      wrongFeedback: [
        'How many gaps exist between words on a single-word line? Where do the extra spaces go?',
        'Zero gaps means no space to distribute. The word is at the left; trailing spaces fill to maxWidth.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def full_justify(self, words, max_width):
        result = []
        line = []
        line_len = 0
        for word in words:
            if line_len + len(line) + len(word) > max_width:
                spaces_needed = max_width - line_len
                if len(line) == 1:
                    result.append(line[0] + ' ' * spaces_needed)
                else:
                    gaps = len(line) - 1
                    base, extra = divmod(spaces_needed, gaps)
                    justified = ''
                    for i, w in enumerate(line[:-1]):
                        justified += w + ' ' * (base + (1 if i < extra else 0))
                    justified += line[-1]
                    result.append(justified)
                line = []
                line_len = 0
            line.append(word)
            line_len += len(word)
        last_line = ' '.join(line)
        last_line += ' ' * (max_width - len(last_line))
        result.append(last_line)
        return result`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'When the leftover spaces don\'t divide evenly among the gaps, the *leftmost* gaps get the extra space — <code>extra</code> from <code>divmod</code> counts how many gaps need one more than the base amount, and the loop hands that extra out to the first <code>extra</code> gaps specifically.',
  solutionExplanation: 'Greedily adding words to the current line until the next one would overflow <code>maxWidth</code> maximizes words per line without any lookahead — once a line is full, exactly how many extra spaces beyond one-per-gap it needs is a single division (<code>spaces_needed // gaps</code>, with the remainder distributed one space at a time to the earliest gaps) rather than a space-by-space simulation. The last line and any line with only one word are special only in that they skip justification entirely and left-align with trailing spaces, since there\'s no "between words" spacing to stretch.',
}
