export default {
  id: 'capacity-ship-packages',
  title: 'Capacity To Ship Packages Within D Days',
  difficulty: 'medium',
  description: 'Packages must be shipped in order within <code>days</code> days. Given weights of packages, find the minimum ship weight capacity to ship all packages on time.',
  examples: [
    { input: 'weights=[1,2,3,4,5,6,7,8,9,10], days=5', output: '15', explanation: 'With capacity 15, ship [1-5],[6-8],[9],[10],[nothing] in 5 days.' },
  ],
  constraints: ['1 ≤ days ≤ weights.length ≤ 500', '1 ≤ weights[i] ≤ 500'],
  starterCode: `class Solution:
    def ship_within_days(self, weights, days):
        pass`,
  runnerSetup: 'ship_within_days = Solution().ship_within_days',
  functionName: 'ship_within_days',
  conceptId: 'binary-search',
  testCases: [
    { label: '5 days', args: [[1,2,3,4,5,6,7,8,9,10],5], expected: 15 },
    { label: '3 days', args: [[3,2,2,4,1,4],3], expected: 6 },
    { label: '1 day', args: [[1,2,3,1,1],1], expected: 8 },
  ],
  bruteHint: 'A direct approach tests every possible capacity value from max(weights) up to sum(weights), one at a time, running an O(n) simulation to check whether that capacity ships everything within the day limit. Since the capacity range can span up to 250,000 values, testing each one individually costs roughly O(n × sum) in the worst case. Given that feasibility only gets easier as capacity increases, is checking every single value the fastest way to find the smallest one that works?',
  optimizeComplexity: { time: 'O(n log(sum))', space: 'O(1)' },
  clues: [
    {
      id: 'search-space',
      question: 'A bounded, monotone range in the problem often signals that you can binary search over candidate answers rather than the input itself. You\'re asked for the minimum capacity. The capacity must be at least max(weights) and at most sum(weights). What does this bounded range suggest?',
      highlight: { location: 'constraint', text: '1 ≤ weights[i] ≤ 500' },
      options: [
        { label: 'Simulate every possible capacity linearly', isCorrect: false, feedback: 'With weights up to 500 and up to 500 packages, sum(weights) could reach 250,000. Simulating every integer capacity from max to sum would be 250,000 × 500 operations — far too slow.' },
        { label: 'Binary search over the capacity range', isCorrect: true },
        { label: 'Greedily assign packages without searching', isCorrect: false, feedback: 'Greedy assignment can simulate a fixed capacity, but it doesn\'t find the minimum capacity on its own. You still need a strategy to search which capacity to test.' },
        { label: 'Sort the weights first, then scan', isCorrect: false, feedback: 'Packages must be shipped in order, so sorting is not allowed — it would change the order constraint. The search space here is over capacity values, not the weights array.' },
      ],
      correctFeedback: 'The answer lies in a monotone range: if capacity C works, any capacity > C also works. That monotone property lets you binary search for the minimum valid C in O(log(sum)) steps.',
      wrongFeedback: [
        'The range [max(weights), sum(weights)] is ordered and monotone: once a capacity works, all larger ones also work. What algorithm exploits that structure?',
        'When a range has a monotone feasibility property — infeasible below, feasible above — binary search finds the boundary in O(log(range)) steps instead of scanning every value.',
      ],
    },
    {
      id: 'order-constraint',
      question: 'Explicit ordering constraints in the problem description often restrict which simulation strategies are valid. "Packages must be shipped in order." What does this rule out?',
      highlight: { location: 'description', text: 'Packages must be shipped in order' },
      options: [
        { label: 'Loading each day until capacity is full, then moving to the next', isCorrect: false, feedback: 'Greedy simulation (load a day until it\'s full, then start the next) works fine here and respects order. The order constraint rules out a different approach.' },
        { label: 'Checking one candidate capacity value directly', isCorrect: false, feedback: 'Binary search on capacity is still valid — you\'re searching over capacity values, not rearranging packages. The order constraint affects how you simulate, not whether you can binary search.' },
        { label: 'Reordering packages to fill days optimally', isCorrect: true },
        { label: 'Checking if a given capacity is feasible', isCorrect: false, feedback: 'You can still check feasibility by simulating a greedy load while respecting order. The constraint restricts which assignments are legal, not whether feasibility checking is possible.' },
      ],
      correctFeedback: 'You can\'t reorder packages to pack days more tightly. Each day\'s load must be a contiguous prefix of the remaining packages, so greedy left-to-right simulation is the only valid approach.',
      wrongFeedback: [
        'If you could reorder, you could fill each day perfectly by choosing which packages to group. What does "in order" prevent?',
        'The order constraint forces each day\'s shipment to be a contiguous subarray. That means you can\'t move a small package from day 3 to fill day 1\'s slack.',
      ],
    },
    {
      id: 'feasibility-check',
      question: 'Once you commit to binary searching over an answer range, everything hinges on how quickly you can test whether one candidate value is feasible. To binary search, you need to test whether a candidate capacity C is feasible. What does that check look like?',
      options: [
        { label: 'Count total weight and compare to C × days', isCorrect: false, feedback: 'Total weight ÷ days gives an average, but you can\'t split a package across days. The order constraint means you must simulate the actual day boundaries greedily.' },
        { label: 'Greedily assign packages in order, count days used', isCorrect: true },
        { label: 'Find the heaviest package and compare to C', isCorrect: false, feedback: 'Checking only the heaviest package tells you the floor on C, but not whether all packages fit within the given number of days at that capacity. You need to simulate the full assignment.' },
        { label: 'Sort packages and check if the median fits', isCorrect: false, feedback: 'Sorting violates the order constraint, and the median is not a meaningful threshold here. Feasibility depends on how many days are needed — you must simulate the greedy load.' },
      ],
      correctFeedback: 'Walk through packages in order, accumulating weight. When adding the next package would exceed C, start a new day. Count the days used and check if it\'s ≤ days.',
      wrongFeedback: [
        'You need to simulate actual shipment days. Walk through packages left to right and load as many as C allows — what do you count?',
        'Load packages greedily: keep adding to the current day until the next package would exceed C, then increment the day counter. Compare final day count to the limit.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def ship_within_days(self, weights, days):
        def days_needed(capacity):
            d = 1
            load = 0
            for w in weights:
                if load + w > capacity:
                    d += 1
                    load = w
                else:
                    load += w
            return d

        lo, hi = max(weights), sum(weights)
        while lo < hi:
            mid = (lo + hi) // 2
            if days_needed(mid) <= days:
                hi = mid
            else:
                lo = mid + 1
        return lo`,
  solutionComplexity: { time: 'O(n log(sum))', space: 'O(1)' },
  solutionCaveat: 'The search range starts at <code>max(weights)</code>, not 1 — any capacity smaller than the heaviest single package could never ship that package at all, so it is never a valid candidate and starting the search there saves scanning through guaranteed-infeasible capacities.',
  solutionExplanation: 'Feasibility here is monotonic: if some capacity C can ship everything within the day limit, then any capacity larger than C can too — packing more per day only ever needs fewer or equal days. That monotonicity is exactly what makes binary search valid on a "checkable" property instead of a sorted array of values, letting the search zero in on the smallest feasible capacity in O(log(sum)) probes, each one a cheap O(n) greedy simulation of loading packages day by day.',
}
