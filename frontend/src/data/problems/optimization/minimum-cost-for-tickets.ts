export default {
  id: 'minimum-cost-for-tickets',
  title: 'Minimum Cost For Tickets',
  difficulty: 'medium',
  description: 'You plan to travel on certain days. Passes cost: 1-day pass = <code>costs[0]</code>, 7-day = <code>costs[1]</code>, 30-day = <code>costs[2]</code>. Find the minimum cost to travel every day you want.',
  examples: [
    { input: 'days=[1,4,6,7,8,20], costs=[2,7,15]', output: '11', explanation: '1-day pass on day 1 (2), 7-day pass starting day 4 (7), 1-day pass on day 20 (2) = 11.' },
  ],
  constraints: ['1 ≤ days.length ≤ 365', '1 ≤ days[i] ≤ 365', 'days is sorted'],
  starterCode: `class Solution:
    def min_cost_tickets(self, days, costs):
        pass`,
  runnerSetup: 'min_cost_tickets = Solution().min_cost_tickets',
  functionName: 'min_cost_tickets',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'Standard', args: [[1,4,6,7,8,20],[2,7,15]], expected: 11 },
    { label: 'Daily travel', args: [[1,2,3,4,5,6,7,8,9,10,30,31],[2,7,15]], expected: 17 },
  ],
  bruteHint: 'The brute-force approach recursively branches at each travel day, trying a 1-day, 7-day, or 30-day pass and then recursing on whichever day comes next — since every travel day forks into three choices, that explores an exponential number of path combinations. Because passes overlap (a 7-day pass bought on one day covers several future travel days), the same future subproblem gets solved again and again from different branches. What if you cached the minimum cost to cover all travel from each day onward, so overlapping day ranges are only computed once?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-calendar',
      highlight: { location: 'constraint', text: '1 ≤ days.length ≤ 365' },
      question: 'When a constraint bounds a value tightly, it\'s often hinting that you should build your solution\'s state around that exact range. days[i] ≤ 365 and days.length ≤ 365 tells you…',
      options: [
        { label: 'Index over travel days only', isCorrect: false, feedback: 'Indexing over only the travel days makes it harder to reason about pass durations — a 7-day pass bought on day 4 covers through day 10, regardless of which days you actually travel. The calendar-day dimension keeps that logic clean.' },
        { label: 'Index over all 365 calendar days', isCorrect: true },
        { label: 'A greedy pass-picking strategy works', isCorrect: false, feedback: 'Greedy — always buying the cheapest pass for the next trip — fails when a 7-day pass is cheaper than two 1-day passes bought separately. You need to compare all three options at each decision point.' },
        { label: 'Sort and use binary search on days', isCorrect: false, feedback: 'Days is already sorted. Binary search might help locate pass coverage windows, but the core structure is DP over days, not search.' },
      ],
      correctFeedback: 'With a fixed calendar of at most 365 days, you can define dp[d] = minimum cost to cover all travel through day d. Non-travel days carry forward the previous day\'s cost.',
      wrongFeedback: [
        'A 7-day pass bought on day 4 covers through day 10. How do you represent that coverage cleanly in a DP state?',
        'Think about what dp[d] means: minimum cost to handle all travel up through day d. Non-travel days are just dp[d] = dp[d-1].',
      ],
    },
    {
      id: 'three-pass-options',
      highlight: { location: 'description', text: '1-day pass = <code>costs[0]</code>, 7-day = <code>costs[1]</code>, 30-day = <code>costs[2]</code>' },
      question: 'When a problem defines several distinct options at each decision point, your recurrence needs to account for all of them, not just the most obvious one. Three pass durations (1, 7, 30 days) must all be considered at each travel day. This means…',
      options: [
        { label: 'Always buy the cheapest per-day pass', isCorrect: false, feedback: 'Cost per day isn\'t what\'s optimized — total cost is. A 7-day pass at costs[1] might be more expensive per day than a 1-day pass but still cheaper for a cluster of trips.' },
        { label: 'The best cost so far compares three possible lookback distances', isCorrect: true },
        { label: 'Buy 30-day passes whenever possible', isCorrect: false, feedback: 'A 30-day pass is only cheaper if you travel enough days in that window. For sparse travel like a single day in the month, a 1-day pass at costs[0] is better.' },
        { label: 'Only two passes need comparison at once', isCorrect: false, feedback: 'All three durations are always candidates. At any travel day you compare: costs[0] + dp[d-1], costs[1] + dp[d-7], and costs[2] + dp[d-30]. Dropping one can miss the optimum.' },
      ],
      correctFeedback: 'At each travel day d, dp[d] = min(dp[d-1] + costs[0], dp[d-7] + costs[1], dp[d-30] + costs[2]). All three are compared; the recurrence picks the cheapest option.',
      wrongFeedback: [
        'Each pass type "reaches back" a different number of days. What does the recurrence look like if you consider all three?',
        'For a 1-day pass: dp[d-1] + costs[0]. For 7-day: dp[d-7] + costs[1]. For 30-day: dp[d-30] + costs[2]. You take the minimum of all three.',
      ],
    },
    {
      id: 'non-travel-days',
      highlight: { location: 'description', text: 'You plan to travel on certain days.' },
      question: 'Distinguishing which days actually require a decision versus which ones don\'t is what keeps your DP loop from doing unnecessary work. "days" lists only travel days, not every day. This means…',
      options: [
        { label: 'Non-travel days are invalid DP states', isCorrect: false, feedback: 'Non-travel days are valid states — they just don\'t require a new purchase. dp[d] = dp[d-1] for any day not in your travel set.' },
        { label: 'Non-travel days carry forward the previous cost', isCorrect: true },
        { label: 'You must buy a pass for every calendar day', isCorrect: false, feedback: 'You only need coverage on travel days. Non-travel days require no pass — you just inherit whatever coverage you already have.' },
        { label: 'Skip non-travel days entirely in your DP', isCorrect: false, feedback: 'You can\'t skip them cleanly, because pass durations span multiple days. Tracking every calendar day lets pass windows work naturally without special-casing.' },
      ],
      correctFeedback: 'For any day d not in your travel set, dp[d] = dp[d-1]. No new purchase needed — the cost just carries forward.',
      wrongFeedback: [
        'If you don\'t travel on day 5, do you need to buy anything? What does dp[5] equal in that case?',
        'Non-travel days don\'t trigger a purchase decision. They just pass through: dp[d] = dp[d-1].',
      ],
    },
    {
      id: 'sorted-days-guarantee',
      highlight: { location: 'constraint', text: 'days is sorted' },
      question: 'A guarantee about input ordering can unlock a cheaper way to check membership or bounds inside your loop, so it\'s worth asking what it buys you. "days is sorted" tells you…',
      options: [
        { label: 'Binary search replaces the DP', isCorrect: false, feedback: 'Sorted order makes membership checks and pass-window calculations easier, but it doesn\'t eliminate the need to compare pass options. DP is still the right structure.' },
        { label: 'You can use a set for O(1) travel-day lookup', isCorrect: true },
        { label: 'Greedy left-to-right selection is optimal', isCorrect: false, feedback: 'Sorted order doesn\'t make greedy correct — dense travel clusters might be cheaper with a 30-day pass even if the greedy pick at each step says 1-day. DP remains necessary.' },
        { label: 'You must process days in reverse order', isCorrect: false, feedback: 'The DP runs forward through calendar days 1–365. Sorted input confirms the travel days are in order, which is convenient but doesn\'t change the direction of the DP.' },
      ],
      correctFeedback: 'Convert days to a set so checking "is day d a travel day?" is O(1) inside your DP loop over all 365 calendar days.',
      wrongFeedback: [
        'Inside your DP loop you need to ask: "do I need a pass today?" How do you answer that efficiently?',
        'A set built from the days list gives O(1) membership checks. That\'s the practical payoff of knowing days is sorted — and of converting it.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def min_cost_tickets(self, days, costs):
        day_set = set(days)
        last_day = days[-1]
        dp = [0] * (last_day + 1)
        for d in range(1, last_day + 1):
            if d not in day_set:
                dp[d] = dp[d - 1]
            else:
                opt1 = dp[d - 1] + costs[0]
                opt7 = dp[max(0, d - 7)] + costs[1]
                opt30 = dp[max(0, d - 30)] + costs[2]
                dp[d] = min(opt1, opt7, opt30)
        return dp[last_day]`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'Every calendar day is indexed, not just the travel days — a 7-day or 30-day pass bought on one travel day extends coverage across several days that may not themselves be travel days, and indexing only travel days would lose that continuous coverage window entirely.',
  solutionExplanation: '<code>dp[d]</code> is the minimum cost to have covered all required travel through day <code>d</code>. A non-travel day needs no new purchase, so its cost simply carries forward from the day before; a travel day must be covered by one of the three pass options, each reaching back a different number of days to where that pass would have been bought — <code>d-1</code> for a 1-day pass, <code>d-7</code> for a 7-day pass, <code>d-30</code> for a 30-day pass — and the cheapest of the three determines <code>dp[d]</code>.',
}
