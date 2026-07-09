export default {
  id: 'task-scheduler',
  title: 'Task Scheduler',
  difficulty: 'medium',
  description: `<p>Given a characters array <code>tasks</code>, representing tasks a CPU needs to do, and a non-negative integer <code>n</code> representing the cooldown period between the same task, return the minimum number of intervals the CPU will take to finish all the given tasks.</p>`,
  examples: [
    { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: '8' },
    { input: 'tasks = ["A","A","A","B","B","B"], n = 0', output: '6' },
  ],
  constraints: ['1 <= tasks.length <= 10^4', 'tasks[i] is an uppercase English letter', '0 <= n <= 100'],
  starterCode: `def least_interval(tasks, n):
  pass`,
  functionName: 'least_interval',
  conceptId: 'heap',
  testCases: [
    { label: 'n=2', args: [['A','A','A','B','B','B'], 2], expected: 8 },
    { label: 'n=0', args: [['A','A','A','B','B','B'], 0], expected: 6 },
  ],
  bruteHint: 'Describe a naive simulation that rescans all task counts to find the most frequent remaining task at every single interval.',
  optimizeHint: 'Name the data structure that gives log-time access to the most frequent eligible task at each interval.',
  clues: [
    {
      id: 'cooldown-constraint',
      question: 'The same task must have at least n intervals between executions. With n = 2 and tasks [A,A,A,B,B,B], what does this force?',
      options: [
        { label: 'Tasks must be executed in alphabetical order', isCorrect: false, feedback: 'Alphabetical order is not required. The constraint is about time between same-type tasks, not about ordering across different task types.' },
        { label: 'Idle slots may be needed when no valid task is available', isCorrect: true },
        { label: 'Each task type must be completed before starting another', isCorrect: false, feedback: 'You can freely interleave different task types — that is the whole point. The constraint only restricts when the same task type can repeat.' },
        { label: 'n = 2 means at most 2 of the same task exist', isCorrect: false, feedback: 'n is the cooldown gap, not a count limit. In the example, A appears 3 times with n = 2, requiring the schedule A _ _ A _ _ A.' },
      ],
      correctFeedback: 'With n = 2, after executing A you must wait 2 intervals before the next A. If no other tasks fill those 2 slots, the CPU sits idle. The minimum schedule for [A,A,A,B,B,B] with n=2 is [A,B,idle,A,B,idle,A,B] = 8 intervals.',
      wrongFeedback: [
        'Trace through [A,A,A,B,B,B] with n=2. Can you always fill the cooldown window with other tasks, or do you sometimes have to insert an idle slot?',
        'With three A\'s and n=2, you need A _ _ A _ _ A. If you only have two B\'s to fill those 4 gaps, what fills the remaining 2 slots?',
      ],
    },
    {
      id: 'most-frequent-bottleneck',
      question: 'Which task type determines the structure of the schedule?',
      options: [
        { label: 'The least frequent task', isCorrect: false, feedback: 'The least frequent task is the easiest to fit in. The bottleneck is the task that appears most often — it forces the most cooldown gaps and potentially idle slots.' },
        { label: 'The most frequent task', isCorrect: true },
        { label: 'The task that appears exactly once', isCorrect: false, feedback: 'Tasks appearing once can be slotted anywhere in the cooldown windows. The structure is dictated by the task with the highest count, which forces the frame of the schedule.' },
        { label: 'All tasks equally — frequency does not matter', isCorrect: false, feedback: 'Frequency is the key signal. The most frequent task creates cooldown windows that everything else must fill. Ignoring frequency misses the dominant constraint.' },
      ],
      correctFeedback: 'The most frequent task (say count = f) forces at least (f − 1) × (n + 1) + 1 intervals if nothing else fills the gaps. Every other task\'s role is to fill cooldown slots to avoid idle time.',
      wrongFeedback: [
        'With A appearing 3 times and n = 2, how many intervals does A alone force as a lower bound? Now add other tasks to fill the gaps.',
        'The most frequent task creates a frame: A _ _ A _ _ A. The length of this frame is (count − 1) × (n + 1) + 1. What determines whether that frame can be compressed?',
      ],
    },
    {
      id: 'greedy-scheduling',
      question: 'At each interval, which task should the CPU execute to minimize total time?',
      options: [
        { label: 'The task with the earliest original position in the input', isCorrect: false, feedback: 'Input order is irrelevant to minimizing total intervals. The CPU can execute any eligible task — the only constraint is the cooldown between same-type tasks.' },
        { label: 'The most frequent eligible task', isCorrect: true },
        { label: 'A random eligible task', isCorrect: false, feedback: 'Random selection can lead to suboptimal schedules. Scheduling the most frequent eligible task minimizes idle slots by reducing the count of the bottleneck task as quickly as possible.' },
        { label: 'The least frequent eligible task', isCorrect: false, feedback: 'Using the least frequent tasks first depletes the easy-to-schedule tasks and leaves the high-frequency bottleneck tasks for later, increasing idle time.' },
      ],
      correctFeedback: 'Greedily pick the highest-count eligible task each interval. A max-heap of (count, task_type) makes this selection O(log 26) ≈ O(1), and tasks on cooldown are held out for exactly n intervals before re-entering the heap.',
      wrongFeedback: [
        'The bottleneck is the most frequent task. What happens to idle time if you delay using that task and use low-frequency tasks first?',
        'Reducing the highest frequency count as fast as possible minimizes how many cooldown frames the schedule must span. Which available task should you always prefer?',
      ],
    },
    {
      id: 'n-zero-edge-case',
      question: 'When n = 0, there is no cooldown. What is the answer in that case?',
      options: [
        { label: 'Always 1 — all tasks execute in one interval', isCorrect: false, feedback: 'n = 0 removes the cooldown constraint but each task still takes one interval. With 10,000 tasks and n = 0, the answer is 10,000, not 1.' },
        { label: 'Exactly tasks.length — no idle slots are needed', isCorrect: true },
        { label: 'tasks.length / 2 — tasks can be pipelined', isCorrect: false, feedback: 'Pipelining is not a feature of this model. Each interval executes exactly one task. With no cooldown, you execute all tasks back-to-back in tasks.length intervals.' },
        { label: 'Depends on how many distinct task types exist', isCorrect: false, feedback: 'With n = 0, no cooldown gaps exist between any tasks. You execute them all consecutively and the answer is simply tasks.length regardless of how many distinct types there are.' },
      ],
      correctFeedback: 'With n = 0, same-task repetition is unrestricted. Every task executes in its own interval with no idle time. The answer is len(tasks) — exactly 6 for the second example.',
      wrongFeedback: [
        'Trace the second example: n=0 means A can follow A immediately. How many intervals does [A,A,A,B,B,B] take with no cooldown?',
        'n = 0 collapses the cooldown window to zero. What is the minimum possible number of intervals for any sequence of tasks with no restriction?',
      ],
    },
  ],
}
