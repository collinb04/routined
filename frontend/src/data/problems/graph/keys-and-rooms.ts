export default {
  id: 'keys-and-rooms',
  title: 'Keys and Rooms',
  difficulty: 'medium',
  description: 'There are <code>n</code> rooms, labeled 0 to n-1. Room 0 is unlocked. Each room contains keys to other rooms. Return <code>true</code> if you can visit all rooms.',
  examples: [
    { input: 'rooms = [[1],[2],[3],[]]', output: 'true', explanation: 'Visit 0→1→2→3.' },
    { input: 'rooms = [[1,3],[3,0,1],[2],[0]]', output: 'false', explanation: 'Room 2 cannot be reached.' },
  ],
  constraints: ['n == rooms.length', '1 ≤ n ≤ 1000', '0 ≤ rooms[i].length ≤ 1000'],
  starterCode: `class Solution:
    def can_visit_all_rooms(self, rooms):
        pass`,
  runnerSetup: 'can_visit_all_rooms = Solution().can_visit_all_rooms',
  functionName: 'can_visit_all_rooms',
  conceptId: 'graphs',
  testCases: [
    { label: 'Can visit all', args: [[[1],[2],[3],[]]], expected: true },
    { label: 'Cannot visit all', args: [[[1,3],[3,0,1],[2],[0]]], expected: false },
    { label: 'Single room', args: [[[]]], expected: true },
  ],
  bruteHint: 'A brute-force approach would repeatedly scan the entire list of rooms each round, checking whether any newly-collected key unlocks a room you have not yet visited, and repeat that full scan until a pass finds no new rooms. Each pass costs O(n) and you might need up to n passes before reaching a fixed point, giving roughly O(n²) time overall. Instead of re-scanning everything each round, could you process each room\'s keys exactly once as you discover them?',
  optimizeComplexity: { time: 'O(V + E)', space: 'O(V)' },
  clues: [
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 1000' },
      question: 'Constraint bounds on room and key counts tell you whether a full traversal over all rooms and keys is computationally affordable. n ≤ 1000 rooms, each with up to 1000 keys. What does this tell you about traversal cost?',
      options: [
        { label: 'O(n²) is too slow', isCorrect: false, feedback: 'At n = 1000, O(n²) is 1 million operations — trivially fast. The constraint is small enough that a complete traversal of all rooms and all keys is perfectly acceptable.' },
        { label: 'O(n + k) traversal over rooms and keys is fine', isCorrect: true },
        { label: 'Process rooms in sorted order only', isCorrect: false, feedback: 'Sorted order is not implied by the constraints. You visit rooms in the order keys unlock them, not in label order. Sorting adds unnecessary work.' },
        { label: 'Input size is irrelevant here', isCorrect: false, feedback: 'Input size tells you whether a full traversal is affordable. With n ≤ 1000 and up to 1000 keys per room, processing every room and every key is fast — that shapes the approach.' },
      ],
      correctFeedback: 'With 1000 rooms and up to 1000 keys each, visiting every room and key once is at most 1 million operations — well within any time limit. A full traversal is the right move.',
      wrongFeedback: [
        'How many total operations does it take to visit every room and inspect every key at most once?',
        'The total number of keys across all rooms is at most n × 1000 = 1,000,000. Is that expensive to process once?',
      ],
    },
    {
      id: 'starting-condition',
      highlight: { location: 'description', text: 'Room 0 is unlocked.' },
      question: 'Starting conditions given by a problem often signal where your traversal should begin and how the rest unfolds. "Room 0 is unlocked." What does this guarantee about your starting state?',
      options: [
        { label: 'All rooms are initially reachable', isCorrect: false, feedback: 'Only room 0 starts unlocked. Other rooms must be unlocked by collecting their keys from visited rooms. The guarantee is about where you start, not about what is immediately reachable.' },
        { label: 'You have a fixed traversal entry point', isCorrect: true },
        { label: 'You must visit room 0 last', isCorrect: false, feedback: 'Room 0 is the starting point, not the ending point. The problem says you start there — visiting order for the rest depends on which keys you collect.' },
        { label: 'Room 0 contains all keys', isCorrect: false, feedback: 'Room 0 being unlocked only means you can enter it first. Its keys are whatever rooms[0] lists — not necessarily all keys. Other rooms hold the rest.' },
      ],
      correctFeedback: 'Room 0 being unlocked means your traversal always starts there. You do not need to find an entry point — just begin processing room 0\'s keys and expand from there.',
      wrongFeedback: [
        'If room 0 is the only room you can enter without a key, what does that make it for your traversal?',
        'Think of rooms as graph nodes and keys as directed edges. What role does room 0 play?',
      ],
    },
    {
      id: 'output-boolean',
      highlight: { location: 'description', text: '<code>true</code> if you can visit all rooms' },
      question: 'The output type tells you what condition must hold at the end of a traversal for the answer to be true. The output is true if you "can visit all rooms." What determines whether you return true?',
      options: [
        { label: 'The number of keys collected equals n', isCorrect: false, feedback: 'Keys collected is not the same as rooms visited. A room may hold a key to itself or to an already-visited room. The right check is whether every room was reached, not whether you collected n distinct keys.' },
        { label: 'Every room was marked visited after traversal', isCorrect: true },
        { label: 'The last room visited has no keys', isCorrect: false, feedback: 'An empty key list in the last room does not mean all rooms were visited. Other rooms may still be unreachable. The check is on total rooms visited, not on the final room\'s contents.' },
        { label: 'You returned to room 0', isCorrect: false, feedback: 'Returning to room 0 is never required. The problem asks only whether you can reach all rooms — cycle completion is irrelevant.' },
      ],
      correctFeedback: 'After traversal from room 0, compare the count of visited rooms to n. If visited == n, every room was reachable and you return true.',
      wrongFeedback: [
        'After your traversal ends, how do you know whether you reached every room?',
        'Track which rooms you have entered. At the end, what comparison tells you if you succeeded?',
      ],
    },
    {
      id: 'graph-model',
      highlight: { location: 'description', text: 'Each room contains keys to other rooms.' },
      question: 'How relationships in a problem are phrased often reveals the right data structure to model them as. Each room holds keys to other rooms. How should you model this structure?',
      options: [
        { label: 'As an undirected graph', isCorrect: false, feedback: 'Keys are one-directional — room A holding a key to room B does not mean room B holds a key to room A. The edges are directed from room to the rooms its keys unlock.' },
        { label: 'As a directed graph with reachability traversal', isCorrect: true },
        { label: 'As a sorted list of key counts', isCorrect: false, feedback: 'Sorting by key count throws away which room each key unlocks. You need to know the destinations, not just how many keys a room has.' },
        { label: 'As a set of unique keys seen so far', isCorrect: false, feedback: 'A set of seen keys tracks what you\'ve collected but not which rooms you\'ve entered. Two different rooms could share a key, and the set would not tell you which rooms are actually reachable.' },
      ],
      correctFeedback: 'The rooms form a directed graph: each room is a node, and each key in a room is a directed edge to the room it unlocks. Reachability from node 0 is the question.',
      wrongFeedback: [
        'Keys point from one room to another in one direction. What kind of graph edge does that describe?',
        'Room A\'s keys unlock specific other rooms — not the reverse. How do directed edges model that?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def can_visit_all_rooms(self, rooms):
        n = len(rooms)
        visited = {0}
        stack = [0]
        while stack:
            room = stack.pop()
            for key in rooms[room]:
                if key not in visited:
                    visited.add(key)
                    stack.append(key)
        return len(visited) == n`,
  solutionComplexity: { time: 'O(V + E)', space: 'O(V)' },
  solutionCaveat: 'Room 0 starts unlocked by assumption, so the traversal seeds <code>visited</code> with just <code>{0}</code> — no key is needed to enter the room the search begins in.',
  solutionExplanation: 'Modeling each room as a node and each key inside a room as a directed edge to the room it unlocks turns "can every room eventually be opened" into a plain reachability question: starting from room 0, does DFS/BFS reach every other room? Comparing the size of the visited set to the total room count at the end answers that directly, with no need to simulate collecting or using keys in any particular order.',
}
