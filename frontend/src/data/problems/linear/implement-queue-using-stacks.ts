export default {
  id: 'implement-queue-using-stacks',
  title: 'Implement Queue using Stacks',
  difficulty: 'easy',
  description: `<p>Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue: <code>push</code>, <code>peek</code>, <code>pop</code>, and <code>empty</code>.</p><p>Implement the <code>MyQueue</code> class: <code>push(x)</code> pushes element <code>x</code> to the back of the queue. <code>pop()</code> removes and returns the element from the front of the queue. <code>peek()</code> returns the element at the front of the queue. <code>empty()</code> returns <code>true</code> if the queue is empty, <code>false</code> otherwise.</p><p>You must use only standard stack operations — push to top, peek/pop from top, size, and is-empty.</p>`,
  examples: [
    { input: 'push(1), push(2), peek(), pop(), empty()', output: 'null, null, 1, 1, false', explanation: 'peek() returns the front (1). pop() removes and returns the front (1). The queue still has 2 in it, so empty() is false.' },
  ],
  constraints: [
    '1 ≤ x ≤ 9',
    'At most 100 calls will be made to push, pop, peek, and empty',
    'All calls to pop and peek are valid (the queue will not be empty)',
  ],
  starterCode: `class MyQueue:
    def __init__(self):
        pass

    def push(self, x):
        pass

    def pop(self):
        pass

    def peek(self):
        pass

    def empty(self):
        pass`,
  runnerSetup: `def queue_run(ops, vals):
    q = MyQueue()
    results = []
    for op, v in zip(ops, vals):
        if op == 'push': q.push(v)
        elif op == 'pop': results.append(q.pop())
        elif op == 'peek': results.append(q.peek())
        elif op == 'empty': results.append(q.empty())
    return results`,
  functionName: 'queue_run',
  conceptId: 'stacks-queues',
  testCases: [
    { label: 'push, peek, pop, empty', args: [['push', 'push', 'peek', 'pop', 'empty'], [1, 2, null, null, null]], expected: [1, 1, false] },
    { label: 'interleaved push/pop across a refill', args: [['push', 'push', 'push', 'pop', 'pop', 'push', 'pop', 'pop', 'empty'], [1, 2, 3, null, null, 4, null, null, null]], expected: [1, 2, 3, 4, true] },
    { label: 'single element round trip', args: [['push', 'pop', 'empty'], [5, null, null]], expected: [5, true] },
  ],
  bruteHint: 'A stack only ever exposes its top. If push always goes onto one stack, the most recently pushed element sits on top — the opposite of what pop() needs to return for FIFO order. Simply popping that stack directly would give you the most recent element, not the oldest. What would it take to make the oldest element reachable from the top of a stack?',
  optimizeComplexity: { time: 'O(1) amortized per operation', space: 'O(n)' },
  clues: [
    {
      id: 'two-stacks-reverse-order',
      question: 'We can reason about what one stack alone cannot give us. A single stack always exposes the most-recently-pushed element on top — the opposite of what pop() needs. How can two stacks fix this?',
      highlight: { location: 'description', text: 'Implement a first-in-first-out (FIFO) queue using only two stacks.' },
      options: [
        { label: 'Use one stack for push and a second stack, kept in reverse order, for pop', isCorrect: true },
        { label: 'Alternate which stack receives each push', isCorrect: false, feedback: 'Alternating pushes splits elements across two stacks with no defined order between them — there is no way to recover FIFO order from that split alone.' },
        { label: 'Use the second stack only to count elements', isCorrect: false, feedback: 'A count lets you check emptiness, but pop() and peek() must return the correct front element, not just a number.' },
        { label: 'Sort the elements by push order every time pop() is called', isCorrect: false, feedback: 'Sorting is unnecessary work — the input already arrives in the correct order. Preserving that order through the stack transfer is the actual goal.' },
      ],
      correctFeedback: 'Popping every element off the input stack and pushing each one onto a second stack reverses the order — the very first element pushed ends up on top of the second stack, exactly where pop() needs it.',
      wrongFeedback: [
        'What operation, applied to an entire stack, produces the reverse of its current order?',
        'If you pop every element off stack A and push each one onto stack B as you go, what ends up on top of B?',
      ],
    },
    {
      id: 'lazy-transfer-amortized',
      question: 'We can reason about efficiency from how often the reversal step actually needs to run. Reversing all n elements on every single pop() would cost O(n) per call. When does the transfer from the input stack to the output stack actually need to happen?',
      options: [
        { label: 'Every time push() is called', isCorrect: false, feedback: 'Transferring on every push does unnecessary work — elements that are about to be pushed again before any pop() would just be shuffled back and forth for nothing.' },
        { label: 'Only when the output stack is empty and a pop() or peek() is requested', isCorrect: true },
        { label: 'Only once, right after the first push()', isCorrect: false, feedback: 'A single upfront transfer cannot account for elements pushed later — those need to land in the right position relative to whatever is still waiting in the output stack.' },
        { label: 'Every time pop() is called, regardless of output stack state', isCorrect: false, feedback: 'If the output stack already holds elements in the correct order, re-transferring would scramble that order — the input stack may hold newer pushes that must stay behind older, already-ordered ones.' },
      ],
      correctFeedback: 'Transfer lazily: only move elements from the input stack to the output stack when the output stack is empty and a pop() or peek() needs an answer. Each element is moved at most twice in its lifetime (once onto each stack), so the amortized cost per operation stays O(1) even though any single pop() might occasionally trigger a full transfer.',
      wrongFeedback: [
        'If the output stack still has elements left over from a previous transfer, are they already in the correct order to pop from?',
        'Each element only needs to move from the input stack to the output stack once. What condition tells you a transfer is actually needed, versus wasted work?',
      ],
    },
    {
      id: 'empty-checks-both-stacks',
      question: 'We can reason about correctness from where elements can be hiding. At any moment, a pushed element might still be sitting in the input stack, waiting to be transferred. What must empty() check?',
      highlight: { location: 'description', text: '<code>empty()</code> returns <code>true</code> if the queue is empty, <code>false</code> otherwise.' },
      options: [
        { label: 'Whether the output stack is empty', isCorrect: false, feedback: 'The output stack can be empty while the input stack still holds elements that were pushed but never transferred — reporting empty here would be wrong.' },
        { label: 'Whether the input stack is empty', isCorrect: false, feedback: 'The input stack can be empty while the output stack still holds elements left over from an earlier transfer, waiting to be popped.' },
        { label: 'Whether both the input stack and the output stack are empty', isCorrect: true },
        { label: 'Whether the total number of push() calls equals the total number of pop() calls', isCorrect: false, feedback: 'Tracking call counts separately duplicates information the two stacks already encode directly, and is easy to get out of sync with peek() calls that do not remove anything.' },
      ],
      correctFeedback: 'An element only leaves the queue once it has been popped off the output stack. As long as either stack holds anything, some pushed element has not been returned yet — so empty() must check that both stacks are empty.',
      wrongFeedback: [
        'A freshly pushed element goes straight onto the input stack, not the output stack. Does checking only one stack account for both?',
        'The queue is truly empty only when there is nowhere left an unreturned element could be sitting — how many stacks does that mean you need to check?',
      ],
    },
  ],
  solutionCode: `class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def push(self, x):
        self.in_stack.append(x)

    def pop(self):
        self.peek()
        return self.out_stack.pop()

    def peek(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]

    def empty(self):
        return not self.in_stack and not self.out_stack`,
  solutionComplexity: { time: 'O(1) amortized per operation', space: 'O(n)' },
  solutionCaveat: 'Elements only get transferred from <code>in_stack</code> to <code>out_stack</code> when <code>out_stack</code> is completely empty — refilling it early, or every time, would repeatedly re-reverse elements and destroy the amortized O(1) guarantee.',
  solutionExplanation: 'Popping every element off one stack and pushing it onto a second stack reverses their order — so the oldest-pushed element, buried at the bottom of <code>in_stack</code>, ends up on *top* of <code>out_stack</code>, exactly where a queue needs it. That transfer only has to happen when <code>out_stack</code> runs dry; each element gets moved at most twice total (once into <code>in_stack</code>, once across to <code>out_stack</code>) over its entire lifetime, which is what makes every operation O(1) on average even though a single transfer can look like it costs O(n).',
}
