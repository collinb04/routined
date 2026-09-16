export default {
  id: 'domino-tromino-tiling',
  title: 'Domino and Tromino Tiling',
  difficulty: 'medium',
  description: 'You have 2×1 dominoes and L-shaped trominoes. Fill a 2×n board with these pieces. Return the number of ways modulo 10⁹ + 7.',
  examples: [
    { input: 'n = 3', output: '5', explanation: 'Five different ways to tile a 2×3 board.' },
    { input: 'n = 1', output: '1' },
  ],
  constraints: ['1 ≤ n ≤ 1000'],
  starterCode: `class Solution:
    def num_tilings(self, n):
        pass`,
  runnerSetup: 'num_tilings = Solution().num_tilings',
  functionName: 'num_tilings',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'n=3', args: [3], expected: 5 },
    { label: 'n=1', args: [1], expected: 1 },
    { label: 'n=2', args: [2], expected: 2 },
    { label: 'n=4', args: [4], expected: 11 },
  ],
  bruteHint: 'A brute-force solution recurses column by column, trying every combination of domino and tromino placements at each step and re-exploring the same remaining board width again and again. Because each column branches into a handful of choices across n columns, this naive recursion costs exponential time, roughly O(2^n). What repeated subproblem — the same remaining width — keeps getting solved from scratch, and how could you avoid redoing it?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraints define the complexity ceiling your solution must fit inside, so reading them first tells you whether brute force is even in play. n ≤ 1000 tells you…',
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 1000' },
      options: [
        { label: 'O(2^n) is fine — n is small',   isCorrect: false, feedback: 'At n = 1000, O(2^1000) is astronomically large. Small n in DP problems signals polynomial, not exponential complexity.' },
        { label: 'O(n) is achievable',             isCorrect: true },
        { label: 'O(n²) is the minimum needed',   isCorrect: false, feedback: 'The recurrence for this problem has a fixed lookback — each cell depends on a constant number of previous cells. That\'s O(n), not O(n²).' },
        { label: 'Input size doesn\'t matter',    isCorrect: false, feedback: 'Input size always shapes your approach. n ≤ 1000 easily fits O(n), and the fixed-lookback recurrence makes linear time natural.' },
      ],
      correctFeedback: 'At n = 1000, O(n) is 1000 operations — trivial. The recurrence depends on a constant number of previous states, so a single linear scan fills the table.',
      wrongFeedback: [
        'If each dp cell depends only on a fixed number of earlier cells (not all of them), how many passes do you need through the array?',
        'A fixed-lookback recurrence means O(n) — one pass, constant work per cell.',
      ],
    },
    {
      id: 'modulo-requirement',
      question: 'A required modulus is a strong hint that the raw answer would overflow standard integer types, revealing something about how fast the underlying quantity grows. Return the number of ways modulo 10⁹ + 7. Why does the problem specify a modulus?',
      highlight: { location: 'description', text: 'Return the number of ways modulo 10⁹ + 7.' },
      options: [
        { label: 'To make the problem harder',                           isCorrect: false, feedback: 'The modulus isn\'t difficulty padding — it\'s a practical necessity. Tiling counts grow exponentially with n, quickly exceeding 64-bit integer bounds.' },
        { label: 'Tiling counts grow too large for standard integers',   isCorrect: true },
        { label: 'The answer is always less than 10⁹ + 7',              isCorrect: false, feedback: 'The modulus exists precisely because the answer can exceed 10⁹ + 7. The final output is the count reduced modulo that prime.' },
        { label: 'Modulo lets you use floating-point arithmetic',        isCorrect: false, feedback: 'Modular arithmetic uses integers throughout. Floating point introduces precision errors and isn\'t applicable here.' },
      ],
      correctFeedback: 'Tiling counts grow roughly as 2^(n/2). At n = 1000, the raw count has hundreds of digits. Taking modulo 10⁹ + 7 keeps every intermediate value in a 32-bit range.',
      wrongFeedback: [
        'At n = 1000, roughly how large might the number of tilings be? Can that fit in a 64-bit integer?',
        'Tiling counts grow exponentially. Without the modulus, intermediate values overflow standard integer types well before n = 1000.',
      ],
    },
    {
      id: 'partial-column-states',
      question: 'The exact shapes of the pieces you\'re placing dictate which partial states your DP has to represent, so it pays to think through piece geometry before writing any recurrence. An L-shaped tromino can leave one cell of a column unfilled. What does this mean for your DP states?',
      highlight: { location: 'description', text: 'L-shaped trominoes' },
      options: [
        { label: 'Only track fully filled columns',                       isCorrect: false, feedback: 'Trominoes create partially filled columns as intermediate states. Ignoring partial fills means you can\'t correctly track the transitions that trominoes introduce.' },
        { label: 'Track both fully filled and partially filled column states', isCorrect: true },
        { label: 'Split the board into two 1×n rows and solve each',      isCorrect: false, feedback: 'The two rows interact through trominoes — an L-piece spans both rows and two columns. Solving rows independently misses cross-row piece placements.' },
        { label: 'Only place dominoes — trominoes are optional',          isCorrect: false, feedback: 'The problem asks you to count tilings using both piece types. Trominoes are part of the solution space, not optional extras — skipping them misses valid configurations.' },
      ],
      correctFeedback: 'A tromino can leave exactly one cell of a column unfilled (top or bottom). You need states for: column fully covered, top cell covered (bottom exposed), and bottom cell covered (top exposed). Usually encoded as dp[n] for full, dp_top[n] and dp_bot[n] for partial.',
      wrongFeedback: [
        'When you place an L-shaped tromino, can the column to its right be fully covered, or is one cell left empty?',
        'Trominoes leave partial columns. Your DP needs to represent those partial states — otherwise you can\'t track valid transitions involving trominoes.',
      ],
    },
    {
      id: 'recurrence-lookback',
      question: 'How far back a recurrence has to reach determines both its correctness and how much work each step costs, so pinning down the lookback distance is a key design decision. Adding column n may use pieces that span back to column n-1 or n-2. What does this say about the recurrence?',
      highlight: { location: 'description', text: '2×1 dominoes and L-shaped trominoes' },
      options: [
        { label: 'dp[n] depends only on dp[n-1]',                isCorrect: false, feedback: 'A horizontal domino spans two columns, making dp[n] depend on dp[n-2] as well. Only looking back one step misses the two-column-wide pieces.' },
        { label: 'dp[n] can depend on dp[n-1] and dp[n-2]',     isCorrect: true },
        { label: 'dp[n] depends on all previous dp values',      isCorrect: false, feedback: 'No piece spans more than two columns, so the lookback is at most 2. You don\'t need to sum over the entire history.' },
        { label: 'dp[n] depends only on dp[n-2]',               isCorrect: false, feedback: 'Vertical dominoes fill exactly one column, so dp[n] also depends on dp[n-1]. Both one-column and two-column placements contribute.' },
      ],
      correctFeedback: 'Vertical dominoes add to dp[n-1] (one column), horizontal dominoes and trominoes add to dp[n-2] (two columns). The recurrence looks back at most 2 steps, making the transition O(1) per column.',
      wrongFeedback: [
        'A vertical domino fills one column; a horizontal domino fills two. Which previous dp value does each type update?',
        'One-column pieces reference dp[n-1]; two-column pieces reference dp[n-2]. Both contribute, so the lookback is 2.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def num_tilings(self, n):
        MOD = 10**9 + 7
        full = [0] * (n + 1)
        partial = [0] * (n + 1)
        full[0] = 1
        full[1] = 1
        for i in range(2, n + 1):
            full[i] = (full[i - 1] + full[i - 2] + 2 * partial[i - 1]) % MOD
            partial[i] = (partial[i - 1] + full[i - 2]) % MOD
        return full[n]`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: '<code>partial[i-1]</code> is multiplied by <code>2</code> when it feeds into <code>full[i]</code> — a partial state at column <code>i-1</code> can be closed off by either a top-notch or a bottom-notch tromino, and both orientations independently complete the board, so both must be counted.',
  solutionExplanation: 'A fully-tiled board of width <code>i</code> either extends a fully-tiled width <code>i-1</code> board with one vertical domino, extends a fully-tiled width <code>i-2</code> board with two horizontal dominoes, or closes off a "partial" board of width <code>i-1</code> (one column with an L-shaped notch left over from a tromino) — that third case is exactly what lets a tromino bridge across a column boundary. The <code>partial</code> array tracks that intermediate notched state, extended by one more column either by staying notched (<code>partial[i-1]</code>) or by a tromino newly creating the notch from a fully-tiled width <code>i-2</code> board, and the modulus keeps every intermediate value inside safe integer bounds despite the exponential growth in tiling counts.',
}
