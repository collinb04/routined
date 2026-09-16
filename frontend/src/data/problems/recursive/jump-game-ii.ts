export default {
  id: 'jump-game-ii',
  title: 'Jump Game II',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> where <code>nums[i]</code> is the maximum jump length from index <code>i</code>, return the minimum number of jumps to reach the last index. The answer is always reachable.',
  examples: [
    { input: 'nums = [2,3,1,1,4]', output: '2', explanation: 'Jump 1 to index 1, then 3 jumps to end. Minimum 2 jumps.' },
    { input: 'nums = [2,3,0,1,4]', output: '2' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '0 ≤ nums[i] ≤ 1000', 'Answer is always reachable'],
  starterCode: `class Solution:
    def jump(self, nums):
        pass`,
  runnerSetup: 'jump = Solution().jump',
  functionName: 'jump',
  conceptId: 'greedy',
  testCases: [
    { label: 'Two jumps', args: [[2,3,1,1,4]], expected: 2 },
    { label: 'Two jumps v2', args: [[2,3,0,1,4]], expected: 2 },
    { label: 'Single', args: [[0]], expected: 0 },
    { label: 'Three jumps', args: [[1,1,1,1]], expected: 3 },
  ],
  bruteHint: 'The brute-force approach tries every possible jump length from each position — recursively exploring how far to jump from index i, or equivalently filling a DP table where dp[i] is the minimum jumps needed to reach index i by checking every earlier index that could reach it. Either way, for each of the n positions you may examine up to n possible jump targets, giving O(n²) time overall. With nums.length up to 10⁴, that\'s on the order of 10⁸ operations. Can you avoid re-examining every possible jump target at every single position?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'always-reachable-guarantee',
      question: 'Guarantees stated outright in the problem eliminate entire classes of edge-case handling you\'d otherwise need to write. "The answer is always reachable." What does this guarantee let you skip?',
      options: [
        { label: 'You do not need to count jumps', isCorrect: false, feedback: 'The problem asks for the minimum number of jumps — counting is the entire task. The guarantee removes the need to handle the impossible case, not the counting.' },
        { label: 'No need to handle a not-reachable return value', isCorrect: true },
        { label: 'You can take jumps in any order', isCorrect: false, feedback: 'You must jump left to right — jumps are forward only from each position. The guarantee means the last index is reachable, not that order is flexible.' },
        { label: 'The minimum jumps equals the array length minus 1', isCorrect: false, feedback: 'The minimum jumps depends on the values, not the length. [2,3,1,1,4] has length 5 but the answer is 2. The guarantee only removes the -1 / impossible return case.' },
      ],
      correctFeedback: 'Without this guarantee you would need to return -1 if the end is unreachable. Since a solution always exists, you skip that branch entirely and focus purely on minimizing jumps.',
      wrongFeedback: [
        'In Jump Game I, you returned true/false for reachability. This problem skips that question. What else does "always reachable" eliminate from your code?',
        'No dead-end check, no "return -1" path. The guarantee means every valid greedy choice eventually reaches the end — your only job is to count the minimum jumps.',
      ],
      highlight: { location: 'description', text: 'The answer is always reachable.' },
    },
    {
      id: 'greedy-farthest-reach',
      question: 'When multiple valid moves are available, comparing what each one unlocks next — not just its immediate value — is the core of a greedy strategy. From index 1 in [2,3,1,1,4], you can jump to index 2, 3, or 4. To minimize total jumps, which position should you jump to?',
      options: [
        { label: 'The position with the largest value (most future range)', isCorrect: false, feedback: 'The position with the largest value is not always the farthest reachable from there. In [2,3,1,1,4], jumping to index 4 (value 4) reaches index 8 — but you only need index 4, so you are already done. Maximize i + nums[i], not just nums[i].' },
        { label: 'The position that extends your farthest reachable index the most', isCorrect: true },
        { label: 'The position closest to the end', isCorrect: false, feedback: 'Jumping to the position closest to the end is greedy in the wrong direction. It maximizes one jump\'s distance but ignores what that landing spot can reach next. Maximize the farthest index reachable after the next jump.' },
        { label: 'Any position — they all give the same result', isCorrect: false, feedback: 'Choice of landing position matters. From index 0 in [3,2,1,0,4], landing at index 3 (value 0) strands you; landing at index 1 (value 2) lets you reach index 3. Different landings give different outcomes.' },
      ],
      correctFeedback: 'From a current window of reachable positions, pick the one that maximizes i + nums[i]. This is the greedy choice: extend your reach as far as possible before spending another jump.',
      wrongFeedback: [
        'You have one jump to use from the current window. Which landing position gives you the largest "window" of positions reachable on the next jump?',
        'Greedy: within your current jump range, find the index i that maximizes i + nums[i]. That is your implicit next landing — no need to track the actual position.',
      ],
    },
    {
      id: 'window-expansion',
      question: 'Knowing exactly when to trigger a state transition — rather than updating on every single step — is often what separates an O(n) greedy pass from something slower. The greedy approach tracks a "current window" and a "next window". When do you increment the jump counter?',
      options: [
        { label: 'Every time you move to a new index', isCorrect: false, feedback: 'Incrementing at every index would give you n-1 jumps for an n-element array — one per step. A jump covers multiple indices at once; the counter increases only when you exhaust the current window and must commit to the next.' },
        { label: 'When you exhaust all positions in the current jump\'s window', isCorrect: true },
        { label: 'Every time the farthest reachable index increases', isCorrect: false, feedback: 'The farthest reach can increase many times within a single jump\'s window. Incrementing for each update would overcount jumps significantly.' },
        { label: 'Only when you reach the last index', isCorrect: false, feedback: 'Incrementing only at the end gives a count of 1 regardless of how many jumps were needed. You need to count each time you move from one jump\'s coverage window into the next.' },
      ],
      correctFeedback: 'When your scan pointer exits the current window (i > current_end), you commit to the best next position found and increment the jump count. This is O(n) — one pass, no backtracking.',
      wrongFeedback: [
        'Think of the current window as all positions reachable with the jumps taken so far. What event signals that you must use one more jump?',
        'When you step past the last position in the current window, you must take another jump. Increment the counter and extend the window to the farthest position found while scanning.',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'Size constraints alone often cannot distinguish between approaches that share the same time complexity — that is when space usage becomes the deciding factor. nums.length ≤ 10⁴. A BFS approach visits each index once. A DP approach also visits each index once. What separates them in practice?',
      options: [
        { label: 'BFS uses a queue that grows to O(n) space; greedy uses O(1)', isCorrect: true },
        { label: 'BFS is O(n²); greedy is O(n)', isCorrect: false, feedback: 'Both BFS and the greedy window approach are O(n) time. The difference is space: BFS queues up to n nodes while the greedy approach tracks only a few integer variables.' },
        { label: 'DP is always faster than greedy for jump problems', isCorrect: false, feedback: 'DP is O(n) time here but uses O(n) space for the dp array. The greedy approach is also O(n) time with O(1) space. Neither is universally faster — greedy uses less memory.' },
        { label: 'They are identical in both time and space', isCorrect: false, feedback: 'Time complexity is O(n) for all three approaches, but space differs. BFS and DP use O(n) space; the greedy window approach uses O(1) — just a few counters.' },
      ],
      correctFeedback: 'At n = 10⁴, all O(n) approaches are fast. The greedy window method wins on space: O(1) vs. O(n) for BFS or DP — no queue, no dp array, just two pointers and a counter.',
      wrongFeedback: [
        'BFS stores all currently reachable nodes in a queue. The greedy approach stores what instead?',
        'Greedy tracks three integers: current window end, farthest reach so far, and jump count. Constant space regardless of n.',
      ],
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 10⁴' },
    },
  ],
  solutionCode: `class Solution:
    def jump(self, nums):
        n = len(nums)
        jumps = 0
        current_end = 0
        farthest = 0
        for i in range(n - 1):
            farthest = max(farthest, i + nums[i])
            if i == current_end:
                jumps += 1
                current_end = farthest
        return jumps`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'The loop only runs through <code>n - 1</code>, never reaching the last index itself — once <code>current_end</code> reaches or passes the last index, the jump that got it there has already been counted, so there\'s nothing left to decide at the final position.',
  solutionExplanation: 'Rather than deciding at each index exactly where to jump, this tracks the farthest position reachable using the jumps taken so far (<code>current_end</code>) and, while scanning within that window, the farthest position reachable with <code>one more</code> jump (<code>farthest</code>) — the jump count only increments when the scan reaches the edge of the current window, at which point committing to the best option found during that window is provably optimal. This never needs to know which specific index was jumped to, only how far reach has been extended, collapsing what could be an O(n²) exploration into a single O(n) pass.',
}
