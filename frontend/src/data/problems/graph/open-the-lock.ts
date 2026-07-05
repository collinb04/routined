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
  starterCode: `def open_lock(deadends, target):
  pass`,
  functionName: 'open_lock',
  conceptId: 'graphs',
  testCases: [
    { label: '6 turns', args: [['0201','0101','0102','1212','2002'],'0202'], expected: 6 },
    { label: '1 turn', args: [['8888'],'0009'], expected: 1 },
    { label: 'Already there', args: [[],  '0000'], expected: 0 },
  ],
  clues: [
    {
      id: 'output-minimum',
      question: 'The problem asks for the minimum number of turns. What does "minimum" signal about the algorithm?',
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
      question: 'Each lock state is a 4-digit string (digits 0–9). How many distinct states exist?',
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
      question: 'Deadend states must never be visited. How should you handle them?',
      options: [
        { label: 'Skip them during neighbor generation', isCorrect: false, feedback: 'Skipping during generation is the right idea, but not sufficient on its own — you also need to avoid starting BFS from them. If "0000" is a deadend, the answer is -1 immediately.' },
        { label: 'Add to visited set before BFS begins', isCorrect: true },
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
      question: 'Each wheel is circular: turning 0 backward gives 9, and turning 9 forward gives 0. What does this imply?',
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
}
