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
  starterCode: `class Solution:
    def can_cross(self, stones):
        pass`,
  runnerSetup: 'can_cross = Solution().can_cross',
  functionName: 'can_cross',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Can cross', args: [[0,1,3,5,6,8,12,17]], expected: true },
    { label: 'Cannot cross', args: [[0,1,2,3,4,8,9,11]], expected: false },
  ],
  bruteHint: 'A brute-force solution recursively tries jumping k-1, k, or k+1 units from the current stone, exploring every combination of jump sizes all the way to the end. Because the same (stone, last jump size) pair can be reached along many different paths, this naive recursion re-explores identical states repeatedly, costing exponential time in the worst case. What pair of values, if memoized, would let you skip re-solving states you\'ve already seen?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(n²)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraints set the ceiling on acceptable complexity, so reading them first tells you which algorithmic approaches are even worth considering. stones.length ≤ 2000 tells you…',
      highlight: { location: 'constraint', text: '2 ≤ stones.length ≤ 2000' },
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
      question: 'When a rule says your next move depends on more than just where you are, your DP state has to capture every piece of information that move depends on. At each stone the frog can jump k-1, k, or k+1 units where k is the last jump size. What two pieces of information define the state?',
      highlight: { location: 'description', text: 'it can jump k-1, k, or k+1 units (k = last jump)' },
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
      question: 'A boolean return type usually means you can stop as soon as a single valid outcome is found, instead of exploring every possibility. The output is a boolean — can the frog reach the last stone? This means…',
      highlight: { location: 'description', text: 'Can the frog reach the last stone?' },
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
      question: 'Guarantees about input structure — like sorted order or a fixed starting point — often exist specifically to make a repeated lookup fast, so it\'s worth asking what they enable. The stones array is sorted and stones[0] == 0. What does this let you do?',
      highlight: { location: 'constraint', text: 'stones is sorted' },
      options: [
        { label: 'Quickly check whether a stone exists at a specific position', isCorrect: true },
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
  solutionCode: `class Solution:
    def can_cross(self, stones):
        stone_set = set(stones)
        target = stones[-1]
        memo = {}

        def dfs(pos, k):
            if pos == target:
                return True
            if (pos, k) in memo:
                return memo[(pos, k)]
            result = False
            for dk in (-1, 0, 1):
                nk = k + dk
                npos = pos + nk
                if nk > 0 and npos in stone_set:
                    if dfs(npos, nk):
                        result = True
                        break
            memo[(pos, k)] = result
            return result

        return dfs(stones[0], 0)`,
  solutionComplexity: { time: 'O(n²)', space: 'O(n²)' },
  solutionCaveat: 'The <code>nk &gt; 0</code> check discards any candidate jump size of zero or negative — the frog is never allowed to jump backward or stand still, so only strictly forward jump sizes are ever attempted, even though the recurrence nominally offers <code>k-1</code> as an option.',
  solutionExplanation: 'The state that fully determines the frog\'s future options is the pair (current stone, last jump size), since the next jump must be <code>k-1</code>, <code>k</code>, or <code>k+1</code> — memoizing on that pair is what collapses the exponential branching into a bounded number of distinct subproblems, since the same (position, jump size) combination is reachable via many different jump sequences but only ever needs solving once. A <code>set</code> of stone positions makes each "is this landing spot actually a stone" check O(1), and the search can stop the instant any path reaches the final stone.',
}
