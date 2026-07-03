export default {
  id: 'min-stack',
  title: 'Min Stack',
  difficulty: 'medium',
  description: `<p>Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.</p><p>Implement the <code>MinStack</code> class with the operations: <code>push(val)</code>, <code>pop()</code>, <code>top()</code> → int, <code>get_min()</code> → int.</p>`,
  examples: [
    { input: 'push(-2), push(0), push(-3), get_min(), pop(), top(), get_min()', output: '-3, 0, -2' },
  ],
  constraints: ['-2^31 <= val <= 2^31 - 1', 'Methods pop, top and get_min will always be called on non-empty stacks'],
  starterCode: `class MinStack:
  def __init__(self):
      pass

  def push(self, val):
      pass

  def pop(self):
      pass

  def top(self):
      pass

  def get_min(self):
      pass`,
  functionName: 'min_stack_run',
  conceptId: 'stack',
  runnerSetup: `def min_stack_run(ops, vals):
  ms = MinStack()
  results = []
  for op, v in zip(ops, vals):
      if op == 'push': ms.push(v)
      elif op == 'pop': ms.pop()
      elif op == 'top': results.append(ms.top())
      elif op == 'get_min': results.append(ms.get_min())
  return results`,
  testCases: [
    { label: 'push/get_min/pop', args: [['push','push','push','get_min','pop','top','get_min'],[-2,0,-3,0,0,0,0]], expected: [-3,0,-2] },
    { label: 'simple', args: [['push','push','get_min','pop','get_min'],[5,3,0,0,0]], expected: [3,5] },
  ],
}
