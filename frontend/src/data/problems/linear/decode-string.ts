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
  starterCode: `def decode_string(s):
  pass`,
  functionName: 'decode_string',
  conceptId: 'stack',
  testCases: [
    { label: 'Simple', args: ['3[a]2[bc]'], expected: 'aaabcbc' },
    { label: 'Nested', args: ['3[a2[c]]'], expected: 'accaccacc' },
    { label: 'Single', args: ['2[abc]'], expected: 'abcabc' },
    { label: 'No brackets', args: ['abc'], expected: 'abc' },
  ],
  clues: [
    {
      id: 'nesting-implies-stack',
      question: '"3[a2[c]]" has nested brackets. What does nesting imply about how you process the inner content?',
      options: [
        { label: 'Find matching brackets with two pointers', isCorrect: false, feedback: 'Two pointers can locate one bracket pair, but nesting means the inner result must be fully decoded before the outer repetition can apply it.' },
        { label: 'Decode innermost brackets first, working outward', isCorrect: true },
        { label: 'Expand all brackets simultaneously', isCorrect: false, feedback: 'Simultaneous expansion is not well-defined for nested structures — the outer repetition depends on the result of the inner one.' },
        { label: 'Process brackets right to left', isCorrect: false, feedback: 'Right-to-left processing encounters the outer bracket before knowing the inner result, which is unavailable until the inner is fully decoded.' },
      ],
      correctFeedback: 'Inner brackets must be resolved before outer ones — LIFO order. A stack lets you push context (current string + repeat count) on [ and restore it on ], naturally handling any nesting depth.',
      wrongFeedback: [
        'To decode "3[a2[c]]", you first need the result of "a2[c]", which requires decoding "2[c]" = "cc" first. What structure processes last-opened, first-resolved?',
        'On [, you pause the current string and push it. On ], you complete the inner string, repeat it, then append it to the paused context. What is that pause/resume structure?',
      ],
    },
    {
      id: 'stack-contents',
      question: 'When you encounter "[", you push state onto the stack. What two pieces of information do you need to save?',
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
    },
    {
      id: 'multi-digit-numbers',
      question: 'Repeat counts can be multi-digit (integers up to 300). How does this affect parsing?',
      options: [
        { label: 'Treat each digit character as a separate count', isCorrect: false, feedback: 'Treating each digit separately would read "10[a]" as repeat count 1 then 0 — producing "a" then nothing instead of "aaaaaaaaaa".' },
        { label: 'Accumulate digit characters into a number before pushing', isCorrect: true },
        { label: 'Only single-digit counts appear in practice', isCorrect: false, feedback: 'The constraint explicitly states counts up to 300, which requires three digits. Multi-digit parsing is necessary.' },
        { label: 'Convert the entire string to a list of tokens first', isCorrect: false, feedback: 'Pre-tokenizing works but is an extra pass. You can accumulate numbers in-line during the single left-to-right scan.' },
      ],
      correctFeedback: 'When you see a digit, do current_num = current_num * 10 + int(char). This builds multi-digit integers correctly. On [, push current_num as the repeat count and reset current_num to 0.',
      wrongFeedback: [
        'How would you parse "12[ab]" to extract the count 12? One digit at a time, how do you combine "1" and "2" into the integer 12?',
        'For each digit character d, update: current_num = current_num * 10 + int(d). When you hit [, current_num is the complete repeat count.',
      ],
    },
    {
      id: 'constraint-small-length',
      question: 's.length ≤ 30 but integers range up to 300. What does this tell you about output length?',
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
    },
  ],
}
