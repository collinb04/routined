export default {
  id: 'ipo',
  title: 'IPO',
  difficulty: 'hard',
  description: 'Before an IPO, you can finish at most <code>k</code> projects to maximize capital. Each project has a profit and requires minimum capital. Start with <code>w</code> capital and pick projects greedily by maximum profit you can afford.',
  examples: [
    { input: 'k=2, w=0, profits=[1,2,3], capital=[0,1,1]', output: '4', explanation: 'Finish project 0 (profit 1, capital → 1), then project 2 (profit 3, capital → 4).' },
  ],
  constraints: ['1 ≤ k ≤ 10⁵', '0 ≤ w ≤ 10⁹', 'n == profits.length == capital.length', '1 ≤ n ≤ 10⁵'],
  starterCode: `class Solution:
    def find_maximized_capital(self, k, w, profits, capital):
        pass`,
  runnerSetup: 'find_maximized_capital = Solution().find_maximized_capital',
  functionName: 'find_maximized_capital',
  conceptId: 'heap',
  testCases: [
    { label: 'k=2', args: [2,0,[1,2,3],[0,1,1]], expected: 4 },
    { label: 'k=3', args: [3,0,[1,2,3],[0,1,2]], expected: 6 },
    { label: 'k=0', args: [0,5,[1,2],[0,0]], expected: 5 },
  ],
  bruteHint: 'The brute-force approach runs k rounds, and in each round scans all n projects to find the highest-profit one you can currently afford, then adds its profit to your capital. Scanning every project on every round costs O(k × n) — with both k and n up to 10⁵, that\'s on the order of 10¹⁰ operations in the worst case. Given that ceiling, how would you avoid re-scanning every project from scratch each time your capital changes?',
  optimizeComplexity: { time: 'O(n log n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-k-projects',
      question: 'We can understand how efficient we need to be based on the size constraints of the input. You can finish at most k projects and n can reach 10⁵. What does "at most k" tell you about the loop structure?',
      options: [
        { label: 'Iterate over all n projects each round', isCorrect: false, feedback: 'Iterating all n projects in each of k rounds gives O(k × n) = up to 10¹⁰ operations — far too slow. You need a way to access the best affordable project without scanning all of them.' },
        { label: 'Run exactly k rounds, each picking the best affordable project', isCorrect: true },
        { label: 'Sort projects and take the first k', isCorrect: false, feedback: 'Sorting by profit and taking the first k ignores the capital requirement. A high-profit project may be unaffordable until you complete others first.' },
        { label: 'Use recursion to try all project orderings', isCorrect: false, feedback: 'With n up to 10⁵ and k up to 10⁵, enumerating orderings is combinatorially impossible. The greedy structure of the problem eliminates the need for exhaustive search.' },
      ],
      correctFeedback: 'You run at most k rounds. In each round you want the highest-profit project you can currently afford — that greedy choice is always optimal.',
      wrongFeedback: [
        'You have at most k picks. In each pick, what single property of a project should you maximize, given your current capital?',
        'Greedy: in each round, among all affordable projects, take the one with the highest profit. How do you make that selection fast?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 10⁵' },
    },
    {
      id: 'affordability-unlocking',
      question: 'As the state driving your decisions changes over time, the structure you choose must let you re-evaluate options efficiently rather than rescan everything. Capital grows as you complete projects, unlocking new ones. What data structure efficiently surfaces the best newly-affordable project each round?',
      options: [
        { label: 'A max-heap of profits for all projects', isCorrect: false, feedback: 'A single max-heap of all profits ignores affordability. The globally highest profit might require capital you do not have yet.' },
        { label: 'Sort projects by capital, then track the best profit among all currently affordable ones as capital grows', isCorrect: true },
        { label: 'A sorted list of (capital, profit) pairs updated each round', isCorrect: false, feedback: 'Re-sorting or linearly scanning a list each round costs O(n) per round, giving O(k × n) total — too slow for n = k = 10⁵.' },
        { label: 'A queue ordered by capital requirement', isCorrect: false, feedback: 'A queue gives you the cheapest project next, not the most profitable affordable one. You want to maximize profit, not minimize capital spent.' },
      ],
      correctFeedback: 'Sort projects by capital, then use a pointer to push all newly-affordable profits into a max-heap. Each round, pop the heap for the best profit. Total cost: O(n log n) for sorting plus O(k log n) for heap operations.',
      wrongFeedback: [
        'After each project, your capital rises and more projects become affordable. How do you efficiently discover and rank those newly-unlocked options?',
        'Two structures working together: one to track which projects just became affordable as capital grows, and one to quickly find the most profitable among them.',
      ],
      highlight: { location: 'description', text: 'requires minimum capital' },
    },
    {
      id: 'greedy-correctness',
      question: 'Whenever a problem tells you to choose greedily, you should ask what guarantee makes that local choice provably optimal. "Pick projects greedily by maximum profit you can afford." What does this greedy choice guarantee?',
      options: [
        { label: 'You may miss a lower-profit project that unlocks higher future profits', isCorrect: false, feedback: 'This is the key insight: taking the highest profit now maximizes capital, which in turn unlocks the most future projects. A lower-profit choice now would leave you with less capital and fewer options.' },
        { label: 'Taking the highest affordable profit maximizes final capital', isCorrect: true },
        { label: 'You always finish exactly k projects', isCorrect: false, feedback: 'You finish at most k — if no affordable projects remain, you stop early. The greedy choice is about what to pick, not how many picks to make.' },
        { label: 'Later projects are always more profitable', isCorrect: false, feedback: 'Project profitability is independent of order. The greedy strategy works because maximizing profit at each step maximizes the capital available for the next step.' },
      ],
      correctFeedback: 'Profit earned becomes capital immediately. Taking the maximum profit each round maximizes capital, which maximizes the set of affordable projects in the next round — a classic greedy exchange argument.',
      wrongFeedback: [
        'More capital now means more projects become affordable next round. What choice maximizes capital gained at each step?',
        'Suppose you skipped a high-profit project for a lower-profit one. Would you end up with more or less capital for future rounds?',
      ],
      highlight: { location: 'description', text: 'pick projects greedily by maximum profit you can afford' },
    },
    {
      id: 'two-phase-structure',
      question: 'When a problem gives you two independent dimensions to reason about, how you organize data along each one determines whether you can answer efficiently. Projects have both a capital requirement and a profit. How should you organize them to handle both dimensions efficiently?',
      options: [
        { label: 'Store all projects in a single min-heap by capital', isCorrect: false, feedback: 'A min-heap by capital tells you the cheapest next project, but not the most profitable one you can afford. You need to separate the affordability check from the profit ranking.' },
        { label: 'Sort by capital to unlock; use a max-heap by profit to select', isCorrect: true },
        { label: 'Sort by profit descending and skip unaffordable projects', isCorrect: false, feedback: 'Skipping unaffordable high-profit projects and moving to the next-best one still requires scanning the list each round. It also discards projects permanently that might become affordable later.' },
        { label: 'Index projects by both capital and profit simultaneously', isCorrect: false, feedback: 'A two-key index does not naturally support the operation you need: "give me the max profit among projects with capital ≤ current w." A sorted list plus a heap separates these concerns cleanly.' },
      ],
      correctFeedback: 'Phase 1 each round: scan sorted-by-capital list and push all affordable profits to a max-heap. Phase 2: pop the max-heap for the best profit. Sorting is done once; the pointer only moves forward.',
      wrongFeedback: [
        'You need to answer two different questions each round: "what is now affordable?" and "which affordable option is best?" What structure serves each question?',
        'Capital threshold controls eligibility; profit controls selection. Sort once by capital to find eligible projects, then use a heap to rank them by profit.',
      ],
      highlight: { location: 'description', text: 'has a profit and requires minimum capital' },
    },
  ],
  solutionCode: `import heapq

class Solution:
    def find_maximized_capital(self, k, w, profits, capital):
        n = len(profits)
        projects = sorted(zip(capital, profits))
        heap = []
        i = 0
        for _ in range(k):
            while i < n and projects[i][0] <= w:
                heapq.heappush(heap, -projects[i][1])
                i += 1
            if not heap:
                break
            w += -heapq.heappop(heap)
        return w`,
  solutionComplexity: { time: 'O(n log n)', space: 'O(n)' },
  solutionCaveat: 'The pointer <code>i</code> into the capital-sorted projects only ever moves forward and is never reset between rounds — since capital only grows as profits are collected, any project that was too expensive in an earlier round stays eligible-or-not in the same relative order, so nothing already passed ever needs to be revisited.',
  solutionExplanation: 'Sorting once by required capital turns "which projects can I afford right now" into a moving frontier — as capital grows from completed projects, more projects become affordable and slide into a max-heap ranked by profit. Each round just needs the single best profit among everything currently affordable, which a heap gives in O(log n), so the whole k-round process only ever sorts once and then does cheap heap operations instead of rescanning all projects every round.',
}
