export default {
  id: 'count-and-say',
  title: 'Count and Say',
  difficulty: 'medium',
  description: 'The count-and-say sequence starts with "1". Each subsequent term describes the previous: "11" (one 1), "21" (two 1s), "1211" (one 2, one 1), etc. Given <code>n</code>, return the nth term.',
  examples: [
    { input: 'n = 1', output: '"1"' },
    { input: 'n = 4', output: '"1211"', explanation: '1→11→21→1211.' },
  ],
  constraints: ['1 ≤ n ≤ 30'],
  starterCode: `def count_and_say(n):
  pass`,
  functionName: 'count_and_say',
  conceptId: 'strings',
  testCases: [
    { label: 'n=1', args: [1], expected: '1' },
    { label: 'n=2', args: [2], expected: '11' },
    { label: 'n=4', args: [4], expected: '1211' },
    { label: 'n=5', args: [5], expected: '111221' },
  ],
}
