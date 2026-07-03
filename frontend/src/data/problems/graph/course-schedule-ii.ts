export default {
  id: 'course-schedule-ii',
  title: 'Course Schedule II',
  difficulty: 'medium',
  description: `<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [ai, bi]</code> indicates that you must take course <code>bi</code> first to take course <code>ai</code>. Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible, return an empty array.</p>`,
  examples: [
    { input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', output: '[0,2,1,3] or [0,1,2,3]' },
    { input: 'numCourses = 1, prerequisites = []', output: '[0]' },
  ],
  constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= numCourses * (numCourses - 1)'],
  starterCode: `def find_order(num_courses, prerequisites):
  pass`,
  functionName: 'find_order_run',
  conceptId: 'graphs',
  runnerSetup: `def find_order_run(num_courses, prerequisites):
  order = find_order(num_courses, prerequisites)
  if not order: return []
  pos = {v: i for i, v in enumerate(order)}
  for a, b in prerequisites:
      if pos.get(a, -1) < pos.get(b, -1): return []
  return list(range(num_courses)) if len(order) == num_courses else []`,
  testCases: [
    { label: '4 courses', args: [4, [[1,0],[2,0],[3,1],[3,2]]], expected: [0,1,2,3] },
    { label: 'single', args: [1, []], expected: [0] },
  ],
}
