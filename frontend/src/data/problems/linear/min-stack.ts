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
  bruteHint: 'The brute-force approach scans the entire stack on every get_min() call to find the current minimum, which is correct but costs O(n) time per call. If push and get_min operations are interleaved heavily across n total operations, how much total work would that scanning approach cost, and does that satisfy an O(1) per-operation requirement?',
  optimizeComplexity: { time: 'O(1)', space: 'O(n)' },
  clues: [
    {
      id: 'get-min-complexity',
      question: 'We can rule out certain approaches based on the time complexity required for an operation. get_min() must run in O(1) time. What does that rule out?',
      highlight: { location: 'description', text: 'retrieving the minimum element in constant time' },
      options: [
        { label: 'Scanning the stack on each call', isCorrect: false },
        { label: 'Sorting the stack to find the min', isCorrect: false, feedback: 'Sorting takes O(n log n) and destroys stack order. get_min() must be O(1) and leave the stack intact.' },
        { label: 'Storing auxiliary min info per element', isCorrect: true },
        { label: 'Extracting the smallest remaining value in O(log n) time', isCorrect: false, feedback: 'A heap gives O(log n) extraction, not O(1). The constraint requires constant time.' },
      ],
      correctFeedback: 'Scanning or sorting the stack on each call is O(n). To hit O(1), you need to precompute and store the minimum alongside each element as you push.',
      wrongFeedback: [
        'If you can only look at one thing in O(1), what must already be stored by the time get_min() is called?',
        'You cannot search at query time. The minimum must be recorded at push time — what is the minimum reachable from each element?',
      ],
    },
    {
      id: 'pop-invalidates-min',
      question: 'We can determine what information needs to persist based on how the required state changes over time. After pop(), the minimum may change. How do you keep get_min() correct?',
      options: [
        { label: 'Recompute from the remaining stack', isCorrect: false, feedback: 'Recomputing scans the stack in O(n), violating the O(1) requirement.' },
        { label: 'Track the global minimum separately', isCorrect: false, feedback: 'A single global minimum loses history. After popping the current minimum, you have no way to recover the previous minimum without rescanning.' },
        { label: 'Store each element with its current stack minimum', isCorrect: true },
        { label: 'Refuse to pop the minimum element', isCorrect: false, feedback: 'The problem requires a standard pop() that removes the top element unconditionally.' },
      ],
      correctFeedback: 'By storing (value, current_min) per push, the minimum for any stack state is always on top — popping restores the previous minimum automatically.',
      wrongFeedback: [
        'When you pop the current minimum, how do you know what was the minimum before it was pushed?',
        'You need the minimum at every prior stack state, not just the current one. What structure naturally holds historical states?',
      ],
    },
    {
      id: 'non-empty-guarantee',
      question: 'We can rule out certain defensive checks based on the guarantees the problem gives about input state. The problem guarantees pop, top, and get_min are always called on non-empty stacks. What does that let you skip?',
      highlight: { location: 'constraint', text: 'Methods pop, top and get_min will always be called on non-empty stacks' },
      options: [
        { label: 'Tracking the stack size', isCorrect: false },
        { label: 'Bounds checking on every operation', isCorrect: true },
        { label: 'Handling negative values', isCorrect: false, feedback: 'Negative values are valid inputs (val can be as low as −2³¹). The guarantee is about stack state, not value range.' },
        { label: 'Returning None when stack is empty', isCorrect: false },
      ],
      correctFeedback: 'The guarantee means you never need to check "is the stack empty?" before pop, top, or get_min. Those guard clauses are dead code here.',
      wrongFeedback: [
        'What error would normally occur if pop() or get_min() were called on an empty stack? Does this problem require you to handle that?',
        'The guarantee is a permission: something you would normally defend against is explicitly off the table here.',
      ],
    },
  ],
  solutionCode: `class MinStack:
    def __init__(self):
        self.stack = []

    def push(self, val):
        min_val = val if not self.stack else min(val, self.stack[-1][1])
        self.stack.append((val, min_val))

    def pop(self):
        self.stack.pop()

    def top(self):
        return self.stack[-1][0]

    def get_min(self):
        return self.stack[-1][1]`,
  solutionComplexity: { time: 'O(1)', space: 'O(n)' },
  solutionCaveat: 'Each entry stores "the minimum of everything at or below this point," not just its own value — that redundancy is exactly what makes <code>get_min()</code> O(1): popping never has to recompute anything, since the new top already knows the correct minimum for what remains.',
  solutionExplanation: 'Pairing every pushed value with the running minimum *at the moment it was pushed* means each stack frame carries its own complete answer to "what is the minimum so far," so popping an element never loses information — the new top was already tracking the correct minimum for everything beneath it. This trades a small constant amount of extra space per element for making every single operation, including <code>get_min()</code>, a direct O(1) lookup instead of a scan.',
}
