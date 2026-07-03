export default {
  id: 'interleaving-string',
  title: 'Interleaving String',
  difficulty: 'medium',
  description: 'Given strings <code>s1</code>, <code>s2</code>, and <code>s3</code>, return <code>true</code> if <code>s3</code> can be formed by interleaving <code>s1</code> and <code>s2</code> (preserving relative orders of s1 and s2).',
  examples: [
    { input: 's1="aabcc", s2="dbbca", s3="aadbbcbcac"', output: 'true' },
    { input: 's1="aabcc", s2="dbbca", s3="aadbbbaccc"', output: 'false' },
  ],
  constraints: ['0 ≤ s1.length, s2.length ≤ 100', 's3.length == s1.length + s2.length'],
  starterCode: `def is_interleave(s1, s2, s3):
  pass`,
  functionName: 'is_interleave',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Valid interleave', args: ['aabcc','dbbca','aadbbcbcac'], expected: true },
    { label: 'Invalid interleave', args: ['aabcc','dbbca','aadbbbaccc'], expected: false },
    { label: 'Empty strings', args: ['','',''], expected: true },
  ],
}
