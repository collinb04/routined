export default {
  id: 'text-justification',
  title: 'Text Justification',
  difficulty: 'hard',
  description: 'Given an array of strings <code>words</code> and a width <code>maxWidth</code>, format the text so each line has exactly <code>maxWidth</code> characters and is fully left-and-right justified. The last line should be left-justified.',
  examples: [
    { input: 'words=["This","is","an","example","of","text","justification."], maxWidth=16', output: '["This    is    an","example  of text","justification.  "]' },
  ],
  constraints: ['1 ≤ words.length ≤ 300', '1 ≤ words[i].length ≤ 20', '1 ≤ maxWidth ≤ 100', 'words[i] consists of only English letters and symbols'],
  starterCode: `def full_justify(words, max_width):
  pass`,
  functionName: 'full_justify',
  conceptId: 'strings',
  testCases: [
    { label: 'Standard', args: [['This','is','an','example','of','text','justification.'],16], expected: ['This    is    an','example  of text','justification.  '] },
    { label: 'Single word', args: [['What','must','be','acknowledgment','shall','be'],16], expected: ['What   must   be','acknowledgment  ','shall be        '] },
  ],
}
