export default {
  id: 'decode-string',
  title: 'Decode String',
  difficulty: 'medium',
  description: 'Given an encoded string like <code>"3[a2[c]]"</code>, return its decoded string. The encoding rule is <code>k[encoded_string]</code>, where the string inside is repeated exactly <code>k</code> times.',
  examples: [
    { input: 's = "3[a]2[bc]"', output: '"aaabcbc"' },
    { input: 's = "3[a2[c]]"', output: '"accaccacc"' },
  ],
  constraints: ['1 ≤ s.length ≤ 30', 's consists of digits, lowercase letters, and brackets', 'All integers are in range [1, 300]'],
  starterCode: `class Solution:
    def decode_string(self, s):
        pass`,
  runnerSetup: 'decode_string = Solution().decode_string',
  functionName: 'decode_string',
  conceptId: 'stack',
  testCases: [
    { label: 'Simple', args: ['3[a]2[bc]'], expected: 'aaabcbc' },
    { label: 'Nested', args: ['3[a2[c]]'], expected: 'accaccacc' },
    { label: 'Single', args: ['2[abc]'], expected: 'abcabc' },
    { label: 'No brackets', args: ['abc'], expected: 'abc' },
  ],
  bruteHint: 'The brute-force approach repeats a full left-to-right scan of the string, each time finding and expanding the innermost bracket pair (the one with no brackets left inside it) by replacing k[substring] with substring repeated k times, then restarting the scan on the shortened string. Each rescan costs O(n), and you need one rescan per level of nesting, on top of the cost of rebuilding the string with every expansion. With brackets nested several levels deep, how many times would you redo work on characters you already read, instead of expanding as you go in a single pass?',
  optimizeComplexity: { time: 'O(n + L)', space: 'O(L)' },
  clues: [
    {
      id: 'nesting-implies-stack',
      question: 'Structural cues like nesting tell you the order in which pieces of a problem must be resolved. "3[a2[c]]" has nested brackets — what does nesting imply about how you process the inner content?',
      options: [
        { label: 'Find each bracket pair by scanning both ends', isCorrect: false, feedback: 'Two pointers can locate one bracket pair, but nesting means the inner result must be fully decoded before the outer repetition can apply it.' },
        { label: 'Decode innermost brackets first, working outward', isCorrect: true },
        { label: 'Expand all brackets simultaneously', isCorrect: false, feedback: 'Simultaneous expansion is not well-defined for nested structures — the outer repetition depends on the result of the inner one.' },
        { label: 'Process brackets right to left', isCorrect: false, feedback: 'Right-to-left processing encounters the outer bracket before knowing the inner result, which is unavailable until the inner is fully decoded.' },
      ],
      correctFeedback: 'Inner brackets must be resolved before outer ones — LIFO order. A stack lets you push context (current string + repeat count) on [ and restore it on ], naturally handling any nesting depth.',
      wrongFeedback: [
        'To decode "3[a2[c]]", you first need the result of "a2[c]", which requires decoding "2[c]" = "cc" first. What structure processes last-opened, first-resolved?',
        'On [, you pause the current string and push it. On ], you complete the inner string, repeat it, then append it to the paused context. What is that pause/resume structure?',
      ],
      highlight: { location: 'description', text: '"3[a2[c]]"' },
    },
    {
      id: 'stack-contents',
      question: 'Once processing pauses at a bracket and must resume later, what you choose to save determines whether the resume actually works. When you encounter "[", you push state onto the stack — what two pieces of information do you need to save?',
      options: [
        { label: 'The current index and the full string', isCorrect: false, feedback: 'Saving the full string repeatedly is wasteful. You only need the partial string built before this bracket opened, plus the repeat count for this bracket.' },
        { label: 'The repeat count k and the string built so far', isCorrect: true },
        { label: 'The bracket depth and the character at that depth', isCorrect: false, feedback: 'Bracket depth alone cannot reconstruct the partial string — you need the actual string content accumulated before this bracket.' },
        { label: 'Only the repeat count — the string is always rebuilt', isCorrect: false, feedback: 'Without saving the partial string, you lose the characters that preceded the current bracket and cannot reconstruct the full output.' },
      ],
      correctFeedback: 'On [, push (current_string, current_k). Reset current_string to "" and start building the inner content. On ], pop (prev_string, k) and set current_string = prev_string + k * current_string.',
      wrongFeedback: [
        'When you close the bracket with ], you need two things: the string built inside the brackets and how many times to repeat it. Where did you store the repeat count?',
        'Push (string_so_far, repeat_count) on [. On ], pop both: new_string = popped_string + repeat_count × inner_string. Both pieces are essential.',
      ],
      highlight: { location: 'description', text: 'k[encoded_string]' },
    },
    {
      id: 'multi-digit-numbers',
      question: 'Specific details about how values are formatted can break a naive parsing shortcut if you do not account for them. Repeat counts can be multi-digit (integers up to 300) — how does this affect parsing?',
      options: [
        { label: 'Treat each digit character as a separate count', isCorrect: false, feedback: 'Treating each digit separately would read "10[a]" as repeat count 1 then 0 — producing "a" then nothing instead of "aaaaaaaaaa".' },
        { label: 'Accumulate digits into a number before the bracket opens', isCorrect: true },
        { label: 'Only single-digit counts appear in practice', isCorrect: false, feedback: 'The constraint explicitly states counts up to 300, which requires three digits. Multi-digit parsing is necessary.' },
        { label: 'Convert the entire string to a list of tokens first', isCorrect: false, feedback: 'Pre-tokenizing works but is an extra pass. You can accumulate numbers in-line during the single left-to-right scan.' },
      ],
      correctFeedback: 'When you see a digit, do current_num = current_num * 10 + int(char). This builds multi-digit integers correctly. On [, push current_num as the repeat count and reset current_num to 0.',
      wrongFeedback: [
        'How would you parse "12[ab]" to extract the count 12? One digit at a time, how do you combine "1" and "2" into the integer 12?',
        'For each digit character d, update: current_num = current_num * 10 + int(d). When you hit [, current_num is the complete repeat count.',
      ],
      highlight: { location: 'constraint', text: 'All integers are in range [1, 300]' },
    },
    {
      id: 'constraint-small-length',
      question: 'Comparing two different constraints against each other can reveal a mismatch between how large the input is and how large the output must be. s.length ≤ 30 but integers range up to 300 — what does this tell you about output length?',
      options: [
        { label: 'Output is also bounded by 30 characters', isCorrect: false, feedback: 'A 30-character input like "300[a]" decodes to 300 characters. The input is short, but the decoded output can be much longer.' },
        { label: 'Output can be far longer than the input', isCorrect: true },
        { label: 'The constraint means O(n²) on the input is fine', isCorrect: false, feedback: 'O(n²) on the input (n ≤ 30) is trivially fine, but the real cost is string construction — repeated concatenation of decoded strings can be expensive.' },
        { label: 'Repeat counts are at most 30 due to string length', isCorrect: false, feedback: 'Repeat counts are explicitly stated to go up to 300. A single bracket pair can expand a short string into a much longer one.' },
      ],
      correctFeedback: 'With counts up to 300 and nesting, decoded strings can grow to thousands of characters from a 30-character input. Using a list and joining at the end avoids repeated O(n) string concatenation.',
      wrongFeedback: [
        'What is the decoded length of "300[a]"? Now what about "300[300[a]]"? How does the output size compare to s.length = 30?',
        'Repeated string concatenation builds intermediate strings at each step. For deeply nested or large-count inputs, a list that you join once at the end is more efficient.',
      ],
      highlight: { location: 'constraint', text: '1 ≤ s.length ≤ 30' },
    },
  ],
  solutionCode: `class Solution:
    def decode_string(self, s):
        stack = [["", 1]]
        num = ""
        for ch in s:
            if ch.isdigit():
                num += ch
            elif ch == '[':
                stack.append(["", int(num)])
                num = ""
            elif ch == ']':
                sub, k = stack.pop()
                stack[-1][0] += sub * k
            else:
                stack[-1][0] += ch
        return stack[0][0]`,
  solutionComplexity: { time: 'O(n + L)', space: 'O(L)' },
  solutionCaveat: 'Each stack frame holds the string built *so far at that nesting level*, not the whole decoded string — that\'s what makes popping on <code>]</code> cheap: only the innermost, just-finished piece gets repeated and folded into its parent, instead of re-scanning or rebuilding anything from the outer levels.',
  solutionExplanation: 'Every <code>[</code> starts a fresh, empty accumulator for whatever comes next, paired with the repeat count read just before it — mirroring exactly how nested calls pause an outer computation to run an inner one. Hitting <code>]</code> means the innermost piece is complete: it gets repeated <code>k</code> times and appended directly onto whatever the enclosing level had already built, so nesting resolves itself naturally from the inside out without a second pass over the string.',
}
