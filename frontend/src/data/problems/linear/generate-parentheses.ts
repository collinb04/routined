export default {
  id: 'generate-parentheses',
  title: 'Generate Parentheses',
  difficulty: 'medium',
  description: `<p>Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.</p>`,
  examples: [
    { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]' },
    { input: 'n = 1', output: '["()"]' },
  ],
  constraints: ['1 <= n <= 8'],
  starterCode: `def generate_parenthesis(n):
  pass`,
  functionName: 'generate_parenthesis_run',
  conceptId: 'stack',
  runnerSetup: `def generate_parenthesis_run(n):
  return sorted(generate_parenthesis(n))`,
  testCases: [
    { label: 'n=3', args: [3], expected: ['((()))','(()())','(())()','()(())','()()()'] },
    { label: 'n=1', args: [1], expected: ['()'] },
  ],
}
