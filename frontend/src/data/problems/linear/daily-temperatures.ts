export default {
  id: 'daily-temperatures',
  title: 'Daily Temperatures',
  difficulty: 'medium',
  description: `<p>Given an array of integers <code>temperatures</code> representing the daily temperatures, return an array <code>answer</code> such that <code>answer[i]</code> is the number of days you have to wait after the <code>i</code>th day to get a warmer temperature. If there is no future day for which this is possible, keep <code>answer[i] == 0</code>.</p>`,
  examples: [
    { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
  ],
  constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
  starterCode: `class Solution:
    def daily_temperatures(self, temperatures):
        pass`,
  runnerSetup: 'daily_temperatures = Solution().daily_temperatures',
  functionName: 'daily_temperatures',
  conceptId: 'stack',
  testCases: [
    { label: 'classic', args: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] },
    { label: '[30,40,50,60]', args: [[30,40,50,60]], expected: [1,1,1,0] },
  ],
  bruteHint: 'The brute-force approach checks each day by scanning forward through every later day until a warmer temperature shows up, recording how many days that took, and falling back to 0 if none ever does. That means for each of the n days you might scan up to n more days ahead — roughly n² comparisons in the worst case. At n up to 100,000, how many operations is that, and would it finish in time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'next-greater-element',
      question: 'Recognizing a named pattern in a problem\'s phrasing tells you which family of techniques to reach for. answer[i] = days until the next strictly warmer temperature. This is the "next greater element" pattern. What does that pattern imply?',
      options: [
        { label: 'Sort temperatures and find the next value', isCorrect: false, feedback: 'Sorting destroys the day ordering — answer[i] depends on which days come after day i, not on the sorted rank of temperatures.' },
        { label: 'Process temperatures left to right with deferred resolution', isCorrect: true },
        { label: 'Scan backward from the end to find each answer', isCorrect: false, feedback: 'A backward scan can work but requires resolving each day against already-processed later days, adding complexity. The standard approach defers resolution using a stack during a forward scan.' },
        { label: 'Use binary search on the remaining temperatures', isCorrect: false, feedback: 'Binary search requires sorted data and finds a value, not the nearest future day with a higher temperature in original order.' },
      ],
      correctFeedback: 'The next-greater-element pattern processes elements left to right. Unresolved days (those waiting for a warmer temperature) are held in a stack until a warmer day arrives.',
      wrongFeedback: [
        'Day i cannot be answered until you see a warmer future day. How do you keep track of days that are still waiting for their answer?',
        'Unresolved days are waiting for a temperature higher than their own. A stack holds these pending days and resolves them when a warmer day is processed.',
      ],
      highlight: { location: 'description', text: 'the number of days you have to wait after the' },
    },
    {
      id: 'monotonic-stack',
      question: 'The rule for when a structure updates tells you exactly how it resolves the work it\'s holding onto. You maintain a stack of indices with decreasing temperatures. When a new temperature is warmer than the stack top, what happens?',
      options: [
        { label: 'Push the new index without popping', isCorrect: false, feedback: 'If the new temperature is warmer than the stack top, the stack-top day has found its answer. Pushing without popping leaves unresolved days on the stack.' },
        { label: 'Pop and record the wait time, repeating until the top entry is no longer cooler', isCorrect: true },
        { label: 'Discard everything pending and start fresh', isCorrect: false, feedback: 'Clearing the stack discards all pending days that may still need a warmer temperature in the future.' },
        { label: 'Swap the top element with the current index', isCorrect: false, feedback: 'Swapping does not resolve the waiting day — you need to record its answer and remove it from the stack.' },
      ],
      correctFeedback: 'Pop every stack entry whose temperature is less than the current temperature. For each popped index i, answer[i] = current_index − i. Then push the current index.',
      wrongFeedback: [
        'The stack top is waiting for a warmer day. If today is warmer, what is answer[stack_top] and what should you do with that entry?',
        'Pop the stack top, compute answer[top] = current_day − top, then check the new top. Keep popping while the stack is non-empty and the top is cooler than today.',
      ],
    },
    {
      id: 'output-structure',
      question: 'Understanding exactly what the output represents tells you how to handle the days that never get an answer. The output is an array of wait counts, one per day. What do unresolved stack entries at the end imply?',
      options: [
        { label: 'They indicate a bug — everything should already be resolved', isCorrect: false, feedback: 'It is valid for days at the end (or any day with no warmer future day) to remain unresolved. The stack being non-empty after processing all days is expected.' },
        { label: 'Their answer is 0 — no warmer day exists', isCorrect: true },
        { label: 'Their answer equals the distance to the last element', isCorrect: false, feedback: 'The last element and any day without a warmer future day should have answer 0, not a distance to the end of the array.' },
        { label: 'Pop them and assign −1 to signal no answer', isCorrect: false, feedback: 'The problem specifies 0 as the sentinel for "no warmer future day" — not −1.' },
      ],
      correctFeedback: 'Initialize answer to all zeros. Entries that are never popped (no warmer day ever arrived) keep their zero value automatically.',
      wrongFeedback: [
        'What does the problem say about days with no warmer future temperature? How does initializing answer to all zeros handle them without extra code?',
        'Any index left in the stack after processing all temperatures never found a warmer day. An all-zeros initialization means those entries are already correct.',
      ],
      highlight: { location: 'description', text: 'If there is no future day for which this is possible, keep' },
    },
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. What does temperatures.length ≤ 10⁵ tell you?',
      options: [
        { label: 'O(n²) brute force is fine at n = 10⁵', isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion comparisons — too slow. The monotonic stack solves it in O(n).' },
        { label: 'O(n) monotonic stack is the target', isCorrect: true },
        { label: 'O(n log n) sort then scan is needed', isCorrect: false, feedback: 'Sorting destroys the day ordering. The monotonic stack achieves O(n) without any sort.' },
        { label: 'Temperature values are small (30–100) so a counting approach applies', isCorrect: false, feedback: 'The small temperature range (only 71 distinct values) could enable some optimizations, but the next-greater-element structure is already O(n) without needing that fact.' },
      ],
      correctFeedback: 'Each index is pushed onto the stack once and popped at most once — O(n) total operations across the entire pass. At n = 100,000 that is at most 200,000 stack operations.',
      wrongFeedback: [
        'At n = 100,000, how many comparisons does a nested loop take? How many does the stack take?',
        'Every element is pushed once and popped at most once. What does that say about total stack operations across all n days?',
      ],
      highlight: { location: 'constraint', text: '1 <= temperatures.length <= 10^5' },
    },
  ],
  solutionCode: `class Solution:
    def daily_temperatures(self, temperatures):
        answer = [0] * len(temperatures)
        stack = []
        for i, t in enumerate(temperatures):
            while stack and temperatures[stack[-1]] < t:
                j = stack.pop()
                answer[j] = i - j
            stack.append(i)
        return answer`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionExplanation: 'The stack holds indices of days still "waiting" for a warmer day, kept in increasing-temperature order from bottom to top. Whenever a new day is warmer than the index on top, that\'s the answer for every waiting day it beats — so they get popped and resolved one after another until the stack top is no longer beaten (or empty), and the current day is pushed to wait its own turn. Each index is pushed once and popped at most once, which is what keeps the total work O(n) despite the nested-looking while loop.',
}
