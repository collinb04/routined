export default {
  id: 'encode-decode-strings',
  title: 'Encode and Decode Strings',
  difficulty: 'medium',
  description: 'Design an algorithm to encode a list of strings to a single string, then decode it back. The encoded string must be transmittable and decodable without ambiguity, even if strings contain any characters.',
  examples: [
    { input: 'strs = ["Hello","World"]', output: '["Hello","World"]', explanation: 'Encode then decode returns original list.' },
  ],
  constraints: ['0 ≤ strs.length ≤ 200', '0 ≤ strs[i].length ≤ 200', 'strs[i] may contain any ASCII character'],
  starterCode: `class Codec:
    def encode(self, strs):
        pass

    def decode(self, s):
        pass`,
  functionName: '_roundtrip',
  runnerSetup: `def _roundtrip(strs):
    codec = Codec()
    return codec.decode(codec.encode(strs))`,
  conceptId: 'strings',
  testCases: [
    { label: 'Basic roundtrip', args: [['Hello','World']], expected: ['Hello','World'] },
    { label: 'Empty strings', args: [['','']], expected: ['',''] },
    { label: 'Special chars', args: [['a/b','c#d']], expected: ['a/b','c#d'] },
  ],
  bruteHint: 'A natural first attempt is to join all the strings together with a fixed separator — a comma, say — and split on that same separator to decode. That works fine on "Hello" and "World", but strs[i] may contain any ASCII character, including whatever separator you chose. Once one of the input strings itself contains a comma, splitting on commas can no longer tell you where one string ends and the next begins. What would it take to mark each string\'s boundary in a way that doesn\'t depend on any particular character never showing up in the data?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'any-ascii-character',
      question: 'A constraint on which characters can appear in the input tells you which encoding tricks are unsafe to rely on. "strs[i] may contain any ASCII character" — what does this rule out as a delimiter?',
      options: [
        { label: 'Any single character as delimiter', isCorrect: true },
        { label: 'Delimiters longer than one character', isCorrect: false, feedback: 'Multi-character sequences are actually safer — a string can contain "#" but is far less likely to contain "#4#" (length-prefixed encoding). The constraint rules out simple single-character delimiters, not longer markers.' },
        { label: 'Using the string length at all', isCorrect: false, feedback: 'Length information is never forbidden — it doesn\'t appear inside the strings themselves. The constraint is specifically about characters that could collide with string content.' },
        { label: 'Nothing — delimiters always work', isCorrect: false, feedback: 'A delimiter of "|" fails the moment any string contains "|". With any ASCII character allowed, every single-character delimiter is guaranteed to appear in some string.' },
      ],
      correctFeedback: 'Every printable character — comma, pipe, slash, null byte — can legally appear in a string. A single-character delimiter will always collide with some input. You need a scheme that encodes length explicitly.',
      wrongFeedback: [
        'Pick a delimiter: "|", ",", "#". Can any of those appear in the strings? What does the constraint say?',
        'If every ASCII character can be inside a string, what happens when your delimiter also appears inside a string?',
      ],
      highlight: { location: 'constraint', text: 'strs[i] may contain any ASCII character' },
    },
    {
      id: 'output-structure',
      question: 'When two operations must be exact inverses of each other, what the first one produces tells you what information the second one needs preserved to undo it. The output of encode is a single string that decode must reverse — what information must the encoding preserve?',
      options: [
        { label: 'The total character count only', isCorrect: false, feedback: 'Total character count tells you how many characters exist but not where one string ends and the next begins. You need per-string boundaries.' },
        { label: 'Each string\'s length and position', isCorrect: false },
        { label: 'The length of each individual string', isCorrect: true },
        { label: 'A sorted order of all strings', isCorrect: false, feedback: 'Sorting discards the original order, which decode must restore. The output must reconstruct the exact original list — order included.' },
      ],
      correctFeedback: 'If decode knows the length of each string, it can extract exactly that many characters at each step without needing any delimiter at all. Length-prefixed encoding is the standard fix.',
      wrongFeedback: [
        'What does decode need to know to pull out exactly "Hello" and then exactly "World" from one long string?',
        'Think about reading the encoded string character by character. What one number would let you know exactly when to stop for each string?',
      ],
      highlight: { location: 'description', text: 'decodable without ambiguity' },
    },
    {
      id: 'empty-string-guarantee',
      question: 'A lower bound of zero in a size constraint is usually a deliberate signal about an edge case your solution must handle, not just a formality. "0 ≤ strs[i].length ≤ 200" — empty strings are allowed. What edge case must your encoding handle?',
      options: [
        { label: 'Empty list (strs.length = 0)', isCorrect: false, feedback: 'An empty list is a separate edge case (from "0 ≤ strs.length"). This constraint is about individual strings of length zero — your encoding must distinguish "" from nothing.' },
        { label: 'A string of exactly 200 characters', isCorrect: false, feedback: '200 is just the maximum — it doesn\'t create a special encoding problem. An empty string is the tricky case: it has no characters to encode yet still occupies a slot in the list.' },
        { label: 'Encoding a string with zero characters', isCorrect: true },
        { label: 'Nothing — empty strings encode naturally', isCorrect: false, feedback: 'An encoding like joining with a delimiter will silently merge or drop empty strings. Decode must be able to reconstruct ["", ""] as two distinct strings, not one.' },
      ],
      correctFeedback: 'A length-prefix of "0#" followed by zero characters correctly encodes an empty string. Delimiter-based schemes collapse consecutive delimiters and lose empty strings entirely.',
      wrongFeedback: [
        'How does your encoding scheme distinguish ["", "a"] from ["a"]?',
        'Whatever scheme you use, run it mentally on ["", ""]. Does decode produce exactly two empty strings, or does something collapse?',
      ],
      highlight: { location: 'constraint', text: '0 ≤ strs[i].length ≤ 200' },
    },
  ],
  solutionCode: `class Codec:
    def encode(self, strs):
        return ''.join(f'{len(s)}#{s}' for s in strs)

    def decode(self, s):
        result = []
        i = 0
        while i < len(s):
            j = s.index('#', i)
            length = int(s[i:j])
            result.append(s[j + 1:j + 1 + length])
            i = j + 1 + length
        return result`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'The length prefix is what makes this safe against *any* character showing up in the data, delimiter included — <code>decode</code> never needs to search for a delimiter inside the string content, only for the very next <code>#</code>, whose position is fully determined by the number just read.',
  solutionExplanation: 'Prefixing each string with its own length before a marker character sidesteps the entire "what if the delimiter appears in the data" problem, because decode never has to guess where a string ends — it reads the length, jumps forward exactly that many characters, and knows precisely where the next length prefix starts. This works for every string in the constraint, including empty ones (<code>len(s)=0</code> just means zero characters follow the marker) and ones containing the marker character itself, since it is never searched for past the position the length already determined.',
  solution: {
    patternName: 'Self-describing serialization — use when you must encode a list of arbitrary strings into one string and reverse it exactly, with no character you can safely reserve as a separator',
    approaches: [
      {
        approachName: 'Escaped delimiter',
        oneLineIdea: 'Escape the delimiter wherever it appears inside a string, then join',
        subgoals: [
          { label: 'Pick a delimiter and an escape character', explanation: 'Any single character works as long as every occurrence of it inside the data gets escaped' },
          { label: 'Escape occurrences before joining', explanation: 'Every delimiter or escape character inside a string is prefixed with the escape character before strings are joined' },
          { label: 'Unescape while splitting on decode', explanation: 'Decode scans character by character, treating an escaped delimiter as literal data rather than a boundary' },
        ],
        code: `class Codec:
    DELIM = '\\x00'
    ESCAPE = '\\x01'

    def encode(self, strs):
        parts = []
        for s in strs:
            s = s.replace(self.ESCAPE, self.ESCAPE * 2)   # escape occurrences before appending
            s = s.replace(self.DELIM, self.ESCAPE + self.DELIM)
            parts.append(s + self.DELIM)                   # trailing delimiter after every string
        return ''.join(parts)

    def decode(self, s):
        result = []
        current = []
        i = 0
        while i < len(s):                                  # unescape while splitting on decode
            if s[i] == self.ESCAPE and i + 1 < len(s):
                current.append(s[i + 1])
                i += 2
            elif s[i] == self.DELIM:
                result.append(''.join(current))
                current = []
                i += 1
            else:
                current.append(s[i])
                i += 1
        return result`,
        timeComplexity: 'O(n) — every character of every string is visited a constant number of times, across both encode and decode',
        spaceComplexity: 'O(n) — the escaped string can be up to roughly double the original data in the worst case',
        whenYouWouldActuallyUseThis: 'When the encoded output needs to remain plain text with no embedded length markers — but it\'s more code to get right than length-prefixing, and every escape rule is another place to introduce a bug.',
      },
      {
        approachName: 'Length-prefix',
        oneLineIdea: 'Prefix each string with its length so decode always knows exactly how far to read',
        subgoals: [
          { label: 'Record each string\'s length up front', explanation: 'Every string is preceded by its length as a decimal number' },
          { label: 'Mark where the length ends', explanation: 'A fixed marker character, never itself a digit, separates the length from the string content' },
          { label: 'Read exactly that many characters back', explanation: 'Decode never searches for a boundary — it parses the length, then consumes precisely that many characters, regardless of what they are' },
        ],
        code: `class Codec:
    def encode(self, strs):
        parts = []
        for s in strs:
            parts.append(f'{len(s)}#{s}')       # record each string's length up front
        return ''.join(parts)

    def decode(self, s):
        result = []
        i = 0
        while i < len(s):
            j = i
            while s[j] != '#':                   # mark where the length ends
                j += 1
            length = int(s[i:j])
            start = j + 1
            result.append(s[start:start + length])  # read exactly that many characters back
            i = start + length
        return result`,
        timeComplexity: 'O(n) — encode and decode each make one linear pass over the total character count n',
        spaceComplexity: 'O(n) — the encoded string is the original data plus a small constant-size length prefix per string',
        whenYouWouldActuallyUseThis: 'The default choice — decode never has to search for or unescape anything, so no unexpected input, including embedded null bytes or the delimiter character itself, can break the encoding rule.',
      },
    ],
    comparisonTable: [
      { approach: 'Escaped delimiter', time: 'O(n)', space: 'O(n)', structuralUnlock: 'None — still relies on scanning for a delimiter character, just with an extra escaping rule layered on top to survive collisions' },
      { approach: 'Length-prefix', time: 'O(n)', space: 'O(n)', structuralUnlock: 'Knowing exactly how many characters to consume removes the need to search for or escape a delimiter at all — the boundary is a number, not a character that could collide with the data' },
    ],
    transferNote: 'Length-prefixing is the same idea behind real network protocols — HTTP\'s Content-Length header, Protocol Buffers\' length-delimited fields — anywhere a message boundary can\'t be marked with a reserved character because the payload is unrestricted. Whenever you need to serialize variable-length data with no character you can safely reserve as a separator, prefixing with an explicit length is the general fix.',
    retrievalCheck: [
      'If strs.length could be 0 (an empty list), does the length-prefix approach still round-trip correctly without any special-casing?',
      'Why can the marker character in the length-prefix approach never itself be a digit?',
      'If you needed to encode a list of integers instead of strings, would you still need any of this machinery, or does the problem disappear entirely?',
    ],
  },
}
