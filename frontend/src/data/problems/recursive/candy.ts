export default {
  id: 'candy',
  title: 'Candy',
  difficulty: 'hard',
  description: 'Children with ratings stand in a line. Each child must receive at least one candy. Children with a higher rating than their neighbor must get more candies. Return the minimum total candies needed.',
  examples: [
    { input: 'ratings = [1,0,2]', output: '5', explanation: '[2,1,2] candies are the minimum.' },
    { input: 'ratings = [1,2,2]', output: '4', explanation: '[1,2,1] candies.' },
  ],
  constraints: ['n == ratings.length', '1 ≤ n ≤ 2 × 10⁴', '0 ≤ ratings[i] ≤ 2 × 10⁴'],
  starterCode: `class Solution:
    def candy(self, ratings):
        pass`,
  runnerSetup: 'candy = Solution().candy',
  functionName: 'candy',
  conceptId: 'greedy',
  testCases: [
    { label: 'Valley', args: [[1,0,2]], expected: 5 },
    { label: 'Equal at end', args: [[1,2,2]], expected: 4 },
    { label: 'Single', args: [[5]], expected: 1 },
    { label: 'Ascending', args: [[1,2,3]], expected: 6 },
  ],
  bruteHint: 'The brute-force approach repeatedly scans the array and bumps up any child whose candy count violates a neighbor rule, then rescans from the beginning to check for new violations that the fix may have created, continuing until a full pass produces no changes. Because fixing one violation can create a new violation elsewhere, this can take many passes — up to O(n) rescans of an O(n) array, giving O(n²) time in the worst case. Can you find a way to guarantee every neighbor rule is satisfied in a fixed, small number of passes instead of repeating until nothing changes?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-two-directions',
      question: 'Constraints describing relationships between adjacent elements often dictate whether a single pass can resolve the problem or multiple passes are required. "Higher rating than their neighbor" — neighbor means both left and right. What does this two-sided constraint mean for a single-pass approach?',
      highlight: { location: 'description', text: 'Children with a higher rating than their neighbor must get more candies.' },
      options: [
        { label: 'One left-to-right pass is sufficient', isCorrect: false, feedback: 'A single left-to-right pass only enforces the left-neighbor rule. It ignores whether each child also has more candies than their right neighbor. You will miss violations on the right side.' },
        { label: 'Two passes are needed — one per direction', isCorrect: true },
        { label: 'Sort by rating and assign greedily', isCorrect: false, feedback: 'Sorting destroys the positional relationships between neighbors. The constraint depends on who is adjacent in the original order, not on sorted rank.' },
        { label: 'Use dynamic programming with O(n²) states', isCorrect: false, feedback: 'The neighbor constraints are strictly local — each child only compares with its two immediate neighbors. Two linear passes are sufficient; there is no need for DP.' },
      ],
      correctFeedback: 'Pass left-to-right to fix left-neighbor violations, then right-to-left to fix right-neighbor violations. Each pass is O(n), and the final allocation satisfies both directions.',
      wrongFeedback: [
        'After a left-to-right pass, consider the last example [1,2,2]: does the last child\'s allocation respect its left neighbor? Does a single pass catch all right-side violations?',
        'The two-sided constraint means each position depends on both its left and right neighbors. Can you determine the final value at position i before knowing i+1\'s value?',
      ],
    },
    {
      id: 'output-minimum',
      question: 'When a problem asks for a minimum or maximum result, that framing tells you exactly how aggressively to constrain each individual choice. The output is the minimum total candies. What does "minimum" tell you about how to set each child\'s candy count?',
      highlight: { location: 'description', text: 'Return the minimum total candies needed.' },
      options: [
        { label: 'Give every child the same number of candies', isCorrect: false, feedback: 'Equal distribution satisfies "at least one" but will violate the higher-rating rule whenever ratings differ. Minimum means assign as few as possible while still satisfying both constraints.' },
        { label: 'Give each child the smallest value that satisfies both neighbor constraints', isCorrect: true },
        { label: 'Give each child candies equal to their rating', isCorrect: false, feedback: 'Using ratings directly as candy counts satisfies the ordering rule but produces far more than the minimum — ratings can be up to 2 × 10⁴, not just 1, 2, 3...' },
        { label: 'Give extra candies to children with equal ratings', isCorrect: false, feedback: 'Equal ratings carry no obligation — neither neighbor needs more candies than the other. Giving extras to equal-rated children would exceed the minimum.' },
      ],
      correctFeedback: 'Initialize every child to 1 candy (the minimum possible), then increment only when a neighbor constraint forces it. Each child ends up with the smallest value that satisfies both sides.',
      wrongFeedback: [
        'Start with every child at 1 candy. In which situations are you forced to increase that count above 1?',
        'You only need to increment a child\'s count when their neighbor has a higher rating AND currently the same or more candies. The minimum is achieved by being as stingy as possible.',
      ],
    },
    {
      id: 'equal-ratings-edge',
      question: 'Precise wording around comparison operators — strictly greater versus greater-or-equal — often determines exactly when a rule does or doesn\'t apply. "Higher rating than their neighbor must get more." In [1,2,2], the last child gets only 1 candy. Why does equal rating not require equal candy counts?',
      options: [
        { label: 'Equal ratings are a bug in the input', isCorrect: false, feedback: 'Ratings of 0–20,000 can repeat; equal values are a valid and expected input. The constraint only applies when one rating is strictly greater than its neighbor.' },
        { label: 'The rule only applies when a rating is strictly greater', isCorrect: true },
        { label: 'Equal-rated neighbors must receive the same candy count', isCorrect: false, feedback: 'The problem says "higher rating… must get more" — equal ratings carry no candy-equality obligation. Forcing equal counts would inflate the total above the minimum.' },
        { label: 'The last child always gets 1 candy regardless of rating', isCorrect: false, feedback: 'The last child starts at 1 and may be incremented if it has a higher rating than its left neighbor. Position alone does not fix the candy count.' },
      ],
      correctFeedback: 'The constraint is one-directional and strict: only a strictly greater rating triggers an increase. Equal neighbors can each hold 1 candy with no violation.',
      wrongFeedback: [
        'Re-read the constraint: "higher rating than their neighbor must get more." Does equal rating trigger that rule?',
        'In [1,2,2], the second and third children have the same rating. Does that force any candy relationship between them?',
      ],
    },
    {
      id: 'constraint-size',
      question: 'Input size constraints directly tell you which complexity classes are fast enough and which will time out. n can be up to 2 × 10⁴. What complexity is required?',
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 2 × 10⁴' },
      options: [
        { label: 'O(n²) is acceptable at this size', isCorrect: false, feedback: 'At n = 20,000, O(n²) is 400 million operations — too slow. The constraint calls for a linear or linearithmic approach.' },
        { label: 'O(n) using two linear passes', isCorrect: true },
        { label: 'O(n log n) by reordering children based on rating value', isCorrect: false, feedback: 'Sorting destroys neighbor relationships that the solution depends on. The two-pass linear approach is both sufficient and simpler.' },
        { label: 'O(1) space with a single variable', isCorrect: false, feedback: 'You need to store a candy count for each of the n children to allow updating both left and right passes independently. O(1) space is not achievable here.' },
      ],
      correctFeedback: 'Two passes of O(n) each gives O(n) total — well within budget for 20,000 elements. Each pass reads the ratings array once and updates the candy array once.',
      wrongFeedback: [
        'With n = 20,000, what is the cost of two separate left-to-right and right-to-left scans?',
        'Two O(n) passes is O(n) total. At n = 20,000 that is 40,000 operations — trivially fast.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def candy(self, ratings):
        n = len(ratings)
        candies = [1] * n
        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                candies[i] = candies[i - 1] + 1
        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                candies[i] = max(candies[i], candies[i + 1] + 1)
        return sum(candies)`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'The right-to-left pass uses <code>max(candies[i], candies[i + 1] + 1)</code>, not a plain overwrite — a child might already need more candies than its right-neighbor requirement demands (from the earlier left-to-right pass), and overwriting would silently lose that already-satisfied left-neighbor constraint.',
  solutionExplanation: 'Because the "more candies than a higher-rated neighbor" rule looks both left and right, no single directional scan can satisfy it — a left-to-right pass alone enforces "beat your left neighbor if you\'re rated higher" but says nothing about right neighbors, so a second right-to-left pass is needed to enforce the mirror-image rule, taking the max with what the first pass already assigned rather than discarding it. Starting every child at exactly 1 candy and only ever incrementing when a specific neighbor comparison forces it is what keeps the total at the true minimum, since equal ratings never trigger an increase in either direction.',
}
