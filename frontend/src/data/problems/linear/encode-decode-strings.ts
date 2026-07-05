export default {
  id: 'encode-decode-strings',
  title: 'Encode and Decode Strings',
  difficulty: 'medium',
  description: 'Design an algorithm to encode a list of strings to a single string, then decode it back. The encoded string must be transmittable and decodable without ambiguity, even if strings contain any characters.',
  examples: [
    { input: 'strs = ["Hello","World"]', output: '["Hello","World"]', explanation: 'Encode then decode returns original list.' },
  ],
  constraints: ['0 ≤ strs.length ≤ 200', '0 ≤ strs[i].length ≤ 200', 'strs[i] may contain any ASCII character'],
  starterCode: `def encode(strs):
  pass

def decode(s):
  pass`,
  functionName: 'encode',
  conceptId: 'strings',
  testCases: [
    { label: 'Basic roundtrip', args: [['Hello','World']], expected: ['Hello','World'] },
    { label: 'Empty strings', args: [['','']], expected: ['',''] },
    { label: 'Special chars', args: [['a/b','c#d']], expected: ['a/b','c#d'] },
  ],
  clues: [
    {
      id: 'any-ascii-character',
      question: '"strs[i] may contain any ASCII character" — what does this rule out as a delimiter?',
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
    },
    {
      id: 'output-structure',
      question: 'The output of encode is a single string that decode must reverse. What information must the encoding preserve?',
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
    },
    {
      id: 'empty-string-guarantee',
      question: '"0 ≤ strs[i].length ≤ 200" — empty strings are allowed. What edge case must your encoding handle?',
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
    },
  ],
}
