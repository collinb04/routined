export default {
  id: 'burst-balloons',
  title: 'Burst Balloons',
  difficulty: 'hard',
  description: 'Given n balloons with values, bursting balloon <code>i</code> earns <code>nums[left] * nums[i] * nums[right]</code> coins. Return the maximum coins you can collect by bursting all balloons.',
  examples: [
    { input: 'nums = [3,1,5,8]', output: '167', explanation: 'Burst 1: 3*1*5=15. Burst 5: 3*5*8=120. Burst 3: 1*3*8=24. Burst 8: 1*8*1=8. Total = 167.' },
  ],
  constraints: ['n == nums.length', '1 ≤ n ≤ 300', '0 ≤ nums[i] ≤ 100'],
  starterCode: `def max_coins(nums):
  pass`,
  functionName: 'max_coins',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Classic', args: [[3,1,5,8]], expected: 167 },
    { label: 'Single', args: [[1]], expected: 1 },
    { label: 'Two', args: [[1,5]], expected: 10 },
  ],
  bruteHint: 'Describe the brute-force approach of trying every possible order of bursting balloons and explain why that\'s factorial in the number of balloons.',
  optimizeHint: 'Name the trick of choosing which balloon is burst last within a range so its subproblem depends only on the range\'s two boundaries, enabling a DP table indexed by interval.',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 300 tells you…',
      options: [
        { label: 'O(n) or O(n log n) is required',   isCorrect: false, feedback: 'O(n) or O(n log n) would be impressive, but n ≤ 300 is a hint that much slower approaches are fine. At n = 300, even O(n³) is only 27 million operations.' },
        { label: 'O(n³) is acceptable',               isCorrect: true },
        { label: 'O(n!) is fine — n is tiny',         isCorrect: false, feedback: 'O(n!) would be 300! — a number with hundreds of digits. Even n = 20 makes factorial approaches infeasible. Small n allows polynomial, not factorial, complexity.' },
        { label: 'O(2ⁿ) is workable',                isCorrect: false, feedback: 'At n = 300, O(2ⁿ) is astronomically large. Exponential approaches fail well before n = 300 — small n in DP problems typically signals polynomial time, often O(n²) or O(n³).' },
      ],
      correctFeedback: 'At n = 300, O(n³) is 27 million operations — well within budget. The small constraint is a deliberate signal that an O(n³) interval DP solution is expected.',
      wrongFeedback: [
        'Cube n = 300. How many operations is that? Compare to what a modern machine handles per second.',
        '300³ = 27 million — fast. 2³⁰⁰ is astronomical. Small n permits polynomial slowness, not exponential.',
      ],
    },
    {
      id: 'coin-formula',
      question: 'Bursting balloon i earns nums[left] * nums[i] * nums[right]. What makes this formula tricky to reason about?',
      options: [
        { label: 'The formula involves three numbers, not two',         isCorrect: false, feedback: 'Three multiplied values aren\'t inherently tricky. The difficulty is that bursting a balloon changes who the neighbors are for every remaining balloon.' },
        { label: 'Bursting one balloon changes the neighbors of others', isCorrect: true },
        { label: 'Multiplication overflows integer bounds',              isCorrect: false, feedback: 'With values up to 100 and n ≤ 300, the total is at most in the millions — no overflow concern. The challenge is structural, not numeric.' },
        { label: 'You need to try every burst order',                   isCorrect: false, feedback: 'Trying every order is O(n!) — infeasible. The key insight is finding a way to decompose the problem that avoids reasoning about the order balloons disappear.' },
      ],
      correctFeedback: 'When you burst balloon i, its former neighbors become adjacent. This means the subproblem after the burst depends on which balloons are still present — the state space collapses if you think forward.',
      wrongFeedback: [
        'When you burst balloon i, what changes about the problem for the remaining balloons?',
        'The left and right neighbors in the formula shift every time a balloon disappears. Forward reasoning is tangled. Think about working backward instead.',
      ],
    },
    {
      id: 'think-last-not-first',
      question: 'The coin formula depends on which balloons are adjacent. Which perspective untangles the dependencies?',
      options: [
        { label: 'Burst the smallest balloon first',                    isCorrect: false, feedback: 'Greedy by value doesn\'t account for how neighbors interact. Bursting the smallest first might leave expensive neighbors that produce less than a different order would.' },
        { label: 'Think about which balloon is burst last in a range',  isCorrect: true },
        { label: 'Burst the largest balloon first to maximize coins',   isCorrect: false, feedback: 'Greedy by largest-first ignores that a large balloon\'s value depends on its neighbors, which themselves depend on burst order. The optimal sequence isn\'t simply largest-first.' },
        { label: 'Process balloons left to right in order',             isCorrect: false, feedback: 'Left-to-right processing doesn\'t respect the coin formula — bursting balloon 0 first changes balloon 1\'s left neighbor to the boundary. The subproblems don\'t compose cleanly in this direction.' },
      ],
      correctFeedback: 'If you consider which balloon is burst last in a range [i, j], its neighbors are always the boundaries i−1 and j+1 — because all other balloons in the range were already burst. This makes the subproblems independent.',
      wrongFeedback: [
        'When you burst a balloon, you need to know its neighbors. Is there a burst position whose neighbors you can always know, regardless of the order other balloons disappeared?',
        'The last balloon burst in any range always has the range boundaries as its neighbors — everything inside is already gone. Think about what that means for subproblem decomposition.',
      ],
    },
    {
      id: 'interval-dp',
      question: 'The problem decomposes over ranges of balloons. What DP formulation does this suggest?',
      options: [
        { label: 'dp[i] = max coins from bursting the first i balloons', isCorrect: false, feedback: 'A 1D index can\'t capture which balloons remain in a range. The state needs to represent a contiguous interval, not just a prefix.' },
        { label: 'dp[i][j] = max coins from bursting all balloons in range [i, j]', isCorrect: true },
        { label: 'dp[i][k] = max coins using k balloons starting at i',  isCorrect: false, feedback: 'Counting balloons from a starting position doesn\'t encode which specific balloons remain. Two ranges can have the same count but completely different balloon values.' },
        { label: 'A greedy priority queue ordered by balloon value',      isCorrect: false, feedback: 'A greedy approach can\'t account for how bursting one balloon changes the value of bursting its neighbors. The interactions make this a DP problem, not a greedy one.' },
      ],
      correctFeedback: 'dp[i][j] = max coins from bursting every balloon strictly between the boundaries i and j. You try each balloon k in (i, j) as the last to be burst: dp[i][j] = max(nums[i] * nums[k] * nums[j] + dp[i][k] + dp[k][j]).',
      wrongFeedback: [
        'The subproblems are ranges of balloons. What two indices do you need to describe a range?',
        'An interval DP uses two indices to define which subarray to solve. The "last burst" trick makes the boundary values fixed and the subproblems non-overlapping.',
      ],
    },
  ],
}
