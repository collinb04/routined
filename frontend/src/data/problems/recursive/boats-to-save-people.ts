export default {
  id: 'boats-to-save-people',
  title: 'Boats to Save People',
  difficulty: 'medium',
  description: 'Each boat can carry at most 2 people and a total weight of <code>limit</code>. Given the weights of people, return the minimum number of boats needed.',
  examples: [
    { input: 'people=[1,2], limit=3', output: '1', explanation: 'Both can ride in one boat.' },
    { input: 'people=[3,2,2,1], limit=3', output: '3', explanation: '(1,2),(2),(3).' },
  ],
  constraints: ['1 ≤ people.length ≤ 5 × 10⁴', '1 ≤ people[i] ≤ limit ≤ 3 × 10⁴'],
  starterCode: `class Solution:
    def num_rescue_boats(self, people, limit):
        pass`,
  runnerSetup: 'num_rescue_boats = Solution().num_rescue_boats',
  functionName: 'num_rescue_boats',
  conceptId: 'greedy',
  testCases: [
    { label: 'Two fit', args: [[1,2],3], expected: 1 },
    { label: 'Three boats', args: [[3,2,2,1],3], expected: 3 },
    { label: 'All alone', args: [[3,3,3,3],3], expected: 4 },
    { label: 'All together', args: [[1,1,1,1],4], expected: 2 },
  ],
  bruteHint: 'The brute-force approach tries every possible way to pair people into boats — for each person, decide whether they ride alone or attempt to pair with each remaining person, exploring all combinations. This exhaustive search runs in roughly O(n²) time, since you would be comparing many possible partners for each person. Given the array can hold up to 5 × 10⁴ people, that\'s far too slow. Can you find a way to decide each boat\'s occupants without comparing every possible pair?',
  optimizeComplexity: { time: 'O(n log n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-boat-capacity',
      question: 'Hard numeric limits in a problem statement often narrow down which strategies are even structurally possible. "At most 2 people per boat." What does this hard limit mean for the problem structure?',
      highlight: { location: 'description', text: 'Each boat can carry at most 2 people and a total weight of <code>limit</code>.' },
      options: [
        { label: 'Break the problem into overlapping sub-groupings and reuse solutions to smaller ones', isCorrect: false, feedback: 'DP would be needed if boats could carry any subset of any size. With a maximum of 2 per boat, the only decision at each step is: does the heaviest remaining person share a boat with someone, or go alone?' },
        { label: 'Each boat holds either 1 or 2 people — no larger groups', isCorrect: true },
        { label: 'Pair people by closest weight', isCorrect: false, feedback: 'Closest-weight pairing does not minimize boats. The greedy insight is to pair the heaviest person with the lightest — if they fit, you save a boat; if not, the heaviest must go alone.' },
        { label: 'Sort in descending order and fill each boat as soon as possible', isCorrect: false, feedback: 'Sorting is useful, but descending order alone does not lead to the optimal pairing strategy. You need both endpoints of the sorted array to decide whether a pairing is possible.' },
      ],
      correctFeedback: 'With at most 2 per boat, every boat decision is binary: one person, or two. That makes a greedy pairing strategy both sufficient and optimal.',
      wrongFeedback: [
        'If each boat holds at most 2 people, how many possible groupings exist for a single boat? What does that simplify the decision to?',
        'With only two options per boat (1 person or 2 people), you just need a rule for when to pair. Think about which pairs maximize usage.',
      ],
    },
    {
      id: 'greedy-pairing-strategy',
      question: 'A problem\'s stated objective (minimize, maximize) narrows down which local choices can possibly lead to a globally optimal result. To minimize the number of boats, which pairing strategy is optimal?',
      highlight: { location: 'description', text: 'return the minimum number of boats needed.' },
      options: [
        { label: 'Pair the two heaviest people together', isCorrect: false, feedback: 'Two heavy people may exceed the limit and cannot share a boat. Forcing such pairings wastes boats on people who must travel alone anyway.' },
        { label: 'Pair the heaviest with the lightest if they fit', isCorrect: true },
        { label: 'Pair people with equal weights', isCorrect: false, feedback: 'Equal-weight pairing is not guaranteed to be possible or optimal. People with the same weight might jointly exceed the limit, and light people could be paired with heavy ones to save more boats.' },
        { label: 'Send everyone alone to guarantee safety', isCorrect: false, feedback: 'Sending everyone alone is always valid but maximizes boats rather than minimizing them — the opposite of the goal.' },
      ],
      correctFeedback: 'Sort the array. Use two pointers: if the lightest + heaviest ≤ limit, they share a boat; otherwise the heaviest goes alone. This greedy choice is locally and globally optimal.',
      wrongFeedback: [
        'Think about the heaviest person. They either go alone or share with someone. Who is the best candidate to share with, to avoid wasting a boat?',
        'The heaviest person is hardest to pair. If they can share with anyone, the lightest person is the safest choice — it maximally preserves the limit for the pairing.',
      ],
    },
    {
      id: 'sorting-requirement',
      question: 'Constraints on value ranges often signal what preprocessing step unlocks an efficient scan. 1 ≤ people[i] ≤ limit ≤ 3 × 10⁴. The constraint guarantees every person fits in a boat alone. What does sorting the array enable?',
      highlight: { location: 'constraint', text: '1 ≤ people[i] ≤ limit ≤ 3 × 10⁴' },
      options: [
        { label: 'Sorting lets you skip people who are too heavy', isCorrect: false, feedback: 'Everyone fits alone (people[i] ≤ limit is guaranteed), so no one is skipped. Sorting enables efficient two-pointer pairing, not filtering.' },
        { label: 'Two pointers to efficiently find valid pairs', isCorrect: true },
        { label: 'Binary search to find the best partner for each person', isCorrect: false, feedback: 'Binary search would find a partner in O(log n) per person, giving O(n log n) total. Two pointers after sorting achieve O(n) partner-finding after the O(n log n) sort — and the logic is simpler.' },
        { label: 'Sorting is not needed — scan left to right', isCorrect: false, feedback: 'Without sorting, you cannot efficiently identify the lightest available person to pair with the heaviest. A linear scan in unsorted order does not give you the optimal greedy pairing.' },
      ],
      correctFeedback: 'After sorting, the lightest person is always at the left pointer and the heaviest at the right. Two pointer checks take O(1) each, and at most n pointer moves — O(n) after the O(n log n) sort.',
      wrongFeedback: [
        'After sorting, where are the lightest and heaviest people? How does that let you check a pairing in O(1)?',
        'Two pointers (lo, hi) start at opposite ends of the sorted array. Each step either pairs two people (lo++, hi--) or sends the heaviest alone (hi--). How many steps total?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def num_rescue_boats(self, people, limit):
        people.sort()
        lo, hi = 0, len(people) - 1
        boats = 0
        while lo <= hi:
            if people[lo] + people[hi] <= limit:
                lo += 1
            hi -= 1
            boats += 1
        return boats`,
  solutionComplexity: { time: 'O(n log n)', space: 'O(1)' },
  solutionCaveat: '<code>hi</code> always decrements every iteration, but <code>lo</code> only advances when the lightest remaining person actually fits alongside the heaviest — the heaviest person always leaves on this boat one way or another, so a single boat is counted regardless of whether the pairing succeeds.',
  solutionExplanation: 'Sorting first puts the lightest and heaviest remaining people at the two ends of the array, so the greedy choice — try to pair the heaviest with the lightest — is always checkable in O(1): if they fit together, pairing them is optimal since the lightest person is the easiest possible partner for the heaviest, and if they don\'t fit, no one else can pair with the heaviest either since everyone else is at least as heavy as the lightest. Each iteration removes the heaviest remaining person (and possibly the lightest too) while counting exactly one boat, so the two pointers meet after at most n steps.',
}
