export default {
  id: 'last-stone-weight',
  title: 'Last Stone Weight',
  difficulty: 'easy',
  description: `<p>You are given an array of integers <code>stones</code> where <code>stones[i]</code> is the weight of the <code>i</code>th stone. We play a game: on each turn we smash the two heaviest stones. If they have equal weight both are destroyed; otherwise the smaller one is destroyed and the larger one's weight is reduced by the smaller. Return the weight of the last remaining stone, or 0 if none remain.</p>`,
  examples: [
    { input: 'stones = [2,7,4,1,8,1]', output: '1' },
    { input: 'stones = [1]', output: '1' },
  ],
  constraints: ['1 <= stones.length <= 30', '1 <= stones[i] <= 1000'],
  starterCode: `def last_stone_weight(stones):
  pass`,
  functionName: 'last_stone_weight',
  conceptId: 'heap',
  testCases: [
    { label: '[2,7,4,1,8,1]', args: [[2,7,4,1,8,1]], expected: 1 },
    { label: 'single', args: [[1]], expected: 1 },
  ],
  clues: [
    {
      id: 'repeated-max-access',
      question: 'Each round you must smash the two heaviest stones. What does "repeatedly access the two heaviest" suggest?',
      options: [
        { label: 'Sort the array before every round', isCorrect: false, feedback: 'Sorting before every round costs O(n log n) per round. With up to 30 stones and at most 29 rounds, it works for this input size — but a heap gives you O(log n) per operation and is the pattern the problem is designed to teach.' },
        { label: 'Use a max-heap to always access the largest in O(log n)', isCorrect: true },
        { label: 'Scan the array linearly each round to find the top two', isCorrect: false, feedback: 'A linear scan each round works for n ≤ 30, but it misses the key insight: when the collection changes each round, a heap maintains order incrementally rather than re-scanning from scratch.' },
        { label: 'Keep a sorted list and remove from the end', isCorrect: false, feedback: 'Removing from a sorted list and re-inserting the remainder costs O(n) per round. A heap does both in O(log n).' },
      ],
      correctFeedback: 'A max-heap gives O(log n) access to the largest element. Each round: two pops for the heaviest stones, then at most one push for the remainder.',
      wrongFeedback: [
        'The collection of stones changes every round — a stone may be destroyed or reduced. What structure stays ordered as elements are removed and re-inserted?',
        'You need the maximum element repeatedly, and the collection mutates after each smash. A heap maintains that ordering incrementally.',
      ],
    },
    {
      id: 'smash-outcome-cases',
      question: '"If equal weight, both are destroyed; otherwise the larger is reduced by the smaller." How many distinct outcomes do you handle per round?',
      options: [
        { label: 'One — always push the difference back', isCorrect: false, feedback: 'If the two stones are equal, both are destroyed and nothing is pushed back. Pushing a 0 back would incorrectly leave a stone in the heap that should not exist.' },
        { label: 'Two — push the difference only when the stones are unequal', isCorrect: true },
        { label: 'Three — push both values back if unequal', isCorrect: false, feedback: 'Only the survivor (the heavier stone reduced by the lighter) is pushed back. The lighter stone is destroyed entirely — you push at most one value per round.' },
        { label: 'Two — always destroy the smaller, never the larger', isCorrect: false, feedback: 'When both stones have equal weight, both are destroyed — the larger is not preserved. The two cases are: equal (both gone) and unequal (push the difference).' },
      ],
      correctFeedback: 'Pop the two heaviest: if equal, discard both (push nothing); if unequal, push the difference (y - x). The heap shrinks by two or by one each round.',
      wrongFeedback: [
        'Walk through the example: smash 8 and 7. What weight survives? Now smash two equal-weight stones — what survives?',
        'The equal case removes both stones from play. The unequal case leaves one stone with weight (heavier − lighter). Your code needs to branch on which case applies.',
      ],
    },
    {
      id: 'termination-condition',
      question: 'The loop runs until at most one stone remains. What are the two possible terminal states?',
      options: [
        { label: 'Always one stone remains', isCorrect: false, feedback: 'When all stones happen to cancel out — for example [2, 2] — the heap ends empty. You must return 0 in that case, not assume a stone always survives.' },
        { label: 'Zero stones (return 0) or one stone (return its weight)', isCorrect: true },
        { label: 'Always zero stones remain', isCorrect: false, feedback: 'Most inputs leave one stone remaining. Only when stones cancel perfectly does the heap end empty. You need to handle both cases.' },
        { label: 'The last stone always has weight 1', isCorrect: false, feedback: 'The last stone\'s weight depends on the specific input. For [2,7,4,1,8,1] it happens to be 1, but that is not guaranteed in general.' },
      ],
      correctFeedback: 'Loop while heap has ≥ 2 stones. Afterward: if the heap is empty return 0; otherwise return the single remaining stone\'s weight.',
      wrongFeedback: [
        'What happens when two stones of equal weight are the last two remaining? What does the heap look like after that smash?',
        'Your loop stops when fewer than two stones remain. Check heap length after the loop — it can be 0 or 1.',
      ],
    },
    {
      id: 'python-max-heap',
      question: 'Python\'s heapq is a min-heap. How do you use it to always extract the maximum weight?',
      options: [
        { label: 'Use heapq.nlargest() each round', isCorrect: false, feedback: 'heapq.nlargest() scans the whole heap each call — O(n) per round. Negating values keeps each operation at O(log n) and is the idiomatic pattern for max-heap behavior in Python.' },
        { label: 'Store negated weights so the most negative (= heaviest) is at the root', isCorrect: true },
        { label: 'Reverse the heap array after each operation', isCorrect: false, feedback: 'Reversing a heap array destroys the heap property. The heap invariant depends on specific parent–child relationships; arbitrary reversal breaks it entirely.' },
        { label: 'Import a separate max-heap library', isCorrect: false, feedback: 'Python\'s standard library does not include a max-heap class. The conventional approach is to negate all values and use the built-in heapq as a max-heap.' },
      ],
      correctFeedback: 'Push -stone for each weight. Popping gives the most negative value, which corresponds to the largest original weight. Negate the popped value to recover the actual weight.',
      wrongFeedback: [
        'heapq always puts the smallest value at the root. If you want the largest at the root, what transformation makes the largest value appear smallest to the heap?',
        'Negating all values flips the ordering: the largest original weight becomes the smallest (most negative) stored value. Pop, then negate again to get the actual weight.',
      ],
    },
  ],
}
