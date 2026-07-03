export default {
  id: 'course-schedule',
  title: 'Course Schedule',
  difficulty: 'medium',
  description: 'There are <code>numCourses</code> courses labeled 0 to numCourses-1. <code>prerequisites[i] = [a, b]</code> means you must take course <code>b</code> before <code>a</code>. Return <code>true</code> if you can finish all courses (no cycle exists).',
  examples: [
    { input: 'numCourses=2, prerequisites=[[1,0]]', output: 'true', explanation: 'Take 0 then 1.' },
    { input: 'numCourses=2, prerequisites=[[1,0],[0,1]]', output: 'false', explanation: 'Cycle: 0→1→0.' },
  ],
  constraints: [
    '1 ≤ numCourses ≤ 2000',
    '0 ≤ prerequisites.length ≤ 5000',
  ],
  starterCode: `def can_finish(num_courses, prerequisites):
  # Hint: build adjacency list + in-degree array, use Kahn's BFS algorithm
  pass`,
  functionName: 'can_finish',
  conceptId: 'topological-sort',
  testCases: [
    { label: 'Simple dep', args: [2, [[1,0]]], expected: true },
    { label: 'Cycle', args: [2, [[1,0],[0,1]]], expected: false },
    { label: 'No deps', args: [3, []], expected: true },
    { label: 'Linear chain', args: [4, [[1,0],[2,1],[3,2]]], expected: true },
    { label: 'Diamond cycle', args: [4, [[1,0],[2,1],[3,2],[1,3]]], expected: false },
  ],
}
