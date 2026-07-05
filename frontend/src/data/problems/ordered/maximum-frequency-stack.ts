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
  clues: [
    {
      id: 'pop-priority-rule',
      question: 'pop returns the most frequent element, with ties broken by most recently pushed. What two properties must you track per element?',
      options: [
        { label: 'Value and its insertion index', isCorrect: false, feedback: 'Insertion index helps with recency, but without frequency you cannot determine which element has the highest frequency to begin ranking by. You need both frequency and recency.' },
        { label: 'Frequency count and push order (recency)', isCorrect: true },
        { label: 'Value and position in the underlying array', isCorrect: false, feedback: 'Array position changes as elements are added. You need logical push order (a monotonically increasing counter) and frequency, not a physical position.' },
        { label: 'Frequency count only', isCorrect: false, feedback: 'Frequency determines the winner when there is no tie, but with 2 × 10⁴ pushes there will be ties. Without recency you cannot break them correctly.' },
      ],
      correctFeedback: 'Every push increments the element\'s frequency count and records a push-order timestamp. pop selects by (frequency descending, timestamp descending) — both fields are required.',
      wrongFeedback: [
        'The pop rule has two clauses: frequency first, recency as tiebreaker. Which two pieces of per-element information encode each clause?',
        'Frequency ranks which elements are candidates. Recency picks the winner among tied candidates. Your data structure needs to store and compare both.',
      ],
    },
    {
      id: 'tie-breaking-structure',
      question: 'Elements with the same maximum frequency must be returned in most-recently-pushed order. What structure naturally maintains that ordering?',
      options: [
        { label: 'A sorted list of (frequency, timestamp, value) tuples', isCorrect: false, feedback: 'A sorted list requires O(n) insertion to maintain order. With up to 2 × 10⁴ operations, you need O(log n) or better per push and pop.' },
        { label: 'A stack per frequency level', isCorrect: true },
        { label: 'A queue per frequency level', isCorrect: false, feedback: 'A queue returns the oldest element at a given frequency, not the most recent. FIFO is the wrong order for this tie-breaking rule — you need LIFO (stack) behavior.' },
        { label: 'A heap keyed by (frequency, timestamp)', isCorrect: false, feedback: 'A heap works correctly and is O(log n) per operation, but a stack-per-frequency-level is O(1) per operation. The stack approach exploits the fact that pushes within a frequency group arrive in order.' },
      ],
      correctFeedback: 'freq_to_stack[f] holds all elements currently at frequency f, in push order. The top of the highest-frequency stack is always the correct pop target — O(1) per operation.',
      wrongFeedback: [
        'Consider all elements at frequency 2. Among them, which should be popped next? What structure gives you the most-recently-pushed element at the top?',
        'Elements pushed at the same frequency level arrive in chronological order. A stack at each frequency level automatically keeps the most recent at the top.',
      ],
    },
    {
      id: 'max-frequency-tracking',
      question: 'You need to know the current maximum frequency to find the right stack. How should you maintain it?',
      options: [
        { label: 'Scan all frequency counts on every pop', isCorrect: false, feedback: 'Scanning all counts on every pop costs O(distinct values) per pop. With up to 2 × 10⁴ operations and up to 10⁹ distinct values, this is impractical.' },
        { label: 'Keep a max_freq variable; increment on push, decrement when top stack empties', isCorrect: true },
        { label: 'Use a max-heap of (frequency, value) pairs', isCorrect: false, feedback: 'A max-heap gives O(log n) access to the max frequency. The stack-per-level approach can do it in O(1) by maintaining a single integer max_freq that is updated on push and pop.' },
        { label: 'Recompute from the freq_count map each time', isCorrect: false, feedback: 'Recomputing max from the frequency map is O(distinct values) per operation. A single max_freq variable updated incrementally is O(1).' },
      ],
      correctFeedback: 'max_freq increases by 1 on each push (when the element\'s new frequency equals max_freq + 1). It decreases by 1 on pop only when freq_to_stack[max_freq] becomes empty after the pop.',
      wrongFeedback: [
        'max_freq can only increase by 1 per push (one element\'s frequency went up by one). When can it decrease, and by how much?',
        'After a pop, if the stack at max_freq is now empty, no element has that frequency anymore. What should max_freq become?',
      ],
    },
    {
      id: 'push-bookkeeping',
      question: 'When push(val) is called, what state must be updated?',
      options: [
        { label: 'Only freq_count[val]', isCorrect: false, feedback: 'Updating the frequency count alone leaves freq_to_stack and max_freq stale. All three must stay consistent so that pop can find the right element in O(1).' },
        { label: 'freq_count[val], freq_to_stack[new_freq], and max_freq', isCorrect: true },
        { label: 'Only freq_to_stack at the new frequency level', isCorrect: false, feedback: 'Appending to the stack without updating freq_count means you lose track of how many times each value has been pushed — future pushes of the same value will use the wrong frequency level.' },
        { label: 'freq_count[val] and max_freq only', isCorrect: false, feedback: 'Without appending val to freq_to_stack[new_freq], the pop operation has no record of where to find this element at its new frequency level.' },
      ],
      correctFeedback: 'Three steps: (1) increment freq_count[val] to get new_freq, (2) append val to freq_to_stack[new_freq], (3) update max_freq = max(max_freq, new_freq). All three are O(1).',
      wrongFeedback: [
        'pop needs to look up freq_to_stack[max_freq]. For that to work, what must push have done to both freq_count and freq_to_stack?',
        'Think about what pop reads: max_freq and freq_to_stack[max_freq]. Every field pop reads must be written correctly by push.',
      ],
    },
  ],
}
