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
}
