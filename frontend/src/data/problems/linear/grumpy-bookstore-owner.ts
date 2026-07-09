export default {
  id: 'grumpy-bookstore-owner',
  title: 'Grumpy Bookstore Owner',
  difficulty: 'medium',
  description: 'A bookstore owner has customers per minute and a grumpy array where <code>grumpy[i] = 1</code> means they are grumpy that minute. They can suppress grumpiness for <code>minutes</code> consecutive minutes. Return the maximum satisfied customers.',
  examples: [
    { input: 'customers=[1,0,1,2,1,1,7,5], grumpy=[0,1,0,1,0,1,0,1], minutes=3', output: '16', explanation: 'Suppress grumpiness minutes 3–5.' },
  ],
  constraints: ['n == customers.length == grumpy.length', '1 ≤ minutes ≤ n ≤ 2 × 10⁴', '0 ≤ customers[i] ≤ 1000'],
  starterCode: `def max_satisfied(customers, grumpy, minutes):
  pass`,
  functionName: 'max_satisfied',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'Standard', args: [[1,0,1,2,1,1,7,5],[0,1,0,1,0,1,0,1],3], expected: 16 },
    { label: 'Never grumpy', args: [[1,2,3],[0,0,0],1], expected: 6 },
  ],
  bruteHint: 'Describe checking every window of `minutes` consecutive minutes by recomputing its gain from scratch, and the resulting time complexity',
  optimizeHint: 'Name the technique that slides the window across the array, updating the gain in O(1) per step',
  clues: [
    {
      id: 'fixed-window-size',
      question: 'The suppression lasts exactly <code>minutes</code> consecutive minutes — a fixed duration. What sliding window variant does a fixed window length suggest?',
      options: [
        { label: 'Variable-size window shrunk on a condition', isCorrect: false, feedback: 'Variable-size windows expand and contract based on a validity condition. Here the window size is fixed at exactly `minutes` — there\'s no condition that changes its size.' },
        { label: 'Fixed-size window sliding across the array', isCorrect: true },
        { label: 'Two pointers scanning from both ends', isCorrect: false, feedback: 'Two pointers from both ends work when you\'re looking for a pair that satisfies a condition. Here you\'re sliding a fixed-length window in one direction to find the best position.' },
        { label: 'Prefix sums to query arbitrary ranges', isCorrect: false, feedback: 'Prefix sums can answer range-sum queries, but they don\'t identify the best window placement on their own. The fixed-size sliding window directly finds the optimal position in O(n).' },
      ],
      correctFeedback: 'A fixed-size window of length `minutes` slides from index 0 to n - minutes. At each position you compute the extra customers gained — and you want to maximize that gain.',
      wrongFeedback: [
        'The suppression window is always exactly `minutes` long — it doesn\'t grow or shrink. What kind of sliding window has a constant size?',
        'When the window size never changes, you add the new right element and remove the old left element at each step. What pattern is that?',
      ],
    },
    {
      id: 'decompose-problem',
      question: 'The total satisfied customers = always-satisfied customers + extra customers from the suppression window. What does this decomposition tell you about what to maximize?',
      options: [
        { label: 'Maximize total customers in the window', isCorrect: false, feedback: 'Maximizing total customers in the window includes customers who were already satisfied (grumpy[i] = 0). Those are already counted in the base total — you only want the extra ones the suppression adds.' },
        { label: 'Maximize grumpy customers in the window', isCorrect: true },
        { label: 'Minimize grumpy minutes outside the window', isCorrect: false, feedback: 'You can\'t control grumpy minutes outside the window — those customers are lost. The suppression only helps inside the window, so focus there.' },
        { label: 'Maximize non-grumpy customers inside the window', isCorrect: false, feedback: 'Non-grumpy customers inside the window (grumpy[i] = 0) are already satisfied without the suppression — they\'re part of the base total. The window only adds value for grumpy minutes (grumpy[i] = 1).' },
      ],
      correctFeedback: 'Start with the base sum of customers at all non-grumpy minutes. The suppression converts grumpy minutes within the window to satisfied. So you maximize the sum of customers[i] where grumpy[i] = 1 across all windows of size `minutes`.',
      wrongFeedback: [
        'Non-grumpy customers are satisfied regardless of the window. Which customers does the suppression actually add to the total?',
        'Split the problem: base satisfied (grumpy = 0 always) plus bonus from window (grumpy = 1, inside window). Which part are you optimizing by choosing the window position?',
      ],
    },
    {
      id: 'constraint-size',
      question: 'n ≤ 2 × 10⁴. What complexity is comfortably acceptable here?',
      options: [
        { label: 'O(n²) — try all (start, end) pairs', isCorrect: false, feedback: 'O(n²) at n = 20,000 is 400 million operations. A fixed-size sliding window processes the array in a single O(n) pass — no reason to try all pairs.' },
        { label: 'O(n) with a single sliding window pass', isCorrect: false },
        { label: 'O(n) in one or two linear passes', isCorrect: true },
        { label: 'O(n log n) at minimum due to window search', isCorrect: false, feedback: 'No sorting or binary search is needed. The window slides linearly — each element enters and exits exactly once, giving O(n) total.' },
      ],
      correctFeedback: 'Two O(n) passes — one to compute the base total, one for the sliding window — gives O(n) overall. At n = 20,000 that\'s trivially fast.',
      wrongFeedback: [
        'How many times does each element need to be visited when a fixed-size window slides from left to right?',
        'Each element is added to the window once and removed once. What total complexity does that give for processing all n elements?',
      ],
    },
  ],
}
