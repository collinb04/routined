export default {
  id: 'gas-station',
  title: 'Gas Station',
  difficulty: 'medium',
  description: 'There are <code>n</code> gas stations in a circle. You are given <code>gas[i]</code> and <code>cost[i]</code> to travel to the next station. Find the starting station index from which you can complete a full circuit. Return -1 if impossible.',
  examples: [
    { input: 'gas=[1,2,3,4,5], cost=[3,4,5,1,2]', output: '3', explanation: 'Starting at station 3 you can complete the circuit.' },
    { input: 'gas=[2,3,4], cost=[3,4,3]', output: '-1' },
  ],
  constraints: ['n == gas.length == cost.length', '1 ≤ n ≤ 10⁵', '0 ≤ gas[i], cost[i] ≤ 10⁴'],
  starterCode: `class Solution:
    def can_complete_circuit(self, gas, cost):
        pass`,
  runnerSetup: 'can_complete_circuit = Solution().can_complete_circuit',
  functionName: 'can_complete_circuit',
  conceptId: 'greedy',
  testCases: [
    { label: 'Station 3', args: [[1,2,3,4,5],[3,4,5,1,2]], expected: 3 },
    { label: 'Impossible', args: [[2,3,4],[3,4,3]], expected: -1 },
    { label: 'Single station', args: [[5],[4]], expected: 0 },
  ],
  bruteHint: "One brute-force approach simulates the entire circuit starting from every station: for each of the n candidates, walk all n stops and check whether the tank ever dips below zero. That's O(n) work per candidate across n candidates, giving O(n²) overall — at n = 10⁵ that's roughly 10 billion operations. Is there a way to reuse information from a failed simulation instead of restarting from scratch each time?",
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'feasibility-check',
      highlight: { location: 'description', text: 'Return -1 if impossible.' },
      question: 'When a description calls out an explicit fallback value for an impossible case, it\'s telling you there\'s a simple global check you can perform before doing any real work. The problem says return -1 if impossible. What single condition determines whether any solution exists?',
      options: [
        { label: 'sum(gas) >= sum(cost)', isCorrect: true },
        { label: 'Every gas[i] >= cost[i]', isCorrect: false, feedback: 'Individual stations don\'t need to be self-sufficient. Gas accumulates as you travel — you can enter a station on empty, fill up, and still make it forward. Only the global total needs to be non-negative.' },
        { label: 'The maximum gas[i] >= average cost', isCorrect: false, feedback: 'Averages and per-element maxima don\'t capture the constraint. What matters is whether total gas collected across all n stations covers total cost to travel all n legs.' },
        { label: 'There exists some i where gas[i] > 0', isCorrect: false, feedback: 'Even if every station has gas, costs could exceed gas everywhere and you\'d run out. The global sum is the check: if total gas < total cost, no starting point works.' },
      ],
      correctFeedback: 'If sum(gas) < sum(cost), total fuel can\'t cover total travel — return -1 immediately. If sum(gas) >= sum(cost), a valid start always exists (the greedy algorithm finds it in O(n)).',
      wrongFeedback: [
        'Think about the entire circuit as one big tank. If you collected all the gas and paid all the costs, would you finish with non-negative fuel?',
        'Total gas vs. total cost determines feasibility. If total gas >= total cost, the problem guarantees a unique valid starting point.',
      ],
    },
    {
      id: 'unique-answer',
      question: 'A guarantee about the uniqueness of the answer often hints that a single deterministic pass — rather than an exhaustive search — will find it. The constraints guarantee at most one valid starting station. What does this mean for your algorithm?',
      options: [
        { label: 'Try all n starting points and return the first valid one', isCorrect: false, feedback: 'Trying all n starting points is O(n²) — 10⁵² = 10 billion operations at worst. The uniqueness guarantee means you can find the answer in one O(n) pass without brute-force verification.' },
        { label: 'Stop and return as soon as you find a valid start', isCorrect: true },
        { label: 'Collect all valid starts and return the minimum index', isCorrect: false, feedback: 'There is exactly one valid start — there is nothing to collect beyond it. The guarantee eliminates the need to compare multiple candidates.' },
        { label: 'Uniqueness means the answer is always index 0', isCorrect: false, feedback: 'The unique answer can be any index from 0 to n-1. The first example has answer 3. Uniqueness means you stop at the first valid candidate, not that the candidate is always 0.' },
      ],
      correctFeedback: 'With a unique answer, the greedy approach works: track cumulative tank; when it goes negative, reset the start candidate to i+1. One pass, O(n), no verification loop needed.',
      wrongFeedback: [
        'If only one answer exists, do you need to check the remaining stations after finding a candidate that works?',
        'The greedy observation: if your tank goes negative starting from candidate s, none of the skipped stations can be better starts. Reset to the next station and keep going — one pass is enough.',
      ],
    },
    {
      id: 'circular-structure',
      highlight: { location: 'description', text: 'There are <code>n</code> gas stations in a circle.' },
      question: 'Recognizing when a problem\'s underlying structure is circular rather than linear changes how you reason about wraparound and where a greedy scan can safely stop. "There are n gas stations in a circle." How does the circular layout affect how you track the starting candidate?',
      options: [
        { label: 'You must simulate the full circuit from each candidate', isCorrect: false, feedback: 'Simulating the full circuit from each of the n candidates is O(n²). The circular property does not require brute-force simulation — the greedy insight handles the wrap-around implicitly.' },
        { label: 'If you can reach the end linearly, you can complete the circuit', isCorrect: true },
        { label: 'You need to duplicate the array to handle wrap-around', isCorrect: false, feedback: 'Duplicating the array (creating a 2n-length version) is one way to handle circular problems, but it wastes O(n) space. The greedy approach handles the circle in O(1) extra space without duplication.' },
        { label: 'Sort stations by net gain to find the best start', isCorrect: false, feedback: 'Sorting destroys the original circular order, which is essential — you must travel stations in sequence. Reordering them makes the problem unsolvable.' },
      ],
      correctFeedback: 'Key insight: if sum(gas) >= sum(cost), a valid start exists. The greedy algorithm finds it by scanning linearly; since the total is non-negative, the tail of the array "pays back" any deficit from the front.',
      wrongFeedback: [
        'If you run out of gas at station k starting from candidate s, can any station between s and k be a better start? Why not?',
        'Any station between s and k had non-negative running total from s — adding a negative segment to a positive prefix only makes things worse. So you reset your candidate to k+1 and continue.',
      ],
    },
    {
      id: 'constraint-linear',
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 10⁵' },
      question: 'Large input bounds in the constraints are a direct signal for the time complexity your algorithm must hit. n ≤ 10⁵. What complexity do you need?',
      options: [
        { label: 'O(n log n) — sort first, then scan', isCorrect: false, feedback: 'Sorting destroys the circular order. And O(n log n) is unnecessary here — the greedy algorithm is O(n) with no sorting required.' },
        { label: 'O(n²) is acceptable at n = 10⁵', isCorrect: false, feedback: 'O(n²) at n = 10⁵ is 10 billion operations — far too slow. You need a linear-time approach.' },
        { label: 'O(n) — a single pass', isCorrect: true },
        { label: 'O(1) — compute answer from totals alone', isCorrect: false, feedback: 'You can determine feasibility in O(1) from totals, but you still need to find the starting index. That requires at least one O(n) pass through the array.' },
      ],
      correctFeedback: '10⁵ elements fit comfortably in a single O(n) scan. The greedy algorithm maintains running total and current candidate — constant work per station, one pass total.',
      wrongFeedback: [
        'At n = 10⁵, O(n²) means 10 billion operations. What complexity lets you process each station exactly once?',
        'A single pass is O(n). Track running tank and candidate start; reset when tank drops below zero. One pass = O(n).',
      ],
    },
  ],
  solutionCode: `class Solution:
    def can_complete_circuit(self, gas, cost):
        if sum(gas) < sum(cost):
            return -1

        tank = 0
        start = 0
        for i in range(len(gas)):
            tank += gas[i] - cost[i]
            if tank < 0:
                start = i + 1
                tank = 0
        return start`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'When the running tank drops below zero, the candidate resets to <code>i + 1</code> and the tank resets to <code>0</code> — <code>none</code> of the stations between the old candidate and <code>i</code> are ever retried, since every one of them had a non-negative running total from the old candidate, so adding the same negative segment after any of them could only make things worse.',
  solutionExplanation: 'The total-gas-versus-total-cost check answers feasibility in O(1): if the whole circuit\'s fuel can\'t cover the whole circuit\'s cost, no starting point can ever work, and the problem guarantees exactly one starting point works otherwise. A single left-to-right pass then finds it directly — whenever the running tank goes negative starting from the current candidate, every station skipped over on the way there is provably a worse candidate, so resetting to the very next station after the failure point is always safe and never discards the true answer.',
}
