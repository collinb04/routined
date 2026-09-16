export default {
  id: 'open-the-lock',
  title: 'Open the Lock',
  difficulty: 'medium',
  description: 'A lock has 4 circular wheels each with digits 0-9. You can turn any wheel one step forward or backward. Given a list of <code>deadends</code> and a <code>target</code>, find the minimum turns to reach the target from "0000", or -1 if impossible.',
  examples: [
    { input: 'deadends=["0201","0101","0102","1212","2002"], target="0202"', output: '6' },
    { input: 'deadends=["8888"], target="0009"', output: '1' },
  ],
  constraints: ['1 ≤ deadends.length ≤ 500', 'target.length == deadends[i].length == 4', 'target is not in deadends'],
  starterCode: `class Solution:
    def open_lock(self, deadends, target):
        pass`,
  runnerSetup: 'open_lock = Solution().open_lock',
  functionName: 'open_lock',
  conceptId: 'graphs',
  testCases: [
    { label: '6 turns', args: [['0201','0101','0102','1212','2002'],'0202'], expected: 6 },
    { label: '1 turn', args: [['8888'],'0009'], expected: 1 },
    { label: 'Already there', args: [[],  '0000'], expected: 0 },
  ],
  bruteHint: 'A brute-force approach would use DFS or plain recursion to try every sequence of wheel turns, branching into up to 8 possible moves at each step and exploring paths of arbitrary depth in search of the target. Since it has no notion of turn count when choosing which path to explore first, it can wander down long sequences before stumbling onto the target, and the number of explored sequences grows exponentially — O(8^d) for a path of depth d. How could you restructure the search so the shortest sequence of turns is always found before any longer one?',
  optimizeComplexity: { time: 'O(10⁴)', space: 'O(10⁴)' },
  clues: [
    {
      id: 'output-minimum',
      question: 'Paying close attention to the exact wording of what a problem asks you to return often reveals whether any path will do or specifically the shortest one is required. The problem asks for the minimum number of turns. What does "minimum" signal about the algorithm?',
      highlight: { location: 'description', text: 'find the minimum turns to reach the target from "0000", or -1 if impossible.' },
      options: [
        { label: 'Use BFS, not DFS', isCorrect: true },
        { label: 'Sort states by turn count', isCorrect: false, feedback: 'Sorting states doesn\'t yield the minimum path — you\'d still visit states in the wrong order. "Minimum" means you want the first time you reach a state, which BFS guarantees by exploring level by level.' },
        { label: 'DFS with backtracking', isCorrect: false, feedback: 'DFS finds a path, but not necessarily the shortest one. Backtracking explores arbitrary branches and has no guarantee of reaching a state in the fewest steps first.' },
        { label: 'Input size is too small to matter', isCorrect: false, feedback: 'The algorithm choice isn\'t about input size here — it\'s about correctness. "Minimum turns" requires a strategy that finds the shortest path, not just any path.' },
      ],
      correctFeedback: 'BFS explores all states reachable in k turns before any state reachable in k+1 turns. The first time it reaches the target is guaranteed to be via the shortest path.',
      wrongFeedback: [
        'You need the fewest turns, not just any sequence of turns. Which traversal strategy visits states in order of distance from the start?',
        'Think about the difference between BFS and DFS: one explores neighbors level by level, the other dives deep. Which one finds the nearest target first?',
      ],
    },
    {
      id: 'state-space',
      question: 'Before choosing a search strategy, it helps to know how large the space of possible states actually is. Each lock state is a 4-digit string (digits 0–9). How many distinct states exist?',
      highlight: { location: 'constraint', text: 'target.length == deadends[i].length == 4' },
      options: [
        { label: '4 × 10 = 40', isCorrect: false, feedback: 'That counts digits per wheel, not combinations. Each wheel is independent — 10 choices per wheel across 4 wheels gives 10⁴ total states.' },
        { label: '10⁴ = 10,000', isCorrect: true },
        { label: 'Unlimited — recursion has no bound', isCorrect: false, feedback: 'The state space is finite: 4 wheels, 10 positions each. Without tracking visited states, you\'d revisit the same 10,000 states endlessly — that\'s not unlimited, it\'s a cycle.' },
        { label: '4! = 24', isCorrect: false, feedback: '4! counts permutations of 4 items, but each wheel independently ranges over 10 digits. The total is 10 × 10 × 10 × 10 = 10,000.' },
      ],
      correctFeedback: '10,000 states is a small, bounded graph. BFS over this space is fast, but you must track visited states to avoid infinite loops through the cycle-able wheels.',
      wrongFeedback: [
        'Each of the 4 wheels can independently be any digit 0–9. How many combinations does that produce?',
        'Think of it as a 4-digit base-10 number: from 0000 to 9999.',
      ],
    },
    {
      id: 'deadends-constraint',
      question: 'Constraints that forbid certain states outright often need to be folded into your traversal\'s bookkeeping, not just checked ad hoc. Deadend states must never be visited. How should you handle them?',
      highlight: { location: 'constraint', text: '1 ≤ deadends.length ≤ 500' },
      options: [
        { label: 'Skip them during neighbor generation', isCorrect: false, feedback: 'Skipping during generation is the right idea, but not sufficient on its own — you also need to avoid starting BFS from them. If "0000" is a deadend, the answer is -1 immediately.' },
        { label: 'Add to visited set before traversal begins', isCorrect: true },
        { label: 'Remove from graph after building adjacency list', isCorrect: false, feedback: 'There\'s no explicit adjacency list here — you generate neighbors on the fly. Pre-loading deadends into the visited set is cleaner and handles the "0000 is a deadend" edge case automatically.' },
        { label: 'Check only when dequeuing', isCorrect: false, feedback: 'Checking at dequeue works, but allows deadend states to enter the queue. Pre-loading them into the visited set prevents enqueuing them at all and handles the initial "0000" deadend case correctly.' },
      ],
      correctFeedback: 'Pre-seeding the visited set with all deadends is the cleanest approach: it prevents enqueuing them during BFS and automatically handles the edge case where "0000" is itself a deadend.',
      wrongFeedback: [
        'What happens if the starting state "0000" is in the deadends list? Where in your BFS setup does that case need to be caught?',
        'Think about the visited set: what if you populate it with deadends before you ever start BFS? What does that buy you?',
      ],
    },
    {
      id: 'circular-wheels',
      question: 'The way individual moves are defined determines the branching factor of the underlying graph, which shapes how expensive each BFS level will be. Each wheel is circular: turning 0 backward gives 9, and turning 9 forward gives 0. What does this imply?',
      highlight: { location: 'description', text: 'A lock has 4 circular wheels each with digits 0-9. You can turn any wheel one step forward or backward.' },
      options: [
        { label: 'Each digit has exactly 2 neighbors', isCorrect: true },
        { label: 'Some digits are dead ends by default', isCorrect: false, feedback: 'Circularity doesn\'t create dead ends — it ensures every digit always has exactly 2 neighbors. Dead ends come from the explicit deadends list, not wheel mechanics.' },
        { label: 'You need modular arithmetic', isCorrect: false, feedback: 'Modular arithmetic is how you implement the circular wrapping, but the signal the problem is sending is about the graph structure: each digit has exactly 2 neighbors, so each 4-digit state has exactly 8 neighbor states.' },
        { label: 'Backward turns should be avoided', isCorrect: false, feedback: 'Backward turns are valid moves and may be necessary to reach the target. The circularity just means (0−1) wraps to 9 — it doesn\'t penalize backward movement.' },
      ],
      correctFeedback: 'Each wheel digit has exactly 2 neighbors (one forward, one backward), so each 4-wheel state has exactly 8 neighbor states. This gives the BFS graph a uniform branching factor of 8.',
      wrongFeedback: [
        'For any digit, what are the only two things you can do to it? Now multiply that across 4 independent wheels.',
        'A digit d has neighbor (d+1) mod 10 and (d−1) mod 10 — always exactly 2. With 4 wheels, how many neighbors does each full state have?',
      ],
    },
  ],
  solutionCode: `from collections import deque

class Solution:
    def open_lock(self, deadends, target):
        dead = set(deadends)
        start = '0000'
        if start in dead:
            return -1
        if start == target:
            return 0

        visited = {start}
        queue = deque([(start, 0)])
        while queue:
            state, steps = queue.popleft()
            for i in range(4):
                digit = int(state[i])
                for delta in (1, -1):
                    new_digit = (digit + delta) % 10
                    new_state = state[:i] + str(new_digit) + state[i+1:]
                    if new_state in dead or new_state in visited:
                        continue
                    if new_state == target:
                        return steps + 1
                    visited.add(new_state)
                    queue.append((new_state, steps + 1))
        return -1`,
  solutionComplexity: { time: 'O(10⁴)', space: 'O(10⁴)' },
  solutionCaveat: 'Deadends are just another form of "already visited" — a state in <code>dead</code> is skipped exactly like a state already in <code>visited</code>, since either way the search must never move onto it or enqueue it.',
  solutionExplanation: 'Each 4-digit combination is a node, and turning any single wheel by one click is an edge to exactly one of 8 neighboring states, so finding the fewest turns from "0000" to <code>target</code> is an unweighted shortest-path problem BFS solves optimally. Treating deadend states as simply forbidden to enter — never added to the queue and never marked as the answer — keeps the search confined to the reachable, non-dead portion of the state space.',
}
