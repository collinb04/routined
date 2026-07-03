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
  starterCode: `def can_visit_all_rooms(rooms):
  pass`,
  functionName: 'can_visit_all_rooms',
  conceptId: 'graphs',
  testCases: [
    { label: 'Can visit all', args: [[[1],[2],[3],[]]], expected: true },
    { label: 'Cannot visit all', args: [[[1,3],[3,0,1],[2],[0]]], expected: false },
    { label: 'Single room', args: [[[]]], expected: true },
  ],
}
