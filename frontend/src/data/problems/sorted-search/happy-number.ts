export default {
  id: 'happy-number',
  title: 'Happy Number',
  difficulty: 'easy',
  description: 'A number is "happy" if repeatedly replacing it with the sum of the squares of its digits eventually reaches 1. Return <code>true</code> if <code>n</code> is a happy number, <code>false</code> otherwise.',
  examples: [
    { input: 'n = 19', output: 'true', explanation: '1² + 9² = 82 → 68 → 100 → 1.' },
    { input: 'n = 2', output: 'false', explanation: 'Enters a cycle that never reaches 1.' },
  ],
  constraints: ['1 ≤ n ≤ 2³¹ − 1'],
  starterCode: `class Solution:
    def is_happy(self, n):
        pass`,
  runnerSetup: 'is_happy = Solution().is_happy',
  functionName: 'is_happy',
  conceptId: 'fast-slow',
  testCases: [
    { label: '19 is happy', args: [19], expected: true },
    { label: '2 is not happy', args: [2], expected: false },
    { label: '1 is happy', args: [1], expected: true },
    { label: '7 is happy', args: [7], expected: true },
    { label: '4 is not happy', args: [4], expected: false },
  ],
  bruteHint: 'The direct approach repeats the digit-square-sum transformation on n and stores every value you\'ve computed in a hash set. Before each step, check whether the current value is already in the set — if it is, you\'ve found a cycle and can return false; if you reach 1, return true. Since the sequence quickly shrinks into a small bounded range, this takes O(log n) time and O(log n) space to store the visited values. Do you actually need to remember every value you\'ve seen, or could two pointers moving at different speeds reveal the same cycle?',
  optimizeComplexity: { time: 'O(log n)', space: 'O(1)' },
  clues: [
    {
      id: 'termination-condition',
      question: 'Example walkthroughs often expose the edge case a naive approach misses. "Enters a cycle that never reaches 1." For unhappy numbers, the process loops forever. What does this tell you about when to stop?',
      options: [
        { label: 'Run a fixed number of iterations', isCorrect: false, feedback: 'A fixed iteration count would either miss the answer for slow-converging happy numbers or terminate too early. The real signal is whether a value repeats — that\'s a cycle, not a count.' },
        { label: 'Detect a repeated value to identify a cycle', isCorrect: true },
        { label: 'Stop when the number exceeds 2³¹ − 1', isCorrect: false, feedback: 'The sum of squared digits always shrinks large numbers quickly — n = 2³¹ − 1 ≈ 2 billion reduces to at most 9² × 10 = 810 after one step. The number won\'t grow past a small bound, so overflow is not the termination signal.' },
        { label: 'Stop when the number becomes odd', isCorrect: false, feedback: 'Parity has no bearing on happiness. The number 1 is odd and happy; 4 is even and not. The relevant condition is whether the sequence reaches 1 or cycles.' },
      ],
      correctFeedback: 'Unhappy numbers enter a cycle — a value they\'ve seen before. A hash set of visited values detects this in O(1) per lookup. When you see a repeat, you know you\'re looping and can return false.',
      wrongFeedback: [
        'The sequence either reaches 1 (happy) or repeats a value (cycle, not happy). How do you detect that a value has appeared before?',
        'Keep a set of every value you\'ve processed. If the next value is already in the set, you\'ve found the cycle.',
      ],
    },
    {
      id: 'digit-sum-computation',
      highlight: { location: 'description', text: 'the sum of the squares of its digits' },
      question: 'The problem description often spells out the exact arithmetic operation you need. "Sum of the squares of its digits." For n = 19: 1² + 9² = 82. What operation extracts digits one at a time?',
      options: [
        { label: 'Convert to string, iterate characters', isCorrect: false, feedback: 'String conversion works, but it\'s not the only approach. The arithmetic approach uses n % 10 to get the last digit and n // 10 to remove it — no string conversion needed.' },
        { label: 'Use n % 10 and n // 10 in a loop', isCorrect: true },
        { label: 'Take the square root of n', isCorrect: false, feedback: 'The square root of n is unrelated to extracting digits. You need the individual decimal digits of n, not a root.' },
        { label: 'Divide n by the number of digits', isCorrect: false, feedback: 'Dividing by digit count doesn\'t isolate individual digits. The modulo-10 / integer-divide-10 loop is the standard digit extraction pattern.' },
      ],
      correctFeedback: 'n % 10 gives the units digit; n // 10 removes it. Repeat until n == 0. This extracts all digits in O(log n) steps, which is the number of digits.',
      wrongFeedback: [
        'To get the last digit of 19, what is 19 % 10? To remove that digit, what is 19 // 10?',
        'Each iteration: digit = n % 10, square it and add to the sum, then n = n // 10. Stop when n == 0.',
      ],
    },
    {
      id: 'cycle-detection-alternative',
      question: 'Recognizing why multiple techniques solve the same problem reveals the structural property they all depend on. A hash set detects cycles, but Floyd\'s cycle detection (slow/fast pointers) also works. What property of this sequence makes both valid?',
      options: [
        { label: 'The sequence is monotonically decreasing', isCorrect: false, feedback: 'The sequence is not monotone — n = 19 goes 19 → 82, which is an increase. The sequence bounces unpredictably before either reaching 1 or cycling.' },
        { label: 'Every value deterministically produces exactly one next value', isCorrect: true },
        { label: 'The sequence always enters the cycle at the same point', isCorrect: false, feedback: 'Different unhappy numbers enter different cycles at different points. The shared property is that each value has exactly one successor, making both set-based and pointer-based detection valid.' },
        { label: 'The cycle length is always the same', isCorrect: false, feedback: 'Cycle lengths vary. The common unhappy cycle visits {4, 16, 37, 58, 89, 145, 42, 20}, but different starting points may enter it at different values. Cycle length is not fixed.' },
      ],
      correctFeedback: 'This is a functional graph: each integer has exactly one successor (the digit-square sum). That determinism means a sequence must either terminate at 1 or eventually revisit a node — the two conditions both cycle detectors look for.',
      wrongFeedback: [
        'Both a set and slow/fast pointers detect cycles in sequences. What must be true about the sequence for either method to be guaranteed to work?',
        'If a value could map to multiple successors, the path would branch and Floyd\'s method would break. One value → one successor is what makes the sequence a detectable cycle.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def is_happy(self, n):
        def next_val(x):
            total = 0
            while x:
                x, d = divmod(x, 10)
                total += d * d
            return total

        slow, fast = n, next_val(n)
        while fast != 1 and slow != fast:
            slow = next_val(slow)
            fast = next_val(next_val(fast))
        return fast == 1`,
  solutionComplexity: { time: 'O(log n)', space: 'O(1)' },
  solutionCaveat: '<code>fast</code> is initialized one step ahead of <code>slow</code> before the loop starts — comparing them at the very same starting position would trivially "detect a cycle" of length zero on the first check, before the sequence has gone anywhere.',
  solutionExplanation: 'Since every number maps to exactly one next value via the digit-square-sum transformation, repeatedly applying it traces out a path that is indistinguishable from walking a linked list — one that either reaches 1 (which then loops to itself forever, since 1²=1) or falls into some other cycle that never includes 1. Floyd\'s tortoise-and-hare — one pointer advancing once per step, the other twice — detects either outcome without needing a hash set to remember every value visited: reaching <code>fast == 1</code> means happy, and <code>slow == fast</code> anywhere else means a non-1 cycle was found.',
}
