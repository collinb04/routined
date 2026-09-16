export default {
  id: 'lemonade-change',
  title: 'Lemonade Change',
  difficulty: 'easy',
  description: 'At a lemonade stand, each lemonade costs $5. Customers pay with $5, $10, or $20 bills. Given the order of bills, return <code>true</code> if you can give every customer correct change.',
  examples: [
    { input: 'bills = [5,5,5,10,20]', output: 'true' },
    { input: 'bills = [5,5,10,10,20]', output: 'false', explanation: 'Not enough $5 bills to make change for the second $20.' },
  ],
  constraints: ['1 ≤ bills.length ≤ 10⁵', 'bills[i] is 5, 10, or 20'],
  starterCode: `class Solution:
    def lemonade_change(self, bills):
        pass`,
  runnerSetup: 'lemonade_change = Solution().lemonade_change',
  functionName: 'lemonade_change',
  conceptId: 'greedy',
  testCases: [
    { label: 'Can make change', args: [[5,5,5,10,20]], expected: true },
    { label: 'Cannot', args: [[5,5,10,10,20]], expected: false },
    { label: 'All fives', args: [[5,5,5,5]], expected: true },
    { label: 'First $10', args: [[10]], expected: false },
  ],
  bruteHint: 'The brute-force approach tries every combination of bills you could hand back at each step, then recursively checks whether the rest of the sequence still works out under that choice. With up to 10⁵ customers and several possible change combinations at each one, the number of branching paths explodes exponentially. What two running counts could replace this entire branching search with a single greedy pass?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'only-three-denominations',
      highlight: { location: 'constraint', text: 'bills[i] is 5, 10, or 20' },
      question: 'When a value is restricted to a small, fixed set of possibilities, that\'s often a sign you can track state with a few counters instead of a general-purpose structure. bills[i] is always 5, 10, or 20. How many distinct cash-register states do you need to track?',
      options: [
        { label: 'One — total cash on hand', isCorrect: false, feedback: 'Total cash does not tell you whether you can make exact change. To give $15 back, you need specific denominations — a pile of $20 bills is worth nothing for making change.' },
        { label: 'Two — count of $5 bills and count of $10 bills', isCorrect: true },
        { label: 'Three — one counter per denomination', isCorrect: false, feedback: 'You never give $20 bills back as change: change is always $5 and $10 combinations. Tracking $20s would be correct but unnecessary — they never leave your register.' },
        { label: 'Unlimited — you must track every possible combination', isCorrect: false, feedback: 'With only $5 and $10 bills usable for change, your register state is fully described by just two integers: how many $5s and how many $10s you hold.' },
      ],
      correctFeedback: '$20 bills are never given as change, so you only need five_count and ten_count. These two integers fully describe every possible change-making decision.',
      wrongFeedback: [
        'When giving change, what denominations do you hand back? Do you ever return a $20 bill?',
        'Change is always made with $5 and $10 bills only. You need to track how many of each you have — $20s are never used for change.',
      ],
    },
    {
      id: 'greedy-twenty-dollar',
      highlight: { location: 'description', text: 'Customers pay with $5, $10, or $20 bills.' },
      question: 'Once you know which few states matter, the next question is which choice to make at each step — a greedy strategy commits to the locally best option without looking back. A customer pays $20. You owe $15 change. You have $5s and $10s. What is the greedy choice?',
      options: [
        { label: 'Give three $5 bills', isCorrect: false, feedback: 'Three $5 bills works, but it is not the greedy choice. $5 bills are more versatile than $10 bills — they can be used for $10-change situations too. Prefer giving one $10 + one $5 to preserve $5 bills for future customers.' },
        { label: 'Give one $10 and one $5 if available', isCorrect: true },
        { label: 'Give two $10 bills', isCorrect: false, feedback: 'Two $10 bills = $20 in change, but you only owe $15. This would overpay the customer.' },
        { label: 'Return false — $20 bills always make change impossible', isCorrect: false, feedback: 'The first example [5,5,5,10,20] returns true with a $20 bill. The $20 only fails if you lack the right change. Do not treat every $20 as a dead end.' },
      ],
      correctFeedback: 'Prefer one $10 + one $5 over three $5 bills. $5 bills are the only way to change a $10, so preserving them maximizes future flexibility. If no $10 is available, fall back to three $5 bills.',
      wrongFeedback: [
        'You have both $5s and $10s. Which combination for $15 change preserves the most versatile bills for later customers?',
        '$5 bills are needed for more situations than $10 bills. Using a $10 now saves a $5 for a future $10-paying customer who needs $5 change.',
      ],
    },
    {
      id: 'order-matters',
      highlight: { location: 'description', text: 'Given the order of bills, return <code>true</code> if you can give every customer correct change.' },
      question: 'Notice whether a problem defines a fixed sequence you must process in order — that ruling out reordering shapes which algorithms are even valid. The order of bills is fixed. Why can\'t you reorder customers to make change easier?',
      options: [
        { label: 'bills.length can be up to 10⁵', isCorrect: false, feedback: 'Array length does not prevent reordering — sorting 10⁵ elements is O(n log n) and perfectly fast. The issue is that the problem specifies a fixed customer order, not that reordering is too slow.' },
        { label: 'The problem requires serving customers in the given sequence', isCorrect: true },
        { label: 'You cannot sort bills because they are not unique', isCorrect: false, feedback: 'Sorting a list of non-unique values is allowed — Python\'s sort handles duplicates. The reason you cannot reorder is that the problem defines a specific customer queue, and reordering would change the problem.' },
        { label: 'Reordering would change which bills are $5, $10, or $20', isCorrect: false, feedback: 'Reordering does not change the values, only their positions. The constraint is that customers arrive in a fixed sequence and must be served in that order.' },
      ],
      correctFeedback: 'Customers arrive in the order given. You process them left to right, making change greedily at each step. The final answer depends on the exact sequence — there is no rearranging.',
      wrongFeedback: [
        'If you could serve the $5-paying customers first, you would always accumulate change before the harder cases. Why is that not allowed?',
        'The bills array is the customer queue in arrival order. You process index 0, then 1, then 2 — no reordering. Your greedy choices must work within this fixed sequence.',
      ],
    },
    {
      id: 'constraint-linear',
      highlight: { location: 'constraint', text: '1 ≤ bills.length ≤ 10⁵' },
      question: 'Input-size constraints tell you the target complexity class before you even design the algorithm. bills.length ≤ 10⁵. Each customer requires O(1) work. What is the overall complexity?',
      options: [
        { label: 'O(n log n) — you need to sort the bills', isCorrect: false, feedback: 'No sorting is needed. You process bills in the given order, and each bill requires a single conditional check and at most one or two counter updates — O(1) per customer.' },
        { label: 'O(n) — one pass through the bills array', isCorrect: true },
        { label: 'O(n²) — for each bill, check all previous bills', isCorrect: false, feedback: 'You never need to look back at previous bills. Your register state (five_count and ten_count) captures all the information you need from past transactions in O(1) space.' },
        { label: 'O(1) — only three bill types matter', isCorrect: false, feedback: 'Three bill types means O(1) state, not O(1) time. You still need to process each of the up to 10⁵ bills. Three types gives constant-time decisions per bill, making the total O(n).' },
      ],
      correctFeedback: 'One pass, constant work per customer: O(n) time, O(1) space. With 10⁵ bills, this runs in microseconds.',
      wrongFeedback: [
        'For each of the 10⁵ bills, you make one decision: collect, return change, or fail. How does that sum up?',
        'n bills × O(1) per bill = O(n). Two integer counters (five_count, ten_count) are the entire state — O(1) space.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def lemonade_change(self, bills):
        five = ten = 0
        for bill in bills:
            if bill == 5:
                five += 1
            elif bill == 10:
                if five == 0:
                    return False
                five -= 1
                ten += 1
            else:
                if ten > 0 and five > 0:
                    ten -= 1
                    five -= 1
                elif five >= 3:
                    five -= 3
                else:
                    return False
        return True`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'When change for a $20 is owed, a $10 + $5 combination is tried <code>before</code> falling back to three $5 bills — preferring to spend the less-flexible $10 bill first, since a $5 bill is the only denomination that can ever make change for a future $10, making it the more valuable bill to conserve.',
  solutionExplanation: 'Only two running counts — how many $5 and $10 bills are currently held — fully describe the register\'s state, since $20 bills are collected but never handed back as change. Every incoming bill triggers exactly one deterministic decision (collect a $5, make $5 change for a $10, or make $15 change for a $20 using the most bill-conserving combination available), and the moment any required change can\'t be made, the answer is definitively false — no later bill could undo that failure.',
}
