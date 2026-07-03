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
}
