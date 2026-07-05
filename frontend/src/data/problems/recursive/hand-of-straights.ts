export default {
  id: 'hand-of-straights',
  title: 'Hand of Straights',
  difficulty: 'medium',
  description: 'Alice has some number of cards and wants to rearrange them in groups so that each group is of size <code>groupSize</code> and consists of <code>groupSize</code> consecutive cards. Return <code>true</code> if possible.',
  examples: [
    { input: 'hand=[1,2,3,6,2,3,4,7,8], groupSize=3', output: 'true', explanation: '[1,2,3],[2,3,4],[6,7,8] each have 3 consecutive cards.' },
    { input: 'hand=[1,2,3,4,5], groupSize=4', output: 'false' },
  ],
  constraints: ['1 ≤ hand.length ≤ 10⁴', '0 ≤ hand[i] ≤ 10⁹', '1 ≤ groupSize ≤ hand.length'],
  starterCode: `def is_n_straight_hand(hand, group_size):
  pass`,
  functionName: 'is_n_straight_hand',
  conceptId: 'greedy',
  testCases: [
    { label: 'Valid', args: [[1,2,3,6,2,3,4,7,8],3], expected: true },
    { label: 'Invalid', args: [[1,2,3,4,5],4], expected: false },
    { label: 'Single group', args: [[1,2,3],3], expected: true },
  ],
  clues: [
    {
      id: 'divisibility-check',
      question: 'hand=[1,2,3,4,5], groupSize=4 returns false immediately. What arithmetic check catches this before any grouping?',
      options: [
        { label: 'len(hand) % groupSize == 0', isCorrect: true },
        { label: 'max(hand) - min(hand) >= groupSize', isCorrect: false, feedback: 'The value range tells you the span of the cards, not whether they divide evenly into groups. [1,2,3,4,5] with groupSize=4 fails because 5 cards cannot form groups of 4 — the count check catches this immediately.' },
        { label: 'All card values are distinct', isCorrect: false, feedback: 'Distinct values are not required — the first example has two 2s and two 3s forming valid groups. The early-exit check is purely about whether the total count divides evenly.' },
        { label: 'groupSize divides the largest card value', isCorrect: false, feedback: 'Divisibility of a card\'s value by groupSize is irrelevant. The check is whether the total number of cards divides evenly into groups of the required size.' },
      ],
      correctFeedback: 'If len(hand) % groupSize != 0, you cannot partition cards into equal-size groups — return false immediately. This saves work before any sorting or counting.',
      wrongFeedback: [
        'Five cards, groups of four: 5 / 4 leaves a remainder. What arithmetic operation detects that the cards cannot be evenly partitioned?',
        'len(hand) % groupSize != 0 means you will always have leftover cards. That is an instant false before any other processing.',
      ],
    },
    {
      id: 'greedy-start-from-smallest',
      question: 'Groups must start from consecutive cards. Why should you always form a group starting from the current smallest available card?',
      options: [
        { label: 'Smaller cards are easier to group', isCorrect: false, feedback: 'Card size has no bearing on difficulty. The reason to start from the smallest is that the smallest card cannot be part of any group that started earlier — it must anchor a new group or the answer is false.' },
        { label: 'The smallest card can only start a group, never extend one', isCorrect: true },
        { label: 'Sorting puts smaller cards first for convenience', isCorrect: false, feedback: 'Sorting is a mechanism, not the reason. The greedy insight is that the minimum card is "trapped": no smaller card exists to start a group that could include it, so it must begin a new group right now.' },
        { label: 'Starting from larger cards causes duplicates', isCorrect: false, feedback: 'Starting from a larger card does not cause duplicates — it leaves the smallest card stranded. That smallest card can never be consumed by any group, making the answer false.' },
      ],
      correctFeedback: 'The minimum card has no smaller neighbor, so it cannot be the middle or tail of any group. It must be the head of a group of size groupSize starting now, or no valid grouping exists.',
      wrongFeedback: [
        'If the smallest card is 1 and groupSize is 3, can it appear in a group that starts at 0? At 2? What is the only group it can begin?',
        'The smallest card must anchor a new group starting at its value. If you cannot form that group (missing the next groupSize-1 consecutive values), return false.',
      ],
    },
    {
      id: 'frequency-map',
      question: 'Card values can reach 10⁹ but hand.length ≤ 10⁴. What data structure lets you track available cards efficiently?',
      options: [
        { label: 'An array indexed by card value', isCorrect: false, feedback: 'An array indexed by value would need size 10⁹ — far too large. With only up to 10⁴ distinct values, a hash map or sorted map uses O(distinct values) space, not O(max value).' },
        { label: 'A frequency map (hash map of value → count)', isCorrect: true },
        { label: 'A sorted list of all cards', isCorrect: false, feedback: 'A sorted list works but requires O(n) deletion per card removal, and finding the minimum is O(n) unless you maintain a pointer. A sorted map gives O(log n) min access and O(log n) deletion.' },
        { label: 'A boolean set of seen values', isCorrect: false, feedback: 'A boolean set only tracks presence, not how many copies you have. With duplicates like two 2s and two 3s in the example, you need counts to know how many groups each value can start.' },
      ],
      correctFeedback: 'A sorted map (e.g., Python\'s sorted dict or SortedList) gives O(log n) access to the minimum key and O(log n) updates. With at most 10⁴ cards, total work is O(n log n).',
      wrongFeedback: [
        'Values up to 10⁹ rule out array indexing. You have at most 10⁴ cards. What structure maps each distinct card value to its count without allocating 10⁹ slots?',
        'A hash map or sorted map stores only the distinct values that appear. With at most 10⁴ cards you have at most 10⁴ entries — O(n) space.',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'hand.length ≤ 10⁴. If each grouping step is O(groupSize) and you process n cards, what is the overall complexity?',
      options: [
        { label: 'O(n) — linear scan through the hand', isCorrect: false, feedback: 'Each card participates in exactly one group of size groupSize, so you do groupSize work per card placed. With n cards the total is O(n × groupSize) — though since groupSize ≤ n, O(n²) is the worst case.' },
        { label: 'O(n × groupSize) — at most O(n²)', isCorrect: true },
        { label: 'O(n log n) due to sorting', isCorrect: false, feedback: 'Sorting the hand is O(n log n), but the grouping loop itself can touch each card groupSize times. The dominant term depends on groupSize; in the worst case it is O(n²), not O(n log n).' },
        { label: 'O(2ⁿ) — exponential backtracking', isCorrect: false, feedback: 'No backtracking is needed. The greedy rule (always start from the smallest card) makes each decision deterministic. The algorithm runs in polynomial time.' },
      ],
      correctFeedback: 'With n ≤ 10⁴ and groupSize ≤ n, the worst case is O(n²) = 10⁸ — tight but manageable. Using a sorted structure reduces per-step overhead to O(log n), giving O(n × groupSize × log n) in practice.',
      wrongFeedback: [
        'For each group you form, you decrement groupSize consecutive entries in your frequency map. How many total decrements happen across all groups?',
        'Each of the n cards is decremented exactly once. But each decrement is one step of one group formation — total steps = n, each step O(log n) with a sorted map.',
      ],
    },
  ],
}
