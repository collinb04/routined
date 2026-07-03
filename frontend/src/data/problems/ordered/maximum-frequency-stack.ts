export default {
  id: 'maximum-frequency-stack',
  title: 'Maximum Frequency Stack',
  difficulty: 'hard',
  description: 'Design a stack-like data structure that supports <code>push</code> and <code>pop</code>. <code>pop</code> returns the most frequently occurring element. If tie, returns the most recently pushed among the tied elements.',
  examples: [
    { input: 'push(5),push(7),push(5),push(7),push(4),push(5),pop(),pop(),pop(),pop()', output: '[5,7,5,4]' },
  ],
  constraints: ['0 ≤ val ≤ 10⁹', 'At most 2 × 10⁴ calls to push and pop', 'pop is never called on empty stack'],
  starterCode: `class FreqStack:
  def __init__(self):
      pass

  def push(self, val):
      pass

  def pop(self):
      pass`,
  functionName: 'FreqStack',
  conceptId: 'heap',
  testCases: [
    { label: 'Standard', args: [[[5,7,5,7,4,5]]], expected: [5,7,5,4] },
  ],
}
