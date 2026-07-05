export default {
  id: 'container-with-most-water',
  title: 'Container With Most Water',
  difficulty: 'medium',
  description: `<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn at position <code>i</code> with height <code>height[i]</code>.</p><p>Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water the container can store.</p>`,
  examples: [
    { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' },
    { input: 'height = [1,1]', output: '1' },
  ],
  constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
  starterCode: `def max_area(height):
  pass`,
  functionName: 'max_area',
  conceptId: 'two-pointers',
  testCases: [
    { label: '[1,8,6,2,5,4,8,3,7]', args: [[1,8,6,2,5,4,8,3,7]], expected: 49 },
    { label: '[1,1]', args: [[1,1]], expected: 1 },
  ],
  clues: [
    {
      id: 'area-formula',
      question: 'Water volume = width × min(height[left], height[right]). What does the min() tell you about which wall limits capacity?',
      options: [
        { label: 'The taller wall always determines area', isCorrect: false, feedback: 'The container can only hold water up to the shorter wall — anything above it spills over. The taller wall is irrelevant above the shorter one\'s height.' },
        { label: 'The shorter wall is the bottleneck', isCorrect: true },
        { label: 'Maximize total height of both walls', isCorrect: false, feedback: 'Adding both heights gives a number larger than what fits in the container. Area is bounded by the minimum height, multiplied by the width.' },
        { label: 'Width always dominates the area', isCorrect: false, feedback: 'Width contributes to area, but a wide container with tiny walls holds almost no water. Both width and the minimum height matter.' },
      ],
      correctFeedback: 'The shorter wall caps the water level. Moving the shorter-wall pointer inward might find a taller wall — that is the only move that could increase area.',
      wrongFeedback: [
        'If left wall is height 1 and right wall is height 8, how high does the water rise? Which wall determined that?',
        'The min() in the formula is the bottleneck. To try to improve area, which pointer — left or right — should you move?',
      ],
    },
    {
      id: 'two-pointer-strategy',
      question: 'Starting with the widest possible container, why should you move the pointer at the shorter wall inward?',
      options: [
        { label: 'Moving the taller wall might increase height', isCorrect: false, feedback: 'Moving the taller wall inward reduces width and keeps the min height at most the same — area can only decrease or stay equal.' },
        { label: 'Moving the shorter wall is the only way area can increase', isCorrect: true },
        { label: 'Always move the left pointer regardless of height', isCorrect: false, feedback: 'Always moving left ignores the height information that tells you which move is worth trying. The pointer at the shorter wall is the one that might find an improvement.' },
        { label: 'Move both pointers inward simultaneously', isCorrect: false, feedback: 'Moving both pointers at once skips candidate pairs — you might miss the optimal container by jumping past it.' },
      ],
      correctFeedback: 'Keeping the shorter wall and narrowing width guarantees the same or worse area (min stays, width drops). Moving the shorter wall is the only move that could discover a taller wall and increase area.',
      wrongFeedback: [
        'If you move the taller wall inward, width decreases. Can the min height increase enough to compensate?',
        'The current min height is the bottleneck. Moving the taller pointer keeps that bottleneck in place with reduced width. Why is moving the shorter pointer the only rational choice?',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'n ≤ 10⁵ tells you…',
      options: [
        { label: 'O(n²) brute force over all pairs is acceptable', isCorrect: false, feedback: 'At n = 100,000, O(n²) means 10 billion pair evaluations — too slow. A two-pointer approach solves it in O(n).' },
        { label: 'O(n) two-pointer scan is the target', isCorrect: true },
        { label: 'O(n log n) sorting will help find the answer', isCorrect: false, feedback: 'Sorting destroys the position information needed for width calculation. The two-pointer approach needs the original indices intact.' },
        { label: 'Binary search on heights gives O(log n)', isCorrect: false, feedback: 'You cannot find the optimal pair in O(log n) — you must consider many candidate pairs. The two-pointer approach does it in O(n) by being smart about which pairs to skip.' },
      ],
      correctFeedback: 'The two-pointer scan visits each index at most once — O(n) total. At n = 100,000 that is 100,000 operations, well within any time limit.',
      wrongFeedback: [
        'At n = 100,000, how many pairs does a brute-force O(n²) approach check? What does two-pointer do instead?',
        'Each pointer moves inward at most n times total. What is the overall complexity of the two-pointer pass?',
      ],
    },
    {
      id: 'output-is-max-value',
      question: 'The output is a single integer — the maximum area. What does this imply about tracking?',
      options: [
        { label: 'Record which pair of indices gives the max', isCorrect: false, feedback: 'The problem only asks for the area value, not the specific line indices. Tracking indices adds complexity without contributing to the answer.' },
        { label: 'Maintain a running maximum and return it', isCorrect: true },
        { label: 'Sum all possible areas', isCorrect: false, feedback: 'You want the maximum area, not the total. Summing would give a much larger and meaningless number.' },
        { label: 'Return the area of the last container checked', isCorrect: false, feedback: 'The last container checked (when pointers meet) is not guaranteed to be the maximum — you must track the best seen across all iterations.' },
      ],
      correctFeedback: 'A single max_area variable updated at each step is all you need. At the end of the two-pointer pass, max_area holds the answer.',
      wrongFeedback: [
        'You need the best area across all valid pointer positions. How do you track "best so far" as you scan?',
        'Initialize max_area = 0. At each step, update it with the current area if it is larger. What do you return at the end?',
      ],
    },
  ],
}
