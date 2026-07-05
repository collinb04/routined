export default {
  id: 'trapping-rain-water',
  title: 'Trapping Rain Water',
  difficulty: 'hard',
  description: `<p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.</p>`,
  examples: [
    { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
    { input: 'height = [4,2,0,3,2,5]', output: '9' },
  ],
  constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
  starterCode: `def trap(height):
  pass`,
  functionName: 'trap',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'classic', args: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6 },
    { label: '[4,2,0,3,2,5]', args: [[4,2,0,3,2,5]], expected: 9 },
  ],
  clues: [
    {
      id: 'water-at-each-position',
      question: 'Water trapped at position i is determined by the heights around it. What formula gives the water at index i?',
      options: [
        { label: 'height[i] minus the average of neighbors', isCorrect: false, feedback: 'Averaging neighbors does not account for the full surrounding terrain. Water at i is bounded by the tallest bar to its left and the tallest bar to its right.' },
        { label: 'min(max_left[i], max_right[i]) − height[i]', isCorrect: true },
        { label: 'max_left[i] + max_right[i] − height[i]', isCorrect: false, feedback: 'Adding the two maxes overcounts. Water is limited by whichever side is shorter — the water would spill over the shorter wall.' },
        { label: 'max_left[i] − height[i]', isCorrect: false, feedback: 'Using only the left maximum ignores the right boundary. Water spills over the shorter of the two sides — so you need both maximums.' },
      ],
      correctFeedback: 'Water at i is bounded by the shorter of the tallest walls on each side. If that bound exceeds height[i], the difference is the water depth. If not, no water sits there.',
      wrongFeedback: [
        'Imagine filling position i with water. What stops it from flowing left? What stops it from flowing right? Which limit actually controls the depth?',
        'Water at i can rise to min(max_left, max_right). Subtract height[i] for the actual depth. If the result is negative, no water sits at i.',
      ],
    },
    {
      id: 'naive-precompute-cost',
      question: 'A brute-force approach precomputes max_left and max_right arrays. What is its time and space complexity?',
      options: [
        { label: 'O(n) time, O(1) space', isCorrect: false, feedback: 'The precomputation is O(n) time, but storing max_left and max_right arrays requires O(n) extra space — not O(1).' },
        { label: 'O(n) time, O(n) space', isCorrect: true },
        { label: 'O(n²) time, O(n) space', isCorrect: false, feedback: 'Precomputing max_left with a single left-to-right scan and max_right with a single right-to-left scan takes O(n) total time, not O(n²).' },
        { label: 'O(n log n) time, O(n) space', isCorrect: false, feedback: 'Max prefix/suffix arrays are computed in linear time with a single scan each — no sorting or binary search needed.' },
      ],
      correctFeedback: 'Two linear scans fill max_left and max_right in O(n) time. Each array is size n, so space is O(n). Two-pointer technique achieves the same result in O(1) space.',
      wrongFeedback: [
        'How many passes does it take to fill max_left? max_right? How much memory do those arrays use?',
        'Each array is size n. Can you compute the same answer without storing them — tracking the running max with just two variables?',
      ],
    },
    {
      id: 'two-pointer-insight',
      question: 'Two pointers at each end converge inward. At any moment, the pointer with the smaller max height moves inward. Why?',
      options: [
        { label: 'To avoid processing elements twice', isCorrect: false, feedback: 'Both pointers converge without revisiting, regardless of which side moves. The reason to advance the smaller-max side is about what you can safely compute — not about double-processing.' },
        { label: 'The shorter side\'s water is fully determined by its own max', isCorrect: true },
        { label: 'The taller side always has more water', isCorrect: false, feedback: 'Height of the bar does not directly determine water depth. The shorter-max side is advanced because that side\'s limiting wall is already known — it cannot increase by looking inward.' },
        { label: 'Moving the taller pointer would skip valid positions', isCorrect: false, feedback: 'Both pointers move exactly once per position — neither skips positions. The decision about which to move is about computation correctness, not coverage.' },
      ],
      correctFeedback: 'When max_left < max_right, the water at the left pointer is determined by max_left (not max_right, which can only be ≥ max_left). You can compute and advance safely. The symmetric logic applies to the right pointer.',
      wrongFeedback: [
        'If max_left = 3 and max_right = 5, what is min(max_left, max_right) at the left pointer? Does the right side\'s unknown future values change that?',
        'The shorter side\'s limiting wall is already known — moving inward can only raise the opposite max, not lower the already-known minimum. So you can compute the water and advance.',
      ],
    },
    {
      id: 'non-negative-heights',
      question: '"0 ≤ height[i] ≤ 10^5" — heights are non-negative. What edge case does this prevent you from needing to handle?',
      options: [
        { label: 'Negative water depth at a position', isCorrect: true },
        { label: 'Integer overflow in the total', isCorrect: false, feedback: 'With n ≤ 20,000 and max height 100,000, the total water is at most ~2 × 10⁹, which fits in a 32-bit signed integer. Overflow is not a concern, but that is not what the non-negative constraint prevents.' },
        { label: 'Bars taller than the maximum water level', isCorrect: false, feedback: 'Bars taller than the surrounding walls simply hold no water — that is handled by max(0, min(max_left, max_right) − height[i]). The non-negative constraint ensures height[i] itself is never negative.' },
        { label: 'Arrays of length 0', isCorrect: false, feedback: 'The length constraint is 1 ≤ n, which prevents empty arrays. Non-negative heights are a separate guarantee about element values.' },
      ],
      correctFeedback: 'Since heights are ≥ 0, min(max_left, max_right) − height[i] is never below −max_height. More importantly, you never have a bar "pushing up" from below zero, so the water formula always gives a non-negative depth (clamped to 0 when the bar is at the wall height).',
      wrongFeedback: [
        'What would happen to the water formula min(max_left, max_right) − height[i] if height[i] could be negative?',
        'Non-negative heights mean a bar at index i is never below the baseline. The formula result is naturally ≥ 0 whenever the bar is below both walls — no special clamping is needed for the height itself.',
      ],
    },
  ],
}
