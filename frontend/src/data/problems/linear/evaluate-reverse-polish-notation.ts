export default {
  id: 'evaluate-reverse-polish-notation',
  title: 'Evaluate Reverse Polish Notation',
  difficulty: 'medium',
  description: `<p>You are given an array of strings <code>tokens</code> that represents an arithmetic expression in Reverse Polish Notation. Evaluate the expression and return an integer representing the value of the expression.</p><p>Valid operators are <code>+</code>, <code>-</code>, <code>*</code>, and <code>/</code>. Integer division truncates toward zero.</p>`,
  examples: [
    { input: 'tokens = ["2","1","+","3","*"]', output: '9 ((2+1)*3)' },
    { input: 'tokens = ["4","13","5","/","+"]', output: '6 (4+(13/5))' },
  ],
  constraints: ['1 <= tokens.length <= 10^4', 'tokens[i] is either an operator or an integer'],
  starterCode: `def eval_rpn(tokens):
  pass`,
  functionName: 'eval_rpn',
  conceptId: 'stack',
  testCases: [
    { label: '(2+1)*3', args: [['2','1','+','3','*']], expected: 9 },
    { label: '4+(13/5)', args: [['4','13','5','/','+']],  expected: 6 },
    { label: 'negative', args: [['10','6','9','3','+','-11','*','/','+','17','+','5','+']], expected: 22 },
  ],
}
