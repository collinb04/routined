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
  starterCode: `def can_complete_circuit(gas, cost):
  pass`,
  functionName: 'can_complete_circuit',
  conceptId: 'greedy',
  testCases: [
    { label: 'Station 3', args: [[1,2,3,4,5],[3,4,5,1,2]], expected: 3 },
    { label: 'Impossible', args: [[2,3,4],[3,4,3]], expected: -1 },
    { label: 'Single station', args: [[5],[4]], expected: 0 },
  ],
  clues: [
    {
      id: 'feasibility-check',
      question: 'The problem says return -1 if impossible. What single condition determines whether any solution exists?',
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
      question: 'The constraints guarantee at most one valid starting station. What does this mean for your algorithm?',
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
      question: '"There are n gas stations in a circle." How does the circular layout affect how you track the starting candidate?',
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
      question: 'n ≤ 10⁵. What complexity do you need?',
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
}
