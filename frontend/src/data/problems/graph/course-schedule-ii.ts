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
  clues: [
    {
      id: 'output-vs-course-schedule-i',
      question: 'Course Schedule I returns true/false. This problem returns the actual ordering. What does that change about your algorithm?',
      options: [
        { label: 'You need to collect nodes in topological order, not just detect cycles', isCorrect: true },
        { label: 'You must run DFS instead of BFS', isCorrect: false, feedback: 'Both BFS (Kahn\'s algorithm) and DFS can produce a topological ordering. The output being an ordering changes what you collect, not which traversal you must use.' },
        { label: 'You need to sort courses by number of prerequisites', isCorrect: false, feedback: 'Sorting by prerequisite count doesn\'t produce a valid topological order — it ignores the dependency edges. A course with many prerequisites might still come before a course with few, depending on the graph structure.' },
        { label: 'The impossible case no longer needs to be handled', isCorrect: false, feedback: 'The impossible case (a cycle) still requires returning an empty array. The output type changed from bool to list, but the cycle detection requirement remains.' },
      ],
      correctFeedback: 'A cycle check tells you yes/no. An ordering requires you to record each node at the moment its dependencies are satisfied — that\'s Kahn\'s BFS queue output or a DFS post-order collection.',
      wrongFeedback: [
        'In Course Schedule I you just needed to know if a valid order exists. Now you need to produce one. What additional information must your algorithm track?',
        'The ordering is built by processing nodes in the correct dependency sequence. What does Kahn\'s algorithm accumulate as it processes nodes with zero in-degree?',
      ],
    },
    {
      id: 'cycle-means-empty',
      question: '"If it is impossible, return an empty array." When is it impossible?',
      options: [
        { label: 'When numCourses > prerequisites.length', isCorrect: false, feedback: 'Having more courses than prerequisites is perfectly fine — it just means some courses have no dependencies. Impossibility comes from a circular dependency, not from the counts.' },
        { label: 'When a cycle exists in the prerequisite graph', isCorrect: true },
        { label: 'When two courses share the same prerequisites', isCorrect: false, feedback: 'Multiple courses depending on the same prerequisite is valid and common — it\'s a diamond dependency, not a problem. Only a cycle (A requires B requires A) makes ordering impossible.' },
        { label: 'When any course has more than one prerequisite', isCorrect: false, feedback: 'A course can have many prerequisites as long as they can all be satisfied without circularity. A course needing both 0 and 1 first is fine; a course needing itself is not.' },
      ],
      correctFeedback: 'A cycle means course A requires B, and B (directly or transitively) requires A — so neither can be taken first. Detect this in Kahn\'s by checking if the topological sort processed all numCourses nodes.',
      wrongFeedback: [
        'Think about when you can\'t establish a starting point: what graph structure prevents any node from having zero in-degree at the start, or after removing processed nodes?',
        'In Kahn\'s algorithm, if you finish BFS and have processed fewer than numCourses nodes, what does that indicate about the remaining nodes?',
      ],
    },
    {
      id: 'in-degree-signal',
      question: 'In Kahn\'s algorithm, you start with all courses that have in-degree 0. What does in-degree 0 mean for a course?',
      options: [
        { label: 'The course has no students', isCorrect: false, feedback: 'In-degree in this graph refers to prerequisite edges, not student enrollment. In-degree 0 means no other course is listed as a prerequisite for this one.' },
        { label: 'The course has no prerequisites — safe to take immediately', isCorrect: true },
        { label: 'The course is a prerequisite for every other course', isCorrect: false, feedback: 'That would be a high out-degree, not in-degree 0. In-degree counts incoming edges (prerequisites this course needs); out-degree counts outgoing edges (courses that depend on this one).' },
        { label: 'The course appears in prerequisites as the second element only', isCorrect: false, feedback: 'The second element [a, b] means b is a prerequisite for a, so b has an outgoing edge to a. In-degree 0 means no edges point into this node — no course lists it as a prerequisite for themselves.' },
      ],
      correctFeedback: 'In-degree 0 means nothing needs to come before this course. These are the starting points. Kahn\'s processes them first, then reduces in-degrees of their dependents, revealing the next wave of ready courses.',
      wrongFeedback: [
        'In-degree counts the number of edges coming into a node. In the prerequisite graph, what does an incoming edge to course X represent?',
        'If course X has in-degree 0, no other course is listed as a prerequisite that X depends on. What does that mean for when you can take X?',
      ],
    },
    {
      id: 'prerequisite-direction',
      question: '[a, b] means you must take b before a. In your adjacency list, which direction does the edge go?',
      options: [
        { label: 'From a to b — a points to its prerequisite', isCorrect: false, feedback: 'If you build edges from a to b, in-degree counts dependents, not prerequisites — and Kahn\'s would process nodes differently. Build edges from b to a: b unlocks a, so the edge flows in the unlock direction.' },
        { label: 'Both directions — the graph is undirected', isCorrect: false, feedback: 'Prerequisites are directed: b must come before a, not the other way around. Making the graph undirected would destroy the ordering constraint.' },
        { label: 'From b to a — completing b unlocks a', isCorrect: true },
        { label: 'No edge needed — just track counts', isCorrect: false, feedback: 'You do need edges. When you finish processing b in Kahn\'s BFS, you must know which courses b unlocks so you can decrement their in-degree. That\'s what the adjacency list provides.' },
      ],
      correctFeedback: 'Edge b → a means "completing b makes a available." When b is processed in Kahn\'s BFS, you traverse its neighbors (courses that depended on b) and decrement their in-degree.',
      wrongFeedback: [
        'You want to know: after taking course b, which courses become one step closer to being available? Does that flow from b or toward b?',
        'In Kahn\'s algorithm, processing a node means traversing its outgoing edges to reduce in-degrees of dependents. Which node is the "done" node and which is the "now closer" node in the pair [a, b]?',
      ],
    },
  ],
}
