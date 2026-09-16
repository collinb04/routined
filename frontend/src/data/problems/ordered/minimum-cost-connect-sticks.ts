export default {
  id: 'minimum-cost-connect-sticks',
  title: 'Minimum Cost to Connect Sticks',
  difficulty: 'medium',
  description: 'You have sticks with given lengths. Combine two sticks into one: the cost equals their combined length. Return the minimum cost to combine all sticks into one.',
  examples: [
    { input: 'sticks = [2,4,3]', output: '14', explanation: 'Combine 2+3=5 (cost 5), then 4+5=9 (cost 9). Total=14.' },
    { input: 'sticks = [1,8,3,5]', output: '30' },
  ],
  constraints: ['1 ≤ sticks.length ≤ 10⁴', '1 ≤ sticks[i] ≤ 10⁴'],
  starterCode: `class Solution:
    def connect_sticks(self, sticks):
        pass`,
  runnerSetup: 'connect_sticks = Solution().connect_sticks',
  functionName: 'connect_sticks',
  conceptId: 'heap',
  testCases: [
    { label: 'Three sticks', args: [[2,4,3]], expected: 14 },
    { label: 'Four sticks', args: [[1,8,3,5]], expected: 30 },
    { label: 'Single', args: [[5]], expected: 0 },
    { label: 'Two sticks', args: [[1,2]], expected: 3 },
  ],
  bruteHint: 'A brute-force approach rescans the entire list of sticks on every round to find the current two smallest, combines them, and repeats until only one stick remains — that\'s O(n) work per round across roughly n rounds, giving O(n²) total time. With up to 10,000 sticks, redoing a full scan every round adds up fast. What repeated lookup is being recomputed from scratch each round that could instead be maintained incrementally?',
  optimizeComplexity: { time: 'O(n log n)', space: 'O(n)' },
  clues: [
    {
      id: 'cost-counting',
      highlight: { location: 'description', text: 'Combine two sticks into one: the cost equals their combined length.' },
      question: 'Noticing how a value gets re-counted across repeated operations is often the key to spotting the right greedy strategy. Each combination costs the sum of the two sticks combined. A stick created in one step becomes an input to a later step. What does this mean for longer sticks?',
      options: [
        { label: 'Longer sticks should be combined first to get them out of the way', isCorrect: false, feedback: 'Combining long sticks first creates an even longer stick that gets charged in every subsequent combination. You want large sticks to appear in as few combinations as possible.' },
        { label: 'A stick\'s length is counted once per combination it participates in', isCorrect: true },
        { label: 'The order of combinations does not affect total cost', isCorrect: false, feedback: 'Order matters. In the example, combining 2+3 first (cost 5) then 4+5 (cost 9) totals 14. Combining 2+4 first (cost 6) then 3+6 (cost 9) totals 15. Different orderings give different totals.' },
        { label: 'Cost depends only on the final stick length', isCorrect: false, feedback: 'The final stick length is fixed regardless of order. The total cost is the sum of all intermediate combination costs, which varies with the ordering.' },
      ],
      correctFeedback: 'Every time a stick participates in a combination, its length is added to the cost. A stick created early and combined repeatedly accumulates cost each time. Minimizing cost means minimizing the number of times large lengths are summed.',
      wrongFeedback: [
        'Trace the example: stick of length 5 appears in the second combination and its length is added to the cost again. How many times is each original value counted in total?',
        'A small stick combined early becomes part of a larger stick that is combined again. The small stick\'s value is effectively counted in every subsequent combination it is part of. What minimizes that multiplier?',
      ],
    },
    {
      id: 'greedy-smallest-first',
      highlight: { location: 'description', text: 'Return the minimum cost to combine all sticks into one.' },
      question: 'Pinpointing the exact greedy choice that minimizes an accumulating cost is what turns a correct-but-slow idea into an optimal algorithm. To minimize total cost, which two sticks should you combine at each step?',
      options: [
        { label: 'The two longest sticks', isCorrect: false, feedback: 'Combining the two longest creates the largest possible stick, which then participates in further combinations at that large size. This maximizes future costs rather than minimizing them.' },
        { label: 'The two shortest sticks', isCorrect: true },
        { label: 'One short and one long stick', isCorrect: false, feedback: 'Combining one short with one long creates a medium stick. The short stick\'s length gets added to the long one and carried into future combinations. Pairing both shortest values minimizes the intermediate size.' },
        { label: 'Any two sticks — order is irrelevant', isCorrect: false, feedback: 'Order is not irrelevant — different orderings produce different total costs. The example shows that combining 2+3 before 4 gives 14, while combining 2+4 before 3 gives 15.' },
      ],
      correctFeedback: 'Always combine the two smallest sticks. The result is the smallest possible new stick, minimizing how much it contributes to every future combination. This is exactly Huffman coding applied to sticks.',
      wrongFeedback: [
        'Whichever two sticks you combine, their sum becomes a new stick that gets combined again. What pair minimizes the size of that new stick?',
        'Think about which stick length gets added to the cost the most times. The stick created earliest participates in the most steps. What property should it have to keep total cost low?',
      ],
    },
    {
      id: 'structure-for-repeated-min',
      highlight: { location: 'constraint', text: '1 ≤ sticks.length ≤ 10⁴' },
      question: 'Spotting a repeated need for the current minimum over a shrinking collection is the signal that a heap belongs in your solution. At each step you need the two smallest sticks, and the collection shrinks by one. What structure supports this efficiently?',
      options: [
        { label: 'Sort the array once and scan left to right', isCorrect: false, feedback: 'After combining two sticks, the new stick must be inserted in sorted position. A static sort cannot accommodate new insertions without re-sorting or a O(n) insertion.' },
        { label: 'A min-heap: pop twice, push once per round', isCorrect: true },
        { label: 'A sorted linked list with O(1) front removal', isCorrect: false, feedback: 'Removing from the front of a sorted list is O(1), but inserting the new combined stick in sorted order costs O(n). A min-heap does both operations in O(log n).' },
        { label: 'Two pointers on a sorted array', isCorrect: false, feedback: 'Two pointers work for a fixed sorted array, but the combined stick must be inserted back into the collection. A pointer-based approach on a static array cannot handle dynamic insertions.' },
      ],
      correctFeedback: 'A min-heap gives O(log n) access to the minimum. Each round: two pops (O(log n) each) and one push of the combined length (O(log n)). Total: O(n log n) for n − 1 rounds.',
      wrongFeedback: [
        'Each round you remove two elements and insert one new one. What structure keeps the collection ordered after each insertion?',
        'You need the minimum repeatedly, and the collection changes each round. A heap maintains the minimum incrementally in O(log n) per operation.',
      ],
    },
    {
      id: 'single-stick-edge-case',
      highlight: { location: 'constraint', text: '1 ≤ sticks.length ≤ 10⁴' },
      question: 'Checking behavior at the edges of the input constraints catches bugs that only surface for trivial or minimal inputs. The input may have a single stick. What is the correct output in that case?',
      options: [
        { label: 'The length of the single stick', isCorrect: false, feedback: 'Cost is only incurred when two sticks are combined. A single stick never participates in any combination, so no cost is accumulated.' },
        { label: '0 — no combinations are performed', isCorrect: true },
        { label: 'Undefined — the problem requires at least two sticks', isCorrect: false, feedback: 'The constraint allows sticks.length ≥ 1. When there is only one stick, the loop never executes and total cost is 0.' },
        { label: 'The square of the stick\'s length', isCorrect: false, feedback: 'Cost is the sum of stick lengths at the time of combination. With one stick and zero combinations, there is no cost at all.' },
      ],
      correctFeedback: 'n − 1 combinations are needed to merge n sticks into one. With n = 1, zero combinations are performed and the cost is 0.',
      wrongFeedback: [
        'How many combinations are needed to merge n sticks into one? Apply that formula when n = 1.',
        'Your loop should run while there are at least two sticks in the heap. With one stick, the loop body never executes. What does the accumulated cost start at?',
      ],
    },
  ],
  solutionCode: `import heapq

class Solution:
    def connect_sticks(self, sticks):
        if len(sticks) <= 1:
            return 0
        heap = sticks[:]
        heapq.heapify(heap)
        total = 0
        while len(heap) > 1:
            a = heapq.heappop(heap)
            b = heapq.heappop(heap)
            total += a + b
            heapq.heappush(heap, a + b)
        return total`,
  solutionComplexity: { time: 'O(n log n)', space: 'O(n)' },
  solutionCaveat: 'Always combining the two *currently smallest* sticks — not just any two — is the greedy choice that minimizes total cost: a longer stick combined early gets "re-paid" as part of every later combination it participates in, so cheap combinations should happen as early as possible.',
  solutionExplanation: 'This is Huffman-style greedy merging: repeatedly combining the two smallest available lengths minimizes the total cost because every stick\'s length gets counted once for every combination step it\'s involved in — keeping the biggest sticks out of combinations for as long as possible means they get counted the fewest times. A min-heap always exposes the two smallest sticks in O(log n) each, replacing the O(n) rescan the brute-force approach would need every round.',
}
