export default {
  id: 'frog-jump',
  title: 'Frog Jump',
  difficulty: 'hard',
  description: 'A frog crossing a river must jump on stones. At each stone it can jump k-1, k, or k+1 units (k = last jump). Can the frog reach the last stone?',
  examples: [
    { input: 'stones = [0,1,3,5,6,8,12,17]', output: 'true', explanation: 'Jump sequence: 1,2,2,3,3,4,5.' },
    { input: 'stones = [0,1,2,3,4,8,9,11]', output: 'false' },
  ],
  constraints: ['2 ≤ stones.length ≤ 2000', '0 ≤ stones[i] ≤ 2³¹ − 1', 'stones[0] == 0', 'stones is sorted'],
  starterCode: `def can_cross(stones):
  pass`,
  functionName: 'can_cross',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Can cross', args: [[0,1,3,5,6,8,12,17]], expected: true },
    { label: 'Cannot cross', args: [[0,1,2,3,4,8,9,11]], expected: false },
  ],
  bruteHint: 'Describe the naive recursive approach trying every jump size from each stone, and note why it revisits the same stone/jump-size pairs repeatedly',
  optimizeHint: 'Name the two-part state to memoize so each stone/last-jump-size pair is computed once',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'stones.length ≤ 2000 tells you…',
      options: [
        { label: 'O(n log n) is required', isCorrect: false, feedback: 'O(n log n) would be impressively fast, but the constraint doesn\'t demand it. 2000² is 4 million operations — that\'s well within reach for a polynomial-time solution.' },
        { label: 'O(n²) is acceptable', isCorrect: true },
        { label: 'O(n³) is fine', isCorrect: false, feedback: 'At n = 2000, O(n³) is 8 billion operations — far too slow. The constraint rules that out.' },
        { label: 'Input size doesn\'t matter', isCorrect: false, feedback: 'Input size always matters. n ≤ 2000 is a signal about acceptable complexity — ask what a worst-case run looks like at that bound.' },
      ],
      correctFeedback: '2000² = 4 million operations — that fits comfortably within time limits and suggests a 2D DP approach over stones and jump sizes.',
      wrongFeedback: [
        'What does worst case look like at n = 2000? How many operations can you afford?',
        'At n = 2000, O(n²) is 4 million ops. What does that rule in versus rule out?',
      ],
    },
    {
      id: 'state-definition',
      question: 'At each stone the frog can jump k-1, k, or k+1 units where k is the last jump size. What two pieces of information define the state?',
      options: [
        { label: 'Current index and total distance traveled', isCorrect: false, feedback: 'Total distance is derivable from the stone\'s position, not from the index alone. The key missing piece is the jump size that got you here — that determines your options at the next stone.' },
        { label: 'Current stone and last jump size', isCorrect: true },
        { label: 'Current stone and stones remaining', isCorrect: false, feedback: 'Stones remaining doesn\'t tell you what jumps are available — that depends on the last jump size k, not on how many stones are left.' },
        { label: 'Stone index and total jumps taken', isCorrect: false, feedback: 'The total number of jumps doesn\'t determine what\'s available next. Only the last jump size k does, because the next jump must be k-1, k, or k+1.' },
      ],
      correctFeedback: 'Exactly — the reachable next stones depend entirely on which stone you\'re on and how large the jump that got you there was. That pair is the full DP state.',
      wrongFeedback: [
        'The frog\'s options at the next stone depend on what? Re-read the jump rule.',
        'Next options are k-1, k, k+1. Which two things do you need to know to compute that?',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is a boolean — can the frog reach the last stone? This means…',
      options: [
        { label: 'Return the shortest jump sequence', isCorrect: false, feedback: 'The problem asks only whether it\'s possible, not what path achieves it. Tracking the full sequence would do extra work the output doesn\'t require.' },
        { label: 'Stop and return true as soon as the last stone is reached', isCorrect: true },
        { label: 'Count all valid paths and return true if count > 0', isCorrect: false, feedback: 'Counting all valid paths is far more work than needed. A single reachable path is enough to confirm the answer is true.' },
        { label: 'Return the minimum number of jumps', isCorrect: false, feedback: 'The output is true/false, not a count of jumps. The problem only asks whether the crossing is possible.' },
      ],
      correctFeedback: 'Right — the boolean output means you can short-circuit: the moment any traversal reaches the last stone, you\'re done.',
      wrongFeedback: [
        'The output is true or false. What does finding one valid path tell you about whether you need to keep searching?',
        'You don\'t need every path — just one. What does that mean for when you can stop?',
      ],
    },
    {
      id: 'stones-sorted-guarantee',
      question: 'The stones array is sorted and stones[0] == 0. What does this let you do?',
      options: [
        { label: 'Use binary search to find reachable stones', isCorrect: true },
        { label: 'Sort the stones yourself before processing', isCorrect: false, feedback: 'The guarantee says stones is already sorted — sorting again is redundant work the constraint is explicitly telling you to skip.' },
        { label: 'Ignore stone positions and just count stones', isCorrect: false, feedback: 'Stone positions are central to the problem — the jump size is the difference between stone positions, not a count of stones.' },
        { label: 'Assume all gaps between stones are equal', isCorrect: false, feedback: 'The problem\'s examples show irregular gaps (e.g., [0,1,3,5,6,8,12,17]). The sorted guarantee enables efficient lookup, not uniform spacing.' },
      ],
      correctFeedback: 'Since stones is sorted, you can binary search or use a set to check whether a target position (current + jump size) is actually a stone — in O(log n) or O(1) per lookup.',
      wrongFeedback: [
        'Sorted order and a known starting point let you efficiently check: "does a stone exist at position x?" What structure or technique helps with that?',
        'You need to look up whether specific positions are stones. Sorted input (or a set built from it) makes that lookup fast.',
      ],
    },
  ],
}
