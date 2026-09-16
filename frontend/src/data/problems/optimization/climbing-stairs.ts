export default {
  id: 'climbing-stairs',
  title: 'Climbing Stairs',
  difficulty: 'easy',
  description: 'You are climbing a staircase with <code>n</code> steps. Each time you can climb 1 or 2 steps. Return the number of distinct ways to reach the top.',
  examples: [
    { input: 'n = 2', output: '2', explanation: '1+1 or 2.' },
    { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1.' },
  ],
  constraints: [
    '1 ≤ n ≤ 45',
  ],
  starterCode: `class Solution:
    def climb_stairs(self, n):
        pass`,
  runnerSetup: 'climb_stairs = Solution().climb_stairs',
  functionName: 'climb_stairs',
  conceptId: 'dynamic-programming',
  testCases: [
    { label: 'n = 2', args: [2], expected: 2 },
    { label: 'n = 3', args: [3], expected: 3 },
    { label: 'n = 5', args: [5], expected: 8 },
    { label: 'n = 1', args: [1], expected: 1 },
    { label: 'n = 10', args: [10], expected: 89 },
  ],
  bruteHint: 'The brute-force approach recursively tries a 1-step move and a 2-step move from every position, branching into two recursive calls at each step until it reaches the top. Because the same smaller step counts — like the number of ways to reach step 3 — get recomputed many times across different branches, this naive recursion runs in O(2ⁿ) time. Can you see why the recursion tree for reaching step 5 ends up computing the ways to reach step 2 more than once?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 45' },
      question: 'A tight bound on the input size tells you which complexities are trivially safe and which are needless overkill. n ≤ 45 tells you…',
      options: [
        { label: 'O(2ⁿ) is fine — n is tiny',        isCorrect: false, feedback: 'At n = 45, O(2ⁿ) is about 35 trillion operations. Even with a tiny n, exponential blows up fast. The constraint doesn\'t permit naive recursion without memoization.' },
        { label: 'Even O(n) is overkill — use a formula', isCorrect: false, feedback: 'A closed-form formula exists (Fibonacci), but the constraint doesn\'t force it. The point of the problem is recognizing the recurrence — n ≤ 45 comfortably fits O(n).' },
        { label: 'Any polynomial approach works easily',   isCorrect: true },
        { label: 'O(log n) is the target',               isCorrect: false, feedback: 'O(log n) is achievable via matrix exponentiation, but the constraint doesn\'t require it. At n = 45, even O(n) is 45 operations — there\'s no performance pressure here.' },
      ],
      correctFeedback: 'At n = 45, any polynomial approach — O(n), O(n²), or beyond — is trivially fast. The constraint is small enough that even a slightly redundant solution works fine.',
      wrongFeedback: [
        'At n = 45, how many operations does O(2⁴⁵) require? Compare that to O(45).',
        '2⁴⁵ ≈ 35 trillion; n = 45 is 45 operations. The constraint permits polynomial — it just rules out naive exponential recursion.',
      ],
    },
    {
      id: 'step-choices',
      highlight: { location: 'description', text: 'Each time you can climb 1 or 2 steps.' },
      question: 'The exact moves allowed determine which prior states can transition into the current one — the backbone of any DP recurrence. Each step you can climb 1 or 2 stairs. What does this imply about how you can arrive at step n?',
      options: [
        { label: 'You arrive from any earlier step',          isCorrect: false, feedback: 'You can only jump 1 or 2 steps at a time, not any arbitrary distance. Step n is reachable only from step n−1 or step n−2.' },
        { label: 'You arrive from step n−1 or step n−2',     isCorrect: true },
        { label: 'You arrive only from step n−1',            isCorrect: false, feedback: 'You can take a 2-step jump, which would land you on step n directly from step n−2. Both predecessors matter.' },
        { label: 'The number of ways doubles each step',     isCorrect: false, feedback: 'Doubling would apply if every state had exactly 2 successors, but that\'s not the case here — step 1 has only one predecessor. The pattern follows the Fibonacci sequence, not powers of 2.' },
      ],
      correctFeedback: 'Step n is reachable only from n−1 (via a 1-step) or n−2 (via a 2-step). So the number of ways to reach n equals the ways to reach n−1 plus the ways to reach n−2.',
      wrongFeedback: [
        'If you can only jump 1 or 2 steps, what are the only two positions you could be standing on just before you land on step n?',
        'You jump from n−1 with a 1-step, or from n−2 with a 2-step. Those are the only two origins — ways(n) = ways(n−1) + ways(n−2).',
      ],
    },
    {
      id: 'output-type',
      highlight: { location: 'description', text: 'Return the number of distinct ways to reach the top.' },
      question: 'Understanding precisely what you\'re counting prevents subtle overcounting or undercounting mistakes in your solution. The output is a count of distinct ways. What does "distinct" mean here?',
      options: [
        { label: 'Only count paths with unique step sequences',     isCorrect: false, feedback: 'All paths are unique by definition — they\'re sequences of 1s and 2s. "Distinct" doesn\'t mean deduplication; it just means two paths that make the same choices in the same order are the same path.' },
        { label: 'Count every different sequence of 1s and 2s',    isCorrect: true },
        { label: 'Count only paths that use both step sizes',       isCorrect: false, feedback: 'A path of all 1-steps is perfectly valid. "Distinct" refers to the sequence of moves, not whether you used both options.' },
        { label: 'Count paths with no consecutive 2-steps',        isCorrect: false, feedback: 'There\'s no restriction on consecutive 2-steps. Every combination of 1s and 2s that sums to n is a valid path.' },
      ],
      correctFeedback: 'Every sequence of 1s and 2s that sums to n is a distinct way. The order matters: "1 then 2" and "2 then 1" are different paths.',
      wrongFeedback: [
        'For n = 3, the answer is 3: [1,1,1], [1,2], [2,1]. What makes [1,2] and [2,1] distinct?',
        'The order of steps matters. Different orderings of the same values are counted separately.',
      ],
    },
    {
      id: 'overlapping-subproblems',
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 45' },
      question: 'Spotting repeated recursive calls is the classic signal that memoization or bottom-up DP will save you significant work. Recursively computing ways(n) = ways(n−1) + ways(n−2) re-computes many subproblems. What does this call for?',
      options: [
        { label: 'Recompute them — n is small enough',               isCorrect: false, feedback: 'At n = 45, naive recursion computes O(2⁴⁵) calls due to repeated subproblems. Even though n is small, pure recursion without memoization is still too slow.' },
        { label: 'Memoize or use bottom-up DP to avoid recomputation', isCorrect: true },
        { label: 'Switch to a greedy algorithm instead',              isCorrect: false, feedback: 'Greedy doesn\'t apply — there\'s no locally optimal choice that leads to a globally correct count. You need to sum over all valid paths, which requires DP or memoization.' },
        { label: 'Use binary search to skip redundant states',        isCorrect: false, feedback: 'Binary search finds a target in a sorted structure. Subproblem reuse in recursion trees is addressed by memoization or bottom-up DP, not search.' },
      ],
      correctFeedback: 'ways(5) is computed multiple times in a naive recursion. Memoization stores each result once; bottom-up DP fills the table from the base cases up. Either reduces work to O(n).',
      wrongFeedback: [
        'Draw the recursion tree for ways(5): how many times is ways(3) computed without caching?',
        'Repeated subproblems are the core DP signal. Cache each result — once computed, it\'s free to reuse.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def climb_stairs(self, n):
        if n <= 2:
            return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'This is Fibonacci wearing a disguise: the number of ways to reach step n is the ways to reach n-1 (then take one step) plus the ways to reach n-2 (then take two) — same recurrence, same shape, different story.',
  solutionExplanation: 'You always arrive at step n from either step n-1 (a single step) or step n-2 (a double step), and those are the only two ways in — so the total ways to reach n is just the sum of the ways to reach each of those. Tracking only the last two values instead of a full array is what gets this down to O(1) space; there\'s never a need to remember anything further back than that.',
}
